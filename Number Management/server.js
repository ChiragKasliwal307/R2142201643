const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (method === 'GET') {
        if (url === '/') {
            const filePath = path.join(__dirname, 'index.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.html');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (url === '/style.css') {
            const filePath = path.join(__dirname, 'style.css');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading style.css');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
        } else if (url === '/script.js') {
            const filePath = path.join(__dirname, 'script.js');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading script.js');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/javascript' });
                    res.end(data);
                }
            });
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 8008;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
