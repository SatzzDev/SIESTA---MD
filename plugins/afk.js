require('../config')
const { Cmd } = require('../command.js');


Cmd({
pattern:  '^afk$',
onlyGroup: true,
aliases: 'afk',
desc: 'Afk',
type: 'Group'
}, async (m, command, Satzz) => {
let {reply,q} = m
let user = global.db.data.users[m.sender];
user.afkTime = + new Date();
user.afkReason = q;
reply(`@${m.sender.split("@")[0]} is now AFK ${q ? " with the reason: " + q : ""}`);
})