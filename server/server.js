const express = require('express');
const http = require('http');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const config = require('./../webpack.config.js');
const ClientManager = require('./client-manager');
const io = require('socket.io');
const ChatRoom = require('./chat-room');

const app = express();
const compiler = webpack(config);
const server = http.Server(app);
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

  // eslint-disable-next-line
  console.log(`listening on port 3000`);
});


const session = new ClientManager.default();
const chatRooms = new Set(new ChatRoom(`Global`));

socketIo.on('connection', (client) => {
  session.addClient(client);

  client.on('register', (userName) => session.registerClient(client, userName));


  client.on('getChatHistory', (name) => // should return array from chatRooms)


  client.on('client:message', (data) => {
    // eslint-disable-next-line
    console.log(`${data.username}: ${data.message}`);

    // message received from client, now broadcast it to everyone else
    client.broadcast.emit('server:message', data);
  });

  client.on('disconnect', function () {
      session.removeClient(client);
      // eslint-disable-next-line
      console.log('client disconnect...', client.id);
      // handleDisconnect();
  });

  client.on('error', function (err) {
    // eslint-disable-next-line
    console.log('received error from client:', client.id);
    // eslint-disable-next-line
    console.log(err);
  })
});


// io.on('connection', function (client) {
//   client.on('register', handleRegister)
//
//   client.on('join', handleJoin)
//
//   client.on('leave', handleLeave)
//
//   client.on('message', handleMessage)
//
//   client.on('chatrooms', handleGetChatrooms)
//
//   client.on('availableUsers', handleGetAvailableUsers)
//
//   client.on('disconnect', function () {
//     console.log('client disconnect...', client.id)
//     handleDisconnect()
//   })
//
//   client.on('error', function (err) {
//     console.log('received error from client:', client.id)
//     console.log(err)
//   })
// })
