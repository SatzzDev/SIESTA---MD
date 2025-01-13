const { Siesta } = require('../lib/command.js');
const fs = require('fs');
const archiver = require('archiver');
const chalk = require("chalk")
Siesta({
command: '^backup$',
alias: 'backup',
onlyOwner: true,
desc: 'Membackup Bot',
type: 'Pemilik'
}, async (m, {conn, command}) => {
const tanggal = new Date().toLocaleDateString('id', { weekday: 'long' }) + ',' + ' ' + new Date().toLocaleDateString("id", {day: 'numeric', month: 'long', year: 'numeric'})
const backupFileName = `SIESTA-MD ${tanggal}.zip`;
const output = fs.createWriteStream(backupFileName);
const archive = archiver('zip', { zlib: { level: 9 } });
archive.pipe(output);
archive.on('warning', function(err) { if (err.code === 'ENOENT') { 
console.log(chalk.bgRedBright(chalk.black("[ ERROR ]")),
chalk.yellow(err))
} else { 
throw err 
}
});
archive.glob('**/*', { cwd: './', ignore: ['node_modules/**/*', 'session/**', '**/.*', backupFileName]});
await archive.finalize()
await conn.sendMessage(m.sender, {document: {url: `./${backupFileName}` }, mimetype: "application/zip", fileName: backupFileName}, {quoted: m})
await fs.unlinkSync(backupFileName)
})