const { Siesta } = require("../lib/command")


Siesta({
command: '^public$',
desc: 'mengubah mode bot menjadi public',
onlyOwner: true,
type: 'Pemilik'
}, async (m, {conn, command, reply}) => {
if (conn.public == true) return reply(`Already in Public Mode!`)
conn.public = true;
reply("Success Change To Public Mode");
})