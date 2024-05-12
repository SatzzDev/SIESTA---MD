
const { proto, delay, getContentType, areJidsSameUser, WAMessageStubType, generateWAMessage } = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const moment = require('moment-timezone')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const timem = moment().tz('Asia/Jakarta');
const Jimp = require('jimp')
const { defaultMaxListeners } = require('stream')










const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)
exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
let tag = (0, exports.unixTimestampSeconds)().toString();
if (epoch)
tag += '.--' + epoch; // attach epoch if provided
return tag;
}

exports.processTime = (timestamp, now) => {
return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (err) {
return err
}
}

exports.fetchJson = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

exports.runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.CS = (ms) => {
if (isNaN(ms)) return '--:--:--';
let hari = Math.floor(ms / (1000 * 60 * 60 * 24));
let jam = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let menit = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
let detik = Math.floor((ms % (1000 * 60)) / 1000);
let result = '';
if (hari > 0) {
result += hari + ' days, ';
}
if (jam > 0) {
result += jam + ' hours, ';
}
if (menit > 0) {
result += menit + ' minutes, ';
}
result += detik + ' seconds';
return result;
}


exports.sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}



exports.isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
if (date) {
return moment(date).locale('id').format(format)
} else {
return moment.tz('Asia/Jakarta').locale('id').format(format)
}
}

exports.formatDate = (n, locale = 'id') => {
let d = new Date(n)
return d.toLocaleDateString(locale, {
weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric',
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
}

exports.tanggal = (numer) => {
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
var tgl = new Date(numer);
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
thisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy; 
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
return JSON.stringify(string, null, 2)
}

function format(...args) {
return util.format(...args)
}

exports.logic = (check, inp, out) => {
if (inp.length !== out.length) throw new Error('Input and Output must have same length')
for (let i in inp)
if (util.isDeepStrictEqual(check, inp[i])) return out[i]
return null
}

exports.generateProfilePicture = async (buffer) => {
const jimp = await Jimp.read(buffer)
const min = jimp.getWidth()
const max = jimp.getHeight()
const cropped = jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
}
}

exports.reSize = (buffer, ukur1, ukur2) => {
const jimp = require('jimp')
return new Promise(async(resolve, reject) => {
var baper = await jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
resolve(ab)
})
}  

exports.getGroupAdmins = async(participants) => {
let admins = [];
for (let i of participants) {
i.admin === "superadmin"
? admins.push(i.id)
: i.admin === "admin"
? admins.push(i.id)
: "";
}
return admins || [];
};

exports.bytesToSize = (bytes, decimals = 2) => {
if (bytes === 0) return '0 Bytes';
const k = 1024;
const dm = decimals < 0 ? 0 : decimals;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const i = Math.floor(Math.log(bytes) / Math.log(k));
return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
return new Promise((resolve, reject) => {
if (/http/.test(path)) {
axios.get(path)
.then((res) => {
let length = parseInt(res.headers['content-length'])
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
})
} else if (Buffer.isBuffer(path)) {
let length = Buffer.byteLength(path)
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
} else {
reject('error gatau apah')
}
})
}

exports.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)];
};

exports.getCases = (cases) => {
let data = fs.readFileSync('./message/case.js', 'utf8');
try{
return "case "+`"${cases}"`+data.toString().split("case \""+cases+"\"")[1].split("break")[0]+"break"
} catch {
return "case "+`"${cases}"`+data.toString().split("case  \""+cases+"\"")[1].split("break")[0]+"break"
}
}

