const { Siesta } = require("../lib/command");
const { fetchJson } = require("../lib/myfunc");

Siesta({
command: '^doa$',
alias: 'doa',
desc: 'menampilkan list doa',
type: 'Religi'
}, async (m, { conn, command }) => {
let res = await fetchJson(`https://muslim-api-two.vercel.app/doa/`);
let data = res.data;
let sections = [];
let categories = {
harian: "Harian",
pilihan: "Pilihan",
quran: "Quran",
hadits: "Hadits",
ibadah: "Ibadah",
haji: "Haji",
lainnya: "Lainnya"
};
for (let category in categories) {
let categoryData = data.filter(dua => dua.source === category);
if (categoryData.length > 0) {
sections.push({
title: categories[category],
rows: categoryData.map((dua, index) => ({
title: dua.judul,
id: `.getdua ${dua.source} ${index}` 
}))
});
}
}
await conn.sendListMsgV3(m.chat, 'Daftar Doa', 'Pilih doa yang ingin Anda baca:', global.author,  'Daftar Doa', sections, m);
});


Siesta({
command: '^getdua$',
}, async (m, { conn, command , args }) => {
//m.reply(args[0] + ' ' + args[1])
let res = await fetchJson(`https://muslim-api-two.vercel.app/doa/${args[0]}`);
let selectedDua = res.data[args[1]];
let message = `*${selectedDua.judul}*\n\n${selectedDua.arab}\n\n${selectedDua.indo}\n\nsource from ${selectedDua.source}`;
m.reply(message);
});
