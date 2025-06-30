import {
  AnimatePresence,
  motion
} from "./chunk-B74LU46N.js";
import {
  createPopper
} from "./chunk-TAM2IQJX.js";
import {
  require_react_dom
} from "./chunk-2P3ERJ6G.js";
import {
  require_jsx_runtime
} from "./chunk-UZNMMFWU.js";
import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        var it2;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size) return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!b.has(i.value[0])) return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!equal(i.value[1], b.get(i.value[0]))) return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size) return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!b.has(i.value[0])) return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i]) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function") return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function") return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        if (hasElementType && a instanceof Element) return false;
        for (i = length; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual2(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// node_modules/warning/warning.js
var require_warning = __commonJS({
  "node_modules/warning/warning.js"(exports, module) {
    "use strict";
    var __DEV__ = true;
    var warning2 = function() {
    };
    if (__DEV__) {
      printWarning = function printWarning2(format2, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = "Warning: " + format2.replace(/%s/g, function() {
          return args[argIndex++];
        });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
      warning2 = function(condition, format2, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format2 === void 0) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning message argument"
          );
        }
        if (!condition) {
          printWarning.apply(null, [format2].concat(args));
        }
      };
    }
    var printWarning;
    module.exports = warning2;
  }
});

// node_modules/mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());

// node_modules/mdb-react-ui-kit/node_modules/clsx/dist/clsx.m.js
function toVal(mix) {
  var k2, y2, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k2 = 0; k2 < mix.length; k2++) {
        if (mix[k2]) {
          if (y2 = toVal(mix[k2])) {
            str && (str += " ");
            str += y2;
          }
        }
      }
    } else {
      for (k2 in mix) {
        if (mix[k2]) {
          str && (str += " ");
          str += k2;
        }
      }
    }
  }
  return str;
}
function clsx_m_default() {
  var i = 0, tmp, x, str = "";
  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x = toVal(tmp)) {
        str && (str += " ");
        str += x;
      }
    }
  }
  return str;
}

// node_modules/react-popper/lib/esm/Popper.js
var React4 = __toESM(require_react());

// node_modules/react-popper/lib/esm/Manager.js
var React = __toESM(require_react());
var ManagerReferenceNodeContext = React.createContext();
var ManagerReferenceNodeSetterContext = React.createContext();

