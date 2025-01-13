const { Siesta } = require('../lib/command.js');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

Siesta({
command: '^(readviewonce|rvo)$',
desc:'melihat pesan 1 kali lihat',
limit: true,
type: 'Alat'
}, async (m, {command, conn}) => {
if (m.quoted.mtype !== 'viewOnceMessageV2' && m.quoted.mtype !== 'viewOnceMessageV2Extension') {
return m.reply('Itu bukan pesan viewOnce');
}

const view = m.quoted.message;
const Type = Object.keys(view)[0];

try {
let mediaType = '';
if (Type === 'imageMessage') mediaType = 'image';
else if (Type === 'videoMessage') mediaType = 'video';
else if (Type === 'audioMessage') mediaType = 'audio';

const media = await downloadContentFromMessage(view[Type], mediaType);

let buffer = Buffer.from([]);
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk]);
}

if (/video/.test(Type)) {
await conn.sendMessage(m.chat, { video: buffer, caption: view[Type].caption || '' }, { quoted: m });
} else if (/image/.test(Type)) {
await conn.sendMessage(m.chat, { image: buffer, caption: view[Type].caption || '' }, { quoted: m });
} else if (/audio/.test(Type)) {
await conn.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: m });
}
} catch (err) {
console.error(err);
m.reply('Terjadi kesalahan saat mencoba membaca pesan view once.');
}
});
