//action creators function not directly an OBJECT   
//return an action(object)

//Action obj includes type and payload , type is must whereas payload in optional
const BUY_BALL = 'BUY_BALL';
// if i need tto make a change i can do it here and it will get reflected everywhere
export const buyBall = ()=>{
    return {
        type:BUY_BALL
    }
}