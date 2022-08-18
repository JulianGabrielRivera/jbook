
import * as esbuild from 'esbuild-wasm';
import ReactDOM from "react-dom"; 
import {useState, useEffect, useRef} from "react"  
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App =() =>{
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')

    const ref = useRef<any>();

    const startService = async() =>{
        // this we use to transpile our code.
        // we can use this ref anywhere in our component now
        ref.current = await esbuild.startService({
            worker:true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
        
    }

    useEffect(()=>{
        startService()
    }, [])
    const onClick = async () =>{
        // stops the error message if users immediately click the submit button without putting anything inside
        if(!ref.current)
        return;
        
    //   const result = await ref.current.transform(input, {
    //     loader: 'jsx',
    //     target:'es2015'
    //    });
// kicking off entire bundling process
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle:true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV':'"production"',
                global: 'window'
            }
        })
        console.log(result)
        // contains out transpiled and bundle code here.
      setCode(result.outputFiles[0].text);

    //   built in to browser function
    try{
    eval(result.outputFiles[0].text);
    }
    catch(err){
        alert(err);
    }
    };
    return <div>
        <textarea value={input} onChange={e=>{
            setInput(e.target.value)
        }}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
        {/* embed a document into another document html */}
        <iframe sandbox="" src="/test.html" />
    </div>
}
ReactDOM.render(<App />, document.querySelector('#root'))