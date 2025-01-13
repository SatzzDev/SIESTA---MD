require('../config')
const { Siesta } = require('../lib/command.js');
const axios = require('axios')
const {UploadFileUgu,uploadToTop4Top } = require("../lib/uploader");
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const imgbbUploader = require('imgbb-uploader');
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Siesta({
command: '^(smeme|stickermeme)$',
limit: true,
desc: 'sticker meme maker',
type: 'Stiker'
}, async (m, {conn, command}) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q, reply} = m
if (!q) return reply(`Balas Image Dengan Caption ${command}`);
if (!quoted) return reply(`Balas Image Dengan Caption ${command}`);
if (/webp/.test(mime)) return reply('Bukan Stiker Kontol')
if (/image/.test(mime)) {
mee = await conn.downloadAndSaveMediaMessage(quoted);
mem = await imgbbUploader({apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', imagePath: mee,expiration: 600})
let kaytid 
if (q.includes("|")) {
kaytid = await getBuffer(`https://api.memegen.link/images/custom/${q.split("|")[0]}/${q.split("|")[1]}.png?background=${mem.url}`);
} else kaytid = await getBuffer(`https://api.memegen.link/images/custom/-/${q}.png?background=${mem.url}`);
conn.sendImageAsSticker(m.chat, kaytid, m, {packname: global.packname,author: global.author,isAvatar:true});
} else return reply("hanya bisa membuat smeme dari foto");
})