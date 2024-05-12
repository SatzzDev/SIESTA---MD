require('../config')
const { Cmd } = require('../command.js');
const { fetchJson, pickRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'siapakahaku|whoami',
onlyGroup: true,
glimit: true,
desc: 'Who am i Game',
type: 'Game'
}, async (m, command, Satzz) => {
let {reply,q} = m
let poin = 1000
let timeout = 120000
let id = m.chat
if (id in Satzz.siapakahaku) return reply('Masih ada soal belum terjawab di chat ini')
let src = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/master/games/siapakahaku.json')
let json = await pickRandom(src.result)
let caption = `*Soal :* ${json.soal}\n\nTimeout *${(timeout / 1000).toFixed(2)} detik*\nBonus : +${poin} Balance`.trim()
await Satzz.sendButtons("6281316701742@s.whatsapp.net", `JAWABANYA ADALAH:`, `${json.jawaban}`, author, [{type:'copy',text:'Salin',id:json.jawaban}],m)
Satzz.siapakahaku[id] = [
await reply(caption),
json, poin,
setTimeout(() => {
if (Satzz.siapakahaku[id]) 
Satzz.sendButtons(m.chat, 'Waktu game telah habis', `Jawabannya adalah : ${json.jawaban}`, global.author, [{type:'btn', text:ttle('PLAY - AGAIN'), id:'.siapakahaku'}], m)
delete Satzz.siapakahaku[id]
}, timeout)
]
})