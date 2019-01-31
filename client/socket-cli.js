const socketClient = require('socket.io-client');

const initSocketCli = (nsp) => {
  const client = socketClient(nsp || null);

  const registerName = (name, cb) => {
    client.emit(`register`, name, cb);
  }

  const createMessageHandler = () => {
    console.log(`createMessageHandler`);
  }

  const onMessageReceived = () => {
    console.log(`onMessageReceived`);
  }

  const debugGetAllUsers = (cb) => {
    client.emit(`debug:getAllUsers`, cb);
  }

  const debugGetRegisteredUsers = (cb) => {
    client.emit(`debug:getRegisteredUsers`, cb);
  }

  const getRoomMembersList = (room, cb) => {
    client.emit(`getRoomMembersList`, room, cb);
  }

  const getGlobalUsersList = (cb) => {
    client.emit(`getGlobalUsersList`, cb);
  }

  const newMessageHandler = (message) => {
    client.broadcast.emit(`newMessage`, message);
  }

  const inviteHandler = (to, room) => {
    client.emit(`invite`, to, room);
  }

  const debugOnUpdate = (cb) => {
    client.on(`debug:update`, cb);
  }

  return {
    client,
    getGlobalUsersList,
    getRoomMembersList,
    newMessageHandler,
    inviteHandler,
    registerName,
    createMessageHandler,
    onMessageReceived,
    debugGetAllUsers,
    debugGetRegisteredUsers,
    debugOnUpdate
  }
}

export default initSocketCli;
