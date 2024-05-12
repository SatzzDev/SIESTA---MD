const { Cmd } = require('../command.js');


Cmd({
pattern: 'menfes|menfess',
onlyPm: true,
desc: 'Anonymous chat with custom partner',
type: 'Tools'
}, async (m, command, Satzz) => {
let { q, reply } = m


if (!q) return reply(`\`\`\`Example: ${command} 6282xxxxx\`\`\``);
Satzz.menfess = Satzz.menfess ? Satzz.menfess : {};
let numberTarget = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
var checkTarget = await Satzz.onWhatsApp(numberTarget);
if (numberTarget == m.sender) return reply("```You cannot send a message to your own number!```");
if (checkTarget.length == 0) return reply('```The number is not registered on WhatsApp.\n\nPlease enter a valid and registered WhatsApp number.```');
let id = +new Date();
Satzz.menfess[id] = {
id,
a: m.sender,
b: numberTarget,
state: "WAITING",
check: function (who = "") {
return [this.a, this.b].includes(who)
},
other: function (who = "") {
return who === this.a ? this.b : who === this.b ? this.a : ""
}
};
reply('```Waiting for the recipient to confirm...```');
Satzz.sendMessage(numberTarget, {
text: `Hello ${await Satzz.getName(numberTarget)}\n` + '```Someone wants to send you an anonymous message. Reply *Y* to accept and *N* to decline.```',
contextInfo: {
externalAdReply: {
title: "MENFESS",
body: calender,
thumbnailUrl: "https://androidayuda.com/wp-content/uploads/2022/10/chats-anonimos.jpg",
mediaType: 1,
renderLargerThumbnail: true
}
}
})
})