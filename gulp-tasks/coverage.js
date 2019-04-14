/**
 * @author Jafeth Garcia
 */

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const JASMINE_CONFIG = {
  reporter: [
    new SpecReporter()
  ]
};

const ISTANBUL_REPORTS_CONFIG = {
  dir: './coverage',
  reportOpts: {
    dir: './reports/coverage'
  },
  reporters: [
    'lcov',
    'cobertura'
  ]
};

const THRESHOLDS_CONFIG = {
  thresholds: {
    global: 70
  }
};

module.exports = function(gulp, options, plugins) {
  const sourcePaths = [
    `${options.config.paths.lib}/**/*.js`,
    `!${options.config.paths.lib}/**/async-tools.js`
  ];
  const specsPaths = [
    `${options.config.paths.test}/unit-test/**/*.spec.js`
  ];

  gulp.task('instrument', 'Loads source files for coverage', function() {
    return gulp.src(sourcePaths)
      .pipe(plugins.istanbul({includeUntested: true}))
      .pipe(plugins.istanbul.hookRequire());
  });

  gulp.task('coverage', 'Creates coverage reports', ['instrument', 'clean:reports:coverage'], function() {
    return gulp.src(specsPaths)
      .pipe(plugins.jasmine(JASMINE_CONFIG))
      .pipe(plugins.istanbul.writeReports(ISTANBUL_REPORTS_CONFIG))
      .pipe(plugins.istanbul.enforceThresholds(THRESHOLDS_CONFIG));
  });
};
