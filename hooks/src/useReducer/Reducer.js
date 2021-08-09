import React, {useReducer} from 'react'

//using reducer as an alternate to useState with syntax like redux but no global state
//used for manipulation of complex state, we can dispatch actions relavant to that particular state

//below is variable declaration
const ACTIONS={
    INCREMENT: "increment", 
    DECREMENT: "decrement", 
    RESET: "reset"
}

function reducer(count, action){
    switch(action.type){
        case ACTIONS.INCREMENT: return count + 1;

    }
}

function Reducer() {
    const [count, dispatch]=useReducer(reducer, 0);
    return (
        <div>
            <span>{count}</span>
            <button onClick={()=>dispatch({type: ACTIONS.INCREMENT})}>+</button>
            <button onClick={()=>dispatch({type: ACTIONS.INCREMENT})}>+</button>
            <button onClick={()=>dispatch({type: ACTIONS.INCREMENT})}>+</button>
        </div>
    )
}

export default Reducer
