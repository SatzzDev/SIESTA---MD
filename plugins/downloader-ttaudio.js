const { Cmd } = require('../command.js');
const {fetchJson, getBuffer} = require("../lib/myfunc")

Cmd({
pattern: 'ttmp3|ttaudio',
limit: true,
desc: 'to Download Audio From Tiktok',
type: 'Downloader'
}, async (m, command, Satzz) => {
if (!m.query) return m.reply(`Example : ${command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
const url = m.query;
const Tiktok = require("@tobyg74/tiktok-api-dl")
let r = await Tiktok.Downloader(budy, {version: "v3"})
let result = r.result
Satzz.sendMessage(m.chat, { audio: await getBuffer(result.music), mimetype: "audio/mpeg"},{ quoted: m });
})