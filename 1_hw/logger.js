const fs = require('fs');

function logMessage(message) {
  fs.appendFile('log.txt', ` ${message}`, (err) => {
    if (err) {
      console.error('Error occured when writing file:', err);
      return;
    }
    console.log('File was successfully updated!');
  });
}

module.exports = { logMessage };
