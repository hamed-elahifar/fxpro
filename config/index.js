
const fs        = require('fs');
const {join}    = require('path');
const unflatten = require('flat').unflatten


let data,fileData,envData = {}

if (fs.existsSync(join(__dirname,global.environment+'.js'))){
    let path    = join(__dirname,global.environment+'.js')
    fileData    = require(path)
}

evaluate =   (str) => {
    str  =    str.trim()
    try {
        return JSON.parse(str)
    } catch {
        return    str.toLowerCase() == 'true'   ? true
                : str.toLowerCase() == 'false'  ? false
                : !isNaN(str)     ? +str   // if str is a number
                : str == "''"     ? ''
                : str == '""'     ? ""
                : str
    }
}

let ENV = process.env
for (let item in ENV) {
    Object.assign(envData,{
        [item]:evaluate(process.env[item])
    })
}

data = Object.assign(fileData,envData)
data = unflatten(data)

module.exports = getConfig = arg => {
    return _.get(data, arg)
}
