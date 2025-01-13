require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: 'tebakkalimat',
alias: 'tebakkalimat',
desc: 'Game Tebak Kalimat',
type: 'Game'
}, async (m, {conn, reply, command, freply}) => {
let timeout = 120000
let id = m.chat
if (id in conn.tebakkalimat) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/master/games/tebakkalimat.json')
let json = src.result[Math.floor(Math.random() * src.result.length)]    
let teks = `*Soal :* ${json.deskripsi}\n\nTimeout *${(timeout / 1000).toFixed(2)} detik*\nBonus : +5 Limit`.trim()
conn.tebakkalimat[id] = [
freply(teks),
json,
setTimeout(() => {
if (conn.tebakkalimat[id])
freply('Waktu game telah habis', `Jawabannya adalah : ${json.jawaban}`)
delete conn.tebakkalimat[id]
}, timeout)
]
})