const EventEmitter=require("events")

class MyCustomEmitter extends EventEmitter{
    constructor(){
        super()
        this.greeting = "Hello"
    }

    // down "input" triggers this method
    greet(name){
        this.emit("greeting",`${this.greeting}, ${name}`)
    }
}

const myCustomEmitter = new MyCustomEmitter
myCustomEmitter.on('greeting',(input) => {
    console.log("Greeting event",input)
})

myCustomEmitter.greet("Reason")