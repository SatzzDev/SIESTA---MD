require('../config')
const { Siesta } = require('../lib/command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')
const { exec } = require("child_process");
let { webp2mp4File } = require("../lib/uploader");

Siesta({
command: '^toptt|tovn$',
alias: 'tovn',
limit: true,
desc: 'video/audio to voice note',
type: 'Pengonversi'
}, async (m, {conn, command, reply, qmsg, quoted, mime, text}) => {
let media = await conn.downloadMediaMessage(qmsg);
let { toPTT } = require("../lib/converter");
let audio = await toPTT(media, "mp4");
conn.sendMessage(m.chat, {audio: audio, ptt: true, waveform: new Uint8Array(64), mimetype: "audio/ogg; codecs=opus", },{ quoted: m }) 
})