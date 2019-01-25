const path = require('path');
const express = require('express');
const http = require('http');
const io = require('socket.io');
const webpack = require('webpack');
const config = require('./../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const ClientManager = require('./client-manager');

const app = express();
const compiler = webpack(config);
const server = http.Server(app);
const socketServer = io(server);
var port = process.env.PORT || 3000;


server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port %d`, port); // eslint-disable-line no-console
});


// tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


// routing
app.use(express.static(path.join(__dirname, `./../public`)));


// create preset object which manages clients actions
const clientManager = new ClientManager();


// add listeners to clients, wich has connected to the server through the socket
socketServer.on(`connection`, (client) => {

// add new client to storage - clients list
  console.log(`client connected...`, client.id); // eslint-disable-line no-console
  clientManager.addClient(client);


// on client nickname input register name - associate clinet's name with client.id
  client.on(`registerQuery`, (name) => {
    const registerState = clientManager.registerClient(client, name);

    if (registerState) {
      const room = `/${name}`;
      socketServer.of(room).on(`connection`, (thinClient) => {
        thinClient.on(`join`, (name) => {
          console.log(`joining to name`, thinClient.room);
          thinClient.join(name);
        });
        thinClient.on(`message`, (message) => {
          client.broadcast.emit(``, message);
        });

        thinClient.on(``, () => {

        });
      });
    }

    client.emit(`registered`, registerState);
  });


// remove client from the list when disconnected
  client.on(`disconnect`, function () {
      clientManager.removeClient(client);
      console.log(`client disconnect...`, client.id); // eslint-disable-line no-console
  });


// handle connection error
  client.on(`error`, function (err) {
    console.log(`received error from client:`, client.id); // eslint-disable-line no-console
    console.log(err); // eslint-disable-line no-console
  })
});
