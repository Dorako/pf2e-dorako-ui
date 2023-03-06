import { SettingsMenuDorakoUI } from "./menu.js";
import { refreshChat } from "./settings.js";

export class ThemeSettings extends SettingsMenuDorakoUI {
  static namespace = "theme";

  static SETTINGS = [
    "application-theme",
    "chat-theme",
    "header-style",
    "frosted-glass",
    "glass-bg",
    "enable-dark-theme-journals",
  ];

  static get settings() {
    return {
      "chat-theme": {
        name: "pf2e-dorako-ui.settings.theme.chat-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-theme.hint",
        scope: "client",
        config: true,
        default: "light",
        type: String,
        choices: {
          light: "pf2e-dorako-ui.text.light",
          dark: "pf2e-dorako-ui.text.dark",
          factions: "pf2e-dorako-ui.settings.theme.chat-theme.choice.factions",
        },
        requiresReload: false,
        onChange: refreshChat,
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
        requiresReload: false,
        onChange: refreshChat,
      },
      "frosted-glass": {
        name: "pf2e-dorako-ui.settings.theme.frosted-glass.name",
        hint: "pf2e-dorako-ui.settings.theme.frosted-glass.hint",
        scope: "client",
        config: true,
        default: "",
        type: String,
        requiresReload: false,
        onChange: () => {
          const root = document.querySelector(":root").style;
          root.setProperty("--frosted-glass", game.settings.get("pf2e-dorako-ui", "theme.frosted-glass"));
        },
      },
      "glass-bg": {
        name: "pf2e-dorako-ui.settings.theme.glass-bg.name",
        hint: "pf2e-dorako-ui.settings.theme.glass-bg.hint",
        scope: "client",
        config: true,
        default: "",
        type: String,
        requiresReload: false,
        onChange: () => {
          const root = document.querySelector(":root").style;
          root.setProperty("--glass-bg", game.settings.get("pf2e-dorako-ui", "theme.glass-bg"));
        },
      },
      "application-theme": {
        name: "pf2e-dorako-ui.settings.theme.application-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.application-theme.hint",
        scope: "client",
        config: true,
        default: "light-theme",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.settings.theme.application-theme.choice.no-theme",
          "light-theme": "pf2e-dorako-ui.settings.theme.application-theme.choice.light-theme",
          "dark-theme": "pf2e-dorako-ui.settings.theme.application-theme.choice.dark-theme",
        },
        requiresReload: false, // re-render all windows
        onChange: () => {
          const apps = Object.values(ui.windows).filter((w) => w instanceof Application);
          for (const app of apps) {
            app.render();
          }
        },
      },
      "enable-dark-theme-journals": {
        name: "pf2e-dorako-ui.settings.theme.enable-dark-theme-journals.name",
        hint: "pf2e-dorako-ui.settings.theme.enable-dark-theme-journals.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        requiresReload: false, // re-render all windows
        onChange: () => {
          const apps = Object.values(ui.windows).filter((w) => w instanceof Application);
          for (const app of apps) {
            app.render();
          }
        },
      },
    };
  }
}
