const { Cmd } = require('../command.js');
const path = require("path") 





Cmd({
pattern: '^(sp|saveplugins)',
onlyOwner: true,
desc: 'Save Plugin.',
type: 'Owner'
}, async (m, Satzz) => {
if (!m.query) return m.reply(`where is the path?\n\nexample:\n${command} menu.js`)
if (!m.quoted.text) return m.reply(`reply code`)
let path = path.join(__dirname, `./${m.q}`) 
await require('fs').writeFileSync(path, m.quoted.text)
m.reply(`Saved ${path} to file!`)
 });