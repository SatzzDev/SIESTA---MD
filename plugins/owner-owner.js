const { Cmd } = require("../command")
const { generateProfilePicture } = require("../lib/myfunc")

Cmd({
pattern: '^(setppbot|setbotpp)$',
onlyOwner: true,
type: 'Owner'
}, async (m, command, Satzz) => {
const {reply} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
let medis = await Satzz.downloadAndSaveMediaMessage(qmsg, "ppg");
var { img } = await generateProfilePicture(medis);
await Satzz.query({tag: "iq", attrs: { to: await Satzz.decodeJid(Satzz.user.id), type: "set", xmlns: "w:profile:picture" }, content: [{tag: "picture", attrs: { type: "image" }, content: img }]});
reply("Profile picture has been changed.")
})



Cmd({
pattern: '^public$',
onlyOwner: true,
type: 'Owner'
}, async (m, command, Satzz) => {
const {reply} = m
if (Satzz.public == true) return reply(`Already in Public Mode!`)
Satzz.public = true;
reply("Success Change To Public Mode");
})


Cmd({
pattern: '^self$',
onlyOwner: true,
type: 'Owner'
}, async (m, command, Satzz) => {
const {reply} = m
if (!Satzz.public) return reply(`Already in Self Mode!`)
Satzz.public = false;
reply("Success Change To Self Mode");
})