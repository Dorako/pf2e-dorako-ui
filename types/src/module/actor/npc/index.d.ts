import { RollNotePF2e } from "@module/notes";
import { CreaturePF2e } from "@actor/index";
import { MeleeData } from "@item/data";
import { Rarity } from "@module/data";
import { NPCData } from "./data";
import { VisionLevel } from "@actor/creature/data";
import { NPCSheetPF2e } from "./sheet";
import { NPCLegacySheetPF2e } from "./legacy-sheet";
export declare class NPCPF2e extends CreaturePF2e {
    static get schema(): typeof NPCData;
    get rarity(): Rarity;
    /** Does this NPC have the Elite adjustment? */
    get isElite(): boolean;
    /** Does this NPC have the Weak adjustment? */
    get isWeak(): boolean;
    /** NPCs with sufficient permissions can always see (for now) */
    get visionLevel(): VisionLevel;
    /** Users with limited permission can loot a dead NPC */
    canUserModify(user: User, action: UserAction): boolean;
    /** A user can see an NPC in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    /** Grant all users at least limited permission on dead NPCs */
    get permission(): PermissionLevel;
    /** Grant players limited permission on dead NPCs */
    testUserPermission(
        user: User,
        permission: DocumentPermission | UserAction,
        options?: {
            exact?: boolean;
        },
    ): boolean;
    prepareDerivedData(): void;
    private updateTokenAttitude;
    private static mapNPCAttitudeToTokenDisposition;
    private static mapTokenDispositionToNPCAttitude;
    protected getAttackEffects(item: MeleeData): Promise<RollNotePF2e[]>;
    protected getHpAdjustment(level: number): number;
    protected _onUpdate(
        changed: DeepPartial<this["data"]["_source"]>,
        options: DocumentModificationContext,
        userId: string,
    ): void;
    /** Make the NPC elite, weak, or normal */
    applyAdjustment(adjustment: "elite" | "weak" | "normal"): Promise<void>;
    updateAttitudeFromDisposition(disposition: number): void;
}
export interface NPCPF2e {
    readonly data: NPCData;
    _sheet: NPCSheetPF2e | NPCLegacySheetPF2e;
}
