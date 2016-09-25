'use strict';

var isProduction = process.env.NODE_ENV === 'production';

console.log('..running ' + process.env.NODE_ENV + ' build');


var path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  appconfig = require('./application.config'),
  PORT = appconfig.back.port;

// const GLOBALS = {
//   'process.env.NODE_ENV': '\'development\'',
//   __DEV__: true
// };

var docsConfig = {
  entry: {
    docs: (isProduction
      ? []
      : ['webpack-hot-middleware/client?http://localhost:' + PORT])
      .concat([path.resolve(__dirname, './src/application/index.tsx')])
    ,
    lib: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'moment', 'jsonschema']
  },
  output: {
    path: path.join(__dirname, './build/docs'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: ''
  },

  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
        include: [
          path.join(__dirname, './src'),
        ]
      }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          'babel?' +
          'presets[]=react,' +
          'presets[]=es2015,' +
          'presets[]=stage-0,' +
          'plugins[]=transform-runtime',
          'ts'
        ],
        include: [
          path.join(__dirname, './src'),
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style',
          'css?sourceMap!postcss!resolve-url!sass?sourceMap!sass-resources'],
        include: [
          path.join(__dirname, './src'),
        ]
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        include: [
          path.join(__dirname, './src'),
        ]
      }, {
        test: /\.svg$/,
        loaders: [
          'babel?' +
          'presets[]=react,' +
          'presets[]=es2015,' +
          'presets[]=stage-0,' +
          'plugins[]=transform-runtime',
          require.resolve('./tools/webpack/SVGReactLoader')
        ],
        include: path.join(__dirname, './src'),
        exclude: path.join(__dirname, './node_modules/bootstrap-sass/assets/fonts/bootstrap')
      }, {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file?name=fonts/[name].[ext]',
        include: path.join(__dirname, './node_modules/bootstrap-sass/assets/fonts/bootstrap')
      }
    ]
  },
  ts: {
    compiler: 'typescript'
  },

  resolve: {
    root: [
      path.resolve(__dirname, './src'),
    ],
    extensions: ['', '.js', '.ts', '.tsx']
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './src')
    ]
  },

  sassResources: ['./src/generic/styles/common.scss'],

  postcss: function () {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'lib'}),
    //https://github.com/moment/moment/issues/1435#issuecomment-232687733
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new ExtractTextPlugin('./css/docs.css', { allChunks: true, publicPath: '/css' }),
    //new webpack.DefinePlugin(GLOBALS),

  ].concat(isProduction
    ? [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true
      })
    ]
    : []
  )
};

if (!isProduction) {
  docsConfig.devtool = '#source-map';
  docsConfig.bail = false;
  docsConfig.cache = true;
  docsConfig.debug = true;
}

module.exports = docsConfig;