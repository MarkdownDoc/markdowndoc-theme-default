module.exports = {
  'dev:test' : [
    'newer:jsonlint:dev',
    'newer:jscs:dev',
    // 'newer:jshint:dev',
    'babel:test',
    'mochacli'
  ],
  'default': [
    'clean',
    'babel:theme',
    'dev:test',
    'babel:dist'
  ],
  'build': [
    'bump',
    'default'
  ]
};
