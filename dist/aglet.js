/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = window, et = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), st = /* @__PURE__ */ new WeakMap();
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
      r && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Rt = (i) => new Et(typeof i == "string" ? i : i + "", void 0, it), rt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, o, s) => r + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new Et(e, i, it);
}, Tt = (i, t) => {
  et ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const r = document.createElement("style"), o = j.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = e.cssText, i.appendChild(r);
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
const L = window, at = L.trustedTypes, jt = at ? at.emptyScript : "", lt = L.reactiveElementPolyfillSupport, Q = {
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
}, Ct = (i, t) => t !== i && (t == t || i == i), V = {
  attribute: !0,
  type: String,
  converter: Q,
  reflect: !1,
  hasChanged: Ct
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
      const o = this._$Ep(r, e);
      o !== void 0 && (this._$Ev.set(o, r), t.push(o));
    }), t;
  }
  static createProperty(t, e = V) {
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
    return this.elementProperties.get(t) || V;
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
        e.unshift(nt(o));
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
  _$EO(t, e, r = V) {
    var o;
    const s = this.constructor._$Ep(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const n = (((o = r.converter) === null || o === void 0 ? void 0 : o.toAttribute) !== void 0 ? r.converter : Q).toAttribute(e, r.type);
      this._$El = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var r;
    const o = this.constructor, s = o._$Ev.get(t);
    if (s !== void 0 && this._$El !== s) {
      const n = o.getPropertyOptions(s), h = typeof n.converter == "function" ? {
        fromAttribute: n.converter
      } : ((r = n.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? n.converter : Q;
      this._$El = s, this[s] = h.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, r) {
    let o = !0;
    t !== void 0 && (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || Ct)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), r.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, r))) : o = !1), !this.isUpdatePending && o && (this._$E_ = this._$Ej());
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
$.finalized = !0, $.elementProperties = /* @__PURE__ */ new Map(), $.elementStyles = [], $.shadowRootOptions = {
  mode: "open"
}, lt == null || lt({
  ReactiveElement: $
}), ((F = L.reactiveElementVersions) !== null && F !== void 0 ? F : L.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W;
const D = window, A = D.trustedTypes, ht = A ? A.createPolicy("lit-html", {
  createHTML: (i) => i
}) : void 0, w = `lit$${(Math.random() + "").slice(9)}$`, kt = "?" + w, It = `<${kt}>`, S = document, z = (i = "") => S.createComment(i), U = (i) => i === null || typeof i != "object" && typeof i != "function", Pt = Array.isArray, Lt = (i) => Pt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, ct = />/g, y = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, pt = /"/g, Nt = /^(?:script|style|textarea|title)$/i, Dt = (i) => (t, ...e) => ({
  _$litType$: i,
  strings: t,
  values: e
}), I = Dt(1), E = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), Bt = (i, t, e) => {
  var r, o;
  const s = (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : t;
  let n = s._$litPart$;
  if (n === void 0) {
    const h = (o = e == null ? void 0 : e.renderBefore) !== null && o !== void 0 ? o : null;
    s._$litPart$ = n = new M(t.insertBefore(z(), h), h, void 0, e != null ? e : {});
  }
  return n._$AI(i), n;
}, _ = S.createTreeWalker(S, 129, null, !1), qt = (i, t) => {
  const e = i.length - 1, r = [];
  let o, s = t === 2 ? "<svg>" : "", n = P;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let v, d, c = -1, b = 0;
    for (; b < l.length && (n.lastIndex = b, d = n.exec(l), d !== null); )
      b = n.lastIndex, n === P ? d[1] === "!--" ? n = dt : d[1] !== void 0 ? n = ct : d[2] !== void 0 ? (Nt.test(d[2]) && (o = RegExp("</" + d[2], "g")), n = y) : d[3] !== void 0 && (n = y) : n === y ? d[0] === ">" ? (n = o != null ? o : P, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, v = d[1], n = d[3] === void 0 ? y : d[3] === '"' ? pt : ut) : n === pt || n === ut ? n = y : n === dt || n === ct ? n = P : (n = y, o = void 0);
    const O = n === y && i[a + 1].startsWith("/>") ? " " : "";
    s += n === P ? l + It : c >= 0 ? (r.push(v), l.slice(0, c) + "$lit$" + l.slice(c) + w + O) : l + w + (c === -2 ? (r.push(void 0), a) : O);
  }
  const h = s + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [ht !== void 0 ? ht.createHTML(h) : h, r];
};
class H {
  constructor({
    strings: t,
    _$litType$: e
  }, r) {
    let o;
    this.parts = [];
    let s = 0, n = 0;
    const h = t.length - 1, a = this.parts, [l, v] = qt(t, e);
    if (this.el = H.createElement(l, r), _.currentNode = this.el.content, e === 2) {
      const d = this.el.content, c = d.firstChild;
      c.remove(), d.append(...c.childNodes);
    }
    for (; (o = _.nextNode()) !== null && a.length < h; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) {
          const d = [];
          for (const c of o.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(w)) {
              const b = v[n++];
              if (d.push(c), b !== void 0) {
                const O = o.getAttribute(b.toLowerCase() + "$lit$").split(w), R = /([.?@])?(.*)/.exec(b);
                a.push({
                  type: 1,
                  index: s,
                  name: R[2],
                  strings: O,
                  ctor: R[1] === "." ? Vt : R[1] === "?" ? Kt : R[1] === "@" ? Zt : B
                });
              } else
                a.push({
                  type: 6,
                  index: s
                });
            }
          for (const c of d)
            o.removeAttribute(c);
        }
        if (Nt.test(o.tagName)) {
          const d = o.textContent.split(w), c = d.length - 1;
          if (c > 0) {
            o.textContent = A ? A.emptyScript : "";
            for (let b = 0; b < c; b++)
              o.append(d[b], z()), _.nextNode(), a.push({
                type: 2,
                index: ++s
              });
            o.append(d[c], z());
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === kt)
          a.push({
            type: 2,
            index: s
          });
        else {
          let d = -1;
          for (; (d = o.data.indexOf(w, d + 1)) !== -1; )
            a.push({
              type: 7,
              index: s
            }), d += w.length - 1;
        }
      s++;
    }
  }
  static createElement(t, e) {
    const r = S.createElement("template");
    return r.innerHTML = t, r;
  }
}
function C(i, t, e = i, r) {
  var o, s, n, h;
  if (t === E)
    return t;
  let a = r !== void 0 ? (o = e._$Cl) === null || o === void 0 ? void 0 : o[r] : e._$Cu;
  const l = U(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((s = a == null ? void 0 : a._$AO) === null || s === void 0 || s.call(a, !1), l === void 0 ? a = void 0 : (a = new l(i), a._$AT(i, e, r)), r !== void 0 ? ((n = (h = e)._$Cl) !== null && n !== void 0 ? n : h._$Cl = [])[r] = a : e._$Cu = a), a !== void 0 && (t = C(i, a._$AS(i, t.values), a, r)), t;
}
class Ft {
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
    } = this._$AD, s = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : S).importNode(r, !0);
    _.currentNode = s;
    let n = _.nextNode(), h = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (h === l.index) {
        let v;
        l.type === 2 ? v = new M(n, n.nextSibling, this, t) : l.type === 1 ? v = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (v = new Gt(n, this, t)), this.v.push(v), l = o[++a];
      }
      h !== (l == null ? void 0 : l.index) && (n = _.nextNode(), h++);
    }
    return s;
  }
  m(t) {
    let e = 0;
    for (const r of this.v)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class M {
  constructor(t, e, r, o) {
    var s;
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = o, this._$C_ = (s = o == null ? void 0 : o.isConnected) === null || s === void 0 || s;
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
    t = C(this, t, e), U(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : Lt(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== p && U(this._$AH) ? this._$AA.nextSibling.data = t : this.k(S.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const {
      values: r,
      _$litType$: o
    } = t, s = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = H.createElement(o.h, this.options)), o);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === s)
      this._$AH.m(r);
    else {
      const n = new Ft(s, this), h = n.p(this.options);
      n.m(r), this.k(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new H(t)), e;
  }
  O(t) {
    Pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, o = 0;
    for (const s of t)
      o === e.length ? e.push(r = new M(this.S(z()), this.S(z()), this, this.options)) : r = e[o], r._$AI(s), o++;
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
class B {
  constructor(t, e, r, o, s) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
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
      t = C(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = s[0], a = 0; a < s.length - 1; a++)
        l = C(this, h[r + a], e, a), l === E && (l = this._$AH[a]), n || (n = !U(l) || l !== this._$AH[a]), l === p ? t = p : t !== p && (t += (l != null ? l : "") + s[a + 1]), this._$AH[a] = l;
    }
    n && !o && this.P(t);
  }
  P(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Vt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
const Wt = A ? A.emptyScript : "";
class Kt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== p ? this.element.setAttribute(this.name, Wt) : this.element.removeAttribute(this.name);
  }
}
class Zt extends B {
  constructor(t, e, r, o, s) {
    super(t, e, r, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = C(this, t, e, 0)) !== null && r !== void 0 ? r : p) === E)
      return;
    const o = this._$AH, s = t === p && o !== p || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== p && (o === p || s);
    s && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
    C(this, t);
  }
}
const gt = D.litHtmlPolyfillSupport;
gt == null || gt(H, M), ((W = D.litHtmlVersions) !== null && W !== void 0 ? W : D.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K, Z;
class x extends $ {
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
x.finalized = !0, x._$litElement$ = !0, (K = globalThis.litElementHydrateSupport) === null || K === void 0 || K.call(globalThis, {
  LitElement: x
});
const bt = globalThis.litElementPolyfillSupport;
bt == null || bt({
  LitElement: x
});
((Z = globalThis.litElementVersions) !== null && Z !== void 0 ? Z : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = (i) => (t) => typeof t == "function" ? ((e, r) => (customElements.define(e, r), r))(i, t) : ((e, r) => {
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
function ot(i) {
  return (t, e) => e !== void 0 ? ((r, o, s) => {
    o.constructor.createProperty(s, r);
  })(i, t, e) : Jt(i, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G;
((G = window.HTMLSlotElement) === null || G === void 0 ? void 0 : G.prototype.assignedElements) != null;
var Xt = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, m = function(i) {
  return typeof i == "string" ? i.length > 0 : typeof i == "number";
}, u = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * i) / e + 0;
}, g = function(i, t, e) {
  return t === void 0 && (t = 0), e === void 0 && (e = 1), i > e ? e : i > t ? i : t;
}, Ut = function(i) {
  return (i = isFinite(i) ? i % 360 : 0) > 0 ? i : i + 360;
}, vt = function(i) {
  return { r: g(i.r, 0, 255), g: g(i.g, 0, 255), b: g(i.b, 0, 255), a: g(i.a) };
}, J = function(i) {
  return { r: u(i.r), g: u(i.g), b: u(i.b), a: u(i.a, 3) };
}, Yt = /^#([0-9a-f]{3,8})$/i, T = function(i) {
  var t = i.toString(16);
  return t.length < 2 ? "0" + t : t;
}, Ht = function(i) {
  var t = i.r, e = i.g, r = i.b, o = i.a, s = Math.max(t, e, r), n = s - Math.min(t, e, r), h = n ? s === t ? (e - r) / n : s === e ? 2 + (r - t) / n : 4 + (t - e) / n : 0;
  return { h: 60 * (h < 0 ? h + 6 : h), s: s ? n / s * 100 : 0, v: s / 255 * 100, a: o };
}, Mt = function(i) {
  var t = i.h, e = i.s, r = i.v, o = i.a;
  t = t / 360 * 6, e /= 100, r /= 100;
  var s = Math.floor(t), n = r * (1 - e), h = r * (1 - (t - s) * e), a = r * (1 - (1 - t + s) * e), l = s % 6;
  return { r: 255 * [r, h, n, n, a, r][l], g: 255 * [a, r, r, h, n, n][l], b: 255 * [n, n, a, r, r, h][l], a: o };
}, mt = function(i) {
  return { h: Ut(i.h), s: g(i.s, 0, 100), l: g(i.l, 0, 100), a: g(i.a) };
}, wt = function(i) {
  return { h: u(i.h), s: u(i.s), l: u(i.l), a: u(i.a, 3) };
}, yt = function(i) {
  return Mt((e = (t = i).s, { h: t.h, s: (e *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * e / (r + e) * 100 : 0, v: r + e, a: t.a }));
  var t, e, r;
}, N = function(i) {
  return { h: (t = Ht(i)).h, s: (o = (200 - (e = t.s)) * (r = t.v) / 100) > 0 && o < 200 ? e * r / 100 / (o <= 100 ? o : 200 - o) * 100 : 0, l: o / 2, a: t.a };
  var t, e, r, o;
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
  var e, r, o = mt({ h: (e = t[1], r = t[2], r === void 0 && (r = "deg"), Number(e) * (Xt[r] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return yt(o);
}, "hsl"]], object: [[function(i) {
  var t = i.r, e = i.g, r = i.b, o = i.a, s = o === void 0 ? 1 : o;
  return m(t) && m(e) && m(r) ? vt({ r: Number(t), g: Number(e), b: Number(r), a: Number(s) }) : null;
}, "rgb"], [function(i) {
  var t = i.h, e = i.s, r = i.l, o = i.a, s = o === void 0 ? 1 : o;
  if (!m(t) || !m(e) || !m(r))
    return null;
  var n = mt({ h: Number(t), s: Number(e), l: Number(r), a: Number(s) });
  return yt(n);
}, "hsl"], [function(i) {
  var t = i.h, e = i.s, r = i.v, o = i.a, s = o === void 0 ? 1 : o;
  if (!m(t) || !m(e) || !m(r))
    return null;
  var n = function(h) {
    return { h: Ut(h.h), s: g(h.s, 0, 100), v: g(h.v, 0, 100), a: g(h.a) };
  }({ h: Number(t), s: Number(e), v: Number(r), a: Number(s) });
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
}, X = function(i, t) {
  var e = N(i);
  return { h: e.h, s: g(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
}, Y = function(i) {
  return (299 * i.r + 587 * i.g + 114 * i.b) / 1e3 / 255;
}, xt = function(i, t) {
  var e = N(i);
  return { h: e.h, s: e.s, l: g(e.l + 100 * t, 0, 100), a: e.a };
}, At = function() {
  function i(t) {
    this.parsed = re(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return i.prototype.isValid = function() {
    return this.parsed !== null;
  }, i.prototype.brightness = function() {
    return u(Y(this.rgba), 2);
  }, i.prototype.isDark = function() {
    return Y(this.rgba) < 0.5;
  }, i.prototype.isLight = function() {
    return Y(this.rgba) >= 0.5;
  }, i.prototype.toHex = function() {
    return t = J(this.rgba), e = t.r, r = t.g, o = t.b, n = (s = t.a) < 1 ? T(u(255 * s)) : "", "#" + T(e) + T(r) + T(o) + n;
    var t, e, r, o, s, n;
  }, i.prototype.toRgb = function() {
    return J(this.rgba);
  }, i.prototype.toRgbString = function() {
    return t = J(this.rgba), e = t.r, r = t.g, o = t.b, (s = t.a) < 1 ? "rgba(" + e + ", " + r + ", " + o + ", " + s + ")" : "rgb(" + e + ", " + r + ", " + o + ")";
    var t, e, r, o, s;
  }, i.prototype.toHsl = function() {
    return wt(N(this.rgba));
  }, i.prototype.toHslString = function() {
    return t = wt(N(this.rgba)), e = t.h, r = t.s, o = t.l, (s = t.a) < 1 ? "hsla(" + e + ", " + r + "%, " + o + "%, " + s + ")" : "hsl(" + e + ", " + r + "%, " + o + "%)";
    var t, e, r, o, s;
  }, i.prototype.toHsv = function() {
    return t = Ht(this.rgba), { h: u(t.h), s: u(t.s), v: u(t.v), a: u(t.a, 3) };
    var t;
  }, i.prototype.invert = function() {
    return f({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, i.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), f(X(this.rgba, t));
  }, i.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), f(X(this.rgba, -t));
  }, i.prototype.grayscale = function() {
    return f(X(this.rgba, -1));
  }, i.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), f(xt(this.rgba, t));
  }, i.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), f(xt(this.rgba, -t));
  }, i.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, i.prototype.alpha = function(t) {
    return typeof t == "number" ? f({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t }) : u(this.rgba.a, 3);
    var e;
  }, i.prototype.hue = function(t) {
    var e = N(this.rgba);
    return typeof t == "number" ? f({ h: t, s: e.s, l: e.l, a: e.a }) : u(e.h);
  }, i.prototype.isEqual = function(t) {
    return this.toHex() === f(t).toHex();
  }, i;
}(), f = function(i) {
  return i instanceof At ? i : new At(i);
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
var oe = Object.defineProperty, se = Object.getOwnPropertyDescriptor, q = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? se(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && oe(t, e, o), o;
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
let k = class extends x {
  render() {
    return I`<div class="rounded h-24 group">
        <div
          class="rounded shadow cursor-copy h-24 group-hover:scale-90"
          style="background-color: ${this.color};"
        ></div>
      </div>
      <div class="relative">
        <div>${this.name}</div>
        <div class="text-gray-500 font-extralight">
          ${ne(this.color, this.format)}
        </div>
      </div>`;
  }
};
k.styles = [Ot, rt`.relative {
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
q([ot()], k.prototype, "name", 2);
q([ot()], k.prototype, "color", 2);
q([ot()], k.prototype, "format", 2);
k = q([zt("ag-color-square")], k);
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
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ae(i, t, e) {
  return i ? t() : e == null ? void 0 : e();
}
var le = Object.defineProperty, he = Object.getOwnPropertyDescriptor, de = (i, t, e, r) => {
  for (var o = r > 1 ? void 0 : r ? he(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = (r ? n(t, e, o) : n(o)) || o);
  return r && o && le(t, e, o), o;
};
let tt = class extends x {
  constructor() {
    super(...arguments), this.colorMap = {};
  }
  loadColorMap(i) {
    this.colorMap = i, this.requestUpdate();
  }
  render() {
    return St(Object.entries(this.colorMap), ([i, t]) => I`<div>
        <div class="text-2xl capitalize font-semibold mb-2">${i}</div>
        <div
          class="grid gap-x-1 gap-y-5"
          style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
        >
          ${ae(typeof t == "string", () => I`<ag-color-square
              name="${i}"
              color="${t}"
              format="hex"
            ></ag-color-square>`, () => St(Object.entries(t), ([r, o]) => I`<ag-color-square
                    name="${`${i} ${r}`}"
                    color="${o}"
                    format="hex"
                  ></ag-color-square>`))}
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
.capitalize {
    text-transform: capitalize
}
      :host {
    display: flex;
    flex-direction: column;
    gap: 1.75rem
}
`];
tt = de([zt("ag-color-page")], tt);
export {
  tt as AGColorPage,
  k as AGColorSquare
};
