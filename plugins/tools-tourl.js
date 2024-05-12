require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const {ftxt, ttle} = require('../lib/scrapes')


Cmd({
pattern: 'tourl',
limit: true,
desc: 'image to url',
type: 'Tools'
}, async (m, command, Satzz) => {
let {reply} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (/image/.test(mime)) {
reply(mess.wait)
const { IMGUR } = require('../lib/uploader');
let media = await Satzz.downloadAndSaveMediaMessage(qmsg);
let result = await IMGUR(media)
await Satzz.sendButtons(m.chat, "DONE", '', author, [{type:'url',text:'Fetch Image',id:result},{type:'copy',text:'Copy Url',id:result}], m);
} else return reply('reply/send image with caption .tourl') 
})