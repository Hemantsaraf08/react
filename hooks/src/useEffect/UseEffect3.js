//we pass in dependency array state items
//runs after those renders that are due to state change of the passed state 

//use State has two variables here and both are not updated simultaneously

import React, {useState, useEffect} from 'react'
import "./useeffect3.css"
function UseEffect3() {
    const [count, setCount]=useState(0)
    const [darkMode, setMode]=useState(false);
    console.log("render");
    useEffect(()=>{
        console.log("use effect run");
        document.title=`Clicked ${count} times`
    },[count])    //Now that we have specified count in dependency useEffect will only run when count is updated 
    //if this had not been done useEffect would run on update of both darkMode and Count but we see here that the body of 
    //use Effect only uses count in its body, so its better to avoid unnecessary execution of useEffect
    return (
        <div className={darkMode?"view dark-mode":"view"}>
            <label htmlFor="darkmode">DarkMode</label>
            <input type="checkbox" checked={darkMode} onClick={()=>setMode(!darkMode)}></input>
            <button onClick={()=>setCount(count+1)}>{count}</button>
        </div>
    )
}

export default UseEffect3
