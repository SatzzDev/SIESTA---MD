const { Siesta } = require('../lib/command.js');
const {fetchJson,getBuffer} = require("../lib/myfunc")
const {pindl} = require('../lib/scrapes')
const axios = require('axios');
const cheerio = require('cheerio');

Siesta({
command: '^pinterestdl|pindl',
alias: 'pinterestdl',
limit: true,
desc: 'to Download Audio From Spotify',
type: 'Pengunduh'
}, async (m, {conn, command, text}) => {
if (!text) return m.reply(`Penggunaan Salah! contoh penggunaan:\n .${command} https://pinterest.com/xxxx`)
let res = await pindl(text)
console.log(res)
await conn.sendMessage(m.chat, {video: {url:res.videoUrl}},{ quoted: m })
});    
