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

io.on(`connection`, (client) => {
  console.log(`${client.id} connected...`); // eslint-disable-line

  clientManager.add(client);

  client.on(`register`, (name, cb) => {
    try {
      clientManager.add(client, name);
      cb(true);
    } catch (e) {
      cb(false);
    }
  })

  client.on(`debug:getAllClients`, (cb) => {
    cb([...clientManager.clients.values()]);
  });

  client.on(`debug:getRegisteredClients`, (cb) => {
    cb([...clientManager.registeredClients.values()]);
  });


  client.on(`disconnect`, () => {
    clientManager.delete(client.id);

    io.emit(`debug:update`, {
      allClients: [...clientManager.clients.values()],
      registeredClients: [...clientManager.registeredClients.values()]
    });

    console.log(`${client.id} has disconnected...`); // eslint-disable-line
  });
});
