const path = require("path");
const DefaultRegistry = require("undertaker-registry");
const merge = require("lodash.merge");
const { merge: wpMerge } = require("webpack-merge");

// Load the default config
const defaultConfig = require("./config");

// Tasks
const styles = require("./tasks/styles");
const clean = require("./tasks/clean");
const images = require("./tasks/images");
const createCopyTasks = require("./tasks/copy");
const browserSync = require("browser-sync");
const browserSyncTask = require("./tasks/browserSync");
const bundleScripts = require("./tasks/scripts");

class CommonRegistry extends DefaultRegistry {
  constructor(opts) {
    super();

    const config = merge(defaultConfig, opts);

    // Attach our full config to the class
    this.config = config;
    this.env = opts.env || process.env.ENVIRONMENT || process.env.NODE_ENV;
    this.browserSync = browserSync.create();
    const userWebpackConfig = opts.webpackConfig || {};
    const defaultWebpackConfig = require("./webpack.config");
    this.webpackConfig = wpMerge(
      defaultWebpackConfig(config),
      userWebpackConfig
    );
  }

  init(taker) {
    const { task, series, parallel } = taker;

    task("clean", clean);
    task("styles", styles);
    task("images", images);
    task("browserSync", browserSyncTask);
    task("scripts", bundleScripts);

    task("setDev", function(cb) {
      console.log("\n>>>> Running with env: %s\n", this.env);
      cb();
    });

    const copyTasks = createCopyTasks(taker).bind(this);
    task("copy", parallel(...copyTasks()));

    task("watchAll", function(cb) {
      this.watch.map(watchSet => {
        taker.watch(
          `${this.src}/${watchSet.globs}`,
          taker.series(watchSet.task)
        );
      });
      cb();
    });

    task(
      "default",
      series(
        "setDev",
        "clean",
        parallel("styles", "images", "copy", "scripts"),
        parallel("browserSync", "watchAll")
      )
    );
  }

  set(name, fn) {
    // Binds our full config to all our tasks
    return (this._tasks[name] = fn.bind({
      ...this.config,
      env: this.env,
      browserSync: this.browserSync,
      webpackConfig: this.webpackConfig
    }));
  }
}

module.exports = CommonRegistry;
