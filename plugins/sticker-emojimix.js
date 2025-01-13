require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: 'emojimix',
limit: true,
desc: 'EmojiMix',
type: 'Stiker'
}, async (m, {conn, command}) => {
const {q} = m
if (!q) return m.reply('text?')
let [emoji1, emoji2] = q.split`+`;
if (!emoji1) throw `tolol!, Example : ${command} 😅+🤔`;
if (!emoji2) throw `tolol! Example : ${command} 😅+🤔`;
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
for (let res of anu.results) {
await conn.sendImageAsSticker(m.chat, res.url, m, {packname: global.packname,author: global.author, ios_app_store_link: "https://wa.me/6281316701742", android_play_store_link : "https://wa.me/6281316701742"});
}
})