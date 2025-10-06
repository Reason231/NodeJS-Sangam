const fs=require("fs")
const path=require("path")

// creating folder
const dataFolder=path.join(__dirname,"data")

if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder)
    console.log("Data folder created")
}


// ## sync method
// creating file
const filePath=path.join(dataFolder,"example.txt")
fs.writeFileSync(filePath,"Hello from node js")
console.log("File created successfully")


// reading file
const readContentFromFile=fs.readFileSync(filePath,"utf-8")
console.log("File content => ",readContentFromFile)

// append new line
fs.appendFileSync(filePath,'\nThis is a new line added to the example.txt file')
console.log(`New line added to the async file`)

// read the directory
fs.readdir(__dirname,(err,data)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log(data)
    }
})

console.log('----------------------------------------------------------------------')

// ## async method
// creating file
const asyncFilePath=path.join(dataFolder,"async-example.txt")
fs.writeFile(asyncFilePath,"Hello async node js",(err)=>{
    if(err) throw err;
    console.log("Async file is created successfully")
})

/// reading file
fs.readFile(asyncFilePath,'utf-8',(err,data)=>{
    if(err) throw err
    console.log("File content => " + data)
})


// appending new line
fs.appendFile(asyncFilePath,`\nThis is another line added to the async file`,(err)=>{
    if(err) throw err
    console.log("New line added to the async file")
})
