const makeHandlers = require('./handlers'),
      ClientManager = require('./client-manager'),
      RoomManager = require('./room-manager');

const clientManager = new ClientManager,
      roomManager = new RoomManager;

const socketHandler = (io) => {
  io.on(`connection`, (client) => {
    const {
      handleRegister,
      handleInviteEmit,
      handlePostMessage,
      handleDisconnect,
      handleJoinRoom,
      handleLeaveRoom,
      handleFetchRoom
    } = makeHandlers(io, client, clientManager, roomManager);

    console.log(`${client.id} connected...`); // eslint-disable-line

    clientManager.addClient(client);

    client.on(`register`, handleRegister);

    client.on(`invite:emit`, handleInviteEmit);

    client.on(`room:join`, handleJoinRoom);

    client.on(`message:post`, handlePostMessage);

    client.on(`room:leave`, handleLeaveRoom);

    client.on(`room:fetch`, handleFetchRoom);

    client.on(`disconnect`, handleDisconnect);

    client.on('error', function (err) {
      console.log('received error from client:', client.id); // eslint-disable-line
      console.log(err); // eslint-disable-line
    })
  });
}

module.exports = socketHandler;
