process.on("message", msg => {
    console.info("Message from parent:", msg);
});

let COUNTER = 0;

setInterval(() => {
    process.send({ counter: COUNTER++ });
}, 1000);
