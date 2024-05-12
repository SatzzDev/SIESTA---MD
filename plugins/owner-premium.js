require('../config')
const { Cmd } = require('../command.js');
const fs = require("fs")


Cmd({
pattern: 'addprem',
onlyOwner: true,
desc: 'add premium user',
type: 'Owner'
}, async (m, command, Satzz) => {
const _prem = require("../lib/premium.js")
const premium = JSON.parse(fs.readFileSync('./src/premium.json'));
const {reply,q} = m
const isCreator = global.owner + "@s.whatsapp.net" === m.sender ? true :  false
const isOwner = isCreator
const isPremium = isOwner ? true : _prem.checkPremiumUser(m.sender, premium)
const toMs = require('ms')
const msToDate = (ms) => {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000))
  let daysms = ms % (24 * 60 * 60 * 1000)
  let hours = Math.floor((daysms) / (60 * 60 * 1000))
  let hoursms = ms % (60 * 60 * 1000)
  let minutes = Math.floor((hoursms) / (60 * 1000))
  let minutesms = ms % (60 * 1000)
  let sec = Math.floor((minutesms) / (1000))
  return days + " Days " + hours + " Hours " + minutes + " Minutes"
}



if (!m.quoted) return reply(`Please respond to the target message!`)
var userId = m.quoted.sender
var time = q
if(time == undefined) return reply("Please enter the time\ns = seconds\nh = hours\nd = days")
_prem.addPremiumUser(userId, time, premium)
let day
let ct
if (isNaN(q)) {
day = msToDate(toMs(time))
ct = toMs(time)
} else {
day = 'PERMANENT'
ct = "PERMANENT"
}

let text =`
*SUCCESS*\n
_Name:_ ${db.data.users[userId].name.split('@')[0]}
_Number:_ @${userId.split("@")[0]}
_Days:_ ${day}
_Countdown:_ ${ct}`
reply(text)
})





Cmd({
pattern: 'delprem',
onlyOwner: true,
desc: 'delete premium user',
type: 'Owner'
}, async (m, command, Satzz) => {
const _prem = require("../lib/premium.js")
const premium = JSON.parse(fs.readFileSync('./src/premium.json'));
const {reply} = m
const isCreator = global.owner + "@s.whatsapp.net" === m.sender ? true :  false
const isOwner = isCreator
const isPremium = isOwner ? true : _prem.checkPremiumUser(m.sender, premium)



if (!m.quoted) return reply(`Please reply message target!`)
premium.splice(_prem.getPremiumPosition(m.quoted.sender, premium), 1)
fs.writeFileSync('./src/premium.json', JSON.stringify(premium))
reply('Sukses!')
})



Cmd({
pattern: 'listprem|premlist',
desc: 'list all premium user',
type: 'Info'
}, async (m, command, Satzz) => {
const ms = require('parse-ms-commonjs')
const _prem = require("../lib/premium.js")
const premium = JSON.parse(fs.readFileSync('./src/premium.json'));
const {reply} = m
const isCreator = global.owner + "@s.whatsapp.net" === m.sender ? true :  false
const isOwner = isCreator
const isPremium = isOwner ? true : _prem.checkPremiumUser(m.sender, premium)
let txt = `*── 「 LIST PREMIUM 」 ──*\nTotal : ${premium.length}\n\n`
let men = [];
for (let i of premium) {
men.push(i.id)
txt += `*ID :* @${i.id.split("@")[0]}\n`
if (i.expired === 'PERMANENT') {
let cekvip = 'PERMANENT'
txt += `*Expired :* PERMANENT\n\n`
} else {
let cekvip = ms(i.expired - Date.now())
txt += `*Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
}
}
reply(txt, men)
})



Cmd({
pattern: 'cekprem|premcek',
desc: 'check premium user',
type: 'Info'
}, async (m, command, Satzz) => {
const ms = require('parse-ms-commonjs')
const {reply} = m
const isCreator = global.owner + "@s.whatsapp.net" === m.sender ? true :  false
const isOwner = isCreator
const _prem = require("../lib/premium.js")
const premium = JSON.parse(fs.readFileSync('./src/premium.json'));
const isPremium = _prem.checkPremiumUser(m.sender, premium)




if (isOwner) return reply(`You are the owner, silly!`)
if (!isPremium) return reply(`You are not a premium user`)
if (_prem.getPremiumExpired(m.sender, premium) == "PERMANENT") return reply(`PERMANENT`)
let cekvip = ms(_prem.getPremiumExpired(m.sender, premium) - Date.now())
let premiumnya = `${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)`
reply(premiumnya)
})