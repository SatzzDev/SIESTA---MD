require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'chord',
limit: true,
desc: 'get chord of anysong',
type: 'Internet'
}, async (m, command, Satzz) => {
if (!m.query) return m.reply(`mau nyari chord lagu apa Jirlah, contoh nih: .chord Pergi Tak meninggalkan`)
let res = await fetchJson(`https://aemt.me/chord?query=${m.query}`)
m.reply(`*\`C H O R D\`*\n\n${res.result.chord}\n`)
})