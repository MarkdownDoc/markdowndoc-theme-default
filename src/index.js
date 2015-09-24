import extend  from 'extend';
import fse from 'fs-extra';
import { minify } from 'html-minifier';
import path from 'path';
import { Promise } from 'es6-promise';
import esDenodeify from 'es6-denodeify';
import { repeat, osSplit } from './utils';

const denodeify = esDenodeify(Promise);

import swig from './swig';
import createFileList from './create-file-list';
import createLinkList from './create-link-list';
import buildLinkHtml from './build-link-html';

const copy       = denodeify(fse.copy);
const renderFile = swig.renderFile;
const writeFile  = fse.outputFile;

function getRenderPathForPage(file, dest) {
  const sep = path.sep;
  const d   = dest + sep;

  return d + file.path + sep + file.fileName + '.html';
}

function renderSinglePage(template, data) {
  const html = renderFile(template, data);

  return minify(html, { collapseWhitespace: true });
}

function render(list, template, ctx) {
  for (let i = list.length - 1; i >= 0; i--) {
    const backslashes = list[i].path !== '' ?
    repeat('..' + path.sep, osSplit(list[i].path).length) :
    '';
    const linkList = createLinkList(ctx, backslashes);

    ctx.html        = list[i].html;
    ctx.title       = list[i].title;
    ctx.linkbuilder = buildLinkHtml(linkList);
    ctx.assetsPath  = backslashes;

    delete ctx.datatree;

    const pagePath = getRenderPathForPage(list[i], ctx.destAbsolute);
    const html     = renderSinglePage(template, ctx);

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

  const renderHtml = denodeify(render);

  return Promise.all([
    renderHtml(list, template, ctx),
    copy(
      path.resolve(__dirname, '../assets'),
      path.resolve(ctx.destAbsolute, 'assets')
    ),
  ]);
};
