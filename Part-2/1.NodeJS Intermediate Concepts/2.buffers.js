const buffOne=Buffer.alloc(10)   // allocate a buffer of 10 bytes
console.log(buffOne)

const buffFromString=Buffer.from("Hello")
console.log(buffFromString)

const buffFromArrayOfIntegers=Buffer.from([1,2,3,4,5])
console.log(buffFromArrayOfIntegers)

buffOne.write("Updated Data")
console.log("After writing Updated Data to bufferOne",buffOne.toString())


