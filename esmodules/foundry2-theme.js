import { baseThemeApplications, baseThemePf2eSheets, MODULE_NAME, premiumModuleSelector } from "./consts.js";
import { isPremiumApplication } from "./premium-module-hooks.js";

Hooks.on("renderSvelteApplication", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") return;
  app.element[0].classList.add("foundry2");
});

for (const appName of [...baseThemeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    if (app.constructor.name.startsWith("SWPF")) return; // SWPFCompendiumTOC, SWPFSheet
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "foundry2-theme") return;
    const excludeString =
      game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") + "VehicleSheetPF2e" + "HUD";
    if (excludeString.toLowerCase().includes(appName.toLowerCase())) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .foundry2`
      );
      return;
    }
    console.debug(`${MODULE_NAME} | baseThemeApplications | render${app.constructor.name} => add .foundry2`);
    html.addClass("foundry2");
  });
}

Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  //   if (html0.classList.contains("dialog")) return;
  if (html0.classList.contains("editable")) return;
  if (!html0.classList.contains("window-app")) return;
  if (isPremiumApplication(app, html, data, app.constructor.name)) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  const excludeString =
    game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") + ", MonksEnhancedJournal";
  if (excludeString.toLowerCase().includes(app.constructor.name.toLowerCase())) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .foundry2`
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
  html.addClass("foundry2");
  //   app.options?.classes?.push("foundry2");
  html.find("form button[type='submit']").addClass("bright");
  html.find(".item-controls button[data-action='apply']").addClass("bright");
  html.find("form button[data-action='save']").addClass("bright");
  // html.find("nav.sheet-tabs .item").addClass("button");
});

Hooks.on("renderDialog", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | pushing .foundry2 class option`);
  html.addClass("foundry2");
});

Hooks.on("renderItemSheet", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  //   app.options?.classes?.push("foundry2");
  html.addClass("foundry2");
  html.find("form > nav a").addClass("button");
});

Hooks.on("renderTokenActionHud", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  if (excludeString.toLowerCase().includes("TokenActionHud".toLowerCase())) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .foundry2`
    );
    return;
  }
  html.attr("data-theme", "foundry2");
});

Hooks.on("renderTokenBar", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    html.attr("data-theme", "dorako-ui");
    return;
  }
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  if (excludeString.toLowerCase().includes("TokenBar".toLowerCase())) {
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .foundry2`
    );
    return;
  }
  html.attr("data-theme", "foundry2");
});

for (const app of [...baseThemePf2eSheets]) {
  Hooks.on("render" + app, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "foundry2-theme") return;
    let html0 = html[0];
    if (!html0.classList.contains("window-app")) return;
    if (html0.classList.contains("character")) return;
    console.debug(
      `${MODULE_NAME} | render${app.constructor.name} | is PF2e .window-app "Application" => add .foundry2`
    );
    html.addClass("foundry2");
  });
}

for (const app of ["CharacterSheetPF2e", "VehicleSheetPF2e", "HUD"]) {
  Hooks.on("render" + app, (app, html, data) => {
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "foundry2-theme") return;
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => add .foundry2-pc`);
    html.addClass("foundry2-pc");
  });
}
