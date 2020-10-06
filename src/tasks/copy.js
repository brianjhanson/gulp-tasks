const path = require("path");

function createCopyTasks(taker) {
  return function() {
    const { src, dest, copy } = this.config;

    return copy.folders.map(folder => {
      const srcPath = path.resolve(`${src}/${folder}`);
      const destPath = path.resolve(`${dest}/${folder}`);

      return function copyFolder() {
        return taker.src(`${srcPath}/**/*`).pipe(taker.dest(destPath));
      };
    });
  };
}

module.exports = createCopyTasks;
