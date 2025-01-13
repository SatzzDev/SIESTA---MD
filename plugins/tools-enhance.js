require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')
const { uploadImg } = require('../lib/uploader')
const axios = require('axios')
const imgbbUploader = require('imgbb-uploader');

Siesta({
command: '^hd$',
limit: true,
desc: 'Upscale image',
type: 'Alat'
}, async (m, {conn, command, reply, qmsg, mime}) => {
await reply(global.mess.wait);
let media = await conn.downloadAndSaveMediaMessage(qmsg, "temp_" + m.sender);
const options = {
apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', 
imagePath: media,
expiration: 600,
};
let {url} = await imgbbUploader(options)
//console.log(url)
await conn.sendMessage(m.chat, { 
image: {
url:`https://apidl.asepharyana.cloud/api/ai/upscaler?url=${url}`}, caption: global.mess.success }, { quoted: m });
})