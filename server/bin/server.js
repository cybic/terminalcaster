var net = require('net');

var audiencePort = 2300,
    lecturerPort = 2000;
 
var listeners = [];
var ready = false;

var audience = net.createServer(function (socket) {
 
  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 
 
  // Put this new client in the list
  listeners.push(socket);
 
  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    console.log(socket.name + "> " + data);
  });
 
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log(socket.name + " disconnected.\n");
  });
  
  // Send a message to all clients
  this.broadcast = function(data) {
    listeners.forEach(function (listener) {
      listener.write(data);
    });
  }
  ready = true;
 
});

// Lecturer
var lecturer = net.createServer( function( socket ) {
    socket.on( 'data', function( data ) {
        audience.broadcast( data );
    });
});

audience.listen( audiencePort );
console.log( "Audience listening" );
//while( !ready );
console.log( "Ready!");
lecturer.listen( lecturerPort );

console.log( "Running..." ); 
