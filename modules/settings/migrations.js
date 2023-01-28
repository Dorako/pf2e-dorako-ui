import { MODULE_NAME } from "../consts.js";
import { debug } from "../util.js";

let oldSettings;
export default async function migrate() {
  const oldWorldSettings = game.settings.storage.get("world").filter((setting) => setting.key.includes(MODULE_NAME));
  const oldClientSettings = game.settings.storage.get("client").filter((setting) => setting.key.includes(MODULE_NAME));

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
  return oldSettings.find((setting) => setting.key.endsWith(oldSettingKey))?.value;
}

const migrations = {
  "1.11.1": async () => {
    // Migrate dark-theme degree -> application-theme
    if (findOldSettingValue("theme.dark-theme-degree")) {
      if (getSetting("theme.dark-theme-degree") === "supported" || getSetting("theme.dark-theme-degree") === "extended")
        await setSetting("theme.application-theme", "dark-theme");
      if (getSetting("theme.dark-theme-degree") === "none") await setSetting("theme.application-theme", "light-theme");
    }

    // Migrate individual dark theme sheets -> application-theme
    if (findOldSettingValue("theme.pc-sheet-theme")) {
      if (getSetting("theme.pc-sheet-theme") === "dark-theme")
        await setSetting("theme.application-theme", "dark-theme");
    }
    if (findOldSettingValue("theme.npc-sheet-theme")) {
      if (getSetting("theme.npc-sheet-theme") === "dark-theme")
        await setSetting("theme.application-theme", "dark-theme");
    }
    if (findOldSettingValue("theme.loot-sheet-theme")) {
      if (getSetting("theme.loot-sheet-theme") === "dark-theme")
        await setSetting("theme.application-theme", "dark-theme");
    }
    if (findOldSettingValue("theme.familiar-sheet-theme")) {
      if (getSetting("theme.loot-sheet-theme") === "dark" || getSetting("theme.loot-sheet-theme") === "darkRedHeader")
        await setSetting("theme.application-theme", "dark-theme");
    }
  },
};
