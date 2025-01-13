require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^tebakheroml$',
alias: 'tebakheroml',
desc: 'Game Tebak Hero Mobile Legends',
type: 'Game'
}, async (m, {conn, reply, command, freply}) => {
let timeout = 120000
let id = m.chat
if (id in conn.tebakheroml) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/KurniawanSatria/database/refs/heads/main/tebakheroml.json')
let json = src.heroes[Math.floor(Math.random() * src.heroes.length)]    
let aud = json.audio[Math.floor(Math.random() * json.audio.length)]
let keyS = await conn.sendMessage(m.chat, {audio: {url: aud.audio}, ptt:true, mimetype:'audio/mpeg'},{quoted:m})
conn.tebakheroml[id] = [
conn.sendMessage(m.chat, {text:`Coba tebak hero ini! Hero ini memiliki role *${json.role}*, biasanya dimainkan di *${json.lane}*, dan berasal dari negara *${json.region}*.`},{quoted:keyS}),
json,
setTimeout(() => {
if (conn.tebakheroml[id])
freply('Waktu game telah habis', `Nama Heronya adalah : ${json.name}`)
delete conn.tebakheroml[id]
}, timeout)
]
})