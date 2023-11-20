import {
  foundry2RestrictedApplications,
  baseThemeApplications,
  baseThemePf2eSheets,
  MODULE_NAME,
  premiumModuleSelector,
} from "./consts.js";
import { isPremiumApplication } from "./premium-module-hooks.js";

export const dataTheme = "";

Hooks.on("renderSvelteApplication", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") return;
  // app.element[0].classList.add("foundry2");
  app.element[0].dataset.dorakoUiTheme = dataTheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

for (const appName of [...baseThemeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    if (app.constructor.name.startsWith("SWPF")) return; // SWPFCompendiumTOC, SWPFSheet
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "foundry2-theme") return;
    const excludeString =
      game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") + ", VehicleSheetPF2e, HUD";
    const excludeList = excludeString.split(/[\s,]+/);
    if (excludeList.includes(app.constructor.name)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dataTheme}`
      );
      return;
    }
    console.debug(
      `${MODULE_NAME} | baseThemeApplications | render${app.constructor.name} => set dorako-ui-theme to ${dataTheme}`
    );
    // html.addClass("foundry2");
    app.element[0].dataset.dorakoUiTheme = dataTheme;
    app.element[0].dataset.dorakoUiScope = "unlimited";
  });
}

Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  if (html0.classList.contains("editable")) return;
  if (!html0.classList.contains("window-app")) return;
  if (isPremiumApplication(app, html, data, app.constructor.name)) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  const excludeString =
    game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") +
    ", EnhancedJournal" +
    ", SceneActorsLayer";
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes(app.constructor.name)) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dataTheme}`
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
  app.element[0].dataset.dorakoUiTheme = dataTheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
  html.find("form button[type='submit']").addClass("bright");
  html.find(".item-controls button[data-action='apply']").addClass("bright");
  html.find("form button[data-action='save']").addClass("bright");
});

Hooks.on("renderDialog", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | set dorako-ui-theme to ${dataTheme}`);
  app.element[0].dataset.dorakoUiTheme = dataTheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

Hooks.on("renderItemSheet", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  app.element[0].dataset.dorakoUiTheme = dataTheme;
  html.find("form > nav a").addClass("button");
});

Hooks.on("renderTokenActionHud", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");

  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes("TokenActionHud")) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dataTheme}`
    );
    return;
  }
  if (theme !== "foundry2-theme") {
    app.element[0].dataset.dorakoUiTheme = "crb-dark";
    return;
  }
  app.element[0].dataset.dorakoUiTheme = dataTheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

Hooks.on("renderTokenBar", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    html.attr("data-theme", "dorako-ui");
    return;
  }
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes("TokenBar")) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not set dorako-ui-theme to ${dataTheme}`
    );
    return;
  }
  app.element[0].dataset.dorakoUiTheme = dataTheme;
  app.element[0].dataset.dorakoUiScope = "unlimited";
});

for (const appName of [...baseThemePf2eSheets]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "foundry2-theme") return;
    if (foundry2RestrictedApplications.includes(appName)) return;
    let html0 = html[0];
    if (!html0.classList.contains("window-app")) return;
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is PF2e .window-app "Application" => set dorako-ui-theme to ${dataTheme}`
    );
    // html.addClass("foundry2");
    app.element[0].dataset.dorakoUiTheme = dataTheme;
    app.element[0].dataset.dorakoUiScope = "unlimited";
  });
}

for (const appName of [...foundry2RestrictedApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "foundry2-theme") return;
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
    app.element[0].dataset.dorakoUiTheme = dataTheme;
    app.element[0].dataset.dorakoUiScope = "limited";
  });
}
