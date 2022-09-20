import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ag-color-square")
export class AGColorSquare extends LitElement {
  render() {
    return html`<div>It works!!</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-square": AGColorSquare;
  }
}
