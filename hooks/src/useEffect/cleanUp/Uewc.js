import React,{useState, useEffect} from 'react'

function Uewc() {
    console.log("render");
    const [count, setCount]=useState(0);
    useEffect(()=>{
       console.log("use effect run");
       document.title=`Clicked ${count} times`

       //now if we want to cleanUP someting like, remove timeouts we use return with useEffect

       return ()=>{
           alert(`I will be called before the next useEffect will be called ${count}`)
       }
    })
    return (
        <div>
            <p>You click {count} times</p>
            <button onClick={()=>setCount(count+1)}>Click</button>
        </div>
    )
}
export default Uewc
