const express = require("express");
const expressWs = require("express-ws");

const app = express();
// support websockets
expressWs(app);

/**/

// support encoding
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// static files
app.use(express.static("public"));
app.use("/node_modules", express.static("node_modules"));

/**/

var Docker = require("dockerode");
var docker = Docker();
var dockerImage = "th3r3alduk3/editor-docker:latest" ;

var Stream = require("stream");
var streamStdout = Stream.Writable();
var streamStderr = Stream.Writable();

docker.createImage({fromImage: dockerImage}).then(() => {

    app.ws("/", (websocket, request) => {

        // listen to stdout event
        streamStdout._write = (chunk, encoding, done) => {
            websocket.send(JSON.stringify({
                type: "stdout", data: chunk.toString()
            })); done();
        };

        // listen to stderr event
        streamStderr._write = (chunk, encoding, done) => {
            websocket.send(JSON.stringify({
                type: "stderr", data: chunk.toString()
            })); done();
        };

        websocket.on("message", message => {

            message = JSON.parse(message);

            // start an instance of docker container
            docker.run(dockerImage,
                ["bash", "-c", "echo '" + message.data + "' > ./file; " + {
                    // selected compiler or interpreter
                    "tcc": "tcc -run ./file",
                    "gcc": "gcc -o ./binary -x c ./file; ./binary",
                    "python2": "python2 ./file",
                    "python3": "python3 ./file"
                }[message.type]],
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

    /**/

    app.get("/", (request, response) => {
        response.sendFile("index.html");
    });


    app.listen(8080, "0.0.0.0", () => {
        console.log("http://0.0.0.0:8080")
    });

}).catch(error => {
    console.log("please start docker daemon");
});
