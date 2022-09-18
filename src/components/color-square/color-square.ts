import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ag-color-square")
export class AGColorSquare extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-square": AGColorSquare;
  }
}
