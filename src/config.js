const base = {
  src: "src",
  dest: "dist"
};

const styles = {
  path: "styles",
  glob: "**/*.scss",
  postcss: {
    plugins(env) {
      const postcssPlugins = [
        require("postcss-import")(),
        require("tailwindcss"),
        require("autoprefixer")()
      ];

      if (env !== "development") {
        postcssPlugins.push(require("cssnano"));
      }

      return postcssPlugins;
    },
    options: {}
  }
};

const clean = {};

const imagemin = require("gulp-imagemin");
const images = {
  path: "images",
  glob: "**/*.{jgp,png,gif,svg}",
  imageMinConfig: [
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo({
      plugins: [
        {cleanupAttrs: true},
        {cleanupIDs: false},
        {collapseGroups: false},
        {mergePaths: false},
        {moveElemsAttrsToGroup: false},
        {moveGroupAttrsToElems: false},
        {removeViewBox: false},
        {removeStyleElement: true}
      ]
    })
  ]
};

const copy = {
  folders: ["static", "fonts"]
};

const browserSyncOptions = {
  proxy: process.env.PRIMARY_SITE_URL || false,
  open: false,
  notify: false,
  ghostMode: false,
  middleware: [],
  files: [`./templates/**/*.{html,twig}`]
};

const scripts = {
  path: 'scripts',
  bundles: {
    main: ['main.js']
  }
}

const watch = [
  {
    globs: [`styles/**/*.scss`],
    task: "styles"
  },
  {
    globs: [`images/**/*.{jpg,png,gif,svg}`],
    task: "images"
  },
  {
    globs: [`static/**/*`, `fonts/**/*`],
    task: "copy"
  }
];

module.exports = {
  ...base,
  styles,
  scripts,
  clean,
  images,
  copy,
  browserSyncOptions,
  watch
};
