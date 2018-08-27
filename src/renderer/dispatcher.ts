import { ipcRenderer } from "electron";
import { AppAction, DATA_CHANNEL_NAME } from "../contracts/dispatcher";
import { Dispatcher } from "../abstractions/dispatcher";

class RendererDispatcher extends Dispatcher {
    constructor() {
        super();
        ipcRenderer.on(DATA_CHANNEL_NAME, this.onMessage);
    }

    // tslint:disable-next-line:no-any
    private onMessage = (_: any, action: AppAction) => {
        this.emit(action.type, action);
    };

    public dispatch<TAction extends AppAction>(action: TAction): void {
        ipcRenderer.send(DATA_CHANNEL_NAME, action);
    }
}

export const rendererDispatcher = new RendererDispatcher();
