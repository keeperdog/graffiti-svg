// Autor: @孔德胜
// Date：2022-02-19

var CLOUD = CLOUD || {};

CLOUD.Version2D = "20220219";

CLOUD.DomUtil = CLOUD.DomUtil || {
  splitStr: function (str) {
    return str.trim().split(/\s+/g);
  },

  getContainerOffsetToClient: function (domElement) {
    var offsetObj;

    var getOffsetSum = function (ele) {
      var top = 0,
        left = 0;

      while (ele) {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
      }

      var body = document.body,
        docElem = document.documentElement;

      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft =
          window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

      top -= scrollTop;
      left -= scrollLeft;

      return {
        top: top,
        left: left,
      };
    };

    var getOffsetRect = function (ele) {
      var box = ele.getBoundingClientRect();
      var body = document.body,
        docElem = document.documentElement;

      var clientTop = docElem.clientTop || body.clientTop,
        clientLeft = docElem.clientLeft || body.clientLeft;
      var top = box.top - clientTop,
        left = box.left - clientLeft;

      return {
        //Math.round 兼容火狐浏览器bug
        top: Math.round(top),
        left: Math.round(left),
      };
    };

    //获取元素相对于页面的偏移
    var getOffset = function (ele) {
      if (ele.getBoundingClientRect) {
        return getOffsetRect(ele);
      } else {
        return getOffsetSum(ele);
      }
    };

    if (domElement != document) {
      var offsetV = getOffset(domElement);

      offsetObj = {
        width: domElement.offsetWidth,
        height: domElement.offsetHeight,
        left: offsetV.left,
        top: offsetV.top,
      };
    } else {
      offsetObj = {
        width: window.innerWidth,
        height: window.innerHeight,
        left: 0,
        top: 0,
      };
    }

    return offsetObj;
  },

  /**
   * set css class name
   * @param {String} id
   * @param {String} cssName
   * @returns
   */
  setClassName: function (id, cssName) {
    var dom = document.getElementById(id);
    if (dom) {
      dom.className = cssName;
    }
  },

  /**
   * add css class name
   * @param {String} id
   * @param {String} cssName
   * @returns
   */
  addClassName: function (id, cssName) {
    var a, b, c;
    var i, j;
    var s = /\s+/;
    var dom = document.getElementById(id);
    if (dom) {
      b = dom;

      if (cssName && typeof cssName == "string") {
        a = cssName.split(s);

        // 如果节点是元素节点，则 nodeType 属性将返回 1。
        // 如果节点是属性节点，则 nodeType 属性将返回 2。
        if (b.nodeType === 1) {
          if (!b.className && a.length === 1) {
            b.className = cssName;
          } else {
            c = " " + b.className + " ";

            for (i = 0, j = a.length; i < j; ++i) {
              c.indexOf(" " + a[i] + " ") < 0 && (c += a[0] + " ");
            }

            b.className = String.trim(c);
          }
        }
      }
    }
  },

  /**
   * remove css class name
   * @param {String} id
   * @param {String} cssName
   * @returns
   */
  removeClassName: function (id, className) {
    var a, b, c;
    var i, j;
    var s = /\s+/;
    var dom = document.getElementById(id);
    if (dom) {
      c = dom;

      if (className && typeof className == "string") {
        a = (className || "").split(s);

        if (c.nodeType === 1 && c.className) {
          b = (" " + c.className + " ").replace(O, " ");
          for (i = 0, j = a.length; i < j; i++) {
            while (b.indexOf(" " + a[i] + " ") >= 0) {
              b = b.replace(" " + a[i] + " ", " ");
            }
          }
          c.className = className ? String.trim(b) : "";
        }
      }
    }
  },

  /**
   * show or hide element
   * @param {String} id
   * @param {Boolean} isShow
   * @returns
   */
  showOrHideElement: function (id, isShow) {
    var dom = document.getElementById(id);
    if (dom) {
      if (isShow) {
        dom.style.display = "";
      } else {
        dom.style.display = "none";
      }
    }
  },
  getStyleString: function (style) {
    var elements = [];

    for (var key in style) {
      var val = style[key];

      elements.push(key);
      elements.push(":");
      elements.push(val);
      elements.push("; ");
    }

    return elements.join("");
  },
  cloneStyle: function (style) {
    var clone = {};

    for (var key in style) {
      clone[key] = style[key];
    }

    return clone;
  },
  removeStyleAttribute: function (style, attrs) {
    if (!Array.isArray(attrs)) {
      attrs = [attrs];
    }

    attrs.forEach(function (key) {
      if (key in style) {
        delete style[key];
      }
    });
  },
  trimRight: function (text) {
    if (text.length === 0) {
      return "";
    }

    var lastNonSpace = text.length - 1;

    for (var i = lastNonSpace; i >= 0; --i) {
      if (text.charAt(i) !== " ") {
        lastNonSpace = i;
        break;
      }
    }

    return text.substr(0, lastNonSpace + 1);
  },
  trimLeft: function (text) {
    if (text.length === 0) {
      return "";
    }

    var firstNonSpace = 0;

    for (var i = 0; i < text.length; ++i) {
      if (text.charAt(i) !== " ") {
        firstNonSpace = i;
        break;
      }
    }

    return text.substr(firstNonSpace);
  },
  matchesSelector: function (domElem, selector) {
    if (domElem.matches) {
      return domElem.matches(selector);
    }

    if (domElem.matchesSelector) {
      return domElem.matchesSelector(selector);
    }

    if (domElem.webkitMatchesSelector) {
      return domElem.webkitMatchesSelector(selector);
    }

    if (domElem.msMatchesSelector) {
      return domElem.msMatchesSelector(selector);
    }

    if (domElem.mozMatchesSelector) {
      return domElem.mozMatchesSelector(selector);
    }

    if (domElem.oMatchesSelector) {
      return domElem.oMatchesSelector(selector);
    }

    if (domElem.querySelectorAll) {
      var matches = (
          domElem.document || domElem.ownerDocument
        ).querySelectorAll(selector),
        i = 0;

      while (matches[i] && matches[i] !== element) i++;

      return matches[i] ? true : false;
    }

    return false;
  },
  toTranslate3d: function (x, y) {
    return "translate3d(" + x + "px," + y + "px,0)";
  },
  setCursorStyle: function (element, direction) {
    var cursor;

    switch (direction) {
      case "n":
      case "s":
        cursor = "ns-resize";
        break;
      case "w":
      case "e":
        cursor = "ew-resize";
        break;
      case "ne":
      case "sw":
        cursor = "nesw-resize";
        break;
      case "nw":
      case "se":
        cursor = "nwse-resize";
        break;
    }

    element.style.cursor = cursor;
  },
};
/**
 * @require three.js
 * @require WebViewer.js
 */
CLOUD.Extensions = CLOUD.Extensions || {};
CLOUD.Extensions.Utils = CLOUD.Extensions.Utils || {};

CLOUD.Extensions.Utils.Shape2D = {
  createSvgElement: function (type) {
    var xmlns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(xmlns, type);
    svg.setAttribute("pointer-events", "inherit");

    return svg;
  },
  getRGBAString: function (hexRGBString, opacity) {
    if (opacity <= 0) {
      return "none";
    }

    var rgba = [
      "rgba(" + parseInt("0x" + hexRGBString.substr(1, 2)),
      ",",
      parseInt("0x" + hexRGBString.substr(3, 2)),
      ",",
      parseInt("0x" + hexRGBString.substr(5, 2)),
      ",",
      opacity,
      ")",
    ].join("");

    return rgba;
  },
};
// 从这里才开始启动注释
CLOUD.Extensions.Annotation = function (editor, id) {
  this.editor = editor;
  this.id = id;
  this.shapeType = 0;

  this.position = {
    x: 0,
    y: 0,
    z: 0,
  };
  this.size = {
    width: 0,
    height: 0,
  };
  this.rotation = 0;

  this.style = editor.annotationStyle
    ? CLOUD.DomUtil.cloneStyle(editor.annotationStyle)
    : this.getDefaultStyle();
  this.shape = null;
  this.selected = false;
  this.highlighted = false;
  this.highlightColor = "#FAFF3C";
  this.isDisableInteractions = false;
  this.disableResizeWidth = false;
  this.disableResizeHeight = false;
  this.disableRotation = false;

  this.onMouseDownBinded = this.onMouseDown.bind(this);
  this.onMouseOutBinded = this.onMouseOut.bind(this);
  this.onMouseOverBinded = this.onMouseOver.bind(this);
};

CLOUD.Extensions.Annotation.prototype = {
  constructor: CLOUD.Extensions.Annotation,

  addDomEventListeners: function () {},

  removeDomEventListeners: function () {},

  onMouseDown: function (event) {
    if (this.isDisableInteractions) {
      return;
    }

    this.select();

    if (this.editor.annotationFrame) {
      this.editor.annotationFrame.dragBegin(event);
    }
  },

  onMouseOut: function () {
    this.highlight(false);
  },

  onMouseOver: function () {
    this.highlight(true);
  },

  created: function () {},

  destroy: function () {
    this.removeDomEventListeners();
    this.deselect();
    this.setParent(null);
  },

  set: function (position, size, rotation) {
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;
    this.size.width = size.width;
    this.size.height = size.height;
    this.rotation = rotation || 0;

    this.update();
  },

  // 设置旋转角（弧度）
  resetRotation: function (angle) {
    this.rotation = angle;
    this.update();
  },

  // 获得旋转角（弧度）
  getRotation: function () {
    return this.rotation;
  },

  // 设置位置
  resetPosition: function (position) {
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;
    this.update();
  },

  getClientPosition: function () {
    return this.editor.getAnnotationClientPosition(this.position);
  },

  resetSize: function (size, position) {
    this.size.width = size.width;
    this.size.height = size.height;
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;
    this.update();
  },

  getClientSize: function () {
    return this.editor.getAnnotationClientSize(this.size, this.position);
  },

  setParent: function (parent) {
    var shapeEl = this.shape;

    if (shapeEl.parentNode) {
      shapeEl.parentNode.removeChild(shapeEl);
    }

    if (parent) {
      parent.appendChild(shapeEl);
    }
  },

  setStyle: function (style) {
    this.style = CLOUD.DomUtil.cloneStyle(style);
    // 文本批注需要传入一个强制更新的参数
    this.update(true);
  },

  getStyle: function () {
    return CLOUD.DomUtil.cloneStyle(this.style);
  },

  updateStyle: function (style) {
    this.style = CLOUD.DomUtil.cloneStyle(style);
    // 文本批注需要传入一个强制更新的参数
    this.update(true);
  },

  update: function () {},

  select: function () {
    if (this.selected) {
      return;
    }

    this.selected = true;
    this.highlighted = false;
    this.update();

    this.editor.selectAnnotation(this);
  },

  deselect: function () {
    this.selected = false;
  },

  highlight: function (isHighlight) {
    if (this.isDisableInteractions) {
      return;
    }

    this.highlighted = isHighlight;
    this.update();
  },

  disableInteractions: function (disable) {
    this.isDisableInteractions = disable;
  },

  delete: function () {
    this.editor.deleteAnnotation(this);
  },

  getDefaultStyle: function () {
    var style = {};

    style["stroke-width"] = 3;
    style["stroke-color"] = "#ff0000";
    style["stroke-opacity"] = 1.0;
    style["fill-color"] = "#ff0000";
    style["fill-opacity"] = 0.0;
    style["font-family"] = "Arial";
    style["font-size"] = 16;
    style["font-style"] = ""; // 'italic'
    style["font-weight"] = ""; // 'bold'

    return style;
  },
};

CLOUD.Extensions.Annotation.shapeTypes = {
  ARROW: 0,
  RECTANGLE: 1,
  CIRCLE: 2,
  CLOUD: 4,
  TEXT: 5,
};
CLOUD.Extensions.AnnotationArrow = function (editor, id) {
  CLOUD.Extensions.Annotation.call(this, editor, id);

  this.shapeType = CLOUD.Extensions.Annotation.shapeTypes.ARROW;
  this.head = new THREE.Vector2();
  this.tail = new THREE.Vector2();
  this.disableResizeHeight = true;
  this.size.height = this.style["stroke-width"] * 4; // 箭头固定高度

  this.createShape();
  this.addDomEventListeners();
};

CLOUD.Extensions.AnnotationArrow.prototype = Object.create(
  CLOUD.Extensions.Annotation.prototype
);
CLOUD.Extensions.AnnotationArrow.prototype.constructor =
  CLOUD.Extensions.AnnotationArrow;

CLOUD.Extensions.AnnotationArrow.prototype.addDomEventListeners = function () {
  var that = this;

  this.shape.addEventListener(
    "touchstart",
    function (event) {
      CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
    },
    true
  );

  this.shape.addEventListener("mousedown", this.onMouseDownBinded, true);
  this.shape.addEventListener("mouseout", this.onMouseOutBinded);
  this.shape.addEventListener("mouseover", this.onMouseOverBinded);
};

CLOUD.Extensions.AnnotationArrow.prototype.removeDomEventListeners =
  function () {
    var that = this;
    this.shape.removeEventListener(
      "touchstart",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
      },
      true
    );

    this.shape.removeEventListener("mousedown", this.onMouseDownBinded, true);
    this.shape.removeEventListener("mouseout", this.onMouseOutBinded);
    this.shape.removeEventListener("mouseover", this.onMouseOverBinded);
  };

CLOUD.Extensions.AnnotationArrow.prototype.createShape = function () {
  this.shape = CLOUD.Extensions.Utils.Shape2D.createSvgElement("polygon");
};

CLOUD.Extensions.AnnotationArrow.prototype.setByTailHead = function (
  tail,
  head
) {
  var v0 = new THREE.Vector2(tail.x, tail.y);
  var v1 = new THREE.Vector2(head.x, head.y);
  var dir = v1.clone().sub(v0).normalize();

  // 计算尺寸
  this.size.width = v0.distanceTo(v1);

  // 计算旋转角度
  this.rotation = Math.acos(dir.dot(new THREE.Vector2(1, 0)));
  this.rotation = head.y > tail.y ? Math.PI * 2 - this.rotation : this.rotation;

  this.tail.set(tail.x, tail.y);
  this.head.set(head.x, head.y);

  var depth = tail.z;

  this.position.x = 0.5 * (this.head.x + this.tail.x);
  this.position.y = 0.5 * (this.head.y + this.tail.y);
  this.position.z = depth;

  this.update();
};

CLOUD.Extensions.AnnotationArrow.prototype.getClientSize = function () {
  var size = this.editor.getAnnotationClientSize(this.size, this.position);
  size.height = this.style["stroke-width"] * 4;

  return size;
};

CLOUD.Extensions.AnnotationArrow.prototype.resetSize = function (
  size,
  position
) {
  var dir = new THREE.Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
  dir.multiplyScalar(size.width * 0.5);

  var center = new THREE.Vector2(position.x, position.y);
  var tail = center.clone().sub(dir);
  var head = center.clone().add(dir);

  this.tail.set(tail.x, tail.y);
  this.head.set(head.x, head.y);

  this.position.x = position.x;
  this.position.y = position.y;
  this.position.z = position.z;

  this.size.width = size.width;

  this.update();
};

CLOUD.Extensions.AnnotationArrow.prototype.resetPosition = function (position) {
  var dx = this.head.x - this.tail.x;
  var dy = this.head.y - this.tail.y;

  this.tail.x = position.x - dx * 0.5;
  this.tail.y = position.y - dy * 0.5;
  this.head.x = this.tail.x + dx;
  this.head.y = this.tail.y + dy;

  this.position.x = position.x;
  this.position.y = position.y;
  this.position.z = position.z;

  this.update();
};

CLOUD.Extensions.AnnotationArrow.prototype.update = function () {
  var strokeColor = this.highlighted
    ? this.highlightColor
    : this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];

  var shapePoints = this.getShapePoints();
  var mappedPoints = shapePoints.map(function (point) {
    return point[0] + "," + point[1];
  });
  var pointsStr = mappedPoints.join(" ");
  var position = this.getClientPosition();
  var size = this.getClientSize();
  var offsetX = 0.5 * size.width;
  var offsetY = 0.5 * size.height;

  this.transformShape = [
    "translate(",
    position.x,
    ",",
    position.y,
    ") ",
    "rotate(",
    THREE.Math.radToDeg(this.rotation),
    ") ",
    "translate(",
    -offsetX,
    ",",
    -offsetY,
    ") ",
  ].join("");

  this.shape.setAttribute("points", pointsStr);
  this.shape.setAttribute("transform", this.transformShape);
  this.shape.setAttribute("fill", strokeColor);
  this.shape.setAttribute("opacity", strokeOpacity);
};

CLOUD.Extensions.AnnotationArrow.prototype.getShapePoints = function () {
  var strokeWidth = this.style["stroke-width"] * 2;
  var size = this.getClientSize();
  var halfLen = size.width * 0.5;
  var thickness = strokeWidth;
  var halfThickness = strokeWidth * 0.5;
  var headLen = halfLen - 2.0 * thickness;

  var p1 = [-halfLen, -halfThickness];
  var p2 = [headLen, -halfThickness];
  var p3 = [headLen, -thickness];
  var p4 = [halfLen, 0];
  var p5 = [headLen, thickness];
  var p6 = [headLen, halfThickness];
  var p7 = [-halfLen, halfThickness];

  var points = [p1, p2, p3, p4, p5, p6, p7];

  points.forEach(function (point) {
    point[0] += halfLen;
    point[1] += thickness;
  });

  return points;
};

CLOUD.Extensions.AnnotationArrow.prototype.renderToCanvas = function (ctx) {
  var strokeWidth = this.style["stroke-width"] * 2;
  var strokeColor = this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];

  var position = this.getClientPosition();
  var size = this.getClientSize();
  var offsetX = size.width * 0.5;
  var offsetY = strokeWidth;

  var m1 = new THREE.Matrix4().makeTranslation(-offsetX, -offsetY, 0);
  var m2 = new THREE.Matrix4().makeRotationZ(this.rotation);
  var m3 = new THREE.Matrix4().makeTranslation(position.x, position.y, 0);
  var transform = m3.multiply(m2).multiply(m1);

  var points = this.getShapePoints();

  ctx.fillStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    strokeColor,
    strokeOpacity
  );
  ctx.beginPath();

  points.forEach(function (point) {
    var client = new THREE.Vector3(point[0], point[1], 0);
    client.applyMatrix4(transform);
    ctx.lineTo(client.x, client.y);
  });

  ctx.fill();
};

CLOUD.Extensions.AnnotationRectangle = function (editor, id) {
  CLOUD.Extensions.Annotation.call(this, editor, id);

  this.shapeType = CLOUD.Extensions.Annotation.shapeTypes.RECTANGLE;

  this.createShape();
  this.addDomEventListeners();
};

