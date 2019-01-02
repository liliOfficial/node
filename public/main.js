var socket = io();
var query = jQuery.deparam(window.location.search);
var roomName = query['room-name'].trim();
if (!roomName) {
  window.location.href = '/';
} else {
  $('#room').text(roomName);
}

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
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
  var name = $('#name').val();
  var message = $('#message').val();

  if (!name) {
    $('#namevali').text('Please enter your name');
  } else {
    $('#namevali').text('');
  }
  if (!message) {
    $('#messagevali').text('Please enter the message');
  } else {
    $('#messagevali').text('');
  }
  if (name && message) {
    socket.emit(
      'createMessage',
      {
        from: name,
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
