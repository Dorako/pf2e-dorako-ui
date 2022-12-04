import { MigrationBase } from "./base";
export declare class Migrations {
    private static list;
    static get latestVersion(): number;
    static constructAll(): MigrationBase[];
    static constructForWorld(version: number): MigrationBase[];
    static constructRange(min: number, max?: number): MigrationBase[];
}
