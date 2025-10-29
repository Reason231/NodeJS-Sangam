const fs=require('fs/promises')
const fsn=require("fs")
const path=require("path")

const basepath="C:\\Users\\HP\\OneDrive\\Documents\\NodeJS CodewithHarry\\Tut-91-Managing folders and creating files"

async function organizedFiles(){
    try{
        const files=await fs.readdir(basepath)
        
        for(let item of files){
            const ext=item.split(".").pop()
            console.log(item)

            if((ext == "jpg" || ext == "png" || ext == "pdf" && ext.length > 1)){
                const folderPath=path.join(basepath,"myextensions")
                const extensionPath=path.join(folderPath,ext)

                if(!fsn.existsSync(folderPath)){
                    await fs.mkdir(folderPath)
                }

                if(!fsn.existsSync(extensionPath)){
                    await fs.mkdir(extensionPath)
                }
               
               // Build new file path with the same name under the extension folder
        const newFilePath = path.join(extensionPath, item);

        // Create a new file with the same name and placeholder content
        await fs.writeFile(newFilePath, `This is a new file created for: ${item}`);
        console.log(`${item} created successfully inside ${ext} folder`);
            }
        }


    }
    catch(e){
        console.log(e)
    }
}

organizedFiles()