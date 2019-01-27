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

  return {
    client,
    registerNameHandler,
    joinHandler
  }
}

export default initSocketCli;
