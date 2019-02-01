const socketClient = require('socket.io-client');

const initSocketCli = (nsp) => {
  const client = socketClient(nsp);

  const registerName = (name, cb) => {
    client.emit(`register`, name, cb);
  }

  const createMessageHandler = (roomName, text) => {
    client.emit(`message:post`, roomName, text);
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

  return {
    client,
    getGlobalUsersList,
    getRoomMembersList,
    inviteHandler,
    registerName,
    createMessageHandler,
    onMessageReceived
  }
}

export default initSocketCli;
