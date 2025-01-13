const {Handler} = require('../lib/command')
const {ftxt, ttle} = require('../lib/scrapes')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

Handler(async (m, { conn, user, budy, reply }) => {
  let mentionUser = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];

  for (let jid of mentionUser) {
    let user = global.db.data.users[jid];
    if (!user) continue;
    let afkTime = user.afkTime;
    if (!afkTime || afkTime < 0) continue;
    let reason = user.afkReason || "";
    m.reply(
      `Do not tag them! They are currently AFK${
        reason ? " with reason: " + reason : " without a reason"
      }\nFor ${CS(new Date() - afkTime)}`
    );
  }

  if (db.data.users[m.sender].afkTime > -1) {
    let user = global.db.data.users[m.sender];
    m.reply(
      `@${m.sender.split("@")[0]} has returned from AFK${
        user.afkReason ? " after: " + user.afkReason : ""
      }\nFor ${CS(new Date() - user.afkTime)}`
    );
    user.afkTime = -1;
    user.afkReason = "";
  }
});