CLOUD.Extensions.AnnotationRectangle.prototype = Object.create(
  CLOUD.Extensions.Annotation.prototype
);
CLOUD.Extensions.AnnotationRectangle.prototype.constructor =
  CLOUD.Extensions.AnnotationRectangle;

CLOUD.Extensions.AnnotationRectangle.prototype.addDomEventListeners =
  function () {
    var that = this;
    this.shape.addEventListener(
      "touchstart",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
      },
      true
    );

    this.shape.addEventListener("mousedown", this.onMouseDownBinded, true);
    this.shape.addEventListener("mouseout", this.onMouseOutBinded);
    this.shape.addEventListener("mouseover", this.onMouseOverBinded);
  };

CLOUD.Extensions.AnnotationRectangle.prototype.removeDomEventListeners =
  function () {
    var that = this;
    this.shape.removeEventListener(
      "touchstart",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
      },
      true
    );

    this.shape.removeEventListener("mousedown", this.onMouseDownBinded, true);
    this.shape.removeEventListener("mouseout", this.onMouseOutBinded);
    this.shape.removeEventListener("mouseover", this.onMouseOverBinded);
  };

CLOUD.Extensions.AnnotationRectangle.prototype.createShape = function () {
  this.shape = CLOUD.Extensions.Utils.Shape2D.createSvgElement("rect");
};

CLOUD.Extensions.AnnotationRectangle.prototype.update = function () {
  var strokeWidth = this.style["stroke-width"];
  var strokeColor = this.highlighted
    ? this.highlightColor
    : this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];
  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];

  var position = this.getClientPosition();
  var size = this.getClientSize();
  var width = Math.max(size.width - strokeWidth, 0);
  var height = Math.max(size.height - strokeWidth, 0);
  var offsetX = 0.5 * width;
  var offsetY = 0.5 * height;

  this.transformShape = [
    "translate(",
    position.x,
    ",",
    position.y,
    ") ",
    "rotate(",
    THREE.Math.radToDeg(this.rotation),
    ") ",
    "translate(",
    -offsetX,
    ",",
    -offsetY,
    ") ",
  ].join("");

  this.shape.setAttribute("transform", this.transformShape);
  this.shape.setAttribute("stroke-width", strokeWidth);
  this.shape.setAttribute(
    "stroke",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(strokeColor, strokeOpacity)
  );
  this.shape.setAttribute(
    "fill",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(fillColor, fillOpacity)
  );
  this.shape.setAttribute("width", width + "");
  this.shape.setAttribute("height", height + "");
};

CLOUD.Extensions.AnnotationRectangle.prototype.renderToCanvas = function (ctx) {
  var strokeWidth = this.style["stroke-width"];
  var strokeColor = this.highlighted
    ? this.highlightColor
    : this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];
  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];

  var size = this.getClientSize();
  var position = this.getClientPosition();
  var width = Math.max(size.width - strokeWidth, 0);
  var height = Math.max(size.height - strokeWidth, 0);

  ctx.strokeStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    strokeColor,
    strokeOpacity
  );
  ctx.fillStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    fillColor,
    fillOpacity
  );
  ctx.lineWidth = strokeWidth;
  ctx.translate(position.x, position.y);
  ctx.rotate(this.rotation);

  ctx.beginPath();

  if (fillOpacity !== 0) {
    ctx.fillRect(width / -2, height / -2, width, height);
  }

  ctx.strokeRect(width / -2, height / -2, width, height);
};

CLOUD.Extensions.AnnotationCircle = function (editor, id) {
  CLOUD.Extensions.Annotation.call(this, editor, id);

  this.shapeType = CLOUD.Extensions.Annotation.shapeTypes.CIRCLE;

  this.createShape();
  this.addDomEventListeners();
};

CLOUD.Extensions.AnnotationCircle.prototype = Object.create(
  CLOUD.Extensions.Annotation.prototype
);
CLOUD.Extensions.AnnotationCircle.prototype.constructor =
  CLOUD.Extensions.AnnotationCircle;

CLOUD.Extensions.AnnotationCircle.prototype.addDomEventListeners = function () {
  var that = this;
  this.shape.addEventListener(
    "touchstart",
    function (event) {
      CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
    },
    true
  );

  this.shape.addEventListener("mousedown", this.onMouseDownBinded, true);
  this.shape.addEventListener("mouseout", this.onMouseOutBinded);
  this.shape.addEventListener("mouseover", this.onMouseOverBinded);
};

CLOUD.Extensions.AnnotationCircle.prototype.removeDomEventListeners =
  function () {
    var that = this;
    this.shape.removeEventListener(
      "touchstart",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
      },
      true
    );

    this.shape.removeEventListener("mousedown", this.onMouseDownBinded, true);
    this.shape.removeEventListener("mouseout", this.onMouseOutBinded);
    this.shape.removeEventListener("mouseover", this.onMouseOverBinded);
  };

CLOUD.Extensions.AnnotationCircle.prototype.createShape = function () {
  this.shape = CLOUD.Extensions.Utils.Shape2D.createSvgElement("ellipse");
};

CLOUD.Extensions.AnnotationCircle.prototype.update = function () {
  var strokeWidth = this.style["stroke-width"];
  var strokeColor = this.highlighted
    ? this.highlightColor
    : this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];
  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];

  var position = this.getClientPosition();
  var size = this.getClientSize();
  var offsetX = Math.max(size.width - strokeWidth, 0) * 0.5;
  var offsetY = Math.max(size.height - strokeWidth, 0) * 0.5;

  this.transformShape = [
    "translate(",
    position.x,
    ",",
    position.y,
    ") ",
    "rotate(",
    THREE.Math.radToDeg(this.rotation),
    ") ",
    "translate(",
    -offsetX,
    ",",
    -offsetY,
    ") ",
  ].join("");

  this.shape.setAttribute("transform", this.transformShape);
  this.shape.setAttribute("stroke-width", strokeWidth);
  this.shape.setAttribute(
    "stroke",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(strokeColor, strokeOpacity)
  );
  this.shape.setAttribute(
    "fill",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(fillColor, fillOpacity)
  );
  this.shape.setAttribute("cx", offsetX);
  this.shape.setAttribute("cy", offsetY);
  this.shape.setAttribute("rx", offsetX);
  this.shape.setAttribute("ry", offsetY);
};

CLOUD.Extensions.AnnotationCircle.prototype.renderToCanvas = function (ctx) {
  function ellipse(ctx, cx, cy, w, h) {
    ctx.beginPath();

    var lx = cx - w / 2,
      rx = cx + w / 2,
      ty = cy - h / 2,
      by = cy + h / 2;

    var magic = 0.551784;
    var xmagic = (magic * w) / 2;
    var ymagic = (magic * h) / 2;

    ctx.moveTo(cx, ty);
    ctx.bezierCurveTo(cx + xmagic, ty, rx, cy - ymagic, rx, cy);
    ctx.bezierCurveTo(rx, cy + ymagic, cx + xmagic, by, cx, by);
    ctx.bezierCurveTo(cx - xmagic, by, lx, cy + ymagic, lx, cy);
    ctx.bezierCurveTo(lx, cy - ymagic, cx - xmagic, ty, cx, ty);
    ctx.stroke();
  }

  var strokeWidth = this.style["stroke-width"];
  var strokeColor = this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];
  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];

  var position = this.getClientPosition();
  var size = this.getClientSize();
  var width = Math.max(size.width - strokeWidth, 0);
  var height = Math.max(size.height - strokeWidth, 0);

  ctx.strokeStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    strokeColor,
    strokeOpacity
  );
  ctx.fillStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    fillColor,
    fillOpacity
  );
  ctx.lineWidth = strokeWidth;
  ctx.translate(position.x, position.y);
  ctx.rotate(this.rotation);

  //ctx.beginPath();

  ellipse(ctx, 0, 0, width, height);

  if (fillOpacity !== 0) {
    ctx.fill();
  }

  //ctx.stroke();
};
CLOUD.Extensions.AnnotationCloud = function (editor, id) {
  CLOUD.Extensions.Annotation.call(this, editor, id);

  this.shapeType = CLOUD.Extensions.Annotation.shapeTypes.CLOUD;
  this.shapePoints = [];
  this.trackingPoint = {
    x: 0,
    y: 0,
  };
  this.isSeal = false; // 是否封口
  this.isTracking = false;
  this.isEnableTrack = false;
  this.originSize = {
    width: 1,
    height: 1,
  };
  this.viewBox = {
    width: 1000,
    height: 1000,
  };

  this.createShape();
  this.addDomEventListeners();
};

CLOUD.Extensions.AnnotationCloud.prototype = Object.create(
  CLOUD.Extensions.Annotation.prototype
);
CLOUD.Extensions.AnnotationCloud.prototype.constructor =
  CLOUD.Extensions.AnnotationCloud;

CLOUD.Extensions.AnnotationCloud.prototype.addDomEventListeners = function () {
  var that = this;
  this.shape.addEventListener(
    "touchstart",
    function (event) {
      CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
    },
    true
  );

  this.shape.addEventListener("mousedown", this.onMouseDownBinded, true);
  this.shape.addEventListener("mouseout", this.onMouseOutBinded);
  this.shape.addEventListener("mouseover", this.onMouseOverBinded);
};

CLOUD.Extensions.AnnotationCloud.prototype.removeDomEventListeners =
  function () {
    var that = this;
    this.shape.removeEventListener(
      "touchstart",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
      },
      true
    );

    this.shape.removeEventListener("mousedown", this.onMouseDownBinded, true);
    this.shape.removeEventListener("mouseout", this.onMouseOutBinded);
    this.shape.removeEventListener("mouseover", this.onMouseOverBinded);
  };

CLOUD.Extensions.AnnotationCloud.prototype.createShape = function () {
  this.shape = CLOUD.Extensions.Utils.Shape2D.createSvgElement("path");
};

CLOUD.Extensions.AnnotationCloud.prototype.setByPositions = function (
  positions,
  isSeal
) {
  this.positions = positions.concat();

  this.isSeal = isSeal || false;

  // 计算位置及大小
  this.calculatePosition(true);

  this.originSize.width = this.size.width === 0 ? 1 : this.size.width;
  this.originSize.height = this.size.height === 0 ? 1 : this.size.height;

  this.update();
};

CLOUD.Extensions.AnnotationCloud.prototype.set = function (
  position,
  size,
  rotation,
  shapePointsStr,
  originSize
) {
  this.position.x = position.x;
  this.position.y = position.y;
  this.position.z = position.z;
  this.size.width = size.width;
  this.size.height = size.height;
  this.rotation = rotation || 0;

  if (originSize) {
    this.originSize.width = originSize.width === 0 ? 1 : originSize.width;
    this.originSize.height = originSize.height === 0 ? 1 : originSize.height;
  } else {
    this.originSize.width = this.size.width === 0 ? 1 : this.size.width;
    this.originSize.height = this.size.height === 0 ? 1 : this.size.height;
  }

  this.setShapePoints(shapePointsStr);

  this.update();
};

CLOUD.Extensions.AnnotationCloud.prototype.setTrackingPoint = function (point) {
  this.trackingPoint.x = point.x;
  this.trackingPoint.y = point.y;

  this.calculatePosition(false);

  this.update();
};

CLOUD.Extensions.AnnotationCloud.prototype.update = function () {
  if (this.shapePoints.length < 1) return;

  var shapePathStr = this.getPathString();
  var strokeWidth = this.style["stroke-width"];
  var strokeColor = this.highlighted
    ? this.highlightColor
    : this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];
  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];

  this.shape.setAttribute("stroke-width", strokeWidth);
  this.shape.setAttribute(
    "stroke",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(strokeColor, strokeOpacity)
  );
  this.shape.setAttribute(
    "fill",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(fillColor, fillOpacity)
  );
  this.shape.setAttribute("d", shapePathStr);
};

CLOUD.Extensions.AnnotationCloud.prototype.worldToViewBox = function (wPoint) {
  var originWidth = this.originSize.width;
  var originHeight = this.originSize.height;
  var viewBoxWidth = this.viewBox.width;
  var viewBoxHeight = this.viewBox.height;
  var x = Math.floor((wPoint.x / originWidth) * viewBoxWidth + 0.5);
  var y = Math.floor((wPoint.y / originHeight) * viewBoxHeight + 0.5);

  return {
    x: x,
    y: y,
  };
};

CLOUD.Extensions.AnnotationCloud.prototype.viewBoxToWorld = function (vPoint) {
  var originWidth = this.originSize.width;
  var originHeight = this.originSize.height;
  var viewBoxWidth = this.viewBox.width;
  var viewBoxHeight = this.viewBox.height;
  var x = (vPoint.x / viewBoxWidth) * originWidth;
  var y = (vPoint.y / viewBoxHeight) * originHeight;

  return {
    x: x,
    y: y,
  };
};

CLOUD.Extensions.AnnotationCloud.prototype.getPathString = function () {
  //var path = this.shapePoints.map(function(point, i){
  //    if (i === 0) {
  //        return ['M'].concat([point.x, point.y]).join(' ');
  //    } else {
  //        return ['Q'].concat([point.cx, point.cy, point.x, point.y ]).join(' ');
  //    }
  //}).join(' ');
  //
  //if (this.isSeal) {

  //    path += 'Z';
  //}
  //
  //return path;

  var scaleX = this.size.width / this.originSize.width;
  var scaleY = this.size.height / this.originSize.height;

  var m0 = new THREE.Matrix4().makeScale(scaleX, scaleY, 1);
  var m1 = new THREE.Matrix4().makeRotationZ(-this.rotation);
  var m2 = new THREE.Matrix4().makeTranslation(
    this.position.x,
    this.position.y,
    this.position.z
  );
  var transform = m2.multiply(m1).multiply(m0);

  var scope = this;
  var pos = new THREE.Vector3();
  var x, y, cx, cy;

  var path = this.shapePoints
    .map(function (point, i) {
      if (i === 0) {
        pos.x = point.x;
        pos.y = point.y;
        pos.z = 0;
        pos.applyMatrix4(transform);
        pos = scope.editor.worldToClient(pos);
        x = pos.x;
        y = pos.y;

        return ["M"].concat([x, y]).join(" ");
      } else {
        pos.x = point.cx;
        pos.y = point.cy;
        pos.z = 0;
        pos.applyMatrix4(transform);
        pos = scope.editor.worldToClient(pos);
        cx = pos.x;
        cy = pos.y;

        pos.x = point.x;
        pos.y = point.y;
        pos.z = 0;
        pos.applyMatrix4(transform);
        pos = scope.editor.worldToClient(pos);
        x = pos.x;
        y = pos.y;

        return ["Q"].concat([cx, cy, x, y]).join(" ");
      }
    })
    .join(" ");

  if (this.isSeal) {
    path += "Z";
  }

  return path;
};

// 计算控制点
CLOUD.Extensions.AnnotationCloud.prototype.getControlPoint = function (
  startPoint,
  endPoint
) {
  var start = new THREE.Vector2(startPoint.x, startPoint.y);
  var end = new THREE.Vector2(endPoint.x, endPoint.y);
  var direction = end.clone().sub(start);
  var halfLen = 0.5 * direction.length();
  var centerX = 0.5 * (start.x + end.x);
  var centerY = 0.5 * (start.y + end.y);
  var center = new THREE.Vector2(centerX, centerY);

  direction.normalize();
  direction.rotateAround(new THREE.Vector2(0, 0), 0.5 * Math.PI);
  direction.multiplyScalar(halfLen);
  center.add(direction);

  return {
    x: center.x,
    y: center.y,
  };
};

CLOUD.Extensions.AnnotationCloud.prototype.getBoundingBox = function () {
  var box = new THREE.Box2();
  var point = new THREE.Vector2();

  for (var i = 0, len = this.shapePoints.length; i < len; i++) {
    if (i === 0) {
      point.set(this.shapePoints[i].x, this.shapePoints[i].y);
      box.expandByPoint(point);
    } else {
      point.set(this.shapePoints[i].cx, this.shapePoints[i].cy);
      box.expandByPoint(point);

      point.set(this.shapePoints[i].x, this.shapePoints[i].y);
      box.expandByPoint(point);
    }
  }

  return box;
};

CLOUD.Extensions.AnnotationCloud.prototype.calculateShapePath = function () {
  var originShapePoint = {};
  var currentShapePoint = {};
  var lastShapePoint = {};
  var controlPoint;

  var len = this.positions.length;
  this.shapePoints = [];

  if (len < 1) {
    return;
  }

  // 保存深度
  this.depth = this.positions[0].z || 0;

  if (len === 1) {
    currentShapePoint.x = this.positions[0].x;
    currentShapePoint.y = this.positions[0].y;

    this.shapePoints.push({
      x: this.positions[0].x,
      y: this.positions[0].y,
    });

    if (this.isTracking) {
      // 计算控制点
      controlPoint = this.getControlPoint(
        currentShapePoint,
        this.trackingPoint
      );

      this.shapePoints.push({
        cx: controlPoint.x,
        cy: controlPoint.y,
        x: this.trackingPoint.x,
        y: this.trackingPoint.y,
      });
    }
  } else {
    for (var i = 0; i < len; i++) {
      currentShapePoint.x = this.positions[i].x;
      currentShapePoint.y = this.positions[i].y;

      if (i === 0) {
        this.shapePoints.push({
          x: this.positions[i].x,
          y: this.positions[i].y,
        });

        lastShapePoint.x = this.positions[i].x;
        lastShapePoint.y = this.positions[i].y;

        originShapePoint.x = this.positions[i].x;
        originShapePoint.y = this.positions[i].y;
      } else {
        // 计算控制点
        controlPoint = this.getControlPoint(lastShapePoint, currentShapePoint);

        this.shapePoints.push({
          cx: controlPoint.x,
          cy: controlPoint.y,
          x: currentShapePoint.x,
          y: currentShapePoint.y,
        });

        lastShapePoint.x = currentShapePoint.x;
        lastShapePoint.y = currentShapePoint.y;

        // 最后一个点, 处理封口
        if (i === len - 1) {
          if (this.isTracking) {
            // 计算控制点
            controlPoint = this.getControlPoint(
              lastShapePoint,
              this.trackingPoint
            );

            this.shapePoints.push({
              cx: controlPoint.x,
              cy: controlPoint.y,
              x: this.trackingPoint.x,
              y: this.trackingPoint.y,
            });
          } else if (this.isSeal) {
            // 计算控制点
            controlPoint = this.getControlPoint(
              lastShapePoint,
              originShapePoint
            );

            this.shapePoints.push({
              cx: controlPoint.x,
              cy: controlPoint.y,
              x: originShapePoint.x,
              y: originShapePoint.y,
            });
          }
        }
      }
    }
  }
};

