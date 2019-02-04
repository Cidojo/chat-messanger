const socketClient = require('socket.io-client');

const initSocketCli = (nsp) => {
  const client = socketClient(nsp);

  const registerName = (name, cb) => {
    client.emit(`register`, name, cb);
  }

  const refreshGlobal = (cb) => {
    client.on(`refresh:global`, cb);
  }

  const refreshRoom = (cb) => {
    client.on(`refresh:room`, cb);
  }

  const createMessageHandler = (roomName, text) => {
    client.emit(`message:post`, roomName, text);
  }

  const onNewUser = (cb) => {
    client.on(`message:new-user`, (message) => {
      cb(message);
    });
  }

  const onMessageReceived = (cb) => {
    client.on(`message:get`, (message) => {
      cb(message);
    });
  }

  const getRoomMembersList = (room, cb) => {
    client.emit(`members:get`, room, cb);
  }

  const getGlobalUsersList = (cb) => {
    client.emit(`users:get`, cb);
  }

  const inviteHandler = (to, room) => {
    client.emit(`invite`, to, room);
  }

  const enterRoomHandler = (cb) => {
    client.on(`enterRoom`, cb);
  }

  return {
    client,
    getGlobalUsersList,
    getRoomMembersList,
    inviteHandler,
    registerName,
    createMessageHandler,
    onMessageReceived,
    refreshGlobal,
    refreshRoom,
    enterRoomHandler,
    onNewUser
  }
}

export default initSocketCli;
