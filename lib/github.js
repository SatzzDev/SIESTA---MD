
const fetch = require('node-fetch');
const fs = require('fs');

async function uploadToGH(token, owner, repo, directory, filePath, commitMessage) {
    try {
        const fileContent = fs.readFileSync(filePath);

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${directory}/${filePath}`, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: commitMessage,
                content: fileContent.toString('base64'),
            }),
        });

        const jsonResponse = await response.json();
        if (response.ok) {
            return jsonResponse.content.html_url;
        } else {
            console.error('Failed to upload file:', jsonResponse.message);
        }
    } catch (error) {
        console.error('Error occurred during file upload:', error.message);
    }
}

async function deleteFileFromGH(token, owner, repo, directory, fileName) {
    try {
        // Mendapatkan SHA hash dari file yang akan dihapus
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${directory}/${fileName}`, {
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const fileData = await response.json();
        const sha = fileData.sha;

        // Membuat payload untuk penghapusan file
        const deletePayload = {
            message: `Remove ${fileName}`,
            sha: sha,
            branch: 'main' // Atau ganti dengan branch yang sesuai
        };

        // Mengirim permintaan PUT untuk menghapus file
        const deleteResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${fileName}`, {
            method: 'DELETE',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletePayload)
        });

        if (deleteResponse.ok) {
            return `File ${fileName} berhasil dihapus.`;
        } else {
            const errorData = await deleteResponse.json();
            return `Gagal menghapus file: ${errorData.message}`;
        }
    } catch (error) {
        console.error('Terjadi kesalahan saat menghapus file:', error.message);
        return 'Terjadi kesalahan saat menghapus file.';
    }
}


async function listFilesFromGH(token, owner, repo, directory) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${directory}`, {
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const jsonResponse = await response.json();
        if (response.ok) {
            return jsonResponse;
        } else {
            throw new Error(`Failed to fetch files: ${jsonResponse.message}`);
        }
    } catch (error) {
        console.error('Error occurred during fetching file list:', error.message);
        throw new Error('Terjadi kesalahan saat memuat daftar file.');
    }
}

module.exports = { uploadToGH, deleteFileFromGH, listFilesFromGH };
