require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'attp',
limit: true,
desc: 'text To Picture',
type: 'Converter'
}, async (m, command, Satzz) => {
const {q} = m
if (!q) return m.reply('text?')
Satzz.sendVideoAsSticker(m.chat, `https://aemt.me/attp?text=${q}`, m, { packname: global.packname, author: global.author })
})