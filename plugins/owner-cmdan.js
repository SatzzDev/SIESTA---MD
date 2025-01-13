const { Siesta } = require("../lib/command")

Siesta({
command: "^setcmd$",
alias: 'setcmd',
onlyPrem:true,
type:"Pemilik"
}, async (m, {conn, command, text}) => {
if (!m.quoted) throw 'Reply Pesan!'
if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
if (!text) throw `Untuk Command Apa?`
let hash = m.quoted.fileSha256.toString('base64')
if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) throw 'You have no permission to change this sticker command'
global.db.data.sticker[hash] = {
text,
mentionedJid: m.mentionedJid,
creator: m.sender,
at: + new Date,
locked: false,
}
m.reply(`Done!`)
})

Siesta({
command: "^delcmd$",
alias: 'delcmd',
type: "Pemilik",
onlyPrem: true
}, async(m, {conn, text}) => {
let hash = m.quoted.fileSha256.toString('base64')
if (!hash) throw `Tidak ada hash`
if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) throw 'You have no permission to delete this sticker command'              
delete global.db.data.sticker[hash]
m.reply(`Done!`)
})

Siesta({
command: "^listcmd$",
alias: 'listcmd',
type: "Pemilik",
onlyPrem: true
}, async(m, {conn, text}) => {
m.reply(`
*List Cmd*
${Object.entries(global.db.data.sticker).map(([key, value], index) => `> ${index + 1}. ${value.text}`).join('\n')}
`)
})