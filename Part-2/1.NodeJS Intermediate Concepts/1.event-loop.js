// ## The flow of node-JS
// Micro-task which will execute immediately after the current operation finishes.
// Examples -> process.nextTick, promises

// Macro-task will will execute in next iteration of the event loop
// Examples -> setTimeout, setInterval


const fs=require('fs')
const crypto=require("crypto")

// synchronous so it starts first
console.log(`1. script start`)  


// Macro-task
setTimeout(()=>{
    console.log(`2. settimeout 0s callback (macro-task)`)
},0)


setTimeout(()=>{
    console.log(`3. settimeout 0s callback (macro-task)`)
},0)

setImmediate(()=>{
    console.log(`4. setImmediate callback (check) (macro-task)`)
})


// Micro-task
Promise.resolve().then(()=>{
    console.log(`5. Promise resolved (microtask)`)
})

process.nextTick(()=>{
    console.log("6. process.nexttick callback (microtask)")
})


// I/O callbacks
fs.readFile(__filename,()=>{
    console.log("7. file read operation (I/O callbacks) ")
})


// It's a high cpu intense work
crypto.pbkdf2("secret","salt",10000,64,"sha512",(err,key)=>{
    if(err) throw err
    console.log(`8. pbkdf2 operation completed CPU intensive task`);
})

console.log(`9. script ends`) // synchronous so it starts first