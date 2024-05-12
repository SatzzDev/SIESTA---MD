/* SC SIESTA - MD V5
BASE : HISOKA OLD
CREATOR : SATZZ
*/
const FormData = require('form-data');

async function remini(imageData, processingType) {
  return new Promise((resolve, reject) => {
    const availableProcessingTypes = ["enhance", 'recolor', 'dehaze'];
    const selectedProcessingType = availableProcessingTypes.includes(processingType) ? processingType : availableProcessingTypes[0];

    const form = new FormData();
    const apiUrl = `https://inferenceengine.vyro.ai/${selectedProcessingType}`;

    form.append("model_version", 1, {
      'Content-Transfer-Encoding': 'binary',
      'Content-Type': "multipart/form-data; charset=utf-8"
    });

    form.append("image", Buffer.from(imageData), {
      'filename': "enhance_image_body.jpg",
      'Content-Type': "image/jpeg"
    });

    form.submit({
      'url': apiUrl,
      'host': "inferenceengine.vyro.ai",
      'path': `/${selectedProcessingType}`,
      'protocol': 'https:',
      'headers': {
        'User-Agent': "okhttp/4.9.3",
        'Connection': "Keep-Alive",
        'Accept-Encoding': 'gzip'
      }
    }, (error, response) => {
      if (error) {
        reject(error);
      }
      
      let responseData = [];
      response.on("data", (dataChunk) => {
        responseData.push(dataChunk);
      }).on('end', () => {
        resolve(Buffer.concat(responseData));
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });
}

module.exports.remini = remini;