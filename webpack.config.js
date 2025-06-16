const path = require('path');

module.exports = {
  entry: {
    'wacapi-web': './src/index.js',
    'wacapi-cart': './src/wacapi-cart.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets/js'),
  },
};