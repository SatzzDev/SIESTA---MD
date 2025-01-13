require("../config")
const { Siesta } = require('../lib/command.js');
const { fetchJson, pickRandom } = require('../lib/myfunc.js')
const { ttle } = require("../lib/scrapes")



Siesta({
command: '^(couple|cp)$',
alias: 'couple',
limit: true,
desc: 'Random Couple',
type: 'Internet'
}, async (m, {conn, command}) => {
let {reply,q} = m
let anu = await fetchJson("https://raw.githubusercontent.com/SatganzDevs/database/main/kopel.json");
let random = pickRandom(anu)
await conn.sendMessage(m.chat, { image: { url: random.male }, caption: `laki`},{ quoted: m });
await conn.sendButtons(m.chat, '', 'Bini', author, [{type:'btn', text: ttle('NEXT'), id: `.${command}`}], m, {img: random.female });
})