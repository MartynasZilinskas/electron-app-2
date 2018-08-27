import { rendererDispatcher } from "./dispatcher";
import { AppAction } from "../contracts/dispatcher";

document.getElementById("root").innerHTML = "Hello World!";

rendererDispatcher.addListener("*", action => {
    console.info("[RENDERER]", action);
});

interface RendererAction extends AppAction {
    type: "RENDERER";
    data: string;
}

rendererDispatcher.dispatch<RendererAction>({
    type: "RENDERER",
    data: "Hello World!"
});
