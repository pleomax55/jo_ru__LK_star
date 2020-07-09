jQuery(document).ready(function ($) {
  console.log("jQ-Start - LK");

  function setMenuW() {
    $(".lk-menu").css({ minWidth: $("#lk-menu").width() });
  }
  setMenuW();
  $(window).on("resize", setMenuW);

  $("body").on("click", ".lk-header-menu--btn", function () {
    let dSrc = $(this).attr("data-src");
    dSrc
      ? $.fancybox.open({
          src: dSrc,
          type: "inline",
          baseClass: "mobile-menu-modal",
          touch: false,
          animationEffect: "fade",
          animationDuration: 366,
          transitionEffect: false,
          transitionDuration: 0,
          afterClose: function (instance, current) {
            $("body").find(dSrc).css({ display: "block" });
          },
        })
      : 0;
  });

  // *** #slider
  var priceSlider01 = $("#slider")[0];
  if (priceSlider01) {
    noUiSlider.create(priceSlider01, {
      start: [6000],
      step: 100,
      range: {
        min: [100],
        max: [200000],
      },
    });
    var timer, timer2;
    priceSlider01.noUiSlider.on("update", function (value) {
      timer = setTimeout(function () {
        let n = wNumb({ decimals: 0 });
        $($("#slider").data("for"))
          .val(n.from(value[0]) + " ₽")
          .attr("data-value", n.from(value[0]));
      }, 250);
    });
  }
  // *** #slider-2
  var priceSlider02 = $("#slider-2")[0];
  if (priceSlider02) {
    noUiSlider.create(priceSlider02, {
      start: [3000],
      tooltips: [wNumb({ decimals: 0, suffix: " ₽" })],
      step: 100,
      range: {
        min: [100],
        max: [200000],
      },
    });
  }

  if ($(".lk-about--video--player").length) {
    var lkAboutVideo = new Plyr(".lk-about--video--player", {
      loop: {
        active: true,
      },
      controls: false,
      fullscreen: false,
    });
    lkAboutVideo.on("ready", (event) => {
      const instance = event.detail.plyr;
      instance.muted = true;
      instance.play();
    });
  }

  $("body").on("click", ".lk-open-base-modal", function () {
    let dSrc = $(this).attr("data-src");
    dSrc
      ? $.fancybox.open({
          modal: true,
          src: dSrc,
          type: "inline",
          baseClass: "lk-base-modal",
          touch: false,
          animationEffect: "fade",
          animationDuration: 366,
          transitionEffect: false,
          transitionDuration: 0,
          // afterClose: function (instance, current) {
          // },
        })
      : 0;
  });

  //
});
