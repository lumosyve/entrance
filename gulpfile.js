const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');

const isProduction = process.env.NODE_ENV === 'production';

// Paths
const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'dist/css/'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/'
  },
  templates: {
    src: 'src/template/**/*',
  }
};

// HTML Task
function html () {
  return gulp.src(paths.html.src)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulpif(isProduction, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Scripts Task
function scripts () {
  return gulp.src(paths.scripts.src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Styles Task
function styles () {
  return gulp.src(paths.styles.src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(less())
    .pipe(gulpif(isProduction, cleanCSS()))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Assets Task
function assets () {
  return gulp.src(paths.assets.src, { encoding: false })
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(browserSync.stream());
}

// Watch Files
function watchFiles () {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: false,
    port: 9000
  });
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.templates.src, html);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.assets.src, assets);
}

// Define Complex Tasks
const build = gulp.series(gulp.parallel(html, scripts, styles, assets));
const watch = gulp.parallel(watchFiles);

// Export Tasks
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.assets = assets;
exports.build = build;
exports.watch = watch;
exports.default = gulp.series(build, watch);
