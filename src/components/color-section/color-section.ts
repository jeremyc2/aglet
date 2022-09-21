import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ag-color-section")
export class AGColorSection extends LitElement {
  @property()
  name: string;

  static styles = css`
    @tailwind base;
    @tailwind utilities;
  `;

  render() {
    return html`<div class="text-2xl font-semibold mb-2"></div>
      <div
        class="grid gap-x-1 gap-y-5"
        style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
      >
        <slot></slot>
      </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-section": AGColorSection;
  }
}
