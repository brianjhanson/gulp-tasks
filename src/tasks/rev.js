const gulp = require("gulp");
const revTask = require("gulp-rev");

/**
 * Adds revision hash to assets and stores hashes in a manifest file
 */

function revAssets() {
  const { rev, dest } = this;
  const { glob } = rev;
  return gulp
    .src(`${dest}/${glob}`, { base: dest })
    .pipe(revTask())
    .pipe(gulp.dest(dest))
    .pipe(revTask.manifest())
    .pipe(gulp.dest(dest));
}

module.exports = revAssets;
