import { Dispatcher } from "../abstractions/dispatcher";
import { AppAction } from "../contracts/dispatcher";
import { ProccessMessageData } from "../contracts/proccess-communication";

export class ProccessDispatcher extends Dispatcher {
    constructor() {
        super();
        process.on("message", this.onMessage);
    }

    private onMessage = (message: ProccessMessageData<AppAction>) => {
        if (message.kind !== "data-channel") {
            return;
        }

        this.emit(message.action.type, message.action);
    };

    public dispatch<TAction extends AppAction>(action: TAction): void {
        const message: ProccessMessageData<AppAction> = {
            kind: "data-channel",
            action: action
        };

        process.send(message);
    }
}
