import { createContext as B_, useContext as G_, useMemo as Cf, useState as xf, useImperativeHandle as W_, useRef as H_ } from "react";
import { jsx as gt } from "react/jsx-runtime";
function gp(h) {
  return h;
}
function dp(h) {
  return h;
}
function _p(h) {
  return h;
}
function pp(h) {
  return h;
}
function vp(h) {
  return h;
}
function Ip(h, u) {
  return { rules: h, onChange: u };
}
function Tp(h, u) {
  return { haystack: h, onChange: u };
}
const Nf = B_(null);
function Je() {
  const h = G_(Nf);
  if (h === null)
    throw new Error("useFinder requires a FinderContext.");
  const [u] = h;
  return u;
}
function Df({ children: h }) {
  const u = Je();
  return u.isLoading ? typeof h == "function" ? /* @__PURE__ */ gt(h, { pagination: u.pagination, context: u.context }) : h : null;
}
function bf({ children: h }) {
  const u = Je();
  return u.isEmpty ? typeof h == "function" ? /* @__PURE__ */ gt(h, { pagination: u.pagination, context: u.context }) : h : null;
}
function Ff({ children: h }) {
  const u = Je();
  return u.isEmpty === !1 && u.hasMatches === !1 ? typeof h == "function" ? /* @__PURE__ */ gt(h, { pagination: u.pagination, context: u.context }) : h : null;
}
function Uf({ children: h }) {
  const u = Je();
  return u.hasMatches && u.matches.items ? typeof h == "function" ? /* @__PURE__ */ gt(h, { items: u.matches.items, pagination: u.pagination, context: u.context }) : h : null;
}
function Mf({ children: h }) {
  const u = Je();
  return u.hasMatches && u.matches.groups ? typeof h == "function" ? /* @__PURE__ */ gt(h, { groups: u.matches.groups, pagination: u.pagination, context: u.context }) : h : null;
}
function Ve({ children: h }) {
  if (Object.values(h).length === 0)
    throw new Error("No render props were found.");
  return [
    h.loading && /* @__PURE__ */ gt(Df, { children: h.loading }, "loading"),
    h.empty && /* @__PURE__ */ gt(bf, { children: h.empty }, "empty"),
    h.noMatches && /* @__PURE__ */ gt(Ff, { children: h.noMatches }, "noMatches"),
    h.items && /* @__PURE__ */ gt(Uf, { children: h.items }, "items"),
    h.groups && /* @__PURE__ */ gt(Mf, { children: h.groups }, "groups")
  ];
}
Ve.Loading = Df;
Ve.Empty = bf;
Ve.NoMatches = Ff;
Ve.Items = Uf;
Ve.Groups = Mf;
var vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Rn = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var q_ = Rn.exports, Of;
function Y_() {
  return Of || (Of = 1, (function(h, u) {
    (function() {
      var i, l = "4.17.21", p = 200, S = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", m = "Expected a function", L = "Invalid `variable` option passed into `_.template`", B = "__lodash_hash_undefined__", U = 500, K = "__lodash_placeholder__", Y = 1, At = 2, at = 4, wt = 1, ce = 2, lt = 1, yt = 2, he = 4, vt = 8, kt = 16, It = 32, xt = 64, z = 128, jt = 256, Qe = 512, Sr = 30, Rr = "...", zf = 800, $f = 16, Zi = 1, Kf = 2, Xf = 3, me = 1 / 0, ge = 9007199254740991, Zf = 17976931348623157e292, An = NaN, Zt = 4294967295, Jf = Zt - 1, Vf = Zt >>> 1, Qf = [
        ["ary", z],
        ["bind", lt],
        ["bindKey", yt],
        ["curry", vt],
        ["curryRight", kt],
        ["flip", Qe],
        ["partial", It],
        ["partialRight", xt],
        ["rearg", jt]
      ], De = "[object Arguments]", wn = "[object Array]", kf = "[object AsyncFunction]", ke = "[object Boolean]", je = "[object Date]", jf = "[object DOMException]", yn = "[object Error]", xn = "[object Function]", Ji = "[object GeneratorFunction]", qt = "[object Map]", tn = "[object Number]", to = "[object Null]", te = "[object Object]", Vi = "[object Promise]", eo = "[object Proxy]", en = "[object RegExp]", Yt = "[object Set]", nn = "[object String]", On = "[object Symbol]", no = "[object Undefined]", rn = "[object WeakMap]", ro = "[object WeakSet]", un = "[object ArrayBuffer]", be = "[object DataView]", Er = "[object Float32Array]", mr = "[object Float64Array]", Ar = "[object Int8Array]", wr = "[object Int16Array]", yr = "[object Int32Array]", xr = "[object Uint8Array]", Or = "[object Uint8ClampedArray]", Lr = "[object Uint16Array]", Pr = "[object Uint32Array]", io = /\b__p \+= '';/g, uo = /\b(__p \+=) '' \+/g, so = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Qi = /&(?:amp|lt|gt|quot|#39);/g, ki = /[&<>"']/g, fo = RegExp(Qi.source), oo = RegExp(ki.source), ao = /<%-([\s\S]+?)%>/g, lo = /<%([\s\S]+?)%>/g, ji = /<%=([\s\S]+?)%>/g, co = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ho = /^\w*$/, go = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Cr = /[\\^$.*+?()[\]{}|]/g, _o = RegExp(Cr.source), Nr = /^\s+/, po = /\s/, vo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Io = /\{\n\/\* \[wrapped with (.+)\] \*/, To = /,? & /, So = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ro = /[()=,{}\[\]\/\s]/, Eo = /\\(\\)?/g, mo = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, tu = /\w*$/, Ao = /^[-+]0x[0-9a-f]+$/i, wo = /^0b[01]+$/i, yo = /^\[object .+?Constructor\]$/, xo = /^0o[0-7]+$/i, Oo = /^(?:0|[1-9]\d*)$/, Lo = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ln = /($^)/, Po = /['\n\r\u2028\u2029\\]/g, Pn = "\\ud800-\\udfff", Co = "\\u0300-\\u036f", No = "\\ufe20-\\ufe2f", Do = "\\u20d0-\\u20ff", eu = Co + No + Do, nu = "\\u2700-\\u27bf", ru = "a-z\\xdf-\\xf6\\xf8-\\xff", bo = "\\xac\\xb1\\xd7\\xf7", Fo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Uo = "\\u2000-\\u206f", Mo = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", iu = "A-Z\\xc0-\\xd6\\xd8-\\xde", uu = "\\ufe0e\\ufe0f", su = bo + Fo + Uo + Mo, Dr = "['’]", Bo = "[" + Pn + "]", fu = "[" + su + "]", Cn = "[" + eu + "]", ou = "\\d+", Go = "[" + nu + "]", au = "[" + ru + "]", lu = "[^" + Pn + su + ou + nu + ru + iu + "]", br = "\\ud83c[\\udffb-\\udfff]", Wo = "(?:" + Cn + "|" + br + ")", cu = "[^" + Pn + "]", Fr = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ur = "[\\ud800-\\udbff][\\udc00-\\udfff]", Fe = "[" + iu + "]", hu = "\\u200d", gu = "(?:" + au + "|" + lu + ")", Ho = "(?:" + Fe + "|" + lu + ")", du = "(?:" + Dr + "(?:d|ll|m|re|s|t|ve))?", _u = "(?:" + Dr + "(?:D|LL|M|RE|S|T|VE))?", pu = Wo + "?", vu = "[" + uu + "]?", qo = "(?:" + hu + "(?:" + [cu, Fr, Ur].join("|") + ")" + vu + pu + ")*", Yo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", zo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Iu = vu + pu + qo, $o = "(?:" + [Go, Fr, Ur].join("|") + ")" + Iu, Ko = "(?:" + [cu + Cn + "?", Cn, Fr, Ur, Bo].join("|") + ")", Xo = RegExp(Dr, "g"), Zo = RegExp(Cn, "g"), Mr = RegExp(br + "(?=" + br + ")|" + Ko + Iu, "g"), Jo = RegExp([
        Fe + "?" + au + "+" + du + "(?=" + [fu, Fe, "$"].join("|") + ")",
        Ho + "+" + _u + "(?=" + [fu, Fe + gu, "$"].join("|") + ")",
        Fe + "?" + gu + "+" + du,
        Fe + "+" + _u,
        zo,
        Yo,
        ou,
        $o
      ].join("|"), "g"), Vo = RegExp("[" + hu + Pn + eu + uu + "]"), Qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ko = [
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
      ], jo = -1, Z = {};
      Z[Er] = Z[mr] = Z[Ar] = Z[wr] = Z[yr] = Z[xr] = Z[Or] = Z[Lr] = Z[Pr] = !0, Z[De] = Z[wn] = Z[un] = Z[ke] = Z[be] = Z[je] = Z[yn] = Z[xn] = Z[qt] = Z[tn] = Z[te] = Z[en] = Z[Yt] = Z[nn] = Z[rn] = !1;
      var X = {};
      X[De] = X[wn] = X[un] = X[be] = X[ke] = X[je] = X[Er] = X[mr] = X[Ar] = X[wr] = X[yr] = X[qt] = X[tn] = X[te] = X[en] = X[Yt] = X[nn] = X[On] = X[xr] = X[Or] = X[Lr] = X[Pr] = !0, X[yn] = X[xn] = X[rn] = !1;
      var ta = {
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
      }, ea = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, na = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, ra = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, ia = parseFloat, ua = parseInt, Tu = typeof vr == "object" && vr && vr.Object === Object && vr, sa = typeof self == "object" && self && self.Object === Object && self, st = Tu || sa || Function("return this")(), Br = u && !u.nodeType && u, Ae = Br && !0 && h && !h.nodeType && h, Su = Ae && Ae.exports === Br, Gr = Su && Tu.process, bt = (function() {
        try {
          var g = Ae && Ae.require && Ae.require("util").types;
          return g || Gr && Gr.binding && Gr.binding("util");
        } catch {
        }
      })(), Ru = bt && bt.isArrayBuffer, Eu = bt && bt.isDate, mu = bt && bt.isMap, Au = bt && bt.isRegExp, wu = bt && bt.isSet, yu = bt && bt.isTypedArray;
      function Ot(g, v, _) {
        switch (_.length) {
          case 0:
            return g.call(v);
          case 1:
            return g.call(v, _[0]);
          case 2:
            return g.call(v, _[0], _[1]);
          case 3:
            return g.call(v, _[0], _[1], _[2]);
        }
        return g.apply(v, _);
      }
      function fa(g, v, _, A) {
        for (var P = -1, W = g == null ? 0 : g.length; ++P < W; ) {
          var rt = g[P];
          v(A, rt, _(rt), g);
        }
        return A;
      }
      function Ft(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length; ++_ < A && v(g[_], _, g) !== !1; )
          ;
        return g;
      }
      function oa(g, v) {
        for (var _ = g == null ? 0 : g.length; _-- && v(g[_], _, g) !== !1; )
          ;
        return g;
      }
      function xu(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length; ++_ < A; )
          if (!v(g[_], _, g))
            return !1;
        return !0;
      }
      function de(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length, P = 0, W = []; ++_ < A; ) {
          var rt = g[_];
          v(rt, _, g) && (W[P++] = rt);
        }
        return W;
      }
      function Nn(g, v) {
        var _ = g == null ? 0 : g.length;
        return !!_ && Ue(g, v, 0) > -1;
      }
      function Wr(g, v, _) {
        for (var A = -1, P = g == null ? 0 : g.length; ++A < P; )
          if (_(v, g[A]))
            return !0;
        return !1;
      }
      function J(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length, P = Array(A); ++_ < A; )
          P[_] = v(g[_], _, g);
        return P;
      }
      function _e(g, v) {
        for (var _ = -1, A = v.length, P = g.length; ++_ < A; )
          g[P + _] = v[_];
        return g;
      }
      function Hr(g, v, _, A) {
        var P = -1, W = g == null ? 0 : g.length;
        for (A && W && (_ = g[++P]); ++P < W; )
          _ = v(_, g[P], P, g);
        return _;
      }
      function aa(g, v, _, A) {
        var P = g == null ? 0 : g.length;
        for (A && P && (_ = g[--P]); P--; )
          _ = v(_, g[P], P, g);
        return _;
      }
      function qr(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length; ++_ < A; )
          if (v(g[_], _, g))
            return !0;
        return !1;
      }
      var la = Yr("length");
      function ca(g) {
        return g.split("");
      }
      function ha(g) {
        return g.match(So) || [];
      }
      function Ou(g, v, _) {
        var A;
        return _(g, function(P, W, rt) {
          if (v(P, W, rt))
            return A = W, !1;
        }), A;
      }
      function Dn(g, v, _, A) {
        for (var P = g.length, W = _ + (A ? 1 : -1); A ? W-- : ++W < P; )
          if (v(g[W], W, g))
            return W;
        return -1;
      }
      function Ue(g, v, _) {
        return v === v ? Aa(g, v, _) : Dn(g, Lu, _);
      }
      function ga(g, v, _, A) {
        for (var P = _ - 1, W = g.length; ++P < W; )
          if (A(g[P], v))
            return P;
        return -1;
      }
      function Lu(g) {
        return g !== g;
      }
      function Pu(g, v) {
        var _ = g == null ? 0 : g.length;
        return _ ? $r(g, v) / _ : An;
      }
      function Yr(g) {
        return function(v) {
          return v == null ? i : v[g];
        };
      }
      function zr(g) {
        return function(v) {
          return g == null ? i : g[v];
        };
      }
      function Cu(g, v, _, A, P) {
        return P(g, function(W, rt, $) {
          _ = A ? (A = !1, W) : v(_, W, rt, $);
        }), _;
      }
      function da(g, v) {
        var _ = g.length;
        for (g.sort(v); _--; )
          g[_] = g[_].value;
        return g;
      }
      function $r(g, v) {
        for (var _, A = -1, P = g.length; ++A < P; ) {
          var W = v(g[A]);
          W !== i && (_ = _ === i ? W : _ + W);
        }
        return _;
      }
      function Kr(g, v) {
        for (var _ = -1, A = Array(g); ++_ < g; )
          A[_] = v(_);
        return A;
      }
      function _a(g, v) {
        return J(v, function(_) {
          return [_, g[_]];
        });
      }
      function Nu(g) {
        return g && g.slice(0, Uu(g) + 1).replace(Nr, "");
      }
      function Lt(g) {
        return function(v) {
          return g(v);
        };
      }
      function Xr(g, v) {
        return J(v, function(_) {
          return g[_];
        });
      }
      function sn(g, v) {
        return g.has(v);
      }
      function Du(g, v) {
        for (var _ = -1, A = g.length; ++_ < A && Ue(v, g[_], 0) > -1; )
          ;
        return _;
      }
      function bu(g, v) {
        for (var _ = g.length; _-- && Ue(v, g[_], 0) > -1; )
          ;
        return _;
      }
      function pa(g, v) {
        for (var _ = g.length, A = 0; _--; )
          g[_] === v && ++A;
        return A;
      }
      var va = zr(ta), Ia = zr(ea);
      function Ta(g) {
        return "\\" + ra[g];
      }
      function Sa(g, v) {
        return g == null ? i : g[v];
      }
      function Me(g) {
        return Vo.test(g);
      }
      function Ra(g) {
        return Qo.test(g);
      }
      function Ea(g) {
        for (var v, _ = []; !(v = g.next()).done; )
          _.push(v.value);
        return _;
      }
      function Zr(g) {
        var v = -1, _ = Array(g.size);
        return g.forEach(function(A, P) {
          _[++v] = [P, A];
        }), _;
      }
      function Fu(g, v) {
        return function(_) {
          return g(v(_));
        };
      }
      function pe(g, v) {
        for (var _ = -1, A = g.length, P = 0, W = []; ++_ < A; ) {
          var rt = g[_];
          (rt === v || rt === K) && (g[_] = K, W[P++] = _);
        }
        return W;
      }
      function bn(g) {
        var v = -1, _ = Array(g.size);
        return g.forEach(function(A) {
          _[++v] = A;
        }), _;
      }
      function ma(g) {
        var v = -1, _ = Array(g.size);
        return g.forEach(function(A) {
          _[++v] = [A, A];
        }), _;
      }
      function Aa(g, v, _) {
        for (var A = _ - 1, P = g.length; ++A < P; )
          if (g[A] === v)
            return A;
        return -1;
      }
      function wa(g, v, _) {
        for (var A = _ + 1; A--; )
          if (g[A] === v)
            return A;
        return A;
      }
      function Be(g) {
        return Me(g) ? xa(g) : la(g);
      }
      function zt(g) {
        return Me(g) ? Oa(g) : ca(g);
      }
      function Uu(g) {
        for (var v = g.length; v-- && po.test(g.charAt(v)); )
          ;
        return v;
      }
      var ya = zr(na);
      function xa(g) {
        for (var v = Mr.lastIndex = 0; Mr.test(g); )
          ++v;
        return v;
      }
      function Oa(g) {
        return g.match(Mr) || [];
      }
      function La(g) {
        return g.match(Jo) || [];
      }
      var Pa = (function g(v) {
        v = v == null ? st : Ge.defaults(st.Object(), v, Ge.pick(st, ko));
        var _ = v.Array, A = v.Date, P = v.Error, W = v.Function, rt = v.Math, $ = v.Object, Jr = v.RegExp, Ca = v.String, Ut = v.TypeError, Fn = _.prototype, Na = W.prototype, We = $.prototype, Un = v["__core-js_shared__"], Mn = Na.toString, q = We.hasOwnProperty, Da = 0, Mu = (function() {
          var t = /[^.]+$/.exec(Un && Un.keys && Un.keys.IE_PROTO || "");
          return t ? "Symbol(src)_1." + t : "";
        })(), Bn = We.toString, ba = Mn.call($), Fa = st._, Ua = Jr(
          "^" + Mn.call(q).replace(Cr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Gn = Su ? v.Buffer : i, ve = v.Symbol, Wn = v.Uint8Array, Bu = Gn ? Gn.allocUnsafe : i, Hn = Fu($.getPrototypeOf, $), Gu = $.create, Wu = We.propertyIsEnumerable, qn = Fn.splice, Hu = ve ? ve.isConcatSpreadable : i, fn = ve ? ve.iterator : i, we = ve ? ve.toStringTag : i, Yn = (function() {
          try {
            var t = Pe($, "defineProperty");
            return t({}, "", {}), t;
          } catch {
          }
        })(), Ma = v.clearTimeout !== st.clearTimeout && v.clearTimeout, Ba = A && A.now !== st.Date.now && A.now, Ga = v.setTimeout !== st.setTimeout && v.setTimeout, zn = rt.ceil, $n = rt.floor, Vr = $.getOwnPropertySymbols, Wa = Gn ? Gn.isBuffer : i, qu = v.isFinite, Ha = Fn.join, qa = Fu($.keys, $), it = rt.max, ct = rt.min, Ya = A.now, za = v.parseInt, Yu = rt.random, $a = Fn.reverse, Qr = Pe(v, "DataView"), on = Pe(v, "Map"), kr = Pe(v, "Promise"), He = Pe(v, "Set"), an = Pe(v, "WeakMap"), ln = Pe($, "create"), Kn = an && new an(), qe = {}, Ka = Ce(Qr), Xa = Ce(on), Za = Ce(kr), Ja = Ce(He), Va = Ce(an), Xn = ve ? ve.prototype : i, cn = Xn ? Xn.valueOf : i, zu = Xn ? Xn.toString : i;
        function f(t) {
          if (tt(t) && !C(t) && !(t instanceof M)) {
            if (t instanceof Mt)
              return t;
            if (q.call(t, "__wrapped__"))
              return $s(t);
          }
          return new Mt(t);
        }
        var Ye = /* @__PURE__ */ (function() {
          function t() {
          }
          return function(e) {
            if (!V(e))
              return {};
            if (Gu)
              return Gu(e);
            t.prototype = e;
            var n = new t();
            return t.prototype = i, n;
          };
        })();
        function Zn() {
        }
        function Mt(t, e) {
          this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = i;
        }
        f.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: ao,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: lo,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: ji,
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
            _: f
          }
        }, f.prototype = Zn.prototype, f.prototype.constructor = f, Mt.prototype = Ye(Zn.prototype), Mt.prototype.constructor = Mt;
        function M(t) {
          this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Zt, this.__views__ = [];
        }
        function Qa() {
          var t = new M(this.__wrapped__);
          return t.__actions__ = Tt(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Tt(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Tt(this.__views__), t;
        }
        function ka() {
          if (this.__filtered__) {
            var t = new M(this);
            t.__dir__ = -1, t.__filtered__ = !0;
          } else
            t = this.clone(), t.__dir__ *= -1;
          return t;
        }
        function ja() {
          var t = this.__wrapped__.value(), e = this.__dir__, n = C(t), r = e < 0, s = n ? t.length : 0, o = cc(0, s, this.__views__), a = o.start, c = o.end, d = c - a, I = r ? c : a - 1, T = this.__iteratees__, R = T.length, E = 0, w = ct(d, this.__takeCount__);
          if (!n || !r && s == d && w == d)
            return ds(t, this.__actions__);
          var x = [];
          t:
            for (; d-- && E < w; ) {
              I += e;
              for (var D = -1, O = t[I]; ++D < R; ) {
                var F = T[D], G = F.iteratee, Nt = F.type, pt = G(O);
                if (Nt == Kf)
                  O = pt;
                else if (!pt) {
                  if (Nt == Zi)
                    continue t;
                  break t;
                }
              }
              x[E++] = O;
            }
          return x;
        }
        M.prototype = Ye(Zn.prototype), M.prototype.constructor = M;
        function ye(t) {
          var e = -1, n = t == null ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var r = t[e];
            this.set(r[0], r[1]);
          }
        }
        function tl() {
          this.__data__ = ln ? ln(null) : {}, this.size = 0;
        }
        function el(t) {
          var e = this.has(t) && delete this.__data__[t];
          return this.size -= e ? 1 : 0, e;
        }
        function nl(t) {
          var e = this.__data__;
          if (ln) {
            var n = e[t];
            return n === B ? i : n;
          }
          return q.call(e, t) ? e[t] : i;
        }
        function rl(t) {
          var e = this.__data__;
          return ln ? e[t] !== i : q.call(e, t);
        }
        function il(t, e) {
          var n = this.__data__;
          return this.size += this.has(t) ? 0 : 1, n[t] = ln && e === i ? B : e, this;
        }
        ye.prototype.clear = tl, ye.prototype.delete = el, ye.prototype.get = nl, ye.prototype.has = rl, ye.prototype.set = il;
        function ee(t) {
          var e = -1, n = t == null ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var r = t[e];
            this.set(r[0], r[1]);
          }
        }
        function ul() {
          this.__data__ = [], this.size = 0;
        }
        function sl(t) {
          var e = this.__data__, n = Jn(e, t);
          if (n < 0)
            return !1;
          var r = e.length - 1;
          return n == r ? e.pop() : qn.call(e, n, 1), --this.size, !0;
        }
        function fl(t) {
          var e = this.__data__, n = Jn(e, t);
          return n < 0 ? i : e[n][1];
        }
        function ol(t) {
          return Jn(this.__data__, t) > -1;
        }
        function al(t, e) {
          var n = this.__data__, r = Jn(n, t);
          return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
        }
        ee.prototype.clear = ul, ee.prototype.delete = sl, ee.prototype.get = fl, ee.prototype.has = ol, ee.prototype.set = al;
        function ne(t) {
          var e = -1, n = t == null ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var r = t[e];
            this.set(r[0], r[1]);
          }
        }
        function ll() {
          this.size = 0, this.__data__ = {
            hash: new ye(),
            map: new (on || ee)(),
            string: new ye()
          };
        }
        function cl(t) {
          var e = fr(this, t).delete(t);
          return this.size -= e ? 1 : 0, e;
        }
        function hl(t) {
          return fr(this, t).get(t);
        }
        function gl(t) {
          return fr(this, t).has(t);
        }
        function dl(t, e) {
          var n = fr(this, t), r = n.size;
          return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
        }
        ne.prototype.clear = ll, ne.prototype.delete = cl, ne.prototype.get = hl, ne.prototype.has = gl, ne.prototype.set = dl;
        function xe(t) {
          var e = -1, n = t == null ? 0 : t.length;
          for (this.__data__ = new ne(); ++e < n; )
            this.add(t[e]);
        }
        function _l(t) {
          return this.__data__.set(t, B), this;
        }
        function pl(t) {
          return this.__data__.has(t);
        }
        xe.prototype.add = xe.prototype.push = _l, xe.prototype.has = pl;
        function $t(t) {
          var e = this.__data__ = new ee(t);
          this.size = e.size;
        }
        function vl() {
          this.__data__ = new ee(), this.size = 0;
        }
        function Il(t) {
          var e = this.__data__, n = e.delete(t);
          return this.size = e.size, n;
        }
        function Tl(t) {
          return this.__data__.get(t);
        }
        function Sl(t) {
          return this.__data__.has(t);
        }
        function Rl(t, e) {
          var n = this.__data__;
          if (n instanceof ee) {
            var r = n.__data__;
            if (!on || r.length < p - 1)
              return r.push([t, e]), this.size = ++n.size, this;
            n = this.__data__ = new ne(r);
          }
          return n.set(t, e), this.size = n.size, this;
        }
        $t.prototype.clear = vl, $t.prototype.delete = Il, $t.prototype.get = Tl, $t.prototype.has = Sl, $t.prototype.set = Rl;
        function $u(t, e) {
          var n = C(t), r = !n && Ne(t), s = !n && !r && Ee(t), o = !n && !r && !s && Xe(t), a = n || r || s || o, c = a ? Kr(t.length, Ca) : [], d = c.length;
          for (var I in t)
            (e || q.call(t, I)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
            (I == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            s && (I == "offset" || I == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            o && (I == "buffer" || I == "byteLength" || I == "byteOffset") || // Skip index properties.
            se(I, d))) && c.push(I);
          return c;
        }
        function Ku(t) {
          var e = t.length;
          return e ? t[ai(0, e - 1)] : i;
        }
        function El(t, e) {
          return or(Tt(t), Oe(e, 0, t.length));
        }
        function ml(t) {
          return or(Tt(t));
        }
        function jr(t, e, n) {
          (n !== i && !Kt(t[e], n) || n === i && !(e in t)) && re(t, e, n);
        }
        function hn(t, e, n) {
          var r = t[e];
          (!(q.call(t, e) && Kt(r, n)) || n === i && !(e in t)) && re(t, e, n);
        }
        function Jn(t, e) {
          for (var n = t.length; n--; )
            if (Kt(t[n][0], e))
              return n;
          return -1;
        }
        function Al(t, e, n, r) {
          return Ie(t, function(s, o, a) {
            e(r, s, n(s), a);
          }), r;
        }
        function Xu(t, e) {
          return t && Vt(e, ut(e), t);
        }
        function wl(t, e) {
          return t && Vt(e, Rt(e), t);
        }
        function re(t, e, n) {
          e == "__proto__" && Yn ? Yn(t, e, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : t[e] = n;
        }
        function ti(t, e) {
          for (var n = -1, r = e.length, s = _(r), o = t == null; ++n < r; )
            s[n] = o ? i : bi(t, e[n]);
          return s;
        }
        function Oe(t, e, n) {
          return t === t && (n !== i && (t = t <= n ? t : n), e !== i && (t = t >= e ? t : e)), t;
        }
        function Bt(t, e, n, r, s, o) {
          var a, c = e & Y, d = e & At, I = e & at;
          if (n && (a = s ? n(t, r, s, o) : n(t)), a !== i)
            return a;
          if (!V(t))
            return t;
          var T = C(t);
          if (T) {
            if (a = gc(t), !c)
              return Tt(t, a);
          } else {
            var R = ht(t), E = R == xn || R == Ji;
            if (Ee(t))
              return vs(t, c);
            if (R == te || R == De || E && !s) {
              if (a = d || E ? {} : Us(t), !c)
                return d ? nc(t, wl(a, t)) : ec(t, Xu(a, t));
            } else {
              if (!X[R])
                return s ? t : {};
              a = dc(t, R, c);
            }
          }
          o || (o = new $t());
          var w = o.get(t);
          if (w)
            return w;
          o.set(t, a), hf(t) ? t.forEach(function(O) {
            a.add(Bt(O, e, n, O, t, o));
          }) : lf(t) && t.forEach(function(O, F) {
            a.set(F, Bt(O, e, n, F, t, o));
          });
          var x = I ? d ? Si : Ti : d ? Rt : ut, D = T ? i : x(t);
          return Ft(D || t, function(O, F) {
            D && (F = O, O = t[F]), hn(a, F, Bt(O, e, n, F, t, o));
          }), a;
        }
        function yl(t) {
          var e = ut(t);
          return function(n) {
            return Zu(n, t, e);
          };
        }
        function Zu(t, e, n) {
          var r = n.length;
          if (t == null)
            return !r;
          for (t = $(t); r--; ) {
            var s = n[r], o = e[s], a = t[s];
            if (a === i && !(s in t) || !o(a))
              return !1;
          }
          return !0;
        }
        function Ju(t, e, n) {
          if (typeof t != "function")
            throw new Ut(m);
          return Tn(function() {
            t.apply(i, n);
          }, e);
        }
        function gn(t, e, n, r) {
          var s = -1, o = Nn, a = !0, c = t.length, d = [], I = e.length;
          if (!c)
            return d;
          n && (e = J(e, Lt(n))), r ? (o = Wr, a = !1) : e.length >= p && (o = sn, a = !1, e = new xe(e));
          t:
            for (; ++s < c; ) {
              var T = t[s], R = n == null ? T : n(T);
              if (T = r || T !== 0 ? T : 0, a && R === R) {
                for (var E = I; E--; )
                  if (e[E] === R)
                    continue t;
                d.push(T);
              } else o(e, R, r) || d.push(T);
            }
          return d;
        }
        var Ie = Es(Jt), Vu = Es(ni, !0);
        function xl(t, e) {
          var n = !0;
          return Ie(t, function(r, s, o) {
            return n = !!e(r, s, o), n;
          }), n;
        }
        function Vn(t, e, n) {
          for (var r = -1, s = t.length; ++r < s; ) {
            var o = t[r], a = e(o);
            if (a != null && (c === i ? a === a && !Ct(a) : n(a, c)))
              var c = a, d = o;
          }
          return d;
        }
        function Ol(t, e, n, r) {
          var s = t.length;
          for (n = N(n), n < 0 && (n = -n > s ? 0 : s + n), r = r === i || r > s ? s : N(r), r < 0 && (r += s), r = n > r ? 0 : df(r); n < r; )
            t[n++] = e;
          return t;
        }
        function Qu(t, e) {
          var n = [];
          return Ie(t, function(r, s, o) {
            e(r, s, o) && n.push(r);
          }), n;
        }
        function ft(t, e, n, r, s) {
          var o = -1, a = t.length;
          for (n || (n = pc), s || (s = []); ++o < a; ) {
            var c = t[o];
            e > 0 && n(c) ? e > 1 ? ft(c, e - 1, n, r, s) : _e(s, c) : r || (s[s.length] = c);
          }
          return s;
        }
        var ei = ms(), ku = ms(!0);
        function Jt(t, e) {
          return t && ei(t, e, ut);
        }
        function ni(t, e) {
          return t && ku(t, e, ut);
        }
        function Qn(t, e) {
          return de(e, function(n) {
            return fe(t[n]);
          });
        }
        function Le(t, e) {
          e = Se(e, t);
          for (var n = 0, r = e.length; t != null && n < r; )
            t = t[Qt(e[n++])];
          return n && n == r ? t : i;
        }
        function ju(t, e, n) {
          var r = e(t);
          return C(t) ? r : _e(r, n(t));
        }
        function dt(t) {
          return t == null ? t === i ? no : to : we && we in $(t) ? lc(t) : mc(t);
        }
        function ri(t, e) {
          return t > e;
        }
        function Ll(t, e) {
          return t != null && q.call(t, e);
        }
        function Pl(t, e) {
          return t != null && e in $(t);
        }
        function Cl(t, e, n) {
          return t >= ct(e, n) && t < it(e, n);
        }
        function ii(t, e, n) {
          for (var r = n ? Wr : Nn, s = t[0].length, o = t.length, a = o, c = _(o), d = 1 / 0, I = []; a--; ) {
            var T = t[a];
            a && e && (T = J(T, Lt(e))), d = ct(T.length, d), c[a] = !n && (e || s >= 120 && T.length >= 120) ? new xe(a && T) : i;
          }
          T = t[0];
          var R = -1, E = c[0];
          t:
            for (; ++R < s && I.length < d; ) {
              var w = T[R], x = e ? e(w) : w;
              if (w = n || w !== 0 ? w : 0, !(E ? sn(E, x) : r(I, x, n))) {
                for (a = o; --a; ) {
                  var D = c[a];
                  if (!(D ? sn(D, x) : r(t[a], x, n)))
                    continue t;
                }
                E && E.push(x), I.push(w);
              }
            }
          return I;
        }
        function Nl(t, e, n, r) {
          return Jt(t, function(s, o, a) {
            e(r, n(s), o, a);
          }), r;
        }
        function dn(t, e, n) {
          e = Se(e, t), t = Ws(t, e);
          var r = t == null ? t : t[Qt(Wt(e))];
          return r == null ? i : Ot(r, t, n);
        }
        function ts(t) {
          return tt(t) && dt(t) == De;
        }
        function Dl(t) {
          return tt(t) && dt(t) == un;
        }
        function bl(t) {
          return tt(t) && dt(t) == je;
        }
        function _n(t, e, n, r, s) {
          return t === e ? !0 : t == null || e == null || !tt(t) && !tt(e) ? t !== t && e !== e : Fl(t, e, n, r, _n, s);
        }
        function Fl(t, e, n, r, s, o) {
          var a = C(t), c = C(e), d = a ? wn : ht(t), I = c ? wn : ht(e);
          d = d == De ? te : d, I = I == De ? te : I;
          var T = d == te, R = I == te, E = d == I;
          if (E && Ee(t)) {
            if (!Ee(e))
              return !1;
            a = !0, T = !1;
          }
          if (E && !T)
            return o || (o = new $t()), a || Xe(t) ? Ds(t, e, n, r, s, o) : oc(t, e, d, n, r, s, o);
          if (!(n & wt)) {
            var w = T && q.call(t, "__wrapped__"), x = R && q.call(e, "__wrapped__");
            if (w || x) {
              var D = w ? t.value() : t, O = x ? e.value() : e;
              return o || (o = new $t()), s(D, O, n, r, o);
            }
          }
          return E ? (o || (o = new $t()), ac(t, e, n, r, s, o)) : !1;
        }
        function Ul(t) {
          return tt(t) && ht(t) == qt;
        }
        function ui(t, e, n, r) {
          var s = n.length, o = s, a = !r;
          if (t == null)
            return !o;
          for (t = $(t); s--; ) {
            var c = n[s];
            if (a && c[2] ? c[1] !== t[c[0]] : !(c[0] in t))
              return !1;
          }
          for (; ++s < o; ) {
            c = n[s];
            var d = c[0], I = t[d], T = c[1];
            if (a && c[2]) {
              if (I === i && !(d in t))
                return !1;
            } else {
              var R = new $t();
              if (r)
                var E = r(I, T, d, t, e, R);
              if (!(E === i ? _n(T, I, wt | ce, r, R) : E))
                return !1;
            }
          }
          return !0;
        }
        function es(t) {
          if (!V(t) || Ic(t))
            return !1;
          var e = fe(t) ? Ua : yo;
          return e.test(Ce(t));
        }
        function Ml(t) {
          return tt(t) && dt(t) == en;
        }
        function Bl(t) {
          return tt(t) && ht(t) == Yt;
        }
        function Gl(t) {
          return tt(t) && dr(t.length) && !!Z[dt(t)];
        }
        function ns(t) {
          return typeof t == "function" ? t : t == null ? Et : typeof t == "object" ? C(t) ? us(t[0], t[1]) : is(t) : wf(t);
        }
        function si(t) {
          if (!In(t))
            return qa(t);
          var e = [];
          for (var n in $(t))
            q.call(t, n) && n != "constructor" && e.push(n);
          return e;
        }
        function Wl(t) {
          if (!V(t))
            return Ec(t);
          var e = In(t), n = [];
          for (var r in t)
            r == "constructor" && (e || !q.call(t, r)) || n.push(r);
          return n;
        }
        function fi(t, e) {
          return t < e;
        }
        function rs(t, e) {
          var n = -1, r = St(t) ? _(t.length) : [];
          return Ie(t, function(s, o, a) {
            r[++n] = e(s, o, a);
          }), r;
        }
        function is(t) {
          var e = Ei(t);
          return e.length == 1 && e[0][2] ? Bs(e[0][0], e[0][1]) : function(n) {
            return n === t || ui(n, t, e);
          };
        }
        function us(t, e) {
          return Ai(t) && Ms(e) ? Bs(Qt(t), e) : function(n) {
            var r = bi(n, t);
            return r === i && r === e ? Fi(n, t) : _n(e, r, wt | ce);
          };
        }
        function kn(t, e, n, r, s) {
          t !== e && ei(e, function(o, a) {
            if (s || (s = new $t()), V(o))
              Hl(t, e, a, n, kn, r, s);
            else {
              var c = r ? r(yi(t, a), o, a + "", t, e, s) : i;
              c === i && (c = o), jr(t, a, c);
            }
          }, Rt);
        }
        function Hl(t, e, n, r, s, o, a) {
          var c = yi(t, n), d = yi(e, n), I = a.get(d);
          if (I) {
            jr(t, n, I);
            return;
          }
          var T = o ? o(c, d, n + "", t, e, a) : i, R = T === i;
          if (R) {
            var E = C(d), w = !E && Ee(d), x = !E && !w && Xe(d);
            T = d, E || w || x ? C(c) ? T = c : et(c) ? T = Tt(c) : w ? (R = !1, T = vs(d, !0)) : x ? (R = !1, T = Is(d, !0)) : T = [] : Sn(d) || Ne(d) ? (T = c, Ne(c) ? T = _f(c) : (!V(c) || fe(c)) && (T = Us(d))) : R = !1;
          }
          R && (a.set(d, T), s(T, d, r, o, a), a.delete(d)), jr(t, n, T);
        }
        function ss(t, e) {
          var n = t.length;
          if (n)
            return e += e < 0 ? n : 0, se(e, n) ? t[e] : i;
        }
        function fs(t, e, n) {
          e.length ? e = J(e, function(o) {
            return C(o) ? function(a) {
              return Le(a, o.length === 1 ? o[0] : o);
            } : o;
          }) : e = [Et];
          var r = -1;
          e = J(e, Lt(y()));
          var s = rs(t, function(o, a, c) {
            var d = J(e, function(I) {
              return I(o);
            });
            return { criteria: d, index: ++r, value: o };
          });
          return da(s, function(o, a) {
            return tc(o, a, n);
          });
        }
        function ql(t, e) {
          return os(t, e, function(n, r) {
            return Fi(t, r);
          });
        }
        function os(t, e, n) {
          for (var r = -1, s = e.length, o = {}; ++r < s; ) {
            var a = e[r], c = Le(t, a);
            n(c, a) && pn(o, Se(a, t), c);
          }
          return o;
        }
        function Yl(t) {
          return function(e) {
            return Le(e, t);
          };
        }
        function oi(t, e, n, r) {
          var s = r ? ga : Ue, o = -1, a = e.length, c = t;
          for (t === e && (e = Tt(e)), n && (c = J(t, Lt(n))); ++o < a; )
            for (var d = 0, I = e[o], T = n ? n(I) : I; (d = s(c, T, d, r)) > -1; )
              c !== t && qn.call(c, d, 1), qn.call(t, d, 1);
          return t;
        }
        function as(t, e) {
          for (var n = t ? e.length : 0, r = n - 1; n--; ) {
            var s = e[n];
            if (n == r || s !== o) {
              var o = s;
              se(s) ? qn.call(t, s, 1) : hi(t, s);
            }
          }
          return t;
        }
        function ai(t, e) {
          return t + $n(Yu() * (e - t + 1));
        }
        function zl(t, e, n, r) {
          for (var s = -1, o = it(zn((e - t) / (n || 1)), 0), a = _(o); o--; )
            a[r ? o : ++s] = t, t += n;
          return a;
        }
        function li(t, e) {
          var n = "";
          if (!t || e < 1 || e > ge)
            return n;
          do
            e % 2 && (n += t), e = $n(e / 2), e && (t += t);
          while (e);
          return n;
        }
        function b(t, e) {
          return xi(Gs(t, e, Et), t + "");
        }
        function $l(t) {
          return Ku(Ze(t));
        }
        function Kl(t, e) {
          var n = Ze(t);
          return or(n, Oe(e, 0, n.length));
        }
        function pn(t, e, n, r) {
          if (!V(t))
            return t;
          e = Se(e, t);
          for (var s = -1, o = e.length, a = o - 1, c = t; c != null && ++s < o; ) {
            var d = Qt(e[s]), I = n;
            if (d === "__proto__" || d === "constructor" || d === "prototype")
              return t;
            if (s != a) {
              var T = c[d];
              I = r ? r(T, d, c) : i, I === i && (I = V(T) ? T : se(e[s + 1]) ? [] : {});
            }
            hn(c, d, I), c = c[d];
          }
          return t;
        }
        var ls = Kn ? function(t, e) {
          return Kn.set(t, e), t;
        } : Et, Xl = Yn ? function(t, e) {
          return Yn(t, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Mi(e),
            writable: !0
          });
        } : Et;
        function Zl(t) {
          return or(Ze(t));
        }
        function Gt(t, e, n) {
          var r = -1, s = t.length;
          e < 0 && (e = -e > s ? 0 : s + e), n = n > s ? s : n, n < 0 && (n += s), s = e > n ? 0 : n - e >>> 0, e >>>= 0;
          for (var o = _(s); ++r < s; )
            o[r] = t[r + e];
          return o;
        }
        function Jl(t, e) {
          var n;
          return Ie(t, function(r, s, o) {
            return n = e(r, s, o), !n;
          }), !!n;
        }
        function jn(t, e, n) {
          var r = 0, s = t == null ? r : t.length;
          if (typeof e == "number" && e === e && s <= Vf) {
            for (; r < s; ) {
              var o = r + s >>> 1, a = t[o];
              a !== null && !Ct(a) && (n ? a <= e : a < e) ? r = o + 1 : s = o;
            }
            return s;
          }
          return ci(t, e, Et, n);
        }
        function ci(t, e, n, r) {
          var s = 0, o = t == null ? 0 : t.length;
          if (o === 0)
            return 0;
          e = n(e);
          for (var a = e !== e, c = e === null, d = Ct(e), I = e === i; s < o; ) {
            var T = $n((s + o) / 2), R = n(t[T]), E = R !== i, w = R === null, x = R === R, D = Ct(R);
            if (a)
              var O = r || x;
            else I ? O = x && (r || E) : c ? O = x && E && (r || !w) : d ? O = x && E && !w && (r || !D) : w || D ? O = !1 : O = r ? R <= e : R < e;
            O ? s = T + 1 : o = T;
          }
          return ct(o, Jf);
        }
        function cs(t, e) {
          for (var n = -1, r = t.length, s = 0, o = []; ++n < r; ) {
            var a = t[n], c = e ? e(a) : a;
            if (!n || !Kt(c, d)) {
              var d = c;
              o[s++] = a === 0 ? 0 : a;
            }
          }
          return o;
        }
        function hs(t) {
          return typeof t == "number" ? t : Ct(t) ? An : +t;
        }
        function Pt(t) {
          if (typeof t == "string")
            return t;
          if (C(t))
            return J(t, Pt) + "";
          if (Ct(t))
            return zu ? zu.call(t) : "";
          var e = t + "";
          return e == "0" && 1 / t == -me ? "-0" : e;
        }
        function Te(t, e, n) {
          var r = -1, s = Nn, o = t.length, a = !0, c = [], d = c;
          if (n)
            a = !1, s = Wr;
          else if (o >= p) {
            var I = e ? null : sc(t);
            if (I)
              return bn(I);
            a = !1, s = sn, d = new xe();
          } else
            d = e ? [] : c;
          t:
            for (; ++r < o; ) {
              var T = t[r], R = e ? e(T) : T;
              if (T = n || T !== 0 ? T : 0, a && R === R) {
                for (var E = d.length; E--; )
                  if (d[E] === R)
                    continue t;
                e && d.push(R), c.push(T);
              } else s(d, R, n) || (d !== c && d.push(R), c.push(T));
            }
          return c;
        }
        function hi(t, e) {
          return e = Se(e, t), t = Ws(t, e), t == null || delete t[Qt(Wt(e))];
        }
        function gs(t, e, n, r) {
          return pn(t, e, n(Le(t, e)), r);
        }
        function tr(t, e, n, r) {
          for (var s = t.length, o = r ? s : -1; (r ? o-- : ++o < s) && e(t[o], o, t); )
            ;
          return n ? Gt(t, r ? 0 : o, r ? o + 1 : s) : Gt(t, r ? o + 1 : 0, r ? s : o);
        }
        function ds(t, e) {
          var n = t;
          return n instanceof M && (n = n.value()), Hr(e, function(r, s) {
            return s.func.apply(s.thisArg, _e([r], s.args));
          }, n);
        }
        function gi(t, e, n) {
          var r = t.length;
          if (r < 2)
            return r ? Te(t[0]) : [];
          for (var s = -1, o = _(r); ++s < r; )
            for (var a = t[s], c = -1; ++c < r; )
              c != s && (o[s] = gn(o[s] || a, t[c], e, n));
          return Te(ft(o, 1), e, n);
        }
        function _s(t, e, n) {
          for (var r = -1, s = t.length, o = e.length, a = {}; ++r < s; ) {
            var c = r < o ? e[r] : i;
            n(a, t[r], c);
          }
          return a;
        }
        function di(t) {
          return et(t) ? t : [];
        }
        function _i(t) {
          return typeof t == "function" ? t : Et;
        }
        function Se(t, e) {
          return C(t) ? t : Ai(t, e) ? [t] : zs(H(t));
        }
        var Vl = b;
        function Re(t, e, n) {
          var r = t.length;
          return n = n === i ? r : n, !e && n >= r ? t : Gt(t, e, n);
        }
        var ps = Ma || function(t) {
          return st.clearTimeout(t);
        };
        function vs(t, e) {
          if (e)
            return t.slice();
          var n = t.length, r = Bu ? Bu(n) : new t.constructor(n);
          return t.copy(r), r;
        }
        function pi(t) {
          var e = new t.constructor(t.byteLength);
          return new Wn(e).set(new Wn(t)), e;
        }
        function Ql(t, e) {
          var n = e ? pi(t.buffer) : t.buffer;
          return new t.constructor(n, t.byteOffset, t.byteLength);
        }
        function kl(t) {
          var e = new t.constructor(t.source, tu.exec(t));
          return e.lastIndex = t.lastIndex, e;
        }
        function jl(t) {
          return cn ? $(cn.call(t)) : {};
        }
        function Is(t, e) {
          var n = e ? pi(t.buffer) : t.buffer;
          return new t.constructor(n, t.byteOffset, t.length);
        }
        function Ts(t, e) {
          if (t !== e) {
            var n = t !== i, r = t === null, s = t === t, o = Ct(t), a = e !== i, c = e === null, d = e === e, I = Ct(e);
            if (!c && !I && !o && t > e || o && a && d && !c && !I || r && a && d || !n && d || !s)
              return 1;
            if (!r && !o && !I && t < e || I && n && s && !r && !o || c && n && s || !a && s || !d)
              return -1;
          }
          return 0;
        }
        function tc(t, e, n) {
          for (var r = -1, s = t.criteria, o = e.criteria, a = s.length, c = n.length; ++r < a; ) {
            var d = Ts(s[r], o[r]);
            if (d) {
              if (r >= c)
                return d;
              var I = n[r];
              return d * (I == "desc" ? -1 : 1);
            }
          }
          return t.index - e.index;
        }
        function Ss(t, e, n, r) {
          for (var s = -1, o = t.length, a = n.length, c = -1, d = e.length, I = it(o - a, 0), T = _(d + I), R = !r; ++c < d; )
            T[c] = e[c];
          for (; ++s < a; )
            (R || s < o) && (T[n[s]] = t[s]);
          for (; I--; )
            T[c++] = t[s++];
          return T;
        }
        function Rs(t, e, n, r) {
          for (var s = -1, o = t.length, a = -1, c = n.length, d = -1, I = e.length, T = it(o - c, 0), R = _(T + I), E = !r; ++s < T; )
            R[s] = t[s];
          for (var w = s; ++d < I; )
            R[w + d] = e[d];
          for (; ++a < c; )
            (E || s < o) && (R[w + n[a]] = t[s++]);
          return R;
        }
        function Tt(t, e) {
          var n = -1, r = t.length;
          for (e || (e = _(r)); ++n < r; )
            e[n] = t[n];
          return e;
        }
        function Vt(t, e, n, r) {
          var s = !n;
          n || (n = {});
          for (var o = -1, a = e.length; ++o < a; ) {
            var c = e[o], d = r ? r(n[c], t[c], c, n, t) : i;
            d === i && (d = t[c]), s ? re(n, c, d) : hn(n, c, d);
          }
          return n;
        }
        function ec(t, e) {
          return Vt(t, mi(t), e);
        }
        function nc(t, e) {
          return Vt(t, bs(t), e);
        }
        function er(t, e) {
          return function(n, r) {
            var s = C(n) ? fa : Al, o = e ? e() : {};
            return s(n, t, y(r, 2), o);
          };
        }
        function ze(t) {
          return b(function(e, n) {
            var r = -1, s = n.length, o = s > 1 ? n[s - 1] : i, a = s > 2 ? n[2] : i;
            for (o = t.length > 3 && typeof o == "function" ? (s--, o) : i, a && _t(n[0], n[1], a) && (o = s < 3 ? i : o, s = 1), e = $(e); ++r < s; ) {
              var c = n[r];
              c && t(e, c, r, o);
            }
            return e;
          });
        }
        function Es(t, e) {
          return function(n, r) {
            if (n == null)
              return n;
            if (!St(n))
              return t(n, r);
            for (var s = n.length, o = e ? s : -1, a = $(n); (e ? o-- : ++o < s) && r(a[o], o, a) !== !1; )
              ;
            return n;
          };
        }
        function ms(t) {
          return function(e, n, r) {
            for (var s = -1, o = $(e), a = r(e), c = a.length; c--; ) {
              var d = a[t ? c : ++s];
              if (n(o[d], d, o) === !1)
                break;
            }
            return e;
          };
        }
        function rc(t, e, n) {
          var r = e & lt, s = vn(t);
          function o() {
            var a = this && this !== st && this instanceof o ? s : t;
            return a.apply(r ? n : this, arguments);
          }
          return o;
        }
        function As(t) {
          return function(e) {
            e = H(e);
            var n = Me(e) ? zt(e) : i, r = n ? n[0] : e.charAt(0), s = n ? Re(n, 1).join("") : e.slice(1);
            return r[t]() + s;
          };
        }
        function $e(t) {
          return function(e) {
            return Hr(mf(Ef(e).replace(Xo, "")), t, "");
          };
        }
        function vn(t) {
          return function() {
            var e = arguments;
            switch (e.length) {
              case 0:
                return new t();
              case 1:
                return new t(e[0]);
              case 2:
                return new t(e[0], e[1]);
              case 3:
                return new t(e[0], e[1], e[2]);
              case 4:
                return new t(e[0], e[1], e[2], e[3]);
              case 5:
                return new t(e[0], e[1], e[2], e[3], e[4]);
              case 6:
                return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
              case 7:
                return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
            }
            var n = Ye(t.prototype), r = t.apply(n, e);
            return V(r) ? r : n;
          };
        }
        function ic(t, e, n) {
          var r = vn(t);
          function s() {
            for (var o = arguments.length, a = _(o), c = o, d = Ke(s); c--; )
              a[c] = arguments[c];
            var I = o < 3 && a[0] !== d && a[o - 1] !== d ? [] : pe(a, d);
            if (o -= I.length, o < n)
              return Ls(
                t,
                e,
                nr,
                s.placeholder,
                i,
                a,
                I,
                i,
                i,
                n - o
              );
            var T = this && this !== st && this instanceof s ? r : t;
            return Ot(T, this, a);
          }
          return s;
        }
        function ws(t) {
          return function(e, n, r) {
            var s = $(e);
            if (!St(e)) {
              var o = y(n, 3);
              e = ut(e), n = function(c) {
                return o(s[c], c, s);
              };
            }
            var a = t(e, n, r);
            return a > -1 ? s[o ? e[a] : a] : i;
          };
        }
        function ys(t) {
          return ue(function(e) {
            var n = e.length, r = n, s = Mt.prototype.thru;
            for (t && e.reverse(); r--; ) {
              var o = e[r];
              if (typeof o != "function")
                throw new Ut(m);
              if (s && !a && sr(o) == "wrapper")
                var a = new Mt([], !0);
            }
            for (r = a ? r : n; ++r < n; ) {
              o = e[r];
              var c = sr(o), d = c == "wrapper" ? Ri(o) : i;
              d && wi(d[0]) && d[1] == (z | vt | It | jt) && !d[4].length && d[9] == 1 ? a = a[sr(d[0])].apply(a, d[3]) : a = o.length == 1 && wi(o) ? a[c]() : a.thru(o);
            }
            return function() {
              var I = arguments, T = I[0];
              if (a && I.length == 1 && C(T))
                return a.plant(T).value();
              for (var R = 0, E = n ? e[R].apply(this, I) : T; ++R < n; )
                E = e[R].call(this, E);
              return E;
            };
          });
        }
        function nr(t, e, n, r, s, o, a, c, d, I) {
          var T = e & z, R = e & lt, E = e & yt, w = e & (vt | kt), x = e & Qe, D = E ? i : vn(t);
          function O() {
            for (var F = arguments.length, G = _(F), Nt = F; Nt--; )
              G[Nt] = arguments[Nt];
            if (w)
              var pt = Ke(O), Dt = pa(G, pt);
            if (r && (G = Ss(G, r, s, w)), o && (G = Rs(G, o, a, w)), F -= Dt, w && F < I) {
              var nt = pe(G, pt);
              return Ls(
                t,
                e,
                nr,
                O.placeholder,
                n,
                G,
                nt,
                c,
                d,
                I - F
              );
            }
            var Xt = R ? n : this, ae = E ? Xt[t] : t;
            return F = G.length, c ? G = Ac(G, c) : x && F > 1 && G.reverse(), T && d < F && (G.length = d), this && this !== st && this instanceof O && (ae = D || vn(ae)), ae.apply(Xt, G);
          }
          return O;
        }
        function xs(t, e) {
          return function(n, r) {
            return Nl(n, t, e(r), {});
          };
        }
        function rr(t, e) {
          return function(n, r) {
            var s;
            if (n === i && r === i)
              return e;
            if (n !== i && (s = n), r !== i) {
              if (s === i)
                return r;
              typeof n == "string" || typeof r == "string" ? (n = Pt(n), r = Pt(r)) : (n = hs(n), r = hs(r)), s = t(n, r);
            }
            return s;
          };
        }
        function vi(t) {
          return ue(function(e) {
            return e = J(e, Lt(y())), b(function(n) {
              var r = this;
              return t(e, function(s) {
                return Ot(s, r, n);
              });
            });
          });
        }
        function ir(t, e) {
          e = e === i ? " " : Pt(e);
          var n = e.length;
          if (n < 2)
            return n ? li(e, t) : e;
          var r = li(e, zn(t / Be(e)));
          return Me(e) ? Re(zt(r), 0, t).join("") : r.slice(0, t);
        }
        function uc(t, e, n, r) {
          var s = e & lt, o = vn(t);
          function a() {
            for (var c = -1, d = arguments.length, I = -1, T = r.length, R = _(T + d), E = this && this !== st && this instanceof a ? o : t; ++I < T; )
              R[I] = r[I];
            for (; d--; )
              R[I++] = arguments[++c];
            return Ot(E, s ? n : this, R);
          }
          return a;
        }
        function Os(t) {
          return function(e, n, r) {
            return r && typeof r != "number" && _t(e, n, r) && (n = r = i), e = oe(e), n === i ? (n = e, e = 0) : n = oe(n), r = r === i ? e < n ? 1 : -1 : oe(r), zl(e, n, r, t);
          };
        }
        function ur(t) {
          return function(e, n) {
            return typeof e == "string" && typeof n == "string" || (e = Ht(e), n = Ht(n)), t(e, n);
          };
        }
        function Ls(t, e, n, r, s, o, a, c, d, I) {
          var T = e & vt, R = T ? a : i, E = T ? i : a, w = T ? o : i, x = T ? i : o;
          e |= T ? It : xt, e &= ~(T ? xt : It), e & he || (e &= -4);
          var D = [
            t,
            e,
            s,
            w,
            R,
            x,
            E,
            c,
            d,
            I
          ], O = n.apply(i, D);
          return wi(t) && Hs(O, D), O.placeholder = r, qs(O, t, e);
        }
        function Ii(t) {
          var e = rt[t];
          return function(n, r) {
            if (n = Ht(n), r = r == null ? 0 : ct(N(r), 292), r && qu(n)) {
              var s = (H(n) + "e").split("e"), o = e(s[0] + "e" + (+s[1] + r));
              return s = (H(o) + "e").split("e"), +(s[0] + "e" + (+s[1] - r));
            }
            return e(n);
          };
        }
        var sc = He && 1 / bn(new He([, -0]))[1] == me ? function(t) {
          return new He(t);
        } : Wi;
        function Ps(t) {
          return function(e) {
            var n = ht(e);
            return n == qt ? Zr(e) : n == Yt ? ma(e) : _a(e, t(e));
          };
        }
        function ie(t, e, n, r, s, o, a, c) {
          var d = e & yt;
          if (!d && typeof t != "function")
            throw new Ut(m);
          var I = r ? r.length : 0;
          if (I || (e &= -97, r = s = i), a = a === i ? a : it(N(a), 0), c = c === i ? c : N(c), I -= s ? s.length : 0, e & xt) {
            var T = r, R = s;
            r = s = i;
          }
          var E = d ? i : Ri(t), w = [
            t,
            e,
            n,
            r,
            s,
            T,
            R,
            o,
            a,
            c
          ];
          if (E && Rc(w, E), t = w[0], e = w[1], n = w[2], r = w[3], s = w[4], c = w[9] = w[9] === i ? d ? 0 : t.length : it(w[9] - I, 0), !c && e & (vt | kt) && (e &= -25), !e || e == lt)
            var x = rc(t, e, n);
          else e == vt || e == kt ? x = ic(t, e, c) : (e == It || e == (lt | It)) && !s.length ? x = uc(t, e, n, r) : x = nr.apply(i, w);
          var D = E ? ls : Hs;
          return qs(D(x, w), t, e);
        }
        function Cs(t, e, n, r) {
          return t === i || Kt(t, We[n]) && !q.call(r, n) ? e : t;
        }
        function Ns(t, e, n, r, s, o) {
          return V(t) && V(e) && (o.set(e, t), kn(t, e, i, Ns, o), o.delete(e)), t;
        }
        function fc(t) {
          return Sn(t) ? i : t;
        }
        function Ds(t, e, n, r, s, o) {
          var a = n & wt, c = t.length, d = e.length;
          if (c != d && !(a && d > c))
            return !1;
          var I = o.get(t), T = o.get(e);
          if (I && T)
            return I == e && T == t;
          var R = -1, E = !0, w = n & ce ? new xe() : i;
          for (o.set(t, e), o.set(e, t); ++R < c; ) {
            var x = t[R], D = e[R];
            if (r)
              var O = a ? r(D, x, R, e, t, o) : r(x, D, R, t, e, o);
            if (O !== i) {
              if (O)
                continue;
              E = !1;
              break;
            }
            if (w) {
              if (!qr(e, function(F, G) {
                if (!sn(w, G) && (x === F || s(x, F, n, r, o)))
                  return w.push(G);
              })) {
                E = !1;
                break;
              }
            } else if (!(x === D || s(x, D, n, r, o))) {
              E = !1;
              break;
            }
          }
          return o.delete(t), o.delete(e), E;
        }
        function oc(t, e, n, r, s, o, a) {
          switch (n) {
            case be:
              if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
                return !1;
              t = t.buffer, e = e.buffer;
            case un:
              return !(t.byteLength != e.byteLength || !o(new Wn(t), new Wn(e)));
            case ke:
            case je:
            case tn:
              return Kt(+t, +e);
            case yn:
              return t.name == e.name && t.message == e.message;
            case en:
            case nn:
              return t == e + "";
            case qt:
              var c = Zr;
            case Yt:
              var d = r & wt;
              if (c || (c = bn), t.size != e.size && !d)
                return !1;
              var I = a.get(t);
              if (I)
                return I == e;
              r |= ce, a.set(t, e);
              var T = Ds(c(t), c(e), r, s, o, a);
              return a.delete(t), T;
            case On:
              if (cn)
                return cn.call(t) == cn.call(e);
          }
          return !1;
        }
        function ac(t, e, n, r, s, o) {
          var a = n & wt, c = Ti(t), d = c.length, I = Ti(e), T = I.length;
          if (d != T && !a)
            return !1;
          for (var R = d; R--; ) {
            var E = c[R];
            if (!(a ? E in e : q.call(e, E)))
              return !1;
          }
          var w = o.get(t), x = o.get(e);
          if (w && x)
            return w == e && x == t;
          var D = !0;
          o.set(t, e), o.set(e, t);
          for (var O = a; ++R < d; ) {
            E = c[R];
            var F = t[E], G = e[E];
            if (r)
              var Nt = a ? r(G, F, E, e, t, o) : r(F, G, E, t, e, o);
            if (!(Nt === i ? F === G || s(F, G, n, r, o) : Nt)) {
              D = !1;
              break;
            }
            O || (O = E == "constructor");
          }
          if (D && !O) {
            var pt = t.constructor, Dt = e.constructor;
            pt != Dt && "constructor" in t && "constructor" in e && !(typeof pt == "function" && pt instanceof pt && typeof Dt == "function" && Dt instanceof Dt) && (D = !1);
          }
          return o.delete(t), o.delete(e), D;
        }
        function ue(t) {
          return xi(Gs(t, i, Zs), t + "");
        }
        function Ti(t) {
          return ju(t, ut, mi);
        }
        function Si(t) {
          return ju(t, Rt, bs);
        }
        var Ri = Kn ? function(t) {
          return Kn.get(t);
        } : Wi;
        function sr(t) {
          for (var e = t.name + "", n = qe[e], r = q.call(qe, e) ? n.length : 0; r--; ) {
            var s = n[r], o = s.func;
            if (o == null || o == t)
              return s.name;
          }
          return e;
        }
        function Ke(t) {
          var e = q.call(f, "placeholder") ? f : t;
          return e.placeholder;
        }
        function y() {
          var t = f.iteratee || Bi;
          return t = t === Bi ? ns : t, arguments.length ? t(arguments[0], arguments[1]) : t;
        }
        function fr(t, e) {
          var n = t.__data__;
          return vc(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
        }
        function Ei(t) {
          for (var e = ut(t), n = e.length; n--; ) {
            var r = e[n], s = t[r];
            e[n] = [r, s, Ms(s)];
          }
          return e;
        }
        function Pe(t, e) {
          var n = Sa(t, e);
          return es(n) ? n : i;
        }
        function lc(t) {
          var e = q.call(t, we), n = t[we];
          try {
            t[we] = i;
            var r = !0;
          } catch {
          }
          var s = Bn.call(t);
          return r && (e ? t[we] = n : delete t[we]), s;
        }
        var mi = Vr ? function(t) {
          return t == null ? [] : (t = $(t), de(Vr(t), function(e) {
            return Wu.call(t, e);
          }));
        } : Hi, bs = Vr ? function(t) {
          for (var e = []; t; )
            _e(e, mi(t)), t = Hn(t);
          return e;
        } : Hi, ht = dt;
        (Qr && ht(new Qr(new ArrayBuffer(1))) != be || on && ht(new on()) != qt || kr && ht(kr.resolve()) != Vi || He && ht(new He()) != Yt || an && ht(new an()) != rn) && (ht = function(t) {
          var e = dt(t), n = e == te ? t.constructor : i, r = n ? Ce(n) : "";
          if (r)
            switch (r) {
              case Ka:
                return be;
              case Xa:
                return qt;
              case Za:
                return Vi;
              case Ja:
                return Yt;
              case Va:
                return rn;
            }
          return e;
        });
        function cc(t, e, n) {
          for (var r = -1, s = n.length; ++r < s; ) {
            var o = n[r], a = o.size;
            switch (o.type) {
              case "drop":
                t += a;
                break;
              case "dropRight":
                e -= a;
                break;
              case "take":
                e = ct(e, t + a);
                break;
              case "takeRight":
                t = it(t, e - a);
                break;
            }
          }
          return { start: t, end: e };
        }
        function hc(t) {
          var e = t.match(Io);
          return e ? e[1].split(To) : [];
        }
        function Fs(t, e, n) {
          e = Se(e, t);
          for (var r = -1, s = e.length, o = !1; ++r < s; ) {
            var a = Qt(e[r]);
            if (!(o = t != null && n(t, a)))
              break;
            t = t[a];
          }
          return o || ++r != s ? o : (s = t == null ? 0 : t.length, !!s && dr(s) && se(a, s) && (C(t) || Ne(t)));
        }
        function gc(t) {
          var e = t.length, n = new t.constructor(e);
          return e && typeof t[0] == "string" && q.call(t, "index") && (n.index = t.index, n.input = t.input), n;
        }
        function Us(t) {
          return typeof t.constructor == "function" && !In(t) ? Ye(Hn(t)) : {};
        }
        function dc(t, e, n) {
          var r = t.constructor;
          switch (e) {
            case un:
              return pi(t);
            case ke:
            case je:
              return new r(+t);
            case be:
              return Ql(t, n);
            case Er:
            case mr:
            case Ar:
            case wr:
            case yr:
            case xr:
            case Or:
            case Lr:
            case Pr:
              return Is(t, n);
            case qt:
              return new r();
            case tn:
            case nn:
              return new r(t);
            case en:
              return kl(t);
            case Yt:
              return new r();
            case On:
              return jl(t);
          }
        }
        function _c(t, e) {
          var n = e.length;
          if (!n)
            return t;
          var r = n - 1;
          return e[r] = (n > 1 ? "& " : "") + e[r], e = e.join(n > 2 ? ", " : " "), t.replace(vo, `{
/* [wrapped with ` + e + `] */
`);
        }
        function pc(t) {
          return C(t) || Ne(t) || !!(Hu && t && t[Hu]);
        }
        function se(t, e) {
          var n = typeof t;
          return e = e ?? ge, !!e && (n == "number" || n != "symbol" && Oo.test(t)) && t > -1 && t % 1 == 0 && t < e;
        }
        function _t(t, e, n) {
          if (!V(n))
            return !1;
          var r = typeof e;
          return (r == "number" ? St(n) && se(e, n.length) : r == "string" && e in n) ? Kt(n[e], t) : !1;
        }
        function Ai(t, e) {
          if (C(t))
            return !1;
          var n = typeof t;
          return n == "number" || n == "symbol" || n == "boolean" || t == null || Ct(t) ? !0 : ho.test(t) || !co.test(t) || e != null && t in $(e);
        }
        function vc(t) {
          var e = typeof t;
          return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
        }
        function wi(t) {
          var e = sr(t), n = f[e];
          if (typeof n != "function" || !(e in M.prototype))
            return !1;
          if (t === n)
            return !0;
          var r = Ri(n);
          return !!r && t === r[0];
        }
        function Ic(t) {
          return !!Mu && Mu in t;
        }
        var Tc = Un ? fe : qi;
        function In(t) {
          var e = t && t.constructor, n = typeof e == "function" && e.prototype || We;
          return t === n;
        }
        function Ms(t) {
          return t === t && !V(t);
        }
        function Bs(t, e) {
          return function(n) {
            return n == null ? !1 : n[t] === e && (e !== i || t in $(n));
          };
        }
        function Sc(t) {
          var e = hr(t, function(r) {
            return n.size === U && n.clear(), r;
          }), n = e.cache;
          return e;
        }
        function Rc(t, e) {
          var n = t[1], r = e[1], s = n | r, o = s < (lt | yt | z), a = r == z && n == vt || r == z && n == jt && t[7].length <= e[8] || r == (z | jt) && e[7].length <= e[8] && n == vt;
          if (!(o || a))
            return t;
          r & lt && (t[2] = e[2], s |= n & lt ? 0 : he);
          var c = e[3];
          if (c) {
            var d = t[3];
            t[3] = d ? Ss(d, c, e[4]) : c, t[4] = d ? pe(t[3], K) : e[4];
          }
          return c = e[5], c && (d = t[5], t[5] = d ? Rs(d, c, e[6]) : c, t[6] = d ? pe(t[5], K) : e[6]), c = e[7], c && (t[7] = c), r & z && (t[8] = t[8] == null ? e[8] : ct(t[8], e[8])), t[9] == null && (t[9] = e[9]), t[0] = e[0], t[1] = s, t;
        }
        function Ec(t) {
          var e = [];
          if (t != null)
            for (var n in $(t))
              e.push(n);
          return e;
        }
        function mc(t) {
          return Bn.call(t);
        }
        function Gs(t, e, n) {
          return e = it(e === i ? t.length - 1 : e, 0), function() {
            for (var r = arguments, s = -1, o = it(r.length - e, 0), a = _(o); ++s < o; )
              a[s] = r[e + s];
            s = -1;
            for (var c = _(e + 1); ++s < e; )
              c[s] = r[s];
            return c[e] = n(a), Ot(t, this, c);
          };
        }
        function Ws(t, e) {
          return e.length < 2 ? t : Le(t, Gt(e, 0, -1));
        }
        function Ac(t, e) {
          for (var n = t.length, r = ct(e.length, n), s = Tt(t); r--; ) {
            var o = e[r];
            t[r] = se(o, n) ? s[o] : i;
          }
          return t;
        }
        function yi(t, e) {
          if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
            return t[e];
        }
        var Hs = Ys(ls), Tn = Ga || function(t, e) {
          return st.setTimeout(t, e);
        }, xi = Ys(Xl);
        function qs(t, e, n) {
          var r = e + "";
          return xi(t, _c(r, wc(hc(r), n)));
        }
        function Ys(t) {
          var e = 0, n = 0;
          return function() {
            var r = Ya(), s = $f - (r - n);
            if (n = r, s > 0) {
              if (++e >= zf)
                return arguments[0];
            } else
              e = 0;
            return t.apply(i, arguments);
          };
        }
        function or(t, e) {
          var n = -1, r = t.length, s = r - 1;
          for (e = e === i ? r : e; ++n < e; ) {
            var o = ai(n, s), a = t[o];
            t[o] = t[n], t[n] = a;
          }
          return t.length = e, t;
        }
        var zs = Sc(function(t) {
          var e = [];
          return t.charCodeAt(0) === 46 && e.push(""), t.replace(go, function(n, r, s, o) {
            e.push(s ? o.replace(Eo, "$1") : r || n);
          }), e;
        });
        function Qt(t) {
          if (typeof t == "string" || Ct(t))
            return t;
          var e = t + "";
          return e == "0" && 1 / t == -me ? "-0" : e;
        }
        function Ce(t) {
          if (t != null) {
            try {
              return Mn.call(t);
            } catch {
            }
            try {
              return t + "";
            } catch {
            }
          }
          return "";
        }
        function wc(t, e) {
          return Ft(Qf, function(n) {
            var r = "_." + n[0];
            e & n[1] && !Nn(t, r) && t.push(r);
          }), t.sort();
        }
        function $s(t) {
          if (t instanceof M)
            return t.clone();
          var e = new Mt(t.__wrapped__, t.__chain__);
          return e.__actions__ = Tt(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e;
        }
        function yc(t, e, n) {
          (n ? _t(t, e, n) : e === i) ? e = 1 : e = it(N(e), 0);
          var r = t == null ? 0 : t.length;
          if (!r || e < 1)
            return [];
          for (var s = 0, o = 0, a = _(zn(r / e)); s < r; )
            a[o++] = Gt(t, s, s += e);
          return a;
        }
        function xc(t) {
          for (var e = -1, n = t == null ? 0 : t.length, r = 0, s = []; ++e < n; ) {
            var o = t[e];
            o && (s[r++] = o);
          }
          return s;
        }
        function Oc() {
          var t = arguments.length;
          if (!t)
            return [];
          for (var e = _(t - 1), n = arguments[0], r = t; r--; )
            e[r - 1] = arguments[r];
          return _e(C(n) ? Tt(n) : [n], ft(e, 1));
        }
        var Lc = b(function(t, e) {
          return et(t) ? gn(t, ft(e, 1, et, !0)) : [];
        }), Pc = b(function(t, e) {
          var n = Wt(e);
          return et(n) && (n = i), et(t) ? gn(t, ft(e, 1, et, !0), y(n, 2)) : [];
        }), Cc = b(function(t, e) {
          var n = Wt(e);
          return et(n) && (n = i), et(t) ? gn(t, ft(e, 1, et, !0), i, n) : [];
        });
        function Nc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : N(e), Gt(t, e < 0 ? 0 : e, r)) : [];
        }
        function Dc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : N(e), e = r - e, Gt(t, 0, e < 0 ? 0 : e)) : [];
        }
        function bc(t, e) {
          return t && t.length ? tr(t, y(e, 3), !0, !0) : [];
        }
        function Fc(t, e) {
          return t && t.length ? tr(t, y(e, 3), !0) : [];
        }
        function Uc(t, e, n, r) {
          var s = t == null ? 0 : t.length;
          return s ? (n && typeof n != "number" && _t(t, e, n) && (n = 0, r = s), Ol(t, e, n, r)) : [];
        }
        function Ks(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = n == null ? 0 : N(n);
          return s < 0 && (s = it(r + s, 0)), Dn(t, y(e, 3), s);
        }
        function Xs(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = r - 1;
          return n !== i && (s = N(n), s = n < 0 ? it(r + s, 0) : ct(s, r - 1)), Dn(t, y(e, 3), s, !0);
        }
        function Zs(t) {
          var e = t == null ? 0 : t.length;
          return e ? ft(t, 1) : [];
        }
        function Mc(t) {
          var e = t == null ? 0 : t.length;
          return e ? ft(t, me) : [];
        }
        function Bc(t, e) {
          var n = t == null ? 0 : t.length;
          return n ? (e = e === i ? 1 : N(e), ft(t, e)) : [];
        }
        function Gc(t) {
          for (var e = -1, n = t == null ? 0 : t.length, r = {}; ++e < n; ) {
            var s = t[e];
            r[s[0]] = s[1];
          }
          return r;
        }
        function Js(t) {
          return t && t.length ? t[0] : i;
        }
        function Wc(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = n == null ? 0 : N(n);
          return s < 0 && (s = it(r + s, 0)), Ue(t, e, s);
        }
        function Hc(t) {
          var e = t == null ? 0 : t.length;
          return e ? Gt(t, 0, -1) : [];
        }
        var qc = b(function(t) {
          var e = J(t, di);
          return e.length && e[0] === t[0] ? ii(e) : [];
        }), Yc = b(function(t) {
          var e = Wt(t), n = J(t, di);
          return e === Wt(n) ? e = i : n.pop(), n.length && n[0] === t[0] ? ii(n, y(e, 2)) : [];
        }), zc = b(function(t) {
          var e = Wt(t), n = J(t, di);
          return e = typeof e == "function" ? e : i, e && n.pop(), n.length && n[0] === t[0] ? ii(n, i, e) : [];
        });
        function $c(t, e) {
          return t == null ? "" : Ha.call(t, e);
        }
        function Wt(t) {
          var e = t == null ? 0 : t.length;
          return e ? t[e - 1] : i;
        }
        function Kc(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = r;
          return n !== i && (s = N(n), s = s < 0 ? it(r + s, 0) : ct(s, r - 1)), e === e ? wa(t, e, s) : Dn(t, Lu, s, !0);
        }
        function Xc(t, e) {
          return t && t.length ? ss(t, N(e)) : i;
        }
        var Zc = b(Vs);
        function Vs(t, e) {
          return t && t.length && e && e.length ? oi(t, e) : t;
        }
        function Jc(t, e, n) {
          return t && t.length && e && e.length ? oi(t, e, y(n, 2)) : t;
        }
        function Vc(t, e, n) {
          return t && t.length && e && e.length ? oi(t, e, i, n) : t;
        }
        var Qc = ue(function(t, e) {
          var n = t == null ? 0 : t.length, r = ti(t, e);
          return as(t, J(e, function(s) {
            return se(s, n) ? +s : s;
          }).sort(Ts)), r;
        });
        function kc(t, e) {
          var n = [];
          if (!(t && t.length))
            return n;
          var r = -1, s = [], o = t.length;
          for (e = y(e, 3); ++r < o; ) {
            var a = t[r];
            e(a, r, t) && (n.push(a), s.push(r));
          }
          return as(t, s), n;
        }
        function Oi(t) {
          return t == null ? t : $a.call(t);
        }
        function jc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (n && typeof n != "number" && _t(t, e, n) ? (e = 0, n = r) : (e = e == null ? 0 : N(e), n = n === i ? r : N(n)), Gt(t, e, n)) : [];
        }
        function th(t, e) {
          return jn(t, e);
        }
        function eh(t, e, n) {
          return ci(t, e, y(n, 2));
        }
        function nh(t, e) {
          var n = t == null ? 0 : t.length;
          if (n) {
            var r = jn(t, e);
            if (r < n && Kt(t[r], e))
              return r;
          }
          return -1;
        }
        function rh(t, e) {
          return jn(t, e, !0);
        }
        function ih(t, e, n) {
          return ci(t, e, y(n, 2), !0);
        }
        function uh(t, e) {
          var n = t == null ? 0 : t.length;
          if (n) {
            var r = jn(t, e, !0) - 1;
            if (Kt(t[r], e))
              return r;
          }
          return -1;
        }
        function sh(t) {
          return t && t.length ? cs(t) : [];
        }
        function fh(t, e) {
          return t && t.length ? cs(t, y(e, 2)) : [];
        }
        function oh(t) {
          var e = t == null ? 0 : t.length;
          return e ? Gt(t, 1, e) : [];
        }
        function ah(t, e, n) {
          return t && t.length ? (e = n || e === i ? 1 : N(e), Gt(t, 0, e < 0 ? 0 : e)) : [];
        }
        function lh(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : N(e), e = r - e, Gt(t, e < 0 ? 0 : e, r)) : [];
        }
        function ch(t, e) {
          return t && t.length ? tr(t, y(e, 3), !1, !0) : [];
        }
        function hh(t, e) {
          return t && t.length ? tr(t, y(e, 3)) : [];
        }
        var gh = b(function(t) {
          return Te(ft(t, 1, et, !0));
        }), dh = b(function(t) {
          var e = Wt(t);
          return et(e) && (e = i), Te(ft(t, 1, et, !0), y(e, 2));
        }), _h = b(function(t) {
          var e = Wt(t);
          return e = typeof e == "function" ? e : i, Te(ft(t, 1, et, !0), i, e);
        });
        function ph(t) {
          return t && t.length ? Te(t) : [];
        }
        function vh(t, e) {
          return t && t.length ? Te(t, y(e, 2)) : [];
        }
        function Ih(t, e) {
          return e = typeof e == "function" ? e : i, t && t.length ? Te(t, i, e) : [];
        }
        function Li(t) {
          if (!(t && t.length))
            return [];
          var e = 0;
          return t = de(t, function(n) {
            if (et(n))
              return e = it(n.length, e), !0;
          }), Kr(e, function(n) {
            return J(t, Yr(n));
          });
        }
        function Qs(t, e) {
          if (!(t && t.length))
            return [];
          var n = Li(t);
          return e == null ? n : J(n, function(r) {
            return Ot(e, i, r);
          });
        }
        var Th = b(function(t, e) {
          return et(t) ? gn(t, e) : [];
        }), Sh = b(function(t) {
          return gi(de(t, et));
        }), Rh = b(function(t) {
          var e = Wt(t);
          return et(e) && (e = i), gi(de(t, et), y(e, 2));
        }), Eh = b(function(t) {
          var e = Wt(t);
          return e = typeof e == "function" ? e : i, gi(de(t, et), i, e);
        }), mh = b(Li);
        function Ah(t, e) {
          return _s(t || [], e || [], hn);
        }
        function wh(t, e) {
          return _s(t || [], e || [], pn);
        }
        var yh = b(function(t) {
          var e = t.length, n = e > 1 ? t[e - 1] : i;
          return n = typeof n == "function" ? (t.pop(), n) : i, Qs(t, n);
        });
        function ks(t) {
          var e = f(t);
          return e.__chain__ = !0, e;
        }
        function xh(t, e) {
          return e(t), t;
        }
        function ar(t, e) {
          return e(t);
        }
        var Oh = ue(function(t) {
          var e = t.length, n = e ? t[0] : 0, r = this.__wrapped__, s = function(o) {
            return ti(o, t);
          };
          return e > 1 || this.__actions__.length || !(r instanceof M) || !se(n) ? this.thru(s) : (r = r.slice(n, +n + (e ? 1 : 0)), r.__actions__.push({
            func: ar,
            args: [s],
            thisArg: i
          }), new Mt(r, this.__chain__).thru(function(o) {
            return e && !o.length && o.push(i), o;
          }));
        });
        function Lh() {
          return ks(this);
        }
        function Ph() {
          return new Mt(this.value(), this.__chain__);
        }
        function Ch() {
          this.__values__ === i && (this.__values__ = gf(this.value()));
          var t = this.__index__ >= this.__values__.length, e = t ? i : this.__values__[this.__index__++];
          return { done: t, value: e };
        }
        function Nh() {
          return this;
        }
        function Dh(t) {
          for (var e, n = this; n instanceof Zn; ) {
            var r = $s(n);
            r.__index__ = 0, r.__values__ = i, e ? s.__wrapped__ = r : e = r;
            var s = r;
            n = n.__wrapped__;
          }
          return s.__wrapped__ = t, e;
        }
        function bh() {
          var t = this.__wrapped__;
          if (t instanceof M) {
            var e = t;
            return this.__actions__.length && (e = new M(this)), e = e.reverse(), e.__actions__.push({
              func: ar,
              args: [Oi],
              thisArg: i
            }), new Mt(e, this.__chain__);
          }
          return this.thru(Oi);
        }
        function Fh() {
          return ds(this.__wrapped__, this.__actions__);
        }
        var Uh = er(function(t, e, n) {
          q.call(t, n) ? ++t[n] : re(t, n, 1);
        });
        function Mh(t, e, n) {
          var r = C(t) ? xu : xl;
          return n && _t(t, e, n) && (e = i), r(t, y(e, 3));
        }
        function Bh(t, e) {
          var n = C(t) ? de : Qu;
          return n(t, y(e, 3));
        }
        var Gh = ws(Ks), Wh = ws(Xs);
        function Hh(t, e) {
          return ft(lr(t, e), 1);
        }
        function qh(t, e) {
          return ft(lr(t, e), me);
        }
        function Yh(t, e, n) {
          return n = n === i ? 1 : N(n), ft(lr(t, e), n);
        }
        function js(t, e) {
          var n = C(t) ? Ft : Ie;
          return n(t, y(e, 3));
        }
        function tf(t, e) {
          var n = C(t) ? oa : Vu;
          return n(t, y(e, 3));
        }
        var zh = er(function(t, e, n) {
          q.call(t, n) ? t[n].push(e) : re(t, n, [e]);
        });
        function $h(t, e, n, r) {
          t = St(t) ? t : Ze(t), n = n && !r ? N(n) : 0;
          var s = t.length;
          return n < 0 && (n = it(s + n, 0)), _r(t) ? n <= s && t.indexOf(e, n) > -1 : !!s && Ue(t, e, n) > -1;
        }
        var Kh = b(function(t, e, n) {
          var r = -1, s = typeof e == "function", o = St(t) ? _(t.length) : [];
          return Ie(t, function(a) {
            o[++r] = s ? Ot(e, a, n) : dn(a, e, n);
          }), o;
        }), Xh = er(function(t, e, n) {
          re(t, n, e);
        });
        function lr(t, e) {
          var n = C(t) ? J : rs;
          return n(t, y(e, 3));
        }
        function Zh(t, e, n, r) {
          return t == null ? [] : (C(e) || (e = e == null ? [] : [e]), n = r ? i : n, C(n) || (n = n == null ? [] : [n]), fs(t, e, n));
        }
        var Jh = er(function(t, e, n) {
          t[n ? 0 : 1].push(e);
        }, function() {
          return [[], []];
        });
        function Vh(t, e, n) {
          var r = C(t) ? Hr : Cu, s = arguments.length < 3;
          return r(t, y(e, 4), n, s, Ie);
        }
        function Qh(t, e, n) {
          var r = C(t) ? aa : Cu, s = arguments.length < 3;
          return r(t, y(e, 4), n, s, Vu);
        }
        function kh(t, e) {
          var n = C(t) ? de : Qu;
          return n(t, gr(y(e, 3)));
        }
        function jh(t) {
          var e = C(t) ? Ku : $l;
          return e(t);
        }
        function tg(t, e, n) {
          (n ? _t(t, e, n) : e === i) ? e = 1 : e = N(e);
          var r = C(t) ? El : Kl;
          return r(t, e);
        }
        function eg(t) {
          var e = C(t) ? ml : Zl;
          return e(t);
        }
        function ng(t) {
          if (t == null)
            return 0;
          if (St(t))
            return _r(t) ? Be(t) : t.length;
          var e = ht(t);
          return e == qt || e == Yt ? t.size : si(t).length;
        }
        function rg(t, e, n) {
          var r = C(t) ? qr : Jl;
          return n && _t(t, e, n) && (e = i), r(t, y(e, 3));
        }
        var ig = b(function(t, e) {
          if (t == null)
            return [];
          var n = e.length;
          return n > 1 && _t(t, e[0], e[1]) ? e = [] : n > 2 && _t(e[0], e[1], e[2]) && (e = [e[0]]), fs(t, ft(e, 1), []);
        }), cr = Ba || function() {
          return st.Date.now();
        };
        function ug(t, e) {
          if (typeof e != "function")
            throw new Ut(m);
          return t = N(t), function() {
            if (--t < 1)
              return e.apply(this, arguments);
          };
        }
        function ef(t, e, n) {
          return e = n ? i : e, e = t && e == null ? t.length : e, ie(t, z, i, i, i, i, e);
        }
        function nf(t, e) {
          var n;
          if (typeof e != "function")
            throw new Ut(m);
          return t = N(t), function() {
            return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = i), n;
          };
        }
        var Pi = b(function(t, e, n) {
          var r = lt;
          if (n.length) {
            var s = pe(n, Ke(Pi));
            r |= It;
          }
          return ie(t, r, e, n, s);
        }), rf = b(function(t, e, n) {
          var r = lt | yt;
          if (n.length) {
            var s = pe(n, Ke(rf));
            r |= It;
          }
          return ie(e, r, t, n, s);
        });
        function uf(t, e, n) {
          e = n ? i : e;
          var r = ie(t, vt, i, i, i, i, i, e);
          return r.placeholder = uf.placeholder, r;
        }
        function sf(t, e, n) {
          e = n ? i : e;
          var r = ie(t, kt, i, i, i, i, i, e);
          return r.placeholder = sf.placeholder, r;
        }
        function ff(t, e, n) {
          var r, s, o, a, c, d, I = 0, T = !1, R = !1, E = !0;
          if (typeof t != "function")
            throw new Ut(m);
          e = Ht(e) || 0, V(n) && (T = !!n.leading, R = "maxWait" in n, o = R ? it(Ht(n.maxWait) || 0, e) : o, E = "trailing" in n ? !!n.trailing : E);
          function w(nt) {
            var Xt = r, ae = s;
            return r = s = i, I = nt, a = t.apply(ae, Xt), a;
          }
          function x(nt) {
            return I = nt, c = Tn(F, e), T ? w(nt) : a;
          }
          function D(nt) {
            var Xt = nt - d, ae = nt - I, yf = e - Xt;
            return R ? ct(yf, o - ae) : yf;
          }
          function O(nt) {
            var Xt = nt - d, ae = nt - I;
            return d === i || Xt >= e || Xt < 0 || R && ae >= o;
          }
          function F() {
            var nt = cr();
            if (O(nt))
              return G(nt);
            c = Tn(F, D(nt));
          }
          function G(nt) {
            return c = i, E && r ? w(nt) : (r = s = i, a);
          }
          function Nt() {
            c !== i && ps(c), I = 0, r = d = s = c = i;
          }
          function pt() {
            return c === i ? a : G(cr());
          }
          function Dt() {
            var nt = cr(), Xt = O(nt);
            if (r = arguments, s = this, d = nt, Xt) {
              if (c === i)
                return x(d);
              if (R)
                return ps(c), c = Tn(F, e), w(d);
            }
            return c === i && (c = Tn(F, e)), a;
          }
          return Dt.cancel = Nt, Dt.flush = pt, Dt;
        }
        var sg = b(function(t, e) {
          return Ju(t, 1, e);
        }), fg = b(function(t, e, n) {
          return Ju(t, Ht(e) || 0, n);
        });
        function og(t) {
          return ie(t, Qe);
        }
        function hr(t, e) {
          if (typeof t != "function" || e != null && typeof e != "function")
            throw new Ut(m);
          var n = function() {
            var r = arguments, s = e ? e.apply(this, r) : r[0], o = n.cache;
            if (o.has(s))
              return o.get(s);
            var a = t.apply(this, r);
            return n.cache = o.set(s, a) || o, a;
          };
          return n.cache = new (hr.Cache || ne)(), n;
        }
        hr.Cache = ne;
        function gr(t) {
          if (typeof t != "function")
            throw new Ut(m);
          return function() {
            var e = arguments;
            switch (e.length) {
              case 0:
                return !t.call(this);
              case 1:
                return !t.call(this, e[0]);
              case 2:
                return !t.call(this, e[0], e[1]);
              case 3:
                return !t.call(this, e[0], e[1], e[2]);
            }
            return !t.apply(this, e);
          };
        }
        function ag(t) {
          return nf(2, t);
        }
        var lg = Vl(function(t, e) {
          e = e.length == 1 && C(e[0]) ? J(e[0], Lt(y())) : J(ft(e, 1), Lt(y()));
          var n = e.length;
          return b(function(r) {
            for (var s = -1, o = ct(r.length, n); ++s < o; )
              r[s] = e[s].call(this, r[s]);
            return Ot(t, this, r);
          });
        }), Ci = b(function(t, e) {
          var n = pe(e, Ke(Ci));
          return ie(t, It, i, e, n);
        }), of = b(function(t, e) {
          var n = pe(e, Ke(of));
          return ie(t, xt, i, e, n);
        }), cg = ue(function(t, e) {
          return ie(t, jt, i, i, i, e);
        });
        function hg(t, e) {
          if (typeof t != "function")
            throw new Ut(m);
          return e = e === i ? e : N(e), b(t, e);
        }
        function gg(t, e) {
          if (typeof t != "function")
            throw new Ut(m);
          return e = e == null ? 0 : it(N(e), 0), b(function(n) {
            var r = n[e], s = Re(n, 0, e);
            return r && _e(s, r), Ot(t, this, s);
          });
        }
        function dg(t, e, n) {
          var r = !0, s = !0;
          if (typeof t != "function")
            throw new Ut(m);
          return V(n) && (r = "leading" in n ? !!n.leading : r, s = "trailing" in n ? !!n.trailing : s), ff(t, e, {
            leading: r,
            maxWait: e,
            trailing: s
          });
        }
        function _g(t) {
          return ef(t, 1);
        }
        function pg(t, e) {
          return Ci(_i(e), t);
        }
        function vg() {
          if (!arguments.length)
            return [];
          var t = arguments[0];
          return C(t) ? t : [t];
        }
        function Ig(t) {
          return Bt(t, at);
        }
        function Tg(t, e) {
          return e = typeof e == "function" ? e : i, Bt(t, at, e);
        }
        function Sg(t) {
          return Bt(t, Y | at);
        }
        function Rg(t, e) {
          return e = typeof e == "function" ? e : i, Bt(t, Y | at, e);
        }
        function Eg(t, e) {
          return e == null || Zu(t, e, ut(e));
        }
        function Kt(t, e) {
          return t === e || t !== t && e !== e;
        }
        var mg = ur(ri), Ag = ur(function(t, e) {
          return t >= e;
        }), Ne = ts(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? ts : function(t) {
          return tt(t) && q.call(t, "callee") && !Wu.call(t, "callee");
        }, C = _.isArray, wg = Ru ? Lt(Ru) : Dl;
        function St(t) {
          return t != null && dr(t.length) && !fe(t);
        }
        function et(t) {
          return tt(t) && St(t);
        }
        function yg(t) {
          return t === !0 || t === !1 || tt(t) && dt(t) == ke;
        }
        var Ee = Wa || qi, xg = Eu ? Lt(Eu) : bl;
        function Og(t) {
          return tt(t) && t.nodeType === 1 && !Sn(t);
        }
        function Lg(t) {
          if (t == null)
            return !0;
          if (St(t) && (C(t) || typeof t == "string" || typeof t.splice == "function" || Ee(t) || Xe(t) || Ne(t)))
            return !t.length;
          var e = ht(t);
          if (e == qt || e == Yt)
            return !t.size;
          if (In(t))
            return !si(t).length;
          for (var n in t)
            if (q.call(t, n))
              return !1;
          return !0;
        }
        function Pg(t, e) {
          return _n(t, e);
        }
        function Cg(t, e, n) {
          n = typeof n == "function" ? n : i;
          var r = n ? n(t, e) : i;
          return r === i ? _n(t, e, i, n) : !!r;
        }
        function Ni(t) {
          if (!tt(t))
            return !1;
          var e = dt(t);
          return e == yn || e == jf || typeof t.message == "string" && typeof t.name == "string" && !Sn(t);
        }
        function Ng(t) {
          return typeof t == "number" && qu(t);
        }
        function fe(t) {
          if (!V(t))
            return !1;
          var e = dt(t);
          return e == xn || e == Ji || e == kf || e == eo;
        }
        function af(t) {
          return typeof t == "number" && t == N(t);
        }
        function dr(t) {
          return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ge;
        }
        function V(t) {
          var e = typeof t;
          return t != null && (e == "object" || e == "function");
        }
        function tt(t) {
          return t != null && typeof t == "object";
        }
        var lf = mu ? Lt(mu) : Ul;
        function Dg(t, e) {
          return t === e || ui(t, e, Ei(e));
        }
        function bg(t, e, n) {
          return n = typeof n == "function" ? n : i, ui(t, e, Ei(e), n);
        }
        function Fg(t) {
          return cf(t) && t != +t;
        }
        function Ug(t) {
          if (Tc(t))
            throw new P(S);
          return es(t);
        }
        function Mg(t) {
          return t === null;
        }
        function Bg(t) {
          return t == null;
        }
        function cf(t) {
          return typeof t == "number" || tt(t) && dt(t) == tn;
        }
        function Sn(t) {
          if (!tt(t) || dt(t) != te)
            return !1;
          var e = Hn(t);
          if (e === null)
            return !0;
          var n = q.call(e, "constructor") && e.constructor;
          return typeof n == "function" && n instanceof n && Mn.call(n) == ba;
        }
        var Di = Au ? Lt(Au) : Ml;
        function Gg(t) {
          return af(t) && t >= -ge && t <= ge;
        }
        var hf = wu ? Lt(wu) : Bl;
        function _r(t) {
          return typeof t == "string" || !C(t) && tt(t) && dt(t) == nn;
        }
        function Ct(t) {
          return typeof t == "symbol" || tt(t) && dt(t) == On;
        }
        var Xe = yu ? Lt(yu) : Gl;
        function Wg(t) {
          return t === i;
        }
        function Hg(t) {
          return tt(t) && ht(t) == rn;
        }
        function qg(t) {
          return tt(t) && dt(t) == ro;
        }
        var Yg = ur(fi), zg = ur(function(t, e) {
          return t <= e;
        });
        function gf(t) {
          if (!t)
            return [];
          if (St(t))
            return _r(t) ? zt(t) : Tt(t);
          if (fn && t[fn])
            return Ea(t[fn]());
          var e = ht(t), n = e == qt ? Zr : e == Yt ? bn : Ze;
          return n(t);
        }
        function oe(t) {
          if (!t)
            return t === 0 ? t : 0;
          if (t = Ht(t), t === me || t === -me) {
            var e = t < 0 ? -1 : 1;
            return e * Zf;
          }
          return t === t ? t : 0;
        }
        function N(t) {
          var e = oe(t), n = e % 1;
          return e === e ? n ? e - n : e : 0;
        }
        function df(t) {
          return t ? Oe(N(t), 0, Zt) : 0;
        }
        function Ht(t) {
          if (typeof t == "number")
            return t;
          if (Ct(t))
            return An;
          if (V(t)) {
            var e = typeof t.valueOf == "function" ? t.valueOf() : t;
            t = V(e) ? e + "" : e;
          }
          if (typeof t != "string")
            return t === 0 ? t : +t;
          t = Nu(t);
          var n = wo.test(t);
          return n || xo.test(t) ? ua(t.slice(2), n ? 2 : 8) : Ao.test(t) ? An : +t;
        }
        function _f(t) {
          return Vt(t, Rt(t));
        }
        function $g(t) {
          return t ? Oe(N(t), -ge, ge) : t === 0 ? t : 0;
        }
        function H(t) {
          return t == null ? "" : Pt(t);
        }
        var Kg = ze(function(t, e) {
          if (In(e) || St(e)) {
            Vt(e, ut(e), t);
            return;
          }
          for (var n in e)
            q.call(e, n) && hn(t, n, e[n]);
        }), pf = ze(function(t, e) {
          Vt(e, Rt(e), t);
        }), pr = ze(function(t, e, n, r) {
          Vt(e, Rt(e), t, r);
        }), Xg = ze(function(t, e, n, r) {
          Vt(e, ut(e), t, r);
        }), Zg = ue(ti);
        function Jg(t, e) {
          var n = Ye(t);
          return e == null ? n : Xu(n, e);
        }
        var Vg = b(function(t, e) {
          t = $(t);
          var n = -1, r = e.length, s = r > 2 ? e[2] : i;
          for (s && _t(e[0], e[1], s) && (r = 1); ++n < r; )
            for (var o = e[n], a = Rt(o), c = -1, d = a.length; ++c < d; ) {
              var I = a[c], T = t[I];
              (T === i || Kt(T, We[I]) && !q.call(t, I)) && (t[I] = o[I]);
            }
          return t;
        }), Qg = b(function(t) {
          return t.push(i, Ns), Ot(vf, i, t);
        });
        function kg(t, e) {
          return Ou(t, y(e, 3), Jt);
        }
        function jg(t, e) {
          return Ou(t, y(e, 3), ni);
        }
        function td(t, e) {
          return t == null ? t : ei(t, y(e, 3), Rt);
        }
        function ed(t, e) {
          return t == null ? t : ku(t, y(e, 3), Rt);
        }
        function nd(t, e) {
          return t && Jt(t, y(e, 3));
        }
        function rd(t, e) {
          return t && ni(t, y(e, 3));
        }
        function id(t) {
          return t == null ? [] : Qn(t, ut(t));
        }
        function ud(t) {
          return t == null ? [] : Qn(t, Rt(t));
        }
        function bi(t, e, n) {
          var r = t == null ? i : Le(t, e);
          return r === i ? n : r;
        }
        function sd(t, e) {
          return t != null && Fs(t, e, Ll);
        }
        function Fi(t, e) {
          return t != null && Fs(t, e, Pl);
        }
        var fd = xs(function(t, e, n) {
          e != null && typeof e.toString != "function" && (e = Bn.call(e)), t[e] = n;
        }, Mi(Et)), od = xs(function(t, e, n) {
          e != null && typeof e.toString != "function" && (e = Bn.call(e)), q.call(t, e) ? t[e].push(n) : t[e] = [n];
        }, y), ad = b(dn);
        function ut(t) {
          return St(t) ? $u(t) : si(t);
        }
        function Rt(t) {
          return St(t) ? $u(t, !0) : Wl(t);
        }
        function ld(t, e) {
          var n = {};
          return e = y(e, 3), Jt(t, function(r, s, o) {
            re(n, e(r, s, o), r);
          }), n;
        }
        function cd(t, e) {
          var n = {};
          return e = y(e, 3), Jt(t, function(r, s, o) {
            re(n, s, e(r, s, o));
          }), n;
        }
        var hd = ze(function(t, e, n) {
          kn(t, e, n);
        }), vf = ze(function(t, e, n, r) {
          kn(t, e, n, r);
        }), gd = ue(function(t, e) {
          var n = {};
          if (t == null)
            return n;
          var r = !1;
          e = J(e, function(o) {
            return o = Se(o, t), r || (r = o.length > 1), o;
          }), Vt(t, Si(t), n), r && (n = Bt(n, Y | At | at, fc));
          for (var s = e.length; s--; )
            hi(n, e[s]);
          return n;
        });
        function dd(t, e) {
          return If(t, gr(y(e)));
        }
        var _d = ue(function(t, e) {
          return t == null ? {} : ql(t, e);
        });
        function If(t, e) {
          if (t == null)
            return {};
          var n = J(Si(t), function(r) {
            return [r];
          });
          return e = y(e), os(t, n, function(r, s) {
            return e(r, s[0]);
          });
        }
        function pd(t, e, n) {
          e = Se(e, t);
          var r = -1, s = e.length;
          for (s || (s = 1, t = i); ++r < s; ) {
            var o = t == null ? i : t[Qt(e[r])];
            o === i && (r = s, o = n), t = fe(o) ? o.call(t) : o;
          }
          return t;
        }
        function vd(t, e, n) {
          return t == null ? t : pn(t, e, n);
        }
        function Id(t, e, n, r) {
          return r = typeof r == "function" ? r : i, t == null ? t : pn(t, e, n, r);
        }
        var Tf = Ps(ut), Sf = Ps(Rt);
        function Td(t, e, n) {
          var r = C(t), s = r || Ee(t) || Xe(t);
          if (e = y(e, 4), n == null) {
            var o = t && t.constructor;
            s ? n = r ? new o() : [] : V(t) ? n = fe(o) ? Ye(Hn(t)) : {} : n = {};
          }
          return (s ? Ft : Jt)(t, function(a, c, d) {
            return e(n, a, c, d);
          }), n;
        }
        function Sd(t, e) {
          return t == null ? !0 : hi(t, e);
        }
        function Rd(t, e, n) {
          return t == null ? t : gs(t, e, _i(n));
        }
        function Ed(t, e, n, r) {
          return r = typeof r == "function" ? r : i, t == null ? t : gs(t, e, _i(n), r);
        }
        function Ze(t) {
          return t == null ? [] : Xr(t, ut(t));
        }
        function md(t) {
          return t == null ? [] : Xr(t, Rt(t));
        }
        function Ad(t, e, n) {
          return n === i && (n = e, e = i), n !== i && (n = Ht(n), n = n === n ? n : 0), e !== i && (e = Ht(e), e = e === e ? e : 0), Oe(Ht(t), e, n);
        }
        function wd(t, e, n) {
          return e = oe(e), n === i ? (n = e, e = 0) : n = oe(n), t = Ht(t), Cl(t, e, n);
        }
        function yd(t, e, n) {
          if (n && typeof n != "boolean" && _t(t, e, n) && (e = n = i), n === i && (typeof e == "boolean" ? (n = e, e = i) : typeof t == "boolean" && (n = t, t = i)), t === i && e === i ? (t = 0, e = 1) : (t = oe(t), e === i ? (e = t, t = 0) : e = oe(e)), t > e) {
            var r = t;
            t = e, e = r;
          }
          if (n || t % 1 || e % 1) {
            var s = Yu();
            return ct(t + s * (e - t + ia("1e-" + ((s + "").length - 1))), e);
          }
          return ai(t, e);
        }
        var xd = $e(function(t, e, n) {
          return e = e.toLowerCase(), t + (n ? Rf(e) : e);
        });
        function Rf(t) {
          return Ui(H(t).toLowerCase());
        }
        function Ef(t) {
          return t = H(t), t && t.replace(Lo, va).replace(Zo, "");
        }
        function Od(t, e, n) {
          t = H(t), e = Pt(e);
          var r = t.length;
          n = n === i ? r : Oe(N(n), 0, r);
          var s = n;
          return n -= e.length, n >= 0 && t.slice(n, s) == e;
        }
        function Ld(t) {
          return t = H(t), t && oo.test(t) ? t.replace(ki, Ia) : t;
        }
        function Pd(t) {
          return t = H(t), t && _o.test(t) ? t.replace(Cr, "\\$&") : t;
        }
        var Cd = $e(function(t, e, n) {
          return t + (n ? "-" : "") + e.toLowerCase();
        }), Nd = $e(function(t, e, n) {
          return t + (n ? " " : "") + e.toLowerCase();
        }), Dd = As("toLowerCase");
        function bd(t, e, n) {
          t = H(t), e = N(e);
          var r = e ? Be(t) : 0;
          if (!e || r >= e)
            return t;
          var s = (e - r) / 2;
          return ir($n(s), n) + t + ir(zn(s), n);
        }
        function Fd(t, e, n) {
          t = H(t), e = N(e);
          var r = e ? Be(t) : 0;
          return e && r < e ? t + ir(e - r, n) : t;
        }
        function Ud(t, e, n) {
          t = H(t), e = N(e);
          var r = e ? Be(t) : 0;
          return e && r < e ? ir(e - r, n) + t : t;
        }
        function Md(t, e, n) {
          return n || e == null ? e = 0 : e && (e = +e), za(H(t).replace(Nr, ""), e || 0);
        }
        function Bd(t, e, n) {
          return (n ? _t(t, e, n) : e === i) ? e = 1 : e = N(e), li(H(t), e);
        }
        function Gd() {
          var t = arguments, e = H(t[0]);
          return t.length < 3 ? e : e.replace(t[1], t[2]);
        }
        var Wd = $e(function(t, e, n) {
          return t + (n ? "_" : "") + e.toLowerCase();
        });
        function Hd(t, e, n) {
          return n && typeof n != "number" && _t(t, e, n) && (e = n = i), n = n === i ? Zt : n >>> 0, n ? (t = H(t), t && (typeof e == "string" || e != null && !Di(e)) && (e = Pt(e), !e && Me(t)) ? Re(zt(t), 0, n) : t.split(e, n)) : [];
        }
        var qd = $e(function(t, e, n) {
          return t + (n ? " " : "") + Ui(e);
        });
        function Yd(t, e, n) {
          return t = H(t), n = n == null ? 0 : Oe(N(n), 0, t.length), e = Pt(e), t.slice(n, n + e.length) == e;
        }
        function zd(t, e, n) {
          var r = f.templateSettings;
          n && _t(t, e, n) && (e = i), t = H(t), e = pr({}, e, r, Cs);
          var s = pr({}, e.imports, r.imports, Cs), o = ut(s), a = Xr(s, o), c, d, I = 0, T = e.interpolate || Ln, R = "__p += '", E = Jr(
            (e.escape || Ln).source + "|" + T.source + "|" + (T === ji ? mo : Ln).source + "|" + (e.evaluate || Ln).source + "|$",
            "g"
          ), w = "//# sourceURL=" + (q.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++jo + "]") + `
`;
          t.replace(E, function(O, F, G, Nt, pt, Dt) {
            return G || (G = Nt), R += t.slice(I, Dt).replace(Po, Ta), F && (c = !0, R += `' +
__e(` + F + `) +
'`), pt && (d = !0, R += `';
` + pt + `;
__p += '`), G && (R += `' +
((__t = (` + G + `)) == null ? '' : __t) +
'`), I = Dt + O.length, O;
          }), R += `';
`;
          var x = q.call(e, "variable") && e.variable;
          if (!x)
            R = `with (obj) {
` + R + `
}
`;
          else if (Ro.test(x))
            throw new P(L);
          R = (d ? R.replace(io, "") : R).replace(uo, "$1").replace(so, "$1;"), R = "function(" + (x || "obj") + `) {
` + (x ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (d ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + R + `return __p
}`;
          var D = Af(function() {
            return W(o, w + "return " + R).apply(i, a);
          });
          if (D.source = R, Ni(D))
            throw D;
          return D;
        }
        function $d(t) {
          return H(t).toLowerCase();
        }
        function Kd(t) {
          return H(t).toUpperCase();
        }
        function Xd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return Nu(t);
          if (!t || !(e = Pt(e)))
            return t;
          var r = zt(t), s = zt(e), o = Du(r, s), a = bu(r, s) + 1;
          return Re(r, o, a).join("");
        }
        function Zd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return t.slice(0, Uu(t) + 1);
          if (!t || !(e = Pt(e)))
            return t;
          var r = zt(t), s = bu(r, zt(e)) + 1;
          return Re(r, 0, s).join("");
        }
        function Jd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return t.replace(Nr, "");
          if (!t || !(e = Pt(e)))
            return t;
          var r = zt(t), s = Du(r, zt(e));
          return Re(r, s).join("");
        }
        function Vd(t, e) {
          var n = Sr, r = Rr;
          if (V(e)) {
            var s = "separator" in e ? e.separator : s;
            n = "length" in e ? N(e.length) : n, r = "omission" in e ? Pt(e.omission) : r;
          }
          t = H(t);
          var o = t.length;
          if (Me(t)) {
            var a = zt(t);
            o = a.length;
          }
          if (n >= o)
            return t;
          var c = n - Be(r);
          if (c < 1)
            return r;
          var d = a ? Re(a, 0, c).join("") : t.slice(0, c);
          if (s === i)
            return d + r;
          if (a && (c += d.length - c), Di(s)) {
            if (t.slice(c).search(s)) {
              var I, T = d;
              for (s.global || (s = Jr(s.source, H(tu.exec(s)) + "g")), s.lastIndex = 0; I = s.exec(T); )
                var R = I.index;
              d = d.slice(0, R === i ? c : R);
            }
          } else if (t.indexOf(Pt(s), c) != c) {
            var E = d.lastIndexOf(s);
            E > -1 && (d = d.slice(0, E));
          }
          return d + r;
        }
        function Qd(t) {
          return t = H(t), t && fo.test(t) ? t.replace(Qi, ya) : t;
        }
        var kd = $e(function(t, e, n) {
          return t + (n ? " " : "") + e.toUpperCase();
        }), Ui = As("toUpperCase");
        function mf(t, e, n) {
          return t = H(t), e = n ? i : e, e === i ? Ra(t) ? La(t) : ha(t) : t.match(e) || [];
        }
        var Af = b(function(t, e) {
          try {
            return Ot(t, i, e);
          } catch (n) {
            return Ni(n) ? n : new P(n);
          }
        }), jd = ue(function(t, e) {
          return Ft(e, function(n) {
            n = Qt(n), re(t, n, Pi(t[n], t));
          }), t;
        });
        function t_(t) {
          var e = t == null ? 0 : t.length, n = y();
          return t = e ? J(t, function(r) {
            if (typeof r[1] != "function")
              throw new Ut(m);
            return [n(r[0]), r[1]];
          }) : [], b(function(r) {
            for (var s = -1; ++s < e; ) {
              var o = t[s];
              if (Ot(o[0], this, r))
                return Ot(o[1], this, r);
            }
          });
        }
        function e_(t) {
          return yl(Bt(t, Y));
        }
        function Mi(t) {
          return function() {
            return t;
          };
        }
        function n_(t, e) {
          return t == null || t !== t ? e : t;
        }
        var r_ = ys(), i_ = ys(!0);
        function Et(t) {
          return t;
        }
        function Bi(t) {
          return ns(typeof t == "function" ? t : Bt(t, Y));
        }
        function u_(t) {
          return is(Bt(t, Y));
        }
        function s_(t, e) {
          return us(t, Bt(e, Y));
        }
        var f_ = b(function(t, e) {
          return function(n) {
            return dn(n, t, e);
          };
        }), o_ = b(function(t, e) {
          return function(n) {
            return dn(t, n, e);
          };
        });
        function Gi(t, e, n) {
          var r = ut(e), s = Qn(e, r);
          n == null && !(V(e) && (s.length || !r.length)) && (n = e, e = t, t = this, s = Qn(e, ut(e)));
          var o = !(V(n) && "chain" in n) || !!n.chain, a = fe(t);
          return Ft(s, function(c) {
            var d = e[c];
            t[c] = d, a && (t.prototype[c] = function() {
              var I = this.__chain__;
              if (o || I) {
                var T = t(this.__wrapped__), R = T.__actions__ = Tt(this.__actions__);
                return R.push({ func: d, args: arguments, thisArg: t }), T.__chain__ = I, T;
              }
              return d.apply(t, _e([this.value()], arguments));
            });
          }), t;
        }
        function a_() {
          return st._ === this && (st._ = Fa), this;
        }
        function Wi() {
        }
        function l_(t) {
          return t = N(t), b(function(e) {
            return ss(e, t);
          });
        }
        var c_ = vi(J), h_ = vi(xu), g_ = vi(qr);
        function wf(t) {
          return Ai(t) ? Yr(Qt(t)) : Yl(t);
        }
        function d_(t) {
          return function(e) {
            return t == null ? i : Le(t, e);
          };
        }
        var __ = Os(), p_ = Os(!0);
        function Hi() {
          return [];
        }
        function qi() {
          return !1;
        }
        function v_() {
          return {};
        }
        function I_() {
          return "";
        }
        function T_() {
          return !0;
        }
        function S_(t, e) {
          if (t = N(t), t < 1 || t > ge)
            return [];
          var n = Zt, r = ct(t, Zt);
          e = y(e), t -= Zt;
          for (var s = Kr(r, e); ++n < t; )
            e(n);
          return s;
        }
        function R_(t) {
          return C(t) ? J(t, Qt) : Ct(t) ? [t] : Tt(zs(H(t)));
        }
        function E_(t) {
          var e = ++Da;
          return H(t) + e;
        }
        var m_ = rr(function(t, e) {
          return t + e;
        }, 0), A_ = Ii("ceil"), w_ = rr(function(t, e) {
          return t / e;
        }, 1), y_ = Ii("floor");
        function x_(t) {
          return t && t.length ? Vn(t, Et, ri) : i;
        }
        function O_(t, e) {
          return t && t.length ? Vn(t, y(e, 2), ri) : i;
        }
        function L_(t) {
          return Pu(t, Et);
        }
        function P_(t, e) {
          return Pu(t, y(e, 2));
        }
        function C_(t) {
          return t && t.length ? Vn(t, Et, fi) : i;
        }
        function N_(t, e) {
          return t && t.length ? Vn(t, y(e, 2), fi) : i;
        }
        var D_ = rr(function(t, e) {
          return t * e;
        }, 1), b_ = Ii("round"), F_ = rr(function(t, e) {
          return t - e;
        }, 0);
        function U_(t) {
          return t && t.length ? $r(t, Et) : 0;
        }
        function M_(t, e) {
          return t && t.length ? $r(t, y(e, 2)) : 0;
        }
        return f.after = ug, f.ary = ef, f.assign = Kg, f.assignIn = pf, f.assignInWith = pr, f.assignWith = Xg, f.at = Zg, f.before = nf, f.bind = Pi, f.bindAll = jd, f.bindKey = rf, f.castArray = vg, f.chain = ks, f.chunk = yc, f.compact = xc, f.concat = Oc, f.cond = t_, f.conforms = e_, f.constant = Mi, f.countBy = Uh, f.create = Jg, f.curry = uf, f.curryRight = sf, f.debounce = ff, f.defaults = Vg, f.defaultsDeep = Qg, f.defer = sg, f.delay = fg, f.difference = Lc, f.differenceBy = Pc, f.differenceWith = Cc, f.drop = Nc, f.dropRight = Dc, f.dropRightWhile = bc, f.dropWhile = Fc, f.fill = Uc, f.filter = Bh, f.flatMap = Hh, f.flatMapDeep = qh, f.flatMapDepth = Yh, f.flatten = Zs, f.flattenDeep = Mc, f.flattenDepth = Bc, f.flip = og, f.flow = r_, f.flowRight = i_, f.fromPairs = Gc, f.functions = id, f.functionsIn = ud, f.groupBy = zh, f.initial = Hc, f.intersection = qc, f.intersectionBy = Yc, f.intersectionWith = zc, f.invert = fd, f.invertBy = od, f.invokeMap = Kh, f.iteratee = Bi, f.keyBy = Xh, f.keys = ut, f.keysIn = Rt, f.map = lr, f.mapKeys = ld, f.mapValues = cd, f.matches = u_, f.matchesProperty = s_, f.memoize = hr, f.merge = hd, f.mergeWith = vf, f.method = f_, f.methodOf = o_, f.mixin = Gi, f.negate = gr, f.nthArg = l_, f.omit = gd, f.omitBy = dd, f.once = ag, f.orderBy = Zh, f.over = c_, f.overArgs = lg, f.overEvery = h_, f.overSome = g_, f.partial = Ci, f.partialRight = of, f.partition = Jh, f.pick = _d, f.pickBy = If, f.property = wf, f.propertyOf = d_, f.pull = Zc, f.pullAll = Vs, f.pullAllBy = Jc, f.pullAllWith = Vc, f.pullAt = Qc, f.range = __, f.rangeRight = p_, f.rearg = cg, f.reject = kh, f.remove = kc, f.rest = hg, f.reverse = Oi, f.sampleSize = tg, f.set = vd, f.setWith = Id, f.shuffle = eg, f.slice = jc, f.sortBy = ig, f.sortedUniq = sh, f.sortedUniqBy = fh, f.split = Hd, f.spread = gg, f.tail = oh, f.take = ah, f.takeRight = lh, f.takeRightWhile = ch, f.takeWhile = hh, f.tap = xh, f.throttle = dg, f.thru = ar, f.toArray = gf, f.toPairs = Tf, f.toPairsIn = Sf, f.toPath = R_, f.toPlainObject = _f, f.transform = Td, f.unary = _g, f.union = gh, f.unionBy = dh, f.unionWith = _h, f.uniq = ph, f.uniqBy = vh, f.uniqWith = Ih, f.unset = Sd, f.unzip = Li, f.unzipWith = Qs, f.update = Rd, f.updateWith = Ed, f.values = Ze, f.valuesIn = md, f.without = Th, f.words = mf, f.wrap = pg, f.xor = Sh, f.xorBy = Rh, f.xorWith = Eh, f.zip = mh, f.zipObject = Ah, f.zipObjectDeep = wh, f.zipWith = yh, f.entries = Tf, f.entriesIn = Sf, f.extend = pf, f.extendWith = pr, Gi(f, f), f.add = m_, f.attempt = Af, f.camelCase = xd, f.capitalize = Rf, f.ceil = A_, f.clamp = Ad, f.clone = Ig, f.cloneDeep = Sg, f.cloneDeepWith = Rg, f.cloneWith = Tg, f.conformsTo = Eg, f.deburr = Ef, f.defaultTo = n_, f.divide = w_, f.endsWith = Od, f.eq = Kt, f.escape = Ld, f.escapeRegExp = Pd, f.every = Mh, f.find = Gh, f.findIndex = Ks, f.findKey = kg, f.findLast = Wh, f.findLastIndex = Xs, f.findLastKey = jg, f.floor = y_, f.forEach = js, f.forEachRight = tf, f.forIn = td, f.forInRight = ed, f.forOwn = nd, f.forOwnRight = rd, f.get = bi, f.gt = mg, f.gte = Ag, f.has = sd, f.hasIn = Fi, f.head = Js, f.identity = Et, f.includes = $h, f.indexOf = Wc, f.inRange = wd, f.invoke = ad, f.isArguments = Ne, f.isArray = C, f.isArrayBuffer = wg, f.isArrayLike = St, f.isArrayLikeObject = et, f.isBoolean = yg, f.isBuffer = Ee, f.isDate = xg, f.isElement = Og, f.isEmpty = Lg, f.isEqual = Pg, f.isEqualWith = Cg, f.isError = Ni, f.isFinite = Ng, f.isFunction = fe, f.isInteger = af, f.isLength = dr, f.isMap = lf, f.isMatch = Dg, f.isMatchWith = bg, f.isNaN = Fg, f.isNative = Ug, f.isNil = Bg, f.isNull = Mg, f.isNumber = cf, f.isObject = V, f.isObjectLike = tt, f.isPlainObject = Sn, f.isRegExp = Di, f.isSafeInteger = Gg, f.isSet = hf, f.isString = _r, f.isSymbol = Ct, f.isTypedArray = Xe, f.isUndefined = Wg, f.isWeakMap = Hg, f.isWeakSet = qg, f.join = $c, f.kebabCase = Cd, f.last = Wt, f.lastIndexOf = Kc, f.lowerCase = Nd, f.lowerFirst = Dd, f.lt = Yg, f.lte = zg, f.max = x_, f.maxBy = O_, f.mean = L_, f.meanBy = P_, f.min = C_, f.minBy = N_, f.stubArray = Hi, f.stubFalse = qi, f.stubObject = v_, f.stubString = I_, f.stubTrue = T_, f.multiply = D_, f.nth = Xc, f.noConflict = a_, f.noop = Wi, f.now = cr, f.pad = bd, f.padEnd = Fd, f.padStart = Ud, f.parseInt = Md, f.random = yd, f.reduce = Vh, f.reduceRight = Qh, f.repeat = Bd, f.replace = Gd, f.result = pd, f.round = b_, f.runInContext = g, f.sample = jh, f.size = ng, f.snakeCase = Wd, f.some = rg, f.sortedIndex = th, f.sortedIndexBy = eh, f.sortedIndexOf = nh, f.sortedLastIndex = rh, f.sortedLastIndexBy = ih, f.sortedLastIndexOf = uh, f.startCase = qd, f.startsWith = Yd, f.subtract = F_, f.sum = U_, f.sumBy = M_, f.template = zd, f.times = S_, f.toFinite = oe, f.toInteger = N, f.toLength = df, f.toLower = $d, f.toNumber = Ht, f.toSafeInteger = $g, f.toString = H, f.toUpper = Kd, f.trim = Xd, f.trimEnd = Zd, f.trimStart = Jd, f.truncate = Vd, f.unescape = Qd, f.uniqueId = E_, f.upperCase = kd, f.upperFirst = Ui, f.each = js, f.eachRight = tf, f.first = Js, Gi(f, (function() {
          var t = {};
          return Jt(f, function(e, n) {
            q.call(f.prototype, n) || (t[n] = e);
          }), t;
        })(), { chain: !1 }), f.VERSION = l, Ft(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
          f[t].placeholder = f;
        }), Ft(["drop", "take"], function(t, e) {
          M.prototype[t] = function(n) {
            n = n === i ? 1 : it(N(n), 0);
            var r = this.__filtered__ && !e ? new M(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = ct(n, r.__takeCount__) : r.__views__.push({
              size: ct(n, Zt),
              type: t + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, M.prototype[t + "Right"] = function(n) {
            return this.reverse()[t](n).reverse();
          };
        }), Ft(["filter", "map", "takeWhile"], function(t, e) {
          var n = e + 1, r = n == Zi || n == Xf;
          M.prototype[t] = function(s) {
            var o = this.clone();
            return o.__iteratees__.push({
              iteratee: y(s, 3),
              type: n
            }), o.__filtered__ = o.__filtered__ || r, o;
          };
        }), Ft(["head", "last"], function(t, e) {
          var n = "take" + (e ? "Right" : "");
          M.prototype[t] = function() {
            return this[n](1).value()[0];
          };
        }), Ft(["initial", "tail"], function(t, e) {
          var n = "drop" + (e ? "" : "Right");
          M.prototype[t] = function() {
            return this.__filtered__ ? new M(this) : this[n](1);
          };
        }), M.prototype.compact = function() {
          return this.filter(Et);
        }, M.prototype.find = function(t) {
          return this.filter(t).head();
        }, M.prototype.findLast = function(t) {
          return this.reverse().find(t);
        }, M.prototype.invokeMap = b(function(t, e) {
          return typeof t == "function" ? new M(this) : this.map(function(n) {
            return dn(n, t, e);
          });
        }), M.prototype.reject = function(t) {
          return this.filter(gr(y(t)));
        }, M.prototype.slice = function(t, e) {
          t = N(t);
          var n = this;
          return n.__filtered__ && (t > 0 || e < 0) ? new M(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== i && (e = N(e), n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n);
        }, M.prototype.takeRightWhile = function(t) {
          return this.reverse().takeWhile(t).reverse();
        }, M.prototype.toArray = function() {
          return this.take(Zt);
        }, Jt(M.prototype, function(t, e) {
          var n = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), s = f[r ? "take" + (e == "last" ? "Right" : "") : e], o = r || /^find/.test(e);
          s && (f.prototype[e] = function() {
            var a = this.__wrapped__, c = r ? [1] : arguments, d = a instanceof M, I = c[0], T = d || C(a), R = function(F) {
              var G = s.apply(f, _e([F], c));
              return r && E ? G[0] : G;
            };
            T && n && typeof I == "function" && I.length != 1 && (d = T = !1);
            var E = this.__chain__, w = !!this.__actions__.length, x = o && !E, D = d && !w;
            if (!o && T) {
              a = D ? a : new M(this);
              var O = t.apply(a, c);
              return O.__actions__.push({ func: ar, args: [R], thisArg: i }), new Mt(O, E);
            }
            return x && D ? t.apply(this, c) : (O = this.thru(R), x ? r ? O.value()[0] : O.value() : O);
          });
        }), Ft(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
          var e = Fn[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(t);
          f.prototype[t] = function() {
            var s = arguments;
            if (r && !this.__chain__) {
              var o = this.value();
              return e.apply(C(o) ? o : [], s);
            }
            return this[n](function(a) {
              return e.apply(C(a) ? a : [], s);
            });
          };
        }), Jt(M.prototype, function(t, e) {
          var n = f[e];
          if (n) {
            var r = n.name + "";
            q.call(qe, r) || (qe[r] = []), qe[r].push({ name: e, func: n });
          }
        }), qe[nr(i, yt).name] = [{
          name: "wrapper",
          func: i
        }], M.prototype.clone = Qa, M.prototype.reverse = ka, M.prototype.value = ja, f.prototype.at = Oh, f.prototype.chain = Lh, f.prototype.commit = Ph, f.prototype.next = Ch, f.prototype.plant = Dh, f.prototype.reverse = bh, f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = Fh, f.prototype.first = f.prototype.head, fn && (f.prototype[fn] = Nh), f;
      }), Ge = Pa();
      Ae ? ((Ae.exports = Ge)._ = Ge, Br._ = Ge) : st._ = Ge;
    }).call(q_);
  })(Rn, Rn.exports)), Rn.exports;
}
var mt = Y_();
function mn(h) {
  return h.toLowerCase().replace(/[^\w\d]+/g, "");
}
function Ki(h, u) {
  const i = new RegExp(/"(.*?)"/g);
  let l = u, p = [], S, m = !1;
  for (; (S = i.exec(u)) !== null && m === !1; ) {
    const K = mn(String(S[1])), Y = z_(h, K);
    Y === void 0 ? m = !0 : (p = p.concat(Y), l = l.replace(S[0], ""));
  }
  if (m)
    return;
  const L = mn(l), B = $_(h, L);
  return B === void 0 ? void 0 : (p = p.concat(B), p.sort((K, Y) => K - Y));
}
function z_(h, u) {
  if (h.length < u.length)
    return;
  const i = h.indexOf(u);
  if (i !== -1)
    return mt.range(i, i + u.length).map((l) => l);
}
function $_(h, u) {
  if (h.length < u.length)
    return;
  const i = Array.from(u), l = [];
  let p = h, S = 0, m = !1;
  for (const L of i) {
    const B = p.indexOf(L);
    if (B === -1 && (m = !0), m === !1) {
      l.push(S + B);
      const U = B + 1;
      S += U, p = p.substring(U);
    }
  }
  if (!m)
    return l;
}
class Xi {
  #t;
  constructor(u) {
    this.source = u;
    const i = Xi.composeTransformedHaystackSegments(u);
    this.#t = i, this.transformed = i.map((l) => l.value).join("").toLowerCase();
  }
  getSourceCharacterIndex(u) {
    let i = 0;
    return this.#t.reduce((l, p) => {
      if (l !== 1 / 0)
        return l;
      const S = i + p.value.length;
      if (u >= i && u <= S) {
        const m = u - i;
        l = p.index + m;
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
function K_(h, u) {
  return (Array.isArray(h) ? h : [h]).map((p) => new Xi(p)).reduce((p, S) => {
    if (p !== void 0)
      return p;
    const m = Ki(S.transformed, u);
    if (m === void 0)
      return p;
    const L = X_(m, S.transformed), B = Z_(S, L);
    return J_(B);
  }, void 0);
}
function X_(h, u) {
  const i = [...h], l = [];
  let p = 0;
  for (; i.length > 0 && p < 100; ) {
    const S = i.at(0);
    if (S === void 0)
      throw new Error("Should never get here");
    let m = 1;
    for (let K = 1; K <= i.length; K += 1) {
      const Y = i.at(K);
      Y !== void 0 && S + K === Y && (m += 1);
    }
    const L = S, B = S + m, U = u.substring(L, B);
    l.push({
      index: L,
      value: U,
      is_match: !0,
      length: U.length
    }), i.splice(0, m), p += 1;
  }
  return l;
}
function Z_(h, u) {
  return u.reduce((i, l, p) => {
    if (p === 0 && l.index !== 0) {
      const U = h.source.substring(0, h.getSourceCharacterIndex(l.index));
      i.push({
        index: 0,
        value: U,
        is_match: !1,
        length: U.length
      });
    }
    const S = h.getSourceCharacterIndex(l.index), m = h.getSourceCharacterIndex(l.index + l.length), L = h.source.substring(S, m);
    i.push({
      index: S,
      value: L,
      is_match: !0,
      length: L.length
    });
    const B = u.at(p + 1);
    if (B) {
      const U = h.getSourceCharacterIndex(l.index + l.length), K = h.getSourceCharacterIndex(B.index), Y = h.source.substring(U, K);
      i.push({
        index: U,
        value: Y,
        is_match: !1,
        length: Y.length
      });
    } else if (S + L.length !== h.source.length) {
      const U = S + L.length, K = h.source.substring(U);
      i.push({
        index: U,
        value: K,
        is_match: !1,
        length: K.length
      });
    }
    return i;
  }, []);
}
function J_(h) {
  const u = /\S/, i = [...h];
  return i.forEach((l, p) => {
    if (l.is_match) {
      const S = l.value.search(u);
      if (S !== 0) {
        const m = i.at(p - 1);
        m && (m.length += S, m.value += l.value.substring(0, S), l.value = l.value.substring(S), l.index = l.index + S);
      }
    }
  }), i;
}
function V_(h, u) {
  return (Array.isArray(h) ? h : [h]).some((l) => {
    const p = mn(l);
    return Ki(p, u) !== void 0;
  });
}
function Q_({ needle: h, haystack: u, Match: i = "mark", Miss: l }) {
  const p = Cf(() => K_(u, h), [u, h]);
  return p === void 0 ? u : p.map((S, m) => {
    const L = [S.value, m].join();
    return S.is_match ? typeof i == "string" ? /* @__PURE__ */ gt(i, { "data-is-match": S.is_match, children: S.value }, L) : /* @__PURE__ */ gt(i, { "data-is-match": S.is_match, segment: S, segmentIndex: m }, L) : l !== void 0 ? typeof l == "string" ? /* @__PURE__ */ gt(l, { "data-is-match": S.is_match, children: S.value }, L) : /* @__PURE__ */ gt(l, { "data-is-match": S.is_match, segment: S, segmentIndex: m }, L) : S.value;
  });
}
function k_({ Match: h = "mark", Miss: u, children: i }) {
  const l = Je();
  return l.search.hasSearchTerm === !1 ? i : /* @__PURE__ */ gt(Q_, { needle: l.search.searchTerm, haystack: i, Match: h, Miss: u });
}
function zi(h) {
  return typeof h == "object" && h !== null && "sortFn" in h;
}
function Ir(h) {
  return typeof h == "object" && h !== null && ("searchFn" in h || "haystackFn" in h);
}
function Lf(h) {
  return typeof h == "object" && h !== null && "filterFn" in h;
}
function Pf(h) {
  return typeof h == "object" && h !== null && "filterFn" in h && "_isHydrated" in h;
}
function $i(h) {
  return typeof h == "object" && h !== null && "groupFn" in h;
}
function j_(h) {
  return typeof h == "object" && h !== null && ("rules" in h || "callback" in h);
}
function tp(h) {
  return typeof h == "object" && h !== null && ("haystack" in h || "callback" in h);
}
const Q = {
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
}, ot = {
  CORE: "core",
  SEARCH: "search",
  FILTERS: "filters",
  GROUP_BY: "groupBy",
  SORT_BY: "sortBy",
  PAGINATION: "pagination"
}, k = {
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
class j extends Error {
  constructor(u, i) {
    const l = `${u} ${JSON.stringify({ ...i })}`;
    super(l), this.name = "FinderError";
  }
}
function ep(h, u) {
  const i = h.length / u.length;
  let l = 1, p = 1, S = 0;
  for (let m = 0; m < h.length; m += 1)
    S !== void 0 && h.at(m) === S + 1 && (p += 1, p >= l && (l = p)), S = h.at(m);
  return { percentOfHaystackMatched: i, longestSequentialSequence: l };
}
class Bf {
  #t;
  constructor({ initialSearchTerm: u }, i) {
    this.searchTerm = u ?? "", this.#t = i;
  }
  get rule() {
    return this.#t.getRuleBook().rules.find(Ir);
  }
  get hasSearchRule() {
    return this.#t.getRuleBook().rules.some(Ir);
  }
  get hasSearchTerm() {
    return this.searchTerm !== "";
  }
  setSearchTerm(u) {
    const i = this.rule;
    if (!i)
      throw new j(k.NO_SEARCH_RULE_SET);
    if (this.#t.isDisabled())
      return;
    const l = this.searchTerm;
    this.searchTerm = u, l !== u && this.#t.debouncer(i, () => {
      this.#t.touch({
        source: ot.SEARCH,
        event: Q.SET_SEARCH_TERM,
        current: u,
        initial: l,
        rule: i
      });
    });
  }
  reset() {
    if (this.#t.isDisabled())
      return;
    const u = this.searchTerm;
    this.searchTerm = "", this.#t.touch({
      source: ot.SEARCH,
      event: Q.RESET_SEARCH_TERM,
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
    return this.#t.test({ search: { searchTerm: u, rule: this.rule } }, i);
  }
  static process(u, i, l) {
    if (u.rule === void 0 || u.searchTerm === "")
      return i;
    const p = i.reduce((L, B) => {
      if (u.rule?.searchFn === void 0)
        return L;
      const U = u.rule.searchFn(B, l), Y = (Array.isArray(U) ? U.map(mn) : [mn(U)]).reduce((At, at) => {
        const wt = Ki(at, u.searchTerm);
        return wt !== void 0 && At.push(ep(wt, at)), At;
      }, []);
      if (Y.length > 0) {
        const at = mt.orderBy(Y, ["percentOfHaystackMatched", "longestSequentialSequence"], ["desc", "asc"]).at(0);
        at && L.push({ item: B, score: at });
      }
      return L;
    }, []), S = p.reduce((L, B) => (B.score.longestSequentialSequence > L && (L = B.score.longestSequentialSequence), L), 0);
    return mt.orderBy(
      p,
      [
        (L) => {
          const B = L.score.percentOfHaystackMatched * 100, U = L.score.longestSequentialSequence / S * 100;
          return B + U;
        }
      ],
      ["desc"]
    ).map((L) => L.item);
  }
}
function np(h) {
  return {
    validate(u) {
      if (u !== void 0 && typeof u != "boolean")
        throw new j(k.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule: h, value: u });
      return !0;
    },
    parse(u) {
      return u === void 0 ? h.required ? !0 : h.defaultValue !== void 0 ? h.defaultValue : !1 : u;
    },
    has(u) {
      return this.parse(u);
    },
    toggle(u, i) {
      const l = this.parse(u);
      if (typeof l != "boolean")
        throw new j(k.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule: h, value: l, optionValue: i });
      return !l;
    },
    add(u, i) {
      throw new j(k.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule: h, value: u, optionValue: i });
    },
    delete(u, i) {
      if (i !== void 0)
        throw new j(k.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule: h, value: u, optionValue: i });
    },
    isActive(u) {
      return h.required ? !0 : this.parse(u) === !0;
    }
  };
}
function rp(h) {
  return {
    validate(u) {
      if (u !== void 0 && Array.isArray(u) === !1)
        throw new j(k.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: h, value: u });
      return !0;
    },
    parse(u) {
      if (u === void 0)
        return h.required && Array.isArray(h.options) && h.options.length > 0 ? [h.options.at(0)?.value] : [];
      if (Array.isArray(u))
        return u;
      throw new j(k.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: h, value: u });
    },
    has(u, i) {
      if (i === void 0)
        return Array.isArray(u) && u.length > 0;
      if (Array.isArray(i))
        return i.every((p) => this.has(h, p));
      const l = h.options?.find((p) => typeof i == "object" && "value" in i ? p.value === i.value : p.value === i);
      return Array.isArray(u) && l !== void 0 && u.includes(l.value);
    },
    toggle(u, i) {
      const l = this.parse(u);
      if (Array.isArray(l) === !1)
        throw new j(k.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: h, value: l });
      if (i === void 0)
        throw new j(k.TOGGLING_OPTION_WITHOUT_PASSING_OPTION, { rule: h });
      if (h.options === void 0)
        throw new j(k.TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS, { rule: h, optionValue: i });
      const p = h.options.find((S) => typeof i == "object" && "value" in i ? S.value === i.value : S.value === i);
      if (p === void 0)
        throw new j(k.TOGGLING_OPTION_THAT_DOES_NOT_EXIST, { rule: h, optionValue: i });
      return l.includes(p.value) ? [...l.filter((S) => S !== p.value)] : [...l, p.value];
    },
    add(u, i) {
      const l = this.parse(u);
      if (i === void 0)
        throw new j(k.ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE, { rule: h, optionValue: i });
      const p = h.options?.find((S) => typeof i == "object" && "value" in i ? S.value === i.value : S.value === i);
      return p !== void 0 ? l.includes(p.value) === !1 ? [...l, p.value] : l : [...l, i];
    },
    delete(u, i) {
      if (i === void 0)
        return;
      const l = this.parse(u), p = h.options?.find((S) => typeof i == "object" && "value" in i ? S.value === i.value : S.value === i);
      return p !== void 0 && l.includes(p.value) ? l.filter((S) => S.value !== p.value) : l.filter((S) => S !== i);
    },
    isActive(u) {
      return h.required ? !0 : this.parse(u).length > 0;
    }
  };
}
function ip(h) {
  return {
    validate() {
      return !0;
    },
    parse(u) {
      if (u === void 0 && h.required) {
        if (h.defaultValue)
          return h.defaultValue;
        if (Array.isArray(h.options) && h.options.length > 0)
          return h.options.at(0)?.value;
      }
      return u;
    },
    has(u) {
      return u !== void 0;
    },
    toggle(u, i) {
      throw new j(k.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, { rule: h, value: u, optionValue: i });
    },
    add(u, i) {
      throw new j(k.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule: h, value: u, optionValue: i });
    },
    delete(u, i) {
      if (i !== void 0)
        throw new j(k.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule: h, value: u, optionValue: i });
    },
    isActive(u) {
      return h.required ? !0 : !(u === void 0 || typeof u == "string" && u.trim() === "");
    }
  };
}
function le(h) {
  return h.boolean ? np(h) : h.multiple ? rp(h) : ip(h);
}
class Gf {
  #t;
  #e;
  constructor({ initialFilters: u }, i) {
    this.#t = u ?? {}, this.#e = i;
  }
  set(u, i) {
    if (this.#e.isDisabled())
      return;
    const l = this.getRule(u), p = this.get(u), m = typeof i == "string" && i.trim() === "" ? void 0 : i;
    le(l).validate(i), !(this.#t[l.id] !== void 0 && this.#t[l.id] === m) && this.#e.debouncer(l, () => {
      this.#t = { ...this.#t, [l.id]: m }, this.#e.touch({
        source: ot.FILTERS,
        event: Q.SET_FILTER,
        current: m,
        initial: p,
        rule: l
      });
    });
  }
  get rules() {
    return this.#e.getRuleBook().rules.filter(Pf);
  }
  get activeRules() {
    return this.rules.filter((u) => le(u).isActive(this.#t[u.id]));
  }
  get(u) {
    const i = this.getRule(u), l = this.#t[i.id];
    return le(i).parse(l);
  }
  has(u, i) {
    const l = this.getRule(u), p = this.#t[l.id];
    return le(l).has(p, i);
  }
  getRule(u) {
    const i = this.#e.getRuleBook().getRule(u);
    if (Pf(i) === !1)
      throw new j(k.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  add(u, i) {
    const l = this.getRule(u), p = this.#t[l.id];
    this.set(l, le(l).add(p, i));
  }
  delete(u, i) {
    const l = this.getRule(u), p = this.#t[l.id];
    this.set(l, le(l).delete(p, i));
  }
  isRuleActive(u) {
    const i = this.getRule(u), l = this.#t[i.id];
    return le(i).isActive(l);
  }
  toggle(u, i) {
    const l = this.getRule(u), p = this.#t[l.id], S = le(l).toggle(p, i);
    this.set(l, S);
  }
  test(u) {
    if (this.#e.isLoading())
      return [];
    if (u.isAdditive) {
      const i = mt.uniqBy([...this.rules, ...u.rules], "id"), l = { ...this.values, ...u.values };
      return this.#e.test({ filters: { rules: i, values: l } }, !0);
    }
    return this.#e.test({ filters: { rules: u.rules, values: u.values ?? {} } });
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
    if (this.#e.isLoading())
      return /* @__PURE__ */ new Map();
    const l = this.getRule(u);
    if (l.boolean === !0) {
      const p = /* @__PURE__ */ new Map();
      return p.set(!0, this.testRule({ rule: l, value: !0 })), p.set(!1, this.testRule({ rule: l, value: !1 })), p;
    }
    if (Array.isArray(l.options)) {
      const p = /* @__PURE__ */ new Map();
      return l.options.forEach((S) => {
        let m;
        l.multiple ? m = [S.value] : m = S.value, p.set(S, this.testRule({ rule: l, value: m, isAdditive: i }));
      }), p;
    }
    throw new j(k.TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS, l);
  }
  // return all filter values with default options and type casts applied.
  get values() {
    return this.rules.reduce((u, i) => (u[i.id] = this.get(i), u), {});
  }
  get raw() {
    return this.#t;
  }
  serialize() {
    return {
      rules: this.rules,
      values: this.values
    };
  }
  static process(u, i, l) {
    const p = u.rules.filter((S) => le(S).isActive(u.values[S.id]));
    return p.length === 0 ? i : i.filter((S) => p.every((m) => m.filterFn(S, u.values[m.id], l)));
  }
}
const Yi = [void 0, "desc", "asc"];
class Wf {
  #t;
  #e;
  #n;
  constructor({ initialSortBy: u, initialSortDirection: i }, l) {
    this.#n = l, u && (this.#t = this.getRule(u)), this.#e = i;
  }
  getRule(u) {
    const i = this.#n.getRuleBook().getRule(u);
    if (zi(i) === !1)
      throw new j(k.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  get rules() {
    return this.#n.getRuleBook().rules.filter(zi);
  }
  get activeRule() {
    const u = this.rules.at(0);
    return this.#t ?? u;
  }
  get sortDirection() {
    return this.#e ?? this.activeRule?.defaultSortDirection ?? "asc";
  }
  get userHasSetSortDirection() {
    return this.#e !== void 0;
  }
  setSortDirection(u) {
    if (this.#n.isDisabled() || !this.activeRule)
      return;
    const i = this.#e;
    this.#e = u, this.#n.touch({
      source: ot.SORT_BY,
      event: Q.SET_SORT_BY_DIRECTION,
      current: { sortDirection: u },
      initial: { sortDirection: i },
      rule: this.activeRule
    });
  }
  cycleSortDirection() {
    const u = Yi.findIndex((i) => i === this.#e);
    if (u !== -1) {
      const i = u + 1 % (Yi.length - 1);
      this.setSortDirection(Yi[i]);
    }
  }
  toggleSortDirection() {
    if ((this.#e ?? this.activeRule?.defaultSortDirection) === "desc") {
      this.setSortDirection("asc");
      return;
    }
    this.setSortDirection("desc");
  }
  set(u, i) {
    if (this.#n.isDisabled() || !this.activeRule)
      return;
    const l = this.#e, p = this.#t, S = u ? this.getRule(u) : void 0;
    this.#t = S, this.#e = i, this.#n.touch({
      source: ot.SORT_BY,
      event: Q.SET_SORT_BY,
      current: { rule: S?.id, sortDirection: i },
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
    return u.rule === void 0 ? i : mt.orderBy(
      i,
      (p) => typeof u.rule?.sortFn == "function" ? u.rule.sortFn(p, l) : Number.NEGATIVE_INFINITY,
      u.sortDirection
    );
  }
}
class Hf {
  #t;
  #e;
  #n;
  constructor({ initialGroupBy: u, requireGroup: i }, l) {
    this.#n = l, u && (this.#t = this.getRule(u)), this.requireGroup = i;
  }
  getRule(u) {
    const i = this.#n.getRuleBook().getRule(u);
    if ($i(i) === !1)
      throw new j(k.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  get rules() {
    return this.#n.getRuleBook().rules.filter($i);
  }
  get activeRule() {
    const u = this.requireGroup ? this.rules.at(0) : void 0;
    return this.#t ?? u;
  }
  get hasGroupByRule() {
    return this.activeRule !== void 0;
  }
  get groupSortDirection() {
    return this.#e ?? this.activeRule?.defaultGroupSortDirection;
  }
  set(u) {
    if (this.#n.isDisabled())
      return;
    const i = this.#t;
    let l;
    const p = typeof u == "string" && u.trim() === "";
    p && (l = void 0), p === !1 && u !== void 0 && (l = this.getRule(u)), this.#t !== l && (this.#t = l, this.#e = void 0, this.#n.touch({
      source: ot.GROUP_BY,
      event: Q.SET_GROUP_BY,
      current: l?.id,
      initial: i?.id,
      rule: l
    }));
  }
  setGroupSortDirection(u) {
    const i = this.#e;
    this.#e = u, this.#n.touch({
      source: ot.GROUP_BY,
      event: Q.SET_GROUP_SORT_BY_DIRECTION,
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
      sortDirection: this.#e
    };
  }
  static process(u, i, l) {
    const p = mt.groupBy(i, (U) => u.rule?.groupFn(U, l)), S = Object.entries(p).map(([U, K]) => ({
      id: U,
      items: K
    })), m = u.rule?.sticky !== void 0, L = [], B = [];
    if (m && u.rule && (L.push(up(u.rule)), B.push("asc")), u.rule?.sortGroupFn && (L.push(u.rule.sortGroupFn), B.push(u.sortDirection ?? "asc")), L.length > 0) {
      const U = B;
      return mt.orderBy(S, L, U);
    }
    return S;
  }
}
function up(h) {
  let u = [];
  h.sticky?.header !== void 0 && (Array.isArray(h.sticky.header) && (u = h.sticky.header), typeof h.sticky.header == "string" && (u = [h.sticky.header]));
  let i = [];
  return h.sticky?.footer !== void 0 && (Array.isArray(h.sticky.footer) && (i = h.sticky.footer), typeof h.sticky.footer == "string" && (i = [h.sticky.footer])), (l) => {
    if (u.includes(l.id)) {
      const p = u.findIndex((m) => l.id === m);
      return (u.length - p) * -1;
    }
    return i.includes(l.id) ? 1 + i.findIndex((S) => l.id === S) : 0;
  };
}
class qf {
  #t;
  #e;
  constructor({ page: u, numItemsPerPage: i }, l) {
    this.#t = u ?? 1, this.numItemsPerPage = i, this.#e = l;
  }
  setPage(u) {
    if (u !== this.#t) {
      const i = this.#t;
      this.#t = u, this.#e.touch({
        source: ot.PAGINATION,
        event: Q.SET_PAGE,
        current: { page: this.#t },
        initial: { page: i }
      });
    }
  }
  setNumItemsPerPage(u) {
    if (u !== this.numItemsPerPage) {
      const i = this.numItemsPerPage;
      this.numItemsPerPage = u, this.#e.touch({
        source: ot.PAGINATION,
        event: Q.SET_NUM_ITEMS_PER_PAGE,
        current: { numItemsPerPage: this.numItemsPerPage },
        initial: { numItemsPerPage: i }
      });
    }
  }
  get lastPage() {
    if (this.numItemsPerPage !== void 0)
      return Math.ceil(this.#e.getItems().length / this.numItemsPerPage);
  }
  get numTotalItems() {
    return this.#e.getItems().length;
  }
  get page() {
    return this.numItemsPerPage && this.lastPage ? mt.clamp(this.#t, 1, this.lastPage) : this.#t;
  }
  get offset() {
    return this.numItemsPerPage && this.lastPage ? (mt.clamp(this.#t, 1, this.lastPage) - 1) * this.numItemsPerPage : 0;
  }
  serialize() {
    return {
      page: this.#t,
      numItemsPerPage: this.numItemsPerPage
    };
  }
  static process(u, i) {
    if (u.numItemsPerPage === void 0)
      return i;
    const l = Math.ceil(i.length / u.numItemsPerPage), S = (mt.clamp(u.page, 1, l) - 1) * u.numItemsPerPage;
    return i.slice(S, S + u.numItemsPerPage);
  }
}
function sp() {
  const h = /* @__PURE__ */ new Map();
  return (u, i) => u.debounceMilliseconds === void 0 ? i() : (h.has(u) === !1 && h.set(
    u,
    mt.debounce((l) => l(), u.debounceMilliseconds)
  ), h.get(u)?.(i));
}
class fp {
  constructor(u, i, l) {
    this.searchEffects = [], this.ruleEffects = [], this.#t = u.filter(j_), this.#e = u.filter(tp), this.hydrateDefinitions(i, l);
  }
  #t;
  #e;
  hydrateDefinitions(u, i) {
    this.ruleEffects = this.#t.map((l) => {
      const p = typeof l.rules == "function" ? l.rules(u, i) : l.rules, S = Array.isArray(p) ? p : [p];
      return { ...l, rules: S, _isHydrated: !0 };
    }), this.searchEffects = this.#e.map((l) => {
      const p = typeof l.haystack == "function" ? l.haystack(u, i) : l.haystack, S = Array.isArray(p) ? p : [p];
      return { ...l, haystack: S, _isHydrated: !0 };
    });
  }
  processRule(u, i) {
    this.ruleEffects.forEach((l) => {
      l.rules.some((S) => typeof S == "string" && u.id === S || typeof S == "object" && u.id === S.id) && l.onChange(i, u);
    });
  }
  processSearchTerm(u, i) {
    this.searchEffects.forEach((l) => {
      V_(l.haystack, u) && l.onChange(i, u);
    });
  }
}
class op {
  #t = /* @__PURE__ */ new Map();
  #e = !1;
  on(u, i) {
    this.#t.has(u) === !1 && this.#t.set(u, /* @__PURE__ */ new Set()), this.#t.get(u)?.add(i);
  }
  off(u, i) {
    if (this.#t.has(u) === !1)
      return;
    if (i === void 0) {
      this.#t.delete(u);
      return;
    }
    this.#t.get(u)?.delete(i);
  }
  emit(u, i) {
    if (this.#e)
      return;
    this.#t.get(u)?.forEach((p) => {
      p(i);
    });
  }
  silently(u) {
    this.#e = !0, u(), this.#e = !1;
  }
  isSilent() {
    return this.#e;
  }
}
class Tr {
  constructor(u, i, l) {
    this.rules = [], Tr.validateDefinitions(u), this.#t = u, this.hydrateDefinitions(i, l);
  }
  #t;
  hydrateDefinitions(u, i) {
    this.rules = this.#t.map((l) => Lf(l) ? {
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
      throw new j(k.RULE_NOT_FOUND, u);
    return i;
  }
  getDefinitions() {
    return this.#t;
  }
  setRules(u) {
    Tr.validateDefinitions(u), this.#t = u;
  }
  static validateDefinitions(u) {
    if (u.length === 0)
      return !1;
    const i = [Ir, Lf, zi, $i], l = /* @__PURE__ */ new Set();
    return u.forEach((p) => {
      if (p.id === void 0 && !Ir(p))
        throw new j(k.INVALID_RULE_WITHOUT_ID, p);
      if (i.some((S) => S(p)) === !1)
        throw new j(k.INVALID_RULE_SHAPE, p);
      if (p.id) {
        if (l.has(p.id))
          throw new j(k.INVALID_RULE_DUPLICATE, p);
        l.add(p.id);
      }
    }), !0;
  }
}
class En {
  constructor() {
    this.snapshot = {}, this.isStale = !0;
  }
  setIsStale(u) {
    this.isStale = u;
  }
  takeSnapshot({ items: u, context: i, mixins: l }) {
    const p = En.test({ mixins: l, items: u, context: i }), S = l.pagination ? qf.process(l.pagination, p) : p;
    let m = [];
    const L = l.groupBy !== void 0;
    l.groupBy && (m = Hf.process(l.groupBy, S, i)), this.snapshot = {
      items: L ? void 0 : S,
      groups: L ? m : void 0,
      numMatchedItems: p.length,
      numTotalItems: u.length,
      hasGroupByRule: L
    };
  }
  static test({ mixins: u, items: i, context: l }) {
    let p = [...i];
    return u.search && (p = Bf.process(u.search, p, l)), u.filters && (p = Gf.process(u.filters, p, l)), u.sortBy && (p = Wf.process(u.sortBy, p, l)), p;
  }
}
class ap {
  constructor(u, {
    rules: i,
    effects: l,
    initialSearchTerm: p,
    initialSortBy: S,
    initialSortDirection: m,
    initialGroupBy: L,
    initialFilters: B,
    context: U,
    page: K,
    numItemsPerPage: Y,
    isLoading: At,
    disabled: at,
    requireGroup: wt,
    ignoreSortByRulesWhileSearchRuleIsActive: ce,
    onInit: lt,
    onReady: yt,
    onFirstUserInteraction: he,
    onChange: vt
  }, kt) {
    this.isReady = !1, this.#e = !1, this.#t = u, this.disabled = !!at, this.isLoading = !!At, this.#r = new op(), this.getInstanceFn = kt, this.#i = new Tr(i, u ?? [], U), this.#s = new fp(l ?? [], u ?? [], U);
    const It = sp(), xt = {
      getItems: () => this.items,
      getRuleBook: () => this.#i,
      isLoading: () => this.isLoading,
      isDisabled: () => this.disabled,
      test: (z, jt) => this.test(z, jt),
      touch: (z) => this.#a(z),
      debouncer: It
    };
    this.search = new Bf({ initialSearchTerm: p }, xt), this.filters = new Gf({ initialFilters: B }, xt), this.sortBy = new Wf({ initialSortBy: S, initialSortDirection: m }, xt), this.groupBy = new Hf({ initialGroupBy: L, requireGroup: !!wt }, xt), this.pagination = new qf({ page: K, numItemsPerPage: Y }, xt), this.updatedAt = Date.now(), this.#u = new En(), this.context = U, this.#n = ce, this.#r.silently(() => {
      const z = {
        source: ot.CORE,
        event: Q.INIT,
        timestamp: Date.now(),
        instance: this.getInstanceFn()
      };
      lt && lt(z);
    }), vt && this.#r.on(Q.CHANGE, vt), he && this.#r.on(Q.FIRST_USER_INTERACTION, he), this.isReady = !At && Array.isArray(u) && u.length > 0, yt && this.isReady && yt({
      source: ot.CORE,
      event: Q.READY,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    }), this.isReady === !1 && yt && this.#r.on(Q.READY, yt);
  }
  #t;
  #e;
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
    this.#r.emit(Q.CHANGE, i), this.#r.silently(() => {
      u.rule && this.#s.processRule(u.rule, this.getInstanceFn()), this.search.hasSearchTerm && this.#s.processSearchTerm(this.search.searchTerm, this.getInstanceFn());
    });
  }
  /** Internal events not triggered by a user action  */
  #f(u) {
    this.#u.setIsStale(!0), this.updatedAt = Date.now();
    const i = {
      ...u,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    };
    this.#r.emit(u.event, i);
  }
  emitFirstUserInteraction() {
    if (this.#e === !1) {
      this.#e = !0;
      const u = {
        source: ot.CORE,
        event: Q.FIRST_USER_INTERACTION,
        timestamp: Date.now(),
        instance: this.getInstanceFn()
      };
      this.#r.emit(Q.FIRST_USER_INTERACTION, u);
    }
  }
  #l() {
    this.isReady === !1 && (this.isReady = !0, this.#r.emit(Q.READY, {
      source: ot.CORE,
      event: Q.READY,
      timestamp: Date.now()
    }));
  }
  get items() {
    return Array.isArray(this.#t) ? this.#t : [];
  }
  get matches() {
    return this.#u.isStale && (this.#u.takeSnapshot({
      items: this.items,
      context: this.context,
      mixins: this.#o()
    }), this.#u.setIsStale(!1)), this.#u.snapshot;
  }
  test(u, i = !1) {
    if (i) {
      const l = { ...this.#o(), ...u };
      return En.test({ mixins: l, items: this.items, context: this.context });
    }
    return En.test({ mixins: u, items: this.items, context: this.context });
  }
  #o() {
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
    if (mt.isEqual(u, this.#t) === !1) {
      const i = this.#t;
      this.#t = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s.hydrateDefinitions(this.items, this.context), this.#f({ source: ot.CORE, event: Q.SET_ITEMS, current: u, initial: i });
    }
  }
  setIsLoading(u) {
    if (!!u !== this.isLoading) {
      const i = this.isLoading;
      this.isLoading = !!u, this.#f({ source: ot.CORE, event: Q.SET_IS_LOADING, current: !!u, initial: i }), this.isLoading === !1 && this.#l();
    }
  }
  setIsDisabled(u) {
    if (!!u !== this.disabled) {
      const i = this.disabled;
      this.disabled = !!u, this.#f({ source: ot.CORE, event: Q.SET_IS_DISABLED, current: !!u, initial: i });
    }
  }
  setRules(u) {
    mt.isEqual(u, this.#i.getDefinitions()) === !1 && (this.#i.setRules(u), this.#i.hydrateDefinitions(this.items, this.context));
  }
  setContext(u) {
    const i = this.context;
    mt.isEqual(u, i) === !1 && (this.context = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s.hydrateDefinitions(this.items, this.context), this.#f({ source: ot.CORE, event: Q.SET_CONTEXT, current: u, initial: i }));
  }
}
class lp {
  #t;
  constructor(u, i) {
    const l = () => this;
    this.#t = new ap(u, i, l);
  }
  get items() {
    return this.#t.items;
  }
  get context() {
    return this.#t.context;
  }
  get isReady() {
    return this.#t.isReady;
  }
  get isEmpty() {
    return this.#t.isEmpty;
  }
  get hasMatches() {
    return this.#t.hasMatches;
  }
  get isLoading() {
    return this.#t.isLoading;
  }
  get disabled() {
    return this.#t.disabled;
  }
  get state() {
    return this.#t.state;
  }
  get updatedAt() {
    return this.#t.updatedAt;
  }
  get events() {
    return this.#t.events;
  }
  /**
   * Mixin interfaces
   */
  get matches() {
    return this.#t.matches;
  }
  get search() {
    const u = this.#t.search;
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
    const u = this.#t.filters;
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
    const u = this.#t.sortBy;
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
    const u = this.#t.groupBy;
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
    const u = this.#t.pagination;
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
    return this.#t.setItems(u);
  }
  setIsLoading(u) {
    return this.#t.setIsLoading(u);
  }
  setIsDisabled(u) {
    return this.#t.setIsDisabled(u);
  }
  setRules(u) {
    return this.#t.setRules(u);
  }
  setContext(u) {
    return this.#t.setContext(u);
  }
  /**
   * Utils
   */
  test(u, i = !1) {
    return this.#t.test(u, i);
  }
  getRule(u) {
    return this.#t.getRule(u);
  }
}
function Yf({
  items: h,
  rules: u,
  effects: i,
  initialSearchTerm: l,
  initialSortBy: p,
  initialSortDirection: S,
  initialGroupBy: m,
  initialFilters: L,
  context: B,
  isLoading: U,
  disabled: K,
  page: Y,
  numItemsPerPage: At,
  requireGroup: at,
  ignoreSortByRulesWhileSearchRuleIsActive: wt,
  onInit: ce,
  onReady: lt,
  onFirstUserInteraction: yt,
  onChange: he,
  controllerRef: vt,
  children: kt
}) {
  const [It, xt] = xf(Date.now()), [z] = xf(() => {
    const Qe = (Sr) => {
      z.events.on("change", (Rr) => xt(Rr.instance.updatedAt)), he && he(Sr);
    };
    return new lp(h, {
      rules: u,
      effects: i,
      initialSearchTerm: l,
      initialSortBy: p,
      initialSortDirection: S,
      initialGroupBy: m,
      initialFilters: L,
      context: B,
      isLoading: U,
      disabled: K,
      page: Y,
      numItemsPerPage: At,
      requireGroup: at,
      ignoreSortByRulesWhileSearchRuleIsActive: wt,
      onInit: ce,
      onReady: lt,
      onFirstUserInteraction: yt,
      onChange: Qe
    });
  });
  z.setItems(h), z.setIsLoading(U), z.setIsDisabled(K), z.setRules(u), B !== void 0 && z.setContext(B), Y !== void 0 && z.pagination.setPage(Y), At !== void 0 && z.pagination.setNumItemsPerPage(At), W_(vt, () => z, [z]);
  const jt = Cf(() => [z, It], [z, It]);
  return /* @__PURE__ */ gt(Nf.Provider, { value: jt, children: kt });
}
Yf.Content = Ve;
Yf.SearchTermHaystack = k_;
function Sp() {
  return H_(null);
}
export {
  Yf as Finder,
  Q_ as StringMatch,
  _p as filterRule,
  gp as finderRuleset,
  vp as groupByRule,
  Ip as ruleEffect,
  Tp as searchEffect,
  dp as searchRule,
  pp as sortByRule,
  Je as useFinder,
  Sp as useFinderRef
};
