import {
  limitedScopeApplications,
  MODULE_NAME,
  themedApps,
  systemSheets,
  excludedApplications,
  moduleWindowApps,
  appV2Apps,
} from "./consts.js";
import { isPremiumApplication } from "./premium-module-hooks.js";
import { getPlayerOwners } from "./util.js";

export function lookupThemeAndSchemeForKey(key) {
  switch (key) {
    case "opaque":
      return { dorakoUiTheme: "opaque", colorScheme: null };
    case "crb":
      return { dorakoUiTheme: "crb", colorScheme: null };
    case "crb-light":
      return { dorakoUiTheme: "crb", colorScheme: "light" };
    case "crb-dark":
      return { dorakoUiTheme: "crb", colorScheme: "dark" };
    case "foundry2":
      return { dorakoUiTheme: "foundry2", colorScheme: "dark" };
    case "bg3":
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    case "bg3-brown":
      return { dorakoUiTheme: "bg3-brown", colorScheme: "dark" };
    case "bg3-blue":
      return { dorakoUiTheme: "bg3-blue", colorScheme: "dark" };
    case "dnd5e2-light":
      return { dorakoUiTheme: "dnd5e2", colorScheme: "light" };
    case "dnd5e2-dark":
      return { dorakoUiTheme: "dnd5e2", colorScheme: "dark" };
    case "discord":
      return { dorakoUiTheme: "discord", colorScheme: "dark" };
    case "discord-light":
      return { dorakoUiTheme: "discord-light", colorScheme: "light" };
    case "discord-dark":
      return { dorakoUiTheme: "discord-dark", colorScheme: "dark" };
    case "custom-light":
      return { dorakoUiTheme: "custom-light", colorScheme: "light" };
    case "custom-dark":
      return { dorakoUiTheme: "custom-dark", colorScheme: "dark" };
    default:
      return { dorakoUiTheme: "", colorScheme: "" };
  }
}

Hooks.on("renderSvelteApplication", (app, html, data) => {
  const theme = themedApps.includes(app.constructor.name)
    ? game.settings.get("pf2e-dorako-ui", "theme.app-theme")
    : game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  if (theme === "no-theme") return;
  const uiTheme = lookupThemeAndSchemeForKey(theme);
  if (uiTheme === null) return;
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (
    excludeList.includes(app.constructor.name) ||
    excludedApplications.includes(app.constructor.name) ||
    appV2Apps.includes(app.constructor.name)
  ) {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications`);
    return;
  }
  const { dorakoUiTheme, colorScheme } = uiTheme;
  const elem = app.element instanceof jQuery ? app.element[0] : app.element;
  elem.dataset.theme = dorakoUiTheme;
  if (colorScheme != null) elem.dataset.colorScheme = colorScheme;
  elem.dataset.dorakoUiScope = "unlimited";
});

// Interface theme
for (const appName of [...themedApps]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
    if (theme === "no-theme") return;
    const uiTheme = lookupThemeAndSchemeForKey(theme);
    if (uiTheme === null) return;
    const { dorakoUiTheme, colorScheme } = uiTheme;
    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name) || excludedApplications.includes(app.constructor.name)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
      );
      return;
    }
    const elem = app.element instanceof jQuery ? app.element[0] : app.element;
    elem.dataset.theme = dorakoUiTheme;
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | [data-theme='${dorakoUiTheme}']`);
  });
}

