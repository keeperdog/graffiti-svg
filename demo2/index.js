var index = {
  _markObj: false,

  _annotations: false,

  _pointer: {
    x: 0,
    y: 0,
  },

  _zoomFactor: 1,

  init: function () {
    this.initEvent();
  },

  initEvent() {
    document
      .getElementById("start")
      .addEventListener("click", this.startMarkUp, false);
    document
      .getElementById("end")
      .addEventListener("click", this.endMarkUp, false);
    document
      .getElementById("save")
      .addEventListener("click", this.saveMarkUp, false);
    document
      .getElementById("reset")
      .addEventListener("click", this.resetMarkUp, false);
  },

  startMarkUp: function () {
    index._markObj = new markPdf({
      type: "new",
      container: $(".img-box"),
      pointToCenter: index._pointer,
      screenBasePoint: index._pointer,
      zoomFactor: index._zoomFactor,
    });

    index._markObj.begin();
  },

  endMarkUp: function () {
    if (!index._markObj) {
      return;
    }

    index._markObj.cancel();
  },

  saveMarkUp: function () {
    if (!index._markObj) {
      return;
    }

    var annotationInfoListWithBox =
      index._markObj.annotation.getAnnotationInfoListWithBox();
    index._annotations = annotationInfoListWithBox.annotations;
  },

  resetMarkUp: function () {
    if (!index._annotations) {
      return;
    }

    index._markObj = new markPdf({
      type: "restore",
      container: $(".img-box"),
      zoomFactor: 1,
    });
    var pointer = {
      x: 0,
      y: 0,
    };
    index._markObj.load(
      index._annotations,
      index._pointer,
      index._pointer,
      index._zoomFactor
    );
  },
};
