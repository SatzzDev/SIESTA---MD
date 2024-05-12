require('../config')
const fs = require('fs')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')




Cmd({
pattern: 'play|ytplay',
limit: true,
desc: 'play audio from youtube',
type: 'Downloader'
}, async (m, command, Satzz) => {
const NodeID3 = require('node-id3');
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const { toAudio } = require("../lib/converter");
let {reply,q} = m
if (!q) return reply(`Example : ${command} Patience - Take That`);
let search = await yts(`lagu ${q}`);
let anu = search.videos[0];
await Satzz.sendButtons(m.chat, ftxt("◉ YOUTUBE - PLAY ◉"), `\n${ftxt("◩ TITLE")}: ${anu.title}\n${ftxt("◩ DESC")}: ${anu.description}`, author, [{type:'url',text:'Buka Di Youtube', id: anu.url}],m,{img: anu.thumbnail})
let mp3File = getRandom(".mp3");
ytdl(anu.url, { filter: "audioonly" }).pipe(fs.createWriteStream(mp3File)).on("finish", async () => {
let audio = await toAudio(fs.readFileSync(mp3File))
let buffer = Buffer.from(audio)
let success = NodeID3.write({title: anu.title, artist: author, album: 'SIESTA - MD', APIC: './media/thumb.jpg',year: 2024}, buffer);
await Satzz.sendMessage(m.chat, { audio: success, mimetype: "audio/mp4", ptt: false}, { quoted: m });
});
})