export declare class RecallKnowledgePopup extends Application {
    static get defaultOptions(): ApplicationOptions;
    getData(): {
        specificLoreAttempts: string[];
        unspecificLoreAttempts: string[];
        skills: {
            name: any;
            attempts: string[];
        }[];
    };
    private padAttempts;
}
