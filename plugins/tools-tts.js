const { Siesta } = require('../lib/command.js');
const fs = require('fs');
const { fetchJson } = require("../lib/myfunc.js");

Siesta({
    command: '^tts$',
    desc: 'text menjadi audio',
    limit: true,
    type: 'Alat'
}, async (m, { conn, command, text }) => {
    if (!text) return m.reply('where\'s the text?');
    conn.sendMessage(m.chat, {
        audio: { url: `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${text}&tl=id&client=tw-ob` },
        ptt: true,
        mimetype: 'audio/mpeg',
        wavefrom: new Uint8Array(64)
    }, { quoted: m });
});