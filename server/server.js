const path = require('path'),
      http = require('http'),
      express = require('express'),
      ClientManager = require('./client-manager'),
      socketIO = require('socket.io');

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

io.of(`/debugger`).on('connection', (client) => {
  console.log(`debugger connected as ${client.id}`);

  client.on(`debug:getAllClients`, (cb) => {
    cb(clientManager.getAllClients());
  });

  client.on(`debug:getRegisteredClients`, (cb) => {
    cb(clientManager.getRegisteredClients());
  });
});

io.of(`/app`).on(`connection`, (client) => {
  console.log(`${client.id} connected...`); // eslint-disable-line

  const updateListsEvent = () => {
    io.of(`/debugger`).emit(`debug:update`, clientManager.getAllClients(), clientManager.getRegisteredClients());
  }

  clientManager.add(client);
  updateListsEvent();

  client.on(`register`, (name, cb) => {
    try {
      clientManager.register(client.id, name);
      cb(true);
    } catch (e) {
      cb(false);
    }
    updateListsEvent();
  })

  client.on(`disconnect`, () => {
    clientManager.delete(client.id);
    updateListsEvent();

    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  });
});
