const fs = require("fs").promises;
const fsn = require("fs");
const path = require("path");

const basepath = "C:\\Users\\HP\\OneDrive\\Documents\\NodeJS CodewithHarry\\Tut-91-Managing folders and creating files";

async function organizeFiles() {
  try {
    const files = await fs.readdir(basepath);

    for (const item of files) {
      console.log("running for", item);

      const ext = item.split(".").pop();

      if (ext == "pdf" || ext == "png" || ext == "jpg" || "zip" && ext.length > 1) {
        const folderPath = path.join(basepath,"ytextensions");
        const extFolderPath = path.join(basepath+"//ytextensions", ext);

        // creates the ytExtensions folder if it doesn't exists
        if(!fsn.existsSync(folderPath)){
            await fs.mkdir(folderPath)
        }

        // creates the folder 
        if (!fsn.existsSync(extFolderPath)) {
          await fs.mkdir(extFolderPath);
        }

        // moves the folder from prev to new path
        await fs.rename(path.join(basepath, item), path.join(extFolderPath, item));
      }
    }
  } catch (err) {
    console.error("Error organizing files:", err);
  }
}

organizeFiles();
