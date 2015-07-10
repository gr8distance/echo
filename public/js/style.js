// Generated by CoffeeScript 1.9.3
(function() {
  $(function() {
    var parallax, parallax_height, parallax_img, w;
    w = $(window);
    parallax = $(".parallax-container");
    parallax_height = parallax.height() * 0.666;
    parallax_img = $(".parallax img");
    return w.scroll(function() {
      var sc;
      sc = $(this).scrollTop();
      if (parallax_height < sc) {
        return parallax_img.addClass("blur");
      } else {
        return parallax_img.removeClass("blur");
      }
    });
  });

}).call(this);
