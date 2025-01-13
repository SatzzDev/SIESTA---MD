require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^totag$',
alias: 'totag',
onlyGroup: true,
onlyAdmins: true,
desc: 'Menjadikan Pesan Apapun Sebagai Pengumuman',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m
const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch((e) => { }) : ""; 
const groupName = groupMetadata.subject
const participants = m.isGroup ? await groupMetadata.participants : "";
if (!m.quoted) return reply(`Reply pesan dengan caption ${command}`);
conn.sendMessage(m.chat, {forward: m.quoted.fakeObj, mentions: participants.map((a) => a.id)});
})