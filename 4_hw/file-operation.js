import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const VAR_FILENAME = process.env.FILENAME;

fs.writeFile(VAR_FILENAME, 'Hello world!', (err) => {
  if (err) throw err;
  console.log('Документ был создан!');
  fs.readFile(VAR_FILENAME, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Документ содержит', data);
  });
});
