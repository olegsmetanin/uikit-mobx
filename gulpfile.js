'use strict';

var gulp = require('gulp'),
  webpack = require('webpack'),
  gutil = require('gutil'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),

  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  eslint = require('gulp-eslint'),
  tslint = require('gulp-tslint');

gulp.task('docs:clean', function () {
  return gulp.src(['build/docs']).pipe(clean());
});

gulp.task('jshint', function () {
  return gulp.src(['*.js', './tools/webpack/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function () {
  return gulp.src(['*.js', './tools/webpack/**/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('eslint', function () {
  return gulp.src(['./src/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('jslint', function (done) {
  runSequence('eslint', 'jshint', 'jscs', done);
});

gulp.task('tslint', function () {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx', 'docs/src/**/*.ts', 'docs/src/**/*.tsx', 'test/**/*.ts', 'test/**/*.tsx'])
      .pipe(tslint())
      .pipe(tslint.report('prose', {
        summarizeFailureOutput: true
      }));
});

gulp.task('lint', function (done) {
  runSequence('tslint', 'jslint', done);
});


gulp.task('copy', function () {
  return gulp.src(['docs/webpublic/**/*']).pipe(gulp.dest('build/docs'));
});

gulp.task('docs:compile', function (done) {
  var webpackConfig = require('./webpack.docs.development.config');
  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    done();
  });
});

gulp.task('rundevdocs', function () {
  require('./devdocs.js');
});

gulp.task('docs:run', function (done) {
  runSequence('docs:clean', ['copy', 'rundevdocs'], done);
});

gulp.task('build', function (done) {
  runSequence('clean', ['copy', 'client:compile'], done);
});

gulp.task('default', ['build']);