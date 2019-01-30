const socketClient = require('socket.io-client');

const initSocketCli = () => {
  const client = socketClient();

  const registerName = (name, cb) => {
    client.emit(`register`, name, cb);
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
    registerName,
    debugGetAllClients,
    debugGetRegisteredClients,
    debugOnUpdate
  }
}

export default initSocketCli;
