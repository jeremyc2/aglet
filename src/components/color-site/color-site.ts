import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import baseStyles from "../../base-style";
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("ag-color-site")
export class AGColorSite extends LitElement {
  @property()
  config: any;

  @property()
  categories: string[];

  @property()
  activeCategory: string;

  @state()
  private colorFormat: "hex" | "rgb" | "hsl" = "hex";

  @state()
  private primaryAction: "copy-name" | "copy-code" = "copy-name";

  private copyConfig() {
    navigator.clipboard.writeText(JSON.stringify(this.config, null, "\t"));
  }

  private buildJSONasHTML(object: any) {
    let html = JSON.stringify(object, null, "  ");
    return html.replace(/".*?"/g, `<span style="color: #A3BE8C;">$&</span>`);
  }

  static styles = [
    baseStyles,
    css`
      @tailwind utilities;
      header li {
        @apply border-b-4 border-b-transparent inline-block p-1.5 cursor-pointer
          hover:bg-opacity-20 hover:bg-white;
      }
      header li.active {
        @apply border-b-current;
      }
    `,
  ];

  render() {
    // prettier-ignore
    return html`<header class="fixed px-5 bg-neutral-800 text-white w-full z-10">
        <ul class="flex gap-6">
          ${this.categories.map(category => {
            return html`<li class=${classMap({ active: category === this.activeCategory })} @click="${() => this.activeCategory = category}">
              ${category}
            </li>`;
          })}
        </ul>
      </header>

      <div class="text-neutral-800 p-10 pt-20 max-w-4xl mx-auto flex flex-col gap-4">
        <div class="text-5xl pb-3 border-b border-b-gray-300 font-semibold">
          ${this.activeCategory}
        </div>

        <sl-details summary="Tailwind Config">
          <pre style="background-color: #2e3440ff; color: #D8DEE9;" class="p-4 h-96 overflow-auto relative"><code><button 
            @click="${this.copyConfig}" class="bg-white text-black absolute top-4 right-4 p-2 rounded hover:bg-neutral-200"><svg 
            aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
              <path fill-rule="evenodd"
                d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z">
              </path>
              <path fill-rule="evenodd"
                d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z">
              </path>
            </svg></button>${unsafeHTML(this.buildJSONasHTML(this.config))}</code></pre>
        </sl-details>

        <sl-radio-group label="Color Format" name="color-format" value="hex" fieldset>
          <sl-radio-button value="hex" @click="${() => this.colorFormat = "hex"}">
            HEX
          </sl-radio-button>
          <sl-radio-button value="rgb" @click="${() => this.colorFormat = "rgb"}">
            RGB
          </sl-radio-button>
          <sl-radio-button value="hsl" @click="${() => this.colorFormat = "hsl"}">
            HSL
          </sl-radio-button>
        </sl-radio-group>
        <sl-radio-group label="Primary Action" name="primary-action" value="copy-name" fieldset>
          <sl-radio value="copy-name" @click="${() => this.primaryAction = "copy-name"}">
            Copy TailwindCSS Name
          </sl-radio>
          <sl-radio value="copy-code" @click="${() => this.primaryAction = "copy-code"}">
            Copy Color Code
          </sl-radio>
        </sl-radio-group>
        <ag-color-page format="${this.colorFormat}" primaryAction="${this.primaryAction}"></ag-color-page>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-color-site": AGColorSite;
  }
}
