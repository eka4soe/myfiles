function extend(o, n) {
  var e = Object.getOwnPropertyDescriptor(n.prototype, "constructor");
  n.prototype = Object.create(o.prototype);
  var t = {
      construct: function (e, t) {
        var i = Object.create(n.prototype);
        return this.apply(e, i, t), i;
      },
      apply: function (e, t, i) {
        o.apply(t, i), n.apply(t, i);
      },
    },
    t = new Proxy(n, t);
  return (e.value = t), Object.defineProperty(n.prototype, "constructor", e), t;
}
function debounce(o, n, p) {
  var r;
  return function () {
    var e = this,
      t = arguments,
      i = p && !r;
    clearTimeout(r),
      (r = setTimeout(function () {
        (r = null), p || o.apply(e, t);
      }, n)),
      i && o.apply(e, t);
  };
}
function reveal() {
  API.childWindow.$("[fstack]").each(function (e) {
    this.style = "";
  });
}
function reload_video() {
  API.FrameChain.openFrame(API.FrameChain.currentFrame);
}
function injectoverlay() {
  $("head").append(
    $('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      "https://webmsgr.github.io/edgenuity-skipper/release/skipper.css"
    )
  ),
    $("body").append($('<div id="skipper-overlay" style="">')),
    $("#skipper-overlay").append(
      $('<div id="skipper-text">edgenuity-skipper<br /></div>')
    ),
    $("#skipper-text").append(
      $(
        "<input id='autoplay-checkbox' type='checkbox' onchange='autoplay_checkbox()'></input><label for='autoplay-checkbox'>Autoplay</label><br />"
      )
    ),
    ($("#autoplay-checkbox")[0].checked = !0),
    $("#skipper-text").append(
      $(
        "<input id='intro-skip' type='checkbox' onchange='audio_skip_update(this,\"entry\")'></input><label for='intro-skip'>Skip intro audio</label>"
      )
    ),
    $("#skipper-text").append(
      $(
        "<input id='hint-skip' type='checkbox' onchange='audio_skip_update(this,\"hint\")'></input><label for='hint-skip'>Skip hint audio</label>"
      )
    ),
    $("#skipper-text").append(
      $(
        "<input id='exit-skip' type='checkbox' onchange='audio_skip_update(this,\"exit\")'></input><label for='exit-skip'>Skip exit audio</label><br />"
      )
    ),
    $("#skipper-text").append(
      $("<button id='reveal' onclick='reveal()'>Reveal All</button><br />")
    ),
    $("#skipper-text").append(
      $(
        "<button id='exitoverlay' onclick='overlayoff()'>Exit Overlay</button><br />"
      )
    ),
    $("body").keypress(function (e) {
      "|" == e.key && overlayon();
    });
}
function audio_skip_update(e, t) {
  skipperSettings.skip[t] = e.checked;
}
function audio_blocker() {
  API.Audio.playAudioInner = new Proxy(API.Audio.playAudioInner, {
    apply: function (e, t, i) {
      let o = i[0]
          .split("/")
          .reverse()[0]
          .split(".")[0]
          .split("-")
          .reverse()[0],
        n = !1;
      o.startsWith("hint") && (o = "hint"),
        console.log(o),
        o in skipperSettings.skip && (n = skipperSettings.skip[o]),
        n ? API.Audio.element.trackEnded() : e.apply(t, i);
    },
  });
}
function autoplay_checkbox() {
  API.autoplay = $("#autoplay-checkbox")[0].checked;
}
function overlayoff() {
  $("#skipper-overlay")[0].style = "";
}
function overlayon() {
  $("#skipper-overlay")[0].style = "display: block;";
}
function seekanywhere_limiter(e) {
  var t = document
      .querySelector("#stageFrame")
      .contentWindow.$("#" + API.Video.frameVideoControls.elementIDs.scrubber)
      .parent()
      .offset().left,
    e = e - parseInt(t) - API.Video.frameVideoControls.scrubOffset,
    t = parseInt(
      document
        .querySelector("#stageFrame")
        .contentWindow.$(
          "#" + API.Video.frameVideoControls.elementIDs.progressContainer
        )
        .width()
    );
  return t < e && (e = t), e;
}
function init() {
  null == window.edjskipper
    ? (injectoverlay(),
      audio_blocker(),
      (window.edjskipper = "edgenuity-skipper by wackery"),
      console.log("edgenuity-skipper now active. Version 2"))
    : console.log("already loaded. skipping");
}
(window.API = document.querySelector("#stageFrame").contentWindow.API),
  (window.skipperSettings = {}),
  (skipperSettings.autoplay = !0),
  (skipperSettings.skip = {}),
  (API.Video.videoDone = new Proxy(API.Video.videoDone, {
    apply: debounce(function (e, t, i) {
      e.apply(t, i),
        skipperSettings.autoplay && setTimeout(API.FrameChain.nextFrame, 100);
    }, 100),
  })),
  init();
//# sourceMappingURL=https://webmsgr.github.io/edgenuity-skipper/release/skipper.min.js.map
