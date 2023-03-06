import { SettingsMenuDorakoUI } from "./menu.js";

export class CustomizationSettings extends SettingsMenuDorakoUI {
  static namespace = "customization";

  static SETTINGS = ["excluded-applications", "custom-css"];

  static get settings() {
    return {
      "excluded-applications": {
        name: "pf2e-dorako-ui.settings.customization.excluded-applications.name",
        hint: "pf2e-dorako-ui.settings.customization.excluded-applications.hint",
        scope: "client",
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
        scope: "client",
        config: true,
        default: "",
        type: String,
        requiresReload: false,
        onChange: (newCss) => {
          let elem = document.querySelector("#dorako-custom-css");
          elem.innerHTML = newCss;
        },
      },
    };
  }
}
