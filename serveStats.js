const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const pug = require('pug');
const cpu = require('./cpu.js')
const mem = require('./mem.js')
const os = require('os');
const { get } = require('http');

app.set('views', __dirname + '/');
app.set('view engine', 'pug');
app.get('/', function(req, res) {
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
    console.log('client connected');       
    sockets.on('disconnect', function() {
        console.log('client disconnected');
    });  
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});