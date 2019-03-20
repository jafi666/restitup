const del = require('del');

module.exports = function(gulp) {
  gulp.task('clean', 'Clean all workspace', [
    'clean:reports',
    'clean:app-doc'
  ]);

  gulp.task('clean:reports', 'Removes reports directory', function() {
    return del(['reports']);
  });

  gulp.task('clean:reports:coverage', 'Removes coverage directories', function() {
    return del(['reports/coverage']);
  });

  gulp.task('clean:reports:api-test', 'Removes api integration test reports files', function() {
    return del(['reports/api-test']);
  });

  gulp.task('clean:app-doc', 'Removes app docs files', function() {
    return del(['app-docs']);
  });
};
