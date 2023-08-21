import { SettingsMenuDorakoUI } from "./menu.js";

export class UXSettings extends SettingsMenuDorakoUI {
  static namespace = "ux";

  static SETTINGS = [
    "restructure-card-info",
    "no-cards",
    "no-chat-control-icon",
    "no-logo",
    "chat-merge",
    "adjust-chat-controls",
    "compact-ui",
    "remove-attack-info-from-damage-roll-messages",
    "enable-rolltype-indication",
    "enable-player-tags",
    "center-hotbar",
    "start-sidebar-collapsed",
    "start-navigation-collapsed",
    "adjust-token-effects-hud",
    "animate-messages",
    "no-compendium-banner-images",
  ];

  rerenderChatMessages() {}

  static get settings() {
    return {
      "chat-merge": {
        name: "pf2e-dorako-ui.settings.ux.chat-merge.name",
        hint: "pf2e-dorako-ui.settings.ux.chat-merge.hint",
        scope: "client",
        type: Boolean,
        default: false,
        config: true,
        requiresReload: true,
        onChange: (value) => {},
      },
      "adjust-chat-controls": {
        name: "pf2e-dorako-ui.settings.ux.adjust-chat-controls.name",
        hint: "pf2e-dorako-ui.settings.ux.adjust-chat-controls.hint",
        scope: "client",
        type: Boolean,
        default: true,
        config: true,
        requiresReload: true,
        onChange: (value) => {},
      },
      "center-hotbar": {
        name: "pf2e-dorako-ui.settings.ux.center-hotbar.name",
        hint: "pf2e-dorako-ui.settings.ux.center-hotbar.hint",
        scope: "client",
        type: Boolean,
        default: false,
        config: true,
        requiresReload: false,
        onChange: (value) => {
          if (value) {
            document.getElementById("ui-bottom").classList.add("centered");
          } else {
            document.getElementById("ui-bottom").classList.remove("centered");
          }
        },
      },
      "adjust-token-effects-hud": {
        name: "pf2e-dorako-ui.settings.ux.adjust-token-effects-hud.name",
        hint: "pf2e-dorako-ui.settings.ux.adjust-token-effects-hud.hint",
        scope: "world",
        type: Boolean,
        default: true,
        config: true,
        requiresReload: true,
      },
      "restructure-card-info": {
        name: "pf2e-dorako-ui.settings.ux.restructure-card-info.name",
        hint: "pf2e-dorako-ui.settings.ux.restructure-card-info.hint",
        scope: "world",
        type: Boolean,
        default: true,
        config: true,
        requiresReload: false,
        onChange: () => {
          const messages = game.messages.filter((m) => m instanceof ChatMessage);
          for (const message of messages) {
            ui.chat.updateMessage(message);
          }
        },
      },
      "remove-attack-info-from-damage-roll-messages": {
        name: "pf2e-dorako-ui.settings.ux.remove-attack-info-from-damage-roll-messages.name",
        hint: "pf2e-dorako-ui.settings.ux.remove-attack-info-from-damage-roll-messages.hint",
        scope: "world",
        type: Boolean,
        default: true,
        config: true,
        requiresReload: false,
        onChange: () => {
          const messages = game.messages.filter((m) => m instanceof ChatMessage);
          for (const message of messages) {
            ui.chat.updateMessage(message);
          }
        },
      },
      "animate-messages": {
        name: "pf2e-dorako-ui.settings.ux.animate-messages.name",
        hint: "pf2e-dorako-ui.settings.ux.animate-messages.hint",
        scope: "world",
        type: Boolean,
        default: false,
        config: true,
        requiresReload: false,
        onChange: () => {
          const messages = game.messages.filter((m) => m instanceof ChatMessage);
          for (const message of messages) {
            ui.chat.updateMessage(message);
          }
        },
      },
      "compact-ui": {
        name: "pf2e-dorako-ui.settings.ux.compact-ui.name",
        hint: "pf2e-dorako-ui.settings.ux.compact-ui.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        requiresReload: false,
        onChange: (value) => {
          if (value) {
            $("body").addClass("dorako-ui compact-ui");
          } else {
            $("body").removeClass("dorako-ui compact-ui");
          }
        },
      },
      "start-sidebar-collapsed": {
        name: "pf2e-dorako-ui.settings.ux.start-sidebar-collapsed.name",
        hint: "pf2e-dorako-ui.settings.ux.start-sidebar-collapsed.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        requiresReload: false,
      },
      "start-navigation-collapsed": {
        name: "pf2e-dorako-ui.settings.ux.start-navigation-collapsed.name",
        hint: "pf2e-dorako-ui.settings.ux.start-navigation-collapsed.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        requiresReload: false,
      },
      "no-compendium-banner-images": {
        name: "pf2e-dorako-ui.settings.ux.no-compendium-banner-images.name",
        hint: "pf2e-dorako-ui.settings.ux.no-compendium-banner-images.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        requiresReload: false,
        onChange: (value) => {
          $("#sidebar").toggleClass("no-compendium-banner-images");
        },
      },
      "no-logo": {
        name: "pf2e-dorako-ui.settings.ux.no-logo.name",
        hint: "pf2e-dorako-ui.settings.ux.no-logo.hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        requiresReload: false,
        onChange: (value) => {
          if (value) {
            $("#logo")[0].style.setProperty("display", "none", "important");
          } else {
            $("#logo")[0].style.setProperty("display", "unset");
          }
        },
      },
      "no-chat-control-icon": {
        name: "pf2e-dorako-ui.settings.ux.no-chat-control-icon.name",
        hint: "pf2e-dorako-ui.settings.ux.no-chat-control-icon.hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        requiresReload: false,
        onChange: (value) => {
          if (value) {
            $("#chat-controls")[0].classList.add("no-chat-control-icon");
          } else {
            $("#chat-controls")[0].classList.remove("no-chat-control-icon");
          }
        },
      },
      "no-cards": {
        name: "pf2e-dorako-ui.settings.ux.no-cards.name",
        hint: "pf2e-dorako-ui.settings.ux.no-cards.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        requiresReload: false,
        onChange: (value) => {
          if (value) {
            $(".item[data-tab=cards]").addClass("dorako-display-none");
          } else {
            $(".item[data-tab=cards]").removeClass("dorako-display-none");
          }
        },
      },
      "enable-player-tags": {
        name: "pf2e-dorako-ui.settings.ux.enable-player-tags.name",
        hint: "pf2e-dorako-ui.settings.ux.enable-player-tags.hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        requiresReload: false,
        onChange: () => {
          const messages = game.messages.filter((m) => m instanceof ChatMessage);
          for (const message of messages) {
            ui.chat.updateMessage(message);
          }
        },
      },
      "enable-rolltype-indication": {
        name: "pf2e-dorako-ui.settings.ux.enable-rolltype-indication.name",
        hint: "pf2e-dorako-ui.settings.ux.enable-rolltype-indication.hint",
        scope: "client",
        type: Boolean,
        default: true,
        config: true,
        requiresReload: false,
        onChange: () => {
          const messages = game.messages.filter((m) => m instanceof ChatMessage);
          for (const message of messages) {
            ui.chat.updateMessage(message);
          }
        },
      },
    };
  }
}
