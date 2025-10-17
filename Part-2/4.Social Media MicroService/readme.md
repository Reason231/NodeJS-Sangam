## Microservice architecture
- Note: We have used the "joi" for the validation.
- Each functionality is divided into the folders
- Tut video => 02:56:54 - 08:50:15

## Difference between Monolithic app structure and Microservice structure

1. Monolithic app structure (Mono-repo -> all services in one repo)
A monolithic backend typically has one big codebase:

/server
 ├── controllers/
 ├── routes/
 ├── models/
 ├── utils/
 ├── middlewares/
 ├── config/
 └── app.js

- All logic (auth, payment, products, users, etc.) lives together in a single app.
- If one part breaks or needs scaling, the whole app must be redeployed.

2. Microservice app structure (Multi-repo -> each services in its own repo)
- In microservices, you split your app into independent services.
- Each service focuses on a specific domain (auth, products, orders, etc.) and can run, scale, and deploy separately.

Example:

/microservices
 ├── auth-service/
 │    ├── src/
 │    │    ├── controllers/
 │    │    ├── routes/
 │    │    ├── models/
 │    │    ├── utils/
 │    │    └── app.js
 │    ├── package.json
 │    └── Dockerfile
 │
 ├── product-service/
 │    ├── src/
 │    │    ├── controllers/
 │    │    ├── routes/
 │    │    ├── models/
 │    │    └── app.js
 │    ├── package.json
 │    └── Dockerfile
 │
 ├── media-service/
 │    ├── src/
 │    │    ├── controllers/
 │    │    ├── routes/
 │    │    ├── models/
 │    │    └── app.js
 │    ├── package.json
 │    └── Dockerfile
 │
 ├── api-gateway/
 │    ├── src/
 │    ├── package.json
 │    └── Dockerfile
 │
 └── docker-compose.yml


 ## Notes for all folders
- [!Alt](./Code-flow.png) => Code flow explanation from (Tut video => 5:10:26 - 5:15:30 )
- Each file has its own "package.json" with their need of npm modules. 
- Read the "readme.md" file for the setup and explanation of own folder.
- The code is written first at "auth-service" after that some of the files code is copied to another services like in the api-gateway.
- api-gateway folder runs on PORT "3000"
- auth-service folder runs on PORT "3001"
- post(CRUD) runs on PORT "3002"

## Steps
 1. Create "api-gateway" folder which is the initial point and write the code here second.
 - Tut video => 2:56:54 - 3:10:30

 2. Create "auth-service" folder and write the code here first
 - Tut video => 3:10:30 - 4:19:53

 3. Go to "api-gateway" folder
 - 4:19:53 - 4:47:24

 4. Go to "auth-service" folder
 - 4:47:24 - 5:06:44

 5. Create "post-service" for CRUD
 - Tut video => 5:15:30 - 5:46:00 & 

 6. Go to "api-gateway" folder
 - 5:46:40 - 5:55:14

 7. Go to "post-service" 
 - 5:55:14 - 6:28:00

 8. Go to "media-service"
 - 6:28:00 - 

 ## Database 
 UserName -> devilineye100_db_user
 Password -> shAoPhh2zzkQ9lyR
 Connection URL -> mongodb+srv://devilineye100_db_user:shAoPhh2zzkQ9lyR@microservice.hs2ssev.mongodb.net/


6:11:04
