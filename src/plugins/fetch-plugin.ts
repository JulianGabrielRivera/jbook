import * as esbuild from 'esbuild-wasm';
import axios from 'axios'
import localForage from 'localforage'

//  use localforage to create a new object that we can use to interact with instance of a indexed database on browser
 
const fileCache = localForage.createInstance({
    name: 'filecache'
});
//  overrides esbuild way of loading up a file, which is to read it off a filesystem
// so this says dont worry about it, we'll return this object



export const fetchPlugin = (inputCode:string) => {
    return {
        name:'fetch-plugin',
        setup(build: esbuild.PluginBuild){
// WHEN WE FIND INDEX.JS
            build.onLoad({filter:/(^index\.js$)/}, () =>{ 
                return {
                    loader: 'jsx',
                    contents: inputCode,
                  };
            })

        build.onLoad({filter:   /.*/}, async(args:any)=>{
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        
            if(cachedResult){
                return cachedResult;
            }
        })

            build.onLoad({filter: /.css$/}, async (args: any) =>{
        // check to see if we have already fetched this file
            // and if it is in the cache, if so return it immediately otherwise allow request to happen
        
            
            const  {data, request} = await axios.get(args.path)
           
         
            const escaped = data.replace(/\n/g, '').replace(/"/g,'\\"').replace(/'/g, "\\'");
            const contents = `const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);`
            console.log(request)
            const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                contents,
                resolveDir: new URL('./', request.responseURL).pathname
            }
             // store response in cache
             await fileCache.setItem(args.path, result);
             return result;
            })
        build.onLoad({ filter: /.*/ }, async (args: any) => {
                   // check to see if we have already fetched this file
            // and if it is in the cache, if so return it immediately otherwise allow request to happen
        
            // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        
            // if(cachedResult){
            //     return cachedResult;
            // }
            const  {data, request} = await axios.get(args.path)
           
           
            
   
            const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                contents:data,
                resolveDir: new URL('./', request.responseURL).pathname
            }
             // store response in cache
             await fileCache.setItem(args.path, result);
             return result;
        
          
            } 
        
    
        );
        }
    }
}
