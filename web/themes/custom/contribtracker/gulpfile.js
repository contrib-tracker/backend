import gulp from 'gulp';
import config from './gulp-tasks/config.js';

import scss from './gulp-tasks/scss.js';
import ts from './gulp-tasks/ts.js'
import svg from './gulp-tasks/svg.js';
import pretty from './gulp-tasks/prettier.js';
import lint from './gulp-tasks/lint.js';
import watch from './gulp-tasks/watch.js';
import images from './gulp-tasks/images.js';
import defaulttask from './gulp-tasks/default.js';

scss(gulp, config);
ts(gulp, config);
svg(gulp, config);
pretty(gulp, config);
lint(gulp, config);
watch(gulp, config);
images(gulp, config);
defaulttask(gulp, config);
