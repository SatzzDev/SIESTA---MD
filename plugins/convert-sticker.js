require('../config')
const { Cmd } = require('../command.js');
const fs = require("fs") 
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Cmd({
pattern: '^(s|stiker|sticker)$',
limit: true,
desc: 'video/image to sticker',
type: 'Converter'
}, async (m, command, Satzz) => {
let {reply} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (/image/.test(mime)) {
let media = await Satzz.downloadMediaMessage(qmsg);
Satzz.sendImageAsSticker(m.chat, media, m, {pack: global.packname, author: global.author});
} else if (/video/.test(mime)) {
let media = await Satzz.downloadMediaMessage(qmsg);
let encmedia = await Satzz.sendVideoAsSticker(m.chat, media, m, {pack: global.packname, author: global.author});
await fs.unlinkSync(encmedia);
} else reply(`Kirim/reply gambar/video/gif dengan caption ${command}\nDurasi Video/Gif 1-9 Detik`);
})