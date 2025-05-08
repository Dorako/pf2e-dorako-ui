import * as util from "../util.js";
import { ThemeSettings } from "./theme-settings.js";
// import { MiscSettings } from "./misc-settings.js";
import { CustomizationSettings } from "./customization-settings.js";
import { ExternalModuleSettings } from "./external-module-settings.js";
import { AvatarSettings } from "./avatar-settings.js";
import { lookupThemeAndSchemeForKey } from "../ui-theme.js";
import { MODULE_NAME } from "../consts.js";
import ChatMerge from "../chat-merge.js";

export function refreshChat() {
  if (game.messages.size > 100) {
    return ui.notifications.warn(game.i18n.localize("pf2e-dorako-ui.text.large-chatlog-warning"));
  }
  const messages = game.messages.filter((m) => m instanceof ChatMessage);
  for (const message of messages) {
    ui.chat.updateMessage(message);
  }
}

Hooks.once("init", async () => {
  util.debug("Init...");

  game.settings.register("pf2e-dorako-ui", "mld-nag", {
    scope: "world",
    config: false,
    default: true,
    type: Boolean,
  });

  ThemeSettings.registerSettings();
  AvatarSettings.registerSettings();
  CustomizationSettings.registerSettings();
  ExternalModuleSettings.registerSettings();

  util.debug("Registered settings...");

  if (game.settings.get("pf2e-dorako-ui", "customization.chat-merge")) {
    ChatMerge.init();
  }

  const applicationTheme = game.settings.get("pf2e-dorako-ui", "theme.interface-theme");
  if (applicationTheme !== "no-theme") {
    const uiTheme = lookupThemeAndSchemeForKey(applicationTheme);
    const { dorakoUiTheme, colorScheme } = uiTheme;

    // if (uiTheme) {
    //   $("#tooltip").attr("data-interface-theme", dorakoUiTheme);
    //   $("#fps").attr("data-interface-theme", dorakoUiTheme);
    // }
  }

  const root = document.querySelector(":root").style;

  // root.setProperty("--border-radius", game.settings.get("pf2e-dorako-ui", "theme.border-radius").toString() + "px");

  util.debug("initialized properties...");

  util.debug("Migrating invalid settings to default...");
  const allSettings = [...game.settings.settings].filter(([k, _]) => k.startsWith(MODULE_NAME));
  for (const [_, setting] of allSettings) {
    const key = setting.key;
    const currentValue = game.settings.get(MODULE_NAME, key);
    const choices = setting.choices;
    if (choices) {
      if (!(currentValue in choices)) {
        const defaultValue = setting.default;
        await game.settings.set(MODULE_NAME, key, defaultValue);
        console.warn(`Set ${key} to '${defaultValue}' since '${currentValue}' is invalid`);
      }
    }
  }
});

Hooks.once("ready", () => {
  let dorakoCustomCss = document.createElement("style");
  dorakoCustomCss.id = "dorako-custom-css";
  dorakoCustomCss.innerHTML = game.settings.get("pf2e-dorako-ui", "customization.custom-css");
  document.querySelector("head").appendChild(dorakoCustomCss);
});
