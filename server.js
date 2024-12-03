const http = require('http');

// Configuración del servidor
const hostname = '0.0.0.0'; // Dirección IP (localhost)
const port = 80; // Puerto donde escuchará el servidor

// Creación del servidor
const server = http.createServer((req, res) => {
  // Configuración de la respuesta
  res.statusCode = 200; // Código HTTP de éxito
  res.setHeader('Content-Type', 'text/plain'); // Tipo de contenido
  res.end('¡Hola, mundo!'); // Respuesta del servidor
});

// Inicio del servidor
server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
