import { MigrationBase } from "../base";
export declare class Migration593AddAncestryItem extends MigrationBase {
    static version: number;
    requiresFlush: boolean;
    updateActor(actor: any): Promise<void>;
}
