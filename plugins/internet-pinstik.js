require("../config")
const { Cmd } = require('../command.js');
const { fetchJson, pickRandom } = require('../lib/myfunc.js')

Cmd({
pattern: 'stikpin|pinsticker',
limit: true,
desc: 'Search Pinterest image then send as sticker',
type: 'Internet'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply('masukan query image!')
let res = await fetchJson('https://api.satganzdevs.tech/api/pinterest?apikey=satria&query=' + q);
for (let ai of res) {
Satzz.sendImageAsSticker(m.chat, await getBuffer(ai), m, {pack: packname, author: author}) 
}
})