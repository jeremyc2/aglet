import { LitElement } from "lit";
interface ColorMap {
    [name: string]: {
        [colorLevel: string | number]: string;
    } | string;
}
declare type ColorFormat = "hex" | "rgb" | "hsl";
export declare class AGColorPage extends LitElement {
    private colorMap;
    loadColorMap(colorMap: ColorMap): void;
    format: ColorFormat;
    static styles: import("lit").CSSResult[];
    render(): (import("lit").TemplateResult<1> | undefined)[];
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-page": AGColorPage;
    }
}
export {};
