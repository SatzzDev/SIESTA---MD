const { Cmd } = require('../command.js');
const {ttle} = require('../lib/scrapes')

Cmd({
pattern: '^(autostiker|autostick|autostik)$',
}, async (m, command, Satzz) => {
let { reply, q } = m
if (!q) return Satzz.sendListMsgV3(m.chat, '', 'SELECT AN OPTION', global.author, ttle("SELECT"), [{
title: 'Select one',
rows: [{
title: "ENABLE",
id: `.${command} on`
}, {
title: "DISABLE",
id: `.${command} off`
}]
}], m);
if (q === 'on') {
if (db.data.chats[m.chat].auto_sticker) return reply('Auto-sticker is already enabled.');
db.data.chats[m.chat].auto_sticker = true;
reply('Auto-sticker has been enabled!');
} else if (q === 'off') {
if (!db.data.chats[m.chat].auto_sticker) return reply('Auto-sticker is already disabled.');
db.data.chats[m.chat].auto_sticker = false;
reply('Auto-sticker has been disabled!');
}
})


Cmd({
pattern: 'autoremini|autohd'
}, async (m, command, Satzz) => {
let { reply, q } = m
if (!q) return Satzz.sendListMsgV3(m.chat, '', 'SELECT AN OPTION', global.author, ttle("SELECT"), [{
title: 'Select one',
rows: [{
title: "ENABLE",
id: `.${command} on`
}, {
title: "DISABLE",
id: `.${command} off`
}]
}], m);
if (q === 'on') {
if (db.data.chats[m.chat].auto_remini) return reply('Auto-remini is already enabled.');
db.data.chats[m.chat].auto_remini = true;
reply('Auto-remini has been enabled!');
} else if (q === 'off') {
if (!db.data.chats[m.chat].auto_remini) return reply('Auto-remini is already disabled.');
db.data.chats[m.chat].auto_remini = false;
reply('Auto-remini has been disabled!');
}
})