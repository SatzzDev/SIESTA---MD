require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'emojimix',
limit: true,
desc: 'EmojiMix',
type: 'Converter'
}, async (m, command, Satzz) => {
const {q} = m
if (!q) return m.reply('text?')
let [emoji1, emoji2] = q.split`+`;
if (!emoji1) throw `Example : ${prefix + command} 😅+🤔`;
if (!emoji2) throw `Example : ${prefix + command} 😅+🤔`;
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
for (let res of anu.results) {
await Satzz.sendImageAsSticker(m.chat, res.url, m, {packname: global.packname,author: global.author, ios_app_store_link: "https://wa.me/6281316701742", android_play_store_link : "https://wa.me/6281316701742"});
}
})