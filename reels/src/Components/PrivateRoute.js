import React, {useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider'
import {Route, Redirect} from "react-router-dom"

function PrivateRoute({component: PassedComponent,...rest}) {
    const {currentUser}=useContext(AuthContext);
    // console.log(currrentUser)

    return (
        <Route {...rest} render={props=>{
            return currentUser?<PassedComponent {...props}/>:<Redirect to="/signup"/>
        }}/>
    )
}

export default PrivateRoute
