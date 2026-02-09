const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const url = 'https://thepact.in/advocate-maximus/';
const downloadDir = path.join(__dirname, '..', 'public', 'images', 'advocate-maximus');

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function downloadImage(imgUrl) {
  const fileName = path.basename(new URL(imgUrl).pathname);
  const filePath = path.join(downloadDir, fileName);

  https.get(imgUrl, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${fileName}`);
      });
    } else {
      console.error(`Failed to download ${imgUrl}: Status Code ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${imgUrl}: ${err.message}`);
  });
}

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const imgRegex = /(?:src|data-src)="([^">]+\.(?:jpg|png|gif|svg|webp|jpeg)(?:\?[^">]*)?)"/g;
    let match;
    const images = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      let imgUrl = match[1];
      if (!imgUrl.startsWith('http')) {
        const baseUrl = new URL(url);
        imgUrl = new URL(imgUrl, baseUrl.origin).href;
      }
      images.add(imgUrl);
    }
    
    console.log(`Found ${images.size} images. Starting download...`);
    images.forEach(imgUrl => {
      downloadImage(imgUrl);
    });
  });
}).on('error', (err) => {
  console.error('Error: ' + err.message);
});


