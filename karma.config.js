var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    nyanReporter: {
      // suppress the error report at the end of the test run
      suppressErrorReport: false, // default is false

      // suppress the red background on errors in the error
      // report at the end of the test run
      suppressErrorHighlighting: false, // default is false

      // increase the number of rainbow lines displayed
      // enforced min = 4, enforced max = terminal height - 1
      numberOfRainbowLines: 4, // default is 4

      // only render the graphic after all tests have finished.
      // This is ideal for using this reporter in a continuous
      // integration environment.
      renderOnRunCompleteOnly: false // default is false
    },
    files: [
      'tests.webpack.js'
    ],
    frameworks: [
      'jasmine'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'nyan'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      plugins: [
        new webpack.ProvidePlugin({
          "_": "underscore"
        })
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
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
    }
  });
};
