const lodash=require("lodash")

const names = ['reason','riza','laxmi']
const capitalize=lodash.map(names,lodash.capitalize)

// npm start
console.log(capitalize)