CLOUD.Extensions.AnnotationCloud.prototype.calculateRelativePosition =
  function (center) {
    // 计算相对位置
    for (var i = 0, len = this.shapePoints.length; i < len; i++) {
      if (i === 0) {
        this.shapePoints[i].x -= center.x;
        this.shapePoints[i].y -= center.y;
      } else {
        this.shapePoints[i].x -= center.x;
        this.shapePoints[i].y -= center.y;
        this.shapePoints[i].cx -= center.x;
        this.shapePoints[i].cy -= center.y;
      }
    }
  };

CLOUD.Extensions.AnnotationCloud.prototype.calculatePosition = function (
  force
) {
  force = force || false;

  // 计算控制点
  this.calculateShapePath();

  if (force) {
    var box = this.getBoundingBox();
    var center = box.center();

    this.center = {
      x: center.x,
      y: center.y,
    };

    // 计算中心点
    this.position.x = center.x;
    this.position.y = center.y;
    this.position.z = this.depth || 0;

    // 计算相对位置
    this.calculateRelativePosition(center);

    // 重计算包围盒
    box = this.getBoundingBox();

    var size = box.size();

    this.size.width = size.x || 16;
    this.size.height = size.y || 16;
  } else {
    if (this.center) {
      // 计算相对位置
      this.calculateRelativePosition(this.center);
    }
  }
};

CLOUD.Extensions.AnnotationCloud.prototype.startTrack = function () {
  this.isTracking = true;
};

CLOUD.Extensions.AnnotationCloud.prototype.finishTrack = function () {
  this.isTracking = false;
};

CLOUD.Extensions.AnnotationCloud.prototype.enableTrack = function () {
  this.isEnableTrack = true;
};

CLOUD.Extensions.AnnotationCloud.prototype.disableTrack = function () {
  this.isEnableTrack = false;
};

CLOUD.Extensions.AnnotationCloud.prototype.getTrackState = function () {
  return this.isEnableTrack;
};

CLOUD.Extensions.AnnotationCloud.prototype.setSeal = function (isSeal) {
  this.isSeal = isSeal;

  this.calculatePosition(false);
  this.update();
};

// 设置形状点集
CLOUD.Extensions.AnnotationCloud.prototype.setShapePoints = function (
  shapeStr
) {
  var x, y, cx, cy, retPoint;
  var shapePoints = shapeStr.split(",");

  var x0 = parseInt(shapePoints[0]);
  var y0 = parseInt(shapePoints[1]);
  retPoint = this.viewBoxToWorld({
    x: x0,
    y: y0,
  });
  x0 = retPoint.x;
  y0 = retPoint.y;

  this.shapePoints = [];
  this.shapePoints.push({
    x: x0,
    y: y0,
  });

  for (var i = 2, len = shapePoints.length; i < len; i += 4) {
    cx = parseInt(shapePoints[i]);
    cy = parseInt(shapePoints[i + 1]);
    retPoint = this.viewBoxToWorld({
      x: cx,
      y: cy,
    });
    cx = retPoint.x;
    cy = retPoint.y;

    x = parseInt(shapePoints[i + 2]);
    y = parseInt(shapePoints[i + 3]);
    retPoint = this.viewBoxToWorld({
      x: x,
      y: y,
    });
    x = retPoint.x;
    y = retPoint.y;

    this.shapePoints.push({
      cx: cx,
      cy: cy,
      x: x,
      y: y,
    });
  }
};

// 获得形状点集字符串（用“，”分割）
CLOUD.Extensions.AnnotationCloud.prototype.getShapePoints = function () {
  var points = [];

  // 转成整型存储以减少存储空间
  var x, y, cx, cy, retPoint;

  for (var i = 0, len = this.shapePoints.length; i < len; i++) {
    if (i === 0) {
      x = this.shapePoints[i].x;
      y = this.shapePoints[i].y;
      retPoint = this.worldToViewBox({
        x: x,
        y: y,
      });
      x = retPoint.x;
      y = retPoint.y;
      points.push(x);
      points.push(y);
    } else {
      cx = this.shapePoints[i].cx;
      cy = this.shapePoints[i].cy;
      retPoint = this.worldToViewBox({
        x: cx,
        y: cy,
      });
      cx = retPoint.x;
      cy = retPoint.y;
      points.push(cx);
      points.push(cy);

      x = this.shapePoints[i].x;
      y = this.shapePoints[i].y;
      retPoint = this.worldToViewBox({
        x: x,
        y: y,
      });
      x = retPoint.x;
      y = retPoint.y;
      points.push(x);
      points.push(y);
    }
  }

  return points.join(",");
};

CLOUD.Extensions.AnnotationCloud.prototype.renderToCanvas = function (ctx) {
  // 小于两个点，不处理
  if (this.shapePoints.length < 2) return;

  var strokeWidth = this.style["stroke-width"];
  var strokeColor = this.highlighted
    ? this.highlightColor
    : this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];
  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];

  ctx.strokeStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    strokeColor,
    strokeOpacity
  );
  ctx.fillStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    fillColor,
    fillOpacity
  );
  ctx.lineWidth = strokeWidth;

  var scaleX = this.size.width / this.originSize.width;
  var scaleY = this.size.height / this.originSize.height;

  var m0 = new THREE.Matrix4().makeScale(scaleX, scaleY, 1);
  var m1 = new THREE.Matrix4().makeRotationZ(-this.rotation);
  var m2 = new THREE.Matrix4().makeTranslation(
    this.position.x,
    this.position.y,
    this.position.z
  );
  var transform = m2.multiply(m1).multiply(m0);

  var scope = this;

  ctx.beginPath();

  var pos = new THREE.Vector3();
  var x, y, cx, cy;

  this.shapePoints.forEach(function (point, i) {
    if (i === 0) {
      pos.x = point.x;
      pos.y = point.y;
      pos.z = 0;
      pos.applyMatrix4(transform);
      pos = scope.editor.worldToClient(pos);
      x = pos.x;
      y = pos.y;

      ctx.moveTo(x, y);
    } else {
      pos.x = point.cx;
      pos.y = point.cy;
      pos.z = 0;
      pos.applyMatrix4(transform);
      pos = scope.editor.worldToClient(pos);
      cx = pos.x;
      cy = pos.y;

      pos.x = point.x;
      pos.y = point.y;
      pos.z = 0;
      pos.applyMatrix4(transform);
      pos = scope.editor.worldToClient(pos);
      x = pos.x;
      y = pos.y;

      ctx.quadraticCurveTo(cx, cy, x, y);
    }
  });

  ctx.stroke();

  if (fillOpacity !== 0) {
    ctx.fill();
  }

  ctx.stroke();
};

CLOUD.Extensions.AnnotationText = function (editor, id) {
  CLOUD.Extensions.Annotation.call(this, editor, id);

  this.shapeType = CLOUD.Extensions.Annotation.shapeTypes.TEXT;
  this.currText = "";
  this.currTextLines = [""];
  this.textDirty = true;
  this.lineHeight = 100;

  this.textArea = document.createElement("textarea");
  this.textArea.setAttribute("maxlength", "260");

  this.textAreaStyle = {};
  this.textAreaStyle["position"] = "absolute";
  this.textAreaStyle["overflow-y"] = "hidden";

  this.measurePanel = document.createElement("div");

  this.isActive = false;

  this.createShape();
  this.addDomEventListeners();
};

CLOUD.Extensions.AnnotationText.prototype = Object.create(
  CLOUD.Extensions.Annotation.prototype
);
CLOUD.Extensions.AnnotationText.prototype.constructor =
  CLOUD.Extensions.AnnotationText;

CLOUD.Extensions.AnnotationText.prototype.addDomEventListeners = function () {
  var that = this;
  this.shape.addEventListener(
    "touchstart",
    function (event) {
      CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
    },
    true
  );

  this.shape.addEventListener("mousedown", this.onMouseDownBinded, true);
  this.shape.addEventListener("mouseout", this.onMouseOutBinded);
  this.shape.addEventListener("mouseover", this.onMouseOverBinded);
};

CLOUD.Extensions.AnnotationText.prototype.removeDomEventListeners =
  function () {
    var that = this;
    this.shape.removeEventListener(
      "touchstart",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
      },
      true
    );

    this.shape.removeEventListener("mousedown", this.onMouseDownBinded, true);
    this.shape.removeEventListener("mouseout", this.onMouseOutBinded);
    this.shape.removeEventListener("mouseover", this.onMouseOverBinded);
  };

CLOUD.Extensions.AnnotationText.prototype.createShape = function () {
  this.clipPath = CLOUD.Extensions.Utils.Shape2D.createSvgElement("clipPath");
  this.clipPathId = "clip_" + this.id;
  this.clipPath.setAttribute("id", this.clipPathId);
  this.clipPath.removeAttribute("pointer-events");

  this.clipRect = CLOUD.Extensions.Utils.Shape2D.createSvgElement("rect");
  this.clipRect.removeAttribute("pointer-events");
  this.clipPath.appendChild(this.clipRect);

  this.shape = CLOUD.Extensions.Utils.Shape2D.createSvgElement("text");
  this.backgroundRect = CLOUD.Extensions.Utils.Shape2D.createSvgElement("rect");
};

CLOUD.Extensions.AnnotationText.prototype.set = function (
  position,
  size,
  rotation,
  textString
) {
  this.position.x = position.x;
  this.position.y = position.y;
  this.position.z = position.z;

  this.size.width = size.width;
  this.size.height = size.height;

  this.rotation = rotation;

  this.setText(textString);
};

CLOUD.Extensions.AnnotationText.prototype.resetSize = function (
  size,
  position
) {
  var clientSize = this.getClientSize();
  var isCalcLines = Math.floor(clientSize.width) !== size.width;

  this.position.x = position.x;
  this.position.y = position.y;
  this.position.z = position.z;

  this.size.width = size.width;
  this.size.height = size.height;

  if (isCalcLines) {
    var newLines = this.calcTextLines();

    if (!this.linesEqual(newLines)) {
      this.currTextLines = newLines;
      this.textDirty = true;
      this.forceRedraw();
    }
  }

  this.update();
};

CLOUD.Extensions.AnnotationText.prototype.setText = function (text) {
  this.currText = text;
  this.currTextLines = this.calcTextLines();
  this.textDirty = true;
  this.show();
  this.update();
};

CLOUD.Extensions.AnnotationText.prototype.getText = function () {
  return this.currText;
};

CLOUD.Extensions.AnnotationText.prototype.setParent = function (parent) {
  var currParent = this.clipPath.parentNode;

  if (currParent) {
    currParent.removeChild(this.clipPath);
  }

  if (parent) {
    parent.appendChild(this.clipPath);
  }

  currParent = this.backgroundRect.parentNode;

  if (currParent) {
    currParent.removeChild(this.backgroundRect);
  }

  if (parent) {
    parent.appendChild(this.backgroundRect);
  }

  currParent = this.shape.parentNode;

  if (currParent) {
    currParent.removeChild(this.shape);
  }

  if (parent) {
    parent.appendChild(this.shape);
  }
};

CLOUD.Extensions.AnnotationText.prototype.update = function (forceDirty) {
  var fontSize = this.style["font-size"];
  var strokeColor = this.highlighted
    ? this.highlightColor
    : this.style["stroke-color"];
  var strokeOpacity = this.style["stroke-opacity"];
  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];

  var position = this.getClientPosition();
  var size = this.getClientSize();
  var offsetX = size.width * 0.5;
  var offsetY = size.height * 0.5;

  this.transformShape = [
    "translate(",
    position.x,
    ",",
    position.y,
    ") ",
    "rotate(",
    THREE.Math.radToDeg(this.rotation),
    ") ",
    "translate(",
    -offsetX,
    ",",
    -offsetY,
    ") ",
  ].join("");

  this.shape.setAttribute("font-family", this.style["font-family"]);
  this.shape.setAttribute("font-size", fontSize);
  this.shape.setAttribute("font-weight", this.style["font-weight"]);
  this.shape.setAttribute("font-style", this.style["font-style"]);
  this.shape.setAttribute(
    "fill",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(strokeColor, strokeOpacity)
  );

  //var bBox = this.shape.getBBox();
  var verticalTransform = ["translate(0, ", fontSize, ")"].join("");
  this.shape.setAttribute("transform", this.transformShape + verticalTransform);
  //this.shape.setAttribute('clip-path', 'url(#' + this.clipPathId + ')');

  if (this.textDirty || forceDirty) {
    if (forceDirty) {
      this.currTextLines = this.calcTextLines();
    }

    this.rebuildTextSvg();
    this.textDirty = false;
  }

  var bBox = this.shape.getBBox();

  this.shapeBox = bBox;

  this.clipRect.setAttribute("x", "0");
  this.clipRect.setAttribute("y", bBox.y + "");
  this.clipRect.setAttribute("width", size.width);
  this.clipRect.setAttribute("height", size.height);

  verticalTransform = ["translate(0, ", size.height, ")"].join("");
  this.backgroundRect.setAttribute(
    "transform",
    this.transformShape + verticalTransform
  );
  this.backgroundRect.setAttribute("width", size.width);
  this.backgroundRect.setAttribute("height", size.height);
  this.backgroundRect.setAttribute("stroke-width", "0");
  this.backgroundRect.setAttribute(
    "fill",
    CLOUD.Extensions.Utils.Shape2D.getRGBAString(fillColor, fillOpacity)
  );
};

CLOUD.Extensions.AnnotationText.prototype.show = function () {
  if (this.shape.style.display !== "") {
    this.shape.style.display = "";
  }
};

CLOUD.Extensions.AnnotationText.prototype.hide = function () {
  if (this.shape.style.display !== "none") {
    this.shape.style.display = "none";
  }
};

CLOUD.Extensions.AnnotationText.prototype.forceRedraw = function () {
  window.requestAnimationFrame(
    function () {
      this.highlighted = !this.highlighted;
      this.update();

      this.highlighted = !this.highlighted;
      this.update();
    }.bind(this)
  );
};

CLOUD.Extensions.AnnotationText.prototype.rebuildTextSvg = function () {
  while (this.shape.childNodes.length > 0) {
    this.shape.removeChild(this.shape.childNodes[0]);
  }

  var dx = 0;
  var dy = 0;
  var yOffset = this.getLineHeight();

  this.currTextLines.forEach(
    function (line) {
      var tspan = CLOUD.Extensions.Utils.Shape2D.createSvgElement("tspan");
      tspan.setAttribute("x", dx);
      tspan.setAttribute("y", dy);
      tspan.textContent = line;
      this.shape.appendChild(tspan);
      dy += yOffset;
    }.bind(this)
  );
};

CLOUD.Extensions.AnnotationText.prototype.getLineHeight = function () {
  return this.style["font-size"] * (this.lineHeight * 0.01);
};

CLOUD.Extensions.AnnotationText.prototype.calcTextLines = function () {
  var textValues =
    this.editor.annotationTextArea.getTextValuesByAnnotation(this);
  return textValues.lines;
};

CLOUD.Extensions.AnnotationText.prototype.getTextLines = function () {
  return this.currTextLines.concat();
};

CLOUD.Extensions.AnnotationText.prototype.linesEqual = function (lines) {
  var curr = this.currTextLines;

  if (lines.length !== curr.length) return false;

  var len = curr.length;

  for (var i = 0; i < len; ++i) {
    if (lines[i] !== curr[i]) return false;
  }

  return true;
};

CLOUD.Extensions.AnnotationText.prototype.renderToCanvas = function (ctx) {
  function renderTextLines(ctx, lines, lineHeight, maxHeight) {
    var y = 0;

    lines.forEach(function (line) {
      if (y + lineHeight > maxHeight) {
        return;
      }

      ctx.fillText(line, 0, y);
      y += lineHeight;
    });
  }

  var fillColor = this.style["fill-color"];
  var fillOpacity = this.style["fill-opacity"];
  var strokeColor = this.style["stroke-color"];
  var fontOpacity = this.style["stroke-opacity"];
  var fontFamily = this.style["font-family"];
  var fontStyle = this.style["font-style"];
  var fontWeight = this.style["font-weight"];
  var fontSize = this.style["font-size"];

  var lineHeight = fontSize * (this.lineHeight * 0.01);
  var position = this.getClientPosition();
  var size = this.getClientSize();

  // 对应超出文本区域的文字的处理：使用包围盒
  //var bBox = this.shape.getBBox();
  var sizeBox = {
    width: this.shapeBox.width,
    height: this.shapeBox.height,
  };

  ctx.save();
  ctx.fillStyle = CLOUD.Extensions.Utils.Shape2D.getRGBAString(
    fillColor,
    fillOpacity
  );
  ctx.translate(position.x, position.y);

  if (fillOpacity !== 0) {
    ctx.fillRect(
      -0.5 * sizeBox.width,
      -0.5 * sizeBox.height,
      sizeBox.width,
      sizeBox.height
    );
  }

  ctx.restore();

  // Text
  ctx.fillStyle = strokeColor;
  ctx.strokeStyle = strokeColor;
  ctx.textBaseline = "top";
  ctx.translate(position.x, position.y);
  ctx.rotate(this.rotation);
  ctx.translate(-0.5 * size.width, -0.5 * size.height);

  ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;
  ctx.globalAlpha = fontOpacity;
  renderTextLines(ctx, this.currTextLines, lineHeight, sizeBox.height);
};

CLOUD.Extensions.AnnotationTextArea = function (editor, container) {
  this.editor = editor;
  this.container = container;

  this.textArea = document.createElement("textarea");
  this.textArea.setAttribute("maxlength", "260");

  this.textAreaStyle = {};
  this.textAreaStyle["position"] = "absolute";
  this.textAreaStyle["overflow-y"] = "hidden";

  this.measurePanel = document.createElement("div");

  this.textAnnotation = null;
  this.onKeyDownBinded = this.onKeyDown.bind(this);
  this.onResizeBinded = this.onResize.bind(this);

  this.addDomEventListeners();
};

CLOUD.Extensions.AnnotationTextArea.prototype.addDomEventListeners =
  function () {
    this.textArea.addEventListener("keydown", this.onKeyDownBinded, false);
  };

CLOUD.Extensions.AnnotationTextArea.prototype.removeDomEventListeners =
  function () {
    this.textArea.removeEventListener("keydown", this.onKeyDownBinded, false);
  };

CLOUD.Extensions.AnnotationTextArea.prototype.onKeyDown = function () {
  var keyCode = event.keyCode;
  var shiftDown = event.shiftKey;

  // 回车键
  if (!shiftDown && keyCode === 13) {
    event.preventDefault();
    this.accept();
    this.editor.resetCurrentAnnotationText();
  }
};

