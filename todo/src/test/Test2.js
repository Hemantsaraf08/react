import React, {useContext} from 'react'
import { NameContext, AgeContext } from './TestQ10'
function Test2() {
    const name=useContext(NameContext);
    const age=useContext(AgeContext);
    return (
        <div>
            <h2>Name is: {name}</h2>
            <h2>Age is: {age}</h2>
        </div>
    )
}

export default Test2
