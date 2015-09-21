import extend  from 'extend';
import fse from 'fs-extra';
import { minify } from 'html-minifier';
import path from 'path';
import { Promise } from 'es6-promise';
import esDenodeify from 'es6-denodeify';

const denodeify = esDenodeify(Promise);

import swig from './swig';
import createFileList from './create-file-list';

const copy = denodeify(fse.copy);
const renderFile = swig.renderFile;
const writeFile  = fse.outputFile;

function getRenderPathForPage(file, dest) {
  const sep = path.sep;
  const d   = dest + sep;

  return d + file.path + sep + file.fileName + '.html';
}

function renderSinglePage(data, template) {
  const html = renderFile(template, { html: data.html, title: data.title });

  return minify(html, { collapseWhitespace: true });
}

function render(list, template, ctx) {
  for (let i = list.length - 1; i >= 0; i--) {
    const pagePath = getRenderPathForPage(list[i], ctx.destAbsolute);
    const html     = renderSinglePage(list[i], template);

    writeFile(pagePath, html);
  }
}

export default(dest, ctx) => {
  const template = path.resolve(
    __dirname,
    '../src/views/index.html.swig'
  );

  if (!('view' in ctx)) {
    ctx.view = {};
  }

  // Extend default `view.json` with `ctx.view` object
  ctx.view = extend(require('./../view.json'), ctx.view);

  const list = createFileList(ctx);

  delete ctx.datatree;

  const renderHtml = denodeify(render);

  return Promise.all([
    renderHtml(list, template, ctx).then(
      copy(
        path.resolve(__dirname, '../assets'),
        path.resolve(ctx.destAbsolute, 'assets'),
        function(err) {
          if (err) {
            return console.error(err);
          }

          console.log('Assets folder copied successfully!');
        }
      )
    ),
  ]);
};
