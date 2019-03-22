/**
 * @author Jafeth Garcia
 */
const del = require('del');

module.exports = function(gulp) {
  gulp.task('clean', 'Clean all workspace', [
    'clean:reports',
    'clean:appdocs'
  ]);

  gulp.task('clean:reports', 'Removes reports directory', function() {
    return del(['reports']);
  });

  gulp.task('clean:reports:coverage', 'Removes coverage directories', function() {
    return del(['reports/coverage']);
  });

  gulp.task('clean:reports:unit-test', 'Removes api integration test reports files', function() {
    return del(['reports/unit-test']);
  });

  gulp.task('clean:appdocs', 'Removes app docs files', function() {
    return del(['appdocs']);
  });
};
