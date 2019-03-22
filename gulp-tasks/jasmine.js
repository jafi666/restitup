const reporters = require('jasmine-reporters');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const JASMINE_CONFIG = {
  verbose:true,
  timeout: 2000,
  reporter: [
    new reporters.JUnitXmlReporter({
      savePath: './reports/unit-test'
    }),
    new SpecReporter()
  ]
};

module.exports = function(gulp, options, plugins) {
  let specsPaths = [
    `${options.config.paths.test}/unit-test/**/*.spec.js`
  ];

  gulp.task('unit-test', 'Run unit tests using Jasmine', ['clean:reports:unit-test', 'eslint:test'], function() {
    return gulp.src(specsPaths)
      .pipe(plugins.jasmine(JASMINE_CONFIG));
  });
};
