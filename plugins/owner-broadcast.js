const { Cmd } = require('../command.js');
const {ftxt, ttle, flaming} = require('../lib/scrapes')
const {getBuffer} = require('../lib/myfunc')

Cmd({
pattern: 'bc|broadcast',
onlyOwner: true,
desc: 'Broadcast To all users',
type: 'Owner'
}, async (m, command, Satzz) => {
for (let i of Object.keys(db.data.users)) {
Satzz.sendButtons(i, ftxt('◉ BROADCAST ◉'), m.query, 'Satzz', [{type:'btn', text:ttle("MENU"), id:".menu"}], m,{img: await flaming("BROADCAST")})
}
})