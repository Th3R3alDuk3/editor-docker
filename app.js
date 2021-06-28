const express = require("express");
const expressWs = require("express-ws");

const app = express();
// websocket support
expressWs(app);

/**/

// support encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static("public"));
app.use("/node_modules", express.static("node_modules"));

/**/

// spawn child process
const { spawn } = require("child_process");

app.ws("/", (websocket, request) => {

    websocket.on("message", msg => {

        // msg type and data
        msg = JSON.parse(msg);

        if (msg.type != "tcc")
            throw Error(msg.type + " is not supported");

        // TODO: install tinycc
        let subprocess = spawn(
            "tcc", ["-run", "-"], {
                stdio: [
                    "pipe", "pipe", "pipe"
                ]
            }
        );

        subprocess.stdin.write(msg.data);
        subprocess.stdin.end();

        subprocess.stdout.on("data", (data) => {
            websocket.send(JSON.stringify({
                type: "stdout", data: data.toString()
            }));
        });

        subprocess.stderr.on("data", (data) => {
            websocket.send(JSON.stringify({
                type: "stderr", data: data.toString()
            }));
        });

        subprocess.on("close", (code) => {
            // console.log(`child process exited with code ${code}`);
        });

    });

    websocket.on("close", () => {
        console.log("websocket disconnected ...");
    });

    request.end();

});

app.get("/", (request, response) => {
    res.sendFile("index.html");
});

/**/

app.listen(8080, "0.0.0.0", () => {
    console.log("http://0.0.0.0:8080")
});