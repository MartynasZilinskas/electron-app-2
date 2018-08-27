import { AppAction } from "./dispatcher";

export interface ProccessMessageData<TAction extends AppAction> {
    channel: "data-channel";
    action: TAction;
}
