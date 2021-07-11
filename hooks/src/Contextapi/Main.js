import MyContext from "./Context";
import React,{useState} from 'react'
import Demo from "./Demo"
function Main() {
    console.log("Main Render");
    const [count, setCount]=useState(0);
    return (
        <div>
                 <Demo/>
             <button onClick={()=>{setCount(count+1)}} >Click</button>
             <MyContext.Provider value={count}>
                 <Demo/>
             </MyContext.Provider>
        </div>
    )
}

export default Main
