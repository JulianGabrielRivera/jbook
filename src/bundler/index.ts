import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;
const bundle = async (rawCode:string) =>{ 
     // this we use to transpile our code.
        // we can use this ref anywhere in our component now
        if(!service){
            service =  await esbuild.startService({
                worker:true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
            });
        }
        try{
       const result = await service.build({
            entryPoints: ['index.js'],
            bundle:true,
            write: false,
            // code we are trying to transpile and bundle is rawCode
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV':'"production"',
                global: 'window',
            },
        });
        
        return { code: result.outputFiles[0].text,
            err: ''
        }
        
    } catch (err) {
        if (err instanceof Error) {
          return {
            code: "",
            err: err.message,
          };
        } else {
          throw err;
        }
      }
        // our actual code we transpiled and bundled
     
};
export default bundle;
