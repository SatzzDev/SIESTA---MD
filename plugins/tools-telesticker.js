require('../config')
const { Cmd } = require("../command.js")
const { fetchJson, getBuffer } = require("../lib/myfunc.js")
const { Telesticker } = require("../lib/scrapes")

Cmd({
pattern: 'telesticker|telestik',
limit: true,
desc: 'Get Sticker from Telegram Sticker',
type: 'Tools'
}, async (m, command, Satzz) => {
let {reply,q} = m
let res = await Telesticker(q)
await reply(`Sending ${res.length} stickers...`)
for (let i = 0; i < res.length; i++) {
Satzz.sendImageAsSticker(m.sender, await getBuffer(res[i].url), m, {packname, author}) 
}
})