const { Siesta } = require('../lib/command');
const { cutAudio, cutVideo } = require('../lib/converter');

Siesta({
  command: '^cut$',
  type: 'Alat',
  limit: true
}, async (m, { conn, args, reply }) => {
  //━━━━━━━━━━━━━━━[ VALIDASI ARGUMEN ]━━━━━━━━━━━━━━━━━//
  if (args.length < 2) {
    return reply('Masukkan waktu mulai dan akhir dengan format HH:MM:SS. Contoh: .cut 00:00:30 00:01:00');
  }
  let [startTime, endTime] = args;
  let media = await conn.downloadMediaMessage(m.quoted || m);
  if (!media) {
    return reply('Tidak ada media yang ditemukan untuk diproses.');
  }

  //━━━━━━━━━━━━━━━[ POTONG AUDIO ]━━━━━━━━━━━━━━━━━//
  if (m.quoted.mtype === "audioMessage") {
    try {
      let audioBuffer = await cutAudio(media, 'mp3', startTime, endTime);
      await conn.sendMessage(m.chat, { audio: audioBuffer, ptt: false, mimetype: 'audio/mp4' }, { quoted: m });
      //reply('Audio berhasil dipotong!');
    } catch (err) {
      console.error(err);
      reply('Terjadi kesalahan saat memotong audio.');
    }
  }
  
  //━━━━━━━━━━━━━━━[ POTONG VIDEO ]━━━━━━━━━━━━━━━━━//
  else if (m.quoted.mtype === "videoMessage") {
    try {
      let videoBuffer = await cutVideo(media, 'mp4', startTime, endTime);
      await conn.sendMessage(m.chat, { video: videoBuffer, mimetype: 'video/mp4' }, { quoted: m });
      //reply('Video berhasil dipotong!');
    } catch (err) {
      console.error(err);
      reply('Terjadi kesalahan saat memotong video.');
    }
  } else {
    return reply('Balas audio atau video dengan caption .cut');
  }
});
