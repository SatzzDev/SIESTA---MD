require('../config')
const { Cmd } = require('../command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Cmd({
pattern: 'tovid|tovideo',
limit: true,
desc: 'sticker to image',
type: 'Converter'
}, async (m, command, Satzz) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q} = m
let medias = await Satzz.downloadAndSaveMediaMessage(qmsg);
let ran = await webp2mp4File(medias);
Satzz.sendMessage(m.chat, { video: await getBuffer(ran.result) }, { quoted: m });
})