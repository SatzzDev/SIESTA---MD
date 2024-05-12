require('../config')
const { Cmd } = require('../command.js');
const {fetchJson} = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ttle,ftxt} = require('../lib/scrapes')

Cmd({
pattern: 'ytmp4|ytvideo',
limit: true,
desc: 'to Download Video From Youtube',
type: 'Downloader'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply(`Example : ${command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
const url = q;
const res = await Scraper.youtubedl(url);
let resURL = await res.video['auto'].download();
Satzz.sendMessage(m.chat, { video: { url: resURL }, mimetype: "video/mp4" }, { quoted: m });
})