const { Cmd } = require('../command.js');
const { formatp, jsonformat, clockString, getAllCmd, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime,  isUrl,  pickRandom, getGroupAdmins, getRandom,  FileSize, toFirstCase, makeId, formatNumber, durationToSeconds } = require("../lib/myfunc")

Cmd({
pattern: 'pair|pairing',
onlyPrem: true,
desc: 'Get Plugins.',
type: 'Owner'
}, async (m, command, Satzz) => {
let {reply, q} = m
await reply("Proses...");
if (q) {
const urls = [`https://session.guruapi.tech/code?phone=${q}`,
`https://anya-qr-teamolduser.koyeb.app/pcode?number=${q}`,
`https://maria-pair-riders004.koyeb.app/pcode?number=${q}`,
`https://prabath-md-pair-web-v2-slk.koyeb.app/code?number=${q}`,
`https://session.giftedtechnexus.co.ke/pair/code?number=${q}`
];
for (const url of urls) {
await fetchJson(url);
}
await Satzz.sendButtons(m.chat, `DONE`, '', 'ꜱᴀᴛɢᴀɴᴢᴅᴇᴠꜱ', [{ type: 'btn', text: '🗿', id: `.pair ${q}` }], m);
}
})