import MDEditor from "@uiw/react-md-editor";

// type of component react function component
const TextEditor: React.FC = ()=>{


return <div>
<MDEditor.Markdown source={"# Header"}/>
    </div>
}
export default TextEditor