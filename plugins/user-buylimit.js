const { Siesta } = require('../lib/command');

Siesta({
  command: '^buylimit$',
  type: 'Alat',
}, async (m, { conn, command, text, reply }) => {
  if (!text) return reply('Masukkan angka! Contoh: .buylimit 1\n1 limit = 10 gold');

  const jumlah = parseInt(text); // Konversi input menjadi angka
  if (isNaN(jumlah) || jumlah <= 0) return reply('Jumlah harus berupa angka positif.');

  const hargaPerLimit = 10; // Tentukan harga per limit
  const totalHarga = jumlah * hargaPerLimit;

  const userGold = db.data.users[m.sender]?.gold || 0; // Ambil jumlah gold pengguna, default 0 jika tidak ada

  if (userGold < totalHarga) {
    return reply(`Gold Anda tidak cukup! Anda membutuhkan ${totalHarga} gold untuk membeli ${jumlah} limit.`);
  }

  // Kurangi gold pengguna dan tambahkan limit
  db.data.users[m.sender].gold -= totalHarga;
  db.data.users[m.sender].limit = (db.data.users[m.sender].limit || 0) + jumlah;

  reply(`Berhasil membeli ${jumlah} limit seharga ${totalHarga} gold. Sisa gold Anda: ${db.data.users[m.sender].gold}`);
});
