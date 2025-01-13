require('../config');
const { Siesta } = require('../lib/command.js');
const { CS, jsonformat, reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc");
;

Siesta({
command: '^(wallpaper|wpp)$',
alias: 'wallpaper',
limit: true,
desc: 'get wallpaper',
type: 'Alat'
}, async (m, {conn, command}) => {
let { reply, q } = m;
if (!q) return reply(`mau nyari wallpaper apa njir, contoh nih: .${command} cgi`);
let ress = await wallpaper(q)
let res = await pickRandom(ress.url)
conn.sendMessage(m.chat, {image: {url:await getBuffer(res)}},{quoted:m});
});

const axios = require('axios');
const cheerio = require('cheerio');

async function wallpaper(query) {
try {
const response = await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query, {headers: {
'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
'Accept-Encoding':'gzip, deflate, br'
'Accept-Language':'en,de;q=0.9'
'Dnt':'1'
'Priority':'u=0, i'
'Sec-Ch-Ua':'"Not/A)Brand";v="8", "Chromium";v="126", "Avast Secure Browser";v="126"'
'Sec-Ch-Ua-Mobile':'?0'
'Sec-Ch-Ua-Platform':'"Windows"'
'Sec-Fetch-Dest':'document'
'Sec-Fetch-Mode':'navigate'
'Sec-Fetch-Site':'none'
'Sec-Fetch-User':'?1'
'Upgrade-Insecure-Requests':'1'
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Avast/126.0.0.0'
}});
const $ = cheerio.load(response.data);
const urls = [];
$('li[itemprop="associatedMedia"]').each((index, element) => {
const url = $(element).find('a').attr('href') + '/download';
if (url) {
urls.push(url);
}
});
const updatedUrls = [];
for (let i of urls) {
const res = await axios.get(i);
const _$ = cheerio.load(res.data);
const imgUrl = _$('#show_img').attr('src'); // Menggunakan id 'show_img'
updatedUrls.push(imgUrl);
}
return {
status: 'ok',
developer: "SatganzDevs",
urls: updatedUrls
};
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}

// Contoh penggunaan
//wallpaper('anime').then(data => console.log(data)).catch(error => console.error(error));
