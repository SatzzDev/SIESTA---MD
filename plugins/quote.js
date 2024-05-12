require('../config')
const { Cmd } = require('../command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'qc|quotechat',
limit: true,
desc: 'quote chat maker',
type: 'Converter'
}, async (m, command, Satzz) => {
const {q} = m
if (!q) return m.reply('text?')
const json = {"type": "quote","format": "png","backgroundColor": "#FFFFFF","width": 512,"height": 768,"scale": 2,"messages": [{"entities": [],"avatar": true,"from": {"id": 1,"name": pushname,"photo": {"url": ppuser}},"text": q,"replyMessage": {}}]};
await axios.post('https://bot.lyo.su/quote/generate', json, {headers: {'Content-Type': 'application/json'}}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
Satzz.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author }) 
});
})