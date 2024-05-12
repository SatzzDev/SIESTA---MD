const { Cmd } = require('../command.js');
const {fetchJson, getBuffer} = require("../lib/myfunc")

Cmd({
pattern: 'soundclouddl|scdl',
limit: true,
desc: 'to Download Audio From SoundCloud',
type: 'Downloader'
}, async (m, command, Satzz) => {
if (!m.query) return m.reply(`input url!`)
const url = m.query;
let { soundcloud } = require("../lib/skrep") 
let r = await soundcloud(url)
Satzz.sendMessage(m.chat, {contextInfo:{ externalAdReply:{title: r.judul, body: r.download_count, previewType: "PHOTO", mediaType: "IMAGE", thumbnail: await getBuffer(r.thumb), renderLargerThumbnail:true}}, audio: { url: r.link }, mimetype: "audio/mpeg", ptt: false, mtype: 'audioMessage'},{ quoted: m });
})