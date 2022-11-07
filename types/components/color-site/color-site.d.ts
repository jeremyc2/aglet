import { LitElement } from "lit";
interface Tab {
    tabName: string;
    configProperty: string;
}
export declare class AGColorSite extends LitElement {
    config: any;
    namePrefix: string;
    tabs: Tab[];
    activeTab: Tab;
    private colorFormat;
    private primaryAction;
    private copyConfig;
    private outputConfig;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1> | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-site": AGColorSite;
    }
}
export {};
