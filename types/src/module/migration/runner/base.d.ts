import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "@module/migration/base";
interface ItemsDiff {
    inserted: ItemSourcePF2e[];
    deleted: string[];
    updated: ItemSourcePF2e[];
}
export declare class MigrationRunnerBase {
    migrations: MigrationBase[];
    static LATEST_SCHEMA_VERSION: number;
    static MINIMUM_SAFE_VERSION: number;
    static RECOMMENDED_SAFE_VERSION: number;
    constructor(migrations?: MigrationBase[]);
    needsMigration(currentVersion: number): boolean;
    diffItems(orig: ItemSourcePF2e[], updated: ItemSourcePF2e[]): ItemsDiff;
    getUpdatedItem(item: ItemSourcePF2e, migrations: MigrationBase[]): Promise<ItemSourcePF2e>;
    getUpdatedActor(actor: ActorSourcePF2e, migrations: MigrationBase[]): Promise<ActorSourcePF2e>;
    getUpdatedMessage(
        messageData: foundry.data.ChatMessageSource,
        migrations: MigrationBase[],
    ): Promise<foundry.data.ChatMessageSource>;
    getUpdatedMacro(
        macroSource: foundry.data.MacroSource,
        migrations: MigrationBase[],
    ): Promise<foundry.data.MacroSource>;
    getUpdatedTable(
        tableSource: foundry.data.RollTableSource,
        migrations: MigrationBase[],
    ): Promise<foundry.data.RollTableSource>;
    getUpdatedToken(
        token: TokenDocument,
        migrations: MigrationBase[],
    ): Promise<foundry.data.TokenSource>;
    getUpdatedUser(
        userData: foundry.data.UserSource,
        migrations: MigrationBase[],
    ): Promise<foundry.data.UserSource>;
}
export {};
