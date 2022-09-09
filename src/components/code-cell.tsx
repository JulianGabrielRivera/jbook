
import {useState, useEffect} from "react"  

import CodeEditor from './code-editor';

import Preview from './preview';
import bundle from '../bundler'
import Resizable from "./resizable";
import {Cell} from '../state';
import {useActions} from '../hooks/use-actions';

interface CodeCellProps{
    cell:Cell
}
const CodeCell: React.FC<CodeCellProps>=({cell}) =>{
    const [input, setInput] = useState('')
    const [code,setCode] = useState('')
    const [err, setErr] = useState('');
    const {updateCell} = useActions();
  
    useEffect(()=>{
    const timer = setTimeout(async()=>{
    const output = await bundle(input)
    setCode(output.code);
    setErr(output.err)
},1000)
return () =>{
    clearTimeout(timer);
}
    },[input])
    // const ref = useRef<any>();
   

    // const startService = async() =>{
    //     // this we use to transpile our code.
    //     // we can use this ref anywhere in our component now
    //     ref.current = await esbuild.startService({
    //         worker:true,
    //         wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    //     })
        
    // }

    // useEffect(()=>{
    //     startService()
    // }, [])
    const onClick = async () =>{
        const output = await bundle(input)
        setCode(output.code);
        // stops the error message if users immediately click the submit button without putting anything inside
        // if(!ref.current){
        // return;
        // }
        // resets the content of iframe
        // iframe.current.srcdoc = html;
    //   const result = await ref.current.transform(input, {
    //     loader: 'jsx',
    //     target:'es2015'
    //    });
// kicking off entire bundling process, does the actual bundling
        // const result = await ref.current.build({
        //     entryPoints: ['index.js'],
        //     bundle:true,
        //     write: false,
        //     plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        //     define: {
        //         'process.env.NODE_ENV':'"production"',
        //         global: 'window'
        //     }
        // })
        // console.log(result)
        // contains out transpiled and bundle code here.
      
// iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    //   built in to browser function
  
    };

  

   

    // if we put throw err below the error on box then it will console.log our error as well
    return (
    <Resizable direction='vertical'>
        <div style={{height:'100%', display:'flex', flexDirection: 'row'}}>
            <Resizable direction="horizontal">
        <CodeEditor initialValue='const a = 1;' onChange={(value)=> setInput(value)}/>
        </Resizable>
       
{/*      
        <div>
            <button onClick={onClick}>Submit</button>
        </div> */}
     
        {/* embed a document into another document html */}
        {/* srcdoc html makes request to local string instead of some outside url, we also cant use localstorage/cookies like thid */}
       <Preview code={code} err={err}/>
    </div>
    </Resizable>
    );
}
export default CodeCell;