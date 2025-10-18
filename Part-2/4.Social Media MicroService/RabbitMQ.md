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
- Tut video - 7:19 - 7:23:00

## Nodejs library for RabbitMQ
- amqplib
- Install it in "post-service" and "media-service" => npm i amqplib
- https://www.npmjs.com/package/amqplib?activeTab=code

## Docs Link of amqplib
https://amqp-node.github.io/amqplib/channel_api.html#connect