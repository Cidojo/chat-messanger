const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const webpack = require('webpack');
const config = require('./../webpack.config.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const createMessage = require('./utils/create-message');
const ClientManager = require('./client-manager');

const app = express();
const server = http.createServer(app);
const publicPath = path.join(__dirname, `./../public`);
const io = socketIO(server);
const clientManager = new ClientManager();

const port = process.env.PORT || 3000;


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
app.use(express.static(publicPath));

app.get(`*`, (req, res) => {
  res.sendFile(path.join(publicPath, `index.html`));
});


io.on(`connection`, (socket) => {
  console.log(`user connected`, socket.id); // eslint-disable-line

  clientManager.register(socket);

  socket.on(`registerName`, (name) => {
    clientManager.registerName(socket.id, name);
    socket.emit(`onSuccessNameRegister`, name);
  });

  // socket.on(`joinMeToRoom`, (room) => {
  //   socket.join(room);
  // });

  socket.on(`createMessage`, (from, text) => {
    socket.emit(`newMessage`, createMessage(from, text));
  });

  socket.on(`disconnect`, () => {
    clientManager.removeClient(socket);
    console.log(`server: user has disconnected...`, `User_ID: ${socket.id}`); // eslint-disable-line
  });
});
