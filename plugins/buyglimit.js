require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: '^buyglimit$',
onlyGroup: true,
desc: 'Buy Game Limit',
type: 'Game'
}, async (m, command, Satzz) => {
let {reply,q} = m
if (!q) return reply(`Send the command *$.buyglimit* with the quantity of game limits you want to purchase\n\nPrice per game limit = Rp 1000`)
if (q.includes('-')) return reply(`Do not use '-'`)
if (isNaN(q)) return reply(`Must be a number`)
const math = (text) => {
return Math.floor(text)
}
let totalCost = Number(math(q) * 1000)
if (db.data.users[m.sender].balance < totalCost) return reply(`Your balance is not enough for this purchase`)
db.data.users[m.sender].balance -= totalCost
db.data.users[m.sender].glimit += math(q)
reply(`Purchase of ${q} game limits successful\n\nRemaining Balance : Rp ${db.data.users[m.sender].balance.toLocaleString()}\nRemaining Game Limit : ${db.data.users[m.sender].glimit}`)
})
