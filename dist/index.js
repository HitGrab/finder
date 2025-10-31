import { createContext as B_, useContext as G_, useMemo as Pf, useState as yf, useImperativeHandle as W_, useRef as H_ } from "react";
import { jsx as ht } from "react/jsx-runtime";
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
function Ip(h) {
  return h;
}
function Tp(h, u) {
  return { rules: h, onChange: u };
}
function Sp(h, u) {
  return { haystack: h, onChange: u };
}
const Cf = B_(null);
function Ve() {
  const h = G_(Cf);
  if (h === null)
    throw new Error("useFinder requires a FinderContext.");
  const [u] = h;
  return u;
}
function Df({ children: h }) {
  const u = Ve();
  return u.isLoading ? typeof h == "function" ? /* @__PURE__ */ ht(h, { pagination: u.pagination, context: u.context }) : h : null;
}
function Nf({ children: h }) {
  const u = Ve();
  return u.isEmpty ? typeof h == "function" ? /* @__PURE__ */ ht(h, { pagination: u.pagination, context: u.context }) : h : null;
}
function bf({ children: h }) {
  const u = Ve();
  return u.isEmpty === !1 && u.hasMatches === !1 ? typeof h == "function" ? /* @__PURE__ */ ht(h, { pagination: u.pagination, context: u.context }) : h : null;
}
function Ff({ children: h }) {
  const u = Ve();
  return u.hasMatches && u.matches.items ? typeof h == "function" ? /* @__PURE__ */ ht(h, { items: u.matches.items, pagination: u.pagination, context: u.context }) : h : null;
}
function Uf({ children: h }) {
  const u = Ve();
  return u.hasMatches && u.matches.groups ? typeof h == "function" ? /* @__PURE__ */ ht(h, { groups: u.matches.groups, pagination: u.pagination, context: u.context }) : h : null;
}
function Qe({ children: h }) {
  if (Object.values(h).length === 0)
    throw new Error("No render props were found.");
  return [
    h.loading && /* @__PURE__ */ ht(Df, { children: h.loading }, "loading"),
    h.empty && /* @__PURE__ */ ht(Nf, { children: h.empty }, "empty"),
    h.noMatches && /* @__PURE__ */ ht(bf, { children: h.noMatches }, "noMatches"),
    h.items && /* @__PURE__ */ ht(Ff, { children: h.items }, "items"),
    h.groups && /* @__PURE__ */ ht(Uf, { children: h.groups }, "groups")
  ];
}
Qe.Loading = Df;
Qe.Empty = Nf;
Qe.NoMatches = bf;
Qe.Items = Ff;
Qe.Groups = Uf;
var vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Rn = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var q_ = Rn.exports, xf;
function Y_() {
  return xf || (xf = 1, (function(h, u) {
    (function() {
      var i, l = "4.17.21", p = 200, S = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", E = "Expected a function", C = "Invalid `variable` option passed into `_.template`", B = "__lodash_hash_undefined__", G = 500, z = "__lodash_placeholder__", q = 1, gt = 2, At = 4, Xt = 1, ce = 2, at = 1, wt = 2, Ee = 4, vt = 8, kt = 16, It = 32, yt = 64, $ = 128, jt = 256, Ne = 512, Sr = 30, Yf = "...", zf = 800, $f = 16, Xi = 1, Kf = 2, Xf = 3, me = 1 / 0, he = 9007199254740991, Zf = 17976931348623157e292, An = NaN, Zt = 4294967295, Jf = Zt - 1, Vf = Zt >>> 1, Qf = [
        ["ary", $],
        ["bind", at],
        ["bindKey", wt],
        ["curry", vt],
        ["curryRight", kt],
        ["flip", Ne],
        ["partial", It],
        ["partialRight", yt],
        ["rearg", jt]
      ], be = "[object Arguments]", wn = "[object Array]", kf = "[object AsyncFunction]", ke = "[object Boolean]", je = "[object Date]", jf = "[object DOMException]", yn = "[object Error]", xn = "[object Function]", Zi = "[object GeneratorFunction]", Ht = "[object Map]", tn = "[object Number]", to = "[object Null]", te = "[object Object]", Ji = "[object Promise]", eo = "[object Proxy]", en = "[object RegExp]", qt = "[object Set]", nn = "[object String]", On = "[object Symbol]", no = "[object Undefined]", rn = "[object WeakMap]", ro = "[object WeakSet]", un = "[object ArrayBuffer]", Fe = "[object DataView]", Rr = "[object Float32Array]", Er = "[object Float64Array]", mr = "[object Int8Array]", Ar = "[object Int16Array]", wr = "[object Int32Array]", yr = "[object Uint8Array]", xr = "[object Uint8ClampedArray]", Or = "[object Uint16Array]", Lr = "[object Uint32Array]", io = /\b__p \+= '';/g, uo = /\b(__p \+=) '' \+/g, so = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Vi = /&(?:amp|lt|gt|quot|#39);/g, Qi = /[&<>"']/g, fo = RegExp(Vi.source), oo = RegExp(Qi.source), ao = /<%-([\s\S]+?)%>/g, lo = /<%([\s\S]+?)%>/g, ki = /<%=([\s\S]+?)%>/g, co = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ho = /^\w*$/, go = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Pr = /[\\^$.*+?()[\]{}|]/g, _o = RegExp(Pr.source), Cr = /^\s+/, po = /\s/, vo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Io = /\{\n\/\* \[wrapped with (.+)\] \*/, To = /,? & /, So = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ro = /[()=,{}\[\]\/\s]/, Eo = /\\(\\)?/g, mo = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, ji = /\w*$/, Ao = /^[-+]0x[0-9a-f]+$/i, wo = /^0b[01]+$/i, yo = /^\[object .+?Constructor\]$/, xo = /^0o[0-7]+$/i, Oo = /^(?:0|[1-9]\d*)$/, Lo = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ln = /($^)/, Po = /['\n\r\u2028\u2029\\]/g, Pn = "\\ud800-\\udfff", Co = "\\u0300-\\u036f", Do = "\\ufe20-\\ufe2f", No = "\\u20d0-\\u20ff", tu = Co + Do + No, eu = "\\u2700-\\u27bf", nu = "a-z\\xdf-\\xf6\\xf8-\\xff", bo = "\\xac\\xb1\\xd7\\xf7", Fo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Uo = "\\u2000-\\u206f", Mo = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ru = "A-Z\\xc0-\\xd6\\xd8-\\xde", iu = "\\ufe0e\\ufe0f", uu = bo + Fo + Uo + Mo, Dr = "['’]", Bo = "[" + Pn + "]", su = "[" + uu + "]", Cn = "[" + tu + "]", fu = "\\d+", Go = "[" + eu + "]", ou = "[" + nu + "]", au = "[^" + Pn + uu + fu + eu + nu + ru + "]", Nr = "\\ud83c[\\udffb-\\udfff]", Wo = "(?:" + Cn + "|" + Nr + ")", lu = "[^" + Pn + "]", br = "(?:\\ud83c[\\udde6-\\uddff]){2}", Fr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ue = "[" + ru + "]", cu = "\\u200d", hu = "(?:" + ou + "|" + au + ")", Ho = "(?:" + Ue + "|" + au + ")", gu = "(?:" + Dr + "(?:d|ll|m|re|s|t|ve))?", du = "(?:" + Dr + "(?:D|LL|M|RE|S|T|VE))?", _u = Wo + "?", pu = "[" + iu + "]?", qo = "(?:" + cu + "(?:" + [lu, br, Fr].join("|") + ")" + pu + _u + ")*", Yo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", zo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", vu = pu + _u + qo, $o = "(?:" + [Go, br, Fr].join("|") + ")" + vu, Ko = "(?:" + [lu + Cn + "?", Cn, br, Fr, Bo].join("|") + ")", Xo = RegExp(Dr, "g"), Zo = RegExp(Cn, "g"), Ur = RegExp(Nr + "(?=" + Nr + ")|" + Ko + vu, "g"), Jo = RegExp([
        Ue + "?" + ou + "+" + gu + "(?=" + [su, Ue, "$"].join("|") + ")",
        Ho + "+" + du + "(?=" + [su, Ue + hu, "$"].join("|") + ")",
        Ue + "?" + hu + "+" + gu,
        Ue + "+" + du,
        zo,
        Yo,
        fu,
        $o
      ].join("|"), "g"), Vo = RegExp("[" + cu + Pn + tu + iu + "]"), Qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ko = [
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
      Z[Rr] = Z[Er] = Z[mr] = Z[Ar] = Z[wr] = Z[yr] = Z[xr] = Z[Or] = Z[Lr] = !0, Z[be] = Z[wn] = Z[un] = Z[ke] = Z[Fe] = Z[je] = Z[yn] = Z[xn] = Z[Ht] = Z[tn] = Z[te] = Z[en] = Z[qt] = Z[nn] = Z[rn] = !1;
      var X = {};
      X[be] = X[wn] = X[un] = X[Fe] = X[ke] = X[je] = X[Rr] = X[Er] = X[mr] = X[Ar] = X[wr] = X[Ht] = X[tn] = X[te] = X[en] = X[qt] = X[nn] = X[On] = X[yr] = X[xr] = X[Or] = X[Lr] = !0, X[yn] = X[xn] = X[rn] = !1;
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
      }, ia = parseFloat, ua = parseInt, Iu = typeof vr == "object" && vr && vr.Object === Object && vr, sa = typeof self == "object" && self && self.Object === Object && self, st = Iu || sa || Function("return this")(), Mr = u && !u.nodeType && u, Ae = Mr && !0 && h && !h.nodeType && h, Tu = Ae && Ae.exports === Mr, Br = Tu && Iu.process, Nt = (function() {
        try {
          var g = Ae && Ae.require && Ae.require("util").types;
          return g || Br && Br.binding && Br.binding("util");
        } catch {
        }
      })(), Su = Nt && Nt.isArrayBuffer, Ru = Nt && Nt.isDate, Eu = Nt && Nt.isMap, mu = Nt && Nt.isRegExp, Au = Nt && Nt.isSet, wu = Nt && Nt.isTypedArray;
      function xt(g, v, _) {
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
        for (var L = -1, W = g == null ? 0 : g.length; ++L < W; ) {
          var rt = g[L];
          v(A, rt, _(rt), g);
        }
        return A;
      }
      function bt(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length; ++_ < A && v(g[_], _, g) !== !1; )
          ;
        return g;
      }
      function oa(g, v) {
        for (var _ = g == null ? 0 : g.length; _-- && v(g[_], _, g) !== !1; )
          ;
        return g;
      }
      function yu(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length; ++_ < A; )
          if (!v(g[_], _, g))
            return !1;
        return !0;
      }
      function ge(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length, L = 0, W = []; ++_ < A; ) {
          var rt = g[_];
          v(rt, _, g) && (W[L++] = rt);
        }
        return W;
      }
      function Dn(g, v) {
        var _ = g == null ? 0 : g.length;
        return !!_ && Me(g, v, 0) > -1;
      }
      function Gr(g, v, _) {
        for (var A = -1, L = g == null ? 0 : g.length; ++A < L; )
          if (_(v, g[A]))
            return !0;
        return !1;
      }
      function V(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length, L = Array(A); ++_ < A; )
          L[_] = v(g[_], _, g);
        return L;
      }
      function de(g, v) {
        for (var _ = -1, A = v.length, L = g.length; ++_ < A; )
          g[L + _] = v[_];
        return g;
      }
      function Wr(g, v, _, A) {
        var L = -1, W = g == null ? 0 : g.length;
        for (A && W && (_ = g[++L]); ++L < W; )
          _ = v(_, g[L], L, g);
        return _;
      }
      function aa(g, v, _, A) {
        var L = g == null ? 0 : g.length;
        for (A && L && (_ = g[--L]); L--; )
          _ = v(_, g[L], L, g);
        return _;
      }
      function Hr(g, v) {
        for (var _ = -1, A = g == null ? 0 : g.length; ++_ < A; )
          if (v(g[_], _, g))
            return !0;
        return !1;
      }
      var la = qr("length");
      function ca(g) {
        return g.split("");
      }
      function ha(g) {
        return g.match(So) || [];
      }
      function xu(g, v, _) {
        var A;
        return _(g, function(L, W, rt) {
          if (v(L, W, rt))
            return A = W, !1;
        }), A;
      }
      function Nn(g, v, _, A) {
        for (var L = g.length, W = _ + (A ? 1 : -1); A ? W-- : ++W < L; )
          if (v(g[W], W, g))
            return W;
        return -1;
      }
      function Me(g, v, _) {
        return v === v ? Aa(g, v, _) : Nn(g, Ou, _);
      }
      function ga(g, v, _, A) {
        for (var L = _ - 1, W = g.length; ++L < W; )
          if (A(g[L], v))
            return L;
        return -1;
      }
      function Ou(g) {
        return g !== g;
      }
      function Lu(g, v) {
        var _ = g == null ? 0 : g.length;
        return _ ? zr(g, v) / _ : An;
      }
      function qr(g) {
        return function(v) {
          return v == null ? i : v[g];
        };
      }
      function Yr(g) {
        return function(v) {
          return g == null ? i : g[v];
        };
      }
      function Pu(g, v, _, A, L) {
        return L(g, function(W, rt, K) {
          _ = A ? (A = !1, W) : v(_, W, rt, K);
        }), _;
      }
      function da(g, v) {
        var _ = g.length;
        for (g.sort(v); _--; )
          g[_] = g[_].value;
        return g;
      }
      function zr(g, v) {
        for (var _, A = -1, L = g.length; ++A < L; ) {
          var W = v(g[A]);
          W !== i && (_ = _ === i ? W : _ + W);
        }
        return _;
      }
      function $r(g, v) {
        for (var _ = -1, A = Array(g); ++_ < g; )
          A[_] = v(_);
        return A;
      }
      function _a(g, v) {
        return V(v, function(_) {
          return [_, g[_]];
        });
      }
      function Cu(g) {
        return g && g.slice(0, Fu(g) + 1).replace(Cr, "");
      }
      function Ot(g) {
        return function(v) {
          return g(v);
        };
      }
      function Kr(g, v) {
        return V(v, function(_) {
          return g[_];
        });
      }
      function sn(g, v) {
        return g.has(v);
      }
      function Du(g, v) {
        for (var _ = -1, A = g.length; ++_ < A && Me(v, g[_], 0) > -1; )
          ;
        return _;
      }
      function Nu(g, v) {
        for (var _ = g.length; _-- && Me(v, g[_], 0) > -1; )
          ;
        return _;
      }
      function pa(g, v) {
        for (var _ = g.length, A = 0; _--; )
          g[_] === v && ++A;
        return A;
      }
      var va = Yr(ta), Ia = Yr(ea);
      function Ta(g) {
        return "\\" + ra[g];
      }
      function Sa(g, v) {
        return g == null ? i : g[v];
      }
      function Be(g) {
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
      function Xr(g) {
        var v = -1, _ = Array(g.size);
        return g.forEach(function(A, L) {
          _[++v] = [L, A];
        }), _;
      }
      function bu(g, v) {
        return function(_) {
          return g(v(_));
        };
      }
      function _e(g, v) {
        for (var _ = -1, A = g.length, L = 0, W = []; ++_ < A; ) {
          var rt = g[_];
          (rt === v || rt === z) && (g[_] = z, W[L++] = _);
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
        for (var A = _ - 1, L = g.length; ++A < L; )
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
      function Ge(g) {
        return Be(g) ? xa(g) : la(g);
      }
      function Yt(g) {
        return Be(g) ? Oa(g) : ca(g);
      }
      function Fu(g) {
        for (var v = g.length; v-- && po.test(g.charAt(v)); )
          ;
        return v;
      }
      var ya = Yr(na);
      function xa(g) {
        for (var v = Ur.lastIndex = 0; Ur.test(g); )
          ++v;
        return v;
      }
      function Oa(g) {
        return g.match(Ur) || [];
      }
      function La(g) {
        return g.match(Jo) || [];
      }
      var Pa = (function g(v) {
        v = v == null ? st : We.defaults(st.Object(), v, We.pick(st, ko));
        var _ = v.Array, A = v.Date, L = v.Error, W = v.Function, rt = v.Math, K = v.Object, Zr = v.RegExp, Ca = v.String, Ft = v.TypeError, Fn = _.prototype, Da = W.prototype, He = K.prototype, Un = v["__core-js_shared__"], Mn = Da.toString, Y = He.hasOwnProperty, Na = 0, Uu = (function() {
          var t = /[^.]+$/.exec(Un && Un.keys && Un.keys.IE_PROTO || "");
          return t ? "Symbol(src)_1." + t : "";
        })(), Bn = He.toString, ba = Mn.call(K), Fa = st._, Ua = Zr(
          "^" + Mn.call(Y).replace(Pr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Gn = Tu ? v.Buffer : i, pe = v.Symbol, Wn = v.Uint8Array, Mu = Gn ? Gn.allocUnsafe : i, Hn = bu(K.getPrototypeOf, K), Bu = K.create, Gu = He.propertyIsEnumerable, qn = Fn.splice, Wu = pe ? pe.isConcatSpreadable : i, fn = pe ? pe.iterator : i, we = pe ? pe.toStringTag : i, Yn = (function() {
          try {
            var t = Pe(K, "defineProperty");
            return t({}, "", {}), t;
          } catch {
          }
        })(), Ma = v.clearTimeout !== st.clearTimeout && v.clearTimeout, Ba = A && A.now !== st.Date.now && A.now, Ga = v.setTimeout !== st.setTimeout && v.setTimeout, zn = rt.ceil, $n = rt.floor, Jr = K.getOwnPropertySymbols, Wa = Gn ? Gn.isBuffer : i, Hu = v.isFinite, Ha = Fn.join, qa = bu(K.keys, K), it = rt.max, lt = rt.min, Ya = A.now, za = v.parseInt, qu = rt.random, $a = Fn.reverse, Vr = Pe(v, "DataView"), on = Pe(v, "Map"), Qr = Pe(v, "Promise"), qe = Pe(v, "Set"), an = Pe(v, "WeakMap"), ln = Pe(K, "create"), Kn = an && new an(), Ye = {}, Ka = Ce(Vr), Xa = Ce(on), Za = Ce(Qr), Ja = Ce(qe), Va = Ce(an), Xn = pe ? pe.prototype : i, cn = Xn ? Xn.valueOf : i, Yu = Xn ? Xn.toString : i;
        function f(t) {
          if (tt(t) && !P(t) && !(t instanceof U)) {
            if (t instanceof Ut)
              return t;
            if (Y.call(t, "__wrapped__"))
              return zs(t);
          }
          return new Ut(t);
        }
        var ze = /* @__PURE__ */ (function() {
          function t() {
          }
          return function(e) {
            if (!Q(e))
              return {};
            if (Bu)
              return Bu(e);
            t.prototype = e;
            var n = new t();
            return t.prototype = i, n;
          };
        })();
        function Zn() {
        }
        function Ut(t, e) {
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
          interpolate: ki,
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
        }, f.prototype = Zn.prototype, f.prototype.constructor = f, Ut.prototype = ze(Zn.prototype), Ut.prototype.constructor = Ut;
        function U(t) {
          this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Zt, this.__views__ = [];
        }
        function Qa() {
          var t = new U(this.__wrapped__);
          return t.__actions__ = Tt(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Tt(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Tt(this.__views__), t;
        }
        function ka() {
          if (this.__filtered__) {
            var t = new U(this);
            t.__dir__ = -1, t.__filtered__ = !0;
          } else
            t = this.clone(), t.__dir__ *= -1;
          return t;
        }
        function ja() {
          var t = this.__wrapped__.value(), e = this.__dir__, n = P(t), r = e < 0, s = n ? t.length : 0, o = cc(0, s, this.__views__), a = o.start, c = o.end, d = c - a, I = r ? c : a - 1, T = this.__iteratees__, R = T.length, m = 0, w = lt(d, this.__takeCount__);
          if (!n || !r && s == d && w == d)
            return gs(t, this.__actions__);
          var x = [];
          t:
            for (; d-- && m < w; ) {
              I += e;
              for (var N = -1, O = t[I]; ++N < R; ) {
                var F = T[N], M = F.iteratee, Ct = F.type, pt = M(O);
                if (Ct == Kf)
                  O = pt;
                else if (!pt) {
                  if (Ct == Xi)
                    continue t;
                  break t;
                }
              }
              x[m++] = O;
            }
          return x;
        }
        U.prototype = ze(Zn.prototype), U.prototype.constructor = U;
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
          return Y.call(e, t) ? e[t] : i;
        }
        function rl(t) {
          var e = this.__data__;
          return ln ? e[t] !== i : Y.call(e, t);
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
        function zt(t) {
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
        zt.prototype.clear = vl, zt.prototype.delete = Il, zt.prototype.get = Tl, zt.prototype.has = Sl, zt.prototype.set = Rl;
        function zu(t, e) {
          var n = P(t), r = !n && De(t), s = !n && !r && Re(t), o = !n && !r && !s && Ze(t), a = n || r || s || o, c = a ? $r(t.length, Ca) : [], d = c.length;
          for (var I in t)
            (e || Y.call(t, I)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
            (I == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            s && (I == "offset" || I == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            o && (I == "buffer" || I == "byteLength" || I == "byteOffset") || // Skip index properties.
            se(I, d))) && c.push(I);
          return c;
        }
        function $u(t) {
          var e = t.length;
          return e ? t[oi(0, e - 1)] : i;
        }
        function El(t, e) {
          return or(Tt(t), Oe(e, 0, t.length));
        }
        function ml(t) {
          return or(Tt(t));
        }
        function kr(t, e, n) {
          (n !== i && !$t(t[e], n) || n === i && !(e in t)) && re(t, e, n);
        }
        function hn(t, e, n) {
          var r = t[e];
          (!(Y.call(t, e) && $t(r, n)) || n === i && !(e in t)) && re(t, e, n);
        }
        function Jn(t, e) {
          for (var n = t.length; n--; )
            if ($t(t[n][0], e))
              return n;
          return -1;
        }
        function Al(t, e, n, r) {
          return ve(t, function(s, o, a) {
            e(r, s, n(s), a);
          }), r;
        }
        function Ku(t, e) {
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
        function jr(t, e) {
          for (var n = -1, r = e.length, s = _(r), o = t == null; ++n < r; )
            s[n] = o ? i : Ni(t, e[n]);
          return s;
        }
        function Oe(t, e, n) {
          return t === t && (n !== i && (t = t <= n ? t : n), e !== i && (t = t >= e ? t : e)), t;
        }
        function Mt(t, e, n, r, s, o) {
          var a, c = e & q, d = e & gt, I = e & At;
          if (n && (a = s ? n(t, r, s, o) : n(t)), a !== i)
            return a;
          if (!Q(t))
            return t;
          var T = P(t);
          if (T) {
            if (a = gc(t), !c)
              return Tt(t, a);
          } else {
            var R = ct(t), m = R == xn || R == Zi;
            if (Re(t))
              return ps(t, c);
            if (R == te || R == be || m && !s) {
              if (a = d || m ? {} : Fs(t), !c)
                return d ? nc(t, wl(a, t)) : ec(t, Ku(a, t));
            } else {
              if (!X[R])
                return s ? t : {};
              a = dc(t, R, c);
            }
          }
          o || (o = new zt());
          var w = o.get(t);
          if (w)
            return w;
          o.set(t, a), cf(t) ? t.forEach(function(O) {
            a.add(Mt(O, e, n, O, t, o));
          }) : af(t) && t.forEach(function(O, F) {
            a.set(F, Mt(O, e, n, F, t, o));
          });
          var x = I ? d ? Ti : Ii : d ? Rt : ut, N = T ? i : x(t);
          return bt(N || t, function(O, F) {
            N && (F = O, O = t[F]), hn(a, F, Mt(O, e, n, F, t, o));
          }), a;
        }
        function yl(t) {
          var e = ut(t);
          return function(n) {
            return Xu(n, t, e);
          };
        }
        function Xu(t, e, n) {
          var r = n.length;
          if (t == null)
            return !r;
          for (t = K(t); r--; ) {
            var s = n[r], o = e[s], a = t[s];
            if (a === i && !(s in t) || !o(a))
              return !1;
          }
          return !0;
        }
        function Zu(t, e, n) {
          if (typeof t != "function")
            throw new Ft(E);
          return Tn(function() {
            t.apply(i, n);
          }, e);
        }
        function gn(t, e, n, r) {
          var s = -1, o = Dn, a = !0, c = t.length, d = [], I = e.length;
          if (!c)
            return d;
          n && (e = V(e, Ot(n))), r ? (o = Gr, a = !1) : e.length >= p && (o = sn, a = !1, e = new xe(e));
          t:
            for (; ++s < c; ) {
              var T = t[s], R = n == null ? T : n(T);
              if (T = r || T !== 0 ? T : 0, a && R === R) {
                for (var m = I; m--; )
                  if (e[m] === R)
                    continue t;
                d.push(T);
              } else o(e, R, r) || d.push(T);
            }
          return d;
        }
        var ve = Rs(Jt), Ju = Rs(ei, !0);
        function xl(t, e) {
          var n = !0;
          return ve(t, function(r, s, o) {
            return n = !!e(r, s, o), n;
          }), n;
        }
        function Vn(t, e, n) {
          for (var r = -1, s = t.length; ++r < s; ) {
            var o = t[r], a = e(o);
            if (a != null && (c === i ? a === a && !Pt(a) : n(a, c)))
              var c = a, d = o;
          }
          return d;
        }
        function Ol(t, e, n, r) {
          var s = t.length;
          for (n = D(n), n < 0 && (n = -n > s ? 0 : s + n), r = r === i || r > s ? s : D(r), r < 0 && (r += s), r = n > r ? 0 : gf(r); n < r; )
            t[n++] = e;
          return t;
        }
        function Vu(t, e) {
          var n = [];
          return ve(t, function(r, s, o) {
            e(r, s, o) && n.push(r);
          }), n;
        }
        function ft(t, e, n, r, s) {
          var o = -1, a = t.length;
          for (n || (n = pc), s || (s = []); ++o < a; ) {
            var c = t[o];
            e > 0 && n(c) ? e > 1 ? ft(c, e - 1, n, r, s) : de(s, c) : r || (s[s.length] = c);
          }
          return s;
        }
        var ti = Es(), Qu = Es(!0);
        function Jt(t, e) {
          return t && ti(t, e, ut);
        }
        function ei(t, e) {
          return t && Qu(t, e, ut);
        }
        function Qn(t, e) {
          return ge(e, function(n) {
            return fe(t[n]);
          });
        }
        function Le(t, e) {
          e = Te(e, t);
          for (var n = 0, r = e.length; t != null && n < r; )
            t = t[Qt(e[n++])];
          return n && n == r ? t : i;
        }
        function ku(t, e, n) {
          var r = e(t);
          return P(t) ? r : de(r, n(t));
        }
        function dt(t) {
          return t == null ? t === i ? no : to : we && we in K(t) ? lc(t) : mc(t);
        }
        function ni(t, e) {
          return t > e;
        }
        function Ll(t, e) {
          return t != null && Y.call(t, e);
        }
        function Pl(t, e) {
          return t != null && e in K(t);
        }
        function Cl(t, e, n) {
          return t >= lt(e, n) && t < it(e, n);
        }
        function ri(t, e, n) {
          for (var r = n ? Gr : Dn, s = t[0].length, o = t.length, a = o, c = _(o), d = 1 / 0, I = []; a--; ) {
            var T = t[a];
            a && e && (T = V(T, Ot(e))), d = lt(T.length, d), c[a] = !n && (e || s >= 120 && T.length >= 120) ? new xe(a && T) : i;
          }
          T = t[0];
          var R = -1, m = c[0];
          t:
            for (; ++R < s && I.length < d; ) {
              var w = T[R], x = e ? e(w) : w;
              if (w = n || w !== 0 ? w : 0, !(m ? sn(m, x) : r(I, x, n))) {
                for (a = o; --a; ) {
                  var N = c[a];
                  if (!(N ? sn(N, x) : r(t[a], x, n)))
                    continue t;
                }
                m && m.push(x), I.push(w);
              }
            }
          return I;
        }
        function Dl(t, e, n, r) {
          return Jt(t, function(s, o, a) {
            e(r, n(s), o, a);
          }), r;
        }
        function dn(t, e, n) {
          e = Te(e, t), t = Gs(t, e);
          var r = t == null ? t : t[Qt(Gt(e))];
          return r == null ? i : xt(r, t, n);
        }
        function ju(t) {
          return tt(t) && dt(t) == be;
        }
        function Nl(t) {
          return tt(t) && dt(t) == un;
        }
        function bl(t) {
          return tt(t) && dt(t) == je;
        }
        function _n(t, e, n, r, s) {
          return t === e ? !0 : t == null || e == null || !tt(t) && !tt(e) ? t !== t && e !== e : Fl(t, e, n, r, _n, s);
        }
        function Fl(t, e, n, r, s, o) {
          var a = P(t), c = P(e), d = a ? wn : ct(t), I = c ? wn : ct(e);
          d = d == be ? te : d, I = I == be ? te : I;
          var T = d == te, R = I == te, m = d == I;
          if (m && Re(t)) {
            if (!Re(e))
              return !1;
            a = !0, T = !1;
          }
          if (m && !T)
            return o || (o = new zt()), a || Ze(t) ? Ds(t, e, n, r, s, o) : oc(t, e, d, n, r, s, o);
          if (!(n & Xt)) {
            var w = T && Y.call(t, "__wrapped__"), x = R && Y.call(e, "__wrapped__");
            if (w || x) {
              var N = w ? t.value() : t, O = x ? e.value() : e;
              return o || (o = new zt()), s(N, O, n, r, o);
            }
          }
          return m ? (o || (o = new zt()), ac(t, e, n, r, s, o)) : !1;
        }
        function Ul(t) {
          return tt(t) && ct(t) == Ht;
        }
        function ii(t, e, n, r) {
          var s = n.length, o = s, a = !r;
          if (t == null)
            return !o;
          for (t = K(t); s--; ) {
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
              var R = new zt();
              if (r)
                var m = r(I, T, d, t, e, R);
              if (!(m === i ? _n(T, I, Xt | ce, r, R) : m))
                return !1;
            }
          }
          return !0;
        }
        function ts(t) {
          if (!Q(t) || Ic(t))
            return !1;
          var e = fe(t) ? Ua : yo;
          return e.test(Ce(t));
        }
        function Ml(t) {
          return tt(t) && dt(t) == en;
        }
        function Bl(t) {
          return tt(t) && ct(t) == qt;
        }
        function Gl(t) {
          return tt(t) && dr(t.length) && !!Z[dt(t)];
        }
        function es(t) {
          return typeof t == "function" ? t : t == null ? Et : typeof t == "object" ? P(t) ? is(t[0], t[1]) : rs(t) : Af(t);
        }
        function ui(t) {
          if (!In(t))
            return qa(t);
          var e = [];
          for (var n in K(t))
            Y.call(t, n) && n != "constructor" && e.push(n);
          return e;
        }
        function Wl(t) {
          if (!Q(t))
            return Ec(t);
          var e = In(t), n = [];
          for (var r in t)
            r == "constructor" && (e || !Y.call(t, r)) || n.push(r);
          return n;
        }
        function si(t, e) {
          return t < e;
        }
        function ns(t, e) {
          var n = -1, r = St(t) ? _(t.length) : [];
          return ve(t, function(s, o, a) {
            r[++n] = e(s, o, a);
          }), r;
        }
        function rs(t) {
          var e = Ri(t);
          return e.length == 1 && e[0][2] ? Ms(e[0][0], e[0][1]) : function(n) {
            return n === t || ii(n, t, e);
          };
        }
        function is(t, e) {
          return mi(t) && Us(e) ? Ms(Qt(t), e) : function(n) {
            var r = Ni(n, t);
            return r === i && r === e ? bi(n, t) : _n(e, r, Xt | ce);
          };
        }
        function kn(t, e, n, r, s) {
          t !== e && ti(e, function(o, a) {
            if (s || (s = new zt()), Q(o))
              Hl(t, e, a, n, kn, r, s);
            else {
              var c = r ? r(wi(t, a), o, a + "", t, e, s) : i;
              c === i && (c = o), kr(t, a, c);
            }
          }, Rt);
        }
        function Hl(t, e, n, r, s, o, a) {
          var c = wi(t, n), d = wi(e, n), I = a.get(d);
          if (I) {
            kr(t, n, I);
            return;
          }
          var T = o ? o(c, d, n + "", t, e, a) : i, R = T === i;
          if (R) {
            var m = P(d), w = !m && Re(d), x = !m && !w && Ze(d);
            T = d, m || w || x ? P(c) ? T = c : et(c) ? T = Tt(c) : w ? (R = !1, T = ps(d, !0)) : x ? (R = !1, T = vs(d, !0)) : T = [] : Sn(d) || De(d) ? (T = c, De(c) ? T = df(c) : (!Q(c) || fe(c)) && (T = Fs(d))) : R = !1;
          }
          R && (a.set(d, T), s(T, d, r, o, a), a.delete(d)), kr(t, n, T);
        }
        function us(t, e) {
          var n = t.length;
          if (n)
            return e += e < 0 ? n : 0, se(e, n) ? t[e] : i;
        }
        function ss(t, e, n) {
          e.length ? e = V(e, function(o) {
            return P(o) ? function(a) {
              return Le(a, o.length === 1 ? o[0] : o);
            } : o;
          }) : e = [Et];
          var r = -1;
          e = V(e, Ot(y()));
          var s = ns(t, function(o, a, c) {
            var d = V(e, function(I) {
              return I(o);
            });
            return { criteria: d, index: ++r, value: o };
          });
          return da(s, function(o, a) {
            return tc(o, a, n);
          });
        }
        function ql(t, e) {
          return fs(t, e, function(n, r) {
            return bi(t, r);
          });
        }
        function fs(t, e, n) {
          for (var r = -1, s = e.length, o = {}; ++r < s; ) {
            var a = e[r], c = Le(t, a);
            n(c, a) && pn(o, Te(a, t), c);
          }
          return o;
        }
        function Yl(t) {
          return function(e) {
            return Le(e, t);
          };
        }
        function fi(t, e, n, r) {
          var s = r ? ga : Me, o = -1, a = e.length, c = t;
          for (t === e && (e = Tt(e)), n && (c = V(t, Ot(n))); ++o < a; )
            for (var d = 0, I = e[o], T = n ? n(I) : I; (d = s(c, T, d, r)) > -1; )
              c !== t && qn.call(c, d, 1), qn.call(t, d, 1);
          return t;
        }
        function os(t, e) {
          for (var n = t ? e.length : 0, r = n - 1; n--; ) {
            var s = e[n];
            if (n == r || s !== o) {
              var o = s;
              se(s) ? qn.call(t, s, 1) : ci(t, s);
            }
          }
          return t;
        }
        function oi(t, e) {
          return t + $n(qu() * (e - t + 1));
        }
        function zl(t, e, n, r) {
          for (var s = -1, o = it(zn((e - t) / (n || 1)), 0), a = _(o); o--; )
            a[r ? o : ++s] = t, t += n;
          return a;
        }
        function ai(t, e) {
          var n = "";
          if (!t || e < 1 || e > he)
            return n;
          do
            e % 2 && (n += t), e = $n(e / 2), e && (t += t);
          while (e);
          return n;
        }
        function b(t, e) {
          return yi(Bs(t, e, Et), t + "");
        }
        function $l(t) {
          return $u(Je(t));
        }
        function Kl(t, e) {
          var n = Je(t);
          return or(n, Oe(e, 0, n.length));
        }
        function pn(t, e, n, r) {
          if (!Q(t))
            return t;
          e = Te(e, t);
          for (var s = -1, o = e.length, a = o - 1, c = t; c != null && ++s < o; ) {
            var d = Qt(e[s]), I = n;
            if (d === "__proto__" || d === "constructor" || d === "prototype")
              return t;
            if (s != a) {
              var T = c[d];
              I = r ? r(T, d, c) : i, I === i && (I = Q(T) ? T : se(e[s + 1]) ? [] : {});
            }
            hn(c, d, I), c = c[d];
          }
          return t;
        }
        var as = Kn ? function(t, e) {
          return Kn.set(t, e), t;
        } : Et, Xl = Yn ? function(t, e) {
          return Yn(t, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Ui(e),
            writable: !0
          });
        } : Et;
        function Zl(t) {
          return or(Je(t));
        }
        function Bt(t, e, n) {
          var r = -1, s = t.length;
          e < 0 && (e = -e > s ? 0 : s + e), n = n > s ? s : n, n < 0 && (n += s), s = e > n ? 0 : n - e >>> 0, e >>>= 0;
          for (var o = _(s); ++r < s; )
            o[r] = t[r + e];
          return o;
        }
        function Jl(t, e) {
          var n;
          return ve(t, function(r, s, o) {
            return n = e(r, s, o), !n;
          }), !!n;
        }
        function jn(t, e, n) {
          var r = 0, s = t == null ? r : t.length;
          if (typeof e == "number" && e === e && s <= Vf) {
            for (; r < s; ) {
              var o = r + s >>> 1, a = t[o];
              a !== null && !Pt(a) && (n ? a <= e : a < e) ? r = o + 1 : s = o;
            }
            return s;
          }
          return li(t, e, Et, n);
        }
        function li(t, e, n, r) {
          var s = 0, o = t == null ? 0 : t.length;
          if (o === 0)
            return 0;
          e = n(e);
          for (var a = e !== e, c = e === null, d = Pt(e), I = e === i; s < o; ) {
            var T = $n((s + o) / 2), R = n(t[T]), m = R !== i, w = R === null, x = R === R, N = Pt(R);
            if (a)
              var O = r || x;
            else I ? O = x && (r || m) : c ? O = x && m && (r || !w) : d ? O = x && m && !w && (r || !N) : w || N ? O = !1 : O = r ? R <= e : R < e;
            O ? s = T + 1 : o = T;
          }
          return lt(o, Jf);
        }
        function ls(t, e) {
          for (var n = -1, r = t.length, s = 0, o = []; ++n < r; ) {
            var a = t[n], c = e ? e(a) : a;
            if (!n || !$t(c, d)) {
              var d = c;
              o[s++] = a === 0 ? 0 : a;
            }
          }
          return o;
        }
        function cs(t) {
          return typeof t == "number" ? t : Pt(t) ? An : +t;
        }
        function Lt(t) {
          if (typeof t == "string")
            return t;
          if (P(t))
            return V(t, Lt) + "";
          if (Pt(t))
            return Yu ? Yu.call(t) : "";
          var e = t + "";
          return e == "0" && 1 / t == -me ? "-0" : e;
        }
        function Ie(t, e, n) {
          var r = -1, s = Dn, o = t.length, a = !0, c = [], d = c;
          if (n)
            a = !1, s = Gr;
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
                for (var m = d.length; m--; )
                  if (d[m] === R)
                    continue t;
                e && d.push(R), c.push(T);
              } else s(d, R, n) || (d !== c && d.push(R), c.push(T));
            }
          return c;
        }
        function ci(t, e) {
          return e = Te(e, t), t = Gs(t, e), t == null || delete t[Qt(Gt(e))];
        }
        function hs(t, e, n, r) {
          return pn(t, e, n(Le(t, e)), r);
        }
        function tr(t, e, n, r) {
          for (var s = t.length, o = r ? s : -1; (r ? o-- : ++o < s) && e(t[o], o, t); )
            ;
          return n ? Bt(t, r ? 0 : o, r ? o + 1 : s) : Bt(t, r ? o + 1 : 0, r ? s : o);
        }
        function gs(t, e) {
          var n = t;
          return n instanceof U && (n = n.value()), Wr(e, function(r, s) {
            return s.func.apply(s.thisArg, de([r], s.args));
          }, n);
        }
        function hi(t, e, n) {
          var r = t.length;
          if (r < 2)
            return r ? Ie(t[0]) : [];
          for (var s = -1, o = _(r); ++s < r; )
            for (var a = t[s], c = -1; ++c < r; )
              c != s && (o[s] = gn(o[s] || a, t[c], e, n));
          return Ie(ft(o, 1), e, n);
        }
        function ds(t, e, n) {
          for (var r = -1, s = t.length, o = e.length, a = {}; ++r < s; ) {
            var c = r < o ? e[r] : i;
            n(a, t[r], c);
          }
          return a;
        }
        function gi(t) {
          return et(t) ? t : [];
        }
        function di(t) {
          return typeof t == "function" ? t : Et;
        }
        function Te(t, e) {
          return P(t) ? t : mi(t, e) ? [t] : Ys(H(t));
        }
        var Vl = b;
        function Se(t, e, n) {
          var r = t.length;
          return n = n === i ? r : n, !e && n >= r ? t : Bt(t, e, n);
        }
        var _s = Ma || function(t) {
          return st.clearTimeout(t);
        };
        function ps(t, e) {
          if (e)
            return t.slice();
          var n = t.length, r = Mu ? Mu(n) : new t.constructor(n);
          return t.copy(r), r;
        }
        function _i(t) {
          var e = new t.constructor(t.byteLength);
          return new Wn(e).set(new Wn(t)), e;
        }
        function Ql(t, e) {
          var n = e ? _i(t.buffer) : t.buffer;
          return new t.constructor(n, t.byteOffset, t.byteLength);
        }
        function kl(t) {
          var e = new t.constructor(t.source, ji.exec(t));
          return e.lastIndex = t.lastIndex, e;
        }
        function jl(t) {
          return cn ? K(cn.call(t)) : {};
        }
        function vs(t, e) {
          var n = e ? _i(t.buffer) : t.buffer;
          return new t.constructor(n, t.byteOffset, t.length);
        }
        function Is(t, e) {
          if (t !== e) {
            var n = t !== i, r = t === null, s = t === t, o = Pt(t), a = e !== i, c = e === null, d = e === e, I = Pt(e);
            if (!c && !I && !o && t > e || o && a && d && !c && !I || r && a && d || !n && d || !s)
              return 1;
            if (!r && !o && !I && t < e || I && n && s && !r && !o || c && n && s || !a && s || !d)
              return -1;
          }
          return 0;
        }
        function tc(t, e, n) {
          for (var r = -1, s = t.criteria, o = e.criteria, a = s.length, c = n.length; ++r < a; ) {
            var d = Is(s[r], o[r]);
            if (d) {
              if (r >= c)
                return d;
              var I = n[r];
              return d * (I == "desc" ? -1 : 1);
            }
          }
          return t.index - e.index;
        }
        function Ts(t, e, n, r) {
          for (var s = -1, o = t.length, a = n.length, c = -1, d = e.length, I = it(o - a, 0), T = _(d + I), R = !r; ++c < d; )
            T[c] = e[c];
          for (; ++s < a; )
            (R || s < o) && (T[n[s]] = t[s]);
          for (; I--; )
            T[c++] = t[s++];
          return T;
        }
        function Ss(t, e, n, r) {
          for (var s = -1, o = t.length, a = -1, c = n.length, d = -1, I = e.length, T = it(o - c, 0), R = _(T + I), m = !r; ++s < T; )
            R[s] = t[s];
          for (var w = s; ++d < I; )
            R[w + d] = e[d];
          for (; ++a < c; )
            (m || s < o) && (R[w + n[a]] = t[s++]);
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
          return Vt(t, Ei(t), e);
        }
        function nc(t, e) {
          return Vt(t, Ns(t), e);
        }
        function er(t, e) {
          return function(n, r) {
            var s = P(n) ? fa : Al, o = e ? e() : {};
            return s(n, t, y(r, 2), o);
          };
        }
        function $e(t) {
          return b(function(e, n) {
            var r = -1, s = n.length, o = s > 1 ? n[s - 1] : i, a = s > 2 ? n[2] : i;
            for (o = t.length > 3 && typeof o == "function" ? (s--, o) : i, a && _t(n[0], n[1], a) && (o = s < 3 ? i : o, s = 1), e = K(e); ++r < s; ) {
              var c = n[r];
              c && t(e, c, r, o);
            }
            return e;
          });
        }
        function Rs(t, e) {
          return function(n, r) {
            if (n == null)
              return n;
            if (!St(n))
              return t(n, r);
            for (var s = n.length, o = e ? s : -1, a = K(n); (e ? o-- : ++o < s) && r(a[o], o, a) !== !1; )
              ;
            return n;
          };
        }
        function Es(t) {
          return function(e, n, r) {
            for (var s = -1, o = K(e), a = r(e), c = a.length; c--; ) {
              var d = a[t ? c : ++s];
              if (n(o[d], d, o) === !1)
                break;
            }
            return e;
          };
        }
        function rc(t, e, n) {
          var r = e & at, s = vn(t);
          function o() {
            var a = this && this !== st && this instanceof o ? s : t;
            return a.apply(r ? n : this, arguments);
          }
          return o;
        }
        function ms(t) {
          return function(e) {
            e = H(e);
            var n = Be(e) ? Yt(e) : i, r = n ? n[0] : e.charAt(0), s = n ? Se(n, 1).join("") : e.slice(1);
            return r[t]() + s;
          };
        }
        function Ke(t) {
          return function(e) {
            return Wr(Ef(Rf(e).replace(Xo, "")), t, "");
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
            var n = ze(t.prototype), r = t.apply(n, e);
            return Q(r) ? r : n;
          };
        }
        function ic(t, e, n) {
          var r = vn(t);
          function s() {
            for (var o = arguments.length, a = _(o), c = o, d = Xe(s); c--; )
              a[c] = arguments[c];
            var I = o < 3 && a[0] !== d && a[o - 1] !== d ? [] : _e(a, d);
            if (o -= I.length, o < n)
              return Os(
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
            return xt(T, this, a);
          }
          return s;
        }
        function As(t) {
          return function(e, n, r) {
            var s = K(e);
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
        function ws(t) {
          return ue(function(e) {
            var n = e.length, r = n, s = Ut.prototype.thru;
            for (t && e.reverse(); r--; ) {
              var o = e[r];
              if (typeof o != "function")
                throw new Ft(E);
              if (s && !a && sr(o) == "wrapper")
                var a = new Ut([], !0);
            }
            for (r = a ? r : n; ++r < n; ) {
              o = e[r];
              var c = sr(o), d = c == "wrapper" ? Si(o) : i;
              d && Ai(d[0]) && d[1] == ($ | vt | It | jt) && !d[4].length && d[9] == 1 ? a = a[sr(d[0])].apply(a, d[3]) : a = o.length == 1 && Ai(o) ? a[c]() : a.thru(o);
            }
            return function() {
              var I = arguments, T = I[0];
              if (a && I.length == 1 && P(T))
                return a.plant(T).value();
              for (var R = 0, m = n ? e[R].apply(this, I) : T; ++R < n; )
                m = e[R].call(this, m);
              return m;
            };
          });
        }
        function nr(t, e, n, r, s, o, a, c, d, I) {
          var T = e & $, R = e & at, m = e & wt, w = e & (vt | kt), x = e & Ne, N = m ? i : vn(t);
          function O() {
            for (var F = arguments.length, M = _(F), Ct = F; Ct--; )
              M[Ct] = arguments[Ct];
            if (w)
              var pt = Xe(O), Dt = pa(M, pt);
            if (r && (M = Ts(M, r, s, w)), o && (M = Ss(M, o, a, w)), F -= Dt, w && F < I) {
              var nt = _e(M, pt);
              return Os(
                t,
                e,
                nr,
                O.placeholder,
                n,
                M,
                nt,
                c,
                d,
                I - F
              );
            }
            var Kt = R ? n : this, ae = m ? Kt[t] : t;
            return F = M.length, c ? M = Ac(M, c) : x && F > 1 && M.reverse(), T && d < F && (M.length = d), this && this !== st && this instanceof O && (ae = N || vn(ae)), ae.apply(Kt, M);
          }
          return O;
        }
        function ys(t, e) {
          return function(n, r) {
            return Dl(n, t, e(r), {});
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
              typeof n == "string" || typeof r == "string" ? (n = Lt(n), r = Lt(r)) : (n = cs(n), r = cs(r)), s = t(n, r);
            }
            return s;
          };
        }
        function pi(t) {
          return ue(function(e) {
            return e = V(e, Ot(y())), b(function(n) {
              var r = this;
              return t(e, function(s) {
                return xt(s, r, n);
              });
            });
          });
        }
        function ir(t, e) {
          e = e === i ? " " : Lt(e);
          var n = e.length;
          if (n < 2)
            return n ? ai(e, t) : e;
          var r = ai(e, zn(t / Ge(e)));
          return Be(e) ? Se(Yt(r), 0, t).join("") : r.slice(0, t);
        }
        function uc(t, e, n, r) {
          var s = e & at, o = vn(t);
          function a() {
            for (var c = -1, d = arguments.length, I = -1, T = r.length, R = _(T + d), m = this && this !== st && this instanceof a ? o : t; ++I < T; )
              R[I] = r[I];
            for (; d--; )
              R[I++] = arguments[++c];
            return xt(m, s ? n : this, R);
          }
          return a;
        }
        function xs(t) {
          return function(e, n, r) {
            return r && typeof r != "number" && _t(e, n, r) && (n = r = i), e = oe(e), n === i ? (n = e, e = 0) : n = oe(n), r = r === i ? e < n ? 1 : -1 : oe(r), zl(e, n, r, t);
          };
        }
        function ur(t) {
          return function(e, n) {
            return typeof e == "string" && typeof n == "string" || (e = Wt(e), n = Wt(n)), t(e, n);
          };
        }
        function Os(t, e, n, r, s, o, a, c, d, I) {
          var T = e & vt, R = T ? a : i, m = T ? i : a, w = T ? o : i, x = T ? i : o;
          e |= T ? It : yt, e &= ~(T ? yt : It), e & Ee || (e &= -4);
          var N = [
            t,
            e,
            s,
            w,
            R,
            x,
            m,
            c,
            d,
            I
          ], O = n.apply(i, N);
          return Ai(t) && Ws(O, N), O.placeholder = r, Hs(O, t, e);
        }
        function vi(t) {
          var e = rt[t];
          return function(n, r) {
            if (n = Wt(n), r = r == null ? 0 : lt(D(r), 292), r && Hu(n)) {
              var s = (H(n) + "e").split("e"), o = e(s[0] + "e" + (+s[1] + r));
              return s = (H(o) + "e").split("e"), +(s[0] + "e" + (+s[1] - r));
            }
            return e(n);
          };
        }
        var sc = qe && 1 / bn(new qe([, -0]))[1] == me ? function(t) {
          return new qe(t);
        } : Gi;
        function Ls(t) {
          return function(e) {
            var n = ct(e);
            return n == Ht ? Xr(e) : n == qt ? ma(e) : _a(e, t(e));
          };
        }
        function ie(t, e, n, r, s, o, a, c) {
          var d = e & wt;
          if (!d && typeof t != "function")
            throw new Ft(E);
          var I = r ? r.length : 0;
          if (I || (e &= -97, r = s = i), a = a === i ? a : it(D(a), 0), c = c === i ? c : D(c), I -= s ? s.length : 0, e & yt) {
            var T = r, R = s;
            r = s = i;
          }
          var m = d ? i : Si(t), w = [
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
          if (m && Rc(w, m), t = w[0], e = w[1], n = w[2], r = w[3], s = w[4], c = w[9] = w[9] === i ? d ? 0 : t.length : it(w[9] - I, 0), !c && e & (vt | kt) && (e &= -25), !e || e == at)
            var x = rc(t, e, n);
          else e == vt || e == kt ? x = ic(t, e, c) : (e == It || e == (at | It)) && !s.length ? x = uc(t, e, n, r) : x = nr.apply(i, w);
          var N = m ? as : Ws;
          return Hs(N(x, w), t, e);
        }
        function Ps(t, e, n, r) {
          return t === i || $t(t, He[n]) && !Y.call(r, n) ? e : t;
        }
        function Cs(t, e, n, r, s, o) {
          return Q(t) && Q(e) && (o.set(e, t), kn(t, e, i, Cs, o), o.delete(e)), t;
        }
        function fc(t) {
          return Sn(t) ? i : t;
        }
        function Ds(t, e, n, r, s, o) {
          var a = n & Xt, c = t.length, d = e.length;
          if (c != d && !(a && d > c))
            return !1;
          var I = o.get(t), T = o.get(e);
          if (I && T)
            return I == e && T == t;
          var R = -1, m = !0, w = n & ce ? new xe() : i;
          for (o.set(t, e), o.set(e, t); ++R < c; ) {
            var x = t[R], N = e[R];
            if (r)
              var O = a ? r(N, x, R, e, t, o) : r(x, N, R, t, e, o);
            if (O !== i) {
              if (O)
                continue;
              m = !1;
              break;
            }
            if (w) {
              if (!Hr(e, function(F, M) {
                if (!sn(w, M) && (x === F || s(x, F, n, r, o)))
                  return w.push(M);
              })) {
                m = !1;
                break;
              }
            } else if (!(x === N || s(x, N, n, r, o))) {
              m = !1;
              break;
            }
          }
          return o.delete(t), o.delete(e), m;
        }
        function oc(t, e, n, r, s, o, a) {
          switch (n) {
            case Fe:
              if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
                return !1;
              t = t.buffer, e = e.buffer;
            case un:
              return !(t.byteLength != e.byteLength || !o(new Wn(t), new Wn(e)));
            case ke:
            case je:
            case tn:
              return $t(+t, +e);
            case yn:
              return t.name == e.name && t.message == e.message;
            case en:
            case nn:
              return t == e + "";
            case Ht:
              var c = Xr;
            case qt:
              var d = r & Xt;
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
          var a = n & Xt, c = Ii(t), d = c.length, I = Ii(e), T = I.length;
          if (d != T && !a)
            return !1;
          for (var R = d; R--; ) {
            var m = c[R];
            if (!(a ? m in e : Y.call(e, m)))
              return !1;
          }
          var w = o.get(t), x = o.get(e);
          if (w && x)
            return w == e && x == t;
          var N = !0;
          o.set(t, e), o.set(e, t);
          for (var O = a; ++R < d; ) {
            m = c[R];
            var F = t[m], M = e[m];
            if (r)
              var Ct = a ? r(M, F, m, e, t, o) : r(F, M, m, t, e, o);
            if (!(Ct === i ? F === M || s(F, M, n, r, o) : Ct)) {
              N = !1;
              break;
            }
            O || (O = m == "constructor");
          }
          if (N && !O) {
            var pt = t.constructor, Dt = e.constructor;
            pt != Dt && "constructor" in t && "constructor" in e && !(typeof pt == "function" && pt instanceof pt && typeof Dt == "function" && Dt instanceof Dt) && (N = !1);
          }
          return o.delete(t), o.delete(e), N;
        }
        function ue(t) {
          return yi(Bs(t, i, Xs), t + "");
        }
        function Ii(t) {
          return ku(t, ut, Ei);
        }
        function Ti(t) {
          return ku(t, Rt, Ns);
        }
        var Si = Kn ? function(t) {
          return Kn.get(t);
        } : Gi;
        function sr(t) {
          for (var e = t.name + "", n = Ye[e], r = Y.call(Ye, e) ? n.length : 0; r--; ) {
            var s = n[r], o = s.func;
            if (o == null || o == t)
              return s.name;
          }
          return e;
        }
        function Xe(t) {
          var e = Y.call(f, "placeholder") ? f : t;
          return e.placeholder;
        }
        function y() {
          var t = f.iteratee || Mi;
          return t = t === Mi ? es : t, arguments.length ? t(arguments[0], arguments[1]) : t;
        }
        function fr(t, e) {
          var n = t.__data__;
          return vc(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
        }
        function Ri(t) {
          for (var e = ut(t), n = e.length; n--; ) {
            var r = e[n], s = t[r];
            e[n] = [r, s, Us(s)];
          }
          return e;
        }
        function Pe(t, e) {
          var n = Sa(t, e);
          return ts(n) ? n : i;
        }
        function lc(t) {
          var e = Y.call(t, we), n = t[we];
          try {
            t[we] = i;
            var r = !0;
          } catch {
          }
          var s = Bn.call(t);
          return r && (e ? t[we] = n : delete t[we]), s;
        }
        var Ei = Jr ? function(t) {
          return t == null ? [] : (t = K(t), ge(Jr(t), function(e) {
            return Gu.call(t, e);
          }));
        } : Wi, Ns = Jr ? function(t) {
          for (var e = []; t; )
            de(e, Ei(t)), t = Hn(t);
          return e;
        } : Wi, ct = dt;
        (Vr && ct(new Vr(new ArrayBuffer(1))) != Fe || on && ct(new on()) != Ht || Qr && ct(Qr.resolve()) != Ji || qe && ct(new qe()) != qt || an && ct(new an()) != rn) && (ct = function(t) {
          var e = dt(t), n = e == te ? t.constructor : i, r = n ? Ce(n) : "";
          if (r)
            switch (r) {
              case Ka:
                return Fe;
              case Xa:
                return Ht;
              case Za:
                return Ji;
              case Ja:
                return qt;
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
                e = lt(e, t + a);
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
        function bs(t, e, n) {
          e = Te(e, t);
          for (var r = -1, s = e.length, o = !1; ++r < s; ) {
            var a = Qt(e[r]);
            if (!(o = t != null && n(t, a)))
              break;
            t = t[a];
          }
          return o || ++r != s ? o : (s = t == null ? 0 : t.length, !!s && dr(s) && se(a, s) && (P(t) || De(t)));
        }
        function gc(t) {
          var e = t.length, n = new t.constructor(e);
          return e && typeof t[0] == "string" && Y.call(t, "index") && (n.index = t.index, n.input = t.input), n;
        }
        function Fs(t) {
          return typeof t.constructor == "function" && !In(t) ? ze(Hn(t)) : {};
        }
        function dc(t, e, n) {
          var r = t.constructor;
          switch (e) {
            case un:
              return _i(t);
            case ke:
            case je:
              return new r(+t);
            case Fe:
              return Ql(t, n);
            case Rr:
            case Er:
            case mr:
            case Ar:
            case wr:
            case yr:
            case xr:
            case Or:
            case Lr:
              return vs(t, n);
            case Ht:
              return new r();
            case tn:
            case nn:
              return new r(t);
            case en:
              return kl(t);
            case qt:
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
          return P(t) || De(t) || !!(Wu && t && t[Wu]);
        }
        function se(t, e) {
          var n = typeof t;
          return e = e ?? he, !!e && (n == "number" || n != "symbol" && Oo.test(t)) && t > -1 && t % 1 == 0 && t < e;
        }
        function _t(t, e, n) {
          if (!Q(n))
            return !1;
          var r = typeof e;
          return (r == "number" ? St(n) && se(e, n.length) : r == "string" && e in n) ? $t(n[e], t) : !1;
        }
        function mi(t, e) {
          if (P(t))
            return !1;
          var n = typeof t;
          return n == "number" || n == "symbol" || n == "boolean" || t == null || Pt(t) ? !0 : ho.test(t) || !co.test(t) || e != null && t in K(e);
        }
        function vc(t) {
          var e = typeof t;
          return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
        }
        function Ai(t) {
          var e = sr(t), n = f[e];
          if (typeof n != "function" || !(e in U.prototype))
            return !1;
          if (t === n)
            return !0;
          var r = Si(n);
          return !!r && t === r[0];
        }
        function Ic(t) {
          return !!Uu && Uu in t;
        }
        var Tc = Un ? fe : Hi;
        function In(t) {
          var e = t && t.constructor, n = typeof e == "function" && e.prototype || He;
          return t === n;
        }
        function Us(t) {
          return t === t && !Q(t);
        }
        function Ms(t, e) {
          return function(n) {
            return n == null ? !1 : n[t] === e && (e !== i || t in K(n));
          };
        }
        function Sc(t) {
          var e = hr(t, function(r) {
            return n.size === G && n.clear(), r;
          }), n = e.cache;
          return e;
        }
        function Rc(t, e) {
          var n = t[1], r = e[1], s = n | r, o = s < (at | wt | $), a = r == $ && n == vt || r == $ && n == jt && t[7].length <= e[8] || r == ($ | jt) && e[7].length <= e[8] && n == vt;
          if (!(o || a))
            return t;
          r & at && (t[2] = e[2], s |= n & at ? 0 : Ee);
          var c = e[3];
          if (c) {
            var d = t[3];
            t[3] = d ? Ts(d, c, e[4]) : c, t[4] = d ? _e(t[3], z) : e[4];
          }
          return c = e[5], c && (d = t[5], t[5] = d ? Ss(d, c, e[6]) : c, t[6] = d ? _e(t[5], z) : e[6]), c = e[7], c && (t[7] = c), r & $ && (t[8] = t[8] == null ? e[8] : lt(t[8], e[8])), t[9] == null && (t[9] = e[9]), t[0] = e[0], t[1] = s, t;
        }
        function Ec(t) {
          var e = [];
          if (t != null)
            for (var n in K(t))
              e.push(n);
          return e;
        }
        function mc(t) {
          return Bn.call(t);
        }
        function Bs(t, e, n) {
          return e = it(e === i ? t.length - 1 : e, 0), function() {
            for (var r = arguments, s = -1, o = it(r.length - e, 0), a = _(o); ++s < o; )
              a[s] = r[e + s];
            s = -1;
            for (var c = _(e + 1); ++s < e; )
              c[s] = r[s];
            return c[e] = n(a), xt(t, this, c);
          };
        }
        function Gs(t, e) {
          return e.length < 2 ? t : Le(t, Bt(e, 0, -1));
        }
        function Ac(t, e) {
          for (var n = t.length, r = lt(e.length, n), s = Tt(t); r--; ) {
            var o = e[r];
            t[r] = se(o, n) ? s[o] : i;
          }
          return t;
        }
        function wi(t, e) {
          if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
            return t[e];
        }
        var Ws = qs(as), Tn = Ga || function(t, e) {
          return st.setTimeout(t, e);
        }, yi = qs(Xl);
        function Hs(t, e, n) {
          var r = e + "";
          return yi(t, _c(r, wc(hc(r), n)));
        }
        function qs(t) {
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
            var o = oi(n, s), a = t[o];
            t[o] = t[n], t[n] = a;
          }
          return t.length = e, t;
        }
        var Ys = Sc(function(t) {
          var e = [];
          return t.charCodeAt(0) === 46 && e.push(""), t.replace(go, function(n, r, s, o) {
            e.push(s ? o.replace(Eo, "$1") : r || n);
          }), e;
        });
        function Qt(t) {
          if (typeof t == "string" || Pt(t))
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
          return bt(Qf, function(n) {
            var r = "_." + n[0];
            e & n[1] && !Dn(t, r) && t.push(r);
          }), t.sort();
        }
        function zs(t) {
          if (t instanceof U)
            return t.clone();
          var e = new Ut(t.__wrapped__, t.__chain__);
          return e.__actions__ = Tt(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e;
        }
        function yc(t, e, n) {
          (n ? _t(t, e, n) : e === i) ? e = 1 : e = it(D(e), 0);
          var r = t == null ? 0 : t.length;
          if (!r || e < 1)
            return [];
          for (var s = 0, o = 0, a = _(zn(r / e)); s < r; )
            a[o++] = Bt(t, s, s += e);
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
          return de(P(n) ? Tt(n) : [n], ft(e, 1));
        }
        var Lc = b(function(t, e) {
          return et(t) ? gn(t, ft(e, 1, et, !0)) : [];
        }), Pc = b(function(t, e) {
          var n = Gt(e);
          return et(n) && (n = i), et(t) ? gn(t, ft(e, 1, et, !0), y(n, 2)) : [];
        }), Cc = b(function(t, e) {
          var n = Gt(e);
          return et(n) && (n = i), et(t) ? gn(t, ft(e, 1, et, !0), i, n) : [];
        });
        function Dc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : D(e), Bt(t, e < 0 ? 0 : e, r)) : [];
        }
        function Nc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : D(e), e = r - e, Bt(t, 0, e < 0 ? 0 : e)) : [];
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
        function $s(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = n == null ? 0 : D(n);
          return s < 0 && (s = it(r + s, 0)), Nn(t, y(e, 3), s);
        }
        function Ks(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = r - 1;
          return n !== i && (s = D(n), s = n < 0 ? it(r + s, 0) : lt(s, r - 1)), Nn(t, y(e, 3), s, !0);
        }
        function Xs(t) {
          var e = t == null ? 0 : t.length;
          return e ? ft(t, 1) : [];
        }
        function Mc(t) {
          var e = t == null ? 0 : t.length;
          return e ? ft(t, me) : [];
        }
        function Bc(t, e) {
          var n = t == null ? 0 : t.length;
          return n ? (e = e === i ? 1 : D(e), ft(t, e)) : [];
        }
        function Gc(t) {
          for (var e = -1, n = t == null ? 0 : t.length, r = {}; ++e < n; ) {
            var s = t[e];
            r[s[0]] = s[1];
          }
          return r;
        }
        function Zs(t) {
          return t && t.length ? t[0] : i;
        }
        function Wc(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = n == null ? 0 : D(n);
          return s < 0 && (s = it(r + s, 0)), Me(t, e, s);
        }
        function Hc(t) {
          var e = t == null ? 0 : t.length;
          return e ? Bt(t, 0, -1) : [];
        }
        var qc = b(function(t) {
          var e = V(t, gi);
          return e.length && e[0] === t[0] ? ri(e) : [];
        }), Yc = b(function(t) {
          var e = Gt(t), n = V(t, gi);
          return e === Gt(n) ? e = i : n.pop(), n.length && n[0] === t[0] ? ri(n, y(e, 2)) : [];
        }), zc = b(function(t) {
          var e = Gt(t), n = V(t, gi);
          return e = typeof e == "function" ? e : i, e && n.pop(), n.length && n[0] === t[0] ? ri(n, i, e) : [];
        });
        function $c(t, e) {
          return t == null ? "" : Ha.call(t, e);
        }
        function Gt(t) {
          var e = t == null ? 0 : t.length;
          return e ? t[e - 1] : i;
        }
        function Kc(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = r;
          return n !== i && (s = D(n), s = s < 0 ? it(r + s, 0) : lt(s, r - 1)), e === e ? wa(t, e, s) : Nn(t, Ou, s, !0);
        }
        function Xc(t, e) {
          return t && t.length ? us(t, D(e)) : i;
        }
        var Zc = b(Js);
        function Js(t, e) {
          return t && t.length && e && e.length ? fi(t, e) : t;
        }
        function Jc(t, e, n) {
          return t && t.length && e && e.length ? fi(t, e, y(n, 2)) : t;
        }
        function Vc(t, e, n) {
          return t && t.length && e && e.length ? fi(t, e, i, n) : t;
        }
        var Qc = ue(function(t, e) {
          var n = t == null ? 0 : t.length, r = jr(t, e);
          return os(t, V(e, function(s) {
            return se(s, n) ? +s : s;
          }).sort(Is)), r;
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
          return os(t, s), n;
        }
        function xi(t) {
          return t == null ? t : $a.call(t);
        }
        function jc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (n && typeof n != "number" && _t(t, e, n) ? (e = 0, n = r) : (e = e == null ? 0 : D(e), n = n === i ? r : D(n)), Bt(t, e, n)) : [];
        }
        function th(t, e) {
          return jn(t, e);
        }
        function eh(t, e, n) {
          return li(t, e, y(n, 2));
        }
        function nh(t, e) {
          var n = t == null ? 0 : t.length;
          if (n) {
            var r = jn(t, e);
            if (r < n && $t(t[r], e))
              return r;
          }
          return -1;
        }
        function rh(t, e) {
          return jn(t, e, !0);
        }
        function ih(t, e, n) {
          return li(t, e, y(n, 2), !0);
        }
        function uh(t, e) {
          var n = t == null ? 0 : t.length;
          if (n) {
            var r = jn(t, e, !0) - 1;
            if ($t(t[r], e))
              return r;
          }
          return -1;
        }
        function sh(t) {
          return t && t.length ? ls(t) : [];
        }
        function fh(t, e) {
          return t && t.length ? ls(t, y(e, 2)) : [];
        }
        function oh(t) {
          var e = t == null ? 0 : t.length;
          return e ? Bt(t, 1, e) : [];
        }
        function ah(t, e, n) {
          return t && t.length ? (e = n || e === i ? 1 : D(e), Bt(t, 0, e < 0 ? 0 : e)) : [];
        }
        function lh(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : D(e), e = r - e, Bt(t, e < 0 ? 0 : e, r)) : [];
        }
        function ch(t, e) {
          return t && t.length ? tr(t, y(e, 3), !1, !0) : [];
        }
        function hh(t, e) {
          return t && t.length ? tr(t, y(e, 3)) : [];
        }
        var gh = b(function(t) {
          return Ie(ft(t, 1, et, !0));
        }), dh = b(function(t) {
          var e = Gt(t);
          return et(e) && (e = i), Ie(ft(t, 1, et, !0), y(e, 2));
        }), _h = b(function(t) {
          var e = Gt(t);
          return e = typeof e == "function" ? e : i, Ie(ft(t, 1, et, !0), i, e);
        });
        function ph(t) {
          return t && t.length ? Ie(t) : [];
        }
        function vh(t, e) {
          return t && t.length ? Ie(t, y(e, 2)) : [];
        }
        function Ih(t, e) {
          return e = typeof e == "function" ? e : i, t && t.length ? Ie(t, i, e) : [];
        }
        function Oi(t) {
          if (!(t && t.length))
            return [];
          var e = 0;
          return t = ge(t, function(n) {
            if (et(n))
              return e = it(n.length, e), !0;
          }), $r(e, function(n) {
            return V(t, qr(n));
          });
        }
        function Vs(t, e) {
          if (!(t && t.length))
            return [];
          var n = Oi(t);
          return e == null ? n : V(n, function(r) {
            return xt(e, i, r);
          });
        }
        var Th = b(function(t, e) {
          return et(t) ? gn(t, e) : [];
        }), Sh = b(function(t) {
          return hi(ge(t, et));
        }), Rh = b(function(t) {
          var e = Gt(t);
          return et(e) && (e = i), hi(ge(t, et), y(e, 2));
        }), Eh = b(function(t) {
          var e = Gt(t);
          return e = typeof e == "function" ? e : i, hi(ge(t, et), i, e);
        }), mh = b(Oi);
        function Ah(t, e) {
          return ds(t || [], e || [], hn);
        }
        function wh(t, e) {
          return ds(t || [], e || [], pn);
        }
        var yh = b(function(t) {
          var e = t.length, n = e > 1 ? t[e - 1] : i;
          return n = typeof n == "function" ? (t.pop(), n) : i, Vs(t, n);
        });
        function Qs(t) {
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
            return jr(o, t);
          };
          return e > 1 || this.__actions__.length || !(r instanceof U) || !se(n) ? this.thru(s) : (r = r.slice(n, +n + (e ? 1 : 0)), r.__actions__.push({
            func: ar,
            args: [s],
            thisArg: i
          }), new Ut(r, this.__chain__).thru(function(o) {
            return e && !o.length && o.push(i), o;
          }));
        });
        function Lh() {
          return Qs(this);
        }
        function Ph() {
          return new Ut(this.value(), this.__chain__);
        }
        function Ch() {
          this.__values__ === i && (this.__values__ = hf(this.value()));
          var t = this.__index__ >= this.__values__.length, e = t ? i : this.__values__[this.__index__++];
          return { done: t, value: e };
        }
        function Dh() {
          return this;
        }
        function Nh(t) {
          for (var e, n = this; n instanceof Zn; ) {
            var r = zs(n);
            r.__index__ = 0, r.__values__ = i, e ? s.__wrapped__ = r : e = r;
            var s = r;
            n = n.__wrapped__;
          }
          return s.__wrapped__ = t, e;
        }
        function bh() {
          var t = this.__wrapped__;
          if (t instanceof U) {
            var e = t;
            return this.__actions__.length && (e = new U(this)), e = e.reverse(), e.__actions__.push({
              func: ar,
              args: [xi],
              thisArg: i
            }), new Ut(e, this.__chain__);
          }
          return this.thru(xi);
        }
        function Fh() {
          return gs(this.__wrapped__, this.__actions__);
        }
        var Uh = er(function(t, e, n) {
          Y.call(t, n) ? ++t[n] : re(t, n, 1);
        });
        function Mh(t, e, n) {
          var r = P(t) ? yu : xl;
          return n && _t(t, e, n) && (e = i), r(t, y(e, 3));
        }
        function Bh(t, e) {
          var n = P(t) ? ge : Vu;
          return n(t, y(e, 3));
        }
        var Gh = As($s), Wh = As(Ks);
        function Hh(t, e) {
          return ft(lr(t, e), 1);
        }
        function qh(t, e) {
          return ft(lr(t, e), me);
        }
        function Yh(t, e, n) {
          return n = n === i ? 1 : D(n), ft(lr(t, e), n);
        }
        function ks(t, e) {
          var n = P(t) ? bt : ve;
          return n(t, y(e, 3));
        }
        function js(t, e) {
          var n = P(t) ? oa : Ju;
          return n(t, y(e, 3));
        }
        var zh = er(function(t, e, n) {
          Y.call(t, n) ? t[n].push(e) : re(t, n, [e]);
        });
        function $h(t, e, n, r) {
          t = St(t) ? t : Je(t), n = n && !r ? D(n) : 0;
          var s = t.length;
          return n < 0 && (n = it(s + n, 0)), _r(t) ? n <= s && t.indexOf(e, n) > -1 : !!s && Me(t, e, n) > -1;
        }
        var Kh = b(function(t, e, n) {
          var r = -1, s = typeof e == "function", o = St(t) ? _(t.length) : [];
          return ve(t, function(a) {
            o[++r] = s ? xt(e, a, n) : dn(a, e, n);
          }), o;
        }), Xh = er(function(t, e, n) {
          re(t, n, e);
        });
        function lr(t, e) {
          var n = P(t) ? V : ns;
          return n(t, y(e, 3));
        }
        function Zh(t, e, n, r) {
          return t == null ? [] : (P(e) || (e = e == null ? [] : [e]), n = r ? i : n, P(n) || (n = n == null ? [] : [n]), ss(t, e, n));
        }
        var Jh = er(function(t, e, n) {
          t[n ? 0 : 1].push(e);
        }, function() {
          return [[], []];
        });
        function Vh(t, e, n) {
          var r = P(t) ? Wr : Pu, s = arguments.length < 3;
          return r(t, y(e, 4), n, s, ve);
        }
        function Qh(t, e, n) {
          var r = P(t) ? aa : Pu, s = arguments.length < 3;
          return r(t, y(e, 4), n, s, Ju);
        }
        function kh(t, e) {
          var n = P(t) ? ge : Vu;
          return n(t, gr(y(e, 3)));
        }
        function jh(t) {
          var e = P(t) ? $u : $l;
          return e(t);
        }
        function tg(t, e, n) {
          (n ? _t(t, e, n) : e === i) ? e = 1 : e = D(e);
          var r = P(t) ? El : Kl;
          return r(t, e);
        }
        function eg(t) {
          var e = P(t) ? ml : Zl;
          return e(t);
        }
        function ng(t) {
          if (t == null)
            return 0;
          if (St(t))
            return _r(t) ? Ge(t) : t.length;
          var e = ct(t);
          return e == Ht || e == qt ? t.size : ui(t).length;
        }
        function rg(t, e, n) {
          var r = P(t) ? Hr : Jl;
          return n && _t(t, e, n) && (e = i), r(t, y(e, 3));
        }
        var ig = b(function(t, e) {
          if (t == null)
            return [];
          var n = e.length;
          return n > 1 && _t(t, e[0], e[1]) ? e = [] : n > 2 && _t(e[0], e[1], e[2]) && (e = [e[0]]), ss(t, ft(e, 1), []);
        }), cr = Ba || function() {
          return st.Date.now();
        };
        function ug(t, e) {
          if (typeof e != "function")
            throw new Ft(E);
          return t = D(t), function() {
            if (--t < 1)
              return e.apply(this, arguments);
          };
        }
        function tf(t, e, n) {
          return e = n ? i : e, e = t && e == null ? t.length : e, ie(t, $, i, i, i, i, e);
        }
        function ef(t, e) {
          var n;
          if (typeof e != "function")
            throw new Ft(E);
          return t = D(t), function() {
            return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = i), n;
          };
        }
        var Li = b(function(t, e, n) {
          var r = at;
          if (n.length) {
            var s = _e(n, Xe(Li));
            r |= It;
          }
          return ie(t, r, e, n, s);
        }), nf = b(function(t, e, n) {
          var r = at | wt;
          if (n.length) {
            var s = _e(n, Xe(nf));
            r |= It;
          }
          return ie(e, r, t, n, s);
        });
        function rf(t, e, n) {
          e = n ? i : e;
          var r = ie(t, vt, i, i, i, i, i, e);
          return r.placeholder = rf.placeholder, r;
        }
        function uf(t, e, n) {
          e = n ? i : e;
          var r = ie(t, kt, i, i, i, i, i, e);
          return r.placeholder = uf.placeholder, r;
        }
        function sf(t, e, n) {
          var r, s, o, a, c, d, I = 0, T = !1, R = !1, m = !0;
          if (typeof t != "function")
            throw new Ft(E);
          e = Wt(e) || 0, Q(n) && (T = !!n.leading, R = "maxWait" in n, o = R ? it(Wt(n.maxWait) || 0, e) : o, m = "trailing" in n ? !!n.trailing : m);
          function w(nt) {
            var Kt = r, ae = s;
            return r = s = i, I = nt, a = t.apply(ae, Kt), a;
          }
          function x(nt) {
            return I = nt, c = Tn(F, e), T ? w(nt) : a;
          }
          function N(nt) {
            var Kt = nt - d, ae = nt - I, wf = e - Kt;
            return R ? lt(wf, o - ae) : wf;
          }
          function O(nt) {
            var Kt = nt - d, ae = nt - I;
            return d === i || Kt >= e || Kt < 0 || R && ae >= o;
          }
          function F() {
            var nt = cr();
            if (O(nt))
              return M(nt);
            c = Tn(F, N(nt));
          }
          function M(nt) {
            return c = i, m && r ? w(nt) : (r = s = i, a);
          }
          function Ct() {
            c !== i && _s(c), I = 0, r = d = s = c = i;
          }
          function pt() {
            return c === i ? a : M(cr());
          }
          function Dt() {
            var nt = cr(), Kt = O(nt);
            if (r = arguments, s = this, d = nt, Kt) {
              if (c === i)
                return x(d);
              if (R)
                return _s(c), c = Tn(F, e), w(d);
            }
            return c === i && (c = Tn(F, e)), a;
          }
          return Dt.cancel = Ct, Dt.flush = pt, Dt;
        }
        var sg = b(function(t, e) {
          return Zu(t, 1, e);
        }), fg = b(function(t, e, n) {
          return Zu(t, Wt(e) || 0, n);
        });
        function og(t) {
          return ie(t, Ne);
        }
        function hr(t, e) {
          if (typeof t != "function" || e != null && typeof e != "function")
            throw new Ft(E);
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
            throw new Ft(E);
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
          return ef(2, t);
        }
        var lg = Vl(function(t, e) {
          e = e.length == 1 && P(e[0]) ? V(e[0], Ot(y())) : V(ft(e, 1), Ot(y()));
          var n = e.length;
          return b(function(r) {
            for (var s = -1, o = lt(r.length, n); ++s < o; )
              r[s] = e[s].call(this, r[s]);
            return xt(t, this, r);
          });
        }), Pi = b(function(t, e) {
          var n = _e(e, Xe(Pi));
          return ie(t, It, i, e, n);
        }), ff = b(function(t, e) {
          var n = _e(e, Xe(ff));
          return ie(t, yt, i, e, n);
        }), cg = ue(function(t, e) {
          return ie(t, jt, i, i, i, e);
        });
        function hg(t, e) {
          if (typeof t != "function")
            throw new Ft(E);
          return e = e === i ? e : D(e), b(t, e);
        }
        function gg(t, e) {
          if (typeof t != "function")
            throw new Ft(E);
          return e = e == null ? 0 : it(D(e), 0), b(function(n) {
            var r = n[e], s = Se(n, 0, e);
            return r && de(s, r), xt(t, this, s);
          });
        }
        function dg(t, e, n) {
          var r = !0, s = !0;
          if (typeof t != "function")
            throw new Ft(E);
          return Q(n) && (r = "leading" in n ? !!n.leading : r, s = "trailing" in n ? !!n.trailing : s), sf(t, e, {
            leading: r,
            maxWait: e,
            trailing: s
          });
        }
        function _g(t) {
          return tf(t, 1);
        }
        function pg(t, e) {
          return Pi(di(e), t);
        }
        function vg() {
          if (!arguments.length)
            return [];
          var t = arguments[0];
          return P(t) ? t : [t];
        }
        function Ig(t) {
          return Mt(t, At);
        }
        function Tg(t, e) {
          return e = typeof e == "function" ? e : i, Mt(t, At, e);
        }
        function Sg(t) {
          return Mt(t, q | At);
        }
        function Rg(t, e) {
          return e = typeof e == "function" ? e : i, Mt(t, q | At, e);
        }
        function Eg(t, e) {
          return e == null || Xu(t, e, ut(e));
        }
        function $t(t, e) {
          return t === e || t !== t && e !== e;
        }
        var mg = ur(ni), Ag = ur(function(t, e) {
          return t >= e;
        }), De = ju(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? ju : function(t) {
          return tt(t) && Y.call(t, "callee") && !Gu.call(t, "callee");
        }, P = _.isArray, wg = Su ? Ot(Su) : Nl;
        function St(t) {
          return t != null && dr(t.length) && !fe(t);
        }
        function et(t) {
          return tt(t) && St(t);
        }
        function yg(t) {
          return t === !0 || t === !1 || tt(t) && dt(t) == ke;
        }
        var Re = Wa || Hi, xg = Ru ? Ot(Ru) : bl;
        function Og(t) {
          return tt(t) && t.nodeType === 1 && !Sn(t);
        }
        function Lg(t) {
          if (t == null)
            return !0;
          if (St(t) && (P(t) || typeof t == "string" || typeof t.splice == "function" || Re(t) || Ze(t) || De(t)))
            return !t.length;
          var e = ct(t);
          if (e == Ht || e == qt)
            return !t.size;
          if (In(t))
            return !ui(t).length;
          for (var n in t)
            if (Y.call(t, n))
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
        function Ci(t) {
          if (!tt(t))
            return !1;
          var e = dt(t);
          return e == yn || e == jf || typeof t.message == "string" && typeof t.name == "string" && !Sn(t);
        }
        function Dg(t) {
          return typeof t == "number" && Hu(t);
        }
        function fe(t) {
          if (!Q(t))
            return !1;
          var e = dt(t);
          return e == xn || e == Zi || e == kf || e == eo;
        }
        function of(t) {
          return typeof t == "number" && t == D(t);
        }
        function dr(t) {
          return typeof t == "number" && t > -1 && t % 1 == 0 && t <= he;
        }
        function Q(t) {
          var e = typeof t;
          return t != null && (e == "object" || e == "function");
        }
        function tt(t) {
          return t != null && typeof t == "object";
        }
        var af = Eu ? Ot(Eu) : Ul;
        function Ng(t, e) {
          return t === e || ii(t, e, Ri(e));
        }
        function bg(t, e, n) {
          return n = typeof n == "function" ? n : i, ii(t, e, Ri(e), n);
        }
        function Fg(t) {
          return lf(t) && t != +t;
        }
        function Ug(t) {
          if (Tc(t))
            throw new L(S);
          return ts(t);
        }
        function Mg(t) {
          return t === null;
        }
        function Bg(t) {
          return t == null;
        }
        function lf(t) {
          return typeof t == "number" || tt(t) && dt(t) == tn;
        }
        function Sn(t) {
          if (!tt(t) || dt(t) != te)
            return !1;
          var e = Hn(t);
          if (e === null)
            return !0;
          var n = Y.call(e, "constructor") && e.constructor;
          return typeof n == "function" && n instanceof n && Mn.call(n) == ba;
        }
        var Di = mu ? Ot(mu) : Ml;
        function Gg(t) {
          return of(t) && t >= -he && t <= he;
        }
        var cf = Au ? Ot(Au) : Bl;
        function _r(t) {
          return typeof t == "string" || !P(t) && tt(t) && dt(t) == nn;
        }
        function Pt(t) {
          return typeof t == "symbol" || tt(t) && dt(t) == On;
        }
        var Ze = wu ? Ot(wu) : Gl;
        function Wg(t) {
          return t === i;
        }
        function Hg(t) {
          return tt(t) && ct(t) == rn;
        }
        function qg(t) {
          return tt(t) && dt(t) == ro;
        }
        var Yg = ur(si), zg = ur(function(t, e) {
          return t <= e;
        });
        function hf(t) {
          if (!t)
            return [];
          if (St(t))
            return _r(t) ? Yt(t) : Tt(t);
          if (fn && t[fn])
            return Ea(t[fn]());
          var e = ct(t), n = e == Ht ? Xr : e == qt ? bn : Je;
          return n(t);
        }
        function oe(t) {
          if (!t)
            return t === 0 ? t : 0;
          if (t = Wt(t), t === me || t === -me) {
            var e = t < 0 ? -1 : 1;
            return e * Zf;
          }
          return t === t ? t : 0;
        }
        function D(t) {
          var e = oe(t), n = e % 1;
          return e === e ? n ? e - n : e : 0;
        }
        function gf(t) {
          return t ? Oe(D(t), 0, Zt) : 0;
        }
        function Wt(t) {
          if (typeof t == "number")
            return t;
          if (Pt(t))
            return An;
          if (Q(t)) {
            var e = typeof t.valueOf == "function" ? t.valueOf() : t;
            t = Q(e) ? e + "" : e;
          }
          if (typeof t != "string")
            return t === 0 ? t : +t;
          t = Cu(t);
          var n = wo.test(t);
          return n || xo.test(t) ? ua(t.slice(2), n ? 2 : 8) : Ao.test(t) ? An : +t;
        }
        function df(t) {
          return Vt(t, Rt(t));
        }
        function $g(t) {
          return t ? Oe(D(t), -he, he) : t === 0 ? t : 0;
        }
        function H(t) {
          return t == null ? "" : Lt(t);
        }
        var Kg = $e(function(t, e) {
          if (In(e) || St(e)) {
            Vt(e, ut(e), t);
            return;
          }
          for (var n in e)
            Y.call(e, n) && hn(t, n, e[n]);
        }), _f = $e(function(t, e) {
          Vt(e, Rt(e), t);
        }), pr = $e(function(t, e, n, r) {
          Vt(e, Rt(e), t, r);
        }), Xg = $e(function(t, e, n, r) {
          Vt(e, ut(e), t, r);
        }), Zg = ue(jr);
        function Jg(t, e) {
          var n = ze(t);
          return e == null ? n : Ku(n, e);
        }
        var Vg = b(function(t, e) {
          t = K(t);
          var n = -1, r = e.length, s = r > 2 ? e[2] : i;
          for (s && _t(e[0], e[1], s) && (r = 1); ++n < r; )
            for (var o = e[n], a = Rt(o), c = -1, d = a.length; ++c < d; ) {
              var I = a[c], T = t[I];
              (T === i || $t(T, He[I]) && !Y.call(t, I)) && (t[I] = o[I]);
            }
          return t;
        }), Qg = b(function(t) {
          return t.push(i, Cs), xt(pf, i, t);
        });
        function kg(t, e) {
          return xu(t, y(e, 3), Jt);
        }
        function jg(t, e) {
          return xu(t, y(e, 3), ei);
        }
        function td(t, e) {
          return t == null ? t : ti(t, y(e, 3), Rt);
        }
        function ed(t, e) {
          return t == null ? t : Qu(t, y(e, 3), Rt);
        }
        function nd(t, e) {
          return t && Jt(t, y(e, 3));
        }
        function rd(t, e) {
          return t && ei(t, y(e, 3));
        }
        function id(t) {
          return t == null ? [] : Qn(t, ut(t));
        }
        function ud(t) {
          return t == null ? [] : Qn(t, Rt(t));
        }
        function Ni(t, e, n) {
          var r = t == null ? i : Le(t, e);
          return r === i ? n : r;
        }
        function sd(t, e) {
          return t != null && bs(t, e, Ll);
        }
        function bi(t, e) {
          return t != null && bs(t, e, Pl);
        }
        var fd = ys(function(t, e, n) {
          e != null && typeof e.toString != "function" && (e = Bn.call(e)), t[e] = n;
        }, Ui(Et)), od = ys(function(t, e, n) {
          e != null && typeof e.toString != "function" && (e = Bn.call(e)), Y.call(t, e) ? t[e].push(n) : t[e] = [n];
        }, y), ad = b(dn);
        function ut(t) {
          return St(t) ? zu(t) : ui(t);
        }
        function Rt(t) {
          return St(t) ? zu(t, !0) : Wl(t);
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
        var hd = $e(function(t, e, n) {
          kn(t, e, n);
        }), pf = $e(function(t, e, n, r) {
          kn(t, e, n, r);
        }), gd = ue(function(t, e) {
          var n = {};
          if (t == null)
            return n;
          var r = !1;
          e = V(e, function(o) {
            return o = Te(o, t), r || (r = o.length > 1), o;
          }), Vt(t, Ti(t), n), r && (n = Mt(n, q | gt | At, fc));
          for (var s = e.length; s--; )
            ci(n, e[s]);
          return n;
        });
        function dd(t, e) {
          return vf(t, gr(y(e)));
        }
        var _d = ue(function(t, e) {
          return t == null ? {} : ql(t, e);
        });
        function vf(t, e) {
          if (t == null)
            return {};
          var n = V(Ti(t), function(r) {
            return [r];
          });
          return e = y(e), fs(t, n, function(r, s) {
            return e(r, s[0]);
          });
        }
        function pd(t, e, n) {
          e = Te(e, t);
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
        var If = Ls(ut), Tf = Ls(Rt);
        function Td(t, e, n) {
          var r = P(t), s = r || Re(t) || Ze(t);
          if (e = y(e, 4), n == null) {
            var o = t && t.constructor;
            s ? n = r ? new o() : [] : Q(t) ? n = fe(o) ? ze(Hn(t)) : {} : n = {};
          }
          return (s ? bt : Jt)(t, function(a, c, d) {
            return e(n, a, c, d);
          }), n;
        }
        function Sd(t, e) {
          return t == null ? !0 : ci(t, e);
        }
        function Rd(t, e, n) {
          return t == null ? t : hs(t, e, di(n));
        }
        function Ed(t, e, n, r) {
          return r = typeof r == "function" ? r : i, t == null ? t : hs(t, e, di(n), r);
        }
        function Je(t) {
          return t == null ? [] : Kr(t, ut(t));
        }
        function md(t) {
          return t == null ? [] : Kr(t, Rt(t));
        }
        function Ad(t, e, n) {
          return n === i && (n = e, e = i), n !== i && (n = Wt(n), n = n === n ? n : 0), e !== i && (e = Wt(e), e = e === e ? e : 0), Oe(Wt(t), e, n);
        }
        function wd(t, e, n) {
          return e = oe(e), n === i ? (n = e, e = 0) : n = oe(n), t = Wt(t), Cl(t, e, n);
        }
        function yd(t, e, n) {
          if (n && typeof n != "boolean" && _t(t, e, n) && (e = n = i), n === i && (typeof e == "boolean" ? (n = e, e = i) : typeof t == "boolean" && (n = t, t = i)), t === i && e === i ? (t = 0, e = 1) : (t = oe(t), e === i ? (e = t, t = 0) : e = oe(e)), t > e) {
            var r = t;
            t = e, e = r;
          }
          if (n || t % 1 || e % 1) {
            var s = qu();
            return lt(t + s * (e - t + ia("1e-" + ((s + "").length - 1))), e);
          }
          return oi(t, e);
        }
        var xd = Ke(function(t, e, n) {
          return e = e.toLowerCase(), t + (n ? Sf(e) : e);
        });
        function Sf(t) {
          return Fi(H(t).toLowerCase());
        }
        function Rf(t) {
          return t = H(t), t && t.replace(Lo, va).replace(Zo, "");
        }
        function Od(t, e, n) {
          t = H(t), e = Lt(e);
          var r = t.length;
          n = n === i ? r : Oe(D(n), 0, r);
          var s = n;
          return n -= e.length, n >= 0 && t.slice(n, s) == e;
        }
        function Ld(t) {
          return t = H(t), t && oo.test(t) ? t.replace(Qi, Ia) : t;
        }
        function Pd(t) {
          return t = H(t), t && _o.test(t) ? t.replace(Pr, "\\$&") : t;
        }
        var Cd = Ke(function(t, e, n) {
          return t + (n ? "-" : "") + e.toLowerCase();
        }), Dd = Ke(function(t, e, n) {
          return t + (n ? " " : "") + e.toLowerCase();
        }), Nd = ms("toLowerCase");
        function bd(t, e, n) {
          t = H(t), e = D(e);
          var r = e ? Ge(t) : 0;
          if (!e || r >= e)
            return t;
          var s = (e - r) / 2;
          return ir($n(s), n) + t + ir(zn(s), n);
        }
        function Fd(t, e, n) {
          t = H(t), e = D(e);
          var r = e ? Ge(t) : 0;
          return e && r < e ? t + ir(e - r, n) : t;
        }
        function Ud(t, e, n) {
          t = H(t), e = D(e);
          var r = e ? Ge(t) : 0;
          return e && r < e ? ir(e - r, n) + t : t;
        }
        function Md(t, e, n) {
          return n || e == null ? e = 0 : e && (e = +e), za(H(t).replace(Cr, ""), e || 0);
        }
        function Bd(t, e, n) {
          return (n ? _t(t, e, n) : e === i) ? e = 1 : e = D(e), ai(H(t), e);
        }
        function Gd() {
          var t = arguments, e = H(t[0]);
          return t.length < 3 ? e : e.replace(t[1], t[2]);
        }
        var Wd = Ke(function(t, e, n) {
          return t + (n ? "_" : "") + e.toLowerCase();
        });
        function Hd(t, e, n) {
          return n && typeof n != "number" && _t(t, e, n) && (e = n = i), n = n === i ? Zt : n >>> 0, n ? (t = H(t), t && (typeof e == "string" || e != null && !Di(e)) && (e = Lt(e), !e && Be(t)) ? Se(Yt(t), 0, n) : t.split(e, n)) : [];
        }
        var qd = Ke(function(t, e, n) {
          return t + (n ? " " : "") + Fi(e);
        });
        function Yd(t, e, n) {
          return t = H(t), n = n == null ? 0 : Oe(D(n), 0, t.length), e = Lt(e), t.slice(n, n + e.length) == e;
        }
        function zd(t, e, n) {
          var r = f.templateSettings;
          n && _t(t, e, n) && (e = i), t = H(t), e = pr({}, e, r, Ps);
          var s = pr({}, e.imports, r.imports, Ps), o = ut(s), a = Kr(s, o), c, d, I = 0, T = e.interpolate || Ln, R = "__p += '", m = Zr(
            (e.escape || Ln).source + "|" + T.source + "|" + (T === ki ? mo : Ln).source + "|" + (e.evaluate || Ln).source + "|$",
            "g"
          ), w = "//# sourceURL=" + (Y.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++jo + "]") + `
`;
          t.replace(m, function(O, F, M, Ct, pt, Dt) {
            return M || (M = Ct), R += t.slice(I, Dt).replace(Po, Ta), F && (c = !0, R += `' +
__e(` + F + `) +
'`), pt && (d = !0, R += `';
` + pt + `;
__p += '`), M && (R += `' +
((__t = (` + M + `)) == null ? '' : __t) +
'`), I = Dt + O.length, O;
          }), R += `';
`;
          var x = Y.call(e, "variable") && e.variable;
          if (!x)
            R = `with (obj) {
` + R + `
}
`;
          else if (Ro.test(x))
            throw new L(C);
          R = (d ? R.replace(io, "") : R).replace(uo, "$1").replace(so, "$1;"), R = "function(" + (x || "obj") + `) {
` + (x ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (d ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + R + `return __p
}`;
          var N = mf(function() {
            return W(o, w + "return " + R).apply(i, a);
          });
          if (N.source = R, Ci(N))
            throw N;
          return N;
        }
        function $d(t) {
          return H(t).toLowerCase();
        }
        function Kd(t) {
          return H(t).toUpperCase();
        }
        function Xd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return Cu(t);
          if (!t || !(e = Lt(e)))
            return t;
          var r = Yt(t), s = Yt(e), o = Du(r, s), a = Nu(r, s) + 1;
          return Se(r, o, a).join("");
        }
        function Zd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return t.slice(0, Fu(t) + 1);
          if (!t || !(e = Lt(e)))
            return t;
          var r = Yt(t), s = Nu(r, Yt(e)) + 1;
          return Se(r, 0, s).join("");
        }
        function Jd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return t.replace(Cr, "");
          if (!t || !(e = Lt(e)))
            return t;
          var r = Yt(t), s = Du(r, Yt(e));
          return Se(r, s).join("");
        }
        function Vd(t, e) {
          var n = Sr, r = Yf;
          if (Q(e)) {
            var s = "separator" in e ? e.separator : s;
            n = "length" in e ? D(e.length) : n, r = "omission" in e ? Lt(e.omission) : r;
          }
          t = H(t);
          var o = t.length;
          if (Be(t)) {
            var a = Yt(t);
            o = a.length;
          }
          if (n >= o)
            return t;
          var c = n - Ge(r);
          if (c < 1)
            return r;
          var d = a ? Se(a, 0, c).join("") : t.slice(0, c);
          if (s === i)
            return d + r;
          if (a && (c += d.length - c), Di(s)) {
            if (t.slice(c).search(s)) {
              var I, T = d;
              for (s.global || (s = Zr(s.source, H(ji.exec(s)) + "g")), s.lastIndex = 0; I = s.exec(T); )
                var R = I.index;
              d = d.slice(0, R === i ? c : R);
            }
          } else if (t.indexOf(Lt(s), c) != c) {
            var m = d.lastIndexOf(s);
            m > -1 && (d = d.slice(0, m));
          }
          return d + r;
        }
        function Qd(t) {
          return t = H(t), t && fo.test(t) ? t.replace(Vi, ya) : t;
        }
        var kd = Ke(function(t, e, n) {
          return t + (n ? " " : "") + e.toUpperCase();
        }), Fi = ms("toUpperCase");
        function Ef(t, e, n) {
          return t = H(t), e = n ? i : e, e === i ? Ra(t) ? La(t) : ha(t) : t.match(e) || [];
        }
        var mf = b(function(t, e) {
          try {
            return xt(t, i, e);
          } catch (n) {
            return Ci(n) ? n : new L(n);
          }
        }), jd = ue(function(t, e) {
          return bt(e, function(n) {
            n = Qt(n), re(t, n, Li(t[n], t));
          }), t;
        });
        function t_(t) {
          var e = t == null ? 0 : t.length, n = y();
          return t = e ? V(t, function(r) {
            if (typeof r[1] != "function")
              throw new Ft(E);
            return [n(r[0]), r[1]];
          }) : [], b(function(r) {
            for (var s = -1; ++s < e; ) {
              var o = t[s];
              if (xt(o[0], this, r))
                return xt(o[1], this, r);
            }
          });
        }
        function e_(t) {
          return yl(Mt(t, q));
        }
        function Ui(t) {
          return function() {
            return t;
          };
        }
        function n_(t, e) {
          return t == null || t !== t ? e : t;
        }
        var r_ = ws(), i_ = ws(!0);
        function Et(t) {
          return t;
        }
        function Mi(t) {
          return es(typeof t == "function" ? t : Mt(t, q));
        }
        function u_(t) {
          return rs(Mt(t, q));
        }
        function s_(t, e) {
          return is(t, Mt(e, q));
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
        function Bi(t, e, n) {
          var r = ut(e), s = Qn(e, r);
          n == null && !(Q(e) && (s.length || !r.length)) && (n = e, e = t, t = this, s = Qn(e, ut(e)));
          var o = !(Q(n) && "chain" in n) || !!n.chain, a = fe(t);
          return bt(s, function(c) {
            var d = e[c];
            t[c] = d, a && (t.prototype[c] = function() {
              var I = this.__chain__;
              if (o || I) {
                var T = t(this.__wrapped__), R = T.__actions__ = Tt(this.__actions__);
                return R.push({ func: d, args: arguments, thisArg: t }), T.__chain__ = I, T;
              }
              return d.apply(t, de([this.value()], arguments));
            });
          }), t;
        }
        function a_() {
          return st._ === this && (st._ = Fa), this;
        }
        function Gi() {
        }
        function l_(t) {
          return t = D(t), b(function(e) {
            return us(e, t);
          });
        }
        var c_ = pi(V), h_ = pi(yu), g_ = pi(Hr);
        function Af(t) {
          return mi(t) ? qr(Qt(t)) : Yl(t);
        }
        function d_(t) {
          return function(e) {
            return t == null ? i : Le(t, e);
          };
        }
        var __ = xs(), p_ = xs(!0);
        function Wi() {
          return [];
        }
        function Hi() {
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
          if (t = D(t), t < 1 || t > he)
            return [];
          var n = Zt, r = lt(t, Zt);
          e = y(e), t -= Zt;
          for (var s = $r(r, e); ++n < t; )
            e(n);
          return s;
        }
        function R_(t) {
          return P(t) ? V(t, Qt) : Pt(t) ? [t] : Tt(Ys(H(t)));
        }
        function E_(t) {
          var e = ++Na;
          return H(t) + e;
        }
        var m_ = rr(function(t, e) {
          return t + e;
        }, 0), A_ = vi("ceil"), w_ = rr(function(t, e) {
          return t / e;
        }, 1), y_ = vi("floor");
        function x_(t) {
          return t && t.length ? Vn(t, Et, ni) : i;
        }
        function O_(t, e) {
          return t && t.length ? Vn(t, y(e, 2), ni) : i;
        }
        function L_(t) {
          return Lu(t, Et);
        }
        function P_(t, e) {
          return Lu(t, y(e, 2));
        }
        function C_(t) {
          return t && t.length ? Vn(t, Et, si) : i;
        }
        function D_(t, e) {
          return t && t.length ? Vn(t, y(e, 2), si) : i;
        }
        var N_ = rr(function(t, e) {
          return t * e;
        }, 1), b_ = vi("round"), F_ = rr(function(t, e) {
          return t - e;
        }, 0);
        function U_(t) {
          return t && t.length ? zr(t, Et) : 0;
        }
        function M_(t, e) {
          return t && t.length ? zr(t, y(e, 2)) : 0;
        }
        return f.after = ug, f.ary = tf, f.assign = Kg, f.assignIn = _f, f.assignInWith = pr, f.assignWith = Xg, f.at = Zg, f.before = ef, f.bind = Li, f.bindAll = jd, f.bindKey = nf, f.castArray = vg, f.chain = Qs, f.chunk = yc, f.compact = xc, f.concat = Oc, f.cond = t_, f.conforms = e_, f.constant = Ui, f.countBy = Uh, f.create = Jg, f.curry = rf, f.curryRight = uf, f.debounce = sf, f.defaults = Vg, f.defaultsDeep = Qg, f.defer = sg, f.delay = fg, f.difference = Lc, f.differenceBy = Pc, f.differenceWith = Cc, f.drop = Dc, f.dropRight = Nc, f.dropRightWhile = bc, f.dropWhile = Fc, f.fill = Uc, f.filter = Bh, f.flatMap = Hh, f.flatMapDeep = qh, f.flatMapDepth = Yh, f.flatten = Xs, f.flattenDeep = Mc, f.flattenDepth = Bc, f.flip = og, f.flow = r_, f.flowRight = i_, f.fromPairs = Gc, f.functions = id, f.functionsIn = ud, f.groupBy = zh, f.initial = Hc, f.intersection = qc, f.intersectionBy = Yc, f.intersectionWith = zc, f.invert = fd, f.invertBy = od, f.invokeMap = Kh, f.iteratee = Mi, f.keyBy = Xh, f.keys = ut, f.keysIn = Rt, f.map = lr, f.mapKeys = ld, f.mapValues = cd, f.matches = u_, f.matchesProperty = s_, f.memoize = hr, f.merge = hd, f.mergeWith = pf, f.method = f_, f.methodOf = o_, f.mixin = Bi, f.negate = gr, f.nthArg = l_, f.omit = gd, f.omitBy = dd, f.once = ag, f.orderBy = Zh, f.over = c_, f.overArgs = lg, f.overEvery = h_, f.overSome = g_, f.partial = Pi, f.partialRight = ff, f.partition = Jh, f.pick = _d, f.pickBy = vf, f.property = Af, f.propertyOf = d_, f.pull = Zc, f.pullAll = Js, f.pullAllBy = Jc, f.pullAllWith = Vc, f.pullAt = Qc, f.range = __, f.rangeRight = p_, f.rearg = cg, f.reject = kh, f.remove = kc, f.rest = hg, f.reverse = xi, f.sampleSize = tg, f.set = vd, f.setWith = Id, f.shuffle = eg, f.slice = jc, f.sortBy = ig, f.sortedUniq = sh, f.sortedUniqBy = fh, f.split = Hd, f.spread = gg, f.tail = oh, f.take = ah, f.takeRight = lh, f.takeRightWhile = ch, f.takeWhile = hh, f.tap = xh, f.throttle = dg, f.thru = ar, f.toArray = hf, f.toPairs = If, f.toPairsIn = Tf, f.toPath = R_, f.toPlainObject = df, f.transform = Td, f.unary = _g, f.union = gh, f.unionBy = dh, f.unionWith = _h, f.uniq = ph, f.uniqBy = vh, f.uniqWith = Ih, f.unset = Sd, f.unzip = Oi, f.unzipWith = Vs, f.update = Rd, f.updateWith = Ed, f.values = Je, f.valuesIn = md, f.without = Th, f.words = Ef, f.wrap = pg, f.xor = Sh, f.xorBy = Rh, f.xorWith = Eh, f.zip = mh, f.zipObject = Ah, f.zipObjectDeep = wh, f.zipWith = yh, f.entries = If, f.entriesIn = Tf, f.extend = _f, f.extendWith = pr, Bi(f, f), f.add = m_, f.attempt = mf, f.camelCase = xd, f.capitalize = Sf, f.ceil = A_, f.clamp = Ad, f.clone = Ig, f.cloneDeep = Sg, f.cloneDeepWith = Rg, f.cloneWith = Tg, f.conformsTo = Eg, f.deburr = Rf, f.defaultTo = n_, f.divide = w_, f.endsWith = Od, f.eq = $t, f.escape = Ld, f.escapeRegExp = Pd, f.every = Mh, f.find = Gh, f.findIndex = $s, f.findKey = kg, f.findLast = Wh, f.findLastIndex = Ks, f.findLastKey = jg, f.floor = y_, f.forEach = ks, f.forEachRight = js, f.forIn = td, f.forInRight = ed, f.forOwn = nd, f.forOwnRight = rd, f.get = Ni, f.gt = mg, f.gte = Ag, f.has = sd, f.hasIn = bi, f.head = Zs, f.identity = Et, f.includes = $h, f.indexOf = Wc, f.inRange = wd, f.invoke = ad, f.isArguments = De, f.isArray = P, f.isArrayBuffer = wg, f.isArrayLike = St, f.isArrayLikeObject = et, f.isBoolean = yg, f.isBuffer = Re, f.isDate = xg, f.isElement = Og, f.isEmpty = Lg, f.isEqual = Pg, f.isEqualWith = Cg, f.isError = Ci, f.isFinite = Dg, f.isFunction = fe, f.isInteger = of, f.isLength = dr, f.isMap = af, f.isMatch = Ng, f.isMatchWith = bg, f.isNaN = Fg, f.isNative = Ug, f.isNil = Bg, f.isNull = Mg, f.isNumber = lf, f.isObject = Q, f.isObjectLike = tt, f.isPlainObject = Sn, f.isRegExp = Di, f.isSafeInteger = Gg, f.isSet = cf, f.isString = _r, f.isSymbol = Pt, f.isTypedArray = Ze, f.isUndefined = Wg, f.isWeakMap = Hg, f.isWeakSet = qg, f.join = $c, f.kebabCase = Cd, f.last = Gt, f.lastIndexOf = Kc, f.lowerCase = Dd, f.lowerFirst = Nd, f.lt = Yg, f.lte = zg, f.max = x_, f.maxBy = O_, f.mean = L_, f.meanBy = P_, f.min = C_, f.minBy = D_, f.stubArray = Wi, f.stubFalse = Hi, f.stubObject = v_, f.stubString = I_, f.stubTrue = T_, f.multiply = N_, f.nth = Xc, f.noConflict = a_, f.noop = Gi, f.now = cr, f.pad = bd, f.padEnd = Fd, f.padStart = Ud, f.parseInt = Md, f.random = yd, f.reduce = Vh, f.reduceRight = Qh, f.repeat = Bd, f.replace = Gd, f.result = pd, f.round = b_, f.runInContext = g, f.sample = jh, f.size = ng, f.snakeCase = Wd, f.some = rg, f.sortedIndex = th, f.sortedIndexBy = eh, f.sortedIndexOf = nh, f.sortedLastIndex = rh, f.sortedLastIndexBy = ih, f.sortedLastIndexOf = uh, f.startCase = qd, f.startsWith = Yd, f.subtract = F_, f.sum = U_, f.sumBy = M_, f.template = zd, f.times = S_, f.toFinite = oe, f.toInteger = D, f.toLength = gf, f.toLower = $d, f.toNumber = Wt, f.toSafeInteger = $g, f.toString = H, f.toUpper = Kd, f.trim = Xd, f.trimEnd = Zd, f.trimStart = Jd, f.truncate = Vd, f.unescape = Qd, f.uniqueId = E_, f.upperCase = kd, f.upperFirst = Fi, f.each = ks, f.eachRight = js, f.first = Zs, Bi(f, (function() {
          var t = {};
          return Jt(f, function(e, n) {
            Y.call(f.prototype, n) || (t[n] = e);
          }), t;
        })(), { chain: !1 }), f.VERSION = l, bt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
          f[t].placeholder = f;
        }), bt(["drop", "take"], function(t, e) {
          U.prototype[t] = function(n) {
            n = n === i ? 1 : it(D(n), 0);
            var r = this.__filtered__ && !e ? new U(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = lt(n, r.__takeCount__) : r.__views__.push({
              size: lt(n, Zt),
              type: t + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, U.prototype[t + "Right"] = function(n) {
            return this.reverse()[t](n).reverse();
          };
        }), bt(["filter", "map", "takeWhile"], function(t, e) {
          var n = e + 1, r = n == Xi || n == Xf;
          U.prototype[t] = function(s) {
            var o = this.clone();
            return o.__iteratees__.push({
              iteratee: y(s, 3),
              type: n
            }), o.__filtered__ = o.__filtered__ || r, o;
          };
        }), bt(["head", "last"], function(t, e) {
          var n = "take" + (e ? "Right" : "");
          U.prototype[t] = function() {
            return this[n](1).value()[0];
          };
        }), bt(["initial", "tail"], function(t, e) {
          var n = "drop" + (e ? "" : "Right");
          U.prototype[t] = function() {
            return this.__filtered__ ? new U(this) : this[n](1);
          };
        }), U.prototype.compact = function() {
          return this.filter(Et);
        }, U.prototype.find = function(t) {
          return this.filter(t).head();
        }, U.prototype.findLast = function(t) {
          return this.reverse().find(t);
        }, U.prototype.invokeMap = b(function(t, e) {
          return typeof t == "function" ? new U(this) : this.map(function(n) {
            return dn(n, t, e);
          });
        }), U.prototype.reject = function(t) {
          return this.filter(gr(y(t)));
        }, U.prototype.slice = function(t, e) {
          t = D(t);
          var n = this;
          return n.__filtered__ && (t > 0 || e < 0) ? new U(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== i && (e = D(e), n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n);
        }, U.prototype.takeRightWhile = function(t) {
          return this.reverse().takeWhile(t).reverse();
        }, U.prototype.toArray = function() {
          return this.take(Zt);
        }, Jt(U.prototype, function(t, e) {
          var n = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), s = f[r ? "take" + (e == "last" ? "Right" : "") : e], o = r || /^find/.test(e);
          s && (f.prototype[e] = function() {
            var a = this.__wrapped__, c = r ? [1] : arguments, d = a instanceof U, I = c[0], T = d || P(a), R = function(F) {
              var M = s.apply(f, de([F], c));
              return r && m ? M[0] : M;
            };
            T && n && typeof I == "function" && I.length != 1 && (d = T = !1);
            var m = this.__chain__, w = !!this.__actions__.length, x = o && !m, N = d && !w;
            if (!o && T) {
              a = N ? a : new U(this);
              var O = t.apply(a, c);
              return O.__actions__.push({ func: ar, args: [R], thisArg: i }), new Ut(O, m);
            }
            return x && N ? t.apply(this, c) : (O = this.thru(R), x ? r ? O.value()[0] : O.value() : O);
          });
        }), bt(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
          var e = Fn[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(t);
          f.prototype[t] = function() {
            var s = arguments;
            if (r && !this.__chain__) {
              var o = this.value();
              return e.apply(P(o) ? o : [], s);
            }
            return this[n](function(a) {
              return e.apply(P(a) ? a : [], s);
            });
          };
        }), Jt(U.prototype, function(t, e) {
          var n = f[e];
          if (n) {
            var r = n.name + "";
            Y.call(Ye, r) || (Ye[r] = []), Ye[r].push({ name: e, func: n });
          }
        }), Ye[nr(i, wt).name] = [{
          name: "wrapper",
          func: i
        }], U.prototype.clone = Qa, U.prototype.reverse = ka, U.prototype.value = ja, f.prototype.at = Oh, f.prototype.chain = Lh, f.prototype.commit = Ph, f.prototype.next = Ch, f.prototype.plant = Nh, f.prototype.reverse = bh, f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = Fh, f.prototype.first = f.prototype.head, fn && (f.prototype[fn] = Dh), f;
      }), We = Pa();
      Ae ? ((Ae.exports = We)._ = We, Mr._ = We) : st._ = We;
    }).call(q_);
  })(Rn, Rn.exports)), Rn.exports;
}
var mt = Y_();
function mn(h) {
  return h.toLowerCase().replace(/[^\w\d]+/g, "");
}
function $i(h, u) {
  const i = new RegExp(/"(.*?)"/g);
  let l = u, p = [], S, E = !1;
  for (; (S = i.exec(u)) !== null && E === !1; ) {
    const z = mn(String(S[1])), q = z_(h, z);
    q === void 0 ? E = !0 : (p = p.concat(q), l = l.replace(S[0], ""));
  }
  if (E)
    return;
  const C = mn(l), B = $_(h, C);
  return B === void 0 ? void 0 : (p = p.concat(B), p.sort((z, q) => z - q));
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
  let p = h, S = 0, E = !1;
  for (const C of i) {
    const B = p.indexOf(C);
    if (B === -1 && (E = !0), E === !1) {
      l.push(S + B);
      const G = B + 1;
      S += G, p = p.substring(G);
    }
  }
  if (!E)
    return l;
}
class Ki {
  #t;
  constructor(u) {
    this.source = u;
    const i = Ki.composeTransformedHaystackSegments(u);
    this.#t = i, this.transformed = i.map((l) => l.value).join("").toLowerCase();
  }
  getSourceCharacterIndex(u) {
    let i = 0;
    return this.#t.reduce((l, p) => {
      if (l !== 1 / 0)
        return l;
      const S = i + p.value.length;
      if (u >= i && u <= S) {
        const E = u - i;
        l = p.index + E;
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
  return (Array.isArray(h) ? h : [h]).map((p) => new Ki(p)).reduce((p, S) => {
    if (p !== void 0)
      return p;
    const E = $i(S.transformed, u);
    if (E === void 0)
      return p;
    const C = X_(E, S.transformed), B = Z_(S, C);
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
    let E = 1;
    for (let z = 1; z <= i.length; z += 1) {
      const q = i.at(z);
      q !== void 0 && S + z === q && (E += 1);
    }
    const C = S, B = S + E, G = u.substring(C, B);
    l.push({
      index: C,
      value: G,
      is_match: !0,
      length: G.length
    }), i.splice(0, E), p += 1;
  }
  return l;
}
function Z_(h, u) {
  return u.reduce((i, l, p) => {
    if (p === 0 && l.index !== 0) {
      const G = h.source.substring(0, h.getSourceCharacterIndex(l.index));
      i.push({
        index: 0,
        value: G,
        is_match: !1,
        length: G.length
      });
    }
    const S = h.getSourceCharacterIndex(l.index), E = h.getSourceCharacterIndex(l.index + l.length), C = h.source.substring(S, E);
    i.push({
      index: S,
      value: C,
      is_match: !0,
      length: C.length
    });
    const B = u.at(p + 1);
    if (B) {
      const G = h.getSourceCharacterIndex(l.index + l.length), z = h.getSourceCharacterIndex(B.index), q = h.source.substring(G, z);
      i.push({
        index: G,
        value: q,
        is_match: !1,
        length: q.length
      });
    } else if (S + C.length !== h.source.length) {
      const G = S + C.length, z = h.source.substring(G);
      i.push({
        index: G,
        value: z,
        is_match: !1,
        length: z.length
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
        const E = i.at(p - 1);
        E && (E.length += S, E.value += l.value.substring(0, S), l.value = l.value.substring(S), l.index = l.index + S);
      }
    }
  }), i;
}
function V_(h, u) {
  return (Array.isArray(h) ? h : [h]).some((l) => {
    const p = mn(l);
    return $i(p, u) !== void 0;
  });
}
function Q_({ needle: h, haystack: u, Match: i = "mark", Miss: l }) {
  const p = Pf(() => K_(u, h), [u, h]);
  return p === void 0 ? u : p.map((S, E) => {
    const C = [S.value, E].join();
    return S.is_match ? typeof i == "string" ? /* @__PURE__ */ ht(i, { "data-is-match": S.is_match, children: S.value }, C) : /* @__PURE__ */ ht(i, { "data-is-match": S.is_match, segment: S, segmentIndex: E }, C) : l !== void 0 ? typeof l == "string" ? /* @__PURE__ */ ht(l, { "data-is-match": S.is_match, children: S.value }, C) : /* @__PURE__ */ ht(l, { "data-is-match": S.is_match, segment: S, segmentIndex: E }, C) : S.value;
  });
}
function k_({ Match: h = "mark", Miss: u, children: i }) {
  const l = Ve();
  return l.search.hasSearchTerm === !1 ? i : /* @__PURE__ */ ht(Q_, { needle: l.search.searchTerm, haystack: i, Match: h, Miss: u });
}
function Yi(h) {
  return typeof h == "object" && h !== null && "sortFn" in h;
}
function Ir(h) {
  return typeof h == "object" && h !== null && ("searchFn" in h || "haystackFn" in h);
}
function Of(h) {
  return typeof h == "object" && h !== null && "filterFn" in h;
}
function Lf(h) {
  return typeof h == "object" && h !== null && "filterFn" in h && "_isHydrated" in h;
}
function zi(h) {
  return typeof h == "object" && h !== null && "groupFn" in h;
}
function j_(h) {
  return typeof h == "object" && h !== null && ("rules" in h || "callback" in h);
}
function tp(h) {
  return typeof h == "object" && h !== null && ("haystack" in h || "callback" in h);
}
const J = {
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
  SET_NUM_ITEMS_PER_PAGE: "setNumItemsPerPage",
  SYNC_UPDATED_AT: "syncUpdatedAt"
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
  for (let E = 0; E < h.length; E += 1)
    S !== void 0 && h.at(E) === S + 1 && (p += 1, p >= l && (l = p)), S = h.at(E);
  return { percentOfHaystackMatched: i, longestSequentialSequence: l };
}
function np(h, u, i) {
  const l = u.reduce((E, C) => {
    if (h.rule?.searchFn === void 0)
      return E;
    const B = h.rule.searchFn(C, i), z = (Array.isArray(B) ? B.map(mn) : [mn(B)]).reduce((q, gt) => {
      const At = $i(gt, h.searchTerm);
      return At !== void 0 && q.push(ep(At, gt)), q;
    }, []);
    if (z.length > 0) {
      const gt = mt.orderBy(z, ["percentOfHaystackMatched", "longestSequentialSequence"], ["desc", "asc"]).at(0);
      gt && E.push({ item: C, score: gt });
    }
    return E;
  }, []), p = l.reduce((E, C) => (C.score.longestSequentialSequence > E && (E = C.score.longestSequentialSequence), E), 0);
  return mt.orderBy(
    l,
    [
      (E) => {
        const C = E.score.percentOfHaystackMatched * 100, B = E.score.longestSequentialSequence / p * 100;
        return C + B;
      }
    ],
    ["desc"]
  ).map((E) => E.item);
}
class Mf {
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
        event: J.SET_SEARCH_TERM,
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
      event: J.RESET_SEARCH_TERM,
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
    return u.rule === void 0 || u.searchTerm === "" ? i : np(u, i, l);
  }
}
function rp(h) {
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
function ip(h) {
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
function up(h) {
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
  return h.boolean ? rp(h) : h.multiple ? ip(h) : up(h);
}
class Bf {
  #t;
  #e;
  constructor({ initialFilters: u }, i) {
    this.#t = u ?? {}, this.#e = i;
  }
  set(u, i) {
    if (this.#e.isDisabled())
      return;
    const l = this.getRule(u), p = this.get(u), E = typeof i == "string" && i.trim() === "" ? void 0 : i;
    le(l).validate(i), !(this.#t[l.id] !== void 0 && this.#t[l.id] === E) && this.#e.debouncer(l, () => {
      this.#t = { ...this.#t, [l.id]: E }, this.#e.touch({
        source: ot.FILTERS,
        event: J.SET_FILTER,
        current: E,
        initial: p,
        rule: l
      });
    });
  }
  get rules() {
    return this.#e.getRuleBook().rules.filter(Lf);
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
    if (Lf(i) === !1)
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
        let E;
        l.multiple ? E = [S.value] : E = S.value, p.set(S, this.testRule({ rule: l, value: E, isAdditive: i }));
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
    return p.length === 0 ? i : i.filter((S) => p.every((E) => E.filterFn(S, u.values[E.id], l)));
  }
}
const qi = [void 0, "desc", "asc"];
class Gf {
  #t;
  #e;
  #n;
  constructor({ initialSortBy: u, initialSortDirection: i }, l) {
    this.#n = l, u && (this.#t = this.getRule(u)), this.#e = i;
  }
  getRule(u) {
    const i = this.#n.getRuleBook().getRule(u);
    if (Yi(i) === !1)
      throw new j(k.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  get rules() {
    return this.#n.getRuleBook().rules.filter(Yi);
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
      event: J.SET_SORT_BY_DIRECTION,
      current: { sortDirection: u },
      initial: { sortDirection: i },
      rule: this.activeRule
    });
  }
  cycleSortDirection() {
    const u = qi.findIndex((i) => i === this.#e);
    if (u !== -1) {
      const i = u + 1 % (qi.length - 1);
      this.setSortDirection(qi[i]);
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
      event: J.SET_SORT_BY,
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
class Wf {
  #t;
  #e;
  #n;
  constructor({ initialGroupBy: u, requireGroup: i }, l) {
    this.#n = l, u && (this.#t = this.getRule(u)), this.requireGroup = i;
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
      event: J.SET_GROUP_BY,
      current: l?.id,
      initial: i?.id,
      rule: l
    }));
  }
  setGroupSortDirection(u) {
    const i = this.#e;
    this.#e = u, this.#n.touch({
      source: ot.GROUP_BY,
      event: J.SET_GROUP_SORT_BY_DIRECTION,
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
    const p = mt.groupBy(i, (G) => u.rule?.groupFn(G, l)), S = Object.entries(p).map(([G, z]) => ({
      id: G,
      items: z
    })), E = u.rule?.sticky !== void 0, C = [], B = [];
    if (E && u.rule && (C.push(sp(u.rule)), B.push("asc")), u.rule?.sortGroupFn && (C.push(u.rule.sortGroupFn), B.push(u.sortDirection ?? "asc")), C.length > 0) {
      const G = B;
      return mt.orderBy(S, C, G);
    }
    return S;
  }
}
function sp(h) {
  let u = [];
  h.sticky?.header !== void 0 && (Array.isArray(h.sticky.header) && (u = h.sticky.header), typeof h.sticky.header == "string" && (u = [h.sticky.header]));
  let i = [];
  return h.sticky?.footer !== void 0 && (Array.isArray(h.sticky.footer) && (i = h.sticky.footer), typeof h.sticky.footer == "string" && (i = [h.sticky.footer])), (l) => {
    if (u.includes(l.id)) {
      const p = u.findIndex((E) => l.id === E);
      return (u.length - p) * -1;
    }
    return i.includes(l.id) ? 1 + i.findIndex((S) => l.id === S) : 0;
  };
}
class Hf {
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
        event: J.SET_PAGE,
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
        event: J.SET_NUM_ITEMS_PER_PAGE,
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
function fp() {
  const h = /* @__PURE__ */ new Map();
  return (u, i) => u.debounceMilliseconds === void 0 ? i() : (h.has(u) === !1 && h.set(
    u,
    mt.debounce((l) => l(), u.debounceMilliseconds)
  ), h.get(u)?.(i));
}
class op {
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
class ap {
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
    this.rules = this.#t.map((l) => Of(l) ? {
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
    const i = [Ir, Of, Yi, zi], l = /* @__PURE__ */ new Set();
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
    const p = En.test({ mixins: l, items: u, context: i }), S = l.pagination ? Hf.process(l.pagination, p) : p;
    let E = [];
    const C = l.groupBy !== void 0;
    l.groupBy && (E = Wf.process(l.groupBy, S, i)), this.snapshot = {
      items: C ? void 0 : S,
      groups: C ? E : void 0,
      numMatchedItems: p.length,
      numTotalItems: u.length,
      hasGroupByRule: C
    };
  }
  static test({ mixins: u, items: i, context: l }) {
    let p = [...i];
    return u.search && (p = Mf.process(u.search, p, l)), u.filters && (p = Bf.process(u.filters, p, l)), u.sortBy && (p = Gf.process(u.sortBy, p, l)), p;
  }
}
class lp {
  constructor(u, {
    rules: i,
    effects: l,
    initialSearchTerm: p,
    initialSortBy: S,
    initialSortDirection: E,
    initialGroupBy: C,
    initialFilters: B,
    context: G,
    page: z,
    numItemsPerPage: q,
    isLoading: gt,
    disabled: At,
    requireGroup: Xt,
    ignoreSortByRulesWhileSearchRuleIsActive: ce,
    onInit: at,
    onReady: wt,
    onFirstUserInteraction: Ee,
    onChange: vt
  }, kt) {
    this.isReady = !1, this.#e = !1, this.#t = u, this.disabled = !!At, this.isLoading = !!gt, this.#r = new ap(), this.getInstanceFn = kt, this.#i = new Tr(i, u ?? [], G), this.#s = new op(l ?? [], u ?? [], G);
    const It = fp(), yt = {
      getItems: () => this.items,
      getRuleBook: () => this.#i,
      isLoading: () => this.isLoading,
      isDisabled: () => this.disabled,
      test: ($, jt) => this.test($, jt),
      touch: ($) => this.#l($),
      debouncer: It
    };
    this.search = new Mf({ initialSearchTerm: p }, yt), this.filters = new Bf({ initialFilters: B }, yt), this.sortBy = new Gf({ initialSortBy: S, initialSortDirection: E }, yt), this.groupBy = new Wf({ initialGroupBy: C, requireGroup: !!Xt }, yt), this.pagination = new Hf({ page: z, numItemsPerPage: q }, yt), this.updatedAt = Date.now(), this.#u = new En(), this.context = G, this.#n = ce, this.#r.silently(() => {
      const $ = {
        source: ot.CORE,
        event: J.INIT,
        timestamp: Date.now(),
        instance: this.getInstanceFn()
      };
      at && at($);
    }), vt && this.#r.on(J.CHANGE, vt), Ee && this.#r.on(J.FIRST_USER_INTERACTION, Ee), this.isReady = !gt && Array.isArray(u) && u.length > 0, wt && this.isReady && wt({
      source: ot.CORE,
      event: J.READY,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    }), this.isReady === !1 && wt && this.#r.on(J.READY, wt);
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
  #l(u) {
    if (this.#r.isSilent())
      return;
    this.emitFirstUserInteraction(), this.#o(), this.#u.setIsStale(!0);
    const i = {
      ...u,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    };
    this.#r.emit(J.CHANGE, i), this.#r.silently(() => {
      u.rule && this.#s.processRule(u.rule, this.getInstanceFn()), this.search.hasSearchTerm && this.#s.processSearchTerm(this.search.searchTerm, this.getInstanceFn());
    });
  }
  /** Internal events not triggered by a user action  */
  #f(u) {
    this.#u.setIsStale(!0), this.#o();
    const i = {
      ...u,
      timestamp: Date.now(),
      instance: this.getInstanceFn()
    };
    this.#r.emit(u.event, i);
  }
  #o() {
    this.updatedAt = Date.now(), this.#r.emit(J.SYNC_UPDATED_AT, this.updatedAt);
  }
  emitFirstUserInteraction() {
    if (this.#e === !1) {
      this.#e = !0;
      const u = {
        source: ot.CORE,
        event: J.FIRST_USER_INTERACTION,
        timestamp: Date.now(),
        instance: this.getInstanceFn()
      };
      this.#r.emit(J.FIRST_USER_INTERACTION, u);
    }
  }
  #c() {
    this.isReady === !1 && (this.isReady = !0, this.#r.emit(J.READY, {
      source: ot.CORE,
      event: J.READY,
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
      mixins: this.#a()
    }), this.#u.setIsStale(!1)), this.#u.snapshot;
  }
  test(u, i = !1) {
    if (i) {
      const l = { ...this.#a(), ...u };
      return En.test({ mixins: l, items: this.items, context: this.context });
    }
    return En.test({ mixins: u, items: this.items, context: this.context });
  }
  #a() {
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
      this.#t = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s.hydrateDefinitions(this.items, this.context), this.#f({ source: ot.CORE, event: J.SET_ITEMS, current: u, initial: i });
    }
  }
  setIsLoading(u) {
    if (!!u !== this.isLoading) {
      const i = this.isLoading;
      this.isLoading = !!u, this.#f({ source: ot.CORE, event: J.SET_IS_LOADING, current: !!u, initial: i }), this.isLoading === !1 && this.#c();
    }
  }
  setIsDisabled(u) {
    if (!!u !== this.disabled) {
      const i = this.disabled;
      this.disabled = !!u, this.#f({ source: ot.CORE, event: J.SET_IS_DISABLED, current: !!u, initial: i });
    }
  }
  setRules(u) {
    mt.isEqual(u, this.#i.getDefinitions()) === !1 && (this.#i.setRules(u), this.#i.hydrateDefinitions(this.items, this.context));
  }
  setContext(u) {
    const i = this.context;
    mt.isEqual(u, i) === !1 && (this.context = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s.hydrateDefinitions(this.items, this.context), this.#f({ source: ot.CORE, event: J.SET_CONTEXT, current: u, initial: i }));
  }
}
class cp {
  #t;
  constructor(u, i) {
    const l = () => this;
    this.#t = new lp(u, i, l);
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
function qf({
  items: h,
  rules: u,
  effects: i,
  initialSearchTerm: l,
  initialSortBy: p,
  initialSortDirection: S,
  initialGroupBy: E,
  initialFilters: C,
  context: B,
  isLoading: G,
  disabled: z,
  page: q,
  numItemsPerPage: gt,
  requireGroup: At,
  ignoreSortByRulesWhileSearchRuleIsActive: Xt,
  onInit: ce,
  onReady: at,
  onFirstUserInteraction: wt,
  onChange: Ee,
  controllerRef: vt,
  children: kt
}) {
  const [It, yt] = yf(Date.now()), [$] = yf(() => {
    const Ne = new cp(h, {
      rules: u,
      effects: i,
      initialSearchTerm: l,
      initialSortBy: p,
      initialSortDirection: S,
      initialGroupBy: E,
      initialFilters: C,
      context: B,
      isLoading: G,
      disabled: z,
      page: q,
      numItemsPerPage: gt,
      requireGroup: At,
      ignoreSortByRulesWhileSearchRuleIsActive: Xt,
      onInit: ce,
      onReady: at,
      onFirstUserInteraction: wt,
      onChange: Ee
    });
    return Ne.events.on(J.SYNC_UPDATED_AT, (Sr) => yt(Sr)), Ne;
  });
  $.setItems(h), $.setIsLoading(G), $.setIsDisabled(z), $.setRules(u), B !== void 0 && $.setContext(B), q !== void 0 && $.pagination.setPage(q), gt !== void 0 && $.pagination.setNumItemsPerPage(gt), W_(vt, () => $, [$]);
  const jt = Pf(() => [$, It], [$, It]);
  return /* @__PURE__ */ ht(Cf.Provider, { value: jt, children: kt });
}
qf.Content = Qe;
qf.SearchTermHaystack = k_;
function Rp() {
  return H_(null);
}
export {
  qf as Finder,
  Q_ as StringMatch,
  pp as filterRule,
  dp as finderRuleset,
  Ip as groupByRule,
  Tp as ruleEffect,
  Sp as searchEffect,
  _p as searchRule,
  vp as sortByRule,
  Ve as useFinder,
  Rp as useFinderRef
};
