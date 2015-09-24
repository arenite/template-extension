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
      .pipe(shell('node_modules/docco/bin/docco -o docs doT/**/*.js'));
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

  gulp.task('default', ['doTmin', 'doTdocs']);

  gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['doTmin', 'doTdocs']);
  });
}());
