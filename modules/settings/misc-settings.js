import { SettingsMenuDorakoUI } from "./menu.js";

export class MiscSettings extends SettingsMenuDorakoUI {
    static namespace = "misc";

    static SETTINGS = [
        "send-to-chat",
        "skin-combat-carousel",
        "skin-crb-journal",
    ];

    static get settings() {
        return {
            "send-to-chat": {
                name: "pf2e-dorako-ui.settings.misc.send-to-chat.name",
                hint: "pf2e-dorako-ui.settings.misc.send-to-chat.hint",
                scope: "world",
                config: true,
                default: true,
                type: Boolean,
                requiresReload: true
              },
              "skin-combat-carousel": {
                name: "pf2e-dorako-ui.settings.misc.skin-combat-carousel.name",
                scope: "world",
                type: Boolean,
                default: true,
                config: true,
                requiresReload: true
              },
              "skin-crb-journal": {
                name: "pf2e-dorako-ui.settings.misc.skin-crb-journal.name",
                hint: "pf2e-dorako-ui.settings.misc.skin-crb-journal.hint",
                scope: "world",
                type: Boolean,
                default: false,
                config: true,
                requiresReload: true
              }
        };
    }
}
