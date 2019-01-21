const express = require('express');
const http = require('http');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const app = express();
const config = require('./../webpack.config.js');
const compiler = webpack(config);
const server = http.Server(app);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.get(`/`, (req, res) => {
  res.sendFile(path.resolve(`public/index.html`));
});

server.listen(3000, () => console.log(`listening on port 3000`));
