const { Siesta } = require("../lib/command");
const { fetchJson } = require("../lib/myfunc");

Siesta({
command: '^(hadits|hadis)$', 
alias: 'hadist',
desc: 'menunjukan list hadits',
type: 'Religi'
}, async (m, { conn, command }) => {
try {
let response = await fetchJson(`https://muslim-api-two.vercel.app/hadits`);
let allHadits = response.data.map((hadit, index) => {
return [hadit.judul, `.gethadits ${hadit.no}`];
});

if (allHadits.length === 0) {
return m.reply('No Hadits found.');
}

await conn.sendListMsg(
m.chat, 
'Daftar Hadits', 
'Pilih hadits yang ingin Anda baca:', 
global.author, 
'List Hadits', 
'Available hadits', 
'HOT', 
allHadits, 
m
);

} catch (error) {
console.error(error);
m.reply('Error fetching data. Please try again later.');
}
});

Siesta({
command: '^gethadits$', 
}, async (m, { conn, command, text }) => {
try {
let response = await fetchJson(`https://muslim-api-two.vercel.app/hadits/${text}`);
let hadit = response.data[0];
let message = `*${hadit.judul}*\n\n${hadit.arab}\n\n${hadit.indo}`;
m.reply(message);
} catch (error) {
console.error(error);
m.reply('Error fetching data. Please try again later.');
}
});