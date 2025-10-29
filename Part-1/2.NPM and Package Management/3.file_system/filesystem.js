const fs=require("fs")
const path=require("path")


// ## Folders
// 1. creating folder
const dataFolder=path.join(__dirname,"data")

if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder)
    console.log("Data folder created")
}

// 2. removing folders => make sure you have file already present
// fs.rmdir("removefolder",(err)=>{
//     if(err) throw err;
//     console.log("folder deleted successfully")
// })

// 3. Renaming files or folders => make sure you have file with oldName exists
// fs.rename('oldName.txt', 'newName.txt', (err) => {
//   if (err) throw err;
//   console.log('File renamed!');
// });



// ## Files
// ## sync method
// 1. creating file
const filePath=path.join(dataFolder,"example.txt")
fs.writeFileSync(filePath,"Hello from node js")
console.log("File created successfully")


// 2. reading file
const readContentFromFile=fs.readFileSync(filePath,"utf-8")
console.log("File content => ",readContentFromFile)

// 3. append new line
fs.appendFileSync(filePath,'\nThis is a new line added to the example.txt file')
console.log(`New line added to the file`)

// 4. read the directory
fs.readdir(__dirname,(err,data)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log(data)
    }
})

// 5. delete files => make sure you have file already present
// fs.unlink("deleted.txt",(err)=>{
//     if(err) throw err
//     console.log("File deleted successfully")
// })


// 6. Checking if file exists
fs.access("filesystem.js",fs.constants.F_OK,(err)=>{
    console.log(err ? "File doesn't exists":"File exists")
})

console.log('----------------------------------------------------------------------')

// ## async method
// 1. creating file
const asyncFilePath=path.join(dataFolder,"async-example.txt")
fs.writeFile(asyncFilePath,"Hello async node js",(err)=>{
    if(err) throw err;
    console.log("Async file is created successfully")
})

/// 2. reading file
fs.readFile(asyncFilePath,'utf-8',(err,data)=>{
    if(err) throw err
    console.log("File content => " + data)
})


// 3. appending new line
fs.appendFile(asyncFilePath,`\nThis is another line added to the async file`,(err)=>{
    if(err) throw err
    console.log("New line added to the async file")
})
