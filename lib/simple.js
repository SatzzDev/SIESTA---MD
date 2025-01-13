const {
default: makeWASocket, 
areJidsSameUser,
DisconnectReason,
downloadContentFromMessage,
fetchLatestBaileysVersion,
generateForwardMessageContent,
generateMessageID,
generateWAMessage,
generateWAMessageFromContent,
getAggregateVotesInPollMessage,
getContentType,
jidDecode,
makeCacheableSignalKeyStore,
makeInMemoryStore,
MessageRetryMap,
prepareWAMessageMedia,
useMultiFileAuthState,
WAMessageStubType,
proto,
} = require("@whiskeysockets/baileys")
const fs = require('fs');
const pino = require('pino')
const chalk = require('chalk')
const path = require('path')
const readline = require("readline");
const axios = require('axios')
const FileType = require('file-type')
const yargs = require('yargs/yargs')
const NodeCache = require('node-cache')
const _ = require('lodash')
const { Boom } = require('@hapi/boom')
const { exec } = require('child_process');
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./exif')
const { getBuffer, fetchJson, pickRandom, sleep, clockString, runtime } = require("./myfunc")
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

exports.Socket = (connectionOptions, options = {}) => {
const conn = makeWASocket(connectionOptions)



//LOAD MESSAGES
conn.loadMessage = (messageID) => {
return Object.entries(conn.chats)
.filter(([_, { messages }]) => typeof messages === 'object')
.find(([_, { messages }]) => Object.entries(messages)
.find(([k, v]) => (k === messageID || v.key?.id === messageID)))
?.[1].messages?.[messageID]
}

conn.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

if (conn.user && conn.user.id) conn.user.jid = conn.decodeJid(conn.user.id)
conn.chats = {}
conn.contacts = {}

conn.saveName = async (id, name = '') => {
if (!id) return
id = conn.decodeJid(id)
let isGroup = id.endsWith('@g.us')
if (id in conn.contacts && conn.contacts[id][isGroup ? 'subject' : 'name'] && id in conn.chats) return
let metadata = {}
if (isGroup) metadata = await conn.groupMetadata(id)
let chat = { ...(conn.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
conn.contacts[id] = chat
conn.chats[id] = chat
}

conn.getName = (jid = '', withoutContact = false) => {
let myUser = Object.keys(db.data.users)
let nana = myUser.includes(jid) ? 'User terdeteksi' : 'User tidak terdeteksi'
let jod = jid
jid = conn.decodeJid(jid)
withoutContact = conn.withoutContact || withoutContact
let v
if (jid.endsWith('@g.us')) {
return conn.groupMetadata(jid).then((v) => {
return v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
})
} else {
v = jid === '0@s.whatsapp.net' ? { jid, vname: 'WhatsApp' } : areJidsSameUser(jid, conn.user.id) ? conn.user : (conn.chats[jid] || {})
return Promise.resolve((withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || (myUser.includes(jod) ? db.data.users[jod].name : PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international').replace(new RegExp("[()+-/ +/]", "gi"), "")))
}
}

conn.serializeM = (m) => smsg(conn, m, store)
// Fungsi untuk memproses tipe pesan stub
conn.processMessageStubType = async (m) => {
if (!m.messageStubType) return;

const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '');
if (!chat || chat === 'status@broadcast') return;

const emitGroupUpdate = (update) => {
ev.emit('groups.update', [{ id: chat, ...update }]);
};

console.log({
messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType],
});

const isGroup = chat.endsWith('@g.us');
if (!isGroup) return;

let chats = conn.chats[chat];
if (!chats) chats = conn.chats[chat] = { id: chat };
chats.isChats = true;

const metadata = await conn.groupMetadata(chat).catch(_ => null);
if (!metadata) return;

chats.subject = metadata.subject;
chats.metadata = metadata;
};

// Fungsi untuk memasukkan semua grup
conn.insertAllGroup = async () => {
const groups = await conn.groupFetchAllParticipating().catch(_ => null) || {};
for (const group in groups) {
conn.chats[group] = {
...(conn.chats[group] || {}),
id: group,
subject: groups[group].subject,
isChats: true,
metadata: groups[group],
};
}
return conn.chats;
};

// Fungsi untuk memproses dan memasukkan pesan ke dalam chat
conn.pushMessage = async (m) => {
if (!m) return;
if (!Array.isArray(m)) m = [m];

for (const message of m) {
try {
if (!message) continue;

if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) {
conn.processMessageStubType(message).catch(console.error);
}

const _mtype = Object.keys(message.message || {});
const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
(_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
_mtype[_mtype.length - 1];

const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '');

if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
let context = message.message[mtype].contextInfo;
let participant = conn.decodeJid(context.participant);
const remoteJid = conn.decodeJid(context.remoteJid || participant);
let quoted = message.message[mtype].contextInfo.quotedMessage;

if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
let qMtype = Object.keys(quoted)[0];
if (qMtype == 'conversation') {
quoted.extendedTextMessage = { text: quoted[qMtype] };
delete quoted.conversation;
qMtype = 'extendedTextMessage';
}
if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {};
quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || [];
const isGroup = remoteJid.endsWith('g.us');
if (isGroup && !participant) participant = remoteJid;
const qM = {
key: {
remoteJid, 
fromMe: areJidsSameUser(conn.user.jid, remoteJid),
id: context.stanzaId, 
participant,
},
message: JSON.parse(JSON.stringify(quoted)),
...(isGroup ? { participant } : {}),
};

let qChats = conn.chats[participant];
if (!qChats) qChats = conn.chats[participant] = { id: participant, isChats: !isGroup };
if (!qChats.messages) qChats.messages = {};
if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM;

let qChatsMessages;
if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) {
qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length));
}
}
}

if (!chat || chat === 'status@broadcast') continue;
const isGroup = chat.endsWith('@g.us');
let chats = conn.chats[chat];
if (!chats) {
if (isGroup) await conn.insertAllGroup().catch(console.error);
chats = conn.chats[chat] = { id: chat, isChats: true, ...(conn.chats[chat] || {}) };
}

let metadata, sender;
if (isGroup) {
if (!chats.subject || !chats.metadata) {
metadata = await conn.groupMetadata(chat).catch(_ => ({})) || {};
if (!chats.subject) chats.subject = metadata.subject || '';
if (!chats.metadata) chats.metadata = metadata;
}
sender = conn.decodeJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || '');
if (sender !== chat) {
let senderChats = conn.chats[sender];
if (!senderChats) senderChats = conn.chats[sender] = { id: sender };
if (!senderChats.name) senderChats.name = message.pushName || senderChats.name || '';
}
} else if (!chats.name) {
chats.name = message.pushName || chats.name || '';
}

