const { Siesta } = require('../lib/command.js');
const { proto,
prepareWAMessageMedia,
generateWAMessageFromContent } = require("@whiskeysockets/baileys") 
const fs = require('fs');
const path = require('path');

Siesta({
command: '^(getplugins|gp)',
alias: 'getplugins',
onlyOwner: true,
desc: 'Mendapatkan plugins',
type: 'Pemilik'
}, async (m, { conn, command, text }) => {
if (!text)  return m.reply('Where is the text?\n\nExample: .gp menu');
const filename = path.join(__dirname, `${text}${!/\.js$/i.test(text) ? '.js' : ''}`);
if (!fs.existsSync(filename)) {
const listPlugins = fs.readdirSync(__dirname).filter(file => file.endsWith('.js')).map(file => file.replace(/\.js$/, ''));
let plug = listPlugins.map(v => { return [v, ".gp "+ v] });
return conn.sendListMsg(
m.chat,
`'${filename}' not found!`,
'',
global.author,
'List Plugins',
'💀',
'a',
plug,
m
);
}
const sendCarousel = async (id, cards=[], quoted = '') => {
const msg = generateWAMessageFromContent(id, proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
header: proto.Message.InteractiveMessage.Header.create({ title: "", hasMediaAttachment: false}),
body: proto.Message.InteractiveMessage.Body.create({ text: "*ALL MENU*"}),
footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }), 
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
})
}
}
}), { quoted, userJid: id });
return conn.relayMessage(id, msg.message, { quoted, messageId: msg.key.id });
};

const {imageMessage} = await prepareWAMessageMedia({ image: { url: "https://satganzdevs-api.up.railway.app/api/thmb" } }, { upload: conn.waUploadToServer })
const code = fs.readFileSync(filename, 'utf8');
sendCarousel(m.chat, [{
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,
imageMessage,
}),
body: proto.Message.InteractiveMessage.Body.create({ text: code }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: global.author }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: 'Salin',
copy_code:code
})
}]
})
}], m
);
});
