require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'tebakilmiah',
onlyGroup: true,
glimit: true,
desc: 'Tebak Ilmiah Game',
type: 'Game'
}, async (m, command, Satzz) => {
let {reply,q} = m
let poin = 1000
let timeout = 120000
let id = m.chat
if (id in Satzz.tebakilmiah) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/SatzzDev/Database/main/tebak-istilah.json')
let json = await pickRandom(src)
let caption = `*Soal :* ${json.question}\n\nTimeout *${(timeout / 1000).toFixed(2)} detik*\nBonus : +${poin} Balance`.trim()
await Satzz.sendButtons("6281316701742@s.whatsapp.net", `JAWABANYA ADALAH:`, `${json.answer}`, author, [{type:'copy',text:'Salin',id:json.answer}],m)
Satzz.tebakilmiah[id] = [
await reply(caption),
json, poin,
setTimeout(() => {
if (Satzz.tebakilmiah[id]) 
Satzz.sendButtons(m.chat, 'Waktu game telah habis', `Jawabannya adalah : ${json.answer}`, global.author, [{type:'btn', text:ttle('PLAY - AGAIN'), id:'.tebakilmiah'}], m)
delete Satzz.tebakilmiah[id]
}, timeout)
]
})