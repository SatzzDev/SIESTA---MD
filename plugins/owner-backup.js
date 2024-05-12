const { Cmd } = require('../command.js');
const fs = require('fs')
const archiver = require('archiver');
const { exec } = require("child_process")
Cmd({
  pattern: 'backup',
  onlyOwner: true,
  desc: 'Backup File',
  type: 'Owner'
}, async (m, command, Satzz) => {
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
git commit -m "Upload With Nodejs" &&
git branch -M main && 
git remote add origin https://github.com/SatzzDev/SIESTA---MD.git &&
git push -u origin main
`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error pushing changes: ${error}`);
      return;
    }
    console.log('Changes committed and pushed to GitHub');
    m.reply('backup succes!')
  });
});