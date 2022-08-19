
import * as esbuild from 'esbuild-wasm';
import ReactDOM from "react-dom"; 
import {useState, useEffect, useRef} from "react"  
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';


const App =() =>{
    const [input, setInput] = useState('')
  

    const ref = useRef<any>();
    const iframe = useRef<any>();

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
        if(!ref.current){
        return;
        }
        // resets the content of iframe
        iframe.current.srcdoc = html;
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
    //   setCode(result.outputFiles[0].text);
iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    //   built in to browser function
  
    };

    const html = `<html>
    <head></head>
    <body>
    <div id="root"></div>
    <script>

    window.addEventListener('message', (event) =>{
        try{
eval(event.data)
        }
        catch(err){
const root = document.querySelector('#root')
root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>'

throw err;
        }
    },false)
    </script>
    </body>
    
    </html>`

    // if we put throw err below the error on box then it will console.log our error as well
    return <div>
        <CodeEditor initialValue='const a = 1;' onChange={(value)=> setInput(value)}/>
       
        <textarea value={input} onChange={e=>{
            setInput(e.target.value)
        }}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
     
        {/* embed a document into another document html */}
        {/* srcdoc html makes request to local string instead of some outside url, we also cant use localstorage/cookies like thid */}
        <iframe title="code preview" ref={iframe} sandbox="allow-scripts" srcDoc={html}/>
    </div>
}

ReactDOM.render(<App />, document.querySelector('#root'))