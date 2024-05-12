require("../config")
const { Cmd } = require("../command")
const { fetchJson } = require('../lib/myfunc')
const axios = require("axios")
const cheerio = require("cheerio")


Cmd({
pattern: '^(wikipedia|wiki)$',
limit: true,
type: 'Internet'
}, async (m, command, Satzz) => {
let { reply, q } = m
let qontol = await fetchJson(`https://id.wikipedia.org/w/rest.php/v1/search/title?q=${q}&limit=10`)
let res = await wikipedia(qontol.pages[0].key)
let tks ='\n\n'
tks += `_Title:_ ${res.result.title}`
tks += `_Desc:_ ${res.result.desc}`
Satzz.sendButtons(m.chat, '*`WIKIPEDIA`*', tks, author, [{type: "url", text:"Go To Link", id: `https://id.wikipedia.org/wiki/${qontol.pages[0].key}`}], m, {img: res.result.thumb})
})




const wikipedia = async (querry) => {
try {
const link = await axios.get(`https://id.wikipedia.org/wiki/${querry}`);
const $ = cheerio.load(link.data);
let judul = $("#firstHeading").text().trim();
let thumb =
$("#mw-content-text").find("div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img").attr("src") || `//k.top4top.io/p_2121ug8or0.png`;
let desc = [];
$("#mw-content-text > div.mw-parser-output").each(function (sat, ria) {
let penjelasan = $(ria).find("p").text().trim();
desc.push(penjelasan);
});
for (let i of desc) {
const data = {
status: 200,
result: {
judul: judul,
thumb: "https:" + thumb,
desc: i,
},
};
return data;
}
} catch (err) {
var notFond = {
status: 200,
Pesan: err,
};
return notFond;
}
};