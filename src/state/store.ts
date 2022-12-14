import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
import {ActionType} from './action-types';
export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
type: ActionType.INSERT_CELL_AFTER, payload:{
    id:null,
    type:'code'
} 
})


store.dispatch({
    type: ActionType.INSERT_CELL_AFTER, payload:{
        id:null,
        type:'text'
    } 
    })

//     const id = store.getState().cells.order[0];
//     console.log(id)

// console.log(store.getState())