const { Siesta } = require("../lib/command");
const { fetchJson } = require("../lib/myfunc");
const axios = require('axios');
const cheerio = require('cheerio');

// Perintah untuk menampilkan list doa yang tersedia
Siesta({
command: '^(jadwalsholat|jadwalshalat)$',
alias: 'jadwalsholat',
desc:'informasi jadwal sholat',
type: 'Religi'
}, async (m, { conn, command, text }) => {
if (!text) {
let sections = await getAllProvinces();
return conn.sendListMsg(m.chat, '', 'List of Available Provinces', global.author, 'Click Me', 'Province List', 'Owner Location', sections, m);
} else {
let res = await jadwalSholat(text);
if (res.status === 'ok') {
let message = `${res.daerah}\n${res.tanggal} ${res.bulan}\n\n`;
message += `_Imsyak:_ ${res.imsyak}\n`;
message += `_Shubuh:_ ${res.shubuh}\n`;
message += `_Terbit:_ ${res.terbit}\n`;
message += `_Dhuha_: ${res.dhuha}\n`;
message += `_Dzuhur:_ ${res.dzuhur}\n`;
message += `_Ashr:_ ${res.ashr}\n`;
message += `_Maghrib:_ ${res.maghrib}\n`;
message += `_Isya:_ ${res.isya}\n`;

return m.reply(message);
} else {
return m.reply(`Gagal mendapatkan jadwal sholat: ${res.error}`);
}
}
});

async function getAllProvinces() {
try {
const response = await axios.get('https://jadwalsholat.org/jadwal-sholat/monthly.php');
const html = response.data;
const $ = cheerio.load(html);
const options = $('select[name="kota"] option');
const provinces = [];

options.each((index, element) => {
const kode = $(element).attr('value');
const nama = $(element).text().trim();
if (kode && nama) {
provinces.push([nama, `.jadwalsholat ${kode}`]);
}
});

// Memprioritaskan Pekanbaru di bagian atas
const sortedProvinces = provinces.sort((a, b) => {
if (a[0].toLowerCase() === 'indragiri hulu') return -1;
if (b[0].toLowerCase() === 'indragiri hulu') return 1;
return 0;
});

return sortedProvinces;
} catch (error) {
console.error('Error scraping:', error);
return [];
}
}


async function jadwalSholat(kode_daerah) {
try {
const response = await axios.get('https://jadwalsholat.org/jadwal-sholat/daily.php?id=' + kode_daerah);
const html = response.data;
const $ = cheerio.load(html);
let daerah = $('h1').text().split(', GMT')[0].trim();
let bulan = $('h2').text().trim();
const row = $('tr.table_light, tr.table_dark').find('td');
const tanggal = $(row[0]).text().trim();
const imsyak = $(row[1]).text().trim();
const shubuh = $(row[2]).text().trim();
const terbit = $(row[3]).text().trim();
const dhuha = $(row[4]).text().trim();
const dzuhur = $(row[5]).text().trim();
const ashr = $(row[6]).text().trim();
const maghrib = $(row[7]).text().trim();
const isya = $(row[8]).text().trim();
return {
status: 'ok',
developer: "SatganzDevs",
daerah,
bulan,
tanggal,
imsyak,
shubuh,
terbit,
dhuha,
dzuhur,
ashr,
maghrib,
isya
};
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}
