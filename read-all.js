const fs = require('fs');

// возвращает промис, который разрешается массивом файлов
function readData(path) {
    return new Promise(function (resolve, reject) {
        try {
            fs.readdir(path, (err, files) => {
                if(err) reject(err);
        else
            resolve(files);
        })
            ;
        } catch (err) {
            reject(err);
        }
    });
};

// возвращает промис, который разрешается текстом для файла
function getText(path, fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(path + '\\' + fileName, {encoding: 'utf-8'}, function (err, data) {
        if (err) reject(err); else resolve(data);
    });
})
}


function readAll(path) {
    return readData(path)
        .then(files => Promise.all(
        files.map(
            fileName => {
            return getText(path, fileName)
                .then(content => {
                return {content, fileName}
            })
}
)
))
.
    then(files => {
        return files.map(item => {
            return {name: item.fileName, content: item.content}
        }
)
})
.
    catch(err => console.error(err)
)
}

module.exports = function (path) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(readAll(path));
        } catch (err) {
            reject(err);
        }
    })
}
