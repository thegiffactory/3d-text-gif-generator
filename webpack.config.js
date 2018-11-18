const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    "gif-renderer": './src/gif-renderer.js',
    "gif.worker": './node_modules/gif.js/dist/gif.worker.js',
  },
  output: {
    filename: './static/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    maxAssetSize: 700000, 
    maxEntrypointSize: 700000, // int (in bytes)
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
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
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
