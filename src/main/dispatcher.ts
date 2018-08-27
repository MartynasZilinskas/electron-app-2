import { ipcMain, BrowserWindow } from "electron";
import { AppAction, DATA_CHANNEL_NAME } from "../contracts/dispatcher";
import { Dispatcher } from "../abstractions/dispatcher";
import { NodeContainer, NodeContainerMessageHandler } from "./node-container";

class MainDispatcher extends Dispatcher {
    constructor() {
        super();
        ipcMain.on(DATA_CHANNEL_NAME, this.onRendererMessage);
        this.nodeContainer = new NodeContainer(this.onNodeMessage);
    }

    protected nodeContainer: NodeContainer;

    /**
     * Emits action to all BrowserWindow.
     */
    private sendToBrowserWindows<TAction extends AppAction>(action: TAction): void {
        for (const window of BrowserWindow.getAllWindows()) {
            window.webContents.send(DATA_CHANNEL_NAME, action);
        }
    }

    // tslint:disable-next-line:no-any
    private onRendererMessage = (_: any, action: AppAction) => {
        this.emit(action.type, action);
        this.nodeContainer.sendAction(action);
    };

    private onNodeMessage: NodeContainerMessageHandler = action => {
        this.emit(action.type, action);
        this.sendToBrowserWindows(action);
    };

    public dispatch<TAction extends AppAction>(action: TAction): void {
        this.sendToBrowserWindows(action);
        this.nodeContainer.sendAction(action);
    }
}

export const mainDispatcher = new MainDispatcher();
