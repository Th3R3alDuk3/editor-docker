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

// docker
var Docker = require("dockerode");
var docker = Docker();

// streams
var Stream = require("stream");
var streamStdout = Stream.Writable();
var streamStderr = Stream.Writable();

docker.createImage({
    fromImage: "th3r3alduk3/ubuntu:latest"
}).then(() => {

    console.log("docker image = th3r3alduk3/editor-server-side")

    app.ws("/", (websocket, request) => {

        // stdout
        streamStdout._write = (chunk, encoding, done) => {
            websocket.send(JSON.stringify({
                type: "stdout", data: chunk.toString()
            })); done();
        };

        // stderr
        streamStderr._write = (chunk, encoding, done) => {
            websocket.send(JSON.stringify({
                type: "stderr", data: chunk.toString()
            })); done();
        };

        websocket.on("message", msg => {

            // msg type and data
            msg = JSON.parse(msg);

            // start temporary docker container
            docker.run(
                "th3r3alduk3/editor-server-side",
                ["bash", "-c", "echo '" + msg.data + "' > ./file; " + {
                    // selected compiler or interpreter
                    "tcc": "tcc -run ./file",
                    "gcc": "gcc -o ./binary -x c ./file; ./binary",
                    "python2": "python2 ./file",
                    "python3": "python3 ./file"
                }[msg.type]],
                [streamStdout, streamStderr], { 
                    Tty: false 
                }, (error, data, container) => {
                    return container.remove();
                }
            );

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

}).catch(error => {
    console.log("please start docker daemon");
});
