import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sl-breadcrumb-item")
export class AGColorSquare extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-square": AGColorSquare;
  }
}
