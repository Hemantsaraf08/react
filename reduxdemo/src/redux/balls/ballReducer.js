const initialState = {
    numofBalls:20
}   //because global state is made by many such reducers that take initial state
const BUY_BALL = 'BUY_BALL';    //no needed to declare if we use 'BUY_BALL' as string (in quotation marks) inside switch statement
const BallReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case BUY_BALL:
            return {...state,numofBalls:state.numofBalls-1}
        default:
            return state
    }

}
export default BallReducer;