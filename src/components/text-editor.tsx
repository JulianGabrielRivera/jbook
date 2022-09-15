import MDEditor from "@uiw/react-md-editor";
import {useState, useEffect, useRef} from 'react'
import './text-editor.css';
import {Cell} from '../state'
import {useActions} from '../hooks/use-actions'


interface TextEditorProps {
    cell:Cell
}
// type of component react function component
const TextEditor: React.FC<TextEditorProps> = ({cell})=>{
    const ref = useRef<HTMLDivElement | null> (null);
const [editing, setEditing] = useState(false)

const {updateCell} = useActions();

useEffect(()=>{
    const listener = (event: MouseEvent) =>{
     if(ref.current && event.target && ref.current.contains(event.target as Node))
{
    console.log('element clicked on is inside editor');
    return;

}        
console.log('element clicked is not inside editor')
setEditing(false)
    }
    document.addEventListener('click', listener, {capture:true})
// clean up function here 
    return () =>{
        document.removeEventListener('click', listener, {capture:true})
    }
},[])
if(editing){
    return (
        <div  className="text-editor" ref={ref}>
            <MDEditor value={cell.content} onChange={(v)=>{
updateCell(cell.id, v || '')
            }}/>
        </div>
    )
}
return <div className="text-editor card" onClick={()=>{
    setEditing(true)
}}>
    <div className="card-content">
<MDEditor.Markdown source={cell.content || 'Click to edit'}/>
</div>
    </div>
}
export default TextEditor