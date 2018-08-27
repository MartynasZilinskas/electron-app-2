export interface AppAction {
    type: string;
}

export interface AppDispatcher {
    dispatch<TAction extends AppAction>(action: TAction): void;
}

export const DATA_CHANNEL_NAME = "data-channel";
