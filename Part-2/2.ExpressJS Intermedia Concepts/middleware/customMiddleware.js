const requestLogger=(req,res,next) =>{
    const timeStamp = new Date().toISOString()
    const method=req.method
    const url = req.url
    const userAgent=req.get('User-Agent');

    // http://localhost:3000/api/v1/items, hit this you will see console
    console.log(`[${timeStamp}] ${method} ${url} - ${userAgent}`);
    next()
}

const addTimeStamp=(req,res,next) =>{
    req.timeStamp = new Date().toISOString()
    next()
}

// go to server.js
module.exports={requestLogger,addTimeStamp}