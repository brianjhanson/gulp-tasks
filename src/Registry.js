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
const watch = require("./tasks/watch");

class CommonRegistry extends DefaultRegistry {
  constructor(opts) {
    super();

    const config = merge(defaultConfig, opts);

    // Attach our full config to the class
    this.config = config;
    this.env = config.env || process.env.ENVIRONMENT || process.env.NODE_ENV;
    this.browserSync = config.browserSync ? browserSync.create() : false;

    const userWebpackConfig = opts.webpackConfig || {};
    const defaultWebpackConfig = require("./webpack.config");
    this.webpackConfig = wpMerge(
      defaultWebpackConfig(config),
      userWebpackConfig
    );
  }

  init(taker) {
    const { task, series, parallel } = taker;
    const copyTasks = createCopyTasks(taker).bind(this);

    // Standalone tasks
    task("clean", clean);
    task("styles", styles);
    task("images", images);
    task("browserSync", browserSyncTask);
    task("scripts", bundleScripts);
    task("copy", parallel(...copyTasks()));

    // Watch is kind of special
    task("watch", watch);

    // Collection Tasks
    task("core", parallel("styles", "images", "copy", "scripts"));
    task("serve", parallel("browserSync", "watch"));
    task("default", series("clean", "core", "serve"));
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
