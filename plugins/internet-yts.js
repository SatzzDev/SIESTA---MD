require('../config')
const { Siesta } = require('../lib/command.js');
const { fetchJson } = require("../lib/myfunc");
const axios = require('axios');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

Siesta({
command: '^(yts|ytsearch)$',
alias: 'ytsearch',
limit: true,
desc: 'Mencari Video Dari YouTube',
type: 'Pencarian'
}, async (m, {conn, command}) => {
let { reply, q } = m;
if (!q) return reply(`Example : ${command} story wa anime`);
await reply(global.mess.wait)
let yts = require("yt-search");
let search = await yts(q);
let totalResults = search.all.length; // Dynamically set based on actual results
let no = 1;
let results = [];
async function createImageMessage(imageUrl) {
const { imageMessage } = await generateWAMessageContent({ 'image': { 'url': imageUrl } }, { 'upload': conn.waUploadToServer });
return imageMessage;
}
for (let i of search.all) {
  results.push({
    'body': proto.Message.InteractiveMessage.Body.fromObject({
      'text': `⏣ •  Title: ${i.title}\n⏣ •  Upload At: ${i.ago}\n⏣ •  Duration: ${i.timestamp}\n*╰────────────⦁*`
    }),
    'footer': proto.Message.InteractiveMessage.Footer.fromObject({
      'text': global.author
    }),
    'header': proto.Message.InteractiveMessage.Header.fromObject({
      'title': `*❲ R E S U L T ${no++}/${totalResults}* ❳`, // Dynamic total count
      'hasMediaAttachment': true,
      'imageMessage': await createImageMessage(i.thumbnail)
    }),
    'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
      'buttons': [
        {
          'name': "cta_url",
          'buttonParamsJson': JSON.stringify({
            "display_text": "Open On YouTube",
            "url": i.url,
            "merchant_url": i.url
          })
        },
        {
          'name': "quick_reply",
          'buttonParamsJson': JSON.stringify({
            "display_text": "Download Audio",
            "id": '.ytmp3 ' + i.url
          })
        },
        {
          'name': "quick_reply",
          'buttonParamsJson': JSON.stringify({
            "display_text": "Download Video",
            "id": '.ytmp4 ' + i.url
          })
        }
      ]
    })
  });
}

const messageContent = generateWAMessageFromContent(m.chat, {
'viewOnceMessage': {
'message': {
'messageContextInfo': {
'deviceListMetadata': {},
'deviceListMetadataVersion': 2
},
'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
'body': proto.Message.InteractiveMessage.Body.create({
'text': 'YouTube Search Results Of ' + q + ':'
}),
'footer': proto.Message.InteractiveMessage.Footer.create({
'text': ''
}),
'header': proto.Message.InteractiveMessage.Header.create({
'hasMediaAttachment': false
}),
'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
'cards': results
})
})
}
}
}, {});

await conn.relayMessage(m.chat, messageContent.message, {
'messageId': messageContent.key.id
});
});