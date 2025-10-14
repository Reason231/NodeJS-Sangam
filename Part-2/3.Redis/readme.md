## Redis

## Redis Installation
- Go to the link => https://github.com/tporadowski/redis/releases
- Download the "msi" version
- Install it
- Go to C: -> program file -> Redis -> Copy the location path.
C:\Program Files\Redis
- Go to "control-panel" -> "User a/c" -> "User a/c" -> Change my environment variable ->  Double click on "path" -> "Click on new" -> Paste the above location path.
[!Alt](./1.png)


## To check installation
- Go to cmd
- write "redis-server"
- If it's show you something, then it's installed.\
- Tut video -> 1:37:58 - 1:41:49

## install npm 
- npm i redis 

## PORT
- PORT to run redis => 6379

## Concepts => 
- Tut video -> 1:41:49 - 2:56:54
## Basic Operators
- code written in "server.js"

## Data-structure operators
- code written in "data-structure folder"

## Pub-Sub
- code written in "pub-sub.js"

## pipeline and transaction
- code written in pipeline-transaction.js

## io-redis npm package
- code written in io-redis.js
- npm i ioredis
- Notes => 
- redis client library for nodeJS
- It gives automatic pipeline, gives redis cluster, supports typesScript
- The same concepts like data-structure, pub-sub are going to use here, no concept difference.
- going to use ioredis.js instead of official "redis"
