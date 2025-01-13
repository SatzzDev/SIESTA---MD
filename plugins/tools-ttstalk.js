require('../config');
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat, reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc");
;

Siesta({
command: '^ttstalk|stalktt$',
limit: true,
desc: 'Stalking TikTok Account',
type: 'Alat'
}, async (m, {conn, command}) => {
let { reply, q } = m;
if (!q) return reply(`usernamenya mana njir, contoh nih: .${command} kurniawan_satria__`);

try {
let ress = await fetchJson(`https://aemt.me/download/tiktokstalk?username=${q}`)
let res = ress.result
conn.sendMessage(m.chat, {
image: await getBuffer(res.profile),
caption: `*\`TIKTOK - STALK\`*
_Username:_ ${res.username}
_Bio:_ ${res.description}
_Likes:_ ${formatNumber(res.likes)}
_Followers:_ ${formatNumber(res.followers)}
_Following:_ ${formatNumber(res.following)}
_PostCount:_ ${formatNumber(res.postsCount)}
`
}, { quoted: m });
} catch (error) {
reply(`Terjadi kesalahan saat mengakses data: ${error.message}`);
}
});
function formatNumber(number) {
if (typeof number !== 'number') {
return number;
}
let stringNumber = number.toString();
let format = '';
if (number >= 1000000000) {
format = 'B';
} else if (number >= 1000000) {
format = 'M';
} else if (number >= 1000) {
format = 'K';
}
if (format !== '') {
stringNumber = `${stringNumber.slice(0, -3)}${format}`;
}
return stringNumber;
}