if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue;
chats.isChats = true;
if (!chats.messages) chats.messages = {};

const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id);
if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
delete message.message.messageContextInfo;
delete message.message.senderKeyDistributionMessage;
chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2));

let chatsMessages;
if ((chatsMessages = Object.entries(chats.messages)).length > 40) {
chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length));
}
}
} catch (e) {
console.error(e);
}
}
};



conn.sendContact = async (jid, kon, nama, quoted = '', opts = {}) => {
let list = [{
displayName: nama,
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${nama}\nFN:${nama}\nitem1.TEL;waid=${kon}:${PhoneNumber('+' + kon).getNumber('international')}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:satganzdevs@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://chat.whatsapp.com/HbCl8qf3KQK1MEp3ZBBpSf\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`}]
conn.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

conn.sendPoll = (jid, name = "", values = [], selectableCount = 1) => {
return conn.sendMessage(jid, { poll: { name, values, selectableCount } });
};   
conn.public = true  
conn.maintenance = false
const { proto, generateWAMessageFromContent, prepareWAMessageMedia, generateWAMessageContent } = require('@whiskeysockets/baileys');

// Fungsi untuk mengirim pesan interaktif tanpa gambar
conn.sendButton = async (id, title, text, footer, buttons, quoted) => {
let message = generateWAMessageFromContent(id, proto.Message.fromObject({
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2,
},
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create({
title,
hasMediaAttachment: false
}),
body: proto.Message.InteractiveMessage.Body.create({ text }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons }), 
contextInfo: {
mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g), ...title.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") || ''
}
})
}
}
}), { quoted, userJid: id });
return conn.relayMessage(id, message.message, { quoted, messageId: message.key.id });
}

