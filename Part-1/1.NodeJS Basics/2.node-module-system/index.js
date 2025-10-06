// main file
// importing 3 modules
const firstModule=require("./first-module")

console.log(firstModule.add(2,3))
console.log(firstModule.subtract(10,5))
console.log(firstModule.divide(20,2))


// module wrapper
(
    function (exports,require,module,_filename,_dirname){
        // your module code goes here
        // above modules like add,subtract and divide.
    }
)