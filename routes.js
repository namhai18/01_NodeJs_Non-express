const fs = require('fs');
const { Module } = require('module');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    // listen request url /
    if (url === '/') {
        res.write('<html>');
        res.write('<head>hello main form</head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="koala"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // ket thuc response
        return res.end();
    }
    // chuyen url sang /message sau khi nhan Send button
    if ((url === '/message') && (method === 'POST')) {
        const body = [];
        console.log('req.on:');
        console.log(req.on);
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            // cut phan tu thu 1 cua chuoi parseBody
            const message = parseBody.split('=')[1];
            console.log(object);
            // ghi file xong thi moi xuat status with writeFileSync
            // fs.writeFileSync('message.txt', message);
            // Another way using callback to set status Code after write file finish
            // the same way like writeFileSync
            // this is non-blocking event because it only push system to do next util receive callback function.
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                // res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
    // console.log(req.url, req.method, req.headers);
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head>log in successes</head>');
    res.write('</html>');
    // ket thuc response
    res.end();
};

// multi exports
module.exports = {
    handler: requestHandler,
    someText: 'some text here'
};
