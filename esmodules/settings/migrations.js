import { MODULE_NAME } from "../consts.js";
import { debug, getSetting, setSetting } from "../util.js";

let oldSettings;
export default async function migrate() {
  const oldWorldSettings = game.settings.storage.get("world").filter((setting) => setting.key.includes(MODULE_NAME));
  const oldClientSettings = Object.keys(game.settings.storage.get("client")).filter((setting) =>
    setting.includes(MODULE_NAME)
  );

  oldSettings = [...oldWorldSettings, ...oldClientSettings];

  const sortedMigrations = Object.entries(migrations).sort((a, b) => {
    return isNewerVersion(b[0], a[0]) ? -1 : 1;
  });

  for (const [version, migration] of sortedMigrations) {
    const migrationVersion = getSetting("migration-version");
    if (!isNewerVersion(version, migrationVersion)) continue;
    debug(`Current migration-version: ${migrationVersion}`);
    await migration();
  }

  const moduleVersion = game.modules.get(MODULE_NAME).version;
  debug(`Setting migration-version to ${moduleVersion}`);
  await setSetting("migration-version", moduleVersion);
}

function findOldSettingValue(oldSettingKey) {
  return oldSettings.find((setting) => setting?.key?.endsWith(oldSettingKey))?.value;
}

const migrations = {
  "1.11.1": async () => {
    // Migrate dark-theme degree -> application-theme
    const oldDarkThemeDegree = findOldSettingValue("theme.dark-theme-degree");
    if (oldDarkThemeDegree) {
      if (oldDarkThemeDegree === "supported" || oldDarkThemeDegree === "extended")
        await setSetting("theme.application-theme", "dark-theme");
      if (oldDarkThemeDegree === "none") await setSetting("theme.application-theme", "light-theme");
    }

    // Migrate individual dark theme sheets -> application-theme
    const oldPcSheetTheme = findOldSettingValue("theme.pc-sheet-theme");
    if (oldPcSheetTheme) {
      if (oldPcSheetTheme === "dark-theme") await setSetting("theme.application-theme", "dark-theme");
    }
    const oldNpcSheetTheme = findOldSettingValue("theme.npc-sheet-theme");
    if (oldNpcSheetTheme) {
      if (oldNpcSheetTheme === "dark-theme") await setSetting("theme.application-theme", "dark-theme");
    }
    const oldLootSheetTheme = findOldSettingValue("theme.loot-sheet-theme");
    if (oldLootSheetTheme) {
      if (oldLootSheetTheme === "dark-theme") await setSetting("theme.application-theme", "dark-theme");
    }
    const oldFamiliarSheetTheme = findOldSettingValue("theme.familiar-sheet-theme");
    if (oldFamiliarSheetTheme) {
      if (oldFamiliarSheetTheme === "dark" || oldFamiliarSheetTheme === "darkRedHeader")
        await setSetting("theme.application-theme", "dark-theme");
    }
  },
};
