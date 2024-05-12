const { Cmd } = require('../command.js');
const { fetchJson } = require('../lib/myfunc.js')

Cmd({
pattern: '^(tr|translate)$',
limit: true,
desc: 'translate',
type: 'Tools'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!m.quoted) return reply('balas text yang ingin di translate! contoh : .tr id')
if (!m.quoted.text) return reply('pesan yang kamu balas tidak mengandung teks.')
let translate = await fetchJson(`https://api.satganzdevs.tech/api/translate?apikey=satria&text=${m.quoted.text}&lang=${q}`)
reply(translate.result)
})