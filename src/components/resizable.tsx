import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css';

interface ResizableProps {
    // if we want to allow only certain strings, we can write them out like this.
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {

    let resizeableProps: ResizableBoxProps;
    if(direction === 'horizontal'){
        resizeableProps = {
            minConstraints:[window.innerWidth * 0.2, Infinity], maxConstraints:[window.innerWidth * 0.75, Infinity],height:Infinity, width:window.innerWidth * 0.75, resizeHandles:['e']
        };
    }
    else{
        resizeableProps ={
            minConstraints:[Infinity, 24], maxConstraints:[Infinity, window.innerHeight * 0.9],height:300, width:Infinity, resizeHandles:['s']

        }
    }
    // this ... passes all props from up top
return <ResizableBox {...resizeableProps}>{children}</ResizableBox>
}

export default Resizable;