/* SC SIESTA - MD V5
BASE : HISOKA OLD
CREATOR : SATZZ
*/
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const fs = require('fs')
const chalk = require('chalk')
const axios = require('axios')
const _math = require('mathjs')
const _url = require('url')
const qs = require('qs')
const request = require('request');
const randomarray = async (array) => {
	return array[Math.floor(Math.random() * array.length)]
}


exports.Telesticker = async(url) => {
  return new Promise(async (resolve, reject) => {
    if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) throw 'Enter your url telegram sticker'
    const packName = url.replace('https://t.me/addstickers/', '')
    const data = await axios(
      `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`,
      { method: 'GET', headers: { 'User-Agent': 'GoogleBot' } }
    )
    const hasil = []
    for (let i = 0; i < data.data.result.stickers.length; i++) {
      const fileId = data.data.result.stickers[i].thumb.file_id
      const data2 = await axios(
        `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`
      )
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
		axios.get(`https://getstickerpack.com/stickers?query=${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
					link.push($(b).attr('href'))
				})
				rand = link[Math.floor(Math.random() * link.length)]
				axios.get(rand)
					.then(({
						data
					}) => {
						const $$ = cheerio.load(data)
						const url = [];
						$$('#stickerPack > div > div.row > div > img').each(function(a, b) {
							url.push($$(b).attr('src').split('&d=')[0])
						})
						resolve({
							creator: 'Kayla Bot',
							title: $$('#intro > div > div > h1').text(),
							author: $$('#intro > div > div > h5 > a').text(),
							author_link: $$('#intro > div > div > h5 > a').attr('href'),
							sticker: url
						})
					})
			})
	})
}


exports.randomtt = async (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://brainans.com/search?query=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const luser = $('#search-container > div:nth-child(1) > div.content__text > a').attr('href')
				axios.get('https://brainans.com/' + luser)
					.then(({
						data
					}) => {
						const $$ = cheerio.load(data)
						vlink = [];
						$$('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a').each(function(a, b) {
							vlink.push('https://brainans.com/' + $$(b).attr('href'))
						})
						randomarray(vlink).then(res => {
							axios.get(res)
								.then(({
									data
								}) => {
									const $$$ = cheerio.load(data)
									resolve({
										username: $$$('#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a').text(),
										caption: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__list').text(),
										like_count: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span').text(),
										comment_count: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span').text(),
										share_count: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span').text(),
										videourl: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video').attr('src')
									})
								})
						})
					})
			})
	})
}


exports.trendtwit = async (country) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://getdaytrends.com/${country}/`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const hastag = [];
				const tweet = [];
				const result = [];
				$('#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr> td.main > a').each(function(a, b) {
					deta = $(b).text()
					hastag.push(deta)
				})
				$('#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr > td.main > div > span').each(function(a, b) {
					deta = $(b).text()
					tweet.push(deta)
				})
				num = 1
				for (let i = 0; i < hastag.length; i++) {
					result.push({
						rank: num,
						hastag: hastag[i],
						tweet: tweet[i]
					})
					num += 1
				}
				resolve({
					country: country,
					result: result
				})
			})
			.catch(reject)
	})
}

exports.facebook = async (url) => {
    return new Promise(async(resolve, reject) => {
        await axios.get('https://downvideo.net/').then(gdata => {
        const a = cheerio.load(gdata.data)
        const token = a('body > div > center > div.col-md-10 > form > div > input[type=hidden]:nth-child(2)').attr('value')
        const options = {
            method: "POST",
            url: `https://downvideo.net/download.php`,
            headers: {
                "content-type": 'application/x-www-form-urlencoded',
                "cookie": gdata["headers"]["set-cookie"],
                "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            },
            formData: {
                URL: url,
                token: token,
            },
        };
        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            const result = {
                status: 200,
                title: $('body').find('div:nth-child(1) > h4').text(),
                sd: $('#sd > a').attr('href'),
                hd: $('body').find('div:nth-child(7) > a').attr('href')
            }
            resolve(result)
        })
    })
})
}

exports.tiktok = async (url) => {
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

exports.instagram = async (url) => {
	return new Promise(async(resolve, reject) => {
		axios.request({
			url: 'https://www.instagramsave.com/download-instagram-videos.php',
			method: 'GET',
			headers:{
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const token = $('#token').attr('value')
			let config ={
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				data: {
					'url': url,
					'action': 'post',
					'token': token
				}
			}
		axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
		.then(({ data }) => {
		resolve(data)
		   })
		})
	.catch(reject)
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

exports.pinterestdl = async(url) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: `https://www.expertsphp.com/facebook-video-downloader.php`,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "cookie": "__gads=ID=a826d8f71f32cdce-228526c6c4d30038:T=1656127044:RT=1656127044:S=ALNI_Mbc0q65XMPrQjf8pqxKtg_DfBEnNw; __gpi=UID=0000068f7e0217a6:T=1656127044:RT=1656334216:S=ALNI_MYDy-jLWlGuI8I9ZeSAgcTfDaJohQ; _gid=GA1.2.1776710921.1656334217; _gat_gtag_UA_120752274_1=1; _ga_D1XX1R246W=GS1.1.1656354473.4.1.1656354584.0; _ga=GA1.2.136312705.1656127045"
            },
            formData: {url: url}
        }
        request(options, async function(error, response, body) {
            if (error) throw new Error(error);
            const $ = cheerio.load(body)
            const hasil = [];
            $('#showdata > div:nth-child(4) > table > tbody > tr ').each(function(a, b) {
                const result = {
                    status: 200,
                    quality: $(b).find('> td:nth-child(2) > strong').text(),
                    format: $(b).find('> td:nth-child(3) > strong').text(),
                    url: $(b).find('> td:nth-child(1) > a').attr('href')
                }
                hasil.push(result)
            })
            resolve(hasil)
        });
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

exports.devianart = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://www.deviantart.com/search?q=' + query)
			.then(({
				data
			}) => {
				const $$ = cheerio.load(data)
				no = ''
				$$('#root > div.hs1JI > div > div._3WsM9 > div > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div:nth-child(1) > div > section > a').each(function(c, d) {
					no = $$(d).attr('href')
				})
				axios.get(no)
					.then(({
						data
					}) => {
						const $ = cheerio.load(data)
						const result = [];
						$('#root > main > div > div._2QovI > div._2rKEX._17aAh._1bdC8 > div > div._2HK_1 > div._1lkTS > div > img').each(function(a, b) {
							result.push($(b).attr('src'))
						})
						resolve(result)
					})
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



//━━━━━━━━━━━━━━━[ FILE UPDATE ]━━━━━━━━━━━━━━━━━\\
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.bgCyanBright(chalk.black("「 UPDATE 」")),chalk.red(`${__filename}`))
delete require.cache[file];
require(file);
});