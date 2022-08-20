import {useRef} from 'react';

import MonacoEditor, {EditorDidMount, monaco} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}
// telling our ts compiler that we are going to provide codeeditor a react component that will receive a props that matches codeeditorprops interface
const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) =>{
    const editorRef = useRef<any>();
    // typescript now understands that we are trying to provide a function and assign it to oneditordidmount that satisfies this type.
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor)=>{
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(()=>{
            onChange(getValue());
        })
        monacoEditor.getModel()?.updateOptions({tabSize: 2})
console.log(getValue())

    }
    const onFormatClick = () =>{
        console.log(editorRef.current)
        // get current value from editor
        const unformatted = editorRef.current.getModel().getValue()

        // format value

        const formatted = prettier.format(unformatted, {

            parser:'babel',
            plugins: [parser],
            useTabs:false,
            semi: true,
            singleQuote: true
        })

        // set the formatted value back in the editor
        editorRef.current.setValue(formatted)
    }
    // this initialvalue above is a prop being parsed so we can use down on our return 
return (
<div>
    <button onClick={onFormatClick}>Format</button>
    <MonacoEditor editorDidMount={onEditorDidMount} value={initialValue} theme= "dark"language="javascript" height="500px" options={{wordWrap:'on', minimap:{enabled:false}, showUnused:false, folding:false, lineNumbersMinChars: 3, fontSize:16, scrollBeyondLastLine:false,automaticLayout:true}}/></div>)
};

export default CodeEditor;