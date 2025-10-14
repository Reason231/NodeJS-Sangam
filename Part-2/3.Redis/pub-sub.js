// pub/sub => messaging pattern
// pub -> send -> channel -> subscriber will consume this
// publisher will send message to channel and subscriber will consume this.

const redis=require('redis')

const client=redis.createClient({
    host:'localhost',
    port:6379
})

// event listener
client.on('error',(error)=> console.log('Redis client error occurred',error))

async function testAdditionalFeatures() {
    try{
        await client.connect()

        const subscriber=client.duplicate()  // create a new client -> shares the same connection
        await subscriber.connect()  // connect to redis server for the subscriber

        await subscriber.subscribe("dummy-channel",(message,channel)=>{
            console.log(`Received message from ${channel}: ${message}`)
        })

        // publish message to the dummy channel
        await client.publish("dummy-channel","Some dummy data from publisher")
        await client.publish("dummy-channel","Some new message again from publisher")

        await new Promise((resolve)=>setTimeout(resolve,1000))

        await subscriber.unsubscribe("dummy-channel")
        await subscriber.quit() // close the subscriber connection
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.quit()
    }
}

testAdditionalFeatures()