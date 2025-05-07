import { SettingsMenuDorakoUI } from "./menu.js";

export class CustomizationSettings extends SettingsMenuDorakoUI {
  static namespace = "customization";

  static SETTINGS = ["excluded-applications", "custom-css", "chatlog-notify-seconds"];

  static get settings() {
    return {
      "excluded-applications": {
        name: "pf2e-dorako-ui.settings.customization.excluded-applications.name",
        hint: "pf2e-dorako-ui.settings.customization.excluded-applications.hint",
        scope: "world",
        config: true,
        default: "",
        type: String,
        requiresReload: false,
        onChange: () => {
          return ui.notifications.warn(game.i18n.localize("pf2e-dorako-ui.text.maybe-reload"));
        },
      },
      "custom-css": {
        name: "pf2e-dorako-ui.settings.customization.custom-css.name",
        hint: "pf2e-dorako-ui.settings.customization.custom-css.hint",
        scope: "user",
        config: true,
        default: "",
        type: String,
        requiresReload: false,
        onChange: (newCss) => {
          let elem = document.querySelector("#dorako-custom-css");
          elem.innerHTML = newCss;
        },
      },
      "chatlog-notify-seconds": {
        name: "pf2e-dorako-ui.settings.customization.chatlog-notify-seconds.name",
        hint: "pf2e-dorako-ui.settings.customization.chatlog-notify-seconds.hint",
        scope: "user",
        config: 5,
        type: Number,
        default: 5,
        range: {
          min: 0,
          max: 120,
          step: 1,
        },
        requiresReload: false,
        onChange: (value) => {
          ChatLog.NOTIFY_DURATION = value * 1000;
        },
      },
    };
  }
}
