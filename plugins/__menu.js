const fs = require('fs');
const { Siesta, commands, Handler } = require('../lib/command.js');
const { runtime } = require('../lib/myfunc.js');
const stringSimilarity = require('string-similarity');


Siesta({
command: '^menu$',
alias: 'menu',
desc: 'Informasi perintah',
type: 'Informasi',
}, async (m, { conn, isOwner, command, isPremium, text }) => {
const PREFIX = /^[.,!]/;
const commandsList = {};
commands.forEach(cmd => {
if (cmd.dontAddCommandList === false && cmd.command) {
try {
const match = cmd.command.toString().match(/(\W*)([\w\s\d]*)/);
const commandName = match ? match[2].trim() : '';
const handler = PREFIX.source.charAt(1) || '.';
if (commandName) {
if (!commandsList[cmd.type]) commandsList[cmd.type] = [];
commandsList[cmd.type].push(handler + commandName);
}
} catch (error) {
console.error('Error processing command:', error);
}
}
});

if (!text) {
let rows = []
let sections = [{title:"List Menu", rows}];
for (const category in commandsList) {
if (category !== 'misc') {
rows.push({title: category, description: `Lihat semua perintah dalam kategori ${category}`, id: `.menu ${category}`})
}
}
await conn.sendButtons(m.chat,
'Menu Utama',
`*– 乂 Info User*
> *- Nama :* ${m.pushName}
> *- Tag :* @${m.sender.split("@")[0]}
> *- Status :* ${isOwner ? "👨‍💻 Developer" : isPremium ? "Premium 🅥" : "Gratisan"}
> *- Limit :* ${isPremium ? "∞" : db.data.users[m.sender].limit}

*– 乂 Info - Bot*
> *- Nama :* ${global.botname}
> *- Versi :* v9.0.0
> *- Runtime :* ${runtime(process.uptime())}
> *- Prefix :* [ . ]
> *- Total fitur :* ${commands.length}
> *- Source code :* -
`,
global.footer, 
[
{ type: 'url', text: 'Grup WhatsApp', id: 'https://satzzdev.github.io/Group' },
{ type: 'list', title: 'Klik Disini', sections }
],
m,
{ img: fs.readFileSync('./src/background.png') }
);
} else {
if (!commandsList[text]) return m.reply(`Kategori *${text}* tidak ditemukan.`);
let bodyText = `┌── *「 ${text.toUpperCase()} 」*\n`;
commandsList[text].forEach(cmd => {
bodyText += `│ ⇒ ${cmd.replace(/[":]/g, '').split('[')[1]}\n`;
});
bodyText += '└──────────────\n';
await conn.sendButtons(m.chat,
'', 
bodyText,
global.footer, 
[
{ type: 'url', text: 'Grup WhatsApp', id: 'satzzdev.github.io/Group' },
{ type: 'btn', text: 'Kembali Ke Awal', id: '.menu' },
],
m,
{ img: fs.readFileSync('./src/background.png') }
);
}
});