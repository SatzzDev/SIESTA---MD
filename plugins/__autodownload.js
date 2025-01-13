const { ftxt, ttle } = require('../lib/scrapes');
const { fetchJson } = require("../lib/myfunc");
const { Handler } = require('../lib/command');
const axios = require('axios');
function downloadIG(url) {
return new Promise((resolve, reject) => {
axios.post('https://apihut.in/api/download/videos', {"video_url":url,"type":"instagram"}).then(response =>  resolve(response.data))
.catch(err => reject(err));
});
}

Handler(async (m, { conn, user, budy, isPremium, react, mime, qmsg, reply, freply }) => {
if (m.chat !== "120363345101407384@g.us") {
if (budy.startsWith("https://") && budy.includes("instagram.com")) {
if (!isPremium && db.data.users[m.sender].limit < 1) return reply(global.mess.limit);
freply('*Instagram URL Detected!*\n\n_Downloading..._')
try {
const res = await downloadIG(budy);
for (let i of res.data) {
conn.sendFileUrl(m.chat, i.url, '', m);
}
if (!isPremium) db.data.users[m.sender].limit -= 5;
} catch (e) {
console.error(util.format(e));
}
} else if (budy.startsWith('https://vt.tiktok.com/') || budy.startsWith('https://www.tiktok.com/') || budy.startsWith('https://vm.tiktok.com/')) {
if (!isPremium && db.data.users[m.sender].limit < 1) return reply(global.mess.limit);
freply('*TikTok URL Detected*\n\n_Downloading..._')
let data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${m.text}`);   
if (data.images) {
for (let image of data.images) {
conn.sendMessage(m.chat, {image:{url:image.url}},{quoted:m})
}
} else {
await conn.sendMessage(m.chat, {video: { url: data.video.noWatermark }, caption: data.title }, { quoted: global.fake });
await conn.sendMessage(m.chat, {audio: {url:data.music.play_url}, mimetype:'audio/mp4', ptt:false},{quoted:m})
}
if (!isPremium) db.data.users[m.sender].limit -= 5;
}
}
});