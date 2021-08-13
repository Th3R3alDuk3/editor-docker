"use strict";

/**/

var editor = document.getElementById("editor");
var select = document.getElementById("select");

/**
 * MONACO-EDITOR 
 * https://microsoft.github.io/monaco-editor/playground.html
 */

require.config({paths: {vs: "../node_modules/monaco-editor/min/vs"}});

require(["vs/editor/editor.main"], function () {

    window.editor = monaco.editor.create(
        editor, {
            language: "c",
            theme: "vs-dark",
            value: `#include <stdio.h>
void main() {
    printf("Hello world!\\n");
}`
        }
    );

    /**/

    select.onchange = event => {
        monaco.editor.setModelLanguage(
            window.editor.getModel(),
            event.target.value
        );
    }

});