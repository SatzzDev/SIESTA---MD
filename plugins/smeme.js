require('../config')
const { Cmd } = require('../command.js');
const axios = require('axios')
const { uptotelegra } = require("../lib/uploader");
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Cmd({
pattern: '^(smeme|stickermeme)$',
limit: true,
desc: 'sticker meme maker',
type: 'Converter'
}, async (m, command, Satzz) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q, reply} = m
if (!q) return reply(`Balas Image Dengan Caption ${command}`);
if (!quoted) return reply(`Balas Image Dengan Caption ${command}`);
if (/webp/.test(mime)) return reply('Bukan Stiker Kontol')
if (/image/.test(mime)) {
mee = await Satzz.downloadAndSaveMediaMessage(quoted);
mem = await uptotelegra(mee);
let kaytid 
if (q.includes("|")) {
kaytid = await getBuffer(`https://api.memegen.link/images/custom/${q.split("|")[0]}/${q.split("|")[1]}.png?background=${mem}`);
} else kaytid = await getBuffer(`https://api.memegen.link/images/custom/-/${q}.png?background=${mem}`);
Satzz.sendImageAsSticker(m.chat, kaytid, m, {packname: global.packname,author: global.author,isAvatar:true});
} else return reply("hanya bisa membuat smeme dari foto");
})