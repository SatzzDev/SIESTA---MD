require("./config.js");
const {
proto,
getContentType,
generateWAMessageFromContent,
generateWAMessage,
areJidsSameUser,
downloadContentFromMessage,
prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const moment = require("moment-timezone");
const util = require("util");
const path = require("path");
const chalk = require("chalk");
const stringSimilarity = require('string-similarity');
const { exec } = require("child_process");
const { ftxt, ttle } = require("./lib/scrapes.js");
const {
CS,
jsonformat,
reSize,
ucapanWaktu,
formatp,
clockString,
getBuffer,
getCases,
generateProfilePicture,
sleep,
fetchJson,
runtime,
pickRandom,
getGroupAdmins,
getRandom,
} = require("./lib/myfunc.js");
const imgbbUploader = require('imgbb-uploader');


//━━━━━[ START OF EXPORT ]━━━━━//
module.exports = {
async handler(conn, m, chatUpdate, store) {
try {
const { reply } = m;
const { commands, handler, suggestCommand } = require("./lib/command.js");
const prefix = ".";
const body =
m.mtype === "conversation"
? m.message.conversation
: m.mtype === "imageMessage"
? m.message.imageMessage.caption
: m.mtype === "videoMessage"
? m.message.videoMessage.caption
: m.mtype === "extendedTextMessage"
? m.message.extendedTextMessage.text
: m.mtype === "buttonsResponseMessage"
? m.message.buttonsResponseMessage.selectedButtonId
: m.mtype === "listResponseMessage"
? m.message.listResponseMessage.singleSelectReply.selectedRowId
: m.mtype === "templateButtonReplyMessage"
? m.message.templateButtonReplyMessage.selectedId
: m.mtype === "interactiveResponseMessage"
? JSON.parse(
m.message.interactiveResponseMessage.nativeFlowResponseMessage
.paramsJson
).id || m.text
: m.mtype === "stickerMessage"
? (m.msg.fileSha256 && m.msg.fileSha256.toString('base64') in global.db.data.sticker)
? global.db.data.sticker[m.msg.fileSha256.toString('base64')].text
: ""
: "";
const budy = typeof m.text == "string" ? m.text : "";
const pushname = m.pushName || "No Name";
const isCmd = body.startsWith(prefix);
const command = body
.replace(prefix, "")
.trim()
.split(/ +/)
.shift()
.toLowerCase();
var args = body.trim().split(/ +/).slice(1);
args = args.concat(["", "", "", "", "", ""]);
const botNumber = await conn.decodeJid(conn.user.id);
const isCreator = global.owner.includes(m.sender.split("@")[0])
? true
: false;
const isOwner = isCreator;
const itsMe = m.sender == botNumber ? true : false;
const from = m.chat;
const q = args.join(" ").trim();
const text = q;
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || "";
const qmsg = quoted.msg || quoted;
const senderNumber = m.sender.split("@")[0];
const sender = senderNumber;
const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : "";
const groupName = m.isGroup ? await groupMetadata.subject : "";
const participants = m.isGroup ? await groupMetadata.participants : "";
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
const isBotAdmins = groupAdmins.includes(botNumber);
const isAdmins = groupAdmins.includes(m.sender);
const premium = JSON.parse(fs.readFileSync("./src/premium.json"));
const _prem = require("./lib/premium.js");
const isPremium = isOwner
? true
: _prem.checkPremiumUser(m.sender, premium);

global.fake = {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
remoteJid: "0@s.whatsapp.net",
},
message: {
orderMessage: {
orderId: "594071395007984",
thumbnail: fs.readFileSync("./src/quoted.jpg"),
itemCount: new Date().getFullYear(),
status: "INQUIRY",
surface: "CATALOG",
message: `${global.botname}\nRuntime: ${runtime(process.uptime())}`,
orderTitle: "SatganzDevs",
sellerJid: "6282170988479@s.whatsapp.net",
token: "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
totalAmount1000: "500000000000000",
totalCurrencyCode: "IDR",
},
},
};

const react = async (emoti) => {
return conn.sendMessage(m.chat, {
react: {
text: emoti,
key: {
remoteJid: m.chat,
fromMe: false,
key: m.key,
id: m.key.id,
participant: m.sender,
},
},
});
};
const freply = async (teks) => {
return conn.sendMessage(
m.chat,
{ text: teks },
{
quoted: global.fake,
}
);
};
const isNumber = (x) => typeof x === "number" && !isNaN(x);
let user = db.data.users[m.sender];
let limitUser = 10;
if (typeof user !== "object") db.data.users[m.sender] = {};
if (user) {
if (!("name" in user)) user.name = pushname;
if (!("id" in user)) user.id = senderNumber;
if (!("password" in user)) user.password = '3551_'
if (!isNumber(user.limit)) user.limit = limitUser;
if (!isNumber(user.gold)) user.gold = 1000
if (!isNumber(user.afkTime)) user.afkTime = -1;
if (!("afkReason" in user)) user.afkReason = "";
} else {
global.db.data.users[m.sender] = {
name: pushname,
id: senderNumber,
password: '3551_',
date: global.calender,
limit: limitUser,
gold: 10000,
afkTime: -1,
afkReason: "",
};
}
if (m.isGroup) {
let chats = db.data.chats[m.chat];
if (typeof chats !== "object") db.data.chats[m.chat] = {};
if (chats) {
if (!("antilink" in chats)) chats.antilink = false;
if (!("antidelete" in chats)) chats.antidelete = false;
if (!("antiviewonce" in chats)) chats.antiviewonce = false;
if (!("antiedit" in chats)) chats.antiedit = false;
if (!("welcome" in chats)) chats.welcome = false;
if (!("setwelcome" in chats)) chats.setwelcome = false;
if (!("setbye" in chats)) chats.sebye = false;
} else
global.db.data.chats[m.chat] = {
antilink: false,
antidelete: false,
antiviewonce: false,
antidelete: true,
welcome: false,
setwelcome: "",
setbye: "",
};
}

if (!conn.public) {
if (!m.key.fromMe && !isCreator) return;
}
if (conn.maintenance) {
if (!m.key.fromMe && !isCreator) {
return conn.sendMessage(m.chat, {text: "*MODE MAINTENANCE SEDANG AKTIF. HARAP COBA LAGI NANTI.*"})
}
}

let cron = require("node-cron");
let tasks = cron.getTasks();
if (tasks.size < 1) {
cron.schedule(
"0 0 * * *",
async () => {
let user = Object.keys(global.db.data.users);
let limitUser = isOwner ? 1000 : isPremium ? global.limitawal.premium : global.limitawal.free;
for (let jid of user) {
global.db.data.users[jid].limit = limitUser;
}
console.log(
chalk.green(" ‎ ‎ [ SYSTEM ]"),
chalk.yellow("reset limit succesfully")
);
},
{ scheduled: true, timezone: "Asia/Jakarta", name: "RESET LIMIT" }
);
} else {
}


//━━━━━[ ANTI SPAM ]━━━━━//
conn.warned = conn.warned ? conn.warned : new Set()
conn.muted = conn.muted ? conn.muted : new Set()
conn.messageLog = conn.messageLog ? conn.messageLog : new Map()
const min = 4, max = 12, interval = 5000
const warning = "⚠️ *jangan spam kak.*", muteMessage = "🚫 *anda telah dibisukan karena spamming.*"
const msg = chatUpdate.messages[0]
if (!msg.message || msg.key.fromMe) return
const now = Date.now()
if (conn.muted.has(sender)) return
if (!conn.messageLog.has(sender)) conn.messageLog.set(sender, [])
const userMessages = conn.messageLog.get(sender)
userMessages.push(now)
while (userMessages.length && userMessages[0] < now - interval) userMessages.shift()
const msgCount = userMessages.length
if (msgCount >= max) {
conn.muted.add(sender)
await m.reply(muteMessage)
} else if (msgCount >= min && !conn.warned.has(sender)) {
conn.warned.add(sender)
await m.reply(warning)
}
if (userMessages.length > 200) userMessages.shift()
//━━━━━[ END OF ANTISPAM ]━━━━━//


//━━━━━[ PREMIUM EXPIRED ]━━━━━//
_prem.expiredCheck(conn, premium);
//━━━━━[ END OF PREMIUM EXPIRED ]━━━━━//


conn.blackjack = conn.blackjack ? conn.blackjack : {};
//━━━━━[ SUIT ]━━━━━//
conn.suit = conn.suit ? conn.suit : {}
let game = Object.values(conn.suit).find((game) => game.id && game.status && [game.p, game.p2].includes(m.sender));
if (game) {
let pemenang = "";
let seri = false;
if (m.sender == game.p2 && /Y/i.test(m.text) && m.isGroup && game.status == "wait") {
if (/N/i.test(m.text)) {
conn.sendTextWithMentions(m.chat, `@${game.p2.split`@`[0]} gak mau main, gamenya dibatalin`, m);
delete conn.suit[game.id];
return;
}
game.status = "play";
game.origin = m.chat;
clearTimeout(game.timer);
reply(`Game udah dikirim ke chat\n\n@${game.p.split`@`[0]} dan @${game.p2.split`@`[0]}\n\nPilih langkah kamu di chat masing-masing\nKlik https://wa.me/${botNumber.split`@`[0]}`);
if (!game.choice) conn.sendButtons(game.p, "", "Pilih dong:", global.footer, [{type:'btn',text:'✂️', id:'gunting'},{type:'btn',text:'🗿', id:'batu'},{type:'btn',text:'📄', id:'kertas'}], global.fake);
if (!game.choice2) conn.sendButtons(game.p2, "", "Pilih dong:", global.footer, [{type:'btn',text:'✂️', id:'gunting'},{type:'btn',text:'🗿', id:'batu'},{type:'btn',text:'📄', id:'kertas'}], global.fake);
game.choice_time = setTimeout(() => {
if (!game.choice && !game.choice2) conn.sendText(m.chat, `Dua-duanya gak milih, gamenya dibatalin`);
else if (!game.choice || !game.choice2) {
pemenang = !game.choice ? game.p2 : game.p;
conn.sendTextWithMentions(m.chat, `@${(game.choice ? game.p2 : game.p).split`@`[0]} gak pilih langkah, gamenya selesai`, m);
}
delete conn.suit[game.id];
return;
}, game.timeout);
}
let player1 = m.sender == game.p;
let player2 = m.sender == game.p2;
let batu = /batu/i;
let kertas = /kertas/i;
let gunting = /gunting/i;
let regex = /^(batu|kertas|gunting)/i;
if (player1 && regex.test(body) && !game.choice && !m.isGroup) {
game.choice = regex.exec(body.toLowerCase())[0];
game.text = body;
reply(`Kamu milih ${body}${!game.choice2 ? `\n\nNunggu lawan milih` : ""}`);
if (!game.choice2) conn.sendText(game.p2, "_Lawan udah milih_\nSekarang giliran kamu", 0);
}
if (player2 && regex.test(body) && !game.choice2 && !m.isGroup) {
game.choice2 = regex.exec(body.toLowerCase())[0];
game.text2 = body;
reply(`Kamu milih ${body}${!game.choice ? `\n\nNunggu lawan milih` : ""}`);
if (!game.choice) conn.sendText(game.p, "_Lawan udah milih_\nSekarang giliran kamu", 0);
}
let langkah1 = game.choice;
let langkah2 = game.choice2;
if (game.choice && game.choice2) {
clearTimeout(game.choice_time);
if (batu.test(langkah1) && gunting.test(langkah2)) pemenang = game.p;
else if (batu.test(langkah1) && kertas.test(langkah2)) pemenang = game.p2;
else if (gunting.test(langkah1) && kertas.test(langkah2)) pemenang = game.p;
else if (gunting.test(langkah1) && batu.test(langkah2)) pemenang = game.p2;
else if (kertas.test(langkah1) && batu.test(langkah2)) pemenang = game.p;
else if (kertas.test(langkah1) && gunting.test(langkah2)) pemenang = game.p2;
else if (langkah1 == langkah2) seri = true;
let p2i = await conn.profilePictureUrl(game.p2, 'image').catch(() => 'https://i.pinimg.com/originals/59/fe/0a/59fe0ad8cdbe4314797b29e8f033384c.jpg');
const p2icon = await imgbbUploader({apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', imageUrl: p2i, expiration: 600});
let pi = await conn.profilePictureUrl(game.p, 'image').catch(() => 'https://i.pinimg.com/originals/59/fe/0a/59fe0ad8cdbe4314797b29e8f033384c.jpg');
const picon = await imgbbUploader({apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', imageUrl: pi, expiration: 600});
const hasil_gmbr = `https://apii.satzzdev.xyz/api/bewan?player1=${await conn.getName(game.p)}&player2=${await conn.getName(game.p2)}&avatar1=${picon.url}&avatar2=${p2icon.url}`
await conn.sendMessage(game.origin, {image: {url: hasil_gmbr}, caption:`*– 乂 HASIL - SUIT* ${seri ? "\nIMBANG" : ""}\n\n- @${game.p.split`@`[0]} (${game.text}) ${seri ? "" : game.p == pemenang ? ` *Menang* \n` : ` *Kalah* \n`}- @${game.p2.split`@`[0]} (${game.text2}) ${seri ? "" : game.p2 == pemenang ? ` *Menang* \n` : ` *Kalah* \n`}\n\n${seri ? '' : '+500 Gold'}`, contextInfo:{mentionedJid:[game.p,game.p2]}});
seri ? null : db.data.users[pemenang].limit += 5;
delete conn.suit[game.id];
}
}

//━━━━━[ ASAH OTAK ]━━━━━//
conn.asahotak = conn.asahotak ? conn.asahotak : {}  
if (from in conn.asahotak){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.tebakilmiah[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.gold += 300
conn.sendButtons(m.chat, "", `*– 乂 ASAH - OTAK*\nJawabanmu Benar!\n*+300 Gold*`, global.footer, [{type:'btn',text:'Main Lagi', id:'.asahotak'},{type:'btn',text:'👍', id:'gg'}], m);
clearTimeout(conn.asahotak[id][3])
delete conn.asahotak[id]
} else if (similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}     

//━━━━━[ SIAPAKAH AKU ]━━━━━//
conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}  
if (from in conn.siapakahaku){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.siapakahaku[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.gold += 300
conn.sendButtons(m.chat, "", `*– 乂 SIAPAKAH - AKU*\nJawabanmu Benar!\n*+300 Gold*`, global.footer, [{type:'btn',text:'Main Lagi', id:'.siapakahaku'},{type:'btn',text:'👍', id:'gg'}], m);
clearTimeout(conn.siapakahaku[id][3])
delete conn.siapakahaku[id]
} else if (similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}    

//━━━━━[ TEBAK GAMBAR ]━━━━━//
conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}  
if (from in conn.tebakgambar){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.tebakgambar[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.gold += 300
conn.sendButtons(m.chat, "", `*– 乂 TEBAK - GAMBAR*\nJawabanmu Benar!\n*+300 Gold*`, global.footer, [{type:'btn',text:'Main Lagi', id:'.tebakgambar'},{type:'btn',text:'👍', id:'gg'}], m);
clearTimeout(conn.tebakgambar[id][3])
delete conn.tebakgambar[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}    

//━━━━━[ TEBAK HEROML ]━━━━━//       
conn.tebakheroml = conn.tebakheroml ? conn.tebakheroml : {}  
if (from in conn.tebakheroml){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.tebakheroml[id][1]))
if (budy.toLowerCase() == json.name.toLowerCase().trim()) {
user.gold += 300
conn.sendButtons(m.chat, "", `*– 乂 TEBAK - HERO - ML*\nJawabanmu Benar!\n*+300 Gold*`, global.footer, [{type:'btn',text:'Main Lagi', id:'.tebakheroml'},{type:'btn',text:'👍', id:'gg'}], m);
clearTimeout(conn.tebakheroml[id][3])
delete conn.tebakheroml[id]
} else if(similarity(budy.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}    

//━━━━━[ TEBAK KALIMAT ]━━━━━//
conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {}  
if (from in conn.tebakkalimat){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.tebakkalimat[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.gold += 300
conn.sendButtons(m.chat, "", `*– 乂 TEBAK - KALIMAT*\nJawabanmu Benar!\n*+300 Gold*`, global.footer, [{type:'btn',text:'Main Lagi', id:'.tebakkalimat'},{type:'btn',text:'👍', id:'gg'}], m);
clearTimeout(conn.tebakkalimat[id][3])
delete conn.tebakkalimat[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}  

//━━━━━[ SUSUN KATA ]━━━━━//
conn.susunkata = conn.susunkata ? conn.susunkata : {}  
if (from in conn.susunkata){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.susunkata[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.limit += 5
user.gold += 300
conn.sendButtons(m.chat, "", `*– 乂 SUSUN - KATA*\nJawabanmu Benar!\n*+300 Gold*`, global.footer, [{type:'btn',text:'Main Lagi', id:'.susunkata'},{type:'btn',text:'👍', id:'gg'}], m);
clearTimeout(conn.susunkata[id][3])
delete conn.susunkata[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}    

if (!m.isGroup) {
const groupMetadata = await conn.groupMetadata("120363140569875100@g.us")
const participantss = groupMetadata.participants.map(data => data.id)
if (!participantss.includes(m.sender)) return conn.sendButtons(m.chat, '*AKSES DI TOLAK❗*', 
'*AKSES DI TOLAK❗*\n\nAnda belum terdaftar sebagai pengguna bot ini. Silakan bergabung dengan grup untuk mulai menggunakan bot.',
global.footer, 
[{type:"url", text: "Join", id: 'https://SatzzDev.github.io/Group'}], global.fake)
}
if (m.type === "interactiveResponseMessage" && m.quoted.fromMe) {
conn.appendTextMessage(
m,
JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id,
m,
);
}
if (m.type === "templateButtonReplyMessage" && m.quoted.fromMe) {
conn.appendTextMessage(m, m.msg.selectedId, m);
}        








//━━━━━━━━━━━━━━━[ HANDLE FUNCTION ]━━━━━━━━━━━━━━━━━//
handler.map(async (handle) => {
try {
await handle.function(m, {
chatUpdate,
conn,
budy,
store,
participants,
groupName,
groupMetadata,
isOwner,
user: db.data.users[m.sender],
isAdmins,
isBotAdmins,
isPremium,
chatUpdate,
reply,
freply,
text,
q,
qmsg,
args,
pushname,
react,
mime,
});
} catch (error) {
}
});

//━━━━━━━━━━━━━━━[ HANDLE COMMAND ]━━━━━━━━━━━━━━━━━//
if (isCmd) {
let matched = false;
await conn.sendPresenceUpdate('composing', m.chat)
for (let cmd of commands) {
if (cmd.command.test(command)) {
matched = true; 
try {
if (cmd.limit && !isPremium && db.data.users[m.sender].limit < 1)
return reply(global.mess.limit);
if (cmd.onlyPrem && !isPremium) return reply(global.mess.premium);
if (cmd.onlyOwner && !isOwner) return reply(global.mess.owner);
if (cmd.onlyAdmins && !isAdmins) return reply(global.mess.admin);
if (cmd.glimit && !isPremium && db.data.users[m.sender].glimit < 1)
return reply(global.mess.glimit);
if (cmd.onlyGroup && !m.isGroup) return reply(global.mess.group);

await cmd.function(m, {
conn,
budy,
store,
participants,
groupMetadata,
isOwner,
user: db.data.users[m.sender],
isAdmins,
isBotAdmins,
isPremium,
chatUpdate,
reply,
freply,
text,
q,
qmsg,
args,
react,
command,
});

if (cmd.limit && !isPremium) db.data.users[m.sender].limit -= 1;
if (cmd.glimit && !isPremium) db.data.users[m.sender].glimit -= 1;
} catch (err) {
console.error(err);
const stackLines = err.stack.split("\n");
const locationInfo = stackLines[1].trim();
const filePath = locationInfo.match(/\(([^)]+)\)/)[1];
const fileName = path.basename(filePath);
const lineNumber = filePath.split(":")[1];
reply("An error occurred. Please try again later.");
const errorMessage = `*「 SYSTEM-ERROR 」*\n📄COMMAND: \`${command}\`\n📂FILE: \`${fileName}\`\n📍LINE: \`${lineNumber}\`\n\n${util.format(err)}`;
conn.sendMessage(global.dev,{text: errorMessage,contextInfo: {externalAdReply: {title: "ERROR",thumbnailUrl:"https://telegra.ph/file/f1ca5cb8154286a123548.jpg",mediaType: 1,renderLargerThumbnail: true,},},},{ quoted: global.fake });
}
break; 
}
}
}
if (isCmd) {
console.log(
" ‎ ‎",
chalk.bgYellowBright(chalk.black("[ COMMAND ]")),
chalk.green(moment.tz("Asia/Jakarta").format("HH:mm")),
chalk.blue(body),
chalk.cyan("from"),
chalk.red(`${pushname}`),
m.isGroup ? `${chalk.red("in group")} ${chalk.red(groupName)}` : ""
);
}

if (m.mtype === "interactiveResponseMessage") {
conn.sendMessage(m.chat, {
delete: {
remoteJid: m.chat,
fromMe: false,
id: m.key.id,
participant: m.sender,
},
});
}

//━━━━━━━━━━━━━━━[ ERROR ]━━━━━━━━━━━━━━━━━//
} catch (err) {
if (err.message.includes("Cannot find module")) {
let module = err.message.split("Cannot find module '")[1].split("'")[0];
let text = `Module ${module} is not installed yet.
Click the button to install.`;
return conn.sendButtons(
global.dev,
"",
text,
global.author,
[
{
type: "btn",
text: "INSTALL",
id: `$ npm install ${module} --force`,
},
],
m
);
}
console.log(
" ‎ ‎ ",
chalk.bgRedBright(chalk.black("[ ERROR ]")),
chalk.yellow(util.format(err))
);
await conn.sendMessage(
global.dev,
{
text: `*「 SYSTEM-ERROR 」*\n${util.format(err)}`,
contextInfo: {
externalAdReply: {
title: "ERROR",
thumbnailUrl: "https://telegra.ph/file/f1ca5cb8154286a123548.jpg",
mediaType: 1,
renderLargerThumbnail: true,
},
},
},
{ quoted: m }
);
}
}, //━━━━━━━━━━━━━━━[ END OF EXPORT ]━━━━━━━━━━━━━━━━━//
};
//━━━━━━━━━━━━━━━[ FILE UPDATE ]━━━━━━━━━━━━━━━━━\\
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(
" ‎ ‎ ",
chalk.bgCyanBright(chalk.black("「 UPDATE 」")),
chalk.red(`${__filename}`)
);
delete require.cache[file];
require(file);
});
