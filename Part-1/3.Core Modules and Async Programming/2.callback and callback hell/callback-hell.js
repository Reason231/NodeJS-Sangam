const fs = require("fs");

// callback hell is the function under function.
// Example of callback-hell in the context of nodeJS
fs.readFile("readme.md", "utf-8", (err, data) => {
  if (err) {
    console.error(`Error reading file`, err);
    return;
  }

        // 1st callback fn
        const modifyFileData = data.toUpperCase();

        fs.writeFile("output.txt", modifyFileData, (err) => {
            if (err) {
            console.error(`Error writing file`, err);
            return;
        }
            console.log("Data written to the new file");


            // 2nd callback fn
            fs.readFile('output.txt',"utf-8",(err,data)=>{
                if(err){
                    console.error("Error writing file",err)
                    return
                }

                console.log(data)
            })
        });

});
