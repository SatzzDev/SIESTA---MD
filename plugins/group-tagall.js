require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^tagall$',
alias: 'tagall',
onlyGroup: true,
onlyAdmins: true,
desc: 'tag semua anggota dengan pesan',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch((e) => { }) : ""; 
const groupName = groupMetadata.subject
const participants = m.isGroup ? await groupMetadata.participants : "";
let teks = `══✪〘 *👥 Tag All* 〙✪══\n
➲ *Pesan : ${q ? q : "empty"}*\n\n`;
for (let mem of participants) {
teks += `⭔ @${mem.id.split("@")[0]}\n`;
}
conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) },{ quoted: m });
})