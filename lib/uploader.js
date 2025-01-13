
let axios = require('axios')
let BodyForm = require('form-data')
let { fromBuffer } = require('file-type')
let util = require('util')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')
var imgbbUploader = require('imgbb-uploader');

async function uploadImg(path) {
const options = {
apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', 
imagePath: path,
expiration: 600,
};
imgbbUploader(options).then((res) => {
return res;
}).catch((e) => {
console.error(`Handle error: ${e}`);
return "http://placekitten.com/300/300";
});
}
function TelegraPh(Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

async function UploadFileUgu (input) {
	return new Promise (async (resolve, reject) => {
			const form = new BodyForm();
			form.append("files[]", fs.createReadStream(input))
			await axios({
				url: "https://uguu.se/upload.php",
				method: "POST",
				headers: {
					
					...form.getHeaders()
				},
				data: form
			}).then((data) => {
				resolve(data.data.result.url)
			}).catch((err) => reject(err))
	})
}
          async function uploadToTop4Top(input) {
            try {
              const form = new BodyForm();
              form.append("file_1_", fs.createReadStream(input));
              form.append("file_2_", "");
              form.append("file_3_", "");
              form.append("file_4_", "");
              form.append("file_5_", "");
              form.append("file_6_", "");
              form.append("file_7_", "");
              form.append("file_8_", "");
              form.append("file_9_", "");
              form.append("file_10_", "");
              form.append("submitr", '[ رفع الملفات ]');

              const response = await axios({
                url: "https://top4top.io/index.php",
                method: "POST",
                headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                  ...form.getHeaders()
                },
                data: form,
              });

              const $ = cheerio.load(response.data);

              return $('div.inputbody:contains("رابط الصورة المباشر") input').val();
            } catch (err) {
              throw new Error(`Error uploading file: ${err.message}`);
            }
          }
function webp2mp4File(path) {
	return new Promise((resolve, reject) => {
		 const form = new BodyForm()
		 form.append('new-image-url', '')
		 form.append('new-image', fs.createReadStream(path))
		 axios({
			  method: 'post',
			  url: 'https://ezgif.com/webp-to-mp4',
			  data: form,
			  headers: {
				   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			  }
		 }).then(({ data }) => {
			  const bodyFormThen = new BodyForm()
			  const $ = cheerio.load(data)
			  const file = $('input[name="file"]').attr('value')
			  bodyFormThen.append('file', file)
			  bodyFormThen.append('convert', "Convert WebP to MP4!")
			  axios({
				   method: 'post',
				   url: 'https://ezgif.com/webp-to-mp4/' + file,
				   data: bodyFormThen,
				   headers: {
						'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				   }
			  }).then(({ data }) => {
				   const $ = cheerio.load(data)
				   const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				   resolve({
						status: true,
						message: "Created By Satzz",
						result: result
				   })
			  }).catch(reject)
		 }).catch(reject)
	})
}


module.exports = { uploadImg, TelegraPh, UploadFileUgu, uploadToTop4Top, webp2mp4File}
