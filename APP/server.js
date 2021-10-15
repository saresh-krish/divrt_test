const express = require('express');
const http = require("http"); 
require('dotenv').config();
const bodyParser = require('body-parser');
const router = require('./server/routes/routes');

const server = express();
const port = process.env.API_PORT;


server.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type'); 
    next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(router);

http.createServer(server).listen(port, () => {
    console.log(`Application API running on port ${port}`)
});

