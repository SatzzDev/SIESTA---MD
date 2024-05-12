require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'suitpvp|suit',
onlyGroup: true,
glimit: true,
desc: 'suit Game',
type: 'Game'
}, async (m, command, Satzz) => {
let {reply,q} = m
Satzz.suit = Satzz.suit ? Satzz.suit : {};
let poin = 10, poin_lose = 10, timeout = 60000;
if (Object.values(Satzz.suit).find((roof) => roof.id.startsWith("suit") && [roof.p, roof.p2].includes(m.sender))) m.reply(`Selesaikan suit mu yang sebelumnya`);
if (m.mentionedJid[0] === m.sender) return m.reply(`Tidak bisa bermain dengan diri sendiri !`);
if (!m.mentionedJid[0]) return reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya..\n\nContoh : ${prefix}suit @6281316701742`);
if (Object.values(Satzz.suit).find((roof) => roof.id.startsWith("suit") && [roof.p, roof.p2].includes(m.mentionedJid[0]))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`;
let id = "suit_" + new Date() * 1;
let caption = `_*SUIT PvP*_\n\n@${m.sender.split`@`[0]} menantang @${m.mentionedJid[0].split`@`[0]} untuk bermain suit\n\nSilahkan @${m.mentionedJid[0].split`@`[0]} untuk ketik Y/N\nhadiah akan di tunjukan ketika permainan selesai`;
Satzz.suit[id] = {
chat: await reply(caption),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: "wait",
hadiah: 500,
waktu: setTimeout(() => {
if (Satzz.suit[id]) Satzz.sendText(m.chat, `_Waktu suit habis_`, m);
delete Satzz.suit[id];
}, 60000),
poin,
poin_lose,
timeout,
};
})