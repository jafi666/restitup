/**
 * @author Jafeth Garcia
 */
const gulp = require('gulp');
const gulpHelp = require('gulp-help');
const loadGulpTasks = require('load-gulp-tasks');
const CONFIG = require('./gulpconfig.json');

const options = {
  pattern: ['gulp-tasks/**/*.js'],
  argv: require('minimist')(process.argv),
  config: CONFIG
};

gulpHelp(gulp);
loadGulpTasks(gulp, options);
