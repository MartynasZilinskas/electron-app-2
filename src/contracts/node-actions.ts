import { AppAction } from "./dispatcher";

export interface CounterAction extends AppAction {
    type: "COUNTER";
    counter: number;
}
