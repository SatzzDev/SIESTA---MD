/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
"use strict";
const{ createRequire } = require('module')
const moment = require("moment-timezone")
const cluster = require('cluster')
const { join, dirname } = require('path')
const fs = require('fs')
const{ createServer } = require("http")
const{ Server } = require("socket.io")
const Readline = require('readline')
const yargs = require('yargs/yargs')
const rl = Readline.createInterface(process.stdin, process.stdout)

const { fileURLToPath } = require('url')

var isRunning = false
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
if (isRunning) return
isRunning = true
let args = [join(__dirname, file), ...process.argv.slice(2)]
/*  CFonts.say([process.argv[0], ...args].join(' '), {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
})*/
cluster.setupMaster({
exec: join(__dirname, file),
args: args.slice(1),
})
let p = cluster.fork()
p.on('message', data => {
console.log('[RECEIVED]', data)
switch (data) {
case 'reset':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'null':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'SIGKILL':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'uptime':
p.send(process.uptime())
break
}
})
p.on('exit', (_, code) => {
if(code == null) process.exit()
isRunning = false
console.error('Exited with code:', code)

if (code === 0) return
fs.watchFile(args[0], () => {
fs.unwatchFile(args[0])
start(file)
})
})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test'])
if (!rl.listenerCount()) rl.on('line', line => {
p.emit('message', line.trim())
})
// console.log(p)
}

start('main.js')


