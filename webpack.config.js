const path = require('path');

module.exports = {
  entry: './generator.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
