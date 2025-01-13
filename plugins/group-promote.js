require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^promote$',
alias: 'promote',
onlyGroup: true,
onlyAdmins: true,
desc: 'Menaikan Jabatan Anggota',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [q.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
await conn.groupParticipantsUpdate(m.chat, users, "promote").then((res) => reply("done")).catch((err) => reply("error"));
})