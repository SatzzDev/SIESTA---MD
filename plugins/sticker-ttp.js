require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: 'ttp',
limit: true,
desc: 'text To Picture',
type: 'Stiker'
}, async (m, {conn, command}) => {
const {q} = m
if (!q) return m.reply('text?')
conn.sendImageAsSticker(m.chat, `https://aemt.me/ttp?text=${q}`, m, { packname: global.packname, author: global.author })
})