import React, {useEffect, useState} from 'react'

function TestQ2() {
    const [count, setCount]=useState(0);
    useEffect(()=>{
        console.log("Boom");
    })
    return (
        <div>
            <button onClick={()=>setCount(count+1)}>State: {count}</button>
        </div>
    )
}

export default TestQ2
