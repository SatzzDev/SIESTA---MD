require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: 'tebakgambar',
alias: 'tebakgambar',
desc: 'Tebak Gambar Game',
type: 'Game'
}, async (m, {conn, reply, command, freply}) => {
let timeout = 120000
let id = m.chat
if (id in conn.tebakgambar) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/master/games/tebakgambar.json')
let json = src.result[Math.floor(Math.random() * src.result.length)]    
let teks = `*Soal :* ${json.deskripsi}\n\nTimeout *${(timeout / 1000).toFixed(2)} detik*\nBonus : +5 Limit`.trim()
conn.tebakgambar[id] = [
conn.sendImage(m.chat, json.image, teks, m),
json,
setTimeout(() => {
if (conn.tebakgambar[id])
freply('Waktu game telah habis', `Jawabannya adalah : ${json.jawaban}`)
delete conn.tebakgambar[id]
}, timeout)
]
})