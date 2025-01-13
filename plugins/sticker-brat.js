const { Siesta } = require("../lib/command") 
const { fetchJson, getBuffer } = require("../lib/myfunc") 


Siesta({
command:'^brat$', 
type:'Stiker', 
limit:true, 
}, async(m, {conn, from, command, text, reply}) => {
if (!text) return reply("*`❌ [ WRONG FORMAT ]`\n _try example:_ .brat serius aku diginiin? gamau digidaw aja😔?")
await conn.sendImageAsSticker(m.chat, await getBuffer(`https://apii.maulanaa.xyz/api/brat?text=${text}`), m, {packname:'Sticker By',author:'Satzz Voldigoad.'})
})