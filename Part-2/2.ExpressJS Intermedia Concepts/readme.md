## ExpressJS Intermediate Concepts (VVI)
- cors
- express rate limiting
- error handling
- api versioning

## cors 
- Documentation Link => https://www.npmjs.com/package/cors
- npm install cors
- create "corsConfig.js" file under "config" folder.
- cors code varies from project to project based on requirements.
- Tut video -> 43:15-1:00:00

## custom middleware of global error handler
- create "errorHandler.js" file under "middleware" folder
- Tut video -> 1:00:00 - 1:13:30

## API Versioning
- create "apiVersioning.js" file under "config" folder.
- Tut video -> 1:13:30 - 1:22:00

## Express Rate Limit
- npm i express-rate-limit
- create "rateLimiting.js" file under "config" folder.
- Tut video -> 1:22:00 - 1:27:00

## To check all of the above middleware
- create routes folder
- Global Error Handler -> "item-routes.js"
- API Versioning -> "server.js"
- Express Rate Limit -> Do more than 2 request like "GET" and "POST" under 15 minutes
- Tut video -> 1:27:00 - 1:37:58