/*
this script created by:
  
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/ 
                   __/ |                                      
                  |___/       

Social Media:
https://github.com/SatzzDev
https://instagram.com/kurniawan_Satria__
*/
"use-strict"
require("../config");
const { proto, getContentType, generateWAMessageFromContent, downloadContentFromMessage, prepareWAMessageMedia } = require("@whiskeysockets/baileys");
const fs = require("fs")
const moment = require("moment-timezone");
const util = require("util");
const chalk = require("chalk");
const { exec } = require("child_process");
const {ftxt, ttle} = require('../lib/scrapes')



//━━━━━━━━━━━━━━━[ LIBRARY ]━━━━━━━━━━━━━━━━━//
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const _prem = require("../lib/premium.js")

//━━━━━━━━━━━━━━━[ DATABASE ]━━━━━━━━━━━━━━━━━//
const premium = JSON.parse(fs.readFileSync('./src/premium.json'));



//━━━━━━━━━━━━━━━[ START OF EXPORT ]━━━━━━━━━━━━━━━━━//
module.exports = Satzz = async (Satzz, m, chatUpdate, store) => {
try {
var body = m.mtype === "conversation" ? m.message.conversation : m.mtype === "imageMessage" ? m.message.imageMessage.caption : m.mtype === "videoMessage" ? m.message.videoMessage.caption : m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId : m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId : m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId : m.mtype === "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id || m.text : "";
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = '.'
const isCmd = body.startsWith(prefix);
const cmds = body.trim().split(/ +/).shift().toLowerCase();
const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
var args = body.trim().split(/ +/).slice(1);
args = args.concat(["", "", "", "", "", ""]);
const pushname = m.pushName || "No Name";
const botNumber = await Satzz.decodeJid(Satzz.user.id);
const isCreator = global.owner + "@s.whatsapp.net" === m.sender ? true :  false
const isOwner = isCreator
const itsMe = m.sender == botNumber ? true : false;
const from = m.chat;
const q = args.join(" ").trim();
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const senderNumber = m.sender.split("@")[0];
const sender = senderNumber
const { commands } = require('../command.js')



//━━━━━━━━━━━━━━━[ CHECKER ]━━━━━━━━━━━━━━━━━//
const isPremium = isOwner ? true : _prem.checkPremiumUser(m.sender, premium)



//━━━━━━━━━━━━━━━[ GROUP-FUNC ]━━━━━━━━━━━━━━━━━//
const groupMetadata = m.isGroup ? await Satzz.groupMetadata(m.chat).catch((e) => { }) : ""; 
const groupName = groupMetadata.subject
const participants = m.isGroup ? await groupMetadata.participants : "";
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;



//━━━━━━━━━━━━━━━[ USERS PFP ]━━━━━━━━━━━━━━━━━//
let ppuser = await Satzz.profilePictureUrl(m.sender, "image").catch(_ => "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60");



//━━━━━━━━━━━━━━━[ FAKE QUOTED ]━━━━━━━━━━━━━━━━━//
const thumb = await getBuffer(await pickRandom(global.img))
const imgReply = await getBuffer('https://i.pinimg.com/originals/f2/fa/3a/f2fa3a130b769450acc7d1b1d8f0aa89.jpg')



//━━━━━━━━━━━━━━━[ FAKE CONTEXTINFO ]━━━━━━━━━━━━━━━━━//
const contextInfo = { isForwarded: true, forwardingScore: 1000, forwardedNewsletterMessageInfo: { newsletterJid: "120363229748458166@newsletter", serverMessageId: 100, newsletterName: "Powered by: SatganzDevs"}, businessMessageForwardInfo: {businessOwnerJid: botNumber},
}



const Ownerins = async (teki) => {
return await Satzz.sendMessage('6281316701742@s.whatsapp.net', {text: teki, contextInfo: {externalAdReply: {title: "ERROR", thumbnail: await getBuffer(await pickRandom(global.img)), mediaType: 1, renderLargerThumbnail: true}}},{quoted:m})}



//━━━━━━━━━━━━━━━[ FAKE REPLY ]━━━━━━━━━━━━━━━━━//
const reply = async(teks) => { return Satzz.sendMessage(m.chat, {text: teks, contextInfo:{ mentionedJid: [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") || [m.sender], isForwarded: true, forwardingScore: 1000, forwardedNewsletterMessageInfo: {newsletterJid: "120363229748458166@newsletter", serverMessageId: 100, newsletterName: "Powered by: SatganzDevs"}, externalAdReply: {showAdAttribution: true, renderLargerThumbnail: false, containsAutoReply: true, previewType: "PHOTO", title: `⌜ ${wm} ⌟`, body: ucapanWaktu, mediaType: "IMAGE", sourceUrl: link, thumbnail: imgReply}}},{ quoted: m })}



//━━━━━━━━━━━━━━━[ REACTION ]━━━━━━━━━━━━━━━━━//
const react = async (emoti) => { return Satzz.sendMessage(m.chat, {react: {text: emoti,key: {remoteJid: m.chat,fromMe: false,key: m.key,id: m.key.id,participant: m.sender}}})}



//━━━━━━━━━━━━━━━[ DB USER ]━━━━━━━━━━━━━━━━━//
const isNumber = (x) => typeof x === "number" && !isNaN(x);
let user = db.data.users[m.sender];
let limitUser = 10;
if (typeof user !== "object") db.data.users[m.sender] = {};
if (user) {
if (!('name' in user)) user.name = pushname;
if (!('id' in user)) user.id = senderNumber;
if (!isNumber(user.limit)) user.limit = limitUser;
if (!isNumber(user.glimit)) user.glimit = 15;
if (!isNumber(user.balance)) user.balance = 1000
if (!isNumber(user.afkTime)) user.afkTime = -1;
if (!("afkReason" in user)) user.afkReason = "";
} else {
global.db.data.users[m.sender] = {
name: pushname,
id: senderNumber,
date: global.calender,
limit: limitUser,
glimit: 15,
balance: 1000,
afkTime: -1,
afkReason: ""
}
}

let chats = db.data.chats[m.chat];
if (typeof chats !== "object") db.data.chats[m.chat] = {};
if (chats) {
if (!("auto_sticker" in chats)) chats.auto_sticker = false;
if (!("auto_sticker" in chats)) chats.auto_sticker = false;
} else
global.db.data.chats[m.chat] = {
auto_sticker: false,
};

    







//━━━━━━━━━━━━━━━[ LOGGING MESSAGE ]━━━━━━━━━━━━━━━━━//
if (isCmd) {
console.log(chalk.bgYellowBright(chalk.black("[ COMMAND ]")),
chalk.green(moment.tz('Asia/Jakarta').format('HH:mm')),
chalk.blue(`${command} [${args.length}]`), 
chalk.cyan('from'),
chalk.red(`${pushname}`), m.isGroup? `${chalk.red('in group')} ${chalk.red(groupName)}` : "")
}



//━━━━━━━━━━━━━━━[ PUBLIC & SELF ]━━━━━━━━━━━━━━━━━//
if (!Satzz.public) {
if (!m.key.fromMe && !isCreator) return;
}

    
    
//━━━━━━━━━━━━━━━[ HANDLE EDIT MESSAGE ]━━━━━━━━━━━━━━━━━//
if (m.mtype == 'editedMessage' && !itsMe) {
let mess = chatUpdate.messages[0].message.editedMessage.message.protocolMessage
let chats = Object.entries(await Satzz.chats).find(([user, data]) => data.messages && data.messages[mess.key.id])
let tipe = Object.keys(chats[1].messages[mess.key.id])
let pesan = chats[1].messages[mess.key.id].message.extendedTextMessage.text
reply(`*\`EDITED\`*: \n${chatUpdate.messages[0].message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text}\n\n*\`ORIGINAL\`*: \n${pesan}`)
chats[1].messages[mess.key.id].message.extendedTextMessage.text = chatUpdate.messages[0].message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text
}
    
    
    
//━━━━━━━━━━━━━━━[ HANDLE DELETE MESSAGE ]━━━━━━━━━━━━━━━━━//
else if (m.mtype == 'protocolMessage' && !itsMe && !m.key.remoteJid.includes('status@broadcast')) {
let mess = chatUpdate.messages[0].message.protocolMessage
let chats = Object.entries(await Satzz.chats).find(([user, data]) => data.messages && data.messages[mess.key.id])
if (chats[1] !== undefined) {
let msg = JSON.parse(JSON.stringify(chats[1].messages[mess.key.id]))
let mmk = await Satzz.copyNForward(mess.key.remoteJid, msg).catch(e => console.log(e, msg))
Satzz.sendMessage(mess.key.remoteJid, {text:`*\`ANTI DELETE\`*\n\n> ◩ TYPE: ${Object.keys(msg.message)[0]}\n> ◩ SENDER: @${mess.key.participant.split('@')[0]}\n`, contextInfo:{mentionedJid: [mess.key.participant]} },{quoted:msg})
}
}
    
    
    
//━━━━━━━━━━━━━━━[ HANDLE VIEWONCE MESSAGE ]━━━━━━━━━━━━━━━━━//
if ((m.mtype === "viewOnceMessageV2" || m.mtype === "viewOnceMessageV2Extension")) {
await Satzz.sendMessage(m.chat, { react: { text: "🤨", key: { remoteJid: m.chat, fromMe: false, key: m.key, id: m.key.id, participant: m.sender } } });
var view = m.mtype === "viewOnceMessageV2"? m.message.viewOnceMessageV2.message : m.message.viewOnceMessageV2Extension.message
let Type = Object.keys(view)[0];
view[Type].viewOnce = false
Satzz.sendMessage(m.chat, {forward: m},{quoted:m})
}

    
    
//━━━━━━━━━━━━━━━[ EVAL ]━━━━━━━━━━━━━━━━━//
if (budy.startsWith(">")) {
if (!isCreator && !itsMe) return reply(global.mess.owner);
const evalAsync = () => { return new Promise(async (resolve, reject) => {
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== "string")
evaled = require("util").inspect(evaled);
resolve(evaled) } catch (err) { reject(err) }})};
evalAsync().then((result) => reply(result)).catch((err) => reply(String(err)));    

    
    
//━━━━━━━━━━━━━━━[ EXEC ]━━━━━━━━━━━━━━━━━//
} else if (body.startsWith("$")){
if (!isCreator && !itsMe) return reply(global.mess.owner);
reply("Executing...");
exec(body.slice(2), async (err, stdout) => {
if (err) return m.reply(`${err}`);
if (stdout) return m.reply(stdout);
});     
}
//━━━━━━━━━━━━━━━[ EXPIRED PREMIUM ]━━━━━━━━━━━━━━━━━//
_prem.expiredCheck(Satzz, premium)
    
    

//━━━━━━━━━━━━━━━[ AFK RESPONSE ]━━━━━━━━━━━━━━━━━//    
let mentionUser = [...new Set([...(m.mentionedJid || []),...(m.quoted ? [m.quoted.sender] : []),]),];
for (let jid of mentionUser) {
let user = global.db.data.users[jid];
if (!user) continue;
let afkTime = user.afkTime;
if (!afkTime || afkTime < 0) continue;
let reason = user.afkReason || "";
reply(`Don't tag them!\nThey are currently AFK ${reason ? "with the reason " + reason : "without any reason"}\nFor ${CS(new Date() - afkTime)}`)
}
if (db.data.users[m.sender].afkTime > -1) {
let user = global.db.data.users[m.sender];
reply(`@${m.sender.split("@")[0]} stopped being AFK ${user.afkReason ? " after " + user.afkReason : ""}\nFor ${CS(new Date() - user.afkTime)}`);
user.afkTime = -1;
user.afkReason = "";
}

    
    
    
//━━━━━━━━━━━━━━━[ ROCK PAPER SCISSORS GAME ]━━━━━━━━━━━━━━━━━//
Satzz.suit = Satzz.suit ? Satzz.suit : {};
let game = Object.values(Satzz.suit).find((game) => game.id && game.status && [game.p, game.p2].includes(m.sender));
if (game) {
let winner = "";
let tie = false;
if (m.sender == game.p2 && /Y/i.test(m.text) && m.isGroup && game.status == "wait") {
if (/N/i.test(m.text)) {
Satzz.sendTextWithMentions(m.chat, `@${game.p2.split`@`[0]} declines the game, game cancelled`, m);
delete Satzz.suit[game.id];
return !0;
}
game.status = "play";
game.origin = m.chat;
clearTimeout(game.timer);
reply(`The game has been sent to the chat\n\n@${game.p.split`@`[0]} and \n@${game.p2.split`@`[0]}\n\nPlease choose your move in your respective chats\nClick https://wa.me/${botNumber.split`@`[0]}`);
if (!game.choice) Satzz.sendText(game.p, `Please choose \n\nRock🗿\nPaper📄\nScissors✂️`, m);
if (!game.choice2) Satzz.sendText(game.p2, `Please choose \n\nRock🗿\nPaper📄\nScissors✂️`, m);
game.choice_time = setTimeout(() => {
if (!game.choice && !game.choice2) Satzz.sendText(m.chat, `Both players are not willing to play,\nGame cancelled`);
else if (!game.choice || !game.choice2) {
winner = !game.choice ? game.p2 : game.p;
Satzz.sendTextWithMentions(m.chat, `@${(game.choice ? game.p2 : game.p).split`@`[0]} did not choose a move, game ends`, m);
}
delete Satzz.suit[game.id];
return !0;
}, game.timeout);
}
let player1 = m.sender == game.p;
let player2 = m.sender == game.p2;
let rock = /rock/i;
let paper = /paper/i;
let scissors = /scissors/i;
let regex = /^(rock|paper|scissors)/i;
if (player1 && regex.test(m.text) && !game.choice && !m.isGroup) {
game.choice = regex.exec(m.text.toLowerCase())[0];
game.text = m.text;
reply(`You have chosen ${m.text} ${!game.choice2 ? `\n\nWaiting for opponent to choose` : ""}`);
if (!game.choice2) Satzz.sendText(game.p2, "_Opponent has already chosen_\nNow it's your turn", 0);
}
if (player2 && regex.test(m.text) && !game.choice2 && !m.isGroup) {
game.choice2 = regex.exec(m.text.toLowerCase())[0];
game.text2 = m.text;
reply(`You have chosen ${m.text} ${!game.choice ? `\n\nWaiting for opponent to choose` : ""}`);
if (!game.choice) Satzz.sendText(game.p, "_Opponent has already chosen_\nNow it's your turn", 0);
}
let move1 = game.choice;
let move2 = game.choice2;
if (game.choice && game.choice2) {
clearTimeout(game.choice_time);
if (rock.test(move1) && scissors.test(move2)) winner = game.p;
else if (rock.test(move1) && paper.test(move2)) winner = game.p2;
else if (scissors.test(move1) && paper.test(move2)) winner = game.p;
else if (scissors.test(move1) && rock.test(move2)) winner = game.p2;
else if (paper.test(move1) && rock.test(move2)) winner = game.p;
else if (paper.test(move1) && scissors.test(move2)) winner = game.p2;
else if (move1 == move2) tie = true;
Satzz.sendText(game.origin, `_*Game Result*_ ${tie ? "\nTIE" : ""}\n\n@${game.p.split`@`[0]} (${game.text}) ${tie ? "" : game.p == winner ? ` Wins \n` : ` Loses \n`}@${game.p2.split`@`[0]} (${game.text2}) ${tie ? "" : game.p2 == winner ? ` Wins \n` : ` Loses \n`}\n\n+500`.trim(), m, {mentions: [game.p, game.p2]});
db.data.users[winner].balance += 500
delete Satzz.suit[game.id];
}
}






//━━━━━━━━━━━━━━━[ GAME TEBAK-ILMIAH ]━━━━━━━━━━━━━━━━━//  
Satzz.tebakilmiah = Satzz.tebakilmiah ? Satzz.tebakilmiah : {}  
if (m.isGroup && from in Satzz.tebakilmiah){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(Satzz.tebakilmiah[id][1]))
if (budy.toLowerCase() == json.answer.toLowerCase().trim()) {
user.balance += 1000
Satzz.sendButtons(m.chat, ftxt('TEBAK - ILMIAH'), `Your answer is correct.!\n+1000 Balance`, global.author, [{type:'btn', text:ttle("PLAY - AGAIN"), id:".tebakilmiah"},{type:'btn', text:'👍', id:""}], m)
clearTimeout(Satzz.tebakilmiah[id][3])
delete Satzz.tebakilmiah[id]
} else if (similarity(budy.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) reply(`*Close Enough!*`)
}     



//━━━━━━━━━━━━━━━[ GAME SIAPAKAH-AKU ]━━━━━━━━━━━━━━━━━//   
Satzz.siapakahaku = Satzz.siapakahaku ? Satzz.siapakahaku : {}  
if (m.isGroup && from in Satzz.siapakahaku){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(Satzz.siapakahaku[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.balance += 1000
Satzz.sendButtons(m.chat, ftxt('SIAPA - KAH - AKU'), `Your answer is correct.!\n+1000 Balance`, global.author, [{type:'btn', text:ttle("PLAY - AGAIN"), id:".siapakahaku"},{type:'btn', text:'👍', id:""}], m)
clearTimeout(Satzz.siapakahaku[id][3])
delete Satzz.siapakahaku[id]
} else if (similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Close Enough!*`)
}    



//━━━━━━━━━━━━━━━[ GAME TEBAK-GAMBAR ]━━━━━━━━━━━━━━━━━//  
Satzz.tebakgambar = Satzz.tebakgambar ? Satzz.tebakgambar : {}  
if (m.isGroup && from in Satzz.tebakgambar){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(Satzz.tebakgambar[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.balance += 500
Satzz.sendButtons(m.chat, ftxt('TEBAK - GAMBAR'), `Your answer is correct.!\n+500 Balance`, global.author, [{type:'btn', text:ttle("PLAY - AGAIN"), id:".tebakgambar"},{type:'btn', text:'👍', id:""}], m)
clearTimeout(Satzz.tebakgambar[id][3])
delete Satzz.tebakgambar[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Close Enough!*`)
}    
 
    
    
    
    
    
// Limit Handling
async function handleLimit(cmd, m, command, Satzz) {
if (db.data.users[m.sender].limit < 1) return reply(mess.limit);
await react('⏳');
await cmd.function(m, command, Satzz);
await react('✔️');
db.data.users[m.sender].limit -= 1;
}
// GLimit Handling
async function handleGLimit(cmd, m, command, Satzz) {
if (db.data.users[m.sender].glimit < 1) return reply('Your game limit has been reached');
await react('⏳');
await cmd.function(m, command, Satzz);
await react('✔️');
db.data.users[m.sender].glimit -= 1;
}
// Command Function Execution
async function executeCmdFunction(cmd, m, command, Satzz) {
await react('⏳');
await cmd.function(m, command, Satzz);
await react('✔️');
}
// Command Execution
async function executeCommand(cmd, m, command, Satzz) {
try {
if (cmd.onlyOwner &&!isOwner) return reply('owner Only!');
if (cmd.onlyPrem &&!isPremium) return reply('premium Only!');
if (cmd.onlyGroup &&!m.isGroup) return reply('group Only!');
if (cmd.onlyAdmins &&!isAdmins) return reply('Admins Only!');
if (cmd.onlyPm && m.isGroup) return reply('private chats Only!');
if (cmd.limit &&!isPremium) {
return handleLimit(cmd, m, command, Satzz);
} else if (cmd.glimit) {
return handleGLimit(cmd, m, command, Satzz);
} else {
return executeCmdFunction(cmd, m, command, Satzz);
}
} catch (err) {
console.error(err);
reply('An error occurred. Please try again later.')
return Ownerins('```' + util.format(err) + '```');
}
}
// Did You Mean Functionality
async function didYouMean(command, cmd) {
const didyoumean = require('didyoumean');
const similarity = require('similarity');
const mean = didyoumean(command, cmd.aliases);
const sim = similarity(command, mean);
const som = sim * 100;
const teks = `Did You Mean ${mean}?\n\n ◦ Menu Name: *${mean}*\n  ◦ Similarity: *${parseInt(som)}%*`;
if (mean) {
return Satzz.sendButtons(m.chat, `Did You Mean ${mean}?`, teks, global.author, [{ type: 'btn', text: mean.toUpperCase(), id: `.${mean}` }], m);
}
}

if (isCmd) {
// Main Command Execution
commands.map(async (cmd) => {
if (cmd.pattern.test(command)) {
await executeCommand(cmd, m, command, Satzz);
} else {
//await didYouMean(command, cmd);
}
});
switch (command) {
//━━━━━━━━━━━━━━━[ OWNER MENU ]━━━━━━━━━━━━━━━━━\\
case "kirim": case "send":{
if (!q) return (`mana urlnya? contoh: .${command} https//xnxxxx.mp4|lol`)
reply(global.mess.wait)
let urls =  q
Satzz.sendMessage(m.chat, {video: {url: urls }, caption: q.split('|')[1] || "", contextInfo},{quoted: m})
}
break
case "setppbot":{
if (!isCreator) return reply(global.mess.owner);
let medis = await Satzz.downloadAndSaveMediaMessage(qmsg, "ppg");
var { img } = await generateProfilePicture(medis);
await Satzz.query({tag: "iq", attrs: { to: botNumber, type: "set", xmlns: "w:profile:picture" }, content: [{tag: "picture", attrs: { type: "image" }, content: img }]});
reply("Profile picture has been changed.")
}
break;
case "public":{
if (!isCreator && !itsMe) return reply(mess.owner);
if (Satzz.public == true) return reply(`Already in Public Mode!`)
Satzz.public = true;
reply("Success Change To Public Mode");
}
break;
case "self":{
if (!isCreator && !itsMe) return reply(mess.owner);
if (!Satzz.public) return reply(`Already in Self Mode!`)
Satzz.public = false;
reply("Success Change To Self Mode");
}
break;
default:
}
}

//━━━━━━━━━━━━━━━[ MENFESS RESPONSE ]━━━━━━━━━━━━━━━━━//
if (m.chat.endsWith("@s.whatsapp.net") && m.message) {
Satzz.menfess = Satzz.menfess ? Satzz.menfess : {};
let room = Object.values(Satzz.menfess).find((room) => [room.a, room.b].includes(m.sender) && room.state === "ACTIVE");
if (room) {
if (/^.*(leave|cancel)/.test(m.text)) {
reply(`\`\`\`You have left the Menfess session\`\`\``);
let other = room.other(m.sender);
if (other) await Satzz.sendText(other, `\`\`\`Partner has left the Menfess session\`\`\``, {contextInfo});
delete Satzz.menfess[room.id];
return
}
let other = [room.a, room.b].find((user) => user !== m.sender);
m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? { contextInfo: { ...m.msg.contextInfo, forwardingScore: 0, isForwarded: true, participant: other } } : {});
}
}
    
//━━━━━━━━━━━━━━━[ MENFESS WAITING ]━━━━━━━━━━━━━━━━━//
if (m.chat.endsWith("@s.whatsapp.net") && m.message) {
Satzz.menfess = Satzz.menfess ? Satzz.menfess : {};
let room = Object.values(Satzz.menfess).find((room) => [room.a, room.b].includes(m.sender) && room.state === "WAITING");
if (room) {
if (m.sender == room.b) {
if (m.text == "Y") {
reply("```Anonymous Chat has been connected\nType *leave* to stop```");
room.state = "ACTIVE";
let other = [room.a, room.b].find((user) => user !== m.sender);
Satzz.sendMessage(other, { text: "```Recipient has confirmed, Anonymous Chat has been connected```", });
}
if (m.text == "N") {
m.reply("Okay.");
let other = [room.a, room.b].find((user) => user !== m.sender);
Satzz.sendMessage(other, { text: "```Sorry to say but, Recipient declined Anonymous.```" });
delete Satzz.menfess[room.id];
}
}
}
}
    
    
if (db.data.chats[m.chat].auto_sticker) {
if (/image/.test(m.msg.mimetype) && !/webp/.test(m.msg.mimetype)) {
let media = await Satzz.downloadMediaMessage(qmsg);
Satzz.sendImageAsSticker(m.chat, media, m, {pack: global.packname, author: global.author});
} else if (/video/.test(mime)) {
let media = await Satzz.downloadMediaMessage(qmsg);
let encmedia = await Satzz.sendVideoAsSticker(m.chat, media, m, {pack: global.packname, author: global.author});
await fs.unlinkSync(encmedia);
}
}
 //━━━━━━━━━━━━━━━[ AUTO DL INSTAGRAM ]━━━━━━━━━━━━━━━━━//
if (budy.startsWith("https://") && budy.includes("instagram.com")) {
if (!isPremium && db.data.users[m.sender].limit < 1) return reply(mess.limit);
react('⏳')
try {
const res = await fetchJson(`https://api.satganzdevs.tech/api/snapsave?apikey=satria&url=${budy}`);
for (let i of res.data) { Satzz.sendFileUrl(m.chat, i.url, '', m, {contextInfo}) }
react('✔️')
} catch (e) {
const { instaDL } = require('../lib/scrapes')
const res = await instaDL(budy);
Satzz.sendFileUrl(m.chat, res.urls, '', m, {contextInfo})
react('✔️')
}
//━━━━━━━━━━━━━━━[ AUTO DL TIKTOK ]━━━━━━━━━━━━━━━━━//
} else if (budy.startsWith("https://") && budy.includes("tiktok")) {
if (!isPremium && db.data.users[m.sender].limit < 1) return reply(mess.limit);
react('⏳')
const Tiktok = require("@tobyg74/tiktok-api-dl")
let result = await Tiktok.Downloader(budy, {version: "v3"})
await reply(`*\`${ftxt('TIKTOK - DOWNLOADER')}\`*\n\n⭔ *Desc* : ${result.result.desc}`)
if (result.result.type == 'image') { 
for (let i of result.result.images) { 
await Satzz.sendFileUrl(m.chat, i, "", m, {contextInfo})
}
} else if (result.result.type == 'video') { 
await Satzz.sendFileUrl(m.chat, result.result.video_hd, "", m, {contextInfo}) 
}
}
    
    
    



//━━━━━━━━━━━━━━━[ ERROR ]━━━━━━━━━━━━━━━━━// 
} catch (err) {
const Ownerins = async (teki) => {
return await Satzz.sendMessage("6281316701742@s.whatsapp.net", {text: teki, contextInfo: {externalAdReply: {title: "ERROR", thumbnail: await getBuffer(await pickRandom(global.img)), mediaType: 1, renderLargerThumbnail: true}}},{quoted:m})
}
if (err.message.includes("Cannot find module")){
let module = err.message.split("Cannot find module '")[1].split("'")[0]
let text = `Module ${module} is not installed yet.
Click the button to install.`;
return Satzz.sendButtons("6281316701742@s.whatsapp.net", '',text,author,[{type:'btn',text:'INSTALL',id:`$ npm install ${module}`}],m)
}
console.log(chalk.bgRedBright(chalk.black("[ ERROR ]")),chalk.yellow(util.format(err)))
const lines = util.format(err).split('\n'); 
const fileLine = lines[1].split('(/home/container/'); 
const file = fileLine[1].split(':')[0]; 
const line = fileLine[1].split(':')[1]; 
let tekidum =`*\`「 SYSTEM-ERROR 」\`*

\`MESSAGE\`
${err.message}

\`FILE\`
${file}

\`LINE\`
${line}
`
await Ownerins(tekidum)
}
} //━━━━━━━━━━━━━━━[ END OF EXPORT ]━━━━━━━━━━━━━━━━━//



//━━━━━━━━━━━━━━━[ FILE UPDATE ]━━━━━━━━━━━━━━━━━\\
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.bgCyanBright(chalk.black("「 UPDATE 」")),chalk.red(`${__filename}`))
delete require.cache[file];
require(file);
});
