require("dotenv").config();
const express = require("express");
const Redis = require("ioredis");
const helmet = require("helmet");
const { configureCors } = require("./config/corsConfig");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const logger = require("./utils/logger");
const proxy = require("express-http-proxy");
const errorHandler = require("./middleware/errorHandler");
const { validateToken } = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT;

const redisClient = new Redis(process.env.REDIS_URL);

app.use(helmet());
app.use(configureCors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rate limiting => Code copied from auth-service "server.js"
const ratelimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000, // 15mins
  max: 100, // max number of requests
  standardHeaders: true, // return rate limit info in the "response" headers
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ success: false, message: "Too many requests" });
  },

  // Redis store configuration
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

app.use(ratelimitOptions);

// Code copied from auth-service "server.js"
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${req.body}`);
  next();
});

// Proxy explanation
// api-gateway -> runs on 3000 PORT -> when we hit this endpoint from api-gateway /v1/auth/register
// auth-service -> runs on 3001 PORT -> then this endpoint of auth should be targeted /api/auth/register

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api"); // replacing api-gateway "/v1" to auth-service "/api"
  },

  // proxy error handler
  proxyErrorHandler: (err, res, next) => {
    // logger.error(`Proxy error: ${err.message}`)
    const errDetails = {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack,
      originalUrl: res && res.req && res.req.originalUrl, // may or may not be present
    };
    logger.error("Proxy encountered an error", errDetails);
    console.error("Proxy error details:", errDetails);

    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  },
};

// setting up proxy for "auth-service"
// It will target /api/auth/ by changing /v1/ to /api/
// It will also target "localhost:3001" port
// Run => http://localhost:300/v1/auth/register
app.use(
  "/v1/auth",
  proxy(process.env.AUTH_SERVICE_URL, {
    ...proxyOptions, // above function
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userREs) => {
      logger.info(`Response received from Auth service:${proxyRes.statusCode}`);

      return proxyResData;
    },
  })
);

// setting up proxy for "post-service"
// Run => http://localhost:3000/v1/posts/create-post
app.use(
  "/v1/posts",
  validateToken,
  proxy(process.env.POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId; // sending to "post-service" -> "auth-middleware.js"

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userREs) => {
      logger.info(`Response received from Post service:${proxyRes.statusCode}`);

      return proxyResData;
    },
  })
);

//setting up proxy for our media service
app.use(
  "/v1/media",
  validateToken,
  proxy(process.env.MEDIA_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      if (!srcReq.headers["content-type"].startsWith("multipart/form-data")) {
        proxyReqOpts.headers["Content-Type"] = "application/json";
      }

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from media service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
    parseReqBody: false,
  })
);

//setting up proxy for our search service
app.use(
  "/v1/search",
  validateToken,
  proxy(process.env.SEARCH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Search service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`API Gateway is running on port ${PORT}`);
  logger.info(
    `Auth Service is running on port ${process.env.AUTH_SERVICE_URL}`
  );
  logger.info(
    `Post Service is running on port ${process.env.POST_SERVICE_URL}`
  );
  logger.info(`Redis Url is running on port ${process.env.REDIS_URL}`);
});
