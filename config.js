const fs = require("fs").promises;
const chalk = require("chalk");
const moment = require("moment-timezone");
const { pickRandom, getbuffer, reSize, runtime } = require("./lib/myfunc");
moment.tz.setDefault("Asia/Jakarta");








const d = new Date();
const locale = "id";
const gmt = new Date(0).getTime() - new Date("1 January 2021").getTime();
global.weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor(((d * 1) + gmt) / 84600000) % 5];
global.week = d.toLocaleDateString(locale, { weekday: "long" });
global.calender = d.toLocaleDateString("id", { day: "numeric", month: "long", year: "numeric" });
global.owner = ["6282170988479", "6281268248904"];
global.dev = "6282170988479@s.whatsapp.net";
global.nomor = "6281268248904"
global.botname = "シエスタ (Shiesuta).";
global.packname = `${global.week}, ${global.calender}`;
global.author = "© シエスタ (Shiesuta).";
global.newsletterName = "Changelog";
global.newsletterJid = "120363368779014202@newsletter";
global.version = "1.5.6"
global.prefa = ["", "!", ".", ",", "🐤", "🗿"];
global.wm = "シエスタ (Shiesuta).";
global.botName = "シエスタ (Shiesuta).";
global.sessionName = "session";
global.sp = "⭔";
global.sgc = "https://chat.whatsapp.com/G6W25LQb4ce2i8r4Z0du1q";
global.link = "https://instagram.com/krniwnstria";
global.runtime = runtime(process.uptime())
global.limitawal = {
    premium: 500, 
    free: 100
};


global.mess = {
    success: "```Nih Kak```",
    wait: "```tunggu bentar kak...```",
    premium: "*`[#]`* ```fitur ini cuma buat Pengguna premium kak :(```",
    owner: "*`[#]`* ```fitur ini cuma buat Pemilik bot kak :(```",
    admin: "*`[#]`* ```fitur ini cuma buat Admin kak :(```",
    grup: "*`[#]`* ```fitur ini cuma buat Grup kak :(```",
    group: "*`[#]`* ```fitur ini cuma buat Grup kak :(```",
    pc: "*`[#]`* ```fitur ini cuma buat Obrolan Pribadi kak :(```",
    bodmin: "*`[#]`* ```aku harus jadi Admin dulu kak :(```",
    limit: "*`[#]`* ```limit harian kakak habis, silahkan coba lagi besok ya kak :(```",
};

global.reply = {
    sourceUrl: "https://instagram.com/krniwnstria",
    thumbnailUrl: "https://raw.githubusercontent.com/SatganzDevs/PHONK/refs/heads/main/image.png"
};

