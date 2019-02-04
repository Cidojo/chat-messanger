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

  const handlePostMessage = (roomName, text) => {
    client.emit(`message:post`, roomName, text);
  }

  const onNewUser = (cb) => {
    client.on(`message:new-user`, (message) => {
      cb(message);
    });
  }

  const onGetMessage = (cb) => {
    client.on(`message:get`, (message) => {
      cb(message);
    });
  }

  const getGlobalUserList = (cb) => {
    client.emit(`users:get`, cb);
  }

  const handleInvite = (to, room) => {
    client.emit(`invite:emit`, to, room);
  }

  const onInvitation = (cb) => {
    client.on(`invite:query`, (message) => {
      cb(message);
    });
  }

  const enterRoomHandler = (cb) => {
    client.on(`enterRoom`, cb);
  }

  return {
    client,
    getGlobalUserList,
    handleInvite,
    registerName,
    handlePostMessage,
    onGetMessage,
    refreshGlobal,
    refreshRoom,
    enterRoomHandler,
    onNewUser,
    onInvitation
  }
}

export default initSocketCli;
