const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const webpack = require('webpack');
const config = require('./../webpack.config.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');


const app = express();
const server = http.createServer(app);
const publicPath = path.join(__dirname, `./../public`);
const io = socketIO(server);

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

io.on(`connection`, (socket) => {
  console.log(`server: user connected...`, `User_ID: ${socket.id}`);

  socket.emit(`message`, {
    from: `Server`,
    to: `Client`,
    body: `Hello from server`,
    createdAt: new Date().toLocaleTimeString()
  });

  socket.on(`submitMessage`, (message) => {
    io.emit(`message`, message);
  });

  socket.on(`disconnect`, () => {
    console.log(`server: user has disconnected...`, `User_ID: ${socket.id}`);
  });
});
