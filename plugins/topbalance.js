const { Cmd } = require("../command")


Cmd({
pattern: '^topbalance$',
type: 'Info'
}, async (m, command, Satzz) => {
let { reply } = m
let uang = Object.values(db.data.users);
uang.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
let top = '*── 「 TOP BALANCE 」 ──*\n\n'
var arrTop = []
var total = 15
if (uang.length < 15) total = uang.length
for (let i = 0; i < total; i ++) {
top += `${i + 1}. @${uang[i].id.split("@")[0]}\n=> balance : ${uang[i].balance.toLocaleString()}\n\n`
arrTop.push(uang[i].id)
}
reply(top)
})