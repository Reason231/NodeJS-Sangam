console.log("---------------------------------------------------------------------")
console.log("Node module wrapper demo")

console.log("__filename in wrapper explorer file",__filename)
console.log("__dirname in wrapper explorer file",__dirname)
console.log("--------------------------------------------------------------------")

module.exports.greet = function(name){
    console.log(`Hello ${name}`)
}