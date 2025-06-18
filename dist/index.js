var qn = (n) => {
  throw TypeError(n);
};
var xn = (n, r, a) => r.has(n) || qn("Cannot " + a);
var h = (n, r, a) => (xn(n, r, "read from private field"), a ? a.call(n) : r.get(n)), J = (n, r, a) => r.has(n) ? qn("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(n) : r.set(n, a), L = (n, r, a, f) => (xn(n, r, "write to private field"), f ? f.call(n, a) : r.set(n, a), a), De = (n, r, a) => (xn(n, r, "access private method"), a);
import hi, { useState as Yn, useEffect as gi, createContext as pi, use as yi, isValidElement as On, cloneElement as Rn, useImperativeHandle as _i, useRef as vi } from "react";
function mi(n) {
  if (!n || n.length === 0)
    return !1;
  const r = [];
  return n.forEach((a) => {
    if (a.id === void 0 && !An(a))
      throw new Error("Finder is missing a unique rule id for rule.");
    const f = [wi(a), a.id].join(".");
    if (r.includes(f))
      throw new Error(`Duplicate rule id: ${f}`);
    r.push(f);
  }), !0;
}
function Be(n, r) {
  if (n !== void 0) {
    if (typeof n == "object") {
      const a = r == null ? void 0 : r.find(({ id: f }) => f === n.id);
      if (a === void 0)
        throw new Error(`Finder could not locate the rule for ${n.id}.`);
      return a;
    }
    if (typeof n == "string") {
      const a = r == null ? void 0 : r.find(({ id: f }) => f === n);
      if (a === void 0)
        throw new Error(`Finder could not locate the rule for ${n}.`);
      return a;
    }
    throw new Error("Finder received an invalid rule request format.");
  }
}
function Kn(n, r, a, f) {
  let g, v = [];
  if (typeof r == "function" && (v = r(a, f)), Array.isArray(r) && (v = r), bi(n)) {
    if (g = v == null ? void 0 : v.find((I) => I === n), g === void 0)
      throw new Error(`Finder could not locate the option for ${n}.`);
    return g;
  }
  if (g = v == null ? void 0 : v.find(({ value: I }) => I === n), g === void 0)
    throw new Error(`Finder could not locate the option for ${n}.`);
  return g;
}
function bi(n) {
  return typeof n == "object" && n !== null && "label" in n && "value" in n;
}
function wi(n) {
  if (An(n))
    return "search";
  if (ti(n))
    return "filter";
  if (ei(n))
    return "sortBy";
  if (ri(n))
    return "groupBy";
  throw new Error("Finder received an invalid rule.");
}
function ei(n) {
  return typeof n == "object" && n !== null && "sortFn" in n;
}
function An(n) {
  return typeof n == "object" && n !== null && "searchFn" in n;
}
function ti(n) {
  return typeof n == "object" && n !== null && "filterFn" in n;
}
function ri(n) {
  return typeof n == "object" && n !== null && "groupFn" in n;
}
function jn(n, r, a) {
  return n < r ? r : n > a ? a : n;
}
function Ii(n, r) {
  const a = [];
  return n.reduce((f, g) => {
    const v = g[r];
    return a.includes(String(v)) === !1 && f.push(g), f;
  }, []);
}
var fr, ie, Sn, Bn;
const cr = class cr {
  constructor({ initialFilters: r }, a) {
    J(this, Sn);
    // memoize rules with generated options
    J(this, fr);
    J(this, ie);
    this.filters = r || {}, L(this, ie, a);
  }
  set(r, a) {
    const f = Be(r, this.rules);
    if (f === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    const g = this.get(r);
    h(this, ie).debouncer.has(f.id) === !1 && h(this, ie).debouncer.register(f.id, f == null ? void 0 : f.debounceDelay), h(this, ie).debouncer.call(f.id, () => {
      var S;
      if (h(this, ie).isDisabled())
        return;
      let I = typeof a == "string" && a.trim() === "" ? void 0 : a;
      ((S = this.filters) == null ? void 0 : S[f.id]) !== void 0 && this.filters[f.id] === I || (this.filters = { ...this.filters, [f.id]: I }, h(this, ie).touch({
        source: "filters",
        event: "change.filters.set",
        current: {
          rule: f,
          value: a
        },
        initial: { rule: f, value: g }
      }));
    });
  }
  get rules() {
    return h(this, fr) === void 0 && L(this, fr, De(this, Sn, Bn).call(this, h(this, ie).getItems(), h(this, ie).getMeta())), h(this, fr);
  }
  recalculateHydratedRules() {
    L(this, fr, De(this, Sn, Bn).call(this, h(this, ie).getItems(), h(this, ie).getMeta()));
  }
  getRule(r) {
    return Be(r, this.rules);
  }
  get activeRules() {
    return this.rules.filter((r) => this.isActive(r));
  }
  get(r) {
    var g, v;
    const a = Be(r, this.rules);
    if (a === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    const f = (g = this.filters) == null ? void 0 : g[a.id];
    if (f === void 0) {
      if (a.defaultValue)
        return a.defaultValue;
      if (a.required) {
        if (a.isBoolean)
          return !0;
        if (Array.isArray(a.options) && a.options.length > 0)
          return (v = a.options.at(0)) == null ? void 0 : v.value;
      }
      if (a.multiple)
        return [];
      if (a.isBoolean)
        return !1;
    }
    return f;
  }
  has(r, a) {
    const f = Be(r, this.rules);
    if (f === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    const g = this.get(f);
    if (a === void 0)
      return g !== void 0;
    const v = Kn(a, f.options, h(this, ie).getItems(), h(this, ie).getMeta());
    return f.multiple ? g.includes(v.value) : g === v;
  }
  isActive(r) {
    var f;
    const a = Be(r, this.rules);
    return a ? cr.isActive(a, (f = this.filters) == null ? void 0 : f[a.id]) : !1;
  }
  toggleOption(r, a) {
    var I;
    const f = Be(r, this.rules);
    if (f === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    if (f.options === void 0)
      throw new Error("Finder could not toggle this filter rule option, as the filter does not have any options.");
    if (!(f != null && f.multiple))
      throw new Error(
        "Finder could not toggle this filter rule option, as the rule does not allow multiple values. Consider using filters.set() or filters.toggle() instead."
      );
    const g = Kn(a, f.options, h(this, ie).getItems()), v = ((I = this.filters) == null ? void 0 : I[f.id]) ?? [];
    if (v.includes(g.value)) {
      this.set(f, [...v.filter((S) => S !== g.value)]);
      return;
    }
    this.set(f, [...v, g.value]);
  }
  test(r) {
    if (h(this, ie).isLoading())
      return [];
    const a = { rules: [], meta: h(this, ie).getMeta(), values: {}, ...r };
    if (r.isAdditive) {
      const f = Ii([...this.rules, ...a.rules], "id"), g = { ...this.getFilters(), ...a.values };
      return cr.process(h(this, ie).getItems(), f, g, a.meta);
    }
    return cr.process(h(this, ie).getItems(), a.rules, a.values, a.meta);
  }
  testRule({ rule: r, value: a, ...f }) {
    if (h(this, ie).isLoading())
      return [];
    const g = Be(r, this.rules);
    if (g === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    return this.test({
      rules: [g],
      values: { [g.id]: a },
      ...f
    });
  }
  testRuleOptions({ rule: r, ...a }) {
    if (h(this, ie).isLoading())
      return /* @__PURE__ */ new Map();
    const f = Be(r, this.rules);
    if (f === void 0)
      throw new Error("Finder could not locate a rule for this filter.");
    if (f.isBoolean === !0) {
      const g = /* @__PURE__ */ new Map();
      return g.set(!0, this.testRule({ rule: f, value: !0, ...a })), g.set(!1, this.testRule({ rule: f, value: !1, ...a })), g;
    }
    if (Array.isArray(f.options)) {
      const g = /* @__PURE__ */ new Map();
      return f.options.forEach((v) => {
        var S;
        let I;
        if (a.mergeExistingValue) {
          const N = ((S = this.filters) == null ? void 0 : S[f.id]) ?? [];
          f.multiple && (I = [...N, v.value]);
        } else
          f.multiple ? I = [v.value] : I = v.value;
        g.set(v, this.testRule({ rule: f, value: I, ...a }));
      }), g;
    }
    throw new Error("Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.");
  }
  // return all filter values with default options and type casts applied.
  getFilters() {
    return this.rules.reduce(
      (r, a) => (r[a.id] = this.get(a), r),
      {}
    );
  }
  process(r, a) {
    return cr.process(r, this.rules, this.getFilters(), a);
  }
  static process(r, a, f, g) {
    const v = a.filter((I) => cr.isActive(I, f == null ? void 0 : f[I.id]));
    return r.filter((I) => v.every((S) => S.filterFn(I, f == null ? void 0 : f[S.id], g)));
  }
  static isActive(r, a) {
    return r.required ? !0 : !(a === void 0 || r.multiple && Array.isArray(a) && a.length === 0 || r.isBoolean && a === !1 || typeof a == "string" && a.trim() === "");
  }
};
fr = new WeakMap(), ie = new WeakMap(), Sn = new WeakSet(), // hydrate and memoize generated options
Bn = function(r, a) {
  return h(this, ie).getRules().filter(ti).map((g) => {
    let v = typeof g.options == "function" ? g.options(r, a) : g.options;
    return {
      ...g,
      options: v,
      // reduce uncertainty
      multiple: !!g.multiple,
      required: !!g.required,
      isBoolean: !!g.isBoolean,
      hidden: !!g.hidden,
      // brand it
      _isHydrated: !0
    };
  });
};
let Gn = cr;
function ni(n) {
  return {
    filters: n.getFilters(),
    raw: n.filters,
    activeRules: n.activeRules,
    rules: n.rules,
    isActive: n.isActive.bind(n),
    get: n.get.bind(n),
    has: n.has.bind(n),
    getRule: n.getRule.bind(n)
  };
}
function Ti(n) {
  return {
    ...ni(n),
    toggle(r) {
      const a = Be(r, n.rules);
      if (a === void 0)
        throw new Error("Finder could not locate a rule for this filter.");
      if (!a.isBoolean)
        throw new Error("Finder could not toggle this filter rule, as it is not boolean.");
      const f = n.get(a.id);
      n.set(a, !f);
    },
    toggleOption: n.toggleOption.bind(n),
    set: n.set.bind(n),
    delete: (r) => {
      const a = Be(r, n.rules);
      if (a === void 0)
        throw new Error("Finder could not locate a rule for this filter.");
      n.set(a, void 0);
    },
    test: n.test.bind(n),
    testRule: n.testRule.bind(n),
    testRuleOptions: n.testRuleOptions.bind(n)
  };
}
var Me = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ln(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var wn = { exports: {} };
wn.exports;
var Wn;
function Ai() {
  return Wn || (Wn = 1, function(n, r) {
    var a = 200, f = "Expected a function", g = "__lodash_hash_undefined__", v = 1, I = 2, S = 9007199254740991, N = "[object Arguments]", U = "[object Array]", q = "[object Boolean]", se = "[object Date]", re = "[object Error]", fe = "[object Function]", Le = "[object GeneratorFunction]", $ = "[object Map]", Ie = "[object Number]", Y = "[object Object]", Z = "[object Promise]", pe = "[object RegExp]", H = "[object Set]", A = "[object String]", P = "[object Symbol]", k = "[object WeakMap]", Ae = "[object ArrayBuffer]", ye = "[object DataView]", Ue = "[object Float32Array]", Se = "[object Float64Array]", ne = "[object Int8Array]", xe = "[object Int16Array]", je = "[object Int32Array]", st = "[object Uint8Array]", $e = "[object Uint8ClampedArray]", et = "[object Uint16Array]", tt = "[object Uint32Array]", bt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, y = /^\w*$/, O = /^\./, B = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Q = /[\\^$.*+?()[\]{}|]/g, Pe = /\\(\\)?/g, C = /^\[object .+?Constructor\]$/, He = /^(?:0|[1-9]\d*)$/, b = {};
    b[Ue] = b[Se] = b[ne] = b[xe] = b[je] = b[st] = b[$e] = b[et] = b[tt] = !0, b[N] = b[U] = b[Ae] = b[q] = b[ye] = b[se] = b[re] = b[fe] = b[$] = b[Ie] = b[Y] = b[pe] = b[H] = b[A] = b[k] = !1;
    var D = typeof Me == "object" && Me && Me.Object === Object && Me, _e = typeof self == "object" && self && self.Object === Object && self, K = D || _e || Function("return this")(), wt = r && !r.nodeType && r, Et = wt && !0 && n && !n.nodeType && n, hr = Et && Et.exports === wt, Gt = hr && D.process, tr = function() {
      try {
        return Gt && Gt.binding("util");
      } catch {
      }
    }(), rr = tr && tr.isTypedArray;
    function gr(e, i) {
      for (var u = -1, l = e ? e.length : 0, m = Array(l); ++u < l; )
        m[u] = i(e[u], u, e);
      return m;
    }
    function Mr(e, i) {
      for (var u = -1, l = e ? e.length : 0; ++u < l; )
        if (i(e[u], u, e))
          return !0;
      return !1;
    }
    function Lr(e) {
      return function(i) {
        return i == null ? void 0 : i[e];
      };
    }
    function xr(e, i) {
      var u = e.length;
      for (e.sort(i); u--; )
        e[u] = e[u].value;
      return e;
    }
    function jr(e, i) {
      for (var u = -1, l = Array(e); ++u < e; )
        l[u] = i(u);
      return l;
    }
    function pr(e) {
      return function(i) {
        return e(i);
      };
    }
    function nr(e, i) {
      return e == null ? void 0 : e[i];
    }
    function ir(e) {
      var i = !1;
      if (e != null && typeof e.toString != "function")
        try {
          i = !!(e + "");
        } catch {
        }
      return i;
    }
    function Nr(e) {
      var i = -1, u = Array(e.size);
      return e.forEach(function(l, m) {
        u[++i] = [m, l];
      }), u;
    }
    function Gr(e, i) {
      return function(u) {
        return e(i(u));
      };
    }
    function Bt(e) {
      var i = -1, u = Array(e.size);
      return e.forEach(function(l) {
        u[++i] = l;
      }), u;
    }
    var sr = Array.prototype, Ot = Function.prototype, ve = Object.prototype, Rt = K["__core-js_shared__"], Ut = function() {
      var e = /[^.]+$/.exec(Rt && Rt.keys && Rt.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : "";
    }(), Ne = Ot.toString, me = ve.hasOwnProperty, We = ve.toString, ar = RegExp(
      "^" + Ne.call(me).replace(Q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), $t = K.Symbol, yr = K.Uint8Array, at = ve.propertyIsEnumerable, _r = sr.splice, or = Gr(Object.keys, Object), ot = nt(K, "DataView"), ze = nt(K, "Map"), Je = nt(K, "Promise"), ut = nt(K, "Set"), Xe = nt(K, "WeakMap"), ct = nt(Object, "create"), Pt = x(ot), Br = x(ze), Ur = x(Je), $r = x(ut), Ht = x(Xe), It = $t ? $t.prototype : void 0, Ct = It ? It.valueOf : void 0, qe = It ? It.toString : void 0;
    function Ee(e) {
      var i = -1, u = e ? e.length : 0;
      for (this.clear(); ++i < u; ) {
        var l = e[i];
        this.set(l[0], l[1]);
      }
    }
    function Hr() {
      this.__data__ = ct ? ct(null) : {};
    }
    function qr(e) {
      return this.has(e) && delete this.__data__[e];
    }
    function Yr(e) {
      var i = this.__data__;
      if (ct) {
        var u = i[e];
        return u === g ? void 0 : u;
      }
      return me.call(i, e) ? i[e] : void 0;
    }
    function Kr(e) {
      var i = this.__data__;
      return ct ? i[e] !== void 0 : me.call(i, e);
    }
    function Ze(e, i) {
      var u = this.__data__;
      return u[e] = ct && i === void 0 ? g : i, this;
    }
    Ee.prototype.clear = Hr, Ee.prototype.delete = qr, Ee.prototype.get = Yr, Ee.prototype.has = Kr, Ee.prototype.set = Ze;
    function ce(e) {
      var i = -1, u = e ? e.length : 0;
      for (this.clear(); ++i < u; ) {
        var l = e[i];
        this.set(l[0], l[1]);
      }
    }
    function Wr() {
      this.__data__ = [];
    }
    function zr(e) {
      var i = this.__data__, u = lt(i, e);
      if (u < 0)
        return !1;
      var l = i.length - 1;
      return u == l ? i.pop() : _r.call(i, u, 1), !0;
    }
    function Jr(e) {
      var i = this.__data__, u = lt(i, e);
      return u < 0 ? void 0 : i[u][1];
    }
    function Xr(e) {
      return lt(this.__data__, e) > -1;
    }
    function Qe(e, i) {
      var u = this.__data__, l = lt(u, e);
      return l < 0 ? u.push([e, i]) : u[l][1] = i, this;
    }
    ce.prototype.clear = Wr, ce.prototype.delete = zr, ce.prototype.get = Jr, ce.prototype.has = Xr, ce.prototype.set = Qe;
    function be(e) {
      var i = -1, u = e ? e.length : 0;
      for (this.clear(); ++i < u; ) {
        var l = e[i];
        this.set(l[0], l[1]);
      }
    }
    function Zr() {
      this.__data__ = {
        hash: new Ee(),
        map: new (ze || ce)(),
        string: new Ee()
      };
    }
    function Qr(e) {
      return Oe(this, e).delete(e);
    }
    function Vr(e) {
      return Oe(this, e).get(e);
    }
    function kr(e) {
      return Oe(this, e).has(e);
    }
    function qt(e, i) {
      return Oe(this, e).set(e, i), this;
    }
    be.prototype.clear = Zr, be.prototype.delete = Qr, be.prototype.get = Vr, be.prototype.has = kr, be.prototype.set = qt;
    function ft(e) {
      var i = -1, u = e ? e.length : 0;
      for (this.__data__ = new be(); ++i < u; )
        this.add(e[i]);
    }
    function en(e) {
      return this.__data__.set(e, g), this;
    }
    function Ve(e) {
      return this.__data__.has(e);
    }
    ft.prototype.add = ft.prototype.push = en, ft.prototype.has = Ve;
    function le(e) {
      this.__data__ = new ce(e);
    }
    function tn() {
      this.__data__ = new ce();
    }
    function rn(e) {
      return this.__data__.delete(e);
    }
    function nn(e) {
      return this.__data__.get(e);
    }
    function sn(e) {
      return this.__data__.has(e);
    }
    function an(e, i) {
      var u = this.__data__;
      if (u instanceof ce) {
        var l = u.__data__;
        if (!ze || l.length < a - 1)
          return l.push([e, i]), this;
        u = this.__data__ = new be(l);
      }
      return u.set(e, i), this;
    }
    le.prototype.clear = tn, le.prototype.delete = rn, le.prototype.get = nn, le.prototype.has = sn, le.prototype.set = an;
    function Yt(e, i) {
      var u = j(e) || ae(e) ? jr(e.length, String) : [], l = u.length, m = !!l;
      for (var _ in e)
        me.call(e, _) && !(m && (_ == "length" || St(_, l))) && u.push(_);
      return u;
    }
    function lt(e, i) {
      for (var u = e.length; u--; )
        if (V(e[u][0], i))
          return u;
      return -1;
    }
    var on = dt(vr), Dt = Ar();
    function vr(e, i) {
      return e && Dt(e, i, t);
    }
    function Kt(e, i) {
      i = Lt(i, e) ? [i] : Ir(i);
      for (var u = 0, l = i.length; e != null && u < l; )
        e = e[w(i[u++])];
      return u && u == l ? e : void 0;
    }
    function un(e) {
      return We.call(e);
    }
    function cn(e, i) {
      return e != null && i in Object(e);
    }
    function Ft(e, i, u, l, m) {
      return e === i ? !0 : e == null || i == null || !we(e) && !Ge(i) ? e !== e && i !== i : fn(e, i, Ft, u, l, m);
    }
    function fn(e, i, u, l, m, _) {
      var T = j(e), F = j(i), E = U, M = U;
      T || (E = Ce(e), E = E == N ? Y : E), F || (M = Ce(i), M = M == N ? Y : M);
      var W = E == Y && !ir(e), z = M == Y && !ir(i), te = E == M;
      if (te && !W)
        return _ || (_ = new le()), T || ht(e) ? Mt(e, i, u, l, m, _) : zt(e, i, E, u, l, m, _);
      if (!(m & I)) {
        var ue = W && me.call(e, "__wrapped__"), he = z && me.call(i, "__wrapped__");
        if (ue || he) {
          var gt = ue ? e.value() : e, Ye = he ? i.value() : i;
          return _ || (_ = new le()), u(gt, Ye, l, m, _);
        }
      }
      return te ? (_ || (_ = new le()), At(e, i, u, l, m, _)) : !1;
    }
    function mr(e, i, u, l) {
      var m = u.length, _ = m;
      if (e == null)
        return !_;
      for (e = Object(e); m--; ) {
        var T = u[m];
        if (T[2] ? T[1] !== e[T[0]] : !(T[0] in e))
          return !1;
      }
      for (; ++m < _; ) {
        T = u[m];
        var F = T[0], E = e[F], M = T[1];
        if (T[2]) {
          if (E === void 0 && !(F in e))
            return !1;
        } else {
          var W = new le(), z;
          if (!(z === void 0 ? Ft(M, E, l, v | I, W) : z))
            return !1;
        }
      }
      return !0;
    }
    function ln(e) {
      if (!we(e) || Or(e))
        return !1;
      var i = ee(e) || ir(e) ? ar : C;
      return i.test(x(e));
    }
    function dn(e) {
      return Ge(e) && de(e.length) && !!b[We.call(e)];
    }
    function br(e) {
      return typeof e == "function" ? e : e == null ? o : typeof e == "object" ? j(e) ? gn(e[0], e[1]) : hn(e) : d(e);
    }
    function Wt(e) {
      if (!vn(e))
        return or(e);
      var i = [];
      for (var u in Object(e))
        me.call(e, u) && u != "constructor" && i.push(u);
      return i;
    }
    function Tt(e, i) {
      var u = -1, l = oe(e) ? Array(e.length) : [];
      return on(e, function(m, _, T) {
        l[++u] = i(m, _, T);
      }), l;
    }
    function hn(e) {
      var i = _n(e);
      return i.length == 1 && i[0][2] ? c(i[0][0], i[0][1]) : function(u) {
        return u === e || mr(u, e, i);
      };
    }
    function gn(e, i) {
      return Lt(e) && s(i) ? c(w(e), i) : function(u) {
        var l = Jt(u, e);
        return l === void 0 && l === i ? Xt(u, e) : Ft(i, l, void 0, v | I);
      };
    }
    function rt(e, i, u) {
      var l = -1;
      i = gr(i.length ? i : [o], pr(br));
      var m = Tt(e, function(_, T, F) {
        var E = gr(i, function(M) {
          return M(_);
        });
        return { criteria: E, index: ++l, value: _ };
      });
      return xr(m, function(_, T) {
        return Tr(_, T, u);
      });
    }
    function wr(e) {
      return function(i) {
        return Kt(i, e);
      };
    }
    function pn(e) {
      if (typeof e == "string")
        return e;
      if (Re(e))
        return qe ? qe.call(e) : "";
      var i = e + "";
      return i == "0" && 1 / e == -1 / 0 ? "-0" : i;
    }
    function Ir(e) {
      return j(e) ? e : p(e);
    }
    function yn(e, i) {
      if (e !== i) {
        var u = e !== void 0, l = e === null, m = e === e, _ = Re(e), T = i !== void 0, F = i === null, E = i === i, M = Re(i);
        if (!F && !M && !_ && e > i || _ && T && E && !F && !M || l && T && E || !u && E || !m)
          return 1;
        if (!l && !_ && !M && e < i || M && u && m && !l && !_ || F && u && m || !T && m || !E)
          return -1;
      }
      return 0;
    }
    function Tr(e, i, u) {
      for (var l = -1, m = e.criteria, _ = i.criteria, T = m.length, F = u.length; ++l < T; ) {
        var E = yn(m[l], _[l]);
        if (E) {
          if (l >= F)
            return E;
          var M = u[l];
          return E * (M == "desc" ? -1 : 1);
        }
      }
      return e.index - i.index;
    }
    function dt(e, i) {
      return function(u, l) {
        if (u == null)
          return u;
        if (!oe(u))
          return e(u, l);
        for (var m = u.length, _ = -1, T = Object(u); ++_ < m && l(T[_], _, T) !== !1; )
          ;
        return u;
      };
    }
    function Ar(e) {
      return function(i, u, l) {
        for (var m = -1, _ = Object(i), T = l(i), F = T.length; F--; ) {
          var E = T[++m];
          if (u(_[E], E, _) === !1)
            break;
        }
        return i;
      };
    }
    function Mt(e, i, u, l, m, _) {
      var T = m & I, F = e.length, E = i.length;
      if (F != E && !(T && E > F))
        return !1;
      var M = _.get(e);
      if (M && _.get(i))
        return M == i;
      var W = -1, z = !0, te = m & v ? new ft() : void 0;
      for (_.set(e, i), _.set(i, e); ++W < F; ) {
        var ue = e[W], he = i[W];
        if (l)
          var gt = T ? l(he, ue, W, i, e, _) : l(ue, he, W, e, i, _);
        if (gt !== void 0) {
          if (gt)
            continue;
          z = !1;
          break;
        }
        if (te) {
          if (!Mr(i, function(Ye, it) {
            if (!te.has(it) && (ue === Ye || u(ue, Ye, l, m, _)))
              return te.add(it);
          })) {
            z = !1;
            break;
          }
        } else if (!(ue === he || u(ue, he, l, m, _))) {
          z = !1;
          break;
        }
      }
      return _.delete(e), _.delete(i), z;
    }
    function zt(e, i, u, l, m, _, T) {
      switch (u) {
        case ye:
          if (e.byteLength != i.byteLength || e.byteOffset != i.byteOffset)
            return !1;
          e = e.buffer, i = i.buffer;
        case Ae:
          return !(e.byteLength != i.byteLength || !l(new yr(e), new yr(i)));
        case q:
        case se:
        case Ie:
          return V(+e, +i);
        case re:
          return e.name == i.name && e.message == i.message;
        case pe:
        case A:
          return e == i + "";
        case $:
          var F = Nr;
        case H:
          var E = _ & I;
          if (F || (F = Bt), e.size != i.size && !E)
            return !1;
          var M = T.get(e);
          if (M)
            return M == i;
          _ |= v, T.set(e, i);
          var W = Mt(F(e), F(i), l, m, _, T);
          return T.delete(e), W;
        case P:
          if (Ct)
            return Ct.call(e) == Ct.call(i);
      }
      return !1;
    }
    function At(e, i, u, l, m, _) {
      var T = m & I, F = t(e), E = F.length, M = t(i), W = M.length;
      if (E != W && !T)
        return !1;
      for (var z = E; z--; ) {
        var te = F[z];
        if (!(T ? te in i : me.call(i, te)))
          return !1;
      }
      var ue = _.get(e);
      if (ue && _.get(i))
        return ue == i;
      var he = !0;
      _.set(e, i), _.set(i, e);
      for (var gt = T; ++z < E; ) {
        te = F[z];
        var Ye = e[te], it = i[te];
        if (l)
          var Hn = T ? l(it, Ye, te, i, e, _) : l(Ye, it, te, e, i, _);
        if (!(Hn === void 0 ? Ye === it || u(Ye, it, l, m, _) : Hn)) {
          he = !1;
          break;
        }
        gt || (gt = te == "constructor");
      }
      if (he && !gt) {
        var Cn = e.constructor, Dn = i.constructor;
        Cn != Dn && "constructor" in e && "constructor" in i && !(typeof Cn == "function" && Cn instanceof Cn && typeof Dn == "function" && Dn instanceof Dn) && (he = !1);
      }
      return _.delete(e), _.delete(i), he;
    }
    function Oe(e, i) {
      var u = e.__data__;
      return Er(i) ? u[typeof i == "string" ? "string" : "hash"] : u.map;
    }
    function _n(e) {
      for (var i = t(e), u = i.length; u--; ) {
        var l = i[u], m = e[l];
        i[u] = [l, m, s(m)];
      }
      return i;
    }
    function nt(e, i) {
      var u = nr(e, i);
      return ln(u) ? u : void 0;
    }
    var Ce = un;
    (ot && Ce(new ot(new ArrayBuffer(1))) != ye || ze && Ce(new ze()) != $ || Je && Ce(Je.resolve()) != Z || ut && Ce(new ut()) != H || Xe && Ce(new Xe()) != k) && (Ce = function(e) {
      var i = We.call(e), u = i == Y ? e.constructor : void 0, l = u ? x(u) : void 0;
      if (l)
        switch (l) {
          case Pt:
            return ye;
          case Br:
            return $;
          case Ur:
            return Z;
          case $r:
            return H;
          case Ht:
            return k;
        }
      return i;
    });
    function Sr(e, i, u) {
      i = Lt(i, e) ? [i] : Ir(i);
      for (var l, m = -1, T = i.length; ++m < T; ) {
        var _ = w(i[m]);
        if (!(l = e != null && u(e, _)))
          break;
        e = e[_];
      }
      if (l)
        return l;
      var T = e ? e.length : 0;
      return !!T && de(T) && St(_, T) && (j(e) || ae(e));
    }
    function St(e, i) {
      return i = i ?? S, !!i && (typeof e == "number" || He.test(e)) && e > -1 && e % 1 == 0 && e < i;
    }
    function Lt(e, i) {
      if (j(e))
        return !1;
      var u = typeof e;
      return u == "number" || u == "symbol" || u == "boolean" || e == null || Re(e) ? !0 : y.test(e) || !bt.test(e) || i != null && e in Object(i);
    }
    function Er(e) {
      var i = typeof e;
      return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? e !== "__proto__" : e === null;
    }
    function Or(e) {
      return !!Ut && Ut in e;
    }
    function vn(e) {
      var i = e && e.constructor, u = typeof i == "function" && i.prototype || ve;
      return e === u;
    }
    function s(e) {
      return e === e && !we(e);
    }
    function c(e, i) {
      return function(u) {
        return u == null ? !1 : u[e] === i && (i !== void 0 || e in Object(u));
      };
    }
    var p = G(function(e) {
      e = xt(e);
      var i = [];
      return O.test(e) && i.push(""), e.replace(B, function(u, l, m, _) {
        i.push(m ? _.replace(Pe, "$1") : l || u);
      }), i;
    });
    function w(e) {
      if (typeof e == "string" || Re(e))
        return e;
      var i = e + "";
      return i == "0" && 1 / e == -1 / 0 ? "-0" : i;
    }
    function x(e) {
      if (e != null) {
        try {
          return Ne.call(e);
        } catch {
        }
        try {
          return e + "";
        } catch {
        }
      }
      return "";
    }
    function R(e, i, u, l) {
      return e == null ? [] : (j(i) || (i = i == null ? [] : [i]), u = l ? void 0 : u, j(u) || (u = u == null ? [] : [u]), rt(e, i, u));
    }
    function G(e, i) {
      if (typeof e != "function" || i && typeof i != "function")
        throw new TypeError(f);
      var u = function() {
        var l = arguments, m = i ? i.apply(this, l) : l[0], _ = u.cache;
        if (_.has(m))
          return _.get(m);
        var T = e.apply(this, l);
        return u.cache = _.set(m, T), T;
      };
      return u.cache = new (G.Cache || be)(), u;
    }
    G.Cache = be;
    function V(e, i) {
      return e === i || e !== e && i !== i;
    }
    function ae(e) {
      return Te(e) && me.call(e, "callee") && (!at.call(e, "callee") || We.call(e) == N);
    }
    var j = Array.isArray;
    function oe(e) {
      return e != null && de(e.length) && !ee(e);
    }
    function Te(e) {
      return Ge(e) && oe(e);
    }
    function ee(e) {
      var i = we(e) ? We.call(e) : "";
      return i == fe || i == Le;
    }
    function de(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= S;
    }
    function we(e) {
      var i = typeof e;
      return !!e && (i == "object" || i == "function");
    }
    function Ge(e) {
      return !!e && typeof e == "object";
    }
    function Re(e) {
      return typeof e == "symbol" || Ge(e) && We.call(e) == P;
    }
    var ht = rr ? pr(rr) : dn;
    function xt(e) {
      return e == null ? "" : pn(e);
    }
    function Jt(e, i, u) {
      var l = e == null ? void 0 : Kt(e, i);
      return l === void 0 ? u : l;
    }
    function Xt(e, i) {
      return e != null && Sr(e, i, cn);
    }
    function t(e) {
      return oe(e) ? Yt(e) : Wt(e);
    }
    function o(e) {
      return e;
    }
    function d(e) {
      return Lt(e) ? Lr(w(e)) : wr(e);
    }
    n.exports = R;
  }(wn, wn.exports)), wn.exports;
}
var Si = Ai();
const ii = /* @__PURE__ */ Ln(Si);
var In = { exports: {} };
In.exports;
var zn;
function Ei() {
  return zn || (zn = 1, function(n, r) {
    var a = 200, f = "Expected a function", g = "__lodash_hash_undefined__", v = 1, I = 2, S = 9007199254740991, N = "[object Arguments]", U = "[object Array]", q = "[object Boolean]", se = "[object Date]", re = "[object Error]", fe = "[object Function]", Le = "[object GeneratorFunction]", $ = "[object Map]", Ie = "[object Number]", Y = "[object Object]", Z = "[object Promise]", pe = "[object RegExp]", H = "[object Set]", A = "[object String]", P = "[object Symbol]", k = "[object WeakMap]", Ae = "[object ArrayBuffer]", ye = "[object DataView]", Ue = "[object Float32Array]", Se = "[object Float64Array]", ne = "[object Int8Array]", xe = "[object Int16Array]", je = "[object Int32Array]", st = "[object Uint8Array]", $e = "[object Uint8ClampedArray]", et = "[object Uint16Array]", tt = "[object Uint32Array]", bt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, y = /^\w*$/, O = /^\./, B = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Q = /[\\^$.*+?()[\]{}|]/g, Pe = /\\(\\)?/g, C = /^\[object .+?Constructor\]$/, He = /^(?:0|[1-9]\d*)$/, b = {};
    b[Ue] = b[Se] = b[ne] = b[xe] = b[je] = b[st] = b[$e] = b[et] = b[tt] = !0, b[N] = b[U] = b[Ae] = b[q] = b[ye] = b[se] = b[re] = b[fe] = b[$] = b[Ie] = b[Y] = b[pe] = b[H] = b[A] = b[k] = !1;
    var D = typeof Me == "object" && Me && Me.Object === Object && Me, _e = typeof self == "object" && self && self.Object === Object && self, K = D || _e || Function("return this")(), wt = r && !r.nodeType && r, Et = wt && !0 && n && !n.nodeType && n, hr = Et && Et.exports === wt, Gt = hr && D.process, tr = function() {
      try {
        return Gt && Gt.binding("util");
      } catch {
      }
    }(), rr = tr && tr.isTypedArray;
    function gr(t, o, d, e) {
      for (var i = -1, u = t ? t.length : 0; ++i < u; ) {
        var l = t[i];
        o(e, l, d(l), t);
      }
      return e;
    }
    function Mr(t, o) {
      for (var d = -1, e = t ? t.length : 0; ++d < e; )
        if (o(t[d], d, t))
          return !0;
      return !1;
    }
    function Lr(t) {
      return function(o) {
        return o == null ? void 0 : o[t];
      };
    }
    function xr(t, o) {
      for (var d = -1, e = Array(t); ++d < t; )
        e[d] = o(d);
      return e;
    }
    function jr(t) {
      return function(o) {
        return t(o);
      };
    }
    function pr(t, o) {
      return t == null ? void 0 : t[o];
    }
    function nr(t) {
      var o = !1;
      if (t != null && typeof t.toString != "function")
        try {
          o = !!(t + "");
        } catch {
        }
      return o;
    }
    function ir(t) {
      var o = -1, d = Array(t.size);
      return t.forEach(function(e, i) {
        d[++o] = [i, e];
      }), d;
    }
    function Nr(t, o) {
      return function(d) {
        return t(o(d));
      };
    }
    function Gr(t) {
      var o = -1, d = Array(t.size);
      return t.forEach(function(e) {
        d[++o] = e;
      }), d;
    }
    var Bt = Array.prototype, sr = Function.prototype, Ot = Object.prototype, ve = K["__core-js_shared__"], Rt = function() {
      var t = /[^.]+$/.exec(ve && ve.keys && ve.keys.IE_PROTO || "");
      return t ? "Symbol(src)_1." + t : "";
    }(), Ut = sr.toString, Ne = Ot.hasOwnProperty, me = Ot.toString, We = RegExp(
      "^" + Ut.call(Ne).replace(Q, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), ar = K.Symbol, $t = K.Uint8Array, yr = Ot.propertyIsEnumerable, at = Bt.splice, _r = Nr(Object.keys, Object), or = At(K, "DataView"), ot = At(K, "Map"), ze = At(K, "Promise"), Je = At(K, "Set"), ut = At(K, "WeakMap"), Xe = At(Object, "create"), ct = c(or), Pt = c(ot), Br = c(ze), Ur = c(Je), $r = c(ut), Ht = ar ? ar.prototype : void 0, It = Ht ? Ht.valueOf : void 0, Ct = Ht ? Ht.toString : void 0;
    function qe(t) {
      var o = -1, d = t ? t.length : 0;
      for (this.clear(); ++o < d; ) {
        var e = t[o];
        this.set(e[0], e[1]);
      }
    }
    function Ee() {
      this.__data__ = Xe ? Xe(null) : {};
    }
    function Hr(t) {
      return this.has(t) && delete this.__data__[t];
    }
    function qr(t) {
      var o = this.__data__;
      if (Xe) {
        var d = o[t];
        return d === g ? void 0 : d;
      }
      return Ne.call(o, t) ? o[t] : void 0;
    }
    function Yr(t) {
      var o = this.__data__;
      return Xe ? o[t] !== void 0 : Ne.call(o, t);
    }
    function Kr(t, o) {
      var d = this.__data__;
      return d[t] = Xe && o === void 0 ? g : o, this;
    }
    qe.prototype.clear = Ee, qe.prototype.delete = Hr, qe.prototype.get = qr, qe.prototype.has = Yr, qe.prototype.set = Kr;
    function Ze(t) {
      var o = -1, d = t ? t.length : 0;
      for (this.clear(); ++o < d; ) {
        var e = t[o];
        this.set(e[0], e[1]);
      }
    }
    function ce() {
      this.__data__ = [];
    }
    function Wr(t) {
      var o = this.__data__, d = Yt(o, t);
      if (d < 0)
        return !1;
      var e = o.length - 1;
      return d == e ? o.pop() : at.call(o, d, 1), !0;
    }
    function zr(t) {
      var o = this.__data__, d = Yt(o, t);
      return d < 0 ? void 0 : o[d][1];
    }
    function Jr(t) {
      return Yt(this.__data__, t) > -1;
    }
    function Xr(t, o) {
      var d = this.__data__, e = Yt(d, t);
      return e < 0 ? d.push([t, o]) : d[e][1] = o, this;
    }
    Ze.prototype.clear = ce, Ze.prototype.delete = Wr, Ze.prototype.get = zr, Ze.prototype.has = Jr, Ze.prototype.set = Xr;
    function Qe(t) {
      var o = -1, d = t ? t.length : 0;
      for (this.clear(); ++o < d; ) {
        var e = t[o];
        this.set(e[0], e[1]);
      }
    }
    function be() {
      this.__data__ = {
        hash: new qe(),
        map: new (ot || Ze)(),
        string: new qe()
      };
    }
    function Zr(t) {
      return Mt(this, t).delete(t);
    }
    function Qr(t) {
      return Mt(this, t).get(t);
    }
    function Vr(t) {
      return Mt(this, t).has(t);
    }
    function kr(t, o) {
      return Mt(this, t).set(t, o), this;
    }
    Qe.prototype.clear = be, Qe.prototype.delete = Zr, Qe.prototype.get = Qr, Qe.prototype.has = Vr, Qe.prototype.set = kr;
    function qt(t) {
      var o = -1, d = t ? t.length : 0;
      for (this.__data__ = new Qe(); ++o < d; )
        this.add(t[o]);
    }
    function ft(t) {
      return this.__data__.set(t, g), this;
    }
    function en(t) {
      return this.__data__.has(t);
    }
    qt.prototype.add = qt.prototype.push = ft, qt.prototype.has = en;
    function Ve(t) {
      this.__data__ = new Ze(t);
    }
    function le() {
      this.__data__ = new Ze();
    }
    function tn(t) {
      return this.__data__.delete(t);
    }
    function rn(t) {
      return this.__data__.get(t);
    }
    function nn(t) {
      return this.__data__.has(t);
    }
    function sn(t, o) {
      var d = this.__data__;
      if (d instanceof Ze) {
        var e = d.__data__;
        if (!ot || e.length < a - 1)
          return e.push([t, o]), this;
        d = this.__data__ = new Qe(e);
      }
      return d.set(t, o), this;
    }
    Ve.prototype.clear = le, Ve.prototype.delete = tn, Ve.prototype.get = rn, Ve.prototype.has = nn, Ve.prototype.set = sn;
    function an(t, o) {
      var d = G(t) || R(t) ? xr(t.length, String) : [], e = d.length, i = !!e;
      for (var u in t)
        Ne.call(t, u) && !(i && (u == "length" || nt(u, e))) && d.push(u);
      return d;
    }
    function Yt(t, o) {
      for (var d = t.length; d--; )
        if (x(t[d][0], o))
          return d;
      return -1;
    }
    function lt(t, o, d, e) {
      return on(t, function(i, u, l) {
        o(e, i, d(i), l);
      }), e;
    }
    var on = Ir(vr), Dt = yn();
    function vr(t, o) {
      return t && Dt(t, o, xt);
    }
    function Kt(t, o) {
      o = Ce(o, t) ? [o] : wr(o);
      for (var d = 0, e = o.length; t != null && d < e; )
        t = t[s(o[d++])];
      return d && d == e ? t : void 0;
    }
    function un(t) {
      return me.call(t);
    }
    function cn(t, o) {
      return t != null && o in Object(t);
    }
    function Ft(t, o, d, e, i) {
      return t === o ? !0 : t == null || o == null || !Te(t) && !ee(o) ? t !== t && o !== o : fn(t, o, Ft, d, e, i);
    }
    function fn(t, o, d, e, i, u) {
      var l = G(t), m = G(o), _ = U, T = U;
      l || (_ = Oe(t), _ = _ == N ? Y : _), m || (T = Oe(o), T = T == N ? Y : T);
      var F = _ == Y && !nr(t), E = T == Y && !nr(o), M = _ == T;
      if (M && !F)
        return u || (u = new Ve()), l || we(t) ? Tr(t, o, d, e, i, u) : dt(t, o, _, d, e, i, u);
      if (!(i & I)) {
        var W = F && Ne.call(t, "__wrapped__"), z = E && Ne.call(o, "__wrapped__");
        if (W || z) {
          var te = W ? t.value() : t, ue = z ? o.value() : o;
          return u || (u = new Ve()), d(te, ue, e, i, u);
        }
      }
      return M ? (u || (u = new Ve()), Ar(t, o, d, e, i, u)) : !1;
    }
    function mr(t, o, d, e) {
      var i = d.length, u = i;
      if (t == null)
        return !u;
      for (t = Object(t); i--; ) {
        var l = d[i];
        if (l[2] ? l[1] !== t[l[0]] : !(l[0] in t))
          return !1;
      }
      for (; ++i < u; ) {
        l = d[i];
        var m = l[0], _ = t[m], T = l[1];
        if (l[2]) {
          if (_ === void 0 && !(m in t))
            return !1;
        } else {
          var F = new Ve(), E;
          if (!(E === void 0 ? Ft(T, _, e, v | I, F) : E))
            return !1;
        }
      }
      return !0;
    }
    function ln(t) {
      if (!Te(t) || St(t))
        return !1;
      var o = j(t) || nr(t) ? We : C;
      return o.test(c(t));
    }
    function dn(t) {
      return ee(t) && oe(t.length) && !!b[me.call(t)];
    }
    function br(t) {
      return typeof t == "function" ? t : t == null ? Jt : typeof t == "object" ? G(t) ? hn(t[0], t[1]) : Tt(t) : Xt(t);
    }
    function Wt(t) {
      if (!Lt(t))
        return _r(t);
      var o = [];
      for (var d in Object(t))
        Ne.call(t, d) && d != "constructor" && o.push(d);
      return o;
    }
    function Tt(t) {
      var o = zt(t);
      return o.length == 1 && o[0][2] ? Or(o[0][0], o[0][1]) : function(d) {
        return d === t || mr(d, t, o);
      };
    }
    function hn(t, o) {
      return Ce(t) && Er(o) ? Or(s(t), o) : function(d) {
        var e = Re(d, t);
        return e === void 0 && e === o ? ht(d, t) : Ft(o, e, void 0, v | I);
      };
    }
    function gn(t) {
      return function(o) {
        return Kt(o, t);
      };
    }
    function rt(t) {
      if (typeof t == "string")
        return t;
      if (de(t))
        return Ct ? Ct.call(t) : "";
      var o = t + "";
      return o == "0" && 1 / t == -1 / 0 ? "-0" : o;
    }
    function wr(t) {
      return G(t) ? t : vn(t);
    }
    function pn(t, o) {
      return function(d, e) {
        var i = G(d) ? gr : lt, u = {};
        return i(d, t, br(e), u);
      };
    }
    function Ir(t, o) {
      return function(d, e) {
        if (d == null)
          return d;
        if (!V(d))
          return t(d, e);
        for (var i = d.length, u = -1, l = Object(d); ++u < i && e(l[u], u, l) !== !1; )
          ;
        return d;
      };
    }
    function yn(t) {
      return function(o, d, e) {
        for (var i = -1, u = Object(o), l = e(o), m = l.length; m--; ) {
          var _ = l[++i];
          if (d(u[_], _, u) === !1)
            break;
        }
        return o;
      };
    }
    function Tr(t, o, d, e, i, u) {
      var l = i & I, m = t.length, _ = o.length;
      if (m != _ && !(l && _ > m))
        return !1;
      var T = u.get(t);
      if (T && u.get(o))
        return T == o;
      var F = -1, E = !0, M = i & v ? new qt() : void 0;
      for (u.set(t, o), u.set(o, t); ++F < m; ) {
        var W = t[F], z = o[F];
        if (e)
          var te = l ? e(z, W, F, o, t, u) : e(W, z, F, t, o, u);
        if (te !== void 0) {
          if (te)
            continue;
          E = !1;
          break;
        }
        if (M) {
          if (!Mr(o, function(ue, he) {
            if (!M.has(he) && (W === ue || d(W, ue, e, i, u)))
              return M.add(he);
          })) {
            E = !1;
            break;
          }
        } else if (!(W === z || d(W, z, e, i, u))) {
          E = !1;
          break;
        }
      }
      return u.delete(t), u.delete(o), E;
    }
    function dt(t, o, d, e, i, u, l) {
      switch (d) {
        case ye:
          if (t.byteLength != o.byteLength || t.byteOffset != o.byteOffset)
            return !1;
          t = t.buffer, o = o.buffer;
        case Ae:
          return !(t.byteLength != o.byteLength || !e(new $t(t), new $t(o)));
        case q:
        case se:
        case Ie:
          return x(+t, +o);
        case re:
          return t.name == o.name && t.message == o.message;
        case pe:
        case A:
          return t == o + "";
        case $:
          var m = ir;
        case H:
          var _ = u & I;
          if (m || (m = Gr), t.size != o.size && !_)
            return !1;
          var T = l.get(t);
          if (T)
            return T == o;
          u |= v, l.set(t, o);
          var F = Tr(m(t), m(o), e, i, u, l);
          return l.delete(t), F;
        case P:
          if (It)
            return It.call(t) == It.call(o);
      }
      return !1;
    }
    function Ar(t, o, d, e, i, u) {
      var l = i & I, m = xt(t), _ = m.length, T = xt(o), F = T.length;
      if (_ != F && !l)
        return !1;
      for (var E = _; E--; ) {
        var M = m[E];
        if (!(l ? M in o : Ne.call(o, M)))
          return !1;
      }
      var W = u.get(t);
      if (W && u.get(o))
        return W == o;
      var z = !0;
      u.set(t, o), u.set(o, t);
      for (var te = l; ++E < _; ) {
        M = m[E];
        var ue = t[M], he = o[M];
        if (e)
          var gt = l ? e(he, ue, M, o, t, u) : e(ue, he, M, t, o, u);
        if (!(gt === void 0 ? ue === he || d(ue, he, e, i, u) : gt)) {
          z = !1;
          break;
        }
        te || (te = M == "constructor");
      }
      if (z && !te) {
        var Ye = t.constructor, it = o.constructor;
        Ye != it && "constructor" in t && "constructor" in o && !(typeof Ye == "function" && Ye instanceof Ye && typeof it == "function" && it instanceof it) && (z = !1);
      }
      return u.delete(t), u.delete(o), z;
    }
    function Mt(t, o) {
      var d = t.__data__;
      return Sr(o) ? d[typeof o == "string" ? "string" : "hash"] : d.map;
    }
    function zt(t) {
      for (var o = xt(t), d = o.length; d--; ) {
        var e = o[d], i = t[e];
        o[d] = [e, i, Er(i)];
      }
      return o;
    }
    function At(t, o) {
      var d = pr(t, o);
      return ln(d) ? d : void 0;
    }
    var Oe = un;
    (or && Oe(new or(new ArrayBuffer(1))) != ye || ot && Oe(new ot()) != $ || ze && Oe(ze.resolve()) != Z || Je && Oe(new Je()) != H || ut && Oe(new ut()) != k) && (Oe = function(t) {
      var o = me.call(t), d = o == Y ? t.constructor : void 0, e = d ? c(d) : void 0;
      if (e)
        switch (e) {
          case ct:
            return ye;
          case Pt:
            return $;
          case Br:
            return Z;
          case Ur:
            return H;
          case $r:
            return k;
        }
      return o;
    });
    function _n(t, o, d) {
      o = Ce(o, t) ? [o] : wr(o);
      for (var e, i = -1, l = o.length; ++i < l; ) {
        var u = s(o[i]);
        if (!(e = t != null && d(t, u)))
          break;
        t = t[u];
      }
      if (e)
        return e;
      var l = t ? t.length : 0;
      return !!l && oe(l) && nt(u, l) && (G(t) || R(t));
    }
    function nt(t, o) {
      return o = o ?? S, !!o && (typeof t == "number" || He.test(t)) && t > -1 && t % 1 == 0 && t < o;
    }
    function Ce(t, o) {
      if (G(t))
        return !1;
      var d = typeof t;
      return d == "number" || d == "symbol" || d == "boolean" || t == null || de(t) ? !0 : y.test(t) || !bt.test(t) || o != null && t in Object(o);
    }
    function Sr(t) {
      var o = typeof t;
      return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? t !== "__proto__" : t === null;
    }
    function St(t) {
      return !!Rt && Rt in t;
    }
    function Lt(t) {
      var o = t && t.constructor, d = typeof o == "function" && o.prototype || Ot;
      return t === d;
    }
    function Er(t) {
      return t === t && !Te(t);
    }
    function Or(t, o) {
      return function(d) {
        return d == null ? !1 : d[t] === o && (o !== void 0 || t in Object(d));
      };
    }
    var vn = w(function(t) {
      t = Ge(t);
      var o = [];
      return O.test(t) && o.push(""), t.replace(B, function(d, e, i, u) {
        o.push(i ? u.replace(Pe, "$1") : e || d);
      }), o;
    });
    function s(t) {
      if (typeof t == "string" || de(t))
        return t;
      var o = t + "";
      return o == "0" && 1 / t == -1 / 0 ? "-0" : o;
    }
    function c(t) {
      if (t != null) {
        try {
          return Ut.call(t);
        } catch {
        }
        try {
          return t + "";
        } catch {
        }
      }
      return "";
    }
    var p = pn(function(t, o, d) {
      Ne.call(t, d) ? t[d].push(o) : t[d] = [o];
    });
    function w(t, o) {
      if (typeof t != "function" || o && typeof o != "function")
        throw new TypeError(f);
      var d = function() {
        var e = arguments, i = o ? o.apply(this, e) : e[0], u = d.cache;
        if (u.has(i))
          return u.get(i);
        var l = t.apply(this, e);
        return d.cache = u.set(i, l), l;
      };
      return d.cache = new (w.Cache || Qe)(), d;
    }
    w.Cache = Qe;
    function x(t, o) {
      return t === o || t !== t && o !== o;
    }
    function R(t) {
      return ae(t) && Ne.call(t, "callee") && (!yr.call(t, "callee") || me.call(t) == N);
    }
    var G = Array.isArray;
    function V(t) {
      return t != null && oe(t.length) && !j(t);
    }
    function ae(t) {
      return ee(t) && V(t);
    }
    function j(t) {
      var o = Te(t) ? me.call(t) : "";
      return o == fe || o == Le;
    }
    function oe(t) {
      return typeof t == "number" && t > -1 && t % 1 == 0 && t <= S;
    }
    function Te(t) {
      var o = typeof t;
      return !!t && (o == "object" || o == "function");
    }
    function ee(t) {
      return !!t && typeof t == "object";
    }
    function de(t) {
      return typeof t == "symbol" || ee(t) && me.call(t) == P;
    }
    var we = rr ? jr(rr) : dn;
    function Ge(t) {
      return t == null ? "" : rt(t);
    }
    function Re(t, o, d) {
      var e = t == null ? void 0 : Kt(t, o);
      return e === void 0 ? d : e;
    }
    function ht(t, o) {
      return t != null && _n(t, o, cn);
    }
    function xt(t) {
      return V(t) ? an(t) : Wt(t);
    }
    function Jt(t) {
      return t;
    }
    function Xt(t) {
      return Ce(t) ? Lr(s(t)) : gn(t);
    }
    n.exports = p;
  }(In, In.exports)), In.exports;
}
var Oi = Ei();
const Ri = /* @__PURE__ */ Ln(Oi);
var Zt, Qt;
class Pi {
  constructor({ initialGroupBy: r, requireGroup: a }, f) {
    J(this, Zt);
    J(this, Qt);
    L(this, Qt, f), L(this, Zt, Be(r, this.rules)), this.requireGroup = a;
  }
  get rules() {
    return h(this, Qt).getRules().filter(ri);
  }
  get activeRule() {
    const r = this.requireGroup ? this.rules.at(0) : void 0;
    return h(this, Zt) ?? r;
  }
  set(r) {
    if (h(this, Qt).isDisabled())
      return;
    const a = h(this, Zt);
    let f;
    const g = typeof r == "string" && r.trim() === "";
    g && (f = void 0), g === !1 && r !== void 0 && (f = Be(r, this.rules)), h(this, Zt) !== f && (L(this, Zt, f), this.groupIdSortDirection = void 0, h(this, Qt).touch({
      source: "groupBy",
      event: "change.groupBy.set",
      current: { rule: f },
      initial: { rule: a }
    }));
  }
  setGroupIdSortDirection(r) {
    const a = this.groupIdSortDirection;
    this.groupIdSortDirection = r, h(this, Qt).touch({
      source: "groupBy",
      event: "change.groupBy.setGroupIdSortDirection",
      current: { groupIdSortDirection: r },
      initial: { groupIdSortDirection: a }
    });
  }
  process(r, a) {
    var N;
    if (this.activeRule === void 0)
      return [];
    const f = Ri(r, (U) => {
      var se;
      const q = (se = this.activeRule) == null ? void 0 : se.groupFn(U, a);
      if (q === void 0)
        throw new Error("groupFn did not return a value.");
      return q;
    }), g = Object.keys(f).map((U) => ({
      id: String(U),
      items: f[U] ?? []
    })), v = this.activeRule.sticky !== void 0, I = [], S = [];
    return v && (I.push(Ci(this.activeRule)), S.push("asc")), (N = this.activeRule) != null && N.sortGroupIdFn && (I.push(this.activeRule.sortGroupIdFn), S.push(this.groupIdSortDirection ?? "asc")), I.length > 0 ? ii(g, I, S ?? "desc") : g;
  }
}
Zt = new WeakMap(), Qt = new WeakMap();
function Ci(n) {
  var f, g, v, I;
  let r = [];
  ((f = n == null ? void 0 : n.sticky) == null ? void 0 : f.header) !== void 0 && (Array.isArray(n.sticky.header) && (r = n.sticky.header), typeof n.sticky.header == "string" && (r = [(g = n == null ? void 0 : n.sticky) == null ? void 0 : g.header]));
  let a = [];
  return ((v = n == null ? void 0 : n.sticky) == null ? void 0 : v.footer) !== void 0 && (Array.isArray(n.sticky.footer) && (a = n.sticky.footer), typeof n.sticky.footer == "string" && (a = [(I = n == null ? void 0 : n.sticky) == null ? void 0 : I.footer])), (S) => {
    if (r.includes(S.id)) {
      const N = r.findIndex((q) => S.id === q);
      return (r.length - N) * -1;
    }
    return a.includes(S.id) ? 1 + a.findIndex((U) => S.id === U) : 0;
  };
}
function si(n) {
  return {
    activeRule: n.activeRule,
    requireGroup: n.requireGroup,
    rules: n.rules,
    groupIdSortDirection: n.groupIdSortDirection
  };
}
function Di(n) {
  return {
    ...si(n),
    set: n.set.bind(n),
    toggle: (r) => {
      const a = Be(r, n.rules);
      if (n.activeRule === a) {
        n.set(void 0);
        return;
      }
      n.set(a);
    },
    setGroupIdSortDirection: n.setGroupIdSortDirection.bind(n),
    reset: () => {
      n.setGroupIdSortDirection(void 0), n.set(void 0);
    }
  };
}
var lr;
class Fi {
  constructor({ initialMeta: r }, a) {
    J(this, lr);
    this.meta = r || {}, L(this, lr, a);
  }
  set(r, a) {
    const f = this.get(r);
    this.meta = { ...this.meta, [r]: a }, h(this, lr).touch({
      source: "meta",
      event: "change.meta.set",
      current: { key: r, value: a },
      initial: { key: r, value: f }
    });
  }
  get(r) {
    var a;
    return (a = this.meta) == null ? void 0 : a[r];
  }
  has(r) {
    var a;
    return ((a = this.meta) == null ? void 0 : a[r]) !== void 0;
  }
  delete(r) {
    const a = this.get(r), f = { ...this.meta };
    delete f[r], this.meta = f, h(this, lr).touch({
      source: "meta",
      event: "change.meta.delete",
      current: { key: r, value: void 0 },
      initial: { key: r, value: a }
    });
  }
  reset() {
    const r = this.meta;
    this.meta = {}, h(this, lr).touch({
      source: "meta",
      event: "change.meta.reset",
      current: { meta: this.meta },
      initial: { meta: r }
    });
  }
  get value() {
    return this.meta;
  }
}
lr = new WeakMap();
function ai(n) {
  return { value: n.value, get: n.get.bind(n), has: n.has.bind(n) };
}
function Mi(n) {
  return {
    ...ai(n),
    set: n.set.bind(n),
    delete: n.delete.bind(n),
    reset: n.reset.bind(n)
  };
}
var ke, Pr, dr;
class Li {
  constructor({ page: r, numItemsPerPage: a }, f) {
    J(this, ke);
    J(this, Pr);
    J(this, dr);
    L(this, ke, r ?? 1), this.numItemsPerPage = a, L(this, dr, f), L(this, Pr, f.getItems().length);
  }
  setPage(r) {
    if (r !== h(this, ke)) {
      const a = h(this, ke);
      L(this, ke, r), h(this, dr).touch({
        source: "pagination",
        event: "change.pagination.setPage",
        current: { page: h(this, ke) },
        initial: { page: a }
      });
    }
  }
  setNumItemsPerPage(r) {
    if (r !== this.numItemsPerPage) {
      const a = this.numItemsPerPage;
      this.numItemsPerPage = r, h(this, dr).touch({
        source: "pagination",
        event: "change.pagination.setNumItemsPerPage",
        current: { numItemsPerPage: this.numItemsPerPage },
        initial: { numItemsPerPage: a }
      });
    }
  }
  get lastPage() {
    if (!(h(this, ke) === void 0 || this.numItemsPerPage === void 0))
      return Math.ceil(h(this, Pr) / this.numItemsPerPage);
  }
  get numTotalItems() {
    return h(this, dr).getItems().length;
  }
  get page() {
    return this.numItemsPerPage && this.lastPage ? jn(h(this, ke), 1, this.lastPage) : h(this, ke);
  }
  get offset() {
    return this.numItemsPerPage && this.lastPage ? (jn(h(this, ke), 1, this.lastPage) - 1) * this.numItemsPerPage : 0;
  }
  process(r) {
    if (this.numItemsPerPage === void 0)
      return r;
    let a = h(this, ke) ?? 1;
    L(this, Pr, r.length);
    const f = Math.ceil(r.length / this.numItemsPerPage), v = (jn(a, 1, f) - 1) * this.numItemsPerPage;
    return r.slice(v, v + this.numItemsPerPage);
  }
}
ke = new WeakMap(), Pr = new WeakMap(), dr = new WeakMap();
function xi(n) {
  return {
    page: n.page,
    offset: n.offset,
    numItemsPerPage: n.numItemsPerPage,
    numTotalItems: n.numTotalItems,
    lastPage: n.lastPage,
    isPaginated: n.numItemsPerPage !== void 0
  };
}
function ji(n) {
  return {
    ...xi(n),
    setPage: n.setPage.bind(n),
    setNumItemsPerPage: n.setNumItemsPerPage.bind(n)
  };
}
var Vt;
class Ni {
  constructor(r, a, f) {
    J(this, Vt, []);
    const g = a();
    L(this, Vt, r.map((v) => {
      let I;
      if (typeof v == "object" ? I = v : typeof v == "function" && (Gi(v) ? I = Reflect.construct(v, []) : I = v()), I === void 0)
        throw new Error("Unrecognized plugin format received.");
      return I.register(g, f), I;
    }));
  }
  get(r) {
    let a;
    if (typeof r == "string" && (a = h(this, Vt).find((f) => f.id === r)), typeof r == "object" && (a = h(this, Vt).find((f) => f.id === r.id)), !a)
      throw new Error("Finder was unable to locate requested plugin.");
    return a;
  }
  has(r) {
    try {
      return this.get(r), !0;
    } catch {
      return !1;
    }
  }
  /**
   * Notify all plugins that Finder is alive
   */
  onInit(r) {
    h(this, Vt).forEach((a) => {
      a.onInit && a.onInit(r);
    });
  }
  onFirstUserInteraction(r) {
    h(this, Vt).forEach((a) => {
      a.onFirstUserInteraction && a.onFirstUserInteraction(r);
    });
  }
}
Vt = new WeakMap();
function Gi(n) {
  if (typeof n != "function")
    return !1;
  try {
    Reflect.construct(n, []);
  } catch {
    return !1;
  }
  return !0;
}
var pt, Ke;
class Bi {
  constructor({ initialSearchTerm: r }, a) {
    J(this, pt);
    J(this, Ke);
    L(this, pt, r || ""), L(this, Ke, a);
  }
  get searchTerm() {
    return h(this, pt);
  }
  get rule() {
    return h(this, Ke).getRules().find(An);
  }
  get hasSearchRule() {
    return h(this, Ke).getRules().some(An);
  }
  setSearchTerm(r) {
    const a = h(this, Ke).getRules().find(An);
    if (!a)
      throw new Error("Finder could not locate a searchRule.");
    h(this, Ke).debouncer.has("_search") === !1 && h(this, Ke).debouncer.register("_search", a == null ? void 0 : a.debounceDelay), h(this, Ke).debouncer.call("_search", () => {
      if (h(this, Ke).isDisabled())
        return;
      const f = h(this, pt);
      L(this, pt, r), h(this, Ke).touch({
        source: "search",
        event: "change.search.setSearchTerm",
        current: { searchTerm: r },
        initial: { searchTerm: f }
      });
    });
  }
  reset() {
    if (h(this, Ke).isDisabled())
      return;
    const r = h(this, pt);
    L(this, pt, ""), h(this, Ke).touch({
      source: "search",
      event: "change.search.reset",
      current: { searchTerm: "" },
      initial: { searchTerm: r }
    });
  }
  process(r, a) {
    return h(this, pt) === "" || this.rule === void 0 ? r : r.filter((f) => {
      var g;
      return (g = this.rule) == null ? void 0 : g.searchFn(f, h(this, pt), a);
    });
  }
}
pt = new WeakMap(), Ke = new WeakMap();
function oi(n) {
  return {
    searchTerm: n.searchTerm,
    activeRule: n.rule,
    hasSearchTerm: n.searchTerm !== ""
  };
}
function Ui(n) {
  return {
    ...oi(n),
    setSearchTerm: n.setSearchTerm.bind(n),
    reset: n.reset.bind(n)
  };
}
class $i {
  constructor({ initialSelectedItems: r, maxSelectedItems: a }, f) {
    this.selectedItems = r || [], this.maxSelectedItems = a, this.deps = f;
  }
  setMaxSelectedItems(r) {
    if (r !== this.maxSelectedItems) {
      const a = this.maxSelectedItems;
      this.maxSelectedItems = r, this.deps.touch({
        source: "selectedItems",
        event: "change.selectedItems.setMaxSelectedItems",
        current: { maxSelectedItems: this.maxSelectedItems },
        initial: { maxSelectedItems: a }
      });
    }
  }
  set(r) {
    const a = this.selectedItems;
    this.selectedItems = r, this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.set",
      current: { selectedItems: this.selectedItems },
      initial: { selectedItems: a }
    });
  }
  select(r) {
    if (this.deps.isDisabled())
      return;
    const a = this.maxSelectedItems !== void 0 && this.selectedItems.length >= this.maxSelectedItems, f = this.selectedItems.includes(r);
    a || f || (this.selectedItems = [...this.selectedItems.filter((g) => r !== g), r], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.select",
      current: { item: r },
      initial: { item: r }
    }));
  }
  /**
   * Select a single item and clear any other selected items.
   */
  selectOnly(r) {
    this.deps.isDisabled() || this.selectedItems.includes(r) || (this.selectedItems = [], this.select(r));
  }
  toggle(r) {
    var f;
    if (this.deps.isDisabled())
      return;
    const a = this.selectedItems.includes(r);
    a ? this.selectedItems = (f = this.selectedItems) == null ? void 0 : f.filter((g) => g !== r) : this.selectedItems = [...this.selectedItems, r], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.toggle",
      current: { item: r, is_selected: !a },
      initial: { item: r, is_selected: a }
    });
  }
  toggleOnly(r) {
    if (this.deps.isDisabled())
      return;
    const a = this.selectedItems.includes(r);
    a ? this.selectedItems = [] : this.selectedItems = [r], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.toggle",
      current: { item: r, is_selected: !a },
      initial: { item: r, is_selected: a }
    });
  }
  delete(r) {
    var a;
    this.deps.isDisabled() || (this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.delete",
      current: { item: r, is_selected: !1 },
      initial: { item: r, is_selected: !0 }
    }), this.set((a = this.selectedItems) == null ? void 0 : a.filter((f) => f !== r)));
  }
  reset() {
    if (this.deps.isDisabled())
      return;
    const r = this.selectedItems;
    this.selectedItems = [], this.deps.touch({
      source: "selectedItems",
      event: "change.selectedItems.reset",
      current: { selectedItems: [] },
      initial: { selectedItems: r }
    });
  }
}
function ui(n) {
  return { items: n.selectedItems, maxSelectedItems: n.maxSelectedItems, isSelected: (r) => n.selectedItems.includes(r) };
}
function Hi(n) {
  return {
    ...ui(n),
    setMaxSelectedItems: n.setMaxSelectedItems.bind(n),
    select: n.select.bind(n),
    selectOnly: n.selectOnly.bind(n),
    delete: n.delete.bind(n),
    toggle: n.toggle.bind(n),
    toggleOnly: n.toggleOnly.bind(n),
    reset: n.reset.bind(n)
  };
}
var kt, yt, jt;
class qi {
  constructor({ initialSortBy: r, initialSortDirection: a }, f) {
    J(this, kt);
    J(this, yt);
    J(this, jt);
    L(this, jt, f), L(this, kt, Be(r, this.rules)), L(this, yt, a);
  }
  get rules() {
    return h(this, jt).getRules().filter(ei);
  }
  get activeRule() {
    const r = this.rules.at(0);
    return h(this, kt) ?? r;
  }
  get sortDirection() {
    var r;
    return h(this, yt) ?? ((r = this.activeRule) == null ? void 0 : r.defaultSortDirection) ?? "asc";
  }
  get userHasSetSortDirection() {
    return h(this, yt) !== null;
  }
  setSortDirection(r) {
    if (h(this, jt).isDisabled() || !this.activeRule)
      return;
    const a = h(this, yt);
    L(this, yt, r), h(this, jt).touch({
      source: "sortBy",
      event: "change.sortBy.setSortDirection",
      current: { sortDirection: r },
      initial: { sortDirection: a }
    });
  }
  set(r, a) {
    if (h(this, jt).isDisabled() || !this.activeRule)
      return;
    const f = h(this, yt), g = h(this, kt), v = Be(r, this.rules);
    L(this, kt, v), L(this, yt, a), h(this, jt).touch({
      source: "sortBy",
      event: "change.sortBy.set",
      current: { rule: v, sortDirection: a },
      initial: { rule: g, sortDirection: f }
    });
  }
  process(r) {
    const a = this.rules.at(0), f = h(this, kt) ?? a;
    if (f === void 0)
      return r;
    const g = h(this, yt) ?? f.defaultSortDirection;
    return ii(r, f.sortFn, g);
  }
}
kt = new WeakMap(), yt = new WeakMap(), jt = new WeakMap();
function ci(n) {
  return {
    activeRule: n.activeRule,
    sortDirection: n.sortDirection,
    userHasSetSortDirection: n.userHasSetSortDirection,
    rules: n.rules
  };
}
function Yi(n) {
  return {
    ...ci(n),
    set: n.set.bind(n),
    setSortDirection: n.setSortDirection.bind(n),
    // rotate between the rule default, desc, and asc.
    cycleSortDirection: () => {
      var a;
      const r = n.sortDirection ?? ((a = n.activeRule) == null ? void 0 : a.defaultSortDirection);
      if (r === void 0) {
        n.setSortDirection("desc");
        return;
      }
      if (r === "desc") {
        n.setSortDirection("asc");
        return;
      }
      n.setSortDirection(void 0);
    },
    // flip between desc and asc.
    toggleSortDirection: () => {
      var a;
      if ((n.sortDirection ?? ((a = n.activeRule) == null ? void 0 : a.defaultSortDirection)) === "desc") {
        n.setSortDirection("asc");
        return;
      }
      n.setSortDirection("desc");
    },
    reset() {
      n.set(void 0, void 0);
    }
  };
}
var _t, Cr;
class Ki {
  constructor() {
    J(this, _t, {});
    J(this, Cr, !1);
  }
  on(r, a) {
    h(this, _t)[r] === void 0 && (h(this, _t)[r] = []), h(this, _t)[r].push(a);
  }
  off(r, a) {
    if (h(this, _t)[r] !== void 0) {
      if (a === void 0) {
        delete h(this, _t)[r];
        return;
      }
      h(this, _t)[r] = h(this, _t)[r].filter((f) => f !== a);
    }
  }
  emit(r, a) {
    var f;
    h(this, Cr) || (f = h(this, _t)[r]) == null || f.forEach((g) => g(a));
  }
  silently(r) {
    L(this, Cr, !0), r(), L(this, Cr, !1);
  }
}
_t = new WeakMap(), Cr = new WeakMap();
var Nn, Jn;
function Wi() {
  if (Jn) return Nn;
  Jn = 1;
  var n = "Expected a function", r = NaN, a = "[object Symbol]", f = /^\s+|\s+$/g, g = /^[-+]0x[0-9a-f]+$/i, v = /^0b[01]+$/i, I = /^0o[0-7]+$/i, S = parseInt, N = typeof Me == "object" && Me && Me.Object === Object && Me, U = typeof self == "object" && self && self.Object === Object && self, q = N || U || Function("return this")(), se = Object.prototype, re = se.toString, fe = Math.max, Le = Math.min, $ = function() {
    return q.Date.now();
  };
  function Ie(A, P, k) {
    var Ae, ye, Ue, Se, ne, xe, je = 0, st = !1, $e = !1, et = !0;
    if (typeof A != "function")
      throw new TypeError(n);
    P = H(P) || 0, Y(k) && (st = !!k.leading, $e = "maxWait" in k, Ue = $e ? fe(H(k.maxWait) || 0, P) : Ue, et = "trailing" in k ? !!k.trailing : et);
    function tt(b) {
      var D = Ae, _e = ye;
      return Ae = ye = void 0, je = b, Se = A.apply(_e, D), Se;
    }
    function bt(b) {
      return je = b, ne = setTimeout(B, P), st ? tt(b) : Se;
    }
    function y(b) {
      var D = b - xe, _e = b - je, K = P - D;
      return $e ? Le(K, Ue - _e) : K;
    }
    function O(b) {
      var D = b - xe, _e = b - je;
      return xe === void 0 || D >= P || D < 0 || $e && _e >= Ue;
    }
    function B() {
      var b = $();
      if (O(b))
        return Q(b);
      ne = setTimeout(B, y(b));
    }
    function Q(b) {
      return ne = void 0, et && Ae ? tt(b) : (Ae = ye = void 0, Se);
    }
    function Pe() {
      ne !== void 0 && clearTimeout(ne), je = 0, Ae = xe = ye = ne = void 0;
    }
    function C() {
      return ne === void 0 ? Se : Q($());
    }
    function He() {
      var b = $(), D = O(b);
      if (Ae = arguments, ye = this, xe = b, D) {
        if (ne === void 0)
          return bt(xe);
        if ($e)
          return ne = setTimeout(B, P), tt(xe);
      }
      return ne === void 0 && (ne = setTimeout(B, P)), Se;
    }
    return He.cancel = Pe, He.flush = C, He;
  }
  function Y(A) {
    var P = typeof A;
    return !!A && (P == "object" || P == "function");
  }
  function Z(A) {
    return !!A && typeof A == "object";
  }
  function pe(A) {
    return typeof A == "symbol" || Z(A) && re.call(A) == a;
  }
  function H(A) {
    if (typeof A == "number")
      return A;
    if (pe(A))
      return r;
    if (Y(A)) {
      var P = typeof A.valueOf == "function" ? A.valueOf() : A;
      A = Y(P) ? P + "" : P;
    }
    if (typeof A != "string")
      return A === 0 ? A : +A;
    A = A.replace(f, "");
    var k = v.test(A);
    return k || I.test(A) ? S(A.slice(2), k ? 2 : 8) : g.test(A) ? r : +A;
  }
  return Nn = Ie, Nn;
}
var zi = Wi();
const Ji = /* @__PURE__ */ Ln(zi);
var Dr;
class Xi {
  constructor() {
    J(this, Dr, {});
  }
  register(r, a) {
    h(this, Dr)[r] = {
      debounceFn: a ? Ji((f) => f(), a) : (f) => f(),
      delay: a
    };
  }
  has(r) {
    return h(this, Dr)[r] !== void 0;
  }
  call(r, a) {
    var f;
    (f = h(this, Dr)[r]) == null || f.debounceFn(a);
  }
}
Dr = new WeakMap();
var Tn = { exports: {} };
Tn.exports;
var Xn;
function Zi() {
  return Xn || (Xn = 1, function(n, r) {
    var a = 200, f = "__lodash_hash_undefined__", g = 1, v = 2, I = 9007199254740991, S = "[object Arguments]", N = "[object Array]", U = "[object AsyncFunction]", q = "[object Boolean]", se = "[object Date]", re = "[object Error]", fe = "[object Function]", Le = "[object GeneratorFunction]", $ = "[object Map]", Ie = "[object Number]", Y = "[object Null]", Z = "[object Object]", pe = "[object Promise]", H = "[object Proxy]", A = "[object RegExp]", P = "[object Set]", k = "[object String]", Ae = "[object Symbol]", ye = "[object Undefined]", Ue = "[object WeakMap]", Se = "[object ArrayBuffer]", ne = "[object DataView]", xe = "[object Float32Array]", je = "[object Float64Array]", st = "[object Int8Array]", $e = "[object Int16Array]", et = "[object Int32Array]", tt = "[object Uint8Array]", bt = "[object Uint8ClampedArray]", y = "[object Uint16Array]", O = "[object Uint32Array]", B = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, Pe = /^(?:0|[1-9]\d*)$/, C = {};
    C[xe] = C[je] = C[st] = C[$e] = C[et] = C[tt] = C[bt] = C[y] = C[O] = !0, C[S] = C[N] = C[Se] = C[q] = C[ne] = C[se] = C[re] = C[fe] = C[$] = C[Ie] = C[Z] = C[A] = C[P] = C[k] = C[Ue] = !1;
    var He = typeof Me == "object" && Me && Me.Object === Object && Me, b = typeof self == "object" && self && self.Object === Object && self, D = He || b || Function("return this")(), _e = r && !r.nodeType && r, K = _e && !0 && n && !n.nodeType && n, wt = K && K.exports === _e, Et = wt && He.process, hr = function() {
      try {
        return Et && Et.binding && Et.binding("util");
      } catch {
      }
    }(), Gt = hr && hr.isTypedArray;
    function tr(s, c) {
      for (var p = -1, w = s == null ? 0 : s.length, x = 0, R = []; ++p < w; ) {
        var G = s[p];
        c(G, p, s) && (R[x++] = G);
      }
      return R;
    }
    function rr(s, c) {
      for (var p = -1, w = c.length, x = s.length; ++p < w; )
        s[x + p] = c[p];
      return s;
    }
    function gr(s, c) {
      for (var p = -1, w = s == null ? 0 : s.length; ++p < w; )
        if (c(s[p], p, s))
          return !0;
      return !1;
    }
    function Mr(s, c) {
      for (var p = -1, w = Array(s); ++p < s; )
        w[p] = c(p);
      return w;
    }
    function Lr(s) {
      return function(c) {
        return s(c);
      };
    }
    function xr(s, c) {
      return s.has(c);
    }
    function jr(s, c) {
      return s == null ? void 0 : s[c];
    }
    function pr(s) {
      var c = -1, p = Array(s.size);
      return s.forEach(function(w, x) {
        p[++c] = [x, w];
      }), p;
    }
    function nr(s, c) {
      return function(p) {
        return s(c(p));
      };
    }
    function ir(s) {
      var c = -1, p = Array(s.size);
      return s.forEach(function(w) {
        p[++c] = w;
      }), p;
    }
    var Nr = Array.prototype, Gr = Function.prototype, Bt = Object.prototype, sr = D["__core-js_shared__"], Ot = Gr.toString, ve = Bt.hasOwnProperty, Rt = function() {
      var s = /[^.]+$/.exec(sr && sr.keys && sr.keys.IE_PROTO || "");
      return s ? "Symbol(src)_1." + s : "";
    }(), Ut = Bt.toString, Ne = RegExp(
      "^" + Ot.call(ve).replace(B, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), me = wt ? D.Buffer : void 0, We = D.Symbol, ar = D.Uint8Array, $t = Bt.propertyIsEnumerable, yr = Nr.splice, at = We ? We.toStringTag : void 0, _r = Object.getOwnPropertySymbols, or = me ? me.isBuffer : void 0, ot = nr(Object.keys, Object), ze = Tt(D, "DataView"), Je = Tt(D, "Map"), ut = Tt(D, "Promise"), Xe = Tt(D, "Set"), ct = Tt(D, "WeakMap"), Pt = Tt(Object, "create"), Br = dt(ze), Ur = dt(Je), $r = dt(ut), Ht = dt(Xe), It = dt(ct), Ct = We ? We.prototype : void 0, qe = Ct ? Ct.valueOf : void 0;
    function Ee(s) {
      var c = -1, p = s == null ? 0 : s.length;
      for (this.clear(); ++c < p; ) {
        var w = s[c];
        this.set(w[0], w[1]);
      }
    }
    function Hr() {
      this.__data__ = Pt ? Pt(null) : {}, this.size = 0;
    }
    function qr(s) {
      var c = this.has(s) && delete this.__data__[s];
      return this.size -= c ? 1 : 0, c;
    }
    function Yr(s) {
      var c = this.__data__;
      if (Pt) {
        var p = c[s];
        return p === f ? void 0 : p;
      }
      return ve.call(c, s) ? c[s] : void 0;
    }
    function Kr(s) {
      var c = this.__data__;
      return Pt ? c[s] !== void 0 : ve.call(c, s);
    }
    function Ze(s, c) {
      var p = this.__data__;
      return this.size += this.has(s) ? 0 : 1, p[s] = Pt && c === void 0 ? f : c, this;
    }
    Ee.prototype.clear = Hr, Ee.prototype.delete = qr, Ee.prototype.get = Yr, Ee.prototype.has = Kr, Ee.prototype.set = Ze;
    function ce(s) {
      var c = -1, p = s == null ? 0 : s.length;
      for (this.clear(); ++c < p; ) {
        var w = s[c];
        this.set(w[0], w[1]);
      }
    }
    function Wr() {
      this.__data__ = [], this.size = 0;
    }
    function zr(s) {
      var c = this.__data__, p = lt(c, s);
      if (p < 0)
        return !1;
      var w = c.length - 1;
      return p == w ? c.pop() : yr.call(c, p, 1), --this.size, !0;
    }
    function Jr(s) {
      var c = this.__data__, p = lt(c, s);
      return p < 0 ? void 0 : c[p][1];
    }
    function Xr(s) {
      return lt(this.__data__, s) > -1;
    }
    function Qe(s, c) {
      var p = this.__data__, w = lt(p, s);
      return w < 0 ? (++this.size, p.push([s, c])) : p[w][1] = c, this;
    }
    ce.prototype.clear = Wr, ce.prototype.delete = zr, ce.prototype.get = Jr, ce.prototype.has = Xr, ce.prototype.set = Qe;
    function be(s) {
      var c = -1, p = s == null ? 0 : s.length;
      for (this.clear(); ++c < p; ) {
        var w = s[c];
        this.set(w[0], w[1]);
      }
    }
    function Zr() {
      this.size = 0, this.__data__ = {
        hash: new Ee(),
        map: new (Je || ce)(),
        string: new Ee()
      };
    }
    function Qr(s) {
      var c = Wt(this, s).delete(s);
      return this.size -= c ? 1 : 0, c;
    }
    function Vr(s) {
      return Wt(this, s).get(s);
    }
    function kr(s) {
      return Wt(this, s).has(s);
    }
    function qt(s, c) {
      var p = Wt(this, s), w = p.size;
      return p.set(s, c), this.size += p.size == w ? 0 : 1, this;
    }
    be.prototype.clear = Zr, be.prototype.delete = Qr, be.prototype.get = Vr, be.prototype.has = kr, be.prototype.set = qt;
    function ft(s) {
      var c = -1, p = s == null ? 0 : s.length;
      for (this.__data__ = new be(); ++c < p; )
        this.add(s[c]);
    }
    function en(s) {
      return this.__data__.set(s, f), this;
    }
    function Ve(s) {
      return this.__data__.has(s);
    }
    ft.prototype.add = ft.prototype.push = en, ft.prototype.has = Ve;
    function le(s) {
      var c = this.__data__ = new ce(s);
      this.size = c.size;
    }
    function tn() {
      this.__data__ = new ce(), this.size = 0;
    }
    function rn(s) {
      var c = this.__data__, p = c.delete(s);
      return this.size = c.size, p;
    }
    function nn(s) {
      return this.__data__.get(s);
    }
    function sn(s) {
      return this.__data__.has(s);
    }
    function an(s, c) {
      var p = this.__data__;
      if (p instanceof ce) {
        var w = p.__data__;
        if (!Je || w.length < a - 1)
          return w.push([s, c]), this.size = ++p.size, this;
        p = this.__data__ = new be(w);
      }
      return p.set(s, c), this.size = p.size, this;
    }
    le.prototype.clear = tn, le.prototype.delete = rn, le.prototype.get = nn, le.prototype.has = sn, le.prototype.set = an;
    function Yt(s, c) {
      var p = zt(s), w = !p && Mt(s), x = !p && !w && Oe(s), R = !p && !w && !x && Lt(s), G = p || w || x || R, V = G ? Mr(s.length, String) : [], ae = V.length;
      for (var j in s)
        ve.call(s, j) && !(G && // Safari 9 has enumerable `arguments.length` in strict mode.
        (j == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        x && (j == "offset" || j == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        R && (j == "buffer" || j == "byteLength" || j == "byteOffset") || // Skip index properties.
        wr(j, ae))) && V.push(j);
      return V;
    }
    function lt(s, c) {
      for (var p = s.length; p--; )
        if (Ar(s[p][0], c))
          return p;
      return -1;
    }
    function on(s, c, p) {
      var w = c(s);
      return zt(s) ? w : rr(w, p(s));
    }
    function Dt(s) {
      return s == null ? s === void 0 ? ye : Y : at && at in Object(s) ? hn(s) : Tr(s);
    }
    function vr(s) {
      return St(s) && Dt(s) == S;
    }
    function Kt(s, c, p, w, x) {
      return s === c ? !0 : s == null || c == null || !St(s) && !St(c) ? s !== s && c !== c : un(s, c, p, w, Kt, x);
    }
    function un(s, c, p, w, x, R) {
      var G = zt(s), V = zt(c), ae = G ? N : rt(s), j = V ? N : rt(c);
      ae = ae == S ? Z : ae, j = j == S ? Z : j;
      var oe = ae == Z, Te = j == Z, ee = ae == j;
      if (ee && Oe(s)) {
        if (!Oe(c))
          return !1;
        G = !0, oe = !1;
      }
      if (ee && !oe)
        return R || (R = new le()), G || Lt(s) ? mr(s, c, p, w, x, R) : ln(s, c, ae, p, w, x, R);
      if (!(p & g)) {
        var de = oe && ve.call(s, "__wrapped__"), we = Te && ve.call(c, "__wrapped__");
        if (de || we) {
          var Ge = de ? s.value() : s, Re = we ? c.value() : c;
          return R || (R = new le()), x(Ge, Re, p, w, R);
        }
      }
      return ee ? (R || (R = new le()), dn(s, c, p, w, x, R)) : !1;
    }
    function cn(s) {
      if (!Sr(s) || Ir(s))
        return !1;
      var c = nt(s) ? Ne : Q;
      return c.test(dt(s));
    }
    function Ft(s) {
      return St(s) && Ce(s.length) && !!C[Dt(s)];
    }
    function fn(s) {
      if (!yn(s))
        return ot(s);
      var c = [];
      for (var p in Object(s))
        ve.call(s, p) && p != "constructor" && c.push(p);
      return c;
    }
    function mr(s, c, p, w, x, R) {
      var G = p & g, V = s.length, ae = c.length;
      if (V != ae && !(G && ae > V))
        return !1;
      var j = R.get(s);
      if (j && R.get(c))
        return j == c;
      var oe = -1, Te = !0, ee = p & v ? new ft() : void 0;
      for (R.set(s, c), R.set(c, s); ++oe < V; ) {
        var de = s[oe], we = c[oe];
        if (w)
          var Ge = G ? w(we, de, oe, c, s, R) : w(de, we, oe, s, c, R);
        if (Ge !== void 0) {
          if (Ge)
            continue;
          Te = !1;
          break;
        }
        if (ee) {
          if (!gr(c, function(Re, ht) {
            if (!xr(ee, ht) && (de === Re || x(de, Re, p, w, R)))
              return ee.push(ht);
          })) {
            Te = !1;
            break;
          }
        } else if (!(de === we || x(de, we, p, w, R))) {
          Te = !1;
          break;
        }
      }
      return R.delete(s), R.delete(c), Te;
    }
    function ln(s, c, p, w, x, R, G) {
      switch (p) {
        case ne:
          if (s.byteLength != c.byteLength || s.byteOffset != c.byteOffset)
            return !1;
          s = s.buffer, c = c.buffer;
        case Se:
          return !(s.byteLength != c.byteLength || !R(new ar(s), new ar(c)));
        case q:
        case se:
        case Ie:
          return Ar(+s, +c);
        case re:
          return s.name == c.name && s.message == c.message;
        case A:
        case k:
          return s == c + "";
        case $:
          var V = pr;
        case P:
          var ae = w & g;
          if (V || (V = ir), s.size != c.size && !ae)
            return !1;
          var j = G.get(s);
          if (j)
            return j == c;
          w |= v, G.set(s, c);
          var oe = mr(V(s), V(c), w, x, R, G);
          return G.delete(s), oe;
        case Ae:
          if (qe)
            return qe.call(s) == qe.call(c);
      }
      return !1;
    }
    function dn(s, c, p, w, x, R) {
      var G = p & g, V = br(s), ae = V.length, j = br(c), oe = j.length;
      if (ae != oe && !G)
        return !1;
      for (var Te = ae; Te--; ) {
        var ee = V[Te];
        if (!(G ? ee in c : ve.call(c, ee)))
          return !1;
      }
      var de = R.get(s);
      if (de && R.get(c))
        return de == c;
      var we = !0;
      R.set(s, c), R.set(c, s);
      for (var Ge = G; ++Te < ae; ) {
        ee = V[Te];
        var Re = s[ee], ht = c[ee];
        if (w)
          var xt = G ? w(ht, Re, ee, c, s, R) : w(Re, ht, ee, s, c, R);
        if (!(xt === void 0 ? Re === ht || x(Re, ht, p, w, R) : xt)) {
          we = !1;
          break;
        }
        Ge || (Ge = ee == "constructor");
      }
      if (we && !Ge) {
        var Jt = s.constructor, Xt = c.constructor;
        Jt != Xt && "constructor" in s && "constructor" in c && !(typeof Jt == "function" && Jt instanceof Jt && typeof Xt == "function" && Xt instanceof Xt) && (we = !1);
      }
      return R.delete(s), R.delete(c), we;
    }
    function br(s) {
      return on(s, Er, gn);
    }
    function Wt(s, c) {
      var p = s.__data__;
      return pn(c) ? p[typeof c == "string" ? "string" : "hash"] : p.map;
    }
    function Tt(s, c) {
      var p = jr(s, c);
      return cn(p) ? p : void 0;
    }
    function hn(s) {
      var c = ve.call(s, at), p = s[at];
      try {
        s[at] = void 0;
        var w = !0;
      } catch {
      }
      var x = Ut.call(s);
      return w && (c ? s[at] = p : delete s[at]), x;
    }
    var gn = _r ? function(s) {
      return s == null ? [] : (s = Object(s), tr(_r(s), function(c) {
        return $t.call(s, c);
      }));
    } : Or, rt = Dt;
    (ze && rt(new ze(new ArrayBuffer(1))) != ne || Je && rt(new Je()) != $ || ut && rt(ut.resolve()) != pe || Xe && rt(new Xe()) != P || ct && rt(new ct()) != Ue) && (rt = function(s) {
      var c = Dt(s), p = c == Z ? s.constructor : void 0, w = p ? dt(p) : "";
      if (w)
        switch (w) {
          case Br:
            return ne;
          case Ur:
            return $;
          case $r:
            return pe;
          case Ht:
            return P;
          case It:
            return Ue;
        }
      return c;
    });
    function wr(s, c) {
      return c = c ?? I, !!c && (typeof s == "number" || Pe.test(s)) && s > -1 && s % 1 == 0 && s < c;
    }
    function pn(s) {
      var c = typeof s;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? s !== "__proto__" : s === null;
    }
    function Ir(s) {
      return !!Rt && Rt in s;
    }
    function yn(s) {
      var c = s && s.constructor, p = typeof c == "function" && c.prototype || Bt;
      return s === p;
    }
    function Tr(s) {
      return Ut.call(s);
    }
    function dt(s) {
      if (s != null) {
        try {
          return Ot.call(s);
        } catch {
        }
        try {
          return s + "";
        } catch {
        }
      }
      return "";
    }
    function Ar(s, c) {
      return s === c || s !== s && c !== c;
    }
    var Mt = vr(/* @__PURE__ */ function() {
      return arguments;
    }()) ? vr : function(s) {
      return St(s) && ve.call(s, "callee") && !$t.call(s, "callee");
    }, zt = Array.isArray;
    function At(s) {
      return s != null && Ce(s.length) && !nt(s);
    }
    var Oe = or || vn;
    function _n(s, c) {
      return Kt(s, c);
    }
    function nt(s) {
      if (!Sr(s))
        return !1;
      var c = Dt(s);
      return c == fe || c == Le || c == U || c == H;
    }
    function Ce(s) {
      return typeof s == "number" && s > -1 && s % 1 == 0 && s <= I;
    }
    function Sr(s) {
      var c = typeof s;
      return s != null && (c == "object" || c == "function");
    }
    function St(s) {
      return s != null && typeof s == "object";
    }
    var Lt = Gt ? Lr(Gt) : Ft;
    function Er(s) {
      return At(s) ? Yt(s) : fn(s);
    }
    function Or() {
      return [];
    }
    function vn() {
      return !1;
    }
    n.exports = _n;
  }(Tn, Tn.exports)), Tn.exports;
}
var Qi = Zi();
const Vi = /* @__PURE__ */ Ln(Qi);
var vt, En, Nt, Fr, er, Fe, X, ge, Un, Mn, fi, li, ur, kn;
let ki = (kn = class {
  constructor(r, {
    rules: a,
    initialSearchTerm: f,
    initialSortBy: g,
    initialSortDirection: v,
    initialGroupBy: I,
    initialFilters: S,
    initialSelectedItems: N,
    initialMeta: U,
    page: q,
    numItemsPerPage: se,
    isLoading: re,
    disabled: fe,
    requireGroup: Le,
    maxSelectedItems: $,
    plugins: Ie,
    onInit: Y,
    onReady: Z,
    onFirstUserInteraction: pe,
    onChange: H
  }) {
    J(this, ge);
    J(this, vt);
    // static rule definitions
    J(this, En);
    J(this, Nt);
    J(this, Fr);
    J(this, er);
    J(this, Fe);
    // Subclasses that extend functionality
    J(this, X);
    L(this, Nt, void 0), this.isReady = !1, L(this, Fr, !1), L(this, er, !1), L(this, En, mi(a) ? a : []), L(this, vt, r), this.disabled = !!fe, this.isLoading = !!re, L(this, Fe, new Ki());
    const A = {
      getItems: () => this.items,
      getRules: () => h(this, En),
      getMeta: () => h(this, X).meta.meta,
      isLoading: () => this.isLoading,
      isDisabled: () => this.disabled,
      touch: (P) => De(this, ge, Un).call(this, P),
      debouncer: new Xi()
    };
    if (L(this, X, {
      search: new Bi({ initialSearchTerm: f }, A),
      filters: new Gn({ initialFilters: S }, A),
      sortBy: new qi({ initialSortBy: g, initialSortDirection: v }, A),
      groupBy: new Pi({ initialGroupBy: I, requireGroup: !!Le }, A),
      meta: new Fi({ initialMeta: U }, A),
      selectedItems: new $i({ initialSelectedItems: N, maxSelectedItems: $ }, A),
      pagination: new Li({ page: q, numItemsPerPage: se }, A)
    }), this.plugins = new Ni(
      Ie || [],
      () => this,
      (P) => De(this, ge, Un).call(this, P)
    ), h(this, Fe).silently(() => {
      const P = {
        source: "core",
        event: "init",
        snapshot: De(this, ge, ur).call(this),
        timestamp: Date.now()
      };
      this.plugins.onInit(P), Y && Y(P);
    }), H && h(this, Fe).on("change", H), pe && h(this, Fe).on("firstUserInteraction", pe), this.isReady = re === !1 && Array.isArray(r) && r.length > 0, Z && this.isReady) {
      const P = {
        source: "core",
        event: "ready",
        snapshot: De(this, ge, ur).call(this),
        timestamp: Date.now()
      };
      Z(P);
    }
    this.isReady === !1 && h(this, Fe).on("ready", (P) => {
      h(this, X).filters.recalculateHydratedRules(), Z && Z(P);
    });
  }
  emitFirstUserInteraction() {
    if (h(this, Fr) === !1) {
      L(this, Fr, !0);
      const r = {
        source: "core",
        event: "firstUserInteraction",
        snapshot: De(this, ge, ur).call(this),
        timestamp: Date.now()
      };
      h(this, Fe).emit("firstUserInteraction", r);
    }
  }
  get items() {
    return Array.isArray(h(this, vt)) ? h(this, vt) : [];
  }
  get matches() {
    return (h(this, Nt) === void 0 || h(this, er)) && (L(this, Nt, De(this, ge, li).call(this)), L(this, er, !1)), h(this, Nt);
  }
  get isEmpty() {
    return this.isLoading === !1 && this.items.length === 0;
  }
  get search() {
    return Ui(h(this, X).search);
  }
  get filters() {
    return Ti(h(this, X).filters);
  }
  get sortBy() {
    return Yi(h(this, X).sortBy);
  }
  get groupBy() {
    return Di(h(this, X).groupBy);
  }
  get meta() {
    return Mi(h(this, X).meta);
  }
  get pagination() {
    return ji(h(this, X).pagination);
  }
  get selectedItems() {
    return Hi(h(this, X).selectedItems);
  }
  get events() {
    return {
      on: (r, a) => h(this, Fe).on(r, a),
      off: (r, a) => h(this, Fe).off(r, a)
    };
  }
  get state() {
    if (this.isLoading)
      return "loading";
    if (this.items && this.items.length === 0)
      return "empty";
    const r = h(this, X).groupBy.activeRule !== void 0;
    return r && Array.isArray(this.matches.groups) && this.matches.groups.length > 0 ? "groups" : r === !1 && Array.isArray(this.matches.items) && this.matches.items.length > 0 ? "items" : "noMatches";
  }
  setItems(r) {
    if (Vi(r, h(this, vt)) === !1) {
      const a = h(this, vt);
      L(this, vt, r), De(this, ge, Mn).call(this, { source: "core", event: "change.core.setItems", current: r, initial: a });
    }
  }
  setIsLoading(r) {
    if (!!r !== this.isLoading) {
      const a = !!this.isLoading;
      this.isLoading = !!r, De(this, ge, Mn).call(this, { source: "core", event: "change.core.setIsLoading", current: !!r, initial: a }), this.isLoading === !1 && De(this, ge, fi).call(this);
    }
  }
  setIsDisabled(r) {
    if (!!r !== this.disabled) {
      const a = this.disabled;
      this.disabled = !!r, De(this, ge, Mn).call(this, { source: "core", event: "change.core.setIsDisabled", current: !!r, initial: a });
    }
  }
}, vt = new WeakMap(), En = new WeakMap(), Nt = new WeakMap(), Fr = new WeakMap(), er = new WeakMap(), Fe = new WeakMap(), X = new WeakMap(), ge = new WeakSet(), /**
 * Changes that reflect a user interaction.
 * e.g: entering a search term or selecting a filter.
 */
Un = function(r) {
  this.emitFirstUserInteraction(), L(this, er, !0), L(this, Nt, void 0), this.updatedAt = Date.now();
  const a = { ...r, snapshot: De(this, ge, ur).call(this), timestamp: Date.now() };
  h(this, Fe).emit(r.event, a), h(this, Fe).emit(`change.${r.source}`, a), h(this, Fe).emit("change", a);
}, /** Changes that do not reflect a user interaction  */
Mn = function(r) {
  L(this, er, !0), L(this, Nt, void 0), this.updatedAt = Date.now();
  const a = { ...r, snapshot: De(this, ge, ur).call(this), timestamp: Date.now() };
  h(this, Fe).emit(r.event, a);
}, fi = function() {
  if (this.isReady === !1) {
    this.isReady = !0;
    const r = {
      source: "core",
      event: "ready",
      snapshot: De(this, ge, ur).call(this),
      timestamp: Date.now()
    };
    h(this, Fe).emit("ready", r);
  }
}, li = function() {
  let r = [], a = [];
  const f = h(this, X).groupBy.activeRule !== void 0;
  let g = [];
  if (Array.isArray(h(this, vt))) {
    const v = h(this, X).meta.meta;
    r = [...h(this, vt)], r = h(this, X).search.process(r, v), r = h(this, X).filters.process(r, v), r = h(this, X).sortBy.process(r), g = h(this, X).pagination.process(r), f && (a = h(this, X).groupBy.process(g));
  }
  return {
    items: f ? void 0 : g,
    groups: f ? a : void 0,
    numMatchedItems: r.length,
    numTotalItems: this.items.length,
    hasGroupByRule: f
  };
}, /**
 * Return the current state values for each mixin. Only used for onChange events.
 */
ur = function() {
  return {
    search: oi(h(this, X).search),
    filters: ni(h(this, X).filters),
    sortBy: ci(h(this, X).sortBy),
    groupBy: si(h(this, X).groupBy),
    selectedItems: ui(h(this, X).selectedItems),
    meta: ai(h(this, X).meta),
    updatedAt: this.updatedAt
  };
}, kn);
class ds {
  register(r, a) {
    this.instance = r, this.touch = a;
  }
}
function hs(n) {
  return n;
}
function gs(n) {
  return n;
}
function ps(n) {
  return n;
}
function ys(n) {
  return n;
}
function _s(n) {
  return n;
}
function vs(n, r, a) {
  const f = Rr(r);
  return $n(n, a).some((v) => v.includes(f));
}
function ms(n, r, a) {
  const f = Rr(r), g = $n(n, a);
  return Array.from(f).every((v) => g.some((I) => I.includes(v)));
}
function bs(n, r, a) {
  const f = Rr(r), g = $n(n, a), v = Array.from(f);
  return g.some((I) => {
    let S = I, N = !0;
    return v.forEach((U) => {
      if (N) {
        const q = S.indexOf(U);
        q !== -1 ? S = S.substring(q) : N = !1;
      }
    }), N;
  });
}
function $n(n, r = []) {
  return r ? [Rr(n), ...r.map(Rr)] : [Rr(n)];
}
function Rr(n) {
  return n.toLowerCase().replace(/[^\w\d]+/g, "");
}
function es(n, {
  rules: r,
  initialSearchTerm: a,
  initialSortBy: f,
  initialSortDirection: g,
  initialGroupBy: v,
  initialFilters: I,
  initialSelectedItems: S,
  initialMeta: N,
  page: U,
  numItemsPerPage: q,
  plugins: se,
  isLoading: re,
  disabled: fe,
  requireGroup: Le,
  maxSelectedItems: $,
  onInit: Ie,
  onReady: Y,
  onFirstUserInteraction: Z,
  onChange: pe
}) {
  const [H] = Yn(
    () => new ki(n, {
      rules: r,
      initialSearchTerm: a,
      initialSortBy: f,
      initialSortDirection: g,
      initialGroupBy: v,
      initialFilters: I,
      initialMeta: N,
      initialSelectedItems: S,
      maxSelectedItems: $,
      isLoading: re,
      disabled: fe,
      page: U,
      numItemsPerPage: q,
      plugins: se,
      requireGroup: Le,
      onInit: Ie,
      onReady: Y,
      onFirstUserInteraction: Z,
      onChange: pe
    })
  ), [, A] = Yn(void 0);
  return gi(() => {
    H.events.on("change", ({ diff: P, snapshot: k }) => A(k.updatedAt));
  }, []), H.setItems(n), H.setIsLoading(re), H.setIsDisabled(fe), U !== void 0 && H.pagination.setPage(U), q !== void 0 && H.pagination.setNumItemsPerPage(q), $ !== void 0 && H.selectedItems.setMaxSelectedItems($), H;
}
const di = pi(null);
function Pn() {
  const n = yi(di);
  if (n === null)
    throw new Error("useFinderContext requires a FinderContext.");
  const [r] = n;
  return r;
}
var Fn = { exports: {} }, mn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zn;
function ts() {
  if (Zn) return mn;
  Zn = 1;
  var n = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function a(f, g, v) {
    var I = null;
    if (v !== void 0 && (I = "" + v), g.key !== void 0 && (I = "" + g.key), "key" in g) {
      v = {};
      for (var S in g)
        S !== "key" && (v[S] = g[S]);
    } else v = g;
    return g = v.ref, {
      $$typeof: n,
      type: f,
      key: I,
      ref: g !== void 0 ? g : null,
      props: v
    };
  }
  return mn.Fragment = r, mn.jsx = a, mn.jsxs = a, mn;
}
var bn = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qn;
function rs() {
  return Qn || (Qn = 1, process.env.NODE_ENV !== "production" && function() {
    function n(y) {
      if (y == null) return null;
      if (typeof y == "function")
        return y.$$typeof === Ue ? null : y.displayName || y.name || null;
      if (typeof y == "string") return y;
      switch (y) {
        case $:
          return "Fragment";
        case Y:
          return "Profiler";
        case Ie:
          return "StrictMode";
        case A:
          return "Suspense";
        case P:
          return "SuspenseList";
        case ye:
          return "Activity";
      }
      if (typeof y == "object")
        switch (typeof y.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), y.$$typeof) {
          case Le:
            return "Portal";
          case pe:
            return (y.displayName || "Context") + ".Provider";
          case Z:
            return (y._context.displayName || "Context") + ".Consumer";
          case H:
            var O = y.render;
            return y = y.displayName, y || (y = O.displayName || O.name || "", y = y !== "" ? "ForwardRef(" + y + ")" : "ForwardRef"), y;
          case k:
            return O = y.displayName || null, O !== null ? O : n(y.type) || "Memo";
          case Ae:
            O = y._payload, y = y._init;
            try {
              return n(y(O));
            } catch {
            }
        }
      return null;
    }
    function r(y) {
      return "" + y;
    }
    function a(y) {
      try {
        r(y);
        var O = !1;
      } catch {
        O = !0;
      }
      if (O) {
        O = console;
        var B = O.error, Q = typeof Symbol == "function" && Symbol.toStringTag && y[Symbol.toStringTag] || y.constructor.name || "Object";
        return B.call(
          O,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          Q
        ), r(y);
      }
    }
    function f(y) {
      if (y === $) return "<>";
      if (typeof y == "object" && y !== null && y.$$typeof === Ae)
        return "<...>";
      try {
        var O = n(y);
        return O ? "<" + O + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function g() {
      var y = Se.A;
      return y === null ? null : y.getOwner();
    }
    function v() {
      return Error("react-stack-top-frame");
    }
    function I(y) {
      if (ne.call(y, "key")) {
        var O = Object.getOwnPropertyDescriptor(y, "key").get;
        if (O && O.isReactWarning) return !1;
      }
      return y.key !== void 0;
    }
    function S(y, O) {
      function B() {
        st || (st = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          O
        ));
      }
      B.isReactWarning = !0, Object.defineProperty(y, "key", {
        get: B,
        configurable: !0
      });
    }
    function N() {
      var y = n(this.type);
      return $e[y] || ($e[y] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), y = this.props.ref, y !== void 0 ? y : null;
    }
    function U(y, O, B, Q, Pe, C, He, b) {
      return B = C.ref, y = {
        $$typeof: fe,
        type: y,
        key: O,
        props: C,
        _owner: Pe
      }, (B !== void 0 ? B : null) !== null ? Object.defineProperty(y, "ref", {
        enumerable: !1,
        get: N
      }) : Object.defineProperty(y, "ref", { enumerable: !1, value: null }), y._store = {}, Object.defineProperty(y._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(y, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(y, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: He
      }), Object.defineProperty(y, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: b
      }), Object.freeze && (Object.freeze(y.props), Object.freeze(y)), y;
    }
    function q(y, O, B, Q, Pe, C, He, b) {
      var D = O.children;
      if (D !== void 0)
        if (Q)
          if (xe(D)) {
            for (Q = 0; Q < D.length; Q++)
              se(D[Q]);
            Object.freeze && Object.freeze(D);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else se(D);
      if (ne.call(O, "key")) {
        D = n(y);
        var _e = Object.keys(O).filter(function(wt) {
          return wt !== "key";
        });
        Q = 0 < _e.length ? "{key: someKey, " + _e.join(": ..., ") + ": ...}" : "{key: someKey}", bt[D + Q] || (_e = 0 < _e.length ? "{" + _e.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          Q,
          D,
          _e,
          D
        ), bt[D + Q] = !0);
      }
      if (D = null, B !== void 0 && (a(B), D = "" + B), I(O) && (a(O.key), D = "" + O.key), "key" in O) {
        B = {};
        for (var K in O)
          K !== "key" && (B[K] = O[K]);
      } else B = O;
      return D && S(
        B,
        typeof y == "function" ? y.displayName || y.name || "Unknown" : y
      ), U(
        y,
        D,
        C,
        Pe,
        g(),
        B,
        He,
        b
      );
    }
    function se(y) {
      typeof y == "object" && y !== null && y.$$typeof === fe && y._store && (y._store.validated = 1);
    }
    var re = hi, fe = Symbol.for("react.transitional.element"), Le = Symbol.for("react.portal"), $ = Symbol.for("react.fragment"), Ie = Symbol.for("react.strict_mode"), Y = Symbol.for("react.profiler"), Z = Symbol.for("react.consumer"), pe = Symbol.for("react.context"), H = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), Ae = Symbol.for("react.lazy"), ye = Symbol.for("react.activity"), Ue = Symbol.for("react.client.reference"), Se = re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = Object.prototype.hasOwnProperty, xe = Array.isArray, je = console.createTask ? console.createTask : function() {
      return null;
    };
    re = {
      "react-stack-bottom-frame": function(y) {
        return y();
      }
    };
    var st, $e = {}, et = re["react-stack-bottom-frame"].bind(
      re,
      v
    )(), tt = je(f(v)), bt = {};
    bn.Fragment = $, bn.jsx = function(y, O, B, Q, Pe) {
      var C = 1e4 > Se.recentlyCreatedOwnerStacks++;
      return q(
        y,
        O,
        B,
        !1,
        Q,
        Pe,
        C ? Error("react-stack-top-frame") : et,
        C ? je(f(y)) : tt
      );
    }, bn.jsxs = function(y, O, B, Q, Pe) {
      var C = 1e4 > Se.recentlyCreatedOwnerStacks++;
      return q(
        y,
        O,
        B,
        !0,
        Q,
        Pe,
        C ? Error("react-stack-top-frame") : et,
        C ? je(f(y)) : tt
      );
    };
  }()), bn;
}
var Vn;
function ns() {
  return Vn || (Vn = 1, process.env.NODE_ENV === "production" ? Fn.exports = ts() : Fn.exports = rs()), Fn.exports;
}
var mt = ns();
function is({ children: n }) {
  const r = Pn();
  if (r.state === "items" && r.matches.items && n) {
    if (typeof n == "object" && On(n))
      return Rn(n, {
        items: r.matches.items,
        selectedItems: r.selectedItems,
        pagination: r.pagination,
        meta: r.meta
      });
    if (typeof n == "function") {
      const a = n;
      return /* @__PURE__ */ mt.jsx(a, { items: r.matches.items, selectedItems: r.selectedItems, pagination: r.pagination, meta: r.meta });
    }
  }
  return null;
}
function ws({
  items: n,
  rules: r,
  initialSearchTerm: a,
  initialSortBy: f,
  initialSortDirection: g,
  initialGroupBy: v,
  initialFilters: I,
  initialMeta: S,
  initialSelectedItems: N,
  maxSelectedItems: U,
  isLoading: q,
  disabled: se,
  page: re,
  numItemsPerPage: fe,
  requireGroup: Le,
  plugins: $,
  onInit: Ie,
  onReady: Y,
  onFirstUserInteraction: Z,
  onChange: pe,
  children: H,
  controllerRef: A
}) {
  const P = es(n, {
    rules: r,
    initialSearchTerm: a,
    initialSortBy: f,
    initialSortDirection: g,
    initialGroupBy: v,
    initialFilters: I,
    initialMeta: S,
    initialSelectedItems: N,
    maxSelectedItems: U,
    isLoading: q,
    disabled: se,
    page: re,
    numItemsPerPage: fe,
    requireGroup: Le,
    plugins: $,
    onInit: Ie,
    onReady: Y,
    onFirstUserInteraction: Z,
    onChange: pe
  });
  return _i(A, () => P, [P]), /* @__PURE__ */ mt.jsx(di.Provider, { value: [P, P.updatedAt], children: H });
}
function ss({ children: n }) {
  const r = Pn();
  if (r.state === "empty" && n) {
    if (typeof n == "object" && On(n))
      return Rn(n, { pagination: r.pagination, meta: r.meta, selectedItems: r.selectedItems });
    if (typeof n == "function") {
      const a = n;
      return /* @__PURE__ */ mt.jsx(a, { pagination: r.pagination, meta: r.meta, selectedItems: r.selectedItems });
    }
    return n;
  }
  return null;
}
function as({ children: n }) {
  const r = Pn();
  if (r.state === "groups" && r.matches.groups && n) {
    if (typeof n == "object" && On(n))
      return Rn(n, {
        groups: r.matches.groups,
        rule: r.groupBy.activeRule,
        selectedItems: r.selectedItems,
        pagination: r.pagination,
        meta: r.meta
      });
    if (typeof n == "function") {
      const a = n;
      return /* @__PURE__ */ mt.jsx(a, { groups: r.matches.groups, selectedItems: r.selectedItems, pagination: r.pagination, meta: r.meta });
    }
  }
  return null;
}
function os({ children: n }) {
  const r = Pn();
  if (r.state === "loading" && n) {
    if (typeof n == "object" && n !== null && On(n))
      return Rn(n, { pagination: r.pagination, meta: r.meta, selectedItems: r.selectedItems });
    if (typeof n == "function") {
      const a = n;
      return /* @__PURE__ */ mt.jsx(a, { pagination: r.pagination, meta: r.meta, selectedItems: r.selectedItems });
    }
    return n;
  }
  return null;
}
function us({ children: n }) {
  const r = Pn();
  if (r.state === "noMatches" && n) {
    if (typeof n == "object" && On(n))
      return Rn(n, { pagination: r.pagination, meta: r.meta, selectedItems: r.selectedItems });
    if (typeof n == "function") {
      const a = n;
      return /* @__PURE__ */ mt.jsx(a, { pagination: r.pagination, meta: r.meta, selectedItems: r.selectedItems });
    }
    return n;
  }
  return null;
}
function Is({ children: n }) {
  if (!n || Object.values(n).length === 0)
    throw new Error("No render props were found.");
  return [
    n.loading && /* @__PURE__ */ mt.jsx(os, { children: n.loading }, "loading"),
    n.items && /* @__PURE__ */ mt.jsx(is, { children: n.items }, "items"),
    n.noMatches && /* @__PURE__ */ mt.jsx(us, { children: n.noMatches }, "noMatches"),
    n.groups && /* @__PURE__ */ mt.jsx(as, { children: n.groups }, "groups"),
    n.empty && /* @__PURE__ */ mt.jsx(ss, { children: n.empty }, "empty")
  ];
}
function Ts() {
  return vi(null);
}
export {
  ws as Finder,
  Is as FinderContent,
  ki as FinderCore,
  ss as FinderEmpty,
  as as FinderGroups,
  is as FinderItems,
  os as FinderLoading,
  us as FinderNoMatches,
  ds as FinderPlugin,
  ps as filterRule,
  ms as finderCharacterCompare,
  hs as finderRuleset,
  bs as finderSequentialCharacterCompare,
  vs as finderStringCompare,
  _s as groupByRule,
  gs as searchRule,
  ys as sortByRule,
  es as useFinder,
  Pn as useFinderContext,
  Ts as useFinderRef
};
