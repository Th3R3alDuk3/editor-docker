"use strict";

/**/

var select = document.getElementById("select");

/**
 * WEBSOCKETS
 */

var webSocket = new WebSocket("ws://" + location.host);

webSocket.onopen = (event) => {
    console.log("websocket connected ...");
}

webSocket.onmessage = (event) => {

    var msg = JSON.parse(event.data);

    window.output.setValue(
        window.output.getValue() +
        "[" + msg.type + "] ↓\n" + msg.data
    );

}

/**/

function run() {

    window.output.setValue("");

    webSocket.send(JSON.stringify({
        "type": select.options[select.selectedIndex].text,
        "data": window.editor.getValue()
    }));

}

/**/

window.onresize = () => {
    window.location.reload();
}