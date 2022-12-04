import { MigrationBase } from "../base";
export declare class Migration598AddClassItem extends MigrationBase {
    static version: number;
    requiresFlush: boolean;
    updateActor(actor: any): Promise<void>;
}
