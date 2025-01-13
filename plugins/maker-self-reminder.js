const { Siesta } = require('../lib/command.js');

Siesta({
  command: '^selfreminder$',
  alias: 'selfreminder',
  limit: true,
  desc: 'Canvas',
  type: 'Canvas',
}, async (m, { conn, command, reply, text }) => {
if (!text) return reply('teksnya mana?, contoh : \n.self-reminder it\'s okay to take a break.')
await reply(global.mess.wait);
await conn.sendMessage(m.chat, { image: { url: `https://apii.satzzdev.xyz/api/self-reminder?text=${text}` }, caption: global.mess.success }, { quoted: m });
});



