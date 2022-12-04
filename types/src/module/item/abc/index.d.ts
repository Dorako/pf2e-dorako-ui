import { ItemPF2e } from "../index";
import { CharacterPF2e } from "@actor/index";
import type { FeatSource } from "@item/feat/data";
import { ABCFeatureEntryData } from "./data";
import type { AncestryData, AncestrySource } from "@item/ancestry/data";
import type { BackgroundData, BackgroundSource } from "@item/background/data";
import type { ClassData, ClassSource } from "@item/class/data";
/** Abstract base class representing a Pathfinder (A)ncestry, (B)ackground, or (C)lass */
export declare abstract class ABCItemPF2e extends ItemPF2e {
    protected getFeature(entry: ABCFeatureEntryData): Promise<FeatSource>;
    protected deleteExistingFeatures(actor: CharacterPF2e): Promise<void>;
    addFeatures(actor: CharacterPF2e): Promise<void>;
    protected _onCreate(
        data: AncestrySource | BackgroundSource | ClassSource,
        options: DocumentModificationContext,
        userId: string,
    ): void;
}
export interface ABCItemPF2e {
    readonly data: AncestryData | BackgroundData | ClassData;
}
