import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
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

  static styles = [
    baseStyles,
    css`
      @tailwind utilities;

      :host {
        @apply flex flex-col max-w-[12rem];
      }
    `,
  ];

  render() {
    return html`<div class="rounded h-24 group">
        <div
          class="rounded shadow cursor-copy h-24 group-hover:scale-90"
          style="background-color: ${convertColorCode(
            this.color,
            this.format
          )};"
        ></div>
      </div>
      <div class="relative">
        <div>${this.name}</div>
        <div class="text-gray-500 font-extralight"></div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-square": AGColorSquare;
  }
}
