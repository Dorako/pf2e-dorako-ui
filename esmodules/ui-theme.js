import {
  limitedScopeApplications,
  MODULE_NAME,
  themedApps,
  systemSheets,
  excludedApplications,
  moduleWindowApps,
} from "./consts.js";
import { isPremiumApplication } from "./premium-module-hooks.js";

export function getDefaultColorScheme(theme) {
  switch (theme) {
    case "crb-light":
      return "light";
    case "foundry2":
      return "dark";
    case "bg3-brown":
      return "dark";
    case "bg3-blue":
      return "dark";
    case "bg3":
      return "dark";
    case "discord":
      return "dark";
    case "discord-light":
      return "light";
    case "discord-dark":
      return "dark";
    default:
      return null;
  }
}

export function getUiTheme() {
  const windowAppTheme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  // const colorSchemePref = game.settings.get("pf2e-dorako-ui", "theme.window-app-color-scheme");
  // const colorScheme = (function () {
  //   switch (colorSchemePref) {
  //     case "default":
  //       return getDefaultColorScheme(windowAppTheme);
  //     case "prefer-light":
  //       return "light";
  //     case "prefer-dark":
  //       return "dark";
  //   }
  // })();
  // return { dorakoUiTheme: windowAppTheme, colorScheme: colorScheme };
  return { dorakoUiTheme: windowAppTheme, colorScheme: getDefaultColorScheme(windowAppTheme) };
}

export function getAppThemeAndScheme() {
  const setting = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
  switch (setting) {
    case "crb":
      return { dorakoUiTheme: "crb", colorScheme: null };
    case "crb-light":
      return { dorakoUiTheme: "crb-light", colorScheme: "light" };
    case "crb-dark":
      return { dorakoUiTheme: "crb-dark", colorScheme: "dark" };
    case "foundry2":
      return { dorakoUiTheme: "foundry2", colorScheme: "dark" };
    case "bg3":
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    case "discord":
      return { dorakoUiTheme: "discord", colorScheme: "dark" };
    case "discord-light":
      return { dorakoUiTheme: "discord-light", colorScheme: "light" };
    case "discord-dark":
      return { dorakoUiTheme: "discord-dark", colorScheme: "dark" };
    case "opaque": {
      return { dorakoUiTheme: "opaque", colorScheme: "dark" };
    }
    default:
      return "", "";
  }
}

export function getChatTheme() {
  const setting = game.settings.get("pf2e-dorako-ui", "theme.chat-message-theme");
  switch (setting) {
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
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    case "bg3-blue":
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    case "discord":
      return { dorakoUiTheme: "discord", colorScheme: "dark" };
    case "discord-light":
      return { dorakoUiTheme: "discord-light", colorScheme: "light" };
    case "discord-dark":
      return { dorakoUiTheme: "discord-dark", colorScheme: "dark" };
    default:
      return "", "";
  }
}

export function lookupThemeAndSchemeForKey(key) {
  switch (key) {
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
    case "discord":
      return { dorakoUiTheme: "discord", colorScheme: "dark" };
    case "discord-light":
      return { dorakoUiTheme: "discord-light", colorScheme: "light" };
    case "discord-dark":
      return { dorakoUiTheme: "discord-dark", colorScheme: "dark" };
    default:
      return "", "";
  }
}

Hooks.on("renderSvelteApplication", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes(app.constructor.name) || excludedApplications.includes(app.constructor.name)) {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications`);
    return;
  }
  const { dorakoUiTheme, colorScheme } = uiTheme;
  app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
  app.element[0].dataset.colorScheme = colorScheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

for (const appName of [...themedApps]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
    if (theme === "no-theme") return;
    const uiTheme = getAppThemeAndScheme();
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

    app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | [data-dorako-ui-theme='${dorakoUiTheme}']`);
  });
}

for (const appName of [...systemSheets, ...moduleWindowApps]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
    if (theme === "no-theme") return;
    const uiTheme = getUiTheme();
    if (uiTheme === null) return;
    const { dorakoUiTheme, colorScheme } = uiTheme;
    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name)) {
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

    app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
    app.element[0].dataset.colorScheme = colorScheme;
    app.element[0].dataset.dorakoUiScope = "unlimited";
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | [data-dorako-ui-theme='${dorakoUiTheme}'] [data-color-scheme='${colorScheme}'] [data-dorako-ui-scope='unlimited']`
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
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  const excludeString =
    game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") +
    ", EnhancedJournal" +
    ", SceneActorsLayer" +
    ", SmallTimeApp" +
    ", SceneDarknessAdjuster" +
    ", AutorecMenuApp";
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
  app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
  app.element[0].dataset.colorScheme = colorScheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
  html.find(".item-controls button[data-action='apply']").addClass("bright");
  html.find("button[data-action='accept']").addClass("bright");
  html.find("form button[type='submit']").addClass("bright");
  html.find("form button[data-action='save']").addClass("bright");
  html.find("form.check-modifiers-content button.roll").addClass("bright");
});

// Hooks.on("renderDialog", (app, html, data) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
//   if (theme === "no-theme") return;
//   const uiTheme = getUiTheme();
//   if (uiTheme === null) return;
//   const { dorakoUiTheme, colorScheme } = uiTheme;
//   console.debug(`${MODULE_NAME} | render${app.constructor.name} | set dorako-ui-theme to ${dorakoUiTheme}`);
//   app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
//   app.element[0].dataset.colorScheme = colorScheme;
//   app.element[0].dataset.dorakoUiScope = "unlimited";
// });

for (const appName of [...limitedScopeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
    if (theme === "no-theme") return;
    const uiTheme = getUiTheme();
    if (uiTheme === null) return;
    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set data-dorako-ui-scope to 'limited'`
      );
      return;
    }
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => set data-dorako-ui-scope to 'limited'`
    );
    app.element[0].dataset.dorakoUiScope = "limited";
  });
}

for (const appName of ["CharacterSheetPF2e", "VehicleSheetPF2e"]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.pc-sheet-theme-color");
    if (theme === "default") return;
    app.element[0].dataset.themeColor = theme;
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

Hooks.on("render" + "ChatLogPF2e", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
  if (theme === "no-theme") return;
  app.element[0].dataset.chatAppTheme = theme;
});

Hooks.on("render" + "Sidebar", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
  if (theme === "no-theme") return;
  if (theme === "bg3") {
    app.element[0].dataset.chatAppTheme = "bg3-translucent";
  } else {
    app.element[0].dataset.chatAppTheme = theme;
  }
});

Hooks.on("render" + "Sidebar", (app, html, data) => {
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes(app.constructor.name)) {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string`);
    return;
  }

  $("#sidebar-tabs").attr("data-dorako-ui-theme", "");
  app.element[0].dataset.dorakoUiScope = "sidebar";
});
