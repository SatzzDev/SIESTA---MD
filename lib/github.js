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

module.exports = { uploadToGH, listFilesFromGH };
