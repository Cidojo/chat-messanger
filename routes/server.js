const path = require('path');
const express = require('express');
const http = require('http');
const webpack = require('webpack');
const config = require('./../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const io = require('./sockets');

const app = express();
const compiler = webpack(config);
const server = http.Server(app);
io.initialize(server);
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
