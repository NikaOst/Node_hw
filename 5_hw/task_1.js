import http from 'http';
const port = 3333;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
  const authorization = req.headers['authorization'];
  res.setHeader('Content-Type', 'text/plain');
  if (!authorization) {
    res.statusCode = 401;
    return res.end('Unauthorized');
  } else {
    res.statusCode = 200;
    return res.end('Authorization header received');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