// Interface theme (App V2)
for (const appName of [...appV2Apps]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
    if (theme === "no-theme") return;
    const uiTheme = lookupThemeAndSchemeForKey(theme);
    if (uiTheme === null) return;
    const { dorakoUiTheme, colorScheme } = uiTheme;
    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    const excludeList = excludeString.split(/[\s,]+/);
    if (![""].equals(excludeList)) {
      for (const excludeElem of excludeList) {
        const excludeElemAsRegex = new RegExp(excludeElem);
        if (excludeElemAsRegex.test(app.constructor.name)) {
          console.debug(
            `${MODULE_NAME} | render${app.constructor.name} | matches regex in exclude string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
          );
          return;
        }
      }
      if (excludeList.includes(app.constructor.name) || excludedApplications.includes(app.constructor.name)) {
        console.debug(
          `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
        );
        return;
      }
    }

    app.element.dataset.theme = dorakoUiTheme;
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | [data-theme='${dorakoUiTheme}']`);

    // PF2eHudPersistent subelements
    if (appName === "PF2eHudPersistent") {
      const potentialSubElements = ["leftElement", "mainElement", "menuElement", "portraitElement", "effectsElement"];
      for (const subElementKey of potentialSubElements) {
        if (subElementKey in app && app[subElementKey] != null) {
          app[subElementKey].dataset.theme = dorakoUiTheme;
          console.debug(
            `${MODULE_NAME} | render${app.constructor.name + "." + subElementKey} | [data-theme='${dorakoUiTheme}']`
          );
        }
      }
    }
  });
}

// Sheet theme
for (const appName of [...systemSheets, ...moduleWindowApps]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
    if (theme === "no-theme") return;
    const uiTheme = lookupThemeAndSchemeForKey(theme);
    if (uiTheme === null) return;
    const { dorakoUiTheme, colorScheme } = uiTheme;
    if (
      game.modules.get("sf2e-playtest-deluxe-adventure-pack")?.active &&
      app.constructor.name === "CharacterSheetPF2e"
    ) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | sf2e-playtest-deluxe-adventure-pack is active => do not set dorako-ui-theme to ${dorakoUiTheme}`
      );
      return;
    }

    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name) || excludedApplications.includes(app.constructor.name)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
      );
      return;
    }
    if (
      theme == "crb-light" &&
      (app.constructor.name === "PartySheetPF2e" || app.constructor.name === "FamiliarSheetPF2e")
    )
      return;
    if (theme == "discord-light" && app.constructor.name === "PartySheetPF2e") return;

    app.element[0].dataset.theme = dorakoUiTheme;
    app.element[0].dataset.colorScheme = colorScheme;
    app.element[0].dataset.dorakoUiScope = "unlimited";
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | [data-theme='${dorakoUiTheme}'] [data-color-scheme='${colorScheme}'] [data-dorako-ui-scope='unlimited']`
    );
  });
}

Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (html0.classList.contains("editable")) return;
  if (!html0.classList.contains("window-app")) return;
  if (isPremiumApplication(app, html, data, app.constructor.name)) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  if (theme === "no-theme") return;
  const uiTheme = lookupThemeAndSchemeForKey(theme);
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  const excludeString =
    game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") +
    ", EnhancedJournal" +
    ", SceneActorsLayer" +
    ", SmallTimeApp" +
    ", SceneDarknessAdjuster" +
    ", AutorecMenuApp" +
    ", ImagePopout";
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes(app.constructor.name) || excludedApplications.includes(app.constructor.name)) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
    );
    return;
  }

  const fakeDialogPatterns = ["popup", "dialog"];
  for (const fakeDialogPattern of [...fakeDialogPatterns]) {
    if (app.constructor.name.toLowerCase().includes(fakeDialogPattern)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | constructor includes '${fakeDialogPattern}' => add .dialog`
      );
      html.addClass("dialog");
    }
  }
  app.element[0].dataset.theme = dorakoUiTheme;
  app.element[0].dataset.colorScheme = colorScheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
  if (limitedScopeApplications.includes(app.constructor.name)) {
    app.element[0].dataset.dorakoUiScope = "limited";
  }
  console.debug(
    `${MODULE_NAME} | render${app.constructor.name} | [data-theme='${dorakoUiTheme}'] [data-color-scheme='${colorScheme}'] [data-dorako-ui-scope='unlimited']`
  );

  const duiScope = app.data?.duiScope;
  if (duiScope) {
    app.element[0].dataset.dorakoUiScope = duiScope;
  }
  if (app.data?.duiClasses) {
    for (const duiClass of app.data?.duiClasses) {
      html.addClass(duiClass);
    }
  }
});

