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

  const joinRoom = (roomName, username, cb) => {
    client.emit(`room:join`, roomName, username, cb);
  }

  const fetchRoom = (roomName, cb) => {
    client.emit(`room:fetch`, roomName, cb);
  }

  const leaveRoom = (roomName) => {
    client.emit(`room:leave`, roomName);
  }

  const onChangeGlobalUsersList = (cb) => {
    client.on(`global:update-users`, cb);
  }

  const onChangeMembersList = (listHandler, messageHandler) => {
    client.on(`room:update-members`, (list, message) => {
      listHandler(list);
      messageHandler(null, message);
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
    onChangeGlobalUsersList,
    onChangeMembersList,
    joinRoom,
    onInvitation,
    leaveRoom,
    fetchRoom
  }
}

export default initSocketCli;
