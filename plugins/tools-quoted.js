const { Siesta } = require('../lib/command.js');
const {smsg} = require('../lib/simple')

Siesta({
command: '^(quoted|q)$',
onlyOwner: false,
desc: 'to get Quoted of quoted message',
type: 'Alat'
}, async (m, {conn, command, store}) => {
if (!m.quoted) return m.reply("Reply to the message!!");
let wokwol = smsg(conn, await m.getQuotedObj(), store);
if (!wokwol.quoted) return m.reply("The replied message does not contain a quote");
await wokwol.quoted.copyNForward(m.chat, true);
})