import { rendererDispatcher } from "./dispatcher";
import { AppAction } from "../contracts/dispatcher";

document.getElementById("root").innerHTML = "Hello World!";

interface RendererAction extends AppAction {
    type: "RENDERER";
    data: string;
}

rendererDispatcher.dispatch<RendererAction>({
    type: "RENDERER",
    data: "Hello World!"
});
