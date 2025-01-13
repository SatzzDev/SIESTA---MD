const { Siesta } = require('../lib/command.js');
const {fetchJson,getBuffer} = require("../lib/myfunc")
const axios = require('axios');
const cheerio = require('cheerio');

Siesta({
command: '^capcut|ccdl$',
alias: 'capcut',
limit: true,
type: 'Pengunduh'
}, async (m, {conn, command}) => {
const {q} = m
if (!q) return m.reply(`Penggunaan Salah! contoh penggunaan:\n .${command} https://capcut.com/xxxx`)
try {
let item = await downloadCapcut(inputs),
cap = `🔍 *[ RESULT ]*\n\n📢 *title:* ${item.title}\n📝 *description:* ${item.description}\n💡 *usage:* ${item.usage}\n🎥 *original video URL:* ${item.originalVideoUrl}\n`;
await conn.sendFile(m.chat, item.originalVideoUrl || logo, "", cap || "Tidak diketahui", m);
} catch (e) {
m.reply('error');
}
});    




async function downloadCapcut(Url) {
try {
const token = Url.match(/\d+/)[0],
response = await fetch(`https://ssscapcut.com/api/download/${token}`, {
method: "GET",
headers: {
Accept: "/",
"User-Agent": "Mozilla/5.0 (Linux; Android 13; CPH2217 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36",
"X-Requested-With": "acr.browser.barebones",
"Sec-Fetch-Site": "same-origin",
"Sec-Fetch-Mode": "cors",
"Sec-Fetch-Dest": "empty",
Referer: "https://ssscapcut.com/",
"Accept-Encoding": "gzip, deflate",
"Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
Cookie: "sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515"
}
});
return await response.json();
} catch (error) {
throw console.log(error), error;
}
}