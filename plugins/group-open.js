require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: '^open$',
onlyGroup: true,
onlyAdmins: true,
desc: 'open Group',
type: 'Group'
}, async (m, command, Satzz) => {
Satzz.groupSettingUpdate(m.chat, 'not_announcement')
})
