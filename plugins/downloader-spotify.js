const { Cmd } = require('../command.js');
const {fetchJson} = require("../lib/myfunc")
const spottydl = require("spottydl")

Cmd({
pattern: 'spotifydl|spottydl',
limit: true,
desc: 'to Download Audio From Spotify',
type: 'Downloader'
}, async (m, command, Satzz) => {
await spottydl.getTrack(m.query).then(async results => {
if (!m.query) return m.reply(`example use : ${command} https://open.spotify.com/track/3e1rs346dsDDwpqTRGlRZR?si=d92392fad4684017`)
let texts =`⟮ _~SPOTIFY DOWNLOADER~_ ⟯\n
⭔ Title : ${results.title}
⭔ Artist : ${results.artist}
⭔ Year : ${results.year}
⭔ Album : ${results.album}
⭔ Id : ${results.id}\n
NOTE : Kami Sedang memproses audio, mohon bersabar`
Satzz.sendMessage(from, {contextInfo:{externalAdReply:{showAdAttribution: true,title: results.title,body: results.artist,mediaType: 1,mediaUrl: !m.query,thumbnail: await getBuffer(results.albumCoverURL),sourceUrl: m.query,renderLargerThumbnail: true}}})
await m.reply(texts)
let aud = await spottydl.downloadTrack(results, `../`)
Satzz.sendMessage(m.chat, { audio: {url: aud[0].filename}, mimetype: "audio/mpeg", ptt: false,},{ quoted: m })
});    
})