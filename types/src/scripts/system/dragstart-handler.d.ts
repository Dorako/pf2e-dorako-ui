export interface DropCanvasDataPF2e<T extends object> extends DropCanvasData<T> {
    value?: number;
    level?: number;
}
/**
 * Extends all drag and drop events on entity links to contain PF2e specific information
 * such as condition value and spell level.
 */
export declare function extendDragData(): void;
