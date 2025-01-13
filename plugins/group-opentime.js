require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^opentime$',
alias: 'opentime',
onlyGroup: true,
onlyAdmins: true,
desc: 'Menutup grup dengan hitung mundur',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply, q} = m
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
conn.groupSettingUpdate(m.chat, 'not_announcement')
reply(open)
}, timer)
})