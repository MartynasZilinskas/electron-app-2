import * as path from "path";
import { fork, ChildProcess } from "child_process";
import { AppAction } from "../contracts/dispatcher";
import { ProccessMessageData } from "../contracts/proccess-communication";

export interface NodeContainerMessageHandler {
    (action: AppAction): void;
}

export class NodeContainer {
    constructor(protected readonly onMessageHandler: NodeContainerMessageHandler) {
        this.proccess.on("message", this.onMessage);
        this.proccess.on("error", this.onError);
        this.proccess.on("exit", this.onExit);
    }

    protected proccess: ChildProcess = this.initProccess();

    // tslint:disable-next-line:no-any
    public sendAction(action: AppAction): void {
        const data: ProccessMessageData<AppAction> = {
            kind: "data-channel",
            action: action
        };

        this.proccess.send(data);
    }

    private initProccess(): ChildProcess {
        return fork(path.join(__dirname, "../processes/node.process"));
    }

    private onMessage = (message: ProccessMessageData<AppAction>) => {
        if (message.kind !== "data-channel") {
            return;
        }

        this.onMessageHandler(message.action);
    };

    private onError = () => {
        this.proccess.kill();
        this.proccess = this.initProccess();
    };

    private onExit = () => {
        this.proccess.kill();
        this.proccess = this.initProccess();
    };
}
