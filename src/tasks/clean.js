const del = require("del");

/**
 * Clears all distribution directories
 */
function configureClean(paths, options = {}) {
  return function clean() {
    return del(paths);
  };
}

module.exports = configureClean;
