require('../config');
const { Siesta } = require('../lib/command.js');
const { fetchJson } = require("../lib/myfunc");
const stringSimilarity = require('string-similarity');



Siesta({
command: '^(infogempa|gempa)$',
alias: 'infogempa',
desc: 'Mendapatkan informasi terkini mengenai gempa bumi dari BMKG.',
type: 'Informasi'
}, async (m, { conn, command }) => {
let res = await fetchJson('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
const latestEarthquake = res.Infogempa.gempa;
const message = `*\`INFO - GEMPA\`*
⭔ *Tanggal:* ${latestEarthquake.Tanggal}
⭔ *Jam:* ${latestEarthquake.Jam}
⭔ *Lintang:* ${latestEarthquake.Lintang}
⭔ *Bujur:* ${latestEarthquake.Bujur}
⭔ *Magnitudo:* ${latestEarthquake.Magnitude}
⭔ *Kedalaman:* ${latestEarthquake.Kedalaman}
⭔ *Wilayah:* ${latestEarthquake.Wilayah}`;
m.reply(message);
});



Siesta({
command: '^perkiraancuaca$',
desc: 'Mendapatkan informasi perkiraan cuaca berdasarkan kode wilayah BMKG.',
type: 'Informasi'
}, async (m, { conn, command, text }) => {
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
async function sendCardCarousel(chatId, title, text, footer, cards = [], quoted) {
const results = [];
for (const card of cards) {
console.log(card)
const { imageMessage } = await generateWAMessageContent({image: {url: card.image}}, {upload: conn.waUploadToServer});
results.push({
'body': proto.Message.InteractiveMessage.Body.fromObject({'text': card.text ? card.text : ''}),
'footer': proto.Message.InteractiveMessage.Footer.fromObject({'text': card.footer ? card.footer : ''}),
'header': proto.Message.InteractiveMessage.Header.fromObject({
'title': card.title ? card.title : '',
'hasMediaAttachment': true,
'imageMessage': imageMessage
}),
'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
'buttons': [{
'name': 'cta_url',
'buttonParamsJson': JSON.stringify({
"display_text": "Group WhatsApp",
"url": 'https://SatzzDev.github.io/Group',
"merchant_url": 'https://SatzzDev.github.io/Group'
})
}]
})
});
}

const messageContent = generateWAMessageFromContent(chatId, {
'viewOnceMessage': {
'message': {
'messageContextInfo': {'deviceListMetadata': {}, 'deviceListMetadataVersion': 2},
'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
'body': proto.Message.InteractiveMessage.Body.create({text: text}),
'footer': proto.Message.InteractiveMessage.Footer.create({text: footer}),
'header': proto.Message.InteractiveMessage.Header.create({title,hasMediaAttachment: false}),
'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
'cards': results
})
})
}
}
}, {});
await conn.relayMessage(chatId, messageContent.message, {'messageId': messageContent.key.id});
}
const kodeWilayah = text.trim();
if (!kodeWilayah) {
return m.reply(`Harap sertakan kode desa. Anda bisa mendapatkan kode desa tertentu dengan cara mengetik *.kodedesa* (desa yang ingin Anda cari), contoh: *.kodedesa Aceh*. Atau, kunjungi website resmi: https://kodewilayah.id/`);
}
await m.reply('Mengambil data, tunggu sebentar...')
try {
const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${kodeWilayah}`;
const response = await fetch(url);
const weatherData = await response.json();

if (!weatherData || !weatherData.data || !weatherData.data[0] || !weatherData.data[0].cuaca) {
return m.reply('Data cuaca tidak ditemukan untuk wilayah ini.');
}

const cuacaList = weatherData.data[0].cuaca.map(innerArray =>
innerArray.map(item => ({
image: item.image || 'https://example.com/default-image.jpg', // URL default jika image tidak ada
title: item.local_datetime, // Menggunakan nilai langsung
text: `⭔ *Waktu:* ${item.local_datetime}\n⭔ *Cuaca:* ${item.weather_desc}` // Menyusun teks dengan format yang diinginkan
}))
);


await sendCardCarousel(m.chat, `PERKIRAAN CUACA`, `Untuk Daerah ${weatherData.lokasi.provinsi}, ${weatherData.lokasi.kotkab}, ${weatherData.lokasi.kecamatan}, ${weatherData.lokasi.desa}`, global.footer, cuacaList.reduce((acc, curr) => acc.concat(curr), []), m);
} catch (error) {
console.error(error);
return m.reply('Terjadi kesalahan saat mengambil data cuaca. Silakan coba lagi nanti.');
}
});



Siesta({
command: '^kodedesa$',
desc: 'Mencari kode wilayah berdasarkan nama desa dengan tingkat kemiripan.',
type: 'Informasi'
}, async (m, { conn, command, text }) => {
const fetch = require('node-fetch');
const query = text
if (!query) {
return m.reply('Harap masukkan nama desa untuk mencari.');
}
try {
const wilayahData = await (await fetch('https://raw.githubusercontent.com/kodewilayah/permendagri-72-2019/main/dist/base.csv')).text();
const listWilayah = wilayahData.split('\n').filter(row => row.trim()).map(row => {
const [kode, namaWilayah] = row.split(',');
return { raw:row, kode: kode.trim(), namaWilayah: namaWilayah.trim() };
});
const names = listWilayah.map(wilayah => wilayah.namaWilayah);
const matches = stringSimilarity.findBestMatch(query, names);
const topResults = matches.ratings
.sort((a, b) => b.rating - a.rating)
.slice(0, 10) // Ambil 10 hasil teratas
.map(match => {
const wilayah = listWilayah.find(w => w.namaWilayah === match.target);
return `┌── *「 \`${wilayah.namaWilayah}\` 」*\n│ ⭔ *Kode:* ${wilayah.raw}\n│ ⇒ ${(match.rating * 100).toFixed(2)}%\n└──────────────`;
})
.join('\n');
if (!topResults) {
return m.reply('Tidak ditemukan wilayah yang cocok dengan pencarian Anda.');
}
return m.reply(`Hasil pencarian untuk "${query}":\n\n${topResults}`);
} catch (error) {
console.error(error);
return m.reply('Terjadi kesalahan saat mencari wilayah. Silakan coba lagi nanti.');
}
});

