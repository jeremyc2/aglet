/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = window, et = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), ot = /* @__PURE__ */ new WeakMap();
class Et {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== it)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Rt = (i) => new Et(typeof i == "string" ? i : i + "", void 0, it), rt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, s, o) => r + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new Et(e, i, it);
}, Tt = (i, t) => {
  et ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const r = document.createElement("style"), s = j.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, i.appendChild(r);
  });
}, nt = et ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules)
    e += r.cssText;
  return Rt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var F;
const I = window, at = I.trustedTypes, jt = at ? at.emptyScript : "", lt = I.reactiveElementPolyfillSupport, Y = {
  toAttribute(i, t) {
    switch (t) {
      case Boolean:
        i = i ? jt : null;
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
}, kt = (i, t) => t !== i && (t == t || i == i), q = {
  attribute: !0,
  type: String,
  converter: Y,
  reflect: !1,
  hasChanged: kt
};
class $ extends HTMLElement {
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
    return this.elementProperties.forEach((e, r) => {
      const s = this._$Ep(r, e);
      s !== void 0 && (this._$Ev.set(s, r), t.push(s));
    }), t;
  }
  static createProperty(t, e = q) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const r = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, r, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    return {
      get() {
        return this[e];
      },
      set(s) {
        const o = this[t];
        this[e] = s, this.requestUpdate(t, o, r);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || q;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, r = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of r)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r)
        e.unshift(nt(s));
    } else
      t !== void 0 && e.push(nt(t));
    return e;
  }
  static _$Ep(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, r;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) === null || r === void 0 || r.call(t));
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
    return Tt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) === null || r === void 0 ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) === null || r === void 0 ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$EO(t, e, r = q) {
    var s;
    const o = this.constructor._$Ep(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const n = (((s = r.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? r.converter : Y).toAttribute(e, r.type);
      this._$El = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var r;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const n = s.getPropertyOptions(o), h = typeof n.converter == "function" ? {
        fromAttribute: n.converter
      } : ((r = n.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? n.converter : Y;
      this._$El = o, this[o] = h.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, r) {
    let s = !0;
    t !== void 0 && (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || kt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), r.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, r))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      }), this.update(r)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var s;
      return (s = r.hostUpdated) === null || s === void 0 ? void 0 : s.call(r);
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
    this._$EC !== void 0 && (this._$EC.forEach((e, r) => this._$EO(r, this[r], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
$.finalized = !0, $.elementProperties = /* @__PURE__ */ new Map(), $.elementStyles = [], $.shadowRootOptions = {
  mode: "open"
}, lt == null || lt({
  ReactiveElement: $
}), ((F = I.reactiveElementVersions) !== null && F !== void 0 ? F : I.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var V;
const L = window, x = L.trustedTypes, ht = x ? x.createPolicy("lit-html", {
  createHTML: (i) => i
}) : void 0, w = `lit$${(Math.random() + "").slice(9)}$`, Ct = "?" + w, It = `<${Ct}>`, S = document, U = (i = "") => S.createComment(i), z = (i) => i === null || typeof i != "object" && typeof i != "function", Nt = Array.isArray, Lt = (i) => Nt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, ct = />/g, y = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, pt = /"/g, Pt = /^(?:script|style|textarea|title)$/i, Dt = (i) => (t, ...e) => ({
  _$litType$: i,
  strings: t,
  values: e
}), Q = Dt(1), E = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), Bt = (i, t, e) => {
  var r, s;
  const o = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : t;
  let n = o._$litPart$;
  if (n === void 0) {
    const h = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = n = new M(t.insertBefore(U(), h), h, void 0, e != null ? e : {});
  }
  return n._$AI(i), n;
}, _ = S.createTreeWalker(S, 129, null, !1), Ft = (i, t) => {
  const e = i.length - 1, r = [];
  let s, o = t === 2 ? "<svg>" : "", n = N;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let v, d, c = -1, b = 0;
    for (; b < l.length && (n.lastIndex = b, d = n.exec(l), d !== null); )
      b = n.lastIndex, n === N ? d[1] === "!--" ? n = dt : d[1] !== void 0 ? n = ct : d[2] !== void 0 ? (Pt.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = y) : d[3] !== void 0 && (n = y) : n === y ? d[0] === ">" ? (n = s != null ? s : N, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, v = d[1], n = d[3] === void 0 ? y : d[3] === '"' ? pt : ut) : n === pt || n === ut ? n = y : n === dt || n === ct ? n = N : (n = y, s = void 0);
    const O = n === y && i[a + 1].startsWith("/>") ? " " : "";
    o += n === N ? l + It : c >= 0 ? (r.push(v), l.slice(0, c) + "$lit$" + l.slice(c) + w + O) : l + w + (c === -2 ? (r.push(void 0), a) : O);
  }
  const h = o + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [ht !== void 0 ? ht.createHTML(h) : h, r];
};
class H {
  constructor({
    strings: t,
    _$litType$: e
  }, r) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [l, v] = Ft(t, e);
    if (this.el = H.createElement(l, r), _.currentNode = this.el.content, e === 2) {
      const d = this.el.content, c = d.firstChild;
      c.remove(), d.append(...c.childNodes);
    }
    for (; (s = _.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const d = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(w)) {
              const b = v[n++];
              if (d.push(c), b !== void 0) {
                const O = s.getAttribute(b.toLowerCase() + "$lit$").split(w), R = /([.?@])?(.*)/.exec(b);
                a.push({
                  type: 1,
                  index: o,
                  name: R[2],
                  strings: O,
                  ctor: R[1] === "." ? Vt : R[1] === "?" ? Kt : R[1] === "@" ? Zt : D
                });
              } else
                a.push({
                  type: 6,
                  index: o
                });
            }
          for (const c of d)
            s.removeAttribute(c);
        }
        if (Pt.test(s.tagName)) {
          const d = s.textContent.split(w), c = d.length - 1;
          if (c > 0) {
            s.textContent = x ? x.emptyScript : "";
            for (let b = 0; b < c; b++)
              s.append(d[b], U()), _.nextNode(), a.push({
                type: 2,
                index: ++o
              });
            s.append(d[c], U());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === Ct)
          a.push({
            type: 2,
            index: o
          });
        else {
          let d = -1;
          for (; (d = s.data.indexOf(w, d + 1)) !== -1; )
            a.push({
              type: 7,
              index: o
            }), d += w.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const r = S.createElement("template");
    return r.innerHTML = t, r;
  }
}
function k(i, t, e = i, r) {
  var s, o, n, h;
  if (t === E)
    return t;
  let a = r !== void 0 ? (s = e._$Cl) === null || s === void 0 ? void 0 : s[r] : e._$Cu;
  const l = z(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((o = a == null ? void 0 : a._$AO) === null || o === void 0 || o.call(a, !1), l === void 0 ? a = void 0 : (a = new l(i), a._$AT(i, e, r)), r !== void 0 ? ((n = (h = e)._$Cl) !== null && n !== void 0 ? n : h._$Cl = [])[r] = a : e._$Cu = a), a !== void 0 && (t = k(i, a._$AS(i, t.values), a, r)), t;
}
class qt {
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
        content: r
      },
      parts: s
    } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : S).importNode(r, !0);
    _.currentNode = o;
    let n = _.nextNode(), h = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (h === l.index) {
        let v;
        l.type === 2 ? v = new M(n, n.nextSibling, this, t) : l.type === 1 ? v = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (v = new Gt(n, this, t)), this.v.push(v), l = s[++a];
      }
      h !== (l == null ? void 0 : l.index) && (n = _.nextNode(), h++);
    }
    return o;
  }
  m(t) {
    let e = 0;
    for (const r of this.v)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class M {
  constructor(t, e, r, s) {
    var o;
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = s, this._$C_ = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
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
    t = k(this, t, e), z(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : Lt(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== p && z(this._$AH) ? this._$AA.nextSibling.data = t : this.k(S.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const {
      values: r,
      _$litType$: s
    } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = H.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.m(r);
    else {
      const n = new qt(o, this), h = n.p(this.options);
      n.m(r), this.k(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new H(t)), e;
  }
  O(t) {
    Nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const o of t)
      s === e.length ? e.push(r = new M(this.S(U()), this.S(U()), this, this.options)) : r = e[s], r._$AI(o), s++;
    s < e.length && (this._$AR(r && r._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$C_ = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class D {
  constructor(t, e, r, s, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, r, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      t = k(this, t, e, 0), n = !z(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        l = k(this, h[r + a], e, a), l === E && (l = this._$AH[a]), n || (n = !z(l) || l !== this._$AH[a]), l === p ? t = p : t !== p && (t += (l != null ? l : "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !s && this.P(t);
  }
  P(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Vt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
const Wt = x ? x.emptyScript : "";
class Kt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== p ? this.element.setAttribute(this.name, Wt) : this.element.removeAttribute(this.name);
  }
}
class Zt extends D {
  constructor(t, e, r, s, o) {
    super(t, e, r, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = k(this, t, e, 0)) !== null && r !== void 0 ? r : p) === E)
      return;
    const s = this._$AH, o = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && r !== void 0 ? r : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const gt = L.litHtmlPolyfillSupport;
gt == null || gt(H, M), ((V = L.litHtmlVersions) !== null && V !== void 0 ? V : L.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W, K;
class A extends $ {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const r = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = r.firstChild), r;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
A.finalized = !0, A._$litElement$ = !0, (W = globalThis.litElementHydrateSupport) === null || W === void 0 || W.call(globalThis, {
  LitElement: A
});
const bt = globalThis.litElementPolyfillSupport;
bt == null || bt({
  LitElement: A
});
((K = globalThis.litElementVersions) !== null && K !== void 0 ? K : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = (i) => (t) => typeof t == "function" ? ((e, r) => (customElements.define(e, r), r))(i, t) : ((e, r) => {
  const {
    kind: s,
    elements: o
  } = r;
  return {
    kind: s,
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
const Jt = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? {
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
function st(i) {
  return (t, e) => e !== void 0 ? ((r, s, o) => {
    s.constructor.createProperty(o, r);
  })(i, t, e) : Jt(i, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z;
((Z = window.HTMLSlotElement) === null || Z === void 0 ? void 0 : Z.prototype.assignedElements) != null;
var Xt = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, m = function(i) {
  return typeof i == "string" ? i.length > 0 : typeof i == "number";
}, u = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * i) / e + 0;
}, g = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), i > e ? e : i > t ? i : t;
}, zt = function(i) {
  return (i = isFinite(i) ? i % 360 : 0) > 0 ? i : i + 360;
}, vt = function(i) {
  return { r: g(i.r, 0, 255), g: g(i.g, 0, 255), b: g(i.b, 0, 255), a: g(i.a) };
}, G = function(i) {
  return { r: u(i.r), g: u(i.g), b: u(i.b), a: u(i.a, 3) };
}, Yt = /^#([0-9a-f]{3,8})$/i, T = function(i) {
  var t = i.toString(16);
  return t.length < 2 ? "0" + t : t;
}, Ht = function(i) {
  var t = i.r, e = i.g, r = i.b, s = i.a, o = Math.max(t, e, r), n = o - Math.min(t, e, r), h = n ? o === t ? (e - r) / n : o === e ? 2 + (r - t) / n : 4 + (t - e) / n : 0;
  return { h: 60 * (h < 0 ? h + 6 : h), s: o ? n / o * 100 : 0, v: o / 255 * 100, a: s };
}, Mt = function(i) {
  var t = i.h, e = i.s, r = i.v, s = i.a;
  t = t / 360 * 6, e /= 100, r /= 100;
  var o = Math.floor(t), n = r * (1 - e), h = r * (1 - (t - o) * e), a = r * (1 - (1 - t + o) * e), l = o % 6;
  return { r: 255 * [r, h, n, n, a, r][l], g: 255 * [a, r, r, h, n, n][l], b: 255 * [n, n, a, r, r, h][l], a: s };
}, mt = function(i) {
  return { h: zt(i.h), s: g(i.s, 0, 100), l: g(i.l, 0, 100), a: g(i.a) };
}, wt = function(i) {
  return { h: u(i.h), s: u(i.s), l: u(i.l), a: u(i.a, 3) };
}, yt = function(i) {
  return Mt((e = (t = i).s, { h: t.h, s: (e *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * e / (r + e) * 100 : 0, v: r + e, a: t.a }));
  var t, e, r;
}, P = function(i) {
  return { h: (t = Ht(i)).h, s: (s = (200 - (e = t.s)) * (r = t.v) / 100) > 0 && s < 200 ? e * r / 100 / (s <= 100 ? s : 200 - s) * 100 : 0, l: s / 2, a: t.a };
  var t, e, r, s;
}, Qt = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, te = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ee = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ie = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, $t = { string: [[function(i) {
  var t = Yt.exec(i);
  return t ? (i = t[1]).length <= 4 ? { r: parseInt(i[0] + i[0], 16), g: parseInt(i[1] + i[1], 16), b: parseInt(i[2] + i[2], 16), a: i.length === 4 ? u(parseInt(i[3] + i[3], 16) / 255, 2) : 1 } : i.length === 6 || i.length === 8 ? { r: parseInt(i.substr(0, 2), 16), g: parseInt(i.substr(2, 2), 16), b: parseInt(i.substr(4, 2), 16), a: i.length === 8 ? u(parseInt(i.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(i) {
  var t = ee.exec(i) || ie.exec(i);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : vt({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(i) {
  var t = Qt.exec(i) || te.exec(i);
  if (!t)
    return null;
  var e, r, s = mt({ h: (e = t[1], r = t[2], r === void 0 && (r = "deg"), Number(e) * (Xt[r] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return yt(s);
}, "hsl"]], object: [[function(i) {
  var t = i.r, e = i.g, r = i.b, s = i.a, o = s === void 0 ? 1 : s;
  return m(t) && m(e) && m(r) ? vt({ r: Number(t), g: Number(e), b: Number(r), a: Number(o) }) : null;
}, "rgb"], [function(i) {
  var t = i.h, e = i.s, r = i.l, s = i.a, o = s === void 0 ? 1 : s;
  if (!m(t) || !m(e) || !m(r))
    return null;
  var n = mt({ h: Number(t), s: Number(e), l: Number(r), a: Number(o) });
  return yt(n);
}, "hsl"], [function(i) {
  var t = i.h, e = i.s, r = i.v, s = i.a, o = s === void 0 ? 1 : s;
  if (!m(t) || !m(e) || !m(r))
    return null;
  var n = function(h) {
    return { h: zt(h.h), s: g(h.s, 0, 100), v: g(h.v, 0, 100), a: g(h.a) };
  }({ h: Number(t), s: Number(e), v: Number(r), a: Number(o) });
  return Mt(n);
}, "hsv"]] }, _t = function(i, t) {
  for (var e = 0; e < t.length; e++) {
    var r = t[e][0](i);
    if (r)
      return [r, t[e][1]];
  }
  return [null, void 0];
}, re = function(i) {
  return typeof i == "string" ? _t(i.trim(), $t.string) : typeof i == "object" && i !== null ? _t(i, $t.object) : [null, void 0];
}, J = function(i, t) {
  var e = P(i);
  return { h: e.h, s: g(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, X = function(i) {
  return (299 * i.r + 587 * i.g + 114 * i.b) / 1e3 / 255;
}, At = function(i, t) {
  var e = P(i);
  return { h: e.h, s: e.s, l: g(e.l + 100 * t, 0, 100), a: e.a };
}, xt = function() {
  function i(t) {
    this.parsed = re(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return i.prototype.isValid = function() {
    return this.parsed !== null;
  }, i.prototype.brightness = function() {
    return u(X(this.rgba), 2);
  }, i.prototype.isDark = function() {
    return X(this.rgba) < 0.5;
  }, i.prototype.isLight = function() {
    return X(this.rgba) >= 0.5;
  }, i.prototype.toHex = function() {
    return t = G(this.rgba), e = t.r, r = t.g, s = t.b, n = (o = t.a) < 1 ? T(u(255 * o)) : "", "#" + T(e) + T(r) + T(s) + n;
    var t, e, r, s, o, n;
  }, i.prototype.toRgb = function() {
    return G(this.rgba);
  }, i.prototype.toRgbString = function() {
    return t = G(this.rgba), e = t.r, r = t.g, s = t.b, (o = t.a) < 1 ? "rgba(" + e + ", " + r + ", " + s + ", " + o + ")" : "rgb(" + e + ", " + r + ", " + s + ")";
    var t, e, r, s, o;
  }, i.prototype.toHsl = function() {
    return wt(P(this.rgba));
  }, i.prototype.toHslString = function() {
    return t = wt(P(this.rgba)), e = t.h, r = t.s, s = t.l, (o = t.a) < 1 ? "hsla(" + e + ", " + r + "%, " + s + "%, " + o + ")" : "hsl(" + e + ", " + r + "%, " + s + "%)";
    var t, e, r, s, o;
  }, i.prototype.toHsv = function() {
    return t = Ht(this.rgba), { h: u(t.h), s: u(t.s), v: u(t.v), a: u(t.a, 3) };
    var t;
  }, i.prototype.invert = function() {
    return f({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, i.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), f(J(this.rgba, t));
  }, i.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), f(J(this.rgba, -t));
  }, i.prototype.grayscale = function() {
    return f(J(this.rgba, -1));
  }, i.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), f(At(this.rgba, t));
  }, i.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), f(At(this.rgba, -t));
  }, i.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, i.prototype.alpha = function(t) {
    return typeof t == "number" ? f({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : u(this.rgba.a, 3);
    var e;
  }, i.prototype.hue = function(t) {
    var e = P(this.rgba);
    return typeof t == "number" ? f({ h: t, s: e.s, l: e.l, a: e.a }) : u(e.h);
  }, i.prototype.isEqual = function(t) {
    return this.toHex() === f(t).toHex();
  }, i;
}(), f = function(i) {
  return i instanceof xt ? i : new xt(i);
};
const Ot = rt`/* ! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com */
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
var se = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, B = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? oe(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = (r ? n(t, e, s) : n(s)) || s);
  return r && s && se(t, e, s), s;
};
function ne(i, t) {
  if (t === "hex")
    return f(i).toHex().toUpperCase();
  if (t === "rgb")
    return f(i).toRgbString();
  if (t === "hsl")
    return f(i).toHslString();
  throw "Unsupported Color Format";
}
let C = class extends A {
  render() {
    return Q`<div class="rounded h-24 group">
        <div
          class="rounded shadow cursor-copy h-24 group-hover:scale-90"
          style="background-color: ${ne(this.color, this.format)};"
        ></div>
      </div>
      <div class="relative">
        <div>${this.name}</div>
        <div class="text-gray-500 font-extralight"></div>
      </div>`;
  }
};
C.styles = [Ot, rt`.relative {
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
      .group:hover .group-hover\\:scale-90 {
    --tw-scale-x: .9;
    --tw-scale-y: .9;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}
`];
B([st()], C.prototype, "name", 2);
B([st()], C.prototype, "color", 2);
B([st()], C.prototype, "format", 2);
C = B([Ut("ag-color-square")], C);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* St(i, t) {
  if (i !== void 0) {
    let e = 0;
    for (const r of i)
      yield t(r, e++);
  }
}
var ae = Object.defineProperty, le = Object.getOwnPropertyDescriptor, he = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? le(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = (r ? n(t, e, s) : n(s)) || s);
  return r && s && ae(t, e, s), s;
};
let tt = class extends A {
  constructor() {
    super(...arguments), this.colorMap = {};
  }
  loadColorMap(i) {
    this.colorMap = i, this.requestUpdate();
  }
  render() {
    return St(Object.entries(this.colorMap), ([i, t]) => Q`<div>
        <div class="text-2xl font-semibold mb-2">${i}</div>
        <div
          class="grid gap-x-1 gap-y-5"
          style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
        >
          ${St(Object.entries(t), ([e, r]) => Q`<ag-color-square
              name="${`${i}-${e}`}"
              color="${r}"
              format="hex"
            ></ag-color-square>`)}
        </div>
      </div>`);
  }
};
tt.styles = [Ot, rt`.mb-2 {
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
      :host {
    display: flex;
    flex-direction: column;
    gap: 1.75rem
}
`];
tt = he([Ut("ag-color-page")], tt);
export {
  tt as AGColorPage,
  C as AGColorSquare
};
