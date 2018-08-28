import { ProcessDispatcher } from "./dispatcher";
import { CounterAction } from "../contracts/node-actions";

console.info("[NODE] PID", process.pid);

const dispatcher = new ProcessDispatcher();

let COUNTER = 0;

setInterval(() => {
    if (COUNTER === 10) {
        throw new Error("COUNTER reacted 10.");
    }

    dispatcher.dispatch<CounterAction>({
        type: "COUNTER",
        counter: COUNTER++
    });
}, 1000);
