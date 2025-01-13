require('../config')
const { Siesta } = require('../lib/command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Siesta({
command: '^togif$',
alias: 'togif',
limit: true,
desc: 'video to gif',
type: 'Pengonversi'
}, async (m, {conn, command}) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q} = m
if (!/webp/.test(mime)) return m.reply(`Reply stiker dengan caption *${prefix + command}*`);
let { webp2mp4File } = require("../lib/uploader");
let media = await conn.downloadAndSaveMediaMessage(qmsg);
let webpToMp4 = await webp2mp4File(media);
await conn.sendMessage(m.chat, { video: {url: webpToMp4.result, caption: "Convert Webp To Video",streamingSidecar: new Uint8Array(300),},gifPlayback: true,},{ quoted: m});
})