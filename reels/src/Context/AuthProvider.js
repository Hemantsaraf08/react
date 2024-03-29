import React,{useState,useContext,useEffect} from 'react'
import {auth} from '../firebase'
//wrapper component
{/* <component>
    <child1></child1>
    <child2></child2>
</component> */}

// the components child1 & child2 can be used using props.children in component's functional component

//refer firebase.js
export const AuthContext = React.createContext();

function AuthProvider({children}) { //structure is app.js==>AuthProvider==>SignUp etc.... children of AuthProvider
    const[currentUser,setCurrentUser] =useState();
    const[loading,setLoading] =useState(true);
    function signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout()
    {
        return auth.signOut();
    }
    useEffect(()=>{
        const unsubscribe  = auth.onAuthStateChanged(user=>{
            //Note we are adding observer on Auth obj not on user
            setCurrentUser(user);//can be null when no user or user logs out
            setLoading(false);
        })
        return ()=>{
            unsubscribe();  //it removes the observer from the auth obj when component unmounts (or tab closes),
            //but note that it doesn't signout user (when tab closes or comp. unmounts) as that can only be done through the fns login or logout 
        }
    },[])
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading&&children} 
            {/* this is how logical operators work in JS:(exp1&&exp2) Returns expr1 if it can be converted to false; otherwise, 
            returns expr2.
            Thus, when used with Boolean values, && returns true if both operands are true; otherwise, returns false. */}
            {/* {!loading?children:} //this is another way of doing this, if loading is false render children */}   
        </AuthContext.Provider>
    )
}

export default AuthProvider