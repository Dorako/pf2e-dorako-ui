import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
declare type EnfolderableDocumentPF2e =
    | ActorPF2e
    | ItemPF2e
    | Exclude<EnfolderableDocument, Actor | Item>;
export declare class FolderPF2e<
    TDocument extends EnfolderableDocumentPF2e = EnfolderableDocumentPF2e,
> extends Folder<TDocument> {
    /** Work around foundry bug causing deleted array elements to be retained. */
    exportToCompendium(
        pack: CompendiumCollection<TDocument>,
        {
            updateByName,
        }?: {
            updateByName?: boolean | undefined;
        },
    ): Promise<CompendiumCollection<TDocument>>;
}
export {};
