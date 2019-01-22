const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/app.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    publicPath: 'http://localhost:3000',
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
