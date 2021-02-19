const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const pug = require('pug');
const cpu = require('./cpu.js')
const mem = require('./mem.js')
const os = require('os');
const { get } = require('http');
const PORT = 3000
let ip = ""
app.set('views', __dirname + '/');
app.set('view engine', 'pug');
app.get('/', function(req, res) {
    ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('index.pug');
});
let data = {}

setInterval(() => {
    cpu.getCPULoadAVG(1000, 100).then((load) => {
        data.cpuInfo = Math.round(load)
        data.memInfo = mem.getMemInfo()
        io.sockets.emit('data', data);
        });
}, 3000);

io.sockets.on('connection', function (sockets) {
    console.log('client connected', ip);       
    sockets.on('disconnect', function() {
        console.log('client disconnected', ip);
    });  
});

http.listen(PORT, function(){
  console.log('listening on', PORT);
});