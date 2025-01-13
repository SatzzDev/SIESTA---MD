require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^open$',
alias: 'open',
onlyAdmins: true,
desc: 'Membuka Grup',
type: 'Grup'
}, async (m, {conn, command}) => {
conn.groupSettingUpdate(m.chat, 'not_announcement')
})
