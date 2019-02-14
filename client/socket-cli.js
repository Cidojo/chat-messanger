const socketClient = require('socket.io-client');

const initSocketCli = () => {
  const client = socketClient();

  const registerName = (name, roomName, cb) => {
    client.emit(`register`, name, roomName, cb);
  }

  const postMessage = (roomName, text) => {
    client.emit(`message:post`, roomName, text);
  }

  const onUpdateGlobalUsersList = (cb) => {
    client.on(`refresh:global`, cb);
  }

  const onUpdateMembersList = (cb) => {
    client.on(`refresh:room`, cb);
  }

  const onNewUser = (cb) => {
    client.on(`message:userlist-change`, (message) => {
      cb(null, message);
    });
  }

  const onGetMessage = (cb) => {
    client.on(`message:get`, (roomName, message) => {
      cb(roomName, message);
    });
  }

  const getGlobalUsersList = (cb) => {
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

  const leaveRoom = (roomName) => {
    client.emit(`room:leave`, roomName);
  }

  const onInvite = (cb) => {
    client.on(`invite:query`, (message) => {
      cb(null, message);
    });
  }

  return {
    client,
    getGlobalUsersList,
    invite,
    registerName,
    postMessage,
    onGetMessage,
    onUpdateGlobalUsersList,
    onUpdateMembersList,
    onNewUser,
    onInvitationAccept,
    onInvite,
    fetchRoom,
    leaveRoom
  }
}

export default initSocketCli;
