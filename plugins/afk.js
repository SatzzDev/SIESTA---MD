const { Siesta } = require('../lib/command.js');
const { m } = require('../config');

Siesta({
command:  '^afk$',
alias: 'afk',
onlyGroup: true,
aliases: 'afk',
desc: 'Afk',
type: 'Grup'
}, async (m, {conn, command, text, reply}) => {
let user = global.db.data.users[m.sender];
user.afkTime = + new Date();
user.afkReason = text;
reply(`@${m.sender.split("@")[0]} is now AFK${text ? " with reason: " + text : ""}`);
});
