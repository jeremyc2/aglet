import { LitElement } from "lit";
export declare class AGColorSquare extends LitElement {
    name: string;
    color: string;
    format: "hex" | "rgb" | "hsl";
    private copy;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-square": AGColorSquare;
    }
}
