require('../config')
const { Siesta } = require('../lib/command.js');
const fs = require("fs") 
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Siesta({
command: '^(s|stiker|sticker)$',
limit: true,
desc: 'video/image to sticker',
type: 'Stiker'
}, async (m, {conn, command}) => {
let {reply} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (/image/.test(mime)) {
let media = await conn.downloadMediaMessage(qmsg);
conn.sendImageAsSticker(m.chat, media, m, {pack: global.packname, author: global.author});
} else if (/video/.test(mime)) {
let media = await conn.downloadMediaMessage(qmsg);
let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {packname: global.packname, author: global.author});
await fs.unlinkSync(encmedia);
} else reply(`Kirim/reply gambar/video/gif dengan caption ${command}\nDurasi Video/Gif 1-9 Detik`);
})