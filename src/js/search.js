const SearchClass = (($) => {
  class Search {
    constructor(element) {
      this.element = element;
    }

    init(element) {
      const ele = $(element) || this.element;

      const unHighlight = function() {
        $('#searchtext').unhighlight({
          wordsOnly: true,
          element: 'mark',
          className: 'highlight',
        });
      };

      const highlight = function() {
        let getText = ele.val();
        getText     = getText.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');

        if (getText.length >= 1) {
          $('#searchtext').highlight(getText, {
            wordsOnly: true,
            element: 'mark',
            className: 'highlight',
          });
        } else {
          unHighlight();
        }
      };

      ele.keyup(highlight);
    }

    // static

    static jQueryInterface(config) {
      return this.each(function() {
        let data = $(this).data('.searchbar-field');

        if (!data) {
          data = new Search(this);
          $(this).data('.searchbar-field', data);
        }

        if (config === 'init') {
          data[config](this);
        }
      });
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn.search             = Search.jQueryInterface;
  $.fn.search.Constructor = Search;
  $.fn.search.noConflict  = function() {
    return Search.jQueryInterface;
  };

  return Search;
})(jQuery);

export default SearchClass;
