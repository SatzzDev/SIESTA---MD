require('../config');
const { Siesta } = require("../lib/command.js");
const { fetchJson, getBuffer } = require("../lib/myfunc.js");
const { Telesticker } = require("../lib/scrapes");
const fetch = require("node-fetch");

const fetchStickers = async (query) => {
const url = `https://api.telegram.org/bot7825526143:AAExgf_KTBjCy2dcV5fFCwx7odpyz18B6GM/getStickerSet?name=${encodeURIComponent(query)}`;
try {
const response = await fetch(url);
const stickers = (await response.json()).result.stickers;
return await Promise.all(stickers.map(async (sticker) => {
const fileResponse = await fetch(`https://api.telegram.org/bot7825526143:AAExgf_KTBjCy2dcV5fFCwx7odpyz18B6GM/getFile?file_id=${sticker.file_id}`);
const fileData = await fileResponse.json();
return {
file_id: sticker.file_id,
url: `https://api.telegram.org/file/bot7825526143:AAExgf_KTBjCy2dcV5fFCwx7odpyz18B6GM/${fileData.result.file_path}`
};
}));
} catch (error) {
throw new Error("Terjadi kesalahan saat mengambil stiker.");
}
};

const getRandomSticker = (stickers) => stickers[Math.floor(Math.random() * stickers.length)];

Siesta({
command: '^(telegramsticker|telestick|stikertelegram|stikertele|telestik)$',
alias: 'stikertelegram',
limit: true,
desc: 'Get Sticker from Telegram Sticker',
type: 'Internet'
}, async (m, {conn, command}) => {
let { reply, q } = m;
const query = q.split("|")[0]?.trim();
let count = q.split("|")[1];

if (!query) {
return reply("*❗ Masukan tidak sesuai.*\nGunakan format yang benar: *stickertele [query]* atau *stickertelegram [query]|[angka]* atau *telesticker [query]|all* atau *telegramsticker [query]|random*");
}

try {
const stickers = await fetchStickers(query);
if (!stickers.length) {
return m.reply("*❗ Stiker tidak ditemukan.*\nHarap coba dengan nama stiker yang berbeda.");
}

if (!count || "random" === count.toLowerCase()) {
const randomSticker = getRandomSticker(stickers);
return await conn.sendImageAsSticker(m.chat, await getBuffer(randomSticker.url), m, {packname, author}) 
}

if ("all" !== count.toLowerCase()) {
const stickerNumber = parseInt(count) - 1;
if (isNaN(stickerNumber) || stickerNumber < 0 || stickerNumber >= stickers.length) {
return m.reply('*❗ Nomor stiker tidak valid.*\nHarap berikan nomor stiker yang valid atau gunakan "random" untuk mengirim stiker secara acak atau "all" untuk mendapatkan semua stiker.');
}
return await conn.sendImageAsSticker(m.chat, await getBuffer(stickers[stickerNumber].url), m, {packname, author})
}

for (let i = 0; i < stickers.length; i++) {
await  conn.sendImageAsSticker(m.chat, await getBuffer(stickers[i].url), m, {packname, author})

}
} catch (error) {
return m.reply("*❗ Terjadi kesalahan saat mengambil stiker.*\nSilakan coba lagi nanti.");
}
});