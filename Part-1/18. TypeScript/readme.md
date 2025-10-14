## TypeScript Setup
Note: It doesn't cover all the parts of typeScript. It just shows how to connect TypeScript with nodeJS.
- npm i typescript @types/node ts-node --save-dev
- Tut video => 10:09:50 - 10:19:30

## ts-node concept
- ts-node is a Typescript execution engine and REPL for Node.js.
- It enables you to directly execute TypeScript on Nodejs without precompiling.

## folder setup of Typescript for the project
- npx tsc --init
- edit this things in the tsconfig.json file
-> "rootDir": "./src",
-> "outDir": "./dist",
,
  "include": ["src/**/*"],
  "exclude": ["node_modules"]

## Code changed in package.json file
 "scripts": {
    "build":"tsc",  
    "start":"node dist/app.js",
    "dev":"ts-node src/app.ts"
  },

Note: npm run build -> It will convert typeScript into JS. What you have written in app.ts, it will create "dist" folder and it will give you "app.js" file.
Note: npm start -> To run app.js created by "dist" folder
Note: npm run dev -> To run app.ts created by me.


## TypeScript Basics
- Go to app.ts
- Tut video - 10:19:30 - 11:06:04