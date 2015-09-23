const NavClass = (($) => {
  class Nav {
    constructor(element) {
      this.element = element;
    }

    toggle(element) {
      const ele = $(element) || this.element;

      ele.click(function() {
        $('.sidebar').toggle('fast', function() {
          if ($('.tgl-skewed').is(':checked')) {
            $('.main')
            .removeClass('medium-8 large-9 xlarge-10')
            .addClass('medium-12');
            $('.main .header').css('left', 0);
          } else {
            $('.main')
            .removeClass('medium-12')
            .addClass('medium-8 large-9 xlarge-10');
            $('.main .header').css('left', '');
          }
        });
      });
    }

    // static

    static jQueryInterface(config) {
      return this.each(function() {
        let data = $(this).data('.tgl-btn');

        if (!data) {
          data = new Nav(this);
          $(this).data('.tgl-btn', data);
        }

        if (config === 'toggle') {
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

  $.fn.nav             = Nav.jQueryInterface;
  $.fn.nav.Constructor = Nav;
  $.fn.nav.noConflict  = function() {
    return Nav.jQueryInterface;
  };

  return Nav;
})(jQuery);

export default NavClass;
