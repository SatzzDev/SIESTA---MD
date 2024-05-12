require("../config")
const { Cmd, commands } = require('../command.js');
const { clockString } = require('../lib/myfunc');
const {ftxt} = require("../lib/scrapes")

Cmd({
pattern: '^menu$',
type: 'Info'
}, async (m, command, Satzz) => {
const botRun = global.db.data.database['runtime']
const botTime = (new Date - botRun.runtime) || "Tidak terdeteksi"
const runTime = clockString(botTime)
let {reply} = m
let msg = `╭━━━〔 ${ftxt("SIESTA - MD")} ⁩〕━━━┈⊷
┃✵╭──────────────
┃✵│ Library : @whiskeysockets/baileys
┃✵│ Plugins : ${commands.length}
┃✵│ Runtime : ${runTime}
┃✵│ Owner : @6281316701742
┃✵│ Mode : Public
┃✵│ Version : 6.7.1
┃✵╰──────────────
╰━━━━━━━━━━━━━━━┈⊷`
await Satzz.sendbutGif(m.chat, '', msg, author, [{type:'url', text:'Group WhatsApp', id:sgc},{type:'btn',text:'ALL MENU',id:'.allmenu'}], m,{video: 'https://github.com/SatzzDev/Database/raw/main/UPLOAD%20WITH%20NODEJS/AMV%20SIESTA.mp4'})
//await reply(msg);
});



Cmd({
pattern: '^allmenu$',
type: 'Info'
}, async (m, command, Satzz) => {
let {reply} = m
let PREFIX = '^[.,!]'
const commandslist = {}
commands.map(async (command, index) => {
if (command.dontAddCommandList === false && command.pattern !== undefined) {
try {
var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/);
var mmatch = command.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2]
} catch { var match = [command.pattern] }
var HANDLER = '';
if (/\[(\W*)\]/.test(PREFIX)) { HANDLER = PREFIX.match(/\[(\W*)\]/)[1][0] } else { HANDLER = '.' }
if (!commandslist[command.type]) commandslist[command.type] = []
commandslist[command.type].push((match.length >= 3 ? (HANDLER + mmatch) : command.pattern).trim())
}
})
let msg = '\n\n\n'
for (const command in commandslist) {
msg += `${ftxt('乂 ' + command.toUpperCase())}\n`
for (const plugin of commandslist[command]) {
msg += `> ◦➛ \`\`\`${plugin.toLowerCase()}\`\`\`\n`
}
msg += '> ________________________________'
msg += '\n\n\n'
}
await Satzz.sendButtons(m.chat, '_*`[ ALL MENU ]`*_', msg, author, [{type:'url', text:'Group WhatsApp', id:sgc},{type:'btn',text:'OWNER',id:'.owner'}], m)
//Satzz.sendbuttons(m.chat, '', msg, author, [{type:'url', text:'Group WhatsApp', id:sgc},{type:'btn',text:'OWNER',id:'.owner'}], m)
//await reply(msg);
});