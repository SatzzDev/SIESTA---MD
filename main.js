process.on("uncaughtException", console.error);
require("./config");
const {
default: makeWASocket,
Browsers,
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
proto,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const pino = require("pino");
const chalk = require("chalk");
const path = require("path");
const readline = require("readline");
const axios = require("axios");
const FileType = require("file-type");
const archiver = require("archiver");
const figlet = require("figlet");
const yargs = require("yargs/yargs");
const NodeCache = require("node-cache");
let { handler } = require("./handler.js");
const _ = require("lodash");
const { Boom } = require("@hapi/boom");
const { exec, spawn } = require("child_process");
const PhoneNumber = require("awesome-phonenumber");
const {
imageToWebp,
videoToWebp,
writeExifImg,
writeExifVid,
} = require("./lib/exif");
const {
isUrl,
generateMessageTag,
getBuffer,
getSizeMedia,
fetchJson,
sleep,
} = require("./lib/myfunc");
const { Socket, smsg } = require("./lib/simple");
const syntaxerror = require("syntax-error");






var low = require("./lib/lowdb");
const { Low, JSONFile } = low;
global.opts = new Object(
yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(new JSONFile(`./src/database.json`));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
if (global.db.READ)
return new Promise((resolve) =>
setInterval(function () {
!global.db.READ
? (clearInterval(this),
resolve(
global.db.data == null ? global.loadDatabase() : global.db.data
))
: null;
}, 1 * 1000)
);
if (global.db.data !== null) return;
global.db.READ = true;
await global.db.read();
global.db.READ = false;
global.db.data = {
users: {},
chats: {},
database: {},
settings: {},
others: {},
menfess: {},
sticker: {},
level: [],
restart: {},
...(global.db.data || {}),
};
global.db.chain = _.chain(global.db.data);
};
loadDatabase();
if (global.db)

setInterval(async () => {
if (global.db.data) await global.db.write();
}, 1 * 100);


setInterval(() => {
let directoryPath = path.join();
fs.readdir(directoryPath, async function (err, files) {
var filteredArray = await files.filter(
(item) =>
item.endsWith("jpeg") ||
item.endsWith("gif") ||
item.endsWith("png") ||
item.endsWith("mp3") ||
item.endsWith("mp4") ||
item.endsWith("jpg") ||
item.endsWith("webp") ||
item.endsWith("webm") ||
item.endsWith("zip")
);
if (filteredArray.length > 0) {
console.log(
chalk.redBright(`[DETECTED] ${filteredArray.length} trash file`)
);
setInterval(() => {
if (filteredArray.length == 0)
return console.log(chalk.green(`[SATZZ] no trash file detected.`));
filteredArray.forEach(function (file) {
let sampah = fs.existsSync(file);
if (sampah) fs.unlinkSync(file);
});
}, 15_000);
}
});
}, 30_000);

const ConnectToWhatsApp = async () => {
const { state, saveCreds } = await useMultiFileAuthState(global.sessionName);
const { version, isLatest } = await fetchLatestBaileysVersion();
const store = makeInMemoryStore({
logger: pino().child({ level: "fatal", stream: "store" }),
});
const auth = {
creds: state.creds,
keys: makeCacheableSignalKeyStore(
state.keys,
pino().child({ level: "silent", stream: "store" })
),
};
const msgRetryCounterCache = new NodeCache();
const getMessage = async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
return msg?.message || undefined;
}
return { conversation: "halo, sayang!" };
};
const connectionOptions = {
version: [2, 3000, 1017531287],
logger: pino({ level: "silent" }),
printQRInTerminal: false,
mobile: false,
auth,
browser: Browsers.ubuntu("Edge"),
getMessage: async key => {
const jid = jidNormalizedUser(key.remoteJid);
const msg = await store.loadMessage(jid, key.id);
return msg?.message || '';
},
shouldSyncHistoryMessage: msg => {
console.log(`\x1b[32mMemuat Chat [${msg.progress}%]\x1b[39m`);
return !!msg.syncType;
},
generateHighQualityLinkPreview: true,
markOnlineOnConnect: true
};

const conn = Socket(connectionOptions);
if (!conn.authState.creds.registered) {
const requestPairingCode = () => {
return new Promise(async (resolve, reject) => {
try {
setTimeout(async () => {
let code = await conn.requestPairingCode(global.nomor);
resolve(code);
}, 5000);
} catch (requestPairingCodeError) {
const errorMessage = "Error requesting pairing code from WhatsApp";
console.error(errorMessage, requestPairingCodeError);
reject(new Error(errorMessage));
}
});
};
requestPairingCode()
.then((code) => {
console.log(chalk.cyan(" ‎ ‎ ┌──────────────┈"));
console.log(` ‎ ‎ ${chalk.cyan("│")} 🕒  ${chalk.redBright("Your Pairing Code")}:`);
console.log(chalk.cyan(" ‎ ‎ ├──────────────┈"));
console.log(`   ${chalk.cyan("│ Code")}: ${code}`);
console.log(chalk.cyan(" ‎ ‎ └──────────────┈"));
})
.catch((err) => console.error("Failed to retrieve pairing code:", err));
}
store?.bind(conn.ev);

