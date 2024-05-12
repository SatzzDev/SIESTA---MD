require('../config')
const { Cmd } = require('../command.js');
const fs = require("fs")




Cmd({
pattern: "^(me|profile)$",
desc: 'user Information ',
type: 'Info'
}, async (m, command, Satzz) => {
const _prem = require("../lib/premium.js")
const premium = JSON.parse(fs.readFileSync('./src/premium.json'));
const {reply} = m
const isCreator = global.owner + "@s.whatsapp.net" === m.sender ? true :  false
const isOwner = isCreator
const isPremium = isOwner ? true : _prem.checkPremiumUser(m.sender, premium)




const text = `

╭─「 *P R O F I L E - U S E R* 」
│ _Name:_ ${db.data.users[m.sender].name}
│ _Number:_ @${m.sender.split("@")[0]}
│ _Status:_ ${isPremium ? "Premium User" : "Free"}
│ _Limit:_ ${isPremium ? "Unlimited" : db.data.users[m.sender].limit}
│ _Game Limit:_ ${db.data.users[m.sender].glimit}
│ _Balance:_ ${db.data.users[m.sender].balance.toLocaleString()}
╰─────────────┈⊷
`.trim();

reply(text);
})