require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')


Cmd({
pattern: 'remini|hd',
limit: true,
aliases: 'remini',
desc: 'enhance image',
type: 'Tools'
}, async (m, command, Satzz) => {
let {reply} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (/image/.test(mime)) {
reply(mess.wait)
const { remini } = require('../lib/remini');
let media = await Satzz.downloadMediaMessage(qmsg);
let resultan = await remini(media, "enhance");
await Satzz.sendMessage(m.chat, { image: resultan, caption: ftxt('done'), mimetype: "image/jpeg"},{ quoted: m });
} else return reply('Bot Hanya Bisa Enhance Image/gambar.') 
})