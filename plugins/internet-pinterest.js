require("../config")
const { Cmd } = require('../command.js');
const { fetchJson, pickRandom } = require('../lib/myfunc.js')

Cmd({
pattern: 'pinterest|pin',
limit: true,
desc: 'google image',
type: 'Internet'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply('masukan query image!')
let res = await fetchJson('https://api.satganzdevs.tech/api/pinterest?apikey=satria&query=' + q);
let img = await pickRandom(res);
Satzz.sendButtons(m.chat, 'RESULT OF' + " " + q.toUpperCase(), '', author, [{type:'btn', text:"Next", id:`.pin ${q}`}], m, {img});
})