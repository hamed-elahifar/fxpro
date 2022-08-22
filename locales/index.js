let data    = {}
    data.fa = require('./fa')
    data.en = require('./en')

module.exports = translate = (msg,lang='en') => {
    
    if (!msg) return

    return data?.[lang]?.[msg] || msg

}