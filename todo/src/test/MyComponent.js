import React, { createContext, useContext } from 'react';
const MyContext = createContext(1);
function MyComponent() {
   const v1=useContext(MyContext);
   return (
      <>
         <p>{v1}</p>
         <MyContext.Provider value={2}>
            <p>{useContext(MyContext)}</p>
         </MyContext.Provider>
      </>
   )
}
export default MyComponent;