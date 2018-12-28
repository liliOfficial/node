const path = require('path');
const http = require('http');
const os = require('os');
const user = os.userInfo();
const express = require('express');
const socketIO = require('socket.io');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
const yargs = require('yargs');

// const encodedAddress = encodeURIComponent('1301 chatswood nsw');
// const decodedAddress = decodeURIComponent('1301%20lombord%20street%20philadelphia');

// const res = note.addNote(user.username);
// console.log(res);
// console.log(process.argv);
// console.log(yargs.argv);

const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

require('./init/routes')(app);
require('./init/db')();
require('./init/config')();

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('createEmail', email => {
    console.log(email);
    io.emit('newEmail', email);
    // socket.broadcast.emit('newEmail', email);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
