const { Siesta } = require("../lib/command") 
const {getBuffer} = require("../lib/myfunc.js")


Siesta({
command:"^(bc|broadcast)$", 
alias: 'broadcast',
onlyOwner: true, 
type: "Pemilik", 
}, async(m, {conn, quoted, qmsg, text, reply}) => {
for (let objek of Object.keys(db.data.users)) { 
await conn.sendMessage(objek, {text: '*[ BROADCAST ]*\n\n'+ text, 
footer: global.footer,
buttons: [{buttonId: '.owner',buttonText: {displayText: 'Owner'}},{buttonId: '.menu',buttonText: {displayText: "Menu"}}],
viewOnce: true},{quoted: m});
}
reply("broadcast done.") 
})

Siesta({
command:"^bcaudio$", 
onlyOwner: true, 
type: "Pemilik", 
}, async(m, {conn, quoted, qmsg, text, reply}) => {
if (!m.quoted) return reply("balas audio") 
let audio = await conn.downloadMediaMessage(qmsg)
for (let objek of Object.keys(db.data.users)) { 
await conn.sendMessage(objek, {audio, ptt: true, mimetype:"audio/mp4", waveform:new Uint8Array(64), contextInfo:{
externalAdReply:{
previewType: "PHOTO", 
title:text, 
body: "BROADCAST",
mediaType: "IMAGE", 
thumbnail: await getBuffer('https://satganzdevs-api.up.railway.app/api/thmb'),
showAdAttribution: true,   
}}},{quoted:global.fake}) 
}
reply("broadcast done.") 
})