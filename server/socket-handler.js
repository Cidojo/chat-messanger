const makeHandlers = require('./handlers'),
      ClientManager = require('./client-manager'),
      RoomManager = require('./room-manager');

const clientManager = new ClientManager,
      roomManager = new RoomManager;

const socketHandler = (io) => {
  io.on(`connection`, (client) => {
    const {
      handleRegister,
      handleGetUsers,
      handleInviteEmit,
      handlePostMessage,
      handleDisconnect,
      handleInvitationAccept,
      handleFetchRoom,
      handleLeaveRoom
    } = makeHandlers(io, client, clientManager, roomManager);

    console.log(`${client.id} connected...`); // eslint-disable-line

    clientManager.addClient(client);

    client.on(`register`, handleRegister);

    client.on(`users:get`, handleGetUsers);

    client.on(`fetch:room`, handleFetchRoom);

    client.on(`invite:emit`, handleInviteEmit);

    client.on(`invite:accept`, handleInvitationAccept);

    client.on(`message:post`, handlePostMessage);

    client.on(`room:leave`, handleLeaveRoom);

    client.on(`disconnect`, handleDisconnect);

    client.on('error', function (err) {
      console.log('received error from client:', client.id); // eslint-disable-line
      console.log(err); // eslint-disable-line
    })
  });
}

module.exports = socketHandler;
