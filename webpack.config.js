const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'wacapi-web.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
};