const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname);
const folderFiles = path.join(__dirname, 'files');
const newFolderFiles = path.join(__dirname, 'files-copy/');

fs.rm(folder + '/files-copy', { recursive: true }, () => {
  fs.mkdir(folder + '/files-copy', { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(folderFiles, (err, files) => {
    files.forEach(file => {
      fs.copyFile((folderFiles + '/' + file), (newFolderFiles + file), (err) => {
        if (err) throw err;
      });
    });
  });
});