conn.sendButtonV2 = async (id, image, title, text, footer, buttons, quoted) => {
try {
let { imageMessage } = await generateWAMessageContent({ image }, { upload: conn.waUploadToServer });
let message = generateWAMessageFromContent(id, proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false
}),
body: proto.Message.InteractiveMessage.Body.create({ text:"" }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [
{
body: proto.Message.InteractiveMessage.Body.fromObject({ text }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: footer }),
header: proto.Message.InteractiveMessage.Header.fromObject({hasMediaAttachment: true,imageMessage}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons })
}
], 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons })
}),
contextInfo: {
isForwarded:true,
forwardedNewsletterMessageInfo:{
newsletterJid: "120363229748458166@newsletter", 
serverMessageId: 100,
ContentType: 2,
newsletterName:global.newsletterName,
},
mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") || ''
}
})
}
}
}), { quoted, userJid: id });
return conn.relayMessage(id, message.message, { quoted, messageId: message.key.id });
} catch (error) {
console.error("Error sending carousel message:", error);
}
};




conn.sendListMsg = async (id, title, text, footer, buText, secTitle, label, rows, quoted) => {
let but = [];
rows.map(button => {
but.push({title: button[0], id: button[1]})
});
const rowr = [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: buText,
sections: [{
title: secTitle,
highlight_label: label,
rows: but // Menggunakan array yang sudah diformat
}]
})
}];
return conn.sendButton(id, title, text, footer, rowr, quoted);
}
conn.sendList = async (id, title, text, footer, buText, sections, quoted) => {
const rowr = [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: buText,
sections: sections.map(([secTitle, buttons]) => ({
title: secTitle,
rows: buttons.map(button => ({ title: button.title, id: button.id }))
}))
})
}];
return conn.sendButton(id, title, text, footer, rowr, quoted);
}
conn.sendListMsgV3 = async (id, title, text, footer, buText, sections, quoted) => {
const rowr = [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: buText,
sections
})
}];
return conn.sendButton(id, title, text, footer, rowr, quoted);
}
conn.sendListMsgV2 = async (id, img, title, text, footer, buText, secTitle, label, rows, quoted) => {
let { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys')
let image = await prepareWAMessageMedia({ image: {url:img}}, {upload: conn.waUploadToServer})
let but = [];
rows.map(button => {
but.push({title: button[0], description: button[1], id: button[2]})
});
const rowr = [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: buText,
sections: [{
title: secTitle,
highlight_label: label,
rows: but // Menggunakan array yang sudah diformat
}]
})
}];
let msg = generateWAMessageFromContent(id, proto.Message.fromObject({viewOnceMessage: {message: {"messageContextInfo": {"deviceListMetadata": {},"deviceListMetadataVersion": 2},
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create({title, subtitle: "", imageMessage: image.imageMessage,
hasMediaAttachment: true}),
body: proto.Message.InteractiveMessage.Body.create({text: text}),
footer: proto.Message.InteractiveMessage.Footer.create({text: footer}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({buttons:rowr}),
contextInfo:{ 
isForwarded: true, 
forwardingScore: 1000, 
forwardedNewsletterMessageInfo:{
newsletterJid: "120363229748458166@newsletter", 
serverMessageId: 100,
ContentType: 2,
newsletterName:global.newsletterName,
},
mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g),...title.matchAll(/@([0-9]{5,16}|0)/g),...footer.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") ||''}})}}}), {quoted, userJid: id})
return conn.relayMessage(id, msg.message, {quoted, messageId: msg.key.id})
//return conn.sendButton(id, title, text, footer, rowr, quoted);
}


conn.sendButtonText = async(id, title, text, footer, button, quoted) => {
return conn.sendButton(id, title, text, footer, [{name: 'quick_reply', buttonParamsJson: JSON.stringify(button)}], quoted)
}


conn.sendMediaButtons = async (id, title, text, footer, buttons = [], quoted = '', options = {}) => {
const formattedButtons = [];
for (const button of buttons) {
let buttonParamsJson;
if (button.type === 'copy') {
buttonParamsJson = JSON.stringify({ display_text: button.text, id: '12345', copy_code: button.id });
} else if (button.type === 'url') {
buttonParamsJson = JSON.stringify({ display_text: button.text, url: button.id, merchant_url: button.id });
} else if (button.type === 'btn') {
buttonParamsJson = JSON.stringify({ title: button.text, payload: button.id });
}
formattedButtons.push({
name: button.type === 'copy'? 'cta_copy' : (button.type === 'url'? 'cta_url' : 'quick_reply'),
buttonParamsJson: buttonParamsJson
});
}

let hasMediaAttachment = true;
let media = null;
if (options.img) {
media = await prepareWAMessageMedia({ image: { url: options.img } }, { upload: conn.waUploadToServer });
} else if (options.video) {
media = await prepareWAMessageMedia({ video: { url: options.video },  }, { upload: conn.waUploadToServer });
} else {
hasMediaAttachment = false;
}

const msg = generateWAMessageFromContent(id,
proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create({
title,
subtitle: "",
imageMessage: media.imageMessage ? media.imageMessage : null,
videoMessage: media.videoMessage ? media.videoMessage : null,
hasMediaAttachment: hasMediaAttachment
}),
body: proto.Message.InteractiveMessage.Body.create({ text }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: formattedButtons }),
contextInfo: {
isForwarded: true,
forwardingScore: 1000,
forwardedNewsletterMessageInfo:{
newsletterJid: "120363229748458166@newsletter", 
serverMessageId: 100,
ContentType: 2,
newsletterName:global.newsletterName,
},
mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") || ''
}
})
}
}
}), { quoted, userJid: id });

