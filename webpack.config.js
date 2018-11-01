const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: { 
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 8088
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 2000
  },
  plugins: [
    new HtmlWebpackPlugin(), // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
      title: 'test',
      filename: 'index.html',
      template: 'src/app.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};