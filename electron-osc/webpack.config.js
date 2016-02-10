var path = require('path');

module.exports = {
  entry: {
    app: "./app/App.js"
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["react-hot", "babel"],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  }
};