import { ipcMain, BrowserWindow } from "electron";
import { AppDispatcher, AppAction, DATA_CHANNEL_NAME } from "../contracts/dispatcher";

class MainDispatcher implements AppDispatcher {
    constructor() {
        ipcMain.on(DATA_CHANNEL_NAME, this.onMessage);
    }

    // tslint:disable-next-line:no-any
    private onMessage = (_: any, action: AppAction) => {
        console.info("[Main Dispatcher]", "RECEIVED", action);
    };

    public dispatch<TAction extends AppAction>(action: TAction): void {
        for (const window of BrowserWindow.getAllWindows()) {
            window.webContents.send(DATA_CHANNEL_NAME, action);
        }
        console.info("[Main Dispatcher]", "SENT", action);
    }
}

export const mainDispatcher = new MainDispatcher();
