require('../config')
const { Cmd } = require('../command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Cmd({
pattern: 'swm',
limit: true,
desc: 'sticker with custom watermark',
type: 'Converter'
}, async (m, command, Satzz) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q} = m
if (!q) return reply('input packname|author')
if (!/webp/.test(mime)) return m.reply(`Reply sticker dengan caption *${prefix + command}*`);
try {
let { webp2mp4File } = require("../lib/uploader");
let medias = await Satzz.downloadAndSaveMediaMessage(qmsg);
let ran = await webp2mp4File(medias);
Satzz.sendVideoAsSticker(m.chat, ran.result, m, {
packname: q.split('|')[0],
author: q.split('|')[1],
});
} catch {
let media = await Satzz.downloadAndSaveMediaMessage(qmsg);
let ran = await getRandom(".png");
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
let buffer = fs.readFileSync(ran);
Satzz.sendImageAsSticker(m.chat, buffer, m, {
packname: q.split('|')[0],
author: q.split('|')[1],
});
});
}
})