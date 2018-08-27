import { AppAction } from "./dispatcher";

export interface ProccessMessageData<TAction extends AppAction> {
    kind: "data-channel";
    action: TAction;
}
