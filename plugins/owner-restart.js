const { Cmd } = require('../command.js');
const { sleep } = require('../lib/myfunc.js')
const fs = require('fs')
const path = require('path')
Cmd({
pattern: '^restart$',
onlyOwner: true,
desc: 'Restart The Bot',
type: 'Owner'
}, async (m, command, Satzz) => {
let bot = db.data.others['restart']
if(bot){
db.data.others['restart'].m = m
db.data.others['restart'].id = m.chat
} else {
db.data.others['restart'] = {
m: m,
id: m.chat
}
}
await m.reply('restarting...');
await sleep(1000)
process.send('reset');
})