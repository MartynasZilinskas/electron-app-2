import { ipcRenderer } from "electron";
import { AppDispatcher, AppAction, DATA_CHANNEL_NAME } from "../contracts/dispatcher";

class RendererDispatcher implements AppDispatcher {
    constructor() {
        ipcRenderer.on(DATA_CHANNEL_NAME, this.onMessage);
    }

    // tslint:disable-next-line:no-any
    private onMessage = (_: any, action: AppAction) => {
        console.info("[Renderer Dispatcher]", "RECEIVED", action);
    };

    public dispatch<TAction extends AppAction>(action: TAction): void {
        ipcRenderer.send(DATA_CHANNEL_NAME, action);
        console.info("[Renderer Dispatcher]", "SENT", action);
    }
}

export const rendererDispatcher = new RendererDispatcher();
