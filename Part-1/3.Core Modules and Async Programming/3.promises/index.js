// Promise Resolve
function delayFn(time){
    return new Promise((resolve)=> setTimeout(resolve,time))
}

console.log("Promise lecture starts")
// Promise
delayFn(200).then(()=>console.log('after 0.2 seconds promise resolved'))
console.log('Promise lecture ends')


// Promise reject
function divideFn(num1,num2){
    try{
        return new Promise((resolve,reject)=> {
            if(num2 === 0){
                reject(`Cannot perform division by 0`)
            }else{
                resolve(num1/num2)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

divideFn(10,0)
.then(result => console.log("Result => ",result))
.catch(e => console.log("Error => ",e))