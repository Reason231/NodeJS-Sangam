## ExpressJS
Tut video => -1:39:40 - 2:13:14
video reached => 1:55:17

## Some extra Concepts
1. Why should we use ExpressJS
- It is a framework that can used for the http method
- We can see the difference in code in previous video and today, for creating the server

2. Http Methods
- app.get, app.post(), app.put(), app.delete(path,handler) 

3. Parameters and queries
## Parameters
- Parameters are part of the URL path.
- Note => It creates a messy and long code for each links which is not good
- app.get("/contact/owner",(req,res)=>{
    res.send("Hello contact owner")
})
- So we are going to fix this problem by using parameter ":slug"

## Queries
- Queries are added after a "?" in the URL, and are typically used for filtering, sorting, pagination, etc.


4. Static Files
- To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

- The function signature is:
app.use(express.static('public'))
