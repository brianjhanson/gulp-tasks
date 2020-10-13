const gulp = require("gulp");
module.exports = function() {
  const { src, dest, templates } = this;
  const { path, glob } = templates;
  return gulp.src(`${src}/${path}/${glob}`).pipe(gulp.dest(`${dest}/${path}`));
};
