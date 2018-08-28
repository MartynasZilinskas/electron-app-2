import * as path from "path";
import { fork, ChildProcess } from "child_process";
import { AppAction } from "../contracts/dispatcher";
import { ProcessMessageData } from "../contracts/process-communication";

export interface NodeContainerMessageHandler {
    (action: AppAction): void;
}

export class NodeContainer {
    constructor(protected readonly onMessageHandler: NodeContainerMessageHandler) {
        this.createProcess();
    }

    protected process: ChildProcess;

    // tslint:disable-next-line:no-any
    public sendAction(action: AppAction): void {
        const data: ProcessMessageData<AppAction> = {
            channel: "data-channel",
            action: action
        };

        this.process.send(data);
    }

    private createProcess(): void {
        const process = fork(path.join(__dirname, "../processes/node.process"));
        this.process = process;
        process.on("message", this.onMessage);
        process.on("error", this.onError);
        process.on("exit", this.onExit);
    }

    private onMessage = (message: ProcessMessageData<AppAction>) => {
        if (message.channel !== "data-channel") {
            return;
        }

        this.onMessageHandler(message.action);
    };

    private onError = (error: Error) => {
        console.log("ERROR", error);
        this.process.removeAllListeners();
        this.createProcess();
    };

    private onExit = (code: number, signal: any) => {
        console.log("EXIT", code, signal);
        this.process.removeAllListeners();
        this.createProcess();
    };
}
