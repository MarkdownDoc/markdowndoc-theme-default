/**
 * Themeleon template helper, using the Swig module.
 *
 * See <https://github.com/themeleon/themeleon>.
 * See <https://github.com/themeleon/themeleon-swig>.
 */
var themeleon = require('themeleon')().use('consolidate');

/**
 * Utility function we will use to merge a default configuration
 * with the user object.
 */
var extend = require('extend');

/**
 * The theme function. You can directly export it like this:
 *
 *     module.exports = themeleon(__dirname, function (t) {});
 *
 * ... but here we want more control on the template variables, so there
 * is a little bit of preprocessing below.
 *
 * The theme function describes the steps to render the theme.
 */
var theme = themeleon(__dirname, function (t) {
  /**
   * Copy the assets folder from the theme's directory in the
   * destination directory.
   */
  t.copy('assets');

  /**
   * Render `views/index.html.swig` with the theme's context (`ctx` below)
   * as `index.html` in the destination directory.
   */
  t.swig('views/index.html.swig', 'index.html');
});

/**
 * Actual theme function. It takes the destination directory `dest`
 * (that will be handled by Themeleon), and the context variables `ctx`.
 *
 * Here, we will modify the context to have a `view` key defaulting to
 * the contents of `view.json`, but that can be overriden by the user's
 * configuration.
 */
module.exports = function (dest, ctx) {
  if (!('view' in ctx)) {
    ctx.view = {};
  }

  // Extend default `view.json` with `ctx.view` object
  ctx.view = extend(require('./view.json'), ctx.view);

  ctx.html = minify(ctx.html, { collapseWhitespace: true });

  /**
   * Now we have prepared the data, we can proxy to the Themeleon
   * generated theme function.
   */
  return theme.apply(this, arguments);
};
