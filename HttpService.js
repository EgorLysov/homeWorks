const http = require('http');
const PORT = process.env.PORT || 3000;
const https = require('https');
const url = 'netology.tomilomark.ru';
function handler(req, res) {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
        data = JSON.parse(data);
        //console.log(data);
        getHash(data)
        .then(outData =>{
            res.writeHead(200,'OK', {'Content-Type': 'application/json'});
            res.write(JSON.stringify(outData));
            res.end();
        })
    });
}

// возвращает промис, который разрешается Json c секретным ключом
function getHash(data) {
    return new Promise((resolve, reject) => {
        let param = JSON.stringify({lastName: data.lastName});
        let options = {
            hostname: url,
            //port: 80,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                path: '/api/v1/hash',
                'Content-Length': Buffer.byteLength(param),
                'firstName': data.firstName
            }
        };

        const request = https.request(options);
        //request.write(param);
        //request.end();
        request.on('error',err => console.error(err));

        request.on('response', ()=>{
            let hashData = '';
            console.log("nflfv")
            response.on('data', function (chunk) {hashData += chunk});
            response.on('end', ()=>{
                data.hash = JSON.parse(hashData).hash;
                resolve(data);
            });
        });
        request.write(param);
        request.end();
    })
}


const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
    console.log('Start HTTP on port %d', PORT);
});
server.listen(PORT);







