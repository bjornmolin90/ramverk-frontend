import React from 'react';
import Editor from "@monaco-editor/react";

function CodeEditor(props) {
    return (
        <Editor
            height="70vh"
            defaultLanguage="javascript"
            value={props.value}
            onChange={props.setValue}
        />
    );
}

export default CodeEditor;
