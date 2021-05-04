/* MONACO-EDITOR */

require.config({ 
    paths: { 
        vs: '../node_modules/monaco-editor/min/vs' 
    } 
});

// https://microsoft.github.io/monaco-editor/playground.html

/* SET MONACO EDITOR */

require(['vs/editor/editor.main'], function () {

    var tccEditor = document.getElementById('tccEditor');

    window.tccEditor = monaco.editor.create(tccEditor, {                        
        language: 'c',
        theme: 'vs-dark',
        value: [
            '#include <stdio.h>',
            '',
            'void main() {', 
            '   printf("Hello world!\\n");',
            '}'
        ].join('\n'),
    });

    /* REGISTER MONACO LANGUAGE */

    monaco.languages.register({id: 'console'});

    monaco.languages.setMonarchTokensProvider('console', {
        tokenizer: {
            root: [
                [/(\[stderr\])(.*)/, 'stderr'],
                [/(\[stdout\])(.*)/, 'stdout'],
                [/(\[output\])(.*)/, 'output'],
            ]
        }
    });

    monaco.editor.defineTheme('console', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            {token: 'stderr', foreground: '#ce9178'},
            {token: 'stdout', foreground: '#32cd32'},
            {token: 'output', foreground: '#569cd6'}
        ]
    });

    /* SET MONACO OUTPUT */

    var tccOutput = document.getElementById('tccOutput');

    window.tccOutput = monaco.editor.create(tccOutput, {
        language: 'console',
        theme: 'console',
        value: '[output] ↓\n...',
        folding: false,
        lineNumbers: 'off',
        lineDecorationsWidth: 0,
        minimap: {enabled: false}
    });

});

/* ADJUST MONACO EDITOR */

window.onresize = () => {
    window.location.reload();
}

/* WEBSOCKETS */

var webSocket = new WebSocket("ws://"+ location.host);

webSocket.onopen = (event) => {
    console.log('websocket connected ...');
}

webSocket.onmessage = (event) => {

    var msg = JSON.parse(event.data);

    window.tccOutput.setValue(
        window.tccOutput.getValue() + 
        "[" + msg.type + "] ↓\n" + msg.data
    );

}

function run() {
    window.tccOutput.setValue('');
    webSocket.send(
        window.tccEditor.getValue()
    );
}