const { Siesta } = require('../lib/command')


Siesta({
command: '^listonline$',
alias: 'listonline',
desc: 'informasi anggota grup yang sedang aktif',
onlyAdmins: true,
type: 'Grup'
}, async (m,  {conn, command, store}) => {
const { reply } = m;
let botNumber = await conn.decodeJid(conn.user.id);
let id = m.chat;
let online = [...Object.keys(store.presences[id]), botNumber];
reply('*List Online:*\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join('\n'));
});