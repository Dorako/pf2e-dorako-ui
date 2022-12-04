import { MigrationBase } from "../base";
export declare class Migration594AddBackgroundItem extends MigrationBase {
    static version: number;
    requiresFlush: boolean;
    updateActor(actor: any): Promise<void>;
}
