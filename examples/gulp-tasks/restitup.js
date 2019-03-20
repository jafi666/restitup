const Service = require('restitup');

module.exports = function(gulp, options) {
  gulp.task('restitup', 'Initializes Restitup module', function() {
    gulp.src('')
      .pipe(Service.Gulp(options.config))
      ;
  });
};
