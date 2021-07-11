//useEffect is used to implement component Life cycle methods in functional compoments

//1st variation: no dependency array ATALL=> behaves like ComponentDidMOunt + ComponentDidUpdate, because
//it runs after every re render
//AVOID CHANGING STATE HERE AS YOU WILL ENDUP IN INFINITE LOOP
// useEffect(() => {
//     callback function
// }, [input]   //optional dependency array)
import React, {useState, useEffect} from 'react'

function UseEffect1() {
    //notice that although useEffect is in the body of the fucntion it is invoked after each render i.e. after complete function body execution
    const [count, setCount]=useState(0);
    //useEffect variation 1: no dependency array atall
    useEffect(()=>{
        console.log("use Effect")
        document.title=`Clicked ${count} times`  
    })

    console.log("render");
    return (
        <div>
            <p>You clicked button {count} times</p>
            <button onClick={()=>setCount(count+1)}>Click</button>
        </div>
    )
}

export default UseEffect1

