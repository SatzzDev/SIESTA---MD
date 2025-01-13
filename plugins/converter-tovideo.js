require('../config')
const { Siesta } = require('../lib/command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Siesta({
command: '^tovideo$',
alias: 'tovid',
limit: true,
desc: 'sticker to image',
type: 'Pengonversi'
}, async (m, {conn, command}) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q} = m
let medias = await conn.downloadAndSaveMediaMessage(qmsg);
let ran = await webp2mp4File(medias);
conn.sendMessage(m.chat, { video: await getBuffer(ran.result) }, { quoted: m });
})