const { Siesta } = require("../lib/command")
const { generateProfilePicture } = require("../lib/myfunc")


Siesta({
command: '^(setppbot|setbotpp)$',
alias: 'setppbot',
desc: 'Mengupdate Profile Bot',
onlyOwner: true,
type: 'Pemilik'
}, async (m, {conn, command, reply, mime, qmsg}) => {
const { S_WHATSAPP_NET } = require("@whiskeysockets/baileys");
const quoted = m.quoted ? m.quoted : m
let medis = await conn.downloadAndSaveMediaMessage(qmsg, "ppg");
var { img } = await generateProfilePicture(medis);
await conn.query({
tag: 'iq',
attrs: {
// target: '0',
to: S_WHATSAPP_NET,
type: 'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
reply("Profile picture has been changed.")
})