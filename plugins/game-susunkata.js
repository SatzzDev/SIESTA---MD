require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: 'susunkata',
alias: 'susunkata',
desc: 'Tebak Gambar Game',
type: 'Game'
}, async (m, {conn, reply, command, freply}) => {
let timeout = 120000
let id = m.chat
if (id in conn.susunkata) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/master/games/susunkata.json')
let json = src.result[Math.floor(Math.random() * src.result.length)]    
let teks = `*Soal :* ${json.soal}\n*Tipe :* ${json.tipe}\n\nTimeout *${(timeout / 1000).toFixed(2)} detik*\nBonus : +5 Limit`.trim()
conn.susunkata[id] = [
freply(teks),
json,
setTimeout(() => {
if (conn.susunkata[id])
freply('Waktu game telah habis', `Jawabannya adalah : ${json.jawaban}`)
delete conn.susunkata[id]
}, timeout)
]
})