const fs = require('fs');

const read = function(filename) {
    return new Promise(function (resolve, reject) {
        try {
            fs.readFile(filename,{encoding: 'utf-8'}, function(err, data){
                if (err) reject(err); else resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    });
};


const write = function(filename, data) {
    return new Promise(function (resolve, reject) {
        try {
            fs.writeFile(filename, data, {encoding: 'utf-8'}, err =>{
                if (err) reject(err); else resolve(filename);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    read,
    write
};