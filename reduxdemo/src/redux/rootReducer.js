import { combineReducers } from "redux";
import BallReducer from "./balls/ballReducer";
import BatReducer from "./bats/BatReducer";
const rootReducer = combineReducers({
    ball:BallReducer,
    bat:BatReducer
})
export default rootReducer;