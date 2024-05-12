require("../config")
const { Cmd } = require('../command.js');


Cmd({
pattern: 'ssweb',
limit: true,
desc: 'to screenshot a website',
type: 'Tools'
}, async (m, command, Satzz) => {
let {reply,q} = m
let {ssweb} = require("../lib/scrapes")

reply(mess.wait)
let res = await ssweb(q)
Satzz.sendMessage(m.chat, {image: res.result, caption: 'nih'},{quoted:m})
})