const webpack = require("webpack");
const stripAnsi = require("strip-ansi");
const webpackDevMiddleware = require("webpack-dev-middleware");

/**
 * Refreshes browser on file changes and syncs scroll/clicks between devices.
 * Your site will be available at http://localhost:3000
 */
function browserSyncTask(cb) {
  const compiler = webpack(this.webpackConfig);

  /**
   * Reload all devices when bundle is complete
   * or send a fullscreen error message to the browser instead
   */
  // eslint-disable-next-line consistent-return
  compiler.hooks.done.tap("ReloadDevices", stats => {
    if (stats.hasErrors() || stats.hasWarnings()) {
      return this.browserSync.sockets.emit("fullscreen:message", {
        title: "Webpack Error:",
        body: stripAnsi(stats.toString()),
        timeout: 100000
      });
    }
    this.browserSync.instance.reload();
  });

  const { browserSyncOptions } = this;

  browserSyncOptions.middleware = [
    webpackDevMiddleware(compiler, {
      publicPath: `${this.webpackConfig.output.publicPath}/scripts`,
      stats: { colors: true },
      writeToDisk: true
    })
  ];

  this.browserSync.init(null, browserSyncOptions);
  cb();
}

module.exports = browserSyncTask;
