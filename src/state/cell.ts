// we can put everything in here, we can put javascript or java and include it in the celltypes.
export type CellTypes = 'code' | 'text';

export interface Cell{
    id: string;
    type: CellTypes;
    content: string;
}
// properties we need to describe an individual cell