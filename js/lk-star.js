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

  var priceSlider01 = $("#slider")[0];
  if (priceSlider01) {
    noUiSlider.create(priceSlider01, {
      start: [6000],
      // tooltips: [wNumb({ decimals: 0, suffix: " ₽" })],
      step: 50,
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
    // $($("#slider").data("for")).on("input", function () {
    //   let tE = $(this);
    //   priceSlider01.noUiSlider.set(Number(tE.val()));
    //   clearTimeout(timer);
    //   timer2 = setTimeout(function () {
    //     if (Number(tE.val()) < 100) {
    //       tE.val(100);
    //       priceSlider01.noUiSlider.set(Number(tE.val()));
    //     } else if (Number(tE.val()) > 200000) {
    //       tE.val(200000);
    //       priceSlider01.noUiSlider.set(Number(tE.val()));
    //     }
    //     clearTimeout(timer2);
    //   }, 1000);
    // });
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

  //
});
