const socketIO = require('socket.io');
const moment = require('moment');
const { Users } = require('../models/room');

module.exports = function(server) {
  const io = socketIO(server);
  const users = new Users();
  io.on('connection', socket => {
    console.log('New user connected');
    socket.on('roomEnter', params => {
      if (params.userName && params.roomName) {
        socket.join(params.roomName);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.userName, params.roomName);

        io.to(params.roomName).emit(
          'updateUserList',
          users.getUserList(params.roomName)
        );
        socket.broadcast.to(params.roomName).emit('newEnter', params);
      }
    });

    socket.on('createMessage', (message, callback) => {
      const user = users.getUser(socket.id);
      if (user) {
        message.from = user.name;
        const formatTime = moment().format('DD/MM/YYYY, h:mm:ss a');
        message.time = formatTime;
        io.to(user.room).emit('newMessage', message);
        return;
      }

      callback('Welcome to the server');
    });

    socket.on('createLocationMessage', coords => {
      io.emit('newLocation', {
        url: `https://www.google.com.au/maps?q=${coords.latitude},${
          coords.longitude
        }`
      });
    });

    socket.on('disconnect', () => {
      const user = users.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newLeave', user.name);
      }
    });
  });
};
