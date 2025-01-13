const { Siesta } = require("../lib/command")


Siesta({
command: '^self$',
alias: 'self',
desc: 'mengubah mode bot menjadi self',
onlyOwner: true,
type: 'Pemilik'
}, async (m, {conn, command, reply}) => {
if (!conn.public) return reply(`Already in Self Mode!`)
conn.public = false;
reply("Success Change To Self Mode");
})