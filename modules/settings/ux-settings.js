import { SettingsMenuDorakoUI } from "./menu.js";

export class UXSettings extends SettingsMenuDorakoUI {
    static namespace = "ux";

    static SETTINGS = [
        "chat-input-height",
        "restructure-card-info",
        "no-cards",
        "no-chat-control-icon",
        "no-logo",
        "compact-ui",
        "remove-attack-info-from-damage-roll-messages",
        "center-hotbar",
        "enable-player-tags",
        "rolltype-indication",
    ];

    static get settings() {
        return {
            "center-hotbar":{
                name: "pf2e-dorako-ui.settings.ux.center-hotbar.name",
                hint: "pf2e-dorako-ui.settings.ux.center-hotbar.hint",
                scope: "client",
                type: Boolean,
                default: false,
                config: true,
                requiresReload: true
              },
            "chat-input-height": {
                name: "pf2e-dorako-ui.settings.ux.chat-input-height.name",
                hint: game.modules.get("CautiousGamemastersPack")?.active
                  ? "pf2e-dorako-ui.settings.ux.chat-input-height.CGMPhint"
                  : "pf2e-dorako-ui.settings.ux.chat-input-height.hint",
                scope: "client",
                type: Number,
                default: 90,
                range: {
                  min: 20,
                  max: 300,
                  step: 5,
                },
                config: true,
                requiresReload: false,
                onChange: () => {
                    const root = document.querySelector(":root").style;
                    root.setProperty("--chat-input-height", game.settings.get("pf2e-dorako-ui", "ux.chat-input-height").toString() + "px");
                }
              },
              "restructure-card-info": {
                name: "pf2e-dorako-ui.settings.ux.restructure-card-info.name",
                hint: "pf2e-dorako-ui.settings.ux.restructure-card-info.hint",
                scope: "world",
                type: Boolean,
                default: true,
                config: true,
                requiresReload: true
              },
              "remove-attack-info-from-damage-roll-messages": {
                name: "pf2e-dorako-ui.settings.ux.remove-attack-info-from-damage-roll-messages.name",
                hint: "pf2e-dorako-ui.settings.ux.remove-attack-info-from-damage-roll-messages.hint",
                scope: "world",
                type: Boolean,
                default: true,
                config: true,
                requiresReload: true
              },
              "compact-ui": {
                name: "pf2e-dorako-ui.settings.ux.compact-ui.name",
                hint: "pf2e-dorako-ui.settings.ux.compact-ui.hint",
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                requiresReload: true
              },
              "no-logo": {
                name: "pf2e-dorako-ui.settings.ux.no-logo.name",
                hint: "pf2e-dorako-ui.settings.ux.no-logo.hint",
                scope: "client",
                config: true,
                default: true,
                type: Boolean,
                requiresReload: true
              },
              "no-chat-control-icon": {
                name: "pf2e-dorako-ui.settings.ux.no-chat-control-icon.name",
                hint: "pf2e-dorako-ui.settings.ux.no-chat-control-icon.hint",
                scope: "client",
                config: true,
                default: true,
                type: Boolean,
                requiresReload: true
              },
              "no-cards": {
                name: "pf2e-dorako-ui.settings.ux.no-cards.name",
                hint: "pf2e-dorako-ui.settings.ux.no-cards.hint",
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                requiresReload: true
              },
              "enable-player-tags": {
                name: "pf2e-dorako-ui.settings.ux.enable-player-tags.name",
                hint: "pf2e-dorako-ui.settings.ux.enable-player-tags.hint",
                scope: "client",
                config: true,
                default: true,
                type: Boolean,
                requiresReload: true
              },
              "rolltype-indication": {
                name: "pf2e-dorako-ui.settings.ux.rolltype-indication.name",
                hint: "pf2e-dorako-ui.settings.ux.rolltype-indication.hint",
                scope: "client",
                type: String,
                default: "both",
                config: true,
                choices: {
                  tags: "pf2e-dorako-ui.settings.ux.rolltype-indication.choice.tags",
                  "bg-color": "pf2e-dorako-ui.settings.ux.rolltype-indication.choice.bg-color",
                  both: "pf2e-dorako-ui.settings.ux.rolltype-indication.choice.both",
                  none: "pf2e-dorako-ui.settings.ux.rolltype-indication.choice.none",
                },
                requiresReload: true
              },
        };
    }
}
