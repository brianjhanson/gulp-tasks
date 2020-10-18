const { watch, series } = require("gulp");

function watchTask(cb) {
  const { src, watch: watchConfig = [] } = this;

  watchConfig.map(watchSet => {
    watch(`${src}/${watchSet.globs}`, series(watchSet.task));
  });
  cb();
}

module.exports = watchTask;
