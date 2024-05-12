require("../config")
const { Cmd } = require('../command.js');
const fs = require("fs") 




Cmd({
pattern: 'klaim|claim',
onlyGroup:true,
desc: '',
type: 'Game'
}, async (m, command, Satzz) => {
const _prem = require("../lib/premium.js")
const premium = JSON.parse(fs.readFileSync('./src/premium.json'));
const isCreator = global.owner + "@s.whatsapp.net" === m.sender ? true :  false
const isOwner = isCreator
const isPremium = isOwner ? true : _prem.checkPremiumUser(m.sender, premium)
const tanggal = new Date().toLocaleDateString('id', { weekday: 'long' }) + ',' + ' ' + new Date().toLocaleDateString("id", {day: 'numeric', month: 'long', year: 'numeric'})
const free = 5000
const prem = 10000
const moneyfree = 5000
const moneyprem = 10000
const timeout = 86400000
const msToTime = (ms) => {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
  }
let time = global.db.data.users[m.sender].lastclaim + 86400000
 if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) return m.reply(`Anda sudah mengklaim, klaim harian hari ini\ntunggu selama ${msToTime(time - new Date())} lagi`)
 global.db.data.users[m.sender].balance += isPremium ? moneyprem : moneyfree
m.reply(`Selamat kamu mendapatkan:\n\n+${isPremium? moneyprem : moneyfree} Balance`)
global.db.data.users[m.sender].lastclaim = new Date * 1
})