//2nd variation
// ComponentDidMount
// there is presence of dependency array
// empty dependency array
import React, {useState,useEffect} from 'react'

function UseEffect2() {
    const [count, setCount]=useState(0);
    useEffect(()=>{
        console.log("use Effect");
        document.title=`clicked ${count} times`
    },[])   //renders only once now as it is second variations behaves like componentDidMount
    console.log("render");
    return (
        <div>
           <p>You clicked {count} times</p>
           <button onClick={()=>setCount(count+1)}>Click</button> 
        </div>
    )
}

export default UseEffect2
