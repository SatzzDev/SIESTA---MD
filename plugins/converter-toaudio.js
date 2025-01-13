require('../config')
const { Siesta } = require('../lib/command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Siesta({
command: '^tomp3|toaud$',
limit: true,
alias: 'toaudio',
desc: 'video to audio',
type: 'Pengonversi'
}, async (m, {conn, command, reply, qmsg, text, mime}) => {
if (!m.quoted) return reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption .${command
}`);
let media = await conn.downloadMediaMessage(qmsg);
let { toAudio } = require("../lib/converter");
let audio = await toAudio(media, "mp4");
await conn.sendMessage(m.chat, { audio: audio, mimetype: "audio/mpeg" },{ quoted: m }); 
})