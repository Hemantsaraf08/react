//network calls must be done in an async way and its not good to fetch network content in a component as we did using the
//lifecycle methods in normal react useEffect hook. 

//so in redux network call is done using special action function called thunk. Thunk is basically a function returning another function
//when we pass this action thunk function to the reducer it acts as another layer, which passes forward synchronous
//actions as it is but whichever tasks are async it first waits for those tasks to execute (i.e. promise to be resolved) 
//and then passes it forward for regulare execution

//function retuned by thunk is async

//thunk acts as a middleware between action and reducer

//dispatch function calls other action function, and these dispatches are bundled in a thunk and this thunk is returned by the wrapper function


const FETCH_NETWORKCONTENT_REQUEST=()=>{
    return {
        users: "",
        loading: true
    }
}

const FETCH_USERS= ()=>{
    
}
