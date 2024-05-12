const { Cmd } = require('../command.js');
let { getpttur, ftxt, ttle } = require("../lib/scrapes")

Cmd({
pattern: 'getberita',
onlyOwner: false,
desc: 'to Get News informations',
type: 'Internet'
}, async (m, command, Satzz) => {
let res = await getpttur(m.query)
Satzz.sendMessage(m.chat, {image: {url: res.image}, caption:`${ftxt(`BERITA - ${m.query.split('https://www.pitutur.id/')[1].split('/')[0].toUpperCase()}`)}\n\n_TANGGAL:_ ${res.tanggal}\n\n_ARTIKEL:_ ${res.deskripsi}\n\n> www.pitutur.id`},{quoted:m})
})