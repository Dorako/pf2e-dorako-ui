/**
 * Dialog for excluding certain modifiers before rolling for damage.
 */
import { DamageTemplate } from "@system/damage/weapon";
/**
 * @category Other
 */
export declare class DamageRollModifiersDialog extends Application {
    private static DAMAGE_TYPE_ICONS;
    damage: object;
    context: object;
    callback: any;
    constructor(damage: any, context: any, callback: any);
    static roll(damage: DamageTemplate, context: any, callback: any): void;
    getData(): {
        damage: object;
    };
    private static getDamageTypeIcon;
}