exports.getAllCmd = () => {
try {
const jsnya = fs.readFileSync('./message/case.js', 'utf8');
const caseRegex = /case\s([^:]+):/g;
const cases = jsnya.match(caseRegex);
if (cases) {
const cleanedCases = cases.map(caseStatement => caseStatement.replace(/[":]/g, '').replace('case', '').trim());
return cleanedCases;
} else {
return [];
}
} catch (error) {
console.error('Terjadi kesalahan:', error.message);
return [];
}
}

exports.FileSize = (bytes) => {
const kilobyte = 1024;
const megabyte = kilobyte * 1024;
const gigabyte = megabyte * 1024;
if (bytes < kilobyte) {
return bytes + ' B';
} else if (bytes < megabyte) {
return (bytes / kilobyte).toFixed(2) + ' KB';
} else if (bytes < gigabyte) {
return (bytes / megabyte).toFixed(2) + ' MB';
} else {
return (bytes / gigabyte).toFixed(2) + ' GB';
}
}

exports.monospace = async(string) => {
return "```" + string + "```";
}

exports.makeId = () => {
let result = '';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const length = 10;
for (let i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() * characters.length));
}
return result;
};

exports.formatNumber = (angka) => {
if (angka >= 1000 && angka < 1000000) {
return (angka / 1000).toFixed(1) + 'k';
} else if (angka >= 1000000 && angka < 1000000000) {
return (angka / 1000000).toFixed(1) + 'M';
} else if (angka >= 1000000000) {
return (angka / 1000000000).toFixed(1) + 'B';
} else {
return angka.toString();
}
}

exports.ucapanWaktu = '';
if (timem.isBetween(moment('00:00:00', 'HH:mm:ss'), moment('11:00:00', 'HH:mm:ss'))) {
ucapanWaktu = 'Ohayōgozaimasu!';
} else if (timem.isBetween(moment('11:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss'))) {
ucapanWaktu = 'Konnichiwa!';
} else if (timem.isBetween(moment('15:00:00', 'HH:mm:ss'), moment('18:00:00', 'HH:mm:ss'))) {
ucapanWaktu = 'Konbanwa!';
} else {
ucapanWaktu = 'Oyasuminasai!';
}


exports.contextInfo = {
isForwarded: true, 
forwardingScore: 1000, 
forwardedNewsletterMessageInfo: {
newsletterJid: "120363229748458166@newsletter", 
serverMessageId: 100, newsletterName: "Powered by: SatganzDevs"
},
BusinessMessageForwardInfo: {
businessOwnerJid: "6281316701742"
}
}



/**
* Serialize Message
* @param {WAConnection} conn 
* @param {Object} m 
* @param {store} store 
*/
exports.smsg = (conn, m, store) => {
if (!m) return m
let M = proto.WebMessageInfo
m = M.fromObject(m)
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
m.chat = m.key.remoteJid
m.fromMe = m.key.fromMe
m.isGroup = m.chat.endsWith('@g.us') 
m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
}
if (!m.message) return
if (m.message) {
m.mtype = getContentType(m.message)
m.msg = (m.mtype == 'viewOnceMessageV2' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
try {
m.body = m.mtype === "conversation" ? m.message.conversation : 
m.mtype === "imageMessage" ? m.message.imageMessage.caption : 
m.mtype === "videoMessage" ? m.message.videoMessage.caption : 
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : 
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId : 
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId : 
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId : 
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id || m.text : "";
} catch {
m.body = ""
}
m.args = m.body.trim().split(/ +/).slice(1);
m.query = m.args.join(" ").trim();
m.q = m.query
let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
if (m.mtype == 'protocolMessage' && m.msg.key) {
if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
}
if (m.quoted) {
let type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
if (['productMessage'].includes(type)) {
type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
}
if (typeof m.quoted === 'string') m.quoted = {
text: m.quoted
}
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id)
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return false
let q = await store.loadMessage(m.chat, m.quoted.id, conn)
return exports.smsg(conn, q, store)
}
let vM = m.quoted.fakeObj = M.fromObject({
key: {
remoteJid: m.quoted.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)
m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
}
}
if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg)
m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
m.reply = (teks) => conn.sendMessage(m.chat, {text: teks, contextInfo:{ mentionedJid: [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") || [m.sender], isForwarded: true, forwardingScore: 1000, forwardedNewsletterMessageInfo: {newsletterJid: "120363229748458166@newsletter", serverMessageId: 100, newsletterName: "Powered by: SatganzDevs"}, externalAdReply: {showAdAttribution: true, renderLargerThumbnail: false, containsAutoReply: true, previewType: "PHOTO", title: `⌜ ${wm} ⌟`,mediaType: "IMAGE", sourceUrl: 'https://instagram.com/kurniawan_satria__', thumbnailUrl: 'https://i.pinimg.com/originals/f2/fa/3a/f2fa3a130b769450acc7d1b1d8f0aa89.jpg'}}},{ quoted: m })
m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)



conn.appenTextMessage = async(text, chatUpdate) => {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: conn.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
conn.ev.emit('messages.upsert', msg)
}
try {
conn.pushMessage(m)
if (m.msg && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', m.msg.key)
} catch (e) {
console.error(e)
}
conn.appenEditedMessage = async(text) => {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: conn.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
conn.ev.emit('messages.upsert', msg)
}    

return m
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
