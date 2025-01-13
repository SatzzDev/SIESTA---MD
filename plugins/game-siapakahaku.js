require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^siapakahaku$',
alias: 'siapakahaku',
desc: '',
type: 'Game'
}, async (m, {conn, reply, command, freply}) => {
let timeout = 120000
let id = m.chat
if (id in conn.siapakahaku) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/refs/heads/master/games/siapakahaku.json')
let json = src.result[Math.floor(Math.random() * src.result.length)]      
let teks = `${json.soal}\nSiapakah Aku?`
conn.siapakahaku[id] = [
freply(teks),
json,
setTimeout(() => {
if (conn.siapakahaku[id])
freply('Waktu game telah habis', `Jawabannya adalah : ${json.jawaban}`)
delete conn.siapakahaku[id]
}, timeout)
]
})