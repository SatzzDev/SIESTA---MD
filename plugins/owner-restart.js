const { Siesta } = require('../lib/command.js');
const { sleep } = require('../lib/myfunc.js');

// Command to restart the bot
Siesta({
command: '^(restart)$',
alias: 'restart',
onlyOwner: true,
desc: 'Restart The Bot',
type: 'Pemilik'
}, async (m, {conn, command}) => {
try {
if (!db.data.others['restarts']) {
db.data.others['restarts'] = {};
}
let { key } = await conn.sendMessage(m.chat, { text: `_Restarting..._` }, { quoted: m });
db.data.others['restarts'].key = key;
db.data.others['restarts'].from = m.chat;
await db.write();
await sleep(1000);
process.send('reset');
} catch (error) {
console.error('Failed to restart the bot:', error);
await conn.sendMessage(m.chat, { text: 'Failed to restart the bot. Please try again later.' }, { quoted: m });
}
});