import { LitElement } from "lit";
import { ColorMap } from "../color-page/color-page";
export declare class AGColorSite extends LitElement {
    config: any;
    categories: string[];
    activeCategory: string;
    uncategorized: ColorMap;
    private colorFormat;
    private primaryAction;
    private copyConfig;
    private buildJSONasHTML;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1> | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-site": AGColorSite;
    }
}
