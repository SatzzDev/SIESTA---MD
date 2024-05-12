require('../config')
const { Cmd } = require('../command.js');
const {fetchJson} = require("../lib/myfunc")
const { uptotelegra } = require("../lib/uploader")


Cmd({
pattern: 'removebg',
limit: true,
desc: 'remove background image',
type: 'Tools'
}, async (m, command, Satzz) => {
let {reply,q} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (/image/.test(mime)) {
let media = await Satzz.downloadAndSaveMediaMessage(qmsg);
let o = await uptotelegra(media)
let res = await fetchJson(`https://aemt.me/removebg?url=${o}`)
Satzz.sendMessage(m.chat, {image: {url: res.url.result}},{quoted:m})
} else reply(`Kirim/reply gambar dengan caption ${command}`);   
})