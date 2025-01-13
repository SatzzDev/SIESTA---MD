const { Siesta } = require('../lib/command.js');
const fs = require("fs") 
const {Image} = require('node-webpmux')


Siesta({
command: '^toavatar$',
limit: true,
desc: 'video/image to sticker',
type: 'Stiker'
}, async (m, {conn, command}) => {
let {reply} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (/webp/.test(mime)) {
let media = await conn.downloadMediaMessage(qmsg);
let stiker = await addExif(media, global.packname, global.author)
conn.sendMessage(m.chat, {sticker: stiker},{quoted: m})
}
})


async function addExif(buffer, packname, author, categories = [''], extra = {}) {
const img = new Image()
const json = {
'sticker-pack-id': 'parel-kntll',
'sticker-pack-name': packname,
'sticker-pack-publisher': author,
'emojis': categories,
'is-avatar-sticker': 1,
...extra
}
let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00,
0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00
])
let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
let exif = Buffer.concat([exifAttr, jsonBuffer])
exif.writeUIntLE(jsonBuffer.length, 14, 4)
await img.load(buffer)
img.exif = exif
return await img.save(null)
}