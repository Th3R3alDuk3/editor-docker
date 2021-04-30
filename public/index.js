/* MONACO-EDITOR */

require.config({ 
    paths: { 
        vs: '../node_modules/monaco-editor/min/vs' 
    } 
});

// https://microsoft.github.io/monaco-editor/playground.html
require(['vs/editor/editor.main'], function () {

    var editor = document.getElementById('editor');

    window.editor = monaco.editor.create(editor, {                        
        language: 'c',
        theme: 'vs-dark',
        value: [
            '#include <stdio.h>',
            '',
            'void main() {', 
            '   printf("Hello world!");',
            '}'
        ].join('\n'),
    });

    var output = document.getElementById('output');

    window.output = monaco.editor.create(output, {
        language: 'plaintext',
        theme: 'vs-dark',
        value: 'OUTPUT',
        folding: false,
        lineDecorationsWidth: 0,
        scrollBeyondLastLine: true,
        lineNumbers: 'off',
        minimap: {
            enabled: false
        }
    });

});

/* WEBSOCKETS */

var webSocket = new WebSocket("ws://localhost:8080");

webSocket.onopen = (event) => {
    console.log('websocket connected ...');
}

webSocket.onmessage = (event) => {
    window.output.setValue(event.data);
}

function run() {
    window.output.setValue('');
    webSocket.send(
        window.editor.getValue()
    );
}