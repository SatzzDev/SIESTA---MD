require('../config')
const { Siesta } =  require('../lib/command')

// CEK ABSEN
Siesta({
command: '^cekabsen$',
alias: 'cekabsen',
desc: 'mengecek absensi',
type: 'Grup'
}, async (m, {conn, command}) => {
let id = m.chat
conn.absen = conn.absen ? conn.absen : {}
if (!(id in conn.absen)) return m.reply(`_*Tidak ada absen berlangsung digrup ini!*_\n\n*.mulaiabsen* - untuk memulai absen`)
let d = new Date
let date = d.toLocaleDateString('id', {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let absen = conn.absen[id][1]
let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
m.reply(`*「 ABSEN 」*

Tanggal: ${date}
${conn.absen[id][2]}

┌ *List absen:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────`)
})

// ABSEN RESPONSE
Siesta({
command:'^absen$',
desc: 'absen',
alias: 'absen',
type:'Group'
}, async (m, {conn, command}) => {
let id = m.chat
conn.absen = conn.absen ? conn.absen : {}
if (!(id in conn.absen)) return m.reply(`_*Tidak ada absen berlangsung digrup ini!*_\n\n*.mulaiabsen* - untuk memulai absen`)
let absen = conn.absen[id][1]
const wasVote = absen.includes(m.sender)
if (wasVote) return m.reply('*Kamu sudah absen!*')
absen.push(m.sender)
m.reply(`Done!`)
let d = new Date
let date = d.toLocaleDateString('id', {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
m.reply(`*「 ABSEN 」*

Tanggal: ${date}
${conn.absen[id][2]}

┌ *List absen:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────
`)
})

// MEMULAI ABSEN
Siesta({
command: '^mulaiabsen$',
desc: 'memulai absensi',
alias: 'mulaiabsen',
onlyAdmins: true,
type:'Group'
}, async (m, {conn, command}) => {
conn.absen = conn.absen ? conn.absen : {}
let id = m.chat
if (id in conn.absen) {
m.reply(`_*Masih ada absen di chat ini!*_\n\n*.hapusabsen* - untuk menghapus absen`)
}
conn.absen[id] = [
m.reply(`Berhasil memulai absen!\n\n*.absen* - untuk absen\n*.cekabsen* - untuk mengecek absen\n*.hapusabsen* - untuk menghapus data absen`),
[],
m.query
]
})

// HAPUS ABSEN
Siesta({
command: '^hapusabsen$',
desc: 'menhapus absensi',
alias: 'hapusabsen',
onlyAdmins:true,
type:'Group'
}, async (m, {conn, command}) => {
let id = m.chat
conn.absen = conn.absen ? conn.absen : {}
if (!(id in conn.absen)) return m.reply(`_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`)
delete conn.absen[id]
m.reply(`Done!`)
})