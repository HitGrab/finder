var _o = (a) => {
  throw TypeError(a);
};
var Lu = (a, s, i) => s.has(a) || _o("Cannot " + i);
var v = (a, s, i) => (Lu(a, s, "read from private field"), i ? i.call(a) : s.get(a)), z = (a, s, i) => s.has(a) ? _o("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(a) : s.set(a, i), M = (a, s, i, g) => (Lu(a, s, "write to private field"), g ? g.call(a, i) : s.set(a, i), i), Ee = (a, s, i) => (Lu(a, s, "access private method"), i);
import Iv, { useState as mo, useEffect as yv, createContext as Av, use as Rv, isValidElement as or, cloneElement as ar, useImperativeHandle as Sv, useRef as Ev } from "react";
function bv(a) {
  if (!a || a.length === 0)
    return !1;
  const s = [];
  return a.forEach((i) => {
    if (i.id === void 0 && !ir(i))
      throw new Error("Finder is missing a unique rule id for rule.");
    const g = [Tv(i), i.id].join(".");
    if (s.includes(g))
      throw new Error(`Duplicate rule id: ${g}`);
    s.push(g);
  }), !0;
}
function De(a, s) {
  if (a !== void 0) {
    if (typeof a == "object") {
      const i = s == null ? void 0 : s.find(({ id: g }) => g === a.id);
      if (i === void 0)
        throw new Error(`Finder could not locate the rule for ${a.id}.`);
      return i;
    }
    if (typeof a == "string") {
      const i = s == null ? void 0 : s.find(({ id: g }) => g === a);
      if (i === void 0)
        throw new Error(`Finder could not locate the rule for ${a}.`);
      return i;
    }
    throw new Error("Finder received an invalid rule request format.");
  }
}
function wo(a, s, i, g) {
  let y, R = [];
  if (typeof s == "function" && (R = s(i, g)), Array.isArray(s) && (R = s), xv(a)) {
    if (y = R == null ? void 0 : R.find((b) => b === a), y === void 0)
      throw new Error(`Finder could not locate the option for ${a}.`);
    return y;
  }
  if (y = R == null ? void 0 : R.find(({ value: b }) => b === a), y === void 0)
    throw new Error(`Finder could not locate the option for ${a}.`);
  return y;
}
function xv(a) {
  return typeof a == "object" && a !== null && "label" in a && "value" in a;
}
function Tv(a) {
  if (ir(a))
    return "search";
  if (bo(a))
    return "filter";
  if (Eo(a))
    return "sortBy";
  if (xo(a))
    return "groupBy";
  throw new Error("Finder received an invalid rule.");
}
function Eo(a) {
  return typeof a == "object" && a !== null && "sortFn" in a;
}
function ir(a) {
  return typeof a == "object" && a !== null && "searchFn" in a;
}
function bo(a) {
  return typeof a == "object" && a !== null && "filterFn" in a;
}
function xo(a) {
  return typeof a == "object" && a !== null && "groupFn" in a;
}
function Du(a, s, i) {
  return a < s ? s : a > i ? i : a;
}
function Cv(a, s) {
  const i = [];
  return a.reduce((g, y) => {
    const R = y[s];
    return i.includes(String(R)) === !1 && g.push(y), g;
  }, []);
}
var sn, j, sr, Mu;
const un = class un {
  constructor({ initialFilters: s }, i) {
    z(this, sr);
    // memoize rules with generated options
    z(this, sn);
    z(this, j);
    this.filters = s || {}, M(this, j, i);
  }
  set(s, i) {
    const g = De(s, this.rules);
    if (g === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    const y = this.get(s);
    v(this, j).debouncer.has(g.id) === !1 && v(this, j).debouncer.register(g.id, g == null ? void 0 : g.debounceDelay), v(this, j).debouncer.call(g.id, () => {
      var U;
      if (v(this, j).isDisabled())
        return;
      let b = typeof i == "string" && i.trim() === "" ? void 0 : i;
      ((U = this.filters) == null ? void 0 : U[g.id]) !== void 0 && this.filters[g.id] === b || (this.filters = { ...this.filters, [g.id]: b }, v(this, j).touch({
        source: "filters",
        event: "change.filters.set",
        current: {
          rule: g,
          value: i
        },
        initial: { rule: g, value: y }
      }));
    });
  }
  get rules() {
    return v(this, sn) === void 0 && M(this, sn, Ee(this, sr, Mu).call(this, v(this, j).getItems(), v(this, j).getMeta())), v(this, sn);
  }
  recalculateHydratedRules() {
    M(this, sn, Ee(this, sr, Mu).call(this, v(this, j).getItems(), v(this, j).getMeta()));
  }
  getRule(s) {
    return De(s, this.rules);
  }
  get activeRules() {
    return this.rules.filter((s) => this.isActive(s));
  }
  get(s) {
    var y, R;
    const i = De(s, this.rules);
    if (i === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    const g = (y = this.filters) == null ? void 0 : y[i.id];
    if (g === void 0) {
      if (i.defaultValue)
        return i.defaultValue;
      if (i.required) {
        if (i.isBoolean)
          return !0;
        if (Array.isArray(i.options) && i.options.length > 0)
          return (R = i.options.at(0)) == null ? void 0 : R.value;
      }
      if (i.multiple)
        return [];
      if (i.isBoolean)
        return !1;
    }
    return g;
  }
  has(s, i) {
    const g = De(s, this.rules);
    if (g === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    const y = this.get(g);
    if (i === void 0)
      return y !== void 0;
    const R = wo(i, g.options, v(this, j).getItems(), v(this, j).getMeta());
    return g.multiple ? y.includes(R.value) : y === R.value;
  }
  delete(s) {
    const i = De(s, this.rules);
    if (i === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    return this.set(i, void 0);
  }
  isActive(s) {
    var g;
    const i = De(s, this.rules);
    return i ? un.isActive(i, (g = this.filters) == null ? void 0 : g[i.id]) : !1;
  }
  toggle(s) {
    const i = De(s, this.rules);
    if (i === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    if (i.isBoolean) {
      const g = this.get(i.id);
      this.set(i, !g);
      return;
    }
    throw new Error("Finder could not toggle this filter rule, as it is not boolean.");
  }
  toggleOption(s, i) {
    var b;
    const g = De(s, this.rules);
    if (g === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    if (g.options === void 0)
      throw new Error("Finder could not toggle this filter rule option, as the filter does not have any options.");
    if (!(g != null && g.multiple))
      throw new Error(
        "Finder could not toggle this filter rule option, as the rule does not allow multiple values. Consider using filters.set() or filters.toggle() instead."
      );
    const y = wo(i, g.options, v(this, j).getItems(), v(this, j).getMeta()), R = ((b = this.filters) == null ? void 0 : b[g.id]) ?? [];
    if (R.includes(y.value)) {
      this.set(g, [...R.filter((U) => U !== y.value)]);
      return;
    }
    this.set(g, [...R, y.value]);
  }
  test(s) {
    if (v(this, j).isLoading())
      return [];
    const i = { rules: [], meta: v(this, j).getMeta(), values: {}, ...s };
    if (s.isAdditive) {
      const g = Cv([...this.rules, ...i.rules], "id"), y = { ...this.getFilters(), ...i.values };
      return un.process(v(this, j).getItems(), g, y, i.meta);
    }
    return un.process(v(this, j).getItems(), i.rules, i.values, i.meta);
  }
  testRule({ rule: s, value: i, ...g }) {
    if (v(this, j).isLoading())
      return [];
    const y = De(s, this.rules);
    if (y === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    return this.test({
      rules: [y],
      values: { [y.id]: i },
      ...g
    });
  }
  testRuleOptions({ rule: s, ...i }) {
    if (v(this, j).isLoading())
      return /* @__PURE__ */ new Map();
    const g = De(s, this.rules);
    if (g === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    if (g.isBoolean === !0) {
      const y = /* @__PURE__ */ new Map();
      return y.set(!0, this.testRule({ rule: g, value: !0, ...i })), y.set(!1, this.testRule({ rule: g, value: !1, ...i })), y;
    }
    if (Array.isArray(g.options)) {
      const y = /* @__PURE__ */ new Map();
      return g.options.forEach((R) => {
        var U;
        let b;
        if (i.mergeExistingValue) {
          const ee = ((U = this.filters) == null ? void 0 : U[g.id]) ?? [];
          g.multiple && (b = [...ee, R.value]);
        } else
          g.multiple ? b = [R.value] : b = R.value;
        y.set(R, this.testRule({ rule: g, value: b, ...i }));
      }), y;
    }
    throw new Error("Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.");
  }
  // return all filter values with default options and type casts applied.
  getFilters() {
    return this.rules.reduce(
      (s, i) => (s[i.id] = this.get(i), s),
      {}
    );
  }
  process(s, i) {
    return un.process(s, this.rules, this.getFilters(), i);
  }
  static process(s, i, g, y) {
    const R = i.filter((b) => un.isActive(b, g == null ? void 0 : g[b.id]));
    return s.filter((b) => R.every((U) => U.filterFn(b, g == null ? void 0 : g[U.id], y)));
  }
  static isActive(s, i) {
    return s.required ? !0 : !(i === void 0 || s.multiple && Array.isArray(i) && i.length === 0 || s.isBoolean && i === !1 || typeof i == "string" && i.trim() === "");
  }
};
sn = new WeakMap(), j = new WeakMap(), sr = new WeakSet(), // hydrate and memoize generated options
Mu = function(s, i) {
  return v(this, j).getRules().filter(bo).map((y) => {
    let R = typeof y.options == "function" ? y.options(s, i) : y.options;
    return {
      ...y,
      options: R,
      // reduce uncertainty
      multiple: !!y.multiple,
      required: !!y.required,
      isBoolean: !!y.isBoolean,
      hidden: !!y.hidden,
      // brand it
      _isHydrated: !0
    };
  });
};
let Pu = un;
function To(a) {
  return {
    filters: a.getFilters(),
    raw: a.filters,
    activeRules: a.activeRules,
    rules: a.rules,
    isActive: a.isActive.bind(a),
    get: a.get.bind(a),
    has: a.has.bind(a),
    getRule: a.getRule.bind(a)
  };
}
function Ov(a) {
  return {
    ...To(a),
    toggle: a.toggle.bind(a),
    toggleOption: a.toggleOption.bind(a),
    set: a.set.bind(a),
    delete: a.delete.bind(a),
    test: a.test.bind(a),
    testRule: a.testRule.bind(a),
    testRuleOptions: a.testRuleOptions.bind(a)
  };
}
var ui = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, rr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var Lv = rr.exports, Io;
function Dv() {
  return Io || (Io = 1, function(a, s) {
    (function() {
      var i, g = "4.17.21", y = 200, R = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", b = "Expected a function", U = "Invalid `variable` option passed into `_.template`", ee = "__lodash_hash_undefined__", te = 500, ne = "__lodash_placeholder__", le = 1, xe = 2, ye = 4, Fe = 1, Ae = 2, he = 1, Te = 2, Ne = 4, pe = 8, fe = 16, re = 32, X = 64, nt = 128, Lt = 256, Ln = 512, oi = 30, Dn = "...", cr = 800, ai = 16, an = 1, hr = 2, dr = 3, Kt = 1 / 0, mt = 9007199254740991, gr = 17976931348623157e292, A = NaN, L = 4294967295, J = L - 1, ve = L >>> 1, gt = [
        ["ary", nt],
        ["bind", he],
        ["bindKey", Te],
        ["curry", pe],
        ["curryRight", fe],
        ["flip", Ln],
        ["partial", re],
        ["partialRight", X],
        ["rearg", Lt]
      ], me = "[object Arguments]", Dt = "[object Array]", Fn = "[object AsyncFunction]", ue = "[object Boolean]", Ke = "[object Date]", Pn = "[object DOMException]", ln = "[object Error]", pr = "[object Function]", Uu = "[object GeneratorFunction]", rt = "[object Map]", Mn = "[object Number]", Wo = "[object Null]", wt = "[object Object]", Nu = "[object Promise]", Uo = "[object Proxy]", Bn = "[object RegExp]", it = "[object Set]", Wn = "[object String]", vr = "[object Symbol]", No = "[object Undefined]", Un = "[object WeakMap]", Go = "[object WeakSet]", Nn = "[object ArrayBuffer]", cn = "[object DataView]", li = "[object Float32Array]", ci = "[object Float64Array]", hi = "[object Int8Array]", di = "[object Int16Array]", gi = "[object Int32Array]", pi = "[object Uint8Array]", vi = "[object Uint8ClampedArray]", _i = "[object Uint16Array]", mi = "[object Uint32Array]", qo = /\b__p \+= '';/g, Ho = /\b(__p \+=) '' \+/g, $o = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Gu = /&(?:amp|lt|gt|quot|#39);/g, qu = /[&<>"']/g, Yo = RegExp(Gu.source), ko = RegExp(qu.source), zo = /<%-([\s\S]+?)%>/g, Ko = /<%([\s\S]+?)%>/g, Hu = /<%=([\s\S]+?)%>/g, Zo = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Xo = /^\w*$/, Jo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, wi = /[\\^$.*+?()[\]{}|]/g, Vo = RegExp(wi.source), Ii = /^\s+/, Qo = /\s/, jo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ea = /\{\n\/\* \[wrapped with (.+)\] \*/, ta = /,? & /, na = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, ra = /[()=,{}\[\]\/\s]/, ia = /\\(\\)?/g, ua = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, $u = /\w*$/, sa = /^[-+]0x[0-9a-f]+$/i, fa = /^0b[01]+$/i, oa = /^\[object .+?Constructor\]$/, aa = /^0o[0-7]+$/i, la = /^(?:0|[1-9]\d*)$/, ca = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, _r = /($^)/, ha = /['\n\r\u2028\u2029\\]/g, mr = "\\ud800-\\udfff", da = "\\u0300-\\u036f", ga = "\\ufe20-\\ufe2f", pa = "\\u20d0-\\u20ff", Yu = da + ga + pa, ku = "\\u2700-\\u27bf", zu = "a-z\\xdf-\\xf6\\xf8-\\xff", va = "\\xac\\xb1\\xd7\\xf7", _a = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ma = "\\u2000-\\u206f", wa = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ku = "A-Z\\xc0-\\xd6\\xd8-\\xde", Zu = "\\ufe0e\\ufe0f", Xu = va + _a + ma + wa, yi = "['’]", Ia = "[" + mr + "]", Ju = "[" + Xu + "]", wr = "[" + Yu + "]", Vu = "\\d+", ya = "[" + ku + "]", Qu = "[" + zu + "]", ju = "[^" + mr + Xu + Vu + ku + zu + Ku + "]", Ai = "\\ud83c[\\udffb-\\udfff]", Aa = "(?:" + wr + "|" + Ai + ")", es = "[^" + mr + "]", Ri = "(?:\\ud83c[\\udde6-\\uddff]){2}", Si = "[\\ud800-\\udbff][\\udc00-\\udfff]", hn = "[" + Ku + "]", ts = "\\u200d", ns = "(?:" + Qu + "|" + ju + ")", Ra = "(?:" + hn + "|" + ju + ")", rs = "(?:" + yi + "(?:d|ll|m|re|s|t|ve))?", is = "(?:" + yi + "(?:D|LL|M|RE|S|T|VE))?", us = Aa + "?", ss = "[" + Zu + "]?", Sa = "(?:" + ts + "(?:" + [es, Ri, Si].join("|") + ")" + ss + us + ")*", Ea = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", ba = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", fs = ss + us + Sa, xa = "(?:" + [ya, Ri, Si].join("|") + ")" + fs, Ta = "(?:" + [es + wr + "?", wr, Ri, Si, Ia].join("|") + ")", Ca = RegExp(yi, "g"), Oa = RegExp(wr, "g"), Ei = RegExp(Ai + "(?=" + Ai + ")|" + Ta + fs, "g"), La = RegExp([
        hn + "?" + Qu + "+" + rs + "(?=" + [Ju, hn, "$"].join("|") + ")",
        Ra + "+" + is + "(?=" + [Ju, hn + ns, "$"].join("|") + ")",
        hn + "?" + ns + "+" + rs,
        hn + "+" + is,
        ba,
        Ea,
        Vu,
        xa
      ].join("|"), "g"), Da = RegExp("[" + ts + mr + Yu + Zu + "]"), Fa = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Pa = [
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
      ], Ma = -1, V = {};
      V[li] = V[ci] = V[hi] = V[di] = V[gi] = V[pi] = V[vi] = V[_i] = V[mi] = !0, V[me] = V[Dt] = V[Nn] = V[ue] = V[cn] = V[Ke] = V[ln] = V[pr] = V[rt] = V[Mn] = V[wt] = V[Bn] = V[it] = V[Wn] = V[Un] = !1;
      var Z = {};
      Z[me] = Z[Dt] = Z[Nn] = Z[cn] = Z[ue] = Z[Ke] = Z[li] = Z[ci] = Z[hi] = Z[di] = Z[gi] = Z[rt] = Z[Mn] = Z[wt] = Z[Bn] = Z[it] = Z[Wn] = Z[vr] = Z[pi] = Z[vi] = Z[_i] = Z[mi] = !0, Z[ln] = Z[pr] = Z[Un] = !1;
      var Ba = {
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
      }, Wa = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, Ua = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, Na = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, Ga = parseFloat, qa = parseInt, os = typeof ui == "object" && ui && ui.Object === Object && ui, Ha = typeof self == "object" && self && self.Object === Object && self, we = os || Ha || Function("return this")(), bi = s && !s.nodeType && s, Zt = bi && !0 && a && !a.nodeType && a, as = Zt && Zt.exports === bi, xi = as && os.process, Ze = function() {
        try {
          var h = Zt && Zt.require && Zt.require("util").types;
          return h || xi && xi.binding && xi.binding("util");
        } catch {
        }
      }(), ls = Ze && Ze.isArrayBuffer, cs = Ze && Ze.isDate, hs = Ze && Ze.isMap, ds = Ze && Ze.isRegExp, gs = Ze && Ze.isSet, ps = Ze && Ze.isTypedArray;
      function Ge(h, _, p) {
        switch (p.length) {
          case 0:
            return h.call(_);
          case 1:
            return h.call(_, p[0]);
          case 2:
            return h.call(_, p[0], p[1]);
          case 3:
            return h.call(_, p[0], p[1], p[2]);
        }
        return h.apply(_, p);
      }
      function $a(h, _, p, E) {
        for (var D = -1, H = h == null ? 0 : h.length; ++D < H; ) {
          var de = h[D];
          _(E, de, p(de), h);
        }
        return E;
      }
      function Xe(h, _) {
        for (var p = -1, E = h == null ? 0 : h.length; ++p < E && _(h[p], p, h) !== !1; )
          ;
        return h;
      }
      function Ya(h, _) {
        for (var p = h == null ? 0 : h.length; p-- && _(h[p], p, h) !== !1; )
          ;
        return h;
      }
      function vs(h, _) {
        for (var p = -1, E = h == null ? 0 : h.length; ++p < E; )
          if (!_(h[p], p, h))
            return !1;
        return !0;
      }
      function Ft(h, _) {
        for (var p = -1, E = h == null ? 0 : h.length, D = 0, H = []; ++p < E; ) {
          var de = h[p];
          _(de, p, h) && (H[D++] = de);
        }
        return H;
      }
      function Ir(h, _) {
        var p = h == null ? 0 : h.length;
        return !!p && dn(h, _, 0) > -1;
      }
      function Ti(h, _, p) {
        for (var E = -1, D = h == null ? 0 : h.length; ++E < D; )
          if (p(_, h[E]))
            return !0;
        return !1;
      }
      function Q(h, _) {
        for (var p = -1, E = h == null ? 0 : h.length, D = Array(E); ++p < E; )
          D[p] = _(h[p], p, h);
        return D;
      }
      function Pt(h, _) {
        for (var p = -1, E = _.length, D = h.length; ++p < E; )
          h[D + p] = _[p];
        return h;
      }
      function Ci(h, _, p, E) {
        var D = -1, H = h == null ? 0 : h.length;
        for (E && H && (p = h[++D]); ++D < H; )
          p = _(p, h[D], D, h);
        return p;
      }
      function ka(h, _, p, E) {
        var D = h == null ? 0 : h.length;
        for (E && D && (p = h[--D]); D--; )
          p = _(p, h[D], D, h);
        return p;
      }
      function Oi(h, _) {
        for (var p = -1, E = h == null ? 0 : h.length; ++p < E; )
          if (_(h[p], p, h))
            return !0;
        return !1;
      }
      var za = Li("length");
      function Ka(h) {
        return h.split("");
      }
      function Za(h) {
        return h.match(na) || [];
      }
      function _s(h, _, p) {
        var E;
        return p(h, function(D, H, de) {
          if (_(D, H, de))
            return E = H, !1;
        }), E;
      }
      function yr(h, _, p, E) {
        for (var D = h.length, H = p + (E ? 1 : -1); E ? H-- : ++H < D; )
          if (_(h[H], H, h))
            return H;
        return -1;
      }
      function dn(h, _, p) {
        return _ === _ ? sl(h, _, p) : yr(h, ms, p);
      }
      function Xa(h, _, p, E) {
        for (var D = p - 1, H = h.length; ++D < H; )
          if (E(h[D], _))
            return D;
        return -1;
      }
      function ms(h) {
        return h !== h;
      }
      function ws(h, _) {
        var p = h == null ? 0 : h.length;
        return p ? Fi(h, _) / p : A;
      }
      function Li(h) {
        return function(_) {
          return _ == null ? i : _[h];
        };
      }
      function Di(h) {
        return function(_) {
          return h == null ? i : h[_];
        };
      }
      function Is(h, _, p, E, D) {
        return D(h, function(H, de, k) {
          p = E ? (E = !1, H) : _(p, H, de, k);
        }), p;
      }
      function Ja(h, _) {
        var p = h.length;
        for (h.sort(_); p--; )
          h[p] = h[p].value;
        return h;
      }
      function Fi(h, _) {
        for (var p, E = -1, D = h.length; ++E < D; ) {
          var H = _(h[E]);
          H !== i && (p = p === i ? H : p + H);
        }
        return p;
      }
      function Pi(h, _) {
        for (var p = -1, E = Array(h); ++p < h; )
          E[p] = _(p);
        return E;
      }
      function Va(h, _) {
        return Q(_, function(p) {
          return [p, h[p]];
        });
      }
      function ys(h) {
        return h && h.slice(0, Es(h) + 1).replace(Ii, "");
      }
      function qe(h) {
        return function(_) {
          return h(_);
        };
      }
      function Mi(h, _) {
        return Q(_, function(p) {
          return h[p];
        });
      }
      function Gn(h, _) {
        return h.has(_);
      }
      function As(h, _) {
        for (var p = -1, E = h.length; ++p < E && dn(_, h[p], 0) > -1; )
          ;
        return p;
      }
      function Rs(h, _) {
        for (var p = h.length; p-- && dn(_, h[p], 0) > -1; )
          ;
        return p;
      }
      function Qa(h, _) {
        for (var p = h.length, E = 0; p--; )
          h[p] === _ && ++E;
        return E;
      }
      var ja = Di(Ba), el = Di(Wa);
      function tl(h) {
        return "\\" + Na[h];
      }
      function nl(h, _) {
        return h == null ? i : h[_];
      }
      function gn(h) {
        return Da.test(h);
      }
      function rl(h) {
        return Fa.test(h);
      }
      function il(h) {
        for (var _, p = []; !(_ = h.next()).done; )
          p.push(_.value);
        return p;
      }
      function Bi(h) {
        var _ = -1, p = Array(h.size);
        return h.forEach(function(E, D) {
          p[++_] = [D, E];
        }), p;
      }
      function Ss(h, _) {
        return function(p) {
          return h(_(p));
        };
      }
      function Mt(h, _) {
        for (var p = -1, E = h.length, D = 0, H = []; ++p < E; ) {
          var de = h[p];
          (de === _ || de === ne) && (h[p] = ne, H[D++] = p);
        }
        return H;
      }
      function Ar(h) {
        var _ = -1, p = Array(h.size);
        return h.forEach(function(E) {
          p[++_] = E;
        }), p;
      }
      function ul(h) {
        var _ = -1, p = Array(h.size);
        return h.forEach(function(E) {
          p[++_] = [E, E];
        }), p;
      }
      function sl(h, _, p) {
        for (var E = p - 1, D = h.length; ++E < D; )
          if (h[E] === _)
            return E;
        return -1;
      }
      function fl(h, _, p) {
        for (var E = p + 1; E--; )
          if (h[E] === _)
            return E;
        return E;
      }
      function pn(h) {
        return gn(h) ? al(h) : za(h);
      }
      function ut(h) {
        return gn(h) ? ll(h) : Ka(h);
      }
      function Es(h) {
        for (var _ = h.length; _-- && Qo.test(h.charAt(_)); )
          ;
        return _;
      }
      var ol = Di(Ua);
      function al(h) {
        for (var _ = Ei.lastIndex = 0; Ei.test(h); )
          ++_;
        return _;
      }
      function ll(h) {
        return h.match(Ei) || [];
      }
      function cl(h) {
        return h.match(La) || [];
      }
      var hl = function h(_) {
        _ = _ == null ? we : vn.defaults(we.Object(), _, vn.pick(we, Pa));
        var p = _.Array, E = _.Date, D = _.Error, H = _.Function, de = _.Math, k = _.Object, Wi = _.RegExp, dl = _.String, Je = _.TypeError, Rr = p.prototype, gl = H.prototype, _n = k.prototype, Sr = _["__core-js_shared__"], Er = gl.toString, Y = _n.hasOwnProperty, pl = 0, bs = function() {
          var e = /[^.]+$/.exec(Sr && Sr.keys && Sr.keys.IE_PROTO || "");
          return e ? "Symbol(src)_1." + e : "";
        }(), br = _n.toString, vl = Er.call(k), _l = we._, ml = Wi(
          "^" + Er.call(Y).replace(wi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), xr = as ? _.Buffer : i, Bt = _.Symbol, Tr = _.Uint8Array, xs = xr ? xr.allocUnsafe : i, Cr = Ss(k.getPrototypeOf, k), Ts = k.create, Cs = _n.propertyIsEnumerable, Or = Rr.splice, Os = Bt ? Bt.isConcatSpreadable : i, qn = Bt ? Bt.iterator : i, Xt = Bt ? Bt.toStringTag : i, Lr = function() {
          try {
            var e = en(k, "defineProperty");
            return e({}, "", {}), e;
          } catch {
          }
        }(), wl = _.clearTimeout !== we.clearTimeout && _.clearTimeout, Il = E && E.now !== we.Date.now && E.now, yl = _.setTimeout !== we.setTimeout && _.setTimeout, Dr = de.ceil, Fr = de.floor, Ui = k.getOwnPropertySymbols, Al = xr ? xr.isBuffer : i, Ls = _.isFinite, Rl = Rr.join, Sl = Ss(k.keys, k), ge = de.max, Re = de.min, El = E.now, bl = _.parseInt, Ds = de.random, xl = Rr.reverse, Ni = en(_, "DataView"), Hn = en(_, "Map"), Gi = en(_, "Promise"), mn = en(_, "Set"), $n = en(_, "WeakMap"), Yn = en(k, "create"), Pr = $n && new $n(), wn = {}, Tl = tn(Ni), Cl = tn(Hn), Ol = tn(Gi), Ll = tn(mn), Dl = tn($n), Mr = Bt ? Bt.prototype : i, kn = Mr ? Mr.valueOf : i, Fs = Mr ? Mr.toString : i;
        function f(e) {
          if (se(e) && !F(e) && !(e instanceof G)) {
            if (e instanceof Ve)
              return e;
            if (Y.call(e, "__wrapped__"))
              return Mf(e);
          }
          return new Ve(e);
        }
        var In = /* @__PURE__ */ function() {
          function e() {
          }
          return function(t) {
            if (!ie(t))
              return {};
            if (Ts)
              return Ts(t);
            e.prototype = t;
            var n = new e();
            return e.prototype = i, n;
          };
        }();
        function Br() {
        }
        function Ve(e, t) {
          this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
        }
        f.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: zo,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: Ko,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: Hu,
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
        }, f.prototype = Br.prototype, f.prototype.constructor = f, Ve.prototype = In(Br.prototype), Ve.prototype.constructor = Ve;
        function G(e) {
          this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = L, this.__views__ = [];
        }
        function Fl() {
          var e = new G(this.__wrapped__);
          return e.__actions__ = Pe(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Pe(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Pe(this.__views__), e;
        }
        function Pl() {
          if (this.__filtered__) {
            var e = new G(this);
            e.__dir__ = -1, e.__filtered__ = !0;
          } else
            e = this.clone(), e.__dir__ *= -1;
          return e;
        }
        function Ml() {
          var e = this.__wrapped__.value(), t = this.__dir__, n = F(e), r = t < 0, u = n ? e.length : 0, o = Kc(0, u, this.__views__), l = o.start, c = o.end, d = c - l, m = r ? c : l - 1, w = this.__iteratees__, I = w.length, S = 0, x = Re(d, this.__takeCount__);
          if (!n || !r && u == d && x == d)
            return rf(e, this.__actions__);
          var C = [];
          e:
            for (; d-- && S < x; ) {
              m += t;
              for (var B = -1, O = e[m]; ++B < I; ) {
                var N = w[B], q = N.iteratee, Ye = N.type, Le = q(O);
                if (Ye == hr)
                  O = Le;
                else if (!Le) {
                  if (Ye == an)
                    continue e;
                  break e;
                }
              }
              C[S++] = O;
            }
          return C;
        }
        G.prototype = In(Br.prototype), G.prototype.constructor = G;
        function Jt(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function Bl() {
          this.__data__ = Yn ? Yn(null) : {}, this.size = 0;
        }
        function Wl(e) {
          var t = this.has(e) && delete this.__data__[e];
          return this.size -= t ? 1 : 0, t;
        }
        function Ul(e) {
          var t = this.__data__;
          if (Yn) {
            var n = t[e];
            return n === ee ? i : n;
          }
          return Y.call(t, e) ? t[e] : i;
        }
        function Nl(e) {
          var t = this.__data__;
          return Yn ? t[e] !== i : Y.call(t, e);
        }
        function Gl(e, t) {
          var n = this.__data__;
          return this.size += this.has(e) ? 0 : 1, n[e] = Yn && t === i ? ee : t, this;
        }
        Jt.prototype.clear = Bl, Jt.prototype.delete = Wl, Jt.prototype.get = Ul, Jt.prototype.has = Nl, Jt.prototype.set = Gl;
        function It(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function ql() {
          this.__data__ = [], this.size = 0;
        }
        function Hl(e) {
          var t = this.__data__, n = Wr(t, e);
          if (n < 0)
            return !1;
          var r = t.length - 1;
          return n == r ? t.pop() : Or.call(t, n, 1), --this.size, !0;
        }
        function $l(e) {
          var t = this.__data__, n = Wr(t, e);
          return n < 0 ? i : t[n][1];
        }
        function Yl(e) {
          return Wr(this.__data__, e) > -1;
        }
        function kl(e, t) {
          var n = this.__data__, r = Wr(n, e);
          return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
        }
        It.prototype.clear = ql, It.prototype.delete = Hl, It.prototype.get = $l, It.prototype.has = Yl, It.prototype.set = kl;
        function yt(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function zl() {
          this.size = 0, this.__data__ = {
            hash: new Jt(),
            map: new (Hn || It)(),
            string: new Jt()
          };
        }
        function Kl(e) {
          var t = Xr(this, e).delete(e);
          return this.size -= t ? 1 : 0, t;
        }
        function Zl(e) {
          return Xr(this, e).get(e);
        }
        function Xl(e) {
          return Xr(this, e).has(e);
        }
        function Jl(e, t) {
          var n = Xr(this, e), r = n.size;
          return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
        }
        yt.prototype.clear = zl, yt.prototype.delete = Kl, yt.prototype.get = Zl, yt.prototype.has = Xl, yt.prototype.set = Jl;
        function Vt(e) {
          var t = -1, n = e == null ? 0 : e.length;
          for (this.__data__ = new yt(); ++t < n; )
            this.add(e[t]);
        }
        function Vl(e) {
          return this.__data__.set(e, ee), this;
        }
        function Ql(e) {
          return this.__data__.has(e);
        }
        Vt.prototype.add = Vt.prototype.push = Vl, Vt.prototype.has = Ql;
        function st(e) {
          var t = this.__data__ = new It(e);
          this.size = t.size;
        }
        function jl() {
          this.__data__ = new It(), this.size = 0;
        }
        function ec(e) {
          var t = this.__data__, n = t.delete(e);
          return this.size = t.size, n;
        }
        function tc(e) {
          return this.__data__.get(e);
        }
        function nc(e) {
          return this.__data__.has(e);
        }
        function rc(e, t) {
          var n = this.__data__;
          if (n instanceof It) {
            var r = n.__data__;
            if (!Hn || r.length < y - 1)
              return r.push([e, t]), this.size = ++n.size, this;
            n = this.__data__ = new yt(r);
          }
          return n.set(e, t), this.size = n.size, this;
        }
        st.prototype.clear = jl, st.prototype.delete = ec, st.prototype.get = tc, st.prototype.has = nc, st.prototype.set = rc;
        function Ps(e, t) {
          var n = F(e), r = !n && nn(e), u = !n && !r && qt(e), o = !n && !r && !u && Sn(e), l = n || r || u || o, c = l ? Pi(e.length, dl) : [], d = c.length;
          for (var m in e)
            (t || Y.call(e, m)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
            (m == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            u && (m == "offset" || m == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            o && (m == "buffer" || m == "byteLength" || m == "byteOffset") || // Skip index properties.
            Et(m, d))) && c.push(m);
          return c;
        }
        function Ms(e) {
          var t = e.length;
          return t ? e[Vi(0, t - 1)] : i;
        }
        function ic(e, t) {
          return Jr(Pe(e), Qt(t, 0, e.length));
        }
        function uc(e) {
          return Jr(Pe(e));
        }
        function qi(e, t, n) {
          (n !== i && !ft(e[t], n) || n === i && !(t in e)) && At(e, t, n);
        }
        function zn(e, t, n) {
          var r = e[t];
          (!(Y.call(e, t) && ft(r, n)) || n === i && !(t in e)) && At(e, t, n);
        }
        function Wr(e, t) {
          for (var n = e.length; n--; )
            if (ft(e[n][0], t))
              return n;
          return -1;
        }
        function sc(e, t, n, r) {
          return Wt(e, function(u, o, l) {
            t(r, u, n(u), l);
          }), r;
        }
        function Bs(e, t) {
          return e && vt(t, _e(t), e);
        }
        function fc(e, t) {
          return e && vt(t, Be(t), e);
        }
        function At(e, t, n) {
          t == "__proto__" && Lr ? Lr(e, t, {
            configurable: !0,
            enumerable: !0,
            value: n,
            writable: !0
          }) : e[t] = n;
        }
        function Hi(e, t) {
          for (var n = -1, r = t.length, u = p(r), o = e == null; ++n < r; )
            u[n] = o ? i : Au(e, t[n]);
          return u;
        }
        function Qt(e, t, n) {
          return e === e && (n !== i && (e = e <= n ? e : n), t !== i && (e = e >= t ? e : t)), e;
        }
        function Qe(e, t, n, r, u, o) {
          var l, c = t & le, d = t & xe, m = t & ye;
          if (n && (l = u ? n(e, r, u, o) : n(e)), l !== i)
            return l;
          if (!ie(e))
            return e;
          var w = F(e);
          if (w) {
            if (l = Xc(e), !c)
              return Pe(e, l);
          } else {
            var I = Se(e), S = I == pr || I == Uu;
            if (qt(e))
              return ff(e, c);
            if (I == wt || I == me || S && !u) {
              if (l = d || S ? {} : bf(e), !c)
                return d ? Uc(e, fc(l, e)) : Wc(e, Bs(l, e));
            } else {
              if (!Z[I])
                return u ? e : {};
              l = Jc(e, I, c);
            }
          }
          o || (o = new st());
          var x = o.get(e);
          if (x)
            return x;
          o.set(e, l), to(e) ? e.forEach(function(O) {
            l.add(Qe(O, t, n, O, e, o));
          }) : jf(e) && e.forEach(function(O, N) {
            l.set(N, Qe(O, t, n, N, e, o));
          });
          var C = m ? d ? ou : fu : d ? Be : _e, B = w ? i : C(e);
          return Xe(B || e, function(O, N) {
            B && (N = O, O = e[N]), zn(l, N, Qe(O, t, n, N, e, o));
          }), l;
        }
        function oc(e) {
          var t = _e(e);
          return function(n) {
            return Ws(n, e, t);
          };
        }
        function Ws(e, t, n) {
          var r = n.length;
          if (e == null)
            return !r;
          for (e = k(e); r--; ) {
            var u = n[r], o = t[u], l = e[u];
            if (l === i && !(u in e) || !o(l))
              return !1;
          }
          return !0;
        }
        function Us(e, t, n) {
          if (typeof e != "function")
            throw new Je(b);
          return jn(function() {
            e.apply(i, n);
          }, t);
        }
        function Kn(e, t, n, r) {
          var u = -1, o = Ir, l = !0, c = e.length, d = [], m = t.length;
          if (!c)
            return d;
          n && (t = Q(t, qe(n))), r ? (o = Ti, l = !1) : t.length >= y && (o = Gn, l = !1, t = new Vt(t));
          e:
            for (; ++u < c; ) {
              var w = e[u], I = n == null ? w : n(w);
              if (w = r || w !== 0 ? w : 0, l && I === I) {
                for (var S = m; S--; )
                  if (t[S] === I)
                    continue e;
                d.push(w);
              } else o(t, I, r) || d.push(w);
            }
          return d;
        }
        var Wt = hf(pt), Ns = hf(Yi, !0);
        function ac(e, t) {
          var n = !0;
          return Wt(e, function(r, u, o) {
            return n = !!t(r, u, o), n;
          }), n;
        }
        function Ur(e, t, n) {
          for (var r = -1, u = e.length; ++r < u; ) {
            var o = e[r], l = t(o);
            if (l != null && (c === i ? l === l && !$e(l) : n(l, c)))
              var c = l, d = o;
          }
          return d;
        }
        function lc(e, t, n, r) {
          var u = e.length;
          for (n = P(n), n < 0 && (n = -n > u ? 0 : u + n), r = r === i || r > u ? u : P(r), r < 0 && (r += u), r = n > r ? 0 : ro(r); n < r; )
            e[n++] = t;
          return e;
        }
        function Gs(e, t) {
          var n = [];
          return Wt(e, function(r, u, o) {
            t(r, u, o) && n.push(r);
          }), n;
        }
        function Ie(e, t, n, r, u) {
          var o = -1, l = e.length;
          for (n || (n = Qc), u || (u = []); ++o < l; ) {
            var c = e[o];
            t > 0 && n(c) ? t > 1 ? Ie(c, t - 1, n, r, u) : Pt(u, c) : r || (u[u.length] = c);
          }
          return u;
        }
        var $i = df(), qs = df(!0);
        function pt(e, t) {
          return e && $i(e, t, _e);
        }
        function Yi(e, t) {
          return e && qs(e, t, _e);
        }
        function Nr(e, t) {
          return Ft(t, function(n) {
            return bt(e[n]);
          });
        }
        function jt(e, t) {
          t = Nt(t, e);
          for (var n = 0, r = t.length; e != null && n < r; )
            e = e[_t(t[n++])];
          return n && n == r ? e : i;
        }
        function Hs(e, t, n) {
          var r = t(e);
          return F(e) ? r : Pt(r, n(e));
        }
        function Ce(e) {
          return e == null ? e === i ? No : Wo : Xt && Xt in k(e) ? zc(e) : uh(e);
        }
        function ki(e, t) {
          return e > t;
        }
        function cc(e, t) {
          return e != null && Y.call(e, t);
        }
        function hc(e, t) {
          return e != null && t in k(e);
        }
        function dc(e, t, n) {
          return e >= Re(t, n) && e < ge(t, n);
        }
        function zi(e, t, n) {
          for (var r = n ? Ti : Ir, u = e[0].length, o = e.length, l = o, c = p(o), d = 1 / 0, m = []; l--; ) {
            var w = e[l];
            l && t && (w = Q(w, qe(t))), d = Re(w.length, d), c[l] = !n && (t || u >= 120 && w.length >= 120) ? new Vt(l && w) : i;
          }
          w = e[0];
          var I = -1, S = c[0];
          e:
            for (; ++I < u && m.length < d; ) {
              var x = w[I], C = t ? t(x) : x;
              if (x = n || x !== 0 ? x : 0, !(S ? Gn(S, C) : r(m, C, n))) {
                for (l = o; --l; ) {
                  var B = c[l];
                  if (!(B ? Gn(B, C) : r(e[l], C, n)))
                    continue e;
                }
                S && S.push(C), m.push(x);
              }
            }
          return m;
        }
        function gc(e, t, n, r) {
          return pt(e, function(u, o, l) {
            t(r, n(u), o, l);
          }), r;
        }
        function Zn(e, t, n) {
          t = Nt(t, e), e = Of(e, t);
          var r = e == null ? e : e[_t(et(t))];
          return r == null ? i : Ge(r, e, n);
        }
        function $s(e) {
          return se(e) && Ce(e) == me;
        }
        function pc(e) {
          return se(e) && Ce(e) == Nn;
        }
        function vc(e) {
          return se(e) && Ce(e) == Ke;
        }
        function Xn(e, t, n, r, u) {
          return e === t ? !0 : e == null || t == null || !se(e) && !se(t) ? e !== e && t !== t : _c(e, t, n, r, Xn, u);
        }
        function _c(e, t, n, r, u, o) {
          var l = F(e), c = F(t), d = l ? Dt : Se(e), m = c ? Dt : Se(t);
          d = d == me ? wt : d, m = m == me ? wt : m;
          var w = d == wt, I = m == wt, S = d == m;
          if (S && qt(e)) {
            if (!qt(t))
              return !1;
            l = !0, w = !1;
          }
          if (S && !w)
            return o || (o = new st()), l || Sn(e) ? Rf(e, t, n, r, u, o) : Yc(e, t, d, n, r, u, o);
          if (!(n & Fe)) {
            var x = w && Y.call(e, "__wrapped__"), C = I && Y.call(t, "__wrapped__");
            if (x || C) {
              var B = x ? e.value() : e, O = C ? t.value() : t;
              return o || (o = new st()), u(B, O, n, r, o);
            }
          }
          return S ? (o || (o = new st()), kc(e, t, n, r, u, o)) : !1;
        }
        function mc(e) {
          return se(e) && Se(e) == rt;
        }
        function Ki(e, t, n, r) {
          var u = n.length, o = u, l = !r;
          if (e == null)
            return !o;
          for (e = k(e); u--; ) {
            var c = n[u];
            if (l && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
              return !1;
          }
          for (; ++u < o; ) {
            c = n[u];
            var d = c[0], m = e[d], w = c[1];
            if (l && c[2]) {
              if (m === i && !(d in e))
                return !1;
            } else {
              var I = new st();
              if (r)
                var S = r(m, w, d, e, t, I);
              if (!(S === i ? Xn(w, m, Fe | Ae, r, I) : S))
                return !1;
            }
          }
          return !0;
        }
        function Ys(e) {
          if (!ie(e) || eh(e))
            return !1;
          var t = bt(e) ? ml : oa;
          return t.test(tn(e));
        }
        function wc(e) {
          return se(e) && Ce(e) == Bn;
        }
        function Ic(e) {
          return se(e) && Se(e) == it;
        }
        function yc(e) {
          return se(e) && ni(e.length) && !!V[Ce(e)];
        }
        function ks(e) {
          return typeof e == "function" ? e : e == null ? We : typeof e == "object" ? F(e) ? Zs(e[0], e[1]) : Ks(e) : po(e);
        }
        function Zi(e) {
          if (!Qn(e))
            return Sl(e);
          var t = [];
          for (var n in k(e))
            Y.call(e, n) && n != "constructor" && t.push(n);
          return t;
        }
        function Ac(e) {
          if (!ie(e))
            return ih(e);
          var t = Qn(e), n = [];
          for (var r in e)
            r == "constructor" && (t || !Y.call(e, r)) || n.push(r);
          return n;
        }
        function Xi(e, t) {
          return e < t;
        }
        function zs(e, t) {
          var n = -1, r = Me(e) ? p(e.length) : [];
          return Wt(e, function(u, o, l) {
            r[++n] = t(u, o, l);
          }), r;
        }
        function Ks(e) {
          var t = lu(e);
          return t.length == 1 && t[0][2] ? Tf(t[0][0], t[0][1]) : function(n) {
            return n === e || Ki(n, e, t);
          };
        }
        function Zs(e, t) {
          return hu(e) && xf(t) ? Tf(_t(e), t) : function(n) {
            var r = Au(n, e);
            return r === i && r === t ? Ru(n, e) : Xn(t, r, Fe | Ae);
          };
        }
        function Gr(e, t, n, r, u) {
          e !== t && $i(t, function(o, l) {
            if (u || (u = new st()), ie(o))
              Rc(e, t, l, n, Gr, r, u);
            else {
              var c = r ? r(gu(e, l), o, l + "", e, t, u) : i;
              c === i && (c = o), qi(e, l, c);
            }
          }, Be);
        }
        function Rc(e, t, n, r, u, o, l) {
          var c = gu(e, n), d = gu(t, n), m = l.get(d);
          if (m) {
            qi(e, n, m);
            return;
          }
          var w = o ? o(c, d, n + "", e, t, l) : i, I = w === i;
          if (I) {
            var S = F(d), x = !S && qt(d), C = !S && !x && Sn(d);
            w = d, S || x || C ? F(c) ? w = c : oe(c) ? w = Pe(c) : x ? (I = !1, w = ff(d, !0)) : C ? (I = !1, w = of(d, !0)) : w = [] : er(d) || nn(d) ? (w = c, nn(c) ? w = io(c) : (!ie(c) || bt(c)) && (w = bf(d))) : I = !1;
          }
          I && (l.set(d, w), u(w, d, r, o, l), l.delete(d)), qi(e, n, w);
        }
        function Xs(e, t) {
          var n = e.length;
          if (n)
            return t += t < 0 ? n : 0, Et(t, n) ? e[t] : i;
        }
        function Js(e, t, n) {
          t.length ? t = Q(t, function(o) {
            return F(o) ? function(l) {
              return jt(l, o.length === 1 ? o[0] : o);
            } : o;
          }) : t = [We];
          var r = -1;
          t = Q(t, qe(T()));
          var u = zs(e, function(o, l, c) {
            var d = Q(t, function(m) {
              return m(o);
            });
            return { criteria: d, index: ++r, value: o };
          });
          return Ja(u, function(o, l) {
            return Bc(o, l, n);
          });
        }
        function Sc(e, t) {
          return Vs(e, t, function(n, r) {
            return Ru(e, r);
          });
        }
        function Vs(e, t, n) {
          for (var r = -1, u = t.length, o = {}; ++r < u; ) {
            var l = t[r], c = jt(e, l);
            n(c, l) && Jn(o, Nt(l, e), c);
          }
          return o;
        }
        function Ec(e) {
          return function(t) {
            return jt(t, e);
          };
        }
        function Ji(e, t, n, r) {
          var u = r ? Xa : dn, o = -1, l = t.length, c = e;
          for (e === t && (t = Pe(t)), n && (c = Q(e, qe(n))); ++o < l; )
            for (var d = 0, m = t[o], w = n ? n(m) : m; (d = u(c, w, d, r)) > -1; )
              c !== e && Or.call(c, d, 1), Or.call(e, d, 1);
          return e;
        }
        function Qs(e, t) {
          for (var n = e ? t.length : 0, r = n - 1; n--; ) {
            var u = t[n];
            if (n == r || u !== o) {
              var o = u;
              Et(u) ? Or.call(e, u, 1) : eu(e, u);
            }
          }
          return e;
        }
        function Vi(e, t) {
          return e + Fr(Ds() * (t - e + 1));
        }
        function bc(e, t, n, r) {
          for (var u = -1, o = ge(Dr((t - e) / (n || 1)), 0), l = p(o); o--; )
            l[r ? o : ++u] = e, e += n;
          return l;
        }
        function Qi(e, t) {
          var n = "";
          if (!e || t < 1 || t > mt)
            return n;
          do
            t % 2 && (n += e), t = Fr(t / 2), t && (e += e);
          while (t);
          return n;
        }
        function W(e, t) {
          return pu(Cf(e, t, We), e + "");
        }
        function xc(e) {
          return Ms(En(e));
        }
        function Tc(e, t) {
          var n = En(e);
          return Jr(n, Qt(t, 0, n.length));
        }
        function Jn(e, t, n, r) {
          if (!ie(e))
            return e;
          t = Nt(t, e);
          for (var u = -1, o = t.length, l = o - 1, c = e; c != null && ++u < o; ) {
            var d = _t(t[u]), m = n;
            if (d === "__proto__" || d === "constructor" || d === "prototype")
              return e;
            if (u != l) {
              var w = c[d];
              m = r ? r(w, d, c) : i, m === i && (m = ie(w) ? w : Et(t[u + 1]) ? [] : {});
            }
            zn(c, d, m), c = c[d];
          }
          return e;
        }
        var js = Pr ? function(e, t) {
          return Pr.set(e, t), e;
        } : We, Cc = Lr ? function(e, t) {
          return Lr(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Eu(t),
            writable: !0
          });
        } : We;
        function Oc(e) {
          return Jr(En(e));
        }
        function je(e, t, n) {
          var r = -1, u = e.length;
          t < 0 && (t = -t > u ? 0 : u + t), n = n > u ? u : n, n < 0 && (n += u), u = t > n ? 0 : n - t >>> 0, t >>>= 0;
          for (var o = p(u); ++r < u; )
            o[r] = e[r + t];
          return o;
        }
        function Lc(e, t) {
          var n;
          return Wt(e, function(r, u, o) {
            return n = t(r, u, o), !n;
          }), !!n;
        }
        function qr(e, t, n) {
          var r = 0, u = e == null ? r : e.length;
          if (typeof t == "number" && t === t && u <= ve) {
            for (; r < u; ) {
              var o = r + u >>> 1, l = e[o];
              l !== null && !$e(l) && (n ? l <= t : l < t) ? r = o + 1 : u = o;
            }
            return u;
          }
          return ji(e, t, We, n);
        }
        function ji(e, t, n, r) {
          var u = 0, o = e == null ? 0 : e.length;
          if (o === 0)
            return 0;
          t = n(t);
          for (var l = t !== t, c = t === null, d = $e(t), m = t === i; u < o; ) {
            var w = Fr((u + o) / 2), I = n(e[w]), S = I !== i, x = I === null, C = I === I, B = $e(I);
            if (l)
              var O = r || C;
            else m ? O = C && (r || S) : c ? O = C && S && (r || !x) : d ? O = C && S && !x && (r || !B) : x || B ? O = !1 : O = r ? I <= t : I < t;
            O ? u = w + 1 : o = w;
          }
          return Re(o, J);
        }
        function ef(e, t) {
          for (var n = -1, r = e.length, u = 0, o = []; ++n < r; ) {
            var l = e[n], c = t ? t(l) : l;
            if (!n || !ft(c, d)) {
              var d = c;
              o[u++] = l === 0 ? 0 : l;
            }
          }
          return o;
        }
        function tf(e) {
          return typeof e == "number" ? e : $e(e) ? A : +e;
        }
        function He(e) {
          if (typeof e == "string")
            return e;
          if (F(e))
            return Q(e, He) + "";
          if ($e(e))
            return Fs ? Fs.call(e) : "";
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function Ut(e, t, n) {
          var r = -1, u = Ir, o = e.length, l = !0, c = [], d = c;
          if (n)
            l = !1, u = Ti;
          else if (o >= y) {
            var m = t ? null : Hc(e);
            if (m)
              return Ar(m);
            l = !1, u = Gn, d = new Vt();
          } else
            d = t ? [] : c;
          e:
            for (; ++r < o; ) {
              var w = e[r], I = t ? t(w) : w;
              if (w = n || w !== 0 ? w : 0, l && I === I) {
                for (var S = d.length; S--; )
                  if (d[S] === I)
                    continue e;
                t && d.push(I), c.push(w);
              } else u(d, I, n) || (d !== c && d.push(I), c.push(w));
            }
          return c;
        }
        function eu(e, t) {
          return t = Nt(t, e), e = Of(e, t), e == null || delete e[_t(et(t))];
        }
        function nf(e, t, n, r) {
          return Jn(e, t, n(jt(e, t)), r);
        }
        function Hr(e, t, n, r) {
          for (var u = e.length, o = r ? u : -1; (r ? o-- : ++o < u) && t(e[o], o, e); )
            ;
          return n ? je(e, r ? 0 : o, r ? o + 1 : u) : je(e, r ? o + 1 : 0, r ? u : o);
        }
        function rf(e, t) {
          var n = e;
          return n instanceof G && (n = n.value()), Ci(t, function(r, u) {
            return u.func.apply(u.thisArg, Pt([r], u.args));
          }, n);
        }
        function tu(e, t, n) {
          var r = e.length;
          if (r < 2)
            return r ? Ut(e[0]) : [];
          for (var u = -1, o = p(r); ++u < r; )
            for (var l = e[u], c = -1; ++c < r; )
              c != u && (o[u] = Kn(o[u] || l, e[c], t, n));
          return Ut(Ie(o, 1), t, n);
        }
        function uf(e, t, n) {
          for (var r = -1, u = e.length, o = t.length, l = {}; ++r < u; ) {
            var c = r < o ? t[r] : i;
            n(l, e[r], c);
          }
          return l;
        }
        function nu(e) {
          return oe(e) ? e : [];
        }
        function ru(e) {
          return typeof e == "function" ? e : We;
        }
        function Nt(e, t) {
          return F(e) ? e : hu(e, t) ? [e] : Pf($(e));
        }
        var Dc = W;
        function Gt(e, t, n) {
          var r = e.length;
          return n = n === i ? r : n, !t && n >= r ? e : je(e, t, n);
        }
        var sf = wl || function(e) {
          return we.clearTimeout(e);
        };
        function ff(e, t) {
          if (t)
            return e.slice();
          var n = e.length, r = xs ? xs(n) : new e.constructor(n);
          return e.copy(r), r;
        }
        function iu(e) {
          var t = new e.constructor(e.byteLength);
          return new Tr(t).set(new Tr(e)), t;
        }
        function Fc(e, t) {
          var n = t ? iu(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.byteLength);
        }
        function Pc(e) {
          var t = new e.constructor(e.source, $u.exec(e));
          return t.lastIndex = e.lastIndex, t;
        }
        function Mc(e) {
          return kn ? k(kn.call(e)) : {};
        }
        function of(e, t) {
          var n = t ? iu(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        }
        function af(e, t) {
          if (e !== t) {
            var n = e !== i, r = e === null, u = e === e, o = $e(e), l = t !== i, c = t === null, d = t === t, m = $e(t);
            if (!c && !m && !o && e > t || o && l && d && !c && !m || r && l && d || !n && d || !u)
              return 1;
            if (!r && !o && !m && e < t || m && n && u && !r && !o || c && n && u || !l && u || !d)
              return -1;
          }
          return 0;
        }
        function Bc(e, t, n) {
          for (var r = -1, u = e.criteria, o = t.criteria, l = u.length, c = n.length; ++r < l; ) {
            var d = af(u[r], o[r]);
            if (d) {
              if (r >= c)
                return d;
              var m = n[r];
              return d * (m == "desc" ? -1 : 1);
            }
          }
          return e.index - t.index;
        }
        function lf(e, t, n, r) {
          for (var u = -1, o = e.length, l = n.length, c = -1, d = t.length, m = ge(o - l, 0), w = p(d + m), I = !r; ++c < d; )
            w[c] = t[c];
          for (; ++u < l; )
            (I || u < o) && (w[n[u]] = e[u]);
          for (; m--; )
            w[c++] = e[u++];
          return w;
        }
        function cf(e, t, n, r) {
          for (var u = -1, o = e.length, l = -1, c = n.length, d = -1, m = t.length, w = ge(o - c, 0), I = p(w + m), S = !r; ++u < w; )
            I[u] = e[u];
          for (var x = u; ++d < m; )
            I[x + d] = t[d];
          for (; ++l < c; )
            (S || u < o) && (I[x + n[l]] = e[u++]);
          return I;
        }
        function Pe(e, t) {
          var n = -1, r = e.length;
          for (t || (t = p(r)); ++n < r; )
            t[n] = e[n];
          return t;
        }
        function vt(e, t, n, r) {
          var u = !n;
          n || (n = {});
          for (var o = -1, l = t.length; ++o < l; ) {
            var c = t[o], d = r ? r(n[c], e[c], c, n, e) : i;
            d === i && (d = e[c]), u ? At(n, c, d) : zn(n, c, d);
          }
          return n;
        }
        function Wc(e, t) {
          return vt(e, cu(e), t);
        }
        function Uc(e, t) {
          return vt(e, Sf(e), t);
        }
        function $r(e, t) {
          return function(n, r) {
            var u = F(n) ? $a : sc, o = t ? t() : {};
            return u(n, e, T(r, 2), o);
          };
        }
        function yn(e) {
          return W(function(t, n) {
            var r = -1, u = n.length, o = u > 1 ? n[u - 1] : i, l = u > 2 ? n[2] : i;
            for (o = e.length > 3 && typeof o == "function" ? (u--, o) : i, l && Oe(n[0], n[1], l) && (o = u < 3 ? i : o, u = 1), t = k(t); ++r < u; ) {
              var c = n[r];
              c && e(t, c, r, o);
            }
            return t;
          });
        }
        function hf(e, t) {
          return function(n, r) {
            if (n == null)
              return n;
            if (!Me(n))
              return e(n, r);
            for (var u = n.length, o = t ? u : -1, l = k(n); (t ? o-- : ++o < u) && r(l[o], o, l) !== !1; )
              ;
            return n;
          };
        }
        function df(e) {
          return function(t, n, r) {
            for (var u = -1, o = k(t), l = r(t), c = l.length; c--; ) {
              var d = l[e ? c : ++u];
              if (n(o[d], d, o) === !1)
                break;
            }
            return t;
          };
        }
        function Nc(e, t, n) {
          var r = t & he, u = Vn(e);
          function o() {
            var l = this && this !== we && this instanceof o ? u : e;
            return l.apply(r ? n : this, arguments);
          }
          return o;
        }
        function gf(e) {
          return function(t) {
            t = $(t);
            var n = gn(t) ? ut(t) : i, r = n ? n[0] : t.charAt(0), u = n ? Gt(n, 1).join("") : t.slice(1);
            return r[e]() + u;
          };
        }
        function An(e) {
          return function(t) {
            return Ci(ho(co(t).replace(Ca, "")), e, "");
          };
        }
        function Vn(e) {
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
            var n = In(e.prototype), r = e.apply(n, t);
            return ie(r) ? r : n;
          };
        }
        function Gc(e, t, n) {
          var r = Vn(e);
          function u() {
            for (var o = arguments.length, l = p(o), c = o, d = Rn(u); c--; )
              l[c] = arguments[c];
            var m = o < 3 && l[0] !== d && l[o - 1] !== d ? [] : Mt(l, d);
            if (o -= m.length, o < n)
              return wf(
                e,
                t,
                Yr,
                u.placeholder,
                i,
                l,
                m,
                i,
                i,
                n - o
              );
            var w = this && this !== we && this instanceof u ? r : e;
            return Ge(w, this, l);
          }
          return u;
        }
        function pf(e) {
          return function(t, n, r) {
            var u = k(t);
            if (!Me(t)) {
              var o = T(n, 3);
              t = _e(t), n = function(c) {
                return o(u[c], c, u);
              };
            }
            var l = e(t, n, r);
            return l > -1 ? u[o ? t[l] : l] : i;
          };
        }
        function vf(e) {
          return St(function(t) {
            var n = t.length, r = n, u = Ve.prototype.thru;
            for (e && t.reverse(); r--; ) {
              var o = t[r];
              if (typeof o != "function")
                throw new Je(b);
              if (u && !l && Zr(o) == "wrapper")
                var l = new Ve([], !0);
            }
            for (r = l ? r : n; ++r < n; ) {
              o = t[r];
              var c = Zr(o), d = c == "wrapper" ? au(o) : i;
              d && du(d[0]) && d[1] == (nt | pe | re | Lt) && !d[4].length && d[9] == 1 ? l = l[Zr(d[0])].apply(l, d[3]) : l = o.length == 1 && du(o) ? l[c]() : l.thru(o);
            }
            return function() {
              var m = arguments, w = m[0];
              if (l && m.length == 1 && F(w))
                return l.plant(w).value();
              for (var I = 0, S = n ? t[I].apply(this, m) : w; ++I < n; )
                S = t[I].call(this, S);
              return S;
            };
          });
        }
        function Yr(e, t, n, r, u, o, l, c, d, m) {
          var w = t & nt, I = t & he, S = t & Te, x = t & (pe | fe), C = t & Ln, B = S ? i : Vn(e);
          function O() {
            for (var N = arguments.length, q = p(N), Ye = N; Ye--; )
              q[Ye] = arguments[Ye];
            if (x)
              var Le = Rn(O), ke = Qa(q, Le);
            if (r && (q = lf(q, r, u, x)), o && (q = cf(q, o, l, x)), N -= ke, x && N < m) {
              var ae = Mt(q, Le);
              return wf(
                e,
                t,
                Yr,
                O.placeholder,
                n,
                q,
                ae,
                c,
                d,
                m - N
              );
            }
            var ot = I ? n : this, Tt = S ? ot[e] : e;
            return N = q.length, c ? q = sh(q, c) : C && N > 1 && q.reverse(), w && d < N && (q.length = d), this && this !== we && this instanceof O && (Tt = B || Vn(Tt)), Tt.apply(ot, q);
          }
          return O;
        }
        function _f(e, t) {
          return function(n, r) {
            return gc(n, e, t(r), {});
          };
        }
        function kr(e, t) {
          return function(n, r) {
            var u;
            if (n === i && r === i)
              return t;
            if (n !== i && (u = n), r !== i) {
              if (u === i)
                return r;
              typeof n == "string" || typeof r == "string" ? (n = He(n), r = He(r)) : (n = tf(n), r = tf(r)), u = e(n, r);
            }
            return u;
          };
        }
        function uu(e) {
          return St(function(t) {
            return t = Q(t, qe(T())), W(function(n) {
              var r = this;
              return e(t, function(u) {
                return Ge(u, r, n);
              });
            });
          });
        }
        function zr(e, t) {
          t = t === i ? " " : He(t);
          var n = t.length;
          if (n < 2)
            return n ? Qi(t, e) : t;
          var r = Qi(t, Dr(e / pn(t)));
          return gn(t) ? Gt(ut(r), 0, e).join("") : r.slice(0, e);
        }
        function qc(e, t, n, r) {
          var u = t & he, o = Vn(e);
          function l() {
            for (var c = -1, d = arguments.length, m = -1, w = r.length, I = p(w + d), S = this && this !== we && this instanceof l ? o : e; ++m < w; )
              I[m] = r[m];
            for (; d--; )
              I[m++] = arguments[++c];
            return Ge(S, u ? n : this, I);
          }
          return l;
        }
        function mf(e) {
          return function(t, n, r) {
            return r && typeof r != "number" && Oe(t, n, r) && (n = r = i), t = xt(t), n === i ? (n = t, t = 0) : n = xt(n), r = r === i ? t < n ? 1 : -1 : xt(r), bc(t, n, r, e);
          };
        }
        function Kr(e) {
          return function(t, n) {
            return typeof t == "string" && typeof n == "string" || (t = tt(t), n = tt(n)), e(t, n);
          };
        }
        function wf(e, t, n, r, u, o, l, c, d, m) {
          var w = t & pe, I = w ? l : i, S = w ? i : l, x = w ? o : i, C = w ? i : o;
          t |= w ? re : X, t &= ~(w ? X : re), t & Ne || (t &= -4);
          var B = [
            e,
            t,
            u,
            x,
            I,
            C,
            S,
            c,
            d,
            m
          ], O = n.apply(i, B);
          return du(e) && Lf(O, B), O.placeholder = r, Df(O, e, t);
        }
        function su(e) {
          var t = de[e];
          return function(n, r) {
            if (n = tt(n), r = r == null ? 0 : Re(P(r), 292), r && Ls(n)) {
              var u = ($(n) + "e").split("e"), o = t(u[0] + "e" + (+u[1] + r));
              return u = ($(o) + "e").split("e"), +(u[0] + "e" + (+u[1] - r));
            }
            return t(n);
          };
        }
        var Hc = mn && 1 / Ar(new mn([, -0]))[1] == Kt ? function(e) {
          return new mn(e);
        } : Tu;
        function If(e) {
          return function(t) {
            var n = Se(t);
            return n == rt ? Bi(t) : n == it ? ul(t) : Va(t, e(t));
          };
        }
        function Rt(e, t, n, r, u, o, l, c) {
          var d = t & Te;
          if (!d && typeof e != "function")
            throw new Je(b);
          var m = r ? r.length : 0;
          if (m || (t &= -97, r = u = i), l = l === i ? l : ge(P(l), 0), c = c === i ? c : P(c), m -= u ? u.length : 0, t & X) {
            var w = r, I = u;
            r = u = i;
          }
          var S = d ? i : au(e), x = [
            e,
            t,
            n,
            r,
            u,
            w,
            I,
            o,
            l,
            c
          ];
          if (S && rh(x, S), e = x[0], t = x[1], n = x[2], r = x[3], u = x[4], c = x[9] = x[9] === i ? d ? 0 : e.length : ge(x[9] - m, 0), !c && t & (pe | fe) && (t &= -25), !t || t == he)
            var C = Nc(e, t, n);
          else t == pe || t == fe ? C = Gc(e, t, c) : (t == re || t == (he | re)) && !u.length ? C = qc(e, t, n, r) : C = Yr.apply(i, x);
          var B = S ? js : Lf;
          return Df(B(C, x), e, t);
        }
        function yf(e, t, n, r) {
          return e === i || ft(e, _n[n]) && !Y.call(r, n) ? t : e;
        }
        function Af(e, t, n, r, u, o) {
          return ie(e) && ie(t) && (o.set(t, e), Gr(e, t, i, Af, o), o.delete(t)), e;
        }
        function $c(e) {
          return er(e) ? i : e;
        }
        function Rf(e, t, n, r, u, o) {
          var l = n & Fe, c = e.length, d = t.length;
          if (c != d && !(l && d > c))
            return !1;
          var m = o.get(e), w = o.get(t);
          if (m && w)
            return m == t && w == e;
          var I = -1, S = !0, x = n & Ae ? new Vt() : i;
          for (o.set(e, t), o.set(t, e); ++I < c; ) {
            var C = e[I], B = t[I];
            if (r)
              var O = l ? r(B, C, I, t, e, o) : r(C, B, I, e, t, o);
            if (O !== i) {
              if (O)
                continue;
              S = !1;
              break;
            }
            if (x) {
              if (!Oi(t, function(N, q) {
                if (!Gn(x, q) && (C === N || u(C, N, n, r, o)))
                  return x.push(q);
              })) {
                S = !1;
                break;
              }
            } else if (!(C === B || u(C, B, n, r, o))) {
              S = !1;
              break;
            }
          }
          return o.delete(e), o.delete(t), S;
        }
        function Yc(e, t, n, r, u, o, l) {
          switch (n) {
            case cn:
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                return !1;
              e = e.buffer, t = t.buffer;
            case Nn:
              return !(e.byteLength != t.byteLength || !o(new Tr(e), new Tr(t)));
            case ue:
            case Ke:
            case Mn:
              return ft(+e, +t);
            case ln:
              return e.name == t.name && e.message == t.message;
            case Bn:
            case Wn:
              return e == t + "";
            case rt:
              var c = Bi;
            case it:
              var d = r & Fe;
              if (c || (c = Ar), e.size != t.size && !d)
                return !1;
              var m = l.get(e);
              if (m)
                return m == t;
              r |= Ae, l.set(e, t);
              var w = Rf(c(e), c(t), r, u, o, l);
              return l.delete(e), w;
            case vr:
              if (kn)
                return kn.call(e) == kn.call(t);
          }
          return !1;
        }
        function kc(e, t, n, r, u, o) {
          var l = n & Fe, c = fu(e), d = c.length, m = fu(t), w = m.length;
          if (d != w && !l)
            return !1;
          for (var I = d; I--; ) {
            var S = c[I];
            if (!(l ? S in t : Y.call(t, S)))
              return !1;
          }
          var x = o.get(e), C = o.get(t);
          if (x && C)
            return x == t && C == e;
          var B = !0;
          o.set(e, t), o.set(t, e);
          for (var O = l; ++I < d; ) {
            S = c[I];
            var N = e[S], q = t[S];
            if (r)
              var Ye = l ? r(q, N, S, t, e, o) : r(N, q, S, e, t, o);
            if (!(Ye === i ? N === q || u(N, q, n, r, o) : Ye)) {
              B = !1;
              break;
            }
            O || (O = S == "constructor");
          }
          if (B && !O) {
            var Le = e.constructor, ke = t.constructor;
            Le != ke && "constructor" in e && "constructor" in t && !(typeof Le == "function" && Le instanceof Le && typeof ke == "function" && ke instanceof ke) && (B = !1);
          }
          return o.delete(e), o.delete(t), B;
        }
        function St(e) {
          return pu(Cf(e, i, Uf), e + "");
        }
        function fu(e) {
          return Hs(e, _e, cu);
        }
        function ou(e) {
          return Hs(e, Be, Sf);
        }
        var au = Pr ? function(e) {
          return Pr.get(e);
        } : Tu;
        function Zr(e) {
          for (var t = e.name + "", n = wn[t], r = Y.call(wn, t) ? n.length : 0; r--; ) {
            var u = n[r], o = u.func;
            if (o == null || o == e)
              return u.name;
          }
          return t;
        }
        function Rn(e) {
          var t = Y.call(f, "placeholder") ? f : e;
          return t.placeholder;
        }
        function T() {
          var e = f.iteratee || bu;
          return e = e === bu ? ks : e, arguments.length ? e(arguments[0], arguments[1]) : e;
        }
        function Xr(e, t) {
          var n = e.__data__;
          return jc(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
        }
        function lu(e) {
          for (var t = _e(e), n = t.length; n--; ) {
            var r = t[n], u = e[r];
            t[n] = [r, u, xf(u)];
          }
          return t;
        }
        function en(e, t) {
          var n = nl(e, t);
          return Ys(n) ? n : i;
        }
        function zc(e) {
          var t = Y.call(e, Xt), n = e[Xt];
          try {
            e[Xt] = i;
            var r = !0;
          } catch {
          }
          var u = br.call(e);
          return r && (t ? e[Xt] = n : delete e[Xt]), u;
        }
        var cu = Ui ? function(e) {
          return e == null ? [] : (e = k(e), Ft(Ui(e), function(t) {
            return Cs.call(e, t);
          }));
        } : Cu, Sf = Ui ? function(e) {
          for (var t = []; e; )
            Pt(t, cu(e)), e = Cr(e);
          return t;
        } : Cu, Se = Ce;
        (Ni && Se(new Ni(new ArrayBuffer(1))) != cn || Hn && Se(new Hn()) != rt || Gi && Se(Gi.resolve()) != Nu || mn && Se(new mn()) != it || $n && Se(new $n()) != Un) && (Se = function(e) {
          var t = Ce(e), n = t == wt ? e.constructor : i, r = n ? tn(n) : "";
          if (r)
            switch (r) {
              case Tl:
                return cn;
              case Cl:
                return rt;
              case Ol:
                return Nu;
              case Ll:
                return it;
              case Dl:
                return Un;
            }
          return t;
        });
        function Kc(e, t, n) {
          for (var r = -1, u = n.length; ++r < u; ) {
            var o = n[r], l = o.size;
            switch (o.type) {
              case "drop":
                e += l;
                break;
              case "dropRight":
                t -= l;
                break;
              case "take":
                t = Re(t, e + l);
                break;
              case "takeRight":
                e = ge(e, t - l);
                break;
            }
          }
          return { start: e, end: t };
        }
        function Zc(e) {
          var t = e.match(ea);
          return t ? t[1].split(ta) : [];
        }
        function Ef(e, t, n) {
          t = Nt(t, e);
          for (var r = -1, u = t.length, o = !1; ++r < u; ) {
            var l = _t(t[r]);
            if (!(o = e != null && n(e, l)))
              break;
            e = e[l];
          }
          return o || ++r != u ? o : (u = e == null ? 0 : e.length, !!u && ni(u) && Et(l, u) && (F(e) || nn(e)));
        }
        function Xc(e) {
          var t = e.length, n = new e.constructor(t);
          return t && typeof e[0] == "string" && Y.call(e, "index") && (n.index = e.index, n.input = e.input), n;
        }
        function bf(e) {
          return typeof e.constructor == "function" && !Qn(e) ? In(Cr(e)) : {};
        }
        function Jc(e, t, n) {
          var r = e.constructor;
          switch (t) {
            case Nn:
              return iu(e);
            case ue:
            case Ke:
              return new r(+e);
            case cn:
              return Fc(e, n);
            case li:
            case ci:
            case hi:
            case di:
            case gi:
            case pi:
            case vi:
            case _i:
            case mi:
              return of(e, n);
            case rt:
              return new r();
            case Mn:
            case Wn:
              return new r(e);
            case Bn:
              return Pc(e);
            case it:
              return new r();
            case vr:
              return Mc(e);
          }
        }
        function Vc(e, t) {
          var n = t.length;
          if (!n)
            return e;
          var r = n - 1;
          return t[r] = (n > 1 ? "& " : "") + t[r], t = t.join(n > 2 ? ", " : " "), e.replace(jo, `{
/* [wrapped with ` + t + `] */
`);
        }
        function Qc(e) {
          return F(e) || nn(e) || !!(Os && e && e[Os]);
        }
        function Et(e, t) {
          var n = typeof e;
          return t = t ?? mt, !!t && (n == "number" || n != "symbol" && la.test(e)) && e > -1 && e % 1 == 0 && e < t;
        }
        function Oe(e, t, n) {
          if (!ie(n))
            return !1;
          var r = typeof t;
          return (r == "number" ? Me(n) && Et(t, n.length) : r == "string" && t in n) ? ft(n[t], e) : !1;
        }
        function hu(e, t) {
          if (F(e))
            return !1;
          var n = typeof e;
          return n == "number" || n == "symbol" || n == "boolean" || e == null || $e(e) ? !0 : Xo.test(e) || !Zo.test(e) || t != null && e in k(t);
        }
        function jc(e) {
          var t = typeof e;
          return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
        }
        function du(e) {
          var t = Zr(e), n = f[t];
          if (typeof n != "function" || !(t in G.prototype))
            return !1;
          if (e === n)
            return !0;
          var r = au(n);
          return !!r && e === r[0];
        }
        function eh(e) {
          return !!bs && bs in e;
        }
        var th = Sr ? bt : Ou;
        function Qn(e) {
          var t = e && e.constructor, n = typeof t == "function" && t.prototype || _n;
          return e === n;
        }
        function xf(e) {
          return e === e && !ie(e);
        }
        function Tf(e, t) {
          return function(n) {
            return n == null ? !1 : n[e] === t && (t !== i || e in k(n));
          };
        }
        function nh(e) {
          var t = ei(e, function(r) {
            return n.size === te && n.clear(), r;
          }), n = t.cache;
          return t;
        }
        function rh(e, t) {
          var n = e[1], r = t[1], u = n | r, o = u < (he | Te | nt), l = r == nt && n == pe || r == nt && n == Lt && e[7].length <= t[8] || r == (nt | Lt) && t[7].length <= t[8] && n == pe;
          if (!(o || l))
            return e;
          r & he && (e[2] = t[2], u |= n & he ? 0 : Ne);
          var c = t[3];
          if (c) {
            var d = e[3];
            e[3] = d ? lf(d, c, t[4]) : c, e[4] = d ? Mt(e[3], ne) : t[4];
          }
          return c = t[5], c && (d = e[5], e[5] = d ? cf(d, c, t[6]) : c, e[6] = d ? Mt(e[5], ne) : t[6]), c = t[7], c && (e[7] = c), r & nt && (e[8] = e[8] == null ? t[8] : Re(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = u, e;
        }
        function ih(e) {
          var t = [];
          if (e != null)
            for (var n in k(e))
              t.push(n);
          return t;
        }
        function uh(e) {
          return br.call(e);
        }
        function Cf(e, t, n) {
          return t = ge(t === i ? e.length - 1 : t, 0), function() {
            for (var r = arguments, u = -1, o = ge(r.length - t, 0), l = p(o); ++u < o; )
              l[u] = r[t + u];
            u = -1;
            for (var c = p(t + 1); ++u < t; )
              c[u] = r[u];
            return c[t] = n(l), Ge(e, this, c);
          };
        }
        function Of(e, t) {
          return t.length < 2 ? e : jt(e, je(t, 0, -1));
        }
        function sh(e, t) {
          for (var n = e.length, r = Re(t.length, n), u = Pe(e); r--; ) {
            var o = t[r];
            e[r] = Et(o, n) ? u[o] : i;
          }
          return e;
        }
        function gu(e, t) {
          if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
            return e[t];
        }
        var Lf = Ff(js), jn = yl || function(e, t) {
          return we.setTimeout(e, t);
        }, pu = Ff(Cc);
        function Df(e, t, n) {
          var r = t + "";
          return pu(e, Vc(r, fh(Zc(r), n)));
        }
        function Ff(e) {
          var t = 0, n = 0;
          return function() {
            var r = El(), u = ai - (r - n);
            if (n = r, u > 0) {
              if (++t >= cr)
                return arguments[0];
            } else
              t = 0;
            return e.apply(i, arguments);
          };
        }
        function Jr(e, t) {
          var n = -1, r = e.length, u = r - 1;
          for (t = t === i ? r : t; ++n < t; ) {
            var o = Vi(n, u), l = e[o];
            e[o] = e[n], e[n] = l;
          }
          return e.length = t, e;
        }
        var Pf = nh(function(e) {
          var t = [];
          return e.charCodeAt(0) === 46 && t.push(""), e.replace(Jo, function(n, r, u, o) {
            t.push(u ? o.replace(ia, "$1") : r || n);
          }), t;
        });
        function _t(e) {
          if (typeof e == "string" || $e(e))
            return e;
          var t = e + "";
          return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
        }
        function tn(e) {
          if (e != null) {
            try {
              return Er.call(e);
            } catch {
            }
            try {
              return e + "";
            } catch {
            }
          }
          return "";
        }
        function fh(e, t) {
          return Xe(gt, function(n) {
            var r = "_." + n[0];
            t & n[1] && !Ir(e, r) && e.push(r);
          }), e.sort();
        }
        function Mf(e) {
          if (e instanceof G)
            return e.clone();
          var t = new Ve(e.__wrapped__, e.__chain__);
          return t.__actions__ = Pe(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
        }
        function oh(e, t, n) {
          (n ? Oe(e, t, n) : t === i) ? t = 1 : t = ge(P(t), 0);
          var r = e == null ? 0 : e.length;
          if (!r || t < 1)
            return [];
          for (var u = 0, o = 0, l = p(Dr(r / t)); u < r; )
            l[o++] = je(e, u, u += t);
          return l;
        }
        function ah(e) {
          for (var t = -1, n = e == null ? 0 : e.length, r = 0, u = []; ++t < n; ) {
            var o = e[t];
            o && (u[r++] = o);
          }
          return u;
        }
        function lh() {
          var e = arguments.length;
          if (!e)
            return [];
          for (var t = p(e - 1), n = arguments[0], r = e; r--; )
            t[r - 1] = arguments[r];
          return Pt(F(n) ? Pe(n) : [n], Ie(t, 1));
        }
        var ch = W(function(e, t) {
          return oe(e) ? Kn(e, Ie(t, 1, oe, !0)) : [];
        }), hh = W(function(e, t) {
          var n = et(t);
          return oe(n) && (n = i), oe(e) ? Kn(e, Ie(t, 1, oe, !0), T(n, 2)) : [];
        }), dh = W(function(e, t) {
          var n = et(t);
          return oe(n) && (n = i), oe(e) ? Kn(e, Ie(t, 1, oe, !0), i, n) : [];
        });
        function gh(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (t = n || t === i ? 1 : P(t), je(e, t < 0 ? 0 : t, r)) : [];
        }
        function ph(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (t = n || t === i ? 1 : P(t), t = r - t, je(e, 0, t < 0 ? 0 : t)) : [];
        }
        function vh(e, t) {
          return e && e.length ? Hr(e, T(t, 3), !0, !0) : [];
        }
        function _h(e, t) {
          return e && e.length ? Hr(e, T(t, 3), !0) : [];
        }
        function mh(e, t, n, r) {
          var u = e == null ? 0 : e.length;
          return u ? (n && typeof n != "number" && Oe(e, t, n) && (n = 0, r = u), lc(e, t, n, r)) : [];
        }
        function Bf(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var u = n == null ? 0 : P(n);
          return u < 0 && (u = ge(r + u, 0)), yr(e, T(t, 3), u);
        }
        function Wf(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var u = r - 1;
          return n !== i && (u = P(n), u = n < 0 ? ge(r + u, 0) : Re(u, r - 1)), yr(e, T(t, 3), u, !0);
        }
        function Uf(e) {
          var t = e == null ? 0 : e.length;
          return t ? Ie(e, 1) : [];
        }
        function wh(e) {
          var t = e == null ? 0 : e.length;
          return t ? Ie(e, Kt) : [];
        }
        function Ih(e, t) {
          var n = e == null ? 0 : e.length;
          return n ? (t = t === i ? 1 : P(t), Ie(e, t)) : [];
        }
        function yh(e) {
          for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
            var u = e[t];
            r[u[0]] = u[1];
          }
          return r;
        }
        function Nf(e) {
          return e && e.length ? e[0] : i;
        }
        function Ah(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var u = n == null ? 0 : P(n);
          return u < 0 && (u = ge(r + u, 0)), dn(e, t, u);
        }
        function Rh(e) {
          var t = e == null ? 0 : e.length;
          return t ? je(e, 0, -1) : [];
        }
        var Sh = W(function(e) {
          var t = Q(e, nu);
          return t.length && t[0] === e[0] ? zi(t) : [];
        }), Eh = W(function(e) {
          var t = et(e), n = Q(e, nu);
          return t === et(n) ? t = i : n.pop(), n.length && n[0] === e[0] ? zi(n, T(t, 2)) : [];
        }), bh = W(function(e) {
          var t = et(e), n = Q(e, nu);
          return t = typeof t == "function" ? t : i, t && n.pop(), n.length && n[0] === e[0] ? zi(n, i, t) : [];
        });
        function xh(e, t) {
          return e == null ? "" : Rl.call(e, t);
        }
        function et(e) {
          var t = e == null ? 0 : e.length;
          return t ? e[t - 1] : i;
        }
        function Th(e, t, n) {
          var r = e == null ? 0 : e.length;
          if (!r)
            return -1;
          var u = r;
          return n !== i && (u = P(n), u = u < 0 ? ge(r + u, 0) : Re(u, r - 1)), t === t ? fl(e, t, u) : yr(e, ms, u, !0);
        }
        function Ch(e, t) {
          return e && e.length ? Xs(e, P(t)) : i;
        }
        var Oh = W(Gf);
        function Gf(e, t) {
          return e && e.length && t && t.length ? Ji(e, t) : e;
        }
        function Lh(e, t, n) {
          return e && e.length && t && t.length ? Ji(e, t, T(n, 2)) : e;
        }
        function Dh(e, t, n) {
          return e && e.length && t && t.length ? Ji(e, t, i, n) : e;
        }
        var Fh = St(function(e, t) {
          var n = e == null ? 0 : e.length, r = Hi(e, t);
          return Qs(e, Q(t, function(u) {
            return Et(u, n) ? +u : u;
          }).sort(af)), r;
        });
        function Ph(e, t) {
          var n = [];
          if (!(e && e.length))
            return n;
          var r = -1, u = [], o = e.length;
          for (t = T(t, 3); ++r < o; ) {
            var l = e[r];
            t(l, r, e) && (n.push(l), u.push(r));
          }
          return Qs(e, u), n;
        }
        function vu(e) {
          return e == null ? e : xl.call(e);
        }
        function Mh(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (n && typeof n != "number" && Oe(e, t, n) ? (t = 0, n = r) : (t = t == null ? 0 : P(t), n = n === i ? r : P(n)), je(e, t, n)) : [];
        }
        function Bh(e, t) {
          return qr(e, t);
        }
        function Wh(e, t, n) {
          return ji(e, t, T(n, 2));
        }
        function Uh(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var r = qr(e, t);
            if (r < n && ft(e[r], t))
              return r;
          }
          return -1;
        }
        function Nh(e, t) {
          return qr(e, t, !0);
        }
        function Gh(e, t, n) {
          return ji(e, t, T(n, 2), !0);
        }
        function qh(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            var r = qr(e, t, !0) - 1;
            if (ft(e[r], t))
              return r;
          }
          return -1;
        }
        function Hh(e) {
          return e && e.length ? ef(e) : [];
        }
        function $h(e, t) {
          return e && e.length ? ef(e, T(t, 2)) : [];
        }
        function Yh(e) {
          var t = e == null ? 0 : e.length;
          return t ? je(e, 1, t) : [];
        }
        function kh(e, t, n) {
          return e && e.length ? (t = n || t === i ? 1 : P(t), je(e, 0, t < 0 ? 0 : t)) : [];
        }
        function zh(e, t, n) {
          var r = e == null ? 0 : e.length;
          return r ? (t = n || t === i ? 1 : P(t), t = r - t, je(e, t < 0 ? 0 : t, r)) : [];
        }
        function Kh(e, t) {
          return e && e.length ? Hr(e, T(t, 3), !1, !0) : [];
        }
        function Zh(e, t) {
          return e && e.length ? Hr(e, T(t, 3)) : [];
        }
        var Xh = W(function(e) {
          return Ut(Ie(e, 1, oe, !0));
        }), Jh = W(function(e) {
          var t = et(e);
          return oe(t) && (t = i), Ut(Ie(e, 1, oe, !0), T(t, 2));
        }), Vh = W(function(e) {
          var t = et(e);
          return t = typeof t == "function" ? t : i, Ut(Ie(e, 1, oe, !0), i, t);
        });
        function Qh(e) {
          return e && e.length ? Ut(e) : [];
        }
        function jh(e, t) {
          return e && e.length ? Ut(e, T(t, 2)) : [];
        }
        function ed(e, t) {
          return t = typeof t == "function" ? t : i, e && e.length ? Ut(e, i, t) : [];
        }
        function _u(e) {
          if (!(e && e.length))
            return [];
          var t = 0;
          return e = Ft(e, function(n) {
            if (oe(n))
              return t = ge(n.length, t), !0;
          }), Pi(t, function(n) {
            return Q(e, Li(n));
          });
        }
        function qf(e, t) {
          if (!(e && e.length))
            return [];
          var n = _u(e);
          return t == null ? n : Q(n, function(r) {
            return Ge(t, i, r);
          });
        }
        var td = W(function(e, t) {
          return oe(e) ? Kn(e, t) : [];
        }), nd = W(function(e) {
          return tu(Ft(e, oe));
        }), rd = W(function(e) {
          var t = et(e);
          return oe(t) && (t = i), tu(Ft(e, oe), T(t, 2));
        }), id = W(function(e) {
          var t = et(e);
          return t = typeof t == "function" ? t : i, tu(Ft(e, oe), i, t);
        }), ud = W(_u);
        function sd(e, t) {
          return uf(e || [], t || [], zn);
        }
        function fd(e, t) {
          return uf(e || [], t || [], Jn);
        }
        var od = W(function(e) {
          var t = e.length, n = t > 1 ? e[t - 1] : i;
          return n = typeof n == "function" ? (e.pop(), n) : i, qf(e, n);
        });
        function Hf(e) {
          var t = f(e);
          return t.__chain__ = !0, t;
        }
        function ad(e, t) {
          return t(e), e;
        }
        function Vr(e, t) {
          return t(e);
        }
        var ld = St(function(e) {
          var t = e.length, n = t ? e[0] : 0, r = this.__wrapped__, u = function(o) {
            return Hi(o, e);
          };
          return t > 1 || this.__actions__.length || !(r instanceof G) || !Et(n) ? this.thru(u) : (r = r.slice(n, +n + (t ? 1 : 0)), r.__actions__.push({
            func: Vr,
            args: [u],
            thisArg: i
          }), new Ve(r, this.__chain__).thru(function(o) {
            return t && !o.length && o.push(i), o;
          }));
        });
        function cd() {
          return Hf(this);
        }
        function hd() {
          return new Ve(this.value(), this.__chain__);
        }
        function dd() {
          this.__values__ === i && (this.__values__ = no(this.value()));
          var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
          return { done: e, value: t };
        }
        function gd() {
          return this;
        }
        function pd(e) {
          for (var t, n = this; n instanceof Br; ) {
            var r = Mf(n);
            r.__index__ = 0, r.__values__ = i, t ? u.__wrapped__ = r : t = r;
            var u = r;
            n = n.__wrapped__;
          }
          return u.__wrapped__ = e, t;
        }
        function vd() {
          var e = this.__wrapped__;
          if (e instanceof G) {
            var t = e;
            return this.__actions__.length && (t = new G(this)), t = t.reverse(), t.__actions__.push({
              func: Vr,
              args: [vu],
              thisArg: i
            }), new Ve(t, this.__chain__);
          }
          return this.thru(vu);
        }
        function _d() {
          return rf(this.__wrapped__, this.__actions__);
        }
        var md = $r(function(e, t, n) {
          Y.call(e, n) ? ++e[n] : At(e, n, 1);
        });
        function wd(e, t, n) {
          var r = F(e) ? vs : ac;
          return n && Oe(e, t, n) && (t = i), r(e, T(t, 3));
        }
        function Id(e, t) {
          var n = F(e) ? Ft : Gs;
          return n(e, T(t, 3));
        }
        var yd = pf(Bf), Ad = pf(Wf);
        function Rd(e, t) {
          return Ie(Qr(e, t), 1);
        }
        function Sd(e, t) {
          return Ie(Qr(e, t), Kt);
        }
        function Ed(e, t, n) {
          return n = n === i ? 1 : P(n), Ie(Qr(e, t), n);
        }
        function $f(e, t) {
          var n = F(e) ? Xe : Wt;
          return n(e, T(t, 3));
        }
        function Yf(e, t) {
          var n = F(e) ? Ya : Ns;
          return n(e, T(t, 3));
        }
        var bd = $r(function(e, t, n) {
          Y.call(e, n) ? e[n].push(t) : At(e, n, [t]);
        });
        function xd(e, t, n, r) {
          e = Me(e) ? e : En(e), n = n && !r ? P(n) : 0;
          var u = e.length;
          return n < 0 && (n = ge(u + n, 0)), ri(e) ? n <= u && e.indexOf(t, n) > -1 : !!u && dn(e, t, n) > -1;
        }
        var Td = W(function(e, t, n) {
          var r = -1, u = typeof t == "function", o = Me(e) ? p(e.length) : [];
          return Wt(e, function(l) {
            o[++r] = u ? Ge(t, l, n) : Zn(l, t, n);
          }), o;
        }), Cd = $r(function(e, t, n) {
          At(e, n, t);
        });
        function Qr(e, t) {
          var n = F(e) ? Q : zs;
          return n(e, T(t, 3));
        }
        function Od(e, t, n, r) {
          return e == null ? [] : (F(t) || (t = t == null ? [] : [t]), n = r ? i : n, F(n) || (n = n == null ? [] : [n]), Js(e, t, n));
        }
        var Ld = $r(function(e, t, n) {
          e[n ? 0 : 1].push(t);
        }, function() {
          return [[], []];
        });
        function Dd(e, t, n) {
          var r = F(e) ? Ci : Is, u = arguments.length < 3;
          return r(e, T(t, 4), n, u, Wt);
        }
        function Fd(e, t, n) {
          var r = F(e) ? ka : Is, u = arguments.length < 3;
          return r(e, T(t, 4), n, u, Ns);
        }
        function Pd(e, t) {
          var n = F(e) ? Ft : Gs;
          return n(e, ti(T(t, 3)));
        }
        function Md(e) {
          var t = F(e) ? Ms : xc;
          return t(e);
        }
        function Bd(e, t, n) {
          (n ? Oe(e, t, n) : t === i) ? t = 1 : t = P(t);
          var r = F(e) ? ic : Tc;
          return r(e, t);
        }
        function Wd(e) {
          var t = F(e) ? uc : Oc;
          return t(e);
        }
        function Ud(e) {
          if (e == null)
            return 0;
          if (Me(e))
            return ri(e) ? pn(e) : e.length;
          var t = Se(e);
          return t == rt || t == it ? e.size : Zi(e).length;
        }
        function Nd(e, t, n) {
          var r = F(e) ? Oi : Lc;
          return n && Oe(e, t, n) && (t = i), r(e, T(t, 3));
        }
        var Gd = W(function(e, t) {
          if (e == null)
            return [];
          var n = t.length;
          return n > 1 && Oe(e, t[0], t[1]) ? t = [] : n > 2 && Oe(t[0], t[1], t[2]) && (t = [t[0]]), Js(e, Ie(t, 1), []);
        }), jr = Il || function() {
          return we.Date.now();
        };
        function qd(e, t) {
          if (typeof t != "function")
            throw new Je(b);
          return e = P(e), function() {
            if (--e < 1)
              return t.apply(this, arguments);
          };
        }
        function kf(e, t, n) {
          return t = n ? i : t, t = e && t == null ? e.length : t, Rt(e, nt, i, i, i, i, t);
        }
        function zf(e, t) {
          var n;
          if (typeof t != "function")
            throw new Je(b);
          return e = P(e), function() {
            return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = i), n;
          };
        }
        var mu = W(function(e, t, n) {
          var r = he;
          if (n.length) {
            var u = Mt(n, Rn(mu));
            r |= re;
          }
          return Rt(e, r, t, n, u);
        }), Kf = W(function(e, t, n) {
          var r = he | Te;
          if (n.length) {
            var u = Mt(n, Rn(Kf));
            r |= re;
          }
          return Rt(t, r, e, n, u);
        });
        function Zf(e, t, n) {
          t = n ? i : t;
          var r = Rt(e, pe, i, i, i, i, i, t);
          return r.placeholder = Zf.placeholder, r;
        }
        function Xf(e, t, n) {
          t = n ? i : t;
          var r = Rt(e, fe, i, i, i, i, i, t);
          return r.placeholder = Xf.placeholder, r;
        }
        function Jf(e, t, n) {
          var r, u, o, l, c, d, m = 0, w = !1, I = !1, S = !0;
          if (typeof e != "function")
            throw new Je(b);
          t = tt(t) || 0, ie(n) && (w = !!n.leading, I = "maxWait" in n, o = I ? ge(tt(n.maxWait) || 0, t) : o, S = "trailing" in n ? !!n.trailing : S);
          function x(ae) {
            var ot = r, Tt = u;
            return r = u = i, m = ae, l = e.apply(Tt, ot), l;
          }
          function C(ae) {
            return m = ae, c = jn(N, t), w ? x(ae) : l;
          }
          function B(ae) {
            var ot = ae - d, Tt = ae - m, vo = t - ot;
            return I ? Re(vo, o - Tt) : vo;
          }
          function O(ae) {
            var ot = ae - d, Tt = ae - m;
            return d === i || ot >= t || ot < 0 || I && Tt >= o;
          }
          function N() {
            var ae = jr();
            if (O(ae))
              return q(ae);
            c = jn(N, B(ae));
          }
          function q(ae) {
            return c = i, S && r ? x(ae) : (r = u = i, l);
          }
          function Ye() {
            c !== i && sf(c), m = 0, r = d = u = c = i;
          }
          function Le() {
            return c === i ? l : q(jr());
          }
          function ke() {
            var ae = jr(), ot = O(ae);
            if (r = arguments, u = this, d = ae, ot) {
              if (c === i)
                return C(d);
              if (I)
                return sf(c), c = jn(N, t), x(d);
            }
            return c === i && (c = jn(N, t)), l;
          }
          return ke.cancel = Ye, ke.flush = Le, ke;
        }
        var Hd = W(function(e, t) {
          return Us(e, 1, t);
        }), $d = W(function(e, t, n) {
          return Us(e, tt(t) || 0, n);
        });
        function Yd(e) {
          return Rt(e, Ln);
        }
        function ei(e, t) {
          if (typeof e != "function" || t != null && typeof t != "function")
            throw new Je(b);
          var n = function() {
            var r = arguments, u = t ? t.apply(this, r) : r[0], o = n.cache;
            if (o.has(u))
              return o.get(u);
            var l = e.apply(this, r);
            return n.cache = o.set(u, l) || o, l;
          };
          return n.cache = new (ei.Cache || yt)(), n;
        }
        ei.Cache = yt;
        function ti(e) {
          if (typeof e != "function")
            throw new Je(b);
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
        function kd(e) {
          return zf(2, e);
        }
        var zd = Dc(function(e, t) {
          t = t.length == 1 && F(t[0]) ? Q(t[0], qe(T())) : Q(Ie(t, 1), qe(T()));
          var n = t.length;
          return W(function(r) {
            for (var u = -1, o = Re(r.length, n); ++u < o; )
              r[u] = t[u].call(this, r[u]);
            return Ge(e, this, r);
          });
        }), wu = W(function(e, t) {
          var n = Mt(t, Rn(wu));
          return Rt(e, re, i, t, n);
        }), Vf = W(function(e, t) {
          var n = Mt(t, Rn(Vf));
          return Rt(e, X, i, t, n);
        }), Kd = St(function(e, t) {
          return Rt(e, Lt, i, i, i, t);
        });
        function Zd(e, t) {
          if (typeof e != "function")
            throw new Je(b);
          return t = t === i ? t : P(t), W(e, t);
        }
        function Xd(e, t) {
          if (typeof e != "function")
            throw new Je(b);
          return t = t == null ? 0 : ge(P(t), 0), W(function(n) {
            var r = n[t], u = Gt(n, 0, t);
            return r && Pt(u, r), Ge(e, this, u);
          });
        }
        function Jd(e, t, n) {
          var r = !0, u = !0;
          if (typeof e != "function")
            throw new Je(b);
          return ie(n) && (r = "leading" in n ? !!n.leading : r, u = "trailing" in n ? !!n.trailing : u), Jf(e, t, {
            leading: r,
            maxWait: t,
            trailing: u
          });
        }
        function Vd(e) {
          return kf(e, 1);
        }
        function Qd(e, t) {
          return wu(ru(t), e);
        }
        function jd() {
          if (!arguments.length)
            return [];
          var e = arguments[0];
          return F(e) ? e : [e];
        }
        function eg(e) {
          return Qe(e, ye);
        }
        function tg(e, t) {
          return t = typeof t == "function" ? t : i, Qe(e, ye, t);
        }
        function ng(e) {
          return Qe(e, le | ye);
        }
        function rg(e, t) {
          return t = typeof t == "function" ? t : i, Qe(e, le | ye, t);
        }
        function ig(e, t) {
          return t == null || Ws(e, t, _e(t));
        }
        function ft(e, t) {
          return e === t || e !== e && t !== t;
        }
        var ug = Kr(ki), sg = Kr(function(e, t) {
          return e >= t;
        }), nn = $s(/* @__PURE__ */ function() {
          return arguments;
        }()) ? $s : function(e) {
          return se(e) && Y.call(e, "callee") && !Cs.call(e, "callee");
        }, F = p.isArray, fg = ls ? qe(ls) : pc;
        function Me(e) {
          return e != null && ni(e.length) && !bt(e);
        }
        function oe(e) {
          return se(e) && Me(e);
        }
        function og(e) {
          return e === !0 || e === !1 || se(e) && Ce(e) == ue;
        }
        var qt = Al || Ou, ag = cs ? qe(cs) : vc;
        function lg(e) {
          return se(e) && e.nodeType === 1 && !er(e);
        }
        function cg(e) {
          if (e == null)
            return !0;
          if (Me(e) && (F(e) || typeof e == "string" || typeof e.splice == "function" || qt(e) || Sn(e) || nn(e)))
            return !e.length;
          var t = Se(e);
          if (t == rt || t == it)
            return !e.size;
          if (Qn(e))
            return !Zi(e).length;
          for (var n in e)
            if (Y.call(e, n))
              return !1;
          return !0;
        }
        function hg(e, t) {
          return Xn(e, t);
        }
        function dg(e, t, n) {
          n = typeof n == "function" ? n : i;
          var r = n ? n(e, t) : i;
          return r === i ? Xn(e, t, i, n) : !!r;
        }
        function Iu(e) {
          if (!se(e))
            return !1;
          var t = Ce(e);
          return t == ln || t == Pn || typeof e.message == "string" && typeof e.name == "string" && !er(e);
        }
        function gg(e) {
          return typeof e == "number" && Ls(e);
        }
        function bt(e) {
          if (!ie(e))
            return !1;
          var t = Ce(e);
          return t == pr || t == Uu || t == Fn || t == Uo;
        }
        function Qf(e) {
          return typeof e == "number" && e == P(e);
        }
        function ni(e) {
          return typeof e == "number" && e > -1 && e % 1 == 0 && e <= mt;
        }
        function ie(e) {
          var t = typeof e;
          return e != null && (t == "object" || t == "function");
        }
        function se(e) {
          return e != null && typeof e == "object";
        }
        var jf = hs ? qe(hs) : mc;
        function pg(e, t) {
          return e === t || Ki(e, t, lu(t));
        }
        function vg(e, t, n) {
          return n = typeof n == "function" ? n : i, Ki(e, t, lu(t), n);
        }
        function _g(e) {
          return eo(e) && e != +e;
        }
        function mg(e) {
          if (th(e))
            throw new D(R);
          return Ys(e);
        }
        function wg(e) {
          return e === null;
        }
        function Ig(e) {
          return e == null;
        }
        function eo(e) {
          return typeof e == "number" || se(e) && Ce(e) == Mn;
        }
        function er(e) {
          if (!se(e) || Ce(e) != wt)
            return !1;
          var t = Cr(e);
          if (t === null)
            return !0;
          var n = Y.call(t, "constructor") && t.constructor;
          return typeof n == "function" && n instanceof n && Er.call(n) == vl;
        }
        var yu = ds ? qe(ds) : wc;
        function yg(e) {
          return Qf(e) && e >= -9007199254740991 && e <= mt;
        }
        var to = gs ? qe(gs) : Ic;
        function ri(e) {
          return typeof e == "string" || !F(e) && se(e) && Ce(e) == Wn;
        }
        function $e(e) {
          return typeof e == "symbol" || se(e) && Ce(e) == vr;
        }
        var Sn = ps ? qe(ps) : yc;
        function Ag(e) {
          return e === i;
        }
        function Rg(e) {
          return se(e) && Se(e) == Un;
        }
        function Sg(e) {
          return se(e) && Ce(e) == Go;
        }
        var Eg = Kr(Xi), bg = Kr(function(e, t) {
          return e <= t;
        });
        function no(e) {
          if (!e)
            return [];
          if (Me(e))
            return ri(e) ? ut(e) : Pe(e);
          if (qn && e[qn])
            return il(e[qn]());
          var t = Se(e), n = t == rt ? Bi : t == it ? Ar : En;
          return n(e);
        }
        function xt(e) {
          if (!e)
            return e === 0 ? e : 0;
          if (e = tt(e), e === Kt || e === -1 / 0) {
            var t = e < 0 ? -1 : 1;
            return t * gr;
          }
          return e === e ? e : 0;
        }
        function P(e) {
          var t = xt(e), n = t % 1;
          return t === t ? n ? t - n : t : 0;
        }
        function ro(e) {
          return e ? Qt(P(e), 0, L) : 0;
        }
        function tt(e) {
          if (typeof e == "number")
            return e;
          if ($e(e))
            return A;
          if (ie(e)) {
            var t = typeof e.valueOf == "function" ? e.valueOf() : e;
            e = ie(t) ? t + "" : t;
          }
          if (typeof e != "string")
            return e === 0 ? e : +e;
          e = ys(e);
          var n = fa.test(e);
          return n || aa.test(e) ? qa(e.slice(2), n ? 2 : 8) : sa.test(e) ? A : +e;
        }
        function io(e) {
          return vt(e, Be(e));
        }
        function xg(e) {
          return e ? Qt(P(e), -9007199254740991, mt) : e === 0 ? e : 0;
        }
        function $(e) {
          return e == null ? "" : He(e);
        }
        var Tg = yn(function(e, t) {
          if (Qn(t) || Me(t)) {
            vt(t, _e(t), e);
            return;
          }
          for (var n in t)
            Y.call(t, n) && zn(e, n, t[n]);
        }), uo = yn(function(e, t) {
          vt(t, Be(t), e);
        }), ii = yn(function(e, t, n, r) {
          vt(t, Be(t), e, r);
        }), Cg = yn(function(e, t, n, r) {
          vt(t, _e(t), e, r);
        }), Og = St(Hi);
        function Lg(e, t) {
          var n = In(e);
          return t == null ? n : Bs(n, t);
        }
        var Dg = W(function(e, t) {
          e = k(e);
          var n = -1, r = t.length, u = r > 2 ? t[2] : i;
          for (u && Oe(t[0], t[1], u) && (r = 1); ++n < r; )
            for (var o = t[n], l = Be(o), c = -1, d = l.length; ++c < d; ) {
              var m = l[c], w = e[m];
              (w === i || ft(w, _n[m]) && !Y.call(e, m)) && (e[m] = o[m]);
            }
          return e;
        }), Fg = W(function(e) {
          return e.push(i, Af), Ge(so, i, e);
        });
        function Pg(e, t) {
          return _s(e, T(t, 3), pt);
        }
        function Mg(e, t) {
          return _s(e, T(t, 3), Yi);
        }
        function Bg(e, t) {
          return e == null ? e : $i(e, T(t, 3), Be);
        }
        function Wg(e, t) {
          return e == null ? e : qs(e, T(t, 3), Be);
        }
        function Ug(e, t) {
          return e && pt(e, T(t, 3));
        }
        function Ng(e, t) {
          return e && Yi(e, T(t, 3));
        }
        function Gg(e) {
          return e == null ? [] : Nr(e, _e(e));
        }
        function qg(e) {
          return e == null ? [] : Nr(e, Be(e));
        }
        function Au(e, t, n) {
          var r = e == null ? i : jt(e, t);
          return r === i ? n : r;
        }
        function Hg(e, t) {
          return e != null && Ef(e, t, cc);
        }
        function Ru(e, t) {
          return e != null && Ef(e, t, hc);
        }
        var $g = _f(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = br.call(t)), e[t] = n;
        }, Eu(We)), Yg = _f(function(e, t, n) {
          t != null && typeof t.toString != "function" && (t = br.call(t)), Y.call(e, t) ? e[t].push(n) : e[t] = [n];
        }, T), kg = W(Zn);
        function _e(e) {
          return Me(e) ? Ps(e) : Zi(e);
        }
        function Be(e) {
          return Me(e) ? Ps(e, !0) : Ac(e);
        }
        function zg(e, t) {
          var n = {};
          return t = T(t, 3), pt(e, function(r, u, o) {
            At(n, t(r, u, o), r);
          }), n;
        }
        function Kg(e, t) {
          var n = {};
          return t = T(t, 3), pt(e, function(r, u, o) {
            At(n, u, t(r, u, o));
          }), n;
        }
        var Zg = yn(function(e, t, n) {
          Gr(e, t, n);
        }), so = yn(function(e, t, n, r) {
          Gr(e, t, n, r);
        }), Xg = St(function(e, t) {
          var n = {};
          if (e == null)
            return n;
          var r = !1;
          t = Q(t, function(o) {
            return o = Nt(o, e), r || (r = o.length > 1), o;
          }), vt(e, ou(e), n), r && (n = Qe(n, le | xe | ye, $c));
          for (var u = t.length; u--; )
            eu(n, t[u]);
          return n;
        });
        function Jg(e, t) {
          return fo(e, ti(T(t)));
        }
        var Vg = St(function(e, t) {
          return e == null ? {} : Sc(e, t);
        });
        function fo(e, t) {
          if (e == null)
            return {};
          var n = Q(ou(e), function(r) {
            return [r];
          });
          return t = T(t), Vs(e, n, function(r, u) {
            return t(r, u[0]);
          });
        }
        function Qg(e, t, n) {
          t = Nt(t, e);
          var r = -1, u = t.length;
          for (u || (u = 1, e = i); ++r < u; ) {
            var o = e == null ? i : e[_t(t[r])];
            o === i && (r = u, o = n), e = bt(o) ? o.call(e) : o;
          }
          return e;
        }
        function jg(e, t, n) {
          return e == null ? e : Jn(e, t, n);
        }
        function ep(e, t, n, r) {
          return r = typeof r == "function" ? r : i, e == null ? e : Jn(e, t, n, r);
        }
        var oo = If(_e), ao = If(Be);
        function tp(e, t, n) {
          var r = F(e), u = r || qt(e) || Sn(e);
          if (t = T(t, 4), n == null) {
            var o = e && e.constructor;
            u ? n = r ? new o() : [] : ie(e) ? n = bt(o) ? In(Cr(e)) : {} : n = {};
          }
          return (u ? Xe : pt)(e, function(l, c, d) {
            return t(n, l, c, d);
          }), n;
        }
        function np(e, t) {
          return e == null ? !0 : eu(e, t);
        }
        function rp(e, t, n) {
          return e == null ? e : nf(e, t, ru(n));
        }
        function ip(e, t, n, r) {
          return r = typeof r == "function" ? r : i, e == null ? e : nf(e, t, ru(n), r);
        }
        function En(e) {
          return e == null ? [] : Mi(e, _e(e));
        }
        function up(e) {
          return e == null ? [] : Mi(e, Be(e));
        }
        function sp(e, t, n) {
          return n === i && (n = t, t = i), n !== i && (n = tt(n), n = n === n ? n : 0), t !== i && (t = tt(t), t = t === t ? t : 0), Qt(tt(e), t, n);
        }
        function fp(e, t, n) {
          return t = xt(t), n === i ? (n = t, t = 0) : n = xt(n), e = tt(e), dc(e, t, n);
        }
        function op(e, t, n) {
          if (n && typeof n != "boolean" && Oe(e, t, n) && (t = n = i), n === i && (typeof t == "boolean" ? (n = t, t = i) : typeof e == "boolean" && (n = e, e = i)), e === i && t === i ? (e = 0, t = 1) : (e = xt(e), t === i ? (t = e, e = 0) : t = xt(t)), e > t) {
            var r = e;
            e = t, t = r;
          }
          if (n || e % 1 || t % 1) {
            var u = Ds();
            return Re(e + u * (t - e + Ga("1e-" + ((u + "").length - 1))), t);
          }
          return Vi(e, t);
        }
        var ap = An(function(e, t, n) {
          return t = t.toLowerCase(), e + (n ? lo(t) : t);
        });
        function lo(e) {
          return Su($(e).toLowerCase());
        }
        function co(e) {
          return e = $(e), e && e.replace(ca, ja).replace(Oa, "");
        }
        function lp(e, t, n) {
          e = $(e), t = He(t);
          var r = e.length;
          n = n === i ? r : Qt(P(n), 0, r);
          var u = n;
          return n -= t.length, n >= 0 && e.slice(n, u) == t;
        }
        function cp(e) {
          return e = $(e), e && ko.test(e) ? e.replace(qu, el) : e;
        }
        function hp(e) {
          return e = $(e), e && Vo.test(e) ? e.replace(wi, "\\$&") : e;
        }
        var dp = An(function(e, t, n) {
          return e + (n ? "-" : "") + t.toLowerCase();
        }), gp = An(function(e, t, n) {
          return e + (n ? " " : "") + t.toLowerCase();
        }), pp = gf("toLowerCase");
        function vp(e, t, n) {
          e = $(e), t = P(t);
          var r = t ? pn(e) : 0;
          if (!t || r >= t)
            return e;
          var u = (t - r) / 2;
          return zr(Fr(u), n) + e + zr(Dr(u), n);
        }
        function _p(e, t, n) {
          e = $(e), t = P(t);
          var r = t ? pn(e) : 0;
          return t && r < t ? e + zr(t - r, n) : e;
        }
        function mp(e, t, n) {
          e = $(e), t = P(t);
          var r = t ? pn(e) : 0;
          return t && r < t ? zr(t - r, n) + e : e;
        }
        function wp(e, t, n) {
          return n || t == null ? t = 0 : t && (t = +t), bl($(e).replace(Ii, ""), t || 0);
        }
        function Ip(e, t, n) {
          return (n ? Oe(e, t, n) : t === i) ? t = 1 : t = P(t), Qi($(e), t);
        }
        function yp() {
          var e = arguments, t = $(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }
        var Ap = An(function(e, t, n) {
          return e + (n ? "_" : "") + t.toLowerCase();
        });
        function Rp(e, t, n) {
          return n && typeof n != "number" && Oe(e, t, n) && (t = n = i), n = n === i ? L : n >>> 0, n ? (e = $(e), e && (typeof t == "string" || t != null && !yu(t)) && (t = He(t), !t && gn(e)) ? Gt(ut(e), 0, n) : e.split(t, n)) : [];
        }
        var Sp = An(function(e, t, n) {
          return e + (n ? " " : "") + Su(t);
        });
        function Ep(e, t, n) {
          return e = $(e), n = n == null ? 0 : Qt(P(n), 0, e.length), t = He(t), e.slice(n, n + t.length) == t;
        }
        function bp(e, t, n) {
          var r = f.templateSettings;
          n && Oe(e, t, n) && (t = i), e = $(e), t = ii({}, t, r, yf);
          var u = ii({}, t.imports, r.imports, yf), o = _e(u), l = Mi(u, o), c, d, m = 0, w = t.interpolate || _r, I = "__p += '", S = Wi(
            (t.escape || _r).source + "|" + w.source + "|" + (w === Hu ? ua : _r).source + "|" + (t.evaluate || _r).source + "|$",
            "g"
          ), x = "//# sourceURL=" + (Y.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Ma + "]") + `
`;
          e.replace(S, function(O, N, q, Ye, Le, ke) {
            return q || (q = Ye), I += e.slice(m, ke).replace(ha, tl), N && (c = !0, I += `' +
__e(` + N + `) +
'`), Le && (d = !0, I += `';
` + Le + `;
__p += '`), q && (I += `' +
((__t = (` + q + `)) == null ? '' : __t) +
'`), m = ke + O.length, O;
          }), I += `';
`;
          var C = Y.call(t, "variable") && t.variable;
          if (!C)
            I = `with (obj) {
` + I + `
}
`;
          else if (ra.test(C))
            throw new D(U);
          I = (d ? I.replace(qo, "") : I).replace(Ho, "$1").replace($o, "$1;"), I = "function(" + (C || "obj") + `) {
` + (C ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (d ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + I + `return __p
}`;
          var B = go(function() {
            return H(o, x + "return " + I).apply(i, l);
          });
          if (B.source = I, Iu(B))
            throw B;
          return B;
        }
        function xp(e) {
          return $(e).toLowerCase();
        }
        function Tp(e) {
          return $(e).toUpperCase();
        }
        function Cp(e, t, n) {
          if (e = $(e), e && (n || t === i))
            return ys(e);
          if (!e || !(t = He(t)))
            return e;
          var r = ut(e), u = ut(t), o = As(r, u), l = Rs(r, u) + 1;
          return Gt(r, o, l).join("");
        }
        function Op(e, t, n) {
          if (e = $(e), e && (n || t === i))
            return e.slice(0, Es(e) + 1);
          if (!e || !(t = He(t)))
            return e;
          var r = ut(e), u = Rs(r, ut(t)) + 1;
          return Gt(r, 0, u).join("");
        }
        function Lp(e, t, n) {
          if (e = $(e), e && (n || t === i))
            return e.replace(Ii, "");
          if (!e || !(t = He(t)))
            return e;
          var r = ut(e), u = As(r, ut(t));
          return Gt(r, u).join("");
        }
        function Dp(e, t) {
          var n = oi, r = Dn;
          if (ie(t)) {
            var u = "separator" in t ? t.separator : u;
            n = "length" in t ? P(t.length) : n, r = "omission" in t ? He(t.omission) : r;
          }
          e = $(e);
          var o = e.length;
          if (gn(e)) {
            var l = ut(e);
            o = l.length;
          }
          if (n >= o)
            return e;
          var c = n - pn(r);
          if (c < 1)
            return r;
          var d = l ? Gt(l, 0, c).join("") : e.slice(0, c);
          if (u === i)
            return d + r;
          if (l && (c += d.length - c), yu(u)) {
            if (e.slice(c).search(u)) {
              var m, w = d;
              for (u.global || (u = Wi(u.source, $($u.exec(u)) + "g")), u.lastIndex = 0; m = u.exec(w); )
                var I = m.index;
              d = d.slice(0, I === i ? c : I);
            }
          } else if (e.indexOf(He(u), c) != c) {
            var S = d.lastIndexOf(u);
            S > -1 && (d = d.slice(0, S));
          }
          return d + r;
        }
        function Fp(e) {
          return e = $(e), e && Yo.test(e) ? e.replace(Gu, ol) : e;
        }
        var Pp = An(function(e, t, n) {
          return e + (n ? " " : "") + t.toUpperCase();
        }), Su = gf("toUpperCase");
        function ho(e, t, n) {
          return e = $(e), t = n ? i : t, t === i ? rl(e) ? cl(e) : Za(e) : e.match(t) || [];
        }
        var go = W(function(e, t) {
          try {
            return Ge(e, i, t);
          } catch (n) {
            return Iu(n) ? n : new D(n);
          }
        }), Mp = St(function(e, t) {
          return Xe(t, function(n) {
            n = _t(n), At(e, n, mu(e[n], e));
          }), e;
        });
        function Bp(e) {
          var t = e == null ? 0 : e.length, n = T();
          return e = t ? Q(e, function(r) {
            if (typeof r[1] != "function")
              throw new Je(b);
            return [n(r[0]), r[1]];
          }) : [], W(function(r) {
            for (var u = -1; ++u < t; ) {
              var o = e[u];
              if (Ge(o[0], this, r))
                return Ge(o[1], this, r);
            }
          });
        }
        function Wp(e) {
          return oc(Qe(e, le));
        }
        function Eu(e) {
          return function() {
            return e;
          };
        }
        function Up(e, t) {
          return e == null || e !== e ? t : e;
        }
        var Np = vf(), Gp = vf(!0);
        function We(e) {
          return e;
        }
        function bu(e) {
          return ks(typeof e == "function" ? e : Qe(e, le));
        }
        function qp(e) {
          return Ks(Qe(e, le));
        }
        function Hp(e, t) {
          return Zs(e, Qe(t, le));
        }
        var $p = W(function(e, t) {
          return function(n) {
            return Zn(n, e, t);
          };
        }), Yp = W(function(e, t) {
          return function(n) {
            return Zn(e, n, t);
          };
        });
        function xu(e, t, n) {
          var r = _e(t), u = Nr(t, r);
          n == null && !(ie(t) && (u.length || !r.length)) && (n = t, t = e, e = this, u = Nr(t, _e(t)));
          var o = !(ie(n) && "chain" in n) || !!n.chain, l = bt(e);
          return Xe(u, function(c) {
            var d = t[c];
            e[c] = d, l && (e.prototype[c] = function() {
              var m = this.__chain__;
              if (o || m) {
                var w = e(this.__wrapped__), I = w.__actions__ = Pe(this.__actions__);
                return I.push({ func: d, args: arguments, thisArg: e }), w.__chain__ = m, w;
              }
              return d.apply(e, Pt([this.value()], arguments));
            });
          }), e;
        }
        function kp() {
          return we._ === this && (we._ = _l), this;
        }
        function Tu() {
        }
        function zp(e) {
          return e = P(e), W(function(t) {
            return Xs(t, e);
          });
        }
        var Kp = uu(Q), Zp = uu(vs), Xp = uu(Oi);
        function po(e) {
          return hu(e) ? Li(_t(e)) : Ec(e);
        }
        function Jp(e) {
          return function(t) {
            return e == null ? i : jt(e, t);
          };
        }
        var Vp = mf(), Qp = mf(!0);
        function Cu() {
          return [];
        }
        function Ou() {
          return !1;
        }
        function jp() {
          return {};
        }
        function ev() {
          return "";
        }
        function tv() {
          return !0;
        }
        function nv(e, t) {
          if (e = P(e), e < 1 || e > mt)
            return [];
          var n = L, r = Re(e, L);
          t = T(t), e -= L;
          for (var u = Pi(r, t); ++n < e; )
            t(n);
          return u;
        }
        function rv(e) {
          return F(e) ? Q(e, _t) : $e(e) ? [e] : Pe(Pf($(e)));
        }
        function iv(e) {
          var t = ++pl;
          return $(e) + t;
        }
        var uv = kr(function(e, t) {
          return e + t;
        }, 0), sv = su("ceil"), fv = kr(function(e, t) {
          return e / t;
        }, 1), ov = su("floor");
        function av(e) {
          return e && e.length ? Ur(e, We, ki) : i;
        }
        function lv(e, t) {
          return e && e.length ? Ur(e, T(t, 2), ki) : i;
        }
        function cv(e) {
          return ws(e, We);
        }
        function hv(e, t) {
          return ws(e, T(t, 2));
        }
        function dv(e) {
          return e && e.length ? Ur(e, We, Xi) : i;
        }
        function gv(e, t) {
          return e && e.length ? Ur(e, T(t, 2), Xi) : i;
        }
        var pv = kr(function(e, t) {
          return e * t;
        }, 1), vv = su("round"), _v = kr(function(e, t) {
          return e - t;
        }, 0);
        function mv(e) {
          return e && e.length ? Fi(e, We) : 0;
        }
        function wv(e, t) {
          return e && e.length ? Fi(e, T(t, 2)) : 0;
        }
        return f.after = qd, f.ary = kf, f.assign = Tg, f.assignIn = uo, f.assignInWith = ii, f.assignWith = Cg, f.at = Og, f.before = zf, f.bind = mu, f.bindAll = Mp, f.bindKey = Kf, f.castArray = jd, f.chain = Hf, f.chunk = oh, f.compact = ah, f.concat = lh, f.cond = Bp, f.conforms = Wp, f.constant = Eu, f.countBy = md, f.create = Lg, f.curry = Zf, f.curryRight = Xf, f.debounce = Jf, f.defaults = Dg, f.defaultsDeep = Fg, f.defer = Hd, f.delay = $d, f.difference = ch, f.differenceBy = hh, f.differenceWith = dh, f.drop = gh, f.dropRight = ph, f.dropRightWhile = vh, f.dropWhile = _h, f.fill = mh, f.filter = Id, f.flatMap = Rd, f.flatMapDeep = Sd, f.flatMapDepth = Ed, f.flatten = Uf, f.flattenDeep = wh, f.flattenDepth = Ih, f.flip = Yd, f.flow = Np, f.flowRight = Gp, f.fromPairs = yh, f.functions = Gg, f.functionsIn = qg, f.groupBy = bd, f.initial = Rh, f.intersection = Sh, f.intersectionBy = Eh, f.intersectionWith = bh, f.invert = $g, f.invertBy = Yg, f.invokeMap = Td, f.iteratee = bu, f.keyBy = Cd, f.keys = _e, f.keysIn = Be, f.map = Qr, f.mapKeys = zg, f.mapValues = Kg, f.matches = qp, f.matchesProperty = Hp, f.memoize = ei, f.merge = Zg, f.mergeWith = so, f.method = $p, f.methodOf = Yp, f.mixin = xu, f.negate = ti, f.nthArg = zp, f.omit = Xg, f.omitBy = Jg, f.once = kd, f.orderBy = Od, f.over = Kp, f.overArgs = zd, f.overEvery = Zp, f.overSome = Xp, f.partial = wu, f.partialRight = Vf, f.partition = Ld, f.pick = Vg, f.pickBy = fo, f.property = po, f.propertyOf = Jp, f.pull = Oh, f.pullAll = Gf, f.pullAllBy = Lh, f.pullAllWith = Dh, f.pullAt = Fh, f.range = Vp, f.rangeRight = Qp, f.rearg = Kd, f.reject = Pd, f.remove = Ph, f.rest = Zd, f.reverse = vu, f.sampleSize = Bd, f.set = jg, f.setWith = ep, f.shuffle = Wd, f.slice = Mh, f.sortBy = Gd, f.sortedUniq = Hh, f.sortedUniqBy = $h, f.split = Rp, f.spread = Xd, f.tail = Yh, f.take = kh, f.takeRight = zh, f.takeRightWhile = Kh, f.takeWhile = Zh, f.tap = ad, f.throttle = Jd, f.thru = Vr, f.toArray = no, f.toPairs = oo, f.toPairsIn = ao, f.toPath = rv, f.toPlainObject = io, f.transform = tp, f.unary = Vd, f.union = Xh, f.unionBy = Jh, f.unionWith = Vh, f.uniq = Qh, f.uniqBy = jh, f.uniqWith = ed, f.unset = np, f.unzip = _u, f.unzipWith = qf, f.update = rp, f.updateWith = ip, f.values = En, f.valuesIn = up, f.without = td, f.words = ho, f.wrap = Qd, f.xor = nd, f.xorBy = rd, f.xorWith = id, f.zip = ud, f.zipObject = sd, f.zipObjectDeep = fd, f.zipWith = od, f.entries = oo, f.entriesIn = ao, f.extend = uo, f.extendWith = ii, xu(f, f), f.add = uv, f.attempt = go, f.camelCase = ap, f.capitalize = lo, f.ceil = sv, f.clamp = sp, f.clone = eg, f.cloneDeep = ng, f.cloneDeepWith = rg, f.cloneWith = tg, f.conformsTo = ig, f.deburr = co, f.defaultTo = Up, f.divide = fv, f.endsWith = lp, f.eq = ft, f.escape = cp, f.escapeRegExp = hp, f.every = wd, f.find = yd, f.findIndex = Bf, f.findKey = Pg, f.findLast = Ad, f.findLastIndex = Wf, f.findLastKey = Mg, f.floor = ov, f.forEach = $f, f.forEachRight = Yf, f.forIn = Bg, f.forInRight = Wg, f.forOwn = Ug, f.forOwnRight = Ng, f.get = Au, f.gt = ug, f.gte = sg, f.has = Hg, f.hasIn = Ru, f.head = Nf, f.identity = We, f.includes = xd, f.indexOf = Ah, f.inRange = fp, f.invoke = kg, f.isArguments = nn, f.isArray = F, f.isArrayBuffer = fg, f.isArrayLike = Me, f.isArrayLikeObject = oe, f.isBoolean = og, f.isBuffer = qt, f.isDate = ag, f.isElement = lg, f.isEmpty = cg, f.isEqual = hg, f.isEqualWith = dg, f.isError = Iu, f.isFinite = gg, f.isFunction = bt, f.isInteger = Qf, f.isLength = ni, f.isMap = jf, f.isMatch = pg, f.isMatchWith = vg, f.isNaN = _g, f.isNative = mg, f.isNil = Ig, f.isNull = wg, f.isNumber = eo, f.isObject = ie, f.isObjectLike = se, f.isPlainObject = er, f.isRegExp = yu, f.isSafeInteger = yg, f.isSet = to, f.isString = ri, f.isSymbol = $e, f.isTypedArray = Sn, f.isUndefined = Ag, f.isWeakMap = Rg, f.isWeakSet = Sg, f.join = xh, f.kebabCase = dp, f.last = et, f.lastIndexOf = Th, f.lowerCase = gp, f.lowerFirst = pp, f.lt = Eg, f.lte = bg, f.max = av, f.maxBy = lv, f.mean = cv, f.meanBy = hv, f.min = dv, f.minBy = gv, f.stubArray = Cu, f.stubFalse = Ou, f.stubObject = jp, f.stubString = ev, f.stubTrue = tv, f.multiply = pv, f.nth = Ch, f.noConflict = kp, f.noop = Tu, f.now = jr, f.pad = vp, f.padEnd = _p, f.padStart = mp, f.parseInt = wp, f.random = op, f.reduce = Dd, f.reduceRight = Fd, f.repeat = Ip, f.replace = yp, f.result = Qg, f.round = vv, f.runInContext = h, f.sample = Md, f.size = Ud, f.snakeCase = Ap, f.some = Nd, f.sortedIndex = Bh, f.sortedIndexBy = Wh, f.sortedIndexOf = Uh, f.sortedLastIndex = Nh, f.sortedLastIndexBy = Gh, f.sortedLastIndexOf = qh, f.startCase = Sp, f.startsWith = Ep, f.subtract = _v, f.sum = mv, f.sumBy = wv, f.template = bp, f.times = nv, f.toFinite = xt, f.toInteger = P, f.toLength = ro, f.toLower = xp, f.toNumber = tt, f.toSafeInteger = xg, f.toString = $, f.toUpper = Tp, f.trim = Cp, f.trimEnd = Op, f.trimStart = Lp, f.truncate = Dp, f.unescape = Fp, f.uniqueId = iv, f.upperCase = Pp, f.upperFirst = Su, f.each = $f, f.eachRight = Yf, f.first = Nf, xu(f, function() {
          var e = {};
          return pt(f, function(t, n) {
            Y.call(f.prototype, n) || (e[n] = t);
          }), e;
        }(), { chain: !1 }), f.VERSION = g, Xe(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
          f[e].placeholder = f;
        }), Xe(["drop", "take"], function(e, t) {
          G.prototype[e] = function(n) {
            n = n === i ? 1 : ge(P(n), 0);
            var r = this.__filtered__ && !t ? new G(this) : this.clone();
            return r.__filtered__ ? r.__takeCount__ = Re(n, r.__takeCount__) : r.__views__.push({
              size: Re(n, L),
              type: e + (r.__dir__ < 0 ? "Right" : "")
            }), r;
          }, G.prototype[e + "Right"] = function(n) {
            return this.reverse()[e](n).reverse();
          };
        }), Xe(["filter", "map", "takeWhile"], function(e, t) {
          var n = t + 1, r = n == an || n == dr;
          G.prototype[e] = function(u) {
            var o = this.clone();
            return o.__iteratees__.push({
              iteratee: T(u, 3),
              type: n
            }), o.__filtered__ = o.__filtered__ || r, o;
          };
        }), Xe(["head", "last"], function(e, t) {
          var n = "take" + (t ? "Right" : "");
          G.prototype[e] = function() {
            return this[n](1).value()[0];
          };
        }), Xe(["initial", "tail"], function(e, t) {
          var n = "drop" + (t ? "" : "Right");
          G.prototype[e] = function() {
            return this.__filtered__ ? new G(this) : this[n](1);
          };
        }), G.prototype.compact = function() {
          return this.filter(We);
        }, G.prototype.find = function(e) {
          return this.filter(e).head();
        }, G.prototype.findLast = function(e) {
          return this.reverse().find(e);
        }, G.prototype.invokeMap = W(function(e, t) {
          return typeof e == "function" ? new G(this) : this.map(function(n) {
            return Zn(n, e, t);
          });
        }), G.prototype.reject = function(e) {
          return this.filter(ti(T(e)));
        }, G.prototype.slice = function(e, t) {
          e = P(e);
          var n = this;
          return n.__filtered__ && (e > 0 || t < 0) ? new G(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== i && (t = P(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
        }, G.prototype.takeRightWhile = function(e) {
          return this.reverse().takeWhile(e).reverse();
        }, G.prototype.toArray = function() {
          return this.take(L);
        }, pt(G.prototype, function(e, t) {
          var n = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), u = f[r ? "take" + (t == "last" ? "Right" : "") : t], o = r || /^find/.test(t);
          u && (f.prototype[t] = function() {
            var l = this.__wrapped__, c = r ? [1] : arguments, d = l instanceof G, m = c[0], w = d || F(l), I = function(N) {
              var q = u.apply(f, Pt([N], c));
              return r && S ? q[0] : q;
            };
            w && n && typeof m == "function" && m.length != 1 && (d = w = !1);
            var S = this.__chain__, x = !!this.__actions__.length, C = o && !S, B = d && !x;
            if (!o && w) {
              l = B ? l : new G(this);
              var O = e.apply(l, c);
              return O.__actions__.push({ func: Vr, args: [I], thisArg: i }), new Ve(O, S);
            }
            return C && B ? e.apply(this, c) : (O = this.thru(I), C ? r ? O.value()[0] : O.value() : O);
          });
        }), Xe(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
          var t = Rr[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(e);
          f.prototype[e] = function() {
            var u = arguments;
            if (r && !this.__chain__) {
              var o = this.value();
              return t.apply(F(o) ? o : [], u);
            }
            return this[n](function(l) {
              return t.apply(F(l) ? l : [], u);
            });
          };
        }), pt(G.prototype, function(e, t) {
          var n = f[t];
          if (n) {
            var r = n.name + "";
            Y.call(wn, r) || (wn[r] = []), wn[r].push({ name: t, func: n });
          }
        }), wn[Yr(i, Te).name] = [{
          name: "wrapper",
          func: i
        }], G.prototype.clone = Fl, G.prototype.reverse = Pl, G.prototype.value = Ml, f.prototype.at = ld, f.prototype.chain = cd, f.prototype.commit = hd, f.prototype.next = dd, f.prototype.plant = pd, f.prototype.reverse = vd, f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = _d, f.prototype.first = f.prototype.head, qn && (f.prototype[qn] = gd), f;
      }, vn = hl();
      Zt ? ((Zt.exports = vn)._ = vn, bi._ = vn) : we._ = vn;
    }).call(Lv);
  }(rr, rr.exports)), rr.exports;
}
var ur = Dv(), Ht, $t;
class Fv {
  constructor({ initialGroupBy: s, requireGroup: i }, g) {
    z(this, Ht);
    z(this, $t);
    M(this, $t, g), M(this, Ht, De(s, this.rules)), this.requireGroup = i;
  }
  get rules() {
    return v(this, $t).getRules().filter(xo);
  }
  get activeRule() {
    const s = this.requireGroup ? this.rules.at(0) : void 0;
    return v(this, Ht) ?? s;
  }
  set(s) {
    if (v(this, $t).isDisabled())
      return;
    const i = v(this, Ht);
    let g;
    const y = typeof s == "string" && s.trim() === "";
    y && (g = void 0), y === !1 && s !== void 0 && (g = De(s, this.rules)), v(this, Ht) !== g && (M(this, Ht, g), this.groupIdSortDirection = void 0, v(this, $t).touch({
      source: "groupBy",
      event: "change.groupBy.set",
      current: { rule: g },
      initial: { rule: i }
    }));
  }
  setGroupIdSortDirection(s) {
    const i = this.groupIdSortDirection;
    this.groupIdSortDirection = s, v(this, $t).touch({
      source: "groupBy",
      event: "change.groupBy.setGroupIdSortDirection",
      current: { groupIdSortDirection: s },
      initial: { groupIdSortDirection: i }
    });
  }
  process(s, i) {
    var ee;
    if (this.activeRule === void 0)
      return [];
    const g = ur.groupBy(s, (te) => {
      var le;
      const ne = (le = this.activeRule) == null ? void 0 : le.groupFn(te, i);
      if (ne === void 0)
        throw new Error("groupFn did not return a value.");
      return ne;
    }), y = Object.keys(g).map((te) => ({
      id: String(te),
      items: g[te] ?? []
    })), R = this.activeRule.sticky !== void 0, b = [], U = [];
    if (R && (b.push(Pv(this.activeRule)), U.push("asc")), (ee = this.activeRule) != null && ee.sortGroupIdFn && (b.push(this.activeRule.sortGroupIdFn), U.push(this.groupIdSortDirection ?? "asc")), b.length > 0) {
      const te = U ?? "desc";
      return ur.orderBy(y, b, te);
    }
    return y;
  }
}
Ht = new WeakMap(), $t = new WeakMap();
function Pv(a) {
  var g, y, R, b;
  let s = [];
  ((g = a == null ? void 0 : a.sticky) == null ? void 0 : g.header) !== void 0 && (Array.isArray(a.sticky.header) && (s = a.sticky.header), typeof a.sticky.header == "string" && (s = [(y = a == null ? void 0 : a.sticky) == null ? void 0 : y.header]));
  let i = [];
  return ((R = a == null ? void 0 : a.sticky) == null ? void 0 : R.footer) !== void 0 && (Array.isArray(a.sticky.footer) && (i = a.sticky.footer), typeof a.sticky.footer == "string" && (i = [(b = a == null ? void 0 : a.sticky) == null ? void 0 : b.footer])), (U) => {
    if (s.includes(U.id)) {
      const ee = s.findIndex((ne) => U.id === ne);
      return (s.length - ee) * -1;
    }
    return i.includes(U.id) ? 1 + i.findIndex((te) => U.id === te) : 0;
  };
}
function Co(a) {
  return {
    activeRule: a.activeRule,
    requireGroup: a.requireGroup,
    rules: a.rules,
    groupIdSortDirection: a.groupIdSortDirection
  };
}
function Mv(a) {
  return {
    ...Co(a),
    set: a.set.bind(a),
    toggle: (s) => {
      const i = De(s, a.rules);
      if (a.activeRule === i) {
        a.set(void 0);
        return;
      }
      a.set(i);
    },
    setGroupIdSortDirection: a.setGroupIdSortDirection.bind(a),
    reset: () => {
      a.setGroupIdSortDirection(void 0), a.set(void 0);
    }
  };
}
var fn;
class Bv {
  constructor({ initialMeta: s }, i) {
    z(this, fn);
    this.meta = s || {}, M(this, fn, i);
  }
  set(s, i) {
    const g = this.get(s);
    this.meta = { ...this.meta, [s]: i }, v(this, fn).touch({
      source: "meta",
      event: "change.meta.set",
      current: { key: s, value: i },
      initial: { key: s, value: g }
    });
  }
  get(s) {
    var i;
    return (i = this.meta) == null ? void 0 : i[s];
  }
  has(s) {
    var i;
    return ((i = this.meta) == null ? void 0 : i[s]) !== void 0;
  }
  delete(s) {
    const i = this.get(s), g = { ...this.meta };
    delete g[s], this.meta = g, v(this, fn).touch({
      source: "meta",
      event: "change.meta.delete",
      current: { key: s, value: void 0 },
      initial: { key: s, value: i }
    });
  }
  reset() {
    const s = this.meta;
    this.meta = {}, v(this, fn).touch({
      source: "meta",
      event: "change.meta.reset",
      current: { meta: this.meta },
      initial: { meta: s }
    });
  }
  get value() {
    return this.meta;
  }
}
fn = new WeakMap();
function Oo(a) {
  return { value: a.value, get: a.get.bind(a), has: a.has.bind(a) };
}
function Fu(a) {
  return {
    ...Oo(a),
    set: a.set.bind(a),
    delete: a.delete.bind(a),
    reset: a.reset.bind(a)
  };
}
var ze, xn, on;
class Wv {
  constructor({ page: s, numItemsPerPage: i }, g) {
    z(this, ze);
    z(this, xn);
    z(this, on);
    M(this, ze, s ?? 1), this.numItemsPerPage = i, M(this, on, g), M(this, xn, g.getItems().length);
  }
  setPage(s) {
    if (s !== v(this, ze)) {
      const i = v(this, ze);
      M(this, ze, s), v(this, on).touch({
        source: "pagination",
        event: "change.pagination.setPage",
        current: { page: v(this, ze) },
        initial: { page: i }
      });
    }
  }
  setNumItemsPerPage(s) {
    if (s !== this.numItemsPerPage) {
      const i = this.numItemsPerPage;
      this.numItemsPerPage = s, v(this, on).touch({
        source: "pagination",
        event: "change.pagination.setNumItemsPerPage",
        current: { numItemsPerPage: this.numItemsPerPage },
        initial: { numItemsPerPage: i }
      });
    }
  }
  get lastPage() {
    if (!(v(this, ze) === void 0 || this.numItemsPerPage === void 0))
      return Math.ceil(v(this, xn) / this.numItemsPerPage);
  }
  get numTotalItems() {
    return v(this, on).getItems().length;
  }
  get page() {
    return this.numItemsPerPage && this.lastPage ? Du(v(this, ze), 1, this.lastPage) : v(this, ze);
  }
  get offset() {
    return this.numItemsPerPage && this.lastPage ? (Du(v(this, ze), 1, this.lastPage) - 1) * this.numItemsPerPage : 0;
  }
  process(s) {
    if (this.numItemsPerPage === void 0)
      return s;
    let i = v(this, ze) ?? 1;
    M(this, xn, s.length);
    const g = Math.ceil(s.length / this.numItemsPerPage), R = (Du(i, 1, g) - 1) * this.numItemsPerPage;
    return s.slice(R, R + this.numItemsPerPage);
  }
}
ze = new WeakMap(), xn = new WeakMap(), on = new WeakMap();
function Uv(a) {
  return {
    page: a.page,
    offset: a.offset,
    numItemsPerPage: a.numItemsPerPage,
    numTotalItems: a.numTotalItems,
    lastPage: a.lastPage,
    isPaginated: a.numItemsPerPage !== void 0
  };
}
function Nv(a) {
  return {
    ...Uv(a),
    setPage: a.setPage.bind(a),
    setNumItemsPerPage: a.setNumItemsPerPage.bind(a)
  };
}
var Yt;
class Gv {
  constructor(s, i, g) {
    z(this, Yt, []);
    const y = i();
    M(this, Yt, s.map((R) => {
      let b;
      if (typeof R == "object" ? b = R : typeof R == "function" && (qv(R) ? b = Reflect.construct(R, []) : b = R()), b === void 0)
        throw new Error("Unrecognized plugin format received.");
      return b.register(y, g), b;
    }));
  }
  get(s) {
    let i;
    if (typeof s == "string" && (i = v(this, Yt).find((g) => g.id === s)), typeof s == "object" && (i = v(this, Yt).find((g) => g.id === s.id)), !i)
      throw new Error("Finder was unable to locate requested plugin.");
    return i;
  }
  has(s) {
    try {
      return this.get(s), !0;
    } catch {
      return !1;
    }
  }
  /**
   * Notify all plugins that Finder is alive
   */
  onInit(s) {
    v(this, Yt).forEach((i) => {
      i.onInit && i.onInit(s);
    });
  }
  onFirstUserInteraction(s) {
    v(this, Yt).forEach((i) => {
      i.onFirstUserInteraction && i.onFirstUserInteraction(s);
    });
  }
}
Yt = new WeakMap();
function qv(a) {
  if (typeof a != "function")
    return !1;
  try {
    Reflect.construct(a, []);
  } catch {
    return !1;
  }
  return !0;
}
var at, Ue;
class Hv {
  constructor({ initialSearchTerm: s }, i) {
    z(this, at);
    z(this, Ue);
    M(this, at, s || ""), M(this, Ue, i);
  }
  get searchTerm() {
    return v(this, at);
  }
  get rule() {
    return v(this, Ue).getRules().find(ir);
  }
  get hasSearchRule() {
    return v(this, Ue).getRules().some(ir);
  }
  setSearchTerm(s) {
    const i = v(this, Ue).getRules().find(ir);
    if (!i)
      throw new Error("Finder could not locate a searchRule.");
    v(this, Ue).debouncer.has("_search") === !1 && v(this, Ue).debouncer.register("_search", i == null ? void 0 : i.debounceDelay), v(this, Ue).debouncer.call("_search", () => {
      if (v(this, Ue).isDisabled())
        return;
      const g = v(this, at);
      M(this, at, s), v(this, Ue).touch({
        source: "search",
        event: "change.search.setSearchTerm",
        current: { searchTerm: s },
        initial: { searchTerm: g }
      });
    });
  }
  reset() {
    if (v(this, Ue).isDisabled())
      return;
    const s = v(this, at);
    M(this, at, ""), v(this, Ue).touch({
      source: "search",
      event: "change.search.reset",
      current: { searchTerm: "" },
      initial: { searchTerm: s }
    });
  }
  process(s, i) {
    return v(this, at) === "" || this.rule === void 0 ? s : s.filter((g) => {
      var y;
      return (y = this.rule) == null ? void 0 : y.searchFn(g, v(this, at), i);
    });
  }
}
at = new WeakMap(), Ue = new WeakMap();
function Lo(a) {
  return {
    searchTerm: a.searchTerm,
    activeRule: a.rule,
    hasSearchTerm: a.searchTerm !== ""
  };
}
function $v(a) {
  return {
    ...Lo(a),
    setSearchTerm: a.setSearchTerm.bind(a),
    reset: a.reset.bind(a)
  };
}
class Yv {
  constructor({ initialSelectedItems: s, maxSelectedItems: i }, g) {
    this.selectedItems = s || [], this.maxSelectedItems = i, this.deps = g;
  }
  setMaxSelectedItems(s) {
    if (s !== this.maxSelectedItems) {
      const i = this.maxSelectedItems;
      this.maxSelectedItems = s, this.deps.touch({
        source: "selectedItems",
        event: "change.selectedItems.setMaxSelectedItems",
        current: { maxSelectedItems: this.maxSelectedItems },
        initial: { maxSelectedItems: i }
      });
    }
  }
  set(s) {
    const i = this.selectedItems;
    this.selectedItems = s, this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.set",
      current: { selectedItems: this.selectedItems },
      initial: { selectedItems: i }
    });
  }
  select(s) {
    if (this.deps.isDisabled())
      return;
    const i = this.maxSelectedItems !== void 0 && this.selectedItems.length >= this.maxSelectedItems, g = this.selectedItems.includes(s);
    i || g || (this.selectedItems = [...this.selectedItems.filter((y) => s !== y), s], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.select",
      current: { item: s },
      initial: { item: s }
    }));
  }
  /**
   * Select a single item and clear any other selected items.
   */
  selectOnly(s) {
    this.deps.isDisabled() || this.selectedItems.includes(s) || (this.selectedItems = [], this.select(s));
  }
  toggle(s) {
    var g;
    if (this.deps.isDisabled())
      return;
    const i = this.selectedItems.includes(s);
    i ? this.selectedItems = (g = this.selectedItems) == null ? void 0 : g.filter((y) => y !== s) : this.selectedItems = [...this.selectedItems, s], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.toggle",
      current: { item: s, is_selected: !i },
      initial: { item: s, is_selected: i }
    });
  }
  toggleOnly(s) {
    if (this.deps.isDisabled())
      return;
    const i = this.selectedItems.includes(s);
    i ? this.selectedItems = [] : this.selectedItems = [s], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.toggle",
      current: { item: s, is_selected: !i },
      initial: { item: s, is_selected: i }
    });
  }
  delete(s) {
    var i;
    this.deps.isDisabled() || (this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.delete",
      current: { item: s, is_selected: !1 },
      initial: { item: s, is_selected: !0 }
    }), this.set((i = this.selectedItems) == null ? void 0 : i.filter((g) => g !== s)));
  }
  reset() {
    if (this.deps.isDisabled())
      return;
    const s = this.selectedItems;
    this.selectedItems = [], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.reset",
      current: { selectedItems: [] },
      initial: { selectedItems: s }
    });
  }
}
function Do(a) {
  return { items: a.selectedItems, maxSelectedItems: a.maxSelectedItems, isSelected: (s) => a.selectedItems.includes(s) };
}
function kv(a) {
  return {
    ...Do(a),
    setMaxSelectedItems: a.setMaxSelectedItems.bind(a),
    select: a.select.bind(a),
    selectOnly: a.selectOnly.bind(a),
    delete: a.delete.bind(a),
    toggle: a.toggle.bind(a),
    toggleOnly: a.toggleOnly.bind(a),
    reset: a.reset.bind(a)
  };
}
var kt, lt, Ct;
class zv {
  constructor({ initialSortBy: s, initialSortDirection: i }, g) {
    z(this, kt);
    z(this, lt);
    z(this, Ct);
    M(this, Ct, g), M(this, kt, De(s, this.rules)), M(this, lt, i);
  }
  get rules() {
    return v(this, Ct).getRules().filter(Eo);
  }
  get activeRule() {
    const s = this.rules.at(0);
    return v(this, kt) ?? s;
  }
  get sortDirection() {
    var s;
    return v(this, lt) ?? ((s = this.activeRule) == null ? void 0 : s.defaultSortDirection) ?? "asc";
  }
  get userHasSetSortDirection() {
    return v(this, lt) !== null;
  }
  setSortDirection(s) {
    if (v(this, Ct).isDisabled() || !this.activeRule)
      return;
    const i = v(this, lt);
    M(this, lt, s), v(this, Ct).touch({
      source: "sortBy",
      event: "change.sortBy.setSortDirection",
      current: { sortDirection: s },
      initial: { sortDirection: i }
    });
  }
  set(s, i) {
    if (v(this, Ct).isDisabled() || !this.activeRule)
      return;
    const g = v(this, lt), y = v(this, kt), R = De(s, this.rules);
    M(this, kt, R), M(this, lt, i), v(this, Ct).touch({
      source: "sortBy",
      event: "change.sortBy.set",
      current: { rule: R, sortDirection: i },
      initial: { rule: y, sortDirection: g }
    });
  }
  process(s) {
    const i = this.rules.at(0), g = v(this, kt) ?? i;
    if (g === void 0)
      return s;
    const y = v(this, lt) ?? g.defaultSortDirection;
    return ur.orderBy(s, g.sortFn, y);
  }
}
kt = new WeakMap(), lt = new WeakMap(), Ct = new WeakMap();
function Fo(a) {
  return {
    activeRule: a.activeRule,
    sortDirection: a.sortDirection,
    userHasSetSortDirection: a.userHasSetSortDirection,
    rules: a.rules
  };
}
function Kv(a) {
  return {
    ...Fo(a),
    set: a.set.bind(a),
    setSortDirection: a.setSortDirection.bind(a),
    // rotate between the rule default, desc, and asc.
    cycleSortDirection: () => {
      var i;
      const s = a.sortDirection ?? ((i = a.activeRule) == null ? void 0 : i.defaultSortDirection);
      if (s === void 0) {
        a.setSortDirection("desc");
        return;
      }
      if (s === "desc") {
        a.setSortDirection("asc");
        return;
      }
      a.setSortDirection(void 0);
    },
    // flip between desc and asc.
    toggleSortDirection: () => {
      var i;
      if ((a.sortDirection ?? ((i = a.activeRule) == null ? void 0 : i.defaultSortDirection)) === "desc") {
        a.setSortDirection("asc");
        return;
      }
      a.setSortDirection("desc");
    },
    reset() {
      a.set(void 0, void 0);
    }
  };
}
var ct, Tn;
class Zv {
  constructor() {
    z(this, ct, {});
    z(this, Tn, !1);
  }
  on(s, i) {
    v(this, ct)[s] === void 0 && (v(this, ct)[s] = []), v(this, ct)[s].push(i);
  }
  off(s, i) {
    if (v(this, ct)[s] !== void 0) {
      if (i === void 0) {
        delete v(this, ct)[s];
        return;
      }
      v(this, ct)[s] = v(this, ct)[s].filter((g) => g !== i);
    }
  }
  emit(s, i) {
    var g;
    v(this, Tn) || (g = v(this, ct)[s]) == null || g.forEach((y) => y(i));
  }
  silently(s) {
    M(this, Tn, !0), s(), M(this, Tn, !1);
  }
}
ct = new WeakMap(), Tn = new WeakMap();
var Cn;
class Xv {
  constructor() {
    z(this, Cn, {});
  }
  register(s, i) {
    v(this, Cn)[s] = {
      debounceFn: i ? ur.debounce((g) => g(), i) : (g) => g(),
      delay: i
    };
  }
  has(s) {
    return v(this, Cn)[s] !== void 0;
  }
  call(s, i) {
    var g;
    (g = v(this, Cn)[s]) == null || g.debounceFn(i);
  }
}
Cn = new WeakMap();
var ht, fr, Ot, On, zt, be, K, ce, Bu, fi, Po, Mo, rn, So;
let Jv = (So = class {
  constructor(s, {
    rules: i,
    initialSearchTerm: g,
    initialSortBy: y,
    initialSortDirection: R,
    initialGroupBy: b,
    initialFilters: U,
    initialSelectedItems: ee,
    initialMeta: te,
    page: ne,
    numItemsPerPage: le,
    isLoading: xe,
    disabled: ye,
    requireGroup: Fe,
    maxSelectedItems: Ae,
    plugins: he,
    onInit: Te,
    onReady: Ne,
    onFirstUserInteraction: pe,
    onChange: fe
  }) {
    z(this, ce);
    z(this, ht);
    // static rule definitions
    z(this, fr);
    z(this, Ot);
    z(this, On);
    z(this, zt);
    z(this, be);
    // Subclasses that extend functionality
    z(this, K);
    M(this, Ot, void 0), this.isReady = !1, M(this, On, !1), M(this, zt, !1), M(this, fr, bv(i) ? i : []), M(this, ht, s), this.disabled = !!ye, this.isLoading = !!xe, M(this, be, new Zv());
    const re = {
      getItems: () => this.items,
      getRules: () => v(this, fr),
      getMeta: () => Fu(v(this, K).meta),
      isLoading: () => this.isLoading,
      isDisabled: () => this.disabled,
      touch: (X) => Ee(this, ce, Bu).call(this, X),
      debouncer: new Xv()
    };
    if (M(this, K, {
      search: new Hv({ initialSearchTerm: g }, re),
      filters: new Pu({ initialFilters: U }, re),
      sortBy: new zv({ initialSortBy: y, initialSortDirection: R }, re),
      groupBy: new Fv({ initialGroupBy: b, requireGroup: !!Fe }, re),
      meta: new Bv({ initialMeta: te }, re),
      selectedItems: new Yv({ initialSelectedItems: ee, maxSelectedItems: Ae }, re),
      pagination: new Wv({ page: ne, numItemsPerPage: le }, re)
    }), this.plugins = new Gv(
      he || [],
      () => this,
      (X) => Ee(this, ce, Bu).call(this, X)
    ), v(this, be).silently(() => {
      const X = {
        source: "core",
        event: "init",
        snapshot: Ee(this, ce, rn).call(this),
        timestamp: Date.now()
      };
      this.plugins.onInit(X), Te && Te(X);
    }), fe && v(this, be).on("change", fe), pe && v(this, be).on("firstUserInteraction", pe), this.isReady = xe === !1 && Array.isArray(s) && s.length > 0, Ne && this.isReady) {
      const X = {
        source: "core",
        event: "ready",
        snapshot: Ee(this, ce, rn).call(this),
        timestamp: Date.now()
      };
      Ne(X);
    }
    this.isReady === !1 && v(this, be).on("ready", (X) => {
      v(this, K).filters.recalculateHydratedRules(), Ne && Ne(X);
    });
  }
  emitFirstUserInteraction() {
    if (v(this, On) === !1) {
      M(this, On, !0);
      const s = {
        source: "core",
        event: "firstUserInteraction",
        snapshot: Ee(this, ce, rn).call(this),
        timestamp: Date.now()
      };
      v(this, be).emit("firstUserInteraction", s);
    }
  }
  get items() {
    return Array.isArray(v(this, ht)) ? v(this, ht) : [];
  }
  get matches() {
    return (v(this, Ot) === void 0 || v(this, zt)) && (M(this, Ot, Ee(this, ce, Mo).call(this)), M(this, zt, !1)), v(this, Ot);
  }
  get isEmpty() {
    return this.isLoading === !1 && this.items.length === 0;
  }
  get search() {
    return $v(v(this, K).search);
  }
  get filters() {
    return Ov(v(this, K).filters);
  }
  get sortBy() {
    return Kv(v(this, K).sortBy);
  }
  get groupBy() {
    return Mv(v(this, K).groupBy);
  }
  get meta() {
    return Fu(v(this, K).meta);
  }
  get pagination() {
    return Nv(v(this, K).pagination);
  }
  get selectedItems() {
    return kv(v(this, K).selectedItems);
  }
  get events() {
    return {
      on: (s, i) => v(this, be).on(s, i),
      off: (s, i) => v(this, be).off(s, i)
    };
  }
  get state() {
    if (this.isLoading)
      return "loading";
    if (this.items && this.items.length === 0)
      return "empty";
    const s = v(this, K).groupBy.activeRule !== void 0;
    return s && Array.isArray(this.matches.groups) && this.matches.groups.length > 0 ? "groups" : s === !1 && Array.isArray(this.matches.items) && this.matches.items.length > 0 ? "items" : "noMatches";
  }
  setItems(s) {
    if (ur.isEqual(s, v(this, ht)) === !1) {
      const i = v(this, ht);
      M(this, ht, s), Ee(this, ce, fi).call(this, { source: "core", event: "change.core.setItems", current: s, initial: i });
    }
  }
  setIsLoading(s) {
    if (!!s !== this.isLoading) {
      const i = !!this.isLoading;
      this.isLoading = !!s, Ee(this, ce, fi).call(this, { source: "core", event: "change.core.setIsLoading", current: !!s, initial: i }), this.isLoading === !1 && Ee(this, ce, Po).call(this);
    }
  }
  setIsDisabled(s) {
    if (!!s !== this.disabled) {
      const i = this.disabled;
      this.disabled = !!s, Ee(this, ce, fi).call(this, { source: "core", event: "change.core.setIsDisabled", current: !!s, initial: i });
    }
  }
}, ht = new WeakMap(), fr = new WeakMap(), Ot = new WeakMap(), On = new WeakMap(), zt = new WeakMap(), be = new WeakMap(), K = new WeakMap(), ce = new WeakSet(), /**
 * Changes that reflect a user interaction.
 * e.g: entering a search term or selecting a filter.
 */
Bu = function(s) {
  this.emitFirstUserInteraction(), M(this, zt, !0), M(this, Ot, void 0), this.updatedAt = Date.now();
  const i = { ...s, snapshot: Ee(this, ce, rn).call(this), timestamp: Date.now() };
  v(this, be).emit(s.event, i), v(this, be).emit(`change.${s.source}`, i), v(this, be).emit("change", i);
}, /** Changes that do not reflect a user interaction  */
fi = function(s) {
  M(this, zt, !0), M(this, Ot, void 0), this.updatedAt = Date.now();
  const i = { ...s, snapshot: Ee(this, ce, rn).call(this), timestamp: Date.now() };
  v(this, be).emit(s.event, i);
}, Po = function() {
  if (this.isReady === !1) {
    this.isReady = !0;
    const s = {
      source: "core",
      event: "ready",
      snapshot: Ee(this, ce, rn).call(this),
      timestamp: Date.now()
    };
    v(this, be).emit("ready", s);
  }
}, Mo = function() {
  let s = [], i = [];
  const g = v(this, K).groupBy.activeRule !== void 0;
  let y = [];
  if (Array.isArray(v(this, ht))) {
    const R = Fu(v(this, K).meta);
    s = [...v(this, ht)], s = v(this, K).search.process(s, R), s = v(this, K).filters.process(s, R), s = v(this, K).sortBy.process(s), y = v(this, K).pagination.process(s), g && (i = v(this, K).groupBy.process(y, R));
  }
  return {
    items: g ? void 0 : y,
    groups: g ? i : void 0,
    numMatchedItems: s.length,
    numTotalItems: this.items.length,
    hasGroupByRule: g
  };
}, /**
 * Return the current state values for each mixin. Only used for onChange events.
 */
rn = function() {
  return {
    search: Lo(v(this, K).search),
    filters: To(v(this, K).filters),
    sortBy: Fo(v(this, K).sortBy),
    groupBy: Co(v(this, K).groupBy),
    selectedItems: Do(v(this, K).selectedItems),
    meta: Oo(v(this, K).meta),
    updatedAt: this.updatedAt
  };
}, So);
class a_ {
  register(s, i) {
    this.instance = s, this.touch = i;
  }
}
function l_(a) {
  return a;
}
function c_(a) {
  return a;
}
function h_(a) {
  return a;
}
function d_(a) {
  return a;
}
function g_(a) {
  return a;
}
function p_(a, s, i) {
  const g = bn(s);
  return Wu(a, i).some((R) => R.includes(g));
}
function v_(a, s, i) {
  const g = bn(s), y = Wu(a, i);
  return Array.from(g).every((R) => y.some((b) => b.includes(R)));
}
function __(a, s, i) {
  const g = bn(s), y = Wu(a, i), R = Array.from(g);
  return y.some((b) => {
    let U = b, ee = !0;
    return R.forEach((te) => {
      if (ee) {
        const ne = U.indexOf(te);
        ne !== -1 ? U = U.substring(ne) : ee = !1;
      }
    }), ee;
  });
}
function Wu(a, s = []) {
  return s ? [bn(a), ...s.map(bn)] : [bn(a)];
}
function bn(a) {
  return a.toLowerCase().replace(/[^\w\d]+/g, "");
}
function Vv(a, {
  rules: s,
  initialSearchTerm: i,
  initialSortBy: g,
  initialSortDirection: y,
  initialGroupBy: R,
  initialFilters: b,
  initialSelectedItems: U,
  initialMeta: ee,
  page: te,
  numItemsPerPage: ne,
  plugins: le,
  isLoading: xe,
  disabled: ye,
  requireGroup: Fe,
  maxSelectedItems: Ae,
  onInit: he,
  onReady: Te,
  onFirstUserInteraction: Ne,
  onChange: pe
}) {
  const [fe] = mo(
    () => new Jv(a, {
      rules: s,
      initialSearchTerm: i,
      initialSortBy: g,
      initialSortDirection: y,
      initialGroupBy: R,
      initialFilters: b,
      initialMeta: ee,
      initialSelectedItems: U,
      maxSelectedItems: Ae,
      isLoading: xe,
      disabled: ye,
      page: te,
      numItemsPerPage: ne,
      plugins: le,
      requireGroup: Fe,
      onInit: he,
      onReady: Te,
      onFirstUserInteraction: Ne,
      onChange: pe
    })
  ), [, re] = mo(void 0);
  return yv(() => {
    fe.events.on("change", ({ snapshot: X }) => re(X.updatedAt));
  }, []), fe.setItems(a), fe.setIsLoading(xe), fe.setIsDisabled(ye), te !== void 0 && fe.pagination.setPage(te), ne !== void 0 && fe.pagination.setNumItemsPerPage(ne), Ae !== void 0 && fe.selectedItems.setMaxSelectedItems(Ae), fe;
}
const Bo = Av(null);
function lr() {
  const a = Rv(Bo);
  if (a === null)
    throw new Error("useFinderContext requires a FinderContext.");
  const [s] = a;
  return s;
}
var si = { exports: {} }, tr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yo;
function Qv() {
  if (yo) return tr;
  yo = 1;
  var a = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function i(g, y, R) {
    var b = null;
    if (R !== void 0 && (b = "" + R), y.key !== void 0 && (b = "" + y.key), "key" in y) {
      R = {};
      for (var U in y)
        U !== "key" && (R[U] = y[U]);
    } else R = y;
    return y = R.ref, {
      $$typeof: a,
      type: g,
      key: b,
      ref: y !== void 0 ? y : null,
      props: R
    };
  }
  return tr.Fragment = s, tr.jsx = i, tr.jsxs = i, tr;
}
var nr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ao;
function jv() {
  return Ao || (Ao = 1, process.env.NODE_ENV !== "production" && function() {
    function a(A) {
      if (A == null) return null;
      if (typeof A == "function")
        return A.$$typeof === oi ? null : A.displayName || A.name || null;
      if (typeof A == "string") return A;
      switch (A) {
        case Ae:
          return "Fragment";
        case Te:
          return "Profiler";
        case he:
          return "StrictMode";
        case re:
          return "Suspense";
        case X:
          return "SuspenseList";
        case Ln:
          return "Activity";
      }
      if (typeof A == "object")
        switch (typeof A.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), A.$$typeof) {
          case Fe:
            return "Portal";
          case pe:
            return (A.displayName || "Context") + ".Provider";
          case Ne:
            return (A._context.displayName || "Context") + ".Consumer";
          case fe:
            var L = A.render;
            return A = A.displayName, A || (A = L.displayName || L.name || "", A = A !== "" ? "ForwardRef(" + A + ")" : "ForwardRef"), A;
          case nt:
            return L = A.displayName || null, L !== null ? L : a(A.type) || "Memo";
          case Lt:
            L = A._payload, A = A._init;
            try {
              return a(A(L));
            } catch {
            }
        }
      return null;
    }
    function s(A) {
      return "" + A;
    }
    function i(A) {
      try {
        s(A);
        var L = !1;
      } catch {
        L = !0;
      }
      if (L) {
        L = console;
        var J = L.error, ve = typeof Symbol == "function" && Symbol.toStringTag && A[Symbol.toStringTag] || A.constructor.name || "Object";
        return J.call(
          L,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          ve
        ), s(A);
      }
    }
    function g(A) {
      if (A === Ae) return "<>";
      if (typeof A == "object" && A !== null && A.$$typeof === Lt)
        return "<...>";
      try {
        var L = a(A);
        return L ? "<" + L + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function y() {
      var A = Dn.A;
      return A === null ? null : A.getOwner();
    }
    function R() {
      return Error("react-stack-top-frame");
    }
    function b(A) {
      if (cr.call(A, "key")) {
        var L = Object.getOwnPropertyDescriptor(A, "key").get;
        if (L && L.isReactWarning) return !1;
      }
      return A.key !== void 0;
    }
    function U(A, L) {
      function J() {
        hr || (hr = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          L
        ));
      }
      J.isReactWarning = !0, Object.defineProperty(A, "key", {
        get: J,
        configurable: !0
      });
    }
    function ee() {
      var A = a(this.type);
      return dr[A] || (dr[A] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), A = this.props.ref, A !== void 0 ? A : null;
    }
    function te(A, L, J, ve, gt, me, Dt, Fn) {
      return J = me.ref, A = {
        $$typeof: ye,
        type: A,
        key: L,
        props: me,
        _owner: gt
      }, (J !== void 0 ? J : null) !== null ? Object.defineProperty(A, "ref", {
        enumerable: !1,
        get: ee
      }) : Object.defineProperty(A, "ref", { enumerable: !1, value: null }), A._store = {}, Object.defineProperty(A._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(A, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(A, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Dt
      }), Object.defineProperty(A, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Fn
      }), Object.freeze && (Object.freeze(A.props), Object.freeze(A)), A;
    }
    function ne(A, L, J, ve, gt, me, Dt, Fn) {
      var ue = L.children;
      if (ue !== void 0)
        if (ve)
          if (ai(ue)) {
            for (ve = 0; ve < ue.length; ve++)
              le(ue[ve]);
            Object.freeze && Object.freeze(ue);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else le(ue);
      if (cr.call(L, "key")) {
        ue = a(A);
        var Ke = Object.keys(L).filter(function(ln) {
          return ln !== "key";
        });
        ve = 0 < Ke.length ? "{key: someKey, " + Ke.join(": ..., ") + ": ...}" : "{key: someKey}", gr[ue + ve] || (Ke = 0 < Ke.length ? "{" + Ke.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          ve,
          ue,
          Ke,
          ue
        ), gr[ue + ve] = !0);
      }
      if (ue = null, J !== void 0 && (i(J), ue = "" + J), b(L) && (i(L.key), ue = "" + L.key), "key" in L) {
        J = {};
        for (var Pn in L)
          Pn !== "key" && (J[Pn] = L[Pn]);
      } else J = L;
      return ue && U(
        J,
        typeof A == "function" ? A.displayName || A.name || "Unknown" : A
      ), te(
        A,
        ue,
        me,
        gt,
        y(),
        J,
        Dt,
        Fn
      );
    }
    function le(A) {
      typeof A == "object" && A !== null && A.$$typeof === ye && A._store && (A._store.validated = 1);
    }
    var xe = Iv, ye = Symbol.for("react.transitional.element"), Fe = Symbol.for("react.portal"), Ae = Symbol.for("react.fragment"), he = Symbol.for("react.strict_mode"), Te = Symbol.for("react.profiler"), Ne = Symbol.for("react.consumer"), pe = Symbol.for("react.context"), fe = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), nt = Symbol.for("react.memo"), Lt = Symbol.for("react.lazy"), Ln = Symbol.for("react.activity"), oi = Symbol.for("react.client.reference"), Dn = xe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, cr = Object.prototype.hasOwnProperty, ai = Array.isArray, an = console.createTask ? console.createTask : function() {
      return null;
    };
    xe = {
      "react-stack-bottom-frame": function(A) {
        return A();
      }
    };
    var hr, dr = {}, Kt = xe["react-stack-bottom-frame"].bind(
      xe,
      R
    )(), mt = an(g(R)), gr = {};
    nr.Fragment = Ae, nr.jsx = function(A, L, J, ve, gt) {
      var me = 1e4 > Dn.recentlyCreatedOwnerStacks++;
      return ne(
        A,
        L,
        J,
        !1,
        ve,
        gt,
        me ? Error("react-stack-top-frame") : Kt,
        me ? an(g(A)) : mt
      );
    }, nr.jsxs = function(A, L, J, ve, gt) {
      var me = 1e4 > Dn.recentlyCreatedOwnerStacks++;
      return ne(
        A,
        L,
        J,
        !0,
        ve,
        gt,
        me ? Error("react-stack-top-frame") : Kt,
        me ? an(g(A)) : mt
      );
    };
  }()), nr;
}
var Ro;
function e_() {
  return Ro || (Ro = 1, process.env.NODE_ENV === "production" ? si.exports = Qv() : si.exports = jv()), si.exports;
}
var dt = e_();
function t_({ children: a }) {
  const s = lr();
  if (s.state === "items" && s.matches.items && a) {
    if (typeof a == "object" && or(a))
      return ar(a, {
        items: s.matches.items,
        selectedItems: s.selectedItems,
        pagination: s.pagination,
        meta: s.meta
      });
    if (typeof a == "function") {
      const i = a;
      return /* @__PURE__ */ dt.jsx(i, { items: s.matches.items, selectedItems: s.selectedItems, pagination: s.pagination, meta: s.meta });
    }
  }
  return null;
}
function m_({
  items: a,
  rules: s,
  initialSearchTerm: i,
  initialSortBy: g,
  initialSortDirection: y,
  initialGroupBy: R,
  initialFilters: b,
  initialMeta: U,
  initialSelectedItems: ee,
  maxSelectedItems: te,
  isLoading: ne,
  disabled: le,
  page: xe,
  numItemsPerPage: ye,
  requireGroup: Fe,
  plugins: Ae,
  onInit: he,
  onReady: Te,
  onFirstUserInteraction: Ne,
  onChange: pe,
  children: fe,
  controllerRef: re
}) {
  const X = Vv(a, {
    rules: s,
    initialSearchTerm: i,
    initialSortBy: g,
    initialSortDirection: y,
    initialGroupBy: R,
    initialFilters: b,
    initialMeta: U,
    initialSelectedItems: ee,
    maxSelectedItems: te,
    isLoading: ne,
    disabled: le,
    page: xe,
    numItemsPerPage: ye,
    requireGroup: Fe,
    plugins: Ae,
    onInit: he,
    onReady: Te,
    onFirstUserInteraction: Ne,
    onChange: pe
  });
  return Sv(re, () => X, [X]), /* @__PURE__ */ dt.jsx(Bo.Provider, { value: [X, X.updatedAt], children: fe });
}
function n_({ children: a }) {
  const s = lr();
  if (s.state === "empty" && a) {
    if (typeof a == "object" && or(a))
      return ar(a, { pagination: s.pagination, meta: s.meta, selectedItems: s.selectedItems });
    if (typeof a == "function") {
      const i = a;
      return /* @__PURE__ */ dt.jsx(i, { pagination: s.pagination, meta: s.meta, selectedItems: s.selectedItems });
    }
    return a;
  }
  return null;
}
function r_({ children: a }) {
  const s = lr();
  if (s.state === "groups" && s.matches.groups && s.groupBy.activeRule && a) {
    if (typeof a == "object" && or(a))
      return ar(a, {
        groups: s.matches.groups,
        rule: s.groupBy.activeRule,
        selectedItems: s.selectedItems,
        pagination: s.pagination,
        meta: s.meta
      });
    if (typeof a == "function") {
      const i = a;
      return /* @__PURE__ */ dt.jsx(
        i,
        {
          groups: s.matches.groups,
          rule: s.groupBy.activeRule,
          selectedItems: s.selectedItems,
          pagination: s.pagination,
          meta: s.meta
        }
      );
    }
  }
  return null;
}
function i_({ children: a }) {
  const s = lr();
  if (s.state === "loading" && a) {
    if (typeof a == "object" && a !== null && or(a))
      return ar(a, { pagination: s.pagination, meta: s.meta, selectedItems: s.selectedItems });
    if (typeof a == "function") {
      const i = a;
      return /* @__PURE__ */ dt.jsx(i, { pagination: s.pagination, meta: s.meta, selectedItems: s.selectedItems });
    }
    return a;
  }
  return null;
}
function u_({ children: a }) {
  const s = lr();
  if (s.state === "noMatches" && a) {
    if (typeof a == "object" && or(a))
      return ar(a, { pagination: s.pagination, meta: s.meta, selectedItems: s.selectedItems });
    if (typeof a == "function") {
      const i = a;
      return /* @__PURE__ */ dt.jsx(i, { pagination: s.pagination, meta: s.meta, selectedItems: s.selectedItems });
    }
    return a;
  }
  return null;
}
function w_({ children: a }) {
  if (!a || Object.values(a).length === 0)
    throw new Error("No render props were found.");
  return [
    a.loading && /* @__PURE__ */ dt.jsx(i_, { children: a.loading }, "loading"),
    a.items && /* @__PURE__ */ dt.jsx(t_, { children: a.items }, "items"),
    a.noMatches && /* @__PURE__ */ dt.jsx(u_, { children: a.noMatches }, "noMatches"),
    a.groups && /* @__PURE__ */ dt.jsx(r_, { children: a.groups }, "groups"),
    a.empty && /* @__PURE__ */ dt.jsx(n_, { children: a.empty }, "empty")
  ];
}
function I_() {
  return Ev(null);
}
export {
  m_ as Finder,
  w_ as FinderContent,
  Jv as FinderCore,
  n_ as FinderEmpty,
  r_ as FinderGroups,
  t_ as FinderItems,
  i_ as FinderLoading,
  u_ as FinderNoMatches,
  a_ as FinderPlugin,
  h_ as filterRule,
  v_ as finderCharacterCompare,
  l_ as finderRuleset,
  __ as finderSequentialCharacterCompare,
  p_ as finderStringCompare,
  g_ as groupByRule,
  c_ as searchRule,
  d_ as sortByRule,
  Vv as useFinder,
  lr as useFinderContext,
  I_ as useFinderRef
};
