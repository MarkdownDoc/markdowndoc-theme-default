'use strict';

var createLinkList = require('../specs/create-link-list');
var utils          = require('../specs/utils');
var assert         = require('chai').assert;
var expect         = require('chai').expect;
var path           = require('path');

describe('#create link list', function() {
  it('creat', function() {
    var backslashes = 'test' !== '' ?
    utils.repeat('..' + path.sep, utils.osSplit('test').length) :
    '';
    var ctx = {
      "destAbsolute": "markdowndoc\\markdowndoc",
      "src": "tests\/fixture",
      "file-type": ".md",
      "datatree": {
        "path": "tests\/fixture",
        "files": [
          {
            "fileName": "markdowndoc\\tests\\fixture\\one.md",
            "html": "<h1>one title<\/h1>\n<h1>one2<\/h1>\n",
            "title": "one title"
          },
          {
            "fileName": "markdowndoc\\tests\\fixture\\three.md",
            "html": "<h1>three<\/h1>\n",
            "title": "three"
          },
          {
            "fileName": "markdowndoc\\tests\\fixture\\two.md",
            "html": "<h1>two<\/h1>\n",
            "title": "two"
          }
        ],
        "directories": [
          {
            "path": "markdowndoc\\tests\\fixture\\mdchildfolder",
            "files": [
              {
                "fileName": "markdowndoc\\tests\\fixture\\mdchildfolder\\child.md",
                "html": "<p>#first child from fixrture<\/p>\n",
                "title": "child"
              },
              {
                "fileName": "markdowndoc\\tests\\fixture\\mdchildfolder\\child2.md",
                "html": "<p>#second child from fixrture<\/p>\n",
                "title": "child2"
              }
            ],
            "directories": [
              {
                "path": "markdowndoc\\tests\\fixture\\mdchildfolder\\mdsubchildfolder",
                "files": [
                  {
                    "fileName": "markdowndoc\\tests\\fixture\\mdchildfolder\\mdsubchildfolder\\subchild.md",
                    "html": "<p>#subchild<\/p>\n",
                    "title": "subchild"
                  }
                ],
                "directories": [

                ]
              }
            ]
          }
        ]
      }
    };

    // console.log(createLinkList(ctx, backslashes));
    // expect(theme.repeat('../', 2)).to.equal('../../');
  });
});
