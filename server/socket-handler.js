const makeHandlers = require('./handlers'),
      ClientManager = require('./client-manager'),
      RoomManager = require('./room-manager');

const clientManager = new ClientManager,
      roomManager = new RoomManager;

const socketHandler = (io) => {
  io.on(`connection`, (client) => {
    const {
      handleRegister,
      handleGetMembers,
      handleGetUsers,
      handleInvite,
      handlePostMessage,
      handleDisconnect
    } = makeHandlers(client, clientManager, roomManager);

    console.log(`${client.id} connected...`); // eslint-disable-line

    clientManager.add(client);

    client.on(`register`, handleRegister);

    client.on(`members:get`, handleGetMembers);

    client.on(`users:get`, handleGetUsers);

    client.on(`invite`, handleInvite);

    client.on(`message:post`, handlePostMessage);

    client.on(`disconnect`, handleDisconnect);

    client.on('error', function (err) {
      console.log('received error from client:', client.id); // eslint-disable-line
      console.log(err); // eslint-disable-line
    })
  });
}

module.exports = socketHandler;
