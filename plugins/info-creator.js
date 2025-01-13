require('../config')
const { Siesta } = require('../lib/command.js');
const {runtime} = require("../lib/myfunc")
const {ttle,ftxt} = require("../lib/scrapes")

Siesta({
command: '^owner|developer|creator|satzz$',
alias: 'owner',
onlyOwner: false,
desc:'menampilkan kontak developer',
type: 'Informasi'
}, async (m, {conn, command, store, botNumber}) => {
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 
const loli = [[global.dev,"Satzz.","Developer",'It always seems impossible until it\'s done.']]
let key = await conn.sendContactArray(m.chat, loli, m)
})