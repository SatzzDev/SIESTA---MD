
const fs = require('fs')
const path = require('path')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { spawn } = require('child_process')






function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../src', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      await fs.promises.writeFile(tmp, buffer)
      spawn(ffmpegPath, [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp)
            if (code !== 0) return reject(code)
            resolve(await fs.promises.readFile(out))
            await fs.promises.unlink(out)
          } catch (e) {
            reject(e)
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}

function createVideoFromImageAndAudio(imagePath, audioPath, outputVideoPath, callback) {
ffmpeg.ffprobe(audioPath, (err, audioMetadata) => {
if (err) {
console.error('Error getting audio duration:', err);
callback(err);
return;
}
const audioDuration = audioMetadata.format.duration;
ffmpeg()
.input(imagePath)
.loop(1) // Mengulang gambar sekali saja untuk membuat video dengan durasi yang sesuai
.input(audioPath)
.inputOptions('-t', audioDuration) // Menyeting durasi video sesuai dengan durasi audio
.output(outputVideoPath)
.on('end', () => {
console.log('Video creation finished');
callback(null);
})
.on('error', (err) => {
console.error('Error creating video:', err);
callback(err);
})
.run();
});
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 */
function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}

module.exports = {
  createVideoFromImageAndAudio,
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
}
