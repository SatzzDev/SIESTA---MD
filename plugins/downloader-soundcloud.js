const { Siesta } = require('../lib/command.js');
const {fetchJson, getBuffer} = require("../lib/myfunc")
const request = require("request")
const cheerio = require("cheerio") 


Siesta({
command: '^soundcloud|scdl$',
alias: 'soundclouddl',
limit: true,
desc: 'to Download Audio From SoundCloud',
type: 'Pengunduh'
}, async (m, {conn, command}) => {
if (!m.query) return m.reply(`input url!`)
const url = m.query;
let r = await soundcloud(url)
conn.sendMessage(m.chat, {contextInfo:{ externalAdReply:{title: r.title, body: r.download_count, thumbnailUrl: r.thumbnail}}, audio: { url: r.audio_url }, mimetype: "audio/mpeg", ptt: false},{ quoted: m });
})


async function soundcloud(link) {
return new Promise((resolve, reject) => {
const options = {method:"POST",url:"https://www.klickaud.org/download.php",headers: {"content-type": "application/x-www-form-urlencoded"},
formData: {value: link,"2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37":"710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3"}};
request(options, async function (error, response, body) {
if (error) throw new Error(error);
const $ = cheerio.load(body);
resolve({creator: 'SatzzDev.',
title: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)").text(),
download_count: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)").text(),
thumbnail: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img").attr("src"),
audio_url: $("#dlMP3").attr("onclick").split(`downloadFile('`)[1].split(`',`)[0],
});
});
});
}