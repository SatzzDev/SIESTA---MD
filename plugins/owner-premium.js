require('../config')
const { Siesta } = require('../lib/command.js');
const fs = require("fs")
const imgbbUploader = require('imgbb-uploader');

Siesta({
command: '^addprem$',
alias: 'addprem',
onlyOwner: true,
desc: 'menambahkan pengguna premium',
type: 'Pemilik'
}, async (m, {conn, command}) => {
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





Siesta({
command: '^delprem$',
alias: 'delprem',
onlyOwner: true,
desc: 'menghapus pengguna premium',
type: 'Pemilik'
}, async (m, {conn, command}) => {
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



Siesta({
command: '^(listprem|premlist)$',
alias: 'listprem',
desc: 'informasi pengguna premium',
type: 'Informasi'
}, async (m, {conn, command}) => {
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



Siesta({
command: '^(cekprem|premcek)$',
alias: 'cekprem',
desc: 'mengecek user',
type: 'Informasi'
}, async (m, {conn, command}) => {
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



Siesta({
command: '^me$',
alias: 'me',
desc: 'Mendapatkan Informasi Pengguna',
type: 'Informasi',
}, async (m, { conn, command, reply, text, isPremium, isOwner }) => {
let profile = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/originals/59/fe/0a/59fe0ad8cdbe4314797b29e8f033384c.jpg');
const userIcon = await imgbbUploader({
apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5',
imageUrl: profile,
expiration: 600,
});
let caption =`
*– 乂 Info User*
> *- Nama :* ${m.pushName}
> *- Tag :* @${m.sender.split("@")[0]}
> *- Status :* ${isOwner ? "👨‍💻 Developer" : isPremium ? "Premium 🅥" : "Gratisan"}
> *- Limit :* ${isPremium ? "∞" : `${db.data.users[m.sender].limit} Limit Tersisa`}
> *- Gold :* ${isOwner ? "∞" : db.data.users[m.sender].gold}
> *- Terdaftar Pada :* ${db.data.users[m.sender].date}`
await conn.sendMessage(m.chat, { image: { url: `https://apii.satzzdev.xyz/api/profile?username=${m.pushName}&avatar=${userIcon.url}&isPremium=${isPremium}&isOwner=${isOwner}` }, caption, contextInfo:{mentionedJid:[m.sender]} }, { quoted: m });
});

Siesta({
  command: '^leaderboard$',
  alias: 'leaderboard',
  desc: 'Mendapatkan Informasi Leaderboard',
  type: 'Informasi',
}, async (m, { conn, command, reply, text, isPremium, isOwner }) => {
  let ano = Object.keys(db.data.users);
  let teks = `*🏆 -------「 LEADERBOARD - GOLD 」------- 🏆*\n\n`;
  ano.sort((a, b) => db.data.users[b].gold - db.data.users[a].gold);
  for (let i = 0; i < ano.length; i++) {
    let x = ano[i];
    let gold = formatShortNumber(db.data.users[x].gold);
    teks += `*${i + 1}.* @${x.split("@")[0]}  *|*  ${gold} gold\n`;
  }
  reply(teks);
});


function formatNumber(number) {
  const numString = number.toString();
  let [integerPart, decimalPart] = numString.split(".");
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
}


function formatShortNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "b";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  return num.toString();
}
