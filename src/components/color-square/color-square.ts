import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { colord } from "colord";
import baseStyles from "../../base-style";

type ColorFormat = "hex" | "rgb" | "hsl";

function convertColorCode(colorCode: string, format: ColorFormat): string {
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

function convertColorName(colorName: string, prefix: string | undefined): string {
  let name = colorName.trim().replace(/\s+/g,"-");
  if(prefix) return `${prefix}-${name}`;
  return name;
}

@customElement("ag-color-square")
export class AGColorSquare extends LitElement {
  @property()
  name: string;

  @property()
  color: string;

  @property()
  format: ColorFormat;

  @property()
  prefix: string;

  @property()
  primaryAction: "copy-name" | "copy-code";

  private labelContainerRef: Ref<HTMLDivElement> = createRef();

  private copyTimeout: number;

  private copy() {
    const labelContainer = this.labelContainerRef.value;

    if (!labelContainer) return;

    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }

    labelContainer.classList.add("copy-overlay");
    const copyText =
      this.primaryAction === "copy-name"
        ? convertColorName(this.name, this.prefix)
        : convertColorCode(this.color, this.format);

    if (copyText) navigator.clipboard.writeText(copyText);

    this.copyTimeout = setTimeout(() => {
      labelContainer.classList.remove("copy-overlay");
    }, 1000);
  }

  static styles = [
    baseStyles,
    css`
      @tailwind utilities;

      :host {
        @apply flex flex-col max-w-[12rem];
      }

      .copy-overlay {
        @apply invisible;
      }

      .copy-overlay::after {
        @apply absolute text-green-700
        flex justify-center items-center
        inset-0 content-['Copied!'] visible;
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
      <div ${ref(this.labelContainerRef)} class="relative">
        <div>${this.name}</div>
        <div class="text-gray-500 font-extralight">
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
