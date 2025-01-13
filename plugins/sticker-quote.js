require('../config')
const fs = require('fs')
const { Siesta } = require('../lib/command.js');
const axios = require('axios')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {uptotelegra} = require('../lib/uploader')


Siesta({
command: '^(quotely|quotelyv2|qc)$',
limit: true,
desc: 'quote chat maker',
type: 'Stiker'
}, async (m, {conn, command}) => {
const {q, pushname} = m
let ppuser = await conn.profilePictureUrl(m.sender, "image").catch(_ => "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60")
const name = await conn.getName(m.sender)
let theme = "quotly" === command ? "terang" : "quotlyv2" === command ? "gelap" : "random"
let result = await Quotly(name, ppuser, q, theme);
conn.sendImageAsSticker(m.chat, result, m, {packname,author})
})

async function Quotly(name, photoUrl, text, theme) {
const obj = {
type: "quote",
format: "png",
backgroundColor: "terang" === theme ? "#ffffff" : "gelap" === theme ? "#1b1429" : `#${[ ...Array(3) ].map((() => Math.floor(200 * Math.random()).toString(16).padStart(2, "0"))).join("")}`,
width: 512,
height: 768,
scale: 2,
messages: [{
entities: [],
avatar: !0,
from: {
id: 1,
name: name,
photo: {
url: photoUrl
}
},
text: text
}]
};
try {
const fallbackResponse = await axios.post("https://quotly.netorare.codes/generate", obj, {
headers: {
"Content-Type": "application/json"
}
});
return Buffer.from(fallbackResponse.data?.result?.image, "base64");
} catch (e) {
throw console.error("Quotly Error (Backup):", e), new Error("Error generating quote image");
}
}