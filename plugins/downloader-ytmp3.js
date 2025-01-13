const { Siesta } = require('../lib/command.js');
const { getBuffer, getRandom, fetchJson } = require("../lib/myfunc")
//const { ytmp3 } = require('ruhend-scraper')


Siesta({
command: 'ytmp3|ytaudio',
alias: 'ytmp3',
limit: true,
desc: 'to Download Audio From Youtube',
type: 'Pengunduh'
}, async (m, {conn, command, text, reply}) => {
if (m.quoted && m.quoted.fromMe) {
m.quoted.delete()
}
if (!text) return reply(`Example : .${command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
if (!text.startsWith('https://')) return reply('itu bukan link kak, kalau mau nyari dan download musik make .play')
await reply(global.mess.wait)
let url = text
const res = await fetchJson('https://apii.satzzdev.xyz/api/ytmp3?url=' + url);  
conn.sendMessage(m.chat, { audio: {url:res.download.url}, ptt: false, mimetype: 'audio/mp4'}, { quoted: m });
})