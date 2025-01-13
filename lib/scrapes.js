/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require('axios')



exports.Telesticker = async(url) => {
return new Promise(async (resolve, reject) => {
if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) throw 'Enter your url telegram sticker'
const packName = url.replace('https://t.me/addstickers/', '')
const data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`,{ method: 'GET', headers: { 'User-Agent': 'GoogleBot' } })
const hasil = []
for (let i = 0; i < data.data.result.stickers.length; i++) {
const fileId = data.data.result.stickers[i].thumb.file_id
const data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
const result = {
status: 200,
author: 'Xfarr05',
url: `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${data2.data.result.file_path}`,
}
hasil.push(result)
}
resolve(hasil)
})
}



exports.pitutur = async(query) => {
try {
const response = await axios.get(`https://www.pitutur.id/${query}`);
const html = response.data;
const $ = cheerio.load(html);
let result = [];
$('div.latest__item').each((index, element) => {
const title = $(element).find('h2.latest__title a').text().trim();
const category = $(element).find('h4.latest__subtitle a').text().trim();
const day = $(element).find('date.latest__date').text().split(' | ')[0].trim();
const hour = $(element).find('date.latest__date').text().split(' | ')[1].trim();
const url = $(element).find('h2.latest__title a').attr('href');
const image = $(element).find('img').attr('src');
result.push({ title, category, day, hour, image, url });
});
const data = {
status: 'ok',
creator: 'SatganzDevs',
result: result 
};
return data;
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}
exports.getpttur = async(query) => {
try {
const response = await axios.get(query);
const html = response.data;
const $ = cheerio.load(html);
const title = $('h1.read__title').text().trim();
const tanggal = $('div.read__info div.read__info__date').text().trim();
const image = $('div.photo__img img').attr('src')
let deskripsi = ''
$('article').find('p').each((index, element) => {
deskripsi += $(element).text() + '\n'.trim();
});
const data = {
status: 'ok',
creator: 'SatganzDevs',
title,
tanggal,
image,
deskripsi
};
return data;
} catch (error) {
console.error('Error scraping:', error);
return {
status: 'error',
error: error.message
};
}
}

exports.stickersearch = async (query) => {
return new Promise((resolve) => {
axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({data}) => {
const $ = cheerio.load(data)
const link = [];
$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
link.push($(b).attr('href'))
})
rand = link[Math.floor(Math.random() * link.length)]
axios.get(rand)
.then(({data}) => {
const $$ = cheerio.load(data)
const url = [];
$$('#stickerPack > div > div.row > div > img').each(function(a, b) {
url.push($$(b).attr('src').split('&d=')[0])
})
resolve({
creator: 'SatganzDevs',
title: $$('#intro > div > div > h1').text(),
author: $$('#intro > div > div > h5 > a').text(),
author_link: $$('#intro > div > div > h5 > a').attr('href'),
sticker: url
})
})
})
})
}


exports.pindl = async(url) => {
try {
let form = new URLSearchParams();
form.append("url", url);
let html = await (
await fetch("https://pinterestvideodownloader.com/", {
method: "POST",
body: form,
})
).text();
const $ = cheerio.load(html);
const videoSrc = $('video').attr('src');
if (videoSrc) {
return { status: true, videoUrl: videoSrc };
} else {
return { status: false, error: "Video not found" };
}
} catch (error) {
return { status: false, error: error.message };
}
}


/*exports.soundcloud = async(link) => {
return new Promise((resolve, reject) => {
const options = {
method: "POST",
url: "https://www.klickaud.co/download.php",
headers: {
"content-type": "application/x-www-form-urlencoded",
},
formData: {
value: link,
"2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37":
"710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3",
},
};
request(options, async function (error, response, body) {
console.log(body);
if (error) throw new Error(error);
const $ = cheerio.load(body);
resolve({
judul: $(
"#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)"
).text(),
download_count: $(
"#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)"
).text(),
thumb: $(
"#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img"
).attr("src"),
link: $("#dlMP3")
.attr("onclick")
.split(`downloadFile('`)[1]
.split(`',`)[0],
});
});
});
}*/

