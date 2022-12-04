import fs from "fs-extra";
import path from "path";

const packsSource = "packs";

const pf2eSystemPath = (() => {
    const configPath = path.resolve(process.cwd(), "foundryconfig.json");
    const configData = fs.existsSync(configPath) ? fs.readJSONSync(configPath) : undefined;
    return configData !== undefined ? path.join(configData.dataPath, "Data", "modules", configData.moduleName) : null;
})();
const outDir = pf2eSystemPath ?? path.join(__dirname, "dist/");

function getFolders(dir: string) {
    const results = [];
    const folders = fs.readdirSync(packsSource);
    for (const folder of folders) {
        const stat = fs.statSync(path.join(dir, folder));
        if (stat.isDirectory()) {
            results.push(folder);
        }
    }

    return folders;
}

fs.mkdirsSync(path.resolve(outDir, "packs"));

const folders = getFolders(packsSource);
for (const folder of folders) {
    const folderPath = path.join(packsSource, folder);
    const lines = [];
    for (const file of fs.readdirSync(folderPath)) {
        const filePath = path.join(folderPath, file);
        try {
            const contents = fs.readJSONSync(filePath, { encoding: "utf8" });
            const minimized = JSON.stringify(contents);
            lines.push(minimized);
        } catch (err) {
            console.error(`Failed to read JSON file ${filePath}`, err);
        }
    }
    const result = lines.join("\n");
    fs.writeFileSync(path.resolve(outDir, "packs", folder), result, "utf8");
}
