'use strict';

import chroma from 'chroma-js';
import swig from './src/swig';
import swigExtras from 'swig-extras';
import swigFilters from 'swig/lib/filters';

const copy = fse.copy;
const renderFile = swig.renderFile;
const writeFile = fs.writeFile;

export default (dest, ctx) => {
  ctx = {};
  const index = path.resolve('src/theme-default/', 'views/index.html.swig');


    // copy(path.resolve(__dirname, 'assets'), path.resolve(dest, 'assets'))
    //   .then(shortcutIcon(dest, ctx)),

  renderFile(index, ctx, function (err, output) {
    if (err) {
      throw (err.message);
    }

    let html = minify(output, { collapseWhitespace: true });

    writeFile(path.resolve(dest, 'index.html'), html);
  });
}
