var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('send_message', (msg) => {
        console.log('chat message: '+msg);
        io.emit('chat_message', msg);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});