import * as util from './util.js'

function injectCSS(filename) {
    const head = document.getElementsByTagName("head")[0];
    const mainCss = document.createElement("link");
    mainCss.setAttribute("rel", "stylesheet");
    mainCss.setAttribute("type", "text/css");
    mainCss.setAttribute("href", "modules/pf2e-dorako-ui/styles/" + filename + ".css");
    mainCss.setAttribute("media", "all");
    head.insertBefore(mainCss, head.lastChild);
}

Hooks.once("init", async () => {
    game.settings.register("pf2e-dorako-ui", "pc-sheet-theme", {
      name: util.i18n("dorako-ui.settings.pc-sheet-theme.name"),
      hint: util.i18n("dorako-ui.settings.pc-sheet-theme.hint"),
      scope: "client",
      config: true,
      default: "red",
      type: String,
      choices: {
        red: util.i18n("dorako-ui.settings.pc-sheet-theme.choice.red"),
        dark: util.i18n("dorako-ui.text.dark"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "npc-sheet-theme", {
      name: util.i18n("dorako-ui.settings.npc-sheet-theme.name"),
      hint: util.i18n("dorako-ui.settings.npc-sheet-theme.hint"),
      scope: "client",
      config: true,
      default: "light-theme",
      type: String,
      choices: {
        default: util.i18n("dorako-ui.text.default"),
        "light-theme": util.i18n("dorako-ui.text.light"),
        "dark-theme": util.i18n("dorako-ui.text.dark"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "loot-sheet-theme", {
      name: util.i18n("dorako-ui.settings.loot-sheet-theme.name"),
      hint: util.i18n("dorako-ui.settings.loot-sheet-theme.hint"),
      scope: "client",
      config: true,
      default: "light-theme",
      type: String,
      choices: {
        default: util.i18n("dorako-ui.text.default"),
        "light-theme": util.i18n("dorako-ui.text.light"),
        // "dark-theme": util.i18n("dorako-ui.text.dark"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "app-sheet-theme", {
      name: util.i18n("dorako-ui.settings.app-sheet-theme.name"),
      hint: util.i18n("dorako-ui.settings.app-sheet-theme.hint"),
      scope: "client",
      config: true,
      default: "default",
      type: String,
      choices: {
        default: util.i18n("dorako-ui.text.default"),
        // "light-theme": util.i18n("dorako-ui.text.light"),
        "dark-theme": util.i18n("dorako-ui.text.dark"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "dialog-sheet-theme", {
      name: util.i18n("dorako-ui.settings.dialog-sheet-theme.name"),
      hint: util.i18n("dorako-ui.settings.dialog-sheet-theme.hint"),
      scope: "client",
      config: true,
      default: "default",
      type: String,
      choices: {
        default: util.i18n("dorako-ui.text.default"),
        // "light-theme": util.i18n("dorako-ui.text.light"),
        "dark-theme": util.i18n("dorako-ui.text.dark"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "familiar-sheet-theme", {
      name: util.i18n("dorako-ui.settings.familiar-sheet-theme.name"),
      hint: util.i18n("dorako-ui.settings.familiar-sheet-theme.hint"),
      scope: "client",
      config: true,
      default: "red",
      type: String,
      choices: {
        red: util.i18n("dorako-ui.settings.familiar-sheet-theme.choice.red"),
        dark: util.i18n("dorako-ui.text.dark"),
        darkRedHeader: util.i18n("dorako-ui.settings.familiar-sheet-theme.choice.dark-red-header"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "chat-theme", {
      name: util.i18n("dorako-ui.settings.chat-theme.name"),
      hint: util.i18n("dorako-ui.settings.chat-theme.hint"),
      scope: "client",
      config: true,
      default: "Light",
      type: String,
      choices: {
        light: util.i18n("dorako-ui.text.light"),
        dark: util.i18n("dorako-ui.text.dark"),
        factions: util.i18n("dorako-ui.settings.chat-theme.choice.factions"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "header-style", {
      name: util.i18n("dorako-ui.settings.header-style.name"),
      hint: util.i18n("dorako-ui.settings.header-style.hint"),
      scope: "client",
      config: true,
      default: "none",
      type: String,
      choices: {
        red: util.i18n("dorako-ui.settings.header-style.choice.red"),
        blue: util.i18n("dorako-ui.settings.header-style.choice.blue"),
        tint: util.i18n("dorako-ui.settings.header-style.choice.tint"),
        none: util.i18n("dorako-ui.settings.header-style.choice.none"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "use-avatars", {
      name: util.i18n("dorako-ui.settings.use-avatars.name"),
      hint: util.i18n("dorako-ui.settings.use-avatars.hint"),
      scope: "client",
      config: true,
      default: "token",
      type: String,
      choices: {
        token: util.i18n("dorako-ui.settings.use-avatars.choice.token"),
        actor: util.i18n("dorako-ui.settings.use-avatars.choice.actor"),
        none: util.i18n("dorako-ui.settings.use-avatars.choice.none"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "hide-gm-avatar-when-secret", {
      name: util.i18n("dorako-ui.settings.hide-gm-avatar-when-secret.name"),
      hint: util.i18n("dorako-ui.settings.hide-gm-avatar-when-secret.hint"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "hide-avatar-when-hidden", {
      name: util.i18n("dorako-ui.settings.hide-avatar-when-hidden.name"),
      hint: util.i18n("dorako-ui.settings.hide-avatar-when-hidden.hint"),
      scope: "world",
      type: Boolean,
      default: true,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "avatar-size", {
      name: util.i18n("dorako-ui.settings.avatar-size.name"),
      hint: util.i18n("dorako-ui.settings.avatar-size.hint"),
      scope: "client",
      type: Number,
      default: 40,
      range: {
        min: 10,
        max: 60,
        step: 1,
      },
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "popout-token-avatars", {
      name: util.i18n("dorako-ui.settings.popout-token-avatars.name"),
      hint: util.i18n("dorako-ui.settings.popout-token-avatars.hint"),
      scope: "world",
      type: Boolean,
      default: true,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "avatar-reacts-to-degree-of-success", {
      name: util.i18n("dorako-ui.settings.avatar-reacts-to-degree-of-success.name"),
      hint: util.i18n("dorako-ui.settings.avatar-reacts-to-degree-of-success.hint"),
      scope: "client",
      type: Boolean,
      default: true,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "small-creature-token-avatar-size", {
      name: util.i18n("dorako-ui.settings.small-creature-token-avatar-size.name"),
      hint: util.i18n("dorako-ui.settings.small-creature-token-avatar-size.hint"),
      scope: "world",
      type: Number,
      default: 0.8,
      range: {
        min: 0.7,
        max: 1.0,
        step: 0.1,
      },
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "use-user-avatar", {
      name: util.i18n("dorako-ui.settings.use-user-avatar.name"),
      hint: util.i18n("dorako-ui.settings.use-user-avatar.hint"),
      scope: "world",
      type: Boolean,
      default: false,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "chat-input-height", {
      name: util.i18n("dorako-ui.settings.chat-input-height.name"),
      hint: game.modules.get("CautiousGamemastersPack")?.active
        ? util.i18n("dorako-ui.settings.chat-input-height.CGMPhint")
        : util.i18n("dorako-ui.settings.chat-input-height.hint"),
      scope: "client",
      type: Number,
      default: 90,
      range: {
        min: 20,
        max: 300,
        step: 5,
      },
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "enable-player-tags", {
      name: util.i18n("dorako-ui.settings.enable-player-tags.name"),
      hint: util.i18n("dorako-ui.settings.enable-player-tags.hint"),
      scope: "client",
      config: true,
      default: true,
      type: Boolean,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "rolltype-indication", {
      name: util.i18n("dorako-ui.settings.rolltype-indication.name"),
      hint: util.i18n("dorako-ui.settings.rolltype-indication.hint"),
      scope: "client",
      type: String,
      default: "both",
      config: true,
      choices: {
        tags: util.i18n("dorako-ui.settings.rolltype-indication.choice.tags"),
        "bg-color": util.i18n("dorako-ui.settings.rolltype-indication.choice.bg-color"),
        both: util.i18n("dorako-ui.settings.rolltype-indication.choice.both"),
        none: util.i18n("dorako-ui.settings.rolltype-indication.choice.none"),
      },
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "center-hotbar", {
      name: util.i18n("dorako-ui.settings.center-hotbar.name"),
      hint: util.i18n("dorako-ui.settings.center-hotbar.hint"),
      scope: "client",
      type: Boolean,
      default: false,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "send-to-chat", {
      name: util.i18n("dorako-ui.settings.send-to-chat.name"),
      hint: util.i18n("dorako-ui.settings.send-to-chat.hint"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "restructure-card-info", {
      name: util.i18n("dorako-ui.settings.restructure-card-info.name"),
      hint: util.i18n("dorako-ui.settings.restructure-card-info.hint"),
      scope: "world",
      type: Boolean,
      default: true,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "remove-attack-info-from-damage-roll-messages", {
      name: util.i18n("dorako-ui.settings.remove-attack-info-from-damage-roll-messages.name"),
      hint: util.i18n("dorako-ui.settings.remove-attack-info-from-damage-roll-messages.hint"),
      scope: "world",
      type: Boolean,
      default: true,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "compact-ui", {
      name: util.i18n("dorako-ui.settings.compact-ui.name"),
      hint: util.i18n("dorako-ui.settings.compact-ui.hint"),
      scope: "client",
      config: true,
      default: false,
      type: Boolean,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "no-logo", {
      name: util.i18n("dorako-ui.settings.no-logo.name"),
      hint: util.i18n("dorako-ui.settings.no-logo.hint"),
      scope: "client",
      config: true,
      default: true,
      type: Boolean,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "no-chat-control-icon", {
      name: util.i18n("dorako-ui.settings.no-chat-control-icon.name"),
      hint: util.i18n("dorako-ui.settings.no-chat-control-icon.hint"),
      scope: "client",
      config: true,
      default: true,
      type: Boolean,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "skin-combat-carousel", {
      name: util.i18n("dorako-ui.settings.skin-combat-carousel.name"),
      scope: "world",
      type: Boolean,
      default: true,
      config: true,
      requiresReload: true
    });
  
    game.settings.register("pf2e-dorako-ui", "skin-crb-journal", {
      name: util.i18n("dorako-ui.settings.skin-crb-journal.name"),
      hint: util.i18n("dorako-ui.settings.skin-crb-journal.hint"),
      scope: "world",
      type: Boolean,
      default: false,
      config: true,
      requiresReload: true
    });
  
    injectCSS("dorako-ui");
    injectCSS("reset");
    injectCSS("main");
    injectCSS("dark-theme");
    injectCSS("dark-theme-messages");
    injectCSS("module-support");
    injectCSS("messages");
    injectCSS("npc-sheet");
    injectCSS("loot-sheet");
  
    const root = document.querySelector(":root").style;
    if (game.settings.get("pf2e-dorako-ui", "center-hotbar")) {
      document.getElementById("ui-bottom").classList.add("centered");
    }
  
    root.setProperty("--avatar-size", game.settings.get("pf2e-dorako-ui", "avatar-size").toString() + "px");
    root.setProperty("--chat-input-height", game.settings.get("pf2e-dorako-ui", "chat-input-height").toString() + "px");
  
    if (game.settings.get("pf2e-dorako-ui", "skin-crb-journal")) {
      injectCSS("crb-journal");
      injectCSS("fonts");
    }
  
    if (game.settings.get("pf2e-dorako-ui", "skin-combat-carousel")) injectCSS("combat-carousel");
    if (game.settings.get("pf2e-dorako-ui", "compact-ui")) injectCSS("compact-ui");
    if (game.settings.get("pf2e-dorako-ui", "no-logo")) injectCSS("no-logo");
    if (game.settings.get("pf2e-dorako-ui", "no-chat-control-icon")) injectCSS("no-chat-control-icon");
    const pcSheetSetting = game.settings.get("pf2e-dorako-ui", "pc-sheet-theme");
    if (pcSheetSetting == "dark") injectCSS("pc-sheet-dark");
    const familiarSheetSetting = game.settings.get("pf2e-dorako-ui", "familiar-sheet-theme");
    if (familiarSheetSetting == "dark" || setting == "darkRedHeader") injectCSS("familiar-sheet-dark");
    if (familiarSheetSetting == "darkRedHeader") injectCSS("familiar-sheet-dark-red-header");
  });