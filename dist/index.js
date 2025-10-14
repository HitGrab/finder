import xf, { createContext as k_, useContext as z_, useMemo as Of, useState as Tf, useImperativeHandle as K_, useRef as X_ } from "react";
function Ip(g) {
  return g;
}
function Sp(g) {
  return g;
}
function yp(g) {
  return g;
}
function wp(g) {
  return g;
}
function Ap(g) {
  return g;
}
function xp(g, u) {
  return { rules: g, onChange: u };
}
function Op(g, u) {
  return { haystack: g, onChange: u };
}
const bf = k_(null);
function Un() {
  const g = z_(bf);
  if (g === null)
    throw new Error("useFinder requires a FinderContext.");
  const [u] = g;
  return u;
}
var vi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ri = { exports: {} }, dr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mf;
function V_() {
  if (mf) return dr;
  mf = 1;
  var g = xf, u = Symbol.for("react.element"), i = Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, p = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(b, L, U) {
    var W, q = {}, he = null, ge = null;
    U !== void 0 && (he = "" + U), L.key !== void 0 && (he = "" + L.key), L.ref !== void 0 && (ge = L.ref);
    for (W in L) l.call(L, W) && !m.hasOwnProperty(W) && (q[W] = L[W]);
    if (b && b.defaultProps) for (W in L = b.defaultProps, L) q[W] === void 0 && (q[W] = L[W]);
    return { $$typeof: u, type: b, key: he, ref: ge, props: q, _owner: p.current };
  }
  return dr.Fragment = i, dr.jsx = w, dr.jsxs = w, dr;
}
var _r = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var If;
function J_() {
  return If || (If = 1, process.env.NODE_ENV !== "production" && (function() {
    var g = xf, u = Symbol.for("react.element"), i = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), b = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), q = Symbol.for("react.memo"), he = Symbol.for("react.lazy"), ge = Symbol.for("react.offscreen"), Ae = Symbol.iterator, dt = "@@iterator";
    function Te(c) {
      if (c === null || typeof c != "object")
        return null;
      var S = Ae && c[Ae] || c[dt];
      return typeof S == "function" ? S : null;
    }
    var pe = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function re(c) {
      {
        for (var S = arguments.length, A = new Array(S > 1 ? S - 1 : 0), N = 1; N < S; N++)
          A[N - 1] = arguments[N];
        xe("error", c, A);
      }
    }
    function xe(c, S, A) {
      {
        var N = pe.ReactDebugCurrentFrame, X = N.getStackAddendum();
        X !== "" && (S += "%s", A = A.concat([X]));
        var Z = A.map(function(k) {
          return String(k);
        });
        Z.unshift("Warning: " + S), Function.prototype.apply.call(console[c], console, Z);
      }
    }
    var st = !1, Oe = !1, Ce = !1, J = !1, ot = !1, Ut;
    Ut = Symbol.for("react.module.reference");
    function Bn(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === l || c === m || ot || c === p || c === U || c === W || J || c === ge || st || Oe || Ce || typeof c == "object" && c !== null && (c.$$typeof === he || c.$$typeof === q || c.$$typeof === w || c.$$typeof === b || c.$$typeof === L || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === Ut || c.getModuleId !== void 0));
    }
    function Wn(c, S, A) {
      var N = c.displayName;
      if (N)
        return N;
      var X = S.displayName || S.name || "";
      return X !== "" ? A + "(" + X + ")" : A;
    }
    function Er(c) {
      return c.displayName || "Context";
    }
    function _t(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && re("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case l:
          return "Fragment";
        case i:
          return "Portal";
        case m:
          return "Profiler";
        case p:
          return "StrictMode";
        case U:
          return "Suspense";
        case W:
          return "SuspenseList";
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case b:
            var S = c;
            return Er(S) + ".Consumer";
          case w:
            var A = c;
            return Er(A._context) + ".Provider";
          case L:
            return Wn(c, c.render, "ForwardRef");
          case q:
            var N = c.displayName || null;
            return N !== null ? N : _t(c.type) || "Memo";
          case he: {
            var X = c, Z = X._payload, k = X._init;
            try {
              return _t(k(Z));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var pt = Object.assign, Qt = 0, Tr, vt, ft, mr, jt, qe, Ir;
    function Sr() {
    }
    Sr.__reactDisabledLog = !0;
    function mi() {
      {
        if (Qt === 0) {
          Tr = console.log, vt = console.info, ft = console.warn, mr = console.error, jt = console.group, qe = console.groupCollapsed, Ir = console.groupEnd;
          var c = {
            configurable: !0,
            enumerable: !0,
            value: Sr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: c,
            log: c,
            warn: c,
            error: c,
            group: c,
            groupCollapsed: c,
            groupEnd: c
          });
        }
        Qt++;
      }
    }
    function Mt() {
      {
        if (Qt--, Qt === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: pt({}, c, {
              value: Tr
            }),
            info: pt({}, c, {
              value: vt
            }),
            warn: pt({}, c, {
              value: ft
            }),
            error: pt({}, c, {
              value: mr
            }),
            group: pt({}, c, {
              value: jt
            }),
            groupCollapsed: pt({}, c, {
              value: qe
            }),
            groupEnd: pt({}, c, {
              value: Ir
            })
          });
        }
        Qt < 0 && re("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Bt = pe.ReactCurrentDispatcher, Gn;
    function Rt(c, S, A) {
      {
        if (Gn === void 0)
          try {
            throw Error();
          } catch (X) {
            var N = X.stack.trim().match(/\n( *(at )?)/);
            Gn = N && N[1] || "";
          }
        return `
` + Gn + c;
      }
    }
    var St = !1, gn;
    {
      var dn = typeof WeakMap == "function" ? WeakMap : Map;
      gn = new dn();
    }
    function en(c, S) {
      if (!c || St)
        return "";
      {
        var A = gn.get(c);
        if (A !== void 0)
          return A;
      }
      var N;
      St = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Z;
      Z = Bt.current, Bt.current = null, mi();
      try {
        if (S) {
          var k = function() {
            throw Error();
          };
          if (Object.defineProperty(k.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(k, []);
            } catch (ve) {
              N = ve;
            }
            Reflect.construct(c, [], k);
          } else {
            try {
              k.call();
            } catch (ve) {
              N = ve;
            }
            c.call(k.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ve) {
            N = ve;
          }
          c();
        }
      } catch (ve) {
        if (ve && N && typeof ve.stack == "string") {
          for (var Y = ve.stack.split(`
`), Ie = N.stack.split(`
`), ue = Y.length - 1, le = Ie.length - 1; ue >= 1 && le >= 0 && Y[ue] !== Ie[le]; )
            le--;
          for (; ue >= 1 && le >= 0; ue--, le--)
            if (Y[ue] !== Ie[le]) {
              if (ue !== 1 || le !== 1)
                do
                  if (ue--, le--, le < 0 || Y[ue] !== Ie[le]) {
                    var Ue = `
` + Y[ue].replace(" at new ", " at ");
                    return c.displayName && Ue.includes("<anonymous>") && (Ue = Ue.replace("<anonymous>", c.displayName)), typeof c == "function" && gn.set(c, Ue), Ue;
                  }
                while (ue >= 1 && le >= 0);
              break;
            }
        }
      } finally {
        St = !1, Bt.current = Z, Mt(), Error.prepareStackTrace = X;
      }
      var at = c ? c.displayName || c.name : "", wt = at ? Rt(at) : "";
      return typeof c == "function" && gn.set(c, wt), wt;
    }
    function yr(c, S, A) {
      return en(c, !1);
    }
    function Ye(c) {
      var S = c.prototype;
      return !!(S && S.isReactComponent);
    }
    function Et(c, S, A) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return en(c, Ye(c));
      if (typeof c == "string")
        return Rt(c);
      switch (c) {
        case U:
          return Rt("Suspense");
        case W:
          return Rt("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case L:
            return yr(c.render);
          case q:
            return Et(c.type, S, A);
          case he: {
            var N = c, X = N._payload, Z = N._init;
            try {
              return Et(Z(X), S, A);
            } catch {
            }
          }
        }
      return "";
    }
    var tn = Object.prototype.hasOwnProperty, Ze = {}, Hn = pe.ReactDebugCurrentFrame;
    function _n(c) {
      if (c) {
        var S = c._owner, A = Et(c.type, c._source, S ? S.type : null);
        Hn.setExtraStackFrame(A);
      } else
        Hn.setExtraStackFrame(null);
    }
    function nn(c, S, A, N, X) {
      {
        var Z = Function.call.bind(tn);
        for (var k in c)
          if (Z(c, k)) {
            var Y = void 0;
            try {
              if (typeof c[k] != "function") {
                var Ie = Error((N || "React class") + ": " + A + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ie.name = "Invariant Violation", Ie;
              }
              Y = c[k](S, k, N, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ue) {
              Y = ue;
            }
            Y && !(Y instanceof Error) && (_n(X), re("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", N || "React class", A, k, typeof Y), _n(null)), Y instanceof Error && !(Y.message in Ze) && (Ze[Y.message] = !0, _n(X), re("Failed %s type: %s", A, Y.message), _n(null));
          }
      }
    }
    var $e = Array.isArray;
    function yt(c) {
      return $e(c);
    }
    function pn(c) {
      {
        var S = typeof Symbol == "function" && Symbol.toStringTag, A = S && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return A;
      }
    }
    function Ii(c) {
      try {
        return Wt(c), !1;
      } catch {
        return !0;
      }
    }
    function Wt(c) {
      return "" + c;
    }
    function wr(c) {
      if (Ii(c))
        return re("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", pn(c)), Wt(c);
    }
    var Gt = pe.ReactCurrentOwner, Ht = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, vn, Rn;
    function qn(c) {
      if (tn.call(c, "ref")) {
        var S = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (S && S.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function Yn(c) {
      if (tn.call(c, "key")) {
        var S = Object.getOwnPropertyDescriptor(c, "key").get;
        if (S && S.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function $n(c, S) {
      typeof c.ref == "string" && Gt.current;
    }
    function kn(c, S) {
      {
        var A = function() {
          vn || (vn = !0, re("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", S));
        };
        A.isReactWarning = !0, Object.defineProperty(c, "key", {
          get: A,
          configurable: !0
        });
      }
    }
    function zn(c, S) {
      {
        var A = function() {
          Rn || (Rn = !0, re("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", S));
        };
        A.isReactWarning = !0, Object.defineProperty(c, "ref", {
          get: A,
          configurable: !0
        });
      }
    }
    var Kn = function(c, S, A, N, X, Z, k) {
      var Y = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: u,
        // Built-in properties that belong on the element
        type: c,
        key: S,
        ref: A,
        props: k,
        // Record the component responsible for creating this element.
        _owner: Z
      };
      return Y._store = {}, Object.defineProperty(Y._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Y, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: N
      }), Object.defineProperty(Y, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(Y.props), Object.freeze(Y)), Y;
    };
    function Xn(c, S, A, N, X) {
      {
        var Z, k = {}, Y = null, Ie = null;
        A !== void 0 && (wr(A), Y = "" + A), Yn(S) && (wr(S.key), Y = "" + S.key), qn(S) && (Ie = S.ref, $n(S, X));
        for (Z in S)
          tn.call(S, Z) && !Ht.hasOwnProperty(Z) && (k[Z] = S[Z]);
        if (c && c.defaultProps) {
          var ue = c.defaultProps;
          for (Z in ue)
            k[Z] === void 0 && (k[Z] = ue[Z]);
        }
        if (Y || Ie) {
          var le = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
          Y && kn(k, le), Ie && zn(k, le);
        }
        return Kn(c, Y, Ie, X, N, Gt.current, k);
      }
    }
    var Vn = pe.ReactCurrentOwner, Ar = pe.ReactDebugCurrentFrame;
    function qt(c) {
      if (c) {
        var S = c._owner, A = Et(c.type, c._source, S ? S.type : null);
        Ar.setExtraStackFrame(A);
      } else
        Ar.setExtraStackFrame(null);
    }
    var En;
    En = !1;
    function Tn(c) {
      return typeof c == "object" && c !== null && c.$$typeof === u;
    }
    function xr() {
      {
        if (Vn.current) {
          var c = _t(Vn.current.type);
          if (c)
            return `

Check the render method of \`` + c + "`.";
        }
        return "";
      }
    }
    function Si(c) {
      return "";
    }
    var Or = {};
    function yi(c) {
      {
        var S = xr();
        if (!S) {
          var A = typeof c == "string" ? c : c.displayName || c.name;
          A && (S = `

Check the top-level render call using <` + A + ">.");
        }
        return S;
      }
    }
    function Jn(c, S) {
      {
        if (!c._store || c._store.validated || c.key != null)
          return;
        c._store.validated = !0;
        var A = yi(S);
        if (Or[A])
          return;
        Or[A] = !0;
        var N = "";
        c && c._owner && c._owner !== Vn.current && (N = " It was passed a child from " + _t(c._owner.type) + "."), qt(c), re('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, N), qt(null);
      }
    }
    function br(c, S) {
      {
        if (typeof c != "object")
          return;
        if (yt(c))
          for (var A = 0; A < c.length; A++) {
            var N = c[A];
            Tn(N) && Jn(N, S);
          }
        else if (Tn(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var X = Te(c);
          if (typeof X == "function" && X !== c.entries)
            for (var Z = X.call(c), k; !(k = Z.next()).done; )
              Tn(k.value) && Jn(k.value, S);
        }
      }
    }
    function wi(c) {
      {
        var S = c.type;
        if (S == null || typeof S == "string")
          return;
        var A;
        if (typeof S == "function")
          A = S.propTypes;
        else if (typeof S == "object" && (S.$$typeof === L || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        S.$$typeof === q))
          A = S.propTypes;
        else
          return;
        if (A) {
          var N = _t(S);
          nn(A, c.props, "prop", N, c);
        } else if (S.PropTypes !== void 0 && !En) {
          En = !0;
          var X = _t(S);
          re("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof S.getDefaultProps == "function" && !S.getDefaultProps.isReactClassApproved && re("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ai(c) {
      {
        for (var S = Object.keys(c.props), A = 0; A < S.length; A++) {
          var N = S[A];
          if (N !== "children" && N !== "key") {
            qt(c), re("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", N), qt(null);
            break;
          }
        }
        c.ref !== null && (qt(c), re("Invalid attribute `ref` supplied to `React.Fragment`."), qt(null));
      }
    }
    var mn = {};
    function Lr(c, S, A, N, X, Z) {
      {
        var k = Bn(c);
        if (!k) {
          var Y = "";
          (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (Y += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ie = Si();
          Ie ? Y += Ie : Y += xr();
          var ue;
          c === null ? ue = "null" : yt(c) ? ue = "array" : c !== void 0 && c.$$typeof === u ? (ue = "<" + (_t(c.type) || "Unknown") + " />", Y = " Did you accidentally export a JSX literal instead of a component?") : ue = typeof c, re("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ue, Y);
        }
        var le = Xn(c, S, A, X, Z);
        if (le == null)
          return le;
        if (k) {
          var Ue = S.children;
          if (Ue !== void 0)
            if (N)
              if (yt(Ue)) {
                for (var at = 0; at < Ue.length; at++)
                  br(Ue[at], c);
                Object.freeze && Object.freeze(Ue);
              } else
                re("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              br(Ue, c);
        }
        if (tn.call(S, "key")) {
          var wt = _t(c), ve = Object.keys(S).filter(function(Pi) {
            return Pi !== "key";
          }), Qn = ve.length > 0 ? "{key: someKey, " + ve.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!mn[wt + Qn]) {
            var Li = ve.length > 0 ? "{" + ve.join(": ..., ") + ": ...}" : "{}";
            re(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Qn, wt, Li, wt), mn[wt + Qn] = !0;
          }
        }
        return c === l ? Ai(le) : wi(le), le;
      }
    }
    function Zn(c, S, A) {
      return Lr(c, S, A, !0);
    }
    function xi(c, S, A) {
      return Lr(c, S, A, !1);
    }
    var Oi = xi, bi = Zn;
    _r.Fragment = l, _r.jsx = Oi, _r.jsxs = bi;
  })()), _r;
}
var Sf;
function Z_() {
  return Sf || (Sf = 1, process.env.NODE_ENV === "production" ? Ri.exports = V_() : Ri.exports = J_()), Ri.exports;
}
var Pe = Z_();
function Lf({ children: g }) {
  const u = Un();
  return u.isLoading ? typeof g == "function" ? /* @__PURE__ */ Pe.jsx(g, { pagination: u.pagination, context: u.context }) : g : null;
}
function Pf({ children: g }) {
  const u = Un();
  return u.isEmpty ? typeof g == "function" ? /* @__PURE__ */ Pe.jsx(g, { pagination: u.pagination, context: u.context }) : g : null;
}
function Cf({ children: g }) {
  const u = Un();
  return u.isEmpty === !1 && u.hasMatches === !1 ? typeof g == "function" ? /* @__PURE__ */ Pe.jsx(g, { pagination: u.pagination, context: u.context }) : g : null;
}
function Df({ children: g }) {
  const u = Un();
  return u.hasMatches && u.matches.items ? typeof g == "function" ? /* @__PURE__ */ Pe.jsx(g, { items: u.matches.items, pagination: u.pagination, context: u.context }) : g : null;
}
function Nf({ children: g }) {
  const u = Un();
  return u.hasMatches && u.matches.groups ? typeof g == "function" ? /* @__PURE__ */ Pe.jsx(g, { groups: u.matches.groups, pagination: u.pagination, context: u.context }) : g : null;
}
function Mn({ children: g }) {
  if (Object.values(g).length === 0)
    throw new Error("No render props were found.");
  return [
    g.loading && /* @__PURE__ */ Pe.jsx(Lf, { children: g.loading }, "loading"),
    g.empty && /* @__PURE__ */ Pe.jsx(Pf, { children: g.empty }, "empty"),
    g.noMatches && /* @__PURE__ */ Pe.jsx(Cf, { children: g.noMatches }, "noMatches"),
    g.items && /* @__PURE__ */ Pe.jsx(Df, { children: g.items }, "items"),
    g.groups && /* @__PURE__ */ Pe.jsx(Nf, { children: g.groups }, "groups")
  ];
}
Mn.Loading = Lf;
Mn.Empty = Pf;
Mn.NoMatches = Cf;
Mn.Items = Df;
Mn.Groups = Nf;
var pr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var Q_ = pr.exports, yf;
function j_() {
  return yf || (yf = 1, (function(g, u) {
    (function() {
      var i, l = "4.17.21", p = 200, m = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", w = "Expected a function", b = "Invalid `variable` option passed into `_.template`", L = "__lodash_hash_undefined__", U = 500, W = "__lodash_placeholder__", q = 1, he = 2, ge = 4, Ae = 1, dt = 2, Te = 1, pe = 2, re = 4, xe = 8, st = 16, Oe = 32, Ce = 64, J = 128, ot = 256, Ut = 512, Bn = 30, Wn = "...", Er = 800, _t = 16, pt = 1, Qt = 2, Tr = 3, vt = 1 / 0, ft = 9007199254740991, mr = 17976931348623157e292, jt = NaN, qe = 4294967295, Ir = qe - 1, Sr = qe >>> 1, mi = [
        ["ary", J],
        ["bind", Te],
        ["bindKey", pe],
        ["curry", xe],
        ["curryRight", st],
        ["flip", Ut],
        ["partial", Oe],
        ["partialRight", Ce],
        ["rearg", ot]
      ], Mt = "[object Arguments]", Bt = "[object Array]", Gn = "[object AsyncFunction]", Rt = "[object Boolean]", St = "[object Date]", gn = "[object DOMException]", dn = "[object Error]", en = "[object Function]", yr = "[object GeneratorFunction]", Ye = "[object Map]", Et = "[object Number]", tn = "[object Null]", Ze = "[object Object]", Hn = "[object Promise]", _n = "[object Proxy]", nn = "[object RegExp]", $e = "[object Set]", yt = "[object String]", pn = "[object Symbol]", Ii = "[object Undefined]", Wt = "[object WeakMap]", wr = "[object WeakSet]", Gt = "[object ArrayBuffer]", Ht = "[object DataView]", vn = "[object Float32Array]", Rn = "[object Float64Array]", qn = "[object Int8Array]", Yn = "[object Int16Array]", $n = "[object Int32Array]", kn = "[object Uint8Array]", zn = "[object Uint8ClampedArray]", Kn = "[object Uint16Array]", Xn = "[object Uint32Array]", Vn = /\b__p \+= '';/g, Ar = /\b(__p \+=) '' \+/g, qt = /(__e\(.*?\)|\b__t\)) \+\n'';/g, En = /&(?:amp|lt|gt|quot|#39);/g, Tn = /[&<>"']/g, xr = RegExp(En.source), Si = RegExp(Tn.source), Or = /<%-([\s\S]+?)%>/g, yi = /<%([\s\S]+?)%>/g, Jn = /<%=([\s\S]+?)%>/g, br = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, wi = /^\w*$/, Ai = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mn = /[\\^$.*+?()[\]{}|]/g, Lr = RegExp(mn.source), Zn = /^\s+/, xi = /\s/, Oi = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, bi = /\{\n\/\* \[wrapped with (.+)\] \*/, c = /,? & /, S = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, A = /[()=,{}\[\]\/\s]/, N = /\\(\\)?/g, X = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Z = /\w*$/, k = /^[-+]0x[0-9a-f]+$/i, Y = /^0b[01]+$/i, Ie = /^\[object .+?Constructor\]$/, ue = /^0o[0-7]+$/i, le = /^(?:0|[1-9]\d*)$/, Ue = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, at = /($^)/, wt = /['\n\r\u2028\u2029\\]/g, ve = "\\ud800-\\udfff", Qn = "\\u0300-\\u036f", Li = "\\ufe20-\\ufe2f", Pi = "\\u20d0-\\u20ff", Ku = Qn + Li + Pi, Xu = "\\u2700-\\u27bf", Vu = "a-z\\xdf-\\xf6\\xf8-\\xff", Hf = "\\xac\\xb1\\xd7\\xf7", qf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Yf = "\\u2000-\\u206f", $f = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ju = "A-Z\\xc0-\\xd6\\xd8-\\xde", Zu = "\\ufe0e\\ufe0f", Qu = Hf + qf + Yf + $f, Ci = "['’]", kf = "[" + ve + "]", ju = "[" + Qu + "]", Pr = "[" + Ku + "]", es = "\\d+", zf = "[" + Xu + "]", ts = "[" + Vu + "]", ns = "[^" + ve + Qu + es + Xu + Vu + Ju + "]", Di = "\\ud83c[\\udffb-\\udfff]", Kf = "(?:" + Pr + "|" + Di + ")", rs = "[^" + ve + "]", Ni = "(?:\\ud83c[\\udde6-\\uddff]){2}", Fi = "[\\ud800-\\udbff][\\udc00-\\udfff]", In = "[" + Ju + "]", is = "\\u200d", us = "(?:" + ts + "|" + ns + ")", Xf = "(?:" + In + "|" + ns + ")", ss = "(?:" + Ci + "(?:d|ll|m|re|s|t|ve))?", os = "(?:" + Ci + "(?:D|LL|M|RE|S|T|VE))?", fs = Kf + "?", as = "[" + Zu + "]?", Vf = "(?:" + is + "(?:" + [rs, Ni, Fi].join("|") + ")" + as + fs + ")*", Jf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Zf = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ls = as + fs + Vf, Qf = "(?:" + [zf, Ni, Fi].join("|") + ")" + ls, jf = "(?:" + [rs + Pr + "?", Pr, Ni, Fi, kf].join("|") + ")", ea = RegExp(Ci, "g"), ta = RegExp(Pr, "g"), Ui = RegExp(Di + "(?=" + Di + ")|" + jf + ls, "g"), na = RegExp([
        In + "?" + ts + "+" + ss + "(?=" + [ju, In, "$"].join("|") + ")",
        Xf + "+" + os + "(?=" + [ju, In + us, "$"].join("|") + ")",
        In + "?" + us + "+" + ss,
        In + "+" + os,
        Zf,
        Jf,
        es,
        Qf
      ].join("|"), "g"), ra = RegExp("[" + is + ve + Ku + Zu + "]"), ia = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ua = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ], sa = -1, ne = {};
      ne[vn] = ne[Rn] = ne[qn] = ne[Yn] = ne[$n] = ne[kn] = ne[zn] = ne[Kn] = ne[Xn] = !0, ne[Mt] = ne[Bt] = ne[Gt] = ne[Rt] = ne[Ht] = ne[St] = ne[dn] = ne[en] = ne[Ye] = ne[Et] = ne[Ze] = ne[nn] = ne[$e] = ne[yt] = ne[Wt] = !1;
      var te = {};
      te[Mt] = te[Bt] = te[Gt] = te[Ht] = te[Rt] = te[St] = te[vn] = te[Rn] = te[qn] = te[Yn] = te[$n] = te[Ye] = te[Et] = te[Ze] = te[nn] = te[$e] = te[yt] = te[pn] = te[kn] = te[zn] = te[Kn] = te[Xn] = !0, te[dn] = te[en] = te[Wt] = !1;
      var oa = {
        // Latin-1 Supplement block.
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        // Latin Extended-A block.
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s"
      }, fa = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, aa = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, la = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, ca = parseFloat, ha = parseInt, cs = typeof vi == "object" && vi && vi.Object === Object && vi, ga = typeof self == "object" && self && self.Object === Object && self, Se = cs || ga || Function("return this")(), Mi = u && !u.nodeType && u, rn = Mi && !0 && g && !g.nodeType && g, hs = rn && rn.exports === Mi, Bi = hs && cs.process, Qe = (function() {
        try {
          var d = rn && rn.require && rn.require("util").types;
          return d || Bi && Bi.binding && Bi.binding("util");
        } catch {
        }
      })(), gs = Qe && Qe.isArrayBuffer, ds = Qe && Qe.isDate, _s = Qe && Qe.isMap, ps = Qe && Qe.isRegExp, vs = Qe && Qe.isSet, Rs = Qe && Qe.isTypedArray;
      function ke(d, R, v) {
        switch (v.length) {
          case 0:
            return d.call(R);
          case 1:
            return d.call(R, v[0]);
          case 2:
            return d.call(R, v[0], v[1]);
          case 3:
            return d.call(R, v[0], v[1], v[2]);
        }
        return d.apply(R, v);
      }
      function da(d, R, v, x) {
        for (var F = -1, V = d == null ? 0 : d.length; ++F < V; ) {
          var Re = d[F];
          R(x, Re, v(Re), d);
        }
        return x;
      }
      function je(d, R) {
        for (var v = -1, x = d == null ? 0 : d.length; ++v < x && R(d[v], v, d) !== !1; )
          ;
        return d;
      }
      function _a(d, R) {
        for (var v = d == null ? 0 : d.length; v-- && R(d[v], v, d) !== !1; )
          ;
        return d;
      }
      function Es(d, R) {
        for (var v = -1, x = d == null ? 0 : d.length; ++v < x; )
          if (!R(d[v], v, d))
            return !1;
        return !0;
      }
      function Yt(d, R) {
        for (var v = -1, x = d == null ? 0 : d.length, F = 0, V = []; ++v < x; ) {
          var Re = d[v];
          R(Re, v, d) && (V[F++] = Re);
        }
        return V;
      }
      function Cr(d, R) {
        var v = d == null ? 0 : d.length;
        return !!v && Sn(d, R, 0) > -1;
      }
      function Wi(d, R, v) {
        for (var x = -1, F = d == null ? 0 : d.length; ++x < F; )
          if (v(R, d[x]))
            return !0;
        return !1;
      }
      function ie(d, R) {
        for (var v = -1, x = d == null ? 0 : d.length, F = Array(x); ++v < x; )
          F[v] = R(d[v], v, d);
        return F;
      }
      function $t(d, R) {
        for (var v = -1, x = R.length, F = d.length; ++v < x; )
          d[F + v] = R[v];
        return d;
      }
      function Gi(d, R, v, x) {
        var F = -1, V = d == null ? 0 : d.length;
        for (x && V && (v = d[++F]); ++F < V; )
          v = R(v, d[F], F, d);
        return v;
      }
      function pa(d, R, v, x) {
        var F = d == null ? 0 : d.length;
        for (x && F && (v = d[--F]); F--; )
          v = R(v, d[F], F, d);
        return v;
      }
      function Hi(d, R) {
        for (var v = -1, x = d == null ? 0 : d.length; ++v < x; )
          if (R(d[v], v, d))
            return !0;
        return !1;
      }
      var va = qi("length");
      function Ra(d) {
        return d.split("");
      }
      function Ea(d) {
        return d.match(S) || [];
      }
      function Ts(d, R, v) {
        var x;
        return v(d, function(F, V, Re) {
          if (R(F, V, Re))
            return x = V, !1;
        }), x;
      }
      function Dr(d, R, v, x) {
        for (var F = d.length, V = v + (x ? 1 : -1); x ? V-- : ++V < F; )
          if (R(d[V], V, d))
            return V;
        return -1;
      }
      function Sn(d, R, v) {
        return R === R ? Pa(d, R, v) : Dr(d, ms, v);
      }
      function Ta(d, R, v, x) {
        for (var F = v - 1, V = d.length; ++F < V; )
          if (x(d[F], R))
            return F;
        return -1;
      }
      function ms(d) {
        return d !== d;
      }
      function Is(d, R) {
        var v = d == null ? 0 : d.length;
        return v ? $i(d, R) / v : jt;
      }
      function qi(d) {
        return function(R) {
          return R == null ? i : R[d];
        };
      }
      function Yi(d) {
        return function(R) {
          return d == null ? i : d[R];
        };
      }
      function Ss(d, R, v, x, F) {
        return F(d, function(V, Re, ee) {
          v = x ? (x = !1, V) : R(v, V, Re, ee);
        }), v;
      }
      function ma(d, R) {
        var v = d.length;
        for (d.sort(R); v--; )
          d[v] = d[v].value;
        return d;
      }
      function $i(d, R) {
        for (var v, x = -1, F = d.length; ++x < F; ) {
          var V = R(d[x]);
          V !== i && (v = v === i ? V : v + V);
        }
        return v;
      }
      function ki(d, R) {
        for (var v = -1, x = Array(d); ++v < d; )
          x[v] = R(v);
        return x;
      }
      function Ia(d, R) {
        return ie(R, function(v) {
          return [v, d[v]];
        });
      }
      function ys(d) {
        return d && d.slice(0, Os(d) + 1).replace(Zn, "");
      }
      function ze(d) {
        return function(R) {
          return d(R);
        };
      }
      function zi(d, R) {
        return ie(R, function(v) {
          return d[v];
        });
      }
      function jn(d, R) {
        return d.has(R);
      }
      function ws(d, R) {
        for (var v = -1, x = d.length; ++v < x && Sn(R, d[v], 0) > -1; )
          ;
        return v;
      }
      function As(d, R) {
        for (var v = d.length; v-- && Sn(R, d[v], 0) > -1; )
          ;
        return v;
      }
      function Sa(d, R) {
        for (var v = d.length, x = 0; v--; )
          d[v] === R && ++x;
        return x;
      }
      var ya = Yi(oa), wa = Yi(fa);
      function Aa(d) {
        return "\\" + la[d];
      }
      function xa(d, R) {
        return d == null ? i : d[R];
      }
      function yn(d) {
        return ra.test(d);
      }
      function Oa(d) {
        return ia.test(d);
      }
      function ba(d) {
        for (var R, v = []; !(R = d.next()).done; )
          v.push(R.value);
        return v;
      }
      function Ki(d) {
        var R = -1, v = Array(d.size);
        return d.forEach(function(x, F) {
          v[++R] = [F, x];
        }), v;
      }
      function xs(d, R) {
        return function(v) {
          return d(R(v));
        };
      }
      function kt(d, R) {
        for (var v = -1, x = d.length, F = 0, V = []; ++v < x; ) {
          var Re = d[v];
          (Re === R || Re === W) && (d[v] = W, V[F++] = v);
        }
        return V;
      }
      function Nr(d) {
        var R = -1, v = Array(d.size);
        return d.forEach(function(x) {
          v[++R] = x;
        }), v;
      }
      function La(d) {
        var R = -1, v = Array(d.size);
        return d.forEach(function(x) {
          v[++R] = [x, x];
        }), v;
      }
      function Pa(d, R, v) {
        for (var x = v - 1, F = d.length; ++x < F; )
          if (d[x] === R)
            return x;
        return -1;
      }
      function Ca(d, R, v) {
        for (var x = v + 1; x--; )
          if (d[x] === R)
            return x;
        return x;
      }
      function wn(d) {
        return yn(d) ? Na(d) : va(d);
      }
      function lt(d) {
        return yn(d) ? Fa(d) : Ra(d);
      }
      function Os(d) {
        for (var R = d.length; R-- && xi.test(d.charAt(R)); )
          ;
        return R;
      }
      var Da = Yi(aa);
      function Na(d) {
        for (var R = Ui.lastIndex = 0; Ui.test(d); )
          ++R;
        return R;
      }
      function Fa(d) {
        return d.match(Ui) || [];
      }
      function Ua(d) {
        return d.match(na) || [];
      }
      var Ma = (function d(R) {
        R = R == null ? Se : An.defaults(Se.Object(), R, An.pick(Se, ua));
        var v = R.Array, x = R.Date, F = R.Error, V = R.Function, Re = R.Math, ee = R.Object, Xi = R.RegExp, Ba = R.String, et = R.TypeError, Fr = v.prototype, Wa = V.prototype, xn = ee.prototype, Ur = R["__core-js_shared__"], Mr = Wa.toString, j = xn.hasOwnProperty, Ga = 0, bs = (function() {
          var e = /[^.]+$/.exec(Ur && Ur.keys && Ur.keys.IE_PROTO || "");
          return e ? "Symbol(src)_1." + e : "";
        })(), Br = xn.toString, Ha = Mr.call(ee), qa = Se._, Ya = Xi(
          "^" + Mr.call(j).replace(mn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Wr = hs ? R.Buffer : i, zt = R.Symbol, Gr = R.Uint8Array, Ls = Wr ? Wr.allocUnsafe : i, Hr = xs(ee.getPrototypeOf, ee), Ps = ee.create, Cs = xn.propertyIsEnumerable, qr = Fr.splice, Ds = zt ? zt.isConcatSpreadable : i, er = zt ? zt.iterator : i, un = zt ? zt.toStringTag : i, Yr = (function() {
          try {
            var e = ln(ee, "defineProperty");
            return e({}, "", {}), e;
          } catch {
          }
        })(), $a = R.clearTimeout !== Se.clearTimeout && R.clearTimeout, ka = x && x.now !== Se.Date.now && x.now, za = R.setTimeout !== Se.setTimeout && R.setTimeout, $r = Re.ceil, kr = Re.floor, Vi = ee.getOwnPropertySymbols, Ka = Wr ? Wr.isBuffer : i, Ns = R.isFinite, Xa = Fr.join, Va = xs(ee.keys, ee), Ee = Re.max, be = Re.min, Ja = x.now, Za = R.parseInt, Fs = Re.random, Qa = Fr.reverse, Ji = ln(R, "DataView"), tr = ln(R, "Map"), Zi = ln(R, "Promise"), On = ln(R, "Set"), nr = ln(R, "WeakMap"), rr = ln(ee, "create"), zr = nr && new nr(), bn = {}, ja = cn(Ji), el = cn(tr), tl = cn(Zi), nl = cn(On), rl = cn(nr), Kr = zt ? zt.prototype : i, ir = Kr ? Kr.valueOf : i, Us = Kr ? Kr.toString : i;
        function o(e) {
          if (ce(e) && !M(e) && !(e instanceof z)) {
            if (e instanceof tt)
              return e;
            if (j.call(e, "__wrapped__"))
              return Bo(e);
          }
          return new tt(e);
        }
        var Ln = /* @__PURE__ */ (function() {
          function e() {
          }
          return function(t) {
            if (!se(t))
              return {};
            if (Ps)
              return Ps(t);
            e.prototype = t;
            var n = new e();
            return e.prototype = i, n;
          };
        })();
        function Xr() {
        }
        function tt(e, t) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
        }
        o.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: Or,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: yi,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: Jn,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          variable: "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          imports: {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            _: o
          }
        }, o.prototype = Xr.prototype, o.prototype.constructor = o, tt.prototype = Ln(Xr.prototype), tt.prototype.constructor = tt;
        function z(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = qe, this.__views__ = [];
        }
        function il() {
          var e = new z(this.__wrapped__);
          return e.__actions__ = Me(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Me(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Me(this.__views__), e;
        }
        function ul() {
          if (this.__filtered__) {
            var e = new z(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else
            e = this.clone(), e.__dir__ *= -1;
          return e;
        }
        function sl() {
          var e = this.__wrapped__.value(), t = this.__dir__, n = M(e), r = t < 0, s = n ? e.length : 0, f = Rc(0, s, this.__views__), a = f.start, h = f.end, _ = h - a, E = r ? h : a - 1, T = this.__iteratees__, I = T.length, y = 0, O = be(_, this.__takeCount__);
          if (!n || !r && s == _ && O == _)
            return so(e, this.__actions__);
          var C = [];
          e:
            for (; _-- && y < O; ) {
              E += t;
              for (var G = -1, D = e[E]; ++G < I; ) {
                var $ = T[G], K = $.iteratee, Ve = $.type, Fe = K(D);
                if (Ve == Qt)
                  D = Fe;
                else if (!Fe) {
                  if (Ve == pt)
                    continue e;
                  break e;
                }
              }
              C[y++] = D;
            }
          return C;
        }
        z.prototype = Ln(Xr.prototype), z.prototype.constructor = z;
        function sn(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function ol() {
          this.__data__ = rr ? rr(null) : {}, this.size = 0;
        }
        function fl(e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }
        function al(e) {
          var t = this.__data__;
          if (rr) {
            var n = t[e];
            return n === L ? i : n;
          }
          return j.call(t, e) ? t[e] : i;
        }
        function ll(e) {
          var t = this.__data__;
          return rr ? t[e] !== i : j.call(t, e);
        }
        function cl(e, t) {
          var n = this.__data__;
          return this.size += this.has(e) ? 0 : 1, n[e] = rr && t === i ? L : t, this;
        }
        sn.prototype.clear = ol, sn.prototype.delete = fl, sn.prototype.get = al, sn.prototype.has = ll, sn.prototype.set = cl;
        function At(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function hl() {
          this.__data__ = [], this.size = 0;
        }
        function gl(e) {
          var t = this.__data__, n = Vr(t, e);
          if (n < 0)
            return !1;
          var r = t.length - 1;
          return n == r ? t.pop() : qr.call(t, n, 1), --this.size, !0;
        }
        function dl(e) {
          var t = this.__data__, n = Vr(t, e);
          return n < 0 ? i : t[n][1];
        }
        function _l(e) {
          return Vr(this.__data__, e) > -1;
        }
        function pl(e, t) {
          var n = this.__data__, r = Vr(n, e);
          return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
        }
        At.prototype.clear = hl, At.prototype.delete = gl, At.prototype.get = dl, At.prototype.has = _l, At.prototype.set = pl;
        function xt(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function vl() {
          this.size = 0, this.__data__ = {
            hash: new sn(),
            map: new (tr || At)(),
            string: new sn()
          };
        }
        function Rl(e) {
          var t = oi(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }
        function El(e) {
          return oi(this, e).get(e);
        }
        function Tl(e) {
          return oi(this, e).has(e);
        }
        function ml(e, t) {
          var n = oi(this, e), r = n.size;
          return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
        }
        xt.prototype.clear = vl, xt.prototype.delete = Rl, xt.prototype.get = El, xt.prototype.has = Tl, xt.prototype.set = ml;
        function on(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.__data__ = new xt(); ++t < n; )
            this.add(e[t]);
        }
        function Il(e) {
          return this.__data__.set(e, L), this;
        }
        function Sl(e) {
          return this.__data__.has(e);
        }
        on.prototype.add = on.prototype.push = Il, on.prototype.has = Sl;
        function ct(e) {
          var t = this.__data__ = new At(e);
          this.size = t.size;
        }
        function yl() {
          this.__data__ = new At(), this.size = 0;
        }
        function wl(e) {
          var t = this.__data__, n = t.delete(e);
          return this.size = t.size, n;
        }
        function Al(e) {
          return this.__data__.get(e);
        }
        function xl(e) {
          return this.__data__.has(e);
        }
        function Ol(e, t) {
          var n = this.__data__;
          if (n instanceof At) {
            var r = n.__data__;
            if (!tr || r.length < p - 1)
              return r.push([e, t]), this.size = ++n.size, this;
            n = this.__data__ = new xt(r);
          }
          return n.set(e, t), this.size = n.size, this;
        }
        ct.prototype.clear = yl, ct.prototype.delete = wl, ct.prototype.get = Al, ct.prototype.has = xl, ct.prototype.set = Ol;
        function Ms(e, t) {
          var n = M(e), r = !n && hn(e), s = !n && !r && Zt(e), f = !n && !r && !s && Nn(e), a = n || r || s || f, h = a ? ki(e.length, Ba) : [], _ = h.length;
          for (var E in e)
            (t || j.call(e, E)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
            (E == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            s && (E == "offset" || E == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            f && (E == "buffer" || E == "byteLength" || E == "byteOffset") || // Skip index properties.
            Pt(E, _))) && h.push(E);
          return h;
        }
        function Bs(e) {
          var t = e.length;
          return t ? e[fu(0, t - 1)] : i;
        }
        function bl(e, t) {
          return fi(Me(e), fn(t, 0, e.length));
        }
        function Ll(e) {
          return fi(Me(e));
        }
        function Qi(e, t, n) {
          (n !== i && !ht(e[t], n) || n === i && !(t in e)) && Ot(e, t, n);
        }
        function ur(e, t, n) {
          var r = e[t];
          (!(j.call(e, t) && ht(r, n)) || n === i && !(t in e)) && Ot(e, t, n);
        }
        function Vr(e, t) {
          for (var n = e.length; n--; )
            if (ht(e[n][0], t))
              return n;
          return -1;
        }
        function Pl(e, t, n, r) {
          return Kt(e, function(s, f, a) {
            t(r, s, n(s), a);
          }), r;
        }
        function Ws(e, t) {
          return e && mt(t, me(t), e);
        }
        function Cl(e, t) {
          return e && mt(t, We(t), e);
        }
        function Ot(e, t, n) {
          t == "__proto__" && Yr ? Yr(e, t, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : e[t] = n;
        }
        function ji(e, t) {
          for (var n = -1, r = t.length, s = v(r), f = e == null; ++n < r; )
            s[n] = f ? i : Du(e, t[n]);
          return s;
        }
        function fn(e, t, n) {
          return e === e && (n !== i && (e = e <= n ? e : n), t !== i && (e = e >= t ? e : t)), e;
        }
        function nt(e, t, n, r, s, f) {
          var a, h = t & q, _ = t & he, E = t & ge;
          if (n && (a = s ? n(e, r, s, f) : n(e)), a !== i)
            return a;
          if (!se(e))
            return e;
          var T = M(e);
          if (T) {
            if (a = Tc(e), !h)
              return Me(e, a);
          } else {
            var I = Le(e), y = I == en || I == yr;
            if (Zt(e))
              return ao(e, h);
            if (I == Ze || I == Mt || y && !s) {
              if (a = _ || y ? {} : bo(e), !h)
                return _ ? ac(e, Cl(a, e)) : fc(e, Ws(a, e));
            } else {
              if (!te[I])
                return s ? e : {};
              a = mc(e, I, h);
            }
          }
          f || (f = new ct());
          var O = f.get(e);
          if (O)
            return O;
          f.set(e, a), uf(e) ? e.forEach(function(D) {
            a.add(nt(D, t, n, D, e, f));
          }) : nf(e) && e.forEach(function(D, $) {
            a.set($, nt(D, t, n, $, e, f));
          });
          var C = E ? _ ? Eu : Ru : _ ? We : me, G = T ? i : C(e);
          return je(G || e, function(D, $) {
            G && ($ = D, D = e[$]), ur(a, $, nt(D, t, n, $, e, f));
          }), a;
        }
        function Dl(e) {
          var t = me(e);
          return function(n) {
            return Gs(n, e, t);
          };
        }
        function Gs(e, t, n) {
          var r = n.length;
          if (e == null)
            return !r;
          for (e = ee(e); r--; ) {
            var s = n[r], f = t[s], a = e[s];
            if (a === i && !(s in e) || !f(a))
              return !1;
          }
          return !0;
        }
        function Hs(e, t, n) {
          if (typeof e != "function")
            throw new et(w);
          return hr(function() {
            e.apply(i, n);
          }, t);
        }
        function sr(e, t, n, r) {
          var s = -1, f = Cr, a = !0, h = e.length, _ = [], E = t.length;
          if (!h)
            return _;
          n && (t = ie(t, ze(n))), r ? (f = Wi, a = !1) : t.length >= p && (f = jn, a = !1, t = new on(t));
          e:
            for (; ++s < h; ) {
              var T = e[s], I = n == null ? T : n(T);
              if (T = r || T !== 0 ? T : 0, a && I === I) {
                for (var y = E; y--; )
                  if (t[y] === I)
                    continue e;
                _.push(T);
              } else f(t, I, r) || _.push(T);
            }
          return _;
        }
        var Kt = _o(Tt), qs = _o(tu, !0);
        function Nl(e, t) {
          var n = !0;
          return Kt(e, function(r, s, f) {
            return n = !!t(r, s, f), n;
          }), n;
        }
        function Jr(e, t, n) {
          for (var r = -1, s = e.length; ++r < s; ) {
            var f = e[r], a = t(f);
            if (a != null && (h === i ? a === a && !Xe(a) : n(a, h)))
              var h = a, _ = f;
          }
          return _;
        }
        function Fl(e, t, n, r) {
          var s = e.length;
          for (n = B(n), n < 0 && (n = -n > s ? 0 : s + n), r = r === i || r > s ? s : B(r), r < 0 && (r += s), r = n > r ? 0 : of(r); n < r; )
            e[n++] = t;
          return e;
        }
        function Ys(e, t) {
          var n = [];
          return Kt(e, function(r, s, f) {
            t(r, s, f) && n.push(r);
          }), n;
        }
        function ye(e, t, n, r, s) {
          var f = -1, a = e.length;
          for (n || (n = Sc), s || (s = []); ++f < a; ) {
            var h = e[f];
            t > 0 && n(h) ? t > 1 ? ye(h, t - 1, n, r, s) : $t(s, h) : r || (s[s.length] = h);
          }
          return s;
        }
        var eu = po(), $s = po(!0);
        function Tt(e, t) {
          return e && eu(e, t, me);
        }
        function tu(e, t) {
          return e && $s(e, t, me);
        }
        function Zr(e, t) {
          return Yt(t, function(n) {
            return Ct(e[n]);
          });
        }
        function an(e, t) {
          t = Vt(t, e);
          for (var n = 0, r = t.length; e != null && n < r; )
            e = e[It(t[n++])];
          return n && n == r ? e : i;
        }
        function ks(e, t, n) {
          var r = t(e);
          return M(e) ? r : $t(r, n(e));
        }
        function De(e) {
          return e == null ? e === i ? Ii : tn : un && un in ee(e) ? vc(e) : Lc(e);
        }
        function nu(e, t) {
          return e > t;
        }
        function Ul(e, t) {
          return e != null && j.call(e, t);
        }
        function Ml(e, t) {
          return e != null && t in ee(e);
        }
        function Bl(e, t, n) {
          return e >= be(t, n) && e < Ee(t, n);
        }
        function ru(e, t, n) {
          for (var r = n ? Wi : Cr, s = e[0].length, f = e.length, a = f, h = v(f), _ = 1 / 0, E = []; a--; ) {
            var T = e[a];
            a && t && (T = ie(T, ze(t))), _ = be(T.length, _), h[a] = !n && (t || s >= 120 && T.length >= 120) ? new on(a && T) : i;
          }
          T = e[0];
          var I = -1, y = h[0];
          e:
            for (; ++I < s && E.length < _; ) {
              var O = T[I], C = t ? t(O) : O;
              if (O = n || O !== 0 ? O : 0, !(y ? jn(y, C) : r(E, C, n))) {
                for (a = f; --a; ) {
                  var G = h[a];
                  if (!(G ? jn(G, C) : r(e[a], C, n)))
                    continue e;
                }
                y && y.push(C), E.push(O);
              }
            }
          return E;
        }
        function Wl(e, t, n, r) {
          return Tt(e, function(s, f, a) {
            t(r, n(s), f, a);
          }), r;
        }
        function or(e, t, n) {
          t = Vt(t, e), e = Do(e, t);
          var r = e == null ? e : e[It(it(t))];
          return r == null ? i : ke(r, e, n);
        }
        function zs(e) {
          return ce(e) && De(e) == Mt;
        }
        function Gl(e) {
          return ce(e) && De(e) == Gt;
        }
        function Hl(e) {
          return ce(e) && De(e) == St;
        }
        function fr(e, t, n, r, s) {
          return e === t ? !0 : e == null || t == null || !ce(e) && !ce(t) ? e !== e && t !== t : ql(e, t, n, r, fr, s);
        }
        function ql(e, t, n, r, s, f) {
          var a = M(e), h = M(t), _ = a ? Bt : Le(e), E = h ? Bt : Le(t);
          _ = _ == Mt ? Ze : _, E = E == Mt ? Ze : E;
          var T = _ == Ze, I = E == Ze, y = _ == E;
          if (y && Zt(e)) {
            if (!Zt(t))
              return !1;
            a = !0, T = !1;
          }
          if (y && !T)
            return f || (f = new ct()), a || Nn(e) ? Ao(e, t, n, r, s, f) : _c(e, t, _, n, r, s, f);
          if (!(n & Ae)) {
            var O = T && j.call(e, "__wrapped__"), C = I && j.call(t, "__wrapped__");
            if (O || C) {
              var G = O ? e.value() : e, D = C ? t.value() : t;
              return f || (f = new ct()), s(G, D, n, r, f);
            }
          }
          return y ? (f || (f = new ct()), pc(e, t, n, r, s, f)) : !1;
        }
        function Yl(e) {
          return ce(e) && Le(e) == Ye;
        }
        function iu(e, t, n, r) {
          var s = n.length, f = s, a = !r;
          if (e == null)
            return !f;
          for (e = ee(e); s--; ) {
            var h = n[s];
            if (a && h[2] ? h[1] !== e[h[0]] : !(h[0] in e))
              return !1;
          }
          for (; ++s < f; ) {
            h = n[s];
            var _ = h[0], E = e[_], T = h[1];
            if (a && h[2]) {
              if (E === i && !(_ in e))
                return !1;
            } else {
              var I = new ct();
              if (r)
                var y = r(E, T, _, e, t, I);
              if (!(y === i ? fr(T, E, Ae | dt, r, I) : y))
                return !1;
            }
          }
          return !0;
        }
        function Ks(e) {
          if (!se(e) || wc(e))
            return !1;
          var t = Ct(e) ? Ya : Ie;
          return t.test(cn(e));
        }
        function $l(e) {
          return ce(e) && De(e) == nn;
        }
        function kl(e) {
          return ce(e) && Le(e) == $e;
        }
        function zl(e) {
          return ce(e) && di(e.length) && !!ne[De(e)];
        }
        function Xs(e) {
          return typeof e == "function" ? e : e == null ? Ge : typeof e == "object" ? M(e) ? Zs(e[0], e[1]) : Js(e) : Rf(e);
        }
        function uu(e) {
          if (!cr(e))
            return Va(e);
          var t = [];
          for (var n in ee(e))
            j.call(e, n) && n != "constructor" && t.push(n);
          return t;
        }
        function Kl(e) {
          if (!se(e))
            return bc(e);
          var t = cr(e), n = [];
          for (var r in e)
            r == "constructor" && (t || !j.call(e, r)) || n.push(r);
          return n;
        }
        function su(e, t) {
          return e < t;
        }
        function Vs(e, t) {
          var n = -1, r = Be(e) ? v(e.length) : [];
          return Kt(e, function(s, f, a) {
            r[++n] = t(s, f, a);
          }), r;
        }
        function Js(e) {
          var t = mu(e);
          return t.length == 1 && t[0][2] ? Po(t[0][0], t[0][1]) : function(n) {
            return n === e || iu(n, e, t);
          };
        }
        function Zs(e, t) {
          return Su(e) && Lo(t) ? Po(It(e), t) : function(n) {
            var r = Du(n, e);
            return r === i && r === t ? Nu(n, e) : fr(t, r, Ae | dt);
          };
        }
        function Qr(e, t, n, r, s) {
          e !== t && eu(t, function(f, a) {
            if (s || (s = new ct()), se(f))
              Xl(e, t, a, n, Qr, r, s);
            else {
              var h = r ? r(wu(e, a), f, a + "", e, t, s) : i;
              h === i && (h = f), Qi(e, a, h);
            }
          }, We);
        }
        function Xl(e, t, n, r, s, f, a) {
          var h = wu(e, n), _ = wu(t, n), E = a.get(_);
          if (E) {
            Qi(e, n, E);
            return;
          }
          var T = f ? f(h, _, n + "", e, t, a) : i, I = T === i;
          if (I) {
            var y = M(_), O = !y && Zt(_), C = !y && !O && Nn(_);
            T = _, y || O || C ? M(h) ? T = h : de(h) ? T = Me(h) : O ? (I = !1, T = ao(_, !0)) : C ? (I = !1, T = lo(_, !0)) : T = [] : gr(_) || hn(_) ? (T = h, hn(h) ? T = ff(h) : (!se(h) || Ct(h)) && (T = bo(_))) : I = !1;
          }
          I && (a.set(_, T), s(T, _, r, f, a), a.delete(_)), Qi(e, n, T);
        }
        function Qs(e, t) {
          var n = e.length;
          if (n)
            return t += t < 0 ? n : 0, Pt(t, n) ? e[t] : i;
        }
        function js(e, t, n) {
          t.length ? t = ie(t, function(f) {
            return M(f) ? function(a) {
              return an(a, f.length === 1 ? f[0] : f);
            } : f;
          }) : t = [Ge];
          var r = -1;
          t = ie(t, ze(P()));
          var s = Vs(e, function(f, a, h) {
            var _ = ie(t, function(E) {
              return E(f);
            });
            return { criteria: _, index: ++r, value: f };
          });
          return ma(s, function(f, a) {
            return oc(f, a, n);
          });
        }
        function Vl(e, t) {
          return eo(e, t, function(n, r) {
            return Nu(e, r);
          });
        }
        function eo(e, t, n) {
          for (var r = -1, s = t.length, f = {}; ++r < s; ) {
            var a = t[r], h = an(e, a);
            n(h, a) && ar(f, Vt(a, e), h);
          }
          return f;
        }
        function Jl(e) {
          return function(t) {
            return an(t, e);
          };
        }
        function ou(e, t, n, r) {
          var s = r ? Ta : Sn, f = -1, a = t.length, h = e;
          for (e === t && (t = Me(t)), n && (h = ie(e, ze(n))); ++f < a; )
            for (var _ = 0, E = t[f], T = n ? n(E) : E; (_ = s(h, T, _, r)) > -1; )
              h !== e && qr.call(h, _, 1), qr.call(e, _, 1);
          return e;
        }
        function to(e, t) {
          for (var n = e ? t.length : 0, r = n - 1; n--; ) {
            var s = t[n];
            if (n == r || s !== f) {
              var f = s;
              Pt(s) ? qr.call(e, s, 1) : cu(e, s);
            }
          }
          return e;
        }
        function fu(e, t) {
          return e + kr(Fs() * (t - e + 1));
        }
        function Zl(e, t, n, r) {
          for (var s = -1, f = Ee($r((t - e) / (n || 1)), 0), a = v(f); f--; )
            a[r ? f : ++s] = e, e += n;
          return a;
        }
        function au(e, t) {
          var n = "";
          if (!e || t < 1 || t > ft)
            return n;
          do
            t % 2 && (n += e), t = kr(t / 2), t && (e += e);
          while (t);
          return n;
        }
        function H(e, t) {
          return Au(Co(e, t, Ge), e + "");
        }
        function Ql(e) {
          return Bs(Fn(e));
        }
        function jl(e, t) {
          var n = Fn(e);
          return fi(n, fn(t, 0, n.length));
        }
        function ar(e, t, n, r) {
          if (!se(e))
            return e;
          t = Vt(t, e);
          for (var s = -1, f = t.length, a = f - 1, h = e; h != null && ++s < f; ) {
            var _ = It(t[s]), E = n;
            if (_ === "__proto__" || _ === "constructor" || _ === "prototype")
              return e;
            if (s != a) {
              var T = h[_];
              E = r ? r(T, _, h) : i, E === i && (E = se(T) ? T : Pt(t[s + 1]) ? [] : {});
            }
            ur(h, _, E), h = h[_];
          }
          return e;
        }
        var no = zr ? function(e, t) {
          return zr.set(e, t), e;
        } : Ge, ec = Yr ? function(e, t) {
          return Yr(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Uu(t),
            writable: !0
          });
        } : Ge;
        function tc(e) {
          return fi(Fn(e));
        }
        function rt(e, t, n) {
          var r = -1, s = e.length;
          t < 0 && (t = -t > s ? 0 : s + t), n = n > s ? s : n, n < 0 && (n += s), s = t > n ? 0 : n - t >>> 0, t >>>= 0;
          for (var f = v(s); ++r < s; )
            f[r] = e[r + t];
          return f;
        }
        function nc(e, t) {
          var n;
          return Kt(e, function(r, s, f) {
            return n = t(r, s, f), !n;
          }), !!n;
        }
        function jr(e, t, n) {
          var r = 0, s = e == null ? r : e.length;
          if (typeof t == "number" && t === t && s <= Sr) {
            for (; r < s; ) {
              var f = r + s >>> 1, a = e[f];
              a !== null && !Xe(a) && (n ? a <= t : a < t) ? r = f + 1 : s = f;
            }
            return s;
          }
          return lu(e, t, Ge, n);
        }
        function lu(e, t, n, r) {
          var s = 0, f = e == null ? 0 : e.length;
          if (f === 0)
            return 0;
          t = n(t);
          for (var a = t !== t, h = t === null, _ = Xe(t), E = t === i; s < f; ) {
            var T = kr((s + f) / 2), I = n(e[T]), y = I !== i, O = I === null, C = I === I, G = Xe(I);
            if (a)
              var D = r || C;
            else E ? D = C && (r || y) : h ? D = C && y && (r || !O) : _ ? D = C && y && !O && (r || !G) : O || G ? D = !1 : D = r ? I <= t : I < t;
            D ? s = T + 1 : f = T;
          }
          return be(f, Ir);
        }
        function ro(e, t) {
          for (var n = -1, r = e.length, s = 0, f = []; ++n < r; ) {
            var a = e[n], h = t ? t(a) : a;
            if (!n || !ht(h, _)) {
              var _ = h;
              f[s++] = a === 0 ? 0 : a;
            }
          }
          return f;
        }
        function io(e) {
          return typeof e == "number" ? e : Xe(e) ? jt : +e;
        }
        function Ke(e) {
          if (typeof e == "string")
            return e;
          if (M(e))
            return ie(e, Ke) + "";
          if (Xe(e))
            return Us ? Us.call(e) : "";
          var t = e + "";
          return t == "0" && 1 / e == -vt ? "-0" : t;
        }
        function Xt(e, t, n) {
          var r = -1, s = Cr, f = e.length, a = !0, h = [], _ = h;
          if (n)
            a = !1, s = Wi;
          else if (f >= p) {
            var E = t ? null : gc(e);
            if (E)
              return Nr(E);
            a = !1, s = jn, _ = new on();
          } else
            _ = t ? [] : h;
          e:
            for (; ++r < f; ) {
              var T = e[r], I = t ? t(T) : T;
              if (T = n || T !== 0 ? T : 0, a && I === I) {
                for (var y = _.length; y--; )
                  if (_[y] === I)
                    continue e;
                t && _.push(I), h.push(T);
              } else s(_, I, n) || (_ !== h && _.push(I), h.push(T));
            }
          return h;
        }
        function cu(e, t) {
          return t = Vt(t, e), e = Do(e, t), e == null || delete e[It(it(t))];
        }
        function uo(e, t, n, r) {
          return ar(e, t, n(an(e, t)), r);
        }
        function ei(e, t, n, r) {
          for (var s = e.length, f = r ? s : -1; (r ? f-- : ++f < s) && t(e[f], f, e); )
            ;
          return n ? rt(e, r ? 0 : f, r ? f + 1 : s) : rt(e, r ? f + 1 : 0, r ? s : f);
        }
        function so(e, t) {
          var n = e;
          return n instanceof z && (n = n.value()), Gi(t, function(r, s) {
            return s.func.apply(s.thisArg, $t([r], s.args));
          }, n);
        }
        function hu(e, t, n) {
          var r = e.length;
          if (r < 2)
            return r ? Xt(e[0]) : [];
          for (var s = -1, f = v(r); ++s < r; )
            for (var a = e[s], h = -1; ++h < r; )
              h != s && (f[s] = sr(f[s] || a, e[h], t, n));
          return Xt(ye(f, 1), t, n);
        }
        function oo(e, t, n) {
          for (var r = -1, s = e.length, f = t.length, a = {}; ++r < s; ) {
            var h = r < f ? t[r] : i;
            n(a, e[r], h);
          }
          return a;
        }
        function gu(e) {
          return de(e) ? e : [];
        }
        function du(e) {
          return typeof e == "function" ? e : Ge;
        }
        function Vt(e, t) {
          return M(e) ? e : Su(e, t) ? [e] : Mo(Q(e));
        }
        var rc = H;
        function Jt(e, t, n) {
          var r = e.length;
          return n = n === i ? r : n, !t && n >= r ? e : rt(e, t, n);
        }
        var fo = $a || function(e) {
          return Se.clearTimeout(e);
        };
        function ao(e, t) {
          if (t)
            return e.slice();
          var n = e.length, r = Ls ? Ls(n) : new e.constructor(n);
          return e.copy(r), r;
        }
        function _u(e) {
          var t = new e.constructor(e.byteLength);
          return new Gr(t).set(new Gr(e)), t;
        }
        function ic(e, t) {
          var n = t ? _u(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.byteLength);
        }
        function uc(e) {
          var t = new e.constructor(e.source, Z.exec(e));
          return t.lastIndex = e.lastIndex, t;
        }
        function sc(e) {
          return ir ? ee(ir.call(e)) : {};
        }
        function lo(e, t) {
          var n = t ? _u(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        }
        function co(e, t) {
          if (e !== t) {
            var n = e !== i, r = e === null, s = e === e, f = Xe(e), a = t !== i, h = t === null, _ = t === t, E = Xe(t);
            if (!h && !E && !f && e > t || f && a && _ && !h && !E || r && a && _ || !n && _ || !s)
              return 1;
            if (!r && !f && !E && e < t || E && n && s && !r && !f || h && n && s || !a && s || !_)
              return -1;
          }
          return 0;
        }
        function oc(e, t, n) {
          for (var r = -1, s = e.criteria, f = t.criteria, a = s.length, h = n.length; ++r < a; ) {
            var _ = co(s[r], f[r]);
            if (_) {
              if (r >= h)
                return _;
              var E = n[r];
              return _ * (E == "desc" ? -1 : 1);
            }
          }
          return e.index - t.index;
        }
        function ho(e, t, n, r) {
          for (var s = -1, f = e.length, a = n.length, h = -1, _ = t.length, E = Ee(f - a, 0), T = v(_ + E), I = !r; ++h < _; )
            T[h] = t[h];
          for (; ++s < a; )
            (I || s < f) && (T[n[s]] = e[s]);
          for (; E--; )
            T[h++] = e[s++];
          return T;
        }
        function go(e, t, n, r) {
          for (var s = -1, f = e.length, a = -1, h = n.length, _ = -1, E = t.length, T = Ee(f - h, 0), I = v(T + E), y = !r; ++s < T; )
            I[s] = e[s];
          for (var O = s; ++_ < E; )
            I[O + _] = t[_];
          for (; ++a < h; )
            (y || s < f) && (I[O + n[a]] = e[s++]);
          return I;
        }
        function Me(e, t) {
          var n = -1, r = e.length;
          for (t || (t = v(r)); ++n < r; )
            t[n] = e[n];
          return t;
        }
        function mt(e, t, n, r) {
          var s = !n;
          n || (n = {});
          for (var f = -1, a = t.length; ++f < a; ) {
            var h = t[f], _ = r ? r(n[h], e[h], h, n, e) : i;
            _ === i && (_ = e[h]), s ? Ot(n, h, _) : ur(n, h, _);
          }
          return n;
        }
        function fc(e, t) {
          return mt(e, Iu(e), t);
        }
        function ac(e, t) {
          return mt(e, xo(e), t);
        }
        function ti(e, t) {
          return function(n, r) {
            var s = M(n) ? da : Pl, f = t ? t() : {};
            return s(n, e, P(r, 2), f);
          };
        }
        function Pn(e) {
          return H(function(t, n) {
            var r = -1, s = n.length, f = s > 1 ? n[s - 1] : i, a = s > 2 ? n[2] : i;
            for (f = e.length > 3 && typeof f == "function" ? (s--, f) : i, a && Ne(n[0], n[1], a) && (f = s < 3 ? i : f, s = 1), t = ee(t); ++r < s; ) {
              var h = n[r];
              h && e(t, h, r, f);
            }
            return t;
          });
        }
        function _o(e, t) {
          return function(n, r) {
            if (n == null)
              return n;
            if (!Be(n))
              return e(n, r);
            for (var s = n.length, f = t ? s : -1, a = ee(n); (t ? f-- : ++f < s) && r(a[f], f, a) !== !1; )
              ;
            return n;
          };
        }
        function po(e) {
          return function(t, n, r) {
            for (var s = -1, f = ee(t), a = r(t), h = a.length; h--; ) {
              var _ = a[e ? h : ++s];
              if (n(f[_], _, f) === !1)
                break;
            }
            return t;
          };
        }
        function lc(e, t, n) {
          var r = t & Te, s = lr(e);
          function f() {
            var a = this && this !== Se && this instanceof f ? s : e;
            return a.apply(r ? n : this, arguments);
          }
          return f;
        }
        function vo(e) {
          return function(t) {
            t = Q(t);
            var n = yn(t) ? lt(t) : i, r = n ? n[0] : t.charAt(0), s = n ? Jt(n, 1).join("") : t.slice(1);
            return r[e]() + s;
          };
        }
        function Cn(e) {
          return function(t) {
            return Gi(pf(_f(t).replace(ea, "")), e, "");
          };
        }
        function lr(e) {
          return function() {
            var t = arguments;
            switch (t.length) {
              case 0:
                return new e();
              case 1:
                return new e(t[0]);
              case 2:
                return new e(t[0], t[1]);
              case 3:
                return new e(t[0], t[1], t[2]);
              case 4:
                return new e(t[0], t[1], t[2], t[3]);
              case 5:
                return new e(t[0], t[1], t[2], t[3], t[4]);
              case 6:
                return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
              case 7:
                return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
            }
            var n = Ln(e.prototype), r = e.apply(n, t);
            return se(r) ? r : n;
          };
        }
        function cc(e, t, n) {
          var r = lr(e);
          function s() {
            for (var f = arguments.length, a = v(f), h = f, _ = Dn(s); h--; )
              a[h] = arguments[h];
            var E = f < 3 && a[0] !== _ && a[f - 1] !== _ ? [] : kt(a, _);
            if (f -= E.length, f < n)
              return Io(
                e,
                t,
                ni,
                s.placeholder,
                i,
                a,
                E,
                i,
                i,
                n - f
              );
            var T = this && this !== Se && this instanceof s ? r : e;
            return ke(T, this, a);
          }
          return s;
        }
        function Ro(e) {
          return function(t, n, r) {
            var s = ee(t);
            if (!Be(t)) {
              var f = P(n, 3);
              t = me(t), n = function(h) {
                return f(s[h], h, s);
              };
            }
            var a = e(t, n, r);
            return a > -1 ? s[f ? t[a] : a] : i;
          };
        }
        function Eo(e) {
          return Lt(function(t) {
            var n = t.length, r = n, s = tt.prototype.thru;
            for (e && t.reverse(); r--; ) {
              var f = t[r];
              if (typeof f != "function")
                throw new et(w);
              if (s && !a && si(f) == "wrapper")
                var a = new tt([], !0);
            }
            for (r = a ? r : n; ++r < n; ) {
              f = t[r];
              var h = si(f), _ = h == "wrapper" ? Tu(f) : i;
              _ && yu(_[0]) && _[1] == (J | xe | Oe | ot) && !_[4].length && _[9] == 1 ? a = a[si(_[0])].apply(a, _[3]) : a = f.length == 1 && yu(f) ? a[h]() : a.thru(f);
            }
            return function() {
              var E = arguments, T = E[0];
              if (a && E.length == 1 && M(T))
                return a.plant(T).value();
              for (var I = 0, y = n ? t[I].apply(this, E) : T; ++I < n; )
                y = t[I].call(this, y);
              return y;
            };
          });
        }
        function ni(e, t, n, r, s, f, a, h, _, E) {
          var T = t & J, I = t & Te, y = t & pe, O = t & (xe | st), C = t & Ut, G = y ? i : lr(e);
          function D() {
            for (var $ = arguments.length, K = v($), Ve = $; Ve--; )
              K[Ve] = arguments[Ve];
            if (O)
              var Fe = Dn(D), Je = Sa(K, Fe);
            if (r && (K = ho(K, r, s, O)), f && (K = go(K, f, a, O)), $ -= Je, O && $ < E) {
              var _e = kt(K, Fe);
              return Io(
                e,
                t,
                ni,
                D.placeholder,
                n,
                K,
                _e,
                h,
                _,
                E - $
              );
            }
            var gt = I ? n : this, Nt = y ? gt[e] : e;
            return $ = K.length, h ? K = Pc(K, h) : C && $ > 1 && K.reverse(), T && _ < $ && (K.length = _), this && this !== Se && this instanceof D && (Nt = G || lr(Nt)), Nt.apply(gt, K);
          }
          return D;
        }
        function To(e, t) {
          return function(n, r) {
            return Wl(n, e, t(r), {});
          };
        }
        function ri(e, t) {
          return function(n, r) {
            var s;
            if (n === i && r === i)
              return t;
            if (n !== i && (s = n), r !== i) {
              if (s === i)
                return r;
              typeof n == "string" || typeof r == "string" ? (n = Ke(n), r = Ke(r)) : (n = io(n), r = io(r)), s = e(n, r);
            }
            return s;
          };
        }
        function pu(e) {
          return Lt(function(t) {
            return t = ie(t, ze(P())), H(function(n) {
              var r = this;
              return e(t, function(s) {
                return ke(s, r, n);
              });
            });
          });
        }
        function ii(e, t) {
          t = t === i ? " " : Ke(t);
          var n = t.length;
          if (n < 2)
            return n ? au(t, e) : t;
          var r = au(t, $r(e / wn(t)));
          return yn(t) ? Jt(lt(r), 0, e).join("") : r.slice(0, e);
        }
        function hc(e, t, n, r) {
          var s = t & Te, f = lr(e);
          function a() {
            for (var h = -1, _ = arguments.length, E = -1, T = r.length, I = v(T + _), y = this && this !== Se && this instanceof a ? f : e; ++E < T; )
              I[E] = r[E];
            for (; _--; )
              I[E++] = arguments[++h];
            return ke(y, s ? n : this, I);
          }
          return a;
        }
        function mo(e) {
          return function(t, n, r) {
            return r && typeof r != "number" && Ne(t, n, r) && (n = r = i), t = Dt(t), n === i ? (n = t, t = 0) : n = Dt(n), r = r === i ? t < n ? 1 : -1 : Dt(r), Zl(t, n, r, e);
          };
        }
        function ui(e) {
          return function(t, n) {
            return typeof t == "string" && typeof n == "string" || (t = ut(t), n = ut(n)), e(t, n);
          };
        }
        function Io(e, t, n, r, s, f, a, h, _, E) {
          var T = t & xe, I = T ? a : i, y = T ? i : a, O = T ? f : i, C = T ? i : f;
          t |= T ? Oe : Ce, t &= ~(T ? Ce : Oe), t & re || (t &= -4);
          var G = [
            e,
            t,
            s,
            O,
            I,
            C,
            y,
            h,
            _,
            E
          ], D = n.apply(i, G);
          return yu(e) && No(D, G), D.placeholder = r, Fo(D, e, t);
        }
        function vu(e) {
          var t = Re[e];
          return function(n, r) {
            if (n = ut(n), r = r == null ? 0 : be(B(r), 292), r && Ns(n)) {
              var s = (Q(n) + "e").split("e"), f = t(s[0] + "e" + (+s[1] + r));
              return s = (Q(f) + "e").split("e"), +(s[0] + "e" + (+s[1] - r));
            }
            return t(n);
          };
        }
        var gc = On && 1 / Nr(new On([, -0]))[1] == vt ? function(e) {
          return new On(e);
        } : Wu;
        function So(e) {
          return function(t) {
            var n = Le(t);
            return n == Ye ? Ki(t) : n == $e ? La(t) : Ia(t, e(t));
          };
        }
        function bt(e, t, n, r, s, f, a, h) {
          var _ = t & pe;
          if (!_ && typeof e != "function")
            throw new et(w);
          var E = r ? r.length : 0;
          if (E || (t &= -97, r = s = i), a = a === i ? a : Ee(B(a), 0), h = h === i ? h : B(h), E -= s ? s.length : 0, t & Ce) {
            var T = r, I = s;
            r = s = i;
          }
          var y = _ ? i : Tu(e), O = [
            e,
            t,
            n,
            r,
            s,
            T,
            I,
            f,
            a,
            h
          ];
          if (y && Oc(O, y), e = O[0], t = O[1], n = O[2], r = O[3], s = O[4], h = O[9] = O[9] === i ? _ ? 0 : e.length : Ee(O[9] - E, 0), !h && t & (xe | st) && (t &= -25), !t || t == Te)
            var C = lc(e, t, n);
          else t == xe || t == st ? C = cc(e, t, h) : (t == Oe || t == (Te | Oe)) && !s.length ? C = hc(e, t, n, r) : C = ni.apply(i, O);
          var G = y ? no : No;
          return Fo(G(C, O), e, t);
        }
        function yo(e, t, n, r) {
          return e === i || ht(e, xn[n]) && !j.call(r, n) ? t : e;
        }
        function wo(e, t, n, r, s, f) {
          return se(e) && se(t) && (f.set(t, e), Qr(e, t, i, wo, f), f.delete(t)), e;
        }
        function dc(e) {
          return gr(e) ? i : e;
        }
        function Ao(e, t, n, r, s, f) {
          var a = n & Ae, h = e.length, _ = t.length;
          if (h != _ && !(a && _ > h))
            return !1;
          var E = f.get(e), T = f.get(t);
          if (E && T)
            return E == t && T == e;
          var I = -1, y = !0, O = n & dt ? new on() : i;
          for (f.set(e, t), f.set(t, e); ++I < h; ) {
            var C = e[I], G = t[I];
            if (r)
              var D = a ? r(G, C, I, t, e, f) : r(C, G, I, e, t, f);
            if (D !== i) {
              if (D)
                continue;
              y = !1;
              break;
            }
            if (O) {
              if (!Hi(t, function($, K) {
                if (!jn(O, K) && (C === $ || s(C, $, n, r, f)))
                  return O.push(K);
              })) {
                y = !1;
                break;
              }
            } else if (!(C === G || s(C, G, n, r, f))) {
              y = !1;
              break;
            }
          }
          return f.delete(e), f.delete(t), y;
        }
        function _c(e, t, n, r, s, f, a) {
          switch (n) {
            case Ht:
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                return !1;
              e = e.buffer, t = t.buffer;
            case Gt:
              return !(e.byteLength != t.byteLength || !f(new Gr(e), new Gr(t)));
            case Rt:
            case St:
            case Et:
              return ht(+e, +t);
            case dn:
              return e.name == t.name && e.message == t.message;
            case nn:
            case yt:
              return e == t + "";
            case Ye:
              var h = Ki;
            case $e:
              var _ = r & Ae;
              if (h || (h = Nr), e.size != t.size && !_)
                return !1;
              var E = a.get(e);
              if (E)
                return E == t;
              r |= dt, a.set(e, t);
              var T = Ao(h(e), h(t), r, s, f, a);
              return a.delete(e), T;
            case pn:
              if (ir)
                return ir.call(e) == ir.call(t);
          }
          return !1;
        }
        function pc(e, t, n, r, s, f) {
          var a = n & Ae, h = Ru(e), _ = h.length, E = Ru(t), T = E.length;
          if (_ != T && !a)
            return !1;
          for (var I = _; I--; ) {
            var y = h[I];
            if (!(a ? y in t : j.call(t, y)))
              return !1;
          }
          var O = f.get(e), C = f.get(t);
          if (O && C)
            return O == t && C == e;
          var G = !0;
          f.set(e, t), f.set(t, e);
          for (var D = a; ++I < _; ) {
            y = h[I];
            var $ = e[y], K = t[y];
            if (r)
              var Ve = a ? r(K, $, y, t, e, f) : r($, K, y, e, t, f);
            if (!(Ve === i ? $ === K || s($, K, n, r, f) : Ve)) {
              G = !1;
              break;
            }
            D || (D = y == "constructor");
          }
          if (G && !D) {
            var Fe = e.constructor, Je = t.constructor;
            Fe != Je && "constructor" in e && "constructor" in t && !(typeof Fe == "function" && Fe instanceof Fe && typeof Je == "function" && Je instanceof Je) && (G = !1);
          }
          return f.delete(e), f.delete(t), G;
        }
        function Lt(e) {
          return Au(Co(e, i, Ho), e + "");
        }
        function Ru(e) {
          return ks(e, me, Iu);
        }
        function Eu(e) {
          return ks(e, We, xo);
        }
        var Tu = zr ? function(e) {
          return zr.get(e);
        } : Wu;
        function si(e) {
          for (var t = e.name + "", n = bn[t], r = j.call(bn, t) ? n.length : 0; r--; ) {
            var s = n[r], f = s.func;
            if (f == null || f == e)
              return s.name;
          }
          return t;
        }
        function Dn(e) {
          var t = j.call(o, "placeholder") ? o : e;
          return t.placeholder;
        }
        function P() {
          var e = o.iteratee || Mu;
          return e = e === Mu ? Xs : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function oi(e, t) {
          var n = e.__data__;
          return yc(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
        }
        function mu(e) {
          for (var t = me(e), n = t.length; n--; ) {
            var r = t[n], s = e[r];
            t[n] = [r, s, Lo(s)];
          }
          return t;
        }
        function ln(e, t) {
          var n = xa(e, t);
          return Ks(n) ? n : i;
        }
        function vc(e) {
          var t = j.call(e, un), n = e[un];
          try {
            e[un] = i;
            var r = !0;
          } catch {
          }
          var s = Br.call(e);
          return r && (t ? e[un] = n : delete e[un]), s;
        }
        var Iu = Vi ? function(e) {
          return e == null ? [] : (e = ee(e), Yt(Vi(e), function(t) {
            return Cs.call(e, t);
          }));
        } : Gu, xo = Vi ? function(e) {
          for (var t = []; e; )
            $t(t, Iu(e)), e = Hr(e);
          return t;
        } : Gu, Le = De;
        (Ji && Le(new Ji(new ArrayBuffer(1))) != Ht || tr && Le(new tr()) != Ye || Zi && Le(Zi.resolve()) != Hn || On && Le(new On()) != $e || nr && Le(new nr()) != Wt) && (Le = function(e) {
          var t = De(e), n = t == Ze ? e.constructor : i, r = n ? cn(n) : "";
          if (r)
            switch (r) {
              case ja:
                return Ht;
              case el:
                return Ye;
              case tl:
                return Hn;
              case nl:
                return $e;
              case rl:
                return Wt;
            }
          return t;
        });
        function Rc(e, t, n) {
          for (var r = -1, s = n.length; ++r < s; ) {
            var f = n[r], a = f.size;
            switch (f.type) {
              case "drop":
                e += a;
                break;
              case "dropRight":
                t -= a;
                break;
              case "take":
                t = be(t, e + a);
                break;
              case "takeRight":
                e = Ee(e, t - a);
                break;
            }
          }
          return { start: e, end: t };
        }
        function Ec(e) {
          var t = e.match(bi);
          return t ? t[1].split(c) : [];
        }
        function Oo(e, t, n) {
          t = Vt(t, e);
          for (var r = -1, s = t.length, f = !1; ++r < s; ) {
            var a = It(t[r]);
            if (!(f = e != null && n(e, a)))
              break;
            e = e[a];
          }
          return f || ++r != s ? f : (s = e == null ? 0 : e.length, !!s && di(s) && Pt(a, s) && (M(e) || hn(e)));
        }
        function Tc(e) {
          var t = e.length, n = new e.constructor(t);
          return t && typeof e[0] == "string" && j.call(e, "index") && (n.index = e.index, n.input = e.input), n;
        }
        function bo(e) {
          return typeof e.constructor == "function" && !cr(e) ? Ln(Hr(e)) : {};
        }
        function mc(e, t, n) {
          var r = e.constructor;
          switch (t) {
            case Gt:
              return _u(e);
            case Rt:
            case St:
              return new r(+e);
            case Ht:
              return ic(e, n);
            case vn:
            case Rn:
            case qn:
            case Yn:
            case $n:
            case kn:
            case zn:
            case Kn:
            case Xn:
              return lo(e, n);
            case Ye:
              return new r();
            case Et:
            case yt:
              return new r(e);
            case nn:
              return uc(e);
            case $e:
              return new r();
            case pn:
              return sc(e);
          }
        }
        function Ic(e, t) {
          var n = t.length;
          if (!n)
            return e;
          var r = n - 1;
          return t[r] = (n > 1 ? "& " : "") + t[r], t = t.join(n > 2 ? ", " : " "), e.replace(Oi, `{
/* [wrapped with ` + t + `] */
`);
        }
        function Sc(e) {
          return M(e) || hn(e) || !!(Ds && e && e[Ds]);
        }
        function Pt(e, t) {
          var n = typeof e;
          return t = t ?? ft, !!t && (n == "number" || n != "symbol" && le.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }
        function Ne(e, t, n) {
          if (!se(n))
            return !1;
          var r = typeof t;
          return (r == "number" ? Be(n) && Pt(t, n.length) : r == "string" && t in n) ? ht(n[t], e) : !1;
        }
        function Su(e, t) {
          if (M(e))
            return !1;
          var n = typeof e;
          return n == "number" || n == "symbol" || n == "boolean" || e == null || Xe(e) ? !0 : wi.test(e) || !br.test(e) || t != null && e in ee(t);
        }
        function yc(e) {
          var t = typeof e;
          return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
        }
        function yu(e) {
          var t = si(e), n = o[t];
          if (typeof n != "function" || !(t in z.prototype))
            return !1;
          if (e === n)
            return !0;
          var r = Tu(n);
          return !!r && e === r[0];
        }
        function wc(e) {
          return !!bs && bs in e;
        }
        var Ac = Ur ? Ct : Hu;
        function cr(e) {
          var t = e && e.constructor, n = typeof t == "function" && t.prototype || xn;
          return e === n;
        }
        function Lo(e) {
          return e === e && !se(e);
        }
        function Po(e, t) {
          return function(n) {
            return n == null ? !1 : n[e] === t && (t !== i || e in ee(n));
          };
        }
        function xc(e) {
          var t = hi(e, function(r) {
            return n.size === U && n.clear(), r;
          }), n = t.cache;
          return t;
        }
        function Oc(e, t) {
          var n = e[1], r = t[1], s = n | r, f = s < (Te | pe | J), a = r == J && n == xe || r == J && n == ot && e[7].length <= t[8] || r == (J | ot) && t[7].length <= t[8] && n == xe;
          if (!(f || a))
            return e;
          r & Te && (e[2] = t[2], s |= n & Te ? 0 : re);
          var h = t[3];
          if (h) {
            var _ = e[3];
            e[3] = _ ? ho(_, h, t[4]) : h, e[4] = _ ? kt(e[3], W) : t[4];
          }
          return h = t[5], h && (_ = e[5], e[5] = _ ? go(_, h, t[6]) : h, e[6] = _ ? kt(e[5], W) : t[6]), h = t[7], h && (e[7] = h), r & J && (e[8] = e[8] == null ? t[8] : be(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = s, e;
        }
        function bc(e) {
          var t = [];
          if (e != null)
            for (var n in ee(e))
              t.push(n);
          return t;
        }
        function Lc(e) {
          return Br.call(e);
        }
        function Co(e, t, n) {
          return t = Ee(t === i ? e.length - 1 : t, 0), function() {
            for (var r = arguments, s = -1, f = Ee(r.length - t, 0), a = v(f); ++s < f; )
              a[s] = r[t + s];
            s = -1;
            for (var h = v(t + 1); ++s < t; )
              h[s] = r[s];
            return h[t] = n(a), ke(e, this, h);
          };
        }
        function Do(e, t) {
          return t.length < 2 ? e : an(e, rt(t, 0, -1));
        }
        function Pc(e, t) {
          for (var n = e.length, r = be(t.length, n), s = Me(e); r--; ) {
            var f = t[r];
            e[r] = Pt(f, n) ? s[f] : i;
          }
          return e;
        }
        function wu(e, t) {
          if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
            return e[t];
        }
        var No = Uo(no), hr = za || function(e, t) {
          return Se.setTimeout(e, t);
        }, Au = Uo(ec);
        function Fo(e, t, n) {
          var r = t + "";
          return Au(e, Ic(r, Cc(Ec(r), n)));
        }
        function Uo(e) {
          var t = 0, n = 0;
          return function() {
            var r = Ja(), s = _t - (r - n);
            if (n = r, s > 0) {
              if (++t >= Er)
                return arguments[0];
            } else
              t = 0;
            return e.apply(i, arguments);
          };
        }
        function fi(e, t) {
          var n = -1, r = e.length, s = r - 1;
          for (t = t === i ? r : t; ++n < t; ) {
            var f = fu(n, s), a = e[f];
            e[f] = e[n], e[n] = a;
          }
          return e.length = t, e;
        }
        var Mo = xc(function(e) {
          var t = [];
          return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ai, function(n, r, s, f) {
            t.push(s ? f.replace(N, "$1") : r || n);
          }), t;
        });
        function It(e) {
          if (typeof e == "string" || Xe(e))
            return e;
          var t = e + "";
          return t == "0" && 1 / e == -vt ? "-0" : t;
        }
        function cn(e) {
          if (e != null) {
            try {
              return Mr.call(e);
            } catch {
            }
            try {
              return e + "";
            } catch {
            }
          }
          return "";
        }
        function Cc(e, t) {
          return je(mi, function(n) {
            var r = "_." + n[0];
            t & n[1] && !Cr(e, r) && e.push(r);
          }), e.sort();
        }
        function Bo(e) {
          if (e instanceof z)
            return e.clone();
          var t = new tt(e.__wrapped__, e.__chain__);
          return t.__actions__ = Me(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
        }
        function Dc(e, t, n) {
          (n ? Ne(e, t, n) : t === i) ? t = 1 : t = Ee(B(t), 0);
          var r = e == null ? 0 : e.length;
          if (!r || t < 1)
            return [];
          for (var s = 0, f = 0, a = v($r(r / t)); s < r; )
            a[f++] = rt(e, s, s += t);
          return a;
        }
        function Nc(e) {
          for (var t = -1, n = e == null ? 0 : e.length, r = 0, s = []; ++t < n; ) {
            var f = e[t];
            f && (s[r++] = f);
          }
          return s;
        }
        function Fc() {
          var e = arguments.length;
          if (!e)
            return [];
          for (var t = v(e - 1), n = arguments[0], r = e; r--; )
            t[r - 1] = arguments[r];
          return $t(M(n) ? Me(n) : [n], ye(t, 1));
        }
        var Uc = H(function(e, t) {
          return de(e) ? sr(e, ye(t, 1, de, !0)) : [];
        }), Mc = H(function(e, t) {
          var n = it(t);
          return de(n) && (n = i), de(e) ? sr(e, ye(t, 1, de, !0), P(n, 2)) : [];
        }), Bc = H(function(e, t) {
          var n = it(t);
          return de(n) && (n = i), de(e) ? sr(e, ye(t, 1, de, !0), i, n) : [];
        });
        function Wc(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (t = n || t === i ? 1 : B(t), rt(e, t < 0 ? 0 : t, r)) : [];
        }
        function Gc(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (t = n || t === i ? 1 : B(t), t = r - t, rt(e, 0, t < 0 ? 0 : t)) : [];
        }
        function Hc(e, t) {
          return e && e.length ? ei(e, P(t, 3), !0, !0) : [];
        }
        function qc(e, t) {
          return e && e.length ? ei(e, P(t, 3), !0) : [];
        }
        function Yc(e, t, n, r) {
          var s = e == null ? 0 : e.length;
          return s ? (n && typeof n != "number" && Ne(e, t, n) && (n = 0, r = s), Fl(e, t, n, r)) : [];
        }
        function Wo(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var s = n == null ? 0 : B(n);
          return s < 0 && (s = Ee(r + s, 0)), Dr(e, P(t, 3), s);
        }
        function Go(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var s = r - 1;
          return n !== i && (s = B(n), s = n < 0 ? Ee(r + s, 0) : be(s, r - 1)), Dr(e, P(t, 3), s, !0);
        }
        function Ho(e) {
          var t = e == null ? 0 : e.length;
          return t ? ye(e, 1) : [];
        }
        function $c(e) {
          var t = e == null ? 0 : e.length;
          return t ? ye(e, vt) : [];
        }
        function kc(e, t) {
          var n = e == null ? 0 : e.length;
          return n ? (t = t === i ? 1 : B(t), ye(e, t)) : [];
        }
        function zc(e) {
          for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
            var s = e[t];
            r[s[0]] = s[1];
          }
          return r;
        }
        function qo(e) {
          return e && e.length ? e[0] : i;
        }
        function Kc(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var s = n == null ? 0 : B(n);
          return s < 0 && (s = Ee(r + s, 0)), Sn(e, t, s);
        }
        function Xc(e) {
          var t = e == null ? 0 : e.length;
          return t ? rt(e, 0, -1) : [];
        }
        var Vc = H(function(e) {
          var t = ie(e, gu);
          return t.length && t[0] === e[0] ? ru(t) : [];
        }), Jc = H(function(e) {
          var t = it(e), n = ie(e, gu);
          return t === it(n) ? t = i : n.pop(), n.length && n[0] === e[0] ? ru(n, P(t, 2)) : [];
        }), Zc = H(function(e) {
          var t = it(e), n = ie(e, gu);
          return t = typeof t == "function" ? t : i, t && n.pop(), n.length && n[0] === e[0] ? ru(n, i, t) : [];
        });
        function Qc(e, t) {
          return e == null ? "" : Xa.call(e, t);
        }
        function it(e) {
          var t = e == null ? 0 : e.length;
          return t ? e[t - 1] : i;
        }
        function jc(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var s = r;
          return n !== i && (s = B(n), s = s < 0 ? Ee(r + s, 0) : be(s, r - 1)), t === t ? Ca(e, t, s) : Dr(e, ms, s, !0);
        }
        function eh(e, t) {
          return e && e.length ? Qs(e, B(t)) : i;
        }
        var th = H(Yo);
        function Yo(e, t) {
          return e && e.length && t && t.length ? ou(e, t) : e;
        }
        function nh(e, t, n) {
          return e && e.length && t && t.length ? ou(e, t, P(n, 2)) : e;
        }
        function rh(e, t, n) {
          return e && e.length && t && t.length ? ou(e, t, i, n) : e;
        }
        var ih = Lt(function(e, t) {
          var n = e == null ? 0 : e.length, r = ji(e, t);
          return to(e, ie(t, function(s) {
            return Pt(s, n) ? +s : s;
          }).sort(co)), r;
        });
        function uh(e, t) {
          var n = [];
          if (!(e && e.length))
            return n;
          var r = -1, s = [], f = e.length;
          for (t = P(t, 3); ++r < f; ) {
            var a = e[r];
            t(a, r, e) && (n.push(a), s.push(r));
          }
          return to(e, s), n;
        }
        function xu(e) {
          return e == null ? e : Qa.call(e);
        }
        function sh(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (n && typeof n != "number" && Ne(e, t, n) ? (t = 0, n = r) : (t = t == null ? 0 : B(t), n = n === i ? r : B(n)), rt(e, t, n)) : [];
        }
        function oh(e, t) {
          return jr(e, t);
        }
        function fh(e, t, n) {
          return lu(e, t, P(n, 2));
        }
        function ah(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var r = jr(e, t);
            if (r < n && ht(e[r], t))
              return r;
          }
          return -1;
        }
        function lh(e, t) {
          return jr(e, t, !0);
        }
        function ch(e, t, n) {
          return lu(e, t, P(n, 2), !0);
        }
        function hh(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var r = jr(e, t, !0) - 1;
            if (ht(e[r], t))
              return r;
          }
          return -1;
        }
        function gh(e) {
          return e && e.length ? ro(e) : [];
        }
        function dh(e, t) {
          return e && e.length ? ro(e, P(t, 2)) : [];
        }
        function _h(e) {
          var t = e == null ? 0 : e.length;
          return t ? rt(e, 1, t) : [];
        }
        function ph(e, t, n) {
          return e && e.length ? (t = n || t === i ? 1 : B(t), rt(e, 0, t < 0 ? 0 : t)) : [];
        }
        function vh(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (t = n || t === i ? 1 : B(t), t = r - t, rt(e, t < 0 ? 0 : t, r)) : [];
        }
        function Rh(e, t) {
          return e && e.length ? ei(e, P(t, 3), !1, !0) : [];
        }
        function Eh(e, t) {
          return e && e.length ? ei(e, P(t, 3)) : [];
        }
        var Th = H(function(e) {
          return Xt(ye(e, 1, de, !0));
        }), mh = H(function(e) {
          var t = it(e);
          return de(t) && (t = i), Xt(ye(e, 1, de, !0), P(t, 2));
        }), Ih = H(function(e) {
          var t = it(e);
          return t = typeof t == "function" ? t : i, Xt(ye(e, 1, de, !0), i, t);
        });
        function Sh(e) {
          return e && e.length ? Xt(e) : [];
        }
        function yh(e, t) {
          return e && e.length ? Xt(e, P(t, 2)) : [];
        }
        function wh(e, t) {
          return t = typeof t == "function" ? t : i, e && e.length ? Xt(e, i, t) : [];
        }
        function Ou(e) {
          if (!(e && e.length))
            return [];
          var t = 0;
          return e = Yt(e, function(n) {
            if (de(n))
              return t = Ee(n.length, t), !0;
          }), ki(t, function(n) {
            return ie(e, qi(n));
          });
        }
        function $o(e, t) {
          if (!(e && e.length))
            return [];
          var n = Ou(e);
          return t == null ? n : ie(n, function(r) {
            return ke(t, i, r);
          });
        }
        var Ah = H(function(e, t) {
          return de(e) ? sr(e, t) : [];
        }), xh = H(function(e) {
          return hu(Yt(e, de));
        }), Oh = H(function(e) {
          var t = it(e);
          return de(t) && (t = i), hu(Yt(e, de), P(t, 2));
        }), bh = H(function(e) {
          var t = it(e);
          return t = typeof t == "function" ? t : i, hu(Yt(e, de), i, t);
        }), Lh = H(Ou);
        function Ph(e, t) {
          return oo(e || [], t || [], ur);
        }
        function Ch(e, t) {
          return oo(e || [], t || [], ar);
        }
        var Dh = H(function(e) {
          var t = e.length, n = t > 1 ? e[t - 1] : i;
          return n = typeof n == "function" ? (e.pop(), n) : i, $o(e, n);
        });
        function ko(e) {
          var t = o(e);
          return t.__chain__ = !0, t;
        }
        function Nh(e, t) {
          return t(e), e;
        }
        function ai(e, t) {
          return t(e);
        }
        var Fh = Lt(function(e) {
          var t = e.length, n = t ? e[0] : 0, r = this.__wrapped__, s = function(f) {
            return ji(f, e);
          };
          return t > 1 || this.__actions__.length || !(r instanceof z) || !Pt(n) ? this.thru(s) : (r = r.slice(n, +n + (t ? 1 : 0)), r.__actions__.push({
            func: ai,
            args: [s],
            thisArg: i
          }), new tt(r, this.__chain__).thru(function(f) {
            return t && !f.length && f.push(i), f;
          }));
        });
        function Uh() {
          return ko(this);
        }
        function Mh() {
          return new tt(this.value(), this.__chain__);
        }
        function Bh() {
          this.__values__ === i && (this.__values__ = sf(this.value()));
          var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
          return { done: e, value: t };
        }
        function Wh() {
          return this;
        }
        function Gh(e) {
          for (var t, n = this; n instanceof Xr; ) {
            var r = Bo(n);
            r.__index__ = 0, r.__values__ = i, t ? s.__wrapped__ = r : t = r;
            var s = r;
            n = n.__wrapped__;
          }
          return s.__wrapped__ = e, t;
        }
        function Hh() {
          var e = this.__wrapped__;
          if (e instanceof z) {
            var t = e;
            return this.__actions__.length && (t = new z(this)), t = t.reverse(), t.__actions__.push({
              func: ai,
              args: [xu],
              thisArg: i
            }), new tt(t, this.__chain__);
          }
          return this.thru(xu);
        }
        function qh() {
          return so(this.__wrapped__, this.__actions__);
        }
        var Yh = ti(function(e, t, n) {
          j.call(e, n) ? ++e[n] : Ot(e, n, 1);
        });
        function $h(e, t, n) {
          var r = M(e) ? Es : Nl;
          return n && Ne(e, t, n) && (t = i), r(e, P(t, 3));
        }
        function kh(e, t) {
          var n = M(e) ? Yt : Ys;
          return n(e, P(t, 3));
        }
        var zh = Ro(Wo), Kh = Ro(Go);
        function Xh(e, t) {
          return ye(li(e, t), 1);
        }
        function Vh(e, t) {
          return ye(li(e, t), vt);
        }
        function Jh(e, t, n) {
          return n = n === i ? 1 : B(n), ye(li(e, t), n);
        }
        function zo(e, t) {
          var n = M(e) ? je : Kt;
          return n(e, P(t, 3));
        }
        function Ko(e, t) {
          var n = M(e) ? _a : qs;
          return n(e, P(t, 3));
        }
        var Zh = ti(function(e, t, n) {
          j.call(e, n) ? e[n].push(t) : Ot(e, n, [t]);
        });
        function Qh(e, t, n, r) {
          e = Be(e) ? e : Fn(e), n = n && !r ? B(n) : 0;
          var s = e.length;
          return n < 0 && (n = Ee(s + n, 0)), _i(e) ? n <= s && e.indexOf(t, n) > -1 : !!s && Sn(e, t, n) > -1;
        }
        var jh = H(function(e, t, n) {
          var r = -1, s = typeof t == "function", f = Be(e) ? v(e.length) : [];
          return Kt(e, function(a) {
            f[++r] = s ? ke(t, a, n) : or(a, t, n);
          }), f;
        }), eg = ti(function(e, t, n) {
          Ot(e, n, t);
        });
        function li(e, t) {
          var n = M(e) ? ie : Vs;
          return n(e, P(t, 3));
        }
        function tg(e, t, n, r) {
          return e == null ? [] : (M(t) || (t = t == null ? [] : [t]), n = r ? i : n, M(n) || (n = n == null ? [] : [n]), js(e, t, n));
        }
        var ng = ti(function(e, t, n) {
          e[n ? 0 : 1].push(t);
        }, function() {
          return [[], []];
        });
        function rg(e, t, n) {
          var r = M(e) ? Gi : Ss, s = arguments.length < 3;
          return r(e, P(t, 4), n, s, Kt);
        }
        function ig(e, t, n) {
          var r = M(e) ? pa : Ss, s = arguments.length < 3;
          return r(e, P(t, 4), n, s, qs);
        }
        function ug(e, t) {
          var n = M(e) ? Yt : Ys;
          return n(e, gi(P(t, 3)));
        }
        function sg(e) {
          var t = M(e) ? Bs : Ql;
          return t(e);
        }
        function og(e, t, n) {
          (n ? Ne(e, t, n) : t === i) ? t = 1 : t = B(t);
          var r = M(e) ? bl : jl;
          return r(e, t);
        }
        function fg(e) {
          var t = M(e) ? Ll : tc;
          return t(e);
        }
        function ag(e) {
          if (e == null)
            return 0;
          if (Be(e))
            return _i(e) ? wn(e) : e.length;
          var t = Le(e);
          return t == Ye || t == $e ? e.size : uu(e).length;
        }
        function lg(e, t, n) {
          var r = M(e) ? Hi : nc;
          return n && Ne(e, t, n) && (t = i), r(e, P(t, 3));
        }
        var cg = H(function(e, t) {
          if (e == null)
            return [];
          var n = t.length;
          return n > 1 && Ne(e, t[0], t[1]) ? t = [] : n > 2 && Ne(t[0], t[1], t[2]) && (t = [t[0]]), js(e, ye(t, 1), []);
        }), ci = ka || function() {
          return Se.Date.now();
        };
        function hg(e, t) {
          if (typeof t != "function")
            throw new et(w);
          return e = B(e), function() {
            if (--e < 1)
              return t.apply(this, arguments);
          };
        }
        function Xo(e, t, n) {
          return t = n ? i : t, t = e && t == null ? e.length : t, bt(e, J, i, i, i, i, t);
        }
        function Vo(e, t) {
          var n;
          if (typeof t != "function")
            throw new et(w);
          return e = B(e), function() {
            return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = i), n;
          };
        }
        var bu = H(function(e, t, n) {
          var r = Te;
          if (n.length) {
            var s = kt(n, Dn(bu));
            r |= Oe;
          }
          return bt(e, r, t, n, s);
        }), Jo = H(function(e, t, n) {
          var r = Te | pe;
          if (n.length) {
            var s = kt(n, Dn(Jo));
            r |= Oe;
          }
          return bt(t, r, e, n, s);
        });
        function Zo(e, t, n) {
          t = n ? i : t;
          var r = bt(e, xe, i, i, i, i, i, t);
          return r.placeholder = Zo.placeholder, r;
        }
        function Qo(e, t, n) {
          t = n ? i : t;
          var r = bt(e, st, i, i, i, i, i, t);
          return r.placeholder = Qo.placeholder, r;
        }
        function jo(e, t, n) {
          var r, s, f, a, h, _, E = 0, T = !1, I = !1, y = !0;
          if (typeof e != "function")
            throw new et(w);
          t = ut(t) || 0, se(n) && (T = !!n.leading, I = "maxWait" in n, f = I ? Ee(ut(n.maxWait) || 0, t) : f, y = "trailing" in n ? !!n.trailing : y);
          function O(_e) {
            var gt = r, Nt = s;
            return r = s = i, E = _e, a = e.apply(Nt, gt), a;
          }
          function C(_e) {
            return E = _e, h = hr($, t), T ? O(_e) : a;
          }
          function G(_e) {
            var gt = _e - _, Nt = _e - E, Ef = t - gt;
            return I ? be(Ef, f - Nt) : Ef;
          }
          function D(_e) {
            var gt = _e - _, Nt = _e - E;
            return _ === i || gt >= t || gt < 0 || I && Nt >= f;
          }
          function $() {
            var _e = ci();
            if (D(_e))
              return K(_e);
            h = hr($, G(_e));
          }
          function K(_e) {
            return h = i, y && r ? O(_e) : (r = s = i, a);
          }
          function Ve() {
            h !== i && fo(h), E = 0, r = _ = s = h = i;
          }
          function Fe() {
            return h === i ? a : K(ci());
          }
          function Je() {
            var _e = ci(), gt = D(_e);
            if (r = arguments, s = this, _ = _e, gt) {
              if (h === i)
                return C(_);
              if (I)
                return fo(h), h = hr($, t), O(_);
            }
            return h === i && (h = hr($, t)), a;
          }
          return Je.cancel = Ve, Je.flush = Fe, Je;
        }
        var gg = H(function(e, t) {
          return Hs(e, 1, t);
        }), dg = H(function(e, t, n) {
          return Hs(e, ut(t) || 0, n);
        });
        function _g(e) {
          return bt(e, Ut);
        }
        function hi(e, t) {
          if (typeof e != "function" || t != null && typeof t != "function")
            throw new et(w);
          var n = function() {
            var r = arguments, s = t ? t.apply(this, r) : r[0], f = n.cache;
            if (f.has(s))
              return f.get(s);
            var a = e.apply(this, r);
            return n.cache = f.set(s, a) || f, a;
          };
          return n.cache = new (hi.Cache || xt)(), n;
        }
        hi.Cache = xt;
        function gi(e) {
          if (typeof e != "function")
            throw new et(w);
          return function() {
            var t = arguments;
            switch (t.length) {
              case 0:
                return !e.call(this);
              case 1:
                return !e.call(this, t[0]);
              case 2:
                return !e.call(this, t[0], t[1]);
              case 3:
                return !e.call(this, t[0], t[1], t[2]);
            }
            return !e.apply(this, t);
          };
        }
        function pg(e) {
          return Vo(2, e);
        }
        var vg = rc(function(e, t) {
          t = t.length == 1 && M(t[0]) ? ie(t[0], ze(P())) : ie(ye(t, 1), ze(P()));
          var n = t.length;
          return H(function(r) {
            for (var s = -1, f = be(r.length, n); ++s < f; )
              r[s] = t[s].call(this, r[s]);
            return ke(e, this, r);
          });
        }), Lu = H(function(e, t) {
          var n = kt(t, Dn(Lu));
          return bt(e, Oe, i, t, n);
        }), ef = H(function(e, t) {
          var n = kt(t, Dn(ef));
          return bt(e, Ce, i, t, n);
        }), Rg = Lt(function(e, t) {
          return bt(e, ot, i, i, i, t);
        });
        function Eg(e, t) {
          if (typeof e != "function")
            throw new et(w);
          return t = t === i ? t : B(t), H(e, t);
        }
        function Tg(e, t) {
          if (typeof e != "function")
            throw new et(w);
          return t = t == null ? 0 : Ee(B(t), 0), H(function(n) {
            var r = n[t], s = Jt(n, 0, t);
            return r && $t(s, r), ke(e, this, s);
          });
        }
        function mg(e, t, n) {
          var r = !0, s = !0;
          if (typeof e != "function")
            throw new et(w);
          return se(n) && (r = "leading" in n ? !!n.leading : r, s = "trailing" in n ? !!n.trailing : s), jo(e, t, {
            leading: r,
            maxWait: t,
            trailing: s
          });
        }
        function Ig(e) {
          return Xo(e, 1);
        }
        function Sg(e, t) {
          return Lu(du(t), e);
        }
        function yg() {
          if (!arguments.length)
            return [];
          var e = arguments[0];
          return M(e) ? e : [e];
        }
        function wg(e) {
          return nt(e, ge);
        }
        function Ag(e, t) {
          return t = typeof t == "function" ? t : i, nt(e, ge, t);
        }
        function xg(e) {
          return nt(e, q | ge);
        }
        function Og(e, t) {
          return t = typeof t == "function" ? t : i, nt(e, q | ge, t);
        }
        function bg(e, t) {
          return t == null || Gs(e, t, me(t));
        }
        function ht(e, t) {
          return e === t || e !== e && t !== t;
        }
        var Lg = ui(nu), Pg = ui(function(e, t) {
          return e >= t;
        }), hn = zs(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? zs : function(e) {
          return ce(e) && j.call(e, "callee") && !Cs.call(e, "callee");
        }, M = v.isArray, Cg = gs ? ze(gs) : Gl;
        function Be(e) {
          return e != null && di(e.length) && !Ct(e);
        }
        function de(e) {
          return ce(e) && Be(e);
        }
        function Dg(e) {
          return e === !0 || e === !1 || ce(e) && De(e) == Rt;
        }
        var Zt = Ka || Hu, Ng = ds ? ze(ds) : Hl;
        function Fg(e) {
          return ce(e) && e.nodeType === 1 && !gr(e);
        }
        function Ug(e) {
          if (e == null)
            return !0;
          if (Be(e) && (M(e) || typeof e == "string" || typeof e.splice == "function" || Zt(e) || Nn(e) || hn(e)))
            return !e.length;
          var t = Le(e);
          if (t == Ye || t == $e)
            return !e.size;
          if (cr(e))
            return !uu(e).length;
          for (var n in e)
            if (j.call(e, n))
              return !1;
          return !0;
        }
        function Mg(e, t) {
          return fr(e, t);
        }
        function Bg(e, t, n) {
          n = typeof n == "function" ? n : i;
          var r = n ? n(e, t) : i;
          return r === i ? fr(e, t, i, n) : !!r;
        }
        function Pu(e) {
          if (!ce(e))
            return !1;
          var t = De(e);
          return t == dn || t == gn || typeof e.message == "string" && typeof e.name == "string" && !gr(e);
        }
        function Wg(e) {
          return typeof e == "number" && Ns(e);
        }
        function Ct(e) {
          if (!se(e))
            return !1;
          var t = De(e);
          return t == en || t == yr || t == Gn || t == _n;
        }
        function tf(e) {
          return typeof e == "number" && e == B(e);
        }
        function di(e) {
          return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ft;
        }
        function se(e) {
          var t = typeof e;
          return e != null && (t == "object" || t == "function");
        }
        function ce(e) {
          return e != null && typeof e == "object";
        }
        var nf = _s ? ze(_s) : Yl;
        function Gg(e, t) {
          return e === t || iu(e, t, mu(t));
        }
        function Hg(e, t, n) {
          return n = typeof n == "function" ? n : i, iu(e, t, mu(t), n);
        }
        function qg(e) {
          return rf(e) && e != +e;
        }
        function Yg(e) {
          if (Ac(e))
            throw new F(m);
          return Ks(e);
        }
        function $g(e) {
          return e === null;
        }
        function kg(e) {
          return e == null;
        }
        function rf(e) {
          return typeof e == "number" || ce(e) && De(e) == Et;
        }
        function gr(e) {
          if (!ce(e) || De(e) != Ze)
            return !1;
          var t = Hr(e);
          if (t === null)
            return !0;
          var n = j.call(t, "constructor") && t.constructor;
          return typeof n == "function" && n instanceof n && Mr.call(n) == Ha;
        }
        var Cu = ps ? ze(ps) : $l;
        function zg(e) {
          return tf(e) && e >= -ft && e <= ft;
        }
        var uf = vs ? ze(vs) : kl;
        function _i(e) {
          return typeof e == "string" || !M(e) && ce(e) && De(e) == yt;
        }
        function Xe(e) {
          return typeof e == "symbol" || ce(e) && De(e) == pn;
        }
        var Nn = Rs ? ze(Rs) : zl;
        function Kg(e) {
          return e === i;
        }
        function Xg(e) {
          return ce(e) && Le(e) == Wt;
        }
        function Vg(e) {
          return ce(e) && De(e) == wr;
        }
        var Jg = ui(su), Zg = ui(function(e, t) {
          return e <= t;
        });
        function sf(e) {
          if (!e)
            return [];
          if (Be(e))
            return _i(e) ? lt(e) : Me(e);
          if (er && e[er])
            return ba(e[er]());
          var t = Le(e), n = t == Ye ? Ki : t == $e ? Nr : Fn;
          return n(e);
        }
        function Dt(e) {
          if (!e)
            return e === 0 ? e : 0;
          if (e = ut(e), e === vt || e === -vt) {
            var t = e < 0 ? -1 : 1;
            return t * mr;
          }
          return e === e ? e : 0;
        }
        function B(e) {
          var t = Dt(e), n = t % 1;
          return t === t ? n ? t - n : t : 0;
        }
        function of(e) {
          return e ? fn(B(e), 0, qe) : 0;
        }
        function ut(e) {
          if (typeof e == "number")
            return e;
          if (Xe(e))
            return jt;
          if (se(e)) {
            var t = typeof e.valueOf == "function" ? e.valueOf() : e;
            e = se(t) ? t + "" : t;
          }
          if (typeof e != "string")
            return e === 0 ? e : +e;
          e = ys(e);
          var n = Y.test(e);
          return n || ue.test(e) ? ha(e.slice(2), n ? 2 : 8) : k.test(e) ? jt : +e;
        }
        function ff(e) {
          return mt(e, We(e));
        }
        function Qg(e) {
          return e ? fn(B(e), -ft, ft) : e === 0 ? e : 0;
        }
        function Q(e) {
          return e == null ? "" : Ke(e);
        }
        var jg = Pn(function(e, t) {
          if (cr(t) || Be(t)) {
            mt(t, me(t), e);
            return;
          }
          for (var n in t)
            j.call(t, n) && ur(e, n, t[n]);
        }), af = Pn(function(e, t) {
          mt(t, We(t), e);
        }), pi = Pn(function(e, t, n, r) {
          mt(t, We(t), e, r);
        }), ed = Pn(function(e, t, n, r) {
          mt(t, me(t), e, r);
        }), td = Lt(ji);
        function nd(e, t) {
          var n = Ln(e);
          return t == null ? n : Ws(n, t);
        }
        var rd = H(function(e, t) {
          e = ee(e);
          var n = -1, r = t.length, s = r > 2 ? t[2] : i;
          for (s && Ne(t[0], t[1], s) && (r = 1); ++n < r; )
            for (var f = t[n], a = We(f), h = -1, _ = a.length; ++h < _; ) {
              var E = a[h], T = e[E];
              (T === i || ht(T, xn[E]) && !j.call(e, E)) && (e[E] = f[E]);
            }
          return e;
        }), id = H(function(e) {
          return e.push(i, wo), ke(lf, i, e);
        });
        function ud(e, t) {
          return Ts(e, P(t, 3), Tt);
        }
        function sd(e, t) {
          return Ts(e, P(t, 3), tu);
        }
        function od(e, t) {
          return e == null ? e : eu(e, P(t, 3), We);
        }
        function fd(e, t) {
          return e == null ? e : $s(e, P(t, 3), We);
        }
        function ad(e, t) {
          return e && Tt(e, P(t, 3));
        }
        function ld(e, t) {
          return e && tu(e, P(t, 3));
        }
        function cd(e) {
          return e == null ? [] : Zr(e, me(e));
        }
        function hd(e) {
          return e == null ? [] : Zr(e, We(e));
        }
        function Du(e, t, n) {
          var r = e == null ? i : an(e, t);
          return r === i ? n : r;
        }
        function gd(e, t) {
          return e != null && Oo(e, t, Ul);
        }
        function Nu(e, t) {
          return e != null && Oo(e, t, Ml);
        }
        var dd = To(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = Br.call(t)), e[t] = n;
        }, Uu(Ge)), _d = To(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = Br.call(t)), j.call(e, t) ? e[t].push(n) : e[t] = [n];
        }, P), pd = H(or);
        function me(e) {
          return Be(e) ? Ms(e) : uu(e);
        }
        function We(e) {
          return Be(e) ? Ms(e, !0) : Kl(e);
        }
        function vd(e, t) {
          var n = {};
          return t = P(t, 3), Tt(e, function(r, s, f) {
            Ot(n, t(r, s, f), r);
          }), n;
        }
        function Rd(e, t) {
          var n = {};
          return t = P(t, 3), Tt(e, function(r, s, f) {
            Ot(n, s, t(r, s, f));
          }), n;
        }
        var Ed = Pn(function(e, t, n) {
          Qr(e, t, n);
        }), lf = Pn(function(e, t, n, r) {
          Qr(e, t, n, r);
        }), Td = Lt(function(e, t) {
          var n = {};
          if (e == null)
            return n;
          var r = !1;
          t = ie(t, function(f) {
            return f = Vt(f, e), r || (r = f.length > 1), f;
          }), mt(e, Eu(e), n), r && (n = nt(n, q | he | ge, dc));
          for (var s = t.length; s--; )
            cu(n, t[s]);
          return n;
        });
        function md(e, t) {
          return cf(e, gi(P(t)));
        }
        var Id = Lt(function(e, t) {
          return e == null ? {} : Vl(e, t);
        });
        function cf(e, t) {
          if (e == null)
            return {};
          var n = ie(Eu(e), function(r) {
            return [r];
          });
          return t = P(t), eo(e, n, function(r, s) {
            return t(r, s[0]);
          });
        }
        function Sd(e, t, n) {
          t = Vt(t, e);
          var r = -1, s = t.length;
          for (s || (s = 1, e = i); ++r < s; ) {
            var f = e == null ? i : e[It(t[r])];
            f === i && (r = s, f = n), e = Ct(f) ? f.call(e) : f;
          }
          return e;
        }
        function yd(e, t, n) {
          return e == null ? e : ar(e, t, n);
        }
        function wd(e, t, n, r) {
          return r = typeof r == "function" ? r : i, e == null ? e : ar(e, t, n, r);
        }
        var hf = So(me), gf = So(We);
        function Ad(e, t, n) {
          var r = M(e), s = r || Zt(e) || Nn(e);
          if (t = P(t, 4), n == null) {
            var f = e && e.constructor;
            s ? n = r ? new f() : [] : se(e) ? n = Ct(f) ? Ln(Hr(e)) : {} : n = {};
          }
          return (s ? je : Tt)(e, function(a, h, _) {
            return t(n, a, h, _);
          }), n;
        }
        function xd(e, t) {
          return e == null ? !0 : cu(e, t);
        }
        function Od(e, t, n) {
          return e == null ? e : uo(e, t, du(n));
        }
        function bd(e, t, n, r) {
          return r = typeof r == "function" ? r : i, e == null ? e : uo(e, t, du(n), r);
        }
        function Fn(e) {
          return e == null ? [] : zi(e, me(e));
        }
        function Ld(e) {
          return e == null ? [] : zi(e, We(e));
        }
        function Pd(e, t, n) {
          return n === i && (n = t, t = i), n !== i && (n = ut(n), n = n === n ? n : 0), t !== i && (t = ut(t), t = t === t ? t : 0), fn(ut(e), t, n);
        }
        function Cd(e, t, n) {
          return t = Dt(t), n === i ? (n = t, t = 0) : n = Dt(n), e = ut(e), Bl(e, t, n);
        }
        function Dd(e, t, n) {
          if (n && typeof n != "boolean" && Ne(e, t, n) && (t = n = i), n === i && (typeof t == "boolean" ? (n = t, t = i) : typeof e == "boolean" && (n = e, e = i)), e === i && t === i ? (e = 0, t = 1) : (e = Dt(e), t === i ? (t = e, e = 0) : t = Dt(t)), e > t) {
            var r = e;
            e = t, t = r;
          }
          if (n || e % 1 || t % 1) {
            var s = Fs();
            return be(e + s * (t - e + ca("1e-" + ((s + "").length - 1))), t);
          }
          return fu(e, t);
        }
        var Nd = Cn(function(e, t, n) {
          return t = t.toLowerCase(), e + (n ? df(t) : t);
        });
        function df(e) {
          return Fu(Q(e).toLowerCase());
        }
        function _f(e) {
          return e = Q(e), e && e.replace(Ue, ya).replace(ta, "");
        }
        function Fd(e, t, n) {
          e = Q(e), t = Ke(t);
          var r = e.length;
          n = n === i ? r : fn(B(n), 0, r);
          var s = n;
          return n -= t.length, n >= 0 && e.slice(n, s) == t;
        }
        function Ud(e) {
          return e = Q(e), e && Si.test(e) ? e.replace(Tn, wa) : e;
        }
        function Md(e) {
          return e = Q(e), e && Lr.test(e) ? e.replace(mn, "\\$&") : e;
        }
        var Bd = Cn(function(e, t, n) {
          return e + (n ? "-" : "") + t.toLowerCase();
        }), Wd = Cn(function(e, t, n) {
          return e + (n ? " " : "") + t.toLowerCase();
        }), Gd = vo("toLowerCase");
        function Hd(e, t, n) {
          e = Q(e), t = B(t);
          var r = t ? wn(e) : 0;
          if (!t || r >= t)
            return e;
          var s = (t - r) / 2;
          return ii(kr(s), n) + e + ii($r(s), n);
        }
        function qd(e, t, n) {
          e = Q(e), t = B(t);
          var r = t ? wn(e) : 0;
          return t && r < t ? e + ii(t - r, n) : e;
        }
        function Yd(e, t, n) {
          e = Q(e), t = B(t);
          var r = t ? wn(e) : 0;
          return t && r < t ? ii(t - r, n) + e : e;
        }
        function $d(e, t, n) {
          return n || t == null ? t = 0 : t && (t = +t), Za(Q(e).replace(Zn, ""), t || 0);
        }
        function kd(e, t, n) {
          return (n ? Ne(e, t, n) : t === i) ? t = 1 : t = B(t), au(Q(e), t);
        }
        function zd() {
          var e = arguments, t = Q(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }
        var Kd = Cn(function(e, t, n) {
          return e + (n ? "_" : "") + t.toLowerCase();
        });
        function Xd(e, t, n) {
          return n && typeof n != "number" && Ne(e, t, n) && (t = n = i), n = n === i ? qe : n >>> 0, n ? (e = Q(e), e && (typeof t == "string" || t != null && !Cu(t)) && (t = Ke(t), !t && yn(e)) ? Jt(lt(e), 0, n) : e.split(t, n)) : [];
        }
        var Vd = Cn(function(e, t, n) {
          return e + (n ? " " : "") + Fu(t);
        });
        function Jd(e, t, n) {
          return e = Q(e), n = n == null ? 0 : fn(B(n), 0, e.length), t = Ke(t), e.slice(n, n + t.length) == t;
        }
        function Zd(e, t, n) {
          var r = o.templateSettings;
          n && Ne(e, t, n) && (t = i), e = Q(e), t = pi({}, t, r, yo);
          var s = pi({}, t.imports, r.imports, yo), f = me(s), a = zi(s, f), h, _, E = 0, T = t.interpolate || at, I = "__p += '", y = Xi(
            (t.escape || at).source + "|" + T.source + "|" + (T === Jn ? X : at).source + "|" + (t.evaluate || at).source + "|$",
            "g"
          ), O = "//# sourceURL=" + (j.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++sa + "]") + `
`;
          e.replace(y, function(D, $, K, Ve, Fe, Je) {
            return K || (K = Ve), I += e.slice(E, Je).replace(wt, Aa), $ && (h = !0, I += `' +
__e(` + $ + `) +
'`), Fe && (_ = !0, I += `';
` + Fe + `;
__p += '`), K && (I += `' +
((__t = (` + K + `)) == null ? '' : __t) +
'`), E = Je + D.length, D;
          }), I += `';
`;
          var C = j.call(t, "variable") && t.variable;
          if (!C)
            I = `with (obj) {
` + I + `
}
`;
          else if (A.test(C))
            throw new F(b);
          I = (_ ? I.replace(Vn, "") : I).replace(Ar, "$1").replace(qt, "$1;"), I = "function(" + (C || "obj") + `) {
` + (C ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (h ? ", __e = _.escape" : "") + (_ ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + I + `return __p
}`;
          var G = vf(function() {
            return V(f, O + "return " + I).apply(i, a);
          });
          if (G.source = I, Pu(G))
            throw G;
          return G;
        }
        function Qd(e) {
          return Q(e).toLowerCase();
        }
        function jd(e) {
          return Q(e).toUpperCase();
        }
        function e_(e, t, n) {
          if (e = Q(e), e && (n || t === i))
            return ys(e);
          if (!e || !(t = Ke(t)))
            return e;
          var r = lt(e), s = lt(t), f = ws(r, s), a = As(r, s) + 1;
          return Jt(r, f, a).join("");
        }
        function t_(e, t, n) {
          if (e = Q(e), e && (n || t === i))
            return e.slice(0, Os(e) + 1);
          if (!e || !(t = Ke(t)))
            return e;
          var r = lt(e), s = As(r, lt(t)) + 1;
          return Jt(r, 0, s).join("");
        }
        function n_(e, t, n) {
          if (e = Q(e), e && (n || t === i))
            return e.replace(Zn, "");
          if (!e || !(t = Ke(t)))
            return e;
          var r = lt(e), s = ws(r, lt(t));
          return Jt(r, s).join("");
        }
        function r_(e, t) {
          var n = Bn, r = Wn;
          if (se(t)) {
            var s = "separator" in t ? t.separator : s;
            n = "length" in t ? B(t.length) : n, r = "omission" in t ? Ke(t.omission) : r;
          }
          e = Q(e);
          var f = e.length;
          if (yn(e)) {
            var a = lt(e);
            f = a.length;
          }
          if (n >= f)
            return e;
          var h = n - wn(r);
          if (h < 1)
            return r;
          var _ = a ? Jt(a, 0, h).join("") : e.slice(0, h);
          if (s === i)
            return _ + r;
          if (a && (h += _.length - h), Cu(s)) {
            if (e.slice(h).search(s)) {
              var E, T = _;
              for (s.global || (s = Xi(s.source, Q(Z.exec(s)) + "g")), s.lastIndex = 0; E = s.exec(T); )
                var I = E.index;
              _ = _.slice(0, I === i ? h : I);
            }
          } else if (e.indexOf(Ke(s), h) != h) {
            var y = _.lastIndexOf(s);
            y > -1 && (_ = _.slice(0, y));
          }
          return _ + r;
        }
        function i_(e) {
          return e = Q(e), e && xr.test(e) ? e.replace(En, Da) : e;
        }
        var u_ = Cn(function(e, t, n) {
          return e + (n ? " " : "") + t.toUpperCase();
        }), Fu = vo("toUpperCase");
        function pf(e, t, n) {
          return e = Q(e), t = n ? i : t, t === i ? Oa(e) ? Ua(e) : Ea(e) : e.match(t) || [];
        }
        var vf = H(function(e, t) {
          try {
            return ke(e, i, t);
          } catch (n) {
            return Pu(n) ? n : new F(n);
          }
        }), s_ = Lt(function(e, t) {
          return je(t, function(n) {
            n = It(n), Ot(e, n, bu(e[n], e));
          }), e;
        });
        function o_(e) {
          var t = e == null ? 0 : e.length, n = P();
          return e = t ? ie(e, function(r) {
            if (typeof r[1] != "function")
              throw new et(w);
            return [n(r[0]), r[1]];
          }) : [], H(function(r) {
            for (var s = -1; ++s < t; ) {
              var f = e[s];
              if (ke(f[0], this, r))
                return ke(f[1], this, r);
            }
          });
        }
        function f_(e) {
          return Dl(nt(e, q));
        }
        function Uu(e) {
          return function() {
            return e;
          };
        }
        function a_(e, t) {
          return e == null || e !== e ? t : e;
        }
        var l_ = Eo(), c_ = Eo(!0);
        function Ge(e) {
          return e;
        }
        function Mu(e) {
          return Xs(typeof e == "function" ? e : nt(e, q));
        }
        function h_(e) {
          return Js(nt(e, q));
        }
        function g_(e, t) {
          return Zs(e, nt(t, q));
        }
        var d_ = H(function(e, t) {
          return function(n) {
            return or(n, e, t);
          };
        }), __ = H(function(e, t) {
          return function(n) {
            return or(e, n, t);
          };
        });
        function Bu(e, t, n) {
          var r = me(t), s = Zr(t, r);
          n == null && !(se(t) && (s.length || !r.length)) && (n = t, t = e, e = this, s = Zr(t, me(t)));
          var f = !(se(n) && "chain" in n) || !!n.chain, a = Ct(e);
          return je(s, function(h) {
            var _ = t[h];
            e[h] = _, a && (e.prototype[h] = function() {
              var E = this.__chain__;
              if (f || E) {
                var T = e(this.__wrapped__), I = T.__actions__ = Me(this.__actions__);
                return I.push({ func: _, args: arguments, thisArg: e }), T.__chain__ = E, T;
              }
              return _.apply(e, $t([this.value()], arguments));
            });
          }), e;
        }
        function p_() {
          return Se._ === this && (Se._ = qa), this;
        }
        function Wu() {
        }
        function v_(e) {
          return e = B(e), H(function(t) {
            return Qs(t, e);
          });
        }
        var R_ = pu(ie), E_ = pu(Es), T_ = pu(Hi);
        function Rf(e) {
          return Su(e) ? qi(It(e)) : Jl(e);
        }
        function m_(e) {
          return function(t) {
            return e == null ? i : an(e, t);
          };
        }
        var I_ = mo(), S_ = mo(!0);
        function Gu() {
          return [];
        }
        function Hu() {
          return !1;
        }
        function y_() {
          return {};
        }
        function w_() {
          return "";
        }
        function A_() {
          return !0;
        }
        function x_(e, t) {
          if (e = B(e), e < 1 || e > ft)
            return [];
          var n = qe, r = be(e, qe);
          t = P(t), e -= qe;
          for (var s = ki(r, t); ++n < e; )
            t(n);
          return s;
        }
        function O_(e) {
          return M(e) ? ie(e, It) : Xe(e) ? [e] : Me(Mo(Q(e)));
        }
        function b_(e) {
          var t = ++Ga;
          return Q(e) + t;
        }
        var L_ = ri(function(e, t) {
          return e + t;
        }, 0), P_ = vu("ceil"), C_ = ri(function(e, t) {
          return e / t;
        }, 1), D_ = vu("floor");
        function N_(e) {
          return e && e.length ? Jr(e, Ge, nu) : i;
        }
        function F_(e, t) {
          return e && e.length ? Jr(e, P(t, 2), nu) : i;
        }
        function U_(e) {
          return Is(e, Ge);
        }
        function M_(e, t) {
          return Is(e, P(t, 2));
        }
        function B_(e) {
          return e && e.length ? Jr(e, Ge, su) : i;
        }
        function W_(e, t) {
          return e && e.length ? Jr(e, P(t, 2), su) : i;
        }
        var G_ = ri(function(e, t) {
          return e * t;
        }, 1), H_ = vu("round"), q_ = ri(function(e, t) {
          return e - t;
        }, 0);
        function Y_(e) {
          return e && e.length ? $i(e, Ge) : 0;
        }
        function $_(e, t) {
          return e && e.length ? $i(e, P(t, 2)) : 0;
        }
        return o.after = hg, o.ary = Xo, o.assign = jg, o.assignIn = af, o.assignInWith = pi, o.assignWith = ed, o.at = td, o.before = Vo, o.bind = bu, o.bindAll = s_, o.bindKey = Jo, o.castArray = yg, o.chain = ko, o.chunk = Dc, o.compact = Nc, o.concat = Fc, o.cond = o_, o.conforms = f_, o.constant = Uu, o.countBy = Yh, o.create = nd, o.curry = Zo, o.curryRight = Qo, o.debounce = jo, o.defaults = rd, o.defaultsDeep = id, o.defer = gg, o.delay = dg, o.difference = Uc, o.differenceBy = Mc, o.differenceWith = Bc, o.drop = Wc, o.dropRight = Gc, o.dropRightWhile = Hc, o.dropWhile = qc, o.fill = Yc, o.filter = kh, o.flatMap = Xh, o.flatMapDeep = Vh, o.flatMapDepth = Jh, o.flatten = Ho, o.flattenDeep = $c, o.flattenDepth = kc, o.flip = _g, o.flow = l_, o.flowRight = c_, o.fromPairs = zc, o.functions = cd, o.functionsIn = hd, o.groupBy = Zh, o.initial = Xc, o.intersection = Vc, o.intersectionBy = Jc, o.intersectionWith = Zc, o.invert = dd, o.invertBy = _d, o.invokeMap = jh, o.iteratee = Mu, o.keyBy = eg, o.keys = me, o.keysIn = We, o.map = li, o.mapKeys = vd, o.mapValues = Rd, o.matches = h_, o.matchesProperty = g_, o.memoize = hi, o.merge = Ed, o.mergeWith = lf, o.method = d_, o.methodOf = __, o.mixin = Bu, o.negate = gi, o.nthArg = v_, o.omit = Td, o.omitBy = md, o.once = pg, o.orderBy = tg, o.over = R_, o.overArgs = vg, o.overEvery = E_, o.overSome = T_, o.partial = Lu, o.partialRight = ef, o.partition = ng, o.pick = Id, o.pickBy = cf, o.property = Rf, o.propertyOf = m_, o.pull = th, o.pullAll = Yo, o.pullAllBy = nh, o.pullAllWith = rh, o.pullAt = ih, o.range = I_, o.rangeRight = S_, o.rearg = Rg, o.reject = ug, o.remove = uh, o.rest = Eg, o.reverse = xu, o.sampleSize = og, o.set = yd, o.setWith = wd, o.shuffle = fg, o.slice = sh, o.sortBy = cg, o.sortedUniq = gh, o.sortedUniqBy = dh, o.split = Xd, o.spread = Tg, o.tail = _h, o.take = ph, o.takeRight = vh, o.takeRightWhile = Rh, o.takeWhile = Eh, o.tap = Nh, o.throttle = mg, o.thru = ai, o.toArray = sf, o.toPairs = hf, o.toPairsIn = gf, o.toPath = O_, o.toPlainObject = ff, o.transform = Ad, o.unary = Ig, o.union = Th, o.unionBy = mh, o.unionWith = Ih, o.uniq = Sh, o.uniqBy = yh, o.uniqWith = wh, o.unset = xd, o.unzip = Ou, o.unzipWith = $o, o.update = Od, o.updateWith = bd, o.values = Fn, o.valuesIn = Ld, o.without = Ah, o.words = pf, o.wrap = Sg, o.xor = xh, o.xorBy = Oh, o.xorWith = bh, o.zip = Lh, o.zipObject = Ph, o.zipObjectDeep = Ch, o.zipWith = Dh, o.entries = hf, o.entriesIn = gf, o.extend = af, o.extendWith = pi, Bu(o, o), o.add = L_, o.attempt = vf, o.camelCase = Nd, o.capitalize = df, o.ceil = P_, o.clamp = Pd, o.clone = wg, o.cloneDeep = xg, o.cloneDeepWith = Og, o.cloneWith = Ag, o.conformsTo = bg, o.deburr = _f, o.defaultTo = a_, o.divide = C_, o.endsWith = Fd, o.eq = ht, o.escape = Ud, o.escapeRegExp = Md, o.every = $h, o.find = zh, o.findIndex = Wo, o.findKey = ud, o.findLast = Kh, o.findLastIndex = Go, o.findLastKey = sd, o.floor = D_, o.forEach = zo, o.forEachRight = Ko, o.forIn = od, o.forInRight = fd, o.forOwn = ad, o.forOwnRight = ld, o.get = Du, o.gt = Lg, o.gte = Pg, o.has = gd, o.hasIn = Nu, o.head = qo, o.identity = Ge, o.includes = Qh, o.indexOf = Kc, o.inRange = Cd, o.invoke = pd, o.isArguments = hn, o.isArray = M, o.isArrayBuffer = Cg, o.isArrayLike = Be, o.isArrayLikeObject = de, o.isBoolean = Dg, o.isBuffer = Zt, o.isDate = Ng, o.isElement = Fg, o.isEmpty = Ug, o.isEqual = Mg, o.isEqualWith = Bg, o.isError = Pu, o.isFinite = Wg, o.isFunction = Ct, o.isInteger = tf, o.isLength = di, o.isMap = nf, o.isMatch = Gg, o.isMatchWith = Hg, o.isNaN = qg, o.isNative = Yg, o.isNil = kg, o.isNull = $g, o.isNumber = rf, o.isObject = se, o.isObjectLike = ce, o.isPlainObject = gr, o.isRegExp = Cu, o.isSafeInteger = zg, o.isSet = uf, o.isString = _i, o.isSymbol = Xe, o.isTypedArray = Nn, o.isUndefined = Kg, o.isWeakMap = Xg, o.isWeakSet = Vg, o.join = Qc, o.kebabCase = Bd, o.last = it, o.lastIndexOf = jc, o.lowerCase = Wd, o.lowerFirst = Gd, o.lt = Jg, o.lte = Zg, o.max = N_, o.maxBy = F_, o.mean = U_, o.meanBy = M_, o.min = B_, o.minBy = W_, o.stubArray = Gu, o.stubFalse = Hu, o.stubObject = y_, o.stubString = w_, o.stubTrue = A_, o.multiply = G_, o.nth = eh, o.noConflict = p_, o.noop = Wu, o.now = ci, o.pad = Hd, o.padEnd = qd, o.padStart = Yd, o.parseInt = $d, o.random = Dd, o.reduce = rg, o.reduceRight = ig, o.repeat = kd, o.replace = zd, o.result = Sd, o.round = H_, o.runInContext = d, o.sample = sg, o.size = ag, o.snakeCase = Kd, o.some = lg, o.sortedIndex = oh, o.sortedIndexBy = fh, o.sortedIndexOf = ah, o.sortedLastIndex = lh, o.sortedLastIndexBy = ch, o.sortedLastIndexOf = hh, o.startCase = Vd, o.startsWith = Jd, o.subtract = q_, o.sum = Y_, o.sumBy = $_, o.template = Zd, o.times = x_, o.toFinite = Dt, o.toInteger = B, o.toLength = of, o.toLower = Qd, o.toNumber = ut, o.toSafeInteger = Qg, o.toString = Q, o.toUpper = jd, o.trim = e_, o.trimEnd = t_, o.trimStart = n_, o.truncate = r_, o.unescape = i_, o.uniqueId = b_, o.upperCase = u_, o.upperFirst = Fu, o.each = zo, o.eachRight = Ko, o.first = qo, Bu(o, (function() {
          var e = {};
          return Tt(o, function(t, n) {
            j.call(o.prototype, n) || (e[n] = t);
          }), e;
        })(), { chain: !1 }), o.VERSION = l, je(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
          o[e].placeholder = o;
        }), je(["drop", "take"], function(e, t) {
          z.prototype[e] = function(n) {
            n = n === i ? 1 : Ee(B(n), 0);
            var r = this.__filtered__ && !t ? new z(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = be(n, r.__takeCount__) : r.__views__.push({
              size: be(n, qe),
              type: e + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, z.prototype[e + "Right"] = function(n) {
            return this.reverse()[e](n).reverse();
          };
        }), je(["filter", "map", "takeWhile"], function(e, t) {
          var n = t + 1, r = n == pt || n == Tr;
          z.prototype[e] = function(s) {
            var f = this.clone();
            return f.__iteratees__.push({
              iteratee: P(s, 3),
              type: n
            }), f.__filtered__ = f.__filtered__ || r, f;
          };
        }), je(["head", "last"], function(e, t) {
          var n = "take" + (t ? "Right" : "");
          z.prototype[e] = function() {
            return this[n](1).value()[0];
          };
        }), je(["initial", "tail"], function(e, t) {
          var n = "drop" + (t ? "" : "Right");
          z.prototype[e] = function() {
            return this.__filtered__ ? new z(this) : this[n](1);
          };
        }), z.prototype.compact = function() {
          return this.filter(Ge);
        }, z.prototype.find = function(e) {
          return this.filter(e).head();
        }, z.prototype.findLast = function(e) {
          return this.reverse().find(e);
        }, z.prototype.invokeMap = H(function(e, t) {
          return typeof e == "function" ? new z(this) : this.map(function(n) {
            return or(n, e, t);
          });
        }), z.prototype.reject = function(e) {
          return this.filter(gi(P(e)));
        }, z.prototype.slice = function(e, t) {
          e = B(e);
          var n = this;
          return n.__filtered__ && (e > 0 || t < 0) ? new z(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== i && (t = B(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
        }, z.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, z.prototype.toArray = function() {
          return this.take(qe);
        }, Tt(z.prototype, function(e, t) {
          var n = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), s = o[r ? "take" + (t == "last" ? "Right" : "") : t], f = r || /^find/.test(t);
          s && (o.prototype[t] = function() {
            var a = this.__wrapped__, h = r ? [1] : arguments, _ = a instanceof z, E = h[0], T = _ || M(a), I = function($) {
              var K = s.apply(o, $t([$], h));
              return r && y ? K[0] : K;
            };
            T && n && typeof E == "function" && E.length != 1 && (_ = T = !1);
            var y = this.__chain__, O = !!this.__actions__.length, C = f && !y, G = _ && !O;
            if (!f && T) {
              a = G ? a : new z(this);
              var D = e.apply(a, h);
              return D.__actions__.push({ func: ai, args: [I], thisArg: i }), new tt(D, y);
            }
            return C && G ? e.apply(this, h) : (D = this.thru(I), C ? r ? D.value()[0] : D.value() : D);
          });
        }), je(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
          var t = Fr[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(e);
          o.prototype[e] = function() {
            var s = arguments;
            if (r && !this.__chain__) {
              var f = this.value();
              return t.apply(M(f) ? f : [], s);
            }
            return this[n](function(a) {
              return t.apply(M(a) ? a : [], s);
            });
          };
        }), Tt(z.prototype, function(e, t) {
          var n = o[t];
          if (n) {
            var r = n.name + "";
            j.call(bn, r) || (bn[r] = []), bn[r].push({ name: t, func: n });
          }
        }), bn[ni(i, pe).name] = [{
          name: "wrapper",
          func: i
        }], z.prototype.clone = il, z.prototype.reverse = ul, z.prototype.value = sl, o.prototype.at = Fh, o.prototype.chain = Uh, o.prototype.commit = Mh, o.prototype.next = Bh, o.prototype.plant = Gh, o.prototype.reverse = Hh, o.prototype.toJSON = o.prototype.valueOf = o.prototype.value = qh, o.prototype.first = o.prototype.head, er && (o.prototype[er] = Wh), o;
      }), An = Ma();
      rn ? ((rn.exports = An)._ = An, Mi._ = An) : Se._ = An;
    }).call(Q_);
  })(pr, pr.exports)), pr.exports;
}
var He = j_();
function Rr(g) {
  return g.toLowerCase().replace(/[^\w\d]+/g, "");
}
function ku(g, u) {
  const i = new RegExp(/"(.*?)"/g);
  let l = u, p = [], m, w = !1;
  for (; (m = i.exec(u)) !== null && w === !1; ) {
    const W = Rr(String(m[1])), q = ep(g, W);
    q === void 0 ? w = !0 : (p = p.concat(q), l = l.replace(m[0], ""));
  }
  if (w)
    return;
  const b = Rr(l), L = tp(g, b);
  return L === void 0 ? void 0 : (p = p.concat(L), p.sort((W, q) => W - q));
}
function ep(g, u) {
  if (g.length < u.length)
    return;
  const i = g.indexOf(u);
  if (i !== -1)
    return He.range(i, i + u.length).map((l) => l);
}
function tp(g, u) {
  if (g.length < u.length)
    return;
  const i = Array.from(u), l = [];
  let p = g, m = 0, w = !1;
  for (const b of i) {
    const L = p.indexOf(b);
    if (L === -1 && (w = !0), w === !1) {
      l.push(m + L);
      const U = L + 1;
      m += U, p = p.substring(U);
    }
  }
  if (!w)
    return l;
}
class zu {
  #e;
  constructor(u) {
    this.source = u;
    const i = zu.composeTransformedHaystackSegments(u);
    this.#e = i, this.transformed = i.map((l) => l.value).join("").toLowerCase();
  }
  getSourceCharacterIndex(u) {
    let i = 0;
    return this.#e.reduce((l, p) => {
      if (l !== 1 / 0)
        return l;
      const m = i + p.value.length;
      if (u >= i && u <= m) {
        const w = u - i;
        l = p.index + w;
      }
      return i += p.value.length, l;
    }, 1 / 0);
  }
  /**
   * We need to preserve the relationship between the source and the transformed results.
   */
  static composeTransformedHaystackSegments(u) {
    const i = u.matchAll(/[\w\d]+/g), l = [];
    for (const p of i)
      l.push({ value: p[0], index: p.index, length: p[0].length });
    return l;
  }
}
function np(g, u) {
  return (Array.isArray(g) ? g : [g]).map((p) => new zu(p)).reduce((p, m) => {
    if (p !== void 0)
      return p;
    const w = ku(m.transformed, u);
    if (w === void 0)
      return p;
    const b = rp(w, m.transformed), L = ip(m, b);
    return up(L);
  }, void 0);
}
function rp(g, u) {
  const i = [...g], l = [];
  let p = 0;
  for (; i.length > 0 && p < 100; ) {
    const m = i.at(0);
    if (m === void 0)
      throw new Error("Should never get here");
    let w = 1;
    for (let W = 1; W <= i.length; W += 1) {
      const q = i.at(W);
      q !== void 0 && m + W === q && (w += 1);
    }
    const b = m, L = m + w, U = u.substring(b, L);
    l.push({
      index: b,
      value: U,
      is_match: !0,
      length: U.length
    }), i.splice(0, w), p += 1;
  }
  return l;
}
function ip(g, u) {
  return u.reduce((i, l, p) => {
    if (p === 0 && l.index !== 0) {
      const U = g.source.substring(0, g.getSourceCharacterIndex(l.index));
      i.push({
        index: 0,
        value: U,
        is_match: !1,
        length: U.length
      });
    }
    const m = g.getSourceCharacterIndex(l.index), w = g.getSourceCharacterIndex(l.index + l.length), b = g.source.substring(m, w);
    i.push({
      index: m,
      value: b,
      is_match: !0,
      length: b.length
    });
    const L = u.at(p + 1);
    if (L) {
      const U = g.getSourceCharacterIndex(l.index + l.length), W = g.getSourceCharacterIndex(L.index), q = g.source.substring(U, W);
      i.push({
        index: U,
        value: q,
        is_match: !1,
        length: q.length
      });
    } else if (m + b.length !== g.source.length) {
      const U = m + b.length, W = g.source.substring(U);
      i.push({
        index: U,
        value: W,
        is_match: !1,
        length: W.length
      });
    }
    return i;
  }, []);
}
function up(g) {
  const u = /\S/, i = [...g];
  return i.forEach((l, p) => {
    if (l.is_match) {
      const m = l.value.search(u);
      if (m !== 0) {
        const w = i.at(p - 1);
        w && (w.length += m, w.value += l.value.substring(0, m), l.value = l.value.substring(m), l.index = l.index + m);
      }
    }
  }), i;
}
function sp(g, u) {
  return (Array.isArray(g) ? g : [g]).some((l) => {
    const p = Rr(l);
    return ku(p, u) !== void 0;
  });
}
function op({ needle: g, haystack: u, Match: i = "mark", Miss: l }) {
  const p = Of(() => np(u, g), [u, g]);
  return p === void 0 ? u : p.map((m, w) => {
    const b = [m.value, w].join();
    return m.is_match ? typeof i == "string" ? /* @__PURE__ */ Pe.jsx(i, { "data-is-match": m.is_match, children: m.value }, b) : /* @__PURE__ */ Pe.jsx(i, { "data-is-match": m.is_match, segment: m, segmentIndex: w }, b) : l !== void 0 ? typeof l == "string" ? /* @__PURE__ */ Pe.jsx(l, { "data-is-match": m.is_match, children: m.value }, b) : /* @__PURE__ */ Pe.jsx(l, { "data-is-match": m.is_match, segment: m, segmentIndex: w }, b) : m.value;
  });
}
function fp({ Match: g = "mark", Miss: u, children: i }) {
  const l = Un();
  return l.search.hasSearchTerm === !1 ? i : /* @__PURE__ */ Pe.jsx(op, { needle: l.search.searchTerm, haystack: i, Match: g, Miss: u });
}
function Yu(g) {
  return typeof g == "object" && g !== null && "sortFn" in g;
}
function Ei(g) {
  return typeof g == "object" && g !== null && ("searchFn" in g || "haystackFn" in g);
}
function wf(g) {
  return typeof g == "object" && g !== null && "filterFn" in g;
}
function Af(g) {
  return typeof g == "object" && g !== null && "filterFn" in g && "_isHydrated" in g;
}
function $u(g) {
  return typeof g == "object" && g !== null && "groupFn" in g;
}
function ap(g) {
  return typeof g == "object" && g !== null && ("rules" in g || "callback" in g);
}
function lp(g) {
  return typeof g == "object" && g !== null && ("haystack" in g || "callback" in g);
}
const oe = {
  INIT: "init",
  FIRST_USER_INTERACTION: "firstUserInteraction",
  READY: "ready",
  CHANGE: "change",
  SET_ITEMS: "setItems",
  SET_IS_LOADING: "setIsLoading",
  SET_IS_DISABLED: "setIsDisabled",
  SET_CONTEXT: "setContext",
  SET_SEARCH_TERM: "setSearchTerm",
  RESET_SEARCH_TERM: "resetSearchTerm",
  SET_FILTER: "setFilter",
  SET_SORT_BY: "setSortBy",
  SET_SORT_BY_DIRECTION: "setSortDirection",
  SET_GROUP_BY: "setGroupBy",
  SET_GROUP_SORT_BY_DIRECTION: "setGroupBySortDirection",
  SET_PAGE: "setPage",
  SET_NUM_ITEMS_PER_PAGE: "setNumItemsPerPage"
}, we = {
  CORE: "core",
  SEARCH: "search",
  FILTERS: "filters",
  GROUP_BY: "groupBy",
  SORT_BY: "sortBy",
  PAGINATION: "pagination"
}, fe = {
  RULE_NOT_FOUND: "Finder could not locate requested rule",
  WRONG_RULE_TYPE_FOR_MIXIN: "The requested rule is not valid for this mixin.",
  NO_SEARCH_RULE_SET: "Unable to set search term; no SearchRule was found.",
  SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY: "Finder could not set this filter value, as the rule requires an array.",
  ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE: "Finder could not add to this filter, as no optionValue was passed.",
  DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER: "Finder could not delete an option from this filter, as it does not support multiple values.",
  SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE: "Finder could not set this filter value, as the rule requires a boolean.",
  ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER: "Finder could not add to this filter value, as the rule is a boolean.",
  TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS: "Finder could not toggle this filter rule option, as the filter does not have any options.",
  TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE: "Finder could not toggle this filter rule option, as the rule does not allow multiple values.",
  TOGGLING_OPTION_THAT_DOES_NOT_EXIST: "Finder could not toggle this filter rule option, as the option was not found.",
  TOGGLING_OPTION_WITHOUT_PASSING_OPTION: "Finder could not toggle this filter rule option, as the option was not found.",
  TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS: "Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.",
  INVALID_RULE_WITHOUT_ID: "Init failed: Missing rule id.",
  INVALID_RULE_SHAPE: "Init failed: Malformed rule definition",
  INVALID_RULE_DUPLICATE: "Init failed: Duplicate rule id."
};
class ae extends Error {
  constructor(u, i) {
    const l = `${u} ${JSON.stringify({ ...i })}`;
    super(l), this.name = "FinderError";
  }
}
function cp(g, u) {
  const i = g.length / u.length;
  let l = 1, p = 1, m = 0;
  for (let w = 0; w < g.length; w += 1)
    m !== void 0 && g.at(w) === m + 1 && (p += 1, p >= l && (l = p)), m = g.at(w);
  return { percentOfHaystackMatched: i, longestSequentialSequence: l };
}
class Ff {
  #e;
  constructor({ initialSearchTerm: u }, i) {
    this.searchTerm = u ?? "", this.#e = i;
  }
  get rule() {
    return this.#e.getRuleBook().rules.find(Ei);
  }
  get hasSearchRule() {
    return this.#e.getRuleBook().rules.some(Ei);
  }
  get hasSearchTerm() {
    return this.searchTerm !== "";
  }
  setSearchTerm(u) {
    const i = this.rule;
    if (!i)
      throw new ae(fe.NO_SEARCH_RULE_SET);
    if (this.#e.isDisabled())
      return;
    const l = this.searchTerm;
    this.searchTerm = u, l !== u && this.#e.debouncer(i, () => {
      this.#e.touch({
        source: we.SEARCH,
        event: oe.SET_SEARCH_TERM,
        current: u,
        initial: l,
        rule: i
      });
    });
  }
  reset() {
    if (this.#e.isDisabled())
      return;
    const u = this.searchTerm;
    this.searchTerm = "", this.#e.touch({
      source: we.SEARCH,
      event: oe.RESET_SEARCH_TERM,
      current: "",
      initial: u,
      rule: this.rule
    });
  }
  serialize() {
    return {
      searchTerm: this.searchTerm,
      rule: this.rule
    };
  }
  test(u, i = !1) {
    return this.#e.test({ search: { searchTerm: u, rule: this.rule } }, i);
  }
  static process(u, i, l) {
    if (u.rule === void 0 || u.searchTerm === "")
      return i;
    const p = i.reduce((b, L) => {
      if (u.rule?.searchFn === void 0)
        return b;
      const U = u.rule.searchFn(L, l), q = (Array.isArray(U) ? U.map(Rr) : [Rr(U)]).reduce((he, ge) => {
        const Ae = ku(ge, u.searchTerm);
        return Ae !== void 0 && he.push(cp(Ae, ge)), he;
      }, []);
      if (q.length > 0) {
        const ge = He.orderBy(q, ["percentOfHaystackMatched", "longestSequentialSequence"], ["desc", "asc"]).at(0);
        ge && b.push({ item: L, score: ge });
      }
      return b;
    }, []), m = p.reduce((b, L) => (L.score.longestSequentialSequence > b && (b = L.score.longestSequentialSequence), b), 0);
    return He.orderBy(
      p,
      [
        (b) => {
          const L = b.score.percentOfHaystackMatched * 100, U = b.score.longestSequentialSequence / m * 100;
          return L + U;
        }
      ],
      ["desc"]
    ).map((b) => b.item);
  }
}
function hp(g) {
  return {
    validate(u) {
      if (u !== void 0 && typeof u != "boolean")
        throw new ae(fe.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule: g, value: u });
      return !0;
    },
    parse(u) {
      return u === void 0 ? g.required ? !0 : g.defaultValue !== void 0 ? g.defaultValue : !1 : u;
    },
    has(u) {
      return this.parse(u);
    },
    toggle(u, i) {
      const l = this.parse(u);
      if (typeof l != "boolean")
        throw new ae(fe.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule: g, value: l, optionValue: i });
      return !l;
    },
    add(u, i) {
      throw new ae(fe.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule: g, value: u, optionValue: i });
    },
    delete(u, i) {
      if (i !== void 0)
        throw new ae(fe.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule: g, value: u, optionValue: i });
    },
    isActive(u) {
      return g.required ? !0 : this.parse(u) === !0;
    }
  };
}
function gp(g) {
  return {
    validate(u) {
      if (u !== void 0 && Array.isArray(u) === !1)
        throw new ae(fe.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: g, value: u });
      return !0;
    },
    parse(u) {
      if (u === void 0)
        return g.required && Array.isArray(g.options) && g.options.length > 0 ? [g.options.at(0)?.value] : [];
      if (Array.isArray(u))
        return u;
      throw new ae(fe.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: g, value: u });
    },
    has(u, i) {
      if (i === void 0)
        return Array.isArray(u) && u.length > 0;
      if (Array.isArray(i))
        return i.every((p) => this.has(g, p));
      const l = g.options?.find((p) => typeof i == "object" && "value" in i ? p.value === i.value : p.value === i);
      return Array.isArray(u) && l !== void 0 && u.includes(l.value);
    },
    toggle(u, i) {
      const l = this.parse(u);
      if (Array.isArray(l) === !1)
        throw new ae(fe.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: g, value: l });
      if (i === void 0)
        throw new ae(fe.TOGGLING_OPTION_WITHOUT_PASSING_OPTION, { rule: g });
      if (g.options === void 0)
        throw new ae(fe.TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS, { rule: g, optionValue: i });
      const p = g.options.find((m) => typeof i == "object" && "value" in i ? m.value === i.value : m.value === i);
      if (p === void 0)
        throw new ae(fe.TOGGLING_OPTION_THAT_DOES_NOT_EXIST, { rule: g, optionValue: i });
      return l.includes(p.value) ? [...l.filter((m) => m !== p.value)] : [...l, p.value];
    },
    add(u, i) {
      const l = this.parse(u);
      if (i === void 0)
        throw new ae(fe.ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE, { rule: g, optionValue: i });
      const p = g.options?.find((m) => typeof i == "object" && "value" in i ? m.value === i.value : m.value === i);
      return p !== void 0 ? l.includes(p.value) === !1 ? [...l, p.value] : l : [...l, i];
    },
    delete(u, i) {
      if (i === void 0)
        return;
      const l = this.parse(u), p = g.options?.find((m) => typeof i == "object" && "value" in i ? m.value === i.value : m.value === i);
      return p !== void 0 && l.includes(p.value) ? l.filter((m) => m.value !== p.value) : l.filter((m) => m !== i);
    },
    isActive(u) {
      return g.required ? !0 : this.parse(u).length > 0;
    }
  };
}
function dp(g) {
  return {
    validate() {
      return !0;
    },
    parse(u) {
      if (u === void 0 && g.required) {
        if (g.defaultValue)
          return g.defaultValue;
        if (Array.isArray(g.options) && g.options.length > 0)
          return g.options.at(0)?.value;
      }
      return u;
    },
    has(u) {
      return u !== void 0;
    },
    toggle(u, i) {
      throw new ae(fe.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, { rule: g, value: u, optionValue: i });
    },
    add(u, i) {
      throw new ae(fe.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule: g, value: u, optionValue: i });
    },
    delete(u, i) {
      if (i !== void 0)
        throw new ae(fe.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule: g, value: u, optionValue: i });
    },
    isActive(u) {
      return g.required ? !0 : !(u === void 0 || typeof u == "string" && u.trim() === "");
    }
  };
}
function Ft(g) {
  return g.boolean ? hp(g) : g.multiple ? gp(g) : dp(g);
}
class Uf {
  #e;
  #t;
  constructor({ initialFilters: u }, i) {
    this.#e = u ?? {}, this.#t = i;
  }
  set(u, i) {
    if (this.#t.isDisabled())
      return;
    const l = this.getRule(u), p = this.get(u), w = typeof i == "string" && i.trim() === "" ? void 0 : i;
    Ft(l).validate(i), !(this.#e[l.id] !== void 0 && this.#e[l.id] === w) && this.#t.debouncer(l, () => {
      this.#e = { ...this.#e, [l.id]: w }, this.#t.touch({
        source: we.FILTERS,
        event: oe.SET_FILTER,
        current: w,
        initial: p,
        rule: l
      });
    });
  }
  get rules() {
    return this.#t.getRuleBook().rules.filter(Af);
  }
  get activeRules() {
    return this.rules.filter((u) => Ft(u).isActive(this.#e[u.id]));
  }
  get(u) {
    const i = this.getRule(u), l = this.#e[i.id];
    return Ft(i).parse(l);
  }
  has(u, i) {
    const l = this.getRule(u), p = this.#e[l.id];
    return Ft(l).has(p, i);
  }
  getRule(u) {
    const i = this.#t.getRuleBook().getRule(u);
    if (Af(i) === !1)
      throw new ae(fe.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  add(u, i) {
    const l = this.getRule(u), p = this.#e[l.id];
    this.set(l, Ft(l).add(p, i));
  }
  delete(u, i) {
    const l = this.getRule(u), p = this.#e[l.id];
    this.set(l, Ft(l).delete(p, i));
  }
  isRuleActive(u) {
    const i = this.getRule(u), l = this.#e[i.id];
    return Ft(i).isActive(l);
  }
  toggle(u, i) {
    const l = this.getRule(u), p = this.#e[l.id], m = Ft(l).toggle(p, i);
    this.set(l, m);
  }
  test(u) {
    if (this.#t.isLoading())
      return [];
    if (u.isAdditive) {
      const i = He.uniqBy([...this.rules, ...u.rules], "id"), l = { ...this.values, ...u.values };
      return this.#t.test({ filters: { rules: i, values: l } }, !0);
    }
    return this.#t.test({ filters: { rules: u.rules, values: u.values ?? {} } });
  }
  testRule({ rule: u, value: i, ...l }) {
    const p = this.getRule(u);
    return this.test({
      rules: [p],
      values: { [p.id]: i },
      ...l
    });
  }
  testRuleOptions(u, i) {
    if (this.#t.isLoading())
      return /* @__PURE__ */ new Map();
    const l = this.getRule(u);
    if (l.boolean === !0) {
      const p = /* @__PURE__ */ new Map();
      return p.set(!0, this.testRule({ rule: l, value: !0 })), p.set(!1, this.testRule({ rule: l, value: !1 })), p;
    }
    if (Array.isArray(l.options)) {
      const p = /* @__PURE__ */ new Map();
      return l.options.forEach((m) => {
        let w;
        l.multiple ? w = [m.value] : w = m.value, p.set(m, this.testRule({ rule: l, value: w, isAdditive: i }));
      }), p;
    }
    throw new ae(fe.TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS, l);
  }
  // return all filter values with default options and type casts applied.
  get values() {
    return this.rules.reduce((u, i) => (u[i.id] = this.get(i), u), {});
  }
  get raw() {
    return this.#e;
  }
  serialize() {
    return {
      rules: this.rules,
      values: this.values
    };
  }
  static process(u, i, l) {
    const p = u.rules.filter((m) => Ft(m).isActive(u.values[m.id]));
    return p.length === 0 ? i : i.filter((m) => p.every((w) => w.filterFn(m, u.values[w.id], l)));
  }
}
const qu = [void 0, "desc", "asc"];
class Mf {
  #e;
  #t;
  #n;
  constructor({ initialSortBy: u, initialSortDirection: i }, l) {
    this.#n = l, u && (this.#e = this.getRule(u)), this.#t = i;
  }
  getRule(u) {
    const i = this.#n.getRuleBook().getRule(u);
    if (Yu(i) === !1)
      throw new ae(fe.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  get rules() {
    return this.#n.getRuleBook().rules.filter(Yu);
  }
  get activeRule() {
    const u = this.rules.at(0);
    return this.#e ?? u;
  }
  get sortDirection() {
    return this.#t ?? this.activeRule?.defaultSortDirection ?? "asc";
  }
  get userHasSetSortDirection() {
    return this.#t !== void 0;
  }
  setSortDirection(u) {
    if (this.#n.isDisabled() || !this.activeRule)
      return;
    const i = this.#t;
    this.#t = u, this.#n.touch({
      source: we.SORT_BY,
      event: oe.SET_SORT_BY_DIRECTION,
      current: { sortDirection: u },
      initial: { sortDirection: i },
      rule: this.activeRule
    });
  }
  cycleSortDirection() {
    const u = qu.findIndex((i) => i === this.#t);
    if (u !== -1) {
      const i = u + 1 % (qu.length - 1);
      this.setSortDirection(qu[i]);
    }
  }
  toggleSortDirection() {
    if ((this.#t ?? this.activeRule?.defaultSortDirection) === "desc") {
      this.setSortDirection("asc");
      return;
    }
    this.setSortDirection("desc");
  }
  set(u, i) {
    if (this.#n.isDisabled() || !this.activeRule)
      return;
    const l = this.#t, p = this.#e, m = u ? this.getRule(u) : void 0;
    this.#e = m, this.#t = i, this.#n.touch({
      source: we.SORT_BY,
      event: oe.SET_SORT_BY,
      current: { rule: m?.id, sortDirection: i },
      initial: { rule: p?.id, sortDirection: l },
      rule: this.activeRule
    });
  }
  reset() {
    this.set(void 0, void 0);
  }
  serialize() {
    return {
      rule: this.activeRule,
      sortDirection: this.sortDirection
    };
  }
  static process(u, i, l) {
    return u.rule === void 0 ? i : He.orderBy(
      i,
      (p) => typeof u.rule?.sortFn == "function" ? u.rule.sortFn(p, l) : Number.NEGATIVE_INFINITY,
      u.sortDirection
    );
  }
}
class Bf {
  #e;
  #t;
  #n;
  constructor({ initialGroupBy: u, requireGroup: i }, l) {
    this.#n = l, u && (this.#e = this.getRule(u)), this.requireGroup = i;
  }
  getRule(u) {
    const i = this.#n.getRuleBook().getRule(u);
    if ($u(i) === !1)
      throw new ae(fe.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  get rules() {
    return this.#n.getRuleBook().rules.filter($u);
  }
  get activeRule() {
    const u = this.requireGroup ? this.rules.at(0) : void 0;
    return this.#e ?? u;
  }
  get hasGroupByRule() {
    return this.activeRule !== void 0;
  }
  get groupSortDirection() {
    return this.#t ?? this.activeRule?.defaultGroupSortDirection;
  }
  set(u) {
    if (this.#n.isDisabled())
      return;
    const i = this.#e;
    let l;
    const p = typeof u == "string" && u.trim() === "";
    p && (l = void 0), p === !1 && u !== void 0 && (l = this.getRule(u)), this.#e !== l && (this.#e = l, this.#t = void 0, this.#n.touch({
      source: we.GROUP_BY,
      event: oe.SET_GROUP_BY,
      current: l?.id,
      initial: i?.id,
      rule: l
    }));
  }
  setGroupSortDirection(u) {
    const i = this.#t;
    this.#t = u, this.#n.touch({
      source: we.GROUP_BY,
      event: oe.SET_GROUP_SORT_BY_DIRECTION,
      current: u,
      initial: i,
      rule: this.activeRule
    });
  }
  toggle(u) {
    const i = this.getRule(u);
    if (this.activeRule === i) {
      this.set(void 0);
      return;
    }
    this.set(i);
  }
  reset() {
    this.setGroupSortDirection(void 0), this.set(void 0);
  }
  serialize() {
    return {
      rule: this.activeRule,
      sortDirection: this.#t
    };
  }
  static process(u, i, l) {
    const p = He.groupBy(i, (U) => u.rule?.groupFn(U, l)), m = Object.entries(p).map(([U, W]) => ({
      id: U,
      items: W
    })), w = u.rule?.sticky !== void 0, b = [], L = [];
    if (w && u.rule && (b.push(_p(u.rule)), L.push("asc")), u.rule?.sortGroupFn && (b.push(u.rule.sortGroupFn), L.push(u.sortDirection ?? "asc")), b.length > 0) {
      const U = L;
      return He.orderBy(m, b, U);
    }
    return m;
  }
}
function _p(g) {
  let u = [];
  g.sticky?.header !== void 0 && (Array.isArray(g.sticky.header) && (u = g.sticky.header), typeof g.sticky.header == "string" && (u = [g.sticky.header]));
  let i = [];
  return g.sticky?.footer !== void 0 && (Array.isArray(g.sticky.footer) && (i = g.sticky.footer), typeof g.sticky.footer == "string" && (i = [g.sticky.footer])), (l) => {
    if (u.includes(l.id)) {
      const p = u.findIndex((w) => l.id === w);
      return (u.length - p) * -1;
    }
    return i.includes(l.id) ? 1 + i.findIndex((m) => l.id === m) : 0;
  };
}
class Wf {
  #e;
  #t;
  constructor({ page: u, numItemsPerPage: i }, l) {
    this.#e = u ?? 1, this.numItemsPerPage = i, this.#t = l;
  }
  setPage(u) {
    if (u !== this.#e) {
      const i = this.#e;
      this.#e = u, this.#t.touch({
        source: we.PAGINATION,
        event: oe.SET_PAGE,
        current: { page: this.#e },
        initial: { page: i }
      });
    }
  }
  setNumItemsPerPage(u) {
    if (u !== this.numItemsPerPage) {
      const i = this.numItemsPerPage;
      this.numItemsPerPage = u, this.#t.touch({
        source: we.PAGINATION,
        event: oe.SET_NUM_ITEMS_PER_PAGE,
        current: { numItemsPerPage: this.numItemsPerPage },
        initial: { numItemsPerPage: i }
      });
    }
  }
  get lastPage() {
    if (this.numItemsPerPage !== void 0)
      return Math.ceil(this.#t.getItems().length / this.numItemsPerPage);
  }
  get numTotalItems() {
    return this.#t.getItems().length;
  }
  get page() {
    return this.numItemsPerPage && this.lastPage ? He.clamp(this.#e, 1, this.lastPage) : this.#e;
  }
  get offset() {
    return this.numItemsPerPage && this.lastPage ? (He.clamp(this.#e, 1, this.lastPage) - 1) * this.numItemsPerPage : 0;
  }
  serialize() {
    return {
      page: this.#e,
      numItemsPerPage: this.numItemsPerPage
    };
  }
  static process(u, i) {
    if (u.numItemsPerPage === void 0)
      return i;
    const l = Math.ceil(i.length / u.numItemsPerPage), m = (He.clamp(u.page, 1, l) - 1) * u.numItemsPerPage;
    return i.slice(m, m + u.numItemsPerPage);
  }
}
function pp() {
  const g = /* @__PURE__ */ new Map();
  return (u, i) => u.debounceMilliseconds === void 0 ? i() : (g.has(u) === !1 && g.set(
    u,
    He.debounce((l) => l(), u.debounceMilliseconds)
  ), g.get(u)?.(i));
}
class vp {
  constructor(u, i, l) {
    this.searchEffects = [], this.ruleEffects = [], this.#e = u.filter(ap), this.#t = u.filter(lp), this.hydrateDefinitions(i, l);
  }
  #e;
  #t;
  hydrateDefinitions(u, i) {
    this.ruleEffects = this.#e.map((l) => {
      const p = typeof l.rules == "function" ? l.rules(u, i) : l.rules, m = Array.isArray(p) ? p : [p];
      return { ...l, rules: m, _isHydrated: !0 };
    }), this.searchEffects = this.#t.map((l) => {
      const p = typeof l.haystack == "function" ? l.haystack(u, i) : l.haystack, m = Array.isArray(p) ? p : [p];
      return { ...l, haystack: m, _isHydrated: !0 };
    });
  }
  processRule(u, i) {
    this.ruleEffects.forEach((l) => {
      l.rules.some((m) => typeof m == "string" && u.id === m || typeof m == "object" && u.id === m.id) && l.onChange(i, u);
    });
  }
  processSearchTerm(u, i) {
    this.searchEffects.forEach((l) => {
      sp(l.haystack, u) && l.onChange(i, u);
    });
  }
}
class Rp {
  #e = /* @__PURE__ */ new Map();
  #t = !1;
  on(u, i) {
    this.#e.has(u) === !1 && this.#e.set(u, /* @__PURE__ */ new Set()), this.#e.get(u)?.add(i);
  }
  off(u, i) {
    if (this.#e.has(u) === !1)
      return;
    if (i === void 0) {
      this.#e.delete(u);
      return;
    }
    this.#e.get(u)?.delete(i);
  }
  emit(u, i) {
    if (this.#t)
      return;
    this.#e.get(u)?.forEach((p) => {
      p(i);
    });
  }
  silently(u) {
    this.#t = !0, u(), this.#t = !1;
  }
  isSilent() {
    return this.#t;
  }
}
class Ti {
  constructor(u, i, l) {
    this.rules = [], Ti.validateDefinitions(u), this.#e = u, this.hydrateDefinitions(i, l);
  }
  #e;
  hydrateDefinitions(u, i) {
    this.rules = this.#e.map((l) => wf(l) ? {
      ...l,
      options: typeof l.options == "function" ? l.options({ items: u, context: i }) : l.options,
      // reduce uncertainty
      multiple: !!l.multiple,
      required: !!l.required,
      boolean: !!l.boolean,
      hidden: !!l.hidden,
      // brand it
      _isHydrated: !0
    } : l);
  }
  getRule(u) {
    const i = this.rules.find((l) => typeof u == "object" ? l.id === u.id : l.id === u);
    if (i === void 0)
      throw new ae(fe.RULE_NOT_FOUND, u);
    return i;
  }
  getDefinitions() {
    return this.#e;
  }
  setRules(u) {
    Ti.validateDefinitions(u), this.#e = u;
  }
  static validateDefinitions(u) {
    if (u.length === 0)
      return !1;
    const i = [Ei, wf, Yu, $u], l = /* @__PURE__ */ new Set();
    return u.forEach((p) => {
      if (p.id === void 0 && !Ei(p))
        throw new ae(fe.INVALID_RULE_WITHOUT_ID, p);
      if (i.some((m) => m(p)) === !1)
        throw new ae(fe.INVALID_RULE_SHAPE, p);
      if (p.id) {
        if (l.has(p.id))
          throw new ae(fe.INVALID_RULE_DUPLICATE, p);
        l.add(p.id);
      }
    }), !0;
  }
}
class vr {
  constructor() {
    this.snapshot = {}, this.isStale = !0;
  }
  setIsStale(u) {
    this.isStale = u;
  }
  takeSnapshot({ items: u, context: i, mixins: l }) {
    const p = vr.test({ mixins: l, items: u, context: i }), m = l.pagination ? Wf.process(l.pagination, p) : p;
    let w = [];
    const b = l.groupBy !== void 0;
    l.groupBy && (w = Bf.process(l.groupBy, m, i)), this.snapshot = {
      items: b ? void 0 : m,
      groups: b ? w : void 0,
      numMatchedItems: p.length,
      numTotalItems: u.length,
      hasGroupByRule: b
    };
  }
  static test({ mixins: u, items: i, context: l }) {
    let p = [...i];
    return u.search && (p = Ff.process(u.search, p, l)), u.filters && (p = Uf.process(u.filters, p, l)), u.sortBy && (p = Mf.process(u.sortBy, p, l)), p;
  }
}
class Ep {
  constructor(u, {
    rules: i,
    effects: l,
    initialSearchTerm: p,
    initialSortBy: m,
    initialSortDirection: w,
    initialGroupBy: b,
    initialFilters: L,
    context: U,
    page: W,
    numItemsPerPage: q,
    isLoading: he,
    disabled: ge,
    requireGroup: Ae,
    ignoreSortByRulesWhileSearchRuleIsActive: dt,
    onInit: Te,
    onReady: pe,
    onFirstUserInteraction: re,
    onChange: xe
  }, st) {
    this.isReady = !1, this.#t = !1, this.#e = u, this.disabled = !!ge, this.isLoading = !!he, this.#r = new Rp(), this.getInstanceFn = st, this.#i = new Ti(i, u ?? [], U), this.#s = new vp(l ?? [], u ?? [], U);
    const Oe = pp(), Ce = {
      getItems: () => this.items,
      getRuleBook: () => this.#i,
      isLoading: () => this.isLoading,
      isDisabled: () => this.disabled,
      test: (J, ot) => this.test(J, ot),
      touch: (J) => this.#a(J),
      debouncer: Oe
    };
    this.search = new Ff({ initialSearchTerm: p }, Ce), this.filters = new Uf({ initialFilters: L }, Ce), this.sortBy = new Mf({ initialSortBy: m, initialSortDirection: w }, Ce), this.groupBy = new Bf({ initialGroupBy: b, requireGroup: !!Ae }, Ce), this.pagination = new Wf({ page: W, numItemsPerPage: q }, Ce), this.updatedAt = Date.now(), this.#u = new vr(), this.context = U, this.#n = dt, this.#r.silently(() => {
      const J = {
        source: we.CORE,
        event: oe.INIT,
        timestamp: Date.now(),
        instance: this.getInstanceFn()
      };
      Te && Te(J);
    }), xe && this.#r.on(oe.CHANGE, xe), re && this.#r.on(oe.FIRST_USER_INTERACTION, re), this.isReady = !he && Array.isArray(u) && u.length > 0, pe && this.isReady && pe({
      source: we.CORE,
      event: oe.READY,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    }), this.isReady === !1 && pe && this.#r.on(oe.READY, pe);
  }
  #e;
  #t;
  #n;
  #r;
  #u;
  #i;
  #s;
  /**
   * Events that reflect a user interaction.
   * e.g: entering a search term or selecting a filter.
   */
  #a(u) {
    if (this.#r.isSilent())
      return;
    this.emitFirstUserInteraction(), this.updatedAt = Date.now(), this.#u.setIsStale(!0);
    const i = {
      ...u,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    };
    this.#r.emit(oe.CHANGE, i), this.#r.silently(() => {
      u.rule && this.#s.processRule(u.rule, this.getInstanceFn()), this.search.hasSearchTerm && this.#s.processSearchTerm(this.search.searchTerm, this.getInstanceFn());
    });
  }
  /** Internal events not triggered by a user action  */
  #o(u) {
    this.#u.setIsStale(!0), this.updatedAt = Date.now();
    const i = {
      ...u,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    };
    this.#r.emit(u.event, i);
  }
  emitFirstUserInteraction() {
    if (this.#t === !1) {
      this.#t = !0;
      const u = {
        source: we.CORE,
        event: oe.FIRST_USER_INTERACTION,
        timestamp: Date.now(),
        instance: this.getInstanceFn()
      };
      this.#r.emit(oe.FIRST_USER_INTERACTION, u);
    }
  }
  #l() {
    this.isReady === !1 && (this.isReady = !0, this.#r.emit(oe.READY, {
      source: we.CORE,
      event: oe.READY,
      timestamp: Date.now()
    }));
  }
  get items() {
    return Array.isArray(this.#e) ? this.#e : [];
  }
  get matches() {
    return this.#u.isStale && (this.#u.takeSnapshot({
      items: this.items,
      context: this.context,
      mixins: this.#f()
    }), this.#u.setIsStale(!1)), this.#u.snapshot;
  }
  test(u, i = !1) {
    if (i) {
      const l = { ...this.#f(), ...u };
      return vr.test({ mixins: l, items: this.items, context: this.context });
    }
    return vr.test({ mixins: u, items: this.items, context: this.context });
  }
  #f() {
    const u = this.search.hasSearchRule && this.search.hasSearchTerm, i = u && this.#n, l = {};
    return u && (l.search = this.search.serialize()), this.filters.activeRules.length > 0 && (l.filters = this.filters.serialize()), this.pagination.numItemsPerPage && (l.pagination = this.pagination.serialize()), i === !1 && (l.sortBy = this.sortBy.serialize()), this.groupBy.activeRule !== void 0 && (l.groupBy = this.groupBy.serialize()), l;
  }
  get isEmpty() {
    return this.isLoading === !1 && this.items.length === 0;
  }
  get hasMatches() {
    const u = Array.isArray(this.matches.items) && this.matches.items.length > 0, i = Array.isArray(this.matches.groups) && this.matches.groups.length > 0;
    return u || i;
  }
  get events() {
    return {
      on: (u, i) => this.#r.on(u, i),
      off: (u, i) => this.#r.off(u, i),
      silently: (u) => this.#r.silently(u),
      isSilent: () => this.#r.isSilent()
    };
  }
  getRule(u) {
    return this.#i.getRule(u);
  }
  get state() {
    if (this.isLoading)
      return "loading";
    if (this.isEmpty)
      return "empty";
    const u = this.groupBy.activeRule !== void 0;
    return u && Array.isArray(this.matches.groups) && this.matches.groups.length > 0 ? "groups" : u === !1 && Array.isArray(this.matches.items) && this.matches.items.length > 0 ? "items" : "noMatches";
  }
  setItems(u) {
    if (He.isEqual(u, this.#e) === !1) {
      const i = this.#e;
      this.#e = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s.hydrateDefinitions(this.items, this.context), this.#o({ source: we.CORE, event: oe.SET_ITEMS, current: u, initial: i });
    }
  }
  setIsLoading(u) {
    if (!!u !== this.isLoading) {
      const i = this.isLoading;
      this.isLoading = !!u, this.#o({ source: we.CORE, event: oe.SET_IS_LOADING, current: !!u, initial: i }), this.isLoading === !1 && this.#l();
    }
  }
  setIsDisabled(u) {
    if (!!u !== this.disabled) {
      const i = this.disabled;
      this.disabled = !!u, this.#o({ source: we.CORE, event: oe.SET_IS_DISABLED, current: !!u, initial: i });
    }
  }
  setRules(u) {
    He.isEqual(u, this.#i.getDefinitions()) === !1 && (this.#i.setRules(u), this.#i.hydrateDefinitions(this.items, this.context));
  }
  setContext(u) {
    const i = this.context;
    He.isEqual(u, i) === !1 && (this.context = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s.hydrateDefinitions(this.items, this.context), this.#o({ source: we.CORE, event: oe.SET_CONTEXT, current: u, initial: i }));
  }
}
class Tp {
  #e;
  constructor(u, i) {
    const l = () => this;
    this.#e = new Ep(u, i, l);
  }
  get items() {
    return this.#e.items;
  }
  get context() {
    return this.#e.context;
  }
  get isReady() {
    return this.#e.isReady;
  }
  get isEmpty() {
    return this.#e.isEmpty;
  }
  get hasMatches() {
    return this.#e.hasMatches;
  }
  get isLoading() {
    return this.#e.isLoading;
  }
  get disabled() {
    return this.#e.disabled;
  }
  get state() {
    return this.#e.state;
  }
  get updatedAt() {
    return this.#e.updatedAt;
  }
  get events() {
    return this.#e.events;
  }
  /**
   * Mixin interfaces
   */
  get matches() {
    return this.#e.matches;
  }
  get search() {
    const u = this.#e.search;
    return {
      rule: u.rule,
      searchTerm: u.searchTerm,
      hasSearchTerm: u.hasSearchTerm,
      hasSearchRule: u.hasSearchRule,
      setSearchTerm: u.setSearchTerm.bind(u),
      reset: u.reset.bind(u),
      test: u.test.bind(u)
    };
  }
  get filters() {
    const u = this.#e.filters;
    return {
      values: u.values,
      raw: u.raw,
      activeRules: u.activeRules,
      rules: u.rules,
      isActive: u.isRuleActive.bind(u),
      get: u.get.bind(u),
      add: u.add.bind(u),
      has: u.has.bind(u),
      getRule: u.getRule.bind(u),
      toggle: u.toggle.bind(u),
      set: u.set.bind(u),
      delete: u.delete.bind(u),
      test: u.test.bind(u),
      testRule: u.testRule.bind(u),
      testRuleOptions: u.testRuleOptions.bind(u)
    };
  }
  get sortBy() {
    const u = this.#e.sortBy;
    return {
      activeRule: u.activeRule,
      sortDirection: u.sortDirection,
      userHasSetSortDirection: u.userHasSetSortDirection,
      rules: u.rules,
      set: u.set.bind(u),
      setSortDirection: u.setSortDirection.bind(u),
      cycleSortDirection: u.cycleSortDirection.bind(u),
      toggleSortDirection: u.toggleSortDirection.bind(u),
      reset: u.reset.bind(u)
    };
  }
  get groupBy() {
    const u = this.#e.groupBy;
    return {
      activeRule: u.activeRule,
      requireGroup: u.requireGroup,
      rules: u.rules,
      groupSortDirection: u.groupSortDirection,
      set: u.set.bind(u),
      toggle: u.toggle.bind(u),
      setGroupSortDirection: u.setGroupSortDirection.bind(u),
      reset: u.reset.bind(u)
    };
  }
  get pagination() {
    const u = this.#e.pagination;
    return {
      page: u.page,
      offset: u.offset,
      numItemsPerPage: u.numItemsPerPage,
      numTotalItems: u.numTotalItems,
      lastPage: u.lastPage,
      isPaginated: u.numItemsPerPage !== void 0,
      setPage: u.setPage.bind(u),
      setNumItemsPerPage: u.setNumItemsPerPage.bind(u)
    };
  }
  /**
   * Mutators
   */
  setItems(u) {
    return this.#e.setItems(u);
  }
  setIsLoading(u) {
    return this.#e.setIsLoading(u);
  }
  setIsDisabled(u) {
    return this.#e.setIsDisabled(u);
  }
  setRules(u) {
    return this.#e.setRules(u);
  }
  setContext(u) {
    return this.#e.setContext(u);
  }
  /**
   * Utils
   */
  test(u, i = !1) {
    return this.#e.test(u, i);
  }
  getRule(u) {
    return this.#e.getRule(u);
  }
}
function Gf({
  items: g,
  rules: u,
  effects: i,
  initialSearchTerm: l,
  initialSortBy: p,
  initialSortDirection: m,
  initialGroupBy: w,
  initialFilters: b,
  context: L,
  isLoading: U,
  disabled: W,
  page: q,
  numItemsPerPage: he,
  requireGroup: ge,
  ignoreSortByRulesWhileSearchRuleIsActive: Ae,
  onInit: dt,
  onReady: Te,
  onFirstUserInteraction: pe,
  onChange: re,
  controllerRef: xe,
  children: st
}) {
  const [Oe, Ce] = Tf(Date.now()), [J] = Tf(() => {
    const Ut = (Bn) => {
      J.events.on("change", (Wn) => Ce(Wn.instance.updatedAt)), re && re(Bn);
    };
    return new Tp(g, {
      rules: u,
      effects: i,
      initialSearchTerm: l,
      initialSortBy: p,
      initialSortDirection: m,
      initialGroupBy: w,
      initialFilters: b,
      context: L,
      isLoading: U,
      disabled: W,
      page: q,
      numItemsPerPage: he,
      requireGroup: ge,
      ignoreSortByRulesWhileSearchRuleIsActive: Ae,
      onInit: dt,
      onReady: Te,
      onFirstUserInteraction: pe,
      onChange: Ut
    });
  });
  J.setItems(g), J.setIsLoading(U), J.setIsDisabled(W), J.setRules(u), L !== void 0 && J.setContext(L), q !== void 0 && J.pagination.setPage(q), he !== void 0 && J.pagination.setNumItemsPerPage(he), K_(xe, () => J, [J]);
  const ot = Of(() => [J, Oe], [J, Oe]);
  return /* @__PURE__ */ Pe.jsx(bf.Provider, { value: ot, children: st });
}
Gf.Content = Mn;
Gf.SearchTermHaystack = fp;
function bp() {
  return X_(null);
}
export {
  Gf as Finder,
  op as StringMatch,
  yp as filterRule,
  Ip as finderRuleset,
  Ap as groupByRule,
  xp as ruleEffect,
  Op as searchEffect,
  Sp as searchRule,
  wp as sortByRule,
  Un as useFinder,
  bp as useFinderRef
};
