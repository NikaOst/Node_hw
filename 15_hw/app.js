import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const port = 3333;
const app = express();

app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
  socket.on('message', (text) => {
    console.log(`Message from ${socket.id}:${text}`);
    socket.emit('message_ack', `Server received: ${text}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
