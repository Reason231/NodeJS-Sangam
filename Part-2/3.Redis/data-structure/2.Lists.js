const redis=require('redis')

const client=redis.createClient({
    host:'localhost',
    port:6379
})

// event listener
client.on('error',(error)=> console.log('Redis client error occurred',error))


async function redisDataStructureLists(){
    try{
        await client.connect()
        // ## 2. Lists -> LPUSH, RPUSH, LRANGE, LPOP, RPOP

        // 1. pushes the value in the "notes" key
        // Comment it, so it won't push the value again
        // await client.lPush('notes',['note 1','note 2','note 3'])

        // 2. extract the notes from the descending
        const extractAllNotes = await client.lRange('notes',0,-1)
        console.log(extractAllNotes)

        // 3. remove only fist value from the key
        const firstNote=await client.lPop("notes")
        console.log(firstNote)

        // 4. remaining notes
        const remainingNotes=await client.lRange('notes',0,-1)
        console.log(remainingNotes)
    }
    catch(e){
        console.error(e)
    }
    finally{
        client.quit()
    }
}

redisDataStructureLists()