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

  const debugGetAllClients = (cb) => {
    client.emit(`debug:getAllClients`, cb);
  }

  const debugGetRegisteredClients = (cb) => {
    client.emit(`debug:getRegisteredClients`, cb);
  }

  const debugOnUpdate = (cb) => {
    client.on(`debug:update`, cb);
  }

  return {
    client,
    registerName,
    createMessageHandler,
    onMessageReceived,
    debugGetAllClients,
    debugGetRegisteredClients,
    debugOnUpdate
  }
}

export default initSocketCli;
