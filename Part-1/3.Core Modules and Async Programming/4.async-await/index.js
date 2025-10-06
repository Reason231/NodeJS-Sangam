function delayFn(time){
    return new Promise((resolve) => setTimeout(resolve,time))
}
async function delayedGreet(name){
    await delayFn(1000)  // after 2 seconds
    console.log(name)
}
delayedGreet("Reason")


async function division(num1,num2){
    try{
        if(num2 === 0){
            throw new Error("Cannot divide by 0")
        }
        return num1/num2
    }
    catch(e){
        console.error(`Error => ${e}`)
    }
}

async function mainFn(){
    console.log(await division(10,2))
    console.log(await division(10,0))
}

mainFn()