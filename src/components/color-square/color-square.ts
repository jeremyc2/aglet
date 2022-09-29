import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { colord } from "colord";
import baseStyles from "../../base-style";

function convertColorCode(colorCode: string, format: "hex" | "rgb" | "hsl") {
  if (format === "hex") {
    return colord(colorCode).toHex().toUpperCase();
  }
  if (format === "rgb") {
    return colord(colorCode).toRgbString();
  }
  if (format === "hsl") {
    return colord(colorCode).toHslString();
  }
  throw "Unsupported Color Format";
}

@customElement("ag-color-square")
export class AGColorSquare extends LitElement {
  @property()
  name: string;

  @property()
  color: string;

  @property()
  format: "hex" | "rgb" | "hsl";

  private divRef: Ref<HTMLDivElement> = createRef();
  private colorCodeRef: Ref<HTMLDivElement> = createRef();

  private copy() {
    this.divRef.value!.classList.toggle("copy-overlay");
    const colorCode = this.colorCodeRef.value!.textContent?.trim();
    if (colorCode) navigator.clipboard.writeText(colorCode);
  }

  static styles = [
    baseStyles,
    css`
      @tailwind utilities;

      :host {
        @apply flex flex-col max-w-[12rem];
      }

      .copy-overlay::after {
        @apply absolute bg-white text-green-700
        flex justify-center items-center
        inset-0 content-['Copied!'];
      }
    `,
  ];

  render() {
    return html`<div @click="${this.copy}" class="rounded h-24 group">
        <div
          class="rounded shadow cursor-copy h-24 group-hover:scale-90"
          style="background-color: ${this.color};"
        ></div>
      </div>
      <div ${ref(this.divRef)} class="relative">
        <div>${this.name}</div>
        <div ${ref(this.colorCodeRef)} class="text-gray-500 font-extralight">
          ${convertColorCode(this.color, this.format)}
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-square": AGColorSquare;
  }
}
