/**
 * @author Jafeth Garcia
 */

const JSDOC_CONFIG = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    excludePattern: '(^|\\/|\\\\)_'
  },
  opts: {
    destination: 'appdocs'
  },
  plugins: ['plugins/markdown'],
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
    default: {
      outputSourceFiles: true
    },
    path: 'ink-docstrap',
    theme: 'cerulean',
    navType: 'vertical',
    linenums: true,
    dateFormat: 'MMMM Do YYYY, h:mm:ss a'
  }
};

module.exports = function(gulp, options, plugins) {

  let sourcePaths = [
    'README.md',
    `${options.config.paths.lib}/**/*.js`
  ];

  gulp.task('appdocs', 'Makes project documentation.', ['clean:appdocs'], function(done) {
    gulp.src(sourcePaths, { read: false })
      .pipe(plugins.jsdoc3(JSDOC_CONFIG, done));
  });
};
