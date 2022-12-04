import { MigrationRunnerBase } from "@module/migration/runner/base";
import { MigrationBase } from "@module/migration/base";
export declare class MigrationRunner extends MigrationRunnerBase {
    needsMigration(): boolean;
    private migrateWorldItem;
    private migrateWorldActor;
    private migrateChatMessage;
    private migrateWorldMacro;
    private migrateWorldTable;
    private migrateSceneToken;
    private migrateUser;
    runMigrations(migrations: MigrationBase[]): Promise<void>;
    /** Migrate actors and items in world compendia */
    private runPackMigrations;
    runMigration(force?: boolean): Promise<void>;
}
