import * as util from "../util.js";
import { ThemeSettings } from "./theme-settings.js";
import { MiscSettings } from "./misc-settings.js";
import { CustomizationSettings } from "./customization-settings.js";
import { ExternalModuleSettings } from "./external-module-settings.js";
import { getAppThemeAndScheme, getUiTheme } from "../ui-theme.js";

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
  util.debug("init");

  game.settings.register("pf2e-dorako-ui", "mld-nag", {
    scope: "world",
    config: false,
    default: true,
    type: Boolean,
  });

  // game.settings.register("pf2e-dorako-ui", "tah-nag", {
  //   scope: "client",
  //   config: false,
  //   default: true,
  //   type: Boolean,
  // });

  game.settings.register("pf2e-dorako-ui", "migration-version", {
    scope: "world",
    config: false,
    default: "0.0.0",
    type: String,
  });

  ThemeSettings.registerSettings();
  MiscSettings.registerSettings();
  CustomizationSettings.registerSettings();
  ExternalModuleSettings.registerSettings();

  util.debug("registered settings");

  const applicationTheme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
  if (applicationTheme !== "no-theme") {
    const uiTheme = getAppThemeAndScheme();
    const { dorakoUiTheme, colorScheme } = uiTheme;

    if (uiTheme) {
      $("#tooltip").attr("data-dorako-ui-theme", dorakoUiTheme);
      $("#fps").attr("data-dorako-ui-theme", dorakoUiTheme);
    }
  }

  const chatMessageTheme = game.settings.get("pf2e-dorako-ui", "theme.chat-message-theme");
  const chatMessageHeaderStyle = game.settings.get("pf2e-dorako-ui", "theme.chat-message-header-style");
  if (chatMessageTheme === "bg3" && chatMessageHeaderStyle !== "none") {
    game.settings.set("pf2e-dorako-ui", "theme.chat-message-header-style", "none");
  }

  const root = document.querySelector(":root").style;

  root.setProperty("--border-radius", game.settings.get("pf2e-dorako-ui", "theme.border-radius").toString() + "px");
  // root.setProperty("--glass-bg", game.settings.get("pf2e-dorako-ui", "theme.glass-bg").toString(), "important");

  util.debug("initialized properties");
});

Hooks.once("ready", () => {
  let dorakoCustomCss = document.createElement("style");
  dorakoCustomCss.id = "dorako-custom-css";
  dorakoCustomCss.innerHTML = game.settings.get("pf2e-dorako-ui", "customization.custom-css");
  document.querySelector("head").appendChild(dorakoCustomCss);
});
