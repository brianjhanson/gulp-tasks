const gulp = require("gulp");
const imageMin = require("gulp-imagemin");

/**
 * Lossless optimization of image files
 */
function images() {
  const { src, dest, images } = this;
  const { glob, path, imageMinConfig } = images;
  return gulp
    .src(`${src}/${path}/${glob}`)
    .pipe(imageMin(imageMinConfig))
    .pipe(gulp.dest(`${dest}/${path}`));
}

module.exports = images;
