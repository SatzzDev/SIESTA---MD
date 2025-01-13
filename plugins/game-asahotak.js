require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^asahotak$',
alias: 'asahotak',
desc: 'Tebak Gambar Game',
type: 'Game'
}, async (m, {conn, reply, command, freply}) => {
let timeout = 120000
let id = m.chat
if (id in conn.asahotak) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/refs/heads/master/games/asahotak.json')
let json = src.result[Math.floor(Math.random() * src.result.length)]      
let teks = `*Soal :* ${json.soal}\n\nTimeout *${(timeout / 1000).toFixed(2)} detik*\nBonus : +5 Limit`.trim()
conn.asahotak[id] = [
freply(teks),
json,
setTimeout(() => {
if (conn.asahotak[id])
freply('Waktu game telah habis', `Jawabannya adalah : ${json.jawaban}`)
delete conn.asahotak[id]
}, timeout)
]
})