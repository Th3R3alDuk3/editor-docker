const express = require("express");
const expressWs = require("express-ws");

const app = express();
// support websockets
expressWs(app);

/**/

// support encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static("public"));
app.use("/node_modules", express.static("node_modules"));

/**/

// spawn child process
const { spawn } = require("child_process");

app.ws("/", (websocket, request) => {

    websocket.on("message", message => {

        message = JSON.parse(message);

        if (message.type != "tcc")
            throw Error(message.type + " is not supported");

        // TODO: install tinycc
        let subprocess = spawn(
            "tcc", ["-run", "-"], {
                stdio: [ "pipe", "pipe", "pipe" ]
            }
        );

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

        subprocess.on("error", error => {
            console.log(error);
        });

        subprocess.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });

        if (subprocess.connected) {
            subprocess.stdin.write(message.data);
            subprocess.stdin.end();
        }                

    });

    websocket.on("close", () => {
        console.log("websocket disconnected ...");
    });

    request.end();

});

/**/

app.get("/", (request, response) => {
    response.sendFile("index.html");
});

app.listen(8080, "0.0.0.0", () => {
    console.log("http://0.0.0.0:8080")
});