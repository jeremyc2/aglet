import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import baseStyles from "../../base-style";

interface Color {
  name: string;
  code: string;
}

interface ColorGroup {
  name: string;
  colors: Color[];
}

interface ColorMap {
  [name: string]:
    | {
        [colorLevel: string | number]: string;
      }
    | string;
}

type ColorFormat = "hex" | "rgb" | "hsl";

function buildColorSection(
  groupName: string,
  format: ColorFormat,
  colors: Color[],
  uncategorized: boolean,
  primaryAction: "copy-name" | "copy-code",
  prefix: string | undefined
) {
  if (colors.length === 0) return;
  return html`<div>
    <div class="text-2xl capitalize font-semibold mb-2">${groupName}</div>
    <div
      class="grid gap-x-1 gap-y-5"
      style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
    >
      ${colors.map(({ name: colorName, code: colorCode }) => {
        const name: string = uncategorized
          ? colorName
          : `${groupName} ${colorName}`;
        return html`<ag-color-square
          name="${name}"
          color="${colorCode}"
          format="${format}"
          primaryAction="${primaryAction}"
          prefix="${ifDefined(prefix)}"
        ></ag-color-square>`;
      })}
    </div>
  </div>`;
}

@customElement("ag-color-page")
export class AGColorPage extends LitElement {
  private colorMap: ColorMap = {};

  loadColorMap(colorMap: ColorMap) {
    this.colorMap = colorMap;
    this.requestUpdate();
  }

  @property()
  format: ColorFormat;

  @property()
  prefix: string;

  @property()
  primaryAction: "copy-name" | "copy-code";

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
    let colors: Color[] = [],
      colorGroups: ColorGroup[] = [];

    Object.entries(this.colorMap).forEach(([name, value]) => {
      if (typeof value === "string") {
        colors.push({ name, code: value });
        return;
      }

      colorGroups.push({
        name,
        colors: Object.entries(value).map(([name, code]) => ({
          name,
          code,
        })),
      });
    });

    return [
      buildColorSection(
        "General",
        this.format,
        colors,
        true,
        this.primaryAction,
        this.prefix
      ),
      ...colorGroups.map((colorGroup) =>
        buildColorSection(
          colorGroup.name,
          this.format,
          colorGroup.colors,
          false,
          this.primaryAction,
          this.prefix
        )
      ),
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-page": AGColorPage;
  }
}
