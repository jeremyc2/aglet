import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ag-color-section")
export class AGColorSection extends LitElement {
  static styles = css`
    @tailwind base;
    @tailwind utilities;

    :host {
      @apply flex flex-col max-w-[12rem];
    }
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
