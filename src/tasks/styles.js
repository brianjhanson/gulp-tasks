const gulp = require("gulp");
const cssGlobbing = require("gulp-css-globbing");
const sass = require("gulp-sass");
const gulpPostcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const merge = require("lodash.merge");

sass.compiler = require("dart-sass");

function styles() {
  const { src, dest, styles, browserSync } = this;
  const { path, glob, postcss } = styles;

  const stream = gulp
    .src(`${src}/${path}/${glob}`)
    .pipe(sourcemaps.init())
    .pipe(
      cssGlobbing({
        extensions: [".scss"]
      })
    )
    .pipe(
      sass({
        includePaths: ["node_modules"]
      }).on("error", sass.logError)
    )
    .pipe(gulpPostcss(postcss.plugins(this.env), postcss.options))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${dest}/${path}`));

  if (browserSync) {
    stream.pipe(browserSync.stream());
  }

  return stream;
}

module.exports = styles;
