#! /usr/bin/env node

const importLocal = require('import-local')
const log = require('@toc-cli/log')

if (importLocal(__filename)) {
    log.info('cli', '正在使用 toc-cli 本地版本')
} else {
    require('../lib')(process.argv.slice(2))
}