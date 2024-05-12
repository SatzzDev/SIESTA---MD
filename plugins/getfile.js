const { Cmd } = require('../command.js');
const fs = require('fs')
const path = require('path')

Cmd({
pattern: 'gf|getfile',
onlyOwner: true,
desc: 'Get File.',
type: 'Owner'
}, async (m, command, Satzz) => {
if (!m.query) return m.reply(`where is the text?\n\nexempel: .gp message/case.js`)
let filename = m.query
if (!fs.existsSync(filename)) return m.reply(`'${filename}' not found!`)
Satzz.sendButtons(m.chat, '`GET PLUGINS`', fs.readFileSync(filename, 'utf8'), '© ꜱᴀᴛɢᴀɴᴢᴅᴇᴠꜱ', [{type:'copy', text:'Copy Code', id:fs.readFileSync(filename, 'utf8')}],m)
})