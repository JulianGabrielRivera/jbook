import { ResizableBox } from "react-resizable";
import './resizable.css';

interface ResizableProps {
    // if we want to allow only certain strings, we can write them out like this.
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
return <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>{children}</ResizableBox>
}

export default Resizable;