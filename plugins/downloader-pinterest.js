const { Cmd } = require('../command.js');
const {fetchJson} = require("../lib/myfunc")

Cmd({
pattern: 'pinterestdl|pindl',
limit: true,
desc: 'to Download Video From Pinterest',
type: 'Downloader'
}, async (m, command, Satzz) => {
let res = await fetchJson(`https://api.satganzdevs.tech/api/pinterestdl?url=${m.query}`)
Satzz.sendFileUrl(m.chat, res.videoUrl, "", m)
})