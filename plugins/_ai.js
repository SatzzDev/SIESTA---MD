const { Siesta, Handler } = require('../lib/command.js');
const { fetchJson } = require('../lib/myfunc');
const fs = require("fs");


Siesta({
  command: '^ai$',
  alias: 'ai',
  onlyPrem: true,
  desc: 'AI chatbot.',
  type: 'Alat'
}, async (m, { conn, command, text }) => {
  if (!text) {
    return m.reply(`Harap ajukan pertanyaan setelah '${command}' command.\nContoh: '.${command} siapa penemu JavaScript?'`);
  }
  await conn.sendPresenceUpdate("composing", m.chat);
const axios = require('axios');
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=AIzaSyA6jO-NadWzx50C1JhIE23H6GBRyqUsijQ`;
const data = {
  contents: [
    {
      role: "user",
      parts: [
        {
          text: text
        }
      ]
    }
  ],
  systemInstruction: {
    role: "user",
    parts: [
      {
        text: "Siesta, an interactive WhatsApp bot created by SatzzDev. The bot is designed to engage users with fun and useful features, providing them with interactive commands, games, and automation. It has a friendly and user-centric personality, focusing on improving user experience in group chats and individual conversations. The bot's name, 'Siesta,' reflects its calming, laid-back vibe while still being responsive and active."
      }
    ]
  }
};

axios.post(url, data, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
 m.reply(response.data.candidates[0].content.parts[0].text);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
