const path = require('path'),
      http = require('http'),
      express = require('express'),
      socketIO = require('socket.io'),
      moment = require('moment'),
      ClientManager = require('./client-manager'),
      RoomManager = require('./room-manager');

const webpack = require('webpack'),
      config = require('./../webpack.config.js'),
      compiler = webpack(config),
      webpackDevMiddleware = require('webpack-dev-middleware');

const app = express(),
      server = http.Server(app),
      publicPath = path.join(__dirname, `./../public`),
      io = socketIO(server),
      port = process.env.PORT || 3000;


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


const clientManager = new ClientManager;
const roomManager = new RoomManager;


io.of(`/debugger`).on('connection', (client) => {
  console.log(`debugger connected as ${client.id}`); // eslint-disable-line

  client.on(`debug:getAllUsers`, (cb) => {
    cb(clientManager.getAllUsers());
  });

  client.on(`debug:getRegisteredUsers`, (cb) => {
    cb(clientManager.getRegisteredUsers());
  });
});


io.of(`/app`).on(`connection`, (client) => {
  console.log(`${client.id} connected...`); // eslint-disable-line

  const updateListsEvent = () => {
    io.of(`/debugger`).emit(`debug:update`, clientManager.getAllUsers(), clientManager.getRegisteredUsers());
  }

  clientManager.add(client);
  updateListsEvent();

  client.on(`register`, (name, cb) => {
    try {
      // register user when user gets name
      clientManager.register(client.id, name);

      // callback on client side which flags if register succeed
    } catch (e) {
      // callback on client side which flags if register reject (reject only if name is already registered with another user)
      cb(false);
    }

    client.join(name);

    // create new room with room.name = username (user default room)
    roomManager.addRoom(client.id, name);

    // add current user to it's default room
    roomManager.addMemberToRoom(clientManager.allUsers.get(client.id), client.id);

    cb(true);

    updateListsEvent();
  })

  client.on(`getRoomMembersList`, (room, cb) => {
    cb(roomManager.getRoomMembersByName(room));
  });

  client.on(`getGlobalUsersList`, (cb) => {
    cb(clientManager.getGlobalUsersList());
  });

  // client.on(`newMessage`, (cb) => {
  //   cb()
  // });

  client.on(`invite`, (to, room) => {
    clientManager.getUserByName(to).client.join(room, () => {
      let rooms = Object.keys(clientManager.getUserByName(to).client.rooms);
      console.log(rooms);
    });
  });

  client.on(`createMessageHandler`, (room, message) => {
    io.of(`/app`).to(room).emit(`onMessageReceived`, {
      from: clientManager.getUserById(client.id).name,
      text: message,
      createdAt: moment().format(`hh mm ss a`)
    });
    console.log(`Message from: ${roomManager.getRoomByName(room).name}: `, message)
  });

  client.on(`disconnect`, () => {
    clientManager.delete(client.id);
    updateListsEvent();

    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  });

  client.on('error', function (err) {
    console.log('received error from client:', client.id);
    console.log(err);
  })
});
