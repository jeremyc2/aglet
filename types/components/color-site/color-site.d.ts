import { LitElement } from "lit";
export declare class AGColorSite extends LitElement {
    config: any;
    categories: string[];
    activeCategory: string;
    private colorFormat;
    private primaryAction;
    private copyConfig;
    private buildJSONasHTML;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-site": AGColorSite;
    }
}
