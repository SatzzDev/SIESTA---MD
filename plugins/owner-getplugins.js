const { Cmd } = require('../command.js');
const fs = require('fs')
const path = require('path')

Cmd({
pattern: 'gp|getplugins',
onlyOwner: true,
desc: 'Get Plugins.',
type: 'Owner'
}, async (m, command, Satzz) => {
if (!m.query) return m.reply(`where is the text?\n\nexempel: .gp menu`)
const filename = path.join(__dirname, `./${m.query}${!/\.js$/i.test(m.query) ? '.js' : ''}`)
const listPlugins = fs.readdirSync(path.join(__dirname)).map(v => v.replace(/\.js/, ''))
if (!fs.existsSync(filename)) return m.reply(`'${filename}' not found!\n\n${listPlugins.map(v => v).join('\n').trim()}`.trim())
Satzz.sendButtons(m.chat, '`GET PLUGINS`', fs.readFileSync(filename, 'utf8'), 'ꜱᴀᴛɢᴀɴᴢᴅᴇᴠꜱ', [{type:'copy', text:'Copy Code', id:fs.readFileSync(filename, 'utf8')}],m)
})