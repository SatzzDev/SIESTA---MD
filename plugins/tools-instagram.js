const { Siesta } = require("../lib/command");
const { IgApiClient } = require('instagram-private-api');

const ig = new IgApiClient();
ig.state.generateDevice('akuntumballll311');

// Fungsi login Instagram
async function loginInstagram() {
    try {
        await ig.account.login('akuntumballll311', 'jayayusman');
        console.log("Berhasil login ke Instagram.");
    } catch (error) {
        console.error("Gagal login ke Instagram:", error);
        throw new Error("Gagal login ke Instagram. Silakan cek kembali kredensial login.");
    }
}

// Fungsi untuk mendapatkan daftar followers dan following
async function getFollowersAndFollowing(username) {
    try {
        const user = await ig.user.searchExact(username);
        const followersFeed = ig.feed.accountFollowers(user.pk);
        const followingFeed = ig.feed.accountFollowing(user.pk);

        const followers = await followersFeed.items();
        const following = await followingFeed.items();

        return {
            followers: followers.map(user => user.username),
            following: following.map(user => user.username)
        };
    } catch (error) {
        console.error("Gagal mendapatkan data followers/following:", error);
        throw new Error("Tidak dapat mengambil data followers/following. Coba lagi nanti.");
    }
}

// Fungsi untuk menemukan akun yang belum follow-back
function findNonFollowers(followers, following) {
    return following.filter(user => !followers.includes(user));
}

Siesta({
    command: '^unfollowers$',
    desc: 'cek orang yang ga follback akun kamu',
    type: 'Alat'
}, async (m, { conn, command, text, reply }) => {
    try {
        await reply('Sedang memeriksa... Mohon tunggu sebentar.');
        await loginInstagram();
        const { followers, following } = await getFollowersAndFollowing(text);
        const nonFollowers = await findNonFollowers(followers, following);
        
        const responseMessage = nonFollowers.length
            ? `Akun Yang Anda Follow Tetapi Tidak Memfollow Anda:\n${nonFollowers.map(username => `https://instagram.com/${username}`).join('\n')}`
            : 'Semua akun sudah follback!';
        
        await conn.sendButtons(m.chat, '', responseMessage, 'NOTE: silahkan cek dulu, karena terkadang bot suka salah', [{type:'btn',text:"Ok",id:'o'}],m);
    } catch (error) {
        await reply("Terjadi kesalahan: " + error.message);
    }
});
