require("../config")
const { Siesta } = require('../lib/command.js');
const { fetchJson, pickRando, getBuffer} = require('../lib/myfunc.js')
const { pinterest } = require("../lib/scrapes.js") 

Siesta({
command: '^(pinstik|stikpin|pinsticker)$',
alias: 'pinstik',
limit: true,
desc: 'mencari gambar di pinterest lalu mengirimnya sebagai stiker',
type: 'Internet'
}, async (m, {conn, command}) => {
let {reply,q} = m
if (!q) return reply('masukan query image!')
await reply(global.mess.wait)
let res = await pinterest(q);
for (let ai of res) {
conn.sendImageAsSticker(m.chat, await getBuffer(ai), m, {pack: packname, author: author}) 
}
})