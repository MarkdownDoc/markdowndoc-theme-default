export default function(linkList) {
  function build(list) {
    let l;
    let i;
    const html = [];

    // loop through files
    l = list.files.length;

    for (i = 0; i < l; i++) {
      const title = list.files[i].title;
      html.push(
        '<li><a href="' +
        list.files[i].url +
        '" title="' +
        title +
        '">' +
        title +
        '</a></li>'
      );
    }

    // loop through directories
    l = list.directories.length;

    for (i = 0; i < l; i++) {
      html.push('<ul>' + build(list.directories[i]) + '<ul>');
    }

    return html;
  }

  return build(linkList);
}
