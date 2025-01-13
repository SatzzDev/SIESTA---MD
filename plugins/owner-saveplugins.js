const { Siesta } = require('../lib/command.js');





Siesta({
command: '^(saveplugins|sp)$',
alias: 'saveplugins',
onlyOwner: true,
desc: 'Mengupdate plugins',
type: 'Pemilik'
}, async (m, {conn, command, text, reply}) => {
const path = require("path") 
if (!text) return reply(`where is the path?\n\nexample:\n.${command} menu.js`)
if (!m.quoted.text) return reply(`reply code`)
let paths = path.join(__dirname, `./${text}${!/\.js$/i.test(text) ? '.js' : ''}`)
await require('fs').writeFileSync(paths, m.quoted.text)
m.reply(`Saved ${paths} to file!`)
});