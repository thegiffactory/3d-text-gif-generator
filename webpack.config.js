const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
};
