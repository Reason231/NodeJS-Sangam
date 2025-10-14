const redis=require('redis')

const client=redis.createClient({
    host:'localhost',
    port:6379
})

// event listener
client.on('error',(error)=> console.log('Redis client error occurred',error))


async function redisDataStructureStrings(){
    try{
        await client.connect()
        // ## 1. Strings -> SET,GET,MSET,MGET

        // 1. Single keys and value set and get
        await client.set("user:name","Reason Khadgi")
        const name=await client.get("user:name")
        console.log(name)

        //2.  multiple keys and values in set and get
        await client.mSet(["user:email","rijan@gmail.com","user:age","18","user:country","Nepal"])
        const [email,age,country] = await client.mGet(["user:email","user:age","user:country"])  // destructuring

        console.log(email,age,country)

    }
    catch(e){
        console.error(e)
    }
    finally{
        client.quit()
    }
}

redisDataStructureStrings()