const { Siesta } = require("../lib/command.js");
const { fetchJson } = require("../lib/myfunc");
const fetch = require("node-fetch")
const axios = require('axios')

Siesta({
command: "^lirik$",
alias: 'lirik',
limit: true,
type: "Pencarian",
},
async (m, { conn, command, text, reply, react}) => {
if (!text) return reply('usage example: .' + command + ' a year ago')
await react('⏳')
let response = await axios.get(`https://api.deezer.com/search?limit=15&q=${text}`)
let allResult = response.data.data.map((res, index) => {
return [res.artist.name + ' - ' + res.title, `.getlyric ${res.artist.name}|${res.title}`];
});
await conn.sendListMsg(m.chat, 'Hasil Pencarian: ' + text, '', global.author, 'Klik Disini', 'Result', 'Best Match', allResult, m);
await react('🎉')
})

Siesta({
command: '^getlyric$',
},
async (m, { conn, command, text, reply, react}) => {
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.sender } })
await react('⏳')
var [artist,title] = text.split('|')
var url = 'https://api.satzzdev.xyz/api/lirik?artist=' + encodeURI(artist) + '&title=' + encodeURI(title)
fetch(url).then(response => response.json().then(r => m.reply(r.lyrics))).catch(error => {console.error('Error:', error);});
await react('🎉')
})