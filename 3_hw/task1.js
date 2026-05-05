const fs = require('fs');

fs.mkdir('myFolder', (err) => {
  if (err) {
    console.error('Ошибка при создании каталога:', err);
    return;
  }
  console.log('Каталог успешно создан');
  fs.rmdir('myFolder', (err) => {
    if (err) {
      console.error('Ошибка при удалении каталога:', err);
      return;
    }
    console.log('Каталог успешно удален');
  });
});
