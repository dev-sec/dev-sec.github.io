(function() {
  'use strict';
  $(document).ready(function() {
    var resize;
    $(document).foundation({
      equalizer: {
        equalize_on_stack: true
      }
    });
    resize = function() {
      var h, h_elem, w;
      w = $(window).width();
      h = $(window).height();
      h_elem = (h * 1.1) + "px";
      if (w > (1.5 * 650)) {
        console.log("resize -portrait (" + w + " -- " + h + ")");
        return $("#landing-bg").removeClass("portrait");
      } else {
        console.log("resize +portrait");
        return $("#landing-bg").addClass("portrait");
      }
    };
    $(window).resize(function() {
      return resize();
    });
    return resize();
  });
}).call(this);
