import { LitElement } from "lit";
interface ColorMap {
    [groupName: string]: {
        [colorLevel: string | number]: string;
    };
}
export declare class AGColorPage extends LitElement {
    private colorMap;
    loadColorMap(colorMap: ColorMap): void;
    format: "hex" | "rgb" | "hsl";
    static styles: import("lit").CSSResult[];
    render(): Generator<unknown, void, unknown>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-page": AGColorPage;
    }
}
export {};
