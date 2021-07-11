import React,{useState, useEffect} from 'react'


//note how this variant of UseEffect with return & [] will work as ComponentWillUnmount 
//and the function passed as return will be run when component unmounts while re routing / switching to diff tag

//COMPONENT DID MOUNT AND COMPONENT DID UNMOUNT COMBINED TOGETHER
function UEffectForUnMount() {
    console.log("render");
    const [count, setCount]=useState(0);
    useEffect(()=>{
       console.log("use effect run");
       document.title=`Clicked ${count} times`

       //now if we want to cleanUP someting like, remove timeouts we use return with useEffect

       return ()=>{
           alert(`I will be called before the next useEffect will be called ${count}`)
       }
    },[]);  //once in lifetime run and return called after unmount
    return (
        <div>
            <p>You click {count} times</p>
            <button onClick={()=>setCount(count+1)}>Click</button>
        </div>
    )
}

export default UEffectForUnMount