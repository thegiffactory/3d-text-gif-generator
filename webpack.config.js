const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    "gif.worker": './node_modules/gif.js/dist/gif.worker.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
