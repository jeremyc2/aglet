import { LitElement } from "lit";
declare type ColorFormat = "hex" | "rgb" | "hsl";
export declare class AGColorSquare extends LitElement {
    name: string;
    color: string;
    format: ColorFormat;
    prefix: string;
    primaryAction: "copy-name" | "copy-code";
    private labelContainerRef;
    private copyTimeout;
    private copy;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-square": AGColorSquare;
    }
}
export {};
