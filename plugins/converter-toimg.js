require('../config')
const { Siesta } = require('../lib/command.js');
const fs = require("fs")
const { getRandom } = require("../lib/myfunc")
const { exec } = require("child_process");

Siesta({
command: '^toimg$',
alias: 'toimg',
limit: true,
desc: 'sticker to image',
type: 'Pengonversi'
}, async (m, {conn, command}) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const {q} = m
if (!/webp/.test(mime)) return reply(`Reply sticker dengan caption *${command}*`);
let media = await conn.downloadAndSaveMediaMessage(qmsg);
let ran = await getRandom(".png");
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media);
if (err) throw err;
let buffer = fs.readFileSync(ran);
conn.sendMessage(m.chat, { image: buffer}, { quoted: m });
}); 
})