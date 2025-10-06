// Example of callback in the context of nodeJS
const fs=require("fs")
function person(name,callbackFn){
        console.log(`Hello ${name}`)
        callbackFn()
}

function address(){
    console.log("Kathmandu")
}

person("Reason",address)

// here (err,data) are the callback function
fs.readFile('readme.md','utf-8',(err,data)=>{
    if(err){
        console.error(`Error reading file`,err)
        return
    }

    console.log(data)
})


