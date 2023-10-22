import { SettingsMenuDorakoUI } from "./menu.js";

export class MiscSettings extends SettingsMenuDorakoUI {
  static namespace = "misc";

  static SETTINGS = ["enable-debug-mode", "send-to-chat", "skin-crb-journal"];

  static get settings() {
    return {
      "enable-debug-mode": {
        name: "pf2e-dorako-ui.settings.misc.enable-debug-mode.name",
        hint: "pf2e-dorako-ui.settings.misc.enable-debug-mode.hint",
        scope: "client",
        type: Boolean,
        default: false,
        config: true,
        requiresReload: false,
      },
      "send-to-chat": {
        name: "pf2e-dorako-ui.settings.misc.send-to-chat.name",
        hint: "pf2e-dorako-ui.settings.misc.send-to-chat.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        requiresReload: false,
      },
      "skin-crb-journal": {
        name: "pf2e-dorako-ui.settings.misc.skin-crb-journal.name",
        hint: "pf2e-dorako-ui.settings.misc.skin-crb-journal.hint",
        scope: "world",
        type: Boolean,
        default: false,
        config: true,
        requiresReload: false,
      },
    };
  }
}
