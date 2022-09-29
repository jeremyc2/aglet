/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = window, rt = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ot = Symbol(), lt = /* @__PURE__ */ new WeakMap();
class Ut {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== ot)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (rt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Bt = (i) => new Ut(typeof i == "string" ? i : i + "", void 0, ot), nt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new Ut(e, i, ot);
}, Yt = (i, t) => {
  rt ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const s = document.createElement("style"), r = j.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  });
}, ht = rt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return Bt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var V;
const D = window, dt = D.trustedTypes, qt = dt ? dt.emptyScript : "", ct = D.reactiveElementPolyfillSupport, it = {
  toAttribute(i, t) {
    switch (t) {
      case Boolean:
        i = i ? qt : null;
        break;
      case Object:
      case Array:
        i = i == null ? i : JSON.stringify(i);
    }
    return i;
  },
  fromAttribute(i, t) {
    let e = i;
    switch (t) {
      case Boolean:
        e = i !== null;
        break;
      case Number:
        e = i === null ? null : Number(i);
        break;
      case Object:
      case Array:
        try {
          e = JSON.parse(i);
        } catch {
          e = null;
        }
    }
    return e;
  }
}, zt = (i, t) => t !== i && (t == t || i == i), W = {
  attribute: !0,
  type: String,
  converter: it,
  reflect: !1,
  hasChanged: zt
};
class y extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    (e = this.h) !== null && e !== void 0 || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, s) => {
      const r = this._$Ep(s, e);
      r !== void 0 && (this._$Ev.set(r, s), t.push(r));
    }), t;
  }
  static createProperty(t, e = W) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = typeof t == "symbol" ? Symbol() : "__" + t, r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Object.defineProperty(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return {
      get() {
        return this[e];
      },
      set(r) {
        const o = this[t];
        this[e] = r, this.requestUpdate(t, o, s);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || W;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, s = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const r of s)
        this.createProperty(r, e[r]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s)
        e.unshift(ht(r));
    } else
      t !== void 0 && e.push(ht(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) === null || s === void 0 || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Yt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = W) {
    var r;
    const o = this.constructor._$Ep(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (((r = s.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? s.converter : it).toAttribute(e, s.type);
      this._$El = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var s;
    const r = this.constructor, o = r._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const n = r.getPropertyOptions(o), h = typeof n.converter == "function" ? {
        fromAttribute: n.converter
      } : ((s = n.converter) === null || s === void 0 ? void 0 : s.fromAttribute) !== void 0 ? n.converter : it;
      this._$El = o, this[o] = h.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, s) {
    let r = !0;
    t !== void 0 && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || zt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, s))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((r, o) => this[o] = r), this._$Ei = void 0);
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (t = this._$ES) === null || t === void 0 || t.forEach((r) => {
        var o;
        return (o = r.hostUpdate) === null || o === void 0 ? void 0 : o.call(r);
      }), this.update(s)) : this._$Ek();
    } catch (r) {
      throw e = !1, this._$Ek(), r;
    }
    e && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) === null || r === void 0 ? void 0 : r.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, s) => this._$EO(s, this[s], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
y.finalized = !0, y.elementProperties = /* @__PURE__ */ new Map(), y.elementStyles = [], y.shadowRootOptions = {
  mode: "open"
}, ct == null || ct({
  ReactiveElement: y
}), ((V = D.reactiveElementVersions) !== null && V !== void 0 ? V : D.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K;
const B = window, x = B.trustedTypes, ut = x ? x.createPolicy("lit-html", {
  createHTML: (i) => i
}) : void 0, $ = `lit$${(Math.random() + "").slice(9)}$`, Mt = "?" + $, Ft = `<${Mt}>`, S = document, z = (i = "") => S.createComment(i), M = (i) => i === null || typeof i != "object" && typeof i != "function", Rt = Array.isArray, Vt = (i) => Rt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, ft = />/g, w = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, vt = /"/g, Tt = /^(?:script|style|textarea|title)$/i, Wt = (i) => (t, ...e) => ({
  _$litType$: i,
  strings: t,
  values: e
}), L = Wt(1), C = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), bt = /* @__PURE__ */ new WeakMap(), Kt = (i, t, e) => {
  var s, r;
  const o = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let n = o._$litPart$;
  if (n === void 0) {
    const h = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : null;
    o._$litPart$ = n = new T(t.insertBefore(z(), h), h, void 0, e != null ? e : {});
  }
  return n._$AI(i), n;
}, _ = S.createTreeWalker(S, 129, null, !1), Zt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : "", n = N;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let b, d, c = -1, v = 0;
    for (; v < l.length && (n.lastIndex = v, d = n.exec(l), d !== null); )
      v = n.lastIndex, n === N ? d[1] === "!--" ? n = pt : d[1] !== void 0 ? n = ft : d[2] !== void 0 ? (Tt.test(d[2]) && (r = RegExp("</" + d[2], "g")), n = w) : d[3] !== void 0 && (n = w) : n === w ? d[0] === ">" ? (n = r != null ? r : N, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, b = d[1], n = d[3] === void 0 ? w : d[3] === '"' ? vt : gt) : n === vt || n === gt ? n = w : n === pt || n === ft ? n = N : (n = w, r = void 0);
    const H = n === w && i[a + 1].startsWith("/>") ? " " : "";
    o += n === N ? l + Ft : c >= 0 ? (s.push(b), l.slice(0, c) + "$lit$" + l.slice(c) + $ + H) : l + $ + (c === -2 ? (s.push(void 0), a) : H);
  }
  const h = o + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [ut !== void 0 ? ut.createHTML(h) : h, s];
};
class R {
  constructor({
    strings: t,
    _$litType$: e
  }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [l, b] = Zt(t, e);
    if (this.el = R.createElement(l, s), _.currentNode = this.el.content, e === 2) {
      const d = this.el.content, c = d.firstChild;
      c.remove(), d.append(...c.childNodes);
    }
    for (; (r = _.nextNode()) !== null && a.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const d = [];
          for (const c of r.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith($)) {
              const v = b[n++];
              if (d.push(c), v !== void 0) {
                const H = r.getAttribute(v.toLowerCase() + "$lit$").split($), O = /([.?@])?(.*)/.exec(v);
                a.push({
                  type: 1,
                  index: o,
                  name: O[2],
                  strings: H,
                  ctor: O[1] === "." ? Jt : O[1] === "?" ? Xt : O[1] === "@" ? te : q
                });
              } else
                a.push({
                  type: 6,
                  index: o
                });
            }
          for (const c of d)
            r.removeAttribute(c);
        }
        if (Tt.test(r.tagName)) {
          const d = r.textContent.split($), c = d.length - 1;
          if (c > 0) {
            r.textContent = x ? x.emptyScript : "";
            for (let v = 0; v < c; v++)
              r.append(d[v], z()), _.nextNode(), a.push({
                type: 2,
                index: ++o
              });
            r.append(d[c], z());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === Mt)
          a.push({
            type: 2,
            index: o
          });
        else {
          let d = -1;
          for (; (d = r.data.indexOf($, d + 1)) !== -1; )
            a.push({
              type: 7,
              index: o
            }), d += $.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  var r, o, n, h;
  if (t === C)
    return t;
  let a = s !== void 0 ? (r = e._$Cl) === null || r === void 0 ? void 0 : r[s] : e._$Cu;
  const l = M(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((o = a == null ? void 0 : a._$AO) === null || o === void 0 || o.call(a, !1), l === void 0 ? a = void 0 : (a = new l(i), a._$AT(i, e, s)), s !== void 0 ? ((n = (h = e)._$Cl) !== null && n !== void 0 ? n : h._$Cl = [])[s] = a : e._$Cu = a), a !== void 0 && (t = E(i, a._$AS(i, t.values), a, s)), t;
}
class Gt {
  constructor(t, e) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const {
      el: {
        content: s
      },
      parts: r
    } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : S).importNode(s, !0);
    _.currentNode = o;
    let n = _.nextNode(), h = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (h === l.index) {
        let b;
        l.type === 2 ? b = new T(n, n.nextSibling, this, t) : l.type === 1 ? b = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (b = new ee(n, this, t)), this.v.push(b), l = r[++a];
      }
      h !== (l == null ? void 0 : l.index) && (n = _.nextNode(), h++);
    }
    return o;
  }
  m(t) {
    let e = 0;
    for (const s of this.v)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  constructor(t, e, s, r) {
    var o;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$C_ = (o = r == null ? void 0 : r.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$C_;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), M(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== C && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : Vt(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== u && M(this._$AH) ? this._$AA.nextSibling.data = t : this.k(S.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const {
      values: s,
      _$litType$: r
    } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = R.createElement(r.h, this.options)), r);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.m(s);
    else {
      const n = new Gt(o, this), h = n.p(this.options);
      n.m(s), this.k(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = bt.get(t.strings);
    return e === void 0 && bt.set(t.strings, e = new R(t)), e;
  }
  O(t) {
    Rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t)
      r === e.length ? e.push(s = new T(this.S(z()), this.S(z()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$C_ = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class q {
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      t = E(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== C, n && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        l = E(this, h[s + a], e, a), l === C && (l = this._$AH[a]), n || (n = !M(l) || l !== this._$AH[a]), l === u ? t = u : t !== u && (t += (l != null ? l : "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !r && this.P(t);
  }
  P(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Jt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const Qt = x ? x.emptyScript : "";
class Xt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== u ? this.element.setAttribute(this.name, Qt) : this.element.removeAttribute(this.name);
  }
}
class te extends q {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = E(this, t, e, 0)) !== null && s !== void 0 ? s : u) === C)
      return;
    const r = this._$AH, o = t === u && r !== u || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== u && (r === u || o);
    o && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ee {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const mt = B.litHtmlPolyfillSupport;
mt == null || mt(R, T), ((K = B.litHtmlVersions) !== null && K !== void 0 ? K : B.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z, G;
class A extends y {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = s.firstChild), s;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Kt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return C;
  }
}
A.finalized = !0, A._$litElement$ = !0, (Z = globalThis.litElementHydrateSupport) === null || Z === void 0 || Z.call(globalThis, {
  LitElement: A
});
const $t = globalThis.litElementPolyfillSupport;
$t == null || $t({
  LitElement: A
});
((G = globalThis.litElementVersions) !== null && G !== void 0 ? G : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = (i) => (t) => typeof t == "function" ? ((e, s) => (customElements.define(e, s), s))(i, t) : ((e, s) => {
  const {
    kind: r,
    elements: o
  } = s;
  return {
    kind: r,
    elements: o,
    finisher(n) {
      customElements.define(e, n);
    }
  };
})(i, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? {
  ...t,
  finisher(e) {
    e.createProperty(t.key, i);
  }
} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: t.key,
  initializer() {
    typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
  },
  finisher(e) {
    e.createProperty(t.key, i);
  }
};
function at(i) {
  return (t, e) => e !== void 0 ? ((s, r, o) => {
    r.constructor.createProperty(o, s);
  })(i, t, e) : ie(i, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J;
((J = window.HTMLSlotElement) === null || J === void 0 ? void 0 : J.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = (i) => i.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
}, oe = (i) => (...t) => ({
  _$litDirective$: i,
  values: t
});
class ne {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = (i, t) => {
  var e, s;
  const r = i._$AN;
  if (r === void 0)
    return !1;
  for (const o of r)
    (s = (e = o)._$AO) === null || s === void 0 || s.call(e, t, !1), P(o, t);
  return !0;
}, Y = (i) => {
  let t, e;
  do {
    if ((t = i._$AM) === void 0)
      break;
    e = t._$AN, e.delete(i), i = t;
  } while ((e == null ? void 0 : e.size) === 0);
}, Ot = (i) => {
  for (let t; t = i._$AM; i = t) {
    let e = t._$AN;
    if (e === void 0)
      t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(i))
      break;
    e.add(i), he(t);
  }
};
function ae(i) {
  this._$AN !== void 0 ? (Y(this), this._$AM = i, Ot(this)) : this._$AM = i;
}
function le(i, t = !1, e = 0) {
  const s = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0)
    if (t)
      if (Array.isArray(s))
        for (let o = e; o < s.length; o++)
          P(s[o], !1), Y(s[o]);
      else
        s != null && (P(s, !1), Y(s));
    else
      P(this, i);
}
const he = (i) => {
  var t, e, s, r;
  i.type == re.CHILD && ((t = (s = i)._$AP) !== null && t !== void 0 || (s._$AP = le), (e = (r = i)._$AQ) !== null && e !== void 0 || (r._$AQ = ae));
};
class de extends ne {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, s) {
    super._$AT(t, e, s), Ot(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    var s, r;
    t !== this.isConnected && (this.isConnected = t, t ? (s = this.reconnected) === null || s === void 0 || s.call(this) : (r = this.disconnected) === null || r === void 0 || r.call(this)), e && (P(this, t), Y(this));
  }
  setValue(t) {
    if (se(this._$Ct))
      this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = () => new ce();
class ce {
}
const Q = /* @__PURE__ */ new WeakMap(), yt = oe(class extends de {
  render(i) {
    return u;
  }
  update(i, [t]) {
    var e;
    const s = t !== this.Y;
    return s && this.Y !== void 0 && this.rt(void 0), (s || this.lt !== this.dt) && (this.Y = t, this.ct = (e = i.options) === null || e === void 0 ? void 0 : e.host, this.rt(this.dt = i.element)), u;
  }
  rt(i) {
    var t;
    if (typeof this.Y == "function") {
      const e = (t = this.ct) !== null && t !== void 0 ? t : globalThis;
      let s = Q.get(e);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), Q.set(e, s)), s.get(this.Y) !== void 0 && this.Y.call(this.ct, void 0), s.set(this.Y, i), i !== void 0 && this.Y.call(this.ct, i);
    } else
      this.Y.value = i;
  }
  get lt() {
    var i, t, e;
    return typeof this.Y == "function" ? (t = Q.get((i = this.ct) !== null && i !== void 0 ? i : globalThis)) === null || t === void 0 ? void 0 : t.get(this.Y) : (e = this.Y) === null || e === void 0 ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.dt && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.dt);
  }
});
var ue = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, m = function(i) {
  return typeof i == "string" ? i.length > 0 : typeof i == "number";
}, p = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * i) / e + 0;
}, g = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), i > e ? e : i > t ? i : t;
}, It = function(i) {
  return (i = isFinite(i) ? i % 360 : 0) > 0 ? i : i + 360;
}, _t = function(i) {
  return { r: g(i.r, 0, 255), g: g(i.g, 0, 255), b: g(i.b, 0, 255), a: g(i.a) };
}, X = function(i) {
  return { r: p(i.r), g: p(i.g), b: p(i.b), a: p(i.a, 3) };
}, pe = /^#([0-9a-f]{3,8})$/i, I = function(i) {
  var t = i.toString(16);
  return t.length < 2 ? "0" + t : t;
}, jt = function(i) {
  var t = i.r, e = i.g, s = i.b, r = i.a, o = Math.max(t, e, s), n = o - Math.min(t, e, s), h = n ? o === t ? (e - s) / n : o === e ? 2 + (s - t) / n : 4 + (t - e) / n : 0;
  return { h: 60 * (h < 0 ? h + 6 : h), s: o ? n / o * 100 : 0, v: o / 255 * 100, a: r };
}, Lt = function(i) {
  var t = i.h, e = i.s, s = i.v, r = i.a;
  t = t / 360 * 6, e /= 100, s /= 100;
  var o = Math.floor(t), n = s * (1 - e), h = s * (1 - (t - o) * e), a = s * (1 - (1 - t + o) * e), l = o % 6;
  return { r: 255 * [s, h, n, n, a, s][l], g: 255 * [a, s, s, h, n, n][l], b: 255 * [n, n, a, s, s, h][l], a: r };
}, At = function(i) {
  return { h: It(i.h), s: g(i.s, 0, 100), l: g(i.l, 0, 100), a: g(i.a) };
}, xt = function(i) {
  return { h: p(i.h), s: p(i.s), l: p(i.l), a: p(i.a, 3) };
}, St = function(i) {
  return Lt((e = (t = i).s, { h: t.h, s: (e *= ((s = t.l) < 50 ? s : 100 - s) / 100) > 0 ? 2 * e / (s + e) * 100 : 0, v: s + e, a: t.a }));
  var t, e, s;
}, U = function(i) {
  return { h: (t = jt(i)).h, s: (r = (200 - (e = t.s)) * (s = t.v) / 100) > 0 && r < 200 ? e * s / 100 / (r <= 100 ? r : 200 - r) * 100 : 0, l: r / 2, a: t.a };
  var t, e, s, r;
}, fe = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ge = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ve = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, be = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ct = { string: [[function(i) {
  var t = pe.exec(i);
  return t ? (i = t[1]).length <= 4 ? { r: parseInt(i[0] + i[0], 16), g: parseInt(i[1] + i[1], 16), b: parseInt(i[2] + i[2], 16), a: i.length === 4 ? p(parseInt(i[3] + i[3], 16) / 255, 2) : 1 } : i.length === 6 || i.length === 8 ? { r: parseInt(i.substr(0, 2), 16), g: parseInt(i.substr(2, 2), 16), b: parseInt(i.substr(4, 2), 16), a: i.length === 8 ? p(parseInt(i.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(i) {
  var t = ve.exec(i) || be.exec(i);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : _t({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(i) {
  var t = fe.exec(i) || ge.exec(i);
  if (!t)
    return null;
  var e, s, r = At({ h: (e = t[1], s = t[2], s === void 0 && (s = "deg"), Number(e) * (ue[s] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return St(r);
}, "hsl"]], object: [[function(i) {
  var t = i.r, e = i.g, s = i.b, r = i.a, o = r === void 0 ? 1 : r;
  return m(t) && m(e) && m(s) ? _t({ r: Number(t), g: Number(e), b: Number(s), a: Number(o) }) : null;
}, "rgb"], [function(i) {
  var t = i.h, e = i.s, s = i.l, r = i.a, o = r === void 0 ? 1 : r;
  if (!m(t) || !m(e) || !m(s))
    return null;
  var n = At({ h: Number(t), s: Number(e), l: Number(s), a: Number(o) });
  return St(n);
}, "hsl"], [function(i) {
  var t = i.h, e = i.s, s = i.v, r = i.a, o = r === void 0 ? 1 : r;
  if (!m(t) || !m(e) || !m(s))
    return null;
  var n = function(h) {
    return { h: It(h.h), s: g(h.s, 0, 100), v: g(h.v, 0, 100), a: g(h.a) };
  }({ h: Number(t), s: Number(e), v: Number(s), a: Number(o) });
  return Lt(n);
}, "hsv"]] }, Et = function(i, t) {
  for (var e = 0; e < t.length; e++) {
    var s = t[e][0](i);
    if (s)
      return [s, t[e][1]];
  }
  return [null, void 0];
}, me = function(i) {
  return typeof i == "string" ? Et(i.trim(), Ct.string) : typeof i == "object" && i !== null ? Et(i, Ct.object) : [null, void 0];
}, tt = function(i, t) {
  var e = U(i);
  return { h: e.h, s: g(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, et = function(i) {
  return (299 * i.r + 587 * i.g + 114 * i.b) / 1e3 / 255;
}, kt = function(i, t) {
  var e = U(i);
  return { h: e.h, s: e.s, l: g(e.l + 100 * t, 0, 100), a: e.a };
}, Nt = function() {
  function i(t) {
    this.parsed = me(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return i.prototype.isValid = function() {
    return this.parsed !== null;
  }, i.prototype.brightness = function() {
    return p(et(this.rgba), 2);
  }, i.prototype.isDark = function() {
    return et(this.rgba) < 0.5;
  }, i.prototype.isLight = function() {
    return et(this.rgba) >= 0.5;
  }, i.prototype.toHex = function() {
    return t = X(this.rgba), e = t.r, s = t.g, r = t.b, n = (o = t.a) < 1 ? I(p(255 * o)) : "", "#" + I(e) + I(s) + I(r) + n;
    var t, e, s, r, o, n;
  }, i.prototype.toRgb = function() {
    return X(this.rgba);
  }, i.prototype.toRgbString = function() {
    return t = X(this.rgba), e = t.r, s = t.g, r = t.b, (o = t.a) < 1 ? "rgba(" + e + ", " + s + ", " + r + ", " + o + ")" : "rgb(" + e + ", " + s + ", " + r + ")";
    var t, e, s, r, o;
  }, i.prototype.toHsl = function() {
    return xt(U(this.rgba));
  }, i.prototype.toHslString = function() {
    return t = xt(U(this.rgba)), e = t.h, s = t.s, r = t.l, (o = t.a) < 1 ? "hsla(" + e + ", " + s + "%, " + r + "%, " + o + ")" : "hsl(" + e + ", " + s + "%, " + r + "%)";
    var t, e, s, r, o;
  }, i.prototype.toHsv = function() {
    return t = jt(this.rgba), { h: p(t.h), s: p(t.s), v: p(t.v), a: p(t.a, 3) };
    var t;
  }, i.prototype.invert = function() {
    return f({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, i.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), f(tt(this.rgba, t));
  }, i.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), f(tt(this.rgba, -t));
  }, i.prototype.grayscale = function() {
    return f(tt(this.rgba, -1));
  }, i.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), f(kt(this.rgba, t));
  }, i.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), f(kt(this.rgba, -t));
  }, i.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, i.prototype.alpha = function(t) {
    return typeof t == "number" ? f({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : p(this.rgba.a, 3);
    var e;
  }, i.prototype.hue = function(t) {
    var e = U(this.rgba);
    return typeof t == "number" ? f({ h: t, s: e.s, l: e.l, a: e.a }) : p(e.h);
  }, i.prototype.isEqual = function(t) {
    return this.toHex() === f(t).toHex();
  }, i;
}(), f = function(i) {
  return i instanceof Nt ? i : new Nt(i);
};
const Dt = nt`/* ! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com */
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/
*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}
::before,
::after {
  --tw-content: '';
}
/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
*/
:host {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
}
/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/
hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}
/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/
abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}
/*
Remove the default font size and weight for headings.
*/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
/*
Reset links to optimize for opt-in styling instead of opt-out.
*/
a {
  color: inherit;
  text-decoration: inherit;
}
/*
Add the correct font weight in Edge and Safari.
*/
b,
strong {
  font-weight: bolder;
}
/*
1. Use the user's configured \`mono\` font family by default.
2. Correct the odd \`em\` font sizing in all browsers.
*/
code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}
/*
Add the correct font size in all browsers.
*/
small {
  font-size: 80%;
}
/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/
table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}
/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}
/*
Remove the inheritance of text transform in Edge and Firefox.
*/
button,
select {
  text-transform: none;
}
/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}
/*
Use the modern Firefox focus style for all focusable elements.
*/
:-moz-focusring {
  outline: auto;
}
/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/
:-moz-ui-invalid {
  box-shadow: none;
}
/*
Add the correct vertical alignment in Chrome and Firefox.
*/
progress {
  vertical-align: baseline;
}
/*
Correct the cursor style of increment and decrement buttons in Safari.
*/
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}
/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/
[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}
/*
Remove the inner padding in Chrome and Safari on macOS.
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}
/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/
::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}
/*
Add the correct display in Chrome and Safari.
*/
summary {
  display: list-item;
}
/*
Removes the default spacing and border for appropriate elements.
*/
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
  padding: 0;
}
legend {
  padding: 0;
}
ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}
/*
Prevent resizing textareas horizontally by default.
*/
textarea {
  resize: vertical;
}
/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/
input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}
/*
Set the default cursor for buttons.
*/
button,
[role="button"] {
  cursor: pointer;
}
/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}
/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}
/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/
img,
video {
  max-width: 100%;
  height: auto;
}
*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
::-webkit-backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
`;
var $e = Object.defineProperty, we = Object.getOwnPropertyDescriptor, F = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? we(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && $e(t, e, r), r;
};
function ye(i, t) {
  if (t === "hex")
    return f(i).toHex().toUpperCase();
  if (t === "rgb")
    return f(i).toRgbString();
  if (t === "hsl")
    return f(i).toHslString();
  throw "Unsupported Color Format";
}
let k = class extends A {
  constructor() {
    super(...arguments), this.labelContainerRef = wt(), this.colorCodeRef = wt();
  }
  copy() {
    var s;
    const i = this.labelContainerRef.value, t = this.colorCodeRef.value;
    if (!i || !t)
      return;
    this.copyTimeout && clearTimeout(this.copyTimeout), i.classList.add("copy-overlay");
    const e = (s = t.textContent) == null ? void 0 : s.trim();
    e && navigator.clipboard.writeText(e), this.copyTimeout = setTimeout(() => {
      i.classList.remove("copy-overlay");
    }, 1e3);
  }
  render() {
    return L`<div @click="${this.copy}" class="rounded h-24 group">
        <div
          class="rounded shadow cursor-copy h-24 group-hover:scale-90"
          style="background-color: ${this.color};"
        ></div>
      </div>
      <div ${yt(this.labelContainerRef)} class="relative">
        <div>${this.name}</div>
        <div ${yt(this.colorCodeRef)} class="text-gray-500 font-extralight">
          ${ye(this.color, this.format)}
        </div>
      </div>`;
  }
};
k.styles = [Dt, nt`.relative {
    position: relative
}
.h-24 {
    height: 6rem
}
.cursor-copy {
    cursor: copy
}
.rounded {
    border-radius: 0.25rem
}
.font-extralight {
    font-weight: 200
}
.text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity))
}
.shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}
      :host {
    display: flex;
    max-width: 12rem;
    flex-direction: column
}
      .copy-overlay::after {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(21 128 61 / var(--tw-text-opacity));
    --tw-content: 'Copied!';
    content: var(--tw-content)
}
      .group:hover .group-hover\\:scale-90 {
    --tw-scale-x: .9;
    --tw-scale-y: .9;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}
`];
F([at()], k.prototype, "name", 2);
F([at()], k.prototype, "color", 2);
F([at()], k.prototype, "format", 2);
k = F([Ht("ag-color-square")], k);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* Pt(i, t) {
  if (i !== void 0) {
    let e = 0;
    for (const s of i)
      yield t(s, e++);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _e(i, t, e) {
  return i ? t() : e == null ? void 0 : e();
}
var Ae = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, Se = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? xe(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && Ae(t, e, r), r;
};
let st = class extends A {
  constructor() {
    super(...arguments), this.colorMap = {};
  }
  loadColorMap(i) {
    this.colorMap = i, this.requestUpdate();
  }
  render() {
    return Pt(Object.entries(this.colorMap), ([i, t]) => L`<div>
        <div class="text-2xl capitalize font-semibold mb-2">${i}</div>
        <div
          class="grid gap-x-1 gap-y-5"
          style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
        >
          ${_e(typeof t == "string", () => L`<ag-color-square
              name="${i}"
              color="${t}"
              format="hex"
            ></ag-color-square>`, () => Pt(Object.entries(t), ([s, r]) => L`<ag-color-square
                    name="${`${i} ${s}`}"
                    color="${r}"
                    format="hex"
                  ></ag-color-square>`))}
        </div>
      </div>`);
  }
};
st.styles = [Dt, nt`.mb-2 {
    margin-bottom: 0.5rem
}
.grid {
    display: grid
}
.gap-x-1 {
    column-gap: 0.25rem
}
.gap-y-5 {
    row-gap: 1.25rem
}
.text-2xl {
    font-size: 1.5rem;
    line-height: 2rem
}
.font-semibold {
    font-weight: 600
}
.capitalize {
    text-transform: capitalize
}
      :host {
    display: flex;
    flex-direction: column;
    gap: 1.75rem
}
`];
st = Se([Ht("ag-color-page")], st);
export {
  st as AGColorPage,
  k as AGColorSquare
};
