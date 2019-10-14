/*global require:true */
(function () {
  'use strict';
  var gulp = require('gulp');
  var uglify = require('gulp-uglify');
  var jshint = require('gulp-jshint');
  var concat = require('gulp-concat');
  var minifyCSS = require('gulp-minify-css');
  var arenitesrc = require('gulp-arenite-src');
  var shell = require('gulp-shell');

  var build = 'build/';

  gulp.task('doTdocs', function () {
    return gulp.src('gulpfile.js', {read: false})
      .pipe(shell('node_modules/docco/bin/docco -o docs doT/js/*.js'));
  });

  gulp.task('reactdocs', function () {
    return gulp.src('gulpfile.js', {read: false})
      .pipe(shell('node_modules/docco/bin/docco -o docs react/js/*.js'));
  });

  gulp.task('pugdocs', function () {
    return gulp.src('gulpfile.js', {read: false})
      .pipe(shell('node_modules/docco/bin/docco -o docs pug/js/*.js'));
  });

  gulp.task('doTmin', function () {
    arenitesrc({
        mode: 'dev',
        base: 'doT/'
      },
      {
        export: 'arenite',
        imports: {module: {module: ''}}
      }, function (src) {
        src
          .pipe(concat('doT.min.js'))
          .pipe(uglify({preserveComments: 'some'}))
          .pipe(gulp.dest('doT/' + build));
      });
  });

  gulp.task('reactmin', function () {
    arenitesrc({
        mode: 'dev',
        base: 'react/'
      },
      {
        export: 'arenite',
        imports: {module: {module: ''}}
      }, function (src) {
        src
          .pipe(concat('react.min.js'))
          .pipe(uglify({preserveComments: 'some'}))
          .pipe(gulp.dest('react/' + build));
      });
  });

  gulp.task('pugmin', function () {
    arenitesrc({
        mode: 'dev',
        base: 'pug/'
      },
      {
        export: 'arenite',
        imports: {module: {module: ''}}
      }, function (src) {
        src
          .pipe(concat('pug.min.js'))
          .pipe(uglify({preserveComments: 'some'}))
          .pipe(gulp.dest('pug/' + build));
      });
  });

  gulp.task('default', ['doTmin', 'doTdocs', 'reactmin', 'reactdocs', 'pugmin', 'pugdocs']);

  gulp.task('watch', function () {
    gulp.watch(['doT/**/*.js','react/**/*.js','pug/**/*.js'], ['doTmin', 'doTdocs', 'reactmin', 'reactdocs', 'pugmin', 'pugdocs']);
  });
}());
