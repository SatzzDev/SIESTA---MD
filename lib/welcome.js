const fs = require('fs');
const chalk = require('chalk');
const util = require('util');
const { reSize, getBuffer } = require('./myfunc');
const imgbbUploader = require('imgbb-uploader');
const knights = require("@lyncx/canvas");





exports.memberUpdate = async (conn, anu) => {
try {
const metadata = await conn.groupMetadata(anu.id);
const { subject: groupName = '', desc: groupDesc = '', participants: groupParticipants } = metadata;
const participantCount = groupParticipants.length;
const defaultImage = 'https://i.pinimg.com/originals/59/fe/0a/59fe0ad8cdbe4314797b29e8f033384c.jpg';

const groupIconUrl = await conn.profilePictureUrl(anu.id, 'image').catch(() => defaultImage);
const groupIcon = await imgbbUploader({
apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5',
imageUrl: groupIconUrl,
expiration: 600,
});

// Process all participants concurrently
await Promise.all(
anu.participants.map(async (num) => {
const userIconUrl = await conn.profilePictureUrl(num, 'image').catch(() => defaultImage);
const userIcon = await imgbbUploader({
apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5',
imageUrl: userIconUrl,
expiration: 600,
});

const username = await conn.getName(num);
const welcomeMessage = `Welcome, *@${num.split("@")[0]}* 💐, Please Read:\n${groupDesc}`;
const goodbyeMessage = `Goodbye, *@${num.split("@")[0]}* 💐`;

let imageBuffer;

switch (anu.action) {
case 'add': {
await conn.sendMessage(anu.id, {
image: {url:`https://apii.satzzdev.xyz/api/welcome?username=${username}&groupname=${groupName}&ppuser=${userIcon.url}&ppgc=${groupIcon.url}&member=${participantCount}`},
caption: welcomeMessage,
buttons: [{ buttonId: `Welcome!`, buttonText: { displayText: "Welcome!" } }],
contextInfo: {
mentionedJid: [num],
},
viewOnce: true,
});
break;
}
case 'remove': {
await conn.sendMessage(anu.id, {
image: {url:`https://apii.satzzdev.xyz/api/goodbye?username=${username}&groupname=${groupName}&ppuser=${userIcon.url}&ppgc=${groupIcon.url}&member=${participantCount}`},
caption: goodbyeMessage,
buttons: [{ buttonId: `Dadah 👋`, buttonText: { displayText: "Dadah 👋" } }],
contextInfo: {
mentionedJid: [num],
},
viewOnce: true,
});
break;
}
default:
break;
}
})
);
} catch (error) {
console.error(chalk.redBright('[ERROR]'), util.format(error));
}
};
