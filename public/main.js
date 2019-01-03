var socket = io();
var query = jQuery.deparam(window.location.search);
var userName = query['user-name'];
var roomName = query['room-name'];

if (!roomName.trim() || !userName.trim()) {
  window.location.href = '/';
} else {
  $('#room').text(roomName);
}

socket.on('connect', function() {
  socket.emit('roomEnter', {
    userName: userName,
    roomName: roomName
  });
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  $('#users').text('');
  users.forEach(user => {
    var li = $('<li>' + user + '</li>');
    $('#users').append(li);
  });
});

socket.on('newEnter', function(params) {
  var message = params.userName + ' enter ' + roomName;
  systemMessage(message);
});
socket.on('newLeave', function(user) {
  console.log(user);
  var message = user + ' leave ' + roomName;
  LeaveMessage(message);
});

socket.on('newMessage', function(content) {
  var user = $('<b>' + content.from + '</b>');
  var time = $('<small class=" ml-2 text-muted">' + content.time + '</small>');
  var message = $('<div class="mb-3">' + content.message + '</div>');

  $('#output').append(user, time, message);
  scrollToBottom();
});
socket.on('newLocation', function(content) {
  console.log('New Location:', content);
  var a = $('<a target="_blank">User current location</a><br/>');
  a.attr('href', content.url);
  $('#output').append(a);
  $('#output').scrollTop($('#output')[0].scrollHeight);
});

$('#submit-btn').click(function(e) {
  e.preventDefault();
  var message = $('#message').val();
  if (!message) {
    $('#messagevali').text('Please enter the message');
  } else {
    $('#messagevali').text('');
  }
  if (userName && message) {
    socket.emit(
      'createMessage',
      {
        message: message,
        time: new Date()
      },
      function(data) {
        console.log(data);
      }
    );
  }
});

$('#location').click(function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }),
    function() {
      alert('unabe to fetch location.');
    };
});

function scrollToBottom() {
  $('#output').scrollTop($('#output')[0].scrollHeight);
}

function systemMessage(message) {
  var badage = $(
    '<div class="badge badge-pill badge-success my-1">' +
      message +
      '</div><br/>'
  );
  $('#output').append(badage);
  scrollToBottom();
}

function LeaveMessage(message) {
  var badage = $(
    '<div class="badge badge-pill badge-danger my-1">' + message + '</div><br/>'
  );
  $('#output').append(badage);
  scrollToBottom();
}
