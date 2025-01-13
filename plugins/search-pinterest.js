require("../config");
const { Siesta } = require('../lib/command.js');
const { fetchJson, pickRandom } = require('../lib/myfunc.js');
const { pinterest } = require("../lib/scrapes");
const axios = require('axios');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Helper function to create and send a carousel message
async function sendCardCarousel(conn, chatId, images, text, footerText, author) {
    const results = [];

    // Create carousel cards
    for (const imageUrl of images) {
        const imageMessage = await createImageMessage(conn, imageUrl);
        results.push({
            'body': proto.Message.InteractiveMessage.Body.fromObject({'text': ""}),
            'footer': proto.Message.InteractiveMessage.Footer.fromObject({'text': author}),
            'header': proto.Message.InteractiveMessage.Header.fromObject({
                'title': `Here you go!`,
                'hasMediaAttachment': true,
                'imageMessage': imageMessage
            }),
            'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                'buttons': [{
                    'name': 'cta_url',
                    'buttonParamsJson': JSON.stringify({
                        "display_text": "Offcial Group",
                        "url": sgc,
						"merchant_url": sgc
                    })
                }]
            })
        });
    }

    // Generate and send carousel message
    const messageContent = generateWAMessageFromContent(chatId, {
        'viewOnceMessage': {
            'message': {
                'messageContextInfo': {'deviceListMetadata': {}, 'deviceListMetadataVersion': 2},
                'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
                    'body': proto.Message.InteractiveMessage.Body.create({'text': text}),
                    'footer': proto.Message.InteractiveMessage.Footer.create({'text': footerText}),
                    'header': proto.Message.InteractiveMessage.Header.create({'hasMediaAttachment': false}),
                    'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        'cards': results
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(chatId, messageContent.message, {'messageId': messageContent.key.id});
}

// Helper function to create image message
async function createImageMessage(conn, imageUrl) {
    const { imageMessage } = await generateWAMessageContent({'image': {'url': imageUrl}}, {'upload': conn.waUploadToServer});
    return imageMessage;
}

// Command handler
Siesta({
    command: '^(pinterest|pin)$',
    alias: 'pinterest',
    limit: true,
    desc: 'google image',
    type: 'Pencarian'
}, async (m, { conn, command }) => {
    const { reply, q } = m;
    if (!q) return reply('masukkan query image!');

    // Fetch Pinterest images
    const res = await pinterest(q);
    const { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${q}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${q}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    const imageUrls = data.resource_response.data.results.map(result => result.images.orig.url);

    // Shuffle and select images
    shuffleArray(imageUrls);
    const selectedImages = imageUrls.slice(0, 10);

    // Send carousel of images
    await sendCardCarousel(conn, m.chat, selectedImages, "PINTEREST", "RESULT", author);
});
