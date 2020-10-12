const gulp = require("gulp");
const cssGlobbing = require("gulp-css-globbing");
const sass = require("gulp-sass");
const gulpPostcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

sass.compiler = require("dart-sass");

function styles() {
  const { src, dest, styles, browserSync } = this;
  const { path, glob, postcss } = styles;

  return gulp
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
    .pipe(gulp.dest(`${dest}/${path}`))
    .pipe(browserSync.stream());
}

module.exports = styles;
