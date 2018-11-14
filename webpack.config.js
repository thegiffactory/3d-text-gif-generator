const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    "gif.worker": './node_modules/gif.js/dist/gif.worker.js',
  },
  output: {
    filename: './static/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /droid_sans_regular\.typeface\.json$/,
        use: [
          'url-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
};
