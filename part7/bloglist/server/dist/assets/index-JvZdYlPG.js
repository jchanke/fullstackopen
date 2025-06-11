(function () {
  const u = document.createElement("link").relList;
  if (u && u.supports && u.supports("modulepreload")) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) c(f);
  new MutationObserver((f) => {
    for (const p of f)
      if (p.type === "childList")
        for (const y of p.addedNodes)
          y.tagName === "LINK" && y.rel === "modulepreload" && c(y);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(f) {
    const p = {};
    return (
      f.integrity && (p.integrity = f.integrity),
      f.referrerPolicy && (p.referrerPolicy = f.referrerPolicy),
      f.crossOrigin === "use-credentials"
        ? (p.credentials = "include")
        : f.crossOrigin === "anonymous"
          ? (p.credentials = "omit")
          : (p.credentials = "same-origin"),
      p
    );
  }
  function c(f) {
    if (f.ep) return;
    f.ep = !0;
    const p = s(f);
    fetch(f.href, p);
  }
})();
function qc(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default")
    ? i.default
    : i;
}
var nu = { exports: {} },
  zr = {},
  ru = { exports: {} },
  G = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ec;
function wp() {
  if (Ec) return G;
  Ec = 1;
  var i = Symbol.for("react.element"),
    u = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    c = Symbol.for("react.strict_mode"),
    f = Symbol.for("react.profiler"),
    p = Symbol.for("react.provider"),
    y = Symbol.for("react.context"),
    k = Symbol.for("react.forward_ref"),
    P = Symbol.for("react.suspense"),
    _ = Symbol.for("react.memo"),
    R = Symbol.for("react.lazy"),
    F = Symbol.iterator;
  function H(m) {
    return m === null || typeof m != "object"
      ? null
      : ((m = (F && m[F]) || m["@@iterator"]),
        typeof m == "function" ? m : null);
  }
  var Z = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    A = Object.assign,
    O = {};
  function N(m, C, $) {
    (this.props = m),
      (this.context = C),
      (this.refs = O),
      (this.updater = $ || Z);
  }
  (N.prototype.isReactComponent = {}),
    (N.prototype.setState = function (m, C) {
      if (typeof m != "object" && typeof m != "function" && m != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, m, C, "setState");
    }),
    (N.prototype.forceUpdate = function (m) {
      this.updater.enqueueForceUpdate(this, m, "forceUpdate");
    });
  function J() {}
  J.prototype = N.prototype;
  function te(m, C, $) {
    (this.props = m),
      (this.context = C),
      (this.refs = O),
      (this.updater = $ || Z);
  }
  var le = (te.prototype = new J());
  (le.constructor = te), A(le, N.prototype), (le.isPureReactComponent = !0);
  var se = Array.isArray,
    ae = Object.prototype.hasOwnProperty,
    me = { current: null },
    we = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Oe(m, C, $) {
    var b,
      Y = {},
      ce = null,
      re = null;
    if (C != null)
      for (b in (C.ref !== void 0 && (re = C.ref),
      C.key !== void 0 && (ce = "" + C.key),
      C))
        ae.call(C, b) && !we.hasOwnProperty(b) && (Y[b] = C[b]);
    var ue = arguments.length - 2;
    if (ue === 1) Y.children = $;
    else if (1 < ue) {
      for (var oe = Array(ue), $e = 0; $e < ue; $e++)
        oe[$e] = arguments[$e + 2];
      Y.children = oe;
    }
    if (m && m.defaultProps)
      for (b in ((ue = m.defaultProps), ue)) Y[b] === void 0 && (Y[b] = ue[b]);
    return {
      $$typeof: i,
      type: m,
      key: ce,
      ref: re,
      props: Y,
      _owner: me.current,
    };
  }
  function st(m, C) {
    return {
      $$typeof: i,
      type: m.type,
      key: C,
      ref: m.ref,
      props: m.props,
      _owner: m._owner,
    };
  }
  function Tt(m) {
    return typeof m == "object" && m !== null && m.$$typeof === i;
  }
  function tn(m) {
    var C = { "=": "=0", ":": "=2" };
    return (
      "$" +
      m.replace(/[=:]/g, function ($) {
        return C[$];
      })
    );
  }
  var gt = /\/+/g;
  function Ge(m, C) {
    return typeof m == "object" && m !== null && m.key != null
      ? tn("" + m.key)
      : C.toString(36);
  }
  function at(m, C, $, b, Y) {
    var ce = typeof m;
    (ce === "undefined" || ce === "boolean") && (m = null);
    var re = !1;
    if (m === null) re = !0;
    else
      switch (ce) {
        case "string":
        case "number":
          re = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case i:
            case u:
              re = !0;
          }
      }
    if (re)
      return (
        (re = m),
        (Y = Y(re)),
        (m = b === "" ? "." + Ge(re, 0) : b),
        se(Y)
          ? (($ = ""),
            m != null && ($ = m.replace(gt, "$&/") + "/"),
            at(Y, C, $, "", function ($e) {
              return $e;
            }))
          : Y != null &&
            (Tt(Y) &&
              (Y = st(
                Y,
                $ +
                  (!Y.key || (re && re.key === Y.key)
                    ? ""
                    : ("" + Y.key).replace(gt, "$&/") + "/") +
                  m,
              )),
            C.push(Y)),
        1
      );
    if (((re = 0), (b = b === "" ? "." : b + ":"), se(m)))
      for (var ue = 0; ue < m.length; ue++) {
        ce = m[ue];
        var oe = b + Ge(ce, ue);
        re += at(ce, C, $, oe, Y);
      }
    else if (((oe = H(m)), typeof oe == "function"))
      for (m = oe.call(m), ue = 0; !(ce = m.next()).done; )
        (ce = ce.value), (oe = b + Ge(ce, ue++)), (re += at(ce, C, $, oe, Y));
    else if (ce === "object")
      throw (
        ((C = String(m)),
        Error(
          "Objects are not valid as a React child (found: " +
            (C === "[object Object]"
              ? "object with keys {" + Object.keys(m).join(", ") + "}"
              : C) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    return re;
  }
  function wt(m, C, $) {
    if (m == null) return m;
    var b = [],
      Y = 0;
    return (
      at(m, b, "", "", function (ce) {
        return C.call($, ce, Y++);
      }),
      b
    );
  }
  function He(m) {
    if (m._status === -1) {
      var C = m._result;
      (C = C()),
        C.then(
          function ($) {
            (m._status === 0 || m._status === -1) &&
              ((m._status = 1), (m._result = $));
          },
          function ($) {
            (m._status === 0 || m._status === -1) &&
              ((m._status = 2), (m._result = $));
          },
        ),
        m._status === -1 && ((m._status = 0), (m._result = C));
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var Se = { current: null },
    j = { transition: null },
    Q = {
      ReactCurrentDispatcher: Se,
      ReactCurrentBatchConfig: j,
      ReactCurrentOwner: me,
    };
  return (
    (G.Children = {
      map: wt,
      forEach: function (m, C, $) {
        wt(
          m,
          function () {
            C.apply(this, arguments);
          },
          $,
        );
      },
      count: function (m) {
        var C = 0;
        return (
          wt(m, function () {
            C++;
          }),
          C
        );
      },
      toArray: function (m) {
        return (
          wt(m, function (C) {
            return C;
          }) || []
        );
      },
      only: function (m) {
        if (!Tt(m))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return m;
      },
    }),
    (G.Component = N),
    (G.Fragment = s),
    (G.Profiler = f),
    (G.PureComponent = te),
    (G.StrictMode = c),
    (G.Suspense = P),
    (G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q),
    (G.cloneElement = function (m, C, $) {
      if (m == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            m +
            ".",
        );
      var b = A({}, m.props),
        Y = m.key,
        ce = m.ref,
        re = m._owner;
      if (C != null) {
        if (
          (C.ref !== void 0 && ((ce = C.ref), (re = me.current)),
          C.key !== void 0 && (Y = "" + C.key),
          m.type && m.type.defaultProps)
        )
          var ue = m.type.defaultProps;
        for (oe in C)
          ae.call(C, oe) &&
            !we.hasOwnProperty(oe) &&
            (b[oe] = C[oe] === void 0 && ue !== void 0 ? ue[oe] : C[oe]);
      }
      var oe = arguments.length - 2;
      if (oe === 1) b.children = $;
      else if (1 < oe) {
        ue = Array(oe);
        for (var $e = 0; $e < oe; $e++) ue[$e] = arguments[$e + 2];
        b.children = ue;
      }
      return {
        $$typeof: i,
        type: m.type,
        key: Y,
        ref: ce,
        props: b,
        _owner: re,
      };
    }),
    (G.createContext = function (m) {
      return (
        (m = {
          $$typeof: y,
          _currentValue: m,
          _currentValue2: m,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (m.Provider = { $$typeof: p, _context: m }),
        (m.Consumer = m)
      );
    }),
    (G.createElement = Oe),
    (G.createFactory = function (m) {
      var C = Oe.bind(null, m);
      return (C.type = m), C;
    }),
    (G.createRef = function () {
      return { current: null };
    }),
    (G.forwardRef = function (m) {
      return { $$typeof: k, render: m };
    }),
    (G.isValidElement = Tt),
    (G.lazy = function (m) {
      return { $$typeof: R, _payload: { _status: -1, _result: m }, _init: He };
    }),
    (G.memo = function (m, C) {
      return { $$typeof: _, type: m, compare: C === void 0 ? null : C };
    }),
    (G.startTransition = function (m) {
      var C = j.transition;
      j.transition = {};
      try {
        m();
      } finally {
        j.transition = C;
      }
    }),
    (G.unstable_act = function () {
      throw Error("act(...) is not supported in production builds of React.");
    }),
    (G.useCallback = function (m, C) {
      return Se.current.useCallback(m, C);
    }),
    (G.useContext = function (m) {
      return Se.current.useContext(m);
    }),
    (G.useDebugValue = function () {}),
    (G.useDeferredValue = function (m) {
      return Se.current.useDeferredValue(m);
    }),
    (G.useEffect = function (m, C) {
      return Se.current.useEffect(m, C);
    }),
    (G.useId = function () {
      return Se.current.useId();
    }),
    (G.useImperativeHandle = function (m, C, $) {
      return Se.current.useImperativeHandle(m, C, $);
    }),
    (G.useInsertionEffect = function (m, C) {
      return Se.current.useInsertionEffect(m, C);
    }),
    (G.useLayoutEffect = function (m, C) {
      return Se.current.useLayoutEffect(m, C);
    }),
    (G.useMemo = function (m, C) {
      return Se.current.useMemo(m, C);
    }),
    (G.useReducer = function (m, C, $) {
      return Se.current.useReducer(m, C, $);
    }),
    (G.useRef = function (m) {
      return Se.current.useRef(m);
    }),
    (G.useState = function (m) {
      return Se.current.useState(m);
    }),
    (G.useSyncExternalStore = function (m, C, $) {
      return Se.current.useSyncExternalStore(m, C, $);
    }),
    (G.useTransition = function () {
      return Se.current.useTransition();
    }),
    (G.version = "18.2.0"),
    G
  );
}
var kc;
function Eu() {
  return kc || ((kc = 1), (ru.exports = wp())), ru.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xc;
function Sp() {
  if (xc) return zr;
  xc = 1;
  var i = Eu(),
    u = Symbol.for("react.element"),
    s = Symbol.for("react.fragment"),
    c = Object.prototype.hasOwnProperty,
    f = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(k, P, _) {
    var R,
      F = {},
      H = null,
      Z = null;
    _ !== void 0 && (H = "" + _),
      P.key !== void 0 && (H = "" + P.key),
      P.ref !== void 0 && (Z = P.ref);
    for (R in P) c.call(P, R) && !p.hasOwnProperty(R) && (F[R] = P[R]);
    if (k && k.defaultProps)
      for (R in ((P = k.defaultProps), P)) F[R] === void 0 && (F[R] = P[R]);
    return {
      $$typeof: u,
      type: k,
      key: H,
      ref: Z,
      props: F,
      _owner: f.current,
    };
  }
  return (zr.Fragment = s), (zr.jsx = y), (zr.jsxs = y), zr;
}
var Cc;
function Ep() {
  return Cc || ((Cc = 1), (nu.exports = Sp())), nu.exports;
}
var q = Ep(),
  Kl = {},
  lu = { exports: {} },
  Je = {},
  ou = { exports: {} },
  iu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _c;
function kp() {
  return (
    _c ||
      ((_c = 1),
      (function (i) {
        function u(j, Q) {
          var m = j.length;
          j.push(Q);
          e: for (; 0 < m; ) {
            var C = (m - 1) >>> 1,
              $ = j[C];
            if (0 < f($, Q)) (j[C] = Q), (j[m] = $), (m = C);
            else break e;
          }
        }
        function s(j) {
          return j.length === 0 ? null : j[0];
        }
        function c(j) {
          if (j.length === 0) return null;
          var Q = j[0],
            m = j.pop();
          if (m !== Q) {
            j[0] = m;
            e: for (var C = 0, $ = j.length, b = $ >>> 1; C < b; ) {
              var Y = 2 * (C + 1) - 1,
                ce = j[Y],
                re = Y + 1,
                ue = j[re];
              if (0 > f(ce, m))
                re < $ && 0 > f(ue, ce)
                  ? ((j[C] = ue), (j[re] = m), (C = re))
                  : ((j[C] = ce), (j[Y] = m), (C = Y));
              else if (re < $ && 0 > f(ue, m))
                (j[C] = ue), (j[re] = m), (C = re);
              else break e;
            }
          }
          return Q;
        }
        function f(j, Q) {
          var m = j.sortIndex - Q.sortIndex;
          return m !== 0 ? m : j.id - Q.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var p = performance;
          i.unstable_now = function () {
            return p.now();
          };
        } else {
          var y = Date,
            k = y.now();
          i.unstable_now = function () {
            return y.now() - k;
          };
        }
        var P = [],
          _ = [],
          R = 1,
          F = null,
          H = 3,
          Z = !1,
          A = !1,
          O = !1,
          N = typeof setTimeout == "function" ? setTimeout : null,
          J = typeof clearTimeout == "function" ? clearTimeout : null,
          te = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function le(j) {
          for (var Q = s(_); Q !== null; ) {
            if (Q.callback === null) c(_);
            else if (Q.startTime <= j)
              c(_), (Q.sortIndex = Q.expirationTime), u(P, Q);
            else break;
            Q = s(_);
          }
        }
        function se(j) {
          if (((O = !1), le(j), !A))
            if (s(P) !== null) (A = !0), He(ae);
            else {
              var Q = s(_);
              Q !== null && Se(se, Q.startTime - j);
            }
        }
        function ae(j, Q) {
          (A = !1), O && ((O = !1), J(Oe), (Oe = -1)), (Z = !0);
          var m = H;
          try {
            for (
              le(Q), F = s(P);
              F !== null && (!(F.expirationTime > Q) || (j && !tn()));

            ) {
              var C = F.callback;
              if (typeof C == "function") {
                (F.callback = null), (H = F.priorityLevel);
                var $ = C(F.expirationTime <= Q);
                (Q = i.unstable_now()),
                  typeof $ == "function"
                    ? (F.callback = $)
                    : F === s(P) && c(P),
                  le(Q);
              } else c(P);
              F = s(P);
            }
            if (F !== null) var b = !0;
            else {
              var Y = s(_);
              Y !== null && Se(se, Y.startTime - Q), (b = !1);
            }
            return b;
          } finally {
            (F = null), (H = m), (Z = !1);
          }
        }
        var me = !1,
          we = null,
          Oe = -1,
          st = 5,
          Tt = -1;
        function tn() {
          return !(i.unstable_now() - Tt < st);
        }
        function gt() {
          if (we !== null) {
            var j = i.unstable_now();
            Tt = j;
            var Q = !0;
            try {
              Q = we(!0, j);
            } finally {
              Q ? Ge() : ((me = !1), (we = null));
            }
          } else me = !1;
        }
        var Ge;
        if (typeof te == "function")
          Ge = function () {
            te(gt);
          };
        else if (typeof MessageChannel < "u") {
          var at = new MessageChannel(),
            wt = at.port2;
          (at.port1.onmessage = gt),
            (Ge = function () {
              wt.postMessage(null);
            });
        } else
          Ge = function () {
            N(gt, 0);
          };
        function He(j) {
          (we = j), me || ((me = !0), Ge());
        }
        function Se(j, Q) {
          Oe = N(function () {
            j(i.unstable_now());
          }, Q);
        }
        (i.unstable_IdlePriority = 5),
          (i.unstable_ImmediatePriority = 1),
          (i.unstable_LowPriority = 4),
          (i.unstable_NormalPriority = 3),
          (i.unstable_Profiling = null),
          (i.unstable_UserBlockingPriority = 2),
          (i.unstable_cancelCallback = function (j) {
            j.callback = null;
          }),
          (i.unstable_continueExecution = function () {
            A || Z || ((A = !0), He(ae));
          }),
          (i.unstable_forceFrameRate = function (j) {
            0 > j || 125 < j
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (st = 0 < j ? Math.floor(1e3 / j) : 5);
          }),
          (i.unstable_getCurrentPriorityLevel = function () {
            return H;
          }),
          (i.unstable_getFirstCallbackNode = function () {
            return s(P);
          }),
          (i.unstable_next = function (j) {
            switch (H) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = H;
            }
            var m = H;
            H = Q;
            try {
              return j();
            } finally {
              H = m;
            }
          }),
          (i.unstable_pauseExecution = function () {}),
          (i.unstable_requestPaint = function () {}),
          (i.unstable_runWithPriority = function (j, Q) {
            switch (j) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                j = 3;
            }
            var m = H;
            H = j;
            try {
              return Q();
            } finally {
              H = m;
            }
          }),
          (i.unstable_scheduleCallback = function (j, Q, m) {
            var C = i.unstable_now();
            switch (
              (typeof m == "object" && m !== null
                ? ((m = m.delay),
                  (m = typeof m == "number" && 0 < m ? C + m : C))
                : (m = C),
              j)
            ) {
              case 1:
                var $ = -1;
                break;
              case 2:
                $ = 250;
                break;
              case 5:
                $ = 1073741823;
                break;
              case 4:
                $ = 1e4;
                break;
              default:
                $ = 5e3;
            }
            return (
              ($ = m + $),
              (j = {
                id: R++,
                callback: Q,
                priorityLevel: j,
                startTime: m,
                expirationTime: $,
                sortIndex: -1,
              }),
              m > C
                ? ((j.sortIndex = m),
                  u(_, j),
                  s(P) === null &&
                    j === s(_) &&
                    (O ? (J(Oe), (Oe = -1)) : (O = !0), Se(se, m - C)))
                : ((j.sortIndex = $), u(P, j), A || Z || ((A = !0), He(ae))),
              j
            );
          }),
          (i.unstable_shouldYield = tn),
          (i.unstable_wrapCallback = function (j) {
            var Q = H;
            return function () {
              var m = H;
              H = Q;
              try {
                return j.apply(this, arguments);
              } finally {
                H = m;
              }
            };
          });
      })(iu)),
    iu
  );
}
var Rc;
function xp() {
  return Rc || ((Rc = 1), (ou.exports = kp())), ou.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tc;
function Cp() {
  if (Tc) return Je;
  Tc = 1;
  var i = Eu(),
    u = xp();
  function s(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var c = new Set(),
    f = {};
  function p(e, t) {
    y(e, t), y(e + "Capture", t);
  }
  function y(e, t) {
    for (f[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var k = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    P = Object.prototype.hasOwnProperty,
    _ =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    R = {},
    F = {};
  function H(e) {
    return P.call(F, e)
      ? !0
      : P.call(R, e)
        ? !1
        : _.test(e)
          ? (F[e] = !0)
          : ((R[e] = !0), !1);
  }
  function Z(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function A(e, t, n, r) {
    if (t === null || typeof t > "u" || Z(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function O(e, t, n, r, l, o, a) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = o),
      (this.removeEmptyString = a);
  }
  var N = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      N[e] = new O(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      N[t] = new O(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        N[e] = new O(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      N[e] = new O(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        N[e] = new O(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      N[e] = new O(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      N[e] = new O(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      N[e] = new O(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      N[e] = new O(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
  var J = /[\-:]([a-z])/g;
  function te(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(J, te);
      N[t] = new O(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(J, te);
        N[t] = new O(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(J, te);
      N[t] = new O(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      N[e] = new O(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (N.xlinkHref = new O(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      N[e] = new O(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
  function le(e, t, n, r) {
    var l = N.hasOwnProperty(t) ? N[t] : null;
    (l !== null
      ? l.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (A(t, n, l, r) && (n = null),
      r || l === null
        ? H(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : l.mustUseProperty
          ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
          : ((t = l.attributeName),
            (r = l.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((l = l.type),
                (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var se = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ae = Symbol.for("react.element"),
    me = Symbol.for("react.portal"),
    we = Symbol.for("react.fragment"),
    Oe = Symbol.for("react.strict_mode"),
    st = Symbol.for("react.profiler"),
    Tt = Symbol.for("react.provider"),
    tn = Symbol.for("react.context"),
    gt = Symbol.for("react.forward_ref"),
    Ge = Symbol.for("react.suspense"),
    at = Symbol.for("react.suspense_list"),
    wt = Symbol.for("react.memo"),
    He = Symbol.for("react.lazy"),
    Se = Symbol.for("react.offscreen"),
    j = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (j && e[j]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var m = Object.assign,
    C;
  function $(e) {
    if (C === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        C = (t && t[1]) || "";
      }
    return (
      `
` +
      C +
      e
    );
  }
  var b = !1;
  function Y(e, t) {
    if (!e || b) return "";
    b = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (S) {
            var r = S;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (S) {
            r = S;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (S) {
          r = S;
        }
        e();
      }
    } catch (S) {
      if (S && r && typeof S.stack == "string") {
        for (
          var l = S.stack.split(`
`),
            o = r.stack.split(`
`),
            a = l.length - 1,
            d = o.length - 1;
          1 <= a && 0 <= d && l[a] !== o[d];

        )
          d--;
        for (; 1 <= a && 0 <= d; a--, d--)
          if (l[a] !== o[d]) {
            if (a !== 1 || d !== 1)
              do
                if ((a--, d--, 0 > d || l[a] !== o[d])) {
                  var h =
                    `
` + l[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      h.includes("<anonymous>") &&
                      (h = h.replace("<anonymous>", e.displayName)),
                    h
                  );
                }
              while (1 <= a && 0 <= d);
            break;
          }
      }
    } finally {
      (b = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? $(e) : "";
  }
  function ce(e) {
    switch (e.tag) {
      case 5:
        return $(e.type);
      case 16:
        return $("Lazy");
      case 13:
        return $("Suspense");
      case 19:
        return $("SuspenseList");
      case 0:
      case 2:
      case 15:
        return (e = Y(e.type, !1)), e;
      case 11:
        return (e = Y(e.type.render, !1)), e;
      case 1:
        return (e = Y(e.type, !0)), e;
      default:
        return "";
    }
  }
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case we:
        return "Fragment";
      case me:
        return "Portal";
      case st:
        return "Profiler";
      case Oe:
        return "StrictMode";
      case Ge:
        return "Suspense";
      case at:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case tn:
          return (e.displayName || "Context") + ".Consumer";
        case Tt:
          return (e._context.displayName || "Context") + ".Provider";
        case gt:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case wt:
          return (
            (t = e.displayName || null), t !== null ? t : re(e.type) || "Memo"
          );
        case He:
          (t = e._payload), (e = e._init);
          try {
            return re(e(t));
          } catch {}
      }
    return null;
  }
  function ue(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return re(t);
      case 8:
        return t === Oe ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function oe(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function $e(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function kf(e) {
    var t = $e(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var l = n.get,
        o = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (a) {
            (r = "" + a), o.call(this, a);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (a) {
            r = "" + a;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Ur(e) {
    e._valueTracker || (e._valueTracker = kf(e));
  }
  function Ru(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = $e(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Ir(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function so(e, t) {
    var n = t.checked;
    return m({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Tu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    (n = oe(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      });
  }
  function Pu(e, t) {
    (t = t.checked), t != null && le(e, "checked", t, !1);
  }
  function ao(e, t) {
    Pu(e, t);
    var n = oe(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value")
      ? co(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && co(e, t.type, oe(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function Nu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (
        !(
          (r !== "submit" && r !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      (t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n);
  }
  function co(e, t, n) {
    (t !== "number" || Ir(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Kn = Array.isArray;
  function wn(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        (l = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + oe(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          (e[l].selected = !0), r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function fo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return m({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Ou(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(s(92));
        if (Kn(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: oe(n) };
  }
  function Lu(e, t) {
    var n = oe(t.value),
      r = oe(t.defaultValue);
    n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r);
  }
  function zu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function Fu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function po(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Fu(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Mr,
    ju = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, l) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, l);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          Mr = Mr || document.createElement("div"),
            Mr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Mr.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function Jn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Xn = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    xf = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Xn).forEach(function (e) {
    xf.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Xn[t] = Xn[e]);
    });
  });
  function Du(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (Xn.hasOwnProperty(e) && Xn[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Au(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          l = Du(n, t[n], r);
        n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
      }
  }
  var Cf = m(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function ho(e, t) {
    if (t) {
      if (Cf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function mo(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var yo = null;
  function vo(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var go = null,
    Sn = null,
    En = null;
  function Uu(e) {
    if ((e = vr(e))) {
      if (typeof go != "function") throw Error(s(280));
      var t = e.stateNode;
      t && ((t = sl(t)), go(e.stateNode, e.type, t));
    }
  }
  function Iu(e) {
    Sn ? (En ? En.push(e) : (En = [e])) : (Sn = e);
  }
  function Mu() {
    if (Sn) {
      var e = Sn,
        t = En;
      if (((En = Sn = null), Uu(e), t)) for (e = 0; e < t.length; e++) Uu(t[e]);
    }
  }
  function Bu(e, t) {
    return e(t);
  }
  function Hu() {}
  var wo = !1;
  function $u(e, t, n) {
    if (wo) return e(t, n);
    wo = !0;
    try {
      return Bu(e, t, n);
    } finally {
      (wo = !1), (Sn !== null || En !== null) && (Hu(), Mu());
    }
  }
  function Yn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = sl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(s(231, t, typeof n));
    return n;
  }
  var So = !1;
  if (k)
    try {
      var Gn = {};
      Object.defineProperty(Gn, "passive", {
        get: function () {
          So = !0;
        },
      }),
        window.addEventListener("test", Gn, Gn),
        window.removeEventListener("test", Gn, Gn);
    } catch {
      So = !1;
    }
  function _f(e, t, n, r, l, o, a, d, h) {
    var S = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, S);
    } catch (T) {
      this.onError(T);
    }
  }
  var Zn = !1,
    Br = null,
    Hr = !1,
    Eo = null,
    Rf = {
      onError: function (e) {
        (Zn = !0), (Br = e);
      },
    };
  function Tf(e, t, n, r, l, o, a, d, h) {
    (Zn = !1), (Br = null), _f.apply(Rf, arguments);
  }
  function Pf(e, t, n, r, l, o, a, d, h) {
    if ((Tf.apply(this, arguments), Zn)) {
      if (Zn) {
        var S = Br;
        (Zn = !1), (Br = null);
      } else throw Error(s(198));
      Hr || ((Hr = !0), (Eo = S));
    }
  }
  function nn(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Vu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Wu(e) {
    if (nn(e) !== e) throw Error(s(188));
  }
  function Nf(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = nn(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (((r = l.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return Wu(l), e;
          if (o === r) return Wu(l), t;
          o = o.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) (n = l), (r = o);
      else {
        for (var a = !1, d = l.child; d; ) {
          if (d === n) {
            (a = !0), (n = l), (r = o);
            break;
          }
          if (d === r) {
            (a = !0), (r = l), (n = o);
            break;
          }
          d = d.sibling;
        }
        if (!a) {
          for (d = o.child; d; ) {
            if (d === n) {
              (a = !0), (n = o), (r = l);
              break;
            }
            if (d === r) {
              (a = !0), (r = o), (n = l);
              break;
            }
            d = d.sibling;
          }
          if (!a) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function Qu(e) {
    return (e = Nf(e)), e !== null ? qu(e) : null;
  }
  function qu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = qu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ku = u.unstable_scheduleCallback,
    Ju = u.unstable_cancelCallback,
    Of = u.unstable_shouldYield,
    Lf = u.unstable_requestPaint,
    ke = u.unstable_now,
    zf = u.unstable_getCurrentPriorityLevel,
    ko = u.unstable_ImmediatePriority,
    Xu = u.unstable_UserBlockingPriority,
    $r = u.unstable_NormalPriority,
    Ff = u.unstable_LowPriority,
    Yu = u.unstable_IdlePriority,
    Vr = null,
    St = null;
  function jf(e) {
    if (St && typeof St.onCommitFiberRoot == "function")
      try {
        St.onCommitFiberRoot(Vr, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var ct = Math.clz32 ? Math.clz32 : Uf,
    Df = Math.log,
    Af = Math.LN2;
  function Uf(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Df(e) / Af) | 0)) | 0;
  }
  var Wr = 64,
    Qr = 4194304;
  function bn(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function qr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      l = e.suspendedLanes,
      o = e.pingedLanes,
      a = n & 268435455;
    if (a !== 0) {
      var d = a & ~l;
      d !== 0 ? (r = bn(d)) : ((o &= a), o !== 0 && (r = bn(o)));
    } else (a = n & ~l), a !== 0 ? (r = bn(a)) : o !== 0 && (r = bn(o));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      (t & l) === 0 &&
      ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
    )
      return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        (n = 31 - ct(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
    return r;
  }
  function If(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Mf(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        l = e.expirationTimes,
        o = e.pendingLanes;
      0 < o;

    ) {
      var a = 31 - ct(o),
        d = 1 << a,
        h = l[a];
      h === -1
        ? ((d & n) === 0 || (d & r) !== 0) && (l[a] = If(d, t))
        : h <= t && (e.expiredLanes |= d),
        (o &= ~d);
    }
  }
  function xo(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function Gu() {
    var e = Wr;
    return (Wr <<= 1), (Wr & 4194240) === 0 && (Wr = 64), e;
  }
  function Co(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function er(e, t, n) {
    (e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - ct(t)),
      (e[t] = n);
  }
  function Bf(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - ct(n),
        o = 1 << l;
      (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
    }
  }
  function _o(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - ct(n),
        l = 1 << r;
      (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
    }
  }
  var ie = 0;
  function Zu(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var bu,
    Ro,
    es,
    ts,
    ns,
    To = !1,
    Kr = [],
    At = null,
    Ut = null,
    It = null,
    tr = new Map(),
    nr = new Map(),
    Mt = [],
    Hf =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function rs(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        At = null;
        break;
      case "dragenter":
      case "dragleave":
        Ut = null;
        break;
      case "mouseover":
      case "mouseout":
        It = null;
        break;
      case "pointerover":
      case "pointerout":
        tr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        nr.delete(t.pointerId);
    }
  }
  function rr(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: o,
          targetContainers: [l],
        }),
        t !== null && ((t = vr(t)), t !== null && Ro(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function $f(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return (At = rr(At, e, t, n, r, l)), !0;
      case "dragenter":
        return (Ut = rr(Ut, e, t, n, r, l)), !0;
      case "mouseover":
        return (It = rr(It, e, t, n, r, l)), !0;
      case "pointerover":
        var o = l.pointerId;
        return tr.set(o, rr(tr.get(o) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return (
          (o = l.pointerId), nr.set(o, rr(nr.get(o) || null, e, t, n, r, l)), !0
        );
    }
    return !1;
  }
  function ls(e) {
    var t = rn(e.target);
    if (t !== null) {
      var n = nn(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Vu(n)), t !== null)) {
            (e.blockedOn = t),
              ns(e.priority, function () {
                es(n);
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Jr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = No(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        (yo = r), n.target.dispatchEvent(r), (yo = null);
      } else return (t = vr(n)), t !== null && Ro(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function os(e, t, n) {
    Jr(e) && n.delete(t);
  }
  function Vf() {
    (To = !1),
      At !== null && Jr(At) && (At = null),
      Ut !== null && Jr(Ut) && (Ut = null),
      It !== null && Jr(It) && (It = null),
      tr.forEach(os),
      nr.forEach(os);
  }
  function lr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      To ||
        ((To = !0),
        u.unstable_scheduleCallback(u.unstable_NormalPriority, Vf)));
  }
  function or(e) {
    function t(l) {
      return lr(l, e);
    }
    if (0 < Kr.length) {
      lr(Kr[0], e);
      for (var n = 1; n < Kr.length; n++) {
        var r = Kr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      At !== null && lr(At, e),
        Ut !== null && lr(Ut, e),
        It !== null && lr(It, e),
        tr.forEach(t),
        nr.forEach(t),
        n = 0;
      n < Mt.length;
      n++
    )
      (r = Mt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Mt.length && ((n = Mt[0]), n.blockedOn === null); )
      ls(n), n.blockedOn === null && Mt.shift();
  }
  var kn = se.ReactCurrentBatchConfig,
    Xr = !0;
  function Wf(e, t, n, r) {
    var l = ie,
      o = kn.transition;
    kn.transition = null;
    try {
      (ie = 1), Po(e, t, n, r);
    } finally {
      (ie = l), (kn.transition = o);
    }
  }
  function Qf(e, t, n, r) {
    var l = ie,
      o = kn.transition;
    kn.transition = null;
    try {
      (ie = 4), Po(e, t, n, r);
    } finally {
      (ie = l), (kn.transition = o);
    }
  }
  function Po(e, t, n, r) {
    if (Xr) {
      var l = No(e, t, n, r);
      if (l === null) qo(e, t, r, Yr, n), rs(e, r);
      else if ($f(l, e, t, n, r)) r.stopPropagation();
      else if ((rs(e, r), t & 4 && -1 < Hf.indexOf(e))) {
        for (; l !== null; ) {
          var o = vr(l);
          if (
            (o !== null && bu(o),
            (o = No(e, t, n, r)),
            o === null && qo(e, t, r, Yr, n),
            o === l)
          )
            break;
          l = o;
        }
        l !== null && r.stopPropagation();
      } else qo(e, t, r, null, n);
    }
  }
  var Yr = null;
  function No(e, t, n, r) {
    if (((Yr = null), (e = vo(r)), (e = rn(e)), e !== null))
      if (((t = nn(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = Vu(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return (Yr = e), null;
  }
  function is(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (zf()) {
          case ko:
            return 1;
          case Xu:
            return 4;
          case $r:
          case Ff:
            return 16;
          case Yu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Bt = null,
    Oo = null,
    Gr = null;
  function us() {
    if (Gr) return Gr;
    var e,
      t = Oo,
      n = t.length,
      r,
      l = "value" in Bt ? Bt.value : Bt.textContent,
      o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var a = n - e;
    for (r = 1; r <= a && t[n - r] === l[o - r]; r++);
    return (Gr = l.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Zr(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function br() {
    return !0;
  }
  function ss() {
    return !1;
  }
  function Ze(e) {
    function t(n, r, l, o, a) {
      (this._reactName = n),
        (this._targetInst = l),
        (this.type = r),
        (this.nativeEvent = o),
        (this.target = a),
        (this.currentTarget = null);
      for (var d in e)
        e.hasOwnProperty(d) && ((n = e[d]), (this[d] = n ? n(o) : o[d]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? br
          : ss),
        (this.isPropagationStopped = ss),
        this
      );
    }
    return (
      m(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = br));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = br));
        },
        persist: function () {},
        isPersistent: br,
      }),
      t
    );
  }
  var xn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Lo = Ze(xn),
    ir = m({}, xn, { view: 0, detail: 0 }),
    qf = Ze(ir),
    zo,
    Fo,
    ur,
    el = m({}, ir, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Do,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== ur &&
              (ur && e.type === "mousemove"
                ? ((zo = e.screenX - ur.screenX), (Fo = e.screenY - ur.screenY))
                : (Fo = zo = 0),
              (ur = e)),
            zo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Fo;
      },
    }),
    as = Ze(el),
    Kf = m({}, el, { dataTransfer: 0 }),
    Jf = Ze(Kf),
    Xf = m({}, ir, { relatedTarget: 0 }),
    jo = Ze(Xf),
    Yf = m({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Gf = Ze(Yf),
    Zf = m({}, xn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    bf = Ze(Zf),
    ed = m({}, xn, { data: 0 }),
    cs = Ze(ed),
    td = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    rd = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function ld(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = rd[e])
        ? !!t[e]
        : !1;
  }
  function Do() {
    return ld;
  }
  var od = m({}, ir, {
      key: function (e) {
        if (e.key) {
          var t = td[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Zr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? nd[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Do,
      charCode: function (e) {
        return e.type === "keypress" ? Zr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Zr(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    id = Ze(od),
    ud = m({}, el, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    fs = Ze(ud),
    sd = m({}, ir, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Do,
    }),
    ad = Ze(sd),
    cd = m({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    fd = Ze(cd),
    dd = m({}, el, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    pd = Ze(dd),
    hd = [9, 13, 27, 32],
    Ao = k && "CompositionEvent" in window,
    sr = null;
  k && "documentMode" in document && (sr = document.documentMode);
  var md = k && "TextEvent" in window && !sr,
    ds = k && (!Ao || (sr && 8 < sr && 11 >= sr)),
    ps = " ",
    hs = !1;
  function ms(e, t) {
    switch (e) {
      case "keyup":
        return hd.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ys(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var Cn = !1;
  function yd(e, t) {
    switch (e) {
      case "compositionend":
        return ys(t);
      case "keypress":
        return t.which !== 32 ? null : ((hs = !0), ps);
      case "textInput":
        return (e = t.data), e === ps && hs ? null : e;
      default:
        return null;
    }
  }
  function vd(e, t) {
    if (Cn)
      return e === "compositionend" || (!Ao && ms(e, t))
        ? ((e = us()), (Gr = Oo = Bt = null), (Cn = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ds && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var gd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function vs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!gd[e.type] : t === "textarea";
  }
  function gs(e, t, n, r) {
    Iu(r),
      (t = ol(t, "onChange")),
      0 < t.length &&
        ((n = new Lo("onChange", "change", null, n, r)),
        e.push({ event: n, listeners: t }));
  }
  var ar = null,
    cr = null;
  function wd(e) {
    As(e, 0);
  }
  function tl(e) {
    var t = Nn(e);
    if (Ru(t)) return e;
  }
  function Sd(e, t) {
    if (e === "change") return t;
  }
  var ws = !1;
  if (k) {
    var Uo;
    if (k) {
      var Io = "oninput" in document;
      if (!Io) {
        var Ss = document.createElement("div");
        Ss.setAttribute("oninput", "return;"),
          (Io = typeof Ss.oninput == "function");
      }
      Uo = Io;
    } else Uo = !1;
    ws = Uo && (!document.documentMode || 9 < document.documentMode);
  }
  function Es() {
    ar && (ar.detachEvent("onpropertychange", ks), (cr = ar = null));
  }
  function ks(e) {
    if (e.propertyName === "value" && tl(cr)) {
      var t = [];
      gs(t, cr, e, vo(e)), $u(wd, t);
    }
  }
  function Ed(e, t, n) {
    e === "focusin"
      ? (Es(), (ar = t), (cr = n), ar.attachEvent("onpropertychange", ks))
      : e === "focusout" && Es();
  }
  function kd(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return tl(cr);
  }
  function xd(e, t) {
    if (e === "click") return tl(t);
  }
  function Cd(e, t) {
    if (e === "input" || e === "change") return tl(t);
  }
  function _d(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ft = typeof Object.is == "function" ? Object.is : _d;
  function fr(e, t) {
    if (ft(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!P.call(t, l) || !ft(e[l], t[l])) return !1;
    }
    return !0;
  }
  function xs(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Cs(e, t) {
    var n = xs(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t))
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = xs(n);
    }
  }
  function _s(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? _s(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Rs() {
    for (var e = window, t = Ir(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Ir(e.document);
    }
    return t;
  }
  function Mo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function Rd(e) {
    var t = Rs(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      _s(n.ownerDocument.documentElement, n)
    ) {
      if (r !== null && Mo(n)) {
        if (
          ((t = r.start),
          (e = r.end),
          e === void 0 && (e = t),
          "selectionStart" in n)
        )
          (n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var l = n.textContent.length,
            o = Math.min(r.start, l);
          (r = r.end === void 0 ? o : Math.min(r.end, l)),
            !e.extend && o > r && ((l = r), (r = o), (o = l)),
            (l = Cs(n, o));
          var a = Cs(n, r);
          l &&
            a &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== l.node ||
              e.anchorOffset !== l.offset ||
              e.focusNode !== a.node ||
              e.focusOffset !== a.offset) &&
            ((t = t.createRange()),
            t.setStart(l.node, l.offset),
            e.removeAllRanges(),
            o > r
              ? (e.addRange(t), e.extend(a.node, a.offset))
              : (t.setEnd(a.node, a.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        (e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top);
    }
  }
  var Td = k && "documentMode" in document && 11 >= document.documentMode,
    _n = null,
    Bo = null,
    dr = null,
    Ho = !1;
  function Ts(e, t, n) {
    var r =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ho ||
      _n == null ||
      _n !== Ir(r) ||
      ((r = _n),
      "selectionStart" in r && Mo(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (dr && fr(dr, r)) ||
        ((dr = r),
        (r = ol(Bo, "onSelect")),
        0 < r.length &&
          ((t = new Lo("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = _n))));
  }
  function nl(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Rn = {
      animationend: nl("Animation", "AnimationEnd"),
      animationiteration: nl("Animation", "AnimationIteration"),
      animationstart: nl("Animation", "AnimationStart"),
      transitionend: nl("Transition", "TransitionEnd"),
    },
    $o = {},
    Ps = {};
  k &&
    ((Ps = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Rn.animationend.animation,
      delete Rn.animationiteration.animation,
      delete Rn.animationstart.animation),
    "TransitionEvent" in window || delete Rn.transitionend.transition);
  function rl(e) {
    if ($o[e]) return $o[e];
    if (!Rn[e]) return e;
    var t = Rn[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ps) return ($o[e] = t[n]);
    return e;
  }
  var Ns = rl("animationend"),
    Os = rl("animationiteration"),
    Ls = rl("animationstart"),
    zs = rl("transitionend"),
    Fs = new Map(),
    js =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Ht(e, t) {
    Fs.set(e, t), p(t, [e]);
  }
  for (var Vo = 0; Vo < js.length; Vo++) {
    var Wo = js[Vo],
      Pd = Wo.toLowerCase(),
      Nd = Wo[0].toUpperCase() + Wo.slice(1);
    Ht(Pd, "on" + Nd);
  }
  Ht(Ns, "onAnimationEnd"),
    Ht(Os, "onAnimationIteration"),
    Ht(Ls, "onAnimationStart"),
    Ht("dblclick", "onDoubleClick"),
    Ht("focusin", "onFocus"),
    Ht("focusout", "onBlur"),
    Ht(zs, "onTransitionEnd"),
    y("onMouseEnter", ["mouseout", "mouseover"]),
    y("onMouseLeave", ["mouseout", "mouseover"]),
    y("onPointerEnter", ["pointerout", "pointerover"]),
    y("onPointerLeave", ["pointerout", "pointerover"]),
    p(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    p(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    p("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    p(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    p(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    p(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
  var pr =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Od = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(pr),
    );
  function Ds(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), Pf(r, t, void 0, e), (e.currentTarget = null);
  }
  function As(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        l = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var a = r.length - 1; 0 <= a; a--) {
            var d = r[a],
              h = d.instance,
              S = d.currentTarget;
            if (((d = d.listener), h !== o && l.isPropagationStopped()))
              break e;
            Ds(l, d, S), (o = h);
          }
        else
          for (a = 0; a < r.length; a++) {
            if (
              ((d = r[a]),
              (h = d.instance),
              (S = d.currentTarget),
              (d = d.listener),
              h !== o && l.isPropagationStopped())
            )
              break e;
            Ds(l, d, S), (o = h);
          }
      }
    }
    if (Hr) throw ((e = Eo), (Hr = !1), (Eo = null), e);
  }
  function de(e, t) {
    var n = t[Zo];
    n === void 0 && (n = t[Zo] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Us(t, e, 2, !1), n.add(r));
  }
  function Qo(e, t, n) {
    var r = 0;
    t && (r |= 4), Us(n, e, r, t);
  }
  var ll = "_reactListening" + Math.random().toString(36).slice(2);
  function hr(e) {
    if (!e[ll]) {
      (e[ll] = !0),
        c.forEach(function (n) {
          n !== "selectionchange" && (Od.has(n) || Qo(n, !1, e), Qo(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ll] || ((t[ll] = !0), Qo("selectionchange", !1, t));
    }
  }
  function Us(e, t, n, r) {
    switch (is(t)) {
      case 1:
        var l = Wf;
        break;
      case 4:
        l = Qf;
        break;
      default:
        l = Po;
    }
    (n = l.bind(null, t, n, e)),
      (l = void 0),
      !So ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1);
  }
  function qo(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var a = r.tag;
        if (a === 3 || a === 4) {
          var d = r.stateNode.containerInfo;
          if (d === l || (d.nodeType === 8 && d.parentNode === l)) break;
          if (a === 4)
            for (a = r.return; a !== null; ) {
              var h = a.tag;
              if (
                (h === 3 || h === 4) &&
                ((h = a.stateNode.containerInfo),
                h === l || (h.nodeType === 8 && h.parentNode === l))
              )
                return;
              a = a.return;
            }
          for (; d !== null; ) {
            if (((a = rn(d)), a === null)) return;
            if (((h = a.tag), h === 5 || h === 6)) {
              r = o = a;
              continue e;
            }
            d = d.parentNode;
          }
        }
        r = r.return;
      }
    $u(function () {
      var S = o,
        T = vo(n),
        L = [];
      e: {
        var x = Fs.get(e);
        if (x !== void 0) {
          var D = Lo,
            I = e;
          switch (e) {
            case "keypress":
              if (Zr(n) === 0) break e;
            case "keydown":
            case "keyup":
              D = id;
              break;
            case "focusin":
              (I = "focus"), (D = jo);
              break;
            case "focusout":
              (I = "blur"), (D = jo);
              break;
            case "beforeblur":
            case "afterblur":
              D = jo;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              D = as;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = Jf;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = ad;
              break;
            case Ns:
            case Os:
            case Ls:
              D = Gf;
              break;
            case zs:
              D = fd;
              break;
            case "scroll":
              D = qf;
              break;
            case "wheel":
              D = pd;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = bf;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = fs;
          }
          var M = (t & 4) !== 0,
            xe = !M && e === "scroll",
            g = M ? (x !== null ? x + "Capture" : null) : x;
          M = [];
          for (var v = S, w; v !== null; ) {
            w = v;
            var z = w.stateNode;
            if (
              (w.tag === 5 &&
                z !== null &&
                ((w = z),
                g !== null &&
                  ((z = Yn(v, g)), z != null && M.push(mr(v, z, w)))),
              xe)
            )
              break;
            v = v.return;
          }
          0 < M.length &&
            ((x = new D(x, I, null, n, T)), L.push({ event: x, listeners: M }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((x = e === "mouseover" || e === "pointerover"),
            (D = e === "mouseout" || e === "pointerout"),
            x &&
              n !== yo &&
              (I = n.relatedTarget || n.fromElement) &&
              (rn(I) || I[Pt]))
          )
            break e;
          if (
            (D || x) &&
            ((x =
              T.window === T
                ? T
                : (x = T.ownerDocument)
                  ? x.defaultView || x.parentWindow
                  : window),
            D
              ? ((I = n.relatedTarget || n.toElement),
                (D = S),
                (I = I ? rn(I) : null),
                I !== null &&
                  ((xe = nn(I)), I !== xe || (I.tag !== 5 && I.tag !== 6)) &&
                  (I = null))
              : ((D = null), (I = S)),
            D !== I)
          ) {
            if (
              ((M = as),
              (z = "onMouseLeave"),
              (g = "onMouseEnter"),
              (v = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((M = fs),
                (z = "onPointerLeave"),
                (g = "onPointerEnter"),
                (v = "pointer")),
              (xe = D == null ? x : Nn(D)),
              (w = I == null ? x : Nn(I)),
              (x = new M(z, v + "leave", D, n, T)),
              (x.target = xe),
              (x.relatedTarget = w),
              (z = null),
              rn(T) === S &&
                ((M = new M(g, v + "enter", I, n, T)),
                (M.target = w),
                (M.relatedTarget = xe),
                (z = M)),
              (xe = z),
              D && I)
            )
              t: {
                for (M = D, g = I, v = 0, w = M; w; w = Tn(w)) v++;
                for (w = 0, z = g; z; z = Tn(z)) w++;
                for (; 0 < v - w; ) (M = Tn(M)), v--;
                for (; 0 < w - v; ) (g = Tn(g)), w--;
                for (; v--; ) {
                  if (M === g || (g !== null && M === g.alternate)) break t;
                  (M = Tn(M)), (g = Tn(g));
                }
                M = null;
              }
            else M = null;
            D !== null && Is(L, x, D, M, !1),
              I !== null && xe !== null && Is(L, xe, I, M, !0);
          }
        }
        e: {
          if (
            ((x = S ? Nn(S) : window),
            (D = x.nodeName && x.nodeName.toLowerCase()),
            D === "select" || (D === "input" && x.type === "file"))
          )
            var B = Sd;
          else if (vs(x))
            if (ws) B = Cd;
            else {
              B = kd;
              var V = Ed;
            }
          else
            (D = x.nodeName) &&
              D.toLowerCase() === "input" &&
              (x.type === "checkbox" || x.type === "radio") &&
              (B = xd);
          if (B && (B = B(e, S))) {
            gs(L, B, n, T);
            break e;
          }
          V && V(e, x, S),
            e === "focusout" &&
              (V = x._wrapperState) &&
              V.controlled &&
              x.type === "number" &&
              co(x, "number", x.value);
        }
        switch (((V = S ? Nn(S) : window), e)) {
          case "focusin":
            (vs(V) || V.contentEditable === "true") &&
              ((_n = V), (Bo = S), (dr = null));
            break;
          case "focusout":
            dr = Bo = _n = null;
            break;
          case "mousedown":
            Ho = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Ho = !1), Ts(L, n, T);
            break;
          case "selectionchange":
            if (Td) break;
          case "keydown":
          case "keyup":
            Ts(L, n, T);
        }
        var W;
        if (Ao)
          e: {
            switch (e) {
              case "compositionstart":
                var K = "onCompositionStart";
                break e;
              case "compositionend":
                K = "onCompositionEnd";
                break e;
              case "compositionupdate":
                K = "onCompositionUpdate";
                break e;
            }
            K = void 0;
          }
        else
          Cn
            ? ms(e, n) && (K = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (K = "onCompositionStart");
        K &&
          (ds &&
            n.locale !== "ko" &&
            (Cn || K !== "onCompositionStart"
              ? K === "onCompositionEnd" && Cn && (W = us())
              : ((Bt = T),
                (Oo = "value" in Bt ? Bt.value : Bt.textContent),
                (Cn = !0))),
          (V = ol(S, K)),
          0 < V.length &&
            ((K = new cs(K, e, null, n, T)),
            L.push({ event: K, listeners: V }),
            W ? (K.data = W) : ((W = ys(n)), W !== null && (K.data = W)))),
          (W = md ? yd(e, n) : vd(e, n)) &&
            ((S = ol(S, "onBeforeInput")),
            0 < S.length &&
              ((T = new cs("onBeforeInput", "beforeinput", null, n, T)),
              L.push({ event: T, listeners: S }),
              (T.data = W)));
      }
      As(L, t);
    });
  }
  function mr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function ol(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e,
        o = l.stateNode;
      l.tag === 5 &&
        o !== null &&
        ((l = o),
        (o = Yn(e, n)),
        o != null && r.unshift(mr(e, o, l)),
        (o = Yn(e, t)),
        o != null && r.push(mr(e, o, l))),
        (e = e.return);
    }
    return r;
  }
  function Tn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Is(e, t, n, r, l) {
    for (var o = t._reactName, a = []; n !== null && n !== r; ) {
      var d = n,
        h = d.alternate,
        S = d.stateNode;
      if (h !== null && h === r) break;
      d.tag === 5 &&
        S !== null &&
        ((d = S),
        l
          ? ((h = Yn(n, o)), h != null && a.unshift(mr(n, h, d)))
          : l || ((h = Yn(n, o)), h != null && a.push(mr(n, h, d)))),
        (n = n.return);
    }
    a.length !== 0 && e.push({ event: t, listeners: a });
  }
  var Ld = /\r\n?/g,
    zd = /\u0000|\uFFFD/g;
  function Ms(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        Ld,
        `
`,
      )
      .replace(zd, "");
  }
  function il(e, t, n) {
    if (((t = Ms(t)), Ms(e) !== t && n)) throw Error(s(425));
  }
  function ul() {}
  var Ko = null,
    Jo = null;
  function Xo(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Yo = typeof setTimeout == "function" ? setTimeout : void 0,
    Fd = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Bs = typeof Promise == "function" ? Promise : void 0,
    jd =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Bs < "u"
          ? function (e) {
              return Bs.resolve(null).then(e).catch(Dd);
            }
          : Yo;
  function Dd(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Go(e, t) {
    var n = t,
      r = 0;
    do {
      var l = n.nextSibling;
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === "/$")) {
          if (r === 0) {
            e.removeChild(l), or(t);
            return;
          }
          r--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
      n = l;
    } while (n);
    or(t);
  }
  function $t(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Hs(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Pn = Math.random().toString(36).slice(2),
    Et = "__reactFiber$" + Pn,
    yr = "__reactProps$" + Pn,
    Pt = "__reactContainer$" + Pn,
    Zo = "__reactEvents$" + Pn,
    Ad = "__reactListeners$" + Pn,
    Ud = "__reactHandles$" + Pn;
  function rn(e) {
    var t = e[Et];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Pt] || n[Et])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Hs(e); e !== null; ) {
            if ((n = e[Et])) return n;
            e = Hs(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function vr(e) {
    return (
      (e = e[Et] || e[Pt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function Nn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function sl(e) {
    return e[yr] || null;
  }
  var bo = [],
    On = -1;
  function Vt(e) {
    return { current: e };
  }
  function pe(e) {
    0 > On || ((e.current = bo[On]), (bo[On] = null), On--);
  }
  function fe(e, t) {
    On++, (bo[On] = e.current), (e.current = t);
  }
  var Wt = {},
    Fe = Vt(Wt),
    Ve = Vt(!1),
    ln = Wt;
  function Ln(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Wt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
      o;
    for (o in n) l[o] = t[o];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      l
    );
  }
  function We(e) {
    return (e = e.childContextTypes), e != null;
  }
  function al() {
    pe(Ve), pe(Fe);
  }
  function $s(e, t, n) {
    if (Fe.current !== Wt) throw Error(s(168));
    fe(Fe, t), fe(Ve, n);
  }
  function Vs(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
      return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(s(108, ue(e) || "Unknown", l));
    return m({}, n, r);
  }
  function cl(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Wt),
      (ln = Fe.current),
      fe(Fe, e),
      fe(Ve, Ve.current),
      !0
    );
  }
  function Ws(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n
      ? ((e = Vs(e, t, ln)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        pe(Ve),
        pe(Fe),
        fe(Fe, e))
      : pe(Ve),
      fe(Ve, n);
  }
  var Nt = null,
    fl = !1,
    ei = !1;
  function Qs(e) {
    Nt === null ? (Nt = [e]) : Nt.push(e);
  }
  function Id(e) {
    (fl = !0), Qs(e);
  }
  function Qt() {
    if (!ei && Nt !== null) {
      ei = !0;
      var e = 0,
        t = ie;
      try {
        var n = Nt;
        for (ie = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        (Nt = null), (fl = !1);
      } catch (l) {
        throw (Nt !== null && (Nt = Nt.slice(e + 1)), Ku(ko, Qt), l);
      } finally {
        (ie = t), (ei = !1);
      }
    }
    return null;
  }
  var zn = [],
    Fn = 0,
    dl = null,
    pl = 0,
    nt = [],
    rt = 0,
    on = null,
    Ot = 1,
    Lt = "";
  function un(e, t) {
    (zn[Fn++] = pl), (zn[Fn++] = dl), (dl = e), (pl = t);
  }
  function qs(e, t, n) {
    (nt[rt++] = Ot), (nt[rt++] = Lt), (nt[rt++] = on), (on = e);
    var r = Ot;
    e = Lt;
    var l = 32 - ct(r) - 1;
    (r &= ~(1 << l)), (n += 1);
    var o = 32 - ct(t) + l;
    if (30 < o) {
      var a = l - (l % 5);
      (o = (r & ((1 << a) - 1)).toString(32)),
        (r >>= a),
        (l -= a),
        (Ot = (1 << (32 - ct(t) + l)) | (n << l) | r),
        (Lt = o + e);
    } else (Ot = (1 << o) | (n << l) | r), (Lt = e);
  }
  function ti(e) {
    e.return !== null && (un(e, 1), qs(e, 1, 0));
  }
  function ni(e) {
    for (; e === dl; )
      (dl = zn[--Fn]), (zn[Fn] = null), (pl = zn[--Fn]), (zn[Fn] = null);
    for (; e === on; )
      (on = nt[--rt]),
        (nt[rt] = null),
        (Lt = nt[--rt]),
        (nt[rt] = null),
        (Ot = nt[--rt]),
        (nt[rt] = null);
  }
  var be = null,
    et = null,
    ye = !1,
    dt = null;
  function Ks(e, t) {
    var n = ut(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
  }
  function Js(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (be = e), (et = $t(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (be = e), (et = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = on !== null ? { id: Ot, overflow: Lt } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = ut(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (be = e),
              (et = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function ri(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function li(e) {
    if (ye) {
      var t = et;
      if (t) {
        var n = t;
        if (!Js(e, t)) {
          if (ri(e)) throw Error(s(418));
          t = $t(n.nextSibling);
          var r = be;
          t && Js(e, t)
            ? Ks(r, n)
            : ((e.flags = (e.flags & -4097) | 2), (ye = !1), (be = e));
        }
      } else {
        if (ri(e)) throw Error(s(418));
        (e.flags = (e.flags & -4097) | 2), (ye = !1), (be = e);
      }
    }
  }
  function Xs(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    be = e;
  }
  function hl(e) {
    if (e !== be) return !1;
    if (!ye) return Xs(e), (ye = !0), !1;
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !Xo(e.type, e.memoizedProps))),
      t && (t = et))
    ) {
      if (ri(e)) throw (Ys(), Error(s(418)));
      for (; t; ) Ks(e, t), (t = $t(t.nextSibling));
    }
    if ((Xs(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                et = $t(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        et = null;
      }
    } else et = be ? $t(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ys() {
    for (var e = et; e; ) e = $t(e.nextSibling);
  }
  function jn() {
    (et = be = null), (ye = !1);
  }
  function oi(e) {
    dt === null ? (dt = [e]) : dt.push(e);
  }
  var Md = se.ReactCurrentBatchConfig;
  function pt(e, t) {
    if (e && e.defaultProps) {
      (t = m({}, t)), (e = e.defaultProps);
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  var ml = Vt(null),
    yl = null,
    Dn = null,
    ii = null;
  function ui() {
    ii = Dn = yl = null;
  }
  function si(e) {
    var t = ml.current;
    pe(ml), (e._currentValue = t);
  }
  function ai(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function An(e, t) {
    (yl = e),
      (ii = Dn = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (Qe = !0), (e.firstContext = null));
  }
  function lt(e) {
    var t = e._currentValue;
    if (ii !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Dn === null)) {
        if (yl === null) throw Error(s(308));
        (Dn = e), (yl.dependencies = { lanes: 0, firstContext: e });
      } else Dn = Dn.next = e;
    return t;
  }
  var sn = null;
  function ci(e) {
    sn === null ? (sn = [e]) : sn.push(e);
  }
  function Gs(e, t, n, r) {
    var l = t.interleaved;
    return (
      l === null ? ((n.next = n), ci(t)) : ((n.next = l.next), (l.next = n)),
      (t.interleaved = n),
      zt(e, r)
    );
  }
  function zt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      (e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
  }
  var qt = !1;
  function fi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Zs(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function Ft(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Kt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (ee & 2) !== 0)) {
      var l = r.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (r.pending = t),
        zt(e, n)
      );
    }
    return (
      (l = r.interleaved),
      l === null ? ((t.next = t), ci(r)) : ((t.next = l.next), (l.next = t)),
      (r.interleaved = t),
      zt(e, n)
    );
  }
  function vl(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), _o(e, n);
    }
  }
  function bs(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var l = null,
        o = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var a = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          o === null ? (l = o = a) : (o = o.next = a), (n = n.next);
        } while (n !== null);
        o === null ? (l = o = t) : (o = o.next = t);
      } else l = o = t;
      (n = {
        baseState: r.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: o,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  function gl(e, t, n, r) {
    var l = e.updateQueue;
    qt = !1;
    var o = l.firstBaseUpdate,
      a = l.lastBaseUpdate,
      d = l.shared.pending;
    if (d !== null) {
      l.shared.pending = null;
      var h = d,
        S = h.next;
      (h.next = null), a === null ? (o = S) : (a.next = S), (a = h);
      var T = e.alternate;
      T !== null &&
        ((T = T.updateQueue),
        (d = T.lastBaseUpdate),
        d !== a &&
          (d === null ? (T.firstBaseUpdate = S) : (d.next = S),
          (T.lastBaseUpdate = h)));
    }
    if (o !== null) {
      var L = l.baseState;
      (a = 0), (T = S = h = null), (d = o);
      do {
        var x = d.lane,
          D = d.eventTime;
        if ((r & x) === x) {
          T !== null &&
            (T = T.next =
              {
                eventTime: D,
                lane: 0,
                tag: d.tag,
                payload: d.payload,
                callback: d.callback,
                next: null,
              });
          e: {
            var I = e,
              M = d;
            switch (((x = t), (D = n), M.tag)) {
              case 1:
                if (((I = M.payload), typeof I == "function")) {
                  L = I.call(D, L, x);
                  break e;
                }
                L = I;
                break e;
              case 3:
                I.flags = (I.flags & -65537) | 128;
              case 0:
                if (
                  ((I = M.payload),
                  (x = typeof I == "function" ? I.call(D, L, x) : I),
                  x == null)
                )
                  break e;
                L = m({}, L, x);
                break e;
              case 2:
                qt = !0;
            }
          }
          d.callback !== null &&
            d.lane !== 0 &&
            ((e.flags |= 64),
            (x = l.effects),
            x === null ? (l.effects = [d]) : x.push(d));
        } else
          (D = {
            eventTime: D,
            lane: x,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null,
          }),
            T === null ? ((S = T = D), (h = L)) : (T = T.next = D),
            (a |= x);
        if (((d = d.next), d === null)) {
          if (((d = l.shared.pending), d === null)) break;
          (x = d),
            (d = x.next),
            (x.next = null),
            (l.lastBaseUpdate = x),
            (l.shared.pending = null);
        }
      } while (!0);
      if (
        (T === null && (h = L),
        (l.baseState = h),
        (l.firstBaseUpdate = S),
        (l.lastBaseUpdate = T),
        (t = l.shared.interleaved),
        t !== null)
      ) {
        l = t;
        do (a |= l.lane), (l = l.next);
        while (l !== t);
      } else o === null && (l.shared.lanes = 0);
      (fn |= a), (e.lanes = a), (e.memoizedState = L);
    }
  }
  function ea(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          l = r.callback;
        if (l !== null) {
          if (((r.callback = null), (r = n), typeof l != "function"))
            throw Error(s(191, l));
          l.call(r);
        }
      }
  }
  var ta = new i.Component().refs;
  function di(e, t, n, r) {
    (t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : m({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var wl = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? nn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = Me(),
        l = Gt(e),
        o = Ft(r, l);
      (o.payload = t),
        n != null && (o.callback = n),
        (t = Kt(e, o, l)),
        t !== null && (yt(t, e, l, r), vl(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = Me(),
        l = Gt(e),
        o = Ft(r, l);
      (o.tag = 1),
        (o.payload = t),
        n != null && (o.callback = n),
        (t = Kt(e, o, l)),
        t !== null && (yt(t, e, l, r), vl(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Me(),
        r = Gt(e),
        l = Ft(n, r);
      (l.tag = 2),
        t != null && (l.callback = t),
        (t = Kt(e, l, r)),
        t !== null && (yt(t, e, r, n), vl(t, e, r));
    },
  };
  function na(e, t, n, r, l, o, a) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, o, a)
        : t.prototype && t.prototype.isPureReactComponent
          ? !fr(n, r) || !fr(l, o)
          : !0
    );
  }
  function ra(e, t, n) {
    var r = !1,
      l = Wt,
      o = t.contextType;
    return (
      typeof o == "object" && o !== null
        ? (o = lt(o))
        : ((l = We(t) ? ln : Fe.current),
          (r = t.contextTypes),
          (o = (r = r != null) ? Ln(e, l) : Wt)),
      (t = new t(n, o)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = wl),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = l),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      t
    );
  }
  function la(e, t, n, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && wl.enqueueReplaceState(t, t.state, null);
  }
  function pi(e, t, n, r) {
    var l = e.stateNode;
    (l.props = n), (l.state = e.memoizedState), (l.refs = ta), fi(e);
    var o = t.contextType;
    typeof o == "object" && o !== null
      ? (l.context = lt(o))
      : ((o = We(t) ? ln : Fe.current), (l.context = Ln(e, o))),
      (l.state = e.memoizedState),
      (o = t.getDerivedStateFromProps),
      typeof o == "function" && (di(e, t, o, n), (l.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function" ||
        (typeof l.UNSAFE_componentWillMount != "function" &&
          typeof l.componentWillMount != "function") ||
        ((t = l.state),
        typeof l.componentWillMount == "function" && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == "function" &&
          l.UNSAFE_componentWillMount(),
        t !== l.state && wl.enqueueReplaceState(l, l.state, null),
        gl(e, n, l, r),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function gr(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var l = r,
          o = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === o
          ? t.ref
          : ((t = function (a) {
              var d = l.refs;
              d === ta && (d = l.refs = {}),
                a === null ? delete d[o] : (d[o] = a);
            }),
            (t._stringRef = o),
            t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function Sl(e, t) {
    throw (
      ((e = Object.prototype.toString.call(t)),
      Error(
        s(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ))
    );
  }
  function oa(e) {
    var t = e._init;
    return t(e._payload);
  }
  function ia(e) {
    function t(g, v) {
      if (e) {
        var w = g.deletions;
        w === null ? ((g.deletions = [v]), (g.flags |= 16)) : w.push(v);
      }
    }
    function n(g, v) {
      if (!e) return null;
      for (; v !== null; ) t(g, v), (v = v.sibling);
      return null;
    }
    function r(g, v) {
      for (g = new Map(); v !== null; )
        v.key !== null ? g.set(v.key, v) : g.set(v.index, v), (v = v.sibling);
      return g;
    }
    function l(g, v) {
      return (g = bt(g, v)), (g.index = 0), (g.sibling = null), g;
    }
    function o(g, v, w) {
      return (
        (g.index = w),
        e
          ? ((w = g.alternate),
            w !== null
              ? ((w = w.index), w < v ? ((g.flags |= 2), v) : w)
              : ((g.flags |= 2), v))
          : ((g.flags |= 1048576), v)
      );
    }
    function a(g) {
      return e && g.alternate === null && (g.flags |= 2), g;
    }
    function d(g, v, w, z) {
      return v === null || v.tag !== 6
        ? ((v = Yi(w, g.mode, z)), (v.return = g), v)
        : ((v = l(v, w)), (v.return = g), v);
    }
    function h(g, v, w, z) {
      var B = w.type;
      return B === we
        ? T(g, v, w.props.children, z, w.key)
        : v !== null &&
            (v.elementType === B ||
              (typeof B == "object" &&
                B !== null &&
                B.$$typeof === He &&
                oa(B) === v.type))
          ? ((z = l(v, w.props)), (z.ref = gr(g, v, w)), (z.return = g), z)
          : ((z = Ml(w.type, w.key, w.props, null, g.mode, z)),
            (z.ref = gr(g, v, w)),
            (z.return = g),
            z);
    }
    function S(g, v, w, z) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== w.containerInfo ||
        v.stateNode.implementation !== w.implementation
        ? ((v = Gi(w, g.mode, z)), (v.return = g), v)
        : ((v = l(v, w.children || [])), (v.return = g), v);
    }
    function T(g, v, w, z, B) {
      return v === null || v.tag !== 7
        ? ((v = mn(w, g.mode, z, B)), (v.return = g), v)
        : ((v = l(v, w)), (v.return = g), v);
    }
    function L(g, v, w) {
      if ((typeof v == "string" && v !== "") || typeof v == "number")
        return (v = Yi("" + v, g.mode, w)), (v.return = g), v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case ae:
            return (
              (w = Ml(v.type, v.key, v.props, null, g.mode, w)),
              (w.ref = gr(g, null, v)),
              (w.return = g),
              w
            );
          case me:
            return (v = Gi(v, g.mode, w)), (v.return = g), v;
          case He:
            var z = v._init;
            return L(g, z(v._payload), w);
        }
        if (Kn(v) || Q(v))
          return (v = mn(v, g.mode, w, null)), (v.return = g), v;
        Sl(g, v);
      }
      return null;
    }
    function x(g, v, w, z) {
      var B = v !== null ? v.key : null;
      if ((typeof w == "string" && w !== "") || typeof w == "number")
        return B !== null ? null : d(g, v, "" + w, z);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ae:
            return w.key === B ? h(g, v, w, z) : null;
          case me:
            return w.key === B ? S(g, v, w, z) : null;
          case He:
            return (B = w._init), x(g, v, B(w._payload), z);
        }
        if (Kn(w) || Q(w)) return B !== null ? null : T(g, v, w, z, null);
        Sl(g, w);
      }
      return null;
    }
    function D(g, v, w, z, B) {
      if ((typeof z == "string" && z !== "") || typeof z == "number")
        return (g = g.get(w) || null), d(v, g, "" + z, B);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case ae:
            return (
              (g = g.get(z.key === null ? w : z.key) || null), h(v, g, z, B)
            );
          case me:
            return (
              (g = g.get(z.key === null ? w : z.key) || null), S(v, g, z, B)
            );
          case He:
            var V = z._init;
            return D(g, v, w, V(z._payload), B);
        }
        if (Kn(z) || Q(z)) return (g = g.get(w) || null), T(v, g, z, B, null);
        Sl(v, z);
      }
      return null;
    }
    function I(g, v, w, z) {
      for (
        var B = null, V = null, W = v, K = (v = 0), Ne = null;
        W !== null && K < w.length;
        K++
      ) {
        W.index > K ? ((Ne = W), (W = null)) : (Ne = W.sibling);
        var ne = x(g, W, w[K], z);
        if (ne === null) {
          W === null && (W = Ne);
          break;
        }
        e && W && ne.alternate === null && t(g, W),
          (v = o(ne, v, K)),
          V === null ? (B = ne) : (V.sibling = ne),
          (V = ne),
          (W = Ne);
      }
      if (K === w.length) return n(g, W), ye && un(g, K), B;
      if (W === null) {
        for (; K < w.length; K++)
          (W = L(g, w[K], z)),
            W !== null &&
              ((v = o(W, v, K)),
              V === null ? (B = W) : (V.sibling = W),
              (V = W));
        return ye && un(g, K), B;
      }
      for (W = r(g, W); K < w.length; K++)
        (Ne = D(W, g, K, w[K], z)),
          Ne !== null &&
            (e &&
              Ne.alternate !== null &&
              W.delete(Ne.key === null ? K : Ne.key),
            (v = o(Ne, v, K)),
            V === null ? (B = Ne) : (V.sibling = Ne),
            (V = Ne));
      return (
        e &&
          W.forEach(function (en) {
            return t(g, en);
          }),
        ye && un(g, K),
        B
      );
    }
    function M(g, v, w, z) {
      var B = Q(w);
      if (typeof B != "function") throw Error(s(150));
      if (((w = B.call(w)), w == null)) throw Error(s(151));
      for (
        var V = (B = null), W = v, K = (v = 0), Ne = null, ne = w.next();
        W !== null && !ne.done;
        K++, ne = w.next()
      ) {
        W.index > K ? ((Ne = W), (W = null)) : (Ne = W.sibling);
        var en = x(g, W, ne.value, z);
        if (en === null) {
          W === null && (W = Ne);
          break;
        }
        e && W && en.alternate === null && t(g, W),
          (v = o(en, v, K)),
          V === null ? (B = en) : (V.sibling = en),
          (V = en),
          (W = Ne);
      }
      if (ne.done) return n(g, W), ye && un(g, K), B;
      if (W === null) {
        for (; !ne.done; K++, ne = w.next())
          (ne = L(g, ne.value, z)),
            ne !== null &&
              ((v = o(ne, v, K)),
              V === null ? (B = ne) : (V.sibling = ne),
              (V = ne));
        return ye && un(g, K), B;
      }
      for (W = r(g, W); !ne.done; K++, ne = w.next())
        (ne = D(W, g, K, ne.value, z)),
          ne !== null &&
            (e &&
              ne.alternate !== null &&
              W.delete(ne.key === null ? K : ne.key),
            (v = o(ne, v, K)),
            V === null ? (B = ne) : (V.sibling = ne),
            (V = ne));
      return (
        e &&
          W.forEach(function (gp) {
            return t(g, gp);
          }),
        ye && un(g, K),
        B
      );
    }
    function xe(g, v, w, z) {
      if (
        (typeof w == "object" &&
          w !== null &&
          w.type === we &&
          w.key === null &&
          (w = w.props.children),
        typeof w == "object" && w !== null)
      ) {
        switch (w.$$typeof) {
          case ae:
            e: {
              for (var B = w.key, V = v; V !== null; ) {
                if (V.key === B) {
                  if (((B = w.type), B === we)) {
                    if (V.tag === 7) {
                      n(g, V.sibling),
                        (v = l(V, w.props.children)),
                        (v.return = g),
                        (g = v);
                      break e;
                    }
                  } else if (
                    V.elementType === B ||
                    (typeof B == "object" &&
                      B !== null &&
                      B.$$typeof === He &&
                      oa(B) === V.type)
                  ) {
                    n(g, V.sibling),
                      (v = l(V, w.props)),
                      (v.ref = gr(g, V, w)),
                      (v.return = g),
                      (g = v);
                    break e;
                  }
                  n(g, V);
                  break;
                } else t(g, V);
                V = V.sibling;
              }
              w.type === we
                ? ((v = mn(w.props.children, g.mode, z, w.key)),
                  (v.return = g),
                  (g = v))
                : ((z = Ml(w.type, w.key, w.props, null, g.mode, z)),
                  (z.ref = gr(g, v, w)),
                  (z.return = g),
                  (g = z));
            }
            return a(g);
          case me:
            e: {
              for (V = w.key; v !== null; ) {
                if (v.key === V)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === w.containerInfo &&
                    v.stateNode.implementation === w.implementation
                  ) {
                    n(g, v.sibling),
                      (v = l(v, w.children || [])),
                      (v.return = g),
                      (g = v);
                    break e;
                  } else {
                    n(g, v);
                    break;
                  }
                else t(g, v);
                v = v.sibling;
              }
              (v = Gi(w, g.mode, z)), (v.return = g), (g = v);
            }
            return a(g);
          case He:
            return (V = w._init), xe(g, v, V(w._payload), z);
        }
        if (Kn(w)) return I(g, v, w, z);
        if (Q(w)) return M(g, v, w, z);
        Sl(g, w);
      }
      return (typeof w == "string" && w !== "") || typeof w == "number"
        ? ((w = "" + w),
          v !== null && v.tag === 6
            ? (n(g, v.sibling), (v = l(v, w)), (v.return = g), (g = v))
            : (n(g, v), (v = Yi(w, g.mode, z)), (v.return = g), (g = v)),
          a(g))
        : n(g, v);
    }
    return xe;
  }
  var Un = ia(!0),
    ua = ia(!1),
    wr = {},
    kt = Vt(wr),
    Sr = Vt(wr),
    Er = Vt(wr);
  function an(e) {
    if (e === wr) throw Error(s(174));
    return e;
  }
  function hi(e, t) {
    switch ((fe(Er, t), fe(Sr, e), fe(kt, wr), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : po(null, "");
        break;
      default:
        (e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = po(t, e));
    }
    pe(kt), fe(kt, t);
  }
  function In() {
    pe(kt), pe(Sr), pe(Er);
  }
  function sa(e) {
    an(Er.current);
    var t = an(kt.current),
      n = po(t, e.type);
    t !== n && (fe(Sr, e), fe(kt, n));
  }
  function mi(e) {
    Sr.current === e && (pe(kt), pe(Sr));
  }
  var ve = Vt(0);
  function El(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var yi = [];
  function vi() {
    for (var e = 0; e < yi.length; e++)
      yi[e]._workInProgressVersionPrimary = null;
    yi.length = 0;
  }
  var kl = se.ReactCurrentDispatcher,
    gi = se.ReactCurrentBatchConfig,
    cn = 0,
    ge = null,
    _e = null,
    Te = null,
    xl = !1,
    kr = !1,
    xr = 0,
    Bd = 0;
  function je() {
    throw Error(s(321));
  }
  function wi(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!ft(e[n], t[n])) return !1;
    return !0;
  }
  function Si(e, t, n, r, l, o) {
    if (
      ((cn = o),
      (ge = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (kl.current = e === null || e.memoizedState === null ? Wd : Qd),
      (e = n(r, l)),
      kr)
    ) {
      o = 0;
      do {
        if (((kr = !1), (xr = 0), 25 <= o)) throw Error(s(301));
        (o += 1),
          (Te = _e = null),
          (t.updateQueue = null),
          (kl.current = qd),
          (e = n(r, l));
      } while (kr);
    }
    if (
      ((kl.current = Rl),
      (t = _e !== null && _e.next !== null),
      (cn = 0),
      (Te = _e = ge = null),
      (xl = !1),
      t)
    )
      throw Error(s(300));
    return e;
  }
  function Ei() {
    var e = xr !== 0;
    return (xr = 0), e;
  }
  function xt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Te === null ? (ge.memoizedState = Te = e) : (Te = Te.next = e), Te;
  }
  function ot() {
    if (_e === null) {
      var e = ge.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = _e.next;
    var t = Te === null ? ge.memoizedState : Te.next;
    if (t !== null) (Te = t), (_e = e);
    else {
      if (e === null) throw Error(s(310));
      (_e = e),
        (e = {
          memoizedState: _e.memoizedState,
          baseState: _e.baseState,
          baseQueue: _e.baseQueue,
          queue: _e.queue,
          next: null,
        }),
        Te === null ? (ge.memoizedState = Te = e) : (Te = Te.next = e);
    }
    return Te;
  }
  function Cr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ki(e) {
    var t = ot(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = _e,
      l = r.baseQueue,
      o = n.pending;
    if (o !== null) {
      if (l !== null) {
        var a = l.next;
        (l.next = o.next), (o.next = a);
      }
      (r.baseQueue = l = o), (n.pending = null);
    }
    if (l !== null) {
      (o = l.next), (r = r.baseState);
      var d = (a = null),
        h = null,
        S = o;
      do {
        var T = S.lane;
        if ((cn & T) === T)
          h !== null &&
            (h = h.next =
              {
                lane: 0,
                action: S.action,
                hasEagerState: S.hasEagerState,
                eagerState: S.eagerState,
                next: null,
              }),
            (r = S.hasEagerState ? S.eagerState : e(r, S.action));
        else {
          var L = {
            lane: T,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null,
          };
          h === null ? ((d = h = L), (a = r)) : (h = h.next = L),
            (ge.lanes |= T),
            (fn |= T);
        }
        S = S.next;
      } while (S !== null && S !== o);
      h === null ? (a = r) : (h.next = d),
        ft(r, t.memoizedState) || (Qe = !0),
        (t.memoizedState = r),
        (t.baseState = a),
        (t.baseQueue = h),
        (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
      l = e;
      do (o = l.lane), (ge.lanes |= o), (fn |= o), (l = l.next);
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function xi(e) {
    var t = ot(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      l = n.pending,
      o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var a = (l = l.next);
      do (o = e(o, a.action)), (a = a.next);
      while (a !== l);
      ft(o, t.memoizedState) || (Qe = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (n.lastRenderedState = o);
    }
    return [o, r];
  }
  function aa() {}
  function ca(e, t) {
    var n = ge,
      r = ot(),
      l = t(),
      o = !ft(r.memoizedState, l);
    if (
      (o && ((r.memoizedState = l), (Qe = !0)),
      (r = r.queue),
      Ci(pa.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || o || (Te !== null && Te.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        _r(9, da.bind(null, n, r, l, t), void 0, null),
        Pe === null)
      )
        throw Error(s(349));
      (cn & 30) !== 0 || fa(n, t, l);
    }
    return l;
  }
  function fa(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function da(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), ha(t) && ma(e);
  }
  function pa(e, t, n) {
    return n(function () {
      ha(t) && ma(e);
    });
  }
  function ha(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ft(e, n);
    } catch {
      return !0;
    }
  }
  function ma(e) {
    var t = zt(e, 1);
    t !== null && yt(t, e, 1, -1);
  }
  function ya(e) {
    var t = xt();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Cr,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Vd.bind(null, ge, e)),
      [t.memoizedState, e]
    );
  }
  function _r(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function va() {
    return ot().memoizedState;
  }
  function Cl(e, t, n, r) {
    var l = xt();
    (ge.flags |= e),
      (l.memoizedState = _r(1 | t, n, void 0, r === void 0 ? null : r));
  }
  function _l(e, t, n, r) {
    var l = ot();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (_e !== null) {
      var a = _e.memoizedState;
      if (((o = a.destroy), r !== null && wi(r, a.deps))) {
        l.memoizedState = _r(t, n, o, r);
        return;
      }
    }
    (ge.flags |= e), (l.memoizedState = _r(1 | t, n, o, r));
  }
  function ga(e, t) {
    return Cl(8390656, 8, e, t);
  }
  function Ci(e, t) {
    return _l(2048, 8, e, t);
  }
  function wa(e, t) {
    return _l(4, 2, e, t);
  }
  function Sa(e, t) {
    return _l(4, 4, e, t);
  }
  function Ea(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function ka(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null), _l(4, 4, Ea.bind(null, t, e), n)
    );
  }
  function _i() {}
  function xa(e, t) {
    var n = ot();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wi(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function Ca(e, t) {
    var n = ot();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wi(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function _a(e, t, n) {
    return (cn & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (Qe = !0)), (e.memoizedState = n))
      : (ft(n, t) ||
          ((n = Gu()), (ge.lanes |= n), (fn |= n), (e.baseState = !0)),
        t);
  }
  function Hd(e, t) {
    var n = ie;
    (ie = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = gi.transition;
    gi.transition = {};
    try {
      e(!1), t();
    } finally {
      (ie = n), (gi.transition = r);
    }
  }
  function Ra() {
    return ot().memoizedState;
  }
  function $d(e, t, n) {
    var r = Gt(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ta(e))
    )
      Pa(t, n);
    else if (((n = Gs(e, t, n, r)), n !== null)) {
      var l = Me();
      yt(n, e, r, l), Na(n, t, r);
    }
  }
  function Vd(e, t, n) {
    var r = Gt(e),
      l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Ta(e)) Pa(t, l);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var a = t.lastRenderedState,
            d = o(a, n);
          if (((l.hasEagerState = !0), (l.eagerState = d), ft(d, a))) {
            var h = t.interleaved;
            h === null
              ? ((l.next = l), ci(t))
              : ((l.next = h.next), (h.next = l)),
              (t.interleaved = l);
            return;
          }
        } catch {
        } finally {
        }
      (n = Gs(e, t, l, r)),
        n !== null && ((l = Me()), yt(n, e, r, l), Na(n, t, r));
    }
  }
  function Ta(e) {
    var t = e.alternate;
    return e === ge || (t !== null && t === ge);
  }
  function Pa(e, t) {
    kr = xl = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function Na(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), _o(e, n);
    }
  }
  var Rl = {
      readContext: lt,
      useCallback: je,
      useContext: je,
      useEffect: je,
      useImperativeHandle: je,
      useInsertionEffect: je,
      useLayoutEffect: je,
      useMemo: je,
      useReducer: je,
      useRef: je,
      useState: je,
      useDebugValue: je,
      useDeferredValue: je,
      useTransition: je,
      useMutableSource: je,
      useSyncExternalStore: je,
      useId: je,
      unstable_isNewReconciler: !1,
    },
    Wd = {
      readContext: lt,
      useCallback: function (e, t) {
        return (xt().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: lt,
      useEffect: ga,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          Cl(4194308, 4, Ea.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Cl(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Cl(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = xt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = xt();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = $d.bind(null, ge, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = xt();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: ya,
      useDebugValue: _i,
      useDeferredValue: function (e) {
        return (xt().memoizedState = e);
      },
      useTransition: function () {
        var e = ya(!1),
          t = e[0];
        return (e = Hd.bind(null, e[1])), (xt().memoizedState = e), [t, e];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = ge,
          l = xt();
        if (ye) {
          if (n === void 0) throw Error(s(407));
          n = n();
        } else {
          if (((n = t()), Pe === null)) throw Error(s(349));
          (cn & 30) !== 0 || fa(r, t, n);
        }
        l.memoizedState = n;
        var o = { value: n, getSnapshot: t };
        return (
          (l.queue = o),
          ga(pa.bind(null, r, o, e), [e]),
          (r.flags |= 2048),
          _r(9, da.bind(null, r, o, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = xt(),
          t = Pe.identifierPrefix;
        if (ye) {
          var n = Lt,
            r = Ot;
          (n = (r & ~(1 << (32 - ct(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = xr++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":");
        } else (n = Bd++), (t = ":" + t + "r" + n.toString(32) + ":");
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Qd = {
      readContext: lt,
      useCallback: xa,
      useContext: lt,
      useEffect: Ci,
      useImperativeHandle: ka,
      useInsertionEffect: wa,
      useLayoutEffect: Sa,
      useMemo: Ca,
      useReducer: ki,
      useRef: va,
      useState: function () {
        return ki(Cr);
      },
      useDebugValue: _i,
      useDeferredValue: function (e) {
        var t = ot();
        return _a(t, _e.memoizedState, e);
      },
      useTransition: function () {
        var e = ki(Cr)[0],
          t = ot().memoizedState;
        return [e, t];
      },
      useMutableSource: aa,
      useSyncExternalStore: ca,
      useId: Ra,
      unstable_isNewReconciler: !1,
    },
    qd = {
      readContext: lt,
      useCallback: xa,
      useContext: lt,
      useEffect: Ci,
      useImperativeHandle: ka,
      useInsertionEffect: wa,
      useLayoutEffect: Sa,
      useMemo: Ca,
      useReducer: xi,
      useRef: va,
      useState: function () {
        return xi(Cr);
      },
      useDebugValue: _i,
      useDeferredValue: function (e) {
        var t = ot();
        return _e === null ? (t.memoizedState = e) : _a(t, _e.memoizedState, e);
      },
      useTransition: function () {
        var e = xi(Cr)[0],
          t = ot().memoizedState;
        return [e, t];
      },
      useMutableSource: aa,
      useSyncExternalStore: ca,
      useId: Ra,
      unstable_isNewReconciler: !1,
    };
  function Mn(e, t) {
    try {
      var n = "",
        r = t;
      do (n += ce(r)), (r = r.return);
      while (r);
      var l = n;
    } catch (o) {
      l =
        `
Error generating stack: ` +
        o.message +
        `
` +
        o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function Ri(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Ti(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var Kd = typeof WeakMap == "function" ? WeakMap : Map;
  function Oa(e, t, n) {
    (n = Ft(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        Fl || ((Fl = !0), ($i = r)), Ti(e, t);
      }),
      n
    );
  }
  function La(e, t, n) {
    (n = Ft(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      (n.payload = function () {
        return r(l);
      }),
        (n.callback = function () {
          Ti(e, t);
        });
    }
    var o = e.stateNode;
    return (
      o !== null &&
        typeof o.componentDidCatch == "function" &&
        (n.callback = function () {
          Ti(e, t),
            typeof r != "function" &&
              (Xt === null ? (Xt = new Set([this])) : Xt.add(this));
          var a = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: a !== null ? a : "",
          });
        }),
      n
    );
  }
  function za(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Kd();
      var l = new Set();
      r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(n) || (l.add(n), (e = up.bind(null, e, t, n)), t.then(e, e));
  }
  function Fa(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function ja(e, t, n, r, l) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = Ft(-1, 1)), (t.tag = 2), Kt(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = l), e);
  }
  var Jd = se.ReactCurrentOwner,
    Qe = !1;
  function Ie(e, t, n, r) {
    t.child = e === null ? ua(t, null, n, r) : Un(t, e.child, n, r);
  }
  function Da(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return (
      An(t, l),
      (r = Si(e, t, n, r, o, l)),
      (n = Ei()),
      e !== null && !Qe
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          jt(e, t, l))
        : (ye && n && ti(t), (t.flags |= 1), Ie(e, t, r, l), t.child)
    );
  }
  function Aa(e, t, n, r, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" &&
        !Xi(o) &&
        o.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = o), Ua(e, t, o, r, l))
        : ((e = Ml(n.type, null, r, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((o = e.child), (e.lanes & l) === 0)) {
      var a = o.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : fr), n(a, r) && e.ref === t.ref)
      )
        return jt(e, t, l);
    }
    return (
      (t.flags |= 1),
      (e = bt(o, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Ua(e, t, n, r, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (fr(o, r) && e.ref === t.ref)
        if (((Qe = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
          (e.flags & 131072) !== 0 && (Qe = !0);
        else return (t.lanes = e.lanes), jt(e, t, l);
    }
    return Pi(e, t, n, r, l);
  }
  function Ia(e, t, n) {
    var r = t.pendingProps,
      l = r.children,
      o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if ((t.mode & 1) === 0)
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          fe(Hn, tt),
          (tt |= n);
      else {
        if ((n & 1073741824) === 0)
          return (
            (e = o !== null ? o.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            fe(Hn, tt),
            (tt |= e),
            null
          );
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = o !== null ? o.baseLanes : n),
          fe(Hn, tt),
          (tt |= r);
      }
    else
      o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
        fe(Hn, tt),
        (tt |= r);
    return Ie(e, t, l, n), t.child;
  }
  function Ma(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Pi(e, t, n, r, l) {
    var o = We(n) ? ln : Fe.current;
    return (
      (o = Ln(t, o)),
      An(t, l),
      (n = Si(e, t, n, r, o, l)),
      (r = Ei()),
      e !== null && !Qe
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          jt(e, t, l))
        : (ye && r && ti(t), (t.flags |= 1), Ie(e, t, n, l), t.child)
    );
  }
  function Ba(e, t, n, r, l) {
    if (We(n)) {
      var o = !0;
      cl(t);
    } else o = !1;
    if ((An(t, l), t.stateNode === null))
      Pl(e, t), ra(t, n, r), pi(t, n, r, l), (r = !0);
    else if (e === null) {
      var a = t.stateNode,
        d = t.memoizedProps;
      a.props = d;
      var h = a.context,
        S = n.contextType;
      typeof S == "object" && S !== null
        ? (S = lt(S))
        : ((S = We(n) ? ln : Fe.current), (S = Ln(t, S)));
      var T = n.getDerivedStateFromProps,
        L =
          typeof T == "function" ||
          typeof a.getSnapshotBeforeUpdate == "function";
      L ||
        (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
          typeof a.componentWillReceiveProps != "function") ||
        ((d !== r || h !== S) && la(t, a, r, S)),
        (qt = !1);
      var x = t.memoizedState;
      (a.state = x),
        gl(t, r, a, l),
        (h = t.memoizedState),
        d !== r || x !== h || Ve.current || qt
          ? (typeof T == "function" && (di(t, n, T, r), (h = t.memoizedState)),
            (d = qt || na(t, n, d, r, x, h, S))
              ? (L ||
                  (typeof a.UNSAFE_componentWillMount != "function" &&
                    typeof a.componentWillMount != "function") ||
                  (typeof a.componentWillMount == "function" &&
                    a.componentWillMount(),
                  typeof a.UNSAFE_componentWillMount == "function" &&
                    a.UNSAFE_componentWillMount()),
                typeof a.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof a.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = h)),
            (a.props = r),
            (a.state = h),
            (a.context = S),
            (r = d))
          : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1));
    } else {
      (a = t.stateNode),
        Zs(e, t),
        (d = t.memoizedProps),
        (S = t.type === t.elementType ? d : pt(t.type, d)),
        (a.props = S),
        (L = t.pendingProps),
        (x = a.context),
        (h = n.contextType),
        typeof h == "object" && h !== null
          ? (h = lt(h))
          : ((h = We(n) ? ln : Fe.current), (h = Ln(t, h)));
      var D = n.getDerivedStateFromProps;
      (T =
        typeof D == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function") ||
        (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
          typeof a.componentWillReceiveProps != "function") ||
        ((d !== L || x !== h) && la(t, a, r, h)),
        (qt = !1),
        (x = t.memoizedState),
        (a.state = x),
        gl(t, r, a, l);
      var I = t.memoizedState;
      d !== L || x !== I || Ve.current || qt
        ? (typeof D == "function" && (di(t, n, D, r), (I = t.memoizedState)),
          (S = qt || na(t, n, S, r, x, I, h) || !1)
            ? (T ||
                (typeof a.UNSAFE_componentWillUpdate != "function" &&
                  typeof a.componentWillUpdate != "function") ||
                (typeof a.componentWillUpdate == "function" &&
                  a.componentWillUpdate(r, I, h),
                typeof a.UNSAFE_componentWillUpdate == "function" &&
                  a.UNSAFE_componentWillUpdate(r, I, h)),
              typeof a.componentDidUpdate == "function" && (t.flags |= 4),
              typeof a.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof a.componentDidUpdate != "function" ||
                (d === e.memoizedProps && x === e.memoizedState) ||
                (t.flags |= 4),
              typeof a.getSnapshotBeforeUpdate != "function" ||
                (d === e.memoizedProps && x === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = I)),
          (a.props = r),
          (a.state = I),
          (a.context = h),
          (r = S))
        : (typeof a.componentDidUpdate != "function" ||
            (d === e.memoizedProps && x === e.memoizedState) ||
            (t.flags |= 4),
          typeof a.getSnapshotBeforeUpdate != "function" ||
            (d === e.memoizedProps && x === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return Ni(e, t, n, r, o, l);
  }
  function Ni(e, t, n, r, l, o) {
    Ma(e, t);
    var a = (t.flags & 128) !== 0;
    if (!r && !a) return l && Ws(t, n, !1), jt(e, t, o);
    (r = t.stateNode), (Jd.current = t);
    var d =
      a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && a
        ? ((t.child = Un(t, e.child, null, o)), (t.child = Un(t, null, d, o)))
        : Ie(e, t, d, o),
      (t.memoizedState = r.state),
      l && Ws(t, n, !0),
      t.child
    );
  }
  function Ha(e) {
    var t = e.stateNode;
    t.pendingContext
      ? $s(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && $s(e, t.context, !1),
      hi(e, t.containerInfo);
  }
  function $a(e, t, n, r, l) {
    return jn(), oi(l), (t.flags |= 256), Ie(e, t, n, r), t.child;
  }
  var Oi = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Li(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Va(e, t, n) {
    var r = t.pendingProps,
      l = ve.current,
      o = !1,
      a = (t.flags & 128) !== 0,
      d;
    if (
      ((d = a) ||
        (d = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      d
        ? ((o = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (l |= 1),
      fe(ve, l & 1),
      e === null)
    )
      return (
        li(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((a = r.children),
            (e = r.fallback),
            o
              ? ((r = t.mode),
                (o = t.child),
                (a = { mode: "hidden", children: a }),
                (r & 1) === 0 && o !== null
                  ? ((o.childLanes = 0), (o.pendingProps = a))
                  : (o = Bl(a, r, 0, null)),
                (e = mn(e, r, n, null)),
                (o.return = t),
                (e.return = t),
                (o.sibling = e),
                (t.child = o),
                (t.child.memoizedState = Li(n)),
                (t.memoizedState = Oi),
                e)
              : zi(t, a))
      );
    if (((l = e.memoizedState), l !== null && ((d = l.dehydrated), d !== null)))
      return Xd(e, t, a, r, d, l, n);
    if (o) {
      (o = r.fallback), (a = t.mode), (l = e.child), (d = l.sibling);
      var h = { mode: "hidden", children: r.children };
      return (
        (a & 1) === 0 && t.child !== l
          ? ((r = t.child),
            (r.childLanes = 0),
            (r.pendingProps = h),
            (t.deletions = null))
          : ((r = bt(l, h)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
        d !== null ? (o = bt(d, o)) : ((o = mn(o, a, n, null)), (o.flags |= 2)),
        (o.return = t),
        (r.return = t),
        (r.sibling = o),
        (t.child = r),
        (r = o),
        (o = t.child),
        (a = e.child.memoizedState),
        (a =
          a === null
            ? Li(n)
            : {
                baseLanes: a.baseLanes | n,
                cachePool: null,
                transitions: a.transitions,
              }),
        (o.memoizedState = a),
        (o.childLanes = e.childLanes & ~n),
        (t.memoizedState = Oi),
        r
      );
    }
    return (
      (o = e.child),
      (e = o.sibling),
      (r = bt(o, { mode: "visible", children: r.children })),
      (t.mode & 1) === 0 && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function zi(e, t) {
    return (
      (t = Bl({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Tl(e, t, n, r) {
    return (
      r !== null && oi(r),
      Un(t, e.child, null, n),
      (e = zi(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Xd(e, t, n, r, l, o, a) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = Ri(Error(s(422)))), Tl(e, t, a, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((o = r.fallback),
            (l = t.mode),
            (r = Bl({ mode: "visible", children: r.children }, l, 0, null)),
            (o = mn(o, l, a, null)),
            (o.flags |= 2),
            (r.return = t),
            (o.return = t),
            (r.sibling = o),
            (t.child = r),
            (t.mode & 1) !== 0 && Un(t, e.child, null, a),
            (t.child.memoizedState = Li(a)),
            (t.memoizedState = Oi),
            o);
    if ((t.mode & 1) === 0) return Tl(e, t, a, null);
    if (l.data === "$!") {
      if (((r = l.nextSibling && l.nextSibling.dataset), r)) var d = r.dgst;
      return (
        (r = d), (o = Error(s(419))), (r = Ri(o, r, void 0)), Tl(e, t, a, r)
      );
    }
    if (((d = (a & e.childLanes) !== 0), Qe || d)) {
      if (((r = Pe), r !== null)) {
        switch (a & -a) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        (l = (l & (r.suspendedLanes | a)) !== 0 ? 0 : l),
          l !== 0 &&
            l !== o.retryLane &&
            ((o.retryLane = l), zt(e, l), yt(r, e, l, -1));
      }
      return Ji(), (r = Ri(Error(s(421)))), Tl(e, t, a, r);
    }
    return l.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = sp.bind(null, e)),
        (l._reactRetry = t),
        null)
      : ((e = o.treeContext),
        (et = $t(l.nextSibling)),
        (be = t),
        (ye = !0),
        (dt = null),
        e !== null &&
          ((nt[rt++] = Ot),
          (nt[rt++] = Lt),
          (nt[rt++] = on),
          (Ot = e.id),
          (Lt = e.overflow),
          (on = t)),
        (t = zi(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function Wa(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), ai(e.return, t, n);
  }
  function Fi(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: l,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = r),
        (o.tail = n),
        (o.tailMode = l));
  }
  function Qa(e, t, n) {
    var r = t.pendingProps,
      l = r.revealOrder,
      o = r.tail;
    if ((Ie(e, t, r.children, n), (r = ve.current), (r & 2) !== 0))
      (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Wa(e, n, t);
          else if (e.tag === 19) Wa(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    if ((fe(ve, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (l) {
        case "forwards":
          for (n = t.child, l = null; n !== null; )
            (e = n.alternate),
              e !== null && El(e) === null && (l = n),
              (n = n.sibling);
          (n = l),
            n === null
              ? ((l = t.child), (t.child = null))
              : ((l = n.sibling), (n.sibling = null)),
            Fi(t, !1, l, n, o);
          break;
        case "backwards":
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && El(e) === null)) {
              t.child = l;
              break;
            }
            (e = l.sibling), (l.sibling = n), (n = l), (l = e);
          }
          Fi(t, !0, n, null, o);
          break;
        case "together":
          Fi(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Pl(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function jt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (fn |= t.lanes),
      (n & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, n = bt(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = bt(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function Yd(e, t, n) {
    switch (t.tag) {
      case 3:
        Ha(t), jn();
        break;
      case 5:
        sa(t);
        break;
      case 1:
        We(t.type) && cl(t);
        break;
      case 4:
        hi(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          l = t.memoizedProps.value;
        fe(ml, r._currentValue), (r._currentValue = l);
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (fe(ve, ve.current & 1), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? Va(e, t, n)
              : (fe(ve, ve.current & 1),
                (e = jt(e, t, n)),
                e !== null ? e.sibling : null);
        fe(ve, ve.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (r) return Qa(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          fe(ve, ve.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Ia(e, t, n);
    }
    return jt(e, t, n);
  }
  var qa, ji, Ka, Ja;
  (qa = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
  }),
    (ji = function () {}),
    (Ka = function (e, t, n, r) {
      var l = e.memoizedProps;
      if (l !== r) {
        (e = t.stateNode), an(kt.current);
        var o = null;
        switch (n) {
          case "input":
            (l = so(e, l)), (r = so(e, r)), (o = []);
            break;
          case "select":
            (l = m({}, l, { value: void 0 })),
              (r = m({}, r, { value: void 0 })),
              (o = []);
            break;
          case "textarea":
            (l = fo(e, l)), (r = fo(e, r)), (o = []);
            break;
          default:
            typeof l.onClick != "function" &&
              typeof r.onClick == "function" &&
              (e.onclick = ul);
        }
        ho(n, r);
        var a;
        n = null;
        for (S in l)
          if (!r.hasOwnProperty(S) && l.hasOwnProperty(S) && l[S] != null)
            if (S === "style") {
              var d = l[S];
              for (a in d) d.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
            } else
              S !== "dangerouslySetInnerHTML" &&
                S !== "children" &&
                S !== "suppressContentEditableWarning" &&
                S !== "suppressHydrationWarning" &&
                S !== "autoFocus" &&
                (f.hasOwnProperty(S)
                  ? o || (o = [])
                  : (o = o || []).push(S, null));
        for (S in r) {
          var h = r[S];
          if (
            ((d = l != null ? l[S] : void 0),
            r.hasOwnProperty(S) && h !== d && (h != null || d != null))
          )
            if (S === "style")
              if (d) {
                for (a in d)
                  !d.hasOwnProperty(a) ||
                    (h && h.hasOwnProperty(a)) ||
                    (n || (n = {}), (n[a] = ""));
                for (a in h)
                  h.hasOwnProperty(a) &&
                    d[a] !== h[a] &&
                    (n || (n = {}), (n[a] = h[a]));
              } else n || (o || (o = []), o.push(S, n)), (n = h);
            else
              S === "dangerouslySetInnerHTML"
                ? ((h = h ? h.__html : void 0),
                  (d = d ? d.__html : void 0),
                  h != null && d !== h && (o = o || []).push(S, h))
                : S === "children"
                  ? (typeof h != "string" && typeof h != "number") ||
                    (o = o || []).push(S, "" + h)
                  : S !== "suppressContentEditableWarning" &&
                    S !== "suppressHydrationWarning" &&
                    (f.hasOwnProperty(S)
                      ? (h != null && S === "onScroll" && de("scroll", e),
                        o || d === h || (o = []))
                      : (o = o || []).push(S, h));
        }
        n && (o = o || []).push("style", n);
        var S = o;
        (t.updateQueue = S) && (t.flags |= 4);
      }
    }),
    (Ja = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    });
  function Rr(e, t) {
    if (!ye)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), (n = n.sibling);
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function De(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags & 14680064),
          (r |= l.flags & 14680064),
          (l.return = e),
          (l = l.sibling);
    else
      for (l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags),
          (r |= l.flags),
          (l.return = e),
          (l = l.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
  }
  function Gd(e, t, n) {
    var r = t.pendingProps;
    switch ((ni(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return De(t), null;
      case 1:
        return We(t.type) && al(), De(t), null;
      case 3:
        return (
          (r = t.stateNode),
          In(),
          pe(Ve),
          pe(Fe),
          vi(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (hl(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), dt !== null && (Qi(dt), (dt = null)))),
          ji(e, t),
          De(t),
          null
        );
      case 5:
        mi(t);
        var l = an(Er.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          Ka(e, t, n, r, l),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return De(t), null;
          }
          if (((e = an(kt.current)), hl(t))) {
            (r = t.stateNode), (n = t.type);
            var o = t.memoizedProps;
            switch (((r[Et] = t), (r[yr] = o), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                de("cancel", r), de("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                de("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < pr.length; l++) de(pr[l], r);
                break;
              case "source":
                de("error", r);
                break;
              case "img":
              case "image":
              case "link":
                de("error", r), de("load", r);
                break;
              case "details":
                de("toggle", r);
                break;
              case "input":
                Tu(r, o), de("invalid", r);
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!o.multiple }),
                  de("invalid", r);
                break;
              case "textarea":
                Ou(r, o), de("invalid", r);
            }
            ho(n, o), (l = null);
            for (var a in o)
              if (o.hasOwnProperty(a)) {
                var d = o[a];
                a === "children"
                  ? typeof d == "string"
                    ? r.textContent !== d &&
                      (o.suppressHydrationWarning !== !0 &&
                        il(r.textContent, d, e),
                      (l = ["children", d]))
                    : typeof d == "number" &&
                      r.textContent !== "" + d &&
                      (o.suppressHydrationWarning !== !0 &&
                        il(r.textContent, d, e),
                      (l = ["children", "" + d]))
                  : f.hasOwnProperty(a) &&
                    d != null &&
                    a === "onScroll" &&
                    de("scroll", r);
              }
            switch (n) {
              case "input":
                Ur(r), Nu(r, o, !0);
                break;
              case "textarea":
                Ur(r), zu(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = ul);
            }
            (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
          } else {
            (a = l.nodeType === 9 ? l : l.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Fu(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = a.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == "string"
                    ? (e = a.createElement(n, { is: r.is }))
                    : ((e = a.createElement(n)),
                      n === "select" &&
                        ((a = e),
                        r.multiple
                          ? (a.multiple = !0)
                          : r.size && (a.size = r.size)))
                : (e = a.createElementNS(e, n)),
              (e[Et] = t),
              (e[yr] = r),
              qa(e, t, !1, !1),
              (t.stateNode = e);
            e: {
              switch (((a = mo(n, r)), n)) {
                case "dialog":
                  de("cancel", e), de("close", e), (l = r);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  de("load", e), (l = r);
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < pr.length; l++) de(pr[l], e);
                  l = r;
                  break;
                case "source":
                  de("error", e), (l = r);
                  break;
                case "img":
                case "image":
                case "link":
                  de("error", e), de("load", e), (l = r);
                  break;
                case "details":
                  de("toggle", e), (l = r);
                  break;
                case "input":
                  Tu(e, r), (l = so(e, r)), de("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!r.multiple }),
                    (l = m({}, r, { value: void 0 })),
                    de("invalid", e);
                  break;
                case "textarea":
                  Ou(e, r), (l = fo(e, r)), de("invalid", e);
                  break;
                default:
                  l = r;
              }
              ho(n, l), (d = l);
              for (o in d)
                if (d.hasOwnProperty(o)) {
                  var h = d[o];
                  o === "style"
                    ? Au(e, h)
                    : o === "dangerouslySetInnerHTML"
                      ? ((h = h ? h.__html : void 0), h != null && ju(e, h))
                      : o === "children"
                        ? typeof h == "string"
                          ? (n !== "textarea" || h !== "") && Jn(e, h)
                          : typeof h == "number" && Jn(e, "" + h)
                        : o !== "suppressContentEditableWarning" &&
                          o !== "suppressHydrationWarning" &&
                          o !== "autoFocus" &&
                          (f.hasOwnProperty(o)
                            ? h != null && o === "onScroll" && de("scroll", e)
                            : h != null && le(e, o, h, a));
                }
              switch (n) {
                case "input":
                  Ur(e), Nu(e, r, !1);
                  break;
                case "textarea":
                  Ur(e), zu(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + oe(r.value));
                  break;
                case "select":
                  (e.multiple = !!r.multiple),
                    (o = r.value),
                    o != null
                      ? wn(e, !!r.multiple, o, !1)
                      : r.defaultValue != null &&
                        wn(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = ul);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return De(t), null;
      case 6:
        if (e && t.stateNode != null) Ja(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (((n = an(Er.current)), an(kt.current), hl(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[Et] = t),
              (o = r.nodeValue !== n) && ((e = be), e !== null))
            )
              switch (e.tag) {
                case 3:
                  il(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    il(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            o && (t.flags |= 4);
          } else
            (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[Et] = t),
              (t.stateNode = r);
        }
        return De(t), null;
      case 13:
        if (
          (pe(ve),
          (r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (ye && et !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            Ys(), jn(), (t.flags |= 98560), (o = !1);
          else if (((o = hl(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (
                ((o = t.memoizedState),
                (o = o !== null ? o.dehydrated : null),
                !o)
              )
                throw Error(s(317));
              o[Et] = t;
            } else
              jn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            De(t), (o = !1);
          } else dt !== null && (Qi(dt), (dt = null)), (o = !0);
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (ve.current & 1) !== 0
                  ? Re === 0 && (Re = 3)
                  : Ji())),
            t.updateQueue !== null && (t.flags |= 4),
            De(t),
            null);
      case 4:
        return (
          In(),
          ji(e, t),
          e === null && hr(t.stateNode.containerInfo),
          De(t),
          null
        );
      case 10:
        return si(t.type._context), De(t), null;
      case 17:
        return We(t.type) && al(), De(t), null;
      case 19:
        if ((pe(ve), (o = t.memoizedState), o === null)) return De(t), null;
        if (((r = (t.flags & 128) !== 0), (a = o.rendering), a === null))
          if (r) Rr(o, !1);
          else {
            if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((a = El(e)), a !== null)) {
                  for (
                    t.flags |= 128,
                      Rr(o, !1),
                      r = a.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;

                  )
                    (o = n),
                      (e = r),
                      (o.flags &= 14680066),
                      (a = o.alternate),
                      a === null
                        ? ((o.childLanes = 0),
                          (o.lanes = e),
                          (o.child = null),
                          (o.subtreeFlags = 0),
                          (o.memoizedProps = null),
                          (o.memoizedState = null),
                          (o.updateQueue = null),
                          (o.dependencies = null),
                          (o.stateNode = null))
                        : ((o.childLanes = a.childLanes),
                          (o.lanes = a.lanes),
                          (o.child = a.child),
                          (o.subtreeFlags = 0),
                          (o.deletions = null),
                          (o.memoizedProps = a.memoizedProps),
                          (o.memoizedState = a.memoizedState),
                          (o.updateQueue = a.updateQueue),
                          (o.type = a.type),
                          (e = a.dependencies),
                          (o.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling);
                  return fe(ve, (ve.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            o.tail !== null &&
              ke() > $n &&
              ((t.flags |= 128), (r = !0), Rr(o, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = El(a)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                Rr(o, !0),
                o.tail === null &&
                  o.tailMode === "hidden" &&
                  !a.alternate &&
                  !ye)
              )
                return De(t), null;
            } else
              2 * ke() - o.renderingStartTime > $n &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), Rr(o, !1), (t.lanes = 4194304));
          o.isBackwards
            ? ((a.sibling = t.child), (t.child = a))
            : ((n = o.last),
              n !== null ? (n.sibling = a) : (t.child = a),
              (o.last = a));
        }
        return o.tail !== null
          ? ((t = o.tail),
            (o.rendering = t),
            (o.tail = t.sibling),
            (o.renderingStartTime = ke()),
            (t.sibling = null),
            (n = ve.current),
            fe(ve, r ? (n & 1) | 2 : n & 1),
            t)
          : (De(t), null);
      case 22:
      case 23:
        return (
          Ki(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && (t.mode & 1) !== 0
            ? (tt & 1073741824) !== 0 &&
              (De(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : De(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Zd(e, t) {
    switch ((ni(t), t.tag)) {
      case 1:
        return (
          We(t.type) && al(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          In(),
          pe(Ve),
          pe(Fe),
          vi(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return mi(t), null;
      case 13:
        if (
          (pe(ve), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340));
          jn();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return pe(ve), null;
      case 4:
        return In(), null;
      case 10:
        return si(t.type._context), null;
      case 22:
      case 23:
        return Ki(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Nl = !1,
    Ae = !1,
    bd = typeof WeakSet == "function" ? WeakSet : Set,
    U = null;
  function Bn(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          Ee(e, t, r);
        }
      else n.current = null;
  }
  function Di(e, t, n) {
    try {
      n();
    } catch (r) {
      Ee(e, t, r);
    }
  }
  var Xa = !1;
  function ep(e, t) {
    if (((Ko = Xr), (e = Rs()), Mo(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var l = r.anchorOffset,
              o = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType, o.nodeType;
            } catch {
              n = null;
              break e;
            }
            var a = 0,
              d = -1,
              h = -1,
              S = 0,
              T = 0,
              L = e,
              x = null;
            t: for (;;) {
              for (
                var D;
                L !== n || (l !== 0 && L.nodeType !== 3) || (d = a + l),
                  L !== o || (r !== 0 && L.nodeType !== 3) || (h = a + r),
                  L.nodeType === 3 && (a += L.nodeValue.length),
                  (D = L.firstChild) !== null;

              )
                (x = L), (L = D);
              for (;;) {
                if (L === e) break t;
                if (
                  (x === n && ++S === l && (d = a),
                  x === o && ++T === r && (h = a),
                  (D = L.nextSibling) !== null)
                )
                  break;
                (L = x), (x = L.parentNode);
              }
              L = D;
            }
            n = d === -1 || h === -1 ? null : { start: d, end: h };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Jo = { focusedElem: e, selectionRange: n }, Xr = !1, U = t;
      U !== null;

    )
      if (((t = U), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        (e.return = t), (U = e);
      else
        for (; U !== null; ) {
          t = U;
          try {
            var I = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (I !== null) {
                    var M = I.memoizedProps,
                      xe = I.memoizedState,
                      g = t.stateNode,
                      v = g.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? M : pt(t.type, M),
                        xe,
                      );
                    g.__reactInternalSnapshotBeforeUpdate = v;
                  }
                  break;
                case 3:
                  var w = t.stateNode.containerInfo;
                  w.nodeType === 1
                    ? (w.textContent = "")
                    : w.nodeType === 9 &&
                      w.documentElement &&
                      w.removeChild(w.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(s(163));
              }
          } catch (z) {
            Ee(t, t.return, z);
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (U = e);
            break;
          }
          U = t.return;
        }
    return (I = Xa), (Xa = !1), I;
  }
  function Tr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var l = (r = r.next);
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          (l.destroy = void 0), o !== void 0 && Di(t, n, o);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Ol(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Ai(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function Ya(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Ya(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[Et],
          delete t[yr],
          delete t[Zo],
          delete t[Ad],
          delete t[Ud])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  function Ga(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Za(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ga(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ui(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = ul));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (Ui(e, t, n), e = e.sibling; e !== null; )
        Ui(e, t, n), (e = e.sibling);
  }
  function Ii(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
      for (Ii(e, t, n), e = e.sibling; e !== null; )
        Ii(e, t, n), (e = e.sibling);
  }
  var Le = null,
    ht = !1;
  function Jt(e, t, n) {
    for (n = n.child; n !== null; ) ba(e, t, n), (n = n.sibling);
  }
  function ba(e, t, n) {
    if (St && typeof St.onCommitFiberUnmount == "function")
      try {
        St.onCommitFiberUnmount(Vr, n);
      } catch {}
    switch (n.tag) {
      case 5:
        Ae || Bn(n, t);
      case 6:
        var r = Le,
          l = ht;
        (Le = null),
          Jt(e, t, n),
          (Le = r),
          (ht = l),
          Le !== null &&
            (ht
              ? ((e = Le),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : Le.removeChild(n.stateNode));
        break;
      case 18:
        Le !== null &&
          (ht
            ? ((e = Le),
              (n = n.stateNode),
              e.nodeType === 8
                ? Go(e.parentNode, n)
                : e.nodeType === 1 && Go(e, n),
              or(e))
            : Go(Le, n.stateNode));
        break;
      case 4:
        (r = Le),
          (l = ht),
          (Le = n.stateNode.containerInfo),
          (ht = !0),
          Jt(e, t, n),
          (Le = r),
          (ht = l);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ae &&
          ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
        ) {
          l = r = r.next;
          do {
            var o = l,
              a = o.destroy;
            (o = o.tag),
              a !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Di(n, t, a),
              (l = l.next);
          } while (l !== r);
        }
        Jt(e, t, n);
        break;
      case 1:
        if (
          !Ae &&
          (Bn(n, t),
          (r = n.stateNode),
          typeof r.componentWillUnmount == "function")
        )
          try {
            (r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount();
          } catch (d) {
            Ee(n, t, d);
          }
        Jt(e, t, n);
        break;
      case 21:
        Jt(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((Ae = (r = Ae) || n.memoizedState !== null), Jt(e, t, n), (Ae = r))
          : Jt(e, t, n);
        break;
      default:
        Jt(e, t, n);
    }
  }
  function ec(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new bd()),
        t.forEach(function (r) {
          var l = ap.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(l, l));
        });
    }
  }
  function mt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var l = n[r];
        try {
          var o = e,
            a = t,
            d = a;
          e: for (; d !== null; ) {
            switch (d.tag) {
              case 5:
                (Le = d.stateNode), (ht = !1);
                break e;
              case 3:
                (Le = d.stateNode.containerInfo), (ht = !0);
                break e;
              case 4:
                (Le = d.stateNode.containerInfo), (ht = !0);
                break e;
            }
            d = d.return;
          }
          if (Le === null) throw Error(s(160));
          ba(o, a, l), (Le = null), (ht = !1);
          var h = l.alternate;
          h !== null && (h.return = null), (l.return = null);
        } catch (S) {
          Ee(l, t, S);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) tc(t, e), (t = t.sibling);
  }
  function tc(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((mt(t, e), Ct(e), r & 4)) {
          try {
            Tr(3, e, e.return), Ol(3, e);
          } catch (M) {
            Ee(e, e.return, M);
          }
          try {
            Tr(5, e, e.return);
          } catch (M) {
            Ee(e, e.return, M);
          }
        }
        break;
      case 1:
        mt(t, e), Ct(e), r & 512 && n !== null && Bn(n, n.return);
        break;
      case 5:
        if (
          (mt(t, e),
          Ct(e),
          r & 512 && n !== null && Bn(n, n.return),
          e.flags & 32)
        ) {
          var l = e.stateNode;
          try {
            Jn(l, "");
          } catch (M) {
            Ee(e, e.return, M);
          }
        }
        if (r & 4 && ((l = e.stateNode), l != null)) {
          var o = e.memoizedProps,
            a = n !== null ? n.memoizedProps : o,
            d = e.type,
            h = e.updateQueue;
          if (((e.updateQueue = null), h !== null))
            try {
              d === "input" && o.type === "radio" && o.name != null && Pu(l, o),
                mo(d, a);
              var S = mo(d, o);
              for (a = 0; a < h.length; a += 2) {
                var T = h[a],
                  L = h[a + 1];
                T === "style"
                  ? Au(l, L)
                  : T === "dangerouslySetInnerHTML"
                    ? ju(l, L)
                    : T === "children"
                      ? Jn(l, L)
                      : le(l, T, L, S);
              }
              switch (d) {
                case "input":
                  ao(l, o);
                  break;
                case "textarea":
                  Lu(l, o);
                  break;
                case "select":
                  var x = l._wrapperState.wasMultiple;
                  l._wrapperState.wasMultiple = !!o.multiple;
                  var D = o.value;
                  D != null
                    ? wn(l, !!o.multiple, D, !1)
                    : x !== !!o.multiple &&
                      (o.defaultValue != null
                        ? wn(l, !!o.multiple, o.defaultValue, !0)
                        : wn(l, !!o.multiple, o.multiple ? [] : "", !1));
              }
              l[yr] = o;
            } catch (M) {
              Ee(e, e.return, M);
            }
        }
        break;
      case 6:
        if ((mt(t, e), Ct(e), r & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          (l = e.stateNode), (o = e.memoizedProps);
          try {
            l.nodeValue = o;
          } catch (M) {
            Ee(e, e.return, M);
          }
        }
        break;
      case 3:
        if (
          (mt(t, e), Ct(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            or(t.containerInfo);
          } catch (M) {
            Ee(e, e.return, M);
          }
        break;
      case 4:
        mt(t, e), Ct(e);
        break;
      case 13:
        mt(t, e),
          Ct(e),
          (l = e.child),
          l.flags & 8192 &&
            ((o = l.memoizedState !== null),
            (l.stateNode.isHidden = o),
            !o ||
              (l.alternate !== null && l.alternate.memoizedState !== null) ||
              (Hi = ke())),
          r & 4 && ec(e);
        break;
      case 22:
        if (
          ((T = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((Ae = (S = Ae) || T), mt(t, e), (Ae = S)) : mt(t, e),
          Ct(e),
          r & 8192)
        ) {
          if (
            ((S = e.memoizedState !== null),
            (e.stateNode.isHidden = S) && !T && (e.mode & 1) !== 0)
          )
            for (U = e, T = e.child; T !== null; ) {
              for (L = U = T; U !== null; ) {
                switch (((x = U), (D = x.child), x.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Tr(4, x, x.return);
                    break;
                  case 1:
                    Bn(x, x.return);
                    var I = x.stateNode;
                    if (typeof I.componentWillUnmount == "function") {
                      (r = x), (n = x.return);
                      try {
                        (t = r),
                          (I.props = t.memoizedProps),
                          (I.state = t.memoizedState),
                          I.componentWillUnmount();
                      } catch (M) {
                        Ee(r, n, M);
                      }
                    }
                    break;
                  case 5:
                    Bn(x, x.return);
                    break;
                  case 22:
                    if (x.memoizedState !== null) {
                      lc(L);
                      continue;
                    }
                }
                D !== null ? ((D.return = x), (U = D)) : lc(L);
              }
              T = T.sibling;
            }
          e: for (T = null, L = e; ; ) {
            if (L.tag === 5) {
              if (T === null) {
                T = L;
                try {
                  (l = L.stateNode),
                    S
                      ? ((o = l.style),
                        typeof o.setProperty == "function"
                          ? o.setProperty("display", "none", "important")
                          : (o.display = "none"))
                      : ((d = L.stateNode),
                        (h = L.memoizedProps.style),
                        (a =
                          h != null && h.hasOwnProperty("display")
                            ? h.display
                            : null),
                        (d.style.display = Du("display", a)));
                } catch (M) {
                  Ee(e, e.return, M);
                }
              }
            } else if (L.tag === 6) {
              if (T === null)
                try {
                  L.stateNode.nodeValue = S ? "" : L.memoizedProps;
                } catch (M) {
                  Ee(e, e.return, M);
                }
            } else if (
              ((L.tag !== 22 && L.tag !== 23) ||
                L.memoizedState === null ||
                L === e) &&
              L.child !== null
            ) {
              (L.child.return = L), (L = L.child);
              continue;
            }
            if (L === e) break e;
            for (; L.sibling === null; ) {
              if (L.return === null || L.return === e) break e;
              T === L && (T = null), (L = L.return);
            }
            T === L && (T = null),
              (L.sibling.return = L.return),
              (L = L.sibling);
          }
        }
        break;
      case 19:
        mt(t, e), Ct(e), r & 4 && ec(e);
        break;
      case 21:
        break;
      default:
        mt(t, e), Ct(e);
    }
  }
  function Ct(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Ga(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (Jn(l, ""), (r.flags &= -33));
            var o = Za(e);
            Ii(e, o, l);
            break;
          case 3:
          case 4:
            var a = r.stateNode.containerInfo,
              d = Za(e);
            Ui(e, d, a);
            break;
          default:
            throw Error(s(161));
        }
      } catch (h) {
        Ee(e, e.return, h);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function tp(e, t, n) {
    (U = e), nc(e);
  }
  function nc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; U !== null; ) {
      var l = U,
        o = l.child;
      if (l.tag === 22 && r) {
        var a = l.memoizedState !== null || Nl;
        if (!a) {
          var d = l.alternate,
            h = (d !== null && d.memoizedState !== null) || Ae;
          d = Nl;
          var S = Ae;
          if (((Nl = a), (Ae = h) && !S))
            for (U = l; U !== null; )
              (a = U),
                (h = a.child),
                a.tag === 22 && a.memoizedState !== null
                  ? oc(l)
                  : h !== null
                    ? ((h.return = a), (U = h))
                    : oc(l);
          for (; o !== null; ) (U = o), nc(o), (o = o.sibling);
          (U = l), (Nl = d), (Ae = S);
        }
        rc(e);
      } else
        (l.subtreeFlags & 8772) !== 0 && o !== null
          ? ((o.return = l), (U = o))
          : rc(e);
    }
  }
  function rc(e) {
    for (; U !== null; ) {
      var t = U;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ae || Ol(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Ae)
                  if (n === null) r.componentDidMount();
                  else {
                    var l =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : pt(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      l,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var o = t.updateQueue;
                o !== null && ea(t, o, r);
                break;
              case 3:
                var a = t.updateQueue;
                if (a !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  ea(t, a, n);
                }
                break;
              case 5:
                var d = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = d;
                  var h = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      h.autoFocus && n.focus();
                      break;
                    case "img":
                      h.src && (n.src = h.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var S = t.alternate;
                  if (S !== null) {
                    var T = S.memoizedState;
                    if (T !== null) {
                      var L = T.dehydrated;
                      L !== null && or(L);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(s(163));
            }
          Ae || (t.flags & 512 && Ai(t));
        } catch (x) {
          Ee(t, t.return, x);
        }
      }
      if (t === e) {
        U = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        (n.return = t.return), (U = n);
        break;
      }
      U = t.return;
    }
  }
  function lc(e) {
    for (; U !== null; ) {
      var t = U;
      if (t === e) {
        U = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        (n.return = t.return), (U = n);
        break;
      }
      U = t.return;
    }
  }
  function oc(e) {
    for (; U !== null; ) {
      var t = U;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Ol(4, t);
            } catch (h) {
              Ee(t, n, h);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (h) {
                Ee(t, l, h);
              }
            }
            var o = t.return;
            try {
              Ai(t);
            } catch (h) {
              Ee(t, o, h);
            }
            break;
          case 5:
            var a = t.return;
            try {
              Ai(t);
            } catch (h) {
              Ee(t, a, h);
            }
        }
      } catch (h) {
        Ee(t, t.return, h);
      }
      if (t === e) {
        U = null;
        break;
      }
      var d = t.sibling;
      if (d !== null) {
        (d.return = t.return), (U = d);
        break;
      }
      U = t.return;
    }
  }
  var np = Math.ceil,
    Ll = se.ReactCurrentDispatcher,
    Mi = se.ReactCurrentOwner,
    it = se.ReactCurrentBatchConfig,
    ee = 0,
    Pe = null,
    Ce = null,
    ze = 0,
    tt = 0,
    Hn = Vt(0),
    Re = 0,
    Pr = null,
    fn = 0,
    zl = 0,
    Bi = 0,
    Nr = null,
    qe = null,
    Hi = 0,
    $n = 1 / 0,
    Dt = null,
    Fl = !1,
    $i = null,
    Xt = null,
    jl = !1,
    Yt = null,
    Dl = 0,
    Or = 0,
    Vi = null,
    Al = -1,
    Ul = 0;
  function Me() {
    return (ee & 6) !== 0 ? ke() : Al !== -1 ? Al : (Al = ke());
  }
  function Gt(e) {
    return (e.mode & 1) === 0
      ? 1
      : (ee & 2) !== 0 && ze !== 0
        ? ze & -ze
        : Md.transition !== null
          ? (Ul === 0 && (Ul = Gu()), Ul)
          : ((e = ie),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : is(e.type))),
            e);
  }
  function yt(e, t, n, r) {
    if (50 < Or) throw ((Or = 0), (Vi = null), Error(s(185)));
    er(e, n, r),
      ((ee & 2) === 0 || e !== Pe) &&
        (e === Pe && ((ee & 2) === 0 && (zl |= n), Re === 4 && Zt(e, ze)),
        Ke(e, r),
        n === 1 &&
          ee === 0 &&
          (t.mode & 1) === 0 &&
          (($n = ke() + 500), fl && Qt()));
  }
  function Ke(e, t) {
    var n = e.callbackNode;
    Mf(e, t);
    var r = qr(e, e === Pe ? ze : 0);
    if (r === 0)
      n !== null && Ju(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && Ju(n), t === 1))
        e.tag === 0 ? Id(uc.bind(null, e)) : Qs(uc.bind(null, e)),
          jd(function () {
            (ee & 6) === 0 && Qt();
          }),
          (n = null);
      else {
        switch (Zu(r)) {
          case 1:
            n = ko;
            break;
          case 4:
            n = Xu;
            break;
          case 16:
            n = $r;
            break;
          case 536870912:
            n = Yu;
            break;
          default:
            n = $r;
        }
        n = mc(n, ic.bind(null, e));
      }
      (e.callbackPriority = t), (e.callbackNode = n);
    }
  }
  function ic(e, t) {
    if (((Al = -1), (Ul = 0), (ee & 6) !== 0)) throw Error(s(327));
    var n = e.callbackNode;
    if (Vn() && e.callbackNode !== n) return null;
    var r = qr(e, e === Pe ? ze : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Il(e, r);
    else {
      t = r;
      var l = ee;
      ee |= 2;
      var o = ac();
      (Pe !== e || ze !== t) && ((Dt = null), ($n = ke() + 500), pn(e, t));
      do
        try {
          op();
          break;
        } catch (d) {
          sc(e, d);
        }
      while (!0);
      ui(),
        (Ll.current = o),
        (ee = l),
        Ce !== null ? (t = 0) : ((Pe = null), (ze = 0), (t = Re));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((l = xo(e)), l !== 0 && ((r = l), (t = Wi(e, l)))),
        t === 1)
      )
        throw ((n = Pr), pn(e, 0), Zt(e, r), Ke(e, ke()), n);
      if (t === 6) Zt(e, r);
      else {
        if (
          ((l = e.current.alternate),
          (r & 30) === 0 &&
            !rp(l) &&
            ((t = Il(e, r)),
            t === 2 && ((o = xo(e)), o !== 0 && ((r = o), (t = Wi(e, o)))),
            t === 1))
        )
          throw ((n = Pr), pn(e, 0), Zt(e, r), Ke(e, ke()), n);
        switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            hn(e, qe, Dt);
            break;
          case 3:
            if (
              (Zt(e, r),
              (r & 130023424) === r && ((t = Hi + 500 - ke()), 10 < t))
            ) {
              if (qr(e, 0) !== 0) break;
              if (((l = e.suspendedLanes), (l & r) !== r)) {
                Me(), (e.pingedLanes |= e.suspendedLanes & l);
                break;
              }
              e.timeoutHandle = Yo(hn.bind(null, e, qe, Dt), t);
              break;
            }
            hn(e, qe, Dt);
            break;
          case 4:
            if ((Zt(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var a = 31 - ct(r);
              (o = 1 << a), (a = t[a]), a > l && (l = a), (r &= ~o);
            }
            if (
              ((r = l),
              (r = ke() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * np(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = Yo(hn.bind(null, e, qe, Dt), r);
              break;
            }
            hn(e, qe, Dt);
            break;
          case 5:
            hn(e, qe, Dt);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Ke(e, ke()), e.callbackNode === n ? ic.bind(null, e) : null;
  }
  function Wi(e, t) {
    var n = Nr;
    return (
      e.current.memoizedState.isDehydrated && (pn(e, t).flags |= 256),
      (e = Il(e, t)),
      e !== 2 && ((t = qe), (qe = n), t !== null && Qi(t)),
      e
    );
  }
  function Qi(e) {
    qe === null ? (qe = e) : qe.push.apply(qe, e);
  }
  function rp(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var l = n[r],
              o = l.getSnapshot;
            l = l.value;
            try {
              if (!ft(o(), l)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function Zt(e, t) {
    for (
      t &= ~Bi,
        t &= ~zl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - ct(t),
        r = 1 << n;
      (e[n] = -1), (t &= ~r);
    }
  }
  function uc(e) {
    if ((ee & 6) !== 0) throw Error(s(327));
    Vn();
    var t = qr(e, 0);
    if ((t & 1) === 0) return Ke(e, ke()), null;
    var n = Il(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = xo(e);
      r !== 0 && ((t = r), (n = Wi(e, r)));
    }
    if (n === 1) throw ((n = Pr), pn(e, 0), Zt(e, t), Ke(e, ke()), n);
    if (n === 6) throw Error(s(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      hn(e, qe, Dt),
      Ke(e, ke()),
      null
    );
  }
  function qi(e, t) {
    var n = ee;
    ee |= 1;
    try {
      return e(t);
    } finally {
      (ee = n), ee === 0 && (($n = ke() + 500), fl && Qt());
    }
  }
  function dn(e) {
    Yt !== null && Yt.tag === 0 && (ee & 6) === 0 && Vn();
    var t = ee;
    ee |= 1;
    var n = it.transition,
      r = ie;
    try {
      if (((it.transition = null), (ie = 1), e)) return e();
    } finally {
      (ie = r), (it.transition = n), (ee = t), (ee & 6) === 0 && Qt();
    }
  }
  function Ki() {
    (tt = Hn.current), pe(Hn);
  }
  function pn(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), Fd(n)), Ce !== null))
      for (n = Ce.return; n !== null; ) {
        var r = n;
        switch ((ni(r), r.tag)) {
          case 1:
            (r = r.type.childContextTypes), r != null && al();
            break;
          case 3:
            In(), pe(Ve), pe(Fe), vi();
            break;
          case 5:
            mi(r);
            break;
          case 4:
            In();
            break;
          case 13:
            pe(ve);
            break;
          case 19:
            pe(ve);
            break;
          case 10:
            si(r.type._context);
            break;
          case 22:
          case 23:
            Ki();
        }
        n = n.return;
      }
    if (
      ((Pe = e),
      (Ce = e = bt(e.current, null)),
      (ze = tt = t),
      (Re = 0),
      (Pr = null),
      (Bi = zl = fn = 0),
      (qe = Nr = null),
      sn !== null)
    ) {
      for (t = 0; t < sn.length; t++)
        if (((n = sn[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var l = r.next,
            o = n.pending;
          if (o !== null) {
            var a = o.next;
            (o.next = l), (r.next = a);
          }
          n.pending = r;
        }
      sn = null;
    }
    return e;
  }
  function sc(e, t) {
    do {
      var n = Ce;
      try {
        if ((ui(), (kl.current = Rl), xl)) {
          for (var r = ge.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), (r = r.next);
          }
          xl = !1;
        }
        if (
          ((cn = 0),
          (Te = _e = ge = null),
          (kr = !1),
          (xr = 0),
          (Mi.current = null),
          n === null || n.return === null)
        ) {
          (Re = 1), (Pr = t), (Ce = null);
          break;
        }
        e: {
          var o = e,
            a = n.return,
            d = n,
            h = t;
          if (
            ((t = ze),
            (d.flags |= 32768),
            h !== null && typeof h == "object" && typeof h.then == "function")
          ) {
            var S = h,
              T = d,
              L = T.tag;
            if ((T.mode & 1) === 0 && (L === 0 || L === 11 || L === 15)) {
              var x = T.alternate;
              x
                ? ((T.updateQueue = x.updateQueue),
                  (T.memoizedState = x.memoizedState),
                  (T.lanes = x.lanes))
                : ((T.updateQueue = null), (T.memoizedState = null));
            }
            var D = Fa(a);
            if (D !== null) {
              (D.flags &= -257),
                ja(D, a, d, o, t),
                D.mode & 1 && za(o, S, t),
                (t = D),
                (h = S);
              var I = t.updateQueue;
              if (I === null) {
                var M = new Set();
                M.add(h), (t.updateQueue = M);
              } else I.add(h);
              break e;
            } else {
              if ((t & 1) === 0) {
                za(o, S, t), Ji();
                break e;
              }
              h = Error(s(426));
            }
          } else if (ye && d.mode & 1) {
            var xe = Fa(a);
            if (xe !== null) {
              (xe.flags & 65536) === 0 && (xe.flags |= 256),
                ja(xe, a, d, o, t),
                oi(Mn(h, d));
              break e;
            }
          }
          (o = h = Mn(h, d)),
            Re !== 4 && (Re = 2),
            Nr === null ? (Nr = [o]) : Nr.push(o),
            (o = a);
          do {
            switch (o.tag) {
              case 3:
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var g = Oa(o, h, t);
                bs(o, g);
                break e;
              case 1:
                d = h;
                var v = o.type,
                  w = o.stateNode;
                if (
                  (o.flags & 128) === 0 &&
                  (typeof v.getDerivedStateFromError == "function" ||
                    (w !== null &&
                      typeof w.componentDidCatch == "function" &&
                      (Xt === null || !Xt.has(w))))
                ) {
                  (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                  var z = La(o, d, t);
                  bs(o, z);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        fc(n);
      } catch (B) {
        (t = B), Ce === n && n !== null && (Ce = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ac() {
    var e = Ll.current;
    return (Ll.current = Rl), e === null ? Rl : e;
  }
  function Ji() {
    (Re === 0 || Re === 3 || Re === 2) && (Re = 4),
      Pe === null ||
        ((fn & 268435455) === 0 && (zl & 268435455) === 0) ||
        Zt(Pe, ze);
  }
  function Il(e, t) {
    var n = ee;
    ee |= 2;
    var r = ac();
    (Pe !== e || ze !== t) && ((Dt = null), pn(e, t));
    do
      try {
        lp();
        break;
      } catch (l) {
        sc(e, l);
      }
    while (!0);
    if ((ui(), (ee = n), (Ll.current = r), Ce !== null)) throw Error(s(261));
    return (Pe = null), (ze = 0), Re;
  }
  function lp() {
    for (; Ce !== null; ) cc(Ce);
  }
  function op() {
    for (; Ce !== null && !Of(); ) cc(Ce);
  }
  function cc(e) {
    var t = hc(e.alternate, e, tt);
    (e.memoizedProps = e.pendingProps),
      t === null ? fc(e) : (Ce = t),
      (Mi.current = null);
  }
  function fc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((n = Gd(n, t, tt)), n !== null)) {
          Ce = n;
          return;
        }
      } else {
        if (((n = Zd(n, t)), n !== null)) {
          (n.flags &= 32767), (Ce = n);
          return;
        }
        if (e !== null)
          (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
        else {
          (Re = 6), (Ce = null);
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        Ce = t;
        return;
      }
      Ce = t = e;
    } while (t !== null);
    Re === 0 && (Re = 5);
  }
  function hn(e, t, n) {
    var r = ie,
      l = it.transition;
    try {
      (it.transition = null), (ie = 1), ip(e, t, n, r);
    } finally {
      (it.transition = l), (ie = r);
    }
    return null;
  }
  function ip(e, t, n, r) {
    do Vn();
    while (Yt !== null);
    if ((ee & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(s(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var o = n.lanes | n.childLanes;
    if (
      (Bf(e, o),
      e === Pe && ((Ce = Pe = null), (ze = 0)),
      ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
        jl ||
        ((jl = !0),
        mc($r, function () {
          return Vn(), null;
        })),
      (o = (n.flags & 15990) !== 0),
      (n.subtreeFlags & 15990) !== 0 || o)
    ) {
      (o = it.transition), (it.transition = null);
      var a = ie;
      ie = 1;
      var d = ee;
      (ee |= 4),
        (Mi.current = null),
        ep(e, n),
        tc(n, e),
        Rd(Jo),
        (Xr = !!Ko),
        (Jo = Ko = null),
        (e.current = n),
        tp(n),
        Lf(),
        (ee = d),
        (ie = a),
        (it.transition = o);
    } else e.current = n;
    if (
      (jl && ((jl = !1), (Yt = e), (Dl = l)),
      (o = e.pendingLanes),
      o === 0 && (Xt = null),
      jf(n.stateNode),
      Ke(e, ke()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
    if (Fl) throw ((Fl = !1), (e = $i), ($i = null), e);
    return (
      (Dl & 1) !== 0 && e.tag !== 0 && Vn(),
      (o = e.pendingLanes),
      (o & 1) !== 0 ? (e === Vi ? Or++ : ((Or = 0), (Vi = e))) : (Or = 0),
      Qt(),
      null
    );
  }
  function Vn() {
    if (Yt !== null) {
      var e = Zu(Dl),
        t = it.transition,
        n = ie;
      try {
        if (((it.transition = null), (ie = 16 > e ? 16 : e), Yt === null))
          var r = !1;
        else {
          if (((e = Yt), (Yt = null), (Dl = 0), (ee & 6) !== 0))
            throw Error(s(331));
          var l = ee;
          for (ee |= 4, U = e.current; U !== null; ) {
            var o = U,
              a = o.child;
            if ((U.flags & 16) !== 0) {
              var d = o.deletions;
              if (d !== null) {
                for (var h = 0; h < d.length; h++) {
                  var S = d[h];
                  for (U = S; U !== null; ) {
                    var T = U;
                    switch (T.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Tr(8, T, o);
                    }
                    var L = T.child;
                    if (L !== null) (L.return = T), (U = L);
                    else
                      for (; U !== null; ) {
                        T = U;
                        var x = T.sibling,
                          D = T.return;
                        if ((Ya(T), T === S)) {
                          U = null;
                          break;
                        }
                        if (x !== null) {
                          (x.return = D), (U = x);
                          break;
                        }
                        U = D;
                      }
                  }
                }
                var I = o.alternate;
                if (I !== null) {
                  var M = I.child;
                  if (M !== null) {
                    I.child = null;
                    do {
                      var xe = M.sibling;
                      (M.sibling = null), (M = xe);
                    } while (M !== null);
                  }
                }
                U = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && a !== null)
              (a.return = o), (U = a);
            else
              e: for (; U !== null; ) {
                if (((o = U), (o.flags & 2048) !== 0))
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Tr(9, o, o.return);
                  }
                var g = o.sibling;
                if (g !== null) {
                  (g.return = o.return), (U = g);
                  break e;
                }
                U = o.return;
              }
          }
          var v = e.current;
          for (U = v; U !== null; ) {
            a = U;
            var w = a.child;
            if ((a.subtreeFlags & 2064) !== 0 && w !== null)
              (w.return = a), (U = w);
            else
              e: for (a = v; U !== null; ) {
                if (((d = U), (d.flags & 2048) !== 0))
                  try {
                    switch (d.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ol(9, d);
                    }
                  } catch (B) {
                    Ee(d, d.return, B);
                  }
                if (d === a) {
                  U = null;
                  break e;
                }
                var z = d.sibling;
                if (z !== null) {
                  (z.return = d.return), (U = z);
                  break e;
                }
                U = d.return;
              }
          }
          if (
            ((ee = l),
            Qt(),
            St && typeof St.onPostCommitFiberRoot == "function")
          )
            try {
              St.onPostCommitFiberRoot(Vr, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        (ie = n), (it.transition = t);
      }
    }
    return !1;
  }
  function dc(e, t, n) {
    (t = Mn(n, t)),
      (t = Oa(e, t, 1)),
      (e = Kt(e, t, 1)),
      (t = Me()),
      e !== null && (er(e, 1, t), Ke(e, t));
  }
  function Ee(e, t, n) {
    if (e.tag === 3) dc(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          dc(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (Xt === null || !Xt.has(r)))
          ) {
            (e = Mn(n, e)),
              (e = La(t, e, 1)),
              (t = Kt(t, e, 1)),
              (e = Me()),
              t !== null && (er(t, 1, e), Ke(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function up(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (t = Me()),
      (e.pingedLanes |= e.suspendedLanes & n),
      Pe === e &&
        (ze & n) === n &&
        (Re === 4 || (Re === 3 && (ze & 130023424) === ze && 500 > ke() - Hi)
          ? pn(e, 0)
          : (Bi |= n)),
      Ke(e, t);
  }
  function pc(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = Qr), (Qr <<= 1), (Qr & 130023424) === 0 && (Qr = 4194304)));
    var n = Me();
    (e = zt(e, t)), e !== null && (er(e, t, n), Ke(e, n));
  }
  function sp(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), pc(e, n);
  }
  function ap(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    r !== null && r.delete(t), pc(e, n);
  }
  var hc;
  hc = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ve.current) Qe = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
          return (Qe = !1), Yd(e, t, n);
        Qe = (e.flags & 131072) !== 0;
      }
    else (Qe = !1), ye && (t.flags & 1048576) !== 0 && qs(t, pl, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        Pl(e, t), (e = t.pendingProps);
        var l = Ln(t, Fe.current);
        An(t, n), (l = Si(null, t, r, e, l, n));
        var o = Ei();
        return (
          (t.flags |= 1),
          typeof l == "object" &&
          l !== null &&
          typeof l.render == "function" &&
          l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              We(r) ? ((o = !0), cl(t)) : (o = !1),
              (t.memoizedState =
                l.state !== null && l.state !== void 0 ? l.state : null),
              fi(t),
              (l.updater = wl),
              (t.stateNode = l),
              (l._reactInternals = t),
              pi(t, r, e, n),
              (t = Ni(null, t, r, !0, o, n)))
            : ((t.tag = 0), ye && o && ti(t), Ie(null, t, l, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (Pl(e, t),
            (e = t.pendingProps),
            (l = r._init),
            (r = l(r._payload)),
            (t.type = r),
            (l = t.tag = fp(r)),
            (e = pt(r, e)),
            l)
          ) {
            case 0:
              t = Pi(null, t, r, e, n);
              break e;
            case 1:
              t = Ba(null, t, r, e, n);
              break e;
            case 11:
              t = Da(null, t, r, e, n);
              break e;
            case 14:
              t = Aa(null, t, r, pt(r.type, e), n);
              break e;
          }
          throw Error(s(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : pt(r, l)),
          Pi(e, t, r, l, n)
        );
      case 1:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : pt(r, l)),
          Ba(e, t, r, l, n)
        );
      case 3:
        e: {
          if ((Ha(t), e === null)) throw Error(s(387));
          (r = t.pendingProps),
            (o = t.memoizedState),
            (l = o.element),
            Zs(e, t),
            gl(t, r, null, n);
          var a = t.memoizedState;
          if (((r = a.element), o.isDehydrated))
            if (
              ((o = {
                element: r,
                isDehydrated: !1,
                cache: a.cache,
                pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
                transitions: a.transitions,
              }),
              (t.updateQueue.baseState = o),
              (t.memoizedState = o),
              t.flags & 256)
            ) {
              (l = Mn(Error(s(423)), t)), (t = $a(e, t, r, n, l));
              break e;
            } else if (r !== l) {
              (l = Mn(Error(s(424)), t)), (t = $a(e, t, r, n, l));
              break e;
            } else
              for (
                et = $t(t.stateNode.containerInfo.firstChild),
                  be = t,
                  ye = !0,
                  dt = null,
                  n = ua(t, null, r, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
          else {
            if ((jn(), r === l)) {
              t = jt(e, t, n);
              break e;
            }
            Ie(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          sa(t),
          e === null && li(t),
          (r = t.type),
          (l = t.pendingProps),
          (o = e !== null ? e.memoizedProps : null),
          (a = l.children),
          Xo(r, l) ? (a = null) : o !== null && Xo(r, o) && (t.flags |= 32),
          Ma(e, t),
          Ie(e, t, a, n),
          t.child
        );
      case 6:
        return e === null && li(t), null;
      case 13:
        return Va(e, t, n);
      case 4:
        return (
          hi(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Un(t, null, r, n)) : Ie(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : pt(r, l)),
          Da(e, t, r, l, n)
        );
      case 7:
        return Ie(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ie(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ie(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (l = t.pendingProps),
            (o = t.memoizedProps),
            (a = l.value),
            fe(ml, r._currentValue),
            (r._currentValue = a),
            o !== null)
          )
            if (ft(o.value, a)) {
              if (o.children === l.children && !Ve.current) {
                t = jt(e, t, n);
                break e;
              }
            } else
              for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                var d = o.dependencies;
                if (d !== null) {
                  a = o.child;
                  for (var h = d.firstContext; h !== null; ) {
                    if (h.context === r) {
                      if (o.tag === 1) {
                        (h = Ft(-1, n & -n)), (h.tag = 2);
                        var S = o.updateQueue;
                        if (S !== null) {
                          S = S.shared;
                          var T = S.pending;
                          T === null
                            ? (h.next = h)
                            : ((h.next = T.next), (T.next = h)),
                            (S.pending = h);
                        }
                      }
                      (o.lanes |= n),
                        (h = o.alternate),
                        h !== null && (h.lanes |= n),
                        ai(o.return, n, t),
                        (d.lanes |= n);
                      break;
                    }
                    h = h.next;
                  }
                } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
                else if (o.tag === 18) {
                  if (((a = o.return), a === null)) throw Error(s(341));
                  (a.lanes |= n),
                    (d = a.alternate),
                    d !== null && (d.lanes |= n),
                    ai(a, n, t),
                    (a = o.sibling);
                } else a = o.child;
                if (a !== null) a.return = o;
                else
                  for (a = o; a !== null; ) {
                    if (a === t) {
                      a = null;
                      break;
                    }
                    if (((o = a.sibling), o !== null)) {
                      (o.return = a.return), (a = o);
                      break;
                    }
                    a = a.return;
                  }
                o = a;
              }
          Ie(e, t, l.children, n), (t = t.child);
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          An(t, n),
          (l = lt(l)),
          (r = r(l)),
          (t.flags |= 1),
          Ie(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (l = pt(r, t.pendingProps)),
          (l = pt(r.type, l)),
          Aa(e, t, r, l, n)
        );
      case 15:
        return Ua(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : pt(r, l)),
          Pl(e, t),
          (t.tag = 1),
          We(r) ? ((e = !0), cl(t)) : (e = !1),
          An(t, n),
          ra(t, r, l),
          pi(t, r, l, n),
          Ni(null, t, r, !0, e, n)
        );
      case 19:
        return Qa(e, t, n);
      case 22:
        return Ia(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function mc(e, t) {
    return Ku(e, t);
  }
  function cp(e, t, n, r) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function ut(e, t, n, r) {
    return new cp(e, t, n, r);
  }
  function Xi(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function fp(e) {
    if (typeof e == "function") return Xi(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === gt)) return 11;
      if (e === wt) return 14;
    }
    return 2;
  }
  function bt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = ut(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function Ml(e, t, n, r, l, o) {
    var a = 2;
    if (((r = e), typeof e == "function")) Xi(e) && (a = 1);
    else if (typeof e == "string") a = 5;
    else
      e: switch (e) {
        case we:
          return mn(n.children, l, o, t);
        case Oe:
          (a = 8), (l |= 8);
          break;
        case st:
          return (
            (e = ut(12, n, t, l | 2)), (e.elementType = st), (e.lanes = o), e
          );
        case Ge:
          return (e = ut(13, n, t, l)), (e.elementType = Ge), (e.lanes = o), e;
        case at:
          return (e = ut(19, n, t, l)), (e.elementType = at), (e.lanes = o), e;
        case Se:
          return Bl(n, l, o, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Tt:
                a = 10;
                break e;
              case tn:
                a = 9;
                break e;
              case gt:
                a = 11;
                break e;
              case wt:
                a = 14;
                break e;
              case He:
                (a = 16), (r = null);
                break e;
            }
          throw Error(s(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = ut(a, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
    );
  }
  function mn(e, t, n, r) {
    return (e = ut(7, e, r, t)), (e.lanes = n), e;
  }
  function Bl(e, t, n, r) {
    return (
      (e = ut(22, e, r, t)),
      (e.elementType = Se),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Yi(e, t, n) {
    return (e = ut(6, e, null, t)), (e.lanes = n), e;
  }
  function Gi(e, t, n) {
    return (
      (t = ut(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function dp(e, t, n, r, l) {
    (this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Co(0)),
      (this.expirationTimes = Co(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Co(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null);
  }
  function Zi(e, t, n, r, l, o, a, d, h) {
    return (
      (e = new dp(e, t, n, d, h)),
      t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
      (o = ut(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      fi(o),
      e
    );
  }
  function pp(e, t, n) {
    var r =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: me,
      key: r == null ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function yc(e) {
    if (!e) return Wt;
    e = e._reactInternals;
    e: {
      if (nn(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (We(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (We(n)) return Vs(e, n, t);
    }
    return t;
  }
  function vc(e, t, n, r, l, o, a, d, h) {
    return (
      (e = Zi(n, r, !0, e, l, o, a, d, h)),
      (e.context = yc(null)),
      (n = e.current),
      (r = Me()),
      (l = Gt(n)),
      (o = Ft(r, l)),
      (o.callback = t ?? null),
      Kt(n, o, l),
      (e.current.lanes = l),
      er(e, l, r),
      Ke(e, r),
      e
    );
  }
  function Hl(e, t, n, r) {
    var l = t.current,
      o = Me(),
      a = Gt(l);
    return (
      (n = yc(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = Ft(o, a)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = Kt(l, t, a)),
      e !== null && (yt(e, l, a, o), vl(e, l, a)),
      a
    );
  }
  function $l(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function gc(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function bi(e, t) {
    gc(e, t), (e = e.alternate) && gc(e, t);
  }
  function hp() {
    return null;
  }
  var wc =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function eu(e) {
    this._internalRoot = e;
  }
  (Vl.prototype.render = eu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      Hl(e, t, null, null);
    }),
    (Vl.prototype.unmount = eu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          dn(function () {
            Hl(null, e, null, null);
          }),
            (t[Pt] = null);
        }
      });
  function Vl(e) {
    this._internalRoot = e;
  }
  Vl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ts();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Mt.length && t !== 0 && t < Mt[n].priority; n++);
      Mt.splice(n, 0, e), n === 0 && ls(e);
    }
  };
  function tu(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Wl(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Sc() {}
  function mp(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var o = r;
        r = function () {
          var S = $l(a);
          o.call(S);
        };
      }
      var a = vc(t, r, e, 0, null, !1, !1, "", Sc);
      return (
        (e._reactRootContainer = a),
        (e[Pt] = a.current),
        hr(e.nodeType === 8 ? e.parentNode : e),
        dn(),
        a
      );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == "function") {
      var d = r;
      r = function () {
        var S = $l(h);
        d.call(S);
      };
    }
    var h = Zi(e, 0, !1, null, null, !1, !1, "", Sc);
    return (
      (e._reactRootContainer = h),
      (e[Pt] = h.current),
      hr(e.nodeType === 8 ? e.parentNode : e),
      dn(function () {
        Hl(t, h, n, r);
      }),
      h
    );
  }
  function Ql(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
      var a = o;
      if (typeof l == "function") {
        var d = l;
        l = function () {
          var h = $l(a);
          d.call(h);
        };
      }
      Hl(t, a, e, l);
    } else a = mp(n, t, e, l, r);
    return $l(a);
  }
  (bu = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = bn(t.pendingLanes);
          n !== 0 &&
            (_o(t, n | 1),
            Ke(t, ke()),
            (ee & 6) === 0 && (($n = ke() + 500), Qt()));
        }
        break;
      case 13:
        dn(function () {
          var r = zt(e, 1);
          if (r !== null) {
            var l = Me();
            yt(r, e, 1, l);
          }
        }),
          bi(e, 1);
    }
  }),
    (Ro = function (e) {
      if (e.tag === 13) {
        var t = zt(e, 134217728);
        if (t !== null) {
          var n = Me();
          yt(t, e, 134217728, n);
        }
        bi(e, 134217728);
      }
    }),
    (es = function (e) {
      if (e.tag === 13) {
        var t = Gt(e),
          n = zt(e, t);
        if (n !== null) {
          var r = Me();
          yt(n, e, t, r);
        }
        bi(e, t);
      }
    }),
    (ts = function () {
      return ie;
    }),
    (ns = function (e, t) {
      var n = ie;
      try {
        return (ie = e), t();
      } finally {
        ie = n;
      }
    }),
    (go = function (e, t, n) {
      switch (t) {
        case "input":
          if ((ao(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = sl(r);
                if (!l) throw Error(s(90));
                Ru(r), ao(r, l);
              }
            }
          }
          break;
        case "textarea":
          Lu(e, n);
          break;
        case "select":
          (t = n.value), t != null && wn(e, !!n.multiple, t, !1);
      }
    }),
    (Bu = qi),
    (Hu = dn);
  var yp = { usingClientEntryPoint: !1, Events: [vr, Nn, sl, Iu, Mu, qi] },
    Lr = {
      findFiberByHostInstance: rn,
      bundleType: 0,
      version: "18.2.0",
      rendererPackageName: "react-dom",
    },
    vp = {
      bundleType: Lr.bundleType,
      version: Lr.version,
      rendererPackageName: Lr.rendererPackageName,
      rendererConfig: Lr.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: se.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return (e = Qu(e)), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: Lr.findFiberByHostInstance || hp,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ql = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ql.isDisabled && ql.supportsFiber)
      try {
        (Vr = ql.inject(vp)), (St = ql);
      } catch {}
  }
  return (
    (Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yp),
    (Je.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!tu(t)) throw Error(s(200));
      return pp(e, t, null, n);
    }),
    (Je.createRoot = function (e, t) {
      if (!tu(e)) throw Error(s(299));
      var n = !1,
        r = "",
        l = wc;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = Zi(e, 1, !1, null, null, n, !1, r, l)),
        (e[Pt] = t.current),
        hr(e.nodeType === 8 ? e.parentNode : e),
        new eu(t)
      );
    }),
    (Je.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(s(188))
          : ((e = Object.keys(e).join(",")), Error(s(268, e)));
      return (e = Qu(t)), (e = e === null ? null : e.stateNode), e;
    }),
    (Je.flushSync = function (e) {
      return dn(e);
    }),
    (Je.hydrate = function (e, t, n) {
      if (!Wl(t)) throw Error(s(200));
      return Ql(null, e, t, !0, n);
    }),
    (Je.hydrateRoot = function (e, t, n) {
      if (!tu(e)) throw Error(s(405));
      var r = (n != null && n.hydratedSources) || null,
        l = !1,
        o = "",
        a = wc;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
        (t = vc(t, null, e, 1, n ?? null, l, !1, o, a)),
        (e[Pt] = t.current),
        hr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (n = r[e]),
            (l = n._getVersion),
            (l = l(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, l])
              : t.mutableSourceEagerHydrationData.push(n, l);
      return new Vl(t);
    }),
    (Je.render = function (e, t, n) {
      if (!Wl(t)) throw Error(s(200));
      return Ql(null, e, t, !1, n);
    }),
    (Je.unmountComponentAtNode = function (e) {
      if (!Wl(e)) throw Error(s(40));
      return e._reactRootContainer
        ? (dn(function () {
            Ql(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[Pt] = null);
            });
          }),
          !0)
        : !1;
    }),
    (Je.unstable_batchedUpdates = qi),
    (Je.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Wl(n)) throw Error(s(200));
      if (e == null || e._reactInternals === void 0) throw Error(s(38));
      return Ql(e, t, n, !1, r);
    }),
    (Je.version = "18.2.0-next-9e3b772b8-20220608"),
    Je
  );
}
var Pc;
function _p() {
  if (Pc) return lu.exports;
  Pc = 1;
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (u) {
        console.error(u);
      }
  }
  return i(), (lu.exports = Cp()), lu.exports;
}
var Nc;
function Rp() {
  if (Nc) return Kl;
  Nc = 1;
  var i = _p();
  return (Kl.createRoot = i.createRoot), (Kl.hydrateRoot = i.hydrateRoot), Kl;
}
var Tp = Rp();
const Pp = qc(Tp);
var Be = Eu(),
  uu = { exports: {} },
  su,
  Oc;
function Np() {
  if (Oc) return su;
  Oc = 1;
  var i = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (su = i), su;
}
var au, Lc;
function Op() {
  if (Lc) return au;
  Lc = 1;
  var i = Np();
  function u() {}
  function s() {}
  return (
    (s.resetWarningCache = u),
    (au = function () {
      function c(y, k, P, _, R, F) {
        if (F !== i) {
          var H = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((H.name = "Invariant Violation"), H);
        }
      }
      c.isRequired = c;
      function f() {
        return c;
      }
      var p = {
        array: c,
        bigint: c,
        bool: c,
        func: c,
        number: c,
        object: c,
        string: c,
        symbol: c,
        any: c,
        arrayOf: f,
        element: c,
        elementType: c,
        instanceOf: f,
        node: c,
        objectOf: f,
        oneOf: f,
        oneOfType: f,
        shape: f,
        exact: f,
        checkPropTypes: s,
        resetWarningCache: u,
      };
      return (p.PropTypes = p), p;
    }),
    au
  );
}
var zc;
function Lp() {
  return zc || ((zc = 1), (uu.exports = Op()())), uu.exports;
}
var zp = Lp();
const Rt = qc(zp),
  Kc = ({ blog: i, incrLikes: u, tryDeleteBlog: s, canDeleteBlog: c }) => {
    const [f, p] = Be.useState(!1),
      y = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
      },
      k = () => p(!f);
    return q.jsxs("div", {
      style: y,
      className: "blog",
      children: [
        q.jsxs(q.Fragment, {
          children: [
            i.title,
            " ",
            i.author,
            q.jsx("button", { onClick: k, children: f ? "hide" : "view" }),
          ],
        }),
        f &&
          q.jsxs(q.Fragment, {
            children: [
              q.jsx("div", { children: i.url }),
              q.jsxs("div", {
                children: [
                  "likes ",
                  i.likes,
                  " ",
                  q.jsx("button", {
                    onClick: async () => u(i),
                    children: "like",
                  }),
                ],
              }),
              q.jsx("div", { children: i.user.name }),
              c &&
                q.jsx("button", {
                  onClick: async () => s(i),
                  children: "remove",
                }),
            ],
          }),
      ],
    });
  };
Kc.propTypes = {
  blog: Rt.object.isRequired,
  incrLikes: Rt.func.isRequired,
  tryDeleteBlog: Rt.func.isRequired,
  canDeleteBlog: Rt.bool.isRequired,
};
const hu = ({ message: i, isError: u }) => {
  if (i === null) return null;
  const s = { color: u ? "red" : "green" };
  return q.jsx("div", { className: "notification", style: s, children: i });
};
hu.propTypes = { message: Rt.string.isRequired, isError: Rt.bool.isRequired };
const Jc = ({ tryLoginUser: i }) => {
  const [u, s] = Be.useState(""),
    [c, f] = Be.useState(""),
    p = async (y) => {
      y.preventDefault(), i({ username: u, password: c }) && (s(""), f(""));
    };
  return q.jsxs("form", {
    onSubmit: p,
    children: [
      q.jsx("label", { htmlFor: "username", children: "username" }),
      q.jsx("input", {
        name: "username",
        value: u,
        onChange: (y) => s(y.target.value),
      }),
      q.jsx("br", {}),
      q.jsx("label", { htmlFor: "password", children: "password" }),
      q.jsx("input", {
        name: "password",
        value: c,
        onChange: (y) => f(y.target.value),
      }),
      q.jsx("br", {}),
      q.jsx("button", { type: "submit", children: "login" }),
    ],
  });
};
Jc.propTypes = { tryLoginUser: Rt.func.isRequired };
const Xc = ({ tryCreateBlog: i }) => {
  const [u, s] = Be.useState(""),
    [c, f] = Be.useState(""),
    [p, y] = Be.useState(""),
    k = (P) => {
      P.preventDefault(),
        i({ title: u, author: c, url: p }) && (s(""), f(""), y(""));
    };
  return q.jsxs("div", {
    children: [
      q.jsx("h2", { children: "create new" }),
      q.jsxs("form", {
        onSubmit: k,
        children: [
          q.jsxs("div", {
            children: [
              "title:",
              q.jsx("input", {
                name: "title",
                id: "title-input",
                value: u,
                onChange: (P) => s(P.target.value),
              }),
            ],
          }),
          q.jsxs("div", {
            children: [
              "author:",
              q.jsx("input", {
                name: "author",
                id: "author-input",
                value: c,
                onChange: (P) => f(P.target.value),
              }),
            ],
          }),
          q.jsxs("div", {
            children: [
              "url:",
              q.jsx("input", {
                name: "url",
                id: "url-input",
                value: p,
                onChange: (P) => y(P.target.value),
              }),
            ],
          }),
          q.jsx("button", { type: "submit", children: "create" }),
        ],
      }),
    ],
  });
};
Xc.propTypes = { tryCreateBlog: Rt.func.isRequired };
const ku = Be.forwardRef((i, u) => {
  const [s, c] = Be.useState(!1),
    f = () => c(!s),
    p = { display: s ? "none" : "" },
    y = { display: s ? "" : "none" };
  return (
    Be.useImperativeHandle(u, () => ({ toggleVisibility: f })),
    q.jsxs("div", {
      children: [
        q.jsx("div", {
          style: p,
          children: q.jsx("button", { onClick: f, children: i.buttonLabel }),
        }),
        q.jsxs("div", {
          style: y,
          children: [
            i.children,
            q.jsx("button", { onClick: f, children: "cancel" }),
          ],
        }),
      ],
    })
  );
});
ku.displayName = "Togglable";
ku.propTypes = {
  children: Rt.node.isRequired,
  buttonLabel: Rt.string.isRequired,
};
function Yc(i, u) {
  return function () {
    return i.apply(u, arguments);
  };
}
const { toString: Fp } = Object.prototype,
  { getPrototypeOf: xu } = Object,
  { iterator: bl, toStringTag: Gc } = Symbol,
  eo = ((i) => (u) => {
    const s = Fp.call(u);
    return i[s] || (i[s] = s.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  vt = (i) => ((i = i.toLowerCase()), (u) => eo(u) === i),
  to = (i) => (u) => typeof u === i,
  { isArray: Qn } = Array,
  jr = to("undefined");
function jp(i) {
  return (
    i !== null &&
    !jr(i) &&
    i.constructor !== null &&
    !jr(i.constructor) &&
    Xe(i.constructor.isBuffer) &&
    i.constructor.isBuffer(i)
  );
}
const Zc = vt("ArrayBuffer");
function Dp(i) {
  let u;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (u = ArrayBuffer.isView(i))
      : (u = i && i.buffer && Zc(i.buffer)),
    u
  );
}
const Ap = to("string"),
  Xe = to("function"),
  bc = to("number"),
  no = (i) => i !== null && typeof i == "object",
  Up = (i) => i === !0 || i === !1,
  Jl = (i) => {
    if (eo(i) !== "object") return !1;
    const u = xu(i);
    return (
      (u === null ||
        u === Object.prototype ||
        Object.getPrototypeOf(u) === null) &&
      !(Gc in i) &&
      !(bl in i)
    );
  },
  Ip = vt("Date"),
  Mp = vt("File"),
  Bp = vt("Blob"),
  Hp = vt("FileList"),
  $p = (i) => no(i) && Xe(i.pipe),
  Vp = (i) => {
    let u;
    return (
      i &&
      ((typeof FormData == "function" && i instanceof FormData) ||
        (Xe(i.append) &&
          ((u = eo(i)) === "formdata" ||
            (u === "object" &&
              Xe(i.toString) &&
              i.toString() === "[object FormData]"))))
    );
  },
  Wp = vt("URLSearchParams"),
  [Qp, qp, Kp, Jp] = ["ReadableStream", "Request", "Response", "Headers"].map(
    vt,
  ),
  Xp = (i) =>
    i.trim ? i.trim() : i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Dr(i, u, { allOwnKeys: s = !1 } = {}) {
  if (i === null || typeof i > "u") return;
  let c, f;
  if ((typeof i != "object" && (i = [i]), Qn(i)))
    for (c = 0, f = i.length; c < f; c++) u.call(null, i[c], c, i);
  else {
    const p = s ? Object.getOwnPropertyNames(i) : Object.keys(i),
      y = p.length;
    let k;
    for (c = 0; c < y; c++) (k = p[c]), u.call(null, i[k], k, i);
  }
}
function ef(i, u) {
  u = u.toLowerCase();
  const s = Object.keys(i);
  let c = s.length,
    f;
  for (; c-- > 0; ) if (((f = s[c]), u === f.toLowerCase())) return f;
  return null;
}
const yn =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  tf = (i) => !jr(i) && i !== yn;
function mu() {
  const { caseless: i } = (tf(this) && this) || {},
    u = {},
    s = (c, f) => {
      const p = (i && ef(u, f)) || f;
      Jl(u[p]) && Jl(c)
        ? (u[p] = mu(u[p], c))
        : Jl(c)
          ? (u[p] = mu({}, c))
          : Qn(c)
            ? (u[p] = c.slice())
            : (u[p] = c);
    };
  for (let c = 0, f = arguments.length; c < f; c++)
    arguments[c] && Dr(arguments[c], s);
  return u;
}
const Yp = (i, u, s, { allOwnKeys: c } = {}) => (
    Dr(
      u,
      (f, p) => {
        s && Xe(f) ? (i[p] = Yc(f, s)) : (i[p] = f);
      },
      { allOwnKeys: c },
    ),
    i
  ),
  Gp = (i) => (i.charCodeAt(0) === 65279 && (i = i.slice(1)), i),
  Zp = (i, u, s, c) => {
    (i.prototype = Object.create(u.prototype, c)),
      (i.prototype.constructor = i),
      Object.defineProperty(i, "super", { value: u.prototype }),
      s && Object.assign(i.prototype, s);
  },
  bp = (i, u, s, c) => {
    let f, p, y;
    const k = {};
    if (((u = u || {}), i == null)) return u;
    do {
      for (f = Object.getOwnPropertyNames(i), p = f.length; p-- > 0; )
        (y = f[p]), (!c || c(y, i, u)) && !k[y] && ((u[y] = i[y]), (k[y] = !0));
      i = s !== !1 && xu(i);
    } while (i && (!s || s(i, u)) && i !== Object.prototype);
    return u;
  },
  eh = (i, u, s) => {
    (i = String(i)),
      (s === void 0 || s > i.length) && (s = i.length),
      (s -= u.length);
    const c = i.indexOf(u, s);
    return c !== -1 && c === s;
  },
  th = (i) => {
    if (!i) return null;
    if (Qn(i)) return i;
    let u = i.length;
    if (!bc(u)) return null;
    const s = new Array(u);
    for (; u-- > 0; ) s[u] = i[u];
    return s;
  },
  nh = (
    (i) => (u) =>
      i && u instanceof i
  )(typeof Uint8Array < "u" && xu(Uint8Array)),
  rh = (i, u) => {
    const c = (i && i[bl]).call(i);
    let f;
    for (; (f = c.next()) && !f.done; ) {
      const p = f.value;
      u.call(i, p[0], p[1]);
    }
  },
  lh = (i, u) => {
    let s;
    const c = [];
    for (; (s = i.exec(u)) !== null; ) c.push(s);
    return c;
  },
  oh = vt("HTMLFormElement"),
  ih = (i) =>
    i.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (s, c, f) {
      return c.toUpperCase() + f;
    }),
  Fc = (
    ({ hasOwnProperty: i }) =>
    (u, s) =>
      i.call(u, s)
  )(Object.prototype),
  uh = vt("RegExp"),
  nf = (i, u) => {
    const s = Object.getOwnPropertyDescriptors(i),
      c = {};
    Dr(s, (f, p) => {
      let y;
      (y = u(f, p, i)) !== !1 && (c[p] = y || f);
    }),
      Object.defineProperties(i, c);
  },
  sh = (i) => {
    nf(i, (u, s) => {
      if (Xe(i) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
        return !1;
      const c = i[s];
      if (Xe(c)) {
        if (((u.enumerable = !1), "writable" in u)) {
          u.writable = !1;
          return;
        }
        u.set ||
          (u.set = () => {
            throw Error("Can not rewrite read-only method '" + s + "'");
          });
      }
    });
  },
  ah = (i, u) => {
    const s = {},
      c = (f) => {
        f.forEach((p) => {
          s[p] = !0;
        });
      };
    return Qn(i) ? c(i) : c(String(i).split(u)), s;
  },
  ch = () => {},
  fh = (i, u) => (i != null && Number.isFinite((i = +i)) ? i : u);
function dh(i) {
  return !!(i && Xe(i.append) && i[Gc] === "FormData" && i[bl]);
}
const ph = (i) => {
    const u = new Array(10),
      s = (c, f) => {
        if (no(c)) {
          if (u.indexOf(c) >= 0) return;
          if (!("toJSON" in c)) {
            u[f] = c;
            const p = Qn(c) ? [] : {};
            return (
              Dr(c, (y, k) => {
                const P = s(y, f + 1);
                !jr(P) && (p[k] = P);
              }),
              (u[f] = void 0),
              p
            );
          }
        }
        return c;
      };
    return s(i, 0);
  },
  hh = vt("AsyncFunction"),
  mh = (i) => i && (no(i) || Xe(i)) && Xe(i.then) && Xe(i.catch),
  rf = ((i, u) =>
    i
      ? setImmediate
      : u
        ? ((s, c) => (
            yn.addEventListener(
              "message",
              ({ source: f, data: p }) => {
                f === yn && p === s && c.length && c.shift()();
              },
              !1,
            ),
            (f) => {
              c.push(f), yn.postMessage(s, "*");
            }
          ))(`axios@${Math.random()}`, [])
        : (s) => setTimeout(s))(
    typeof setImmediate == "function",
    Xe(yn.postMessage),
  ),
  yh =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(yn)
      : (typeof process < "u" && process.nextTick) || rf,
  vh = (i) => i != null && Xe(i[bl]),
  E = {
    isArray: Qn,
    isArrayBuffer: Zc,
    isBuffer: jp,
    isFormData: Vp,
    isArrayBufferView: Dp,
    isString: Ap,
    isNumber: bc,
    isBoolean: Up,
    isObject: no,
    isPlainObject: Jl,
    isReadableStream: Qp,
    isRequest: qp,
    isResponse: Kp,
    isHeaders: Jp,
    isUndefined: jr,
    isDate: Ip,
    isFile: Mp,
    isBlob: Bp,
    isRegExp: uh,
    isFunction: Xe,
    isStream: $p,
    isURLSearchParams: Wp,
    isTypedArray: nh,
    isFileList: Hp,
    forEach: Dr,
    merge: mu,
    extend: Yp,
    trim: Xp,
    stripBOM: Gp,
    inherits: Zp,
    toFlatObject: bp,
    kindOf: eo,
    kindOfTest: vt,
    endsWith: eh,
    toArray: th,
    forEachEntry: rh,
    matchAll: lh,
    isHTMLForm: oh,
    hasOwnProperty: Fc,
    hasOwnProp: Fc,
    reduceDescriptors: nf,
    freezeMethods: sh,
    toObjectSet: ah,
    toCamelCase: ih,
    noop: ch,
    toFiniteNumber: fh,
    findKey: ef,
    global: yn,
    isContextDefined: tf,
    isSpecCompliantForm: dh,
    toJSONObject: ph,
    isAsyncFn: hh,
    isThenable: mh,
    setImmediate: rf,
    asap: yh,
    isIterable: vh,
  };
function X(i, u, s, c, f) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = i),
    (this.name = "AxiosError"),
    u && (this.code = u),
    s && (this.config = s),
    c && (this.request = c),
    f && ((this.response = f), (this.status = f.status ? f.status : null));
}
E.inherits(X, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: E.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const lf = X.prototype,
  of = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((i) => {
  of[i] = { value: i };
});
Object.defineProperties(X, of);
Object.defineProperty(lf, "isAxiosError", { value: !0 });
X.from = (i, u, s, c, f, p) => {
  const y = Object.create(lf);
  return (
    E.toFlatObject(
      i,
      y,
      function (P) {
        return P !== Error.prototype;
      },
      (k) => k !== "isAxiosError",
    ),
    X.call(y, i.message, u, s, c, f),
    (y.cause = i),
    (y.name = i.name),
    p && Object.assign(y, p),
    y
  );
};
const gh = null;
function yu(i) {
  return E.isPlainObject(i) || E.isArray(i);
}
function uf(i) {
  return E.endsWith(i, "[]") ? i.slice(0, -2) : i;
}
function jc(i, u, s) {
  return i
    ? i
        .concat(u)
        .map(function (f, p) {
          return (f = uf(f)), !s && p ? "[" + f + "]" : f;
        })
        .join(s ? "." : "")
    : u;
}
function wh(i) {
  return E.isArray(i) && !i.some(yu);
}
const Sh = E.toFlatObject(E, {}, null, function (u) {
  return /^is[A-Z]/.test(u);
});
function ro(i, u, s) {
  if (!E.isObject(i)) throw new TypeError("target must be an object");
  (u = u || new FormData()),
    (s = E.toFlatObject(
      s,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (O, N) {
        return !E.isUndefined(N[O]);
      },
    ));
  const c = s.metaTokens,
    f = s.visitor || R,
    p = s.dots,
    y = s.indexes,
    P = (s.Blob || (typeof Blob < "u" && Blob)) && E.isSpecCompliantForm(u);
  if (!E.isFunction(f)) throw new TypeError("visitor must be a function");
  function _(A) {
    if (A === null) return "";
    if (E.isDate(A)) return A.toISOString();
    if (!P && E.isBlob(A))
      throw new X("Blob is not supported. Use a Buffer instead.");
    return E.isArrayBuffer(A) || E.isTypedArray(A)
      ? P && typeof Blob == "function"
        ? new Blob([A])
        : Buffer.from(A)
      : A;
  }
  function R(A, O, N) {
    let J = A;
    if (A && !N && typeof A == "object") {
      if (E.endsWith(O, "{}"))
        (O = c ? O : O.slice(0, -2)), (A = JSON.stringify(A));
      else if (
        (E.isArray(A) && wh(A)) ||
        ((E.isFileList(A) || E.endsWith(O, "[]")) && (J = E.toArray(A)))
      )
        return (
          (O = uf(O)),
          J.forEach(function (le, se) {
            !(E.isUndefined(le) || le === null) &&
              u.append(
                y === !0 ? jc([O], se, p) : y === null ? O : O + "[]",
                _(le),
              );
          }),
          !1
        );
    }
    return yu(A) ? !0 : (u.append(jc(N, O, p), _(A)), !1);
  }
  const F = [],
    H = Object.assign(Sh, {
      defaultVisitor: R,
      convertValue: _,
      isVisitable: yu,
    });
  function Z(A, O) {
    if (!E.isUndefined(A)) {
      if (F.indexOf(A) !== -1)
        throw Error("Circular reference detected in " + O.join("."));
      F.push(A),
        E.forEach(A, function (J, te) {
          (!(E.isUndefined(J) || J === null) &&
            f.call(u, J, E.isString(te) ? te.trim() : te, O, H)) === !0 &&
            Z(J, O ? O.concat(te) : [te]);
        }),
        F.pop();
    }
  }
  if (!E.isObject(i)) throw new TypeError("data must be an object");
  return Z(i), u;
}
function Dc(i) {
  const u = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(i).replace(/[!'()~]|%20|%00/g, function (c) {
    return u[c];
  });
}
function Cu(i, u) {
  (this._pairs = []), i && ro(i, this, u);
}
const sf = Cu.prototype;
sf.append = function (u, s) {
  this._pairs.push([u, s]);
};
sf.toString = function (u) {
  const s = u
    ? function (c) {
        return u.call(this, c, Dc);
      }
    : Dc;
  return this._pairs
    .map(function (f) {
      return s(f[0]) + "=" + s(f[1]);
    }, "")
    .join("&");
};
function Eh(i) {
  return encodeURIComponent(i)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function af(i, u, s) {
  if (!u) return i;
  const c = (s && s.encode) || Eh;
  E.isFunction(s) && (s = { serialize: s });
  const f = s && s.serialize;
  let p;
  if (
    (f
      ? (p = f(u, s))
      : (p = E.isURLSearchParams(u) ? u.toString() : new Cu(u, s).toString(c)),
    p)
  ) {
    const y = i.indexOf("#");
    y !== -1 && (i = i.slice(0, y)),
      (i += (i.indexOf("?") === -1 ? "?" : "&") + p);
  }
  return i;
}
class Ac {
  constructor() {
    this.handlers = [];
  }
  use(u, s, c) {
    return (
      this.handlers.push({
        fulfilled: u,
        rejected: s,
        synchronous: c ? c.synchronous : !1,
        runWhen: c ? c.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(u) {
    this.handlers[u] && (this.handlers[u] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(u) {
    E.forEach(this.handlers, function (c) {
      c !== null && u(c);
    });
  }
}
const cf = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  kh = typeof URLSearchParams < "u" ? URLSearchParams : Cu,
  xh = typeof FormData < "u" ? FormData : null,
  Ch = typeof Blob < "u" ? Blob : null,
  _h = {
    isBrowser: !0,
    classes: { URLSearchParams: kh, FormData: xh, Blob: Ch },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  _u = typeof window < "u" && typeof document < "u",
  vu = (typeof navigator == "object" && navigator) || void 0,
  Rh =
    _u &&
    (!vu || ["ReactNative", "NativeScript", "NS"].indexOf(vu.product) < 0),
  Th =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Ph = (_u && window.location.href) || "http://localhost",
  Nh = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: _u,
        hasStandardBrowserEnv: Rh,
        hasStandardBrowserWebWorkerEnv: Th,
        navigator: vu,
        origin: Ph,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Ue = { ...Nh, ..._h };
function Oh(i, u) {
  return ro(
    i,
    new Ue.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (s, c, f, p) {
          return Ue.isNode && E.isBuffer(s)
            ? (this.append(c, s.toString("base64")), !1)
            : p.defaultVisitor.apply(this, arguments);
        },
      },
      u,
    ),
  );
}
function Lh(i) {
  return E.matchAll(/\w+|\[(\w*)]/g, i).map((u) =>
    u[0] === "[]" ? "" : u[1] || u[0],
  );
}
function zh(i) {
  const u = {},
    s = Object.keys(i);
  let c;
  const f = s.length;
  let p;
  for (c = 0; c < f; c++) (p = s[c]), (u[p] = i[p]);
  return u;
}
function ff(i) {
  function u(s, c, f, p) {
    let y = s[p++];
    if (y === "__proto__") return !0;
    const k = Number.isFinite(+y),
      P = p >= s.length;
    return (
      (y = !y && E.isArray(f) ? f.length : y),
      P
        ? (E.hasOwnProp(f, y) ? (f[y] = [f[y], c]) : (f[y] = c), !k)
        : ((!f[y] || !E.isObject(f[y])) && (f[y] = []),
          u(s, c, f[y], p) && E.isArray(f[y]) && (f[y] = zh(f[y])),
          !k)
    );
  }
  if (E.isFormData(i) && E.isFunction(i.entries)) {
    const s = {};
    return (
      E.forEachEntry(i, (c, f) => {
        u(Lh(c), f, s, 0);
      }),
      s
    );
  }
  return null;
}
function Fh(i, u, s) {
  if (E.isString(i))
    try {
      return (u || JSON.parse)(i), E.trim(i);
    } catch (c) {
      if (c.name !== "SyntaxError") throw c;
    }
  return (s || JSON.stringify)(i);
}
const Ar = {
  transitional: cf,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (u, s) {
      const c = s.getContentType() || "",
        f = c.indexOf("application/json") > -1,
        p = E.isObject(u);
      if ((p && E.isHTMLForm(u) && (u = new FormData(u)), E.isFormData(u)))
        return f ? JSON.stringify(ff(u)) : u;
      if (
        E.isArrayBuffer(u) ||
        E.isBuffer(u) ||
        E.isStream(u) ||
        E.isFile(u) ||
        E.isBlob(u) ||
        E.isReadableStream(u)
      )
        return u;
      if (E.isArrayBufferView(u)) return u.buffer;
      if (E.isURLSearchParams(u))
        return (
          s.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          u.toString()
        );
      let k;
      if (p) {
        if (c.indexOf("application/x-www-form-urlencoded") > -1)
          return Oh(u, this.formSerializer).toString();
        if ((k = E.isFileList(u)) || c.indexOf("multipart/form-data") > -1) {
          const P = this.env && this.env.FormData;
          return ro(
            k ? { "files[]": u } : u,
            P && new P(),
            this.formSerializer,
          );
        }
      }
      return p || f ? (s.setContentType("application/json", !1), Fh(u)) : u;
    },
  ],
  transformResponse: [
    function (u) {
      const s = this.transitional || Ar.transitional,
        c = s && s.forcedJSONParsing,
        f = this.responseType === "json";
      if (E.isResponse(u) || E.isReadableStream(u)) return u;
      if (u && E.isString(u) && ((c && !this.responseType) || f)) {
        const y = !(s && s.silentJSONParsing) && f;
        try {
          return JSON.parse(u);
        } catch (k) {
          if (y)
            throw k.name === "SyntaxError"
              ? X.from(k, X.ERR_BAD_RESPONSE, this, null, this.response)
              : k;
        }
      }
      return u;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Ue.classes.FormData, Blob: Ue.classes.Blob },
  validateStatus: function (u) {
    return u >= 200 && u < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
E.forEach(["delete", "get", "head", "post", "put", "patch"], (i) => {
  Ar.headers[i] = {};
});
const jh = E.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Dh = (i) => {
    const u = {};
    let s, c, f;
    return (
      i &&
        i
          .split(
            `
`,
          )
          .forEach(function (y) {
            (f = y.indexOf(":")),
              (s = y.substring(0, f).trim().toLowerCase()),
              (c = y.substring(f + 1).trim()),
              !(!s || (u[s] && jh[s])) &&
                (s === "set-cookie"
                  ? u[s]
                    ? u[s].push(c)
                    : (u[s] = [c])
                  : (u[s] = u[s] ? u[s] + ", " + c : c));
          }),
      u
    );
  },
  Uc = Symbol("internals");
function Fr(i) {
  return i && String(i).trim().toLowerCase();
}
function Xl(i) {
  return i === !1 || i == null ? i : E.isArray(i) ? i.map(Xl) : String(i);
}
function Ah(i) {
  const u = Object.create(null),
    s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let c;
  for (; (c = s.exec(i)); ) u[c[1]] = c[2];
  return u;
}
const Uh = (i) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(i.trim());
function cu(i, u, s, c, f) {
  if (E.isFunction(c)) return c.call(this, u, s);
  if ((f && (u = s), !!E.isString(u))) {
    if (E.isString(c)) return u.indexOf(c) !== -1;
    if (E.isRegExp(c)) return c.test(u);
  }
}
function Ih(i) {
  return i
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (u, s, c) => s.toUpperCase() + c);
}
function Mh(i, u) {
  const s = E.toCamelCase(" " + u);
  ["get", "set", "has"].forEach((c) => {
    Object.defineProperty(i, c + s, {
      value: function (f, p, y) {
        return this[c].call(this, u, f, p, y);
      },
      configurable: !0,
    });
  });
}
let Ye = class {
  constructor(u) {
    u && this.set(u);
  }
  set(u, s, c) {
    const f = this;
    function p(k, P, _) {
      const R = Fr(P);
      if (!R) throw new Error("header name must be a non-empty string");
      const F = E.findKey(f, R);
      (!F || f[F] === void 0 || _ === !0 || (_ === void 0 && f[F] !== !1)) &&
        (f[F || P] = Xl(k));
    }
    const y = (k, P) => E.forEach(k, (_, R) => p(_, R, P));
    if (E.isPlainObject(u) || u instanceof this.constructor) y(u, s);
    else if (E.isString(u) && (u = u.trim()) && !Uh(u)) y(Dh(u), s);
    else if (E.isObject(u) && E.isIterable(u)) {
      let k = {},
        P,
        _;
      for (const R of u) {
        if (!E.isArray(R))
          throw TypeError("Object iterator must return a key-value pair");
        k[(_ = R[0])] = (P = k[_])
          ? E.isArray(P)
            ? [...P, R[1]]
            : [P, R[1]]
          : R[1];
      }
      y(k, s);
    } else u != null && p(s, u, c);
    return this;
  }
  get(u, s) {
    if (((u = Fr(u)), u)) {
      const c = E.findKey(this, u);
      if (c) {
        const f = this[c];
        if (!s) return f;
        if (s === !0) return Ah(f);
        if (E.isFunction(s)) return s.call(this, f, c);
        if (E.isRegExp(s)) return s.exec(f);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(u, s) {
    if (((u = Fr(u)), u)) {
      const c = E.findKey(this, u);
      return !!(c && this[c] !== void 0 && (!s || cu(this, this[c], c, s)));
    }
    return !1;
  }
  delete(u, s) {
    const c = this;
    let f = !1;
    function p(y) {
      if (((y = Fr(y)), y)) {
        const k = E.findKey(c, y);
        k && (!s || cu(c, c[k], k, s)) && (delete c[k], (f = !0));
      }
    }
    return E.isArray(u) ? u.forEach(p) : p(u), f;
  }
  clear(u) {
    const s = Object.keys(this);
    let c = s.length,
      f = !1;
    for (; c--; ) {
      const p = s[c];
      (!u || cu(this, this[p], p, u, !0)) && (delete this[p], (f = !0));
    }
    return f;
  }
  normalize(u) {
    const s = this,
      c = {};
    return (
      E.forEach(this, (f, p) => {
        const y = E.findKey(c, p);
        if (y) {
          (s[y] = Xl(f)), delete s[p];
          return;
        }
        const k = u ? Ih(p) : String(p).trim();
        k !== p && delete s[p], (s[k] = Xl(f)), (c[k] = !0);
      }),
      this
    );
  }
  concat(...u) {
    return this.constructor.concat(this, ...u);
  }
  toJSON(u) {
    const s = Object.create(null);
    return (
      E.forEach(this, (c, f) => {
        c != null && c !== !1 && (s[f] = u && E.isArray(c) ? c.join(", ") : c);
      }),
      s
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([u, s]) => u + ": " + s).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(u) {
    return u instanceof this ? u : new this(u);
  }
  static concat(u, ...s) {
    const c = new this(u);
    return s.forEach((f) => c.set(f)), c;
  }
  static accessor(u) {
    const c = (this[Uc] = this[Uc] = { accessors: {} }).accessors,
      f = this.prototype;
    function p(y) {
      const k = Fr(y);
      c[k] || (Mh(f, y), (c[k] = !0));
    }
    return E.isArray(u) ? u.forEach(p) : p(u), this;
  }
};
Ye.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
E.reduceDescriptors(Ye.prototype, ({ value: i }, u) => {
  let s = u[0].toUpperCase() + u.slice(1);
  return {
    get: () => i,
    set(c) {
      this[s] = c;
    },
  };
});
E.freezeMethods(Ye);
function fu(i, u) {
  const s = this || Ar,
    c = u || s,
    f = Ye.from(c.headers);
  let p = c.data;
  return (
    E.forEach(i, function (k) {
      p = k.call(s, p, f.normalize(), u ? u.status : void 0);
    }),
    f.normalize(),
    p
  );
}
function df(i) {
  return !!(i && i.__CANCEL__);
}
function qn(i, u, s) {
  X.call(this, i ?? "canceled", X.ERR_CANCELED, u, s),
    (this.name = "CanceledError");
}
E.inherits(qn, X, { __CANCEL__: !0 });
function pf(i, u, s) {
  const c = s.config.validateStatus;
  !s.status || !c || c(s.status)
    ? i(s)
    : u(
        new X(
          "Request failed with status code " + s.status,
          [X.ERR_BAD_REQUEST, X.ERR_BAD_RESPONSE][
            Math.floor(s.status / 100) - 4
          ],
          s.config,
          s.request,
          s,
        ),
      );
}
function Bh(i) {
  const u = /^([-+\w]{1,25})(:?\/\/|:)/.exec(i);
  return (u && u[1]) || "";
}
function Hh(i, u) {
  i = i || 10;
  const s = new Array(i),
    c = new Array(i);
  let f = 0,
    p = 0,
    y;
  return (
    (u = u !== void 0 ? u : 1e3),
    function (P) {
      const _ = Date.now(),
        R = c[p];
      y || (y = _), (s[f] = P), (c[f] = _);
      let F = p,
        H = 0;
      for (; F !== f; ) (H += s[F++]), (F = F % i);
      if (((f = (f + 1) % i), f === p && (p = (p + 1) % i), _ - y < u)) return;
      const Z = R && _ - R;
      return Z ? Math.round((H * 1e3) / Z) : void 0;
    }
  );
}
function $h(i, u) {
  let s = 0,
    c = 1e3 / u,
    f,
    p;
  const y = (_, R = Date.now()) => {
    (s = R), (f = null), p && (clearTimeout(p), (p = null)), i.apply(null, _);
  };
  return [
    (..._) => {
      const R = Date.now(),
        F = R - s;
      F >= c
        ? y(_, R)
        : ((f = _),
          p ||
            (p = setTimeout(() => {
              (p = null), y(f);
            }, c - F)));
    },
    () => f && y(f),
  ];
}
const Gl = (i, u, s = 3) => {
    let c = 0;
    const f = Hh(50, 250);
    return $h((p) => {
      const y = p.loaded,
        k = p.lengthComputable ? p.total : void 0,
        P = y - c,
        _ = f(P),
        R = y <= k;
      c = y;
      const F = {
        loaded: y,
        total: k,
        progress: k ? y / k : void 0,
        bytes: P,
        rate: _ || void 0,
        estimated: _ && k && R ? (k - y) / _ : void 0,
        event: p,
        lengthComputable: k != null,
        [u ? "download" : "upload"]: !0,
      };
      i(F);
    }, s);
  },
  Ic = (i, u) => {
    const s = i != null;
    return [(c) => u[0]({ lengthComputable: s, total: i, loaded: c }), u[1]];
  },
  Mc =
    (i) =>
    (...u) =>
      E.asap(() => i(...u)),
  Vh = Ue.hasStandardBrowserEnv
    ? ((i, u) => (s) => (
        (s = new URL(s, Ue.origin)),
        i.protocol === s.protocol &&
          i.host === s.host &&
          (u || i.port === s.port)
      ))(
        new URL(Ue.origin),
        Ue.navigator && /(msie|trident)/i.test(Ue.navigator.userAgent),
      )
    : () => !0,
  Wh = Ue.hasStandardBrowserEnv
    ? {
        write(i, u, s, c, f, p) {
          const y = [i + "=" + encodeURIComponent(u)];
          E.isNumber(s) && y.push("expires=" + new Date(s).toGMTString()),
            E.isString(c) && y.push("path=" + c),
            E.isString(f) && y.push("domain=" + f),
            p === !0 && y.push("secure"),
            (document.cookie = y.join("; "));
        },
        read(i) {
          const u = document.cookie.match(
            new RegExp("(^|;\\s*)(" + i + ")=([^;]*)"),
          );
          return u ? decodeURIComponent(u[3]) : null;
        },
        remove(i) {
          this.write(i, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Qh(i) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(i);
}
function qh(i, u) {
  return u ? i.replace(/\/?\/$/, "") + "/" + u.replace(/^\/+/, "") : i;
}
function hf(i, u, s) {
  let c = !Qh(u);
  return i && (c || s == !1) ? qh(i, u) : u;
}
const Bc = (i) => (i instanceof Ye ? { ...i } : i);
function gn(i, u) {
  u = u || {};
  const s = {};
  function c(_, R, F, H) {
    return E.isPlainObject(_) && E.isPlainObject(R)
      ? E.merge.call({ caseless: H }, _, R)
      : E.isPlainObject(R)
        ? E.merge({}, R)
        : E.isArray(R)
          ? R.slice()
          : R;
  }
  function f(_, R, F, H) {
    if (E.isUndefined(R)) {
      if (!E.isUndefined(_)) return c(void 0, _, F, H);
    } else return c(_, R, F, H);
  }
  function p(_, R) {
    if (!E.isUndefined(R)) return c(void 0, R);
  }
  function y(_, R) {
    if (E.isUndefined(R)) {
      if (!E.isUndefined(_)) return c(void 0, _);
    } else return c(void 0, R);
  }
  function k(_, R, F) {
    if (F in u) return c(_, R);
    if (F in i) return c(void 0, _);
  }
  const P = {
    url: p,
    method: p,
    data: p,
    baseURL: y,
    transformRequest: y,
    transformResponse: y,
    paramsSerializer: y,
    timeout: y,
    timeoutMessage: y,
    withCredentials: y,
    withXSRFToken: y,
    adapter: y,
    responseType: y,
    xsrfCookieName: y,
    xsrfHeaderName: y,
    onUploadProgress: y,
    onDownloadProgress: y,
    decompress: y,
    maxContentLength: y,
    maxBodyLength: y,
    beforeRedirect: y,
    transport: y,
    httpAgent: y,
    httpsAgent: y,
    cancelToken: y,
    socketPath: y,
    responseEncoding: y,
    validateStatus: k,
    headers: (_, R, F) => f(Bc(_), Bc(R), F, !0),
  };
  return (
    E.forEach(Object.keys(Object.assign({}, i, u)), function (R) {
      const F = P[R] || f,
        H = F(i[R], u[R], R);
      (E.isUndefined(H) && F !== k) || (s[R] = H);
    }),
    s
  );
}
const mf = (i) => {
    const u = gn({}, i);
    let {
      data: s,
      withXSRFToken: c,
      xsrfHeaderName: f,
      xsrfCookieName: p,
      headers: y,
      auth: k,
    } = u;
    (u.headers = y = Ye.from(y)),
      (u.url = af(
        hf(u.baseURL, u.url, u.allowAbsoluteUrls),
        i.params,
        i.paramsSerializer,
      )),
      k &&
        y.set(
          "Authorization",
          "Basic " +
            btoa(
              (k.username || "") +
                ":" +
                (k.password ? unescape(encodeURIComponent(k.password)) : ""),
            ),
        );
    let P;
    if (E.isFormData(s)) {
      if (Ue.hasStandardBrowserEnv || Ue.hasStandardBrowserWebWorkerEnv)
        y.setContentType(void 0);
      else if ((P = y.getContentType()) !== !1) {
        const [_, ...R] = P
          ? P.split(";")
              .map((F) => F.trim())
              .filter(Boolean)
          : [];
        y.setContentType([_ || "multipart/form-data", ...R].join("; "));
      }
    }
    if (
      Ue.hasStandardBrowserEnv &&
      (c && E.isFunction(c) && (c = c(u)), c || (c !== !1 && Vh(u.url)))
    ) {
      const _ = f && p && Wh.read(p);
      _ && y.set(f, _);
    }
    return u;
  },
  Kh = typeof XMLHttpRequest < "u",
  Jh =
    Kh &&
    function (i) {
      return new Promise(function (s, c) {
        const f = mf(i);
        let p = f.data;
        const y = Ye.from(f.headers).normalize();
        let { responseType: k, onUploadProgress: P, onDownloadProgress: _ } = f,
          R,
          F,
          H,
          Z,
          A;
        function O() {
          Z && Z(),
            A && A(),
            f.cancelToken && f.cancelToken.unsubscribe(R),
            f.signal && f.signal.removeEventListener("abort", R);
        }
        let N = new XMLHttpRequest();
        N.open(f.method.toUpperCase(), f.url, !0), (N.timeout = f.timeout);
        function J() {
          if (!N) return;
          const le = Ye.from(
              "getAllResponseHeaders" in N && N.getAllResponseHeaders(),
            ),
            ae = {
              data:
                !k || k === "text" || k === "json"
                  ? N.responseText
                  : N.response,
              status: N.status,
              statusText: N.statusText,
              headers: le,
              config: i,
              request: N,
            };
          pf(
            function (we) {
              s(we), O();
            },
            function (we) {
              c(we), O();
            },
            ae,
          ),
            (N = null);
        }
        "onloadend" in N
          ? (N.onloadend = J)
          : (N.onreadystatechange = function () {
              !N ||
                N.readyState !== 4 ||
                (N.status === 0 &&
                  !(N.responseURL && N.responseURL.indexOf("file:") === 0)) ||
                setTimeout(J);
            }),
          (N.onabort = function () {
            N &&
              (c(new X("Request aborted", X.ECONNABORTED, i, N)), (N = null));
          }),
          (N.onerror = function () {
            c(new X("Network Error", X.ERR_NETWORK, i, N)), (N = null);
          }),
          (N.ontimeout = function () {
            let se = f.timeout
              ? "timeout of " + f.timeout + "ms exceeded"
              : "timeout exceeded";
            const ae = f.transitional || cf;
            f.timeoutErrorMessage && (se = f.timeoutErrorMessage),
              c(
                new X(
                  se,
                  ae.clarifyTimeoutError ? X.ETIMEDOUT : X.ECONNABORTED,
                  i,
                  N,
                ),
              ),
              (N = null);
          }),
          p === void 0 && y.setContentType(null),
          "setRequestHeader" in N &&
            E.forEach(y.toJSON(), function (se, ae) {
              N.setRequestHeader(ae, se);
            }),
          E.isUndefined(f.withCredentials) ||
            (N.withCredentials = !!f.withCredentials),
          k && k !== "json" && (N.responseType = f.responseType),
          _ && (([H, A] = Gl(_, !0)), N.addEventListener("progress", H)),
          P &&
            N.upload &&
            (([F, Z] = Gl(P)),
            N.upload.addEventListener("progress", F),
            N.upload.addEventListener("loadend", Z)),
          (f.cancelToken || f.signal) &&
            ((R = (le) => {
              N &&
                (c(!le || le.type ? new qn(null, i, N) : le),
                N.abort(),
                (N = null));
            }),
            f.cancelToken && f.cancelToken.subscribe(R),
            f.signal &&
              (f.signal.aborted ? R() : f.signal.addEventListener("abort", R)));
        const te = Bh(f.url);
        if (te && Ue.protocols.indexOf(te) === -1) {
          c(new X("Unsupported protocol " + te + ":", X.ERR_BAD_REQUEST, i));
          return;
        }
        N.send(p || null);
      });
    },
  Xh = (i, u) => {
    const { length: s } = (i = i ? i.filter(Boolean) : []);
    if (u || s) {
      let c = new AbortController(),
        f;
      const p = function (_) {
        if (!f) {
          (f = !0), k();
          const R = _ instanceof Error ? _ : this.reason;
          c.abort(
            R instanceof X ? R : new qn(R instanceof Error ? R.message : R),
          );
        }
      };
      let y =
        u &&
        setTimeout(() => {
          (y = null), p(new X(`timeout ${u} of ms exceeded`, X.ETIMEDOUT));
        }, u);
      const k = () => {
        i &&
          (y && clearTimeout(y),
          (y = null),
          i.forEach((_) => {
            _.unsubscribe
              ? _.unsubscribe(p)
              : _.removeEventListener("abort", p);
          }),
          (i = null));
      };
      i.forEach((_) => _.addEventListener("abort", p));
      const { signal: P } = c;
      return (P.unsubscribe = () => E.asap(k)), P;
    }
  },
  Yh = function* (i, u) {
    let s = i.byteLength;
    if (s < u) {
      yield i;
      return;
    }
    let c = 0,
      f;
    for (; c < s; ) (f = c + u), yield i.slice(c, f), (c = f);
  },
  Gh = async function* (i, u) {
    for await (const s of Zh(i)) yield* Yh(s, u);
  },
  Zh = async function* (i) {
    if (i[Symbol.asyncIterator]) {
      yield* i;
      return;
    }
    const u = i.getReader();
    try {
      for (;;) {
        const { done: s, value: c } = await u.read();
        if (s) break;
        yield c;
      }
    } finally {
      await u.cancel();
    }
  },
  Hc = (i, u, s, c) => {
    const f = Gh(i, u);
    let p = 0,
      y,
      k = (P) => {
        y || ((y = !0), c && c(P));
      };
    return new ReadableStream(
      {
        async pull(P) {
          try {
            const { done: _, value: R } = await f.next();
            if (_) {
              k(), P.close();
              return;
            }
            let F = R.byteLength;
            if (s) {
              let H = (p += F);
              s(H);
            }
            P.enqueue(new Uint8Array(R));
          } catch (_) {
            throw (k(_), _);
          }
        },
        cancel(P) {
          return k(P), f.return();
        },
      },
      { highWaterMark: 2 },
    );
  },
  lo =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  yf = lo && typeof ReadableStream == "function",
  bh =
    lo &&
    (typeof TextEncoder == "function"
      ? (
          (i) => (u) =>
            i.encode(u)
        )(new TextEncoder())
      : async (i) => new Uint8Array(await new Response(i).arrayBuffer())),
  vf = (i, ...u) => {
    try {
      return !!i(...u);
    } catch {
      return !1;
    }
  },
  em =
    yf &&
    vf(() => {
      let i = !1;
      const u = new Request(Ue.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (i = !0), "half";
        },
      }).headers.has("Content-Type");
      return i && !u;
    }),
  $c = 64 * 1024,
  gu = yf && vf(() => E.isReadableStream(new Response("").body)),
  Zl = { stream: gu && ((i) => i.body) };
lo &&
  ((i) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((u) => {
      !Zl[u] &&
        (Zl[u] = E.isFunction(i[u])
          ? (s) => s[u]()
          : (s, c) => {
              throw new X(
                `Response type '${u}' is not supported`,
                X.ERR_NOT_SUPPORT,
                c,
              );
            });
    });
  })(new Response());
const tm = async (i) => {
    if (i == null) return 0;
    if (E.isBlob(i)) return i.size;
    if (E.isSpecCompliantForm(i))
      return (
        await new Request(Ue.origin, { method: "POST", body: i }).arrayBuffer()
      ).byteLength;
    if (E.isArrayBufferView(i) || E.isArrayBuffer(i)) return i.byteLength;
    if ((E.isURLSearchParams(i) && (i = i + ""), E.isString(i)))
      return (await bh(i)).byteLength;
  },
  nm = async (i, u) => {
    const s = E.toFiniteNumber(i.getContentLength());
    return s ?? tm(u);
  },
  rm =
    lo &&
    (async (i) => {
      let {
        url: u,
        method: s,
        data: c,
        signal: f,
        cancelToken: p,
        timeout: y,
        onDownloadProgress: k,
        onUploadProgress: P,
        responseType: _,
        headers: R,
        withCredentials: F = "same-origin",
        fetchOptions: H,
      } = mf(i);
      _ = _ ? (_ + "").toLowerCase() : "text";
      let Z = Xh([f, p && p.toAbortSignal()], y),
        A;
      const O =
        Z &&
        Z.unsubscribe &&
        (() => {
          Z.unsubscribe();
        });
      let N;
      try {
        if (
          P &&
          em &&
          s !== "get" &&
          s !== "head" &&
          (N = await nm(R, c)) !== 0
        ) {
          let ae = new Request(u, { method: "POST", body: c, duplex: "half" }),
            me;
          if (
            (E.isFormData(c) &&
              (me = ae.headers.get("content-type")) &&
              R.setContentType(me),
            ae.body)
          ) {
            const [we, Oe] = Ic(N, Gl(Mc(P)));
            c = Hc(ae.body, $c, we, Oe);
          }
        }
        E.isString(F) || (F = F ? "include" : "omit");
        const J = "credentials" in Request.prototype;
        A = new Request(u, {
          ...H,
          signal: Z,
          method: s.toUpperCase(),
          headers: R.normalize().toJSON(),
          body: c,
          duplex: "half",
          credentials: J ? F : void 0,
        });
        let te = await fetch(A);
        const le = gu && (_ === "stream" || _ === "response");
        if (gu && (k || (le && O))) {
          const ae = {};
          ["status", "statusText", "headers"].forEach((st) => {
            ae[st] = te[st];
          });
          const me = E.toFiniteNumber(te.headers.get("content-length")),
            [we, Oe] = (k && Ic(me, Gl(Mc(k), !0))) || [];
          te = new Response(
            Hc(te.body, $c, we, () => {
              Oe && Oe(), O && O();
            }),
            ae,
          );
        }
        _ = _ || "text";
        let se = await Zl[E.findKey(Zl, _) || "text"](te, i);
        return (
          !le && O && O(),
          await new Promise((ae, me) => {
            pf(ae, me, {
              data: se,
              headers: Ye.from(te.headers),
              status: te.status,
              statusText: te.statusText,
              config: i,
              request: A,
            });
          })
        );
      } catch (J) {
        throw (
          (O && O(),
          J && J.name === "TypeError" && /Load failed|fetch/i.test(J.message)
            ? Object.assign(new X("Network Error", X.ERR_NETWORK, i, A), {
                cause: J.cause || J,
              })
            : X.from(J, J && J.code, i, A))
        );
      }
    }),
  wu = { http: gh, xhr: Jh, fetch: rm };
E.forEach(wu, (i, u) => {
  if (i) {
    try {
      Object.defineProperty(i, "name", { value: u });
    } catch {}
    Object.defineProperty(i, "adapterName", { value: u });
  }
});
const Vc = (i) => `- ${i}`,
  lm = (i) => E.isFunction(i) || i === null || i === !1,
  gf = {
    getAdapter: (i) => {
      i = E.isArray(i) ? i : [i];
      const { length: u } = i;
      let s, c;
      const f = {};
      for (let p = 0; p < u; p++) {
        s = i[p];
        let y;
        if (
          ((c = s),
          !lm(s) && ((c = wu[(y = String(s)).toLowerCase()]), c === void 0))
        )
          throw new X(`Unknown adapter '${y}'`);
        if (c) break;
        f[y || "#" + p] = c;
      }
      if (!c) {
        const p = Object.entries(f).map(
          ([k, P]) =>
            `adapter ${k} ` +
            (P === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let y = u
          ? p.length > 1
            ? `since :
` +
              p.map(Vc).join(`
`)
            : " " + Vc(p[0])
          : "as no adapter specified";
        throw new X(
          "There is no suitable adapter to dispatch the request " + y,
          "ERR_NOT_SUPPORT",
        );
      }
      return c;
    },
    adapters: wu,
  };
function du(i) {
  if (
    (i.cancelToken && i.cancelToken.throwIfRequested(),
    i.signal && i.signal.aborted)
  )
    throw new qn(null, i);
}
function Wc(i) {
  return (
    du(i),
    (i.headers = Ye.from(i.headers)),
    (i.data = fu.call(i, i.transformRequest)),
    ["post", "put", "patch"].indexOf(i.method) !== -1 &&
      i.headers.setContentType("application/x-www-form-urlencoded", !1),
    gf
      .getAdapter(i.adapter || Ar.adapter)(i)
      .then(
        function (c) {
          return (
            du(i),
            (c.data = fu.call(i, i.transformResponse, c)),
            (c.headers = Ye.from(c.headers)),
            c
          );
        },
        function (c) {
          return (
            df(c) ||
              (du(i),
              c &&
                c.response &&
                ((c.response.data = fu.call(
                  i,
                  i.transformResponse,
                  c.response,
                )),
                (c.response.headers = Ye.from(c.response.headers)))),
            Promise.reject(c)
          );
        },
      )
  );
}
const wf = "1.9.0",
  oo = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (i, u) => {
    oo[i] = function (c) {
      return typeof c === i || "a" + (u < 1 ? "n " : " ") + i;
    };
  },
);
const Qc = {};
oo.transitional = function (u, s, c) {
  function f(p, y) {
    return (
      "[Axios v" +
      wf +
      "] Transitional option '" +
      p +
      "'" +
      y +
      (c ? ". " + c : "")
    );
  }
  return (p, y, k) => {
    if (u === !1)
      throw new X(
        f(y, " has been removed" + (s ? " in " + s : "")),
        X.ERR_DEPRECATED,
      );
    return (
      s &&
        !Qc[y] &&
        ((Qc[y] = !0),
        console.warn(
          f(
            y,
            " has been deprecated since v" +
              s +
              " and will be removed in the near future",
          ),
        )),
      u ? u(p, y, k) : !0
    );
  };
};
oo.spelling = function (u) {
  return (s, c) => (console.warn(`${c} is likely a misspelling of ${u}`), !0);
};
function om(i, u, s) {
  if (typeof i != "object")
    throw new X("options must be an object", X.ERR_BAD_OPTION_VALUE);
  const c = Object.keys(i);
  let f = c.length;
  for (; f-- > 0; ) {
    const p = c[f],
      y = u[p];
    if (y) {
      const k = i[p],
        P = k === void 0 || y(k, p, i);
      if (P !== !0)
        throw new X("option " + p + " must be " + P, X.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0) throw new X("Unknown option " + p, X.ERR_BAD_OPTION);
  }
}
const Yl = { assertOptions: om, validators: oo },
  _t = Yl.validators;
let vn = class {
  constructor(u) {
    (this.defaults = u || {}),
      (this.interceptors = { request: new Ac(), response: new Ac() });
  }
  async request(u, s) {
    try {
      return await this._request(u, s);
    } catch (c) {
      if (c instanceof Error) {
        let f = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(f)
          : (f = new Error());
        const p = f.stack ? f.stack.replace(/^.+\n/, "") : "";
        try {
          c.stack
            ? p &&
              !String(c.stack).endsWith(p.replace(/^.+\n.+\n/, "")) &&
              (c.stack +=
                `
` + p)
            : (c.stack = p);
        } catch {}
      }
      throw c;
    }
  }
  _request(u, s) {
    typeof u == "string" ? ((s = s || {}), (s.url = u)) : (s = u || {}),
      (s = gn(this.defaults, s));
    const { transitional: c, paramsSerializer: f, headers: p } = s;
    c !== void 0 &&
      Yl.assertOptions(
        c,
        {
          silentJSONParsing: _t.transitional(_t.boolean),
          forcedJSONParsing: _t.transitional(_t.boolean),
          clarifyTimeoutError: _t.transitional(_t.boolean),
        },
        !1,
      ),
      f != null &&
        (E.isFunction(f)
          ? (s.paramsSerializer = { serialize: f })
          : Yl.assertOptions(
              f,
              { encode: _t.function, serialize: _t.function },
              !0,
            )),
      s.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (s.allowAbsoluteUrls = !0)),
      Yl.assertOptions(
        s,
        {
          baseUrl: _t.spelling("baseURL"),
          withXsrfToken: _t.spelling("withXSRFToken"),
        },
        !0,
      ),
      (s.method = (s.method || this.defaults.method || "get").toLowerCase());
    let y = p && E.merge(p.common, p[s.method]);
    p &&
      E.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (A) => {
          delete p[A];
        },
      ),
      (s.headers = Ye.concat(y, p));
    const k = [];
    let P = !0;
    this.interceptors.request.forEach(function (O) {
      (typeof O.runWhen == "function" && O.runWhen(s) === !1) ||
        ((P = P && O.synchronous), k.unshift(O.fulfilled, O.rejected));
    });
    const _ = [];
    this.interceptors.response.forEach(function (O) {
      _.push(O.fulfilled, O.rejected);
    });
    let R,
      F = 0,
      H;
    if (!P) {
      const A = [Wc.bind(this), void 0];
      for (
        A.unshift.apply(A, k),
          A.push.apply(A, _),
          H = A.length,
          R = Promise.resolve(s);
        F < H;

      )
        R = R.then(A[F++], A[F++]);
      return R;
    }
    H = k.length;
    let Z = s;
    for (F = 0; F < H; ) {
      const A = k[F++],
        O = k[F++];
      try {
        Z = A(Z);
      } catch (N) {
        O.call(this, N);
        break;
      }
    }
    try {
      R = Wc.call(this, Z);
    } catch (A) {
      return Promise.reject(A);
    }
    for (F = 0, H = _.length; F < H; ) R = R.then(_[F++], _[F++]);
    return R;
  }
  getUri(u) {
    u = gn(this.defaults, u);
    const s = hf(u.baseURL, u.url, u.allowAbsoluteUrls);
    return af(s, u.params, u.paramsSerializer);
  }
};
E.forEach(["delete", "get", "head", "options"], function (u) {
  vn.prototype[u] = function (s, c) {
    return this.request(
      gn(c || {}, { method: u, url: s, data: (c || {}).data }),
    );
  };
});
E.forEach(["post", "put", "patch"], function (u) {
  function s(c) {
    return function (p, y, k) {
      return this.request(
        gn(k || {}, {
          method: u,
          headers: c ? { "Content-Type": "multipart/form-data" } : {},
          url: p,
          data: y,
        }),
      );
    };
  }
  (vn.prototype[u] = s()), (vn.prototype[u + "Form"] = s(!0));
});
let im = class Sf {
  constructor(u) {
    if (typeof u != "function")
      throw new TypeError("executor must be a function.");
    let s;
    this.promise = new Promise(function (p) {
      s = p;
    });
    const c = this;
    this.promise.then((f) => {
      if (!c._listeners) return;
      let p = c._listeners.length;
      for (; p-- > 0; ) c._listeners[p](f);
      c._listeners = null;
    }),
      (this.promise.then = (f) => {
        let p;
        const y = new Promise((k) => {
          c.subscribe(k), (p = k);
        }).then(f);
        return (
          (y.cancel = function () {
            c.unsubscribe(p);
          }),
          y
        );
      }),
      u(function (p, y, k) {
        c.reason || ((c.reason = new qn(p, y, k)), s(c.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(u) {
    if (this.reason) {
      u(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(u) : (this._listeners = [u]);
  }
  unsubscribe(u) {
    if (!this._listeners) return;
    const s = this._listeners.indexOf(u);
    s !== -1 && this._listeners.splice(s, 1);
  }
  toAbortSignal() {
    const u = new AbortController(),
      s = (c) => {
        u.abort(c);
      };
    return (
      this.subscribe(s),
      (u.signal.unsubscribe = () => this.unsubscribe(s)),
      u.signal
    );
  }
  static source() {
    let u;
    return {
      token: new Sf(function (f) {
        u = f;
      }),
      cancel: u,
    };
  }
};
function um(i) {
  return function (s) {
    return i.apply(null, s);
  };
}
function sm(i) {
  return E.isObject(i) && i.isAxiosError === !0;
}
const Su = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Su).forEach(([i, u]) => {
  Su[u] = i;
});
function Ef(i) {
  const u = new vn(i),
    s = Yc(vn.prototype.request, u);
  return (
    E.extend(s, vn.prototype, u, { allOwnKeys: !0 }),
    E.extend(s, u, null, { allOwnKeys: !0 }),
    (s.create = function (f) {
      return Ef(gn(i, f));
    }),
    s
  );
}
const he = Ef(Ar);
he.Axios = vn;
he.CanceledError = qn;
he.CancelToken = im;
he.isCancel = df;
he.VERSION = wf;
he.toFormData = ro;
he.AxiosError = X;
he.Cancel = he.CanceledError;
he.all = function (u) {
  return Promise.all(u);
};
he.spread = um;
he.isAxiosError = sm;
he.mergeConfig = gn;
he.AxiosHeaders = Ye;
he.formToJSON = (i) => ff(E.isHTMLForm(i) ? new FormData(i) : i);
he.getAdapter = gf.getAdapter;
he.HttpStatusCode = Su;
he.default = he;
const {
    Axios: Sm,
    AxiosError: Em,
    CanceledError: km,
    isCancel: xm,
    CancelToken: Cm,
    VERSION: _m,
    all: Rm,
    Cancel: Tm,
    isAxiosError: Pm,
    spread: Nm,
    toFormData: Om,
    AxiosHeaders: Lm,
    HttpStatusCode: zm,
    formToJSON: Fm,
    getAdapter: jm,
    mergeConfig: Dm,
  } = he,
  io = "/api/blogs";
let uo = null;
const am = (i) => {
    uo = `Bearer ${i}`;
  },
  cm = async () => (await he.get(io)).data,
  fm = async (i) => {
    const u = { headers: { Authorization: uo } };
    return (await he.post(io, i, u)).data;
  },
  dm = async (i, u) => {
    const s = { headers: { Authorization: uo } },
      c = { ...u, user: u.user.id };
    return (await he.put(`${io}/${i}`, c, s)).data;
  },
  pm = async (i) => {
    const u = { headers: { Authorization: uo } };
    await he.delete(`${io}/${i}`, u);
  },
  Wn = { getAll: cm, create: fm, updateBlog: dm, deleteBlog: pm, setToken: am },
  hm = "/api/login",
  mm = async ({ username: i, password: u }) =>
    (await he.post(hm, { username: i, password: u })).data,
  ym = { loginUser: mm },
  pu = "loggedInUser",
  vm = () => {
    const [i, u] = Be.useState([]),
      [s, c] = Be.useState(null),
      [f, p] = Be.useState(null),
      y = async () => {
        const O = await Wn.getAll();
        u(O);
      };
    Be.useEffect(() => {
      y();
    }, []),
      Be.useEffect(() => {
        const O = window.localStorage.getItem(pu);
        if (O !== null) {
          const N = JSON.parse(O);
          c(N), Wn.setToken(N.token);
        }
      }, []);
    const k = (O) => {
        p({ message: O, isError: !1 }),
          setTimeout(() => {
            p(null);
          }, 5e3);
      },
      P = (O) => {
        p({ message: O, isError: !0 }),
          setTimeout(() => {
            p(null);
          }, 5e3);
      },
      _ = async ({ username: O, password: N }) => {
        try {
          const J = await ym.loginUser({ username: O, password: N });
          return (
            p(null),
            window.localStorage.setItem(pu, JSON.stringify(J)),
            Wn.setToken(J.token),
            c(J),
            !0
          );
        } catch (J) {
          return (
            P("wrong username or password"),
            console.error("invalid username or password:", J.message),
            !1
          );
        }
      },
      R = () => {
        window.localStorage.removeItem(pu), c(null);
      },
      F = async ({ title: O, author: N, url: J }) => {
        try {
          return (
            await Wn.create({ title: O, author: N, url: J }),
            A.current.toggleVisibility(),
            k(`a new blog ${O} by ${N} added`),
            await y(),
            !0
          );
        } catch (te) {
          return (
            P("unable to create blog"),
            console.error("unable to create blog:", te.message),
            !1
          );
        }
      },
      H = async (O) => {
        const N = { ...O, likes: O.likes + 1 };
        await Wn.updateBlog(O.id, N), u(i.map((J) => (J.id === O.id ? N : J)));
      },
      Z = async (O) => {
        if (window.confirm(`Remove blog ${O.title} by ${O.author}`)) {
          try {
            await Wn.deleteBlog(O.id);
          } catch (N) {
            if (N.response.status === 401) {
              P(`unable to delete blog created by ${O.user.name}`);
              return;
            }
          }
          u(i.filter((N) => N.id !== O.id));
        }
      },
      A = Be.useRef();
    return s
      ? q.jsxs("div", {
          children: [
            q.jsx("h2", { children: "blogs" }),
            f && q.jsx(hu, { message: f.message, isError: f.isError }),
            q.jsxs("p", {
              children: [
                s.name,
                " logged in",
                q.jsx("button", { onClick: R, children: "logout" }),
              ],
            }),
            q.jsx(ku, {
              buttonLabel: "new note",
              ref: A,
              children: q.jsx(Xc, { tryCreateBlog: F }),
            }),
            i
              .sort((O, N) => N.likes - O.likes)
              .map((O) =>
                q.jsx(
                  Kc,
                  {
                    blog: O,
                    incrLikes: H,
                    canDeleteBlog: s.username === O.user.username,
                    tryDeleteBlog: Z,
                  },
                  O.id,
                ),
              ),
          ],
        })
      : q.jsxs("div", {
          children: [
            q.jsx("h2", { children: "log in to application" }),
            f && q.jsx(hu, { message: f.message, isError: f.isError }),
            q.jsx(Jc, { tryLoginUser: _ }),
          ],
        });
  };
Pp.createRoot(document.getElementById("root")).render(q.jsx(vm, {}));