conn.ev.process(async (events) => {

if (events["connection.update"]) {
const update = events["connection.update"];
const {
receivedPendingNotifications,
connection,
lastDisconnect,
isOnline,
isNewLogin,
} = update;
if (isNewLogin) conn.isInit = true;
if (connection == "connecting")
console.log(chalk.cyan(" ‎ ‎ Connecting..."));
if (connection == "open") {
console.log(chalk.green(" ‎ ‎ Connected ✅"));
try {
const bot = db.data.others["restarts"];
if (bot) {
const { key, from } = bot;
await conn.sendMessage(from, {
text: "bot has been restarted ✅",
edit: key,
});
await conn.sendMessage(global.newsletterJid, {
text: "bot has been restarted ✅",
});
delete db.data.others["restarts"];
loadDatabase();
}
} catch (error) {
console.error("Failed to handle post-restart operations:", error);
}
}

if (connection == "close")
console.log(
chalk.yellow(" ‎ ‎ connection lost, trying to reconnect...")
);
if (
lastDisconnect &&
lastDisconnect.error &&
lastDisconnect.error.output &&
lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
) {
ConnectToWhatsApp();
}
if (db.data == null) await loadDatabase();
}

if (events["creds.update"]) {
await saveCreds();
}

if (events["messages.upsert"]) {
const chatUpdate = events["messages.upsert"];
if (global.db.data) await global.db.write();
let m =
chatUpdate.messages[0] ||
chatUpdate.messages[chatUpdate.messages.length - 1];
if (!m.message) return;
if (m.key.id.startsWith("BAE5") && m.key.id.length === 16 || m.key.remoteJid.includes("@newsletter")) return;
if (m.key.remoteJid.includes("@broadcast"))
conn.sendMessage(
m.key.remoteJid,
{ react: { text: "💚", key: m.key } }, { statusJidList: [] })
conn.readMessages([m.key]);
m = await smsg(conn, m, store);
handler(conn, m, chatUpdate, store);
}
if (events["messages.update"]) {
const chatUpdate = events["messages.update"];
for (const { key, update } of chatUpdate) {
if (update.pollUpdates) {
const pollCreation = await getMessage(key);
if (pollCreation) {
let pollUpdate = await getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: update.pollUpdates,
});
var toCmd = pollUpdate.filter((v) => v.voters.length !== 0)[0]
?.name;
if (toCmd == undefined) return;
var prefCmd = "." + toCmd;
conn.appenTextMessage(prefCmd, chatUpdate);
}
} else {
}
}
}
if (events.call) {
const celled = events.call;
let botNumber = await conn.decodeJid(conn.user.id);
for (let kopel of celled)
if (!kopel.isGroup) {
await conn.query({
tag: "call",
attrs: { from: botNumber, to: kopel.from },
content: [
{
tag: "reject",
attrs: {
"call-id": kopel.id,
"call-creator": kopel.from,
count: "0",
},
content: undefined,
},
],
});
if (kopel.status === "offer") {
let nomer = await conn.sendTextWithMentions(
kopel.from,
`*\`[ AUTO BLOCK SYSTEM ]*\`\n\nYou have been blocked for calling the bot. Contact the owner to unblock.`
);
await conn.sendContactArray(
m.chat,
[[global.dev, "Сатрия Дев", "Developer", "silence"]],
global.fake
);
await conn.updateBlockStatus(kopel.from, "block");
}
}
}
if (events["group-participants.update"]) {
const anu = events["group-participants.update"];
const { memberUpdate } = require("./lib/welcome.js");
memberUpdate(conn, anu);
}
});
return conn;
};

ConnectToWhatsApp();



let pluginFolder = path.join(__dirname, "plugins");
let pluginFilter = (filename) => /\.js$/.test(filename);
plugins = {};
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
try {
plugins[filename] = require(path.join(pluginFolder, filename));
} catch (e) {
delete plugins[filename];
}
}


const reload = (_ev, filename) => {
if (pluginFilter(filename)) {
let dir = path.join(pluginFolder, filename);
if (dir in require.cache) {
delete require.cache[dir];
if (fs.existsSync(dir))
console.log(' ‎ ‎', chalk.blueBright(`re - require plugin '${filename}'`));
else {
console.log(' ‎ ‎', chalk.yellowBright(`deleted plugin '${filename}'`));
return delete plugins[filename];
}
} else console.log(' ‎ ‎', chalk.greenBright(`requiring new plugin '${filename}'`));
let err = syntaxerror(fs.readFileSync(dir), filename);
if (err)
console.log(' ‎ ‎',
chalk.redBright(`syntax error while loading '${filename}'\n${err}`)
);
else
try {
plugins[filename] = require(dir);
} catch (e) {
console.log(' ‎ ‎',
chalk.redBright(`error require plugin '${filename}\n${e}'`)
);
} finally {
plugins = Object.fromEntries(
Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b))
);
}
}
};

fs.watch(path.join(__dirname, "plugins"), reload);
