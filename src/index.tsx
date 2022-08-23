

import ReactDOM from "react-dom"; 

import  'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";



const App =() =>{
    
  


  

   

    // if we put throw err below the error on box then it will console.log our error as well
    return <div>
        <TextEditor/>
       {/* <CodeCell /> */}
      
    </div>
}

ReactDOM.render(<App />, document.querySelector('#root'))