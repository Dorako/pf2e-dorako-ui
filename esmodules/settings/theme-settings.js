import { SettingsMenuDorakoUI } from "./menu.js";
import { refreshChat } from "./settings.js";

export class ThemeSettings extends SettingsMenuDorakoUI {
  static namespace = "theme";

  static SETTINGS = [
    "window-app-theme",
    "window-app-color-scheme",
    "app-theme",
    "chat-message-theme",
    "chat-message-color-scheme",
    "chat-message-header-style",
    "pc-sheet-theme",
    "border-radius",
  ];

  static get settings() {
    return {
      "chat-message-header-style": {
        name: "pf2e-dorako-ui.settings.theme.chat-message-header-style.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-message-header-style.hint",
        scope: "client",
        config: true,
        default: "none",
        type: String,
        choices: {
          tint: "pf2e-dorako-ui.text.colors.player",
          red: "pf2e-dorako-ui.text.colors.red",
          green: "pf2e-dorako-ui.text.colors.green",
          blue: "pf2e-dorako-ui.text.colors.blue",
          none: "pf2e-dorako-ui.text.disabled",
        },
        requiresReload: false,
        onChange: refreshChat,
      },
      "pc-sheet-theme": {
        name: "pf2e-dorako-ui.settings.theme.pc-sheet-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.pc-sheet-theme.hint",
        scope: "client",
        config: true,
        default: "default",
        type: String,
        choices: {
          default: "pf2e-dorako-ui.text.default",
          red: "pf2e-dorako-ui.text.colors.red",
          green: "pf2e-dorako-ui.text.colors.green",
          blue: "pf2e-dorako-ui.text.colors.blue",
          purple: "pf2e-dorako-ui.text.colors.purple",
          black: "pf2e-dorako-ui.text.colors.black",
        },
        requiresReload: false,
        onChange: () => {
          const apps = Object.values(ui.windows).filter((w) => w instanceof Application);
          for (const app of apps) {
            app.render();
          }
        },
      },
      "window-app-theme": {
        name: "pf2e-dorako-ui.settings.theme.window-app-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.window-app-theme.hint",
        scope: "client",
        config: true,
        default: "crb",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.text.no-theme",
          crb: "pf2e-dorako-ui.text.crb",
          foundry2: "pf2e-dorako-ui.text.foundry2",
          bg3: "pf2e-dorako-ui.text.bg3",
          discord: "pf2e-dorako-ui.text.discord",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "window-app-color-scheme": {
        name: "pf2e-dorako-ui.settings.theme.window-app-color-scheme.name",
        hint: "pf2e-dorako-ui.settings.theme.window-app-color-scheme.hint",
        scope: "client",
        config: true,
        default: "default",
        type: String,
        choices: {
          default: "pf2e-dorako-ui.text.default",
          "prefer-light": "pf2e-dorako-ui.text.prefer-light",
          "prefer-dark": "pf2e-dorako-ui.text.prefer-dark",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "app-theme": {
        name: "pf2e-dorako-ui.settings.theme.app-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.app-theme.hint",
        scope: "client",
        config: true,
        default: "crb",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.text.no-theme",
          crb: "pf2e-dorako-ui.text.crb",
          foundry2: "pf2e-dorako-ui.text.foundry2",
          bg3: "pf2e-dorako-ui.text.bg3",
          discord: "pf2e-dorako-ui.text.discord",
          opaque: "pf2e-dorako-ui.text.opaque",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "chat-message-theme": {
        name: "pf2e-dorako-ui.settings.theme.chat-message-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-message-theme.hint",
        scope: "client",
        config: true,
        default: "crb",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.text.no-theme",
          crb: "pf2e-dorako-ui.text.crb",
          foundry2: "pf2e-dorako-ui.text.foundry2",
          bg3: "pf2e-dorako-ui.text.bg3",
          // discord: "pf2e-dorako-ui.text.discord",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "chat-message-color-scheme": {
        name: "pf2e-dorako-ui.settings.theme.chat-message-color-scheme.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-message-color-scheme.hint",
        scope: "client",
        config: true,
        default: "default",
        type: String,
        choices: {
          default: "pf2e-dorako-ui.text.default",
          "prefer-light": "pf2e-dorako-ui.text.prefer-light",
          "prefer-dark": "pf2e-dorako-ui.text.prefer-dark",
          "gm-vs-players": "pf2e-dorako-ui.text.gm-vs-players",
          alliance: "pf2e-dorako-ui.text.alliance",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "border-radius": {
        name: "pf2e-dorako-ui.settings.theme.border-radius.name",
        hint: "pf2e-dorako-ui.settings.theme.border-radius.hint",
        scope: "client",
        type: Number,
        default: 3,
        range: {
          min: 0,
          max: 48,
          step: 1,
        },
        config: true,
        requiresReload: false,
        onChange: (value) => {
          const root = document.querySelector(":root").style;
          root.setProperty("--border-radius", `${value}px`);
        },
      },
    };
  }
}
