const fs = require('fs');

fs.writeFile('info.txt', 'Node.js is awesome!', (err) => {
  if (err) {
    console.error('Error occured when writing file:', err);
    return;
  }
  console.log('File was successfully created!');
  fs.readFile('info.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error occured when reading file:', err);
      return;
    }
    console.log('File data:', data);
  });
});