return conn.relayMessage(id, msg.message, { quoted, messageId: msg.key.id });
}
conn.sendbutGif = async (id, title, text, footer, buttons = [], quoted = '', options = {}) => {
const formattedButtons = [];
for (const button of buttons) {
let buttonParamsJson;
if (button.type === 'copy') {
buttonParamsJson = JSON.stringify({ display_text: button.text, id: '12345', copy_code: button.id });
} else if (button.type === 'url') {
buttonParamsJson = JSON.stringify({ display_text: button.text, url: button.id, merchant_url: button.id });
} else if (button.type === 'btn') {
buttonParamsJson = JSON.stringify({ display_text: button.text, id: button.id });
}
formattedButtons.push({
name: button.type === 'copy'? 'cta_copy' : (button.type === 'url'? 'cta_url' : 'quick_reply'),
buttonParamsJson: buttonParamsJson
});
}
let hasMediaAttachment = true;
let media = await prepareWAMessageMedia({ video: { url: options.video, gifPlayback:true }, gifPlayback:true }, { gifPlayback: true, upload: conn.waUploadToServer });
const msg = generateWAMessageFromContent(id,
proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create({
title,
subtitle: "",
videoMessage: media.videoMessage,
hasMediaAttachment: true
}),
body: proto.Message.InteractiveMessage.Body.create({ text }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: formattedButtons }),
contextInfo: {
isForwarded: true,
forwardingScore: 1000,
forwardedNewsletterMessageInfo:{
newsletterJid: "120363229748458166@newsletter", 
serverMessageId: 100,
ContentType: 2,
newsletterName:global.newsletterName,
},
mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") || ''
}
})
}
}
}), { quoted, userJid: id });
return conn.relayMessage(id, msg.message, { quoted, messageId: msg.key.id });
}

conn.sendEditMsg = async (jid, strings = [], quoted, timer = 1000) => {
let { key } = await conn.sendMessage(jid, { text: strings[0] }, { quoted });
await sleep(timer)
const sendWithDelay = async (index) => {
if (index < strings.length) {
await conn.sendMessage(jid, { text: strings[index], edit: key });
setTimeout(() => sendWithDelay(index + 1), timer);
}
};
return sendWithDelay(1);
};



