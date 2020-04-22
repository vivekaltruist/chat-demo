var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('send_message', (msg) => {
        io.emit('chat_message', msg);
    });
    socket.on('user_joined', (username) => {
        io.emit('join_message', username);
    });
});

http.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});
app.set('port', (process.env.PORT || 5000));