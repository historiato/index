const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 80;

// Directorio base desde donde se servirán los archivos
const publicDirectory = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  // Resolver la ruta del archivo solicitado
  const filePath = path.join(publicDirectory, req.url === '/' ? 'index.html' : req.url);

  // Determinar el tipo de contenido según la extensión del archivo
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf',
    '.wasm': 'application/wasm',
    '.txt': 'text/plain',
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Leer y servir el archivo
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Archivo no encontrado
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
      } else {
        // Otro error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>Error del servidor: ${err.code}</h1>`, 'utf-8');
      }
    } else {
      // Archivo encontrado
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
