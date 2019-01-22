const express = require('express');
const http = require('http');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const app = express();
const config = require('./../webpack.config.js');
const compiler = webpack(config);
const server = http.Server(app);
const io = require('socket.io');

const socketIo = io(server);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.get(`/`, (req, res) => {
  res.sendFile(path.resolve(`public/index.html`));
});

server.listen(3000, (err) => {
  if (err) {
    throw err;
  }

  console.log(`listening on port 3000`);
});

io.on('connection', function (client) {
  client.on('register', handleRegister)

  client.on('join', handleJoin)

  client.on('leave', handleLeave)

  client.on('message', handleMessage)

  client.on('chatrooms', handleGetChatrooms)

  client.on('availableUsers', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

socketIo.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  console.log(`${username} connected`);

  socket.on('client:message', (data) => {
    console.log(`${data.username}: ${data.message}`);

    // message received from client, now broadcast it to everyone else
    socket.broadcast.emit('server:message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
  });
});
