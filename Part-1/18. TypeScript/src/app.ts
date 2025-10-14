// Note: First read readme.md for the folder and code setup
console.log("Hello world")


// Basic types of TS
let string:String="Reason"
let num:number=100
let isDone:Boolean = false
let list:number[]=[1,2,3]    // array of numbers
let products:String[]=['product 1','product 2','product 3']  // array of strings. Array<string> also you can defined.

// If we don't know what will the type, so it can accept any type.
let randomVal:any = 4

let xyz:undefined = undefined
let yz:null=null


// enum(enumeration)
enum Color{
    Red,Green,Blue
}

let d:Color=Color.Blue  // You can only have the value, that is defined in Color.


// tuple
let abc:[string,number]
