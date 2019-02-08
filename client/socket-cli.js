const socketClient = require('socket.io-client');

const initSocketCli = () => {
  const client = socketClient();

  const registerName = (name, cb) => {
    client.emit(`register`, name, cb);
  }

  const postMessage = (roomName, text) => {
    client.emit(`message:post`, roomName, text);
  }

  const refreshGlobal = (cb) => {
    client.on(`refresh:global`, cb);
  }

  const refreshRoom = (cb) => {
    client.on(`refresh:room`, cb);
  }

  const onNewUser = (cb) => {
    client.on(`message:new-user`, (message) => {
      cb(null, message);
    });
  }

  const onGetMessage = (cb) => {
    client.on(`message:get`, (roomName, message) => {
      cb(roomName, message);
    });
  }

  const getGlobalUserList = (cb) => {
    client.emit(`users:get`, cb);
  }

  const fetchRoom = (roomName, cb) => {
    client.emit(`fetch:room`, roomName, cb);
  }

  const invite = (invited, roomName) => {
    client.emit(`invite:emit`, invited, roomName);
  }

  const onInvitationAccept = (host, guest, cb) => {
    client.emit(`invite:accept`, host, guest, cb);
  }

  const onInvite = (cb) => {
    client.on(`invite:query`, (message) => {
      cb(null, message);
    });
  }

  const enterRoom = (cb) => {
    client.on(`enterRoom`, cb);
  }

  const onServerData = (cb) => {
    client.on(`server-data:fetch`, cb);
  }

  return {
    client,
    getGlobalUserList,
    invite,
    registerName,
    postMessage,
    onGetMessage,
    refreshGlobal,
    refreshRoom,
    enterRoom,
    onNewUser,
    onInvitationAccept,
    onInvite,
    fetchRoom,
    onServerData
  }
}

export default initSocketCli;
