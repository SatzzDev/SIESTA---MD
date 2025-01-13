require('../config');
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat, reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc");
;

Siesta({
command: '^igstalk|stalkig$',
limit: true,
desc: 'Stalking Instagram Account',
type: 'Alat'
}, async (m, {conn, command}) => {
let { reply, q } = m;
if (!q) return reply(`usernamenya mana njir, contoh nih: .${command} kurniawan_satria__`);

try {
let ress = await fetchJson(`https://aemt.me/download/igstalk?username=${q}`)
let res = ress.result
conn.sendMessage(m.chat, {
image: await getBuffer(res.photoUrl),
caption: `*\`IG STALK\`*
_Username:_ ${res.username}
_FullName:_ ${res.fullName}
_Bio:_ ${res.bio}
_Followers:_ ${res.followers}
_Following:_ ${res.following}
_PostCount:_ ${res.postsCount}
`
}, { quoted: m });
} catch (error) {
reply(`Terjadi kesalahan saat mengakses data: ${error.message}`);
}
});
