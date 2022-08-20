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
        // our actual code we transpiled and bundled
        return result.outputFiles[0].text
};
export default bundle;