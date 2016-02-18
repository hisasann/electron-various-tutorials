var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './app/App'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'App.js',
    publicPath: '/static/'
  },
  plugins: [
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  }
};