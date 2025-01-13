require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^demote$',
alias: 'demote',
onlyGroup: true,
onlyAdmins: true,
desc: 'menurunkan jabatan admin',
type: 'Grup'
}, async (m, {conn, command, text}) => {
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
if (!users) return
await conn.groupParticipantsUpdate(m.chat, users, "demote").then((res) => m.reply("done")).catch((err) => m.reply("error"));
})