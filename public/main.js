var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'li.li@gmail.com',
    text: 'Hello, this is Li Li.',
    time: new Date().getTime()
  });
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
socket.on('newEmail', function(content) {
  console.log('New email:', content);
});
