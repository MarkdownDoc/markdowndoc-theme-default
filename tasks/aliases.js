module.exports = {
  'test' : [
    'newer:jsonlint:dev',
    'newer:jscs:dev',
    'newer:jshint:dev',
    // 'babel:test',
    // 'mochacli'
  ],
  'default': [
    'clean',
    'babel:dist',
    'test'
  ]
};
