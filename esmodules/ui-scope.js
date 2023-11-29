Hooks.on("render" + "Sidebar", (app, html, data) => {
  if (isExcluded(app)) return;
  app.element[0].dataset.dorakoUiScope = "sidebar";
});

Hooks.on("render" + "SceneControls", (app, html, data) => {
  if (isExcluded(app)) return;
  app.element[0].dataset.dorakoUiScope = "controls";
});

Hooks.on("render" + "SceneNavigation", (app, html, data) => {
  if (isExcluded(app)) return;
  app.element[0].dataset.dorakoUiScope = "navigation";
});

Hooks.on("render" + "Hotbar", (app, html, data) => {
  if (isExcluded(app)) return;
  app.element[0].dataset.dorakoUiScope = "hotbar";
});

Hooks.on("render" + "EffectsPanel", (app, html, data) => {
  if (isExcluded(app)) return;
  app.element[0].dataset.dorakoUiScope = "effects";
});

for (const appName of ["PlayerList", "SmallTimeApp"]) {
  Hooks.on("render" + appName, (app, html, data) => {
    if (isExcluded(app)) return;
    app.element[0].dataset.dorakoUiScope = "players";
  });
}

function isExcluded(app) {
  const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
  const excludeList = excludeString.split(/[\s,]+/);
  if (excludeList.includes(app.constructor.name)) {
    console.debug(`${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string`);
    return true;
  }
  return false;
}
