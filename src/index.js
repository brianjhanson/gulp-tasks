const configureStyles = require("./tasks/styles");
const configureClean = require("./tasks/clean");
const configureBrowserSync = require("./tasks/browserSync");
const configureWatch = require("./tasks/watch");
const path = require("path");

function configureTasks({ src, dest }) {
  const styles = configureStyles({
    src: path.resolve(src, "styles", "*.scss"),
    dest: path.resolve(dest, "styles"),
  });

  const watch = configureWatch([
    {
      src: path.resolve(src, "styles", "**/*.scss"),
      task: styles,
    },
  ]);

  return {
    styles,
    watch,
  };
}

exports.configureStyles = configureStyles;
exports.configureClean = configureClean;
exports.configureBrowserSync = configureBrowserSync;
exports.configureTasks = configureTasks;
