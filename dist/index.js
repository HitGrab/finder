import { createContext as M_, useContext as G_, useMemo as Pf, useState as Lf, useImperativeHandle as W_, useRef as H_ } from "react";
import { jsx as ht } from "react/jsx-runtime";
function Tp(l) {
  return l;
}
function Sp(l) {
  return l;
}
function Ep(l) {
  return l;
}
function Rp(l) {
  return l;
}
function Ap(l) {
  return l;
}
function mp(l, u) {
  return { rules: l, onChange: u };
}
function wp(l, u) {
  return { haystack: l, onChange: u };
}
function yp(l) {
  const u = { ...l };
  return delete u.boolean, delete u.multiple, u;
}
function Op(l) {
  const u = { ...l };
  return delete u.multiple, { ...u, boolean: !0 };
}
function xp(l) {
  const u = { ...l };
  return delete u.boolean, { ...u, multiple: !0 };
}
const Df = M_(null);
function ke() {
  const l = G_(Df);
  if (l === null)
    throw new Error("useFinder requires a FinderContext.");
  const [u] = l;
  return u;
}
function Cf({ children: l }) {
  const u = ke();
  return u.isLoading ? typeof l == "function" ? /* @__PURE__ */ ht(l, { pagination: u.pagination, context: u.context }) : l : null;
}
function Ff({ children: l }) {
  const u = ke();
  return u.isEmpty ? typeof l == "function" ? /* @__PURE__ */ ht(l, { pagination: u.pagination, context: u.context }) : l : null;
}
function bf({ children: l }) {
  const u = ke();
  return u.isEmpty === !1 && u.hasMatches === !1 ? typeof l == "function" ? /* @__PURE__ */ ht(l, { pagination: u.pagination, context: u.context }) : l : null;
}
function Uf({ children: l }) {
  const u = ke();
  return u.hasMatches && u.matches.items ? typeof l == "function" ? /* @__PURE__ */ ht(l, { items: u.matches.items, pagination: u.pagination, context: u.context }) : l : null;
}
function Bf({ children: l }) {
  const u = ke();
  return u.hasMatches && u.matches.groups ? typeof l == "function" ? /* @__PURE__ */ ht(l, { groups: u.matches.groups, pagination: u.pagination, context: u.context }) : l : null;
}
function je({ children: l }) {
  if (Object.values(l).length === 0)
    throw new Error("No render props were found.");
  return [
    l.loading && /* @__PURE__ */ ht(Cf, { children: l.loading }, "loading"),
    l.empty && /* @__PURE__ */ ht(Ff, { children: l.empty }, "empty"),
    l.noMatches && /* @__PURE__ */ ht(bf, { children: l.noMatches }, "noMatches"),
    l.items && /* @__PURE__ */ ht(Uf, { children: l.items }, "items"),
    l.groups && /* @__PURE__ */ ht(Bf, { children: l.groups }, "groups")
  ];
}
je.Loading = Cf;
je.Empty = Ff;
je.NoMatches = bf;
je.Items = Uf;
je.Groups = Bf;
var Er = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, mn = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var q_ = mn.exports, Nf;
function Y_() {
  return Nf || (Nf = 1, (function(l, u) {
    (function() {
      var i, c = "4.17.21", _ = 200, S = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", R = "Expected a function", P = "Invalid `variable` option passed into `_.template`", M = "__lodash_hash_undefined__", W = 500, z = "__lodash_placeholder__", K = 1, vt = 2, at = 4, Zt = 1, de = 2, gt = 1, Wt = 2, re = 4, It = 8, Vt = 16, mt = 32, Jt = 64, wt = 128, nt = 256, Ht = 512, Qt = 30, tn = "...", zf = 800, $f = 16, Ji = 1, Kf = 2, Xf = 3, we = 1 / 0, _e = 9007199254740991, Zf = 17976931348623157e292, xn = NaN, kt = 4294967295, Vf = kt - 1, Jf = kt >>> 1, Qf = [
        ["ary", wt],
        ["bind", gt],
        ["bindKey", Wt],
        ["curry", It],
        ["curryRight", Vt],
        ["flip", Ht],
        ["partial", mt],
        ["partialRight", Jt],
        ["rearg", nt]
      ], be = "[object Arguments]", Ln = "[object Array]", kf = "[object AsyncFunction]", en = "[object Boolean]", nn = "[object Date]", jf = "[object DOMException]", Nn = "[object Error]", Pn = "[object Function]", Qi = "[object GeneratorFunction]", qt = "[object Map]", rn = "[object Number]", to = "[object Null]", ie = "[object Object]", ki = "[object Promise]", eo = "[object Proxy]", un = "[object RegExp]", Yt = "[object Set]", sn = "[object String]", Dn = "[object Symbol]", no = "[object Undefined]", fn = "[object WeakMap]", ro = "[object WeakSet]", on = "[object ArrayBuffer]", Ue = "[object DataView]", mr = "[object Float32Array]", wr = "[object Float64Array]", yr = "[object Int8Array]", Or = "[object Int16Array]", xr = "[object Int32Array]", Lr = "[object Uint8Array]", Nr = "[object Uint8ClampedArray]", Pr = "[object Uint16Array]", Dr = "[object Uint32Array]", io = /\b__p \+= '';/g, uo = /\b(__p \+=) '' \+/g, so = /(__e\(.*?\)|\b__t\)) \+\n'';/g, ji = /&(?:amp|lt|gt|quot|#39);/g, tu = /[&<>"']/g, fo = RegExp(ji.source), oo = RegExp(tu.source), ao = /<%-([\s\S]+?)%>/g, lo = /<%([\s\S]+?)%>/g, eu = /<%=([\s\S]+?)%>/g, co = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ho = /^\w*$/, go = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Cr = /[\\^$.*+?()[\]{}|]/g, _o = RegExp(Cr.source), Fr = /^\s+/, po = /\s/, vo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Io = /\{\n\/\* \[wrapped with (.+)\] \*/, To = /,? & /, So = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Eo = /[()=,{}\[\]\/\s]/, Ro = /\\(\\)?/g, Ao = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, nu = /\w*$/, mo = /^[-+]0x[0-9a-f]+$/i, wo = /^0b[01]+$/i, yo = /^\[object .+?Constructor\]$/, Oo = /^0o[0-7]+$/i, xo = /^(?:0|[1-9]\d*)$/, Lo = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Cn = /($^)/, No = /['\n\r\u2028\u2029\\]/g, Fn = "\\ud800-\\udfff", Po = "\\u0300-\\u036f", Do = "\\ufe20-\\ufe2f", Co = "\\u20d0-\\u20ff", ru = Po + Do + Co, iu = "\\u2700-\\u27bf", uu = "a-z\\xdf-\\xf6\\xf8-\\xff", Fo = "\\xac\\xb1\\xd7\\xf7", bo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Uo = "\\u2000-\\u206f", Bo = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", su = "A-Z\\xc0-\\xd6\\xd8-\\xde", fu = "\\ufe0e\\ufe0f", ou = Fo + bo + Uo + Bo, br = "['’]", Mo = "[" + Fn + "]", au = "[" + ou + "]", bn = "[" + ru + "]", lu = "\\d+", Go = "[" + iu + "]", cu = "[" + uu + "]", hu = "[^" + Fn + ou + lu + iu + uu + su + "]", Ur = "\\ud83c[\\udffb-\\udfff]", Wo = "(?:" + bn + "|" + Ur + ")", gu = "[^" + Fn + "]", Br = "(?:\\ud83c[\\udde6-\\uddff]){2}", Mr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Be = "[" + su + "]", du = "\\u200d", _u = "(?:" + cu + "|" + hu + ")", Ho = "(?:" + Be + "|" + hu + ")", pu = "(?:" + br + "(?:d|ll|m|re|s|t|ve))?", vu = "(?:" + br + "(?:D|LL|M|RE|S|T|VE))?", Iu = Wo + "?", Tu = "[" + fu + "]?", qo = "(?:" + du + "(?:" + [gu, Br, Mr].join("|") + ")" + Tu + Iu + ")*", Yo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", zo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Su = Tu + Iu + qo, $o = "(?:" + [Go, Br, Mr].join("|") + ")" + Su, Ko = "(?:" + [gu + bn + "?", bn, Br, Mr, Mo].join("|") + ")", Xo = RegExp(br, "g"), Zo = RegExp(bn, "g"), Gr = RegExp(Ur + "(?=" + Ur + ")|" + Ko + Su, "g"), Vo = RegExp([
        Be + "?" + cu + "+" + pu + "(?=" + [au, Be, "$"].join("|") + ")",
        Ho + "+" + vu + "(?=" + [au, Be + _u, "$"].join("|") + ")",
        Be + "?" + _u + "+" + pu,
        Be + "+" + vu,
        zo,
        Yo,
        lu,
        $o
      ].join("|"), "g"), Jo = RegExp("[" + du + Fn + ru + fu + "]"), Qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ko = [
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
      ], jo = -1, J = {};
      J[mr] = J[wr] = J[yr] = J[Or] = J[xr] = J[Lr] = J[Nr] = J[Pr] = J[Dr] = !0, J[be] = J[Ln] = J[on] = J[en] = J[Ue] = J[nn] = J[Nn] = J[Pn] = J[qt] = J[rn] = J[ie] = J[un] = J[Yt] = J[sn] = J[fn] = !1;
      var Z = {};
      Z[be] = Z[Ln] = Z[on] = Z[Ue] = Z[en] = Z[nn] = Z[mr] = Z[wr] = Z[yr] = Z[Or] = Z[xr] = Z[qt] = Z[rn] = Z[ie] = Z[un] = Z[Yt] = Z[sn] = Z[Dn] = Z[Lr] = Z[Nr] = Z[Pr] = Z[Dr] = !0, Z[Nn] = Z[Pn] = Z[fn] = !1;
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
      }, ia = parseFloat, ua = parseInt, Eu = typeof Er == "object" && Er && Er.Object === Object && Er, sa = typeof self == "object" && self && self.Object === Object && self, ft = Eu || sa || Function("return this")(), Wr = u && !u.nodeType && u, ye = Wr && !0 && l && !l.nodeType && l, Ru = ye && ye.exports === Wr, Hr = Ru && Eu.process, Dt = (function() {
        try {
          var g = ye && ye.require && ye.require("util").types;
          return g || Hr && Hr.binding && Hr.binding("util");
        } catch {
        }
      })(), Au = Dt && Dt.isArrayBuffer, mu = Dt && Dt.isDate, wu = Dt && Dt.isMap, yu = Dt && Dt.isRegExp, Ou = Dt && Dt.isSet, xu = Dt && Dt.isTypedArray;
      function yt(g, v, p) {
        switch (p.length) {
          case 0:
            return g.call(v);
          case 1:
            return g.call(v, p[0]);
          case 2:
            return g.call(v, p[0], p[1]);
          case 3:
            return g.call(v, p[0], p[1], p[2]);
        }
        return g.apply(v, p);
      }
      function fa(g, v, p, m) {
        for (var L = -1, G = g == null ? 0 : g.length; ++L < G; ) {
          var rt = g[L];
          v(m, rt, p(rt), g);
        }
        return m;
      }
      function Ct(g, v) {
        for (var p = -1, m = g == null ? 0 : g.length; ++p < m && v(g[p], p, g) !== !1; )
          ;
        return g;
      }
      function oa(g, v) {
        for (var p = g == null ? 0 : g.length; p-- && v(g[p], p, g) !== !1; )
          ;
        return g;
      }
      function Lu(g, v) {
        for (var p = -1, m = g == null ? 0 : g.length; ++p < m; )
          if (!v(g[p], p, g))
            return !1;
        return !0;
      }
      function pe(g, v) {
        for (var p = -1, m = g == null ? 0 : g.length, L = 0, G = []; ++p < m; ) {
          var rt = g[p];
          v(rt, p, g) && (G[L++] = rt);
        }
        return G;
      }
      function Un(g, v) {
        var p = g == null ? 0 : g.length;
        return !!p && Me(g, v, 0) > -1;
      }
      function qr(g, v, p) {
        for (var m = -1, L = g == null ? 0 : g.length; ++m < L; )
          if (p(v, g[m]))
            return !0;
        return !1;
      }
      function Q(g, v) {
        for (var p = -1, m = g == null ? 0 : g.length, L = Array(m); ++p < m; )
          L[p] = v(g[p], p, g);
        return L;
      }
      function ve(g, v) {
        for (var p = -1, m = v.length, L = g.length; ++p < m; )
          g[L + p] = v[p];
        return g;
      }
      function Yr(g, v, p, m) {
        var L = -1, G = g == null ? 0 : g.length;
        for (m && G && (p = g[++L]); ++L < G; )
          p = v(p, g[L], L, g);
        return p;
      }
      function aa(g, v, p, m) {
        var L = g == null ? 0 : g.length;
        for (m && L && (p = g[--L]); L--; )
          p = v(p, g[L], L, g);
        return p;
      }
      function zr(g, v) {
        for (var p = -1, m = g == null ? 0 : g.length; ++p < m; )
          if (v(g[p], p, g))
            return !0;
        return !1;
      }
      var la = $r("length");
      function ca(g) {
        return g.split("");
      }
      function ha(g) {
        return g.match(So) || [];
      }
      function Nu(g, v, p) {
        var m;
        return p(g, function(L, G, rt) {
          if (v(L, G, rt))
            return m = G, !1;
        }), m;
      }
      function Bn(g, v, p, m) {
        for (var L = g.length, G = p + (m ? 1 : -1); m ? G-- : ++G < L; )
          if (v(g[G], G, g))
            return G;
        return -1;
      }
      function Me(g, v, p) {
        return v === v ? ma(g, v, p) : Bn(g, Pu, p);
      }
      function ga(g, v, p, m) {
        for (var L = p - 1, G = g.length; ++L < G; )
          if (m(g[L], v))
            return L;
        return -1;
      }
      function Pu(g) {
        return g !== g;
      }
      function Du(g, v) {
        var p = g == null ? 0 : g.length;
        return p ? Xr(g, v) / p : xn;
      }
      function $r(g) {
        return function(v) {
          return v == null ? i : v[g];
        };
      }
      function Kr(g) {
        return function(v) {
          return g == null ? i : g[v];
        };
      }
      function Cu(g, v, p, m, L) {
        return L(g, function(G, rt, X) {
          p = m ? (m = !1, G) : v(p, G, rt, X);
        }), p;
      }
      function da(g, v) {
        var p = g.length;
        for (g.sort(v); p--; )
          g[p] = g[p].value;
        return g;
      }
      function Xr(g, v) {
        for (var p, m = -1, L = g.length; ++m < L; ) {
          var G = v(g[m]);
          G !== i && (p = p === i ? G : p + G);
        }
        return p;
      }
      function Zr(g, v) {
        for (var p = -1, m = Array(g); ++p < g; )
          m[p] = v(p);
        return m;
      }
      function _a(g, v) {
        return Q(v, function(p) {
          return [p, g[p]];
        });
      }
      function Fu(g) {
        return g && g.slice(0, Mu(g) + 1).replace(Fr, "");
      }
      function Ot(g) {
        return function(v) {
          return g(v);
        };
      }
      function Vr(g, v) {
        return Q(v, function(p) {
          return g[p];
        });
      }
      function an(g, v) {
        return g.has(v);
      }
      function bu(g, v) {
        for (var p = -1, m = g.length; ++p < m && Me(v, g[p], 0) > -1; )
          ;
        return p;
      }
      function Uu(g, v) {
        for (var p = g.length; p-- && Me(v, g[p], 0) > -1; )
          ;
        return p;
      }
      function pa(g, v) {
        for (var p = g.length, m = 0; p--; )
          g[p] === v && ++m;
        return m;
      }
      var va = Kr(ta), Ia = Kr(ea);
      function Ta(g) {
        return "\\" + ra[g];
      }
      function Sa(g, v) {
        return g == null ? i : g[v];
      }
      function Ge(g) {
        return Jo.test(g);
      }
      function Ea(g) {
        return Qo.test(g);
      }
      function Ra(g) {
        for (var v, p = []; !(v = g.next()).done; )
          p.push(v.value);
        return p;
      }
      function Jr(g) {
        var v = -1, p = Array(g.size);
        return g.forEach(function(m, L) {
          p[++v] = [L, m];
        }), p;
      }
      function Bu(g, v) {
        return function(p) {
          return g(v(p));
        };
      }
      function Ie(g, v) {
        for (var p = -1, m = g.length, L = 0, G = []; ++p < m; ) {
          var rt = g[p];
          (rt === v || rt === z) && (g[p] = z, G[L++] = p);
        }
        return G;
      }
      function Mn(g) {
        var v = -1, p = Array(g.size);
        return g.forEach(function(m) {
          p[++v] = m;
        }), p;
      }
      function Aa(g) {
        var v = -1, p = Array(g.size);
        return g.forEach(function(m) {
          p[++v] = [m, m];
        }), p;
      }
      function ma(g, v, p) {
        for (var m = p - 1, L = g.length; ++m < L; )
          if (g[m] === v)
            return m;
        return -1;
      }
      function wa(g, v, p) {
        for (var m = p + 1; m--; )
          if (g[m] === v)
            return m;
        return m;
      }
      function We(g) {
        return Ge(g) ? Oa(g) : la(g);
      }
      function zt(g) {
        return Ge(g) ? xa(g) : ca(g);
      }
      function Mu(g) {
        for (var v = g.length; v-- && po.test(g.charAt(v)); )
          ;
        return v;
      }
      var ya = Kr(na);
      function Oa(g) {
        for (var v = Gr.lastIndex = 0; Gr.test(g); )
          ++v;
        return v;
      }
      function xa(g) {
        return g.match(Gr) || [];
      }
      function La(g) {
        return g.match(Vo) || [];
      }
      var Na = (function g(v) {
        v = v == null ? ft : He.defaults(ft.Object(), v, He.pick(ft, ko));
        var p = v.Array, m = v.Date, L = v.Error, G = v.Function, rt = v.Math, X = v.Object, Qr = v.RegExp, Pa = v.String, Ft = v.TypeError, Gn = p.prototype, Da = G.prototype, qe = X.prototype, Wn = v["__core-js_shared__"], Hn = Da.toString, $ = qe.hasOwnProperty, Ca = 0, Gu = (function() {
          var t = /[^.]+$/.exec(Wn && Wn.keys && Wn.keys.IE_PROTO || "");
          return t ? "Symbol(src)_1." + t : "";
        })(), qn = qe.toString, Fa = Hn.call(X), ba = ft._, Ua = Qr(
          "^" + Hn.call($).replace(Cr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), Yn = Ru ? v.Buffer : i, Te = v.Symbol, zn = v.Uint8Array, Wu = Yn ? Yn.allocUnsafe : i, $n = Bu(X.getPrototypeOf, X), Hu = X.create, qu = qe.propertyIsEnumerable, Kn = Gn.splice, Yu = Te ? Te.isConcatSpreadable : i, ln = Te ? Te.iterator : i, Oe = Te ? Te.toStringTag : i, Xn = (function() {
          try {
            var t = De(X, "defineProperty");
            return t({}, "", {}), t;
          } catch {
          }
        })(), Ba = v.clearTimeout !== ft.clearTimeout && v.clearTimeout, Ma = m && m.now !== ft.Date.now && m.now, Ga = v.setTimeout !== ft.setTimeout && v.setTimeout, Zn = rt.ceil, Vn = rt.floor, kr = X.getOwnPropertySymbols, Wa = Yn ? Yn.isBuffer : i, zu = v.isFinite, Ha = Gn.join, qa = Bu(X.keys, X), it = rt.max, lt = rt.min, Ya = m.now, za = v.parseInt, $u = rt.random, $a = Gn.reverse, jr = De(v, "DataView"), cn = De(v, "Map"), ti = De(v, "Promise"), Ye = De(v, "Set"), hn = De(v, "WeakMap"), gn = De(X, "create"), Jn = hn && new hn(), ze = {}, Ka = Ce(jr), Xa = Ce(cn), Za = Ce(ti), Va = Ce(Ye), Ja = Ce(hn), Qn = Te ? Te.prototype : i, dn = Qn ? Qn.valueOf : i, Ku = Qn ? Qn.toString : i;
        function f(t) {
          if (j(t) && !N(t) && !(t instanceof U)) {
            if (t instanceof bt)
              return t;
            if ($.call(t, "__wrapped__"))
              return Xs(t);
          }
          return new bt(t);
        }
        var $e = /* @__PURE__ */ (function() {
          function t() {
          }
          return function(e) {
            if (!k(e))
              return {};
            if (Hu)
              return Hu(e);
            t.prototype = e;
            var n = new t();
            return t.prototype = i, n;
          };
        })();
        function kn() {
        }
        function bt(t, e) {
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
          interpolate: eu,
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
        }, f.prototype = kn.prototype, f.prototype.constructor = f, bt.prototype = $e(kn.prototype), bt.prototype.constructor = bt;
        function U(t) {
          this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = kt, this.__views__ = [];
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
          var t = this.__wrapped__.value(), e = this.__dir__, n = N(t), r = e < 0, s = n ? t.length : 0, o = cc(0, s, this.__views__), a = o.start, h = o.end, d = h - a, I = r ? h : a - 1, T = this.__iteratees__, E = T.length, A = 0, w = lt(d, this.__takeCount__);
          if (!n || !r && s == d && w == d)
            return ps(t, this.__actions__);
          var O = [];
          t:
            for (; d-- && A < w; ) {
              I += e;
              for (var C = -1, x = t[I]; ++C < E; ) {
                var b = T[C], B = b.iteratee, Nt = b.type, pt = B(x);
                if (Nt == Kf)
                  x = pt;
                else if (!pt) {
                  if (Nt == Ji)
                    continue t;
                  break t;
                }
              }
              O[A++] = x;
            }
          return O;
        }
        U.prototype = $e(kn.prototype), U.prototype.constructor = U;
        function xe(t) {
          var e = -1, n = t == null ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var r = t[e];
            this.set(r[0], r[1]);
          }
        }
        function tl() {
          this.__data__ = gn ? gn(null) : {}, this.size = 0;
        }
        function el(t) {
          var e = this.has(t) && delete this.__data__[t];
          return this.size -= e ? 1 : 0, e;
        }
        function nl(t) {
          var e = this.__data__;
          if (gn) {
            var n = e[t];
            return n === M ? i : n;
          }
          return $.call(e, t) ? e[t] : i;
        }
        function rl(t) {
          var e = this.__data__;
          return gn ? e[t] !== i : $.call(e, t);
        }
        function il(t, e) {
          var n = this.__data__;
          return this.size += this.has(t) ? 0 : 1, n[t] = gn && e === i ? M : e, this;
        }
        xe.prototype.clear = tl, xe.prototype.delete = el, xe.prototype.get = nl, xe.prototype.has = rl, xe.prototype.set = il;
        function ue(t) {
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
          var e = this.__data__, n = jn(e, t);
          if (n < 0)
            return !1;
          var r = e.length - 1;
          return n == r ? e.pop() : Kn.call(e, n, 1), --this.size, !0;
        }
        function fl(t) {
          var e = this.__data__, n = jn(e, t);
          return n < 0 ? i : e[n][1];
        }
        function ol(t) {
          return jn(this.__data__, t) > -1;
        }
        function al(t, e) {
          var n = this.__data__, r = jn(n, t);
          return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
        }
        ue.prototype.clear = ul, ue.prototype.delete = sl, ue.prototype.get = fl, ue.prototype.has = ol, ue.prototype.set = al;
        function se(t) {
          var e = -1, n = t == null ? 0 : t.length;
          for (this.clear(); ++e < n; ) {
            var r = t[e];
            this.set(r[0], r[1]);
          }
        }
        function ll() {
          this.size = 0, this.__data__ = {
            hash: new xe(),
            map: new (cn || ue)(),
            string: new xe()
          };
        }
        function cl(t) {
          var e = cr(this, t).delete(t);
          return this.size -= e ? 1 : 0, e;
        }
        function hl(t) {
          return cr(this, t).get(t);
        }
        function gl(t) {
          return cr(this, t).has(t);
        }
        function dl(t, e) {
          var n = cr(this, t), r = n.size;
          return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
        }
        se.prototype.clear = ll, se.prototype.delete = cl, se.prototype.get = hl, se.prototype.has = gl, se.prototype.set = dl;
        function Le(t) {
          var e = -1, n = t == null ? 0 : t.length;
          for (this.__data__ = new se(); ++e < n; )
            this.add(t[e]);
        }
        function _l(t) {
          return this.__data__.set(t, M), this;
        }
        function pl(t) {
          return this.__data__.has(t);
        }
        Le.prototype.add = Le.prototype.push = _l, Le.prototype.has = pl;
        function $t(t) {
          var e = this.__data__ = new ue(t);
          this.size = e.size;
        }
        function vl() {
          this.__data__ = new ue(), this.size = 0;
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
        function El(t, e) {
          var n = this.__data__;
          if (n instanceof ue) {
            var r = n.__data__;
            if (!cn || r.length < _ - 1)
              return r.push([t, e]), this.size = ++n.size, this;
            n = this.__data__ = new se(r);
          }
          return n.set(t, e), this.size = n.size, this;
        }
        $t.prototype.clear = vl, $t.prototype.delete = Il, $t.prototype.get = Tl, $t.prototype.has = Sl, $t.prototype.set = El;
        function Xu(t, e) {
          var n = N(t), r = !n && Fe(t), s = !n && !r && me(t), o = !n && !r && !s && Ve(t), a = n || r || s || o, h = a ? Zr(t.length, Pa) : [], d = h.length;
          for (var I in t)
            (e || $.call(t, I)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
            (I == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            s && (I == "offset" || I == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            o && (I == "buffer" || I == "byteLength" || I == "byteOffset") || // Skip index properties.
            le(I, d))) && h.push(I);
          return h;
        }
        function Zu(t) {
          var e = t.length;
          return e ? t[ci(0, e - 1)] : i;
        }
        function Rl(t, e) {
          return hr(Tt(t), Ne(e, 0, t.length));
        }
        function Al(t) {
          return hr(Tt(t));
        }
        function ei(t, e, n) {
          (n !== i && !Kt(t[e], n) || n === i && !(e in t)) && fe(t, e, n);
        }
        function _n(t, e, n) {
          var r = t[e];
          (!($.call(t, e) && Kt(r, n)) || n === i && !(e in t)) && fe(t, e, n);
        }
        function jn(t, e) {
          for (var n = t.length; n--; )
            if (Kt(t[n][0], e))
              return n;
          return -1;
        }
        function ml(t, e, n, r) {
          return Se(t, function(s, o, a) {
            e(r, s, n(s), a);
          }), r;
        }
        function Vu(t, e) {
          return t && te(e, ut(e), t);
        }
        function wl(t, e) {
          return t && te(e, Et(e), t);
        }
        function fe(t, e, n) {
          e == "__proto__" && Xn ? Xn(t, e, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : t[e] = n;
        }
        function ni(t, e) {
          for (var n = -1, r = e.length, s = p(r), o = t == null; ++n < r; )
            s[n] = o ? i : Ui(t, e[n]);
          return s;
        }
        function Ne(t, e, n) {
          return t === t && (n !== i && (t = t <= n ? t : n), e !== i && (t = t >= e ? t : e)), t;
        }
        function Ut(t, e, n, r, s, o) {
          var a, h = e & K, d = e & vt, I = e & at;
          if (n && (a = s ? n(t, r, s, o) : n(t)), a !== i)
            return a;
          if (!k(t))
            return t;
          var T = N(t);
          if (T) {
            if (a = gc(t), !h)
              return Tt(t, a);
          } else {
            var E = ct(t), A = E == Pn || E == Qi;
            if (me(t))
              return Ts(t, h);
            if (E == ie || E == be || A && !s) {
              if (a = d || A ? {} : Ms(t), !h)
                return d ? nc(t, wl(a, t)) : ec(t, Vu(a, t));
            } else {
              if (!Z[E])
                return s ? t : {};
              a = dc(t, E, h);
            }
          }
          o || (o = new $t());
          var w = o.get(t);
          if (w)
            return w;
          o.set(t, a), df(t) ? t.forEach(function(x) {
            a.add(Ut(x, e, n, x, t, o));
          }) : hf(t) && t.forEach(function(x, b) {
            a.set(b, Ut(x, e, n, b, t, o));
          });
          var O = I ? d ? Ri : Ei : d ? Et : ut, C = T ? i : O(t);
          return Ct(C || t, function(x, b) {
            C && (b = x, x = t[b]), _n(a, b, Ut(x, e, n, b, t, o));
          }), a;
        }
        function yl(t) {
          var e = ut(t);
          return function(n) {
            return Ju(n, t, e);
          };
        }
        function Ju(t, e, n) {
          var r = n.length;
          if (t == null)
            return !r;
          for (t = X(t); r--; ) {
            var s = n[r], o = e[s], a = t[s];
            if (a === i && !(s in t) || !o(a))
              return !1;
          }
          return !0;
        }
        function Qu(t, e, n) {
          if (typeof t != "function")
            throw new Ft(R);
          return Rn(function() {
            t.apply(i, n);
          }, e);
        }
        function pn(t, e, n, r) {
          var s = -1, o = Un, a = !0, h = t.length, d = [], I = e.length;
          if (!h)
            return d;
          n && (e = Q(e, Ot(n))), r ? (o = qr, a = !1) : e.length >= _ && (o = an, a = !1, e = new Le(e));
          t:
            for (; ++s < h; ) {
              var T = t[s], E = n == null ? T : n(T);
              if (T = r || T !== 0 ? T : 0, a && E === E) {
                for (var A = I; A--; )
                  if (e[A] === E)
                    continue t;
                d.push(T);
              } else o(e, E, r) || d.push(T);
            }
          return d;
        }
        var Se = ms(jt), ku = ms(ii, !0);
        function Ol(t, e) {
          var n = !0;
          return Se(t, function(r, s, o) {
            return n = !!e(r, s, o), n;
          }), n;
        }
        function tr(t, e, n) {
          for (var r = -1, s = t.length; ++r < s; ) {
            var o = t[r], a = e(o);
            if (a != null && (h === i ? a === a && !Lt(a) : n(a, h)))
              var h = a, d = o;
          }
          return d;
        }
        function xl(t, e, n, r) {
          var s = t.length;
          for (n = D(n), n < 0 && (n = -n > s ? 0 : s + n), r = r === i || r > s ? s : D(r), r < 0 && (r += s), r = n > r ? 0 : pf(r); n < r; )
            t[n++] = e;
          return t;
        }
        function ju(t, e) {
          var n = [];
          return Se(t, function(r, s, o) {
            e(r, s, o) && n.push(r);
          }), n;
        }
        function ot(t, e, n, r, s) {
          var o = -1, a = t.length;
          for (n || (n = pc), s || (s = []); ++o < a; ) {
            var h = t[o];
            e > 0 && n(h) ? e > 1 ? ot(h, e - 1, n, r, s) : ve(s, h) : r || (s[s.length] = h);
          }
          return s;
        }
        var ri = ws(), ts = ws(!0);
        function jt(t, e) {
          return t && ri(t, e, ut);
        }
        function ii(t, e) {
          return t && ts(t, e, ut);
        }
        function er(t, e) {
          return pe(e, function(n) {
            return ce(t[n]);
          });
        }
        function Pe(t, e) {
          e = Re(e, t);
          for (var n = 0, r = e.length; t != null && n < r; )
            t = t[ee(e[n++])];
          return n && n == r ? t : i;
        }
        function es(t, e, n) {
          var r = e(t);
          return N(t) ? r : ve(r, n(t));
        }
        function dt(t) {
          return t == null ? t === i ? no : to : Oe && Oe in X(t) ? lc(t) : Ac(t);
        }
        function ui(t, e) {
          return t > e;
        }
        function Ll(t, e) {
          return t != null && $.call(t, e);
        }
        function Nl(t, e) {
          return t != null && e in X(t);
        }
        function Pl(t, e, n) {
          return t >= lt(e, n) && t < it(e, n);
        }
        function si(t, e, n) {
          for (var r = n ? qr : Un, s = t[0].length, o = t.length, a = o, h = p(o), d = 1 / 0, I = []; a--; ) {
            var T = t[a];
            a && e && (T = Q(T, Ot(e))), d = lt(T.length, d), h[a] = !n && (e || s >= 120 && T.length >= 120) ? new Le(a && T) : i;
          }
          T = t[0];
          var E = -1, A = h[0];
          t:
            for (; ++E < s && I.length < d; ) {
              var w = T[E], O = e ? e(w) : w;
              if (w = n || w !== 0 ? w : 0, !(A ? an(A, O) : r(I, O, n))) {
                for (a = o; --a; ) {
                  var C = h[a];
                  if (!(C ? an(C, O) : r(t[a], O, n)))
                    continue t;
                }
                A && A.push(O), I.push(w);
              }
            }
          return I;
        }
        function Dl(t, e, n, r) {
          return jt(t, function(s, o, a) {
            e(r, n(s), o, a);
          }), r;
        }
        function vn(t, e, n) {
          e = Re(e, t), t = qs(t, e);
          var r = t == null ? t : t[ee(Mt(e))];
          return r == null ? i : yt(r, t, n);
        }
        function ns(t) {
          return j(t) && dt(t) == be;
        }
        function Cl(t) {
          return j(t) && dt(t) == on;
        }
        function Fl(t) {
          return j(t) && dt(t) == nn;
        }
        function In(t, e, n, r, s) {
          return t === e ? !0 : t == null || e == null || !j(t) && !j(e) ? t !== t && e !== e : bl(t, e, n, r, In, s);
        }
        function bl(t, e, n, r, s, o) {
          var a = N(t), h = N(e), d = a ? Ln : ct(t), I = h ? Ln : ct(e);
          d = d == be ? ie : d, I = I == be ? ie : I;
          var T = d == ie, E = I == ie, A = d == I;
          if (A && me(t)) {
            if (!me(e))
              return !1;
            a = !0, T = !1;
          }
          if (A && !T)
            return o || (o = new $t()), a || Ve(t) ? bs(t, e, n, r, s, o) : oc(t, e, d, n, r, s, o);
          if (!(n & Zt)) {
            var w = T && $.call(t, "__wrapped__"), O = E && $.call(e, "__wrapped__");
            if (w || O) {
              var C = w ? t.value() : t, x = O ? e.value() : e;
              return o || (o = new $t()), s(C, x, n, r, o);
            }
          }
          return A ? (o || (o = new $t()), ac(t, e, n, r, s, o)) : !1;
        }
        function Ul(t) {
          return j(t) && ct(t) == qt;
        }
        function fi(t, e, n, r) {
          var s = n.length, o = s, a = !r;
          if (t == null)
            return !o;
          for (t = X(t); s--; ) {
            var h = n[s];
            if (a && h[2] ? h[1] !== t[h[0]] : !(h[0] in t))
              return !1;
          }
          for (; ++s < o; ) {
            h = n[s];
            var d = h[0], I = t[d], T = h[1];
            if (a && h[2]) {
              if (I === i && !(d in t))
                return !1;
            } else {
              var E = new $t();
              if (r)
                var A = r(I, T, d, t, e, E);
              if (!(A === i ? In(T, I, Zt | de, r, E) : A))
                return !1;
            }
          }
          return !0;
        }
        function rs(t) {
          if (!k(t) || Ic(t))
            return !1;
          var e = ce(t) ? Ua : yo;
          return e.test(Ce(t));
        }
        function Bl(t) {
          return j(t) && dt(t) == un;
        }
        function Ml(t) {
          return j(t) && ct(t) == Yt;
        }
        function Gl(t) {
          return j(t) && Ir(t.length) && !!J[dt(t)];
        }
        function is(t) {
          return typeof t == "function" ? t : t == null ? Rt : typeof t == "object" ? N(t) ? fs(t[0], t[1]) : ss(t) : Of(t);
        }
        function oi(t) {
          if (!En(t))
            return qa(t);
          var e = [];
          for (var n in X(t))
            $.call(t, n) && n != "constructor" && e.push(n);
          return e;
        }
        function Wl(t) {
          if (!k(t))
            return Rc(t);
          var e = En(t), n = [];
          for (var r in t)
            r == "constructor" && (e || !$.call(t, r)) || n.push(r);
          return n;
        }
        function ai(t, e) {
          return t < e;
        }
        function us(t, e) {
          var n = -1, r = St(t) ? p(t.length) : [];
          return Se(t, function(s, o, a) {
            r[++n] = e(s, o, a);
          }), r;
        }
        function ss(t) {
          var e = mi(t);
          return e.length == 1 && e[0][2] ? Ws(e[0][0], e[0][1]) : function(n) {
            return n === t || fi(n, t, e);
          };
        }
        function fs(t, e) {
          return yi(t) && Gs(e) ? Ws(ee(t), e) : function(n) {
            var r = Ui(n, t);
            return r === i && r === e ? Bi(n, t) : In(e, r, Zt | de);
          };
        }
        function nr(t, e, n, r, s) {
          t !== e && ri(e, function(o, a) {
            if (s || (s = new $t()), k(o))
              Hl(t, e, a, n, nr, r, s);
            else {
              var h = r ? r(xi(t, a), o, a + "", t, e, s) : i;
              h === i && (h = o), ei(t, a, h);
            }
          }, Et);
        }
        function Hl(t, e, n, r, s, o, a) {
          var h = xi(t, n), d = xi(e, n), I = a.get(d);
          if (I) {
            ei(t, n, I);
            return;
          }
          var T = o ? o(h, d, n + "", t, e, a) : i, E = T === i;
          if (E) {
            var A = N(d), w = !A && me(d), O = !A && !w && Ve(d);
            T = d, A || w || O ? N(h) ? T = h : tt(h) ? T = Tt(h) : w ? (E = !1, T = Ts(d, !0)) : O ? (E = !1, T = Ss(d, !0)) : T = [] : An(d) || Fe(d) ? (T = h, Fe(h) ? T = vf(h) : (!k(h) || ce(h)) && (T = Ms(d))) : E = !1;
          }
          E && (a.set(d, T), s(T, d, r, o, a), a.delete(d)), ei(t, n, T);
        }
        function os(t, e) {
          var n = t.length;
          if (n)
            return e += e < 0 ? n : 0, le(e, n) ? t[e] : i;
        }
        function as(t, e, n) {
          e.length ? e = Q(e, function(o) {
            return N(o) ? function(a) {
              return Pe(a, o.length === 1 ? o[0] : o);
            } : o;
          }) : e = [Rt];
          var r = -1;
          e = Q(e, Ot(y()));
          var s = us(t, function(o, a, h) {
            var d = Q(e, function(I) {
              return I(o);
            });
            return { criteria: d, index: ++r, value: o };
          });
          return da(s, function(o, a) {
            return tc(o, a, n);
          });
        }
        function ql(t, e) {
          return ls(t, e, function(n, r) {
            return Bi(t, r);
          });
        }
        function ls(t, e, n) {
          for (var r = -1, s = e.length, o = {}; ++r < s; ) {
            var a = e[r], h = Pe(t, a);
            n(h, a) && Tn(o, Re(a, t), h);
          }
          return o;
        }
        function Yl(t) {
          return function(e) {
            return Pe(e, t);
          };
        }
        function li(t, e, n, r) {
          var s = r ? ga : Me, o = -1, a = e.length, h = t;
          for (t === e && (e = Tt(e)), n && (h = Q(t, Ot(n))); ++o < a; )
            for (var d = 0, I = e[o], T = n ? n(I) : I; (d = s(h, T, d, r)) > -1; )
              h !== t && Kn.call(h, d, 1), Kn.call(t, d, 1);
          return t;
        }
        function cs(t, e) {
          for (var n = t ? e.length : 0, r = n - 1; n--; ) {
            var s = e[n];
            if (n == r || s !== o) {
              var o = s;
              le(s) ? Kn.call(t, s, 1) : di(t, s);
            }
          }
          return t;
        }
        function ci(t, e) {
          return t + Vn($u() * (e - t + 1));
        }
        function zl(t, e, n, r) {
          for (var s = -1, o = it(Zn((e - t) / (n || 1)), 0), a = p(o); o--; )
            a[r ? o : ++s] = t, t += n;
          return a;
        }
        function hi(t, e) {
          var n = "";
          if (!t || e < 1 || e > _e)
            return n;
          do
            e % 2 && (n += t), e = Vn(e / 2), e && (t += t);
          while (e);
          return n;
        }
        function F(t, e) {
          return Li(Hs(t, e, Rt), t + "");
        }
        function $l(t) {
          return Zu(Je(t));
        }
        function Kl(t, e) {
          var n = Je(t);
          return hr(n, Ne(e, 0, n.length));
        }
        function Tn(t, e, n, r) {
          if (!k(t))
            return t;
          e = Re(e, t);
          for (var s = -1, o = e.length, a = o - 1, h = t; h != null && ++s < o; ) {
            var d = ee(e[s]), I = n;
            if (d === "__proto__" || d === "constructor" || d === "prototype")
              return t;
            if (s != a) {
              var T = h[d];
              I = r ? r(T, d, h) : i, I === i && (I = k(T) ? T : le(e[s + 1]) ? [] : {});
            }
            _n(h, d, I), h = h[d];
          }
          return t;
        }
        var hs = Jn ? function(t, e) {
          return Jn.set(t, e), t;
        } : Rt, Xl = Xn ? function(t, e) {
          return Xn(t, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Gi(e),
            writable: !0
          });
        } : Rt;
        function Zl(t) {
          return hr(Je(t));
        }
        function Bt(t, e, n) {
          var r = -1, s = t.length;
          e < 0 && (e = -e > s ? 0 : s + e), n = n > s ? s : n, n < 0 && (n += s), s = e > n ? 0 : n - e >>> 0, e >>>= 0;
          for (var o = p(s); ++r < s; )
            o[r] = t[r + e];
          return o;
        }
        function Vl(t, e) {
          var n;
          return Se(t, function(r, s, o) {
            return n = e(r, s, o), !n;
          }), !!n;
        }
        function rr(t, e, n) {
          var r = 0, s = t == null ? r : t.length;
          if (typeof e == "number" && e === e && s <= Jf) {
            for (; r < s; ) {
              var o = r + s >>> 1, a = t[o];
              a !== null && !Lt(a) && (n ? a <= e : a < e) ? r = o + 1 : s = o;
            }
            return s;
          }
          return gi(t, e, Rt, n);
        }
        function gi(t, e, n, r) {
          var s = 0, o = t == null ? 0 : t.length;
          if (o === 0)
            return 0;
          e = n(e);
          for (var a = e !== e, h = e === null, d = Lt(e), I = e === i; s < o; ) {
            var T = Vn((s + o) / 2), E = n(t[T]), A = E !== i, w = E === null, O = E === E, C = Lt(E);
            if (a)
              var x = r || O;
            else I ? x = O && (r || A) : h ? x = O && A && (r || !w) : d ? x = O && A && !w && (r || !C) : w || C ? x = !1 : x = r ? E <= e : E < e;
            x ? s = T + 1 : o = T;
          }
          return lt(o, Vf);
        }
        function gs(t, e) {
          for (var n = -1, r = t.length, s = 0, o = []; ++n < r; ) {
            var a = t[n], h = e ? e(a) : a;
            if (!n || !Kt(h, d)) {
              var d = h;
              o[s++] = a === 0 ? 0 : a;
            }
          }
          return o;
        }
        function ds(t) {
          return typeof t == "number" ? t : Lt(t) ? xn : +t;
        }
        function xt(t) {
          if (typeof t == "string")
            return t;
          if (N(t))
            return Q(t, xt) + "";
          if (Lt(t))
            return Ku ? Ku.call(t) : "";
          var e = t + "";
          return e == "0" && 1 / t == -we ? "-0" : e;
        }
        function Ee(t, e, n) {
          var r = -1, s = Un, o = t.length, a = !0, h = [], d = h;
          if (n)
            a = !1, s = qr;
          else if (o >= _) {
            var I = e ? null : sc(t);
            if (I)
              return Mn(I);
            a = !1, s = an, d = new Le();
          } else
            d = e ? [] : h;
          t:
            for (; ++r < o; ) {
              var T = t[r], E = e ? e(T) : T;
              if (T = n || T !== 0 ? T : 0, a && E === E) {
                for (var A = d.length; A--; )
                  if (d[A] === E)
                    continue t;
                e && d.push(E), h.push(T);
              } else s(d, E, n) || (d !== h && d.push(E), h.push(T));
            }
          return h;
        }
        function di(t, e) {
          return e = Re(e, t), t = qs(t, e), t == null || delete t[ee(Mt(e))];
        }
        function _s(t, e, n, r) {
          return Tn(t, e, n(Pe(t, e)), r);
        }
        function ir(t, e, n, r) {
          for (var s = t.length, o = r ? s : -1; (r ? o-- : ++o < s) && e(t[o], o, t); )
            ;
          return n ? Bt(t, r ? 0 : o, r ? o + 1 : s) : Bt(t, r ? o + 1 : 0, r ? s : o);
        }
        function ps(t, e) {
          var n = t;
          return n instanceof U && (n = n.value()), Yr(e, function(r, s) {
            return s.func.apply(s.thisArg, ve([r], s.args));
          }, n);
        }
        function _i(t, e, n) {
          var r = t.length;
          if (r < 2)
            return r ? Ee(t[0]) : [];
          for (var s = -1, o = p(r); ++s < r; )
            for (var a = t[s], h = -1; ++h < r; )
              h != s && (o[s] = pn(o[s] || a, t[h], e, n));
          return Ee(ot(o, 1), e, n);
        }
        function vs(t, e, n) {
          for (var r = -1, s = t.length, o = e.length, a = {}; ++r < s; ) {
            var h = r < o ? e[r] : i;
            n(a, t[r], h);
          }
          return a;
        }
        function pi(t) {
          return tt(t) ? t : [];
        }
        function vi(t) {
          return typeof t == "function" ? t : Rt;
        }
        function Re(t, e) {
          return N(t) ? t : yi(t, e) ? [t] : Ks(H(t));
        }
        var Jl = F;
        function Ae(t, e, n) {
          var r = t.length;
          return n = n === i ? r : n, !e && n >= r ? t : Bt(t, e, n);
        }
        var Is = Ba || function(t) {
          return ft.clearTimeout(t);
        };
        function Ts(t, e) {
          if (e)
            return t.slice();
          var n = t.length, r = Wu ? Wu(n) : new t.constructor(n);
          return t.copy(r), r;
        }
        function Ii(t) {
          var e = new t.constructor(t.byteLength);
          return new zn(e).set(new zn(t)), e;
        }
        function Ql(t, e) {
          var n = e ? Ii(t.buffer) : t.buffer;
          return new t.constructor(n, t.byteOffset, t.byteLength);
        }
        function kl(t) {
          var e = new t.constructor(t.source, nu.exec(t));
          return e.lastIndex = t.lastIndex, e;
        }
        function jl(t) {
          return dn ? X(dn.call(t)) : {};
        }
        function Ss(t, e) {
          var n = e ? Ii(t.buffer) : t.buffer;
          return new t.constructor(n, t.byteOffset, t.length);
        }
        function Es(t, e) {
          if (t !== e) {
            var n = t !== i, r = t === null, s = t === t, o = Lt(t), a = e !== i, h = e === null, d = e === e, I = Lt(e);
            if (!h && !I && !o && t > e || o && a && d && !h && !I || r && a && d || !n && d || !s)
              return 1;
            if (!r && !o && !I && t < e || I && n && s && !r && !o || h && n && s || !a && s || !d)
              return -1;
          }
          return 0;
        }
        function tc(t, e, n) {
          for (var r = -1, s = t.criteria, o = e.criteria, a = s.length, h = n.length; ++r < a; ) {
            var d = Es(s[r], o[r]);
            if (d) {
              if (r >= h)
                return d;
              var I = n[r];
              return d * (I == "desc" ? -1 : 1);
            }
          }
          return t.index - e.index;
        }
        function Rs(t, e, n, r) {
          for (var s = -1, o = t.length, a = n.length, h = -1, d = e.length, I = it(o - a, 0), T = p(d + I), E = !r; ++h < d; )
            T[h] = e[h];
          for (; ++s < a; )
            (E || s < o) && (T[n[s]] = t[s]);
          for (; I--; )
            T[h++] = t[s++];
          return T;
        }
        function As(t, e, n, r) {
          for (var s = -1, o = t.length, a = -1, h = n.length, d = -1, I = e.length, T = it(o - h, 0), E = p(T + I), A = !r; ++s < T; )
            E[s] = t[s];
          for (var w = s; ++d < I; )
            E[w + d] = e[d];
          for (; ++a < h; )
            (A || s < o) && (E[w + n[a]] = t[s++]);
          return E;
        }
        function Tt(t, e) {
          var n = -1, r = t.length;
          for (e || (e = p(r)); ++n < r; )
            e[n] = t[n];
          return e;
        }
        function te(t, e, n, r) {
          var s = !n;
          n || (n = {});
          for (var o = -1, a = e.length; ++o < a; ) {
            var h = e[o], d = r ? r(n[h], t[h], h, n, t) : i;
            d === i && (d = t[h]), s ? fe(n, h, d) : _n(n, h, d);
          }
          return n;
        }
        function ec(t, e) {
          return te(t, wi(t), e);
        }
        function nc(t, e) {
          return te(t, Us(t), e);
        }
        function ur(t, e) {
          return function(n, r) {
            var s = N(n) ? fa : ml, o = e ? e() : {};
            return s(n, t, y(r, 2), o);
          };
        }
        function Ke(t) {
          return F(function(e, n) {
            var r = -1, s = n.length, o = s > 1 ? n[s - 1] : i, a = s > 2 ? n[2] : i;
            for (o = t.length > 3 && typeof o == "function" ? (s--, o) : i, a && _t(n[0], n[1], a) && (o = s < 3 ? i : o, s = 1), e = X(e); ++r < s; ) {
              var h = n[r];
              h && t(e, h, r, o);
            }
            return e;
          });
        }
        function ms(t, e) {
          return function(n, r) {
            if (n == null)
              return n;
            if (!St(n))
              return t(n, r);
            for (var s = n.length, o = e ? s : -1, a = X(n); (e ? o-- : ++o < s) && r(a[o], o, a) !== !1; )
              ;
            return n;
          };
        }
        function ws(t) {
          return function(e, n, r) {
            for (var s = -1, o = X(e), a = r(e), h = a.length; h--; ) {
              var d = a[t ? h : ++s];
              if (n(o[d], d, o) === !1)
                break;
            }
            return e;
          };
        }
        function rc(t, e, n) {
          var r = e & gt, s = Sn(t);
          function o() {
            var a = this && this !== ft && this instanceof o ? s : t;
            return a.apply(r ? n : this, arguments);
          }
          return o;
        }
        function ys(t) {
          return function(e) {
            e = H(e);
            var n = Ge(e) ? zt(e) : i, r = n ? n[0] : e.charAt(0), s = n ? Ae(n, 1).join("") : e.slice(1);
            return r[t]() + s;
          };
        }
        function Xe(t) {
          return function(e) {
            return Yr(wf(mf(e).replace(Xo, "")), t, "");
          };
        }
        function Sn(t) {
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
            var n = $e(t.prototype), r = t.apply(n, e);
            return k(r) ? r : n;
          };
        }
        function ic(t, e, n) {
          var r = Sn(t);
          function s() {
            for (var o = arguments.length, a = p(o), h = o, d = Ze(s); h--; )
              a[h] = arguments[h];
            var I = o < 3 && a[0] !== d && a[o - 1] !== d ? [] : Ie(a, d);
            if (o -= I.length, o < n)
              return Ps(
                t,
                e,
                sr,
                s.placeholder,
                i,
                a,
                I,
                i,
                i,
                n - o
              );
            var T = this && this !== ft && this instanceof s ? r : t;
            return yt(T, this, a);
          }
          return s;
        }
        function Os(t) {
          return function(e, n, r) {
            var s = X(e);
            if (!St(e)) {
              var o = y(n, 3);
              e = ut(e), n = function(h) {
                return o(s[h], h, s);
              };
            }
            var a = t(e, n, r);
            return a > -1 ? s[o ? e[a] : a] : i;
          };
        }
        function xs(t) {
          return ae(function(e) {
            var n = e.length, r = n, s = bt.prototype.thru;
            for (t && e.reverse(); r--; ) {
              var o = e[r];
              if (typeof o != "function")
                throw new Ft(R);
              if (s && !a && lr(o) == "wrapper")
                var a = new bt([], !0);
            }
            for (r = a ? r : n; ++r < n; ) {
              o = e[r];
              var h = lr(o), d = h == "wrapper" ? Ai(o) : i;
              d && Oi(d[0]) && d[1] == (wt | It | mt | nt) && !d[4].length && d[9] == 1 ? a = a[lr(d[0])].apply(a, d[3]) : a = o.length == 1 && Oi(o) ? a[h]() : a.thru(o);
            }
            return function() {
              var I = arguments, T = I[0];
              if (a && I.length == 1 && N(T))
                return a.plant(T).value();
              for (var E = 0, A = n ? e[E].apply(this, I) : T; ++E < n; )
                A = e[E].call(this, A);
              return A;
            };
          });
        }
        function sr(t, e, n, r, s, o, a, h, d, I) {
          var T = e & wt, E = e & gt, A = e & Wt, w = e & (It | Vt), O = e & Ht, C = A ? i : Sn(t);
          function x() {
            for (var b = arguments.length, B = p(b), Nt = b; Nt--; )
              B[Nt] = arguments[Nt];
            if (w)
              var pt = Ze(x), Pt = pa(B, pt);
            if (r && (B = Rs(B, r, s, w)), o && (B = As(B, o, a, w)), b -= Pt, w && b < I) {
              var et = Ie(B, pt);
              return Ps(
                t,
                e,
                sr,
                x.placeholder,
                n,
                B,
                et,
                h,
                d,
                I - b
              );
            }
            var Xt = E ? n : this, ge = A ? Xt[t] : t;
            return b = B.length, h ? B = mc(B, h) : O && b > 1 && B.reverse(), T && d < b && (B.length = d), this && this !== ft && this instanceof x && (ge = C || Sn(ge)), ge.apply(Xt, B);
          }
          return x;
        }
        function Ls(t, e) {
          return function(n, r) {
            return Dl(n, t, e(r), {});
          };
        }
        function fr(t, e) {
          return function(n, r) {
            var s;
            if (n === i && r === i)
              return e;
            if (n !== i && (s = n), r !== i) {
              if (s === i)
                return r;
              typeof n == "string" || typeof r == "string" ? (n = xt(n), r = xt(r)) : (n = ds(n), r = ds(r)), s = t(n, r);
            }
            return s;
          };
        }
        function Ti(t) {
          return ae(function(e) {
            return e = Q(e, Ot(y())), F(function(n) {
              var r = this;
              return t(e, function(s) {
                return yt(s, r, n);
              });
            });
          });
        }
        function or(t, e) {
          e = e === i ? " " : xt(e);
          var n = e.length;
          if (n < 2)
            return n ? hi(e, t) : e;
          var r = hi(e, Zn(t / We(e)));
          return Ge(e) ? Ae(zt(r), 0, t).join("") : r.slice(0, t);
        }
        function uc(t, e, n, r) {
          var s = e & gt, o = Sn(t);
          function a() {
            for (var h = -1, d = arguments.length, I = -1, T = r.length, E = p(T + d), A = this && this !== ft && this instanceof a ? o : t; ++I < T; )
              E[I] = r[I];
            for (; d--; )
              E[I++] = arguments[++h];
            return yt(A, s ? n : this, E);
          }
          return a;
        }
        function Ns(t) {
          return function(e, n, r) {
            return r && typeof r != "number" && _t(e, n, r) && (n = r = i), e = he(e), n === i ? (n = e, e = 0) : n = he(n), r = r === i ? e < n ? 1 : -1 : he(r), zl(e, n, r, t);
          };
        }
        function ar(t) {
          return function(e, n) {
            return typeof e == "string" && typeof n == "string" || (e = Gt(e), n = Gt(n)), t(e, n);
          };
        }
        function Ps(t, e, n, r, s, o, a, h, d, I) {
          var T = e & It, E = T ? a : i, A = T ? i : a, w = T ? o : i, O = T ? i : o;
          e |= T ? mt : Jt, e &= ~(T ? Jt : mt), e & re || (e &= -4);
          var C = [
            t,
            e,
            s,
            w,
            E,
            O,
            A,
            h,
            d,
            I
          ], x = n.apply(i, C);
          return Oi(t) && Ys(x, C), x.placeholder = r, zs(x, t, e);
        }
        function Si(t) {
          var e = rt[t];
          return function(n, r) {
            if (n = Gt(n), r = r == null ? 0 : lt(D(r), 292), r && zu(n)) {
              var s = (H(n) + "e").split("e"), o = e(s[0] + "e" + (+s[1] + r));
              return s = (H(o) + "e").split("e"), +(s[0] + "e" + (+s[1] - r));
            }
            return e(n);
          };
        }
        var sc = Ye && 1 / Mn(new Ye([, -0]))[1] == we ? function(t) {
          return new Ye(t);
        } : qi;
        function Ds(t) {
          return function(e) {
            var n = ct(e);
            return n == qt ? Jr(e) : n == Yt ? Aa(e) : _a(e, t(e));
          };
        }
        function oe(t, e, n, r, s, o, a, h) {
          var d = e & Wt;
          if (!d && typeof t != "function")
            throw new Ft(R);
          var I = r ? r.length : 0;
          if (I || (e &= -97, r = s = i), a = a === i ? a : it(D(a), 0), h = h === i ? h : D(h), I -= s ? s.length : 0, e & Jt) {
            var T = r, E = s;
            r = s = i;
          }
          var A = d ? i : Ai(t), w = [
            t,
            e,
            n,
            r,
            s,
            T,
            E,
            o,
            a,
            h
          ];
          if (A && Ec(w, A), t = w[0], e = w[1], n = w[2], r = w[3], s = w[4], h = w[9] = w[9] === i ? d ? 0 : t.length : it(w[9] - I, 0), !h && e & (It | Vt) && (e &= -25), !e || e == gt)
            var O = rc(t, e, n);
          else e == It || e == Vt ? O = ic(t, e, h) : (e == mt || e == (gt | mt)) && !s.length ? O = uc(t, e, n, r) : O = sr.apply(i, w);
          var C = A ? hs : Ys;
          return zs(C(O, w), t, e);
        }
        function Cs(t, e, n, r) {
          return t === i || Kt(t, qe[n]) && !$.call(r, n) ? e : t;
        }
        function Fs(t, e, n, r, s, o) {
          return k(t) && k(e) && (o.set(e, t), nr(t, e, i, Fs, o), o.delete(e)), t;
        }
        function fc(t) {
          return An(t) ? i : t;
        }
        function bs(t, e, n, r, s, o) {
          var a = n & Zt, h = t.length, d = e.length;
          if (h != d && !(a && d > h))
            return !1;
          var I = o.get(t), T = o.get(e);
          if (I && T)
            return I == e && T == t;
          var E = -1, A = !0, w = n & de ? new Le() : i;
          for (o.set(t, e), o.set(e, t); ++E < h; ) {
            var O = t[E], C = e[E];
            if (r)
              var x = a ? r(C, O, E, e, t, o) : r(O, C, E, t, e, o);
            if (x !== i) {
              if (x)
                continue;
              A = !1;
              break;
            }
            if (w) {
              if (!zr(e, function(b, B) {
                if (!an(w, B) && (O === b || s(O, b, n, r, o)))
                  return w.push(B);
              })) {
                A = !1;
                break;
              }
            } else if (!(O === C || s(O, C, n, r, o))) {
              A = !1;
              break;
            }
          }
          return o.delete(t), o.delete(e), A;
        }
        function oc(t, e, n, r, s, o, a) {
          switch (n) {
            case Ue:
              if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
                return !1;
              t = t.buffer, e = e.buffer;
            case on:
              return !(t.byteLength != e.byteLength || !o(new zn(t), new zn(e)));
            case en:
            case nn:
            case rn:
              return Kt(+t, +e);
            case Nn:
              return t.name == e.name && t.message == e.message;
            case un:
            case sn:
              return t == e + "";
            case qt:
              var h = Jr;
            case Yt:
              var d = r & Zt;
              if (h || (h = Mn), t.size != e.size && !d)
                return !1;
              var I = a.get(t);
              if (I)
                return I == e;
              r |= de, a.set(t, e);
              var T = bs(h(t), h(e), r, s, o, a);
              return a.delete(t), T;
            case Dn:
              if (dn)
                return dn.call(t) == dn.call(e);
          }
          return !1;
        }
        function ac(t, e, n, r, s, o) {
          var a = n & Zt, h = Ei(t), d = h.length, I = Ei(e), T = I.length;
          if (d != T && !a)
            return !1;
          for (var E = d; E--; ) {
            var A = h[E];
            if (!(a ? A in e : $.call(e, A)))
              return !1;
          }
          var w = o.get(t), O = o.get(e);
          if (w && O)
            return w == e && O == t;
          var C = !0;
          o.set(t, e), o.set(e, t);
          for (var x = a; ++E < d; ) {
            A = h[E];
            var b = t[A], B = e[A];
            if (r)
              var Nt = a ? r(B, b, A, e, t, o) : r(b, B, A, t, e, o);
            if (!(Nt === i ? b === B || s(b, B, n, r, o) : Nt)) {
              C = !1;
              break;
            }
            x || (x = A == "constructor");
          }
          if (C && !x) {
            var pt = t.constructor, Pt = e.constructor;
            pt != Pt && "constructor" in t && "constructor" in e && !(typeof pt == "function" && pt instanceof pt && typeof Pt == "function" && Pt instanceof Pt) && (C = !1);
          }
          return o.delete(t), o.delete(e), C;
        }
        function ae(t) {
          return Li(Hs(t, i, Js), t + "");
        }
        function Ei(t) {
          return es(t, ut, wi);
        }
        function Ri(t) {
          return es(t, Et, Us);
        }
        var Ai = Jn ? function(t) {
          return Jn.get(t);
        } : qi;
        function lr(t) {
          for (var e = t.name + "", n = ze[e], r = $.call(ze, e) ? n.length : 0; r--; ) {
            var s = n[r], o = s.func;
            if (o == null || o == t)
              return s.name;
          }
          return e;
        }
        function Ze(t) {
          var e = $.call(f, "placeholder") ? f : t;
          return e.placeholder;
        }
        function y() {
          var t = f.iteratee || Wi;
          return t = t === Wi ? is : t, arguments.length ? t(arguments[0], arguments[1]) : t;
        }
        function cr(t, e) {
          var n = t.__data__;
          return vc(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
        }
        function mi(t) {
          for (var e = ut(t), n = e.length; n--; ) {
            var r = e[n], s = t[r];
            e[n] = [r, s, Gs(s)];
          }
          return e;
        }
        function De(t, e) {
          var n = Sa(t, e);
          return rs(n) ? n : i;
        }
        function lc(t) {
          var e = $.call(t, Oe), n = t[Oe];
          try {
            t[Oe] = i;
            var r = !0;
          } catch {
          }
          var s = qn.call(t);
          return r && (e ? t[Oe] = n : delete t[Oe]), s;
        }
        var wi = kr ? function(t) {
          return t == null ? [] : (t = X(t), pe(kr(t), function(e) {
            return qu.call(t, e);
          }));
        } : Yi, Us = kr ? function(t) {
          for (var e = []; t; )
            ve(e, wi(t)), t = $n(t);
          return e;
        } : Yi, ct = dt;
        (jr && ct(new jr(new ArrayBuffer(1))) != Ue || cn && ct(new cn()) != qt || ti && ct(ti.resolve()) != ki || Ye && ct(new Ye()) != Yt || hn && ct(new hn()) != fn) && (ct = function(t) {
          var e = dt(t), n = e == ie ? t.constructor : i, r = n ? Ce(n) : "";
          if (r)
            switch (r) {
              case Ka:
                return Ue;
              case Xa:
                return qt;
              case Za:
                return ki;
              case Va:
                return Yt;
              case Ja:
                return fn;
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
        function Bs(t, e, n) {
          e = Re(e, t);
          for (var r = -1, s = e.length, o = !1; ++r < s; ) {
            var a = ee(e[r]);
            if (!(o = t != null && n(t, a)))
              break;
            t = t[a];
          }
          return o || ++r != s ? o : (s = t == null ? 0 : t.length, !!s && Ir(s) && le(a, s) && (N(t) || Fe(t)));
        }
        function gc(t) {
          var e = t.length, n = new t.constructor(e);
          return e && typeof t[0] == "string" && $.call(t, "index") && (n.index = t.index, n.input = t.input), n;
        }
        function Ms(t) {
          return typeof t.constructor == "function" && !En(t) ? $e($n(t)) : {};
        }
        function dc(t, e, n) {
          var r = t.constructor;
          switch (e) {
            case on:
              return Ii(t);
            case en:
            case nn:
              return new r(+t);
            case Ue:
              return Ql(t, n);
            case mr:
            case wr:
            case yr:
            case Or:
            case xr:
            case Lr:
            case Nr:
            case Pr:
            case Dr:
              return Ss(t, n);
            case qt:
              return new r();
            case rn:
            case sn:
              return new r(t);
            case un:
              return kl(t);
            case Yt:
              return new r();
            case Dn:
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
          return N(t) || Fe(t) || !!(Yu && t && t[Yu]);
        }
        function le(t, e) {
          var n = typeof t;
          return e = e ?? _e, !!e && (n == "number" || n != "symbol" && xo.test(t)) && t > -1 && t % 1 == 0 && t < e;
        }
        function _t(t, e, n) {
          if (!k(n))
            return !1;
          var r = typeof e;
          return (r == "number" ? St(n) && le(e, n.length) : r == "string" && e in n) ? Kt(n[e], t) : !1;
        }
        function yi(t, e) {
          if (N(t))
            return !1;
          var n = typeof t;
          return n == "number" || n == "symbol" || n == "boolean" || t == null || Lt(t) ? !0 : ho.test(t) || !co.test(t) || e != null && t in X(e);
        }
        function vc(t) {
          var e = typeof t;
          return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
        }
        function Oi(t) {
          var e = lr(t), n = f[e];
          if (typeof n != "function" || !(e in U.prototype))
            return !1;
          if (t === n)
            return !0;
          var r = Ai(n);
          return !!r && t === r[0];
        }
        function Ic(t) {
          return !!Gu && Gu in t;
        }
        var Tc = Wn ? ce : zi;
        function En(t) {
          var e = t && t.constructor, n = typeof e == "function" && e.prototype || qe;
          return t === n;
        }
        function Gs(t) {
          return t === t && !k(t);
        }
        function Ws(t, e) {
          return function(n) {
            return n == null ? !1 : n[t] === e && (e !== i || t in X(n));
          };
        }
        function Sc(t) {
          var e = pr(t, function(r) {
            return n.size === W && n.clear(), r;
          }), n = e.cache;
          return e;
        }
        function Ec(t, e) {
          var n = t[1], r = e[1], s = n | r, o = s < (gt | Wt | wt), a = r == wt && n == It || r == wt && n == nt && t[7].length <= e[8] || r == (wt | nt) && e[7].length <= e[8] && n == It;
          if (!(o || a))
            return t;
          r & gt && (t[2] = e[2], s |= n & gt ? 0 : re);
          var h = e[3];
          if (h) {
            var d = t[3];
            t[3] = d ? Rs(d, h, e[4]) : h, t[4] = d ? Ie(t[3], z) : e[4];
          }
          return h = e[5], h && (d = t[5], t[5] = d ? As(d, h, e[6]) : h, t[6] = d ? Ie(t[5], z) : e[6]), h = e[7], h && (t[7] = h), r & wt && (t[8] = t[8] == null ? e[8] : lt(t[8], e[8])), t[9] == null && (t[9] = e[9]), t[0] = e[0], t[1] = s, t;
        }
        function Rc(t) {
          var e = [];
          if (t != null)
            for (var n in X(t))
              e.push(n);
          return e;
        }
        function Ac(t) {
          return qn.call(t);
        }
        function Hs(t, e, n) {
          return e = it(e === i ? t.length - 1 : e, 0), function() {
            for (var r = arguments, s = -1, o = it(r.length - e, 0), a = p(o); ++s < o; )
              a[s] = r[e + s];
            s = -1;
            for (var h = p(e + 1); ++s < e; )
              h[s] = r[s];
            return h[e] = n(a), yt(t, this, h);
          };
        }
        function qs(t, e) {
          return e.length < 2 ? t : Pe(t, Bt(e, 0, -1));
        }
        function mc(t, e) {
          for (var n = t.length, r = lt(e.length, n), s = Tt(t); r--; ) {
            var o = e[r];
            t[r] = le(o, n) ? s[o] : i;
          }
          return t;
        }
        function xi(t, e) {
          if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
            return t[e];
        }
        var Ys = $s(hs), Rn = Ga || function(t, e) {
          return ft.setTimeout(t, e);
        }, Li = $s(Xl);
        function zs(t, e, n) {
          var r = e + "";
          return Li(t, _c(r, wc(hc(r), n)));
        }
        function $s(t) {
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
        function hr(t, e) {
          var n = -1, r = t.length, s = r - 1;
          for (e = e === i ? r : e; ++n < e; ) {
            var o = ci(n, s), a = t[o];
            t[o] = t[n], t[n] = a;
          }
          return t.length = e, t;
        }
        var Ks = Sc(function(t) {
          var e = [];
          return t.charCodeAt(0) === 46 && e.push(""), t.replace(go, function(n, r, s, o) {
            e.push(s ? o.replace(Ro, "$1") : r || n);
          }), e;
        });
        function ee(t) {
          if (typeof t == "string" || Lt(t))
            return t;
          var e = t + "";
          return e == "0" && 1 / t == -we ? "-0" : e;
        }
        function Ce(t) {
          if (t != null) {
            try {
              return Hn.call(t);
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
          return Ct(Qf, function(n) {
            var r = "_." + n[0];
            e & n[1] && !Un(t, r) && t.push(r);
          }), t.sort();
        }
        function Xs(t) {
          if (t instanceof U)
            return t.clone();
          var e = new bt(t.__wrapped__, t.__chain__);
          return e.__actions__ = Tt(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e;
        }
        function yc(t, e, n) {
          (n ? _t(t, e, n) : e === i) ? e = 1 : e = it(D(e), 0);
          var r = t == null ? 0 : t.length;
          if (!r || e < 1)
            return [];
          for (var s = 0, o = 0, a = p(Zn(r / e)); s < r; )
            a[o++] = Bt(t, s, s += e);
          return a;
        }
        function Oc(t) {
          for (var e = -1, n = t == null ? 0 : t.length, r = 0, s = []; ++e < n; ) {
            var o = t[e];
            o && (s[r++] = o);
          }
          return s;
        }
        function xc() {
          var t = arguments.length;
          if (!t)
            return [];
          for (var e = p(t - 1), n = arguments[0], r = t; r--; )
            e[r - 1] = arguments[r];
          return ve(N(n) ? Tt(n) : [n], ot(e, 1));
        }
        var Lc = F(function(t, e) {
          return tt(t) ? pn(t, ot(e, 1, tt, !0)) : [];
        }), Nc = F(function(t, e) {
          var n = Mt(e);
          return tt(n) && (n = i), tt(t) ? pn(t, ot(e, 1, tt, !0), y(n, 2)) : [];
        }), Pc = F(function(t, e) {
          var n = Mt(e);
          return tt(n) && (n = i), tt(t) ? pn(t, ot(e, 1, tt, !0), i, n) : [];
        });
        function Dc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : D(e), Bt(t, e < 0 ? 0 : e, r)) : [];
        }
        function Cc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (e = n || e === i ? 1 : D(e), e = r - e, Bt(t, 0, e < 0 ? 0 : e)) : [];
        }
        function Fc(t, e) {
          return t && t.length ? ir(t, y(e, 3), !0, !0) : [];
        }
        function bc(t, e) {
          return t && t.length ? ir(t, y(e, 3), !0) : [];
        }
        function Uc(t, e, n, r) {
          var s = t == null ? 0 : t.length;
          return s ? (n && typeof n != "number" && _t(t, e, n) && (n = 0, r = s), xl(t, e, n, r)) : [];
        }
        function Zs(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = n == null ? 0 : D(n);
          return s < 0 && (s = it(r + s, 0)), Bn(t, y(e, 3), s);
        }
        function Vs(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = r - 1;
          return n !== i && (s = D(n), s = n < 0 ? it(r + s, 0) : lt(s, r - 1)), Bn(t, y(e, 3), s, !0);
        }
        function Js(t) {
          var e = t == null ? 0 : t.length;
          return e ? ot(t, 1) : [];
        }
        function Bc(t) {
          var e = t == null ? 0 : t.length;
          return e ? ot(t, we) : [];
        }
        function Mc(t, e) {
          var n = t == null ? 0 : t.length;
          return n ? (e = e === i ? 1 : D(e), ot(t, e)) : [];
        }
        function Gc(t) {
          for (var e = -1, n = t == null ? 0 : t.length, r = {}; ++e < n; ) {
            var s = t[e];
            r[s[0]] = s[1];
          }
          return r;
        }
        function Qs(t) {
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
        var qc = F(function(t) {
          var e = Q(t, pi);
          return e.length && e[0] === t[0] ? si(e) : [];
        }), Yc = F(function(t) {
          var e = Mt(t), n = Q(t, pi);
          return e === Mt(n) ? e = i : n.pop(), n.length && n[0] === t[0] ? si(n, y(e, 2)) : [];
        }), zc = F(function(t) {
          var e = Mt(t), n = Q(t, pi);
          return e = typeof e == "function" ? e : i, e && n.pop(), n.length && n[0] === t[0] ? si(n, i, e) : [];
        });
        function $c(t, e) {
          return t == null ? "" : Ha.call(t, e);
        }
        function Mt(t) {
          var e = t == null ? 0 : t.length;
          return e ? t[e - 1] : i;
        }
        function Kc(t, e, n) {
          var r = t == null ? 0 : t.length;
          if (!r)
            return -1;
          var s = r;
          return n !== i && (s = D(n), s = s < 0 ? it(r + s, 0) : lt(s, r - 1)), e === e ? wa(t, e, s) : Bn(t, Pu, s, !0);
        }
        function Xc(t, e) {
          return t && t.length ? os(t, D(e)) : i;
        }
        var Zc = F(ks);
        function ks(t, e) {
          return t && t.length && e && e.length ? li(t, e) : t;
        }
        function Vc(t, e, n) {
          return t && t.length && e && e.length ? li(t, e, y(n, 2)) : t;
        }
        function Jc(t, e, n) {
          return t && t.length && e && e.length ? li(t, e, i, n) : t;
        }
        var Qc = ae(function(t, e) {
          var n = t == null ? 0 : t.length, r = ni(t, e);
          return cs(t, Q(e, function(s) {
            return le(s, n) ? +s : s;
          }).sort(Es)), r;
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
          return cs(t, s), n;
        }
        function Ni(t) {
          return t == null ? t : $a.call(t);
        }
        function jc(t, e, n) {
          var r = t == null ? 0 : t.length;
          return r ? (n && typeof n != "number" && _t(t, e, n) ? (e = 0, n = r) : (e = e == null ? 0 : D(e), n = n === i ? r : D(n)), Bt(t, e, n)) : [];
        }
        function th(t, e) {
          return rr(t, e);
        }
        function eh(t, e, n) {
          return gi(t, e, y(n, 2));
        }
        function nh(t, e) {
          var n = t == null ? 0 : t.length;
          if (n) {
            var r = rr(t, e);
            if (r < n && Kt(t[r], e))
              return r;
          }
          return -1;
        }
        function rh(t, e) {
          return rr(t, e, !0);
        }
        function ih(t, e, n) {
          return gi(t, e, y(n, 2), !0);
        }
        function uh(t, e) {
          var n = t == null ? 0 : t.length;
          if (n) {
            var r = rr(t, e, !0) - 1;
            if (Kt(t[r], e))
              return r;
          }
          return -1;
        }
        function sh(t) {
          return t && t.length ? gs(t) : [];
        }
        function fh(t, e) {
          return t && t.length ? gs(t, y(e, 2)) : [];
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
          return t && t.length ? ir(t, y(e, 3), !1, !0) : [];
        }
        function hh(t, e) {
          return t && t.length ? ir(t, y(e, 3)) : [];
        }
        var gh = F(function(t) {
          return Ee(ot(t, 1, tt, !0));
        }), dh = F(function(t) {
          var e = Mt(t);
          return tt(e) && (e = i), Ee(ot(t, 1, tt, !0), y(e, 2));
        }), _h = F(function(t) {
          var e = Mt(t);
          return e = typeof e == "function" ? e : i, Ee(ot(t, 1, tt, !0), i, e);
        });
        function ph(t) {
          return t && t.length ? Ee(t) : [];
        }
        function vh(t, e) {
          return t && t.length ? Ee(t, y(e, 2)) : [];
        }
        function Ih(t, e) {
          return e = typeof e == "function" ? e : i, t && t.length ? Ee(t, i, e) : [];
        }
        function Pi(t) {
          if (!(t && t.length))
            return [];
          var e = 0;
          return t = pe(t, function(n) {
            if (tt(n))
              return e = it(n.length, e), !0;
          }), Zr(e, function(n) {
            return Q(t, $r(n));
          });
        }
        function js(t, e) {
          if (!(t && t.length))
            return [];
          var n = Pi(t);
          return e == null ? n : Q(n, function(r) {
            return yt(e, i, r);
          });
        }
        var Th = F(function(t, e) {
          return tt(t) ? pn(t, e) : [];
        }), Sh = F(function(t) {
          return _i(pe(t, tt));
        }), Eh = F(function(t) {
          var e = Mt(t);
          return tt(e) && (e = i), _i(pe(t, tt), y(e, 2));
        }), Rh = F(function(t) {
          var e = Mt(t);
          return e = typeof e == "function" ? e : i, _i(pe(t, tt), i, e);
        }), Ah = F(Pi);
        function mh(t, e) {
          return vs(t || [], e || [], _n);
        }
        function wh(t, e) {
          return vs(t || [], e || [], Tn);
        }
        var yh = F(function(t) {
          var e = t.length, n = e > 1 ? t[e - 1] : i;
          return n = typeof n == "function" ? (t.pop(), n) : i, js(t, n);
        });
        function tf(t) {
          var e = f(t);
          return e.__chain__ = !0, e;
        }
        function Oh(t, e) {
          return e(t), t;
        }
        function gr(t, e) {
          return e(t);
        }
        var xh = ae(function(t) {
          var e = t.length, n = e ? t[0] : 0, r = this.__wrapped__, s = function(o) {
            return ni(o, t);
          };
          return e > 1 || this.__actions__.length || !(r instanceof U) || !le(n) ? this.thru(s) : (r = r.slice(n, +n + (e ? 1 : 0)), r.__actions__.push({
            func: gr,
            args: [s],
            thisArg: i
          }), new bt(r, this.__chain__).thru(function(o) {
            return e && !o.length && o.push(i), o;
          }));
        });
        function Lh() {
          return tf(this);
        }
        function Nh() {
          return new bt(this.value(), this.__chain__);
        }
        function Ph() {
          this.__values__ === i && (this.__values__ = _f(this.value()));
          var t = this.__index__ >= this.__values__.length, e = t ? i : this.__values__[this.__index__++];
          return { done: t, value: e };
        }
        function Dh() {
          return this;
        }
        function Ch(t) {
          for (var e, n = this; n instanceof kn; ) {
            var r = Xs(n);
            r.__index__ = 0, r.__values__ = i, e ? s.__wrapped__ = r : e = r;
            var s = r;
            n = n.__wrapped__;
          }
          return s.__wrapped__ = t, e;
        }
        function Fh() {
          var t = this.__wrapped__;
          if (t instanceof U) {
            var e = t;
            return this.__actions__.length && (e = new U(this)), e = e.reverse(), e.__actions__.push({
              func: gr,
              args: [Ni],
              thisArg: i
            }), new bt(e, this.__chain__);
          }
          return this.thru(Ni);
        }
        function bh() {
          return ps(this.__wrapped__, this.__actions__);
        }
        var Uh = ur(function(t, e, n) {
          $.call(t, n) ? ++t[n] : fe(t, n, 1);
        });
        function Bh(t, e, n) {
          var r = N(t) ? Lu : Ol;
          return n && _t(t, e, n) && (e = i), r(t, y(e, 3));
        }
        function Mh(t, e) {
          var n = N(t) ? pe : ju;
          return n(t, y(e, 3));
        }
        var Gh = Os(Zs), Wh = Os(Vs);
        function Hh(t, e) {
          return ot(dr(t, e), 1);
        }
        function qh(t, e) {
          return ot(dr(t, e), we);
        }
        function Yh(t, e, n) {
          return n = n === i ? 1 : D(n), ot(dr(t, e), n);
        }
        function ef(t, e) {
          var n = N(t) ? Ct : Se;
          return n(t, y(e, 3));
        }
        function nf(t, e) {
          var n = N(t) ? oa : ku;
          return n(t, y(e, 3));
        }
        var zh = ur(function(t, e, n) {
          $.call(t, n) ? t[n].push(e) : fe(t, n, [e]);
        });
        function $h(t, e, n, r) {
          t = St(t) ? t : Je(t), n = n && !r ? D(n) : 0;
          var s = t.length;
          return n < 0 && (n = it(s + n, 0)), Tr(t) ? n <= s && t.indexOf(e, n) > -1 : !!s && Me(t, e, n) > -1;
        }
        var Kh = F(function(t, e, n) {
          var r = -1, s = typeof e == "function", o = St(t) ? p(t.length) : [];
          return Se(t, function(a) {
            o[++r] = s ? yt(e, a, n) : vn(a, e, n);
          }), o;
        }), Xh = ur(function(t, e, n) {
          fe(t, n, e);
        });
        function dr(t, e) {
          var n = N(t) ? Q : us;
          return n(t, y(e, 3));
        }
        function Zh(t, e, n, r) {
          return t == null ? [] : (N(e) || (e = e == null ? [] : [e]), n = r ? i : n, N(n) || (n = n == null ? [] : [n]), as(t, e, n));
        }
        var Vh = ur(function(t, e, n) {
          t[n ? 0 : 1].push(e);
        }, function() {
          return [[], []];
        });
        function Jh(t, e, n) {
          var r = N(t) ? Yr : Cu, s = arguments.length < 3;
          return r(t, y(e, 4), n, s, Se);
        }
        function Qh(t, e, n) {
          var r = N(t) ? aa : Cu, s = arguments.length < 3;
          return r(t, y(e, 4), n, s, ku);
        }
        function kh(t, e) {
          var n = N(t) ? pe : ju;
          return n(t, vr(y(e, 3)));
        }
        function jh(t) {
          var e = N(t) ? Zu : $l;
          return e(t);
        }
        function tg(t, e, n) {
          (n ? _t(t, e, n) : e === i) ? e = 1 : e = D(e);
          var r = N(t) ? Rl : Kl;
          return r(t, e);
        }
        function eg(t) {
          var e = N(t) ? Al : Zl;
          return e(t);
        }
        function ng(t) {
          if (t == null)
            return 0;
          if (St(t))
            return Tr(t) ? We(t) : t.length;
          var e = ct(t);
          return e == qt || e == Yt ? t.size : oi(t).length;
        }
        function rg(t, e, n) {
          var r = N(t) ? zr : Vl;
          return n && _t(t, e, n) && (e = i), r(t, y(e, 3));
        }
        var ig = F(function(t, e) {
          if (t == null)
            return [];
          var n = e.length;
          return n > 1 && _t(t, e[0], e[1]) ? e = [] : n > 2 && _t(e[0], e[1], e[2]) && (e = [e[0]]), as(t, ot(e, 1), []);
        }), _r = Ma || function() {
          return ft.Date.now();
        };
        function ug(t, e) {
          if (typeof e != "function")
            throw new Ft(R);
          return t = D(t), function() {
            if (--t < 1)
              return e.apply(this, arguments);
          };
        }
        function rf(t, e, n) {
          return e = n ? i : e, e = t && e == null ? t.length : e, oe(t, wt, i, i, i, i, e);
        }
        function uf(t, e) {
          var n;
          if (typeof e != "function")
            throw new Ft(R);
          return t = D(t), function() {
            return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = i), n;
          };
        }
        var Di = F(function(t, e, n) {
          var r = gt;
          if (n.length) {
            var s = Ie(n, Ze(Di));
            r |= mt;
          }
          return oe(t, r, e, n, s);
        }), sf = F(function(t, e, n) {
          var r = gt | Wt;
          if (n.length) {
            var s = Ie(n, Ze(sf));
            r |= mt;
          }
          return oe(e, r, t, n, s);
        });
        function ff(t, e, n) {
          e = n ? i : e;
          var r = oe(t, It, i, i, i, i, i, e);
          return r.placeholder = ff.placeholder, r;
        }
        function of(t, e, n) {
          e = n ? i : e;
          var r = oe(t, Vt, i, i, i, i, i, e);
          return r.placeholder = of.placeholder, r;
        }
        function af(t, e, n) {
          var r, s, o, a, h, d, I = 0, T = !1, E = !1, A = !0;
          if (typeof t != "function")
            throw new Ft(R);
          e = Gt(e) || 0, k(n) && (T = !!n.leading, E = "maxWait" in n, o = E ? it(Gt(n.maxWait) || 0, e) : o, A = "trailing" in n ? !!n.trailing : A);
          function w(et) {
            var Xt = r, ge = s;
            return r = s = i, I = et, a = t.apply(ge, Xt), a;
          }
          function O(et) {
            return I = et, h = Rn(b, e), T ? w(et) : a;
          }
          function C(et) {
            var Xt = et - d, ge = et - I, xf = e - Xt;
            return E ? lt(xf, o - ge) : xf;
          }
          function x(et) {
            var Xt = et - d, ge = et - I;
            return d === i || Xt >= e || Xt < 0 || E && ge >= o;
          }
          function b() {
            var et = _r();
            if (x(et))
              return B(et);
            h = Rn(b, C(et));
          }
          function B(et) {
            return h = i, A && r ? w(et) : (r = s = i, a);
          }
          function Nt() {
            h !== i && Is(h), I = 0, r = d = s = h = i;
          }
          function pt() {
            return h === i ? a : B(_r());
          }
          function Pt() {
            var et = _r(), Xt = x(et);
            if (r = arguments, s = this, d = et, Xt) {
              if (h === i)
                return O(d);
              if (E)
                return Is(h), h = Rn(b, e), w(d);
            }
            return h === i && (h = Rn(b, e)), a;
          }
          return Pt.cancel = Nt, Pt.flush = pt, Pt;
        }
        var sg = F(function(t, e) {
          return Qu(t, 1, e);
        }), fg = F(function(t, e, n) {
          return Qu(t, Gt(e) || 0, n);
        });
        function og(t) {
          return oe(t, Ht);
        }
        function pr(t, e) {
          if (typeof t != "function" || e != null && typeof e != "function")
            throw new Ft(R);
          var n = function() {
            var r = arguments, s = e ? e.apply(this, r) : r[0], o = n.cache;
            if (o.has(s))
              return o.get(s);
            var a = t.apply(this, r);
            return n.cache = o.set(s, a) || o, a;
          };
          return n.cache = new (pr.Cache || se)(), n;
        }
        pr.Cache = se;
        function vr(t) {
          if (typeof t != "function")
            throw new Ft(R);
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
          return uf(2, t);
        }
        var lg = Jl(function(t, e) {
          e = e.length == 1 && N(e[0]) ? Q(e[0], Ot(y())) : Q(ot(e, 1), Ot(y()));
          var n = e.length;
          return F(function(r) {
            for (var s = -1, o = lt(r.length, n); ++s < o; )
              r[s] = e[s].call(this, r[s]);
            return yt(t, this, r);
          });
        }), Ci = F(function(t, e) {
          var n = Ie(e, Ze(Ci));
          return oe(t, mt, i, e, n);
        }), lf = F(function(t, e) {
          var n = Ie(e, Ze(lf));
          return oe(t, Jt, i, e, n);
        }), cg = ae(function(t, e) {
          return oe(t, nt, i, i, i, e);
        });
        function hg(t, e) {
          if (typeof t != "function")
            throw new Ft(R);
          return e = e === i ? e : D(e), F(t, e);
        }
        function gg(t, e) {
          if (typeof t != "function")
            throw new Ft(R);
          return e = e == null ? 0 : it(D(e), 0), F(function(n) {
            var r = n[e], s = Ae(n, 0, e);
            return r && ve(s, r), yt(t, this, s);
          });
        }
        function dg(t, e, n) {
          var r = !0, s = !0;
          if (typeof t != "function")
            throw new Ft(R);
          return k(n) && (r = "leading" in n ? !!n.leading : r, s = "trailing" in n ? !!n.trailing : s), af(t, e, {
            leading: r,
            maxWait: e,
            trailing: s
          });
        }
        function _g(t) {
          return rf(t, 1);
        }
        function pg(t, e) {
          return Ci(vi(e), t);
        }
        function vg() {
          if (!arguments.length)
            return [];
          var t = arguments[0];
          return N(t) ? t : [t];
        }
        function Ig(t) {
          return Ut(t, at);
        }
        function Tg(t, e) {
          return e = typeof e == "function" ? e : i, Ut(t, at, e);
        }
        function Sg(t) {
          return Ut(t, K | at);
        }
        function Eg(t, e) {
          return e = typeof e == "function" ? e : i, Ut(t, K | at, e);
        }
        function Rg(t, e) {
          return e == null || Ju(t, e, ut(e));
        }
        function Kt(t, e) {
          return t === e || t !== t && e !== e;
        }
        var Ag = ar(ui), mg = ar(function(t, e) {
          return t >= e;
        }), Fe = ns(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? ns : function(t) {
          return j(t) && $.call(t, "callee") && !qu.call(t, "callee");
        }, N = p.isArray, wg = Au ? Ot(Au) : Cl;
        function St(t) {
          return t != null && Ir(t.length) && !ce(t);
        }
        function tt(t) {
          return j(t) && St(t);
        }
        function yg(t) {
          return t === !0 || t === !1 || j(t) && dt(t) == en;
        }
        var me = Wa || zi, Og = mu ? Ot(mu) : Fl;
        function xg(t) {
          return j(t) && t.nodeType === 1 && !An(t);
        }
        function Lg(t) {
          if (t == null)
            return !0;
          if (St(t) && (N(t) || typeof t == "string" || typeof t.splice == "function" || me(t) || Ve(t) || Fe(t)))
            return !t.length;
          var e = ct(t);
          if (e == qt || e == Yt)
            return !t.size;
          if (En(t))
            return !oi(t).length;
          for (var n in t)
            if ($.call(t, n))
              return !1;
          return !0;
        }
        function Ng(t, e) {
          return In(t, e);
        }
        function Pg(t, e, n) {
          n = typeof n == "function" ? n : i;
          var r = n ? n(t, e) : i;
          return r === i ? In(t, e, i, n) : !!r;
        }
        function Fi(t) {
          if (!j(t))
            return !1;
          var e = dt(t);
          return e == Nn || e == jf || typeof t.message == "string" && typeof t.name == "string" && !An(t);
        }
        function Dg(t) {
          return typeof t == "number" && zu(t);
        }
        function ce(t) {
          if (!k(t))
            return !1;
          var e = dt(t);
          return e == Pn || e == Qi || e == kf || e == eo;
        }
        function cf(t) {
          return typeof t == "number" && t == D(t);
        }
        function Ir(t) {
          return typeof t == "number" && t > -1 && t % 1 == 0 && t <= _e;
        }
        function k(t) {
          var e = typeof t;
          return t != null && (e == "object" || e == "function");
        }
        function j(t) {
          return t != null && typeof t == "object";
        }
        var hf = wu ? Ot(wu) : Ul;
        function Cg(t, e) {
          return t === e || fi(t, e, mi(e));
        }
        function Fg(t, e, n) {
          return n = typeof n == "function" ? n : i, fi(t, e, mi(e), n);
        }
        function bg(t) {
          return gf(t) && t != +t;
        }
        function Ug(t) {
          if (Tc(t))
            throw new L(S);
          return rs(t);
        }
        function Bg(t) {
          return t === null;
        }
        function Mg(t) {
          return t == null;
        }
        function gf(t) {
          return typeof t == "number" || j(t) && dt(t) == rn;
        }
        function An(t) {
          if (!j(t) || dt(t) != ie)
            return !1;
          var e = $n(t);
          if (e === null)
            return !0;
          var n = $.call(e, "constructor") && e.constructor;
          return typeof n == "function" && n instanceof n && Hn.call(n) == Fa;
        }
        var bi = yu ? Ot(yu) : Bl;
        function Gg(t) {
          return cf(t) && t >= -_e && t <= _e;
        }
        var df = Ou ? Ot(Ou) : Ml;
        function Tr(t) {
          return typeof t == "string" || !N(t) && j(t) && dt(t) == sn;
        }
        function Lt(t) {
          return typeof t == "symbol" || j(t) && dt(t) == Dn;
        }
        var Ve = xu ? Ot(xu) : Gl;
        function Wg(t) {
          return t === i;
        }
        function Hg(t) {
          return j(t) && ct(t) == fn;
        }
        function qg(t) {
          return j(t) && dt(t) == ro;
        }
        var Yg = ar(ai), zg = ar(function(t, e) {
          return t <= e;
        });
        function _f(t) {
          if (!t)
            return [];
          if (St(t))
            return Tr(t) ? zt(t) : Tt(t);
          if (ln && t[ln])
            return Ra(t[ln]());
          var e = ct(t), n = e == qt ? Jr : e == Yt ? Mn : Je;
          return n(t);
        }
        function he(t) {
          if (!t)
            return t === 0 ? t : 0;
          if (t = Gt(t), t === we || t === -we) {
            var e = t < 0 ? -1 : 1;
            return e * Zf;
          }
          return t === t ? t : 0;
        }
        function D(t) {
          var e = he(t), n = e % 1;
          return e === e ? n ? e - n : e : 0;
        }
        function pf(t) {
          return t ? Ne(D(t), 0, kt) : 0;
        }
        function Gt(t) {
          if (typeof t == "number")
            return t;
          if (Lt(t))
            return xn;
          if (k(t)) {
            var e = typeof t.valueOf == "function" ? t.valueOf() : t;
            t = k(e) ? e + "" : e;
          }
          if (typeof t != "string")
            return t === 0 ? t : +t;
          t = Fu(t);
          var n = wo.test(t);
          return n || Oo.test(t) ? ua(t.slice(2), n ? 2 : 8) : mo.test(t) ? xn : +t;
        }
        function vf(t) {
          return te(t, Et(t));
        }
        function $g(t) {
          return t ? Ne(D(t), -_e, _e) : t === 0 ? t : 0;
        }
        function H(t) {
          return t == null ? "" : xt(t);
        }
        var Kg = Ke(function(t, e) {
          if (En(e) || St(e)) {
            te(e, ut(e), t);
            return;
          }
          for (var n in e)
            $.call(e, n) && _n(t, n, e[n]);
        }), If = Ke(function(t, e) {
          te(e, Et(e), t);
        }), Sr = Ke(function(t, e, n, r) {
          te(e, Et(e), t, r);
        }), Xg = Ke(function(t, e, n, r) {
          te(e, ut(e), t, r);
        }), Zg = ae(ni);
        function Vg(t, e) {
          var n = $e(t);
          return e == null ? n : Vu(n, e);
        }
        var Jg = F(function(t, e) {
          t = X(t);
          var n = -1, r = e.length, s = r > 2 ? e[2] : i;
          for (s && _t(e[0], e[1], s) && (r = 1); ++n < r; )
            for (var o = e[n], a = Et(o), h = -1, d = a.length; ++h < d; ) {
              var I = a[h], T = t[I];
              (T === i || Kt(T, qe[I]) && !$.call(t, I)) && (t[I] = o[I]);
            }
          return t;
        }), Qg = F(function(t) {
          return t.push(i, Fs), yt(Tf, i, t);
        });
        function kg(t, e) {
          return Nu(t, y(e, 3), jt);
        }
        function jg(t, e) {
          return Nu(t, y(e, 3), ii);
        }
        function td(t, e) {
          return t == null ? t : ri(t, y(e, 3), Et);
        }
        function ed(t, e) {
          return t == null ? t : ts(t, y(e, 3), Et);
        }
        function nd(t, e) {
          return t && jt(t, y(e, 3));
        }
        function rd(t, e) {
          return t && ii(t, y(e, 3));
        }
        function id(t) {
          return t == null ? [] : er(t, ut(t));
        }
        function ud(t) {
          return t == null ? [] : er(t, Et(t));
        }
        function Ui(t, e, n) {
          var r = t == null ? i : Pe(t, e);
          return r === i ? n : r;
        }
        function sd(t, e) {
          return t != null && Bs(t, e, Ll);
        }
        function Bi(t, e) {
          return t != null && Bs(t, e, Nl);
        }
        var fd = Ls(function(t, e, n) {
          e != null && typeof e.toString != "function" && (e = qn.call(e)), t[e] = n;
        }, Gi(Rt)), od = Ls(function(t, e, n) {
          e != null && typeof e.toString != "function" && (e = qn.call(e)), $.call(t, e) ? t[e].push(n) : t[e] = [n];
        }, y), ad = F(vn);
        function ut(t) {
          return St(t) ? Xu(t) : oi(t);
        }
        function Et(t) {
          return St(t) ? Xu(t, !0) : Wl(t);
        }
        function ld(t, e) {
          var n = {};
          return e = y(e, 3), jt(t, function(r, s, o) {
            fe(n, e(r, s, o), r);
          }), n;
        }
        function cd(t, e) {
          var n = {};
          return e = y(e, 3), jt(t, function(r, s, o) {
            fe(n, s, e(r, s, o));
          }), n;
        }
        var hd = Ke(function(t, e, n) {
          nr(t, e, n);
        }), Tf = Ke(function(t, e, n, r) {
          nr(t, e, n, r);
        }), gd = ae(function(t, e) {
          var n = {};
          if (t == null)
            return n;
          var r = !1;
          e = Q(e, function(o) {
            return o = Re(o, t), r || (r = o.length > 1), o;
          }), te(t, Ri(t), n), r && (n = Ut(n, K | vt | at, fc));
          for (var s = e.length; s--; )
            di(n, e[s]);
          return n;
        });
        function dd(t, e) {
          return Sf(t, vr(y(e)));
        }
        var _d = ae(function(t, e) {
          return t == null ? {} : ql(t, e);
        });
        function Sf(t, e) {
          if (t == null)
            return {};
          var n = Q(Ri(t), function(r) {
            return [r];
          });
          return e = y(e), ls(t, n, function(r, s) {
            return e(r, s[0]);
          });
        }
        function pd(t, e, n) {
          e = Re(e, t);
          var r = -1, s = e.length;
          for (s || (s = 1, t = i); ++r < s; ) {
            var o = t == null ? i : t[ee(e[r])];
            o === i && (r = s, o = n), t = ce(o) ? o.call(t) : o;
          }
          return t;
        }
        function vd(t, e, n) {
          return t == null ? t : Tn(t, e, n);
        }
        function Id(t, e, n, r) {
          return r = typeof r == "function" ? r : i, t == null ? t : Tn(t, e, n, r);
        }
        var Ef = Ds(ut), Rf = Ds(Et);
        function Td(t, e, n) {
          var r = N(t), s = r || me(t) || Ve(t);
          if (e = y(e, 4), n == null) {
            var o = t && t.constructor;
            s ? n = r ? new o() : [] : k(t) ? n = ce(o) ? $e($n(t)) : {} : n = {};
          }
          return (s ? Ct : jt)(t, function(a, h, d) {
            return e(n, a, h, d);
          }), n;
        }
        function Sd(t, e) {
          return t == null ? !0 : di(t, e);
        }
        function Ed(t, e, n) {
          return t == null ? t : _s(t, e, vi(n));
        }
        function Rd(t, e, n, r) {
          return r = typeof r == "function" ? r : i, t == null ? t : _s(t, e, vi(n), r);
        }
        function Je(t) {
          return t == null ? [] : Vr(t, ut(t));
        }
        function Ad(t) {
          return t == null ? [] : Vr(t, Et(t));
        }
        function md(t, e, n) {
          return n === i && (n = e, e = i), n !== i && (n = Gt(n), n = n === n ? n : 0), e !== i && (e = Gt(e), e = e === e ? e : 0), Ne(Gt(t), e, n);
        }
        function wd(t, e, n) {
          return e = he(e), n === i ? (n = e, e = 0) : n = he(n), t = Gt(t), Pl(t, e, n);
        }
        function yd(t, e, n) {
          if (n && typeof n != "boolean" && _t(t, e, n) && (e = n = i), n === i && (typeof e == "boolean" ? (n = e, e = i) : typeof t == "boolean" && (n = t, t = i)), t === i && e === i ? (t = 0, e = 1) : (t = he(t), e === i ? (e = t, t = 0) : e = he(e)), t > e) {
            var r = t;
            t = e, e = r;
          }
          if (n || t % 1 || e % 1) {
            var s = $u();
            return lt(t + s * (e - t + ia("1e-" + ((s + "").length - 1))), e);
          }
          return ci(t, e);
        }
        var Od = Xe(function(t, e, n) {
          return e = e.toLowerCase(), t + (n ? Af(e) : e);
        });
        function Af(t) {
          return Mi(H(t).toLowerCase());
        }
        function mf(t) {
          return t = H(t), t && t.replace(Lo, va).replace(Zo, "");
        }
        function xd(t, e, n) {
          t = H(t), e = xt(e);
          var r = t.length;
          n = n === i ? r : Ne(D(n), 0, r);
          var s = n;
          return n -= e.length, n >= 0 && t.slice(n, s) == e;
        }
        function Ld(t) {
          return t = H(t), t && oo.test(t) ? t.replace(tu, Ia) : t;
        }
        function Nd(t) {
          return t = H(t), t && _o.test(t) ? t.replace(Cr, "\\$&") : t;
        }
        var Pd = Xe(function(t, e, n) {
          return t + (n ? "-" : "") + e.toLowerCase();
        }), Dd = Xe(function(t, e, n) {
          return t + (n ? " " : "") + e.toLowerCase();
        }), Cd = ys("toLowerCase");
        function Fd(t, e, n) {
          t = H(t), e = D(e);
          var r = e ? We(t) : 0;
          if (!e || r >= e)
            return t;
          var s = (e - r) / 2;
          return or(Vn(s), n) + t + or(Zn(s), n);
        }
        function bd(t, e, n) {
          t = H(t), e = D(e);
          var r = e ? We(t) : 0;
          return e && r < e ? t + or(e - r, n) : t;
        }
        function Ud(t, e, n) {
          t = H(t), e = D(e);
          var r = e ? We(t) : 0;
          return e && r < e ? or(e - r, n) + t : t;
        }
        function Bd(t, e, n) {
          return n || e == null ? e = 0 : e && (e = +e), za(H(t).replace(Fr, ""), e || 0);
        }
        function Md(t, e, n) {
          return (n ? _t(t, e, n) : e === i) ? e = 1 : e = D(e), hi(H(t), e);
        }
        function Gd() {
          var t = arguments, e = H(t[0]);
          return t.length < 3 ? e : e.replace(t[1], t[2]);
        }
        var Wd = Xe(function(t, e, n) {
          return t + (n ? "_" : "") + e.toLowerCase();
        });
        function Hd(t, e, n) {
          return n && typeof n != "number" && _t(t, e, n) && (e = n = i), n = n === i ? kt : n >>> 0, n ? (t = H(t), t && (typeof e == "string" || e != null && !bi(e)) && (e = xt(e), !e && Ge(t)) ? Ae(zt(t), 0, n) : t.split(e, n)) : [];
        }
        var qd = Xe(function(t, e, n) {
          return t + (n ? " " : "") + Mi(e);
        });
        function Yd(t, e, n) {
          return t = H(t), n = n == null ? 0 : Ne(D(n), 0, t.length), e = xt(e), t.slice(n, n + e.length) == e;
        }
        function zd(t, e, n) {
          var r = f.templateSettings;
          n && _t(t, e, n) && (e = i), t = H(t), e = Sr({}, e, r, Cs);
          var s = Sr({}, e.imports, r.imports, Cs), o = ut(s), a = Vr(s, o), h, d, I = 0, T = e.interpolate || Cn, E = "__p += '", A = Qr(
            (e.escape || Cn).source + "|" + T.source + "|" + (T === eu ? Ao : Cn).source + "|" + (e.evaluate || Cn).source + "|$",
            "g"
          ), w = "//# sourceURL=" + ($.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++jo + "]") + `
`;
          t.replace(A, function(x, b, B, Nt, pt, Pt) {
            return B || (B = Nt), E += t.slice(I, Pt).replace(No, Ta), b && (h = !0, E += `' +
__e(` + b + `) +
'`), pt && (d = !0, E += `';
` + pt + `;
__p += '`), B && (E += `' +
((__t = (` + B + `)) == null ? '' : __t) +
'`), I = Pt + x.length, x;
          }), E += `';
`;
          var O = $.call(e, "variable") && e.variable;
          if (!O)
            E = `with (obj) {
` + E + `
}
`;
          else if (Eo.test(O))
            throw new L(P);
          E = (d ? E.replace(io, "") : E).replace(uo, "$1").replace(so, "$1;"), E = "function(" + (O || "obj") + `) {
` + (O ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (h ? ", __e = _.escape" : "") + (d ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + E + `return __p
}`;
          var C = yf(function() {
            return G(o, w + "return " + E).apply(i, a);
          });
          if (C.source = E, Fi(C))
            throw C;
          return C;
        }
        function $d(t) {
          return H(t).toLowerCase();
        }
        function Kd(t) {
          return H(t).toUpperCase();
        }
        function Xd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return Fu(t);
          if (!t || !(e = xt(e)))
            return t;
          var r = zt(t), s = zt(e), o = bu(r, s), a = Uu(r, s) + 1;
          return Ae(r, o, a).join("");
        }
        function Zd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return t.slice(0, Mu(t) + 1);
          if (!t || !(e = xt(e)))
            return t;
          var r = zt(t), s = Uu(r, zt(e)) + 1;
          return Ae(r, 0, s).join("");
        }
        function Vd(t, e, n) {
          if (t = H(t), t && (n || e === i))
            return t.replace(Fr, "");
          if (!t || !(e = xt(e)))
            return t;
          var r = zt(t), s = bu(r, zt(e));
          return Ae(r, s).join("");
        }
        function Jd(t, e) {
          var n = Qt, r = tn;
          if (k(e)) {
            var s = "separator" in e ? e.separator : s;
            n = "length" in e ? D(e.length) : n, r = "omission" in e ? xt(e.omission) : r;
          }
          t = H(t);
          var o = t.length;
          if (Ge(t)) {
            var a = zt(t);
            o = a.length;
          }
          if (n >= o)
            return t;
          var h = n - We(r);
          if (h < 1)
            return r;
          var d = a ? Ae(a, 0, h).join("") : t.slice(0, h);
          if (s === i)
            return d + r;
          if (a && (h += d.length - h), bi(s)) {
            if (t.slice(h).search(s)) {
              var I, T = d;
              for (s.global || (s = Qr(s.source, H(nu.exec(s)) + "g")), s.lastIndex = 0; I = s.exec(T); )
                var E = I.index;
              d = d.slice(0, E === i ? h : E);
            }
          } else if (t.indexOf(xt(s), h) != h) {
            var A = d.lastIndexOf(s);
            A > -1 && (d = d.slice(0, A));
          }
          return d + r;
        }
        function Qd(t) {
          return t = H(t), t && fo.test(t) ? t.replace(ji, ya) : t;
        }
        var kd = Xe(function(t, e, n) {
          return t + (n ? " " : "") + e.toUpperCase();
        }), Mi = ys("toUpperCase");
        function wf(t, e, n) {
          return t = H(t), e = n ? i : e, e === i ? Ea(t) ? La(t) : ha(t) : t.match(e) || [];
        }
        var yf = F(function(t, e) {
          try {
            return yt(t, i, e);
          } catch (n) {
            return Fi(n) ? n : new L(n);
          }
        }), jd = ae(function(t, e) {
          return Ct(e, function(n) {
            n = ee(n), fe(t, n, Di(t[n], t));
          }), t;
        });
        function t_(t) {
          var e = t == null ? 0 : t.length, n = y();
          return t = e ? Q(t, function(r) {
            if (typeof r[1] != "function")
              throw new Ft(R);
            return [n(r[0]), r[1]];
          }) : [], F(function(r) {
            for (var s = -1; ++s < e; ) {
              var o = t[s];
              if (yt(o[0], this, r))
                return yt(o[1], this, r);
            }
          });
        }
        function e_(t) {
          return yl(Ut(t, K));
        }
        function Gi(t) {
          return function() {
            return t;
          };
        }
        function n_(t, e) {
          return t == null || t !== t ? e : t;
        }
        var r_ = xs(), i_ = xs(!0);
        function Rt(t) {
          return t;
        }
        function Wi(t) {
          return is(typeof t == "function" ? t : Ut(t, K));
        }
        function u_(t) {
          return ss(Ut(t, K));
        }
        function s_(t, e) {
          return fs(t, Ut(e, K));
        }
        var f_ = F(function(t, e) {
          return function(n) {
            return vn(n, t, e);
          };
        }), o_ = F(function(t, e) {
          return function(n) {
            return vn(t, n, e);
          };
        });
        function Hi(t, e, n) {
          var r = ut(e), s = er(e, r);
          n == null && !(k(e) && (s.length || !r.length)) && (n = e, e = t, t = this, s = er(e, ut(e)));
          var o = !(k(n) && "chain" in n) || !!n.chain, a = ce(t);
          return Ct(s, function(h) {
            var d = e[h];
            t[h] = d, a && (t.prototype[h] = function() {
              var I = this.__chain__;
              if (o || I) {
                var T = t(this.__wrapped__), E = T.__actions__ = Tt(this.__actions__);
                return E.push({ func: d, args: arguments, thisArg: t }), T.__chain__ = I, T;
              }
              return d.apply(t, ve([this.value()], arguments));
            });
          }), t;
        }
        function a_() {
          return ft._ === this && (ft._ = ba), this;
        }
        function qi() {
        }
        function l_(t) {
          return t = D(t), F(function(e) {
            return os(e, t);
          });
        }
        var c_ = Ti(Q), h_ = Ti(Lu), g_ = Ti(zr);
        function Of(t) {
          return yi(t) ? $r(ee(t)) : Yl(t);
        }
        function d_(t) {
          return function(e) {
            return t == null ? i : Pe(t, e);
          };
        }
        var __ = Ns(), p_ = Ns(!0);
        function Yi() {
          return [];
        }
        function zi() {
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
          if (t = D(t), t < 1 || t > _e)
            return [];
          var n = kt, r = lt(t, kt);
          e = y(e), t -= kt;
          for (var s = Zr(r, e); ++n < t; )
            e(n);
          return s;
        }
        function E_(t) {
          return N(t) ? Q(t, ee) : Lt(t) ? [t] : Tt(Ks(H(t)));
        }
        function R_(t) {
          var e = ++Ca;
          return H(t) + e;
        }
        var A_ = fr(function(t, e) {
          return t + e;
        }, 0), m_ = Si("ceil"), w_ = fr(function(t, e) {
          return t / e;
        }, 1), y_ = Si("floor");
        function O_(t) {
          return t && t.length ? tr(t, Rt, ui) : i;
        }
        function x_(t, e) {
          return t && t.length ? tr(t, y(e, 2), ui) : i;
        }
        function L_(t) {
          return Du(t, Rt);
        }
        function N_(t, e) {
          return Du(t, y(e, 2));
        }
        function P_(t) {
          return t && t.length ? tr(t, Rt, ai) : i;
        }
        function D_(t, e) {
          return t && t.length ? tr(t, y(e, 2), ai) : i;
        }
        var C_ = fr(function(t, e) {
          return t * e;
        }, 1), F_ = Si("round"), b_ = fr(function(t, e) {
          return t - e;
        }, 0);
        function U_(t) {
          return t && t.length ? Xr(t, Rt) : 0;
        }
        function B_(t, e) {
          return t && t.length ? Xr(t, y(e, 2)) : 0;
        }
        return f.after = ug, f.ary = rf, f.assign = Kg, f.assignIn = If, f.assignInWith = Sr, f.assignWith = Xg, f.at = Zg, f.before = uf, f.bind = Di, f.bindAll = jd, f.bindKey = sf, f.castArray = vg, f.chain = tf, f.chunk = yc, f.compact = Oc, f.concat = xc, f.cond = t_, f.conforms = e_, f.constant = Gi, f.countBy = Uh, f.create = Vg, f.curry = ff, f.curryRight = of, f.debounce = af, f.defaults = Jg, f.defaultsDeep = Qg, f.defer = sg, f.delay = fg, f.difference = Lc, f.differenceBy = Nc, f.differenceWith = Pc, f.drop = Dc, f.dropRight = Cc, f.dropRightWhile = Fc, f.dropWhile = bc, f.fill = Uc, f.filter = Mh, f.flatMap = Hh, f.flatMapDeep = qh, f.flatMapDepth = Yh, f.flatten = Js, f.flattenDeep = Bc, f.flattenDepth = Mc, f.flip = og, f.flow = r_, f.flowRight = i_, f.fromPairs = Gc, f.functions = id, f.functionsIn = ud, f.groupBy = zh, f.initial = Hc, f.intersection = qc, f.intersectionBy = Yc, f.intersectionWith = zc, f.invert = fd, f.invertBy = od, f.invokeMap = Kh, f.iteratee = Wi, f.keyBy = Xh, f.keys = ut, f.keysIn = Et, f.map = dr, f.mapKeys = ld, f.mapValues = cd, f.matches = u_, f.matchesProperty = s_, f.memoize = pr, f.merge = hd, f.mergeWith = Tf, f.method = f_, f.methodOf = o_, f.mixin = Hi, f.negate = vr, f.nthArg = l_, f.omit = gd, f.omitBy = dd, f.once = ag, f.orderBy = Zh, f.over = c_, f.overArgs = lg, f.overEvery = h_, f.overSome = g_, f.partial = Ci, f.partialRight = lf, f.partition = Vh, f.pick = _d, f.pickBy = Sf, f.property = Of, f.propertyOf = d_, f.pull = Zc, f.pullAll = ks, f.pullAllBy = Vc, f.pullAllWith = Jc, f.pullAt = Qc, f.range = __, f.rangeRight = p_, f.rearg = cg, f.reject = kh, f.remove = kc, f.rest = hg, f.reverse = Ni, f.sampleSize = tg, f.set = vd, f.setWith = Id, f.shuffle = eg, f.slice = jc, f.sortBy = ig, f.sortedUniq = sh, f.sortedUniqBy = fh, f.split = Hd, f.spread = gg, f.tail = oh, f.take = ah, f.takeRight = lh, f.takeRightWhile = ch, f.takeWhile = hh, f.tap = Oh, f.throttle = dg, f.thru = gr, f.toArray = _f, f.toPairs = Ef, f.toPairsIn = Rf, f.toPath = E_, f.toPlainObject = vf, f.transform = Td, f.unary = _g, f.union = gh, f.unionBy = dh, f.unionWith = _h, f.uniq = ph, f.uniqBy = vh, f.uniqWith = Ih, f.unset = Sd, f.unzip = Pi, f.unzipWith = js, f.update = Ed, f.updateWith = Rd, f.values = Je, f.valuesIn = Ad, f.without = Th, f.words = wf, f.wrap = pg, f.xor = Sh, f.xorBy = Eh, f.xorWith = Rh, f.zip = Ah, f.zipObject = mh, f.zipObjectDeep = wh, f.zipWith = yh, f.entries = Ef, f.entriesIn = Rf, f.extend = If, f.extendWith = Sr, Hi(f, f), f.add = A_, f.attempt = yf, f.camelCase = Od, f.capitalize = Af, f.ceil = m_, f.clamp = md, f.clone = Ig, f.cloneDeep = Sg, f.cloneDeepWith = Eg, f.cloneWith = Tg, f.conformsTo = Rg, f.deburr = mf, f.defaultTo = n_, f.divide = w_, f.endsWith = xd, f.eq = Kt, f.escape = Ld, f.escapeRegExp = Nd, f.every = Bh, f.find = Gh, f.findIndex = Zs, f.findKey = kg, f.findLast = Wh, f.findLastIndex = Vs, f.findLastKey = jg, f.floor = y_, f.forEach = ef, f.forEachRight = nf, f.forIn = td, f.forInRight = ed, f.forOwn = nd, f.forOwnRight = rd, f.get = Ui, f.gt = Ag, f.gte = mg, f.has = sd, f.hasIn = Bi, f.head = Qs, f.identity = Rt, f.includes = $h, f.indexOf = Wc, f.inRange = wd, f.invoke = ad, f.isArguments = Fe, f.isArray = N, f.isArrayBuffer = wg, f.isArrayLike = St, f.isArrayLikeObject = tt, f.isBoolean = yg, f.isBuffer = me, f.isDate = Og, f.isElement = xg, f.isEmpty = Lg, f.isEqual = Ng, f.isEqualWith = Pg, f.isError = Fi, f.isFinite = Dg, f.isFunction = ce, f.isInteger = cf, f.isLength = Ir, f.isMap = hf, f.isMatch = Cg, f.isMatchWith = Fg, f.isNaN = bg, f.isNative = Ug, f.isNil = Mg, f.isNull = Bg, f.isNumber = gf, f.isObject = k, f.isObjectLike = j, f.isPlainObject = An, f.isRegExp = bi, f.isSafeInteger = Gg, f.isSet = df, f.isString = Tr, f.isSymbol = Lt, f.isTypedArray = Ve, f.isUndefined = Wg, f.isWeakMap = Hg, f.isWeakSet = qg, f.join = $c, f.kebabCase = Pd, f.last = Mt, f.lastIndexOf = Kc, f.lowerCase = Dd, f.lowerFirst = Cd, f.lt = Yg, f.lte = zg, f.max = O_, f.maxBy = x_, f.mean = L_, f.meanBy = N_, f.min = P_, f.minBy = D_, f.stubArray = Yi, f.stubFalse = zi, f.stubObject = v_, f.stubString = I_, f.stubTrue = T_, f.multiply = C_, f.nth = Xc, f.noConflict = a_, f.noop = qi, f.now = _r, f.pad = Fd, f.padEnd = bd, f.padStart = Ud, f.parseInt = Bd, f.random = yd, f.reduce = Jh, f.reduceRight = Qh, f.repeat = Md, f.replace = Gd, f.result = pd, f.round = F_, f.runInContext = g, f.sample = jh, f.size = ng, f.snakeCase = Wd, f.some = rg, f.sortedIndex = th, f.sortedIndexBy = eh, f.sortedIndexOf = nh, f.sortedLastIndex = rh, f.sortedLastIndexBy = ih, f.sortedLastIndexOf = uh, f.startCase = qd, f.startsWith = Yd, f.subtract = b_, f.sum = U_, f.sumBy = B_, f.template = zd, f.times = S_, f.toFinite = he, f.toInteger = D, f.toLength = pf, f.toLower = $d, f.toNumber = Gt, f.toSafeInteger = $g, f.toString = H, f.toUpper = Kd, f.trim = Xd, f.trimEnd = Zd, f.trimStart = Vd, f.truncate = Jd, f.unescape = Qd, f.uniqueId = R_, f.upperCase = kd, f.upperFirst = Mi, f.each = ef, f.eachRight = nf, f.first = Qs, Hi(f, (function() {
          var t = {};
          return jt(f, function(e, n) {
            $.call(f.prototype, n) || (t[n] = e);
          }), t;
        })(), { chain: !1 }), f.VERSION = c, Ct(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
          f[t].placeholder = f;
        }), Ct(["drop", "take"], function(t, e) {
          U.prototype[t] = function(n) {
            n = n === i ? 1 : it(D(n), 0);
            var r = this.__filtered__ && !e ? new U(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = lt(n, r.__takeCount__) : r.__views__.push({
              size: lt(n, kt),
              type: t + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, U.prototype[t + "Right"] = function(n) {
            return this.reverse()[t](n).reverse();
          };
        }), Ct(["filter", "map", "takeWhile"], function(t, e) {
          var n = e + 1, r = n == Ji || n == Xf;
          U.prototype[t] = function(s) {
            var o = this.clone();
            return o.__iteratees__.push({
              iteratee: y(s, 3),
              type: n
            }), o.__filtered__ = o.__filtered__ || r, o;
          };
        }), Ct(["head", "last"], function(t, e) {
          var n = "take" + (e ? "Right" : "");
          U.prototype[t] = function() {
            return this[n](1).value()[0];
          };
        }), Ct(["initial", "tail"], function(t, e) {
          var n = "drop" + (e ? "" : "Right");
          U.prototype[t] = function() {
            return this.__filtered__ ? new U(this) : this[n](1);
          };
        }), U.prototype.compact = function() {
          return this.filter(Rt);
        }, U.prototype.find = function(t) {
          return this.filter(t).head();
        }, U.prototype.findLast = function(t) {
          return this.reverse().find(t);
        }, U.prototype.invokeMap = F(function(t, e) {
          return typeof t == "function" ? new U(this) : this.map(function(n) {
            return vn(n, t, e);
          });
        }), U.prototype.reject = function(t) {
          return this.filter(vr(y(t)));
        }, U.prototype.slice = function(t, e) {
          t = D(t);
          var n = this;
          return n.__filtered__ && (t > 0 || e < 0) ? new U(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== i && (e = D(e), n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n);
        }, U.prototype.takeRightWhile = function(t) {
          return this.reverse().takeWhile(t).reverse();
        }, U.prototype.toArray = function() {
          return this.take(kt);
        }, jt(U.prototype, function(t, e) {
          var n = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), s = f[r ? "take" + (e == "last" ? "Right" : "") : e], o = r || /^find/.test(e);
          s && (f.prototype[e] = function() {
            var a = this.__wrapped__, h = r ? [1] : arguments, d = a instanceof U, I = h[0], T = d || N(a), E = function(b) {
              var B = s.apply(f, ve([b], h));
              return r && A ? B[0] : B;
            };
            T && n && typeof I == "function" && I.length != 1 && (d = T = !1);
            var A = this.__chain__, w = !!this.__actions__.length, O = o && !A, C = d && !w;
            if (!o && T) {
              a = C ? a : new U(this);
              var x = t.apply(a, h);
              return x.__actions__.push({ func: gr, args: [E], thisArg: i }), new bt(x, A);
            }
            return O && C ? t.apply(this, h) : (x = this.thru(E), O ? r ? x.value()[0] : x.value() : x);
          });
        }), Ct(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
          var e = Gn[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(t);
          f.prototype[t] = function() {
            var s = arguments;
            if (r && !this.__chain__) {
              var o = this.value();
              return e.apply(N(o) ? o : [], s);
            }
            return this[n](function(a) {
              return e.apply(N(a) ? a : [], s);
            });
          };
        }), jt(U.prototype, function(t, e) {
          var n = f[e];
          if (n) {
            var r = n.name + "";
            $.call(ze, r) || (ze[r] = []), ze[r].push({ name: e, func: n });
          }
        }), ze[sr(i, Wt).name] = [{
          name: "wrapper",
          func: i
        }], U.prototype.clone = Qa, U.prototype.reverse = ka, U.prototype.value = ja, f.prototype.at = xh, f.prototype.chain = Lh, f.prototype.commit = Nh, f.prototype.next = Ph, f.prototype.plant = Ch, f.prototype.reverse = Fh, f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = bh, f.prototype.first = f.prototype.head, ln && (f.prototype[ln] = Dh), f;
      }), He = Na();
      ye ? ((ye.exports = He)._ = He, Wr._ = He) : ft._ = He;
    }).call(q_);
  })(mn, mn.exports)), mn.exports;
}
var At = Y_();
function yn(l) {
  return l.toLowerCase().replace(/[^\w\d]+/g, "");
}
function Zi(l, u) {
  const i = new RegExp(/"(.*?)"/g);
  let c = u, _ = [], S, R = !1;
  for (; (S = i.exec(u)) !== null && R === !1; ) {
    const z = yn(String(S[1])), K = z_(l, z);
    K === void 0 ? R = !0 : (_ = _.concat(K), c = c.replace(S[0], ""));
  }
  if (R)
    return;
  const P = yn(c), M = $_(l, P);
  return M === void 0 ? void 0 : (_ = _.concat(M), _.sort((z, K) => z - K));
}
function z_(l, u) {
  if (l.length < u.length)
    return;
  const i = l.indexOf(u);
  if (i !== -1)
    return At.range(i, i + u.length).map((c) => c);
}
function $_(l, u) {
  if (l.length < u.length)
    return;
  const i = Array.from(u), c = [];
  let _ = l, S = 0, R = !1;
  for (const P of i) {
    const M = _.indexOf(P);
    if (M === -1 && (R = !0), R === !1) {
      c.push(S + M);
      const W = M + 1;
      S += W, _ = _.substring(W);
    }
  }
  if (!R)
    return c;
}
class Vi {
  #t;
  constructor(u) {
    this.source = u;
    const i = Vi.composeTransformedHaystackSegments(u);
    this.#t = i, this.transformed = i.map((c) => c.value).join("").toLowerCase();
  }
  getSourceCharacterIndex(u) {
    let i = 0;
    return this.#t.reduce((c, _) => {
      if (c !== 1 / 0)
        return c;
      const S = i + _.value.length;
      if (u >= i && u <= S) {
        const R = u - i;
        c = _.index + R;
      }
      return i += _.value.length, c;
    }, 1 / 0);
  }
  /**
   * We need to preserve the relationship between the source and the transformed results.
   */
  static composeTransformedHaystackSegments(u) {
    const i = u.matchAll(/[\w\d]+/g), c = [];
    for (const _ of i)
      c.push({ value: _[0], index: _.index, length: _[0].length });
    return c;
  }
}
function K_(l, u) {
  return (Array.isArray(l) ? l : [l]).map((_) => new Vi(_)).reduce((_, S) => {
    if (_ !== void 0)
      return _;
    const R = Zi(S.transformed, u);
    if (R === void 0)
      return _;
    const P = X_(R, S.transformed), M = Z_(S, P);
    return V_(M);
  }, void 0);
}
function X_(l, u) {
  const i = [...l], c = [];
  let _ = 0;
  for (; i.length > 0 && _ < 100; ) {
    const S = i.at(0);
    if (S === void 0)
      throw new Error("Should never get here");
    let R = 1;
    for (let z = 1; z <= i.length; z += 1) {
      const K = i.at(z);
      K !== void 0 && S + z === K && (R += 1);
    }
    const P = S, M = S + R, W = u.substring(P, M);
    c.push({
      index: P,
      value: W,
      is_match: !0,
      length: W.length
    }), i.splice(0, R), _ += 1;
  }
  return c;
}
function Z_(l, u) {
  return u.reduce((i, c, _) => {
    if (_ === 0 && c.index !== 0) {
      const W = l.source.substring(0, l.getSourceCharacterIndex(c.index));
      i.push({
        index: 0,
        value: W,
        is_match: !1,
        length: W.length
      });
    }
    const S = l.getSourceCharacterIndex(c.index), R = l.getSourceCharacterIndex(c.index + c.length), P = l.source.substring(S, R);
    i.push({
      index: S,
      value: P,
      is_match: !0,
      length: P.length
    });
    const M = u.at(_ + 1);
    if (M) {
      const W = l.getSourceCharacterIndex(c.index + c.length), z = l.getSourceCharacterIndex(M.index), K = l.source.substring(W, z);
      i.push({
        index: W,
        value: K,
        is_match: !1,
        length: K.length
      });
    } else if (S + P.length !== l.source.length) {
      const W = S + P.length, z = l.source.substring(W);
      i.push({
        index: W,
        value: z,
        is_match: !1,
        length: z.length
      });
    }
    return i;
  }, []);
}
function V_(l) {
  const u = /\S/, i = [...l];
  return i.forEach((c, _) => {
    if (c.is_match) {
      const S = c.value.search(u);
      if (S !== 0) {
        const R = i.at(_ - 1);
        R && (R.length += S, R.value += c.value.substring(0, S), c.value = c.value.substring(S), c.index = c.index + S);
      }
    }
  }), i;
}
function J_(l, u) {
  return (Array.isArray(l) ? l : [l]).some((c) => {
    const _ = yn(c);
    return Zi(_, u) !== void 0;
  });
}
function Q_({ needle: l, haystack: u, Match: i = "mark", Miss: c }) {
  const _ = Pf(() => K_(u, l), [u, l]);
  return _ === void 0 ? u : _.map((S, R) => {
    const P = [S.value, R].join();
    return S.is_match ? typeof i == "string" ? /* @__PURE__ */ ht(i, { "data-is-match": S.is_match, children: S.value }, P) : /* @__PURE__ */ ht(i, { "data-is-match": S.is_match, segment: S, segmentIndex: R }, P) : c !== void 0 ? typeof c == "string" ? /* @__PURE__ */ ht(c, { "data-is-match": S.is_match, children: S.value }, P) : /* @__PURE__ */ ht(c, { "data-is-match": S.is_match, segment: S, segmentIndex: R }, P) : S.value;
  });
}
function k_({ Match: l = "mark", Miss: u, children: i }) {
  const c = ke();
  return c.search.hasSearchTerm === !1 ? i : /* @__PURE__ */ ht(Q_, { needle: c.search.searchTerm, haystack: i, Match: l, Miss: u });
}
function j_() {
  const l = /* @__PURE__ */ new Map();
  return (u, i) => u.debounceMilliseconds === void 0 ? i() : (l.has(u) === !1 && l.set(
    u,
    At.debounce((c) => c(), u.debounceMilliseconds)
  ), l.get(u)?.(i));
}
class tp {
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
    this.#t.get(u)?.forEach((_) => {
      _(i);
    });
  }
  silently(u) {
    this.#e = !0, u(), this.#e = !1;
  }
  isSilent() {
    return this.#e;
  }
}
const V = {
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
  RESET_FILTERS: "resetFilters",
  SET_SORT_BY: "setSortBy",
  SET_SORT_BY_DIRECTION: "setSortDirection",
  SET_GROUP_BY: "setGroupBy",
  SET_GROUP_SORT_BY_DIRECTION: "setGroupBySortDirection",
  SET_PAGE: "setPage",
  SET_NUM_ITEMS_PER_PAGE: "setNumItemsPerPage",
  SYNC_UPDATED_AT: "syncUpdatedAt"
}, st = {
  CORE: "core",
  SEARCH: "search",
  FILTERS: "filters",
  GROUP_BY: "groupBy",
  SORT_BY: "sortBy",
  PAGINATION: "pagination"
}, q = {
  RULE_NOT_FOUND: "Finder could not locate requested rule",
  WRONG_RULE_TYPE_FOR_MIXIN: "The requested rule is not valid for this mixin.",
  NO_SEARCH_RULE_SET: "Unable to set search term; no SearchRule was found.",
  INVALID_SEARCH_TERM_TYPE: "Search terms must be strings.",
  NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS: "Finder could not find a matching option with the passed value could be found. If this is intended, set 'strictOptions:false' in the rule definition.",
  SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY: "Finder could not set this filter value, as the rule requires an array.",
  ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE: "Finder could not add to this filter, as no optionValue was passed.",
  DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER: "Finder could not delete an option from this filter, as it does not support multiple values.",
  SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE: "Finder could not set this filter value, as the rule requires a boolean.",
  ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER: "Finder could not add to this filter value, as the rule is a boolean.",
  TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS: "Finder could not toggle this filter rule option, as the filter does not have any options.",
  TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE: "Finder could not toggle this filter rule option, as the rule does not allow multiple values.",
  TOGGLING_OPTION_THAT_DOES_NOT_EXIST: "Finder could not toggle this filter rule option, as the option was not found.",
  TOGGLING_OPTION_WITHOUT_PASSING_OPTION: "Finder could not toggle this filter rule option, as the option was not found.",
  TOGGLING_BOOLEAN_FILTER_WITH_UNUSED_VALUE: "Finder could not toggle this filter rule option, as boolean filters do not have options.",
  TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS: "Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.",
  INVALID_RULE_WITHOUT_ID: "Init failed: Missing rule id.",
  INVALID_RULE_SHAPE: "Init failed: Malformed rule definition",
  INVALID_RULE_DUPLICATE: "Init failed: Duplicate rule id."
};
class Y extends Error {
  constructor(u, i) {
    const c = `${u} ${JSON.stringify({ ...i })}`;
    super(c), this.name = "FinderError";
  }
}
function Ki(l) {
  return typeof l == "object" && l !== null && "sortFn" in l;
}
function On(l) {
  return typeof l == "object" && l !== null && "searchFn" in l;
}
function Qe(l) {
  return typeof l == "object" && l !== null && "filterFn" in l;
}
function Rr(l) {
  return Qe(l) && typeof l.options != "function";
}
function Xi(l) {
  return typeof l == "object" && l !== null && "groupFn" in l;
}
function ep(l) {
  return typeof l == "object" && l !== null && ("rules" in l || "callback" in l);
}
function np(l) {
  return typeof l == "object" && l !== null && ("haystack" in l || "callback" in l);
}
function rp(l) {
  return Qe(l) && l.boolean === !0;
}
function ip(l) {
  return Qe(l) && l.multiple === !0;
}
function up(l) {
  return Qe(l) && l.multiple !== !0 && l.boolean !== !0;
}
function sp(l) {
  return {
    validate(u) {
      if (u !== void 0 && typeof u != "boolean")
        throw new Y(q.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule: l, value: u });
      return !0;
    },
    parse(u) {
      return typeof u != "boolean" && u !== void 0 ? !1 : u === void 0 ? l.required ? !0 : l.defaultValue !== void 0 ? l.defaultValue : !1 : u;
    },
    has(u) {
      return this.parse(u);
    },
    toggle(u, i) {
      const c = this.parse(u);
      if (typeof c != "boolean")
        throw new Y(q.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule: l, value: c, optionValue: i });
      return !c;
    },
    add(u, i) {
      throw new Y(q.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule: l, value: u, optionValue: i });
    },
    delete(u, i) {
      if (i !== void 0)
        throw new Y(q.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule: l, value: u, optionValue: i });
    },
    isActive(u) {
      return l.required ? !0 : this.parse(u) === !0;
    },
    isMatch(u, i, c) {
      return l.filterFn(u, i, c);
    }
  };
}
function fp(l) {
  return {
    validate(u) {
      if (u !== void 0 && Array.isArray(u) === !1)
        throw new Y(q.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: l, value: u });
      if (l.strictOptions && Array.isArray(l.options) && Array.isArray(u) && u.every((c) => l.options?.some((_) => _.value === c)) === !1)
        throw new Y(q.NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS, { rule: l, value: u });
      return !0;
    },
    parse(u) {
      if (u === void 0)
        return l.required && Array.isArray(l.options) && l.options.length > 0 ? [l.options.at(0)?.value] : [];
      if (Array.isArray(u))
        return u;
      throw new Y(q.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: l, value: u });
    },
    has(u, i) {
      if (i === void 0)
        return Array.isArray(u) && u.length > 0;
      if (Array.isArray(i))
        return i.every((_) => this.has(l, _));
      const c = l.options?.find((_) => typeof i == "object" && "value" in i ? _.value === i.value : _.value === i);
      return Array.isArray(u) && c !== void 0 && u.includes(c.value);
    },
    toggle(u, i) {
      const c = this.parse(u);
      if (Array.isArray(c) === !1)
        throw new Y(q.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: l, value: c });
      if (i === void 0)
        throw new Y(q.TOGGLING_OPTION_WITHOUT_PASSING_OPTION, { rule: l });
      if (l.options === void 0)
        throw new Y(q.TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS, { rule: l, optionValue: i });
      const _ = l.options.find((S) => typeof i == "object" && "value" in i ? S.value === i.value : S.value === i);
      if (_ === void 0)
        throw new Y(q.TOGGLING_OPTION_THAT_DOES_NOT_EXIST, { rule: l, optionValue: i });
      return c.includes(_.value) ? [...c.filter((S) => S !== _.value)] : [...c, _.value];
    },
    add(u, i) {
      const c = this.parse(u);
      if (i === void 0)
        throw new Y(q.ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE, { rule: l, optionValue: i });
      const _ = l.options?.find((S) => typeof i == "object" && "value" in i ? S.value === i.value : S.value === i);
      return _ !== void 0 ? c.includes(_.value) === !1 ? [...c, _.value] : c : [...c, i];
    },
    delete(u, i) {
      if (i === void 0)
        return;
      const c = this.parse(u), _ = l.options?.find((S) => typeof i == "object" && "value" in i ? S.value === i.value : S.value === i);
      return _ !== void 0 && c.includes(_.value) ? c.filter((S) => S !== _.value) : c.filter((S) => S !== i);
    },
    isActive(u) {
      return l.required ? !0 : this.parse(u).length > 0;
    },
    isMatch(u, i, c) {
      return Array.isArray(i) ? i.some((_) => l.filterFn(u, _, c)) : !1;
    }
  };
}
function op(l) {
  return {
    validate(u) {
      if (l.strictOptions && Array.isArray(l.options) && l.options.find((c) => c.value === u) === void 0)
        throw new Y(q.NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS, { rule: l, value: u });
      return !0;
    },
    parse(u) {
      if (u === void 0 && l.required) {
        if (l.defaultValue)
          return l.defaultValue;
        if (Array.isArray(l.options) && l.options.length > 0)
          return l.options.at(0)?.value;
      }
      return u;
    },
    has(u) {
      return u !== void 0;
    },
    toggle(u, i) {
      throw new Y(q.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, { rule: l, value: u, optionValue: i });
    },
    add(u, i) {
      throw new Y(q.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule: l, value: u, optionValue: i });
    },
    delete(u, i) {
      if (i !== void 0)
        throw new Y(q.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule: l, value: u, optionValue: i });
    },
    isActive(u) {
      return l.required ? !0 : !(u === void 0 || typeof u == "string" && u.trim() === "");
    },
    isMatch(u, i, c) {
      return l.filterFn(u, i, c);
    }
  };
}
function ne(l) {
  if (ip(l))
    return fp(l);
  if (rp(l))
    return sp(l);
  if (up(l))
    return op(l);
  throw new Y(q.INVALID_RULE_SHAPE, { definition: l });
}
class Mf {
  #t;
  #e;
  constructor({ initialFilters: u }, i) {
    this.#t = u ?? {}, this.#e = i;
  }
  set(u, i) {
    if (this.#e.isDisabled())
      return;
    const c = this.getRule(u), _ = this.get(u), R = typeof i == "string" && i.trim() === "" ? void 0 : i;
    ne(c).validate(i), !(this.#t[c.id] !== void 0 && this.#t[c.id] === R) && this.#e.debouncer(c, () => {
      this.#t = { ...this.#t, [c.id]: R }, this.#e.touch({
        source: st.FILTERS,
        event: V.SET_FILTER,
        current: R,
        initial: _,
        rule: c
      });
    });
  }
  get rules() {
    return this.#e.getRuleBook().rules.filter(Rr);
  }
  get activeRules() {
    return this.rules.filter((u) => ne(u).isActive(this.#t[u.id]));
  }
  get(u) {
    const i = this.getRule(u), c = this.#t[i.id];
    return ne(i).parse(c);
  }
  has(u, i) {
    const c = this.getRule(u), _ = this.#t[c.id];
    return ne(c).has(_, i);
  }
  getRule(u) {
    const i = this.#e.getRuleBook().getRule(u);
    if (!Rr(i))
      throw new Y(q.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  add(u, i) {
    const c = this.getRule(u), _ = this.#t[c.id];
    this.set(c, ne(c).add(_, i));
  }
  delete(u, i) {
    const c = this.getRule(u), _ = this.#t[c.id];
    this.set(c, ne(c).delete(_, i));
  }
  toggle(u, i) {
    const c = this.getRule(u), _ = this.#t[c.id];
    if (c.boolean && i !== void 0)
      throw new Y(q.TOGGLING_BOOLEAN_FILTER_WITH_UNUSED_VALUE, { rule: c, value: _ });
    const S = ne(c).toggle(_, i);
    this.set(c, S);
  }
  reset() {
    const u = this.values;
    this.#t = {}, this.#e.touch({
      source: st.FILTERS,
      event: V.RESET_FILTERS,
      current: this.values,
      initial: u
    });
  }
  isRuleActive(u) {
    const i = this.getRule(u), c = this.#t[i.id];
    return ne(i).isActive(c);
  }
  test(u) {
    if (this.#e.isLoading())
      return [];
    if (u.isAdditive) {
      const i = At.uniqBy([...this.rules, ...u.rules], "id"), c = { ...this.values, ...u.values };
      return this.#e.test({ filters: { rules: i, values: c } }, !0);
    }
    return this.#e.test({ filters: { rules: u.rules, values: u.values ?? {} } });
  }
  testRule({ rule: u, value: i, ...c }) {
    const _ = this.getRule(u);
    return this.test({
      rules: [_],
      values: { [_.id]: i },
      ...c
    });
  }
  testRuleOptions(u, i) {
    if (this.#e.isLoading())
      return /* @__PURE__ */ new Map();
    const c = this.getRule(u);
    if (c.boolean) {
      const _ = /* @__PURE__ */ new Map();
      return _.set(!0, this.testRule({ rule: c, value: !0 })), _.set(!1, this.testRule({ rule: c, value: !1 })), _;
    }
    if (Array.isArray(c.options)) {
      const _ = /* @__PURE__ */ new Map();
      return c.options.forEach((S) => {
        let R;
        c.multiple ? R = [S.value] : R = S.value, _.set(S, this.testRule({ rule: c, value: R, isAdditive: i }));
      }), _;
    }
    throw new Y(q.TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS, c);
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
  static process(u, i, c) {
    const _ = u.rules.filter((S) => Rr(S) && ne(S).isActive(u.values[S.id]));
    return _.length === 0 ? i : i.filter((S) => _.every(
      (R) => Rr(R) && ne(R).isMatch(S, u.values[R.id], c)
    ));
  }
}
class Gf {
  #t;
  #e;
  #n;
  constructor({ initialGroupBy: u, initialGroupBySortDirection: i, requireGroup: c }, _) {
    this.#n = _, u && (this.#t = this.getRule(u)), this.#e = i, this.requireGroup = c;
  }
  getRule(u) {
    const i = this.#n.getRuleBook().getRule(u);
    if (Xi(i) === !1)
      throw new Y(q.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  get rules() {
    return this.#n.getRuleBook().rules.filter(Xi);
  }
  get activeRule() {
    const u = this.requireGroup ? this.rules.at(0) : void 0;
    return this.#t ?? u;
  }
  get hasGroupByRule() {
    return this.activeRule !== void 0;
  }
  get groupBySortDirection() {
    return this.#e ?? this.activeRule?.defaultGroupSortDirection;
  }
  set(u) {
    if (this.#n.isDisabled())
      return;
    const i = this.#t;
    let c;
    const _ = typeof u == "string" && u.trim() === "";
    _ && (c = void 0), _ === !1 && u !== void 0 && (c = this.getRule(u)), this.#t !== c && (this.#t = c, this.#e = void 0, this.#n.touch({
      source: st.GROUP_BY,
      event: V.SET_GROUP_BY,
      current: c?.id,
      initial: i?.id,
      rule: c
    }));
  }
  setGroupSortDirection(u) {
    const i = this.#e;
    this.#e = u, this.#n.touch({
      source: st.GROUP_BY,
      event: V.SET_GROUP_SORT_BY_DIRECTION,
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
      groupBySortDirection: this.#e
    };
  }
  static process(u, i, c) {
    const _ = At.groupBy(i, (W) => u.rule?.groupFn(W, c)), S = Object.entries(_).map(([W, z]) => ({
      id: W,
      items: z
    })), R = u.rule?.sticky !== void 0, P = [], M = [];
    if (R && u.rule && (P.push(ap(u.rule)), M.push("asc")), u.rule?.sortGroupFn && (P.push(u.rule.sortGroupFn), M.push(u.groupBySortDirection ?? "asc")), P.length > 0) {
      const W = M;
      return At.orderBy(S, P, W);
    }
    return S;
  }
}
function ap(l) {
  let u = [];
  l.sticky?.header !== void 0 && (Array.isArray(l.sticky.header) && (u = l.sticky.header), typeof l.sticky.header == "string" && (u = [l.sticky.header]));
  let i = [];
  return l.sticky?.footer !== void 0 && (Array.isArray(l.sticky.footer) && (i = l.sticky.footer), typeof l.sticky.footer == "string" && (i = [l.sticky.footer])), (c) => {
    if (u.includes(c.id)) {
      const _ = u.findIndex((R) => c.id === R);
      return (u.length - _) * -1;
    }
    return i.includes(c.id) ? 1 + i.findIndex((S) => c.id === S) : 0;
  };
}
class Wf {
  #t;
  #e;
  constructor({ page: u, numItemsPerPage: i }, c) {
    this.#t = u ?? 1, this.numItemsPerPage = i, this.#e = c;
  }
  setPage(u) {
    if (u !== this.#t) {
      const i = this.#t;
      this.#t = u, this.#e.touch({
        source: st.PAGINATION,
        event: V.SET_PAGE,
        current: { page: this.#t },
        initial: { page: i }
      });
    }
  }
  setNumItemsPerPage(u) {
    if (u !== this.numItemsPerPage) {
      const i = this.numItemsPerPage;
      this.numItemsPerPage = u, this.#e.touch({
        source: st.PAGINATION,
        event: V.SET_NUM_ITEMS_PER_PAGE,
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
    return this.numItemsPerPage && this.lastPage ? At.clamp(this.#t, 1, this.lastPage) : this.#t;
  }
  get offset() {
    return this.numItemsPerPage && this.lastPage ? (At.clamp(this.#t, 1, this.lastPage) - 1) * this.numItemsPerPage : 0;
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
    const c = Math.ceil(i.length / u.numItemsPerPage), S = (At.clamp(u.page, 1, c) - 1) * u.numItemsPerPage;
    return i.slice(S, S + u.numItemsPerPage);
  }
}
function lp(l, u) {
  const i = l.length / u.length;
  let c = 1, _ = 1, S = 0;
  for (let R = 0; R < l.length; R += 1)
    S !== void 0 && l.at(R) === S + 1 && (_ += 1, _ >= c && (c = _)), S = l.at(R);
  return { percentOfHaystackMatched: i, longestSequentialSequence: c };
}
function cp(l, u, i) {
  const c = u.reduce((R, P) => {
    if (l.rule?.searchFn === void 0)
      return R;
    const M = l.rule.searchFn(P, i), z = (Array.isArray(M) ? M.map(yn) : [yn(M)]).reduce((K, vt) => {
      const at = Zi(vt, l.searchTerm);
      return at !== void 0 && K.push(lp(at, vt)), K;
    }, []);
    if (z.length > 0) {
      const vt = At.orderBy(z, ["percentOfHaystackMatched", "longestSequentialSequence"], ["desc", "asc"]).at(0);
      vt && R.push({ item: P, score: vt });
    }
    return R;
  }, []), _ = c.reduce((R, P) => (P.score.longestSequentialSequence > R && (R = P.score.longestSequentialSequence), R), 0);
  return At.orderBy(
    c,
    [
      (R) => {
        const P = R.score.percentOfHaystackMatched * 100, M = R.score.longestSequentialSequence / _ * 100;
        return P + M;
      }
    ],
    ["desc"]
  ).map((R) => R.item);
}
class Hf {
  constructor({ initialSearchTerm: u }, i) {
    if (this.searchTerm = "", u && i.getRuleBook().rules.find(On) === void 0)
      throw new Y(q.NO_SEARCH_RULE_SET);
    this.searchTerm = u ?? "", this.#t = i;
  }
  #t;
  get rule() {
    return this.#t.getRuleBook().rules.find(On);
  }
  get hasSearchRule() {
    return this.rule !== void 0;
  }
  get hasSearchTerm() {
    return this.searchTerm !== "";
  }
  setSearchTerm(u) {
    const i = this.rule;
    if (!i)
      throw new Y(q.NO_SEARCH_RULE_SET);
    if (typeof u != "string")
      throw new Y(q.INVALID_SEARCH_TERM_TYPE);
    if (this.#t.isDisabled())
      return;
    const c = this.searchTerm;
    this.searchTerm = u, c !== u && this.#t.debouncer(i, () => {
      this.#t.touch({
        source: st.SEARCH,
        event: V.SET_SEARCH_TERM,
        current: u,
        initial: c,
        rule: i
      });
    });
  }
  reset() {
    if (this.#t.isDisabled())
      return;
    const u = this.searchTerm;
    this.searchTerm = "", this.#t.touch({
      source: st.SEARCH,
      event: V.RESET_SEARCH_TERM,
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
  static process(u, i, c) {
    if (u.rule === void 0)
      throw new Y(q.NO_SEARCH_RULE_SET);
    return u.searchTerm === "" ? i : cp(u, i, c);
  }
}
const $i = [void 0, "desc", "asc"];
class qf {
  #t;
  #e;
  #n;
  constructor({ initialSortBy: u, initialSortDirection: i }, c) {
    this.#n = c, u && (this.#t = this.getRule(u)), this.#e = i;
  }
  getRule(u) {
    const i = this.#n.getRuleBook().getRule(u);
    if (Ki(i) === !1)
      throw new Y(q.WRONG_RULE_TYPE_FOR_MIXIN, { rule: i });
    return i;
  }
  get rules() {
    return this.#n.getRuleBook().rules.filter(Ki);
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
      source: st.SORT_BY,
      event: V.SET_SORT_BY_DIRECTION,
      current: { sortDirection: u },
      initial: { sortDirection: i },
      rule: this.activeRule
    });
  }
  cycleSortDirection() {
    const u = $i.findIndex((i) => i === this.#e);
    if (u !== -1) {
      const i = u + 1 % ($i.length - 1);
      this.setSortDirection($i[i]);
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
    const c = this.#e, _ = this.#t, S = u ? this.getRule(u) : void 0;
    this.#t = S, this.#e = i, this.#n.touch({
      source: st.SORT_BY,
      event: V.SET_SORT_BY,
      current: { rule: S?.id, sortDirection: i },
      initial: { rule: _?.id, sortDirection: c },
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
  static process(u, i, c) {
    return u.rule === void 0 ? i : At.orderBy(
      i,
      (_) => typeof u.rule?.sortFn == "function" ? u.rule.sortFn(_, c) : Number.NEGATIVE_INFINITY,
      u.sortDirection
    );
  }
}
class wn {
  constructor() {
    this.snapshot = {}, this.isStale = !0;
  }
  setIsStale(u) {
    this.isStale = u;
  }
  takeSnapshot({ items: u, context: i, mixins: c }) {
    const _ = wn.test({ mixins: c, items: u, context: i }), S = c.pagination ? Wf.process(c.pagination, _) : _;
    let R = [];
    const P = c.groupBy !== void 0;
    c.groupBy && (R = Gf.process(c.groupBy, S, i)), this.snapshot = {
      items: P ? void 0 : S,
      groups: P ? R : void 0,
      numMatchedItems: _.length,
      numTotalItems: u.length,
      hasGroupByRule: P
    };
  }
  static test({ mixins: u, items: i, context: c }) {
    let _ = [...i];
    return u.search && (_ = Hf.process(u.search, _, c)), u.filters && (_ = Mf.process(u.filters, _, c)), u.sortBy && (_ = qf.process(u.sortBy, _, c)), _;
  }
}
class hp {
  constructor(u) {
    this.effects = [], this.#t = u;
  }
  #t;
  hydrateDefinitions(u, i) {
    this.effects = this.#t.map((c) => {
      const _ = typeof c.rules == "function" ? c.rules(u, i) : c.rules, S = Array.isArray(_) ? _ : [_];
      return { ...c, rules: S, _isHydrated: !0 };
    });
  }
  setEffects(u) {
    this.#t = u;
  }
  onChange(u, i) {
    this.effects.forEach((c) => {
      c.rules.some((S) => typeof S == "string" && u.id === S || typeof S == "object" && u.id === S.id) && c.onChange(i, u);
    });
  }
}
class Ar {
  constructor(u) {
    this.rules = [], Ar.validateDefinitions(u), this.definitions = u;
  }
  hydrateDefinitions(u, i) {
    this.rules = this.definitions.map((c) => {
      if (Qe(c)) {
        const _ = typeof c.options == "function" ? c.options({ items: u, context: i }) : c.options;
        return {
          ...c,
          boolean: !!c.boolean,
          multiple: !!c.multiple,
          strictOptions: c.strictOptions ?? !0,
          options: _
        };
      }
      return c;
    });
  }
  getRule(u) {
    const i = this.rules.find((c) => typeof u == "object" ? c.id === u.id : c.id === u);
    if (i === void 0)
      throw new Y(q.RULE_NOT_FOUND, u);
    return i;
  }
  setRules(u) {
    Ar.validateDefinitions(u), this.definitions = u;
  }
  static validateDefinitions(u) {
    if (u.length === 0)
      return !1;
    const i = [On, Qe, Ki, Xi], c = /* @__PURE__ */ new Set();
    return u.forEach((_) => {
      if (_.id === void 0 && !On(_))
        throw new Y(q.INVALID_RULE_WITHOUT_ID, _);
      if (i.some((S) => S(_)) === !1)
        throw new Y(q.INVALID_RULE_SHAPE, _);
      if (_.id) {
        if (c.has(_.id))
          throw new Y(q.INVALID_RULE_DUPLICATE, _);
        c.add(_.id);
      }
    }), !0;
  }
}
class gp {
  constructor(u) {
    this.effects = [], this.#t = u;
  }
  #t;
  hydrateDefinitions(u, i) {
    this.effects = this.#t.map((c) => {
      const _ = typeof c.haystack == "function" ? c.haystack(u, i) : c.haystack, S = Array.isArray(_) ? _ : [_];
      return { ...c, haystack: S };
    });
  }
  setEffects(u) {
    this.#t = u;
  }
  processSearchTerm(u, i) {
    this.effects.forEach((c) => {
      J_(c.haystack, u) && c.onChange(i, u);
    });
  }
}
class dp {
  constructor({ rules: u, ruleEffects: i, searchEffects: c }) {
    this.list = new Ar(u), this.ruleEffects = new hp(i), this.searchEffects = new gp(c);
  }
  hydrateDefinitions(u, i) {
    this.list.hydrateDefinitions(u, i), this.searchEffects.hydrateDefinitions(u, i), this.ruleEffects.hydrateDefinitions(u, i);
  }
  onChange(u, i) {
    On(u) && i.search.hasSearchTerm && this.searchEffects.processSearchTerm(i.search.searchTerm, i), this.ruleEffects.onChange(u, i);
  }
}
class _p {
  constructor(u, {
    rules: i,
    effects: c,
    initialSearchTerm: _,
    initialSortBy: S,
    initialSortDirection: R,
    initialGroupBy: P,
    initialGroupBySortDirection: M,
    initialFilters: W,
    context: z,
    page: K,
    numItemsPerPage: vt,
    isLoading: at,
    disabled: Zt,
    requireGroup: de,
    ignoreSortByRulesWhileSearchRuleIsActive: gt,
    onInit: Wt,
    onReady: re,
    onFirstUserInteraction: It,
    onChange: Vt
  }, mt) {
    this.isReady = !1, this.#e = !1, this.#r = new tp(), this.#u = new wn(), this.#t = u, this.disabled = !!Zt, this.isLoading = !!at, this.isReady = !at && Array.isArray(u) && u.length > 0, this.getInstanceInterfaceFn = mt, this.updatedAt = Date.now(), this.context = z, this.#n = gt;
    const Jt = c?.filter(ep) ?? [], wt = c?.filter(np) ?? [];
    this.#i = new dp({ rules: i, ruleEffects: Jt, searchEffects: wt }), this.#i.hydrateDefinitions(u ?? [], z);
    const nt = j_(), Ht = {
      getItems: () => this.items,
      getRuleBook: () => this.#i.list,
      isLoading: () => this.isLoading,
      isDisabled: () => this.disabled,
      test: (Qt, tn) => this.test(Qt, tn),
      touch: (Qt) => this.#a(Qt),
      debouncer: nt
    };
    this.search = new Hf({ initialSearchTerm: _ }, Ht), this.filters = new Mf({ initialFilters: W }, Ht), this.sortBy = new qf({ initialSortBy: S, initialSortDirection: R }, Ht), this.groupBy = new Gf({ initialGroupBy: P, initialGroupBySortDirection: M, requireGroup: !!de }, Ht), this.pagination = new Wf({ page: K, numItemsPerPage: vt }, Ht), this.#r.silently(() => {
      const Qt = {
        source: st.CORE,
        event: V.INIT,
        timestamp: Date.now(),
        instance: this.getInstanceInterfaceFn()
      };
      Wt && Wt(Qt);
    }), Vt && this.#r.on(V.CHANGE, Vt), It && this.#r.on(V.FIRST_USER_INTERACTION, It), re && this.isReady && re({
      source: st.CORE,
      event: V.READY,
      timestamp: Date.now(),
      instance: this.getInstanceInterfaceFn()
    }), this.isReady === !1 && re && this.#r.on(V.READY, re);
  }
  #t;
  #e;
  #n;
  #r;
  #u;
  #i;
  /**
   * Events that reflect a user interaction.
   * e.g: entering a search term or selecting a filter.
   */
  #a(u) {
    if (this.#r.isSilent())
      return;
    this.emitFirstUserInteraction(), this.#f(), this.#u.setIsStale(!0);
    const i = {
      ...u,
      timestamp: Date.now(),
      instance: this.getInstanceInterfaceFn()
    };
    this.#r.emit(V.CHANGE, i), this.#r.silently(() => {
      u.rule && this.#i.onChange(u.rule, this.getInstanceInterfaceFn());
    });
  }
  /** Internal events not triggered by a user action  */
  #s(u) {
    this.#u.setIsStale(!0), this.#f();
    const i = {
      ...u,
      timestamp: Date.now(),
      instance: this.getInstanceInterfaceFn()
    };
    this.#r.emit(u.event, i);
  }
  #f() {
    this.updatedAt = Date.now(), this.#r.emit(V.SYNC_UPDATED_AT, this.updatedAt);
  }
  emitFirstUserInteraction() {
    if (this.#e === !1) {
      this.#e = !0;
      const u = {
        source: st.CORE,
        event: V.FIRST_USER_INTERACTION,
        timestamp: Date.now(),
        instance: this.getInstanceInterfaceFn()
      };
      this.#r.emit(V.FIRST_USER_INTERACTION, u);
    }
  }
  #l() {
    this.isReady === !1 && (this.isReady = !0, this.#r.emit(V.READY, {
      source: st.CORE,
      event: V.READY,
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
      const c = { ...this.#o(), ...u };
      return wn.test({ mixins: c, items: this.items, context: this.context });
    }
    return wn.test({ mixins: u, items: this.items, context: this.context });
  }
  #o() {
    const u = this.search.hasSearchRule && this.search.hasSearchTerm, i = u && this.#n, c = {};
    return u && (c.search = this.search.serialize()), this.filters.activeRules.length > 0 && (c.filters = this.filters.serialize()), this.pagination.numItemsPerPage && (c.pagination = this.pagination.serialize()), i === !1 && (c.sortBy = this.sortBy.serialize()), this.groupBy.activeRule !== void 0 && (c.groupBy = this.groupBy.serialize()), c;
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
    return this.#i.list.getRule(u);
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
    if (At.isEqual(u, this.#t) === !1) {
      const i = this.#t;
      this.#t = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s({ source: st.CORE, event: V.SET_ITEMS, current: u, initial: i });
    }
  }
  setIsLoading(u) {
    if (!!u !== this.isLoading) {
      const i = this.isLoading;
      this.isLoading = !!u, this.#s({ source: st.CORE, event: V.SET_IS_LOADING, current: !!u, initial: i }), this.isLoading === !1 && this.#l();
    }
  }
  setIsDisabled(u) {
    if (!!u !== this.disabled) {
      const i = this.disabled;
      this.disabled = !!u, this.#s({ source: st.CORE, event: V.SET_IS_DISABLED, current: !!u, initial: i });
    }
  }
  setRules(u) {
    At.isEqual(u, this.#i.list.definitions) === !1 && (this.#i.list.setRules(u), this.#i.list.hydrateDefinitions(this.items, this.context));
  }
  setContext(u) {
    const i = this.context;
    At.isEqual(u, i) === !1 && (this.context = u, this.#i.hydrateDefinitions(this.items, this.context), this.#s({ source: st.CORE, event: V.SET_CONTEXT, current: u, initial: i }));
  }
  toJSON() {
    return {
      disabled: this.disabled,
      initialSearchTerm: this.search.searchTerm,
      initialFilters: this.filters.raw,
      page: this.pagination.page,
      numItemsPerPage: this.pagination.numItemsPerPage,
      initialSortBy: this.sortBy.activeRule?.id,
      initialSortDirection: this.sortBy.sortDirection,
      ignoreSortByRulesWhileSearchRuleIsActive: this.#n,
      initialGroupBy: this.groupBy.activeRule?.id,
      initialGroupBySortDirection: this.groupBy.groupBySortDirection,
      requireGroup: this.groupBy.requireGroup
    };
  }
}
class pp {
  #t;
  constructor(u, i) {
    const c = () => this;
    this.#t = new _p(u, i, c);
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
      reset: u.reset.bind(u),
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
      groupBySortDirection: u.groupBySortDirection,
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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  getRule(u) {
    return this.#t.getRule(u);
  }
  toJSON() {
    return this.#t.toJSON();
  }
}
function Yf({
  items: l,
  rules: u,
  effects: i,
  initialSearchTerm: c,
  initialSortBy: _,
  initialSortDirection: S,
  initialGroupBy: R,
  initialGroupBySortDirection: P,
  initialFilters: M,
  context: W,
  isLoading: z,
  disabled: K,
  page: vt,
  numItemsPerPage: at,
  requireGroup: Zt,
  ignoreSortByRulesWhileSearchRuleIsActive: de,
  onInit: gt,
  onReady: Wt,
  onFirstUserInteraction: re,
  onChange: It,
  controllerRef: Vt,
  children: mt
}) {
  const [Jt, wt] = Lf(Date.now()), [nt] = Lf(() => {
    const Qt = new pp(l, {
      rules: u,
      effects: i,
      initialSearchTerm: c,
      initialSortBy: _,
      initialSortDirection: S,
      initialGroupBy: R,
      initialGroupBySortDirection: P,
      initialFilters: M,
      context: W,
      isLoading: z,
      disabled: K,
      page: vt,
      numItemsPerPage: at,
      requireGroup: Zt,
      ignoreSortByRulesWhileSearchRuleIsActive: de,
      onInit: gt,
      onReady: Wt,
      onFirstUserInteraction: re,
      onChange: It
    });
    return Qt.events.on(V.SYNC_UPDATED_AT, (tn) => wt(tn)), Qt;
  });
  nt.setItems(l), nt.setIsLoading(z), nt.setIsDisabled(K), nt.setRules(u), W !== void 0 && nt.setContext(W), vt !== void 0 && nt.pagination.setPage(vt), at !== void 0 && nt.pagination.setNumItemsPerPage(at), W_(Vt, () => nt, [nt]);
  const Ht = Pf(() => [nt, Jt], [nt, Jt]);
  return /* @__PURE__ */ ht(Df.Provider, { value: Ht, children: mt });
}
Yf.Content = je;
Yf.SearchTermHaystack = k_;
function Lp() {
  return H_(null);
}
export {
  Yf as Finder,
  Q_ as StringMatch,
  Ep as filterRule,
  Tp as finderRuleset,
  Ap as groupByRule,
  mp as ruleEffect,
  wp as searchEffect,
  Sp as searchRule,
  Rp as sortByRule,
  Op as transformFilterToBoolean,
  xp as transformFilterToMultiple,
  yp as transformFilterToSingleValue,
  ke as useFinder,
  Lp as useFinderRef
};