// node_modules/react-popper/lib/esm/utils.js
var React2 = __toESM(require_react());
var fromEntries = function fromEntries2(entries) {
  return entries.reduce(function(acc, _ref) {
    var key = _ref[0], value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? React2.useLayoutEffect : React2.useEffect;

// node_modules/react-popper/lib/esm/usePopper.js
var React3 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var import_react_fast_compare = __toESM(require_react_fast_compare());
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = React3.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };
  var _React$useState = React3.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), state = _React$useState[0], setState = _React$useState[1];
  var updateStateModifier = React3.useMemo(function() {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        ReactDOM.flushSync(function() {
          setState({
            styles: fromEntries(elements.map(function(element) {
              return [element, state2.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function(element) {
              return [element, state2.attributes[element]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []);
  var popperOptions = React3.useMemo(function() {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: "applyStyles",
        enabled: false
      }])
    };
    if ((0, import_react_fast_compare.default)(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = React3.useRef();
  useIsomorphicLayoutEffect(function() {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function() {
    if (referenceElement == null || popperElement == null) {
      return;
    }
    var createPopper5 = options.createPopper || createPopper;
    var popperInstance = createPopper5(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function() {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

// node_modules/react-popper/lib/esm/Reference.js
var React5 = __toESM(require_react());
var import_warning = __toESM(require_warning());

// node_modules/mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js
var import_react_dom = __toESM(require_react_dom());

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y: y2
  }) : {
    x,
    y: y2
  };
  x = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y: y2
  }) : {
    x,
    y: y2
  };
  x = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y2 + "px)" : "translate3d(" + x + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y: y2
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/validateModifiers.js
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/createPopper.js
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper5(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper2 = popperGenerator();

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper3 = popperGenerator({
  defaultModifiers
});

// node_modules/mdb-react-ui-kit/node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper4 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/mdb-react-ui-kit/dist/mdb-react-ui-kit.esm.js
(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode("")), document.head.appendChild(e);
    }
  } catch (t) {
    console.error("vite-plugin-css-injected-by-js", t);
  }
})();
var Le = import_react.default.forwardRef(
  ({ breakpoint: e, fluid: t, children: s, className: n, tag: r = "div", ...a }, c) => {
    const o = clsx_m_default(`${t ? "container-fluid" : `container${e ? "-" + e : ""}`}`, n);
    return (0, import_jsx_runtime.jsx)(r, { className: o, ...a, ref: c, children: s });
  }
);
Le.displayName = "MDBContainer";
var ke = import_react.default.forwardRef(
  ({
    center: e,
    children: t,
    className: s,
    end: n,
    lg: r,
    md: a,
    offsetLg: c,
    offsetMd: o,
    offsetSm: i,
    order: d,
    size: u,
    sm: p,
    start: f,
    tag: g = "div",
    xl: b,
    xxl: v,
    xs: h,
    ...B
  }, w) => {
    const L = clsx_m_default(
      u && `col-${u}`,
      h && `col-xs-${h}`,
      p && `col-sm-${p}`,
      a && `col-md-${a}`,
      r && `col-lg-${r}`,
      b && `col-xl-${b}`,
      v && `col-xxl-${v}`,
      !u && !h && !p && !a && !r && !b && !v ? "col" : "",
      d && `order-${d}`,
      f && "align-self-start",
      e && "align-self-center",
      n && "align-self-end",
      i && `offset-sm-${i}`,
      o && `offset-md-${o}`,
      c && `offset-lg-${c}`,
      s
    );
    return (0, import_jsx_runtime.jsx)(g, { className: L, ref: w, ...B, children: t });
  }
);
ke.displayName = "MDBCol";
var Ce = import_react.default.forwardRef(
  ({ className: e, color: t = "primary", pill: s, light: n, dot: r, tag: a = "span", children: c, notification: o, ...i }, d) => {
    const u = clsx_m_default(
      "badge",
      n ? t && `badge-${t}` : t && `bg-${t}`,
      r && "badge-dot",
      s && "rounded-pill",
      o && "badge-notification",
      e
    );
    return (0, import_jsx_runtime.jsx)(a, { className: u, ref: d, ...i, children: c });
  }
);
Ce.displayName = "MDBBadge";
var Se = ({ ...e }) => {
  const [t, s] = (0, import_react.useState)(false), n = clsx_m_default("ripple-wave", t && "active");
  return (0, import_react.useEffect)(() => {
    const r = setTimeout(() => {
      s(true);
    }, 50);
    return () => {
      clearTimeout(r);
    };
  }, []), (0, import_jsx_runtime.jsx)("div", { className: n, ...e });
};
var Ae = (...e) => {
  const t = import_react.default.useRef();
  return import_react.default.useEffect(() => {
    e.forEach((s) => {
      s && (typeof s == "function" ? s(t.current) : s.current = t.current);
    });
  }, [e]), t;
};
var Be = import_react.default.forwardRef(
  ({
    className: e,
    rippleTag: t = "div",
    rippleCentered: s,
    rippleDuration: n = 500,
    rippleUnbound: r,
    rippleRadius: a = 0,
    rippleColor: c = "dark",
    children: o,
    onMouseDown: i,
    ...d
  }, u) => {
    const p = (0, import_react.useRef)(null), f = Ae(u, p), g = "rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%", b = [0, 0, 0], v = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"], [h, B] = (0, import_react.useState)([]), [w, L] = (0, import_react.useState)(false), M = clsx_m_default(
      "ripple",
      "ripple-surface",
      r && "ripple-surface-unbound",
      w && `ripple-surface-${c}`,
      e
    ), I = () => {
      if (v.find((D) => D === (c == null ? void 0 : c.toLowerCase())))
        return L(true);
      {
        const D = S(c).join(",");
        return `radial-gradient(circle, ${g.split("{{color}}").join(`${D}`)})`;
      }
    }, S = (x) => {
      const D = (E) => (E.length < 7 && (E = `#${E[1]}${E[1]}${E[2]}${E[2]}${E[3]}${E[3]}`), [parseInt(E.substr(1, 2), 16), parseInt(E.substr(3, 2), 16), parseInt(E.substr(5, 2), 16)]), $ = (E) => {
        const F = document.body.appendChild(document.createElement("fictum")), P = "rgb(1, 2, 3)";
        return F.style.color = P, F.style.color !== P || (F.style.color = E, F.style.color === P || F.style.color === "") ? b : (E = getComputedStyle(F).color, document.body.removeChild(F), E);
      }, G = (E) => (E = E.match(/[.\d]+/g).map((F) => +Number(F)), E.length = 3, E);
      return x.toLowerCase() === "transparent" ? b : x[0] === "#" ? D(x) : (x.indexOf("rgb") === -1 && (x = $(x)), x.indexOf("rgb") === 0 ? G(x) : b);
    }, T = (x) => {
      const { offsetX: D, offsetY: $, height: G, width: E } = x, F = $ <= G / 2, P = D <= E / 2, H = (Q, J) => Math.sqrt(Q ** 2 + J ** 2), A = $ === G / 2 && D === E / 2, V = {
        first: F === true && P === false,
        second: F === true && P === true,
        third: F === false && P === true,
        fourth: F === false && P === false
      }, X = {
        topLeft: H(D, $),
        topRight: H(E - D, $),
        bottomLeft: H(D, G - $),
        bottomRight: H(E - D, G - $)
      };
      let Y = 0;
      return A || V.fourth ? Y = X.topLeft : V.third ? Y = X.topRight : V.second ? Y = X.bottomRight : V.first && (Y = X.bottomLeft), Y * 2;
    }, C = (x) => {
      var Y;
      const D = (Y = f.current) == null ? void 0 : Y.getBoundingClientRect(), $ = x.clientX - D.left, G = x.clientY - D.top, E = D.height, F = D.width, P = {
        offsetX: s ? E / 2 : $,
        offsetY: s ? F / 2 : G,
        height: E,
        width: F
      }, H = {
        delay: n && n * 0.5,
        duration: n && n - n * 0.5
      }, A = T(P), V = a || A / 2, X = {
        left: s ? `${F / 2 - V}px` : `${$ - V}px`,
        top: s ? `${E / 2 - V}px` : `${G - V}px`,
        height: a ? `${a * 2}px` : `${A}px`,
        width: a ? `${a * 2}px` : `${A}px`,
        transitionDelay: `0s, ${H.delay}ms`,
        transitionDuration: `${n}ms, ${H.duration}ms`
      };
      return w ? X : { ...X, backgroundImage: `${I()}` };
    }, j = (x) => {
      const D = C(x), $ = h.concat(D);
      B($), i && i(x);
    };
    return (0, import_react.useEffect)(() => {
      const x = setTimeout(() => {
        h.length > 0 && B(h.splice(1, h.length - 1));
      }, n);
      return () => {
        clearTimeout(x);
      };
    }, [n, h]), (0, import_jsx_runtime.jsxs)(t, { className: M, onMouseDown: (x) => j(x), ref: f, ...d, children: [
      o,
      h.map((x, D) => (0, import_jsx_runtime.jsx)(Se, { style: x }, D))
    ] });
  }
);
Be.displayName = "MDBRipple";
var ce = import_react.default.forwardRef(
  ({
    className: e,
    color: t = "primary",
    outline: s,
    children: n,
    rounded: r,
    disabled: a,
    floating: c,
    size: o,
    href: i,
    block: d,
    active: u,
    toggle: p,
    noRipple: f,
    tag: g = "button",
    role: b = "button",
    ...v
  }, h) => {
    const [B, w] = (0, import_react.useState)(u || false);
    let L;
    const M = t && ["light", "link"].includes(t) || s ? "dark" : "light";
    t !== "none" ? s ? t ? L = `btn-outline-${t}` : L = "btn-outline-primary" : t ? L = `btn-${t}` : L = "btn-primary" : L = "";
    const I = clsx_m_default(
      t !== "none" && "btn",
      L,
      r && "btn-rounded",
      c && "btn-floating",
      o && `btn-${o}`,
      `${(i || g !== "button") && a ? "disabled" : ""}`,
      d && "btn-block",
      B && "active",
      e
    );
    return i && g !== "a" && (g = "a"), ["hr", "img", "input"].includes(g) || f ? (0, import_jsx_runtime.jsx)(
      g,
      {
        className: I,
        onClick: p ? () => {
          w(!B);
        } : void 0,
        disabled: a && g === "button" ? true : void 0,
        href: i,
        ref: h,
        role: b,
        ...v,
        children: n
      }
    ) : (0, import_jsx_runtime.jsx)(
      Be,
      {
        rippleTag: g,
        rippleColor: M,
        className: I,
        onClick: p ? () => {
          w(!B);
        } : void 0,
        disabled: a && g === "button" ? true : void 0,
        href: i,
        ref: h,
        role: b,
        ...v,
        children: n
      }
    );
  }
);
ce.displayName = "MDBBtn";
var Oe = import_react.default.forwardRef(
  ({ className: e, children: t, shadow: s, toolbar: n, size: r, vertical: a, tag: c = "div", role: o = "group", ...i }, d) => {
    let u;
    n ? u = "btn-toolbar" : a ? u = "btn-group-vertical" : u = "btn-group";
    const p = clsx_m_default(u, s && `shadow-${s}`, r && `btn-group-${r}`, e);
    return (0, import_jsx_runtime.jsx)(c, { className: p, ref: d, role: o, ...i, children: t });
  }
);
Oe.displayName = "MDBBtnGroup";
var Fe = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", color: n, grow: r, size: a, ...c }, o) => {
    const i = clsx_m_default(
      `${r ? "spinner-grow" : "spinner-border"}`,
      n && `text-${n}`,
      `${a ? r ? "spinner-grow-" + a : "spinner-border-" + a : ""}`,
      e
    );
    return (0, import_jsx_runtime.jsx)(s, { className: i, ref: o, ...c, children: t });
  }
);
Fe.displayName = "MDBSpinner";
var Pe = import_react.default.forwardRef(
  ({ className: e, children: t, border: s, background: n, tag: r = "div", shadow: a, alignment: c, ...o }, i) => {
    const d = clsx_m_default(
      "card",
      s && `border border-${s}`,
      n && `bg-${n}`,
      a && `shadow-${a}`,
      c && `text-${c}`,
      e
    );
    return (0, import_jsx_runtime.jsx)(r, { className: d, ref: i, ...o, children: t });
  }
);
Pe.displayName = "MDBCard";
var He = import_react.default.forwardRef(
  ({ className: e, children: t, border: s, background: n, tag: r = "div", ...a }, c) => {
    const o = clsx_m_default("card-header", s && `border-${s}`, n && `bg-${n}`, e);
    return (0, import_jsx_runtime.jsx)(r, { className: o, ...a, ref: c, children: t });
  }
);
He.displayName = "MDBCardHeader";
var We = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "p", ...n }, r) => {
    const a = clsx_m_default("card-subtitle", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
We.displayName = "MDBCardSubTitle";
var Xe = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "h5", ...n }, r) => {
    const a = clsx_m_default("card-title", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
Xe.displayName = "MDBCardTitle";
var Ye = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "p", ...n }, r) => {
    const a = clsx_m_default("card-text", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
Ye.displayName = "MDBCardText";
var _e = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", ...n }, r) => {
    const a = clsx_m_default("card-body", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
_e.displayName = "MDBCardBody";
var je = import_react.default.forwardRef(
  ({ className: e, children: t, border: s, background: n, tag: r = "div", ...a }, c) => {
    const o = clsx_m_default("card-footer", s && `border-${s}`, n && `bg-${n}`, e);
    return (0, import_jsx_runtime.jsx)(r, { className: o, ...a, ref: c, children: t });
  }
);
je.displayName = "MDBCardFooter";
var cs = ({ className: e, children: t, overlay: s, position: n, fluid: r, ...a }) => {
  const c = clsx_m_default(n && `card-img-${n}`, r && "img-fluid", s && "card-img", e);
  return (0, import_jsx_runtime.jsx)("img", { className: c, ...a, children: t });
};
var Ge = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", ...n }, r) => {
    const a = clsx_m_default("card-img-overlay", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
Ge.displayName = "MDBCardOverlay";
var ls = ({ className: e, children: t, ...s }) => {
  const n = clsx_m_default("card-link", e);
  return (0, import_jsx_runtime.jsx)("a", { className: n, ...s, children: t });
};
var Ve = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", ...n }, r) => {
    const a = clsx_m_default("card-group", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
Ve.displayName = "MDBCardGroup";
var qe = import_react.default.forwardRef(
  ({ className: e, tag: t = "ul", horizontal: s, horizontalSize: n, light: r, numbered: a, children: c, small: o, ...i }, d) => {
    const u = clsx_m_default(
      "list-group",
      s && (n ? `list-group-horizontal-${n}` : "list-group-horizontal"),
      r && "list-group-light",
      a && "list-group-numbered",
      o && "list-group-small",
      e
    );
    return (0, import_jsx_runtime.jsx)(t, { className: u, ref: d, ...i, children: c });
  }
);
qe.displayName = "MDBListGroup";
var Ke = import_react.default.forwardRef(
  ({ className: e, tag: t = "li", active: s, disabled: n, action: r, color: a, children: c, noBorders: o, ...i }, d) => {
    const u = t === "button", p = clsx_m_default(
      "list-group-item",
      s && "active",
      n && !u && "disabled",
      r && "list-group-item-action",
      a && `list-group-item-${a}`,
      o && "border-0",
      e
    );
    return (0, import_jsx_runtime.jsx)(t, { className: p, disabled: u && n, ref: d, ...i, children: c });
  }
);
Ke.displayName = "MDBListGroupItem";
var le = ({ children: e, containerRef: t, disablePortal: s }) => {
  const [n, r] = (0, import_react.useState)(false);
  return (0, import_react.useEffect)(() => {
    !s && r(true);
  }, [s]), s ? (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: e }) : n ? (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: e }), (t == null ? void 0 : t.current) || document.body) : null;
};
var is = ({
  className: e,
  children: t,
  disableMouseDown: s,
  tag: n = ce,
  tooltipTag: r = "div",
  options: a,
  placement: c = "top",
  title: o,
  wrapperProps: i,
  wrapperClass: d,
  onOpen: u,
  onClose: p,
  onMouseEnter: f,
  onMouseLeave: g,
  type: b,
  ...v
}) => {
  const [h, B] = (0, import_react.useState)(null), [w, L] = (0, import_react.useState)(null), [M, I] = (0, import_react.useState)(false), [S, T] = (0, import_react.useState)(false), [C, j] = (0, import_react.useState)(false), [x, D] = (0, import_react.useState)(false), $ = clsx_m_default("tooltip", C && "show", "fade", e), { styles: G, attributes: E } = usePopper(h, w, {
    placement: c,
    ...a
  });
  (0, import_react.useEffect)(() => {
    let A, V;
    return M || S ? (D(true), A = setTimeout(() => {
      j(true);
    }, 4)) : (j(false), V = setTimeout(() => {
      D(false);
    }, 300)), () => {
      clearTimeout(A), clearTimeout(V);
    };
  }, [M, S]);
  const F = (A) => {
    u == null || u(A), !A.defaultPrevented && I(true), f == null || f(A);
  }, P = (A) => {
    p == null || p(A), !A.defaultPrevented && I(false), g == null || g(A);
  }, H = (0, import_react.useCallback)(
    (A) => {
      A.target === h ? T(true) : T(false);
    },
    [h]
  );
  return (0, import_react.useEffect)(() => {
    if (!s)
      return document.addEventListener("mousedown", H), () => {
        document.removeEventListener("mousedown", H);
      };
  }, [H, s]), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    (0, import_jsx_runtime.jsx)(
      n,
      {
        className: d,
        onMouseEnter: F,
        onMouseLeave: P,
        ref: B,
        ...i,
        type: b,
        children: t
      }
    ),
    x && (0, import_jsx_runtime.jsx)(le, { children: (0, import_jsx_runtime.jsx)(
      r,
      {
        ref: L,
        className: $,
        style: G.popper,
        ...E.popper,
        role: "tooltip",
        ...v,
        children: (0, import_jsx_runtime.jsx)("div", { className: "tooltip-inner", children: o })
      }
    ) })
  ] });
};
var Ue = import_react.default.forwardRef(
  ({
    around: e,
    between: t,
    bottom: s,
    center: n,
    children: r,
    className: a,
    evenly: c,
    end: o,
    middle: i,
    start: d,
    tag: u = "div",
    top: p,
    ...f
  }, g) => {
    const b = clsx_m_default(
      "row",
      e && "justify-content-around",
      t && "justify-content-between",
      s && "align-self-end",
      n && "justify-content-center",
      c && "justifty-content-evenly",
      o && "justify-content-end",
      i && "align-self-center",
      d && "justify-content-start",
      p && "align-self-start",
      a
    );
    return (0, import_jsx_runtime.jsx)(u, { className: b, ...f, ref: g, children: r });
  }
);
Ue.displayName = "MDBRow";
var ds = ({
  animate: e,
  className: t,
  icon: s,
  fab: n,
  fas: r,
  fal: a,
  far: c,
  flag: o,
  spin: i,
  fixed: d,
  flip: u,
  list: p,
  size: f,
  pull: g,
  pulse: b,
  color: v,
  border: h,
  rotate: B,
  inverse: w,
  stack: L,
  iconType: M,
  children: I,
  ...S
}) => {
  let T;
  o ? T = "flag" : n ? T = "fab" : r ? T = "fas" : c ? T = "far" : a ? T = "fal" : T = "fa";
  const C = clsx_m_default(
    M ? `fa-${M}` : T,
    e && `fa-${e}`,
    o ? `flag-${o}` : s && `fa-${s}`,
    f && `fa-${f}`,
    v && `text-${v}`,
    h && "fa-border",
    B && `fa-rotate-${B}`,
    g && `fa-pull-${g}`,
    i && !e && "fa-spin",
    p && "fa-li",
    d && "fa-fw",
    b && !e && "fa-pulse",
    w && "fa-inverse",
    u && `fa-flip-${u}`,
    L && `fa-stack-${L}`,
    t
  );
  return (0, import_jsx_runtime.jsx)("i", { className: C, ...S, children: I });
};
var Je = import_react.default.forwardRef(
  ({
    className: e,
    children: t,
    tag: s = "p",
    variant: n,
    color: r,
    blockquote: a,
    note: c,
    noteColor: o,
    listUnStyled: i,
    listInLine: d,
    ...u
  }, p) => {
    const f = clsx_m_default(
      n && n,
      a && "blockquote",
      c && "note",
      r && `text-${r}`,
      o && `note-${o}`,
      i && "list-unstyled",
      d && "list-inline",
      e
    );
    return a && (s = "blockquote"), (i || d) && (s = "ul"), (0, import_jsx_runtime.jsx)(s, { className: f, ref: p, ...u, children: t });
  }
);
Je.displayName = "MDBTypography";
var Qe = import_react.default.forwardRef(
  ({ className: e, color: t, uppercase: s, bold: n, children: r, ...a }, c) => {
    const o = clsx_m_default(
      "breadcrumb",
      n && "font-weight-bold",
      t && `text-${t}`,
      s && "text-uppercase",
      e
    );
    return (0, import_jsx_runtime.jsx)("nav", { "aria-label": "breadcrumb", children: (0, import_jsx_runtime.jsx)("ol", { className: o, ref: c, ...a, children: r }) });
  }
);
Qe.displayName = "MDBBreadcrumb";
var Ze = import_react.default.forwardRef(
  ({ className: e, active: t, current: s = "page", children: n, ...r }, a) => {
    const c = clsx_m_default("breadcrumb-item", t && "active", e);
    return (0, import_jsx_runtime.jsx)("li", { className: c, ref: a, "aria-current": t && s, ...r, children: n });
  }
);
Ze.displayName = "MDBBreadcrumbItem";
var ze = (e) => {
  if (e !== false)
    return `navbar-expand-${e}`;
};
var et = import_react.default.forwardRef(
  ({
    className: e,
    children: t,
    light: s,
    dark: n,
    scrolling: r,
    fixed: a,
    sticky: c,
    scrollingNavbarOffset: o,
    color: i,
    transparent: d,
    expand: u,
    tag: p = "nav",
    bgColor: f,
    ...g
  }, b) => {
    const [v, h] = (0, import_react.useState)(false), B = clsx_m_default(
      {
        "navbar-light": s,
        "navbar-dark": n,
        "scrolling-navbar": r || o,
        "top-nav-collapse": v,
        [`text-${i}`]: i && d ? v : i
      },
      a && `fixed-${a}`,
      c && "sticky-top",
      "navbar",
      u && ze(u),
      f && `bg-${f}`,
      e
    ), w = (0, import_react.useCallback)(() => {
      o && window.pageYOffset > o ? h(true) : h(false);
    }, [o]);
    return (0, import_react.useEffect)(() => ((r || o) && window.addEventListener("scroll", w), () => {
      window.removeEventListener("scroll", w);
    }), [w, r, o]), (0, import_jsx_runtime.jsx)(p, { className: B, role: "navigation", ...g, ref: b, children: t });
  }
);
et.displayName = "MDBNavbar";
var tt = import_react.default.forwardRef(
  ({ children: e, className: t = "", disabled: s = false, active: n = false, tag: r = "a", ...a }, c) => {
    const o = clsx_m_default("nav-link", s ? "disabled" : n ? "active" : "", t);
    return (0, import_jsx_runtime.jsx)(r, { "data-test": "nav-link", className: o, style: { cursor: "pointer" }, ref: c, ...a, children: e });
  }
);
tt.displayName = "MDBNavbarLink";
var st = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "a", ...n }, r) => {
    const a = clsx_m_default("navbar-brand", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ref: r, ...n, children: t });
  }
);
st.displayName = "MDBNavbarBrand";
var nt = import_react.default.forwardRef(
  ({ children: e, className: t, active: s, text: n, tag: r = "li", ...a }, c) => {
    const o = clsx_m_default("nav-item", s && "active", n && "navbar-text", t);
    return (0, import_jsx_runtime.jsx)(r, { ...a, className: o, ref: c, children: e });
  }
);
nt.displayName = "MDBNavbarItem";
var rt = import_react.default.forwardRef(
  ({ children: e, className: t, right: s, fullWidth: n = true, left: r, tag: a = "ul", ...c }, o) => {
    const i = clsx_m_default("navbar-nav", n && "w-100", s && "ms-auto", r && "me-auto", t);
    return (0, import_jsx_runtime.jsx)(a, { className: i, ref: o, ...c, children: e });
  }
);
rt.displayName = "MDBNavbarNav";
var at = import_react.default.forwardRef(
  ({ children: e, className: t, tag: s = "button", ...n }, r) => {
    const a = clsx_m_default("navbar-toggler", t);
    return (0, import_jsx_runtime.jsx)(s, { ...n, className: a, ref: r, children: e });
  }
);
at.displayName = "MDBNavbarToggler";
var ot = import_react.default.forwardRef(
  ({ children: e, bgColor: t, color: s, className: n, ...r }, a) => {
    const c = clsx_m_default(t && `bg-${t}`, s && `text-${s}`, n);
    return (0, import_jsx_runtime.jsx)("footer", { className: c, ...r, ref: a, children: e });
  }
);
ot.displayName = "MDBFooter";
var ct = import_react.default.forwardRef(
  ({ children: e, size: t, circle: s, center: n, end: r, start: a, className: c, ...o }, i) => {
    const d = clsx_m_default(
      "pagination",
      n && "justify-content-center",
      s && "pagination-circle",
      r && "justify-content-end",
      t && `pagination-${t}`,
      a && "justify-content-start",
      c
    );
    return (0, import_jsx_runtime.jsx)("ul", { className: d, ...o, ref: i, children: e });
  }
);
ct.displayName = "MDBPagination";
var lt = import_react.default.forwardRef(
  ({ children: e, className: t, tag: s = "a", ...n }, r) => {
    const a = clsx_m_default("page-link", t);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: e });
  }
);
lt.displayName = "MDBPaginationLink";
var it = import_react.default.forwardRef(
  ({ children: e, className: t, active: s, disabled: n, ...r }, a) => {
    const c = clsx_m_default("page-item", s && "active", n && "disabled", t);
    return (0, import_jsx_runtime.jsx)("li", { className: c, ...r, ref: a, children: e });
  }
);
it.displayName = "MDBPaginationItem";
var us = ({
  className: e,
  classNameResponsive: t,
  responsive: s,
  align: n,
  borderColor: r,
  bordered: a,
  borderless: c,
  children: o,
  color: i,
  hover: d,
  small: u,
  striped: p,
  ...f
}) => {
  const g = clsx_m_default(
    "table",
    n && `align-${n}`,
    r && `border-${r}`,
    a && "table-bordered",
    c && "table-borderless",
    i && `table-${i}`,
    d && "table-hover",
    u && "table-sm",
    p && "table-striped",
    e
  ), b = (0, import_react.useMemo)(() => (0, import_jsx_runtime.jsx)("table", { className: g, ...f, children: o }), [o, g, f]);
  if (s) {
    const v = clsx_m_default(
      typeof s == "string" ? `table-responsive-${s}` : "table-responsive",
      t
    );
    return (0, import_jsx_runtime.jsx)("div", { className: v, children: b });
  } else
    return b;
};
var ms = ({ className: e, children: t, dark: s, light: n, ...r }) => {
  const a = clsx_m_default(s && "table-dark", n && "table-light", e);
  return (0, import_jsx_runtime.jsx)("thead", { className: a, ...r, children: t });
};
var fs = ({ className: e, children: t, ...s }) => {
  const n = clsx_m_default(e);
  return (0, import_jsx_runtime.jsx)("tbody", { className: n, ...s, children: t });
};
var Me = import_react.default.forwardRef(
  ({
    animated: e,
    children: t,
    className: s,
    style: n,
    tag: r = "div",
    valuenow: a,
    valuemax: c,
    striped: o,
    bgColor: i,
    valuemin: d,
    width: u,
    ...p
  }, f) => {
    const g = clsx_m_default(
      "progress-bar",
      i && `bg-${i}`,
      o && "progress-bar-striped",
      e && "progress-bar-animated",
      s
    ), b = { width: `${u}%`, ...n };
    return (0, import_jsx_runtime.jsx)(
      r,
      {
        className: g,
        style: b,
        ref: f,
        role: "progressbar",
        ...p,
        "aria-valuenow": Number(u) ?? a,
        "aria-valuemin": Number(d),
        "aria-valuemax": Number(c),
        children: t
      }
    );
  }
);
Me.displayName = "MDBProgressBar";
var dt = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", height: n, style: r, ...a }, c) => {
    const o = clsx_m_default("progress", e), i = { height: `${n}px`, ...r };
    return (0, import_jsx_runtime.jsx)(s, { className: o, ref: c, style: i, ...a, children: import_react.default.Children.map(t, (d) => {
      if (!import_react.default.isValidElement(d) || d.type !== Me) {
        console.error("Progress component only allows ProgressBar as child");
        return;
      } else
        return d;
    }) });
  }
);
dt.displayName = "MDBProgress";
var ut = (e) => {
  const [t, s] = (0, import_react.useState)(false), [n, r] = (0, import_react.useState)(null);
  return (0, import_react.useEffect)(() => {
    r(() => new IntersectionObserver(([a]) => {
      s(a.isIntersecting);
    }));
  }, []), (0, import_react.useEffect)(() => {
    if (!(!e.current || !n))
      return n.observe(e.current), () => n.disconnect();
  }, [n, e]), t;
};
var De = (e, t) => (0, import_react.useMemo)(() => t !== void 0 ? t : e, [t, e]);
var mt = import_react.default.forwardRef(
  ({
    className: e,
    size: t,
    contrast: s,
    value: n,
    defaultValue: r,
    id: a,
    labelClass: c,
    wrapperClass: o,
    wrapperStyle: i,
    wrapperTag: d = "div",
    label: u,
    onChange: p,
    children: f,
    labelRef: g,
    labelStyle: b,
    type: v,
    onBlur: h,
    readonly: B = false,
    showCounter: w = false,
    ...L
  }, M) => {
    var O;
    const [I, S] = (0, import_react.useState)(r), T = (0, import_react.useMemo)(() => n !== void 0 ? n : I, [n, I]), [C, j] = (0, import_react.useState)(0), [x, D] = (0, import_react.useState)(false), [$, G] = (0, import_react.useState)(0), E = (0, import_react.useRef)(null), F = ut(E), P = (0, import_react.useRef)(null), H = g || P;
    (0, import_react.useImperativeHandle)(M, () => E.current);
    const A = clsx_m_default("form-outline", s && "form-white", o), X = ["date", "time", "datetime-local", "month", "week"].includes(v), Y = clsx_m_default(
      "form-control",
      x && "active",
      X && "active",
      t && `form-control-${t}`,
      e
    ), Q = clsx_m_default("form-label", c), J = (0, import_react.useCallback)(() => {
      var W;
      (W = H.current) != null && W.clientWidth && j(H.current.clientWidth * 0.8 + 8);
    }, [H]), z = (W) => {
      S(W.target.value), w && G(W.target.value.length), p == null || p(W);
    }, R = (0, import_react.useCallback)(
      (W) => {
        E.current && (D(!!T), h && h(W));
      },
      [T, h]
    );
    return (0, import_react.useEffect)(() => {
      J();
    }, [(O = H.current) == null ? void 0 : O.clientWidth, J, F]), (0, import_react.useEffect)(() => {
      if (T)
        return D(true);
      D(false);
    }, [T]), (0, import_jsx_runtime.jsxs)(d, { className: A, style: i, children: [
      (0, import_jsx_runtime.jsx)(
        "input",
        {
          type: v,
          readOnly: B,
          className: Y,
          onBlur: R,
          onChange: z,
          onFocus: J,
          value: n,
          defaultValue: r,
          id: a,
          ref: E,
          ...L
        }
      ),
      u && (0, import_jsx_runtime.jsx)("label", { className: Q, style: b, htmlFor: a, ref: H, children: u }),
      (0, import_jsx_runtime.jsxs)("div", { className: "form-notch", children: [
        (0, import_jsx_runtime.jsx)("div", { className: "form-notch-leading" }),
        (0, import_jsx_runtime.jsx)("div", { className: "form-notch-middle", style: { width: C } }),
        (0, import_jsx_runtime.jsx)("div", { className: "form-notch-trailing" })
      ] }),
      f,
      w && L.maxLength && (0, import_jsx_runtime.jsx)("div", { className: "form-helper", children: (0, import_jsx_runtime.jsx)("div", { className: "form-counter", children: `${$}/${L.maxLength}` }) })
    ] });
  }
);
mt.displayName = "MDBInput";
var ie = (0, import_react.forwardRef)(
  ({
    className: e,
    inputRef: t,
    labelClass: s,
    wrapperClass: n,
    labelStyle: r,
    wrapperTag: a = "div",
    wrapperStyle: c,
    label: o,
    inline: i,
    btn: d,
    id: u,
    btnColor: p,
    disableWrapper: f,
    toggleSwitch: g,
    ...b
  }, v) => {
    let h = "form-check-input", B = "form-check-label";
    d && (h = "btn-check", p ? B = `btn btn-${p}` : B = "btn btn-primary");
    const w = clsx_m_default(
      o && !d && "form-check",
      i && !d && "form-check-inline",
      g && "form-switch",
      n
    ), L = clsx_m_default(h, e), M = clsx_m_default(B, s), I = (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      (0, import_jsx_runtime.jsx)("input", { className: L, id: u, ref: t, ...b }),
      o && (0, import_jsx_runtime.jsx)("label", { className: M, style: r, htmlFor: u, children: o })
    ] });
    return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: f ? I : (0, import_jsx_runtime.jsx)(a, { style: c, className: w, ref: v, children: I }) });
  }
);
ie.displayName = "InputTemplate";
var ps = ({ ...e }) => (0, import_jsx_runtime.jsx)(ie, { type: "checkbox", ...e });
var gs = ({ ...e }) => (0, import_jsx_runtime.jsx)(ie, { type: "radio", ...e });
function ft({ showCollapse: e, setCollapseHeight: t, refCollapse: s, contentRef: n }) {
  (0, import_react.useEffect)(() => {
    e || t("0px");
  }, [e]), (0, import_react.useEffect)(() => {
    const r = s.current, a = (o) => {
      if (!r)
        return;
      const i = o.contentRect.height, d = window.getComputedStyle(r), u = parseFloat(d.paddingTop) + parseFloat(d.paddingBottom) + parseFloat(d.marginBottom) + parseFloat(d.marginTop), p = `${i + u}px`;
      t(p);
    }, c = new ResizeObserver(([o]) => {
      a(o);
    });
    return c.observe(n.current), () => {
      c.disconnect();
    };
  }, []);
}
var pt = ({
  className: e,
  children: t,
  open: s = false,
  id: n,
  navbar: r,
  tag: a = "div",
  collapseRef: c,
  style: o,
  onOpen: i,
  onClose: d,
  ...u
}) => {
  const [p, f] = (0, import_react.useState)(false), [g, b] = (0, import_react.useState)(void 0), [v, h] = (0, import_react.useState)(false), B = clsx_m_default(
    v ? "collapsing" : "collapse",
    !v && p && "show",
    r && "navbar-collapse",
    e
  ), w = (0, import_react.useRef)(null), L = c ?? w, M = (0, import_react.useRef)(null), I = (0, import_react.useCallback)(() => {
    p && b(void 0);
  }, [p]);
  return (0, import_react.useEffect)(() => (window.addEventListener("resize", I), () => {
    window.removeEventListener("resize", I);
  }), [I]), ft({ showCollapse: p, setCollapseHeight: b, refCollapse: L, contentRef: M }), (0, import_react.useEffect)(() => {
    p !== s && (s ? i == null || i() : d == null || d(), f(s)), p && h(true);
    const S = setTimeout(() => {
      h(false);
    }, 350);
    return () => {
      clearTimeout(S);
    };
  }, [s, p, i, d]), (0, import_jsx_runtime.jsx)(a, { style: { height: g, ...o }, id: n, className: B, ...u, ref: L, children: (0, import_jsx_runtime.jsx)("div", { ref: M, className: "collapse-content", children: t }) });
};
var Te = (0, import_react.createContext)(null);
var gt = ({
  children: e,
  isOpen: t = false,
  options: s,
  animation: n = true,
  dropup: r,
  dropright: a,
  dropleft: c,
  onClose: o,
  onOpen: i
}) => {
  const [d, u] = (0, import_react.useState)(t), [p, f] = (0, import_react.useState)(null), [g, b] = (0, import_react.useState)(null), [v, h] = (0, import_react.useState)(-1);
  return (0, import_jsx_runtime.jsx)(
    Te.Provider,
    {
      value: {
        animation: n,
        activeIndex: v,
        isOpenState: d,
        setReferenceElement: f,
        setPopperElement: b,
        setActiveIndex: h,
        popperElement: g,
        setIsOpenState: u,
        referenceElement: p,
        onClose: o,
        onOpen: i,
        dropup: r,
        options: s,
        dropright: a,
        dropleft: c
      },
      children: e
    }
  );
};
var ht = (e) => e instanceof HTMLElement;
var bt = (e) => e instanceof Node;
var re = () => {
  const e = (0, import_react.useContext)(Te);
  if (!e)
    throw new Error("Missing context data");
  return e;
};
var vt = () => {
  const { isOpenState: e, setIsOpenState: t, setActiveIndex: s, popperElement: n, referenceElement: r, onClose: a } = re(), c = (0, import_react.useCallback)(
    (o) => {
      e && (a == null || a(o)), !(!e || !bt(o.target) || n && n.contains(o.target) || r && r.contains(o.target) || o.defaultPrevented) && (t(false), setTimeout(() => s(-1), 300));
    },
    [e, t, s, n, r, a]
  );
  (0, import_react.useEffect)(() => (document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c)), [c]);
};
var yt = ({
  className: e,
  tag: t = "div",
  group: s,
  children: n,
  dropup: r,
  dropright: a,
  dropleft: c,
  wrapper: o,
  ...i
}) => {
  vt();
  const d = clsx_m_default(
    s ? "btn-group" : "dropdown",
    r && "dropup",
    a && "dropend",
    c && "dropstart",
    e
  );
  return o ? (0, import_jsx_runtime.jsx)(t, { className: d, ...i, children: n }) : (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: n });
};
var hs = ({ animation: e, onClose: t, onOpen: s, wrapper: n = true, ...r }) => (0, import_jsx_runtime.jsx)(gt, { animation: e, onClose: t, onOpen: s, ...r, children: (0, import_jsx_runtime.jsx)(yt, { wrapper: n, ...r }) });
var Nt = ({
  childTag: e,
  children: t,
  disabled: s,
  link: n,
  divider: r,
  header: a,
  href: c = "#"
}) => {
  const o = clsx_m_default("dropdown-item", s && "disabled");
  return n ? e ? (0, import_jsx_runtime.jsx)(e, { className: o, children: t }) : (0, import_jsx_runtime.jsx)("a", { href: c, className: o, children: t }) : r ? e ? (0, import_jsx_runtime.jsx)(e, { className: "dropdown-divider", children: t }) : (0, import_jsx_runtime.jsx)("hr", { className: "dropdown-divider" }) : a ? e ? (0, import_jsx_runtime.jsx)(e, { className: "dropdown-header", children: t }) : (0, import_jsx_runtime.jsx)("h6", { className: "dropdown-header", children: t }) : (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t });
};
var bs = ({
  onClick: e,
  tag: t = "li",
  childTag: s,
  children: n,
  style: r,
  link: a,
  divider: c,
  header: o,
  disabled: i,
  href: d,
  preventCloseOnClick: u,
  ...p
}) => {
  const { setIsOpenState: f, onClose: g, setActiveIndex: b } = re();
  return (0, import_jsx_runtime.jsx)(t, { style: r, onClick: (h) => {
    g == null || g(h), e == null || e(h), !(i || u || h.defaultPrevented) && (setTimeout(() => b(-1), 300), f(false));
  }, ...p, children: (0, import_jsx_runtime.jsx)(
    Nt,
    {
      link: a,
      divider: c,
      header: o,
      disabled: i,
      href: d,
      childTag: s,
      children: n
    }
  ) });
};
var he = (e, t, s) => s === "up" ? e <= 0 ? t[t.length - 1].props.divider === true || t[t.length - 1].props.disabled === true : t[e - 1].props.divider === true || t[e - 1].props.disabled === true : e === t.length - 1 ? t[0].props.divider === true || t[0].props.disabled === true : t[e + 1].props.divider === true || t[e + 1].props.disabled === true;
var wt = (e) => {
  const { activeIndex: t, isOpenState: s, setIsOpenState: n, setActiveIndex: r, onClose: a } = re(), c = (0, import_react.useCallback)(
    (o) => {
      const i = ["ArrowUp", "ArrowDown", "Tab", "Enter", "Escape"];
      if (!(!Array.isArray(e) || !i.includes(o.key))) {
        if (ht(document.activeElement) && document.activeElement.blur(), o.key === "ArrowUp") {
          o.preventDefault();
          const d = he(t, e, "up");
          if (t === 1) {
            r(d ? e.length - 1 : 0);
            return;
          }
          if (t <= 0) {
            r(d ? e.length - 2 : e.length - 1);
            return;
          }
          r((u) => d ? u - 2 : u - 1);
        }
        if (o.key === "ArrowDown" || o.key === "Tab") {
          o.preventDefault();
          const d = he(t, e, "down");
          if (t === e.length - 2) {
            r((u) => d ? 0 : u + 1);
            return;
          }
          if (t === e.length - 1) {
            r(d ? 1 : 0);
            return;
          }
          r((u) => d ? u + 2 : u + 1);
        }
        if (o.key === "Enter") {
          const d = document.querySelector('[data-active="true"]'), u = d == null ? void 0 : d.firstElementChild;
          if (u)
            return u.click();
          if (a == null || a(o), o.defaultPrevented)
            return;
          n(false), setTimeout(() => r(-1), 300);
        }
        if (o.key === "Escape") {
          if (a == null || a(o), o.defaultPrevented)
            return;
          n(false), setTimeout(() => r(-1), 300);
        }
      }
    },
    [e, n, r, t, a]
  );
  (0, import_react.useEffect)(() => (s && document.addEventListener("keydown", c), () => {
    s && document.removeEventListener("keydown", c);
  }), [s, c]), (0, import_react.useEffect)(() => {
    const o = document.querySelector('[data-active="true"]'), i = o == null ? void 0 : o.firstElementChild;
    return i == null || i.focus(), () => i == null ? void 0 : i.blur();
  }, [t]);
};
var Bt = () => {
  const { isOpenState: e } = re(), [t, s] = (0, import_react.useState)(false), [n, r] = (0, import_react.useState)(false), [a, c] = (0, import_react.useState)(e);
  return (0, import_react.useEffect)(() => {
    let o;
    return e || (r(true), s(false), o = setTimeout(() => {
      r(false), c(false);
    }, 300)), e && (s(true), r(false), c(true), o = setTimeout(() => {
      s(false);
    }, 300)), () => clearTimeout(o);
  }, [e]), { open: a, isFadeIn: t, isFadeOut: n };
};
var vs = ({
  className: e,
  tag: t = "ul",
  children: s,
  style: n,
  dark: r,
  responsive: a = "",
  appendToBody: c = false,
  alwaysOpen: o,
  ...i
}) => {
  const {
    activeIndex: d,
    setPopperElement: u,
    isOpenState: p,
    animation: f,
    referenceElement: g,
    popperElement: b,
    options: v,
    dropleft: h,
    dropup: B,
    dropright: w
  } = re(), { open: L, isFadeIn: M, isFadeOut: I } = Bt();
  wt(s);
  const S = () => {
    if (w)
      return "right-start";
    if (h)
      return "left-start";
    const x = b && getComputedStyle(b).getPropertyValue("--mdb-position").trim() === "end";
    return B ? x ? "top-end" : "top-start" : x ? "bottom-end" : "bottom-start";
  }, { styles: T } = usePopper(g, b, {
    placement: S(),
    modifiers: [flip_default],
    ...v
  }), C = clsx_m_default(
    "dropdown-menu",
    r && "dropdown-menu-dark",
    p && "show",
    f && "animation",
    M && "fade-in",
    I && "fade-out",
    a && `dropdown-menu-${a}`,
    e
  );
  if (!L && !o)
    return null;
  const j = (0, import_jsx_runtime.jsx)(
    t,
    {
      className: C,
      style: { position: "absolute", zIndex: 1e3, ...T.popper, ...n },
      ref: u,
      ...i,
      children: import_react.Children.map(
        s,
        (x, D) => (0, import_react.cloneElement)(x, {
          tabIndex: 0,
          "data-active": d === D && true,
          className: clsx_m_default(d === D ? "active" : "", x.props.className)
        })
      )
    }
  );
  return (0, import_jsx_runtime.jsx)(le, { disablePortal: !c, children: j });
};
var ys = ({
  className: e,
  tag: t = ce,
  children: s,
  onClick: n,
  split: r,
  ...a
}) => {
  const { setIsOpenState: c, setReferenceElement: o, isOpenState: i, setActiveIndex: d, onClose: u, onOpen: p } = re(), f = clsx_m_default("dropdown-toggle", r && "dropdown-toggle-split", e);
  return (0, import_jsx_runtime.jsx)(
    t,
    {
      onClick: (b) => {
        n == null || n(b), i ? u == null || u(b) : p == null || p(b), !b.defaultPrevented && (c((v) => !v), setTimeout(() => d(-1), 300));
      },
      ref: o,
      className: f,
      "aria-expanded": !!i,
      ...a,
      children: s
    }
  );
};
var Ns = ({
  className: e,
  btnClassName: t,
  btnChildren: s,
  children: n,
  tag: r = ce,
  onOpen: a,
  onClose: c,
  popperTag: o = "div",
  open: i,
  placement: d = "bottom",
  dismiss: u,
  options: p,
  poperStyle: f,
  onClick: g,
  disablePortal: b = false,
  ...v
}) => {
  const [h, B] = (0, import_react.useState)(), [w, L] = (0, import_react.useState)(), { styles: M, attributes: I } = usePopper(h, w, { placement: d, ...p }), [S, T] = (0, import_react.useState)(i ?? false), C = De(S, i), [j, x] = (0, import_react.useState)(false), [D, $] = (0, import_react.useState)(false), G = clsx_m_default("popover fade", j && C && "show", e), E = (P) => {
    C && !u ? c == null || c() : C || a == null || a(), u ? ($(true), T(true)) : T(!C), g && g(P);
  }, F = (0, import_react.useCallback)(
    (P) => {
      D && w && C && h && !h.contains(P.target) && (T(false), c == null || c());
    },
    [D, C, w, h, c]
  );
  return (0, import_react.useEffect)(() => {
    const P = setTimeout(() => {
      x(C);
    }, 150);
    return () => {
      clearTimeout(P);
    };
  }, [C]), (0, import_react.useEffect)(() => (C && document.addEventListener("mousedown", F), () => {
    document.removeEventListener("mousedown", F);
  }), [F, C]), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    (0, import_jsx_runtime.jsx)(r, { onClick: E, className: t, ...v, ref: B, children: s }),
    (j || C) && (0, import_jsx_runtime.jsx)(le, { disablePortal: b, children: (0, import_jsx_runtime.jsx)(
      o,
      {
        className: G,
        ref: L,
        style: { ...M.popper, ...f },
        ...I.popper,
        children: n
      }
    ) })
  ] });
};
var ws = ({
  className: e,
  children: t,
  tag: s = "div",
  ...n
}) => {
  const r = clsx_m_default("popover-body", e);
  return (0, import_jsx_runtime.jsx)(s, { className: r, ...n, children: t });
};
var Bs = ({
  className: e,
  children: t,
  tag: s = "h3",
  ...n
}) => {
  const r = clsx_m_default("popover-header", e);
  return (0, import_jsx_runtime.jsx)(s, { className: r, ...n, children: t });
};
var Mt = (e) => (0, import_react.useCallback)(() => e === "top" ? { top: -50, left: 0 } : e === "bottom" ? { top: 50, left: 0 } : e === "left" ? { top: 0, left: -50 } : e === "right" ? { top: 0, left: 50 } : { top: 0, left: 0 }, [e])();
var Dt = (e) => {
  const t = e instanceof HTMLElement ? e : e.current;
  if (!t)
    return [];
  const s = Array.from(
    t.querySelectorAll("button, a, input, select, textarea, [tabindex]")
  ).map((r) => ({
    element: r,
    focused: r === document.activeElement
  }));
  return s ? s.filter((r) => r.element.tabIndex !== -1).sort((r, a) => r.element.tabIndex === a.element.tabIndex ? 0 : a.element.tabIndex === null ? -1 : r.element.tabIndex === null ? 1 : r.element.tabIndex - a.element.tabIndex) : [];
};
var Tt = (e, t, s) => {
  let n = e;
  return t ? n = e - 1 < 0 ? s - 1 : e - 1 : n = e + 1 >= s ? 0 : e + 1, n;
};
var $t = {
  opacity: 1,
  top: 0,
  left: 0
};
var Ms = ({
  animationDirection: e = "top",
  appendToBody: t,
  backdrop: s = true,
  children: n,
  className: r,
  closeOnEsc: a = true,
  leaveHiddenModal: c = false,
  modalRef: o,
  onClose: i,
  onClosePrevented: d,
  onOpen: u,
  open: p,
  defaultOpen: f = false,
  staticBackdrop: g,
  nonInvasive: b = false,
  tag: v = "div",
  animationVariants: h = {},
  ...B
}) => {
  const [w, L] = (0, import_react.useState)(f), M = De(w, p), [I, S] = (0, import_react.useState)(false), [T, C] = (0, import_react.useState)([]), j = (0, import_react.useMemo)(() => motion(v), [v]), x = (0, import_react.useRef)(null), D = o || x, $ = {
    opacity: 0,
    ...Mt(e),
    ...h.initial ? h.initial : {}
  }, G = {
    ...$t,
    ...h.animate ? h.animate : {}
  }, E = {
    ...$,
    ...h.exit ? h.exit : {}
  }, F = clsx_m_default(
    "modal",
    I && "modal-static",
    e,
    M && b && "modal-non-invasive-show",
    r
  ), P = clsx_m_default("modal-backdrop"), H = (0, import_react.useCallback)(() => {
    L(false), i == null || i();
  }, [i]), A = (0, import_react.useCallback)(() => {
    S(true), d == null || d(), setTimeout(() => {
      S(false);
    }, 300);
  }, [d]), V = (0, import_react.useCallback)(
    (Y) => {
      b && !M || M && Y.target === D.current && (g ? A() : H());
    },
    [M, D, g, H, b, A]
  ), X = (0, import_react.useCallback)(
    (Y) => {
      if (M && Y.key === "Tab") {
        Y.preventDefault();
        const Q = Y.shiftKey, J = T.findIndex((R) => R.focused), z = Tt(J, Q, T.length);
        C((R) => R == null ? void 0 : R.map((O, W) => ({
          ...O,
          focused: W === z
        }))), T[z].element.focus();
      }
      a && M && Y.key === "Escape" && (Y.preventDefault(), g ? A() : H());
    },
    [M, a, g, H, A, T]
  );
  return (0, import_react.useEffect)(() => {
    if (!D || !M) {
      C([]);
      return;
    }
    C(() => Dt(D));
  }, [D, M, n]), (0, import_react.useEffect)(() => {
    const Y = () => {
      const J = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - J);
    }, Q = window.innerWidth > document.documentElement.clientWidth && window.innerWidth >= 576;
    if (M && Q && !b) {
      const J = Y();
      document.body.classList.add("modal-open"), document.body.style.overflow = "hidden", document.body.style.paddingRight = `${J}px`;
    } else
      document.body.classList.remove("modal-open"), document.body.style.overflow = "", document.body.style.paddingRight = "";
    return () => {
      document.body.classList.remove("modal-open"), document.body.style.overflow = "", document.body.style.paddingRight = "";
    };
  }, [M, b]), (0, import_react.useEffect)(() => {
    const Y = (Q) => {
      Q.target.closest(".modal-dialog") || window.addEventListener("mouseup", V, { once: true });
    };
    return window.addEventListener("mousedown", Y), window.addEventListener("keydown", X), () => {
      window.removeEventListener("mousedown", Y), window.removeEventListener("keydown", X);
    };
  }, [X, V]), (0, import_jsx_runtime.jsx)(le, { disablePortal: !t, children: (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [
    (M || c) && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      (0, import_jsx_runtime.jsx)(
        j,
        {
          initial: $,
          animate: G,
          exit: E,
          className: F,
          ref: D,
          style: { display: M ? "block" : "none", pointerEvents: b ? "none" : "initial" },
          ...B,
          children: n
        }
      ),
      s && M && !b && (0, import_jsx_runtime.jsx)(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 0.5 },
          exit: { opacity: 0 },
          onClick: () => {
            g ? d == null || d() : H();
          },
          className: P
        }
      )
    ] }),
    "),"
  ] }) });
};
var Et = import_react.default.forwardRef(
  ({ className: e, centered: t, children: s, size: n, scrollable: r, tag: a = "div", ...c }, o) => {
    const i = clsx_m_default(
      "modal-dialog",
      r && "modal-dialog-scrollable",
      t && "modal-dialog-centered",
      n && `modal-${n}`,
      e
    );
    return (0, import_jsx_runtime.jsx)(a, { className: i, ...c, ref: o, children: s });
  }
);
Et.displayName = "MDBModalDialog";
var Rt = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", ...n }, r) => {
    const a = clsx_m_default("modal-content", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
Rt.displayName = "MDBModalContent";
var It = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", ...n }, r) => {
    const a = clsx_m_default("modal-header", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
It.displayName = "MDBModalHeader";
var xt = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "h5", ...n }, r) => {
    const a = clsx_m_default("modal-title", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
xt.displayName = "MDBModalTitle";
var Lt = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", ...n }, r) => {
    const a = clsx_m_default("modal-body", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
Lt.displayName = "MDBModalBody";
var kt = import_react.default.forwardRef(
  ({ className: e, children: t, tag: s = "div", ...n }, r) => {
    const a = clsx_m_default("modal-footer", e);
    return (0, import_jsx_runtime.jsx)(s, { className: a, ...n, ref: r, children: t });
  }
);
kt.displayName = "MDBModalFooter";
var me = import_react.default.createContext({
  activeElement: null,
  setTargets: null
});
var Ds = ({
  container: e = typeof window !== void 0 ? window : null,
  className: t,
  children: s,
  offset: n = 10,
  ...r
}) => {
  const a = clsx_m_default("sticky-top", t), [c, o] = (0, import_react.useState)(null), [i, d] = (0, import_react.useState)([]), u = e instanceof Window, p = (0, import_react.useCallback)(() => {
    var B, w, L;
    if (!i.length)
      return;
    const f = u ? window.pageYOffset : (B = e == null ? void 0 : e.current) == null ? void 0 : B.scrollTop, g = Number(n), b = (w = i[i.length - 1]) == null ? void 0 : w.current, v = (L = i[0]) == null ? void 0 : L.current;
    f + g < v.offsetTop && o(null), i.forEach((M, I) => {
      var j;
      const S = (j = i[I + 1]) == null ? void 0 : j.current, T = M.current;
      if (f > T.offsetTop - g && f < (S == null ? void 0 : S.offsetTop) - g) {
        o(T);
        return;
      }
    }), f > b.offsetTop - g && o(b);
  }, [n, i, u, e]);
  return (0, import_react.useEffect)(() => {
    const f = u ? e : e == null ? void 0 : e.current;
    return p(), f == null || f.addEventListener("scroll", p), () => {
      f == null || f.removeEventListener("scroll", p);
    };
  }, [p, e, u]), (0, import_jsx_runtime.jsx)("div", { className: a, ...r, children: (0, import_jsx_runtime.jsx)("ul", { className: "nav flex-column nav-pills menu-sidebar", children: (0, import_jsx_runtime.jsx)(me.Provider, { value: { activeElement: c, setTargets: d }, children: s }) }) });
};
var Ts = ({
  className: e,
  collapsible: t,
  targetRef: s,
  children: n,
  subsections: r,
  onClick: a,
  onActivate: c,
  ...o
}) => {
  var v;
  const { activeElement: i, setTargets: d } = (0, import_react.useContext)(me), u = () => r == null ? void 0 : r.some((h) => h.current.id === (i == null ? void 0 : i.id)), p = (i == null ? void 0 : i.id) === ((v = s.current) == null ? void 0 : v.id), f = p || u();
  p && (c == null || c(i == null ? void 0 : i.id));
  const g = clsx_m_default("nav-link", t && "collapsible-scrollspy", f && "active", e), b = (h) => {
    const B = s == null ? void 0 : s.current;
    B == null || B.scrollIntoView({ behavior: "smooth" }), a == null || a(h);
  };
  return (0, import_react.useEffect)(() => {
    d((h) => [...h, s]);
  }, [d, s]), (0, import_jsx_runtime.jsx)("li", { className: "nav-item", style: { cursor: "pointer" }, children: (0, import_jsx_runtime.jsx)("a", { className: g, onClick: b, ...o, children: n }) });
};
var $s = ({
  collapsible: e,
  className: t,
  children: s,
  style: n,
  ...r
}) => {
  const [a, c] = (0, import_react.useState)("0px"), { activeElement: o } = (0, import_react.useContext)(me), i = clsx_m_default("nav flex-column", t), d = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const p = () => e == null ? void 0 : e.some((g) => g.current.id === (o == null ? void 0 : o.id)), f = d.current;
    p() ? c(`${f == null ? void 0 : f.scrollHeight}px`) : c("0px");
  }, [o, e]);
  const u = {
    overflow: "hidden",
    height: a,
    transition: "height .5s ease",
    flexWrap: "nowrap",
    ...n
  };
  return (0, import_jsx_runtime.jsx)("ul", { className: i, ref: d, style: e ? u : n, ...r, children: s });
};
var Es = ({ ...e }) => (0, import_jsx_runtime.jsx)(ie, { type: "checkbox", toggleSwitch: true, ...e });
var Ct = ({ value: e, min: t = "0", max: s = "100", showThumb: n }) => {
  const r = Number(e), [a, c] = (0, import_react.useState)(
    (r || 0 - Number(t)) * 100 / (Number(s) - Number(t))
  ), o = clsx_m_default("thumb", n && "thumb-active");
  return (0, import_react.useEffect)(() => {
    c((Number(e) - Number(t)) * 100 / (Number(s) - Number(t)));
  }, [e, s, t]), (0, import_jsx_runtime.jsx)("span", { className: o, style: { left: `calc(${a}% + (${8 - a * 0.15}px))` }, children: (0, import_jsx_runtime.jsx)("span", { className: "thumb-value", children: e }) });
};
var Rs = ({
  className: e,
  defaultValue: t = 0,
  disableTooltip: s,
  labelId: n,
  max: r,
  min: a,
  onMouseDown: c,
  onMouseUp: o,
  onTouchStart: i,
  onTouchEnd: d,
  onChange: u,
  labelClass: p,
  value: f,
  label: g,
  id: b,
  inputRef: v,
  ...h
}) => {
  const [B, w] = (0, import_react.useState)(t), [L, M] = (0, import_react.useState)(false), I = clsx_m_default("form-range", e), S = clsx_m_default("form-label", p);
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    g && (0, import_jsx_runtime.jsx)("label", { className: S, id: n, htmlFor: b, children: g }),
    (0, import_jsx_runtime.jsxs)("div", { className: "range", children: [
      (0, import_jsx_runtime.jsx)(
        "input",
        {
          type: "range",
          onMouseDown: ($) => {
            M(true), c && c($);
          },
          onMouseUp: ($) => {
            M(false), o && o($);
          },
          onTouchStart: ($) => {
            M(true), i && i($);
          },
          onTouchEnd: ($) => {
            M(false), d && d($);
          },
          onChange: ($) => {
            w($.target.value), u && u($);
          },
          className: I,
          value: f || B,
          id: b,
          min: a,
          max: r,
          ref: v,
          ...h
        }
      ),
      !s && (0, import_jsx_runtime.jsx)(Ct, { value: f || B, showThumb: L, min: a, max: r })
    ] })
  ] });
};
var St = (0, import_react.forwardRef)(
  ({ className: e, labelClass: t, labelStyle: s, inputRef: n, size: r, label: a, id: c, ...o }, i) => {
    const d = clsx_m_default("form-control", `form-control-${r}`, e), u = clsx_m_default("form-label", t), p = (0, import_react.useRef)(null);
    return (0, import_react.useImperativeHandle)(i, () => p.current || (n == null ? void 0 : n.current)), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      a && (0, import_jsx_runtime.jsx)("label", { className: u, style: s, htmlFor: c, children: a }),
      (0, import_jsx_runtime.jsx)("input", { className: d, type: "file", id: c, ref: p, ...o })
    ] });
  }
);
St.displayName = "MDBFile";
var At = import_react.default.forwardRef(
  ({
    className: e,
    children: t,
    noBorder: s,
    textBefore: n,
    textAfter: r,
    noWrap: a,
    tag: c = "div",
    textTag: o = "span",
    textClass: i,
    size: d,
    textProps: u,
    ...p
  }, f) => {
    const g = clsx_m_default("input-group", a && "flex-nowrap", d && `input-group-${d}`, e), b = clsx_m_default("input-group-text", s && "border-0", i), v = (h) => (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: h && Array.isArray(h) ? h.map((B, w) => (0, import_jsx_runtime.jsx)(o, { className: b, ...u, children: B }, w)) : (0, import_jsx_runtime.jsx)(o, { className: b, ...u, children: h }) });
    return (0, import_jsx_runtime.jsxs)(c, { className: g, ref: f, ...p, children: [
      n && v(n),
      t,
      r && v(r)
    ] });
  }
);
At.displayName = "MDBInputGroup";
var Ot = import_react.default.forwardRef(
  ({ className: e, children: t, isValidated: s = false, onReset: n, onSubmit: r, noValidate: a = true, ...c }, o) => {
    const [i, d] = (0, import_react.useState)(s), u = clsx_m_default("needs-validation", i && "was-validated", e), p = (g) => {
      g.preventDefault(), d(true), r && r(g);
    }, f = (g) => {
      g.preventDefault(), d(false), n && n(g);
    };
    return (0, import_react.useEffect)(() => {
      d(s);
    }, [s]), (0, import_jsx_runtime.jsx)(
      "form",
      {
        className: u,
        onSubmit: p,
        onReset: f,
        ref: o,
        noValidate: a,
        ...c,
        children: t
      }
    );
  }
);
Ot.displayName = "MDBValidation";
var Ft = import_react.default.forwardRef(
  ({ className: e, fill: t, pills: s, justify: n, children: r, ...a }, c) => {
    const o = clsx_m_default(
      "nav",
      s ? "nav-pills" : "nav-tabs",
      t && "nav-fill",
      n && "nav-justified",
      e
    );
    return (0, import_jsx_runtime.jsx)("ul", { className: o, ref: c, ...a, children: r });
  }
);
Ft.displayName = "MDBTabs";
var Pt = import_react.default.forwardRef(
  ({ className: e, children: t, style: s, tag: n = "li", ...r }, a) => {
    const c = clsx_m_default("nav-item", e);
    return (0, import_jsx_runtime.jsx)(n, { className: c, style: { cursor: "pointer", ...s }, role: "presentation", ref: a, ...r, children: t });
  }
);
Pt.displayName = "MDBTabsItem";
var Ht = import_react.default.forwardRef(
  ({ className: e, color: t, active: s, onOpen: n, onClose: r, children: a, ...c }, o) => {
    const i = clsx_m_default("nav-link", s && "active", t && `bg-${t}`, e);
    return (0, import_react.useEffect)(() => {
      s ? n == null || n() : r == null || r();
    }, [s]), (0, import_jsx_runtime.jsx)("a", { className: i, ref: o, ...c, children: a });
  }
);
Ht.displayName = "MDBTabsLink";
var Wt = import_react.default.forwardRef(
  ({ className: e, tag: t = "div", children: s, ...n }, r) => {
    const a = clsx_m_default("tab-content", e);
    return (0, import_jsx_runtime.jsx)(t, { className: a, ref: r, ...n, children: s });
  }
);
Wt.displayName = "MDBTabsContent";
var Xt = import_react.default.forwardRef(
  ({ className: e, tag: t = "div", open: s, children: n, ...r }, a) => {
    const [c, o] = (0, import_react.useState)(false), i = clsx_m_default("tab-pane", "fade", c && "show", s && "active", e);
    return (0, import_react.useEffect)(() => {
      let d;
      return s ? d = setTimeout(() => {
        o(true);
      }, 100) : o(false), () => {
        clearTimeout(d);
      };
    }, [s]), (0, import_jsx_runtime.jsx)(t, { className: i, role: "tabpanel", ref: a, ...r, children: n });
  }
);
Xt.displayName = "MDBTabsPane";
var fe = (0, import_react.createContext)({
  active: 0
});
var Yt = ({ imagesCount: e, to: t }) => {
  const { active: s } = (0, import_react.useContext)(fe);
  return (0, import_jsx_runtime.jsx)("ol", { className: "carousel-indicators", children: Array.from(Array(e)).map((n, r) => (0, import_jsx_runtime.jsx)("li", { "data-mdb-target": r, className: clsx_m_default(s === r && "active"), onClick: () => t(r) }, r)) });
};
var _t = ({ move: e }) => (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
  (0, import_jsx_runtime.jsxs)("a", { role: "button", className: "carousel-control-prev", onClick: () => e("prev"), children: [
    (0, import_jsx_runtime.jsx)("span", { className: "carousel-control-prev-icon" }),
    (0, import_jsx_runtime.jsx)("span", { className: "visually-hidden", children: "Previous" })
  ] }),
  (0, import_jsx_runtime.jsxs)("a", { role: "button", className: "carousel-control-next", onClick: () => e("next"), children: [
    (0, import_jsx_runtime.jsx)("span", { className: "carousel-control-next-icon" }),
    (0, import_jsx_runtime.jsx)("span", { className: "visually-hidden", children: "Next" })
  ] })
] });
var jt = (e) => {
  const t = getComputedStyle(e), s = getComputedStyle(e == null ? void 0 : e.parentNode);
  return t.display !== "none" && s.display !== "none" && t.visibility !== "hidden";
};
var Gt = (e) => Array.from(e == null ? void 0 : e.querySelectorAll(".carousel-item"));
var Vt = (e) => e.offsetHeight;
var qt = (e, t, s = true) => {
  if (!s) {
    be(e);
    return;
  }
  const n = Kt(t);
  t.addEventListener("transitionend", () => be(e), { once: true }), Jt(t, n);
};
var be = (e) => {
  typeof e == "function" && e();
};
var Kt = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: s } = window.getComputedStyle(e);
  const n = Number.parseFloat(t), r = Number.parseFloat(s);
  return !n && !r ? 0 : (t = t.split(",")[0], s = s.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(s)) * 1e3);
};
var Ut = (e) => {
  e.dispatchEvent(new Event("transitionend"));
};
var Jt = (e, t) => {
  let s = false;
  const r = t + 5;
  function a() {
    s = true, e.removeEventListener("transitionend", a);
  }
  e.addEventListener("transitionend", a), setTimeout(() => {
    s || Ut(e);
  }, r);
};
var Is = ({
  fade: e = false,
  className: t,
  carouselInnerClassName: s,
  dark: n,
  children: r,
  interval: a = 5e3,
  keyboard: c = false,
  touch: o = true,
  showControls: i,
  showIndicators: d,
  onSlide: u,
  ...p
}) => {
  const f = (0, import_react.useRef)([]), g = (0, import_react.useRef)(null), b = (0, import_react.useRef)(0), v = (0, import_react.useRef)(false), [h, B] = (0, import_react.useState)(0), [w, L] = (0, import_react.useState)(0), [M, I] = (0, import_react.useState)({ initialX: 0, initialY: 0 }), [S, T] = (0, import_react.useState)(false), C = (0, import_react.useRef)(null), j = clsx_m_default("carousel", "slide", e && "carousel-fade", n && "carousel-dark", t), x = clsx_m_default("carousel-inner", s), D = (0, import_react.useCallback)(
    (R, O) => {
      if (O !== void 0)
        b.current = O, B(O);
      else {
        const W = h === w - 1 ? 0 : h + 1, ee = h === 0 ? w - 1 : h - 1;
        b.current = R === "next" ? W : ee, B(R === "next" ? W : ee);
      }
    },
    [h, w]
  ), $ = (0, import_react.useCallback)(() => {
    g.current && (clearInterval(g.current), g.current = null);
  }, []), G = (0, import_react.useCallback)(
    (R, O, W) => {
      var pe;
      if (!f.current || f.current.length < 2)
        return;
      T(true);
      const Z = f.current[h], te = Boolean(g.current), ae = R === "next", oe = ae ? "carousel-item-start" : "carousel-item-end", de = ae ? "carousel-item-next" : "carousel-item-prev";
      if (O.classList.contains("active")) {
        v.current = false;
        return;
      }
      D(R, W), !(!Z || !O) && (v.current = true, te && $(), (pe = C.current) != null && pe.classList.contains("slide") ? (O.classList.add(de), Vt(O), Z.classList.add(oe), O.classList.add(oe), qt(() => {
        T(false), O.classList.remove(oe, de), O.classList.add("active"), Z.classList.remove("active", de, oe), v.current = false;
      }, Z, true)) : (Z.classList.remove("active"), O.classList.add("active"), v.current = false));
    },
    [C, h, D, $]
  ), E = (R) => {
    v.current || (v.current = true, setTimeout(() => {
      v.current = false;
    }, R));
  }, F = (0, import_react.useCallback)(
    (R) => {
      const O = R === "prev", Z = (b.current + (O ? -1 : 1)) % w, te = f.current;
      return Z === -1 ? te[w - 1] : te[Z];
    },
    [w]
  ), P = (R) => {
    const O = b.current, W = R > O ? "next" : "prev", ee = f.current;
    return { direction: W, nextElement: ee[R] };
  }, H = (R) => {
    if (v.current || (E(700), R > w - 1 || R < 0))
      return;
    const { direction: O, nextElement: W } = P(R);
    G(O, W, R);
  }, A = (0, import_react.useCallback)(
    (R) => {
      if (v.current)
        return;
      E(600);
      const O = F(R);
      G(R, O);
    },
    [F, G]
  ), V = (0, import_react.useCallback)(() => {
    const { visibilityState: R, hidden: O } = document;
    if (R)
      return O || !jt(C.current) ? void 0 : A("next");
    A("next");
  }, [C, A]), X = (0, import_react.useCallback)(() => {
    var O, W;
    const R = (W = (O = r == null ? void 0 : r[h]) == null ? void 0 : O.props) == null ? void 0 : W.interval;
    g.current && (clearInterval(g.current), g.current = null), g.current = setInterval(V, R || a);
  }, [V, a, r, h]), Y = (R) => {
    o && I({ initialX: R.touches[0].clientX, initialY: R.touches[0].clientY });
  }, Q = (R) => {
    v.current = true;
    const { initialX: O, initialY: W } = M;
    if (!O || !W)
      return;
    const ee = R.touches[0].clientX, Z = R.touches[0].clientY, te = O - ee, ae = W - Z;
    Math.abs(te) > Math.abs(ae) && (te > 0 ? A("prev") : A("next")), I({ initialX: 0, initialY: 0 });
  }, J = () => {
    v.current = false;
  }, z = (0, import_react.useCallback)(
    (R) => {
      switch (R.key) {
        case "ArrowLeft":
          R.preventDefault(), A("prev");
          break;
        case "ArrowRight":
          R.preventDefault(), A("next");
          break;
      }
    },
    [A]
  );
  return (0, import_react.useEffect)(() => {
    if (c)
      return window.addEventListener("keydown", z), () => {
        window.removeEventListener("keydown", z);
      };
  }, [z, c]), (0, import_react.useEffect)(() => {
    const R = C.current, O = Gt(R);
    f.current = O, L(O.length);
  }, [C]), (0, import_react.useEffect)(() => {
    S && (u == null || u());
  }, [S, u]), (0, import_react.useEffect)(() => (X(), () => {
    $();
  }), [X, $]), (0, import_jsx_runtime.jsx)(
    "div",
    {
      onTouchStart: Y,
      onTouchMove: Q,
      onTouchEnd: J,
      onMouseEnter: $,
      onMouseLeave: X,
      className: j,
      ref: C,
      ...p,
      children: (0, import_jsx_runtime.jsx)("div", { className: x, children: (0, import_jsx_runtime.jsxs)(fe.Provider, { value: { active: h }, children: [
        d && (0, import_jsx_runtime.jsx)(Yt, { to: H, imagesCount: w }),
        r,
        i && (0, import_jsx_runtime.jsx)(_t, { move: A })
      ] }) })
    }
  );
};
var xs = ({ className: e, children: t, itemId: s, ...n }) => {
  const { active: r } = (0, import_react.useContext)(fe), a = (0, import_react.useRef)(true), c = (0, import_react.useRef)(null), o = clsx_m_default("carousel-item", e);
  return (0, import_react.useEffect)(() => {
    if (a.current && r === s - 1) {
      const i = c.current;
      i == null || i.classList.add("active");
    }
    a.current = false;
  }, [r, s]), (0, import_jsx_runtime.jsx)("div", { className: o, ref: c, ...n, children: t });
};
var Ls = ({ className: e, children: t, ...s }) => {
  const n = clsx_m_default("carousel-caption d-none d-md-block", e);
  return (0, import_jsx_runtime.jsx)("div", { className: n, ...s, children: t });
};
var $e = import_react.default.createContext({
  activeItem: 0,
  setActiveItem: null,
  alwaysOpen: false,
  initialActive: 0
});
var Qt = import_react.default.forwardRef(
  ({
    alwaysOpen: e,
    borderless: t,
    className: s,
    flush: n,
    active: r,
    initialActive: a = 0,
    tag: c = "div",
    children: o,
    onChange: i,
    ...d
  }, u) => {
    const p = (0, import_react.useMemo)(() => typeof r < "u", [r]), f = clsx_m_default("accordion", n && "accordion-flush", t && "accordion-borderless", s), [g, b] = (0, import_react.useState)(a);
    return (0, import_jsx_runtime.jsx)(c, { className: f, ref: u, ...d, children: (0, import_jsx_runtime.jsx)(
      $e.Provider,
      {
        value: { activeItem: p ? r : g, setActiveItem: b, alwaysOpen: e, initialActive: a, onChange: i },
        children: o
      }
    ) });
  }
);
Qt.displayName = "MDBAccordion";
var Zt = import_react.default.forwardRef(
  ({
    className: e,
    bodyClassName: t,
    bodyStyle: s,
    headerClassName: n,
    collapseId: r,
    headerTitle: a,
    headerStyle: c,
    btnClassName: o,
    tag: i = "div",
    children: d,
    ...u
  }, p) => {
    const { activeItem: f, setActiveItem: g, alwaysOpen: b, onChange: v } = (0, import_react.useContext)($e), h = (0, import_react.useMemo)(() => Array.isArray(f) ? f.includes(r) : f === r, [f, r]), B = clsx_m_default("accordion-item", e), w = clsx_m_default("accordion-header", n), L = clsx_m_default("accordion-body", t), M = clsx_m_default("accordion-button", !h && "collapsed", o), I = (0, import_react.useCallback)(
      (S) => {
        let T = S;
        Array.isArray(f) ? f.includes(S) ? T = f.filter((j) => j !== S) : T = b ? [...f, S] : [S] : (T = f === S ? 0 : S, b && (T = [T])), v == null || v(T), g(T);
      },
      [v, f, g, b]
    );
    return (0, import_jsx_runtime.jsxs)(i, { className: B, ref: p, ...u, children: [
      (0, import_jsx_runtime.jsx)("h2", { className: w, style: c, children: (0, import_jsx_runtime.jsx)("button", { onClick: () => I(r), className: M, type: "button", children: a }) }),
      (0, import_jsx_runtime.jsx)(pt, { id: r.toString(), open: h, children: (0, import_jsx_runtime.jsx)("div", { className: L, style: s, children: d }) })
    ] });
  }
);
Zt.displayName = "MDBAccordionItem";
var ks = ({
  className: e,
  size: t,
  contrast: s,
  value: n,
  defaultValue: r,
  id: a,
  labelClass: c,
  wrapperClass: o,
  wrapperStyle: i,
  wrapperTag: d = "div",
  label: u,
  onChange: p,
  children: f,
  labelRef: g,
  labelStyle: b,
  inputRef: v,
  onBlur: h,
  readonly: B = false,
  ...w
}) => {
  var V;
  const L = (0, import_react.useRef)(null), M = (0, import_react.useRef)(null), I = g || L, S = v || M, [T, C] = (0, import_react.useState)(n || r), [j, x] = (0, import_react.useState)(0), [D, $] = (0, import_react.useState)(
    n !== void 0 && n.length > 0 || r !== void 0 && r.length > 0
  ), G = clsx_m_default("form-outline", s && "form-white", o), E = clsx_m_default("form-control", D && "active", t && `form-control-${t}`, e), F = clsx_m_default("form-label", c);
  (0, import_react.useEffect)(() => {
    var X;
    I.current && ((X = I.current) == null ? void 0 : X.clientWidth) !== 0 && x(I.current.clientWidth * 0.8 + 8);
  }, [I, (V = I.current) == null ? void 0 : V.clientWidth]);
  const P = () => {
    I.current && x(I.current.clientWidth * 0.8 + 8);
  };
  (0, import_react.useEffect)(() => {
    n !== void 0 && (n.length > 0 ? $(true) : $(false));
  }, [n]), (0, import_react.useEffect)(() => {
    r !== void 0 && (r.length > 0 ? $(true) : $(false));
  }, [r]);
  const H = (X) => {
    C(X.currentTarget.value), p && p(X);
  }, A = (0, import_react.useCallback)(
    (X) => {
      T !== void 0 && T.length > 0 || n !== void 0 && n.length > 0 ? $(true) : $(false), h && h(X);
    },
    [T, n, h]
  );
  return (0, import_jsx_runtime.jsxs)(d, { className: G, style: { ...i }, children: [
    (0, import_jsx_runtime.jsx)(
      "textarea",
      {
        readOnly: B,
        className: E,
        onBlur: A,
        onChange: H,
        onFocus: P,
        defaultValue: r,
        value: n,
        id: a,
        ref: S,
        ...w
      }
    ),
    u && (0, import_jsx_runtime.jsx)("label", { className: F, style: b, htmlFor: a, ref: I, children: u }),
    (0, import_jsx_runtime.jsxs)("div", { className: "form-notch", children: [
      (0, import_jsx_runtime.jsx)("div", { className: "form-notch-leading" }),
      (0, import_jsx_runtime.jsx)("div", { className: "form-notch-middle", style: { width: j } }),
      (0, import_jsx_runtime.jsx)("div", { className: "form-notch-trailing" })
    ] }),
    f
  ] });
};
var Cs = ({
  children: e,
  invalid: t,
  feedback: s = "Looks good!",
  tooltip: n,
  tag: r = "div",
  ...a
}) => {
  const [c, o] = (0, import_react.useState)(null), i = (0, import_react.useRef)(null), d = clsx_m_default(
    t ? `invalid-${n ? "tooltip" : "feedback"}` : `valid-${n ? "tooltip" : "feedback"}`
  );
  return (0, import_react.useEffect)(() => {
    var p, f;
    const u = (f = (p = i.current) == null ? void 0 : p.querySelector("input, textarea")) == null ? void 0 : f.parentElement;
    u && o(u);
  }, []), (0, import_jsx_runtime.jsxs)(r, { ref: i, ...a, children: [
    c && (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)("div", { className: d, children: s }), c),
    e
  ] });
};
var Ss = ({ children: e }) => {
  const [t, s] = (0, import_react.useState)(false);
  return (0, import_react.useEffect)(() => {
    s(true);
  }, []), (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t ? e : null });
};
export {
  Qt as MDBAccordion,
  Zt as MDBAccordionItem,
  Ce as MDBBadge,
  Qe as MDBBreadcrumb,
  Ze as MDBBreadcrumbItem,
  ce as MDBBtn,
  Oe as MDBBtnGroup,
  Pe as MDBCard,
  _e as MDBCardBody,
  je as MDBCardFooter,
  Ve as MDBCardGroup,
  He as MDBCardHeader,
  cs as MDBCardImage,
  ls as MDBCardLink,
  Ge as MDBCardOverlay,
  We as MDBCardSubTitle,
  Ye as MDBCardText,
  Xe as MDBCardTitle,
  Is as MDBCarousel,
  Ls as MDBCarouselCaption,
  xs as MDBCarouselItem,
  ps as MDBCheckbox,
  Ss as MDBClientOnly,
  ke as MDBCol,
  pt as MDBCollapse,
  Le as MDBContainer,
  hs as MDBDropdown,
  bs as MDBDropdownItem,
  vs as MDBDropdownMenu,
  ys as MDBDropdownToggle,
  St as MDBFile,
  ot as MDBFooter,
  ds as MDBIcon,
  mt as MDBInput,
  At as MDBInputGroup,
  qe as MDBListGroup,
  Ke as MDBListGroupItem,
  Ms as MDBModal,
  Lt as MDBModalBody,
  Rt as MDBModalContent,
  Et as MDBModalDialog,
  kt as MDBModalFooter,
  It as MDBModalHeader,
  xt as MDBModalTitle,
  et as MDBNavbar,
  st as MDBNavbarBrand,
  nt as MDBNavbarItem,
  tt as MDBNavbarLink,
  rt as MDBNavbarNav,
  at as MDBNavbarToggler,
  ct as MDBPagination,
  it as MDBPaginationItem,
  lt as MDBPaginationLink,
  Ns as MDBPopover,
  ws as MDBPopoverBody,
  Bs as MDBPopoverHeader,
  dt as MDBProgress,
  Me as MDBProgressBar,
  gs as MDBRadio,
  Rs as MDBRange,
  Be as MDBRipple,
  Ue as MDBRow,
  Ds as MDBScrollspy,
  Ts as MDBScrollspyLink,
  $s as MDBScrollspySubList,
  Fe as MDBSpinner,
  Es as MDBSwitch,
  us as MDBTable,
  fs as MDBTableBody,
  ms as MDBTableHead,
  Ft as MDBTabs,
  Wt as MDBTabsContent,
  Pt as MDBTabsItem,
  Ht as MDBTabsLink,
  Xt as MDBTabsPane,
  ks as MDBTextArea,
  is as MDBTooltip,
  Je as MDBTypography,
  Ot as MDBValidation,
  Cs as MDBValidationItem
};
//# sourceMappingURL=mdb-react-ui-kit.js.map
