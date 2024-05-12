const { Cmd } = require('../command.js');

Cmd({
pattern: '^(sf|savefile)',
onlyOwner: true,
desc: 'Save File.',
type: 'Owner'
}, async (m, Satzz) => {
if (!m.query) return m.reply(`where is the path?\n\nexample:\n${usedPrefix + command} plugins/menu.js`)
if (!m.quoted.text) return m.reply(`reply code`)
let path = `${m.q}`
await require('fs').writeFileSync(path, m.quoted.text)
m.reply(`Saved ${path} to file!`)
 });