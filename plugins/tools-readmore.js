const { Cmd } = require("../command")




Cmd({
pattern: '^readmore$',
limit: true,
type: 'Tools'
}, async (m, command, Satzz) => {
let { reply, q } = m
if (!q) return reply("where's the text?, use example: .readmore kon|trak")
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
reply(q.split("|")[0] + readMore + q.split("|")[1])
})