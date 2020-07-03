const gulp = require("gulp");
const browserSync = require('browser-sync');
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const atImport = require("postcss-import");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const path = require("path");

function configureStyles({ src, dest, options = {} }) {
  console.log("src", src); // eslint-disable-line
  const config = {
    postCssPlugins: [autoprefixer(), atImport()],
    env: "development",
    ...options,
  };

  return function styles() {
    const postCssPlugins = [autoprefixer()];

    if (config.env === "production") {
      postCssPlugins.push(cssnano());
    }

    return gulp
      .src(src)
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: path.resolve("node_modules"),
        }).on("error", sass.logError)
      )
      .pipe(postcss(postCssPlugins))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({stream: true}));
  };
}

module.exports = configureStyles;
