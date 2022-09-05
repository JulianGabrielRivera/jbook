

import ReactDOM from "react-dom"; 
import {Provider} from 'react-redux';
import {store} from './state'
import  'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";
import CellList from "./components/cell-list";



const App =() =>{
    
  


  

   

    // if we put throw err below the error on box then it will console.log our error as well
    return (
    <Provider store={store}>
    <div>
        <CellList/>
        {/* <TextEditor/> */}
       {/* <CodeCell /> */}
      
    </div>
    </Provider>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))