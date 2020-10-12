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

gulp.task('my-task', gulp.series('clean', 'styles', 'scripts'));
```

## Configuring

You can configure all the tasks by passing an object in to the `new Registry` constructor. This config will be deeply merged with the [default config]() which allows you to override or add to the config as you see fit.

## Standalone Tasks

### Browser Sync

### Clean

### Images

### Rev
Adds a hash to then end of files so you can cache them aggressively but make sure new assets are loaded when you want them to be.

### Scripts

### Styles

### Templates

### Watch

## Task Collections

## Core

## Serve

## Default

## Build


## Contributing

## Development notes
