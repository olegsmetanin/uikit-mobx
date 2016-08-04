'use strict';

console.log('..running development build');

var path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  appconfig = require('./application.config'),
  PORT = appconfig.back.port;

const GLOBALS = {
  'process.env.NODE_ENV': '\'development\'',
  __DEV__: true
};

module.exports = {
  entry: {
    docs: [
      'webpack-hot-middleware/client?http://localhost:' + PORT,
      path.resolve(__dirname, './docs/src/index.tsx')
    ]
  },
  output: {
    path: path.join(__dirname, './build/docs'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },

  //devtool  : '#eval-cheap-module-source-map', // быстрые и бесполезные сурс-мапы
  devtool: '#source-map', // подробные но медленные сурс-мапы
  bail: false,
  cache: true,
  debug: true,

  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, './docs/src'),
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
          path.join(__dirname, './docs/src')
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css?sourceMap!postcss!resolve-url!sass?sourceMap!sass-resources'),
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, './docs/src')
        ]
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, './docs/src')
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
    root: path.resolve(__dirname, './src'),
    docs: path.resolve(__dirname, './docs/src'),
    extensions: ['', '.js', '.ts', '.tsx']
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './src')
    ]
  },

  sassResources: ['./src/styles/common.scss'],

  postcss: function () {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('./css/docs.css', { allChunks: true, publicPath: '/css' }),
    new webpack.DefinePlugin(GLOBALS)
  ]
};
