import http from 'http';
import fs from 'fs';

const port = 3333;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
  try {
    res.setHeader('Content-Type', 'text/plain');
    throw new Error('Something went wrong');
  } catch (err) {
    fs.appendFile('errors.log', `${err}\n`, (err) => {
      if (err) throw err;
    });
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
