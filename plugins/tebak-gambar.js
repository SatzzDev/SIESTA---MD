require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'tebakgambar',
onlyGroup: true,
glimit: true,
desc: 'Tebak Gambar Game',
type: 'Game'
}, async (m, command, Satzz) => {
let {reply,q} = m
let timeout = 120000
let id = m.chat
if (id in Satzz.tebakgambar) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
let json = src[Math.floor(Math.random() * src.length)]
let kentir = await getBuffer(json)       
let teks = `*Soal :* ${json.deskripsi}\n\nTimeout *${(timeout / 1000).toFixed(2)} detik*\nBonus : +500 Balance`.trim()
Satzz.tebakgambar[id] = [
Satzz.sendImage(m.chat, json.img , teks, m),
json,
setTimeout(() => {
if (Satzz.tebakgambar[id])
Satzz.sendButtons(m.chat, 'Waktu game telah habis', `Jawabannya adalah : ${json.jawaban}`, global.author, [{type:'btn', text:ttle('PLAY - AGAIN'), id:'.tebakgambar'}], m)
delete Satzz.tebakgambar[id]
}, timeout)
]
})