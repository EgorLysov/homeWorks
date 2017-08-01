const fs = require('fs');

module.exports = function(path, callback){

    fs.stat(path, (err, stats) => {
        if(err) throw err;
        const info = {};
        if (stats.isFile()) info.type = 'file';
        if (stats.isDirectory()) info.type = 'directory';
        if (info.type === 'file') {
            fs.readFile(path, {encoding: 'utf-8'}, (err, content) => {
                if(err) throw err;
                else
                info.content = content;
                info.path = path;
                callback(null,info);
            });
        } else {
            fs.readdir(path, (err, files) => {
                if(err) throw err;
                info.childs = files;
                info.path = path;
                callback(null,info);
            });
        }
    });
}



