require('../config')
const { Cmd } = require('../command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Cmd({
pattern: 'toptt|tovn',
limit: true,
desc: 'video/audio to voice note',
type: 'Converter'
}, async (m, command, Satzz) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q} = m
if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Kirim/Reply Video/Audio Yang Ingin DijaSatzzn Audio Dengan Caption ${prefix + command
}`);
if (!q) return reply(`masukan nama audio!, contoh : .${command} kretek"`)
const NodeID3 = require('node-id3');
let media = await Satzz.downloadMediaMessage(qmsg);
let { toPTT } = require("../lib/converter");
let audio = await toPTT(media, "mp4");
Satzz.sendMessage(m.chat, {audio: audio, ptt: true, waveform: new Uint8Array(64), mimetype: "audio/ogg; codecs=opus", },{ quoted: m }) 
})