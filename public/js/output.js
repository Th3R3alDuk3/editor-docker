"use strict";

/**/

var output = document.getElementById("output");

/**
 * MONACO-EDITOR 
 * https://microsoft.github.io/monaco-editor/playground.html
 */

require.config({ paths: { vs: "../node_modules/monaco-editor/min/vs" } });

require(["vs/editor/editor.main"], function () {

    monaco.languages.register({ id: "console" });

    monaco.languages.setMonarchTokensProvider(
        "console", {
            tokenizer: {
                root: [
                    [/(\[stderr\])(.*)/, "stderr"],
                    [/(\[stdout\])(.*)/, "stdout"],
                    [/(\[output\])(.*)/, "output"],
                ]
            }
        }
    );

    monaco.editor.defineTheme(
        "console", {
            base: "vs-dark",
            inherit: true,
            rules: [
                { token: "stderr", foreground: "#ce9178" },
                { token: "stdout", foreground: "#32cd32" },
                { token: "output", foreground: "#569cd6" }
            ]
        }
    );

    /**/

    window.output = monaco.editor.create(
        output, {
            language: "console",
            theme: "console",
            value: "[output] ↓\n...",
            readOnly: true,
            folding: false,
            lineNumbers: "off",
            lineDecorationsWidth: 0,
            minimap: { enabled: false }
        }
    );

});