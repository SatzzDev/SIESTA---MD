const { Handler } = require('../lib/command');
const { fetchJson } = require("../lib/myfunc");
const cheerio = require('cheerio');
const util = require('util')
const axios = require('axios');
function downloadIG(url) {
return new Promise((resolve, reject) => {
axios.post('https://apihut.in/api/download/videos', {"video_url":url,"type":"instagram"}).then(response =>  resolve(response.data))
.catch(err => reject(err));
});
}

Handler(async (m, { conn, user, budy, isPremium, react, mime, qmsg, reply }) => {
if (m.isGroup && m.chat === "120363345101407384@g.us") {
if (budy.startsWith("https://") && budy.includes("instagram.com")) {
try {
react('⏳');
const res = await downloadIG(budy);
for (let i of res.data) {
conn.sendFileUrl("120363229748458166@newsletter", i.url, '', m);
}
react('✈️');
} catch (e) {
console.error(util.format(e));
}
} else if (budy.startsWith('https://vt.tiktok.com/') || budy.startsWith('https://www.tiktok.com/') || budy.startsWith('https://vm.tiktok.com/')) {
react('⏳');
let data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${m.text}`);   
await conn.sendMessage("120363229748458166@newsletter", {video: { url: data.video.noWatermark }});
await react('✈️');
}
}
})