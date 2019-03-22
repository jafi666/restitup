/**
 * @author Jafeth Garcia
 */

module.exports = function(gulp, options, plugins) {

  const sourcePaths = `${options.config.paths.lib}/**/*.js`;
  const specsPaths = `${options.config.paths.test}/**/*.spec.js`;

  gulp.task('eslint', 'Check code styles', ['eslint:app', 'eslint:test']);

  gulp.task('eslint:fix', 'Check code styles and fix problems', ['eslint:app:fix', 'eslint:test:fix']);

  gulp.task('eslint:app', 'Linter for source files', function() {
    return gulp.src(sourcePaths)
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.results(results => {
        console.info(`Total Results: ${results.length}`);
        console.info(`Total Warnings: ${results.warningCount}`);
        console.info(`Total Errors: ${results.errorCount}`);
      }))
      .pipe(plugins.eslint.failAfterError());
  });

  gulp.task('eslint:app:fix', 'Linter for source files and fix problems', function() {
    return gulp.src(sourcePaths)
      .pipe(plugins.eslint({ fix: true }))
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslintIfFixed(`${options.config.paths.lib}`));
  });

  gulp.task('eslint:test', 'Linter for tests files and fix problems', function() {
    return gulp.src(specsPaths)
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.results(results => {
        console.info(`Total Results: ${results.length}`);
        console.info(`Total Warnings: ${results.warningCount}`);
        console.info(`Total Errors: ${results.errorCount}`);
      }))
      .pipe(plugins.eslint.failAfterError());
  });

  gulp.task('eslint:test:fix', 'Linter for tests files and fix problems', function() {
    return gulp.src(specsPaths)
      .pipe(plugins.eslint({ fix: true }))
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslintIfFixed(`${options.config.paths.test}`));
  });
};
