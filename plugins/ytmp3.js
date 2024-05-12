const { Cmd } = require('../command.js');
const {fetchJson, getBuffer} = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")


Cmd({
pattern: 'ytmp3|ytaudio',
limit: true,
desc: 'to Download Audio From Youtube',
type: 'Downloader'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply(`Example : ${command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
const url = q
const res = await Scraper.youtubedl(url)
let resURL = await res.audio['128kbps'].download()
Satzz.sendMessage(m.chat, {audio: await getBuffer(resURL), mimetype: "audio/mpeg", ptt: false},{ quoted: m })
})