CLOUD.Extensions.AnnotationTextArea.prototype.onResize = function () {
  window.requestAnimationFrame(
    function () {
      if (this.textAnnotation) {
        var text = this.textArea.value;
        this.style = null;
        this.init();
        this.textArea.value = text;
      }
    }.bind(this)
  );
};

CLOUD.Extensions.AnnotationTextArea.prototype.destroy = function () {
  this.removeDomEventListeners();
  this.inactive();
};

CLOUD.Extensions.AnnotationTextArea.prototype.init = function () {
  var position = this.textAnnotation.getClientPosition();
  var size = this.textAnnotation.getClientSize();
  var left = Math.floor(position.x - size.width * 0.5 + 0.5);
  var top = Math.floor(position.y - size.height * 0.5 + 0.5);

  var lineHeightPercentage = this.textAnnotation.lineHeight + "%";
  this.textAreaStyle["line-height"] = lineHeightPercentage;

  this.setBound(left, top, size.width, size.height);
  this.setStyle(this.textAnnotation.getStyle());
  this.textArea.value = this.textAnnotation.getText();
};

CLOUD.Extensions.AnnotationTextArea.prototype.setBound = function (
  left,
  top,
  width,
  height
) {
  if (left + width >= this.container.clientWidth) {
    left = this.container.clientWidth - (width + 10);
  }

  if (top + height >= this.container.clientHeight) {
    top = this.container.clientHeight - (height + 10);
  }

  this.textAreaStyle["left"] = left + "px";
  this.textAreaStyle["top"] = top + "px";
  this.textAreaStyle["width"] = width + "px";
  this.textAreaStyle["height"] = height + "px";
};

CLOUD.Extensions.AnnotationTextArea.prototype.setStyle = function (style) {
  if (this.style) {
    var width = parseFloat(this.textArea.style.width);
    var height = parseFloat(this.textArea.style.height);
    var left = parseFloat(this.textArea.style.left);
    var top = parseFloat(this.textArea.style.top);

    var position = {
      x: left + width * 0.5,
      y: top + height * 0.5,
    };

    this.setBound(
      position.x - width * 0.5,
      position.y - height * 0.5,
      width,
      height
    );
  }

  this.textAreaStyle["font-family"] = style["font-family"];
  this.textAreaStyle["font-size"] = style["font-size"] + "px";
  this.textAreaStyle["font-weight"] = style["font-weight"];
  this.textAreaStyle["font-style"] = style["font-style"];
  this.textAreaStyle["color"] = style["stroke-color"];

  var styleStr = CLOUD.DomUtil.getStyleString(this.textAreaStyle);
  this.textArea.setAttribute("style", styleStr);

  this.style = CLOUD.DomUtil.cloneStyle(style);
};

CLOUD.Extensions.AnnotationTextArea.prototype.isActive = function () {
  return !!this.textAnnotation;
};

CLOUD.Extensions.AnnotationTextArea.prototype.active = function (
  annotation,
  firstEdit
) {
  if (this.textAnnotation === annotation) {
    return;
  }

  this.inactive();

  this.container.appendChild(this.textArea);
  this.textAnnotation = annotation;
  this.firstEdit = firstEdit || false;

  this.init();

  window.addEventListener("resize", this.onResizeBinded);

  var textArea = this.textArea;

  window.requestAnimationFrame(function () {
    textArea.focus();
  });
};

CLOUD.Extensions.AnnotationTextArea.prototype.inactive = function () {
  window.removeEventListener("resize", this.onResizeBinded);

  if (this.textAnnotation) {
    this.textAnnotation = null;
    this.container.removeChild(this.textArea);
  }

  this.style = null;
};

CLOUD.Extensions.AnnotationTextArea.prototype.accept = function () {
  var left = parseFloat(this.textArea.style.left);
  var top = parseFloat(this.textArea.style.top);
  var width = parseFloat(this.textArea.style.width);
  var height = parseFloat(this.textArea.style.height);
  var textValues = this.getTextValues();
  var position = {
    x: left + width * 0.5,
    y: top + height * 0.5,
  };
  var data = {
    annotation: this.textAnnotation,
    firstEdit: this.firstEdit,
    style: this.style,
    position: position,
    width: width,
    height: height,
    text: textValues.text,
    lines: textValues.lines,
  };

  this.editor.handleTextChange(data);
  this.inactive();
};

CLOUD.Extensions.AnnotationTextArea.prototype.getTextValuesByAnnotation =
  function (annotation) {
    this.active(annotation, false);

    var textValues = this.getTextValues();

    this.inactive();

    return textValues;
  };

CLOUD.Extensions.AnnotationTextArea.prototype.getTextValues = function () {
  var text = this.textArea.value;

  return {
    text: text,
    lines: this.calcTextLines(),
  };
};

CLOUD.Extensions.AnnotationTextArea.prototype.calcTextLines = function () {
  var text = this.textArea.value;
  var linesBreaks = text.split(/\r*\n/);

  var measureStyle = CLOUD.DomUtil.cloneStyle(this.textAreaStyle);
  CLOUD.DomUtil.removeStyleAttribute(measureStyle, [
    "top",
    "left",
    "width",
    "height",
    "overflow-y",
  ]);
  measureStyle["position"] = "absolute";
  measureStyle["white-space"] = "nowrap";
  measureStyle["float"] = "left";
  measureStyle["visibility"] = "hidden";

  this.measurePanel.setAttribute(
    "style",
    CLOUD.DomUtil.getStyleString(measureStyle)
  );
  this.container.appendChild(this.measurePanel);

  var maxLineLength = parseFloat(this.textArea.style.width);
  var lines = [];

  for (var i = 0, len = linesBreaks.length; i < len; ++i) {
    var line = CLOUD.DomUtil.trimRight(linesBreaks[i]);
    this.splitLine(line, maxLineLength, lines);
  }

  this.container.removeChild(this.measurePanel);

  return lines;
};

CLOUD.Extensions.AnnotationTextArea.prototype.getShorterLine = function (line) {
  var iLastSpace = line.lastIndexOf(" ");

  if (iLastSpace === -1) {
    return [line];
  }

  while (line.charAt(iLastSpace - 1) === " ") {
    iLastSpace--;
  }

  var trailingWord = line.substr(iLastSpace);
  var shorterLine = line.substr(0, iLastSpace);

  return [shorterLine, trailingWord];
};

CLOUD.Extensions.AnnotationTextArea.prototype.splitWord = function (
  word,
  remaining,
  maxLength,
  output
) {
  var lenSoFar = 1;
  var fits = true;

  while (fits) {
    var part = word.substr(0, lenSoFar);
    this.measurePanel.innerHTML = part;
    var lineLen = this.measurePanel.clientWidth;

    if (lineLen > maxLength) {
      if (lenSoFar === 1) {
        output.push(part);
        this.splitWord(word.substr(1), remaining, maxLength, output);

        return;
      }

      var okayWord = word.substr(0, lenSoFar - 1);
      output.push(okayWord);

      var extraWord = word.substr(lenSoFar - 1);

      this.splitLine(extraWord + remaining, maxLength, output);

      return;
    }

    lenSoFar++;

    if (lenSoFar > word.length) {
      output.push(word);

      return;
    }
  }
};

CLOUD.Extensions.AnnotationTextArea.prototype.splitLine = function (
  text,
  maxLength,
  output
) {
  if (text === "") {
    return;
  }

  var remaining = "";
  var done = false;

  while (!done) {
    this.measurePanel.innerHTML = text;
    var lineLen = this.measurePanel.clientWidth;

    if (lineLen <= maxLength) {
      output.push(text);
      this.splitLine(CLOUD.DomUtil.trimLeft(remaining), maxLength, output);
      done = true;
    } else {
      var parts = this.getShorterLine(text);

      if (parts.length === 1) {
        this.splitWord(text, remaining, maxLength, output);
        done = true;
      } else {
        text = parts[0];
        remaining = parts[1] + remaining;
      }
    }
  }
};

CLOUD.Extensions.AnnotationFrame = function (editor, container) {
  this.editor = editor;
  this.container = container;
  this.selection = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
    element: null,
    active: false,
    dragging: false,
    resizing: false,
    handle: {},
  };

  this.annotation = null;

  this.onResizeDownBinded = this.onResizeDown.bind(this);
  this.onDoubleClickBinded = this.onDoubleClick.bind(this);
  this.onRepositionDownBinded = this.onRepositionDown.bind(this);
  this.onRotationDownBinded = this.onRotationDown.bind(this);

  this.createFramePanel();
  this.addDomEventListeners();
};

CLOUD.Extensions.AnnotationFrame.prototype.addDomEventListeners = function () {
  var that = this;

  this.framePanel.addEventListener("touchstart", function (event) {
    CLOUD.DomUtil.adapterMobile(event, that.onResizeDownBinded);
  });

  this.selection.element.addEventListener("touchstart", function (event) {
    CLOUD.DomUtil.adapterMobile(event, that.onRepositionDownBinded);
  });
  this.selection.element.addEventListener("touchstart", function (event) {
    CLOUD.DomUtil.adapterMobile(event, that.onRotationDownBinded);
  });

  this.framePanel.addEventListener("mousedown", this.onResizeDownBinded);
  this.framePanel.addEventListener("dblclick", this.onDoubleClickBinded);
  this.selection.element.addEventListener(
    "mousedown",
    this.onRepositionDownBinded
  );
  this.selection.element.addEventListener(
    "mousedown",
    this.onRotationDownBinded
  );
};

CLOUD.Extensions.AnnotationFrame.prototype.removeDomEventListeners =
  function () {
    var that = this;

    this.framePanel.removeEventListener("touchstart", function (event) {
      CLOUD.DomUtil.adapterMobile(event, that.onResizeDownBinded);
    });

    this.selection.element.removeEventListener("touchstart", function (event) {
      CLOUD.DomUtil.adapterMobile(event, that.onRepositionDownBinded);
    });
    this.selection.element.removeEventListener("touchstart", function (event) {
      CLOUD.DomUtil.adapterMobile(event, that.onRotationDownBinded);
    });

    this.framePanel.removeEventListener("mousedown", this.onResizeDownBinded);
    this.framePanel.removeEventListener("dblclick", this.onDoubleClickBinded);
    this.selection.element.removeEventListener(
      "mousedown",
      this.onRepositionDownBinded
    );
    this.selection.element.removeEventListener(
      "mousedown",
      this.onRotationDownBinded
    );
  };

CLOUD.Extensions.AnnotationFrame.prototype.onMouseMove = function (event) {};

CLOUD.Extensions.AnnotationFrame.prototype.onMouseUp = function (event) {};

CLOUD.Extensions.AnnotationFrame.prototype.onRepositionDown = function (event) {
  if (!this.annotation) return;

  if (this.isDragPoint(event.target) || this.isRotatePoint(event.target))
    return;

  this.selection.dragging = true;
  this.originMouse = this.editor.getPointOnDomContainer(
    event.clientX,
    event.clientY
  );
  this.originPosition = this.annotation.getClientPosition();

  this.onMouseMove = this.onRepositionMove.bind(this);
  this.onMouseUp = this.onRepositionUp.bind(this);

  this.editor.dragAnnotationFrameBegin();
};

CLOUD.Extensions.AnnotationFrame.prototype.onRepositionMove = function (event) {
  if (!this.annotation) return;

  if (!this.selection.dragging) return;

  var mouse = this.editor.getPointOnDomContainer(event.clientX, event.clientY);

  var movement = {
    x: mouse.x - this.originMouse.x,
    y: mouse.y - this.originMouse.y,
  };

  var x = this.originPosition.x + movement.x;
  var y = this.originPosition.y + movement.y;

  this.updatePosition(x, y, this.selection.rotation);
  var position = this.editor.getAnnotationWorldPosition({
    x: x,
    y: y,
  });
  this.annotation.resetPosition(position);
};

CLOUD.Extensions.AnnotationFrame.prototype.onRepositionUp = function () {
  this.onMouseMove = function () {};

  this.onMouseUp = function () {};

  if (!this.selection.dragging) {
    return;
  }

  this.selection.dragging = false;
  this.editor.dragAnnotationFrameEnd();
};

CLOUD.Extensions.AnnotationFrame.prototype.onResizeDown = function (event) {
  if (!this.annotation) return;

  var target = event.target;

  if (this.isDragPoint(target)) {
    this.selection.resizing = true;
    this.selection.handle.resizingPanel = target;

    var direction =
      this.selection.handle.resizingPanel.getAttribute("data-drag-point");
    this.container.style.cursor = direction + "-resize";

    var mouse = this.editor.getPointOnDomContainer(
      event.clientX,
      event.clientY
    );
    var position = this.annotation.getClientPosition();
    var size = this.annotation.getClientSize();

    this.origin = {
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height,
      mouseX: mouse.x,
      mouseY: mouse.y,
    };

    this.onMouseMove = this.onResizeMove.bind(this);
    this.onMouseUp = this.onResizeUp.bind(this);

    this.editor.dragAnnotationFrameBegin();
  }
};

CLOUD.Extensions.AnnotationFrame.prototype.onResizeMove = function (event) {
  if (!this.annotation) return;

  if (!this.selection.resizing) return;

  var mouse = this.editor.getPointOnDomContainer(event.clientX, event.clientY);
  var origin = this.origin;

  var movement = {
    x: mouse.x - origin.mouseX,
    y: mouse.y - origin.mouseY,
  };

  var vMovement = new THREE.Vector3(movement.x, movement.y, 0);
  var matRotation = new THREE.Matrix4().makeRotationZ(-this.selection.rotation);
  movement = vMovement.applyMatrix4(matRotation);

  var x = origin.x,
    y = origin.y,
    width = origin.width,
    height = origin.height;

  var translationDelta = new THREE.Vector3();
  var direction =
    this.selection.handle.resizingPanel.getAttribute("data-drag-point");

  var translations = {
    n: function () {
      height -= movement.y;
      translationDelta.y = movement.y;
    },
    s: function () {
      height += movement.y;
      translationDelta.y = movement.y;
    },
    w: function () {
      width -= movement.x;
      translationDelta.x = movement.x;
    },
    e: function () {
      width += movement.x;
      translationDelta.x = movement.x;
    },
    nw: function () {
      this.n();
      this.w();
    },
    ne: function () {
      this.n();
      this.e();
    },
    sw: function () {
      this.s();
      this.w();
    },
    se: function () {
      this.s();
      this.e();
    },
  };

  translations[direction]();

  var matRedoRotation = new THREE.Matrix4().makeRotationZ(
    this.selection.rotation
  );
  var actualDelta = translationDelta.applyMatrix4(matRedoRotation);
  var clientPosition = {
    x: x + actualDelta.x * 0.5,
    y: y + actualDelta.y * 0.5,
  };
  var clientSize = {
    width: width,
    height: height,
  };
  var newPosition = this.editor.getAnnotationWorldPosition(clientPosition);
  var size = this.editor.getAnnotationWorldSize(clientSize, clientPosition);

  this.annotation.resetSize(size, newPosition);
};

CLOUD.Extensions.AnnotationFrame.prototype.onResizeUp = function (event) {
  this.onMouseMove = function () {};

  this.onMouseUp = function () {};

  this.selection.resizing = false;
  this.selection.handle.resizingPanel = null;
  this.container.style.cursor = "";
  this.editor.dragAnnotationFrameEnd();
};

CLOUD.Extensions.AnnotationFrame.prototype.onRotationDown = function (event) {
  if (!this.annotation) return;

  if (!this.isRotatePoint(event.target)) return;

  this.selection.rotating = true;

  this.originPosition = this.editor.getPointOnDomContainer(
    event.clientX,
    event.clientY
  );
  this.originRotation = this.selection.rotation || 0;

  this.onMouseMove = this.onRotationMove.bind(this);
  this.onMouseUp = this.onRotationUp.bind(this);

  this.editor.dragAnnotationFrameBegin();
};

CLOUD.Extensions.AnnotationFrame.prototype.onRotationMove = function (event) {
  if (!this.annotation) return;

  if (!this.selection.rotating) return;

  var mouse = this.editor.getPointOnDomContainer(event.clientX, event.clientY);
  var position = this.annotation.getClientPosition();
  var angle1 = CLOUD.Extensions.Utils.Geometric.getAngleBetweenPoints(
    position,
    mouse
  );
  var angle2 = CLOUD.Extensions.Utils.Geometric.getAngleBetweenPoints(
    position,
    this.originPosition
  );
  var rotation = angle1 - angle2 + this.originRotation;

  this.updatePosition(this.selection.x, this.selection.y, rotation);

  this.annotation.resetRotation(rotation);
};

CLOUD.Extensions.AnnotationFrame.prototype.onRotationUp = function (event) {
  this.onMouseMove = function () {};

  this.onMouseUp = function () {};

  this.selection.rotating = false;
  this.originRotation = null;
  this.originPosition = null;
  this.editor.dragAnnotationFrameEnd();
};

CLOUD.Extensions.AnnotationFrame.prototype.onDoubleClick = function (event) {
  this.selection.dragging = false;

  if (this.annotation) {
    this.editor.onMouseDoubleClick(event, this.annotation);
  }
};

CLOUD.Extensions.AnnotationFrame.prototype.destroy = function () {
  this.removeDomEventListeners();
};

