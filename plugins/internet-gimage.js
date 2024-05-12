require("../config")
const { Cmd } = require('../command.js');
const { fetchJson, pickRandom } = require('../lib/myfunc.js')

Cmd({
pattern: 'gimage|googleimage',
limit: true,
desc: 'google image',
type: 'Internet'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply('masukan query image!')
let res = await fetchJson(`https://aemt.me/googleimage?query=${q}`)
await Satzz.sendMediaButtons(m.chat, '*`GIMAGE`*', '', author, [{type:'btn',text:'NEXT',id:`.gimage ${q}`}], m, {img: await pickRandom(res.result)})
})