require('dotenv').config()
const express=require('express')
const cors=require('cors')
const Redis=require('ioredis')
const helmet=require('helmet')
const { configureCors } = require('./src/config/corsConfig')


const app=express()
const PORT=process.env.PORT

const redisClient=new Redis(process.env.REDIS_URL)

app.use(helmet())
app.use()
app.use(configureCors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// 