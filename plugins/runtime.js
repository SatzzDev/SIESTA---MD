require('../config')
const { Cmd } = require('../command.js');
const {runtime} = require("../lib/myfunc")

Cmd({
pattern: 'runtime',
onlyOwner: false,
desc: 'to Quoted',
type: 'Info'
}, async (m, command, Satzz) => {
m.reply(runtime(process.uptime()));
})