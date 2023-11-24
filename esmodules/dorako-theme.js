// import { baseThemeApplications, baseThemePf2eSheets, MODULE_NAME, premiumModuleSelector } from "./consts.js";
// import { isPremiumApplication } from "./premium-module-hooks.js";

// // Add .dorako-ui to all always-styled applications (Does not include pf2e sheets)
// for (const appName of [...baseThemeApplications]) {
//   Hooks.on("render" + appName, (app, html, data) => {
//     if (app.constructor.name.startsWith("SWPF")) return; // SWPFCompendiumTOC, SWPFSheet
//     const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//     if (theme === "no-theme" || theme === "foundry2-theme") return;
//     const excludeString =
//       game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") +
//       ", MonksEnhancedJournal" +
//       ", SceneActorsLayer";
//     const excludeList = excludeString.split(/[\s,]+/);
//     if (excludeList.includes(app.constructor.name)) {
//       console.debug(
//         `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .dorako-ui`
//       );
//       return;
//     }
//     let html0 = html[0];
//     console.debug(`${MODULE_NAME} | baseThemeApplications | render${app.constructor.name} => add .dorako-ui`);
//     // console.debug({ app });
//     html0.classList.add("dorako-ui");
//   });
// }

// // adds .dorako-ui to all .window-app Applications that are not .premium
// Hooks.on("renderApplication", (app, html, data) => {
//   let html0 = html[0];
//   if (!html0.classList.contains("window-app")) return;
//   // TODO: This also triggers for SceneConfigPF2e
//   if (isPremiumApplication(app, html, data, app.constructor.name)) return;
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//   if (theme === "no-theme" || theme == "foundry2-theme") {
//     return;
//   }
//   const excludeString =
//     game.settings.get("pf2e-dorako-ui", "customization.excluded-applications") + ", SceneActorsLayer";
//   const excludeList = excludeString.split(/[\s,]+/);
//   if (excludeList.includes(app.constructor.name)) {
//     console.debug(
//       `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .dorako-ui`
//     );
//     return;
//   }
//   console.debug(`${MODULE_NAME} | render${app.constructor.name} | is .window-app => add .dorako-ui`);
//   html0.classList.add("dorako-ui");
// });

// Hooks.on("renderSvelteApplication", (app) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//   if (theme === "no-theme" || theme === "foundry2-theme") return;
//   app.element[0].classList.add("dorako-ui");
// });

// // // TAH Core
// // Hooks.on("renderTokenActionHud", (app, html, data) => {
// //   if (
// //     game.modules.get("token-action-hud-core")?.active &&
// //     game.settings.get("token-action-hud-core", "style") === "dorakoUI"
// //   ) {
// //     let html0 = html[0];
// //     console.debug(`${MODULE_NAME} | render${app.constructor.name} => add .dorako-ui`);
// //     html0.classList.add("dorako-ui");
// //     return;
// //   }
// //   console.debug(`${MODULE_NAME} | render${app.constructor.name} but style !== "dorakoUI" => do not add .dorako-ui`);
// // });

// // // TAH (Original)
// // Hooks.on("renderTokenActionHUD", (app, html, data) => {
// //   // reconsider logic
// //   if (game.modules.get("token-action-hud")?.active && game.settings.get("token-action-hud", "style") === "dorakoUI") {
// //     let html0 = html[0];
// //     console.debug(`${MODULE_NAME} | render${app.constructor.name} => add .dorako-ui`);
// //     html0.classList.add("dorako-ui");
// //     return;
// //   }
// //   console.debug(`${MODULE_NAME} | render${app.constructor.name} but style !== "dorakoUI" => do not add .dorako-ui`);
// // });

// // Add .dorako-ui to all .dialog applications
// Hooks.on("renderDialog", (app, html, data) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//   if (theme === "no-theme" || theme === "foundry2-theme") {
//     console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => do not add .dorako-ui`);
//     return;
//   }
//   console.debug(`${MODULE_NAME} | render${app.constructor.name} | pushing .dorako-ui class option`);
//   // console.debug({ app });
//   app.options?.classes?.push("dorako-ui");
//   let position = app.position;
//   position.height += 6;
//   position.width += 6;
//   app.setPosition(position);
//   // app.render(); // Breaks forien-easy-poll
// });

