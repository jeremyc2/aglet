import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import baseStyles from "../../base-style";

interface ColorMap {
  [groupName: string]: {
    [colorLevel: string | number]: string;
  };
}

@customElement("ag-color-section")
export class AGColorSection extends LitElement {
  private colorMap: ColorMap;

  loadColorMap(colorMap: ColorMap) {
    this.colorMap = colorMap;
    this.requestUpdate();
  }

  static styles = [
    baseStyles,
    css`
      @tailwind utilities;
    `,
  ];

  render() {
    return map(Object.entries(this.colorMap), ([groupName, colors]) => {
      return html` <div class="text-2xl font-semibold mb-2">${groupName}</div>
        <div
          class="grid gap-x-1 gap-y-5"
          style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
        >
          ${map(Object.entries(colors), ([colorLevel, colorCode]) => {
            return html`<ag-color-square
              name="${`${groupName}-${colorLevel}`}"
              color="${colorCode}"
              format="hex"
            ></ag-color-square>`;
          })}
        </div>`;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-section": AGColorSection;
  }
}
