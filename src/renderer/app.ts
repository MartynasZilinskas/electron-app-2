import { rendererDispatcher } from "./dispatcher";
import { AppAction } from "../contracts/dispatcher";
import { CounterAction } from "../contracts/node-actions";

document.getElementById("root").innerHTML = "Hello World!";

rendererDispatcher.addListener("*", action => {
    console.info("[RENDERER]", action);
});

rendererDispatcher.addListener<CounterAction>("COUNTER", action => {
    document.getElementById("root").innerHTML = `Counter; ${action.counter}`;
});

interface RendererAction extends AppAction {
    type: "RENDERER";
    data: string;
}

rendererDispatcher.dispatch<RendererAction>({
    type: "RENDERER",
    data: "Hello World!"
});
