import { LitElement } from "lit";
export interface ColorMap {
    [name: string]: {
        [colorLevel: string | number]: string;
    } | string;
}
declare type ColorFormat = "hex" | "rgb" | "hsl";
export declare class AGColorPage extends LitElement {
    colorMap: ColorMap;
    format: ColorFormat;
    prefix: string;
    primaryAction: "copy-name" | "copy-code";
    static styles: import("lit").CSSResult[];
    render(): (import("lit").TemplateResult<1> | undefined)[];
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-page": AGColorPage;
    }
}
export {};
