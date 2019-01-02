
const socketIO = require('socket.io');
const moment = require('moment');

module.exports = function(server) {
  var io = socketIO(server);
  io.on('connection', socket => {
    console.log('New user connected');

    socket.on('createMessage', (message, callback) => {
      var formatTime = moment().format('DD/MM/YYYY, h:mm:ss a');
      message.time = formatTime;
      io.emit('newMessage', message);
      // socket.broadcast.emit('newMessage', email);
      callback('Welcome for the server');
    });

    socket.on('createLocationMessage', coords => {
      io.emit('newLocation', {
          url:`https://www.google.com.au/maps?q=${coords.latitude},${coords.longitude}`
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  });
};
