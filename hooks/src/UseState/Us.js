import React, {useState} from 'react'

function Us() {
    const [msgObj, setMessage]=useState({message:"", id:1});  //useState returns array and we destructure Array

    const handleChange=e=>{
        //diff between set state and useState is that when ever only one key-val pair would change in 
        //in setState we used to pass only that key-val pair in setState function
        //but in useState we have to pass all the obj's key-val pair and update the changed one, otherwise we will lose other key-val pairs
        let val=e.target.value;
        setMessage({...msgObj,message:val});//changing address of msgObj by passing new obj and updating the mesage variable
        //while spreading ensures that the obj contains both message and id

    }
    return (
        <div>
            <input type="text" value={msgObj.message} onChange={handleChange}></input>     
            <p>{msgObj.message}</p>     
        </div>
    )
}

export default Us
