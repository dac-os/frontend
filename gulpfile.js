'use strict';

var nconf, statik, gulp, ngAnnotate, concat, uglify, templateCache, minifyHtml, watch, preprocess, del;
nconf = require('nconf');
statik = require('statik');
gulp = require('gulp');
ngAnnotate = require('gulp-ng-annotate');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
templateCache = require('gulp-angular-templatecache');
minifyHtml = require('gulp-minify-html');
watch = require('gulp-watch');
preprocess = require('gulp-preprocess');
del = require('del');

nconf.argv();
nconf.env();
nconf.defaults(require('./config'));

gulp.task('clean', function (cb) {
  return del(['build'], cb);
});

gulp.task('build', ['clean'], function () {
  var templates, src, scripts, index;

  src = gulp.src(['index.js', '*/*.js']);
  src = src.pipe(concat('scripts.min.js'));

  templates = gulp.src('views/*/*.html');
  templates = templates.pipe(minifyHtml());
  templates = templates.pipe(templateCache('templates.min.js', {'standalone' : true}));

  scripts = require('event-stream').merge(src, templates);
  scripts = scripts.pipe(preprocess({'context' : {
    'HISTORY_URI'    : nconf.get('HISTORY_URI'),
    'ENROLLMENT_URI' : nconf.get('ENROLLMENT_URI'),
    'COURSES_URI'    : nconf.get('COURSES_URI'),
    'CALENDAR_URI'   : nconf.get('CALENDAR_URI'),
    'AUTH_URI'       : nconf.get('AUTH_URI')
  }}));
  scripts = scripts.pipe(concat('scripts.min.js'));
  scripts = scripts.pipe(ngAnnotate());
  scripts = scripts.pipe(uglify());

  index = gulp.src('./index.html');
  index = index.pipe(minifyHtml());

  return require('event-stream').merge(scripts, index).pipe(gulp.dest('build'));
});

gulp.task('watch', ['build'], function () {
  require('dacos-auth');
  require('dacos-calendar');
  require('dacos-courses');
  require('dacos-enrollment');
  require('dacos-history');
  statik({
    'port' : nconf.get('PORT'),
    'root' : './build'
  });
  return watch(['index.js', '*/*.js', 'views/*/*.html'], function () {
    gulp.start('build');
  });
});

gulp.task('default', ['build']);