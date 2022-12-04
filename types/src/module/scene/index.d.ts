import { ZeroToTwo } from "../data";
import { TokenDocumentPF2e } from "../token-document";
import { SceneConfigPF2e } from "./sheet";
export declare class ScenePF2e extends Scene<TokenDocumentPF2e> {
    getLightLevel(): number;
    update(data: DocumentUpdateData<this>, options?: DocumentModificationContext): Promise<this>;
}
export interface ScenePF2e {
    _sheet: SceneConfigPF2e;
}
export declare enum LightLevels {
    DARKNESS = 0.3333333333333333,
    DIM_LIGHT = 0.6666666666666666,
    BRIGHT_LIGHT = 1,
}
export declare type LightLevel = ZeroToTwo;
