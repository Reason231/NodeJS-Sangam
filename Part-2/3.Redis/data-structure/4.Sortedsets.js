const redis=require('redis')

const client=redis.createClient({
    host:'localhost',
    port:6379
})

// event listener
client.on('error',(error)=> console.log('Redis client error occurred',error))


async function redisDataStructureSortedSets(){
    try{
        await client.connect()

        // ## 4.sorted sets
        // ZADD, ZRANGE, ZRANK, ZRAM

        
        await client.zAdd("cart",[
            {
                score:100,value:"Cart 1"
            },
            {
                score:150,value:"Cart 2"
            },
            {
                score:10,value:"Cart 3"
            },
        ])

        // give results based on score 
        const getCartItems = await client.zRange("cart",0,-1)
        console.log(getCartItems)

        // give results with score and value
        const extractAllCArtItemsWithScore=await client.zRangeWithScores("cart",0,-1)
        console.log(extractAllCArtItemsWithScore)

        const cartTwoRank=await client.zRank("cart","Cart 2")
        console.log(cartTwoRank)
        
    }
    catch(e){
        console.error(e)
    }
    finally{
        client.quit()
    }
}

redisDataStructureSortedSets()