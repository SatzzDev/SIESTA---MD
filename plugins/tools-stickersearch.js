require("../config")
const { Cmd } = require('../command.js');


Cmd({
pattern: 'stickersearch',
limit: true,
desc: 'search and get sticker from query',
type: 'Tools'
}, async (m, command, Satzz) => {
let {reply,q} = m
let { stickersearch } = require("../lib/scrapes")


reply(mess.wait)
let res = await stickersearch(q)
for (let satria of res.sticker) Satzz.sendImageAsSticker(m.chat, satria, m, {pack: global.packname, author: global.author})
})