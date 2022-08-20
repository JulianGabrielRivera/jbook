

import ReactDOM from "react-dom"; 

import  'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeCell from "./components/code-cell";



const App =() =>{
    
  


  

   

    // if we put throw err below the error on box then it will console.log our error as well
    return <div>
       <CodeCell />
       <CodeCell/>
    </div>
}

ReactDOM.render(<App />, document.querySelector('#root'))