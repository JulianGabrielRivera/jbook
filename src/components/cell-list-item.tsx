import {Cell} from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor'
import {useDispatch} from 'react-redux'
import {ActionCreators} from '../store'

interface CellListItemProps {
    cell: Cell
}



const CellListItem: React.FC<CellListItemProps> = ({cell})=>{
        const dispatch = useDispatch();

        dispatch(actionCreators,updateCell('asadgg', 'fadbfh'))

    let child: JSX.Element;
    if(cell.type === 'code'){
        child = <CodeCell cell={cell/>
    }
    else{
        child = <TextEditor/>
    }
    return <div>{child}</div>
}
export default CellListItem;