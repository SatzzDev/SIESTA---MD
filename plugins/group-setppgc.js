require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")


Siesta({
command: '^setppgc$',
alias: 'setppgc',
onlyGroup: true,
onlyAdmins: true,
desc: 'Mengubah Profil Grup',
type: 'Grup'
}, async (m, {reply, conn, command, text}) => {
const { jidNormalizedUser, S_WHATSAPP_NET } = require("@whiskeysockets/baileys")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (!quoted) return reply(`Kirim/Reply Image Dengan Caption ${command}`);
if (!/image/.test(mime) || /webp/.test(mime)) return reply(`Kirim/Reply Image Dengan Caption ${command}`);
var mediz = await conn.downloadAndSaveMediaMessage(quoted, "src/ppgc");
if (text == `/full`) {
var { img } = await generateProfilePicture(mediz);
await conn.query({
tag: 'iq',
attrs: {
to: jidNormalizedUser(m.chat),
target: m.chat,
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
} else {
await conn.updateProfilePicture(m.chat, { url: mediz });
}
reply(`Sukses`);
})