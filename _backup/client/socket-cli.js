const socketCli = require('socket.io-client');

const initSocketCli = () => {
  const client = socketCli();

  client.on(`onSuccessNameRegister`, (name) => {
    console.log(name);
  });

  const registerNameHandler = (name) => {
    client.emit(`registerName`, name);
  }

  const joinHandler = (room) => {
    client.emit(`joinMeToRoom`, room);
  }

  const createMessageHandler = (from, text) => {
    client.emit(`createMessage`, from, text);
  };

  const onMessageReceived = (cb) => {
    client.on(`newMessage`, cb);
  }

  return {
    client,
    registerNameHandler,
    joinHandler,
    createMessageHandler,
    onMessageReceived
  }
}

export default initSocketCli;
