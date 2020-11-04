// create your own server
const http = require('http');
const routes = require('./routes');

// anonymous function
// http.createServer(function (req, res) {
// });

// anonymous arrow function (event loop in node JS never stop)
// make new module routes and import here
// khi export 2 truong tu routes thi khi using co 2 truong do
const server = http.createServer(routes.handler);
console.log(routes.someText);
console.log('yes or not');

// keep server listen request from user.
server.listen(3001);

