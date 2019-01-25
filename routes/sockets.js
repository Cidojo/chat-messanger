var io = require('socket.io');

exports.initialize = (server) => {
  io = io.listen(server);

  io.sockets.on(`connection`, (socket) => {
    socket.emit(JSON.stringify({
        type:`serverMessage`,
        message: `Welcome to Cidojo's chat room!`
      }));

    socket.on(`message`, (message) => {
        message = JSON.parse(message);
        if (message.type === `user's`) {
          socket.broadcast.emit(JSON.stringify(message));
          message.type = `mine`;
          socket.emit(JSON.stringify(message));
        }
      });
    });
};
