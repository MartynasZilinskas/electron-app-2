import { ProccessDispatcher } from "./dispatcher";
import { CounterAction } from "../contracts/node-actions";

const dispatcher = new ProccessDispatcher();

dispatcher.addListener("*", action => {
    console.info("[NODE]", action);
});

let COUNTER = 0;

setInterval(() => {
    dispatcher.dispatch<CounterAction>({
        type: "COUNTER",
        counter: COUNTER++
    });
}, 1000);
