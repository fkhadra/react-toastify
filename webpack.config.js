/* eslint-disable */
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'dist/ReactToastify.js',
    libraryTarget: 'umd',
    library: 'ReactToastify'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react-app'],
          sourceMap: true
        }
      }
    ]
  },
  externals: [
    'react',
    'react-dom',
    'prop-types',
    'react-transition-group',
    'glamor'
  ],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: isDev
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      },
      disable: true,
      sourceMap: true
    })
  ]
};
