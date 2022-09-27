import { LitElement } from "lit";
interface ColorMap {
    [groupName: string]: {
        [colorLevel: string | number]: string;
    };
}
export declare class AGColorSection extends LitElement {
    private colorMap;
    loadColorMap(colorMap: ColorMap): void;
    static styles: import("lit").CSSResult[];
    render(): Generator<unknown, void, unknown>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ag-color-section": AGColorSection;
    }
}
export {};
