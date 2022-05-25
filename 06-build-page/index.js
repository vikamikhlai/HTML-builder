const fs = require('fs');
const path = require('path');
const folderStyles = path.join(__dirname, 'styles');
const folderRoot = path.join(__dirname);
const folderComponents = path.join(__dirname, 'components');
let fileTemplate = '';
let fileStyle = '';
const folderAssets = path.join(__dirname, 'assets');

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) throw err;
  fileTemplate = data;
});
fs.readdir(folderComponents, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const filePath = folderComponents + '/' + file.name;
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err;
      fileTemplate = fileTemplate.replace(`{{${path.basename(filePath, path.extname(filePath))}}}`, data);
      fs.mkdir(folderRoot + '/project-dis', { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFile((folderRoot + '/project-dis' + '/index.html'), fileTemplate, 'utf-8',
          (err) => {
            if (err) throw err;
          });
      });
    });
  });
});

fs.readdir(folderStyles, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const filePath = folderStyles + '/' + file.name;
    fs.stat(filePath, (err) => {
      if (err) throw err;
      if(file.isFile() && path.extname(filePath) === '.css') {
        fs.readFile(filePath, 'utf8', function(error, data){
          if(error) throw error; 
          fileStyle += data;
          fs.writeFile((folderRoot + '/project-dis' + '/style.css'), fileStyle, 'utf-8',
            (err) => {
              if (err) throw err;
            });
        });
      }
    });
  });
});

function copyFilesRecursivlyFrom(folder) {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      if (file.isDirectory()) {
        fs.mkdir(folderRoot + '/project-dis' + '/assets/' + file.name, { recursive: true }, () => {
          copyFilesRecursivlyFrom(folder + '/' + file.name);
        });
      } else {
        fs.copyFile((folder + '/' + file.name), (folderRoot + '/project-dis' + '/assets' + folder.split('assets')[1] + '/' + file.name), (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
fs.rm(folderRoot + '/project-dis' + '/assets', { recursive: true }, () => {
  fs.mkdir(folderRoot + '/project-dis' + '/assets', { recursive: true }, () => {
    copyFilesRecursivlyFrom(folderAssets);
  });
});

// 1. Импорт всех требуемых модулей
// 2. Прочтение и сохранение в переменной файла-шаблона
// 3. Нахождение всех имён тегов в файле шаблона
// 4. Замена шаблонных тегов содержимым файлов-компонентов
// 5. Запись изменённого шаблона в файл **index.html** в папке **project-dist**
// 6. Использовать скрипт написанный в задании **05-merge-styles** для создания файла **style.css**
// 7. Использовать скрипт из задания **04-copy-directory** для переноса папки **assets** в папку project-dist 