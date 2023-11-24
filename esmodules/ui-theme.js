import { limitedScopeApplications, baseThemeApplications, baseThemePf2eSheets, MODULE_NAME } from "./consts.js";
import { isPremiumApplication } from "./premium-module-hooks.js";

export function getUiTheme() {
  const applicationTheme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  switch (applicationTheme) {
    case "crb-light":
      return { dorakoUiTheme: "crb", colorScheme: "light" };
    case "crb-dark":
      return { dorakoUiTheme: "crb", colorScheme: "dark" };
    case "foundry2":
      return { dorakoUiTheme: "foundry2", colorScheme: "light" };
    case "bg3":
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    default:
      return "", "";
  }
}

export function getChatTheme() {
  const applicationTheme = game.settings.get("pf2e-dorako-ui", "theme.chat-theme");
  switch (applicationTheme) {
    case "crb-light":
      return { dorakoUiTheme: "crb", colorScheme: "light" };
    case "crb-dark":
      return { dorakoUiTheme: "crb", colorScheme: "dark" };
    case "foundry2":
      return { dorakoUiTheme: "foundry2", colorScheme: "light" };
    case "bg3":
      return { dorakoUiTheme: "bg3", colorScheme: "dark" };
    default:
      return "", "";
  }
}

Hooks.on("renderSvelteApplication", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
  app.element[0].dataset.colorScheme = colorScheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

for (const appName of [...baseThemeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    if (app.constructor.name.startsWith("SWPF")) return; // SWPFCompendiumTOC, SWPFSheet
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme === "no-theme") return;
    const uiTheme = getUiTheme();
    if (uiTheme === null) return;
    const { dorakoUiTheme, colorScheme } = uiTheme;
    const excludeString =
      game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") + ", VehicleSheetPF2e, HUD";
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
      );
      return;
    }
    console.debug(
      `${MODULE_NAME} | baseThemeApplications | render${app.constructor.name} => set dorako-ui-theme to ${uiTheme}`
    );
    app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
    if (html[0].classList.contains("window-app")) {
      app.element[0].dataset.colorScheme = colorScheme;
    }
    app.element[0].dataset.dorakoUiScope = "unlimited";
  });
}

Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (html0.classList.contains("editable")) return;
  if (!html0.classList.contains("window-app")) return;
  if (isPremiumApplication(app, html, data, app.constructor.name)) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  const excludeString =
    game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") +
    ", EnhancedJournal" +
    ", SceneActorsLayer";
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes(app.constructor.name)) {
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
  html.find("form button[data-action='save']").addClass("bright");
});

Hooks.on("renderDialog", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | set dorako-ui-theme to ${dorakoUiTheme}`);
  app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
  app.element[0].dataset.colorScheme = colorScheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

Hooks.on("renderItemSheet", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  app.element[0].dataset.dorakoUiTheme = uiTheme[0];
  app.element[0].dataset.colorScheme = uiTheme[1];
  html.find("form > nav a").addClass("button");
});

Hooks.on("renderTokenActionHud", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes("TokenActionHud")) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
    );
    return;
  }
  app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
  app.element[0].dataset.colorScheme = colorScheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

Hooks.on("renderTokenBar", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme === "no-theme") return;
  const uiTheme = getUiTheme();
  if (uiTheme === null) return;
  const { dorakoUiTheme, colorScheme } = uiTheme;
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes("TokenBar")) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dorakoUiTheme}`
    );
    return;
  }
  app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
  app.element[0].dataset.colorScheme = colorScheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

for (const appName of [...baseThemePf2eSheets]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme === "no-theme") return;
    const uiTheme = getUiTheme();
    if (uiTheme === null) return;
    const { dorakoUiTheme, colorScheme } = uiTheme;
    if (limitedScopeApplications.includes(appName)) return;
    let html0 = html[0];
    if (!html0.classList.contains("window-app")) return;
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is PF2e .window-app "Application" => set dorako-ui-theme to ${dorakoUiTheme}`
    );
    app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
    app.element[0].dataset.colorScheme = colorScheme;
    app.element[0].dataset.dorakoUiScope = "unlimited";
  });
}

for (const appName of [...limitedScopeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme === "no-theme") return;
    const uiTheme = getUiTheme();
    if (uiTheme === null) return;
    const { dorakoUiTheme, colorScheme } = uiTheme;
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
    app.element[0].dataset.dorakoUiTheme = dorakoUiTheme;
    if (html[0].classList.contains("window-app")) {
      app.element[0].dataset.colorScheme = colorScheme;
    }
    app.element[0].dataset.dorakoUiScope = "limited";
  });
}

for (const appName of ["CharacterSheetPF2e", "VehicleSheetPF2e"]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.pc-sheet-theme");
    html[0].classList.add(`${theme}-theme`);
  });
}
