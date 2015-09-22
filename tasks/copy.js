'use strict';
//copy config

module.exports = {
  dev: {
    files: [
      {
        expand: true,
        cwd: 'src/images/',
        src: ['**/*'],
        dest: 'assets/images/'
      }
    ]
  }
};
