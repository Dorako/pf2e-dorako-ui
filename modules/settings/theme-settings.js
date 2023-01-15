import {
  SettingsMenuDorakoUI
} from "./menu.js";

export class ThemeSettings extends SettingsMenuDorakoUI {
  static namespace = "theme";

  static SETTINGS = [
    "dark-theme-degree",
    "npc-sheet-theme",
    "pc-sheet-theme",
    "loot-sheet-theme",
    "familiar-sheet-theme",
    "chat-theme",
    "header-style",
    "frosted-glass",
    "glass-bg"
  ];

  static get settings() {
    return {
      "chat-theme": {
        name: "pf2e-dorako-ui.settings.theme.chat-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-theme.hint",
        scope: "client",
        config: true,
        default: "Light",
        type: String,
        choices: {
          light: "pf2e-dorako-ui.text.light",
          dark: "pf2e-dorako-ui.text.dark",
          factions: "pf2e-dorako-ui.settings.theme.chat-theme.choice.factions",
        },
        requiresReload: true
      },
      "header-style": {
        name: "pf2e-dorako-ui.settings.theme.header-style.name",
        hint: "pf2e-dorako-ui.settings.theme.header-style.hint",
        scope: "client",
        config: true,
        default: "none",
        type: String,
        choices: {
          red: "pf2e-dorako-ui.settings.theme.header-style.choice.red",
          blue: "pf2e-dorako-ui.settings.theme.header-style.choice.blue",
          tint: "pf2e-dorako-ui.settings.theme.header-style.choice.tint",
          none: "pf2e-dorako-ui.settings.theme.header-style.choice.none",
        },
        requiresReload: true
      },
      "frosted-glass":{
        name: "pf2e-dorako-ui.settings.theme.frosted-glass.name",
        hint: "pf2e-dorako-ui.settings.theme.frosted-glass.hint",
        scope: "client",
        config: true,
        default: "",
        type: String,
        requiresReload: true
      },
      "glass-bg": {
        name: "pf2e-dorako-ui.settings.theme.glass-bg.name",
        hint: "pf2e-dorako-ui.settings.theme.glass-bg.hint",
        scope: "client",
        config: true,
        default: "",
        type: String,
        requiresReload: true
      },
      "dark-theme-degree": {
        name: "pf2e-dorako-ui.settings.theme.dark-theme-degree.name",
        hint: "pf2e-dorako-ui.settings.theme.dark-theme-degree.hint",
        scope: "client",
        config: true,
        default: "default",
        type: String,
        choices: {
          "none": "pf2e-dorako-ui.settings.theme.dark-theme-degree.choice.none",
          "supported": "pf2e-dorako-ui.settings.theme.dark-theme-degree.choice.supported",
          "extended": "pf2e-dorako-ui.settings.theme.dark-theme-degree.choice.extended",
          "maximum": "pf2e-dorako-ui.settings.theme.dark-theme-degree.choice.maximum",
        },
        requiresReload: true
      },
      "pc-sheet-theme": {
        name: "pf2e-dorako-ui.settings.theme.pc-sheet-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.pc-sheet-theme.hint",
        scope: "client",
        config: true,
        default: "light-theme",
        type: String,
        choices: {
          "default": "pf2e-dorako-ui.text.default",
          // "light-theme": "pf2e-dorako-ui.text.light",
          "dark-theme": "pf2e-dorako-ui.text.dark",
        },
        requiresReload: true
      },
      "npc-sheet-theme": {
        name: "pf2e-dorako-ui.settings.theme.npc-sheet-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.npc-sheet-theme.hint",
        scope: "client",
        config: true,
        default: "light-theme",
        type: String,
        choices: {
          "default": "pf2e-dorako-ui.text.default",
          "light-theme": "pf2e-dorako-ui.text.light",
          "dark-theme": "pf2e-dorako-ui.text.dark",
        },
        requiresReload: true
      },
      "familiar-sheet-theme": {
        name: "pf2e-dorako-ui.settings.theme.familiar-sheet-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.familiar-sheet-theme.hint",
        scope: "client",
        config: true,
        default: "default",
        type: String,
        choices: {
          default: "pf2e-dorako-ui.text.default",
          dark: "pf2e-dorako-ui.text.dark",
          darkRedHeader: "pf2e-dorako-ui.settings.theme.familiar-sheet-theme.choice.dark-red-header",
        },
        requiresReload: true
      },

      "loot-sheet-theme": {
        name: "pf2e-dorako-ui.settings.theme.loot-sheet-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.loot-sheet-theme.hint",
        scope: "client",
        config: true,
        default: "light-theme",
        type: String,
        choices: {
          default: "pf2e-dorako-ui.text.default",
          "light-theme": "pf2e-dorako-ui.text.light",
          // "dark-theme": "pf2e-dorako-ui.text.dark",
        },
        requiresReload: true
      },
    };
  }
}