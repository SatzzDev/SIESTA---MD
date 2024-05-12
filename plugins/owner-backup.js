const { Cmd } = require('../command.js');
const fs = require('fs')


Cmd({
  pattern: 'backup',
  onlyOwner: true,
  desc: 'Backup File',
  type: 'Owner'
}, async (m, command, Satzz) => {
const tanggal = new Date().toLocaleDateString('id', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace(/ /g, '-').replace(/,/g, '');
const { exec } = require("child_process")
m.reply('please wait...')
exec(`git init &&
git config user.name "SatzzDev" &&
git config user.email "natan.aja216@gmail.com" &&
git add package.json &&
git add plugins &&
git add lib &&
git add message &&
git add src &&
git add command.js &&
git add config.js &&
git add index.js &&
git add main.js &&
git commit -m "${tanggal}" &&
git branch -m ${tanggal} && 
git remote add origin https://github.com/SatzzDev/SIESTA---MD.git &&
git push -u origin ${tanggal}
`, (error, stdout, stderr) => {
if (error) {
exec("rm -rf .git")
m.reply(`Error pushing changes: ${error}`);
return;
}
exec("rm -rf .git")
m.reply('Changes committed and pushed to GitHub')
});
});