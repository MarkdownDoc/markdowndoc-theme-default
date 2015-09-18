'use strict';

import extend  from 'extend';
import fse from 'fs-extra';
import { minify } from 'html-minifier';
import path from 'path';

import swig from './swig';
import createFileList from './create-file-list';

// const copy       = fse.copy;
const renderFile = swig.renderFile;
const writeFile  = fse.outputFile;

function getRenderPathForPage (file, dest) {
  let sep = path.sep;
  dest    = dest + sep;

  return dest + file.path + sep + file.fileName + '.html';
}

function renderSinglePage (data, template) {
  let html = renderFile(template, { html: data.html, title: data.title });

  return minify(html, { collapseWhitespace: true });
}

function render (list, template, ctx) {
  for (let i = list.length - 1; i >= 0; i--) {
    let pagePath = getRenderPathForPage(list[i], ctx.destAbsolute);
    let html     = renderSinglePage(list[i], template);

    writeFile(pagePath, html);
  }
}

export default (dest, ctx) => {
  const template = path.resolve(
    __dirname,
    '../views/index.html.swig'
  );

  if (!('view' in ctx)) {
    ctx.view = {};
  }

  // Extend default `view.json` with `ctx.view` object
  ctx.view = extend(require('./../view.json'), ctx.view);

  let list = createFileList(ctx);

  delete ctx.datatree;

  // copy(
  //   path.resolve(__dirname, '../assets'),
  //   path.resolve(ctx.destAbsolute, 'assets')
  // );

  render(list, template, ctx);
};
