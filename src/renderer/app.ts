import { ipcRenderer } from "electron";
import { DATA_CHANNEL_NAME } from "../contracts/dispatcher";

document.getElementById("root").innerHTML = "Hello World!";

setInterval(() => {
    ipcRenderer.send(DATA_CHANNEL_NAME, { type: "RENDERER", data: "Hello World" });
}, 1000);
