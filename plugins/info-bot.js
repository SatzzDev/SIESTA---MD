const { Siesta } = require('../lib/command');
const { prepareWAMessageMedia } = require('@whiskeysockets/baileys');
const speed = require("performance-now");
const { exec } = require("child_process");
const { sizeFormatter } = require('human-readable');
const os = require('os');
const {runtime} = require("../lib/myfunc")

// Formatter untuk ukuran file/memori
const formatp = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});

Siesta({
    command: '^infobot$',
    alias: 'infobot',
    desc: 'Informasi tentang bot',
    type: 'Informasi',
}, async (m, { conn }) => {
const memUsage = process.memoryUsage();
const totalMem = os.totalmem();
const freeMem = os.freemem();
const uptime = os.uptime();
const sysUptime = runtime(os.uptime()); 
const sysInfo = `
*Informasi Bot:*
- Nama: ${global.botname}
- Versi: 1.0.0
- Runtime: ${sysUptime}

*Informasi Sistem:*
- Platform: ${os.platform()}
- Arsitektur: ${os.arch()}
- Total Memori: ${formatp(totalMem)}
- Memori Tersedia: ${formatp(freeMem)}

*Penggunaan Memori:*
- RSS: ${formatp(memUsage.rss)}
- Heap Total: ${formatp(memUsage.heapTotal)}
- Heap Digunakan: ${formatp(memUsage.heapUsed)}
- External: ${formatp(memUsage.external)}
`;
m.reply(sysInfo);
});

Siesta({
command: '^runtime$',
alias: 'runtime',
onlyOwner: false,
desc: 'informasi bot aktif',
type: 'Informasi'
}, async (m, {conn, command}) => {
m.reply(runtime(os.uptime()));
})
// Perintah untuk tes `speedtest-cli`
Siesta({
    command: '^ping$',
    alias: 'ping',
    desc: 'Tes koneksi internet dengan speedtest-cli',
    type: "Informasi"
}, async (m, { conn }) => {
    m.reply('Menguji koneksi internet...');
    exec('speedtest-cli --simple', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            m.reply(`Gagal menjalankan tes kecepatan: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            m.reply(`Error output: ${stderr}`);
            return;
        }

        // Parse output speedtest
        const result = parseSpeedTest(stdout);
        m.reply(result);
    });

    // Fungsi untuk memproses output speedtest-cli
    function parseSpeedTest(stdout) {
        const lines = stdout.split('\n');
        let ping = '', download = '', upload = '';
        
        lines.forEach(line => {
            if (line.includes('Ping')) {
                ping = line.split(':')[1].trim();
            }
            if (line.includes('Download')) {
                download = line.split(':')[1].trim();
            }
            if (line.includes('Upload')) {
                upload = line.split(':')[1].trim();
            }
        });

        return `*Hasil Speedtest:*\n\nPing: ${ping}\nDownload: ${download}\nUpload: ${upload}`;
    }
});

// Perintah untuk mengukur latensi bot
Siesta({
    command: '^speed$',
    desc: 'Informasi kecepatan bot',
    type: 'Informasi'
}, async (m, { conn }) => {
    const timestampp = speed();
    const latensi = speed() - timestampp;

    m.reply(`Kecepatan bot: ${latensi.toFixed(4)} Detik`);
});

// Informasi tambahan tentang memori dan sistem
Siesta({
    command: '^sysinfo$',
    alias: 'sysinfo',
    desc: 'Informasi sistem',
    type: 'Informasi'
}, async (m, { conn }) => {
    const memUsage = process.memoryUsage();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const uptime = os.uptime();

    const sysInfo = `
*Informasi Sistem:*
- Platform: ${os.platform()}
- Arsitektur: ${os.arch()}
- Total Memori: ${formatp(totalMem)}
- Memori Tersedia: ${formatp(freeMem)}
- Uptime: ${formatUptime(uptime)}
- Penggunaan Memori:
  RSS: ${formatp(memUsage.rss)}
  Heap Total: ${formatp(memUsage.heapTotal)}
  Heap Digunakan: ${formatp(memUsage.heapUsed)}
  External: ${formatp(memUsage.external)}
    `;

    m.reply(sysInfo);

   function formatUptime(seconds) {
    const d = Math.floor(seconds / 86400); // Hitung hari
    const h = Math.floor((seconds % 86400) / 3600); // Hitung jam sisa
    const m = Math.floor((seconds % 3600) / 60); // Hitung menit sisa
    const s = Math.floor(seconds % 60); // Hitung detik sisa
    return `${d} Hari ${h} Jam ${m} Menit ${s} Detik`;
}

});
