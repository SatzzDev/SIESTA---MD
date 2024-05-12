"use strict"
const  { default: makeWASocket,
Browsers,
DisconnectReason,
fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const { Boom } = require('@hapi/boom')
const spin = require('spinnies')
const CFonts = require('cfonts')

const { spawn } = require('child_process');

const spinnies = new spin();
const spinner = { 
  "interval": 120,
  "frames": [
"✖ [░░░░░░░░░░░░░░░]",
"✖ [■░░░░░░░░░░░░░░]",
"✖ [■■░░░░░░░░░░░░░]",
"✖ [■■■░░░░░░░░░░░░]",
"✖ [■■■■░░░░░░░░░░░]",
"✖ [■■■■■░░░░░░░░░░]",
"✖ [■■■■■■░░░░░░░░░]",
"✖ [■■■■■■■░░░░░░░░]",
"✖ [■■■■■■■■░░░░░░░]",
"✖ [■■■■■■■■■░░░░░░]",
"✖ [■■■■■■■■■■░░░░░]",
"✖ [■■■■■■■■■■■░░░░]",
"✖ [■■■■■■■■■■■■░░░]",
"✖ [■■■■■■■■■■■■■░░]",
"✖ [■■■■■■■■■■■■■■░]",
"✖ [■■■■■■■■■■■■■■■]"
  ]}
let globalSpinner;
const getGlobalSpinner = (disableSpins = false) => {
if(!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
return globalSpinner;
}
let spins = getGlobalSpinner(false)
  
  
const start = (id, text) => {
spins.add(id, {text: text})
}
const success = (id, text) => {
spins.succeed(id, {text: text})
}



const connectionUpdate = async(connectToWhatsApp, conn, update) => {
const {connection, lastDisconnect,receivedPendingNotifications,isNewLogin,qr } = update
const  reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (connection === 'close') {
console.log(chalk.red(lastDisconnect.error));
if (lastDisconnect.error == "Error: Stream Errored (unknown)"){
process.send('reset')
} else if (reason === DisconnectReason.badSession) { 
console.log(`Bad Session File, Please Delete Session and Scan Again`); 
process.send('reset')
} else if (reason === DisconnectReason.connectionClosed) { 
console.log("[SYSTEM]",chalk.red('Connection closed, reconnecting...')); 
process.send('reset')
} else if (reason === DisconnectReason.connectionLost) { 
console.log(chalk.red("[SYSTEM]", "white"), chalk.green('Connection lost, trying to reconnect'));
process.send('reset')
} else if (reason === DisconnectReason.connectionReplaced) { 
console.log(chalk.red("Connection Replaced, Another New Session Opened, Please Close Current Session First"));
conn.logout(); 
} else if (reason === DisconnectReason.loggedOut) { 
console.log(chalk.red(`Device Logged Out, Please Scan Again And Run.`)); 
conn.logout(); 
} else if (reason === DisconnectReason.restartRequired) {
console.log("Restart Required, Restarting..."); 
connectToWhatsApp(); 
process.send('reset')
} else if (reason === DisconnectReason.timedOut) {
console.log(chalk.red("Connection TimedOut, Reconnecting..."));
connectToWhatsApp(); 
}
} else if (connection === 'connecting') {
console.log(chalk.magenta(`]─`),`「`,  chalk.red(`SIESTA - MD`), `」`,  chalk.magenta(`─[`))
start(`1`,`Connecting...`)
} else if (connection === 'open') { 
success(`1`,`[■■■■■■■■■■■■■■■] Connected`) 
}
}

module.exports = {connectionUpdate}