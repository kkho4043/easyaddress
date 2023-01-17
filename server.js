const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');


const app = express();
const path = require('path');
app.use('/JS', express.static(path.join(__dirname, '/JS')));
app.use('/CSS', express.static(path.join(__dirname, '/CSS')));
app.use('/img', express.static(path.join(__dirname, '/img')));

app.use('/html', express.static(path.join(__dirname, '/html')));
const HTTPS_PORT = 8788;
//post요청을 받기 위한
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var server = http.createServer(app);

server.listen(HTTPS_PORT, function () {
    console.log("server listen " + HTTPS_PORT);
});

const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 3600000 },
    resave: false,
    secure: true,
    saveUninitialized: true
}))

// -------------------------------------------------
app.get('/test', function (req, res) {
    fs.readFile(__dirname + '/page/test.html', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

app.get('/home', function (req, res) {
    fs.readFile(__dirname + '/page/home.html', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});


