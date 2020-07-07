jQuery(document).ready(function($) {
  console.log("start");

  $("body").on("click", ".lk-header-menu--btn", function() {
    let dSrc = $(this).attr("data-src");
    $.fancybox.open({
      src: dSrc,
      type: "inline",
      baseClass: "mobile-menu-modal",
      touch: false,
      animationEffect: "fade",
      animationDuration: 366,
      transitionEffect: false,
      transitionDuration: 0,
      // opt: {
      // },
      afterClose: function(instance, current) {
        console.log("modal close");
        $("body")
          .find(dSrc)
          .css({ display: "block" });
      },
    });
  });

  //
});
