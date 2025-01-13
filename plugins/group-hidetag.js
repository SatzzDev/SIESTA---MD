const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
Siesta({
command: '^(h|hidetag)$',
alias: 'hidetag',
onlyGroup: true,
onlyAdmins: true,
desc: 'Hidetag',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch((e) => { }) : ""; 
const groupName = groupMetadata.subject
const participants = m.isGroup ? await groupMetadata.participants : "";
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
if (!isAdmins) return reply("lu siapa kocak?")

conn.sendMessage(m.chat, {
text: "@" + m.chat, 
contextInfo:{
mentionedJid: participants.map((a) => a.id),
groupMentions:[{
groupJid:m.chat,
groupSubject: q ? q : m.quoted ? m.quoted.text : ""
}]
} },{ quoted: m });
})