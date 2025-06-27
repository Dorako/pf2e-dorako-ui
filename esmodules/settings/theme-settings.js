import { SettingsMenuDorakoUI } from "./menu.js";
import { refreshChat } from "./settings.js";

export class ThemeSettings extends SettingsMenuDorakoUI {
  static namespace = "theme";

  static SETTINGS = [
    "interface-theme",
    "application-theme",
    "sheet-theme-color",
    "chat-message-standard-theme",
    "chat-message-opposition-theme",
    "chat-message-header-style",
    // "border-radius",
  ];

  static get settings() {
    return {
      "interface-theme": {
        // Interface theme
        name: "pf2e-dorako-ui.settings.theme.interface-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.interface-theme.hint",
        scope: "user",
        config: true,
        default: "no-theme",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.text.no-theme",
          glass: "pf2e-dorako-ui.text.glass",
          // foundry2: "pf2e-dorako-ui.text.foundry2",
          bg3: "pf2e-dorako-ui.text.bg3",
          dnd5e2: "pf2e-dorako-ui.text.dnd5e2",
          discord: "pf2e-dorako-ui.text.discord",
          // github: "pf2e-dorako-ui.text.github",
          // opaque: "pf2e-dorako-ui.text.opaque",
          // custom: "pf2e-dorako-ui.text.custom",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "application-theme": {
        // Sheet theme
        name: "pf2e-dorako-ui.settings.theme.application-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.application-theme.hint",
        scope: "user",
        config: true,
        default: "no-theme",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.text.no-theme",
          // "crb-light": "pf2e-dorako-ui.text.crb-light",
          // "crb-dark": "pf2e-dorako-ui.text.crb-dark",
          // foundry2: "pf2e-dorako-ui.text.foundry2",
          bg3: "pf2e-dorako-ui.text.bg3",
          // "dnd5e2-light": "pf2e-dorako-ui.text.dnd5e2-light",
          dnd5e2: "pf2e-dorako-ui.text.dnd5e2",
          discord: "pf2e-dorako-ui.text.discord",
          // github: "pf2e-dorako-ui.text.github",
          // "discord-dark": "pf2e-dorako-ui.text.discord-dark",
          // custom: "pf2e-dorako-ui.text.custom",
          // "custom-dark": "pf2e-dorako-ui.text.custom-dark",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "sheet-theme-color": {
        name: "pf2e-dorako-ui.settings.theme.sheet-theme-color.name",
        hint: "pf2e-dorako-ui.settings.theme.sheet-theme-color.hint",
        scope: "user",
        config: true,
        default: "default",
        type: String,
        choices: {
          default: "pf2e-dorako-ui.text.default",
          "player-color": "pf2e-dorako-ui.text.colors.player",
          red: "pf2e-dorako-ui.text.colors.red",
          green: "pf2e-dorako-ui.text.colors.green",
          blue: "pf2e-dorako-ui.text.colors.blue",
          purple: "pf2e-dorako-ui.text.colors.purple",
          black: "pf2e-dorako-ui.text.colors.black",
          brown: "pf2e-dorako-ui.text.colors.brown",
        },
        requiresReload: false,
        onChange: () => {
          const apps = Object.values(ui.windows).filter((w) => w instanceof Application);
          for (const app of apps) {
            app.render();
          }
        },
      },
      "chat-message-standard-theme": {
        name: "pf2e-dorako-ui.settings.theme.chat-message-standard-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-message-standard-theme.hint",
        scope: "user",
        config: true,
        default: "no-theme",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.text.no-theme",
          // "crb-light": "pf2e-dorako-ui.text.crb-light",
          // "crb-dark": "pf2e-dorako-ui.text.crb-dark",
          // foundry2: "pf2e-dorako-ui.text.foundry2",
          // "bg3-brown": "pf2e-dorako-ui.text.bg3-brown",
          // "bg3-blue": "pf2e-dorako-ui.text.bg3-blue",
          "dnd5e2-light": "pf2e-dorako-ui.text.dnd5e2-light",
          "dnd5e2-dark": "pf2e-dorako-ui.text.dnd5e2-dark",
          // "discord-light": `pf2e-dorako-ui.text.discord-light`,
          // "discord-dark": "pf2e-dorako-ui.text.discord-dark",
          // "custom-light": "pf2e-dorako-ui.text.custom-light",
          // "custom-dark": "pf2e-dorako-ui.text.custom-dark",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "chat-message-opposition-theme": {
        name: "pf2e-dorako-ui.settings.theme.chat-message-opposition-theme.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-message-opposition-theme.hint",
        scope: "user",
        config: true,
        default: "no-theme",
        type: String,
        choices: {
          "no-theme": "pf2e-dorako-ui.text.no-theme",
          // "crb-light": "pf2e-dorako-ui.text.crb-light",
          // "crb-dark": "pf2e-dorako-ui.text.crb-dark",
          // foundry2: "pf2e-dorako-ui.text.foundry2",
          // "bg3-brown": "pf2e-dorako-ui.text.bg3-brown",
          // "bg3-blue": "pf2e-dorako-ui.text.bg3-blue",
          "dnd5e2-light": "pf2e-dorako-ui.text.dnd5e2-light",
          "dnd5e2-dark": "pf2e-dorako-ui.text.dnd5e2-dark",
          // "discord-light": `pf2e-dorako-ui.text.discord-light`,
          // "discord-dark": "pf2e-dorako-ui.text.discord-dark",
          // "custom-light": "pf2e-dorako-ui.text.custom-light",
          // "custom-dark": "pf2e-dorako-ui.text.custom-dark",
        },
        requiresReload: true, // re-render all windows
        onChange: (choice) => {},
      },
      "chat-message-header-style": {
        name: "pf2e-dorako-ui.settings.theme.chat-message-header-style.name",
        hint: "pf2e-dorako-ui.settings.theme.chat-message-header-style.hint",
        scope: "user",
        config: true,
        default: "tint",
        type: String,
        choices: {
          tint: "pf2e-dorako-ui.text.colors.player",
          red: "pf2e-dorako-ui.text.colors.red",
          green: "pf2e-dorako-ui.text.colors.green",
          blue: "pf2e-dorako-ui.text.colors.blue",
          // none: "pf2e-dorako-ui.text.disabled",
        },
        requiresReload: false,
        onChange: refreshChat,
      },
      // "border-radius": {
      //   name: "pf2e-dorako-ui.settings.theme.border-radius.name",
      //   hint: "pf2e-dorako-ui.settings.theme.border-radius.hint",
      //   scope: "client",
      //   type: Number,
      //   default: 3,
      //   range: {
      //     min: 0,
      //     max: 48,
      //     step: 1,
      //   },
      //   config: true,
      //   requiresReload: false,
      //   onChange: (value) => {
      //     const root = document.querySelector(":root").style;
      //     root.setProperty("--border-radius", `${value}px`);
      //   },
      // },
    };
  }
}
