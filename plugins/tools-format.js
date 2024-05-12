const { Cmd } = require("../command") 
const {ftxt, ttle} = require("../lib/scrapes") 

Cmd({
pattern: '^formatteks$',
type: 'Tools'
}, async (m, command, Satzz) => {
if (!m.q) return m.reply("teksnya? ") 
m.reply(`${ftxt(m.q)}\n${ttle(m.q)}`) 
})