exports.pinterest = (querry) => {
return new Promise(async(resolve,reject) => {
axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
headers: {
"cookie" : "_auth=1; _b=\"datr=dgHRZPXP9znuQccJISuqXCVY;sb=iFbSZJl9p5Fft_D6ybT-p152;c_user=100027826357661;wd=1280x563;xs=32%3ADmebA0mr3Id53g%3A2%3A1691506316%3A-1%3A10820%3A%3AAcXb6TYvzM6k8GGNi94zKAGqFQ8gEOKQMtAsEjVBuA;fr=0GCKeRNL0jJ7emQX4.AWVolTQDSguSVaH4Ql8qZbEUBks.Bk51Hb.77.AAA.0.0.Bk51Hb.AWXvEaUTKaU;\"; _pinterest_sess=TWc9PSZkKzNNRGwyZ0VXY0kxMUk1YWJIV3QvaTlrVDJOdVh5M3lhamlhTGtRYzVncjhKUmhhNlpHc2g3cXg4aDRHVGRpdHVWMVMyZzJmMEx1dkdlVkZHVlhwaXVWQTRzdFJ3d1hoNVI5TUxIdUU4T3F0cndmSW14QmRoNUlsa3puTnl3YU1ZdGtFaXBhVEhlaGRUQTBaa21uSnIvRm5aM2Z3MVBaQWFCRVA0bWlMYnVoN0FsdU5kVTRDK1hMVFZpT3ZlQVE4SG5sbmMxSkhIbmloVitMTXdOa0JJM2lyckVEZkpUTk8vS1Z5RVNKTUZtenNQcnpMVFlKTW01WStQNFBnM21idGMwQU1HNENpdnhLSEpCT3k1OWI1aHpKUVFiakZXM1YyVWtjTDVNa1M5WG9lVlBjbGFzN0V0RjJub0U3TGFuaHFEeTFaaHp3VGhscGwySEo5eGdIb3RyZ2g0a1FtR21lSVgySWo1K25pVkFaZzhHUzNRaFNtMWR1UFF5Q3M1ZnJYclc4ZHJmdUpqSVFUWkpWZElFVEJBPT0mRVlhdU80K1pId1M1Ym1jTDVKc05zRVVwWnFNPQ==; _ir=0"
}
}).then(({ data }) => {
const $ = cheerio.load(data)
const result = [];
const hasil = [];
$('div > a').get().map(b => {
const link = $(b).find('img').attr('src')
result.push(link)
});
result.forEach(v => {
if(v == undefined) return
hasil.push(v)
})
hasil.shift();
resolve(hasil)
})
})
}



exports.ssweb = (url, device = 'desktop') => {
return new Promise((resolve, reject) => {
const base = 'https://www.screenshotmachine.com'
const param = {
url: url,
device: device,
cacheLimit: 0
}
axios({url: base + '/capture.php',
method: 'POST',
data: new URLSearchParams(Object.entries(param)),
headers: {
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
}).then((data) => {
const cookies = data.headers['set-cookie']
if (data.data.status == 'success') {
axios.get(base + '/' + data.data.link, {
headers: {
'cookie': cookies.join('')
},
responseType: 'arraybuffer'
}).then(({ data }) => {
result = {
status: 200,
result: data
}
resolve(result)
})
} else {
reject({ status: 404, statuses: `Link Error`, message: data.data })
}
}).catch(reject)
})
}



exports.nickff = (userId) => {
if (!userId) return new Error("no userId")
return new Promise((resolve, reject) => {
let body = {
"voucherPricePoint.id": 8050,
"voucherPricePoint.price": "",
"voucherPricePoint.variablePrice": "",
"n": "",
"email": "",
"userVariablePrice": "",
"order.data.profile": "",
"user.userId": userId,
"voucherTypeName": "FREEFIRE",
"affiliateTrackingId": "",
"impactClickId": "",
"checkoutId": "",
"tmwAccessToken": "",
"shopLang": "in_ID"
};
axios({
"url": "https://order.codashop.com/id/initPayment.action",
"method": "POST",
"data": body,
"headers": {
"Content-Type": "application/json; charset/utf-8",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
}
}).then(({
data
}) => {
resolve({
"username": data.confirmationFields.roles[0].role,
"userId": userId,
"country": data.confirmationFields.country
});
}).catch(reject);
});
}

exports.nickml = (id, zoneId) => {
return new Promise(async (resolve, reject) => {
axios
.post(
'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
new URLSearchParams(
Object.entries({
productId: '1',
itemId: '2',
catalogId: '57',
paymentId: '352',
gameId: id,
zoneId: zoneId,
product_ref: 'REG',
product_ref_denom: 'AE',
})
),
{
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
Referer: 'https://www.duniagames.co.id/',
Accept: 'application/json',
},
}
)
.then((response) => {
resolve(response.data.data.gameDetail)
})
.catch((err) => {
reject(err)
})
})
}

exports.artinama = (query) => {
return new Promise((resolve, reject) => {
queryy = query.replace(/ /g, '+')
axios.get('https://www.primbon.com/arti_nama.php?nama1=' + query + '&proses=+Submit%21+')
.then(({
data
}) => {
const $ = cheerio.load(data)
const result = $('#body').text();
const result2 = result.split('\n      \n        \n        \n')[0]
const result4 = result2.split('ARTI NAMA')[1]
const result5 = result4.split('.\n\n')
const result6 = result5[0] + '\n\n' + result5[1]
resolve(result6)
})
.catch(reject)
})
}





exports.ftxt = (text) => {
let hurufBiasa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let hurufSpesial = 'Ａ   Ｂ   Ｃ   Ｄ   Ｅ   Ｆ   Ｇ   Ｈ   Ｉ   Ｊ   Ｋ   Ｌ   Ｍ   Ｎ   Ｏ   Ｐ   Ｑ   Ｒ   Ｓ   Ｔ   Ｕ   Ｖ   Ｗ   Ｘ   Ｙ   Ｚ';
let hurufBiasaArray = hurufBiasa.split('');
let hurufSpesialArray = hurufSpesial.split('   ');
let hasil = '';
for (let i = 0; i < text.length; i++) {
let index = hurufBiasaArray.indexOf(text[i].toUpperCase());
if (index !== -1) {
hasil += hurufSpesialArray[index];
} else {
hasil += text[i];
}
}
return `*\`${hasil}\`*`;
}

