const socketClient = require('socket.io-client');

const initSocketCli = () => {
  const client = socketClient();

  const registerName = (name, roomName, cb) => {
    client.emit(`register`, name, roomName, cb);
  }

  const postMessage = (roomName, text) => {
    client.emit(`message:post`, roomName, text);
  }

  const invite = (invited, roomName) => {
    client.emit(`invite:emit`, invited, roomName);
  }

  const acceptInvite = (host, guest, cb) => {
    client.emit(`invite:accept`, host, guest, cb);
  }

  const leaveRoom = (roomName) => {
    client.emit(`room:leave`, roomName);
  }

  const onUpdateGlobalUsersList = (cb) => {
    client.on(`global:update-users`, cb);
  }

  const onUpdateMembersList = (cb) => {
    client.on(`room:update-members`, cb);
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

  const onInvitation = (cb) => {
    client.on(`invite:query`, (message) => {
      cb(null, message);
    });
  }

  return {
    client,
    invite,
    registerName,
    postMessage,
    onGetMessage,
    onUpdateGlobalUsersList,
    onUpdateMembersList,
    onNewUser,
    acceptInvite,
    onInvitation,
    leaveRoom
  }
}

export default initSocketCli;
