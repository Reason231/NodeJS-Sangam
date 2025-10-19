## RabbitMQ
- It helps to communicate between the different services by using message Ques.
- 
- For eg: If you have deleted one post from "post-service" then it should automatically delete that "post ko image" from "media-service"

## Installation
1. Erlang.org => https://www.erlang.org/downloads
2. RabbitMQ => https://www.rabbitmq.com/docs/install-windows
3. Go to file explorer and go to this section and copy this path=> 
C:\Program Files\RabbitMQ Server\rabbitmq_server-4.1.4\sbin
4. Open cmd and run as administrator 
5. Go to the director by running => cd C:\Program Files\RabbitMQ Server\rabbitmq_server-4.1.4\sbin
6. Types this commands after that => rabbitmq-plugins enable rabbitmq_management
7. Close the cmd and again run cmd as administrator and types these commands
a. net stop RabbitMQ
b. net start RabbitMQ
- Tut video - 7:19 - 7:23:00


## Nodejs library for RabbitMQ
- amqplib
- Install it in "post-service" and "media-service" => npm i amqplib
- https://www.npmjs.com/package/amqplib?activeTab=code

## Docs Link of amqplib
https://amqp-node.github.io/amqplib/channel_api.html#connect

## Steps of code
1. Go to "post-service" -> "src" -> "utils" -> and create "rabbitmq.js"
2. Go to "post-service" -> "server.js"
3. Go to "post-service" -> "src" -> "controllers" -> "post-controller.js" -> "deletePost" function
4. Go to "media-service" -> "src" -> "utils" -> "cloudinary.js"
5. Go to "media-service" -> "src" -> "utils" -> and create "rabbitmq.js"
6. Go to "media-service" -> "server.js"
7. Go to "media-service" -> "src" -> create "eventHandlers"
- Output video => 8:02:55 - 8:05:00
