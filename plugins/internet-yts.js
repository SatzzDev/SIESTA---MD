require('../config')
const { Cmd } = require('../command.js');
const {fetchJson} = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ttle,ftxt} = require('../lib/scrapes')

Cmd({
pattern: 'yts|ytsearch',
limit: true,
desc: 'search any video from youtube',
type: 'Internet'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply(`Example : ${command} story wa anime`);
let yts = require("yt-search");
let search = await yts(q);
let no = 1;
let sex = []
for (let i of search.all) {
sex.push({title: `RESULT ${no++}`, rows: [{ title: i.title, description: `Upload At: ${i.ago} Duration: ${i.timestamp}`, id: `.ytdl ${i.url}`}]})
}
Satzz.sendListMsgV3(m.chat, ftxt("YOUTUBE - SEARCH"), '', author, "YOUTUBE", sex, m)
})

Cmd({
pattern: 'ytdl'   
}, async (m, command, Satzz) => {
let {reply,q} = m
let sect = [{title: `SELECT ONE`, rows: [{ title: "DOWNLOAD AUDIO", description: `TO DOWNLOAD AUDIO`, id: `.ytmp3 ${q}`},{ title: "DOWNLOAD VIDEO", description: `TO DOWNLOAD VIDEO`, id: `.ytmp4 ${q}`}]}]
Satzz.sendListMsgV3(m.chat, ftxt("YOUTUBE - DL"), '', author, "OPTIONS", sect, m)    
})