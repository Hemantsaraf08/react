import React, {useState, useEffect} from 'react'

function Infinite() {
    console.log("render");
    const [count, setCount]=useState(0);
    useEffect(()=>{
        console.log("useEffect run");
        setCount(Math.random()*100);
    })//this creates infinite render to overcome this best approach is to not set state in useEffect but even if we do that
    //we must use useEffect of the type ComponentDidMount only i.e. [] as dependency array

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count+1)} >Click</button>   
        </div>
    )
}

export default Infinite
