const gulp = require("gulp");
const { styles } = require("./styles");
// const { templates } = require("./templates");
// const { images } = require("./images");

function configureWatch(tasks) {
  /**
   * Runs tasks when files change
   */
  return function watch() {
    tasks.forEach(({ src, task }) => {
      gulp.watch(src, task);
    });
    // gulp.watch(config.paths.imageSrc, images);
    // gulp.watch(config.paths.templateSrc, templates);
  };
}

module.exports = configureWatch;
