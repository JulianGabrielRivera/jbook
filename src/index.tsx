
import * as esbuild from 'esbuild-wasm';
import ReactDOM from "react-dom"; 
import {useState, useEffect, useRef} from "react"  
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App =() =>{
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')

    const ref = useRef<any>();

    const startService = async() =>{
        // this we use to transpile our code.
        // we can use this ref anywhere in our component now
        ref.current = await esbuild.startService({
            worker:true,
            wasmURL: '/esbuild.wasm'
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

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle:true,
            write: false,
            plugins: [unpkgPathPlugin()],
            define: {
                'process.env.NODE_ENV':'"production"',
                global: 'window'
            }
        })
        console.log(result)
      setCode(result.outputFiles[0].text);
    };
    return <div>
        <textarea value={input} onChange={e=>{
            setInput(e.target.value)
        }}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
}
ReactDOM.render(<App />, document.querySelector('#root'))