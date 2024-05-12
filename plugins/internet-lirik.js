require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'lirik|lyrics',
limit: true,
desc: 'get lyrics of anysong',
type: 'Internet'
}, async (m, command, Satzz) => {
if (!m.query) return m.reply(`mau nyari lagu apa Jirlah, contoh nih: .lirik Pergi Tak meninggalkan`)
let res = await Scraper.lyricsv2(m.query);
let teks =`
ℹ️ TITLE: ${res.title}
👑 AUTHOR: ${res.author}
📌 LYRICS: ${res.lyrics}
`
m.reply(teks)
})