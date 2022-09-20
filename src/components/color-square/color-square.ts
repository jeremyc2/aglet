import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ag-color-square")
export class AGColorSquare extends LitElement {
  @property()
  name: string;

  @property()
  color: string;

  @property()
  format: string;

  render() {
    return html`<div>It works!!</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-square": AGColorSquare;
  }
}
