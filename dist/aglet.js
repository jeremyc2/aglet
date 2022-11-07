/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = window, ht = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, dt = Symbol(), bt = /* @__PURE__ */ new WeakMap();
class It {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== dt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ht && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = bt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && bt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Gt = (i) => new It(typeof i == "string" ? i : i + "", void 0, dt), K = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, o, s) => r + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new It(e, i, dt);
}, Kt = (i, t) => {
  ht ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const r = document.createElement("style"), o = q.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = e.cssText, i.appendChild(r);
  });
}, mt = ht ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules)
    e += r.cssText;
  return Gt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z;
const W = window, wt = W.trustedTypes, Xt = wt ? wt.emptyScript : "", yt = W.reactiveElementPolyfillSupport, lt = {
  toAttribute(i, t) {
    switch (t) {
      case Boolean:
        i = i ? Xt : null;
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
}, Lt = (i, t) => t !== i && (t == t || i == i), Q = {
  attribute: !0,
  type: String,
  converter: lt,
  reflect: !1,
  hasChanged: Lt
};
class E extends HTMLElement {
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
      const o = this._$Ep(r, e);
      o !== void 0 && (this._$Ev.set(o, r), t.push(o));
    }), t;
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const r = typeof t == "symbol" ? Symbol() : "__" + t, o = this.getPropertyDescriptor(t, r, e);
      o !== void 0 && Object.defineProperty(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    return {
      get() {
        return this[e];
      },
      set(o) {
        const s = this[t];
        this[e] = o, this.requestUpdate(t, s, r);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || Q;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, r = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const o of r)
        this.createProperty(o, e[o]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const o of r)
        e.unshift(mt(o));
    } else
      t !== void 0 && e.push(mt(t));
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
    return Kt(e, this.constructor.elementStyles), e;
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
  _$EO(t, e, r = Q) {
    var o;
    const s = this.constructor._$Ep(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const n = (((o = r.converter) === null || o === void 0 ? void 0 : o.toAttribute) !== void 0 ? r.converter : lt).toAttribute(e, r.type);
      this._$El = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var r;
    const o = this.constructor, s = o._$Ev.get(t);
    if (s !== void 0 && this._$El !== s) {
      const n = o.getPropertyOptions(s), c = typeof n.converter == "function" ? {
        fromAttribute: n.converter
      } : ((r = n.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? n.converter : lt;
      this._$El = s, this[s] = c.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, r) {
    let o = !0;
    t !== void 0 && (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || Lt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), r.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, r))) : o = !1), !this.isUpdatePending && o && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((o, s) => this[s] = o), this._$Ei = void 0);
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (t = this._$ES) === null || t === void 0 || t.forEach((o) => {
        var s;
        return (s = o.hostUpdate) === null || s === void 0 ? void 0 : s.call(o);
      }), this.update(r)) : this._$Ek();
    } catch (o) {
      throw e = !1, this._$Ek(), o;
    }
    e && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var o;
      return (o = r.hostUpdated) === null || o === void 0 ? void 0 : o.call(r);
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
E.finalized = !0, E.elementProperties = /* @__PURE__ */ new Map(), E.elementStyles = [], E.shadowRootOptions = {
  mode: "open"
}, yt == null || yt({
  ReactiveElement: E
}), ((Z = W.reactiveElementVersions) !== null && Z !== void 0 ? Z : W.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var tt;
const J = window, N = J.trustedTypes, $t = N ? N.createPolicy("lit-html", {
  createHTML: (i) => i
}) : void 0, y = `lit$${(Math.random() + "").slice(9)}$`, Dt = "?" + y, Zt = `<${Dt}>`, T = document, R = (i = "") => T.createComment(i), j = (i) => i === null || typeof i != "object" && typeof i != "function", Bt = Array.isArray, Qt = (i) => Bt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, xt = />/g, A = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), At = /'/g, St = /"/g, Ft = /^(?:script|style|textarea|title)$/i, te = (i) => (t, ...e) => ({
  _$litType$: i,
  strings: t,
  values: e
}), I = te(1), $ = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), ee = (i, t, e) => {
  var r, o;
  const s = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : t;
  let n = s._$litPart$;
  if (n === void 0) {
    const c = (o = e == null ? void 0 : e.renderBefore) !== null && o !== void 0 ? o : null;
    s._$litPart$ = n = new D(t.insertBefore(R(), c), c, void 0, e != null ? e : {});
  }
  return n._$AI(i), n;
}, k = T.createTreeWalker(T, 129, null, !1), ie = (i, t) => {
  const e = i.length - 1, r = [];
  let o, s = t === 2 ? "<svg>" : "", n = M;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let m, h, u = -1, b = 0;
    for (; b < l.length && (n.lastIndex = b, h = n.exec(l), h !== null); )
      b = n.lastIndex, n === M ? h[1] === "!--" ? n = _t : h[1] !== void 0 ? n = xt : h[2] !== void 0 ? (Ft.test(h[2]) && (o = RegExp("</" + h[2], "g")), n = A) : h[3] !== void 0 && (n = A) : n === A ? h[0] === ">" ? (n = o != null ? o : M, u = -1) : h[1] === void 0 ? u = -2 : (u = n.lastIndex - h[2].length, m = h[1], n = h[3] === void 0 ? A : h[3] === '"' ? St : At) : n === St || n === At ? n = A : n === _t || n === xt ? n = M : (n = A, o = void 0);
    const F = n === A && i[a + 1].startsWith("/>") ? " " : "";
    s += n === M ? l + Zt : u >= 0 ? (r.push(m), l.slice(0, u) + "$lit$" + l.slice(u) + y + F) : l + y + (u === -2 ? (r.push(void 0), a) : F);
  }
  const c = s + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [$t !== void 0 ? $t.createHTML(c) : c, r];
};
class L {
  constructor({
    strings: t,
    _$litType$: e
  }, r) {
    let o;
    this.parts = [];
    let s = 0, n = 0;
    const c = t.length - 1, a = this.parts, [l, m] = ie(t, e);
    if (this.el = L.createElement(l, r), k.currentNode = this.el.content, e === 2) {
      const h = this.el.content, u = h.firstChild;
      u.remove(), h.append(...u.childNodes);
    }
    for (; (o = k.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) {
          const h = [];
          for (const u of o.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(y)) {
              const b = m[n++];
              if (h.push(u), b !== void 0) {
                const F = o.getAttribute(b.toLowerCase() + "$lit$").split(y), Y = /([.?@])?(.*)/.exec(b);
                a.push({
                  type: 1,
                  index: s,
                  name: Y[2],
                  strings: F,
                  ctor: Y[1] === "." ? oe : Y[1] === "?" ? ne : Y[1] === "@" ? ae : X
                });
              } else
                a.push({
                  type: 6,
                  index: s
                });
            }
          for (const u of h)
            o.removeAttribute(u);
        }
        if (Ft.test(o.tagName)) {
          const h = o.textContent.split(y), u = h.length - 1;
          if (u > 0) {
            o.textContent = N ? N.emptyScript : "";
            for (let b = 0; b < u; b++)
              o.append(h[b], R()), k.nextNode(), a.push({
                type: 2,
                index: ++s
              });
            o.append(h[u], R());
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === Dt)
          a.push({
            type: 2,
            index: s
          });
        else {
          let h = -1;
          for (; (h = o.data.indexOf(y, h + 1)) !== -1; )
            a.push({
              type: 7,
              index: s
            }), h += y.length - 1;
        }
      s++;
    }
  }
  static createElement(t, e) {
    const r = T.createElement("template");
    return r.innerHTML = t, r;
  }
}
function P(i, t, e = i, r) {
  var o, s, n, c;
  if (t === $)
    return t;
  let a = r !== void 0 ? (o = e._$Cl) === null || o === void 0 ? void 0 : o[r] : e._$Cu;
  const l = j(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((s = a == null ? void 0 : a._$AO) === null || s === void 0 || s.call(a, !1), l === void 0 ? a = void 0 : (a = new l(i), a._$AT(i, e, r)), r !== void 0 ? ((n = (c = e)._$Cl) !== null && n !== void 0 ? n : c._$Cl = [])[r] = a : e._$Cu = a), a !== void 0 && (t = P(i, a._$AS(i, t.values), a, r)), t;
}
class re {
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
      parts: o
    } = this._$AD, s = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : T).importNode(r, !0);
    k.currentNode = s;
    let n = k.nextNode(), c = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (c === l.index) {
        let m;
        l.type === 2 ? m = new D(n, n.nextSibling, this, t) : l.type === 1 ? m = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (m = new le(n, this, t)), this.v.push(m), l = o[++a];
      }
      c !== (l == null ? void 0 : l.index) && (n = k.nextNode(), c++);
    }
    return s;
  }
  m(t) {
    let e = 0;
    for (const r of this.v)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class D {
  constructor(t, e, r, o) {
    var s;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = o, this._$C_ = (s = o == null ? void 0 : o.isConnected) === null || s === void 0 || s;
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
    t = P(this, t, e), j(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== $ && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : Qt(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== d && j(this._$AH) ? this._$AA.nextSibling.data = t : this.k(T.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const {
      values: r,
      _$litType$: o
    } = t, s = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = L.createElement(o.h, this.options)), o);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === s)
      this._$AH.m(r);
    else {
      const n = new re(s, this), c = n.p(this.options);
      n.m(r), this.k(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Ct.get(t.strings);
    return e === void 0 && Ct.set(t.strings, e = new L(t)), e;
  }
  O(t) {
    Bt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, o = 0;
    for (const s of t)
      o === e.length ? e.push(r = new D(this.S(R()), this.S(R()), this, this.options)) : r = e[o], r._$AI(s), o++;
    o < e.length && (this._$AR(r && r._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$C_ = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class X {
  constructor(t, e, r, o, s) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = d;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, r, o) {
    const s = this.strings;
    let n = !1;
    if (s === void 0)
      t = P(this, t, e, 0), n = !j(t) || t !== this._$AH && t !== $, n && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = s[0], a = 0; a < s.length - 1; a++)
        l = P(this, c[r + a], e, a), l === $ && (l = this._$AH[a]), n || (n = !j(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l != null ? l : "") + s[a + 1]), this._$AH[a] = l;
    }
    n && !o && this.P(t);
  }
  P(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class oe extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
const se = N ? N.emptyScript : "";
class ne extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== d ? this.element.setAttribute(this.name, se) : this.element.removeAttribute(this.name);
  }
}
class ae extends X {
  constructor(t, e, r, o, s) {
    super(t, e, r, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = P(this, t, e, 0)) !== null && r !== void 0 ? r : d) === $)
      return;
    const o = this._$AH, s = t === d && o !== d || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== d && (o === d || s);
    s && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && r !== void 0 ? r : this.element, t) : this._$AH.handleEvent(t);
  }
}
class le {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const Et = J.litHtmlPolyfillSupport;
Et == null || Et(L, D), ((tt = J.litHtmlVersions) !== null && tt !== void 0 ? tt : J.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et, it;
class S extends E {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ee(e, this.renderRoot, this.renderOptions);
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
    return $;
  }
}
S.finalized = !0, S._$litElement$ = !0, (et = globalThis.litElementHydrateSupport) === null || et === void 0 || et.call(globalThis, {
  LitElement: S
});
const kt = globalThis.litElementPolyfillSupport;
kt == null || kt({
  LitElement: S
});
((it = globalThis.litElementVersions) !== null && it !== void 0 ? it : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = (i) => (t) => typeof t == "function" ? ((e, r) => (customElements.define(e, r), r))(i, t) : ((e, r) => {
  const {
    kind: o,
    elements: s
  } = r;
  return {
    kind: o,
    elements: s,
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
const ce = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? {
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
function f(i) {
  return (t, e) => e !== void 0 ? ((r, o, s) => {
    o.constructor.createProperty(s, r);
  })(i, t, e) : ce(i, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Yt(i) {
  return f({
    ...i,
    state: !0
  });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt;
((rt = window.HTMLSlotElement) === null || rt === void 0 ? void 0 : rt.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = (i) => i.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
}, ft = (i) => (...t) => ({
  _$litDirective$: i,
  values: t
});
class gt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, r) {
    this._$Ct = t, this._$AM = e, this._$Ci = r;
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
const U = (i, t) => {
  var e, r;
  const o = i._$AN;
  if (o === void 0)
    return !1;
  for (const s of o)
    (r = (e = s)._$AO) === null || r === void 0 || r.call(e, t, !1), U(s, t);
  return !0;
}, G = (i) => {
  let t, e;
  do {
    if ((t = i._$AM) === void 0)
      break;
    e = t._$AN, e.delete(i), i = t;
  } while ((e == null ? void 0 : e.size) === 0);
}, Vt = (i) => {
  for (let t; t = i._$AM; i = t) {
    let e = t._$AN;
    if (e === void 0)
      t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(i))
      break;
    e.add(i), pe(t);
  }
};
function de(i) {
  this._$AN !== void 0 ? (G(this), this._$AM = i, Vt(this)) : this._$AM = i;
}
function ue(i, t = !1, e = 0) {
  const r = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0)
    if (t)
      if (Array.isArray(r))
        for (let s = e; s < r.length; s++)
          U(r[s], !1), G(r[s]);
      else
        r != null && (U(r, !1), G(r));
    else
      U(this, i);
}
const pe = (i) => {
  var t, e, r, o;
  i.type == pt.CHILD && ((t = (r = i)._$AP) !== null && t !== void 0 || (r._$AP = ue), (e = (o = i)._$AQ) !== null && e !== void 0 || (o._$AQ = de));
};
class fe extends gt {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, r) {
    super._$AT(t, e, r), Vt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    var r, o;
    t !== this.isConnected && (this.isConnected = t, t ? (r = this.reconnected) === null || r === void 0 || r.call(this) : (o = this.disconnected) === null || o === void 0 || o.call(this)), e && (U(this, t), G(this));
  }
  setValue(t) {
    if (he(this._$Ct))
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
const ge = () => new ve();
class ve {
}
const ot = /* @__PURE__ */ new WeakMap(), be = ft(class extends fe {
  render(i) {
    return d;
  }
  update(i, [t]) {
    var e;
    const r = t !== this.Y;
    return r && this.Y !== void 0 && this.rt(void 0), (r || this.lt !== this.dt) && (this.Y = t, this.ct = (e = i.options) === null || e === void 0 ? void 0 : e.host, this.rt(this.dt = i.element)), d;
  }
  rt(i) {
    var t;
    if (typeof this.Y == "function") {
      const e = (t = this.ct) !== null && t !== void 0 ? t : globalThis;
      let r = ot.get(e);
      r === void 0 && (r = /* @__PURE__ */ new WeakMap(), ot.set(e, r)), r.get(this.Y) !== void 0 && this.Y.call(this.ct, void 0), r.set(this.Y, i), i !== void 0 && this.Y.call(this.ct, i);
    } else
      this.Y.value = i;
  }
  get lt() {
    var i, t, e;
    return typeof this.Y == "function" ? (t = ot.get((i = this.ct) !== null && i !== void 0 ? i : globalThis)) === null || t === void 0 ? void 0 : t.get(this.Y) : (e = this.Y) === null || e === void 0 ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.dt && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.dt);
  }
});
var me = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, w = function(i) {
  return typeof i == "string" ? i.length > 0 : typeof i == "number";
}, p = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * i) / e + 0;
}, v = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), i > e ? e : i > t ? i : t;
}, qt = function(i) {
  return (i = isFinite(i) ? i % 360 : 0) > 0 ? i : i + 360;
}, Nt = function(i) {
  return { r: v(i.r, 0, 255), g: v(i.g, 0, 255), b: v(i.b, 0, 255), a: v(i.a) };
}, st = function(i) {
  return { r: p(i.r), g: p(i.g), b: p(i.b), a: p(i.a, 3) };
}, we = /^#([0-9a-f]{3,8})$/i, V = function(i) {
  var t = i.toString(16);
  return t.length < 2 ? "0" + t : t;
}, Wt = function(i) {
  var t = i.r, e = i.g, r = i.b, o = i.a, s = Math.max(t, e, r), n = s - Math.min(t, e, r), c = n ? s === t ? (e - r) / n : s === e ? 2 + (r - t) / n : 4 + (t - e) / n : 0;
  return { h: 60 * (c < 0 ? c + 6 : c), s: s ? n / s * 100 : 0, v: s / 255 * 100, a: o };
}, Jt = function(i) {
  var t = i.h, e = i.s, r = i.v, o = i.a;
  t = t / 360 * 6, e /= 100, r /= 100;
  var s = Math.floor(t), n = r * (1 - e), c = r * (1 - (t - s) * e), a = r * (1 - (1 - t + s) * e), l = s % 6;
  return { r: 255 * [r, c, n, n, a, r][l], g: 255 * [a, r, r, c, n, n][l], b: 255 * [n, n, a, r, r, c][l], a: o };
}, Tt = function(i) {
  return { h: qt(i.h), s: v(i.s, 0, 100), l: v(i.l, 0, 100), a: v(i.a) };
}, Pt = function(i) {
  return { h: p(i.h), s: p(i.s), l: p(i.l), a: p(i.a, 3) };
}, zt = function(i) {
  return Jt((e = (t = i).s, { h: t.h, s: (e *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * e / (r + e) * 100 : 0, v: r + e, a: t.a }));
  var t, e, r;
}, H = function(i) {
  return { h: (t = Wt(i)).h, s: (o = (200 - (e = t.s)) * (r = t.v) / 100) > 0 && o < 200 ? e * r / 100 / (o <= 100 ? o : 200 - o) * 100 : 0, l: o / 2, a: t.a };
  var t, e, r, o;
}, ye = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, $e = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, _e = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, xe = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ot = { string: [[function(i) {
  var t = we.exec(i);
  return t ? (i = t[1]).length <= 4 ? { r: parseInt(i[0] + i[0], 16), g: parseInt(i[1] + i[1], 16), b: parseInt(i[2] + i[2], 16), a: i.length === 4 ? p(parseInt(i[3] + i[3], 16) / 255, 2) : 1 } : i.length === 6 || i.length === 8 ? { r: parseInt(i.substr(0, 2), 16), g: parseInt(i.substr(2, 2), 16), b: parseInt(i.substr(4, 2), 16), a: i.length === 8 ? p(parseInt(i.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(i) {
  var t = _e.exec(i) || xe.exec(i);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Nt({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(i) {
  var t = ye.exec(i) || $e.exec(i);
  if (!t)
    return null;
  var e, r, o = Tt({ h: (e = t[1], r = t[2], r === void 0 && (r = "deg"), Number(e) * (me[r] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return zt(o);
}, "hsl"]], object: [[function(i) {
  var t = i.r, e = i.g, r = i.b, o = i.a, s = o === void 0 ? 1 : o;
  return w(t) && w(e) && w(r) ? Nt({ r: Number(t), g: Number(e), b: Number(r), a: Number(s) }) : null;
}, "rgb"], [function(i) {
  var t = i.h, e = i.s, r = i.l, o = i.a, s = o === void 0 ? 1 : o;
  if (!w(t) || !w(e) || !w(r))
    return null;
  var n = Tt({ h: Number(t), s: Number(e), l: Number(r), a: Number(s) });
  return zt(n);
}, "hsl"], [function(i) {
  var t = i.h, e = i.s, r = i.v, o = i.a, s = o === void 0 ? 1 : o;
  if (!w(t) || !w(e) || !w(r))
    return null;
  var n = function(c) {
    return { h: qt(c.h), s: v(c.s, 0, 100), v: v(c.v, 0, 100), a: v(c.a) };
  }({ h: Number(t), s: Number(e), v: Number(r), a: Number(s) });
  return Jt(n);
}, "hsv"]] }, Mt = function(i, t) {
  for (var e = 0; e < t.length; e++) {
    var r = t[e][0](i);
    if (r)
      return [r, t[e][1]];
  }
  return [null, void 0];
}, Ae = function(i) {
  return typeof i == "string" ? Mt(i.trim(), Ot.string) : typeof i == "object" && i !== null ? Mt(i, Ot.object) : [null, void 0];
}, nt = function(i, t) {
  var e = H(i);
  return { h: e.h, s: v(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, at = function(i) {
  return (299 * i.r + 587 * i.g + 114 * i.b) / 1e3 / 255;
}, Ut = function(i, t) {
  var e = H(i);
  return { h: e.h, s: e.s, l: v(e.l + 100 * t, 0, 100), a: e.a };
}, Ht = function() {
  function i(t) {
    this.parsed = Ae(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return i.prototype.isValid = function() {
    return this.parsed !== null;
  }, i.prototype.brightness = function() {
    return p(at(this.rgba), 2);
  }, i.prototype.isDark = function() {
    return at(this.rgba) < 0.5;
  }, i.prototype.isLight = function() {
    return at(this.rgba) >= 0.5;
  }, i.prototype.toHex = function() {
    return t = st(this.rgba), e = t.r, r = t.g, o = t.b, n = (s = t.a) < 1 ? V(p(255 * s)) : "", "#" + V(e) + V(r) + V(o) + n;
    var t, e, r, o, s, n;
  }, i.prototype.toRgb = function() {
    return st(this.rgba);
  }, i.prototype.toRgbString = function() {
    return t = st(this.rgba), e = t.r, r = t.g, o = t.b, (s = t.a) < 1 ? "rgba(" + e + ", " + r + ", " + o + ", " + s + ")" : "rgb(" + e + ", " + r + ", " + o + ")";
    var t, e, r, o, s;
  }, i.prototype.toHsl = function() {
    return Pt(H(this.rgba));
  }, i.prototype.toHslString = function() {
    return t = Pt(H(this.rgba)), e = t.h, r = t.s, o = t.l, (s = t.a) < 1 ? "hsla(" + e + ", " + r + "%, " + o + "%, " + s + ")" : "hsl(" + e + ", " + r + "%, " + o + "%)";
    var t, e, r, o, s;
  }, i.prototype.toHsv = function() {
    return t = Wt(this.rgba), { h: p(t.h), s: p(t.s), v: p(t.v), a: p(t.a, 3) };
    var t;
  }, i.prototype.invert = function() {
    return g({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, i.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), g(nt(this.rgba, t));
  }, i.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), g(nt(this.rgba, -t));
  }, i.prototype.grayscale = function() {
    return g(nt(this.rgba, -1));
  }, i.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), g(Ut(this.rgba, t));
  }, i.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), g(Ut(this.rgba, -t));
  }, i.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, i.prototype.alpha = function(t) {
    return typeof t == "number" ? g({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : p(this.rgba.a, 3);
    var e;
  }, i.prototype.hue = function(t) {
    var e = H(this.rgba);
    return typeof t == "number" ? g({ h: t, s: e.s, l: e.l, a: e.a }) : p(e.h);
  }, i.prototype.isEqual = function(t) {
    return this.toHex() === g(t).toHex();
  }, i;
}(), g = function(i) {
  return i instanceof Ht ? i : new Ht(i);
};
const vt = K`/* ! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com */
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
var Se = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, z = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? Ce(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && Se(t, e, o), o;
};
function Rt(i, t) {
  if (t === "hex")
    return g(i).toHex().toUpperCase();
  if (t === "rgb")
    return g(i).toRgbString();
  if (t === "hsl")
    return g(i).toHslString();
  throw "Unsupported Color Format";
}
function Ee(i, t) {
  let e = i.trim().replace(/\s+/g, "-");
  return t ? `${t}-${e}` : e;
}
let _ = class extends S {
  constructor() {
    super(...arguments), this.labelContainerRef = ge();
  }
  copy() {
    const i = this.labelContainerRef.value;
    if (!i)
      return;
    this.copyTimeout && clearTimeout(this.copyTimeout), i.classList.add("copy-overlay");
    const t = this.primaryAction === "copy-name" ? Ee(this.name, this.prefix) : Rt(this.color, this.format);
    t && navigator.clipboard.writeText(t), this.copyTimeout = setTimeout(() => {
      i.classList.remove("copy-overlay");
    }, 1e3);
  }
  render() {
    return I`<div @click="${this.copy}" class="rounded h-24 group">
        <div
          class="rounded shadow cursor-copy h-24 group-hover:scale-90"
          style="background-color: ${this.color};"
        ></div>
      </div>
      <div ${be(this.labelContainerRef)} class="relative">
        <div>${this.name}</div>
        <div class="text-gray-500 font-extralight">
          ${Rt(this.color, this.format)}
        </div>
      </div>`;
  }
};
_.styles = [vt, K`.relative {
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
      .copy-overlay {
    visibility: hidden
}
      .copy-overlay::after {
    visibility: visible;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
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
z([f()], _.prototype, "name", 2);
z([f()], _.prototype, "color", 2);
z([f()], _.prototype, "format", 2);
z([f()], _.prototype, "prefix", 2);
z([f()], _.prototype, "primaryAction", 2);
_ = z([ut("ag-color-square")], _);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = (i) => i != null ? i : d;
var Ne = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, B = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? Te(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && Ne(t, e, o), o;
};
function jt(i, t, e, r, o, s) {
  if (e.length !== 0)
    return I`<div>
    <div class="text-2xl capitalize font-semibold mb-2">${i}</div>
    <div
      class="grid gap-x-1 gap-y-5"
      style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
    >
      ${e.map(({
      name: n,
      code: c
    }) => {
      const a = r ? n : `${i} ${n}`;
      return I`<ag-color-square
          name="${a}"
          color="${c}"
          format="${t}"
          primaryAction="${o}"
          prefix="${ke(s)}"
        ></ag-color-square>`;
    })}
    </div>
  </div>`;
}
let C = class extends S {
  render() {
    let i = [], t = [];
    return Object.entries(this.colorMap).forEach(([e, r]) => {
      if (typeof r == "string") {
        i.push({
          name: e,
          code: r
        });
        return;
      }
      t.push({
        name: e,
        colors: Object.entries(r).map(([o, s]) => ({
          name: o,
          code: s
        }))
      });
    }), [jt("General", this.format, i, !0, this.primaryAction, this.prefix), ...t.map((e) => jt(e.name, this.format, e.colors, !1, this.primaryAction, this.prefix))];
  }
};
C.styles = [vt, K`.mb-2 {
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
B([f({
  reflect: !1
})], C.prototype, "colorMap", 2);
B([f()], C.prototype, "format", 2);
B([f()], C.prototype, "prefix", 2);
B([f()], C.prototype, "primaryAction", 2);
C = B([ut("ag-color-page")], C);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pe = ft(class extends gt {
  constructor(i) {
    var t;
    if (super(i), i.type !== pt.ATTRIBUTE || i.name !== "class" || ((t = i.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter((t) => i[t]).join(" ") + " ";
  }
  update(i, [t]) {
    var e, r;
    if (this.nt === void 0) {
      this.nt = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.st = new Set(i.strings.join(" ").split(/\s/).filter((s) => s !== "")));
      for (const s in t)
        t[s] && !(!((e = this.st) === null || e === void 0) && e.has(s)) && this.nt.add(s);
      return this.render(t);
    }
    const o = i.element.classList;
    this.nt.forEach((s) => {
      s in t || (o.remove(s), this.nt.delete(s));
    });
    for (const s in t) {
      const n = !!t[s];
      n === this.nt.has(s) || ((r = this.st) === null || r === void 0 ? void 0 : r.has(s)) || (n ? (o.add(s), this.nt.add(s)) : (o.remove(s), this.nt.delete(s)));
    }
    return $;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ct extends gt {
  constructor(t) {
    if (super(t), this.it = d, t.type !== pt.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null)
      return this._t = void 0, this.it = t;
    if (t === $)
      return t;
    if (typeof t != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it)
      return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = {
      _$litType$: this.constructor.resultType,
      strings: e,
      values: []
    };
  }
}
ct.directiveName = "unsafeHTML", ct.resultType = 1;
const ze = ft(ct);
var Oe = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, O = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? Me(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && Oe(t, e, o), o;
};
let x = class extends S {
  constructor() {
    super(...arguments), this.colorFormat = "hex", this.primaryAction = "copy-name";
  }
  copyConfig() {
    navigator.clipboard.writeText(JSON.stringify(this.config, null, "	"));
  }
  outputConfig() {
    return JSON.stringify(this.config, null, "  ").replace(/".*?"/g, '<span style="color: #A3BE8C;">$&</span>');
  }
  render() {
    var r, o, s;
    const i = (o = (r = this.config.theme) == null ? void 0 : r.extend) == null ? void 0 : o.colors;
    if (typeof i != "object")
      return;
    const t = (s = this.activeTab) != null ? s : this.tabs[0];
    let e = i[t.configProperty];
    return e || (e = JSON.parse(JSON.stringify(i)), this.tabs.forEach(({
      configProperty: n
    }) => delete e[n])), I`<header class="fixed px-5 bg-neutral-800 text-white w-full z-10">
        <ul class="flex gap-6">
          ${this.tabs.map((n) => I`<li class=${Pe({
      active: n.tabName === t.tabName
    })} @click="${() => this.activeTab = n}">
              ${n.tabName}
            </li>`)}
        </ul>
      </header>

      <div class="text-neutral-800 p-10 pt-20 max-w-4xl mx-auto flex flex-col gap-4">
        <div class="text-5xl pb-3 border-b border-b-gray-300 font-semibold">
          ${t.tabName}
        </div>

        <sl-details summary="Tailwind Config">
          <pre style="background-color: #2e3440ff; color: #D8DEE9;" class="p-4 h-96 overflow-auto relative"><code><button 
            @click="${this.copyConfig}" class="bg-white text-black absolute top-4 right-4 p-2 rounded hover:bg-neutral-200"><svg 
            aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
              <path fill-rule="evenodd"
                d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z">
              </path>
              <path fill-rule="evenodd"
                d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z">
              </path>
            </svg></button>${ze(this.outputConfig())}</code></pre>
        </sl-details>

        <sl-radio-group label="Color Format" name="color-format" value="hex" fieldset>
          <sl-radio-button value="hex" @click="${() => this.colorFormat = "hex"}">
            HEX
          </sl-radio-button>
          <sl-radio-button value="rgb" @click="${() => this.colorFormat = "rgb"}">
            RGB
          </sl-radio-button>
          <sl-radio-button value="hsl" @click="${() => this.colorFormat = "hsl"}">
            HSL
          </sl-radio-button>
        </sl-radio-group>
        <sl-radio-group label="Primary Action" name="primary-action" value="copy-name" fieldset>
          <sl-radio value="copy-name" @click="${() => this.primaryAction = "copy-name"}">
            Copy TailwindCSS Name
          </sl-radio>
          <sl-radio value="copy-code" @click="${() => this.primaryAction = "copy-code"}">
            Copy Color Code
          </sl-radio>
        </sl-radio-group>
        <ag-color-page .colorMap=${e} format="${this.colorFormat}" primaryAction="${this.primaryAction}"></ag-color-page>
      </div>`;
  }
};
x.styles = [vt, K`.fixed {
    position: fixed
}
.absolute {
    position: absolute
}
.relative {
    position: relative
}
.top-4 {
    top: 1rem
}
.right-4 {
    right: 1rem
}
.z-10 {
    z-index: 10
}
.mx-auto {
    margin-left: auto;
    margin-right: auto
}
.flex {
    display: flex
}
.h-96 {
    height: 24rem
}
.w-full {
    width: 100%
}
.max-w-4xl {
    max-width: 56rem
}
.flex-col {
    flex-direction: column
}
.gap-6 {
    gap: 1.5rem
}
.gap-4 {
    gap: 1rem
}
.overflow-auto {
    overflow: auto
}
.rounded {
    border-radius: 0.25rem
}
.border-b {
    border-bottom-width: 1px
}
.border-b-gray-300 {
    --tw-border-opacity: 1;
    border-bottom-color: rgb(209 213 219 / var(--tw-border-opacity))
}
.bg-neutral-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(38 38 38 / var(--tw-bg-opacity))
}
.bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity))
}
.p-10 {
    padding: 2.5rem
}
.p-4 {
    padding: 1rem
}
.p-2 {
    padding: 0.5rem
}
.px-5 {
    padding-left: 1.25rem;
    padding-right: 1.25rem
}
.pt-20 {
    padding-top: 5rem
}
.pb-3 {
    padding-bottom: 0.75rem
}
.text-5xl {
    font-size: 3rem;
    line-height: 1
}
.font-semibold {
    font-weight: 600
}
.text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity))
}
.text-neutral-800 {
    --tw-text-opacity: 1;
    color: rgb(38 38 38 / var(--tw-text-opacity))
}
.text-black {
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity))
}
      header li {
    display: inline-block;
    cursor: pointer;
    border-bottom-width: 4px;
    border-bottom-color: transparent;
    padding: 0.375rem
}
      header li:hover {
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    --tw-bg-opacity: 0.2
}
      header li.active {
    border-bottom-color: currentColor
}
      .hover\\:bg-neutral-200:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(229 229 229 / var(--tw-bg-opacity))
}
`];
O([f()], x.prototype, "config", 2);
O([f()], x.prototype, "tabs", 2);
O([f()], x.prototype, "activeTab", 2);
O([Yt()], x.prototype, "colorFormat", 2);
O([Yt()], x.prototype, "primaryAction", 2);
x = O([ut("ag-color-site")], x);
export {
  C as AGColorPage,
  x as AGColorSite,
  _ as AGColorSquare
};