CLOUD.Extensions.AnnotationFrame.prototype.createFramePanel = function () {
  var scope = this;

  var createBoxWrapperPanel = function () {
    var panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.top = 0;
    panel.style.bottom = 0;
    panel.style.left = 0;
    panel.style.right = 0;
    panel.style.overflow = "hidden";
    panel.style.visibility = "hidden";
    panel.style.pointerEvents = "none";

    return panel;
  };

  var createRotatePointPanel = function (diameter) {
    var borderWidth = 2;
    var borderRadius = diameter / 2 + borderWidth;

    var panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.backgroundColor = "aqua";
    panel.style.border = borderWidth + "px solid rgb(95, 98, 100)";
    panel.style.height = diameter + "px";
    panel.style.width = diameter + "px";
    panel.style.borderRadius = borderRadius + "px";
    panel.style.boxSizing = "border-box";
    panel.classList.add("select-rotate-point");
    panel.style.top = "-25px";
    panel.style.left = "50%";
    panel.style.transform = "translate3d(-50%, 0px, 0px)";

    return panel;
  };

  var createDragBoxPanel = function () {
    var borderWidth = 1;
    var borderColor = "rgb(0, 0, 255)";

    var panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.border = borderWidth + "px solid " + borderColor;
    panel.style.zIndex = 1;
    panel.style.cursor = "move";
    panel.style.boxSizing = "border-box";
    panel.style.pointerEvents = "auto";
    panel.classList.add("drag-box");

    return panel;
  };

  var createDragPointPanel = function (diameter, position) {
    var borderWidth = 2;
    var placementOffset = -1 * ((diameter + borderWidth) / 2);
    var wrapperPanel;

    var dragPointPanel = document.createElement("div");
    dragPointPanel.style.position = "absolute";
    dragPointPanel.style.backgroundColor = "rgba(151, 151, 151, 1)";
    dragPointPanel.style.border = borderWidth + "px solid rgb(95, 98, 100)";
    dragPointPanel.style.height = diameter + "px";
    dragPointPanel.style.width = diameter + "px";
    dragPointPanel.style.borderRadius = diameter / 2 + borderWidth + "px";
    dragPointPanel.style.boxSizing = "border-box";
    CLOUD.DomUtil.setCursorStyle(dragPointPanel, position);
    dragPointPanel.className = "select-drag-point drag-point-" + position;
    dragPointPanel.setAttribute("data-drag-point", position);

    switch (position) {
      case "n":
        wrapperPanel = document.createElement("div");
        wrapperPanel.style.position = "absolute";
        wrapperPanel.style.width = "100%";
        wrapperPanel.style.height = diameter + "px";
        wrapperPanel.style.top = placementOffset + "px";

        dragPointPanel.style.margin = "0 auto";
        dragPointPanel.style.position = "";
        wrapperPanel.appendChild(dragPointPanel);
        dragPointPanel = wrapperPanel;
        break;
      case "s":
        wrapperPanel = document.createElement("div");
        wrapperPanel.style.position = "absolute";
        wrapperPanel.style.width = "100%";
        wrapperPanel.style.height = diameter + "px";
        wrapperPanel.style.bottom = placementOffset + "px";

        dragPointPanel.style.margin = "0 auto";
        dragPointPanel.style.position = "";
        wrapperPanel.appendChild(dragPointPanel);
        dragPointPanel = wrapperPanel;
        break;
      case "w":
        dragPointPanel.style.left = placementOffset + "px";
        dragPointPanel.style.top = "50%";
        dragPointPanel.style.transform = "translate3d(0, -50%, 0)";
        break;
      case "e":
        dragPointPanel.style.right = placementOffset + "px";
        dragPointPanel.style.top = "50%";
        dragPointPanel.style.transform = "translate3d(0, -50%, 0)";
        break;
      case "nw":
        dragPointPanel.style.top = placementOffset + "px";
        dragPointPanel.style.left = placementOffset + "px";
        break;
      case "ne":
        dragPointPanel.style.top = placementOffset + "px";
        dragPointPanel.style.right = placementOffset + "px";
        break;
      case "sw":
        dragPointPanel.style.bottom = placementOffset + "px";
        dragPointPanel.style.left = placementOffset + "px";
        break;
      case "se":
        dragPointPanel.style.bottom = placementOffset + "px";
        dragPointPanel.style.right = placementOffset + "px";
        break;
    }

    return dragPointPanel;
  };

  var createDragPointPanels = function (selector) {
    var diameter = 12;
    var directions = ["n", "s", "w", "e", "nw", "ne", "sw", "se"];

    directions.forEach(function (direction) {
      scope.selection.handle[direction] = createDragPointPanel(
        diameter,
        direction
      );
      selector.appendChild(scope.selection.handle[direction]);
    });
  };

  this.framePanel = createBoxWrapperPanel();
  this.container.appendChild(this.framePanel);

  var dragBoxPanel = createDragBoxPanel();
  createDragPointPanels(dragBoxPanel);

  this.selection.element = dragBoxPanel;
  this.framePanel.appendChild(this.selection.element);

  this.selection.rotationPanel = createRotatePointPanel(12);
  dragBoxPanel.appendChild(this.selection.rotationPanel);

  this.updateState(false);
};

CLOUD.Extensions.AnnotationFrame.prototype.setSelection = function (
  x,
  y,
  width,
  height,
  rotation
) {
  this.updateDimensions(width, height);
  this.updatePosition(x, y, rotation);
  this.updateState(true);
  this.framePanel.style.visibility = "visible";
};

CLOUD.Extensions.AnnotationFrame.prototype.setAnnotation = function (
  annotation
) {
  if (!annotation) {
    if (this.annotation) {
      this.annotation = null;
      this.updateState(false);
    }

    return;
  }

  var size = annotation.getClientSize();
  var position = annotation.getClientPosition();
  var rotation = annotation.rotation;

  this.annotation = annotation;

  this.setSelection(
    position.x - size.width / 2,
    position.y - size.height / 2,
    size.width,
    size.height,
    rotation
  );

  this.enableResize();
  this.enableRotation();
};

CLOUD.Extensions.AnnotationFrame.prototype.isActive = function () {
  return this.isDragging() || this.isResizing() || this.isRotating();
};

CLOUD.Extensions.AnnotationFrame.prototype.dragBegin = function (event) {
  this.onRepositionDown(event);
};

CLOUD.Extensions.AnnotationFrame.prototype.isDragging = function () {
  return this.selection.dragging;
};

CLOUD.Extensions.AnnotationFrame.prototype.isResizing = function () {
  return this.selection.resizing;
};

CLOUD.Extensions.AnnotationFrame.prototype.isRotating = function () {
  return this.selection.rotating;
};

CLOUD.Extensions.AnnotationFrame.prototype.enableResize = function () {
  var handle, direction;

  if (
    this.annotation.disableResizeHeight ||
    this.annotation.disableResizeWidth
  ) {
    for (direction in this.selection.handle) {
      handle = this.selection.handle[direction];
      if (handle) handle.style.display = "none";
    }

    if (this.annotation.disableResizeHeight) {
      this.selection.handle["w"].style.display = "block";
      this.selection.handle["e"].style.display = "block";
    }

    if (this.annotation.disableResizeWidth) {
      this.selection.handle["n"].style.display = "block";
      this.selection.handle["s"].style.display = "block";
    }
  } else {
    for (direction in this.selection.handle) {
      handle = this.selection.handle[direction];

      if (handle) {
        handle.style.display = "block";
      }
    }
  }
};

CLOUD.Extensions.AnnotationFrame.prototype.enableRotation = function () {
  var display = this.annotation.disableRotation ? "none" : "block";
  this.selection.rotationPanel.style.display = display;
};

CLOUD.Extensions.AnnotationFrame.prototype.updateDimensions = function (
  width,
  height
) {
  this.selection.width = width;
  this.selection.height = height;
  this.selection.element.style.width = width + "px";
  this.selection.element.style.height = height + "px";
};

CLOUD.Extensions.AnnotationFrame.prototype.updatePosition = function (
  x,
  y,
  rotation
) {
  var size = this.annotation.getClientSize();

  this.selection.x = x;
  this.selection.y = y;
  this.selection.rotation = rotation;

  this.selection.element.style.msTransform =
    CLOUD.DomUtil.toTranslate3d(x, y) + " rotate(" + rotation + "rad)";
  this.selection.element.style.msTransformOrigin =
    size.width / 2 + "px " + size.height / 2 + "px";

  this.selection.element.style.webkitTransform =
    CLOUD.DomUtil.toTranslate3d(x, y) + " rotate(" + rotation + "rad)";
  this.selection.element.style.webkitTransformOrigin =
    size.width / 2 + "px " + size.height / 2 + "px";

  this.selection.element.style.transform =
    CLOUD.DomUtil.toTranslate3d(x, y) + " rotate(" + rotation + "rad)";
  this.selection.element.style.transformOrigin =
    size.width / 2 + "px " + size.height / 2 + "px";
};

CLOUD.Extensions.AnnotationFrame.prototype.updateState = function (active) {
  this.selection.active = active;
  this.selection.element.style.display = active ? "block" : "none";
};

CLOUD.Extensions.AnnotationFrame.prototype.isDragPoint = function (element) {
  return CLOUD.DomUtil.matchesSelector(element, ".select-drag-point");
};

CLOUD.Extensions.AnnotationFrame.prototype.isRotatePoint = function (element) {
  return CLOUD.DomUtil.matchesSelector(element, ".select-rotate-point");
};
var CLOUD = CLOUD || {};
CLOUD.Extensions = CLOUD.Extensions || {};

CLOUD.Extensions.AnnotationEditor = function (domElement, cameraEditor) {
  "use strict";

  //this.cameraEditor = viewer.cameraEditor;
  //this.domElement = viewer.domElement;
  this.domElement = domElement;
  this.cameraEditor = cameraEditor;
  this.annotations = [];
  this.selectedAnnotation = null;
  this.bounds = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  this.keys = {
    BACKSPACE: 8,
    ALT: 18,
    ESC: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40,
    DELETE: 46,
    ZERO: 48,
    A: 65,
    D: 68,
    E: 69,
    Q: 81,
    S: 83,
    W: 87,
    PLUS: 187,
    SUB: 189,
  };
  this.isEditing = false;
  this.originX = 0;
  this.originY = 0;
  this.isCreating = false;
  this.beginEditCallback = null;
  this.endEditCallback = null;
  this.changeEditorModeCallback = null;
  this.annotationType = CLOUD.Extensions.Annotation.shapeTypes.ARROW;
  this.nextAnnotationId = 0;
  this.annotationMinLen = 16;
  this.initialized = false;
  this.epsilon = 0.0001;
  this.annotationStyle = null;
  this.isDblClickCloseCloud = true;
  this.mouseButtons = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
  };

  this.onContextMenuBinded = this.onContextMenu.bind(this);
  this.onMouseDownBinded = this.onMouseDown.bind(this);
  this.onMouseDoubleClickBinded = this.onMouseDoubleClick.bind(this);
  this.onMouseMoveBinded = this.onMouseMove.bind(this);
  this.onMouseUpBinded = this.onMouseUp.bind(this);
  this.onKeyDownBinded = this.onKeyDown.bind(this);
  this.onKeyUpBinded = this.onKeyUp.bind(this);
};

CLOUD.Extensions.AnnotationEditor.prototype.addDomEventListeners = function () {
  if (this.svg) {
    var that = this;

    //兼容移动端
    this.svg.addEventListener(
      "touchstart",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
      },
      false
    );
    window.addEventListener(
      "touchmove",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseMoveBinded);
      },
      false
    );

    window.addEventListener(
      "touchend",
      function (event) {
        CLOUD.DomUtil.adapterMobile(event, that.onMouseUpBinded);
      },
      false
    );

    this.svg.addEventListener("mousedown", this.onMouseDownBinded, false);
    this.svg.addEventListener("dblclick", this.onMouseDoubleClickBinded, false);
    this.svg.addEventListener("contextmenu", this.onContextMenuBinded, false);

    window.addEventListener("mousemove", this.onMouseMoveBinded, false);
    window.addEventListener("mouseup", this.onMouseUpBinded, false);
    window.addEventListener("keydown", this.onKeyDownBinded, false);
    window.addEventListener("keyup", this.onKeyUpBinded, false);

    this.onFocus();
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.removeDomEventListeners =
  function () {
    if (this.svg) {
      var that = this;

      //兼容移动端
      this.svg.addEventListener(
        "touchstart",
        function (event) {
          CLOUD.DomUtil.adapterMobile(event, that.onMouseDownBinded);
        },
        false
      );
      window.addEventListener(
        "touchmove",
        function (event) {
          CLOUD.DomUtil.adapterMobile(event, that.onMouseMoveBinded);
        },
        false
      );

      window.addEventListener(
        "touchend",
        function (event) {
          CLOUD.DomUtil.adapterMobile(event, that.onMouseUpBinded);
        },
        false
      );

      this.svg.removeEventListener("mousedown", this.onMouseDownBinded, false);
      this.svg.removeEventListener(
        "dblclick",
        this.onMouseDoubleClickBinded,
        false
      );
      this.svg.removeEventListener(
        "contextmenu",
        this.onContextMenuBinded,
        false
      );

      window.removeEventListener("mousemove", this.onMouseMoveBinded, false);
      window.removeEventListener("mouseup", this.onMouseUpBinded, false);
      window.removeEventListener("keydown", this.onKeyDownBinded, false);
      window.removeEventListener("keyup", this.onKeyUpBinded, false);
    }
  };

