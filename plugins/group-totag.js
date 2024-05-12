require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'totag',
onlyGroup: true,
onlyAdmins: true,
desc: 'Any Message To Tag All Member',
type: 'Group'
}, async (m, command, Satzz) => {
let {reply,q} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const groupMetadata = m.isGroup ? await Satzz.groupMetadata(m.chat).catch((e) => { }) : ""; 
const groupName = groupMetadata.subject
const participants = m.isGroup ? await groupMetadata.participants : "";
if (!m.quoted) return reply(`Reply pesan dengan caption ${command}`);
Satzz.sendMessage(m.chat, {forward: m.quoted.fakeObj, mentions: participants.map((a) => a.id)});
})