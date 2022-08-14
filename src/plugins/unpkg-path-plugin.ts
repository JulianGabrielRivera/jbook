import * as esbuild from 'esbuild-wasm';
import axios from 'axios'
 
export const unpkgPathPlugin = () => {
  return {
    // name for debugging purposes 
    name: 'unpkg-path-plugin',
    // called automatically by esbuild
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if(args.path === 'index.js'){
        return { path: args.path, namespace: 'a' };
        }
        // } else if (args.path === 'tiny-test-pkg'){
        //     return {path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
        // namespace: 'a'}
        // }
        if(args.path.includes('./') || args.path.includes('../')){
            return {
                namespace:'a',
                path: new URL(args.path,'https://unpkg.com' + args.resolveDir + '/').href
            };
        
        }
        return {
            namespace:'a', path:`https://unpkg.com/${args.path}`
        }
      });
//  overrides esbuild way of loading up a file, which is to read it off a filesystem
// so this says dont worry about it, we'll return this object
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, {useState} from 'react';
              console.log(React, useState);
            `,
          };
        } 
        const  {data, request} = await axios.get(args.path)
        console.log(request)
        return {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname
        }
      });
    },
  };
};