require('../config')
const { Siesta } = require('../lib/command.js');
const fetch = require('node-fetch')
const fs = require('fs')
const FormData = require('form-data')


Siesta({
command: '^tourl$',
alias: 'tourl',
limit: true,
desc: 'image to url',
type: 'Alat'
}, async (m, {conn, command}) => {
let {reply} = m
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (!/image|video|audio|sticker|document/.test(mime)) return reply("No media found");
reply(mess.wait)
let media = await conn.downloadAndSaveMediaMessage(qmsg);
const { files: files } = await uploadUguu(media), caption = `📮 *Link:*\n${files[0]?.url}`;
await conn.sendButtons(m.chat, "DONE", caption, author, [{type:'url',text:'Fetch Image',id:files[0]?.url},{type:'copy',text:'Copy Url',id:files[0]?.url}], m);
})

async function uploadUguu(path) {
try {
const form = new FormData;
form.append("files[]", fs.createReadStream(path));
const res = await fetch("https://uguu.se/upload.php", {
method: "POST",
headers: form.getHeaders(),
body: form
}),
json = await res.json();
return await fs.promises.unlink(path), json;
} catch (e) {
return await fs.promises.unlink(path), "Upload failed";
}
};