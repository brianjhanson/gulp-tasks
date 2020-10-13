require("dotenv").config();
const CommonRegistry = require("../src/index");
const { watch, dest, src, registry, series, task, parallel } = require("gulp");

registry(
  new CommonRegistry({
    debug: true,
    src: "./src",
    dest: "./dist",
    browserSyncOptions: {
      proxy: false,
      server: "./dist",
      files: ["./dist/*.html"]
    }
  })
);

function templates() {
  return src("./src/templates/*.html").pipe(dest("./dist"));
}

function watchTemplates() {
  watch("./src/templates/**/*", templates);
}

task(
  "default",
  series(
    "clean",
    parallel("core", templates),
    parallel("serve", watchTemplates)
  )
);
