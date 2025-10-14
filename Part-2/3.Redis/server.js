const redis=require('redis')

const client=redis.createClient({
    host:'localhost',
    port:6379
})

// event listener
client.on('error',(error)=> console.log('Redis client error occurred',error))


// ## Basic Level of Operators
async function testRedisConnection(){
    try{
        // 1. Connection
        await client.connect()
        console.log('Connected to redis')

        // 2. Setting key and value respectively
        await client.set("name","Reason");

        // 3. Extracting value from above key
        const extractValue=await client.get("name")  

        console.log(extractValue)


        // 4. delete above value and how many count u have deleted
        const deleteCount = await client.del("name")
        console.log(deleteCount)

        // 5. Updated value after deleting
        // since we had only one value, we have deleted that also, so console.log is null
        const extractUpdatedValue=await client.get("name")
        console.log(extractUpdatedValue)  

        // 6. Increment the value
        await client.set("count","100")
        const incrementCount = await client.incr('count')  // increase the value from 100 to 101
        console.log(incrementCount)

        // 7. Decrement the value
        const decrementCount=await client.decr('count')  // decreases the value from 101 to 100
        console.log(decrementCount)

        
    }
    catch(e){
        console.error(e)
    }

    // makes sure there is no open connection
    finally{
        await client.quit()
    }
}


testRedisConnection()

