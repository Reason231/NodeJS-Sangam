const path=require("path")

// node index.js

// Accessing the directory
console.log("Directory Name =>",__dirname)  // OR => 
console.log("Directory Name=> ", path.dirname(__filename)) // 

// Accessing file paths
console.log("File name with directory",__filename)  
console.log("File name only=> ",path.basename(__filename))
console.log("File extension => ",path.extname(__filename))

console.log("-----------------------------------------------------------------")

const joinPath=path.join("/user","documents","node","projects")
console.log("Joined Path => ",joinPath)

const resolvedPath=path.resolve("user","document","node","projects")
console.log("Resolved path => ",resolvedPath)

const normalizePath=path.normalize("/user/.documents/..node/projects")
console.log("Normalized Path => ",normalizePath)

const breakPath=path.parse(__dirname)
console.log("Parsed Path =>",breakPath)
