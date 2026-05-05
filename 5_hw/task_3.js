import http from 'http';

const port = 3333;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
  const method = req.method;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  if (method === 'PUT') {
    res.end('PUT-запрос обработан');
  } else if (method === 'DELETE') {
    res.end('DELETE-запрос обработан');
  } else {
    res.end('Метод неправильный');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
