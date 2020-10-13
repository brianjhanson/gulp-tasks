# Gulp Tasks

A set of Gulp tasks for general development. More info coming soon. 🤞

## Using Tasks

To use the tasks in your project, you'll need to import the registry and attach it to your gulp instance.

```js
const CommonRegistry = require("@brianjhanson/gulp-tasks");
const gulp = require("gulp");

gulp.registry(
  new CommonRegistry({
    src: "./src",
    dest: "./dist",
  })
);
```

Now, you can use any of the tasks in the registry just like they were defined in your project.

```js
const CommonRegistry = require("@brianjhanson/gulp-tasks");
const gulp = require("gulp");

gulp.registry(
  new CommonRegistry({
    src: "./src",
    dest: "./dist",
  })
);

// You can use any of the registered tasks just like you defined them
gulp.task('my-task', gulp.series('clean', 'styles', 'scripts'));
```

## Configuring

You can configure all the tasks by passing an object in to the `new Registry` constructor. This config will be deeply merged with the [default config]() which allows you to override or add to the config as you see fit.

## Standalone Tasks

### Browser Sync
Starts a [Browsersync](https://www.browsersync.io/) server for live reloading as things change.

### Clean
Deletes all items from designated folders.

### Images
Compresses images with [imagemin](https://github.com/imagemin/imagemin).

### Rev
Adds a hash to then end of files so you can cache them aggressively but make sure new assets are loaded when you want them to be.

### Scripts
Bundles scripts with [webpack](https://webpack.js.org/)

### Styles
Compiles styles with sass. 

### Templates
Copies templates from one folder to another.

### Watch
Watch for designated file changes and run tasks based on those changes.

## Task Collections

### Core
Run `styles`, `images`, `copy` and `scripts` in parallel. 

### Serve
Run `browserSync` and `watch` in parallel.

### Default
Run `clean` then `core` and then `serve`

### Build
Run `clean`, `core` and `rev`.