// // Add .dorako-ui and .dialog to all "Dialogs"
// Hooks.on("renderApplication", (app, html, data) => {
//   let html0 = html[0];
//   if (html0.classList.contains("dialog")) return;
//   if (!html0.classList.contains("window-app")) return;
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//   if (theme === "no-theme" || theme === "foundry2-theme") {
//     console.debug(`${MODULE_NAME} | render${app.constructor.name} | theme: ${theme} => do not add .dorako-ui`);
//     return;
//   }
//   const fakeDialogPatterns = ["popup", "dialog"];
//   for (const fakeDialogPattern of [...fakeDialogPatterns]) {
//     if (app.constructor.name.toLowerCase().includes(fakeDialogPattern)) {
//       console.debug(
//         `${MODULE_NAME} | render${app.constructor.name} | constructor includes '${fakeDialogPattern}' => add .dialog .dorako-ui`
//       );
//       html0.classList.add("dorako-ui");
//       html0.classList.add("dialog");
//       return;
//     }
//   }
// });

// // Add .dorako-ui to all PF2E "applications", add .dorako-ui-skip to generalized stuff
// for (const app of [...baseThemePf2eSheets]) {
//   Hooks.on("render" + app, (app, html, data) => {
//     let html0 = html[0];
//     // if (!app.constructor.name.endsWith("PF2e")) return; <- SpellPreparationSheet doesn't end with PF2e
//     if (!html0.classList.contains("window-app")) return;
//     const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//     if (theme === "no-theme" || theme === "foundry2-theme") {
//       return;
//     }
//     console.debug(
//       `${MODULE_NAME} | render${app.constructor.name} | is PF2e .window-app "Application" => add .dorako-ui`
//     );
//     html0.classList.add("dorako-ui");
//     html.addClass(theme);
//     html.find("select.tag").addClass("dorako-ui-skip");
//     html.find("select.pf-rank").addClass("dorako-ui-skip");
//     html.find(".initiative-select select").addClass("dorako-ui-skip");
//   });
// }

// // Add 'light-theme' to journal-entry-content if dark theme journals is not enabled
// for (const appName of ["JournalSheet", "JournalPageSheet"]) {
//   //"JournalPageSheet"
//   Hooks.on("render" + appName, (app, html, data) => {
//     if (html[0].id.includes("JournalSheetPF2e-Compendium-pf2e-criticaldeck")) return;
//     // html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dalvyn-journal");
//     const isDarkJournals = game.settings.get("pf2e-dorako-ui", "theme.enable-dark-theme-journals");
//     const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//     if (theme === "foundry2-theme") return;
//     if (!isDarkJournals) {
//       html.closest(".app").find(".journal-entry-content").addClass("dorako-ui light-theme");
//       return;
//     } else {
//       html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
//       return;
//     }
//   });
// }

// // Do not style selects on loot sheets
// Hooks.on("renderLootSheetPF2e", (app, html, data) => {
//   html.find("select").addClass("dorako-ui-skip");
// });

// // Do not style input fields on hazard sheets
// Hooks.on("renderHazardSheetPF2e", (app, html, data) => {
//   html.find("input").addClass("dorako-ui-skip");
// });

// for (const appName of ["CharacterSheetPF2e", "VehicleSheetPF2e"]) {
//   Hooks.on("render" + appName, (app, html, data) => {
//     const theme = game.settings.get("pf2e-dorako-ui", "theme.pc-sheet-theme");
//     // html.closest(".app").find(".journal-entry-content").addClass("dorako-ui dark-theme");
//     html[0].classList.add(`${theme}-theme`);
//   });
// }

// Hooks.on("renderNPCSheetPF2e", (app, html, data) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.npc-sheet-theme");
//   if (theme === "default") {
//     return;
//   }
//   html[0].classList.add(`${theme}-theme`);
// });

// Hooks.on("renderHazardSheetPF2e", (app, html, data) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.npc-sheet-theme");
//   if (theme === "default") {
//     return;
//   }
//   html[0].classList.add(`${theme}-theme`);
// });

// Hooks.on("renderFamiliarSheetPF2e", (app, html, data) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.npc-sheet-theme");
//   if (theme === "default") {
//     return;
//   }
//   html[0].classList.add(`${theme}-theme`);
// });
