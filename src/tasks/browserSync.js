const browserSync = require("browser-sync");

function configureBrowserSync(options = {}) {
  const config = {
    open: false,
    notify: false,
    ...options,
  };
  /**
   * Refreshes browser on file changes and syncs scroll/clicks between devices.
   * Your site will be available at http://localhost:3000
   */
  return function browserSyncTask(cb) {
    browserSync.init(config);
    cb();
  };
}

module.exports = configureBrowserSync;
