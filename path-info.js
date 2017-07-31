const fs = require('fs');

/*module.exports = function (path, callback(err,info)){


    const type = getType(path,callback(err,type))

    info = {path:path,
        type:getType(path),
        content:getContent(path),
        childs:childs}
    callback(err,info)
}*/
const info = {path:undefined,
    type:undefined,
    content:undefined,
    childs:undefined}


module.exports = function(path,callback(err, info)=>{
    fs.stat(path, (err, stats) => {
        if(err) return console.error(err);
    if (stats.isFile()) {
        info.type = 'file'

        fs.readFile(path, {encoding: 'utf-8'}, (err, content) => {
            if(err) throw err;
    else
        info.content = content;
    })
        ;
    }
    ;
    if (stats.isDirectory()) {
        info.type = 'directory'
        fs.readdir(path, (err, files) => {
            if(err) throw err;
    else

        info.childs = files;
    })
        info.path = path;
        return info
    }
}
)
}) {callback(err,info)}