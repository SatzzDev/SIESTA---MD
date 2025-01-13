const { Siesta } = require('../lib/command.js');
const { fetchJson, getRandom } = require("../lib/myfunc");
const { exec } = require("child_process");
const fs = require('fs');

Siesta({
  command: '^removebg$',
  limit: true,
  desc: 'Remove Background',
  type: 'Alat',
}, async (m, { conn, command, reply, qmsg, mime }) => {
  await reply(global.mess.wait);
  let media = await conn.downloadAndSaveMediaMessage(qmsg, "temp_" + getRandom(".jpg"));
  let output = `./temp_${getRandom(".png")}`;
  exec(`rembg i ${media} ${output}`, async (err) => {
    if (err) {
      await reply(global.mess.error);
      fs.unlinkSync(media);
      return;
    }
    await conn.sendMessage(m.chat, { image: { url: output }, caption: global.mess.success }, { quoted: m });
    fs.unlinkSync(media);
    fs.unlinkSync(output);
  });
});
