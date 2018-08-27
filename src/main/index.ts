import { app, BrowserWindow, ipcMain } from "electron";
import * as url from "url";
import * as path from "path";
// import { fork } from "child_process";

import { DATA_CHANNEL_NAME, AppAction } from "../contracts/dispatcher";
import { mainDispatcher } from "./dispatcher";
// const forked = fork(path.join(__dirname, "../processes/node.process"));

const IS_SERVE: boolean = process.argv.indexOf("--serve") !== -1;
const DEV_PORT: number = 4000;

ipcMain.on(DATA_CHANNEL_NAME, (_, data: AppAction) => {
    console.info(data);
});

app.on("ready", () => {
    const browserWindow = new BrowserWindow();

    if (IS_SERVE) {
        // tslint:disable-next-line:no-require-imports
        require("electron-reload")(path.resolve(__dirname, "../../"), {
            electron: require(path.resolve(__dirname, "../../node_modules/electron"))
        });
        browserWindow.loadURL(`http://localhost:${DEV_PORT}`);
    } else {
        browserWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, "dist/renderer/index.html"),
                protocol: "file:",
                slashes: true
            })
        );
        browserWindow.webContents.openDevTools();
    }

    mainDispatcher.dispatch({ type: "MAIN" });
});
