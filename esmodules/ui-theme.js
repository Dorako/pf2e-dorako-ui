import {
  limitedScopeApplications,
  baseThemeApplications,
  baseThemePf2eSheets,
  MODULE_NAME,
  themedApps,
  systemSheets,
  excludedApplications,
} from "./consts.js";
import { isPremiumApplication } from "./premium-module-hooks.js";

export function getDefaultColorScheme(theme) {
  switch (theme) {
    case "crb":
      return "light";
    case "foundry2":
      return "dark";
    case "bg3":
      return "dark";
    case "discord":
      return "dark";
    default:
      return null;
  }
}

export function getUiTheme() {
  const windowAppTheme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  const colorSchemePref = game.settings.get("pf2e-dorako-ui", "theme.window-app-color-scheme");
  const colorScheme = (function () {
    switch (colorSchemePref) {
      case "default":
        return getDefaultColorScheme(windowAppTheme);
      case "prefer-light":
        return "light";
      case "prefer-dark":
        return "dark";
    }
  })();
  return { dorakoUiTheme: windowAppTheme, colorScheme: colorScheme };
}

export function getAppThemeAndScheme() {
  const setting = game.settings.get("pf2e-dorako-ui", "theme.app-theme");
  switch (setting) {
    case "crb":
      return { dorakoUiTheme: "crb", colorScheme: null };
    case "foundry2":
      return { dorakoUiTheme: "foundry2", colorScheme: "light" };
    case "bg3":
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    case "discord":
      return { dorakoUiTheme: "discord", colorScheme: "dark" };
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
    case "foundry2":
      return { dorakoUiTheme: "foundry2", colorScheme: "light" };
    case "bg3":
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    case "discord":
      return { dorakoUiTheme: "discord", colorScheme: "dark" };
    default:
      return "", "";
  }
}

Hooks.on("renderSvelteApplication", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.window-app-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
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
    //  + ",ChatLogPF2e"
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
      );
      return;
    }

    app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | [data-dorako-ui-theme='${dorakoUiTheme}']`);
  });
}

for (const appName of [...systemSheets]) {
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
      theme == "crb" &&
      colorScheme == "light" &&
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
  html.find("form button[type='submit']").addClass("bright");
  html.find(".item-controls button[data-action='apply']").addClass("bright");
  html.find("button[data-action='accept']").addClass("bright");
  html.find("form button[data-action='save']").addClass("bright");
});

Hooks.on("renderSidebar", (app, html, data) => {
  $("#sidebar-tabs").attr("data-dorako-ui-theme", "");
  app.element[0].dataset.dorakoUiScope = "sidebar";
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
    const theme = game.settings.get("pf2e-dorako-ui", "theme.pc-sheet-theme");
    html[0].classList.add(`${theme}-theme`);
  });
}
