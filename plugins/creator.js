require('../config')
const { Cmd } = require('../command.js');
const {runtime} = require("../lib/myfunc")
const {ttle,ftxt} = require("../lib/scrapes")

Cmd({
pattern: 'owner|creator',
onlyOwner: false,
desc: 'to Quoted',
type: 'Info'
}, async (m, command, Satzz) => {
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 
const loli = [[`6281316701742@s.whatsapp.net`, `${await Satzz.getName('6281316701742@s.whatsapp.net')}`,`${botname} Developers`,`im a red flag 🚩`],[`6281268248904@s.whatsapp.net`, `SIESTA - MD`,`WhatsApp Bot`, `⚠️ Please Don't Spam Block or Banned`]]
const sentMsg = await Satzz.sendContactArray(m.chat, loli, m)
Satzz.sendButtons(m.chat, '', 'more info about my owners?', global.author, [{type:'url', text:ttle('Instagram'), id:'https://instagram.com/kurniawan_satria__'},{type:'url', text:ttle('Github'), id:'https://github.com/SatganzDevs'}], m);
})