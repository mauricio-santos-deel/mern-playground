var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: [
    APP_DIR + '/index.jsx'
  ],
  
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  
  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        use : 'babel-loader'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};

module.exports = config;