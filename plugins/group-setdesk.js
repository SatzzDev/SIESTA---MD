require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^setdes(c|k)$',
alias: 'setdesc',
onlyGroup: true,
onlyAdmins: true,
desc: 'Mengubah Deskripsi',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m
if (!q) return reply("Text ?");
await conn.groupUpdateDescription(m.chat, q).then((res) => reply('done')).catch((err) => reply("error"));
})