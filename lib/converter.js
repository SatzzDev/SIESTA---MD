/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')



function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
return new Promise(async (resolve, reject) => {
try {
let tmp = path.join(__dirname, '../src', + new Date + '.' + ext)
let out = tmp + '.' + ext2
await fs.promises.writeFile(tmp, buffer)
spawn('ffmpeg', [
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


function toAudio(buffer, ext) {
return ffmpeg(buffer, [
'-vn',
'-ac', '2',
'-b:a', '128k',
'-ar', '44100',
'-f', 'mp3'
], ext, 'mp3')
}


function toPTT(buffer, ext) {
return ffmpeg(buffer, [
'-vn',
'-c:a', 'libopus',
'-b:a', '128k',
'-vbr', 'on',
'-compression_level', '10'
], ext, 'opus')
}



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


//━━━━━━━━━━━━━━━[ FUNGSI BARU UNTUK CUT AUDIO ]━━━━━━━━━━━━━━━━━//
function cutAudio(buffer, ext, startTime, endTime) {
return ffmpeg(buffer,['-ss', startTime, '-to', endTime, '-c', 'copy'],ext,'mp3');
}

function cutVideo(buffer, ext, startTime, endTime) {
  return ffmpeg(
    buffer,
    ['-ss', startTime, '-to', endTime, '-c:v', 'libx264', '-c:a', 'aac', '-strict', 'experimental', '-b:a', '128k', '-ar', '44100'],
    ext,
    'mp4'
  );
}


module.exports = {
  toAudio,
  toPTT,
  toVideo,
  cutAudio,
  cutVideo,
  ffmpeg,
};