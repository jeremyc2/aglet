import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ag-color-square")
export class AGColorSquare extends LitElement {
  @property()
  name: string;

  @property()
  color: string;

  @property()
  format: string;

  static styles = css`
    @tailwind utilities;
  `;

  render() {
    return html`<div>
      <div
        class="rounded shadow bg-gray-3 cursor-copy h-24 hover:scale-90"
      ></div>
      <div class="relative">
        <div></div>
        <div class="text-gray-500 font-extralight"></div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-square": AGColorSquare;
  }
}