conn.sendButtons = async (id, title, text, footer, buttons = [], quoted = '', options = {}) => {
  const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

  const formattedButtons = buttons.map(button => {
    const buttonTypes = {
      copy: () => JSON.stringify({ display_text: button.text, id: '12345', copy_code: button.id }),
      call: () => JSON.stringify({ display_text: button.text, phone_number: button.id }),
      url: () => JSON.stringify({ display_text: button.text, url: button.id }),
      btn: () => JSON.stringify({ display_text: button.text, id: button.id }),
      list: () => JSON.stringify({
        title: button.title || 'Menu',
        sections: button.sections
      })
    };

    const buttonType = button.type || 'btn';
    const buttonParamsJson = buttonTypes[buttonType] ? buttonTypes[buttonType]() : buttonTypes.btn();

    return {
      name: buttonType === 'copy' ? 'cta_copy' :
            buttonType === 'call' ? 'cta_call' :
            buttonType === 'url' ? 'cta_url' :
            buttonType === 'list' ? 'single_select' : 'quick_reply',
      buttonParamsJson
    };
  });

  let imageMessage = null;
  if (options.img) {
    const buffer = Buffer.isBuffer(options.img)
      ? options.img
      : /^data:.*?\/.*?;base64,/i.test(options.img)
      ? Buffer.from(options.img.split(',')[1], 'base64')
      : /^https?:\/\//.test(options.img)
      ? await getBuffer(options.img)
      : fs.existsSync(options.img)
      ? fs.readFileSync(options.img)
      : null;

    if (buffer) {
      const media = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer });
      imageMessage = media.imageMessage;
    }
  }
const headerContent = imageMessage ? { hasMediaAttachment: true, imageMessage } : {};
const msg = generateWAMessageFromContent(id, proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create(headerContent),
body: proto.Message.InteractiveMessage.Body.create({ text }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: formattedButtons }),
contextInfo: {
mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + "@s.whatsapp.net") || '',
isForwarded: true,
forwardedNewsletterMessageInfo:{
newsletterJid: "120363229748458166@newsletter", 
serverMessageId: 100,
ContentType: 2,
newsletterName:global.newsletterName,
},
}
})
}
}
}), { quoted, userJid: id });
return conn.relayMessage(id, msg.message, { quoted, messageId: msg.key.id });
};



conn.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer} 

conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })}





//Funtion o geing file 
conn.getFile = async (PATH, returnAsFilename) => {
let res, filename
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
if (data && returnAsFilename && !filename) (filename = path.join('../' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
return {
res,
filename,
...type,
data
}
}

conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })


conn.adReply = (jid, text, title = '', body = '', buffer, sourceUrl = '', quoted, options) => {
return conn.sendMessage(jid, { text, 
contextInfo: {
mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net"),
externalAdReply: {
showAdAttribution: true,
mediaType: 1,
title,
body,
thumbnail:buffer,
renderLargerThumbnail: true,
sourceUrl
}
}
},{ quoted: quoted, ...options})
}



conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })



conn.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
let msg = proto.Message.fromObject({
groupInviteMessage: proto.Message.GroupInviteMessage.fromObject({
inviteCode,
inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
groupJid: jid,
groupName: groupName ? groupName : await conn.getName(jid),
caption
})
})
let message = generateWAMessageFromContent(participant, msg, {userJid: conn.decodeJid(conn.user.id), ephemeralExpiration: 3 * 24 * 60 * 60, ...options})
await conn.relayMessage(participant, message.message, {messageId: message.key.id})
return message
}


conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
let mime = "";
try {
// Fetch first few bytes to determine MIME type
let res = await axios.get(url, {
headers: {
Range: "bytes=0-512" // Fetch only first 512 bytes
}
});

mime = res.headers["content-type"];

if (mime.split("/")[1] === "gif") {
return conn.sendMessage(jid, {
video: await getBuffer(url),
caption: caption,
gifPlayback: true,
...options,
}, { quoted });
}

let type = mime.split("/")[0] + "Message";

if (mime === "application/pdf") {
return conn.sendMessage(jid, {
document: await getBuffer(url),
mimetype: "application/pdf",
caption: caption,
...options,
}, { quoted });
}

if (mime.split("/")[0] === "image") {
return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted });
}

if (mime.split("/")[0] === "video" || mime.split("/")[1] === "octet-stream") {
return conn.sendMessage(jid, {
video: await getBuffer(url),
caption: caption,
mimetype: "video/mp4",
...options,
}, { quoted });
}

if (mime.split("/")[0] === "audio") {
return conn.sendMessage(jid, {
audio: await getBuffer(url),
caption: caption,
mimetype: "audio/mpeg",
...options,
}, { quoted });
}

console.error("Unsupported MIME type: ", mime);
} catch (err) {
console.error("Failed to fetch file or determine MIME type: ", err);
}
}



