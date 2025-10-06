## NodeJS Basics

## Topics
0. Installing NodeJS
1. Running JavaScript with NodeJS
2. NodeJS modules system
3. Understanding module.exports and require
4. Exploring the module wrapper function


0. Installing NodeJS
- Go to this website of nodeJS and click on download btn
- https://nodejs.org/en/download
- Click on "Prebuilt Installer"
- To check if it's installed => Go to terminal and write "node -v"
- Tut video => 6:25 - 7:15 

1. Running JavaScript with NodeJS
- Create a "index.js" file
- Write a code "console.log("hello world)"
- Go to target file terminal and write "node index.js"
- Tut video => 9:50 - 14:25

2. NodeJS Module System and understanding module.exports and require
- The Node.js module system is a mechanism for organizing and reusing code within Node.js applications.
- It allows developers to break down large applications into smaller, self-contained units called modules.
- In short => It allows to make different files containing different modules, and importing it in a single main file.
- Create "node-module-system.js" file.
- Tut video => 14:25 - 23.55

4. Module wrapper
- A module wrapper function is a special function in Node.js that Node.js creates around each module's code before executing it, effectively encapsulating the module's code and variables.
- It takes several parameters—exports, require, module, __filename, and __dirname.
- Tut video => 23:55 - 30:24