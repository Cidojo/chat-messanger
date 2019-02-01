const path = require('path'),
      http = require('http'),
      express = require('express'),
      socketIO = require('socket.io'),
      socketHandler = require('./socket-handler')


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

io.on(`connection`, socketHandler);
