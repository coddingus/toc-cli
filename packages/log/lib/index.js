'use strict';
const log = require('npmlog')
console.log( process.env.LOG_LEVEL)
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'
log.heading ='toc-cli'
// log.headingStyle = {fg: 'black', bg:'white'}
log.addLevel('success', 2000, {
    fg: 'green',
    bold: true
})

module.exports = log