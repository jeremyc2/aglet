/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = window, nt = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, at = Symbol(), ht = /* @__PURE__ */ new WeakMap();
class Tt {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== at)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (nt && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = ht.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ht.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Bt = (i) => new Tt(typeof i == "string" ? i : i + "", void 0, at), lt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, s, o) => r + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new Tt(e, i, at);
}, Yt = (i, t) => {
  nt ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const r = document.createElement("style"), s = B.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, i.appendChild(r);
  });
}, dt = nt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules)
    e += r.cssText;
  return Bt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G;
const Y = window, ct = Y.trustedTypes, Ft = ct ? ct.emptyScript : "", ut = Y.reactiveElementPolyfillSupport, st = {
  toAttribute(i, t) {
    switch (t) {
      case Boolean:
        i = i ? Ft : null;
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
}, Ut = (i, t) => t !== i && (t == t || i == i), K = {
  attribute: !0,
  type: String,
  converter: st,
  reflect: !1,
  hasChanged: Ut
};
class A extends HTMLElement {
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
  static createProperty(t, e = K) {
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
    return this.elementProperties.get(t) || K;
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
        e.unshift(dt(s));
    } else
      t !== void 0 && e.push(dt(t));
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
    return Yt(e, this.constructor.elementStyles), e;
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
  _$EO(t, e, r = K) {
    var s;
    const o = this.constructor._$Ep(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const n = (((s = r.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? r.converter : st).toAttribute(e, r.type);
      this._$El = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var r;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const n = s.getPropertyOptions(o), h = typeof n.converter == "function" ? {
        fromAttribute: n.converter
      } : ((r = n.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? n.converter : st;
      this._$El = o, this[o] = h.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, r) {
    let s = !0;
    t !== void 0 && (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || Ut)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), r.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, r))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
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
A.finalized = !0, A.elementProperties = /* @__PURE__ */ new Map(), A.elementStyles = [], A.shadowRootOptions = {
  mode: "open"
}, ut == null || ut({
  ReactiveElement: A
}), ((G = Y.reactiveElementVersions) !== null && G !== void 0 ? G : Y.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z;
const F = window, E = F.trustedTypes, pt = E ? E.createPolicy("lit-html", {
  createHTML: (i) => i
}) : void 0, $ = `lit$${(Math.random() + "").slice(9)}$`, zt = "?" + $, Vt = `<${zt}>`, C = document, R = (i = "") => C.createComment(i), H = (i) => i === null || typeof i != "object" && typeof i != "function", Mt = Array.isArray, qt = (i) => Mt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ft = /-->/g, vt = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, bt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, Wt = (i) => (t, ...e) => ({
  _$litType$: i,
  strings: t,
  values: e
}), ot = Wt(1), k = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), mt = /* @__PURE__ */ new WeakMap(), Gt = (i, t, e) => {
  var r, s;
  const o = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : t;
  let n = o._$litPart$;
  if (n === void 0) {
    const h = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = n = new I(t.insertBefore(R(), h), h, void 0, e != null ? e : {});
  }
  return n._$AI(i), n;
}, x = C.createTreeWalker(C, 129, null, !1), Kt = (i, t) => {
  const e = i.length - 1, r = [];
  let s, o = t === 2 ? "<svg>" : "", n = U;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let b, d, u = -1, g = 0;
    for (; g < l.length && (n.lastIndex = g, d = n.exec(l), d !== null); )
      g = n.lastIndex, n === U ? d[1] === "!--" ? n = ft : d[1] !== void 0 ? n = vt : d[2] !== void 0 ? (Rt.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = _) : d[3] !== void 0 && (n = _) : n === _ ? d[0] === ">" ? (n = s != null ? s : U, u = -1) : d[1] === void 0 ? u = -2 : (u = n.lastIndex - d[2].length, b = d[1], n = d[3] === void 0 ? _ : d[3] === '"' ? bt : gt) : n === bt || n === gt ? n = _ : n === ft || n === vt ? n = U : (n = _, s = void 0);
    const j = n === _ && i[a + 1].startsWith("/>") ? " " : "";
    o += n === U ? l + Vt : u >= 0 ? (r.push(b), l.slice(0, u) + "$lit$" + l.slice(u) + $ + j) : l + $ + (u === -2 ? (r.push(void 0), a) : j);
  }
  const h = o + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [pt !== void 0 ? pt.createHTML(h) : h, r];
};
class O {
  constructor({
    strings: t,
    _$litType$: e
  }, r) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [l, b] = Kt(t, e);
    if (this.el = O.createElement(l, r), x.currentNode = this.el.content, e === 2) {
      const d = this.el.content, u = d.firstChild;
      u.remove(), d.append(...u.childNodes);
    }
    for (; (s = x.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const d = [];
          for (const u of s.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith($)) {
              const g = b[n++];
              if (d.push(u), g !== void 0) {
                const j = s.getAttribute(g.toLowerCase() + "$lit$").split($), L = /([.?@])?(.*)/.exec(g);
                a.push({
                  type: 1,
                  index: o,
                  name: L[2],
                  strings: j,
                  ctor: L[1] === "." ? Jt : L[1] === "?" ? Xt : L[1] === "@" ? te : q
                });
              } else
                a.push({
                  type: 6,
                  index: o
                });
            }
          for (const u of d)
            s.removeAttribute(u);
        }
        if (Rt.test(s.tagName)) {
          const d = s.textContent.split($), u = d.length - 1;
          if (u > 0) {
            s.textContent = E ? E.emptyScript : "";
            for (let g = 0; g < u; g++)
              s.append(d[g], R()), x.nextNode(), a.push({
                type: 2,
                index: ++o
              });
            s.append(d[u], R());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === zt)
          a.push({
            type: 2,
            index: o
          });
        else {
          let d = -1;
          for (; (d = s.data.indexOf($, d + 1)) !== -1; )
            a.push({
              type: 7,
              index: o
            }), d += $.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const r = C.createElement("template");
    return r.innerHTML = t, r;
  }
}
function N(i, t, e = i, r) {
  var s, o, n, h;
  if (t === k)
    return t;
  let a = r !== void 0 ? (s = e._$Cl) === null || s === void 0 ? void 0 : s[r] : e._$Cu;
  const l = H(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((o = a == null ? void 0 : a._$AO) === null || o === void 0 || o.call(a, !1), l === void 0 ? a = void 0 : (a = new l(i), a._$AT(i, e, r)), r !== void 0 ? ((n = (h = e)._$Cl) !== null && n !== void 0 ? n : h._$Cl = [])[r] = a : e._$Cu = a), a !== void 0 && (t = N(i, a._$AS(i, t.values), a, r)), t;
}
class Zt {
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
    } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : C).importNode(r, !0);
    x.currentNode = o;
    let n = x.nextNode(), h = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (h === l.index) {
        let b;
        l.type === 2 ? b = new I(n, n.nextSibling, this, t) : l.type === 1 ? b = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (b = new ee(n, this, t)), this.v.push(b), l = s[++a];
      }
      h !== (l == null ? void 0 : l.index) && (n = x.nextNode(), h++);
    }
    return o;
  }
  m(t) {
    let e = 0;
    for (const r of this.v)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class I {
  constructor(t, e, r, s) {
    var o;
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = s, this._$C_ = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
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
    t = N(this, t, e), H(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== k && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : qt(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== c && H(this._$AH) ? this._$AA.nextSibling.data = t : this.k(C.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const {
      values: r,
      _$litType$: s
    } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.m(r);
    else {
      const n = new Zt(o, this), h = n.p(this.options);
      n.m(r), this.k(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = mt.get(t.strings);
    return e === void 0 && mt.set(t.strings, e = new O(t)), e;
  }
  O(t) {
    Mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const o of t)
      s === e.length ? e.push(r = new I(this.S(R()), this.S(R()), this, this.options)) : r = e[s], r._$AI(o), s++;
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
class q {
  constructor(t, e, r, s, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = c;
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
      t = N(this, t, e, 0), n = !H(t) || t !== this._$AH && t !== k, n && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        l = N(this, h[r + a], e, a), l === k && (l = this._$AH[a]), n || (n = !H(l) || l !== this._$AH[a]), l === c ? t = c : t !== c && (t += (l != null ? l : "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !s && this.P(t);
  }
  P(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Jt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
const Qt = E ? E.emptyScript : "";
class Xt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== c ? this.element.setAttribute(this.name, Qt) : this.element.removeAttribute(this.name);
  }
}
class te extends q {
  constructor(t, e, r, s, o) {
    super(t, e, r, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = N(this, t, e, 0)) !== null && r !== void 0 ? r : c) === k)
      return;
    const s = this._$AH, o = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== c && (s === c || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && r !== void 0 ? r : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ee {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    N(this, t);
  }
}
const $t = F.litHtmlPolyfillSupport;
$t == null || $t(O, I), ((Z = F.litHtmlVersions) !== null && Z !== void 0 ? Z : F.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J, Q;
class S extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Gt(e, this.renderRoot, this.renderOptions);
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
    return k;
  }
}
S.finalized = !0, S._$litElement$ = !0, (J = globalThis.litElementHydrateSupport) === null || J === void 0 || J.call(globalThis, {
  LitElement: S
});
const wt = globalThis.litElementPolyfillSupport;
wt == null || wt({
  LitElement: S
});
((Q = globalThis.litElementVersions) !== null && Q !== void 0 ? Q : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = (i) => (t) => typeof t == "function" ? ((e, r) => (customElements.define(e, r), r))(i, t) : ((e, r) => {
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
function y(i) {
  return (t, e) => e !== void 0 ? ((r, s, o) => {
    s.constructor.createProperty(o, r);
  })(i, t, e) : ie(i, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var X;
((X = window.HTMLSlotElement) === null || X === void 0 ? void 0 : X.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = (i) => i.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = {
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
const z = (i, t) => {
  var e, r;
  const s = i._$AN;
  if (s === void 0)
    return !1;
  for (const o of s)
    (r = (e = o)._$AO) === null || r === void 0 || r.call(e, t, !1), z(o, t);
  return !0;
}, V = (i) => {
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
  this._$AN !== void 0 ? (V(this), this._$AM = i, Ot(this)) : this._$AM = i;
}
function le(i, t = !1, e = 0) {
  const r = this._$AH, s = this._$AN;
  if (s !== void 0 && s.size !== 0)
    if (t)
      if (Array.isArray(r))
        for (let o = e; o < r.length; o++)
          z(r[o], !1), V(r[o]);
      else
        r != null && (z(r, !1), V(r));
    else
      z(this, i);
}
const he = (i) => {
  var t, e, r, s;
  i.type == se.CHILD && ((t = (r = i)._$AP) !== null && t !== void 0 || (r._$AP = le), (e = (s = i)._$AQ) !== null && e !== void 0 || (s._$AQ = ae));
};
class de extends ne {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, r) {
    super._$AT(t, e, r), Ot(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    var r, s;
    t !== this.isConnected && (this.isConnected = t, t ? (r = this.reconnected) === null || r === void 0 || r.call(this) : (s = this.disconnected) === null || s === void 0 || s.call(this)), e && (z(this, t), V(this));
  }
  setValue(t) {
    if (re(this._$Ct))
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
const ce = () => new ue();
class ue {
}
const tt = /* @__PURE__ */ new WeakMap(), pe = oe(class extends de {
  render(i) {
    return c;
  }
  update(i, [t]) {
    var e;
    const r = t !== this.Y;
    return r && this.Y !== void 0 && this.rt(void 0), (r || this.lt !== this.dt) && (this.Y = t, this.ct = (e = i.options) === null || e === void 0 ? void 0 : e.host, this.rt(this.dt = i.element)), c;
  }
  rt(i) {
    var t;
    if (typeof this.Y == "function") {
      const e = (t = this.ct) !== null && t !== void 0 ? t : globalThis;
      let r = tt.get(e);
      r === void 0 && (r = /* @__PURE__ */ new WeakMap(), tt.set(e, r)), r.get(this.Y) !== void 0 && this.Y.call(this.ct, void 0), r.set(this.Y, i), i !== void 0 && this.Y.call(this.ct, i);
    } else
      this.Y.value = i;
  }
  get lt() {
    var i, t, e;
    return typeof this.Y == "function" ? (t = tt.get((i = this.ct) !== null && i !== void 0 ? i : globalThis)) === null || t === void 0 ? void 0 : t.get(this.Y) : (e = this.Y) === null || e === void 0 ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.dt && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.dt);
  }
});
var fe = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, m = function(i) {
  return typeof i == "string" ? i.length > 0 : typeof i == "number";
}, p = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * i) / e + 0;
}, v = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), i > e ? e : i > t ? i : t;
}, It = function(i) {
  return (i = isFinite(i) ? i % 360 : 0) > 0 ? i : i + 360;
}, yt = function(i) {
  return { r: v(i.r, 0, 255), g: v(i.g, 0, 255), b: v(i.b, 0, 255), a: v(i.a) };
}, et = function(i) {
  return { r: p(i.r), g: p(i.g), b: p(i.b), a: p(i.a, 3) };
}, ve = /^#([0-9a-f]{3,8})$/i, D = function(i) {
  var t = i.toString(16);
  return t.length < 2 ? "0" + t : t;
}, jt = function(i) {
  var t = i.r, e = i.g, r = i.b, s = i.a, o = Math.max(t, e, r), n = o - Math.min(t, e, r), h = n ? o === t ? (e - r) / n : o === e ? 2 + (r - t) / n : 4 + (t - e) / n : 0;
  return { h: 60 * (h < 0 ? h + 6 : h), s: o ? n / o * 100 : 0, v: o / 255 * 100, a: s };
}, Lt = function(i) {
  var t = i.h, e = i.s, r = i.v, s = i.a;
  t = t / 360 * 6, e /= 100, r /= 100;
  var o = Math.floor(t), n = r * (1 - e), h = r * (1 - (t - o) * e), a = r * (1 - (1 - t + o) * e), l = o % 6;
  return { r: 255 * [r, h, n, n, a, r][l], g: 255 * [a, r, r, h, n, n][l], b: 255 * [n, n, a, r, r, h][l], a: s };
}, _t = function(i) {
  return { h: It(i.h), s: v(i.s, 0, 100), l: v(i.l, 0, 100), a: v(i.a) };
}, At = function(i) {
  return { h: p(i.h), s: p(i.s), l: p(i.l), a: p(i.a, 3) };
}, xt = function(i) {
  return Lt((e = (t = i).s, { h: t.h, s: (e *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * e / (r + e) * 100 : 0, v: r + e, a: t.a }));
  var t, e, r;
}, M = function(i) {
  return { h: (t = jt(i)).h, s: (s = (200 - (e = t.s)) * (r = t.v) / 100) > 0 && s < 200 ? e * r / 100 / (s <= 100 ? s : 200 - s) * 100 : 0, l: s / 2, a: t.a };
  var t, e, r, s;
}, ge = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, be = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, me = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, $e = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, St = { string: [[function(i) {
  var t = ve.exec(i);
  return t ? (i = t[1]).length <= 4 ? { r: parseInt(i[0] + i[0], 16), g: parseInt(i[1] + i[1], 16), b: parseInt(i[2] + i[2], 16), a: i.length === 4 ? p(parseInt(i[3] + i[3], 16) / 255, 2) : 1 } : i.length === 6 || i.length === 8 ? { r: parseInt(i.substr(0, 2), 16), g: parseInt(i.substr(2, 2), 16), b: parseInt(i.substr(4, 2), 16), a: i.length === 8 ? p(parseInt(i.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(i) {
  var t = me.exec(i) || $e.exec(i);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : yt({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(i) {
  var t = ge.exec(i) || be.exec(i);
  if (!t)
    return null;
  var e, r, s = _t({ h: (e = t[1], r = t[2], r === void 0 && (r = "deg"), Number(e) * (fe[r] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return xt(s);
}, "hsl"]], object: [[function(i) {
  var t = i.r, e = i.g, r = i.b, s = i.a, o = s === void 0 ? 1 : s;
  return m(t) && m(e) && m(r) ? yt({ r: Number(t), g: Number(e), b: Number(r), a: Number(o) }) : null;
}, "rgb"], [function(i) {
  var t = i.h, e = i.s, r = i.l, s = i.a, o = s === void 0 ? 1 : s;
  if (!m(t) || !m(e) || !m(r))
    return null;
  var n = _t({ h: Number(t), s: Number(e), l: Number(r), a: Number(o) });
  return xt(n);
}, "hsl"], [function(i) {
  var t = i.h, e = i.s, r = i.v, s = i.a, o = s === void 0 ? 1 : s;
  if (!m(t) || !m(e) || !m(r))
    return null;
  var n = function(h) {
    return { h: It(h.h), s: v(h.s, 0, 100), v: v(h.v, 0, 100), a: v(h.a) };
  }({ h: Number(t), s: Number(e), v: Number(r), a: Number(o) });
  return Lt(n);
}, "hsv"]] }, Et = function(i, t) {
  for (var e = 0; e < t.length; e++) {
    var r = t[e][0](i);
    if (r)
      return [r, t[e][1]];
  }
  return [null, void 0];
}, we = function(i) {
  return typeof i == "string" ? Et(i.trim(), St.string) : typeof i == "object" && i !== null ? Et(i, St.object) : [null, void 0];
}, it = function(i, t) {
  var e = M(i);
  return { h: e.h, s: v(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, rt = function(i) {
  return (299 * i.r + 587 * i.g + 114 * i.b) / 1e3 / 255;
}, Ct = function(i, t) {
  var e = M(i);
  return { h: e.h, s: e.s, l: v(e.l + 100 * t, 0, 100), a: e.a };
}, kt = function() {
  function i(t) {
    this.parsed = we(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return i.prototype.isValid = function() {
    return this.parsed !== null;
  }, i.prototype.brightness = function() {
    return p(rt(this.rgba), 2);
  }, i.prototype.isDark = function() {
    return rt(this.rgba) < 0.5;
  }, i.prototype.isLight = function() {
    return rt(this.rgba) >= 0.5;
  }, i.prototype.toHex = function() {
    return t = et(this.rgba), e = t.r, r = t.g, s = t.b, n = (o = t.a) < 1 ? D(p(255 * o)) : "", "#" + D(e) + D(r) + D(s) + n;
    var t, e, r, s, o, n;
  }, i.prototype.toRgb = function() {
    return et(this.rgba);
  }, i.prototype.toRgbString = function() {
    return t = et(this.rgba), e = t.r, r = t.g, s = t.b, (o = t.a) < 1 ? "rgba(" + e + ", " + r + ", " + s + ", " + o + ")" : "rgb(" + e + ", " + r + ", " + s + ")";
    var t, e, r, s, o;
  }, i.prototype.toHsl = function() {
    return At(M(this.rgba));
  }, i.prototype.toHslString = function() {
    return t = At(M(this.rgba)), e = t.h, r = t.s, s = t.l, (o = t.a) < 1 ? "hsla(" + e + ", " + r + "%, " + s + "%, " + o + ")" : "hsl(" + e + ", " + r + "%, " + s + "%)";
    var t, e, r, s, o;
  }, i.prototype.toHsv = function() {
    return t = jt(this.rgba), { h: p(t.h), s: p(t.s), v: p(t.v), a: p(t.a, 3) };
    var t;
  }, i.prototype.invert = function() {
    return f({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, i.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), f(it(this.rgba, t));
  }, i.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), f(it(this.rgba, -t));
  }, i.prototype.grayscale = function() {
    return f(it(this.rgba, -1));
  }, i.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), f(Ct(this.rgba, t));
  }, i.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), f(Ct(this.rgba, -t));
  }, i.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, i.prototype.alpha = function(t) {
    return typeof t == "number" ? f({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : p(this.rgba.a, 3);
    var e;
  }, i.prototype.hue = function(t) {
    var e = M(this.rgba);
    return typeof t == "number" ? f({ h: t, s: e.s, l: e.l, a: e.a }) : p(e.h);
  }, i.prototype.isEqual = function(t) {
    return this.toHex() === f(t).toHex();
  }, i;
}(), f = function(i) {
  return i instanceof kt ? i : new kt(i);
};
const Dt = lt`/* ! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com */
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
var ye = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, T = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? _e(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = (r ? n(t, e, s) : n(s)) || s);
  return r && s && ye(t, e, s), s;
};
function Nt(i, t) {
  if (t === "hex")
    return f(i).toHex().toUpperCase();
  if (t === "rgb")
    return f(i).toRgbString();
  if (t === "hsl")
    return f(i).toHslString();
  throw "Unsupported Color Format";
}
function Ae(i, t) {
  let e = i.trim().replace(/\s+/g, "-");
  return t ? `${t}-${e}` : e;
}
let w = class extends S {
  constructor() {
    super(...arguments), this.labelContainerRef = ce();
  }
  copy() {
    const i = this.labelContainerRef.value;
    if (!i)
      return;
    this.copyTimeout && clearTimeout(this.copyTimeout), i.classList.add("copy-overlay");
    const t = this.primaryAction === "copy-name" ? Ae(this.name, this.prefix) : Nt(this.color, this.format);
    t && navigator.clipboard.writeText(t), this.copyTimeout = setTimeout(() => {
      i.classList.remove("copy-overlay");
    }, 1e3);
  }
  render() {
    return ot`<div @click="${this.copy}" class="rounded h-24 group">
        <div
          class="rounded shadow cursor-copy h-24 group-hover:scale-90"
          style="background-color: ${this.color};"
        ></div>
      </div>
      <div ${pe(this.labelContainerRef)} class="relative">
        <div>${this.name}</div>
        <div class="text-gray-500 font-extralight">
          ${Nt(this.color, this.format)}
        </div>
      </div>`;
  }
};
w.styles = [Dt, lt`.relative {
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
T([y()], w.prototype, "name", 2);
T([y()], w.prototype, "color", 2);
T([y()], w.prototype, "format", 2);
T([y()], w.prototype, "prefix", 2);
T([y()], w.prototype, "primaryAction", 2);
w = T([Ht("ag-color-square")], w);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = (i) => i != null ? i : c;
var Se = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, W = (i, t, e, r) => {
  for (var s = r > 1 ? void 0 : r ? Ee(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (s = (r ? n(t, e, s) : n(s)) || s);
  return r && s && Se(t, e, s), s;
};
function Pt(i, t, e, r, s, o) {
  if (e.length !== 0)
    return ot`<div>
    <div class="text-2xl capitalize font-semibold mb-2">${i}</div>
    <div
      class="grid gap-x-1 gap-y-5"
      style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
    >
      ${e.map(({
      name: n,
      code: h
    }) => {
      const a = r ? n : `${i} ${n}`;
      return ot`<ag-color-square
          name="${a}"
          color="${h}"
          format="${t}"
          primaryAction="${s}"
          prefix="${xe(o)}"
        ></ag-color-square>`;
    })}
    </div>
  </div>`;
}
let P = class extends S {
  constructor() {
    super(...arguments), this.colorMap = {};
  }
  loadColorMap(i) {
    this.colorMap = i, this.requestUpdate();
  }
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
        colors: Object.entries(r).map(([s, o]) => ({
          name: s,
          code: o
        }))
      });
    }), [Pt("General", this.format, i, !0, this.primaryAction, this.prefix), ...t.map((e) => Pt(e.name, this.format, e.colors, !1, this.primaryAction, this.prefix))];
  }
};
P.styles = [Dt, lt`.mb-2 {
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
W([y()], P.prototype, "format", 2);
W([y()], P.prototype, "prefix", 2);
W([y()], P.prototype, "primaryAction", 2);
P = W([Ht("ag-color-page")], P);
export {
  P as AGColorPage,
  w as AGColorSquare
};
