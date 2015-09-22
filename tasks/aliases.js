module.exports = {
  'test': [
    'jsonlint:dev',
    'jscs:dev',
    'jshint:dev',
    'eslint:dev',
    // 'babel:test',
    // 'mochacli'
  ],
  'default': [
    'clean',
    'test',
    'sass:dev',
    'copy:dev',
    'babel:dist',
  ]
};
