const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    "gif.worker": './node_modules/gif.js/dist/gif.worker.js',
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /droid_sans_regular\.typeface\.json$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
