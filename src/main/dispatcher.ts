import { ipcMain, BrowserWindow } from "electron";
import { AppAction, DATA_CHANNEL_NAME } from "../contracts/dispatcher";
import { Dispatcher } from "../abstractions/dispatcher";

class MainDispatcher extends Dispatcher {
    constructor() {
        super();
        ipcMain.on(DATA_CHANNEL_NAME, this.onMessage);
    }

    // tslint:disable-next-line:no-any
    private onMessage = (_: any, action: AppAction) => {
        this.emit(action.type, action);
    };

    public dispatch<TAction extends AppAction>(action: TAction): void {
        for (const window of BrowserWindow.getAllWindows()) {
            window.webContents.send(DATA_CHANNEL_NAME, action);
        }
    }
}

export const mainDispatcher = new MainDispatcher();
