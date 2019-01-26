const socketCli = require('socket.io-client');

const initSocketCli = () => {
  const client = socketCli();

  client.on(`connect`, () => {
    console.log(`client: connected to server...`);
  });

  client.on(`disconnect`, () => {
    console.log(`client: disconnected...`);
  });


  return client;
}

export default initSocketCli;
