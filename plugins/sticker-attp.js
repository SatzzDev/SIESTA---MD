require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: 'attp',
limit: true,
desc: 'text To Picture',
type: 'Stiker'
}, async (m, {conn, command}) => {
const {q} = m
if (!q) return m.reply('text?')
conn.sendVideoAsSticker(m.chat, `https://aemt.me/attp?text=${q}`, m, { packname: global.packname, author: global.author })
})