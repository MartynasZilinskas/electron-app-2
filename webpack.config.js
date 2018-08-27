const { generateWebpackConfig } = require("@simplrjs/webpack");

const config = generateWebpackConfig({
    devServerPort: 4000,
    entryFile: "./src/renderer/app.ts",
    staticContentDirectory: "./src/renderer/static/**/*",
    outputDirectory: "./dist/renderer",
    emitHtml: true,
    htmlOptions: {
        title: "Electron renderer"
    },
    projectDirectory: __dirname
});

config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)\/(webpack-dev-server)/
});
config.target = "electron-renderer";

module.exports = config;
