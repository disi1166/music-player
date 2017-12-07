var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
  devtool: 'source-map',
  devServer: {
    open: true,
    inline: true
  },
  entry: ['./src/js/app.js', './src/css/style.scss'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      Backbone: "backbone",
      $: "jquery",
      "_": "underscore"
    }),
    new ExtractTextPlugin({filename: "style.css", allChunks: true})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})

      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=webpack_assets/images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(mp3)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=webpack_assets/songs/[name].[ext]'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js'
    ],
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, 'node_modules')
    ]
  }
};
module.exports = config;
