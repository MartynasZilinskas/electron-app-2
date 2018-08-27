import { app, BrowserWindow } from "electron";
import { fork } from "child_process";
import * as path from "path";

const forked = fork(path.join(__dirname, "../processes/node.process"));

forked.on("message", msg => {
    console.log("Message from child", msg.counter);
});

forked.send({ hello: "world" });

app.on("ready", () => {
    new BrowserWindow();
});
