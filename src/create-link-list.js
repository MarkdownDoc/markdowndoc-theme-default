import path from 'path';

export default function(ctx, backslashes) {
  function build(tree) {
    let i;
    let l;

    l = tree.files.length;

    for (i = 0; i < l; i++) {
      const replacePath = path.resolve(ctx.src) + path.sep;
      const dirPath     = path.resolve(tree.path);
      const linkpath    = tree.path === ctx.src ?
        '' :
        dirPath.replace(replacePath, '');

      const subpath     = linkpath !== '' ?
        linkpath + path.sep :
        '';

      const name        = path.basename(
        tree.files[i].fileName,
        ctx['file-type']
      );

      delete tree.files[i].html;
      delete tree.files[i].fileName;

      tree.menu = tree.path === ctx.src ? 'Home' : path.basename(tree.path);
      tree.files[i].url = backslashes + subpath + name + '.html';
      tree.files[i].title = name;
    }

    // loop through directories
    l = tree.directories.length;

    for (i = 0; i < l; i++) {
      tree.directories[i] = build(tree.directories[i]);
    }

    return tree;
  }

  return build(ctx.datatree);
}
