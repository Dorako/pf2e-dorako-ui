import path from "path";
import fs from "fs-extra";
import { Configuration, DefinePlugin } from "webpack";
import copyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackBar from "webpackbar";

const buildMode = process.argv[3] == "production" ? "production" : "development";
const isProductionBuild = buildMode === "production";

const pf2eSystemPath = (() => {
    const configPath = path.resolve(process.cwd(), "foundryconfig.json");
    const configData = fs.existsSync(configPath) ? fs.readJSONSync(configPath) : undefined;
    return configData !== undefined ? path.join(configData.dataPath, "Data", "modules", configData.moduleName) : null;
})();
const outDir = pf2eSystemPath ?? path.join(__dirname, "dist/");

console.log(`Destination Folder set to ${outDir}`);

const config: Configuration = {
    context: __dirname,
    mode: buildMode,
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "tsconfig.json"),
                            transpileOnly: true,
                            happyPackMode: true,
                            compilerOptions: {
                                noEmit: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },

    devtool: isProductionBuild ? undefined : "inline-source-map",
    watch: !isProductionBuild,
    plugins: [
        new ForkTsCheckerWebpackPlugin({ typescript: { memoryLimit: 4096 } }),
        new DefinePlugin({
            BUILD_MODE: JSON.stringify(buildMode),
        }),
        new copyWebpackPlugin({
            patterns: [
                { from: "README.md" },
                { from: "module.json" },
                { from: "src/languages", to: "languages" },
                { from: "src/templates", to: "templates" },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "styles/styles.css",
            insert: "head",
        }),
        new WebpackBar({}),
    ],
    resolve: {
        extensions: [".ts"],
    },
    output: {
        clean: { keep: "packs" },
        path: outDir,
        filename: "index.js",
    },
};

export default config;
