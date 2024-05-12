require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'setppgc|setppgrup',
onlyGroup: true,
onlyAdmins: true,
desc: 'Change Profile Picture Group',
type: 'Group'
}, async (m, command, Satzz) => {
let {reply,q} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (!quoted) return reply(`Kirim/Reply Image Dengan Caption ${command}`);
if (!/image/.test(mime) || /webp/.test(mime)) return reply(`Kirim/Reply Image Dengan Caption ${command}`);
var mediz = await Satzz.downloadAndSaveMediaMessage(quoted, "ppgc.jpeg");
if (q == `/full`) {
var { img } = await generateProfilePicture(mediz);
await Satzz.query({tag: "iq", attrs: { to: m.chat, type: "set", xmlns: "w:profile:picture" }, content: [{ tag: "picture", attrs: { type: "image" }, content: img }]});
} else {
await Satzz.updateProfilePicture(m.chat, { url: mediz });
}
reply(`Sukses`);
})