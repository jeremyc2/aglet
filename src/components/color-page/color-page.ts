import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import baseStyles from "../../base-style";

interface ColorMap {
  [groupName: string]: {
    [colorLevel: string | number]: string;
  };
}

@customElement("ag-color-page")
export class AGColorPage extends LitElement {
  private colorMap: ColorMap = {};

  loadColorMap(colorMap: ColorMap) {
    this.colorMap = colorMap;
    this.requestUpdate();
  }

  @property()
  format: "hex" | "rgb" | "hsl";

  static styles = [
    baseStyles,
    css`
      @tailwind utilities;

      :host {
        @apply flex flex-col gap-7;
      }
    `,
  ];

  render() {
    return map(Object.entries(this.colorMap), ([groupName, colors]) => {
      const isSingleColor = typeof colors === "string";

      return html`<div>
        <div class="text-2xl capitalize font-semibold mb-2">${groupName}</div>
        <div
          class="grid gap-x-1 gap-y-5"
          style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
        >
          ${when(
            isSingleColor,
            () => html`<ag-color-square
              name="${groupName}"
              color="${colors}"
              format="${this.format}"
            ></ag-color-square>`,
            () =>
              map(
                Object.entries(colors),
                ([colorLevel, colorCode]) =>
                  html`<ag-color-square
                    name="${`${groupName} ${colorLevel}`}"
                    color="${colorCode}"
                    format="${this.format}"
                  ></ag-color-square>`
              )
          )}
        </div>
      </div>`;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-page": AGColorPage;
  }
}
