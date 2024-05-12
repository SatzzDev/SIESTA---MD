require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'promote',
onlyGroup: true,
onlyAdmins: true,
desc: 'Promote Member',
type: 'Group'
}, async (m, command, Satzz) => {
let {reply,q} = m
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [q.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
await Satzz.groupParticipantsUpdate(m.chat, users, "promote").then((res) => reply("done")).catch((err) => reply("error"));
})