const { Cmd } = require('../command.js');

Cmd({
pattern: '^(quoted|q)$',
onlyOwner: false,
desc: 'to get Quoted of quoted message',
type: 'Tools'
}, async (m, command, Satzz) => {
const tanggal = new Date().toLocaleDateString('id', { weekday: 'long' }) + ',' + ' ' + new Date().toLocaleDateString("id", {day: 'numeric', month: 'long', year: 'numeric'})
if (!m.quoted) return m.reply("Reply to the message!!");
let wokwol = await Satzz.serializeM(await m.getQuotedObj());
if (!wokwol.quoted) return m.reply("The replied message does not contain a quote");
await wokwol.quoted.copyNForward(m.chat, true);
})