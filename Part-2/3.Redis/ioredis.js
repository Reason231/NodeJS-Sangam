const Redis=require("ioredis")

// redis client library for nodeJS
// It gives automatic pipeline, gives redis cluster, supports typesScript
// The same concepts like data-structure, pub-sub are going to use here, no concept difference.
// going to use ioredis.js instead of official "redis"
const redis=new Redis()

async function ioRedisDemo(){
    try{
        await redis.set("key",'value')
        const val=await redis.get("key")
        console.log(val)
    }
    catch(e){
        console.log(e)
    }
    finally{
        redis.quit()
    }
}
ioRedisDemo()

