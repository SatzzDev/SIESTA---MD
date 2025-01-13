require('../config');
const { Siesta } = require('../lib/command.js');

Siesta({
command: 'help',
desc: 'Maybe Can Help',
type: 'Informasi'
}, async (m, {conn, command}) => {
let { reply, q } = m;

reply(`
1. *APA ITU LIMIT?*
- \`\`\`Limit Merupakan batasan yang diberikan kepada pengguna dalam menggunakan fitur tertentu. Misalnya, jumlah pesan yang bisa dikirim atau perintah yang bisa digunakan.\`\`\`

3. *BAGAIMANA CARA MENDAPATKAN LIMIT?*
- \`\`\`LIMIT DAN GAME LIMIT BISA KAMU BELI DENGAN BALANCE.\`\`\`

4. *APA FUNGSI GOLD?*
- \`\`\`Gold Merupakan Mata Uang yang dimiliki oleh pengguna yang nantinya dipergunakan untuk membeli item seperti limit.\`\`\`

*"NOTE":*
2. id:
- *.buylimit* (perintah untuk membeli limit)
- *.me* (perintah untuk melihat informasi pengguna)
`)
});