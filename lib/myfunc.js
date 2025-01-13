/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
const { proto, delay, getContentType, areJidsSameUser, WAMessageStubType, generateWAMessage } = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const fs = require('fs')
const axios = require('axios')
const moment = require('moment-timezone')
const util = require('util')
const Jimp = require('jimp')
const { defaultMaxListeners } = require('stream')
//const request = require('sync-request');









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
const res = await axios({ method: "get", url, headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 }, ...options, responseType: 'arraybuffer' }) 
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
    const hari = Math.floor(seconds / (3600 * 24)); // Hari
    const jam = Math.floor((seconds % (3600 * 24)) / 3600); // Jam
    const menit = Math.floor((seconds % 3600) / 60); // Menit
    const detik = Math.floor(seconds % 60); // Detik

    const tampilHari = hari > 0 ? `${hari} ${hari === 1 ? "hari" : "hari"}, ` : "";
    const tampilJam = jam > 0 ? `${jam} ${jam === 1 ? "jam" : "jam"}, ` : "";
    const tampilMenit = menit > 0 ? `${menit} ${menit === 1 ? "menit" : "menit"}, ` : "";
    const tampilDetik = detik > 0 ? `${detik} ${detik === 1 ? "detik" : "detik"}` : "";

    return tampilHari + tampilJam + tampilMenit + tampilDetik;
};


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




let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