conn.sendContactArray = async (jid, data, quoted, options) => {
let contacts = [];

for (let [number, name, org, note] of data) {
number = number.replace(/[^0-9]/g, ''); // Remove non-numeric characters from number

let contextInfo = {
externalAdReply: {
showAdAttribution: true,
mediaType: 1,
title: 'SatzzDev.',
sourceUrl: global.link,
renderLargerThumbnail: true,
thumbnailUrl: 'https://i.pinimg.com/originals/6b/45/3a/6b453a1ed9673d56e34673b281ede225.jpg',
}
};

// Customize your vCard with organization and note fields
let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
ORG:${org || ''}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${note ? note.replace(/\n/g, '\\n') : ''}
END:VCARD`.trim();

contacts.push({ contextInfo, vcard, displayName: name });
}

let displayName = (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null;

return await conn.sendMessage(jid, {
contacts: {
displayName,
contacts,
}
}, {
quoted,
...options
});
}







conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}





conn.sendSticker = (teks) => {
conn.sendMessage(m.chat, {sticker: {url: teks}},{quoted: m})
}






conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}






conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}






conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
...content,
...options}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === conn.user.id
return proto.WebMessageInfo.fromObject(copy)
}



conn.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
let types = await conn.getFile(PATH, true)
let { filename, size, ext, mime, data } = types
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: global.packname, author: global.packname2, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await conn.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)
}


conn.parseMention = async(text) => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}






conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message}}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo}} : {})} : {})
await conn.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage}


store.bind(conn.ev)
return conn
}


/**
* Serialize Message
* @param {WAConnection} conn 
* @param {Object} m 
* @param {store} store 
*/
exports.smsg = (conn, m, store) => {
if (!m) return m
let M = proto.WebMessageInfo
m = M.fromObject(m)
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
m.chat = m.key.remoteJid
m.fromMe = m.key.fromMe
m.isGroup = m.chat.endsWith('@g.us') 
m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
}
if (!m.message) return
if (m.message) {
m.mtype = getContentType(m.message)
m.msg = (m.mtype == 'viewOnceMessageV2' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
try {
m.body = m.mtype === "conversation" ? m.message.conversation : 
m.mtype === "imageMessage" ? m.message.imageMessage.caption : 
m.mtype === "videoMessage" ? m.message.videoMessage.caption : 
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : 
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId : 
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId : 
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId : 
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id || m.text : "";
} catch {
m.body = ""
}
m.args = m.body.trim().split(/ +/).slice(1);
m.query = m.args.join(" ").trim();
m.q = m.query
m.budy = (typeof m.text == 'string' ? m.text : '')
let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
if (m.mtype == 'protocolMessage' && m.msg.key) {
if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
}
if (m.quoted) {
let type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
if (['productMessage'].includes(type)) {
type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
}
if (typeof m.quoted === 'string') m.quoted = {
text: m.quoted
}
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id)
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return false
let q = await store.loadMessage(m.chat, m.quoted.id, conn)
return exports.smsg(conn, q, store)
}
let vM = m.quoted.fakeObj = M.fromObject({
key: {
remoteJid: m.quoted.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)
m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
}
}
if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg)
m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
m.reply = async (teks) => {
const { sourceUrl, thumbnailUrl } = global.reply
conn.sendMessage(m.chat, {
text: teks, 
contextInfo:{ 
mentionedJid: [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") || [m.sender],
isForwarded: true,
forwardedNewsletterMessageInfo:{
newsletterJid: "120363229748458166@newsletter", 
serverMessageId: 100,
ContentType: 2,
newsletterName:global.newsletterName,
},
externalAdReply: {
showAdAttribution: false, 
renderLargerThumbnail: false, 
containsAutoReply: true, 
previewType: "PHOTO", 
title: global.botname,
body: global.week + ', ' + global.calender, 
mediaType: "IMAGE", 
sourceUrl, 
thumbnailUrl:'https://satganzdevs-api.up.railway.app/api/thmb'}}},{ quoted: m })
}

m.react = (emoti) => conn.sendMessage(m.chat, {react: {text: emoti, key: m.key }})

m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)



conn.appenTextMessage = async(text, chatUpdate) => {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: conn.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
conn.ev.emit('messages.upsert', msg)
}
try {
conn.pushMessage(m)
if (m.msg && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', m.msg.key)
} catch (e) {
console.error(e)
}
conn.appenEditedMessage = async(text) => {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: conn.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
conn.ev.emit('messages.upsert', msg)
}    

return m
}