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
require('../config')
const fs = require("fs") 
const chalk = require("chalk") 
const { createCanvas, loadImage, registerFont } = require('canvas');





exports.memberUpdate = async(conn, anu) => {
try {
let metadata = await conn.groupMetadata(anu.id)
const memk = metadata.participants.length
const groupName =  metadata.subject || ''
const groupDesc =  metadata.desc || ''
let participants = anu.participants
for (let num of participants) {
let ppuser = await conn.profilePictureUrl(num, "image").catch(_ => "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60");
let usname = await conn.getName(num)


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━[ ADD ]━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
if (anu.action == 'add') {
conn.sendButtons(anu.id, `Welcome to \`${groupName}!\` *@${num.split('@')[0]}*💐`,`\n\nPlease take a moment to read our group's description. Your presence is appreciated! 🌷`, author, [{type:'btn', text:'Welcome!', id:''}]) 
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━[ REMOVE ]━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
} else if (anu.action == 'remove') {
conn.sendButtons(anu.id, `Goodbye, *@${num.split('@')[0]}*💐`,`\n\nWe'll miss you!`, author, [{type:'btn', text:'Bye 😢', id:''}]) 
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━[ PROMOTE ]━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
} else if (anu.action == 'promote') {
conn.sendButtons(anu.id, ``,`*@${num.split('@')[0]}* is now an admin of ${groupName}. Keep up the good work!`, author, [{type:'btn', text:'Congratulations!', id:''}]) 
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━[ DEMOTE ]━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
} else if (anu.action == 'demote') {
conn.sendButtons(anu.id, ``,`*@${num.split('@')[0]}* has been demoted from admin in ${groupName}.`, author, [{type:'btn', text:'Congratulations!', id:''}])
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━// 
//━━━━━━━━━━━━━━━[ UNKNOWN ]━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
} else console.log(anu.action)
}
} catch (error) {
console.log(chalk.bgRedBright(chalk.black("[ ERROR ]")),chalk.yellow(error))
}
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.bgCyanBright(chalk.black("[ UPDATE ]")),chalk.red(`${__filename}`))
delete require.cache[file];
require(file);
});
