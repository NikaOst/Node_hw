import express = require('express');

const app = express();
const port = 3333;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server starts on http://localhost:${port}`);
});
