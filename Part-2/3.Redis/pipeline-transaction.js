const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

client.on('error', (err) => console.log('Redis client error occurred', err));

async function testPipeline() {
  try {
    await client.connect();
    console.log('Connected to Redis ✅');

    // ---------------------------
    // 1) Transaction example (MULTI -> EXEC)
    // ---------------------------
    const tx = client.multi();
    tx.set('key-transaction1', 'value1');
    tx.set('key-transaction2', 'value2');
    tx.get('key-transaction1');
    tx.get('key-transaction2');

    const txResults = await tx.exec();
    console.log('Transaction results:', txResults);
    // Expect something like: [ 'OK', 'OK', 'value1', 'value2' ]



    // ---------------------------
    // 2) Pipeline / separate batch example
    // ---------------------------
    const pipeline = client.multi();
    pipeline.set('key-pipeline1', 'value1');  // these four are in the queue, instead of sending immediately.
    pipeline.set('key-pipeline2', 'value2');
    pipeline.get('key-pipeline1');
    pipeline.get('key-pipeline2');

    const pipelineResults = await pipeline.exec();  // sends all queued commands to Redis
    console.log('Pipeline results:', pipelineResults);
    // Expect: [ 'OK', 'OK', 'value1', 'value2' ]


    // ---------------------------
    // 3) Large batch of 1,000 sets
    // ---------------------------
    const bigBatch = client.multi();
    for (let i = 0; i < 1000; i++) {
      bigBatch.set(`user:${i}:action`, `Action ${i}`);
    }
    const bigResults = await bigBatch.exec();
    console.log('Big batch length:', bigResults.length);


    // ---------------------------
    // 4) Atomic transfer (DECRBY + INCRBY)
    // ---------------------------
    const transfer = client.multi();
    transfer.decrBy('account:1234:balance', 100);   // if one user has 100 balance, then the 100 balance will be deducted, if it sends to another user.
    transfer.incrBy('account:0000:balance', 100);   // if one user has 0 balance, then the 100 balance will be increased, if it receives from another user.

    const transferResults = await transfer.exec();
    console.log('Transfer results:', transferResults);
    // Typically: [ newBalance1, newBalance2 ] depending on Redis reply format


    // ---------------------------
    // 5) Performance test
    // ---------------------------

    // Note: run "pipeline-transaction.js" three four times, to see the performance time difference
    console.log("Performance test")

    // Below code is without pipeline
    console.time("without pipelining")  // "w" has to be small

    for(let i=0;i<1000;i++){
        await client.set(`user${i}`, `user_value${i}`)
    }

    console.timeEnd(`without pipelining`)
   

    // Below code is with pipeline
    console.time(`with pipelining`)
    const bigPipeline=client.multi()

    for(let i=0;i<1000;i++){
         bigPipeline.set(`user_pipeline_key${i}`,`user_pipeline_value${i}`)
    }

    await bigPipeline.exec()

    console.timeEnd('with pipelining')

  } catch (e) {
    console.error('Error in testPipeline:', e);
  } finally {
    await client.quit();
    console.log('Disconnected from Redis');
  }
}

testPipeline();