exports.ttle = (text) => {
let hurufBiasa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let hurufSpesial = '𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝚀 𝚁 𝚂 𝚃 𝚄 𝚅 𝚆 𝚇 𝚈 𝚉';
let hurufBiasaArray = hurufBiasa.split('');
let hurufSpesialArray = hurufSpesial.split(' ');
let hasil = '';
for (let i = 0; i < text.length; i++) {
let index = hurufBiasaArray.indexOf(text[i].toUpperCase());
if (index !== -1) {
hasil += hurufSpesialArray[index] + ' '; // tambahkan spasi setelah setiap huruf spesial
} else {
hasil += text[i];
}
}
return hasil.trim(); // hapus spasi ekstra di akhir hasil
}



exports.flaming = async(text) => {
let res = await axios.get(`https://api.flamingtext.com/net-fu/image_output.cgi?_comBuyRedirect=false&script=smurfs-logo&text=${text}&symbol_tagname=popular&fontsize=120&fontname=SF%20Slapstick%20Comic&fontname_tagname=cool&textBorder=5&growSize=0&antialias=on&hinting=on&justify=2&letterSpacing=0&lineSpacing=0&textSlant=0&textVerticalSlant=0&textAngle=0&textOutline=off&textOutline=false&textOutlineSize=2&fillTextType=2&fillTextColor=%237F7F7F&fillTextPattern=Wood&fillTextPattern_tagname=standard&fillTextGradient=Blue%20Green&fillTextGradient_tagname=standard&fillTextGradientDirection=0&fillTextGradientReverse=off&fillTextGradientSmartFit=0&outlineSize=4&fillOutlineType=0&fillOutlineColor=%23169CCC&fillOutlinePattern=Wood&fillOutlinePattern_tagname=standard&fillOutlineGradient=Full%20saturation%20spectrum%20CCW&fillOutlineGradient_tagname=standard&fillOutlineGradientDirection=0&fillOutlineGradientReverse=off&fillOutlineGradientSmartFit=0&outline2Size=3&fillOutline2Type=0&fillOutline2Color=%23050A36&fillOutline2Pattern=Wood&fillOutline2Pattern_tagname=standard&fillOutline2Gradient=Full%20saturation%20spectrum%20CCW&fillOutline2Gradient_tagname=standard&fillOutline2GradientDirection=0&fillOutline2GradientReverse=off&fillOutline2GradientSmartFit=0&curveHighlight=off&curveHighlight=false&curveBrightness=90&curveFactor=1.5&curveOffsetX=0&curveOffsetY=5&shadowOnFirstOutline=off&shadowType=1&shadowXOffset=4&shadowYOffset=4&shadowBlur=4&shadowColor=%23050A36&shadowOpacity=40&reflectOpacity=50&reflectTiltX=0&reflectPercent=66&reflectScaleYPercent=100&reflectXOffset=0&reflectYOffset=0&shadowGlowColor=%230000FF&shadowGlowSize=2&shadowGlowFeather=5&shadowNormalColor=%233C3C3C&shadowNormalFeather=2&shadowNormalOpacity=50&shadowNormalTiltX=40&shadowNormalScaleYPercent=65&shadowNormalXOffset=0&shadowNormalYOffset=0&shadowSelfXOffset=10&shadowSelfYOffset=10&shadowSelfBlur=0&shadowSelfOpacity=50&backgroundResizeToLayers=on&backgroundRadio=1&backgroundColor=%23fff&backgroundPattern=Wood&backgroundPattern_tagname=standard&backgroundGradient=Full%20saturation%20spectrum%20CCW&backgroundGradient_tagname=standard&backgroundStarburstColorAlt=%23ED2400&backgroundStarburstColor1=%23BD2409&backgroundStarburstNum=25&backgroundStarburstRayPercentage=50&backgroundStarburstUseColor2=on&backgroundStarburstUseColor2=false&backgroundStarburstColor2=%23000000&backgroundStarburstOffsetAngle=0&backgroundStarburstXOffset=0&backgroundStarburstYOffset=0&backgroundStarburstCenterPercentage=2&backgroundStarburstRadiusX=300&backgroundStarburstRadiusY=300&backgroundUseOverlay=off&backgroundOverlayMode=5&backgroundOverlayPattern=Parque%20%231&backgroundOverlayPattern_tagname=standard&backgroundOverlayOpacity=100&backgroundImageUrl=http%3A%2F%2Fwww.flamingtext.com%2Fimages%2Ftextures%2Ftexture3.jpg&useFixedSize=on&useFixedSize=false&imageWidth=400&imageHeight=185&imageAlignment=4&autocrop=off&autocrop=false&autocropPadding=0&watermark=none&ext=png&jpgQuality=85&doScale=off&scaleWidth=240&scaleHeight=120&&_=1714755252965`)
let data = res.data.src
return data
}