`GET PLUGINS`
const { Cmd } = require("../command") 

Cmd({
pattern: '^(approve|approveall)$', 
onlyAdmin: true, 
onlyGroup: true, 
desc: "approve all participants request", 
type: "Group"
}, async (m, command, Satzz) => {
let response = await Satzz.groupRequestParticipantsList(m.chat) 
if (response.length === 0) return m.reply("tidak ada request join") 
let mem = []
for (let kontol of response) {
mem.push(kontol.jid) 
}
await Satzz.groupRequestParticipantsUpdate(m.chat, mem, "approve") 
m.reply(`success approve ${mem.length} member`) 
})



Cmd({
pattern: '^(reject|rejectall)$', 
onlyAdmin: true, 
onlyGroup: true, 
desc: "reject all participants request", 
type: "Group"
}, async (m, command, Satzz) => {
let response = await Satzz.groupRequestParticipantsList(m.chat) 
if (response.length === 0) return m.reply("tidak ada request join") 
let mem = []
for (let kontol of response) {
mem.push(kontol.jid) 
}
await Satzz.groupRequestParticipantsUpdate(m.chat, mem, "reject") 
m.reply(`success reject ${mem.length} member`) 
})