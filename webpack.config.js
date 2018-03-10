const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});
const ExtractTextPluginConfig = new ExtractTextPlugin("styles.css");

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('build'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      { test: /\.(ttf|otf|eot|svg|png|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'url-loader?limit=10000', exclude: /node_modules/ }
    ]
  },
  plugins: [
      HtmlWebpackPluginConfig,
      ExtractTextPluginConfig,
      new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
      hot: true,
      port: 3001
  }
};