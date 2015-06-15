'use strict';

var nconf, statik, gulp, ngAnnotate, concat, uglify, templateCache, minifyHtml, watch, preprocess, bower, clean, sequence;
nconf = require('nconf');
statik = require('statik');
gulp = require('gulp');
ngAnnotate = require('gulp-ng-annotate');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
templateCache = require('gulp-angular-templatecache');
minifyHtml = require('gulp-minify-html');
preprocess = require('gulp-preprocess');
bower = require('gulp-bower');
clean = require('gulp-clean');
sequence = require('gulp-run-sequence');

nconf.argv();
nconf.env();
nconf.defaults(require('./config'));

gulp.task('clean', function () {
  return gulp.src(['build/index.html', 'build/scripts.min.js']).pipe(clean());
});

gulp.task('bower', function () {
  return bower('./build').pipe(gulp.dest('build'));
});

gulp.task('index', function () {
  return gulp.src('./index.html').pipe(minifyHtml()).pipe(gulp.dest('build'));
});

gulp.task('scripts', function () {
  var templates, src, scripts;

  src = gulp.src(['index.js', '*/*.js']);
  src = src.pipe(concat('scripts.min.js'));

  templates = gulp.src('views/*/*.html');
  templates = templates.pipe(minifyHtml());
  templates = templates.pipe(templateCache('templates.min.js', {'standalone' : true}));

  scripts = require('event-stream').merge(src, templates);
  scripts = scripts.pipe(preprocess({'context' : {
    'PAGE_SIZE'      : nconf.get('PAGE_SIZE'),
    'HISTORY_URI'    : nconf.get('HISTORY_URI'),
    'ENROLLMENT_URI' : nconf.get('ENROLLMENT_URI'),
    'COURSES_URI'    : nconf.get('COURSES_URI'),
    'CALENDAR_URI'   : nconf.get('CALENDAR_URI'),
    'AUTH_URI'       : nconf.get('AUTH_URI')
  }}));
  scripts = scripts.pipe(concat('scripts.min.js'));
  scripts = scripts.pipe(ngAnnotate());
  scripts = scripts.pipe(uglify());
  scripts = scripts.pipe(gulp.dest('build'));
  return scripts;
});

gulp.task('build', function (next) {
  return sequence('clean', ['bower', 'index', 'scripts'], next);
});

gulp.task('watch', ['build'], function () {
  statik({'port' : nconf.get('PORT'), 'root' : './build'});
  require('dacos-auth');
  require('dacos-calendar');
  require('dacos-courses');
  require('dacos-enrollment');
  //require('dacos-history');
  return gulp.watch(['**/*', '!node_modules/**/*', '!build/*'], function () {
    return sequence('clean', ['index', 'scripts']);
  });
});

gulp.task('default', ['build']);