CLOUD.Extensions.AnnotationEditor.prototype.onFocus = function () {
  if (this.svg && this.svg.focus) {
    this.svg.focus();
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.onContextMenu = function (event) {
  event.preventDefault();
};

CLOUD.Extensions.AnnotationEditor.prototype.onMouseDown = function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (event.button === this.mouseButtons.LEFT) {
    if (this.annotationFrame.isActive()) {
      this.annotationFrame.setAnnotation(this.selectedAnnotation);
      return;
    }

    this.handleMouseEvent(event, "down");

    if (!this.isCreating && event.target === this.svg) {
      this.selectAnnotation(null);
    }
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.onMouseMove = function (event) {
  // mark: 对应注册到window上的事件，如果调用会取消事件的默认动作，导致document上其他元素（例如textarea)的行为出现问题（例如，鼠标移动无法选择文本）
  //event.preventDefault();
  event.stopPropagation();

  if (event.button === this.mouseButtons.LEFT) {
    if (this.annotationFrame.isActive()) {
      this.annotationFrame.onMouseMove(event);
      this.annotationFrame.setAnnotation(this.selectedAnnotation);

      return;
    }

    this.handleMouseEvent(event, "move");
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.onMouseUp = function (event) {
  // mark: 对应注册到window上的事件，如果调用会取消事件的默认动作，导致document上其他元素（例如textarea)的行为出现问题（例如，鼠标移动无法选择文本）
  //event.preventDefault();
  event.stopPropagation();

  // 批注编辑结束
  if (this.annotationFrame.isActive()) {
    this.annotationFrame.onMouseUp(event);

    return;
  }

  if (this.selectedAnnotation && this.isCreating) {
    this.handleMouseEvent(event, "up");
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.onMouseDoubleClick = function (
  event,
  annotation
) {
  event.preventDefault();
  event.stopPropagation();

  if (!this.isEditing) {
    return;
  }

  if (this.isDblClickCloseCloud) {
    this.mouseDoubleClickForCloud(event);
  }

  this.mouseDoubleClickForText(event, annotation);
};

CLOUD.Extensions.AnnotationEditor.prototype.onKeyDown = function (event) {};

CLOUD.Extensions.AnnotationEditor.prototype.onKeyUp = function (event) {
  if (!this.isEditing) {
    return;
  }

  switch (event.keyCode) {
    case this.keys.DELETE:
      if (this.selectedAnnotation) {
        this.selectedAnnotation.delete();
        this.selectedAnnotation = null;
        this.deselectAnnotation();
      }
      break;
    case this.keys.ESC:
      // 结束云图绘制
      if (
        this.annotationType === CLOUD.Extensions.Annotation.shapeTypes.CLOUD
      ) {
        // 结束云图绘制，不封闭云图
        this.selectedAnnotation.finishTrack();
        this.selectedAnnotation.setSeal(false);
        this.createAnnotationEnd();
        this.deselectAnnotation();
      }

      this.forceAnnotationTextComplete();

      break;
    default:
      break;
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.onResize = function () {
  var bounds = this.getDomContainerBounds();

  this.bounds.x = 0;
  this.bounds.y = 0;
  this.bounds.width = bounds.width;
  this.bounds.height = bounds.height;

  this.svg.setAttribute("width", this.bounds.width + "");
  this.svg.setAttribute("height", this.bounds.height + "");

  this.updateAnnotations();
};

CLOUD.Extensions.AnnotationEditor.prototype.handleMouseEvent = function (
  event,
  type
) {
  var mode = this.annotationType;

  // 对文本批注的处理
  if (type === "down" && this.forceAnnotationTextComplete()) {
    return;
  }

  switch (mode) {
    case CLOUD.Extensions.Annotation.shapeTypes.RECTANGLE:
      if (type === "down") {
        if (this.mouseDownForRectangle(event)) {
          this.createAnnotationBegin();
        }
      } else if (type === "move") {
        this.mouseMoveForRectangle(event);
      } else if (type === "up") {
        this.createAnnotationEnd();
        this.deselectAnnotation();
      }
      break;
    case CLOUD.Extensions.Annotation.shapeTypes.CIRCLE:
      if (type === "down") {
        if (this.mouseDownForCircle(event)) {
          this.createAnnotationBegin();
        }
      } else if (type === "move") {
        this.mouseMoveForCircle(event);
      } else if (type === "up") {
        //this.created()
        this.createAnnotationEnd();
        this.deselectAnnotation();
      }
      break;
    // case CLOUD.Extensions.Annotation.shapeTypes.CROSS:
    //   if (type === "down") {
    //     if (this.mouseDownForCross(event)) {
    //       this.createAnnotationBegin();
    //     }
    //   } else if (type === "move") {
    //     this.mouseMoveForCross(event);
    //   } else if (type === "up") {
    //     this.createAnnotationEnd();
    //     this.deselectAnnotation();
    //   }
    //   break;
    case CLOUD.Extensions.Annotation.shapeTypes.CLOUD:
      if (type === "down") {
        if (this.mouseDownForCloud(event)) {
          this.createAnnotationBegin();
        }
      } else if (type === "move") {
        this.mouseMoveForCloud(event);
      } else if (type === "up") {
        this.mouseUpForCloud(event);
      }
      break;
    case CLOUD.Extensions.Annotation.shapeTypes.TEXT:
      if (type === "down") {
        this.mouseDownForText(event);
      }
      break;
    case CLOUD.Extensions.Annotation.shapeTypes.ARROW:
    default:
      if (type === "down") {
        if (this.mouseDownForArrow(event)) {
          this.createAnnotationBegin();
        }
      } else if (type === "move") {
        this.mouseMoveForArrow(event);
      } else if (type === "up") {
        this.createAnnotationEnd();
        this.deselectAnnotation();
      }
      break;
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseDownForArrow = function (
  event
) {
  if (this.selectedAnnotation) return false;

  var start = this.getPointOnDomContainer(event.clientX, event.clientY);

  this.originX = start.x;
  this.originY = start.y;

  var width = this.annotationMinLen;
  var tail = {
    x: this.originX,
    y: this.originY,
  };
  var head = {
    x: Math.round(tail.x + Math.cos(Math.PI * 0.25) * width),
    y: Math.round(tail.y + Math.sin(-Math.PI * 0.25) * width),
  };

  var constrain = function (tail, head, width, bounds) {
    if (
      CLOUD.Extensions.Utils.Geometric.isInsideBounds(head.x, head.y, bounds)
    ) {
      return;
    }

    head.y = Math.round(tail.y + Math.sin(Math.PI * 0.25) * width);

    if (
      CLOUD.Extensions.Utils.Geometric.isInsideBounds(head.x, head.y, bounds)
    ) {
      return;
    }

    head.x = Math.round(tail.y + Math.cos(-Math.PI * 0.25) * width);

    if (
      CLOUD.Extensions.Utils.Geometric.isInsideBounds(head.x, head.y, bounds)
    ) {
      return;
    }

    head.y = Math.round(tail.y + Math.sin(-Math.PI * 0.25) * width);
  };

  constrain(tail, head, width, this.getBounds());

  head = this.getAnnotationWorldPosition(head);
  tail = this.getAnnotationWorldPosition(tail);

  var arrowId = this.generateAnnotationId();
  var arrow = new CLOUD.Extensions.AnnotationArrow(this, arrowId);
  arrow.setByTailHead(tail, head);
  this.addAnnotation(arrow);
  arrow.created();

  this.selectedAnnotation = arrow;

  return true;
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseMoveForArrow = function (
  event
) {
  if (!this.selectedAnnotation || !this.isCreating) {
    return;
  }

  var arrow = this.selectedAnnotation;
  var end = this.getPointOnDomContainer(event.clientX, event.clientY);
  var bounds = this.getBounds();

  var startX = this.originX;
  var startY = this.originY;

  var deltaX = end.x - startX;

  if (Math.abs(deltaX) < this.annotationMinLen) {
    if (deltaX > 0) {
      end.x = startX + this.annotationMinLen;
    } else {
      end.x = startX - this.annotationMinLen;
    }
  }

  var endX = Math.min(Math.max(bounds.x, end.x), bounds.x + bounds.width);
  var endY = Math.min(Math.max(bounds.y, end.y), bounds.y + bounds.height);

  if (endX === startX && endY === startY) {
    endX++;
    endY++;
  }

  var tail = {
    x: startX,
    y: startY,
  };
  var head = {
    x: endX,
    y: endY,
  };

  tail = this.getAnnotationWorldPosition(tail);
  head = this.getAnnotationWorldPosition(head);

  if (
    Math.abs(arrow.head.x - head.x) >= this.epsilon ||
    Math.abs(arrow.head.y - head.y) >= this.epsilon ||
    Math.abs(arrow.tail.x - tail.x) >= this.epsilon ||
    Math.abs(arrow.tail.y - tail.y) >= this.epsilon
  ) {
    arrow.setByTailHead(tail, head);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseDownForRectangle = function (
  event
) {
  if (this.selectedAnnotation) return false;

  var start = this.getPointOnDomContainer(event.clientX, event.clientY);
  var minLen = this.annotationMinLen;

  this.originX = start.x;
  this.originY = start.y;

  var clientPosition = {
    x: start.x,
    y: start.y,
  };
  var clientSize = {
    width: minLen,
    height: minLen,
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  var id = this.generateAnnotationId();
  var rectangle = new CLOUD.Extensions.AnnotationRectangle(this, id);
  rectangle.set(position, size, 0);
  this.addAnnotation(rectangle);
  rectangle.created();

  this.selectedAnnotation = rectangle;

  return true;
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseMoveForRectangle = function (
  event
) {
  if (!this.selectedAnnotation || !this.isCreating) {
    return;
  }

  var rectangle = this.selectedAnnotation;
  var end = this.getPointOnDomContainer(event.clientX, event.clientY);
  var bounds = this.getBounds();

  var startX = this.originX;
  var startY = this.originY;
  var endX = Math.min(Math.max(bounds.x, end.x), bounds.x + bounds.width);
  var endY = Math.min(Math.max(bounds.y, end.y), bounds.y + bounds.height);

  if (endX === startX && endY === startY) {
    endX++;
    endY++;
  }

  var clientPosition = {
    x: (startX + endX) / 2,
    y: (startY + endY) / 2,
  };
  var clientSize = {
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY),
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  if (
    Math.abs(rectangle.position.x - position.x) > this.epsilon ||
    Math.abs(rectangle.size.y - size.y) > this.epsilon ||
    Math.abs(rectangle.position.y - position.y) > this.epsilon ||
    Math.abs(rectangle.size.y - size.y) > this.epsilon
  ) {
    rectangle.set(position, size);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseDownForCircle = function (
  event
) {
  if (this.selectedAnnotation) return false;

  var start = this.getPointOnDomContainer(event.clientX, event.clientY);

  this.originX = start.x;
  this.originY = start.y;

  var minLen = this.annotationMinLen;
  var clientPosition = {
    x: start.x,
    y: start.y,
  };
  var clientSize = {
    width: minLen,
    height: minLen,
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  var id = this.generateAnnotationId();
  var circle = new CLOUD.Extensions.AnnotationCircle(this, id);
  circle.set(position, size, 0);
  this.addAnnotation(circle);
  circle.created();

  this.selectedAnnotation = circle;

  return true;
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseMoveForCircle = function (
  event
) {
  if (!this.selectedAnnotation || !this.isCreating) {
    return;
  }

  var circle = this.selectedAnnotation;
  var end = this.getPointOnDomContainer(event.clientX, event.clientY);
  var bounds = this.getBounds();
  var startX = this.originX;
  var startY = this.originY;
  var endX = Math.min(Math.max(bounds.x, end.x), bounds.x + bounds.width);
  var endY = Math.min(Math.max(bounds.y, end.y), bounds.y + bounds.height);

  if (endX === startX && endY === startY) {
    endX++;
    endY++;
  }

  var clientPosition = {
    x: (startX + endX) / 2,
    y: (startY + endY) / 2,
  };
  var clientSize = {
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY),
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  if (
    Math.abs(circle.position.x - position.x) > this.epsilon ||
    Math.abs(circle.size.y - size.y) > this.epsilon ||
    Math.abs(circle.position.y - position.y) > this.epsilon ||
    Math.abs(circle.size.y - size.y) > this.epsilon
  ) {
    circle.set(position, size);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseDownForCross = function (
  event
) {
  if (this.selectedAnnotation) return false;

  var start = this.getPointOnDomContainer(event.clientX, event.clientY);

  this.originX = start.x;
  this.originY = start.y;

  var minLen = this.annotationMinLen;
  var clientPosition = {
    x: start.x,
    y: start.y,
  };
  var clientSize = {
    width: minLen,
    height: minLen,
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  var id = this.generateAnnotationId();
  var cross = new CLOUD.Extensions.AnnotationCross(this, id);
  cross.set(position, size, 0);
  this.addAnnotation(cross);
  cross.created();

  this.selectedAnnotation = cross;

  return true;
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseMoveForCross = function (
  event
) {
  if (!this.selectedAnnotation || !this.isCreating) {
    return;
  }

  var cross = this.selectedAnnotation;
  var end = this.getPointOnDomContainer(event.clientX, event.clientY);
  var bounds = this.getBounds();

  var startX = this.originX;
  var startY = this.originY;
  var endX = Math.min(Math.max(bounds.x, end.x), bounds.x + bounds.width);
  var endY = Math.min(Math.max(bounds.y, end.y), bounds.y + bounds.height);

  if (endX === startX && endY === startY) {
    endX++;
    endY++;
  }

  var clientPosition = {
    x: (startX + endX) / 2,
    y: (startY + endY) / 2,
  };
  var clientSize = {
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY),
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  if (
    Math.abs(cross.position.x - position.x) > this.epsilon ||
    Math.abs(cross.size.y - size.y) > this.epsilon ||
    Math.abs(cross.position.y - position.y) > this.epsilon ||
    Math.abs(cross.size.y - size.y) > this.epsilon
  ) {
    cross.set(position, size);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseDownForCloud = function (
  event
) {
  if (this.selectedAnnotation) return false;

  var start = this.getPointOnDomContainer(event.clientX, event.clientY);
  this.originX = start.x;
  this.originY = start.y;

  var position = this.getAnnotationWorldPosition({
    x: start.x,
    y: start.y,
  });
  this.cloudPoints = [position];

  var id = this.generateAnnotationId();
  var cloud = new CLOUD.Extensions.AnnotationCloud(this, id);
  cloud.setByPositions(this.cloudPoints);
  cloud.created();
  cloud.enableTrack();

  this.addAnnotation(cloud);
  this.selectedAnnotation = cloud;

  return true;
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseMoveForCloud = function (
  event
) {
  if (!this.selectedAnnotation || !this.isCreating) {
    return;
  }

  var cloud = this.selectedAnnotation;

  if (cloud.getTrackState()) {
    var mouse = this.getPointOnDomContainer(event.clientX, event.clientY);
    var position = this.getAnnotationWorldPosition(mouse);
    cloud.startTrack();
    cloud.setTrackingPoint(position);
  }
};

//CLOUD.Extensions.AnnotationEditor.prototype.mouseUpForCloud = function (event) {
//
//    if (!this.selectedAnnotation || !this.isCreating) {
//        return;
//    }
//
//    var end = this.getPointOnDomContainer(event.clientX, event.clientY);
//    var origin = {x: this.originX, y: this.originY};
//    var threshold = 2; // 相差2个像素
//
//    // 判断是否同一个点, 同一个点不加入集合
//    if (CLOUD.Extensions.Utils.Geometric.isEqualBetweenPoints(origin, end, threshold)) return;
//
//    var point = this.getAnnotationWorldPosition({x: end.x, y: end.y});
//    this.cloudPoints.push(point);
//
//    var cloud = this.selectedAnnotation;
//
//    // 先禁止跟踪，在真正响应事件时启用
//    cloud.disableTrack();
//
//    var positions = this.cloudPoints;
//
//    // 采用计时器来判断是否单击和双击
//    function handleMouseUp() {
//
//        cloud.finishTrack();
//        cloud.setByPositions(positions);
//        cloud.enableTrack();
//    }
//
//    if (this.timerId) {
//        clearTimeout(this.timerId);
//    }
//
//    // 延迟300ms以判断是否单击
//    this.timerId = setTimeout(handleMouseUp, 300);
//};
//
//CLOUD.Extensions.AnnotationEditor.prototype.mouseDoubleClickForCloud = function (event) {
//
//    if (this.isCreating && this.selectedAnnotation) {
//
//        if (this.selectedAnnotation.shapeType === CLOUD.Extensions.Annotation.shapeTypes.CLOUD) {
//
//            // 清除定时器
//            if (this.timerId) {
//                clearTimeout(this.timerId);
//            }
//
//            var position = this.getPointOnDomContainer(event.clientX, event.clientY);
//            var point = this.getAnnotationWorldPosition(position);
//
//            this.cloudPoints.push({x: point.x, y: point.y});
//            this.selectedAnnotation.finishTrack();
//            // 结束云图绘制，并封闭云图
//            this.selectedAnnotation.setByPositions(this.cloudPoints, true);
//            this.createAnnotationEnd();
//            this.deselectAnnotation();
//        }
//    }
//};

CLOUD.Extensions.AnnotationEditor.prototype.mouseUpForCloud = function (event) {
  if (event.button === this.mouseButtons.LEFT) {
    if (!this.selectedAnnotation || !this.isCreating) {
      return;
    }

    var end = this.getPointOnDomContainer(event.clientX, event.clientY);
    var origin = {
      x: this.originX,
      y: this.originY,
    };
    var threshold = 2; // 相差2个像素

    // 判断是否同一个点, 同一个点不加入集合
    if (
      CLOUD.Extensions.Utils.Geometric.isEqualBetweenPoints(
        origin,
        end,
        threshold
      )
    )
      return;

    var point = this.getAnnotationWorldPosition({
      x: end.x,
      y: end.y,
    });
    this.cloudPoints.push(point);

    var cloud = this.selectedAnnotation;

    // 先禁止跟踪，在真正响应事件时启用
    cloud.disableTrack();

    var positions = this.cloudPoints;

    // 采用计时器来判断是否单击和双击
    function handleMouseUp() {
      cloud.finishTrack();
      cloud.setByPositions(positions);
      cloud.enableTrack();
    }

    if (this.isDblClickCloseCloud) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      // 延迟300ms以判断是否单击
      this.timerId = setTimeout(handleMouseUp, 300);
    } else {
      handleMouseUp();
    }
  } else if (event.button === this.mouseButtons.RIGHT) {
    this.mouseDoubleClickForCloud(event);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseDoubleClickForCloud =
  function (event) {
    if (this.isCreating && this.selectedAnnotation) {
      if (
        this.selectedAnnotation.shapeType ===
        CLOUD.Extensions.Annotation.shapeTypes.CLOUD
      ) {
        if (this.isDblClickCloseCloud) {
          // 清除定时器
          if (this.timerId) {
            clearTimeout(this.timerId);
          }
        }

        var position = this.getPointOnDomContainer(
          event.clientX,
          event.clientY
        );
        var point = this.getAnnotationWorldPosition(position);

        this.cloudPoints.push({
          x: point.x,
          y: point.y,
        });
        this.selectedAnnotation.finishTrack();
        // 结束云图绘制，并封闭云图
        this.selectedAnnotation.setByPositions(this.cloudPoints, true);
        this.createAnnotationEnd();
        this.deselectAnnotation();
      }
    }
  };

CLOUD.Extensions.AnnotationEditor.prototype.mouseDownForText = function (
  event
) {
  //if (this.forceAnnotationTextComplete() ) {
  //    return;
  //}

  if (this.selectedAnnotation) {
    return;
  }
  //文字
  var start = this.getPointOnDomContainer(event.clientX, event.clientY);

  var clientFontSize = 16;

  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;

  var originWidth = clientFontSize * 20;
  var originHeight = clientFontSize * 4;

  if (isMobile) {
    var annotationStyle = this.annotationFrame.editor.annotationStyle;

    if (annotationStyle) {
      clientFontSize = parseInt(annotationStyle["font-size"]);
    }

    originWidth = clientFontSize * 2; //* 20;
    originHeight = clientFontSize * 1.5; //* 4;
  }

  var clientPosition = {
    x: start.x + 0.5 * originWidth,
    y: start.y + 0.5 * originHeight,
  };
  var clientSize = {
    width: originWidth,
    height: originHeight,
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  var id = this.generateAnnotationId();
  //var text = new CLOUD.Extensions.AnnotationText(this, id);
  var text = (this.currentAnnotationText = new CLOUD.Extensions.AnnotationText(
    this,
    id
  ));
  text.set(position, size, 0, "");
  this.addAnnotation(text);
  text.created();
  text.forceRedraw();

  this.selectedAnnotation = text;
  this.annotationTextArea.active(this.selectedAnnotation, true);

  return true;
};

CLOUD.Extensions.AnnotationEditor.prototype.mouseDoubleClickForText = function (
  event,
  annotation
) {
  if (annotation) {
    if (
      this.selectedAnnotation &&
      this.selectedAnnotation.shapeType ===
        CLOUD.Extensions.Annotation.shapeTypes.TEXT
    ) {
      this.currentAnnotationText = annotation;
      this.selectedAnnotation.hide();
      this.deselectAnnotation();
      this.annotationTextArea.active(annotation, false);
    }
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.init = function (callbacks) {
  if (callbacks) {
    this.beginEditCallback = callbacks.beginEditCallback;
    this.endEditCallback = callbacks.endEditCallback;
    this.changeEditorModeCallback = callbacks.changeEditorModeCallback;
  }

  if (!this.svg) {
    // debugger

    var rect = this.getDomContainerBounds();
    this.bounds.width = rect.width;
    this.bounds.height = rect.height;

    this.svg = CLOUD.Extensions.Utils.Shape2D.createSvgElement("svg");
    this.svg.style.position = "absolute";
    this.svg.style.display = "block";
    this.svg.style.left = "0";
    this.svg.style.top = "0";
    this.svg.setAttribute("width", rect.width + "");
    this.svg.setAttribute("height", rect.height + "");

    this.domElement.appendChild(this.svg);

    this.enableSVGPaint(false);

    this.annotationFrame = new CLOUD.Extensions.AnnotationFrame(
      this,
      this.domElement
    );
    this.annotationTextArea = new CLOUD.Extensions.AnnotationTextArea(
      this,
      this.domElement
    );
  }

  this.initialized = true;
};

CLOUD.Extensions.AnnotationEditor.prototype.uninit = function () {
  this.initialized = false;

  if (!this.svg) return;

  // 如果仍然处在编辑中，强行结束
  if (this.isEditing) {
    this.editEnd();
  }

  // 卸载数据
  this.unloadAnnotations();

  if (this.svg.parentNode) {
    this.svg.parentNode.removeChild(this.svg);
  }

  this.svgGroup = null;
  this.svg = null;

  this.beginEditCallback = null;
  this.endEditCallback = null;
  this.changeEditorModeCallback = null;

  //this.destroy();
};

CLOUD.Extensions.AnnotationEditor.prototype.isInitialized = function () {
  return this.initialized;
};

CLOUD.Extensions.AnnotationEditor.prototype.destroy = function () {
  this.forceAnnotationTextComplete();
  this.deselectAnnotation();

  if (this.annotationFrame) {
    this.annotationFrame.destroy();
    this.annotationFrame = null;
  }

  if (this.currentAnnotationText) {
    this.currentAnnotationText = null;
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.generateAnnotationId = function () {
  ++this.nextAnnotationId;

  return this.nextAnnotationId.toString(10);

  //return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //    return v.toString(16);
  //});
};

CLOUD.Extensions.AnnotationEditor.prototype.onExistEditor = function () {
  this.uninit();
};

CLOUD.Extensions.AnnotationEditor.prototype.editBegin = function () {
  if (this.isEditing) {
    return true;
  }

  if (!this.svgGroup) {
    this.svgGroup = CLOUD.Extensions.Utils.Shape2D.createSvgElement("g");
  }

  if (!this.svgGroup.parentNode) {
    this.svg.insertBefore(this.svgGroup, this.svg.firstChild);
  }

  this.handleCallbacks("beginEdit");

  // 注册事件
  this.addDomEventListeners();
  // 允许在SVG上绘图
  this.enableSVGPaint(true);
  // 清除数据
  this.clear();

  this.isEditing = true;
};

CLOUD.Extensions.AnnotationEditor.prototype.editEnd = function () {
  this.isEditing = false;

  this.forceAnnotationTextComplete();

  if (this.svgGroup && this.svgGroup.parentNode) {
    //this.svg.removeChild(this.svgGroup);
    this.svgGroup.parentNode.removeChild(this.svgGroup);
  }

  this.removeDomEventListeners();

  this.handleCallbacks("endEdit");

  // 不允许穿透
  this.enableSVGPaint(false);
  this.deselectAnnotation();
};

CLOUD.Extensions.AnnotationEditor.prototype.createAnnotationBegin =
  function () {
    if (!this.isCreating) {
      this.isCreating = true;
      this.disableAnnotationInteractions(true);
    }
  };

CLOUD.Extensions.AnnotationEditor.prototype.createAnnotationEnd = function () {
  if (this.isCreating) {
    this.isCreating = false;
    this.disableAnnotationInteractions(false);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.dragAnnotationFrameBegin =
  function () {
    this.disableAnnotationInteractions(true);
  };

CLOUD.Extensions.AnnotationEditor.prototype.dragAnnotationFrameEnd =
  function () {
    this.disableAnnotationInteractions(false);
  };

CLOUD.Extensions.AnnotationEditor.prototype.clear = function () {
  var annotations = this.annotations;

  while (annotations.length) {
    var annotation = annotations[0];
    this.removeAnnotation(annotation);
    annotation.destroy();
  }

  var group = this.svgGroup;
  if (group && group.childNodes.length > 0) {
    while (group.childNodes.length) {
      group.removeChild(group.childNodes[0]);
    }
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.setAnnotationType = function (
  type
) {
  this.forceAnnotationTextComplete();

  this.annotationType = type;

  // 强行完成
  this.createAnnotationEnd();
  this.deselectAnnotation();

  this.onFocus();
};

CLOUD.Extensions.AnnotationEditor.prototype.addAnnotation = function (
  annotation
) {
  annotation.setParent(this.svgGroup);

  this.annotations.push(annotation);
};

CLOUD.Extensions.AnnotationEditor.prototype.deleteAnnotation = function (
  annotation
) {
  if (annotation) {
    this.removeAnnotation(annotation);
    annotation.destroy();
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.removeAnnotation = function (
  annotation
) {
  var idx = this.annotations.indexOf(annotation);

  if (idx !== -1) {
    this.annotations.splice(idx, 1);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.setAnnotationSelection = function (
  annotation
) {
  if (this.selectedAnnotation !== annotation) {
    this.deselectAnnotation();
  }

  this.selectedAnnotation = annotation;

  // 放在最前面

  if (!this.isCreating) {
    this.annotationFrame.setAnnotation(annotation);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.selectAnnotation = function (
  annotation
) {
  if (annotation) {
    if (this.annotationType === annotation.shapeType) {
      this.setAnnotationSelection(annotation);
    } else {
      var shapeType = annotation.shapeType;

      this.setAnnotationSelection(null);
      //this.setAnnotationType(shapeType);
      this.setAnnotationSelection(annotation);
    }
  } else {
    this.setAnnotationSelection(null);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.deselectAnnotation = function () {
  if (this.selectedAnnotation) {
    this.selectedAnnotation.deselect();
    this.selectedAnnotation = null;
  }

  this.annotationFrame.setAnnotation(null);
};

CLOUD.Extensions.AnnotationEditor.prototype.worldToClient = function (wPoint) {
  var rect = this.getDomContainerBounds();
  var camera = this.cameraEditor.object;
  var result = new THREE.Vector3(wPoint.x, wPoint.y, wPoint.z);

  // 变换到相机空间
  result.applyMatrix4(camera.matrixWorld);
  result.sub(camera.position);
  result.project(camera);

  // 变换到屏幕空间
  result.x = Math.floor(0.5 * (result.x + 1) * rect.width + 0.5);
  result.y = Math.floor(-0.5 * (result.y - 1) * rect.height + 0.5);
  result.z = 0;

  return result;
};

CLOUD.Extensions.AnnotationEditor.prototype.clientToWorld = function (cPoint) {
  var rect = this.getDomContainerBounds();
  var camera = this.cameraEditor.object;
  var result = new THREE.Vector3();

  result.x = (cPoint.x / rect.width) * 2 - 1;
  result.y = (-cPoint.y / rect.height) * 2 + 1;
  result.z = 0;

  result.unproject(camera);
  result.add(camera.position).applyMatrix4(camera.matrixWorldInverse);
  //result.z = 0;

  return result;
};

CLOUD.Extensions.AnnotationEditor.prototype.getAnnotationWorldPosition =
  function (cPos) {
    return this.clientToWorld(cPos);
  };

CLOUD.Extensions.AnnotationEditor.prototype.getAnnotationClientPosition =
  function (wPos) {
    return this.worldToClient(wPos);
  };

CLOUD.Extensions.AnnotationEditor.prototype.getAnnotationWorldSize = function (
  cSize,
  cPos
) {
  var lt = this.clientToWorld({
    x: cPos.x - 0.5 * cSize.width,
    y: cPos.y - 0.5 * cSize.height,
  });
  var rb = this.clientToWorld({
    x: cPos.x + 0.5 * cSize.width,
    y: cPos.y + 0.5 * cSize.height,
  });

  return {
    width: Math.abs(rb.x - lt.x),
    height: Math.abs(rb.y - lt.y),
  };
};

CLOUD.Extensions.AnnotationEditor.prototype.getAnnotationClientSize = function (
  wSize,
  wPos
) {
  var lt = this.worldToClient({
    x: wPos.x - 0.5 * wSize.width,
    y: wPos.y - 0.5 * wSize.height,
    z: wPos.z,
  });
  var rb = this.worldToClient({
    x: wPos.x + 0.5 * wSize.width,
    y: wPos.y + 0.5 * wSize.height,
    z: wPos.z,
  });

  return {
    width: Math.abs(rb.x - lt.x),
    height: Math.abs(rb.y - lt.y),
  };
};

CLOUD.Extensions.AnnotationEditor.prototype.getMarkersBoundingBox =
  function () {
    return null;
  };

CLOUD.Extensions.AnnotationEditor.prototype.getBounds = function () {
  return this.bounds;
};

CLOUD.Extensions.AnnotationEditor.prototype.getPointOnDomContainer = function (
  clientX,
  clientY
) {
  var rect = this.getDomContainerBounds();

  return new THREE.Vector2(clientX - rect.left, clientY - rect.top);
};

CLOUD.Extensions.AnnotationEditor.prototype.getDomContainerBounds =
  function () {
    return CLOUD.DomUtil.getContainerOffsetToClient(this.domElement);
  };

CLOUD.Extensions.AnnotationEditor.prototype.getViewBox = function (
  clientWidth,
  clientHeight
) {
  var lt = this.clientToWorld({
    x: 0,
    y: 0,
  });
  var rb = this.clientToWorld({
    x: clientWidth,
    y: clientHeight,
  });
  var left = Math.min(lt.x, rb.x);
  var top = Math.min(lt.y, rb.y);
  var right = Math.max(lt.x, rb.x);
  var bottom = Math.max(lt.y, rb.y);

  return [left, top, right - left, bottom - top].join(" ");
};

CLOUD.Extensions.AnnotationEditor.prototype.handleTextChange = function (data) {
  var text = data.annotation;

  if (data.text === "") {
    this.selectAnnotation(null);
    data.annotation.delete();
    return;
  }

  var clientPosition = {
    x: data.position.x,
    y: data.position.y,
  };
  var clientSize = {
    width: data.width,
    height: data.height,
  };
  var position = this.getAnnotationWorldPosition(clientPosition);
  var size = this.getAnnotationWorldSize(clientSize, clientPosition);

  text.resetSize(size, position);
  text.setText(data.text);

  this.createAnnotationEnd();
  this.deselectAnnotation();
};

CLOUD.Extensions.AnnotationEditor.prototype.disableAnnotationInteractions =
  function (disable) {
    this.annotations.forEach(function (annotation) {
      annotation.disableInteractions(disable);
    });
  };

CLOUD.Extensions.AnnotationEditor.prototype.handleCallbacks = function (name) {
  switch (name) {
    case "beginEdit":
      if (this.beginEditCallback) {
        this.beginEditCallback(this.domElement);
      }
      break;
    case "endEdit":
      if (this.endEditCallback) {
        this.endEditCallback(this.domElement);
      }
      break;
    case "changeEditor":
      if (this.changeEditorModeCallback) {
        this.changeEditorModeCallback(this.domElement);
      }
      break;
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.renderToCanvas = function (ctx) {
  this.annotations.forEach(function (annotation) {
    ctx.save();
    annotation.renderToCanvas(ctx);
    ctx.restore();
  });
};

// 是否允许在SVG上绘图
CLOUD.Extensions.AnnotationEditor.prototype.enableSVGPaint = function (enable) {
  if (enable) {
    this.svg && this.svg.setAttribute("pointer-events", "painted");
  } else {
    this.svg && this.svg.setAttribute("pointer-events", "none");
  }
};

// 强制结束文本批注的编辑
CLOUD.Extensions.AnnotationEditor.prototype.forceAnnotationTextComplete =
  function () {
    //if (this.annotationType === CLOUD.Extensions.Annotation.shapeTypes.TEXT) {

    if (this.annotationTextArea && this.annotationTextArea.isActive()) {
      this.annotationTextArea.accept();

      if (this.currentAnnotationText) {
        this.currentAnnotationText = null;
      }

      return true;
    }
    //}

    return false;
  };

// 强制结束文本批注的编辑
CLOUD.Extensions.AnnotationEditor.prototype.resetCurrentAnnotationText =
  function () {
    if (this.currentAnnotationText) {
      this.currentAnnotationText = null;
    }
  };

// ---------------------------- 外部 API BEGIN ---------------------------- //

// 屏幕快照
CLOUD.Extensions.AnnotationEditor.prototype.getScreenSnapshot = function (
  snapshot,
  callback
) {
  var self = this;

  var canvas = document.createElement("canvas");

  var bounds = this.getDomContainerBounds();
  canvas.width = bounds.width;
  canvas.height = bounds.height;

  var ctx = canvas.getContext("2d");
  var startColor = this.gradientStartColor;
  var stopColor = this.gradientStopColor;

  // 绘制背景
  if (startColor) {
    if (stopColor) {
      var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, stopColor);

      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = startColor;
    }

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (callback && snapshot) {
    var preSnapshot = new Image();

    preSnapshot.onload = function () {
      ctx.drawImage(preSnapshot, 0, 0);

      // 绘制批注
      self.renderToCanvas(ctx);

      var data = canvas.toDataURL("image/png");

      canvas = ctx = null;

      callback(data);
    };

    preSnapshot.src = snapshot;

    return null;
  } else {
    if (snapshot) {
      var preSnapshot = new Image();
      preSnapshot.src = snapshot;
      ctx.drawImage(preSnapshot, 0, 0);
    }

    // 绘制批注
    this.renderToCanvas(ctx);

    var data = canvas.toDataURL("image/png");

    canvas = ctx = null;

    return data;
  }
};

// 设置导出背景色
CLOUD.Extensions.AnnotationEditor.prototype.setBackgroundColor = function (
  startColor,
  stopColor
) {
  this.gradientStartColor = startColor;
  this.gradientStopColor = stopColor;
};

// 获得批注列表
CLOUD.Extensions.AnnotationEditor.prototype.getAnnotationInfoList =
  function () {
    // 强行完成
    this.forceAnnotationTextComplete();
    this.createAnnotationEnd();
    this.deselectAnnotation();

    var annotationInfoList = [];

    for (var i = 0, len = this.annotations.length; i < len; i++) {
      var annotation = this.annotations[i];

      var text = "";
      if (
        annotation.shapeType === CLOUD.Extensions.Annotation.shapeTypes.TEXT
      ) {
        text = encodeURIComponent(annotation.currText); // 编码中文
        //text = annotation.currText; // 编码中文
      }

      var shapePoints = "";
      var originSize = null;
      if (
        annotation.shapeType === CLOUD.Extensions.Annotation.shapeTypes.CLOUD
      ) {
        shapePoints = annotation.getShapePoints();
        originSize = annotation.originSize;
      }

      var info = {
        id: annotation.id,
        shapeType: annotation.shapeType,
        position: annotation.position,
        size: annotation.size,
        rotation: annotation.rotation,
        shapePoints: shapePoints,
        originSize: originSize,
        style: annotation.style, //
        text: text,
      };

      annotationInfoList.push(info);
    }

    return annotationInfoList;
  };

// 加载批注
CLOUD.Extensions.AnnotationEditor.prototype.loadAnnotations = function (
  annotationInfoList
) {
  if (!this.svgGroup) {
    this.svgGroup = CLOUD.Extensions.Utils.Shape2D.createSvgElement("g");
  }

  // 清除数据
  this.clear();

  if (!this.svgGroup.parentNode) {
    this.svg.insertBefore(this.svgGroup, this.svg.firstChild);
  }

  for (var i = 0, len = annotationInfoList.length; i < len; i++) {
    var info = annotationInfoList[i];
    var id = info.id;
    var shapeType = info.shapeType;
    var position = info.position;
    var size = info.size;
    var rotation = info.rotation;
    var shapePointsStr = info.shapePoints;
    var originSize = info.originSize;
    //var text = info.text; // 解码中文
    var text = decodeURIComponent(info.text); // 解码中文
    var style = info.style ? info.style : this.annotationStyle;

    switch (shapeType) {
      case CLOUD.Extensions.Annotation.shapeTypes.ARROW:
        var arrow = new CLOUD.Extensions.AnnotationArrow(this, id);
        arrow.set(position, size, rotation);
        arrow.setStyle(style);
        this.addAnnotation(arrow);
        arrow.created();
        break;
      case CLOUD.Extensions.Annotation.shapeTypes.RECTANGLE:
        var rectangle = new CLOUD.Extensions.AnnotationRectangle(this, id);
        rectangle.set(position, size, rotation);
        rectangle.setStyle(style);
        this.addAnnotation(rectangle);
        rectangle.created();
        break;
      case CLOUD.Extensions.Annotation.shapeTypes.CIRCLE:
        var circle = new CLOUD.Extensions.AnnotationCircle(this, id);
        circle.set(position, size, rotation);
        circle.setStyle(style);
        this.addAnnotation(circle);
        circle.created();
        break;
      // case CLOUD.Extensions.Annotation.shapeTypes.CROSS:
      //   var cross = new CLOUD.Extensions.AnnotationCross(this, id);
      //   cross.set(position, size, rotation);
      //   cross.setStyle(style);
      //   this.addAnnotation(cross);
      //   cross.created();
      //   break;
      case CLOUD.Extensions.Annotation.shapeTypes.CLOUD:
        var cloud = new CLOUD.Extensions.AnnotationCloud(this, id);
        cloud.set(position, size, rotation, shapePointsStr, originSize);
        cloud.setStyle(style);
        this.addAnnotation(cloud);
        cloud.created();
        break;
      case CLOUD.Extensions.Annotation.shapeTypes.TEXT:
        var textAnnotation = new CLOUD.Extensions.AnnotationText(this, id);
        textAnnotation.set(position, size, rotation, text);
        textAnnotation.setStyle(style);
        this.addAnnotation(textAnnotation);
        textAnnotation.created();
        textAnnotation.forceRedraw();
        break;
      default:
        break;
    }
  }
};

// 卸载批注
CLOUD.Extensions.AnnotationEditor.prototype.unloadAnnotations = function () {
  // 清除数据
  this.clear();

  if (this.svgGroup && this.svgGroup.parentNode) {
    this.svgGroup.parentNode.removeChild(this.svgGroup);
  }
};

// 显示批注
CLOUD.Extensions.AnnotationEditor.prototype.showAnnotations = function () {
  if (this.svgGroup) {
    this.svgGroup.setAttribute("visibility", "visible");
  }
};

// 隐藏批注
CLOUD.Extensions.AnnotationEditor.prototype.hideAnnotations = function () {
  if (this.svgGroup) {
    this.svgGroup.setAttribute("visibility", "hidden");
  }
};

// 设置批注风格（边框色，填充色，字体大小等等）
CLOUD.Extensions.AnnotationEditor.prototype.setAnnotationStyle = function (
  style,
  updateText
) {
  this.annotationStyle = CLOUD.DomUtil.cloneStyle(style);

  if (updateText) {
    //if (this.annotationType === CLOUD.Extensions.Annotation.shapeTypes.TEXT) {

    // 对文本特殊处理
    if (this.currentAnnotationText) {
      this.currentAnnotationText.updateStyle(style);

      if (this.annotationTextArea) {
        this.annotationTextArea.setStyle(style);
      }
    }
    // }
  }
};

// 更新所有批注
CLOUD.Extensions.AnnotationEditor.prototype.updateAnnotations = function () {
  for (var i = 0, len = this.annotations.length; i < len; i++) {
    var annotation = this.annotations[i];
    annotation.update();
  }

  if (this.annotationFrame && this.selectedAnnotation) {
    this.annotationFrame.setAnnotation(this.selectedAnnotation);
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.onCameraChange = function () {
  if (this.cameraEditor.cameraDirty) {
    this.handleCallbacks("changeEditor");
  }
};

CLOUD.Extensions.AnnotationEditor.prototype.enableDblClickCloseCloud =
  function (enable) {
    this.isDblClickCloseCloud = enable;
  };

// ---------------------------- 外部 API END ---------------------------- //

var CLOUD = CLOUD || {}; // @孔德胜
CLOUD.Extensions = CLOUD.Extensions || {};

CLOUD.Extensions.Annotation2DEditor = function (domElement) {
  "use strict";

  CLOUD.Extensions.AnnotationEditor.call(this, domElement);

  this.absoluteBasePoint = null;
  this.screenBasePoint = null;
  this.zoomFactor = {
    x: 1.0,
    y: 1.0,
  };
};

CLOUD.Extensions.Annotation2DEditor.prototype = Object.create(
  CLOUD.Extensions.AnnotationEditor.prototype
);
CLOUD.Extensions.Annotation2DEditor.prototype.constructor =
  CLOUD.Extensions.Annotation2DEditor;

CLOUD.Extensions.Annotation2DEditor.prototype.setDomContainer = function (
  domElement
) {
  if (domElement) {
    this.domElement = domElement;
  }
};

// 设置绝对基点
CLOUD.Extensions.Annotation2DEditor.prototype.setAbsoluteBasePoint = function (
  point
) {
  if (point) {
    if (!this.absoluteBasePoint) {
      this.absoluteBasePoint = {};
    }

    this.absoluteBasePoint.x = point.x;
    this.absoluteBasePoint.y = point.y;
  }
};

// 设置屏幕基点
CLOUD.Extensions.Annotation2DEditor.prototype.setScreenBasePoint = function (
  point
) {
  if (point) {
    if (!this.screenBasePoint) {
      this.screenBasePoint = {};
    }

    this.screenBasePoint.x = point.x;
    this.screenBasePoint.y = point.y;
  }
};

// 设置缩放因子
CLOUD.Extensions.Annotation2DEditor.prototype.setZoomFactor = function (
  factorX,
  factorY
) {
  factorX = factorX || 1.0;
  factorY = factorY || 1.0;
  this.zoomFactor.x = factorX;
  this.zoomFactor.y = factorY;
};

CLOUD.Extensions.Annotation2DEditor.prototype.worldToClient = function (
  wPoint
) {
  // (Wp - Wc) * zoomFactor = Sp - Sc ===> Sp = (Wp - Wc) * zoomFactor + Sc

  var rect = this.getDomContainerBounds();
  var result = new THREE.Vector3();
  var absBasePoint = this.absoluteBasePoint;
  var screenBasePoint = this.screenBasePoint;

  if (!this.absoluteBasePoint) {
    absBasePoint = {
      x: 0.0,
      y: 0.0,
    };
  }

  if (!this.screenBasePoint) {
    screenBasePoint = {
      x: rect.width * 0.5,
      y: rect.height * 0.5,
    };
  }

  // 变换到屏幕空间
  result.x =
    (wPoint.x - absBasePoint.x) * this.zoomFactor.x + screenBasePoint.x;
  result.y =
    (-wPoint.y - absBasePoint.y) * this.zoomFactor.y + screenBasePoint.y;
  result.z = 0;

  return result;
};

CLOUD.Extensions.Annotation2DEditor.prototype.clientToWorld = function (
  cPoint
) {
  // Wp - Wc = Sp - Sc ===> Wp = Sp - Sc + Wc
  // (Wp - Wc) * zoomFactor = Sp - Sc ===> Wp = (Sp - Sc) / zoomFactor + Wc

  var rect = this.getDomContainerBounds();
  var result = new THREE.Vector3();
  var invFactorX = 1 / this.zoomFactor.x;
  var invFactorY = 1 / this.zoomFactor.y;
  var absBasePoint = this.absoluteBasePoint;
  var screenBasePoint = this.screenBasePoint;

  if (!this.absoluteBasePoint) {
    absBasePoint = {
      x: 0.0,
      y: 0.0,
    };
  }

  if (!this.screenBasePoint) {
    screenBasePoint = {
      x: rect.width * 0.5,
      y: rect.height * 0.5,
    };
  }

  result.x = (cPoint.x - screenBasePoint.x) * invFactorX + absBasePoint.x;
  result.y = -((cPoint.y - screenBasePoint.y) * invFactorY + absBasePoint.y); // 翻转,因为绘制图形参照坐标和屏幕的坐标系不同
  result.z = 0;

  return result;
};

CLOUD.Extensions.Annotation2DEditor.prototype.onCameraChange = function () {
  this.handleCallbacks("changeEditor");
};

CLOUD.Extensions.Annotation2DEditor.prototype.setSvgZIndex = function (zIndex) {
  zIndex = zIndex || 18;

  if (this.svg) {
    this.svg.style.zIndex = zIndex;
  }
};
var CLOUD = CLOUD || {}; // @孔德胜
CLOUD.Extensions = CLOUD.Extensions || {};

CLOUD.Extensions.PdfAnnotationHelper = function (domContainer) {
  this.annotationContainer = domContainer;
  this.defaultStyle = {
    "stroke-width": 3,
    "stroke-color": "#ff0000",
    "stroke-opacity": 1.0,
    "fill-color": "#ff0000",
    "fill-opacity": 0.0,
    "font-family": "Arial",
    "font-size": 16,
    "font-style": "",
    "font-weight": "",
  };
  this.isDblClickCloseCloud = false;
};

CLOUD.Extensions.PdfAnnotationHelper.prototype = {
  constructor: CLOUD.Extensions.PdfAnnotationHelper,

  destroy: function () {
    this.uninitAnnotation();
    this.editor = null;
    this.annotationContainer = null;
    this.beginEditCallback = null;
    this.endEditCallback = null;
    this.stateChangeCallback = null;
    this.defaultStyle = null;
  },

  // 设置批注容器, 在使用批注功能前，需要先设置dom容器
  setDomContainer: function (domContainer) {
    this.annotationContainer = domContainer;
  },

  // 设置回调, 在使用批注功能前，根据需要设置（如果需要设置，在初始化之前设置）
  setEditCallback: function (
    beginEditCallback,
    endEditCallback,
    stateChangeCallback
  ) {
    this.beginEditCallback = beginEditCallback;
    this.endEditCallback = endEditCallback;
    this.stateChangeCallback = stateChangeCallback;
  },

  // 初始化, 不用显示调用
  initAnnotation: function () {
    var scope = this;
    var domElement = this.annotationContainer;

    if (!this.editor) {
      this.editor = new CLOUD.Extensions.Annotation2DEditor(domElement);
    } else {
      // 设置父容器
      this.editor.setDomContainer(domElement);
    }

    this.editor.enableDblClickCloseCloud(this.isDblClickCloseCloud);

    if (!this.editor.isInitialized()) {
      var callbacks = {
        beginEditCallback: scope.beginEditCallback,
        endEditCallback: scope.endEditCallback,
        changeEditorModeCallback: scope.stateChangeCallback,
      };

      this.editor.init(callbacks);

      callbacks = null;
    }
  },

  // 卸载
  uninitAnnotation: function () {
    if (this.editor && this.editor.isInitialized()) {
      this.editor.uninit();
    }
  },

  // 设置背景色
  setAnnotationBackgroundColor: function (startColor, stopColor) {
    // 如果初始化，则自动初始化
    this.initAnnotation();
    this.editor.setBackgroundColor(startColor, stopColor);
  },

  // 开始编辑
  editAnnotationBegin: function (absBasePoint, screenBasePoint, zoomFactor) {
    // 如果初始化，则自动初始化
    this.initAnnotation();

    if (absBasePoint) {
      this.editor.setAbsoluteBasePoint(absBasePoint);
    }

    if (screenBasePoint) {
      this.editor.setScreenBasePoint(screenBasePoint);
    }

    if (zoomFactor) {
      this.editor.setZoomFactor(zoomFactor.x, zoomFactor.y);
    }

    this.editor.editBegin();
  },

  // 完成编辑
  editAnnotationEnd: function () {
    if (this.editor) {
      this.editor.editEnd();
    }
  },

  // 设置批注类型
  setAnnotationType: function (type) {
    // 如果初始化，则自动初始化
    this.initAnnotation();
    this.editor.setAnnotationType(type);
  },

  // 设置批注风格
  setAnnotationStyle: function (style, updateText) {
    // 如果初始化，则自动初始化
    this.initAnnotation();

    for (var attr in style) {
      if (attr in this.defaultStyle) {
        this.defaultStyle[attr] = style[attr];
      }
    }

    this.editor.setAnnotationStyle(this.defaultStyle, updateText);
  },

  // 加载批注
  loadAnnotations: function (
    annotations,
    absBasePoint,
    screenBasePoint,
    zoomFactor
  ) {
    if (annotations) {
      // 如果初始化，则自动初始化
      this.initAnnotation();

      if (absBasePoint) {
        this.editor.setAbsoluteBasePoint(absBasePoint);
      }

      if (screenBasePoint) {
        this.editor.setScreenBasePoint(screenBasePoint);
      }

      if (zoomFactor) {
        this.editor.setZoomFactor(zoomFactor.x, zoomFactor.y);
      }

      this.editor.loadAnnotations(annotations);
    } else {
      this.uninitAnnotation();
    }
  },

  // 获得批注对象列表
  getAnnotationInfoList: function () {
    if (this.editor) {
      return this.editor.getAnnotationInfoList();
    }

    return null;
  },

  // 获得批注对象列表
  getAnnotationInfoListWithBox: function () {
    if (this.editor) {
      var annotationInfoList = this.editor.getAnnotationInfoList();

      if (annotationInfoList.length === 0) {
        return null;
      }

      var boundingBox = new THREE.Box2();

      // 计算包围盒
      for (var i = 0, len = annotationInfoList.length; i < len; i++) {
        var info = annotationInfoList[i];
        var shapeType = info.shapeType;
        var position = info.position;
        var size = info.size;
        var rotation = info.rotation || 0;

        if (shapeType === CLOUD.Extensions.Annotation.shapeTypes.ARROW) {
          var dir = new THREE.Vector2(Math.cos(rotation), Math.sin(rotation));
          dir.multiplyScalar(size.width * 0.5);
          var center = new THREE.Vector2(position.x, position.y);
          var tail = center.clone().sub(dir);
          var head = center.clone().add(dir);

          tail.y = -tail.y; // 注意: y值要取反，原因是坐标变换时取过反
          head.y = -head.y;

          boundingBox.expandByPoint(tail);
          boundingBox.expandByPoint(head);
        } else {
          var lt = new THREE.Vector2(
            position.x - 0.5 * size.width,
            -position.y - 0.5 * size.height
          ); // 注意: y值要取反，原因是坐标变换时取过反
          var rb = new THREE.Vector2(
            position.x + 0.5 * size.width,
            -position.y + 0.5 * size.height
          ); // 注意: y值要取反，原因是坐标变换时取过反
          boundingBox.expandByPoint(lt);
          boundingBox.expandByPoint(rb);
        }
      }

      return {
        boundingBox: boundingBox,
        annotations: annotationInfoList,
      };
    }

    return null;
  },

  // resize
  resizeAnnotations: function () {
    if (this.editor && this.editor.isInitialized()) {
      this.editor.onResize();
    }
  },

  // 状态变化
  onStateChange: function () {
    if (this.editor && this.editor.isInitialized()) {
      this.editor.onCameraChange();
    }
  },

  // 特殊处理 - 是否允许双击关闭云图批注
  enableDblClickCloseCloud: function (enable) {
    this.isDblClickCloseCloud = enable;
  },

  // 截屏 base64格式png图片
  captureAnnotationsScreenSnapshot: function (dataUrl, callback) {
    return this.editor.getScreenSnapshot(dataUrl, callback);
  },

  setAbsoluteBasePoint: function (point) {
    // 如果初始化，则自动初始化
    this.initAnnotation();

    if (point) {
      this.editor.setAbsoluteBasePoint(point);
    }
  },

  setScreenBasePoint: function (point) {
    // 如果初始化，则自动初始化
    this.initAnnotation();

    if (point) {
      this.editor.setScreenBasePoint(point);
    }
  },

  setZoomFactor: function (factorX, factorY) {
    factorY = factorY || factorX;

    // 如果初始化，则自动初始化
    this.initAnnotation();

    this.editor.setZoomFactor(factorX, factorY);
  },
};
(function ($) {
  var markPdf = function (options) {
    var self = this;
    var defaults = {
      container: null,
      background: null,
      type: "new",
      pointToCenter: {
        x: 1,
        y: 1,
      },
      zoomFactor: {
        x: 1,
        y: 1,
      },
    };
    var opt = (self._option = $.extend({}, defaults, options));
    self._dom = {
      bimBox: $('<div class="bim bim-markup"></div>'),
      markBox: $('<div class="markup"></div>'),
      toolBar: $('<div class="modelBar" style="display:none;"></div>'),
    };
    self.init();
  };
  markPdf.prototype = {
    init: function () {
      var self = this;
      if (!self._option.container || self._option.container.length == 0) {
        alert("container不能为空");
        return false;
      }

      if (!self.annotation) {
        self.annotation = new CLOUD.Extensions.PdfAnnotationHelper();
      }
      var annotation = self.annotation;

      self._dom.bimBox.append(self._dom.markBox);

      self.controll();
      $(".bim.bim-markup").remove();
      if (!$("svg", self._option.container).length) {
        self._option.container.append(self._dom.bimBox);
        //self._option.modelBarContainer.append(self._dom.bimBox);
      }

      annotation.setDomContainer(self._dom.markBox[0]);
    },
    begin: function () {
      var self = this;
      self.annotation.editAnnotationBegin(
        self._option.pointToCenter,
        self._option.screenBasePoint,
        {
          x: self._option.zoomFactor,
          y: self._option.zoomFactor,
        }
      );
      self._dom.toolBar.show();
    },
    save: function (backgroundImage, callback) {
      var self = this;
      self.annotation.editAnnotationEnd();
      var img = self.annotation.captureAnnotationsScreenSnapshot(
        backgroundImage,
        callback
      );
      self._dom.bimBox.remove();
      return img;
    },
    cancel: function () {
      var self = this;
      self.annotation.editAnnotationEnd();
      self._dom.bimBox.remove();
    },
    controll: function () {
      var self = this;
      var defaultStyle = {
        "stroke-width": 3,
        "stroke-color": "#ff0000",
        "stroke-opacity": 1.0,
        "fill-color": "#ff0000",
        "fill-opacity": 0.0,
        "font-family": "Arial",
        "font-size": 16,
        "font-style": "", // 'italic'
        "font-weight": "", // 'bold'
      };
      var menu = [
        {
          id: "cloud",
          icon: "bim-ncloud",
          markType: "4",
          type: "setMarkType",
        },
        {
          id: "arrow",
          icon: "bim-narrow",
          markType: "6",
          type: "setMarkType",
          default: true,
        },
        {
          id: "rect",
          icon: "bim-nrectangle",
          markType: "1",
          type: "setMarkType",
        },
        {
          id: "circular",
          icon: "bim-noval",
          markType: "2",
          type: "setMarkType",
        },
        // {
        //   id: "mark",
        //   icon: "bim-mark",
        //   markType: "3",
        //   type: "setMarkType",
        // },
        {
          id: "text",
          icon: "bim-ntext",
          markType: "5",
          type: "text",
          children: {
            type: "select",
            arr: ["12", "14", "16", "20", "24", "32"],
          },
        },
        {
          id: "divide",
          type: "divide",
        },
        {
          id: "color",
          icon: "bim-ncolor",
          type: "more",
          children: {
            type: "color",
            icon: "bim-ncolor",
            arr: [
              "#d0021b",
              "#ed4dad",
              "#2b84ed",
              "#7ed321",
              "#f8e71c",
              "#f58a23",
              "#5c5c5c",
              "#000000",
              "#ffffff",
            ],
          },
        },
        {
          id: "line",
          icon: "bim-line",
          type: "more",
          children: {
            type: "line",
            icon: "bim-line",
            arr: ["3", "8", "12"],
          },
        },
      ];
      var toolBar = self._dom.toolBar;
      var bimBox = self._dom.bimBox;

      function renderBar(obj) {
        switch (obj.type) {
          case "divede":
            return '<span class="divide"></span>';
            break;
          case "more":
            return (
              '<div class="bar-item" data-type="' +
              obj.type +
              '"><i class="' +
              obj.icon +
              '"></i>' +
              renderBar(obj.children) +
              "</div>"
            );
            break;
          case "setMarkType":
            var isSelected = obj.default ? "selected" : "";
            return (
              '<i class="bar-item ' +
              obj.icon +
              " " +
              isSelected +
              '" data-fn="' +
              obj.markType +
              '" data-type="' +
              obj.type +
              '"></i>'
            );
            break;
          case "text":
            return (
              '<div class="bar-item ' +
              obj.icon +
              '" data-fn="' +
              obj.markType +
              '" data-type="' +
              obj.type +
              '">' +
              renderBar(obj.children) +
              "</div>"
            );
            break;
          case "select":
            var template = '<div class="subBar model-select"><select>';
            $.each(obj.arr, function (index, item) {
              template +=
                '<option value="' + item + '">' + item + "px</option>";
            });
            template += "<select></div>";
            return template;
            break;
          case "color":
            var template = '<div class="subBar">';
            $.each(obj.arr, function (index, item) {
              template +=
                '<span class="bar-item bar-color" data-color="' +
                item +
                '"><i class="' +
                obj.icon +
                '" style="background:' +
                item +
                ';"></i></span>';
            });
            template += "<div>";
            return template;
            break;
          case "line":
            var template = '<div class="subBar">';
            $.each(obj.arr, function (index, item) {
              template +=
                '<span class="bar-item bar-line" data-height="' +
                item +
                '"><i class="' +
                obj.icon +
                '" style="height:' +
                item +
                "px;margin:" +
                (17 - item / 2) +
                'px auto;"></i></span>';
            });
            template += "<div>";
            return template;
            break;
        }
      }
      $.each(menu, function (index, item) {
        toolBar.append(renderBar(item));
      });

      bimBox.append(toolBar);

      toolBar
        .on("click", ".bar-item", function () {
          var $this = $(this),
            type = $this.data("type"),
            fn = $this.data("fn");
          switch (type) {
            case "setMarkType":
              $this.addClass("selected").siblings().removeClass("selected");
              self.annotation.setAnnotationType(fn);
              $(".model-select").hide();
              break;
            case "text":
              $this.find(".subBar").fadeIn();
              $this.addClass("selected").siblings().removeClass("selected");
              self.annotation.setAnnotationType(fn);
              break;
            case "more":
              $this.toggleClass("selected");
              $this.siblings("[data-type=more]").removeClass("selected");
              $(".model-select").hide();
              break;
          }
        })
        .on("click", ".subBar .bar-color", function (e) {
          var $this = $(this),
            e = e || event,
            color = $this.data("color"),
            $parent = $this.closest("div.bar-item");
          $this.removeClass("selected");
          $parent.children(".bim-ncolor").css({
            background: color,
          });
          $(".bim-line").css({
            background: color,
          });
          self.annotation.setAnnotationStyle(
            $.extend(defaultStyle, {
              "stroke-color": color,
            }),
            true
          );
        })
        .on("click", ".subBar .bar-line", function (e) {
          var $this = $(this),
            e = e || event,
            height = $this.data("height"),
            $parent = $this.closest("div.bar-item");
          $this.removeClass("selected");
          $parent.children(".bim-line").css({
            height: height,
            marginTop: 17 - height / 2,
          });
          self.annotation.setAnnotationStyle(
            $.extend(defaultStyle, {
              "stroke-width": height,
            })
          );
        })
        .on("change", ".model-select select", function (e) {
          var $this = $(this),
            fontSize = $this.val(),
            $parent = $this.closest("div.bar-item"),
            e = e || event;

          self.annotation.setAnnotationStyle(
            $.extend(defaultStyle, {
              "font-size": fontSize,
            })
          );

          setTimeout(function () {
            $this.parent().fadeOut();
          }, 300);
        })
        .on("click", ".model-select", function (e) {
          var e = e || event;
          e.stopPropagation();
        });
    },
    annotationList: function () {
      return this.annotation.getAnnotationInfoList();
    },
    load: function (annotations, absBasePoint, screenBasePoint, zoomFactor) {
      var self = this;
      self.annotation.loadAnnotations(
        annotations,
        absBasePoint,
        screenBasePoint,
        {
          x: zoomFactor,
          y: zoomFactor,
        }
      );
    },
    resize: function (absBasePoint, screenBasePoint, zoomFactor) {
      this.annotation.setAbsoluteBasePoint(absBasePoint);
      this.annotation.setScreenBasePoint(screenBasePoint);
      this.annotation.setZoomFactor(zoomFactor);
      this.annotation.resizeAnnotations();
    },
    update: function () {
      this.annotation.resizeAnnotations();
    },
    getAnnotationInfoListWithBox: function () {
      return this.annotation.getAnnotationInfoListWithBox();
    },
  };
  window.markPdf = markPdf;
})($);
