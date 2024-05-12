const { Cmd } = require("../command")
const { fetchJson, getBuffer, contextInfo } = require("../lib/myfunc")
const { ftxt } = require("../lib/scrapes")


Cmd({
pattern: '^(quranaudio|qa)$',
type: 'Islamic'
}, async (m, command, Satzz) => {
let {q} = m
if (!q) return m.reply('Enter the surah number example: .'+ command +' 23')
Satzz.sendMessage(m.chat, {audio: await getBuffer('https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/'+ q +'.mp3'), ptt:true, mimetype:'audio/mpeg', waveform: new Uint8Array(64), contextInfo},{quoted:m})
})


Cmd({
pattern: '^(surah|qs)$',
type: 'Islamic'
}, async (m, command, Satzz) => {
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
let msg = `${ftxt('乂 ' + res.name.replace("'", ""))}
_Type:_ ${res.type}\n
╭─⟪ *\`Ayah ${ayh.no}\`* ⟫
*_Arabic:_* ${ayh.arab}
*_Latin:_* ${ayh.latin}
*_Translate ID:_* ${ayh.id}
*_Tafsir:_* ${ayh.tafsir}
╰─────────────┈⊷`;
await m.reply(msg);
await Satzz.sendMessage(m.chat, { audio: await getBuffer(ayh.audio), ptt: true, mimetype: 'audio/mpeg', waveform: new Uint8Array(64), contextInfo }, { quoted: m });
} catch (error) {
console.error(error);
m.reply('An error occurred while fetching data');
}
});