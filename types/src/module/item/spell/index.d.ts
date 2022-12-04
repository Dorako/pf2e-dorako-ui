import { ItemPF2e } from "@item/index";
import { SpellcastingEntryPF2e } from "@item/spellcasting-entry";
import { SpellData } from "./data";
export declare class SpellPF2e extends ItemPF2e {
    static get schema(): typeof SpellData;
    get spellcasting(): SpellcastingEntryPF2e | undefined;
    get level(): import("../../data").ZeroToTen;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    prepareBaseData(): void;
    getChatData(
        this: Embedded<SpellPF2e>,
        htmlOptions?: EnrichHTMLOptions,
        rollOptions?: {
            spellLvl?: number;
        },
    ):
        | import("./data").SpellSystemData
        | {
              save: {
                  basic: string;
                  value: "" | "fortitude" | "reflex" | "will";
                  dc?: number | undefined;
                  str?: string | undefined;
              };
              isAttack: boolean;
              isSave: boolean;
              spellLvl: number;
              damageLabel: string;
              properties: string[];
              traits: import("../data").TraitChatData[];
              level: {
                  value: import("../../data").ZeroToTen;
              };
              spellType: {
                  value: string;
              };
              category: {
                  value: "focus" | "spell" | "ritual";
              };
              traditions: import("../../data").ValuesList<
                  "arcane" | "divine" | "occult" | "primal"
              >;
              school: {
                  value:
                      | "abjuration"
                      | "conjuration"
                      | "divination"
                      | "enchantment"
                      | "evocation"
                      | "illusion"
                      | "necromancy"
                      | "transmutation";
              };
              components: {
                  value: string;
              };
              materials: {
                  value: string;
              };
              target: {
                  value: string;
              };
              range: {
                  value: string;
              };
              area: {
                  value: 10 | 5 | 15 | 20 | 40 | 30 | 50 | 100 | 60 | 120;
                  areaType: "line" | "cone" | "burst" | "emanation";
              };
              time: {
                  value: string;
              };
              duration: {
                  value: string;
              };
              damage: {
                  value: string;
                  applyMod: false;
              };
              damageType: {
                  value: string;
              };
              scaling: {
                  mode: string;
                  formula: string;
              };
              sustained: {
                  value: false;
              };
              cost: {
                  value: string;
              };
              ability: {
                  value: "str" | "dex" | "con" | "int" | "wis" | "cha";
              };
              prepared: {
                  value: boolean;
              };
              location: {
                  value: string;
              };
              heightenedLevel: {
                  value: number;
              };
              hasCounteractCheck: {
                  value: boolean;
              };
              item?: string | undefined;
              trickMagicItemData?: import("../data").TrickMagicItemCastData | undefined;
              isSignatureSpell?: boolean | undefined;
              description: {
                  value: string;
                  chat: string;
                  unidentified: string;
              };
              source: {
                  value: string;
              };
              options?:
                  | {
                        value: string[];
                    }
                  | undefined;
              usage: {
                  value: string;
              };
              rules: import("../../rules/rules-data-definitions").RuleElementData[];
              slug: string | null;
          };
}
export interface SpellPF2e {
    readonly data: SpellData;
}
