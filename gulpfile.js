'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

(function() {
  var babelify = require('babelify');
  var browserify = require('browserify');
  var buffer = require('vinyl-buffer');
  var extend = require('lodash').extend;
  var sourcemaps = require('gulp-sourcemaps');
  var source = require('vinyl-source-stream');
  var uglify = require('gulp-uglify');
  var watchify = require('watchify');

  function buildBundler(watch) {
    var customOpts = {
      entries: ['./src/toolbus.jsx'],
      debug: true,
      delay: 50
    };
    var opts = extend({}, watchify.args, customOpts);

    var b = browserify(opts);
    if (watch) {
      b = watchify(b);
      b.on('update', function() { bundleJS(b); });
      b.on('log', gutil.log);
    }

    b.transform(babelify);

    return b;
  }

  function bundleJS(b, shouldUglify) {
    return b.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('toolbus.min.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(gulpif(shouldUglify, uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dev'))
      .pipe(livereload())
      .pipe(gulp.dest('./dist'));
  };

  gulp.task('development:bundle-js', function() {
    return bundleJS(buildBundler(false), false);
  });
  gulp.task('production:bundle-js', function() {
    return bundleJS(buildBundler(false), true);
  });

  var jshint = require('gulp-jshint');
  gulp.task('jscs', function() {
    var jscs = require('gulp-jscs');
    return gulp.src('src/**/*.{js,jsx}')
      .pipe(jscs('.jscsrc'))
      .on('error', function() {});
  });

  gulp.task('jshint', function() {
    return gulp.src('./src/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .on('error', function() {});
  });

  gulp.task('watch-js', function() {
    bundleJS(buildBundler(true));
  });
}());

(function() {
  var template = require('gulp-template');

  function templateEnv(env, dest) {
    return function() {
      return gulp.src(['src/index.html.erb'])
        .pipe(template({ env: env }))
        .pipe(rename({ extname: '' }))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
    };
  }

  gulp.task('development:template', templateEnv('development', 'dev'));
  gulp.task('production:template', templateEnv('production', 'dist'));
}());

(function() {
  var less = require('gulp-less');
  var autoprefixer = require('gulp-autoprefixer');
  var csscomb = require('gulp-csscomb');

  gulp.task('csscomb', function() {
    return gulp.src('src/css/*.css.less')
      .pipe(csscomb())
      .pipe(gulp.dest('src/css'));
  });

  gulp.task('less', function() {
    return gulp.src('src/css/toolbus.css.less')
      .pipe(less())
      .on('error', gutil.log.bind(gutil, 'LESS Error'))
      .pipe(autoprefixer(['last 2 versions', 'iOS > 5%', 'Android > 5%']))
      .on('error', gutil.log.bind(gutil, 'Autoprefixer Error'))
      .pipe(rename({ extname: '' })) // Change .css.css to .css.
      .pipe(gulp.dest('dev'))
      .pipe(livereload())
      .pipe(gulp.dest('dist'));
  });
}());

gulp.task('watch', ['watch-js'], function() {
  gulp.watch('src/css/*.*', ['less']);
  gulp.watch(['src/index.html.erb'], ['development:template']);
  gulp.watch('src/**/*.{js,jsx}', ['jshint', 'jscs']);
  livereload.listen(35729);
});

gulp.task('default', [
  'jshint',
  'jscs',
  'development:bundle-js',
  'less',
  'development:template'
]);

gulp.task('production', [
  'production:bundle-js',
  'less',
  'production:template'
]);