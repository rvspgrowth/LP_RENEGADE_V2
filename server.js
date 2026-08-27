const http = require('http');
const fs = require('fs');
const path = require('path');

const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.svg':'image/svg+xml', '.glb':'model/gltf-binary', '.json':'application/json', '.ico':'image/x-icon' };

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/' || rel.endsWith('/')) rel += 'index.html';
  const file = path.join(__dirname, path.normalize(rel).replace(/^([.][.][/\\])+/, ''));
  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Nao encontrado');
      return;
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=300'
    });
    res.end(buf);
  });
}).listen(process.env.PORT || 3000);
