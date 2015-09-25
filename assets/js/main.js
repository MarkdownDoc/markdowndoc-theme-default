/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // search only for the entire word 'C#'
 *   // and make sure that the word boundary can also
 *   // be a 'non-word' character, as well as a regex latin1 only boundary:
 *   $('#content').highlight('C#', { wordsOnly: true , wordsBoundary: '[\\b\\W]' });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function (jQuery) {
    jQuery.extend({
        highlight: function (node, re, nodeName, className) {
            if (node.nodeType === 3) {
                var match = node.data.match(re);
                if (match) {
                    // The new highlight Element Node
                    var highlight = document.createElement(nodeName || 'span');
                    highlight.className = className || 'highlight';
                    // Note that we use the captured value to find the real index
                    // of the match. This is because we do not want to include the matching word boundaries
                    var capturePos = node.data.indexOf( match[1] , match.index );

                    // Split the node and replace the matching wordnode
                    // with the highlighted node
                    var wordNode = node.splitText(capturePos);
                    wordNode.splitText(match[1].length);

                    var wordClone = wordNode.cloneNode(true);                    
                    highlight.appendChild(wordClone);
                    wordNode.parentNode.replaceChild(highlight, wordNode);
                    return 1; //skip added node in parent
                }
            } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                    !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                    !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
                for (var i = 0; i < node.childNodes.length; i++) {
                    i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
                }
            }
            return 0;
        }
    });

    jQuery.fn.unhighlight = function (options) {
        var settings = {
          className: 'highlight',
          element: 'span'
        };

        jQuery.extend(settings, options);

        return this.find(settings.element + '.' + settings.className).each(function () {
            var parent = this.parentNode;
            parent.replaceChild(this.firstChild, this);
            parent.normalize();
        }).end();
    };

    jQuery.fn.highlight = function (words, options) {
        var settings = {
          className: 'highlight',
          element: 'span',
          caseSensitive: false,
          wordsOnly: false,
          wordsBoundary: '\\b'
        };

        jQuery.extend(settings, options);
        
        if (typeof words === 'string') {
          words = [words];
        }
        words = jQuery.grep(words, function(word, i){
          return word != '';
        });
        words = jQuery.map(words, function(word, i) {
          return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        });

        if (words.length === 0) {
          return this;
        };

        var flag = settings.caseSensitive ? '' : 'i';
        // The capture parenthesis will make sure we can match
        // only the matching word
        var pattern = '(' + words.join('|') + ')';
        if (settings.wordsOnly) {
            pattern = settings.wordsBoundary + pattern + settings.wordsBoundary;
        }
        var re = new RegExp(pattern, flag);
        
        return this.each(function () {
            jQuery.highlight(this, re, settings.element, settings.className);
        });
    };
}));

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SearchClass = (function ($) {
  var Search = (function () {
    function Search(element) {
      _classCallCheck(this, Search);

      this.element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Search, [{
      key: 'init',
      value: function init(element) {
        var ele = $(element) || this.element;

        var unHighlight = function unHighlight() {
          $('#searchtext').unhighlight({
            wordsOnly: true,
            element: 'mark',
            className: 'highlight'
          });
        };

        var highlight = function highlight() {
          var getText = ele.val();
          getText = getText.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');

          if (getText.length >= 1) {
            $('#searchtext').highlight(getText, {
              wordsOnly: true,
              element: 'mark',
              className: 'highlight'
            });
          } else {
            unHighlight();
          }
        };

        ele.keyup(highlight);
      }

      // static

    }], [{
      key: 'jQueryInterface',
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data('.searchbar-field');

          if (!data) {
            data = new Search(this);
            $(this).data('.searchbar-field', data);
          }

          if (config === 'init') {
            data[config](this);
          }
        });
      }
    }]);

    return Search;
  })();

  $.fn.search = Search.jQueryInterface;
  $.fn.search.Constructor = Search;
  $.fn.search.noConflict = function () {
    return Search.jQueryInterface;
  };

  return Search;
})(jQuery);

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var NavClass = (function ($) {
  var Nav = (function () {
    function Nav(element) {
      _classCallCheck(this, Nav);

      this.element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Nav, [{
      key: 'toggle',
      value: function toggle(element) {
        var ele = $(element) || this.element;

        ele.click(function () {
          $('.sidebar').toggle('fast', function () {
            if ($('.tgl-skewed').is(':checked')) {
              $('.main').removeClass('medium-8 large-9 xlarge-10').addClass('medium-12');
              $('.main .header').css('left', 0);
            } else {
              $('.main').removeClass('medium-12').addClass('medium-8 large-9 xlarge-10');
              $('.main .header').css('left', '');
            }
          });
        });
      }

      // static

    }], [{
      key: 'jQueryInterface',
      value: function jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data('.tgl-btn');

          if (!data) {
            data = new Nav(this);
            $(this).data('.tgl-btn', data);
          }

          if (config === 'toggle') {
            data[config](this);
          }
        });
      }
    }]);

    return Nav;
  })();

  $.fn.nav = Nav.jQueryInterface;
  $.fn.nav.Constructor = Nav;
  $.fn.nav.noConflict = function () {
    return Nav.jQueryInterface;
  };

  return Nav;
})(jQuery);
