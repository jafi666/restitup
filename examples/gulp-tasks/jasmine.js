const reporters = require('jasmine-reporters');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const JASMINE_CONFIG = {
  verbose:true,
  timeout: 2000,
  reporter: [
    new reporters.JUnitXmlReporter({
      savePath: './reports/api-test'
    }),
    new SpecReporter()
  ]
};

module.exports = function(gulp, options, plugins) {
  let specsPaths = [
    `specs/**/*.spec.js`
  ];

  gulp.task('api-test', 'Run unit tests using Jasmine', ['clean:reports:api-test', 'restitup'], function() {
    return gulp.src(specsPaths)
      .pipe(plugins.jasmine(JASMINE_CONFIG));
  });
};