Hooks.on("renderApplicationV2", (app, html, data) => {
  if (html.classList.contains("editable")) return;
  if (!html.classList.contains("application")) return;
  // if (isPremiumApplication(app, html, data, app.constructor.name)) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  if (theme === "no-theme") return;
  const uiTheme = lookupThemeAndSchemeForKey(theme);
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  const excludeString =
    game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") +
    ", EnhancedJournal" +
    ", SceneActorsLayer" +
    ", SmallTimeApp" +
    ", SceneDarknessAdjuster" +
    ", AutorecMenuApp" +
    ", ImagePopout" +
    ", PF2eHudResources";
  const excludeList = excludeString.split(/[\s,]+/);
  if (
    excludeList.includes(app.constructor.name) ||
    excludedApplications.includes(app.constructor.name) ||
    appV2Apps.includes(app.constructor.name)
  ) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
    );
    return;
  }

  const fakeDialogPatterns = ["popup", "dialog"];
  for (const fakeDialogPattern of [...fakeDialogPatterns]) {
    if (app.constructor.name.toLowerCase().includes(fakeDialogPattern)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | constructor includes '${fakeDialogPattern}' => add .dialog`
      );
      // html.addClass("dialog");
    }
  }
  const elem = app.element instanceof jQuery ? app.element[0] : app.element;
  elem.dataset.theme = dorakoUiTheme;
  elem.dataset.colorScheme = colorScheme;
  // elem.dataset.dorakoUiScope = "unlimited";
  console.debug(
    `${MODULE_NAME} | render${app.constructor.name} | [data-theme='${dorakoUiTheme}'] [data-color-scheme='${colorScheme}'] [data-dorako-ui-scope='unlimited']`
  );
});

for (const appName of [...limitedScopeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
    if (theme === "no-theme") return;
    const uiTheme = lookupThemeAndSchemeForKey(theme);
    if (uiTheme === null) return;
    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set [data-ui-scope='limited']`
      );
      return;
    }
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | [data-ui-scope='limited']`);
    const elem = app.element instanceof jQuery ? app.element[0] : app.element;
    elem.dataset.dorakoUiScope = "limited";
  });
}

for (const appName of ["CharacterSheetPF2e", "VehicleSheetPF2e"]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.sheet-theme-color");
    if (theme === "default") return;
    app.element[0].dataset.themeColor = theme;

    if (theme !== "player-color") return;
    var black = Color.fromString("000000");
    var white = Color.fromString("ffffff");
    const owners = getPlayerOwners(app.actor);
    const user = owners[0];
    var userColor = user.getFlag("pf2e-dorako-ui", "player-sheet-color-override")
      ? Color.fromString(user.getFlag("pf2e-dorako-ui", "player-sheet-color-override"))
      : user.color;
    var hsl = userColor.hsl;
    var [h, s, l] = hsl;
    const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
      ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    function clamp(num, lower, upper) {
      return Math.min(Math.max(num, lower), upper);
    }
    const sSoftLimit = 0.5;
    const sHardLimit = 0.7;
    const lSoftLimit = 0.3;
    const lHardLimit = 0.8;
    var remappedColor = Color.fromHSL([
      h,
      s > sSoftLimit ? mapNumRange(s, 0, 1, sSoftLimit, sHardLimit) : s,
      l > lSoftLimit ? mapNumRange(l, 0, 1, lSoftLimit, lHardLimit) : l,
    ]);
    html[0].style.setProperty("--player-color", remappedColor.css ?? "#DAC0FB");
    // [h, s, l] = remappedColor.hsl;

    html[0].style.setProperty("--player-tone-light", userColor.mix(white, 0.9).css ?? "#DAC0FB");
    html[0].style.setProperty("--player-tone", Color.fromHSL([userColor.hsl[0], 1, userColor.hsl[2] / 2]) ?? "#DAC0FB");
    // html[0].style.setProperty(
    //   "--player-tone-plain",
    //   Color.fromHSL([h, s < 0.1 ? 0 : 1, clamp(game.user.color.hsl[2] + 0.3, 0, 1)]) ?? "#DAC0FB"
    // );
    html[0].style.setProperty(
      "--player-tone-plain",
      Color.fromHSL([h, s > 0.1 ? 0.35 : 0, l > 0.8 ? 1.0 : 0.8]) ?? "#DAC0FB"
    );
    html[0].style.setProperty("--player-tone-dark", userColor.mix(white, 0.4).css ?? "#DAC0FB");
    html[0].style.setProperty("--player-tone-darker", userColor.mix(white, 0.3).css ?? "#DAC0FB");
    html[0].style.setProperty("--player-tone-darkest", userColor.mix(white, 0.2).css ?? "#DAC0FB");
    html[0].style.setProperty("--text-color", userColor.mix(white, 0.9).css ?? "#DAC0FB");
  });
}

Hooks.on("render" + "ItemSheetPF2e", (app, html, data) => {
  const rarity = app?.object?.rarity;
  if (rarity) app.element[0].dataset.rarity = rarity;
});

Hooks.on("render" + "NPCSheetPF2e", (app, html, data) => {
  const rarity = app?.object?.rarity;
  if (rarity) app.element[0].dataset.rarity = rarity;
});

Hooks.on("render" + "ChatMessage", (app, html, data) => {
  const footer = html.find("footer")[0];
  if (footer) html[0].dataset.hasFooter = "";
});

for (const appName of ["ChatLogPF2e", "VCEChatLog"]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
    if (theme === "no-theme") return;
    app.element[0].dataset.chatInterfaceTheme = theme;
  });
}

Hooks.on("render" + "Sidebar", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
  if (theme === "no-theme") return;
  app.element[0].dataset.chatInterfaceTheme = theme;
});

Hooks.on("render" + "Sidebar", (app, html, data) => {
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes(app.constructor.name)) {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string`);
    return;
  }

  $("#sidebar-tabs").attr("data-theme", "");
  app.element[0].dataset.dorakoUiScope = "sidebar";
});

Hooks.once("renderPinCushionHUD", () => {
  const applicationTheme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
  if (applicationTheme !== "no-theme") {
    const uiTheme = lookupThemeAndSchemeForKey(applicationTheme);
    const { dorakoUiTheme, colorScheme } = uiTheme;
    if (uiTheme) {
      $("#powerTip").attr("data-theme", dorakoUiTheme);
    }
  }
});
