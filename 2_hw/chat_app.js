// Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
import EventEmitter from 'node:events';
const emitter = new EventEmitter();

emitter.on('message', (username, message) => {
  console.log(`${username}: ${message} `);
});

function sendMessage(username, message) {
  emitter.emit('message', username, message);
}

sendMessage('Marsha', 'Hello!');
sendMessage('Anna', 'Hello everybody!');
