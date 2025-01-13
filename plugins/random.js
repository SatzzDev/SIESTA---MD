require('../config')
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Siesta({
command: '^cekkhodam$',
alias: 'cekkhodam',
desc: 'Cari Tau Apa Khodam Dalam Dirimu',
type: 'Random'
}, async (m, {conn, command, freply}) => {
const res = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/cekkhodam.json')
let rusuh = await pickRandom(res)
freply(`*CEK KHODAM*
> Nama: ${m.pushName}
> Khodam: ${rusuh.name}
> Arti: ${rusuh.meaning}`)
})

Siesta({
command: '^gombalan$',
alias: 'gombalan',
desc: 'Kirimkan gombalan ke pengguna',
type: 'Random'
}, async (m, {conn, command, freply}) => {
const res = await fetchJson('https://raw.githubusercontent.com/Jabalsurya2105/database/master/data/gombalan.json')
freply(await pickRandom(res))
})

Siesta({
command: '^joke$',
alias: 'joke',
desc: 'Lelucon acak untuk menghibur',
type: 'Random'
}, async (m, {conn, freply}) => {
const res = await fetchJson('https://official-joke-api.appspot.com/jokes/random')
let joke = res
freply(joke.setup)
await sleep(3000)
freply(joke.punchline)
})

