require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: '^opentime$',
onlyGroup: true,
onlyAdmins: true,
desc: 'Timer Open Group',
type: 'Group'
}, async (m, command, Satzz) => {
let {reply} = m
var args = m.body.trim().split(/ +/).slice(1);
args = args.concat(["", "", "", "", "", ""]);
if (args[1]=="detik") {
var timer = args[0]*`1000`
} else if (args[1]=="menit") {var timer = args[0]*`60000`
} else if (args[1]=="jam") {var timer = args[0]*`3600000`
} else if (args[1]=="hari") {var timer = args[0]*`86400000`
} else {return reply("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
reply(`Open time ${q} dimulai dari sekarang`)
setTimeout( () => {
const open = `*Tepat waktu* grup dibuka oleh admin\n sekarang member dapat mengirim pesan`
Satzz.groupSettingUpdate(m.chat, 'not_announcement')
reply(open)
}, timer)
})