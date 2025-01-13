const { Siesta } = require('../lib/command.js');
const axios = require('axios');
const cheerio = require('cheerio');
const { spawn } = require('child_process')



Siesta({
command:'styletext',
desc:'mempercantik teks',
limit:true,
type:'Alat'
}, async (m, {conn, command}) => {
let {q} = m
if (!q) return m.reply('where\'s the text?')
let ontol = await styletext(q)
conn.sendButtons(m.chat, '', 'RESULT', global.author, ontol, m)
})




function styletext(teks) {
return new Promise((resolve, reject) => {
axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
.then(({ data }) => {
let $ = cheerio.load(data)
let hasil = []
$('table > tbody > tr').each(function (a, b) {
hasil.push({ type: 'copy', text: $(b).find('td:nth-child(2)').text().trim(), id: $(b).find('td:nth-child(2)').text().trim()})
})
resolve(hasil)
})
})
}
