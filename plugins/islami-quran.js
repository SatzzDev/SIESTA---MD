const { Siesta } = require("../lib/command")
const { fetchJson, getBuffer, contextInfo } = require("../lib/myfunc")
const { ftxt } = require("../lib/scrapes")



Siesta({
command: '^surah$',
alias: 'surah',
type: 'Religi'
}, async (m, { conn, command }) => {
let { q } = m;
if (!q) {
try {
let res = await fetchJson('https://api.dikiotang.com/quran/surah');
let rows = res.data.map((surah, index) => ([`Surah ${surah.name_id} (${surah.revelation_id})`, `.surah ${index + 1}`]));
await conn.sendListMsg(
m.chat,
'List of Surahs',
'Select a surah to view its information',
global.author,
'Click Here',
'List of Surahs',
'1',
rows,
m
);
} catch (error) {
console.error(error);
m.reply('An error occurred while fetching data');
}
} else if (isNaN(q)) {
return m.reply('Surah must be a number!, use example: .' + command + ' 17');
} else {
try {
let res = await fetchJson(`https://raw.githubusercontent.com/Jabalsurya2105/database/master/surah/surah%20${q}.json`);
let msg = `
_Surah:_ ${res.name}
_Number:_ ${res.number}
_Type:_ ${res.type}\n
_Ayah Count:_ ${res.jumlah_ayat}
`;
let rows = res.ayat.map((ayah, index) => ([`Ayat ${ayah.no}`, `.qs ${q}:${index + 1}`]));
await conn.sendListMsg(
m.chat,
'Surah Information',
msg,
global.author,
'Click Here',
'List Avaliable Ayah',
'1',
rows,
m
);
} catch (error) {
console.error(error);
m.reply('An error occurred while fetching data');
}
}
});

Siesta({
command: '^(quransurah|qs)$',
alias: 'quransurah',
type: 'Religi'
}, async (m, {conn, command}) => {
let { q } = m;
if (!q) return m.reply('Enter the surah number example: .' + command + ' 17:32');
let surah = q.split(':')[0];
let ayah = q.split(':')[1];
let iyh = ayah - 1
if (isNaN(surah) || isNaN(ayah)) return m.reply('surah or ayah must be a number!, use example: .' + command + '17:32');
try {
let res = await fetchJson(`https://raw.githubusercontent.com/Jabalsurya2105/database/master/surah/surah%20${surah}.json`); 
let ayh = res.ayat[iyh]
console.log(ayh)
//if (!ayh) return m.reply('Ayah not found');
let msg = `${ftxt('乂 ' + res.name.replace("'", ""))}\n
Ayat ${ayh.no}
${ayh.arab}\n
${ayh.latin}\n
Artinya: ${ayh.id}\n
Tafsir: ${ayh.tafsir}\n
`;
await m.reply(msg);
await conn.sendMessage(m.chat, { audio: await getBuffer(ayh.audio), ptt: true, mimetype: 'audio/mpeg', waveform: new Uint8Array(64), contextInfo }, { quoted: m });
} catch (error) {
console.error(error);
m.reply('An error occurred while fetching data');
}
});