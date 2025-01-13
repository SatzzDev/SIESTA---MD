require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^del|delete$',
alias: 'delete',
onlyAdmins: true,
desc: 'Menghapus Pesan',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply} = m
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : ""
if (!users) return reply("Reply pesan")
if (users == conn.user.id) {
m.quoted.delete()
} else if (users !== conn.user.id){
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: users } })
} 
conn.sendMessage(m.chat, { delete: m.key  })
})