const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder/');

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    const filePath = folder + file.name;
    fs.stat(filePath, (err, stats) => {
      if (file.isFile()) console.log(path.basename(filePath, path.extname(filePath)) + ' - ' + path.extname(filePath).slice(1) + ' - ' + (stats.size/1024).toFixed(2) + 'kb');
    });
  });
});