require("../config")
const { Cmd } = require('../command.js');
const { fetchJson, pickRandom } = require('../lib/myfunc.js')

Cmd({
pattern: 'couple',
limit: true,
desc: 'Random Couple',
type: 'Internet'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply('masukan query image!')
let anu = await fetchJson("https://raw.githubusercontent.com/SatganzDevs/database/main/kopel.json");
let random = pickRandom(anu)
await Satzz.sendMessage(m.chat, { image: { url: random.male }, caption: `𝘊𝘰𝘸𝘰𝘯𝘺𝘢`},{ quoted: m });
await Satzz.sendMessage(m.chat,{ image: { url: random.female }, caption: `𝘊𝘦𝘸𝘦𝘯𝘺𝘢`},{ quoted: m});
})