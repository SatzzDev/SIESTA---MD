require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'setdesk|setdesc',
onlyGroup: true,
onlyAdmins: true,
desc: 'Change Group Name',
type: 'Group'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply("Text ?");
await Satzz.groupUpdateDescription(m.chat, q).then((res) => reply('done')).catch((err) => reply("error"));
})