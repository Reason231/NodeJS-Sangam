const redis=require('redis')

const client=redis.createClient({
    host:'localhost',
    port:6379
})

// event listener
client.on('error',(error)=> console.log('Redis client error occurred',error))


async function redisDataStructureSets(){
    try{
        await client.connect()

        // ## 3. Sets -> SADD, SMEMBERS, SISMEMBER, SREM

        // 1. Setting multiple values
        await client.sAdd("user:nickName",["john","reason","bro"])

        // 2. extracting the value from the sets
        const extractUserNicknames = await client.sMembers("user:nickName")
        console.log(extractUserNicknames)

        // 3. checking if the value exists
        const isJohnIsOneofUserNickname=await client.sIsMember("user:nickName","john")
        console.log(isJohnIsOneofUserNickname)  // 1

        /// 4. remove value
        await client.sRem("user:nickName","bro")

        // updated value after the removal of item
        const getUpdatedUserNickNames=await client.sMembers("user:nickName")
        console.log(getUpdatedUserNickNames)

    }
    catch(e){
        console.error(e)
    }
    finally{
        client.quit()
    }
}

redisDataStructureSets()