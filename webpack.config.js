/* eslint-disable */
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname + "/dist",
    filename: 'ReactToastify.js',
    libraryTarget: 'umd',
    library: 'ReactToastify'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: [
    'react',
    'react-dom',
    'prop-types',
    'react-transition-group'
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
