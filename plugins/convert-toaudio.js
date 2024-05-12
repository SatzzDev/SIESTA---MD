require('../config')
const { Cmd } = require('../command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Cmd({
pattern: 'tomp3|toaud|toaudio',
limit: true,
desc: 'video to audio',
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
let { toAudio } = require("../lib/converter");
let audio = await toAudio(media, "mp4");
let buffer = Buffer.from(audio)
let tags = { title: q, artist: `${global.author}`, album: 'SIESTA - MD', APIC: './media/thumb.jpg', year: 2024 }
let success = NodeID3.write(tags, buffer);
await Satzz.sendMessage(m.chat, { audio: success, mimetype: "audio/mpeg" },{ quoted: m }); 
})