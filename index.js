var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var userMap =  {};
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    socket.on('send_message', (msg) => {
        io.emit('chat_message', msg);
    });
    socket.on('user_joined', (username) => {
        userMap[socket.id] = username;
        io.emit('No_of_people_online_status', userMap );
        io.emit('join_message', username);
    });
    socket.on('user_left', (username) => {
        io.emit('left_message', username);
    });
    socket.on('user_typing', (username) => {
        io.emit('typing_start_message', username);
    });
    socket.on('user_not_typing', (username) => {
        io.emit('typing_stop_message', username);
    });
    socket.on('online_status', (status) => {
        io.emit('online_status', status);
    });
    socket.on('disconnect', (data) => {
        delete userMap[socket.id];
        io.emit('online_status', {
            online:false,
            id: socket.id
        });
        io.emit('No_of_people_online_status', userMap);
    });
    io.emit('online_status', {
        online:true,
        id: socket.id
    });

});

http.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});
app.set('port', (process.env.PORT || 5000));