require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'tagall',
onlyGroup: true,
onlyAdmins: true,
desc: 'Tag all member with custom Message',
type: 'Group'
}, async (m, command, Satzz) => {
let {reply,q} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const groupMetadata = m.isGroup ? await Satzz.groupMetadata(m.chat).catch((e) => { }) : ""; 
const groupName = groupMetadata.subject
const participants = m.isGroup ? await groupMetadata.participants : "";
let teks = `══✪〘 *👥 Tag All* 〙✪══\n
➲ *Pesan : ${q ? q : "empty"}*\n\n`;
for (let mem of participants) {
teks += `⭔ @${mem.id.split("@")[0]}\n`;
}
Satzz.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) },{ quoted: setQuoted });
})