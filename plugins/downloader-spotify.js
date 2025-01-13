const { Siesta } = require('../lib/command.js');
const {fetchJson,getBuffer} = require("../lib/myfunc")
const agent = require('fake-useragent')

Siesta({
command: '^spotify|spotifydl$',
alias: 'spotifydl',
limit: true,
desc: 'to Download Audio From Spotify',
type: 'Pengunduh'
}, async (m, {conn, command, text, reply}) => {
if (!text) return m.reply(`Penggunaan Salah! contoh penggunaan:\n .${command} https://spotify.com/xxxx`)
await reply(global.mess.wait)
let url = text
let res = await fetchJson('https://apii.satzzdev.xyz/api/spotifydl?url='+url)
await conn.sendMessage(m.chat, {
audio:await getBuffer(res.download), 
fileName:res.title + '.mp3',
mimetype:'audio/mp4', 
ptt:false
},{quoted:m})  
});