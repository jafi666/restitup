const gulp = require('gulp');
const gulpHelp = require('gulp-help');
const loadGulpTasks = require('load-gulp-tasks');
const restOptions = require('./options');

const options = {
  pattern: ['gulp-tasks/**/*.js'],
  argv: require('minimist')(process.argv),
  config: restOptions
};

gulpHelp(gulp);
loadGulpTasks(gulp, options);
