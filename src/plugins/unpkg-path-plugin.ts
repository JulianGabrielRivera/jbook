import * as esbuild from 'esbuild-wasm';


//  this function stores a color in filecache then color gets it and outputs it in the console
// (async()=>{
// await fileCache.setItem('color', 'red');

// const color = await fileCache.getItem('color');

// console.log(color);
// })()
export const unpkgPathPlugin = () => {
  return {
    // name for debugging purposes 
    name: 'unpkg-path-plugin',
    // called automatically by esbuild
    setup(build: esbuild.PluginBuild) {
// finds name of exactly index.js with no characters before or after
// handle root entry file of 'index.js'
        build.onResolve({filter: /(^index\.js$)/}, ()=>{
            return {path: 'index.js', namespace:'a'};
        })
// handle relative paths in a module
        build.onResolve({filter: /^\.+\//}, (args:any)=>{
            return {
                namespace:'a',
                path: new URL(args.path,'https://unpkg.com' + args.resolveDir + '/').href,
            };
        })
        // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
     
        
        // } else if (args.path === 'tiny-test-pkg'){
        //     return {path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
        // namespace: 'a'}
        // }
        // if(args.path.includes('./') || args.path.includes('../')){
           
        
        // }
        return {
            namespace:'a', path:`https://unpkg.com/${args.path}`
        }
      });


    },
  };
};