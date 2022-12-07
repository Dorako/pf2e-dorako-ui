import fs from "fs-extra";
import path from "path";
import Datastore from "nedb-promises";

type PackEntry = {
    name: string;
    sort?: unknown;
    folder?: unknown;
    data?: {
        schema?: {
            lastMigration: unknown;
            version: unknown;
        }
        slug?: unknown;
        source?: { value?: unknown };
        target?: unknown;
    }

};

function sluggify(entityName: string) {
    return entityName
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/[^a-z0-9]+/gi, " ")
        .trim()
        .replace(/[-\s]+/g, "-");
}

// show error message without needless traceback
const PackError = (message: string) => {
    console.error(`Error: ${message}`);
    process.exit(1);
};

const pf2eSystemPath = (() => {
    const configPath = path.resolve(process.cwd(), "foundryconfig.json");
    const configData = fs.existsSync(configPath) ? fs.readJSONSync(configPath) : undefined;
    return configData !== undefined ? path.join(configData.dataPath, "Data", "modules", configData.moduleName) : null;
})();
const packsPath = path.join(pf2eSystemPath ?? path.join(__dirname, "dist/"), "packs");
const foundryPacks = fs.readdirSync(packsPath).map((filename) => path.resolve(packsPath, filename));

const dataPath = path.resolve(process.cwd(), "packs");

async function getAllData(filename: string): Promise<PackEntry[]> {
    const packDB = Datastore.create({ filename, corruptAlertThreshold: 10 });
    await packDB.load();

    return packDB.find({}) as Promise<PackEntry[]>;
}

async function extractPacks() {
    for (const filePath of foundryPacks) {
        const dbFilename = path.basename(filePath);

        if (!dbFilename.endsWith(".db")) {
            throw PackError(`Pack file is not a DB file: '${dbFilename}'`);
        }

        if (!fs.existsSync(filePath)) {
            throw PackError(`File not found: '${dbFilename}'`);
        }

        const entityCount = await extractPack(filePath, dbFilename);
        console.log(`Finished extracting ${entityCount} entities from pack ${dbFilename}`);
    }
}

async function extractPack(filePath: string, packFilename: string) {
    const outDirPath = path.resolve(dataPath, packFilename);
    if (!fs.existsSync(outDirPath)) {
        await fs.promises.mkdir(outDirPath);
    }

    console.log(`Extracting pack: ${packFilename}`);

    const data = await getAllData(filePath);
    for (const entry of data) {
        try {
            // Delete certain unnecessary properties, or any optional null ones
            delete entry.sort;
            delete entry.folder;
            if (entry.data) {
                if (entry.data.schema?.version === null || entry.data.schema?.lastMigration === null) {
                    delete entry.data.schema;
                }
                if (entry.data.slug === null) {
                    delete entry.data.slug;
                }
                if (entry.data.source?.value === "") {
                    delete entry.data.source;
                }
                if (entry.data.target === null) {
                    delete entry.data.target;
                }
            }

            const slug = sluggify(entry.name);
            const filename = `${slug}.json`;
            const outputPath = path.join(outDirPath, filename);
            await fs.writeJSON(outputPath, prepareObject(entry), { spaces: 4 });
        } catch (err) {
            console.error(`Error writing "${entry.name}"`, err);
        }
    }

    return data.length;
}

function prepareObject(object: unknown) {
    if (!object || typeof object !== "object" || object instanceof Array) {
        return object;
    }

    const keys = Object.keys(object).sort();
    const newObject = {};
    for (const key of keys) {
        newObject[key] = prepareObject(object[key]);
    }

    return newObject;
}

extractPacks().catch((err) => console.error(err));
