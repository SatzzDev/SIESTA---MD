require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")

Cmd({
pattern: 'gempa|infogempa',
onlyPrem: true,
desc: 'get Infromation Of gempa',
type: 'Internet'
}, async (m, command, Satzz) => {
let res = await fetchJson('https://aemt.me/gempa')
Satzz.sendMessage(m.chat, {image: await getBuffer(res.result.image), caption: `*\`I N F O - G E M P A\`*\n\n\`TANGGAL\`\n> ${res.result.tanggal}\n\n\`JAM\`\n> ${res.result.jam}\n\n\`LINTANG\`\n> ${res.result.lintang}\n\n\`BUJUR\`\n> ${res.result.bujur}\n\n\`MAGNITUDE\`\n> ${res.result.magnitude}\n\n\`KEDALAMAN\`\n> ${res.result.kedalaman}\n\n\`POTENSI\`\n> ${res.result.potensi}\n\n\`WILAYAH\`\n> ${res.result.wilayah}\n`},{quoted:m})
})