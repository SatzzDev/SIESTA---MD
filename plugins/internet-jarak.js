require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")

Cmd({
pattern: '^jarak$',
limit: true,
desc: 'get Infromation Of jarak',
type: 'Internet'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply(`Dari Mana Kemana Jirlah, contoh nih: .jarak Pekanbaru-Jakarta`)
let res = await fetchJson(`https://aemt.me/jarak?dari=${q.split('-')[0]}&ke=${q.split('-')[1]}`)
Satzz.sendMessage(m.chat, {image: await getBuffer(res.url.data), caption: `*\`J A R A K\`*\n\n\`INFO\`\n${res.url.desc}\n`},{quoted:m})
})