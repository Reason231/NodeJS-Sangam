const redis=require('redis')

const client=redis.createClient({
    host:'localhost',
    port:6379
})

// event listener
client.on('error',(error)=> console.log('Redis client error occurred',error))


async function redisDataStructureHashes(){
    try{
        await client.connect()

        // ## 5. hashes -> HSET, HGET, HGETALL, HDEL
        await client.hSet("product:1",{
            name:"Product 1",
            description:"product one description",
            rating:"5"
        })

        const getProductRating = await client.hGet("product:1","rating")
        console.log(getProductRating)

        const getProductDetails = await client.hGetAll("product:1")
        console.log(getProductDetails)

        // deleting a key
        await client.hDel("product:1","rating")

        // getting the updated details after deleting
        const updatedProductDetails=await client.hGetAll("product:1")
        console.log(updatedProductDetails)
    }
    catch(e){
        console.error(e)
    }
    finally{
        client.quit()
    }
}

redisDataStructureHashes()