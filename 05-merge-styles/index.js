const fs = require('fs');
const path = require('path');
const folderStyles = path.join(__dirname, 'styles');
const folderProject = path.join(__dirname, 'project-dist');
let str = '';

fs.readdir(folderStyles, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        const filePath = folderStyles + '/' + file.name;
        fs.stat(filePath, (err, stats) => {
            if(file.isFile() && path.extname(filePath) === '.css') {
                fs.readFile(filePath, "utf8", function(error, data){
                    if(error) throw error; 
                    str += data;
                    fs.writeFile((folderProject + '/bundle.css'), str, 'utf-8',
                    (err) => {
                        if (err) throw err;
                    });
                });
            }
        })
    });
});


// 1. Импорт всех требуемых модулей
// 3. Чтение содержимого папки **styles**
// 4. Проверка является ли объект файлом и имеет ли файл нужное расширение
// 4. Чтение файла стилей
// 5. Запись прочитанных данных в массив
// 6. Запись массива стилей в файл **bundle.css**
