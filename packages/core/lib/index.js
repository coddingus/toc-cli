'use strict';

const semver = require('semver')
const colors = require('colors/safe')
const pkg = require('../package.json')
const log = require('@toc-cli/log')
const constant = require('./const')
const pathExists = require('path-exists').sync;
const path = require('path');
const userHome = require('os').homedir()

function checkPkgVersion() {
    log.notice('cli', pkg.version)
}

function checkNodeVersion() {
    // 获取当前版本号
    log.info(process.version)
    const currentVersion = process.version
    // 比对版本号
    const lowsest = constant.LOWEST_NODE_VERSION
    console.log(currentVersion, lowsest)
    if (semver.lt(currentVersion, lowsest)) {
        throw new Error(colors.red(`需要安装的${lowsest}以上的版本`))
    }
}

function checkRoot() {
    if (process.getegid) {
        const rootCheck = require('root-check')
        rootCheck()
        console.log(process.getegid())
    }
}

function checkUserhome() {
    if (!userHome || !pathExists(userHome)) {
        throw new Error('用户主目录不存在')
    }
}

function checkInputArgs() {
    const minimist = require('minimist')
    const args = minimist(process.argv.slice(2))
    let level
    if (args.debug) {
        level = 'verbose'
    } else {
        level = 'info'
    }
    process.env.LOG_LEVEL = level
    log.level = process.env.LOG_LEVEL
}

function checkEnv() {
    const dotenv = require('dotenv')
    const dotPath = path.resolve(userHome, '.env')
    let config
    if(pathExists(dotPath)){
        config = dotenv.config({
            path: dotPath
        })
    }else{
        config = createDefaultConfig()
    }
    
    log.verbose('环境变量', config)
}
function  createDefaultConfig() {
    
}
function core() {
    // TODO
    try {
        checkInputArgs()
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
        checkUserhome()
        checkEnv()
        log.verbose('debug', 'test debug log')
    } catch (e) {
        log.error(e.message)
    }
}

module.exports = core;