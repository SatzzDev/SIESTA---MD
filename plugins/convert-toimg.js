require('../config')
const { Cmd } = require('../command.js');
const fs = require("fs")
const { getRandom } = require("../lib/myfunc")
const { exec } = require("child_process");

Cmd({
pattern: 'toimg|toimage',
limit: true,
desc: 'sticker to image',
type: 'Converter'
}, async (m, command, Satzz) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q} = m
if (!/webp/.test(mime)) return reply(`Reply sticker dengan caption *${command}*`);
let media = await Satzz.downloadAndSaveMediaMessage(qmsg);
let ran = await getRandom(".png");
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media);
if (err) throw err;
let buffer = fs.readFileSync(ran);
Satzz.sendMessage(m.chat, { image: buffer}, { quoted: m });
}); 
})