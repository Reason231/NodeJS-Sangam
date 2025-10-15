const cors = require("cors");

// The code is from video "43:15-1:00:00"
// cors code varies from project to project based on requirements.
const configureCors = () => {
  return cors({
    // origin -> this will tell that which origins you want user can access your api
    origin: (origin, callback) => {
      const allowedOrigins = [
        // urls that will be allowed for accessing
        "http://locahost:3001", // local dev
        "https://yourcustomdomain.com", // production domain
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // giving permission so that req can be allowed
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },

    // The HTTPS methods you are allowing in your website
    methods: [`GET`, "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization","Accept-Version"],

    // The headers that can be exposed in the client response
    exposedHeaders:['X-Total-Count',"Content-Range"],

    // VVI, if you are using cookies for authorization, then you need this
    credentials:true,

    // Pass the CORS preflight response to the next handler.
    preflightContinue:false,

    // cache preflight response for 600 seconds -> avoid sending options requests multiple times 
    maxAge:600,

    // provides a status code to use successful OPTIONS requests.
    optionSuccessStatus:204

  });
};


module.exports = {configureCors}