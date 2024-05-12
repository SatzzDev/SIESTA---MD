require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: '^buyglimit$',
onlyGroup: true,
desc: 'Buy Game Limit',
type: 'Game'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply(`Kirim perintah *.buyglimit* jumlah limit yang ingin dibeli\n\nHarga 1 game limit = Rp 1000`)
if (q.includes('-')) return reply(`Jangan menggunakan -`)
if (isNaN(q)) return reply(`Harus berupa angka`)
const math = (teks) => {
return Math.floor(teks)
}
let ane = Number(math(q) * 1000)
if (db.data.users[m.sender].balance < ane) return reply(`Saldo kamu tidak mencukupi untuk pembelian ini`)
db.data.users[m.sender].balance -= ane
db.data.users[m.sender].glimit += math(q)
reply(`Pembeliaan game limit sebanyak ${q} berhasil\n\nSisa Saldo : Rp ${db.data.users[m.sender].balance.toLocaleString()}\nSisa Limit : ${db.data.users[m.sender].glimit}`)
})