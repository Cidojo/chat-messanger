const socketCli = require('socket.io-client');

const initSocketCli = () => {
  const client = socketCli();

  client.on(`connect`, () => {
    console.log(`client: connected to server...`);
    client.emit(`submit`, {
      from: `client`,
      to: `server`,
      body: `Hey Hey Server`,
      createdAt: new Date().toLocaleTimeString()
    });
  });

  client.on(`message`, (message) => {
    console.log(`client: new message received:`, message);
  });

  client.on(`disconnect`, () => {
    console.log(`client: disconnected...`);
  });


  return client;
}

export default initSocketCli;
